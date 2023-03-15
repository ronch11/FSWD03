

document.getElementById('LogInButton').addEventListener('click', sign_in);
document.getElementById('LogInPageButton').addEventListener('click', sign_in_page);
document.getElementById('SignUpButton').addEventListener('click', sign_up);
document.getElementById('SignUpPageButton').addEventListener('click', GetSingUpage);

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
    geyMyApp();      
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

















