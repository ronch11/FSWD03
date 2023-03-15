import { createBookData, getBookData, getAllBookData, updateBookData, deleteBookData, getAdminData,createAdminData } from "../../rest api/restApi.js";  
const { createBookData, getBookData, getAllBookData, updateBookData, deleteBookData, getAdminData,createAdminData } = require('../../rest api/restApi.js');

import {FXMLhttpRequest} from "/fajax/FXMLhttpRequest.js";


document.getElementById('LogInButton').addEventListener('click', sign_in);
document.getElementById('LogInPageButton').addEventListener('click', Getsinup);
document.getElementById('SignUpButton').addEventListener('click', sign_up);
document.getElementById('SignUpPageButton').addEventListener('click', sign_up_page);

/*get login page and remove the singup page */
function Getsinup(){
    Uploudelogin(); // show login form
    Removesignup();// remove signup form
}

function Uploudelogin(){
    const taskTemplate = document.getElementById('login-form');
    // add hide class to login form
    taskTemplate.classList.add('display-section');// add display-section class to login form
    taskTemplate.classList.remove('area');// remove area class from login form
}

function Removesignup(){
    const taskTemplate = document.getElementById('signup-form');
    // add hide class to login form
    taskTemplate.classList.add('area');// add area class to login form
    taskTemplate.classList.remove('display-section'); // remove display-section class from login form
}


/*get signup page and remove the login page */
function sign_up_page(){
    Uploudesignup();// show signup form
    Removelogin();// remove login form
}

function Uploudesignup(){
    const taskTemplate = document.getElementById('signup-form');
    // add hide class to login form
    taskTemplate.classList.add('display-section');// add display-section class to login form
    taskTemplate.classList.remove('area');// remove area class from login form
}


function Removelogin(){
    const taskTemplate = document.getElementById('login-form');
    // add hide class to login form
    taskTemplate.classList.add('area');// add area class to login form
    taskTemplate.classList.remove('display-section');// remove display-section class from login form
}



function Myapp(){
   
}



function sign_in(event){ 
   
    
}



function sign_up(){
   
}






