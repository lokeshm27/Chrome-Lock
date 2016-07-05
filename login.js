document.addEventListener('DOMContentLoaded', function () {
	console.clear();
	console.log("oper.js loaded");
	var ele = document.querySelector('.ip').focus();
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
