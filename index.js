import { createBookData, getBookData, getAllBookData, updateBookData, deleteBookData, getAdminData,createAdminData } from "../../rest api/restApi.js";  
const { createBookData, getBookData, getAllBookData, updateBookData, deleteBookData, getAdminData,createAdminData } = require('../../rest api/restApi.js');

import {FXMLhttpRequest} from "/fajax/FXMLhttpRequest.js";

document.getElementById('LogInButton').addEventListener('click', sign_in);
document.getElementById('LogInPageButton').addEventListener('click', sign_in_page);
document.getElementById('SignUpButton').addEventListener('click', sign_up);
document.getElementById('SignUpPageButton').addEventListener('click', sign_up_page);
document.getElementById('FormSubmit_Click').addEventListener('click', handleFormSubmit);
document.getElementById('LogOutButton').addEventListener('click', logout);
document.getElementById('AddBookButton').addEventListener('click', AddBooks);
document.getElementById('ShowBooksButton').addEventListener('click', showBooks);



function test(){
    var req = new FXMLhttpRequest();
    req.open(
     'PUT',
     'server.com/SignUp',
     {username : '', password : '', fname : '', lname : ''},
     function(response) {
        console.log('client from server.com says: ', response);
    });
    req.send();
}


function show_error(label,errorMessage){
    const error = document.getElementById(`${label}ErrorLabel`);
    error.textContent = errorMessage;
    error.classList.remove('hidden');
    setTimeout(()=>{document.getElementById(`${label}ErrorLabel`).classList.add('hidden');}, 2000);
}

function sign_in(event){ 
    // get password and username from login form
    var userElement = document.getElementById("UsernameText");
    var user_username = userElement.value;
    var passElement = document.getElementById("PasswordText");
    var user_password = passElement.value;


    if (user_username === '' || user_password ===''){
        show_error('Login','please enter both username and password!');
        return
    }
    console.log('client: requesting specified user data...')
    var req = new FXMLhttpRequest();
    req.open(
     'GET',
     'server.com/SignIn',
     {username : user_username, password : user_password},
     function(response) {
        console.log(response)
        if (response.status === 200){
            
            var user = response.user;
            logged_user = {
                username : user.username,
                password: user.password,
                id : user.id,
                fname : user.fname,
                lname : user.lname
            };

            console.log('client: log in success, loading tasks...');
            load_todo_list();
        }
        else{
            console.log('client: Error, user data invalid')
            show_error('Login','username or password is incorrect!');

        }

    });
    req.send();
}

function sign_in_page(){
    load_login_page();
    exit_signup_page();
}

function sign_up(){
    console.log('enter signup')
    // get password and username from login form
    var userElement = document.getElementById("SignUpUsernameText");
    var user_username = userElement.value;
    var passElement = document.getElementById("SignUpPasswordText");
    var user_password = passElement.value;
    var fnameElement = document.getElementById("SignUpFNameText");
    var user_fname = fnameElement.value;
    var lnameElement = document.getElementById("SignUpLNameText");
    var user_lname = lnameElement.value;

    console.log(user_username,user_password,user_fname,user_lname)
    if (user_username === '' || user_password === '' || user_fname === '' || user_lname === ''){
        show_error('Signup','please fill all fields!')
        return
    }

    var req = new FXMLhttpRequest();
    req.open(
        'PUT',
        'server.com/SignUp',
        {username : user_username, password : user_password, fname : user_fname, lname : user_lname},
        function(response) {
            console.log(response)
            if (response.status === 200){
                var user = response.user;
                logged_user = {
                    username : user.username,
                    password: user.password,
                    id : user.id,
                    fname : user.fname,
                    lname : user.lname
                };
                
                console.log('client: sign up success, loading tasks...');
                load_todo_list();
            }   
            else{
                show_error('Signup','username already exists!')
            }
    
        }
    );
    req.send();
}

function sign_up_page(){
    load_signup_page();
    exit_login_page();
}

function clear_fields(){
    const inputFields = document.getElementsByClassName('input-button')

    for (const inputField of inputFields){
        inputField.value = ''
    }
}


function logout(event){
    // remove all tasks from todo list
    const tasksList = document.getElementById('task-list');
    // get all li elements
    const tasks = tasksList.querySelectorAll('li');
    // delete all li elements
    tasks.forEach(task => {
        tasksList.removeChild(task);
    });
    
    // remove all tasks from completed list
    const completedList = document.getElementById('completed-task-list');
    // get all li elements
    const completed = completedList.querySelectorAll('li');
    // delete all li elements
    completed.forEach(task => {
        completedList.removeChild(task);
    });

    // add hide class to todo list
    const taskDiv = document.getElementById('ToDoListApp');
    taskDiv.classList.add('hidden');
    document.getElementsByClassName('form')[0].classList.remove('hidden');
    document.getElementsByTagName('body')[0].style.background = 'radial-gradient(#39a245,#1f1013)';


    logged_user = {username: "", password: "", id : "", fname : "", lname : ""}
    exit_signup_page();
    load_login_page();
}

