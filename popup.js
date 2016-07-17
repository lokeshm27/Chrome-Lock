var Ele1,Ele2,Ele3,Ele4,Ele5;

document.addEventListener('DOMContentLoaded', function () {
	console.clear();
	console.log("popup.js loaded");
	
	Ele1 = document.querySelector('.op1');
	Ele1.addEventListener("click", op1mscl);
	
	Ele2 = document.querySelector('.op2');
	Ele2.addEventListener("click", op2mscl);
	
	Ele3 = document.querySelector('.op3');
	Ele3.addEventListener("click", op3mscl);
	
	Ele4 = document.querySelector('.op4');
	Ele4.addEventListener("click", op4mscl);
	
	Ele5 = document.querySelector('.op5');
	Ele5.addEventListener("click", op5mscl);
	
	
});

function op1mscl(){
	console.log("Calling background lock function");
	chrome.runtime.sendMessage({method : "codeYellow", code : "248057"},
		function(response){
			if(response.result == 0){
				console.log("Lock function returned in +ve");
			}else{
				console.log("Lock function returned in -ve");
			}
		}
	);
	window.close();
}

function op2mscl(){
	chrome.tabs.create({
		url: "options.html",
		active: true,
		pinned: false
	});
	window.close();
}

function op3mscl(){
	chrome.tabs.create({
		url: "http://www.chromelock.comxa.com/contact.php",
		active: true,
		pinned: false
	});
	window.close();
}

function op4mscl(){
	chrome.tabs.create({
		url: "about.html",
		active: true,
		pinned: false
	});
	window.close();
}

function op5mscl(){
	var newURL = "chrome://extensions/?id=" + chrome.runtime.id;
	chrome.tabs.create({ url : newURL});
	window.close();
}