const inputs = document.querySelectorAll(".input");

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

function logIn() {
    let flag = validateFildes();
    if (flag == true) {
        let userLoggedIn = {
            "loggedIn": true,
            "username": enteredUsername = document.getElementsByName("username")[0].value
        }
        localStorage.setItem("userLoggedIn", JSON.stringify(userLoggedIn));
        window.location.assign("../home/home.html");
    } else {
        alert("wrong username or passeord");
    }
}

inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
	input.addEventListener("change", () => {
		const inputValue = {
			username: document.getElementById("username").value,
			password: document.getElementById("password").value
		};		
	});
});


