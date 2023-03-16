import { FXMLhttpRequest } from "./fajax/FXMLHttpRequest.js";

document.getElementById('LogInButton').addEventListener('click', sign_in);
document.getElementById('LogInPageButton').addEventListener('click', sign_in_page);
document.getElementById('SignUpButton').addEventListener('click', sign_up);
document.getElementById('SignUpPageButton').addEventListener('click', GetSingUpage);
document.getElementById('AddBooksButton').addEventListener('click', AddBooks);
document.getElementById('displayAll').addEventListener('click', displayBooks);
document.getElementById('searchForBookButton').addEventListener('click', searchForBook);


/* get sign in page */
function sign_in_page(){
    LoadSinginPage(); // call function to load login page
    RemoveSignUpPage(); // call function to remove signup page
}

/* load login page */
function LoadSinginPage(){
    const taskTemplate = document.getElementById('login-form');// get login form    
    taskTemplate.classList.add('display-section');// add display class to login form
    taskTemplate.classList.remove('area');// remove hide class to login form
}

/* remove signup page */
function RemoveSignUpPage(){
    const taskTemplate = document.getElementById('signup-form');// get signup form
    taskTemplate.classList.add('area');// add hide class to login form
    taskTemplate.classList.remove('display-section');// remove display class to login form
}

/* get sign up page */
function GetSingUpage(){
    LoadSingUPage();
    RemoveSignInPage();
}

/* load sign up page */
function LoadSingUPage(){
    const taskTemplate = document.getElementById('signup-form');// get signup form
    taskTemplate.classList.add('display-section');// add display class to signup form
    taskTemplate.classList.remove('area');// remove hide class to signup form
}

/* remove sign in page */
function RemoveSignInPage(){
    const taskTemplate = document.getElementById('login-form');// get login form
    taskTemplate.classList.add('area');// add hide class to login form
    taskTemplate.classList.remove('display-section');// remove display class to login form
}

function geyMyApp(){
    LoadMyApp();
    RemoveSignInPage();
    RemoveSignUpPage();
    displayBooks()
}

function LoadMyApp(){
    const taskTemplate = document.getElementById('My-app');// get my app
    taskTemplate.classList.add('display-section');// add display class to my app
    taskTemplate.classList.remove('area');// remove hide class to my app
}

function sign_in(event){ 
   // get password and username from login form
    var userElement = document.getElementById("UsernameText");
    var user_username = userElement.value;
    var passElement = document.getElementById("PasswordText");
    var user_password = passElement.value;
    var req = new FXMLhttpRequest();
    req.open(
     'GET',
     '/SignIn',
     {username: user_username},
     function(response) {
        if (response.status === 200){
            if(response.body.Password=== user_password){
                geyMyApp();      
            }
            else{
                alert("user or password is not correct");
            }
        }
        else{
            alert("user or password is not correct");
        }
    });
    req.send();
}

function sign_up(event){

    var userElement = document.getElementById("SignUpUsernameText");
    var user_username = userElement.value;
    var passElement = document.getElementById("SignUpPasswordText");
    var user_password = passElement.value;
    var fnameElement = document.getElementById("SignUpFNameText");
    var user_fname = fnameElement.value;
    var lnameElement = document.getElementById("SignUpLNameText");
    var user_lname = lnameElement.value;

    var req = new FXMLhttpRequest();
    req.open(
     'POST',
     '/SignUp',
     {data:{UserName: user_username, Password: user_password, firstName: user_fname, lastName:user_lname}},
     function(response) {
        if (response.status === 200){
            geyMyApp();      
        }
        else{
            alert("username is already taken, try differnt one");
        }
    });
    req.send();
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
    var req = new FXMLhttpRequest();
    req.open(
     'POST',
     '',
     {data: newBook},
     function(response) {
        if (response.status === 200){
            displayBooks()
        }
    });
    req.send();
}

// Function to display all books in the database
function displayBooks() {
    let books = {};
    var req = new FXMLhttpRequest();
    req.open(
     'GET',
     '',
     null,
     function(response) {
        if (response.status === 200){
            books = response.body
        }
    });
    req.send();

    const tbody = document.getElementById('table-body')
    tbody.innerHTML = "";
    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${book.book_name}</td>
            <td>${book.author_name}</td>
            <td>${book.category}</td>
            <td>${book.publication_date}</td>
            <td>${book.publisher}</td>
            <td>${book.isbn}</td>
            <td>
            <button class="edit" data-index="${i}">Edit</button>
            <button class="delete" data-index="${i}">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);

        // tr.querySelector('.edit').addEventListener('click' , editBook);
        // tr.querySelector('.delete').addEventListener('click' , deleteBook);
    }
}

function searchForBook() {
    const book_name = document.querySelector('#searchForBook').value;
    let books = {};
    var req = new FXMLhttpRequest();
    req.open(
     'GET',
     '',
     {book_name: book_name},
     function(response) {
        if (response.status === 200){
            books = response.body

            const tbody = document.getElementById('table-body')
            tbody.innerHTML = "";
            for (let i = 0; i < 1; i++) {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${books.book_name}</td>
                    <td>${books.author_name}</td>
                    <td>${books.category}</td>
                    <td>${books.publication_date}</td>
                    <td>${books.publisher}</td>
                    <td>${books.isbn}</td>
                    <td>
                    <button class="edit" data-index="${i}">Edit</button>
                    <button class="delete" data-index="${i}">Delete</button>
                    </td>
                `;
                tbody.appendChild(tr);
            }
        } else {
            alert("book font exist in the system")
        }
    });
    req.send();

    
}

// // Function to delete a book from the database
// function deleteBook(event) {
//     var books = {};
//     var req = new FXMLhttpRequest();
//     req.open(
//      'GET',
//      '',
//      null,
//      function(response) {
//         if (response.status === 200){
//             books = response.body
//         }
//     });
//     req.send();
//   const index = event.target.dataset.index;
//   var req = new FXMLhttpRequest();
//     req.open(
//      'POST',
//      '',
//      {data: newBook},
//      function(response) {
//         console.log(response)
//         if (response.status === 200){

//             //to do

//         }
//     });
//     req.send();
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