document.addEventListener('DOMContentLoaded', function () {
	console.clear();
	console.log("oper.js loaded");
});

function sendM(){
	chrome.runtime.sendMessage({method : "codeRed", code : "248057"},
		function(response){
			if(response.result == 0){
				// DO Nothing
			}
		});
		return null;
}

function myFunction(){
	console.log("Clicked Button 1");
	var pass = document.querySelector('.pw').value;
	console.log("Entered Password : " + pass);
	console.log("Password Length : " + pass.length);
	document.querySelector('.pw').value = "";
}