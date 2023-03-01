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

function checkInputValue(inputValue) {
	fetch("../DB/Administrators.json")
	.then(response => response.json())
	.then(data => {
		if (data.Administrators.some(item => item.UserName === inputValue.username && item.Password === inputValue.password)) {
			console.log("Username and password match found in JSON data");
			alert("Login successful!");
		} else {
			console.log("Username and password not found in JSON data");
		}
	})
	.catch(error => console.error(error));
}

inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
	input.addEventListener("change", () => {
		const inputValue = {
			username: document.getElementById("username").value,
			password: document.getElementById("password").value
		};
		checkInputValue(inputValue);
		alert("Login !");
	});
});

document.getElementById("myButton").onclick = function() {
  // Use AJAX to load the content of the other page
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("contentR").innerHTML = this.responseText;
    }
  };
  xhr.open("GET", "../Client/ApplicationScreen/ApplicationScreen.html", true);
  xhr.send();
};

