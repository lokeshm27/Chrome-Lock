document.addEventListener('DOMContentLoaded', function () {
	console.clear();
	console.log("oper.js loaded");
	var ele = document.querySelector('.ip');
	ele.focus();
	ele.addEventListener("keypress", function(e){
		if(e.keyCode == 13){
			subclick();
		}
	});
	document.querySelector('.bt1').addEventListener("click", subclick);
	document.querySelector('.bt2').addEventListener("click", forclick);
	chrome.storage.local.get('uiower', function(d1){
		if(!(d1.uiower)){
			document.querySelector('.optional').style.visibility = 'hidden';
		}
	});
});

window.onbeforeunload = sendM;

function subclick(){
	alert("Sumbit button clicked");
}

function forclick(){
	alert("Forgot button clicked");
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
