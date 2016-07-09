var passwd;
var incog = false;

document.addEventListener('DOMContentLoaded', function () {
	console.clear();
	console.log("login.js loaded");
	var ele = document.querySelector('.ip');
	ele.focus();
	ele.addEventListener("keypress", function(e){
		if(e.keyCode == 13){
			subclick();
		}
	});
	document.querySelector('.bt1').addEventListener("click", subclick);
	document.querySelector('.bt2').addEventListener("click", forclick);
	document.querySelector('.incog').addEventListener("click", incogclk);
	chrome.storage.local.get('uiower', function(d1){
		incog = d1.uiower;
		if(!(incog)){
			document.querySelector('.optional').style.visibility = 'hidden';
		}
		console.log(incog);
	});
	
});

window.onbeforeunload = sendM;

function subclick(){
	alert("Sumbit button clicked");
}

function forclick(){
	alert("Forgot button clicked");
}

function incogclk(){
	if(incog){
		chrome.windows.create({"incognito": true, "state": "maximized"});
	}
}

function sendM(){
	chrome.runtime.sendMessage({method : "codeRed", code : "248057"},
		function(response){
			if(response.result == 0){
				// DO Nothing
			}
		});
		return null;
}