function load_login_page(){
    const taskTemplate = document.getElementById('login-form');
    // add hide class to login form
    taskTemplate.classList.add('display-section');
    taskTemplate.classList.remove('area');
}

function exit_login_page(){
    const taskTemplate = document.getElementById('login-form');
    // add hide class to login form
    taskTemplate.classList.add('area');
    taskTemplate.classList.remove('display-section');
}

function load_signup_page(){
    const taskTemplate = document.getElementById('signup-form');
    // add hide class to login form
    taskTemplate.classList.add('display-section');
    taskTemplate.classList.remove('area');
}

function exit_signup_page(){
    const taskTemplate = document.getElementById('signup-form');
    // add hide class to login form
    taskTemplate.classList.add('area');
    taskTemplate.classList.remove('display-section');
}




// Function to handle form submission
function handleFormSubmit(event) {
    //event.preventDefault();
    const inputText = document.getElementById('task-text');
    const text = inputText.value;
    if (text !== '') {
        addNewTask(text);
        inputText.value = '';
    }
}



function showBooks() {
  alert("Loading books");
}

function AddBooks() {
    const bookName = document.querySelector('#book_name').value;
    const authorName = document.querySelector('#author_name').value;
    const category = document.querySelector('#category').value;
    const publicationDate = document.querySelector('#publication_date').value;
    const publisher = document.querySelector('#publisher').value;
    const isbn = document.querySelector('#isbn').value;
    
    const newBook = {
      book_name: bookName,
      author_name: authorName,
      category: category,
      publication_date: publicationDate,
      publisher: publisher,
      isbn: isbn
    };
    createBookData(newBook).then(data => {
      console.log("New book added:", data);
    }).catch(error => {
      console.error("Error adding book:", error.message);
    });
}


// // Initialize the book database in localStorage
// if (!localStorage.getItem("books")) {
//   localStorage.setItem("books", JSON.stringify([]));
// }

// // Function to add a new book to the database
// function addBook(event) {
//   event.preventDefault();
//   const title = document.getElementById("title").value;
//   const author = document.getElementById("author").value;
//   const year = document.getElementById("year").value;
//   const book = { title, author, year };
//   const books = JSON.parse(localStorage.getItem("books"));
//   books.push(book);
//   localStorage.setItem("books", JSON.stringify(books));
//   event.target.reset();
//   displayBooks();
// }

// // Function to display all books in the database
// function displayBooks() {
//   const books = JSON.parse(localStorage.getItem("books"));
//   const tbody = document.querySelector("#book-table tbody");
//   tbody.innerHTML = "";
//   for (let i = 0; i < books.length; i++) {
//     const book = books[i];
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td>${book.title}</td>
//       <td>${book.author}</td>
//       <td>${book.year}</td>
//       <td>
//         <button class="edit" data-index="${i}">Edit</button>
//         <button class="delete" data-index="${i}">Delete</button>
//       </td>
//     `;
//     tbody.appendChild(tr);
//   }
// }

// // Function to delete a book from the database
// function deleteBook(event) {
//   const index = event.target.dataset.index;
//   const books = JSON.parse(localStorage.getItem("books"));
//   books.splice(index, 1);
//   localStorage.setItem("books", JSON.stringify(books));
//   displayBooks();
// }

// // Function to edit a book in the database
// function editBook(event) {
//   const index = event.target.dataset.index;
//   const books = JSON.parse(localStorage.getItem("books"));
//   const book = books[index];
//   const newTitle = prompt("Enter a new title:", book.title);
//   const newAuthor = prompt("Enter a new author:", book.author);
//   const newYear = prompt("Enter a new year:", book.year);
//   book.title = newTitle;
//   book.author = newAuthor;
//   book.year = newYear;
//   localStorage.setItem("books", JSON.stringify(books));
//   displayBooks();
// }

// // Add event listeners to the add-form, book-table, and document
// const addForm = document.getElementById("add-form");
// addForm.addEventListener("submit", addBook);
// const bookTable = document.getElementById("book-table");
// bookTable.addEventListener("click", function(event) {
//   if (event.target.classList.contains("edit")) {
//     editBook(event);
//   } else if (event.target.classList.contains("delete")) {
//     deleteBook(event);
//   }
// });
// document.addEventListener("DOMContentLoaded", displayBooks);

