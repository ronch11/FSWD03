import {FXMLHttpRequest} from "/fajax/FXMLHttpRequest.js";

document.getElementById('LogInButton').addEventListener('click', sign_in);
document.getElementById('LogInPageButton').addEventListener('click', sign_in_page);
document.getElementById('SignUpButton').addEventListener('click', sign_up);
document.getElementById('SignUpPageButton').addEventListener('click', sign_up_page);
document.getElementById('FormSubmit_Click').addEventListener('click', handleFormSubmit);
document.getElementById('LogOutButton').addEventListener('click', logout);





function sign_in_page(){
    load_login_page();
    exit_signup_page();
}


function sign_up_page(){
    load_signup_page();
    exit_login_page();
}
