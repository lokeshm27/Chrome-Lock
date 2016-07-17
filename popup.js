var Ele1,Ele2,Ele3,Ele4,Ele5;

document.addEventListener('DOMContentLoaded', function () {
	console.clear();
	console.log("popup.js loaded");
	
	Ele1 = document.querySelector('.op1');
	Ele1.addEventListener("mouseover", op1msov);
	Ele1.addEventListener("mouseout", op1msot);
	Ele1.addEventListener("click", op1mscl);
	
	Ele2 = document.querySelector('.op2');
	Ele2.addEventListener("mouseover", op2msov);
	Ele2.addEventListener("mouseout", op2msot);
	Ele2.addEventListener("click", op2mscl);
	
	Ele3 = document.querySelector('.op3');
	Ele3.addEventListener("mouseover", op3msov);
	Ele3.addEventListener("mouseout", op3msot);
	Ele3.addEventListener("click", op3mscl);
	
	Ele4 = document.querySelector('.op4');
	Ele4.addEventListener("mouseover", op4msov);
	Ele4.addEventListener("mouseout", op4msot);
	Ele4.addEventListener("click", op4mscl);
	
	Ele5 = document.querySelector('.op5');
	Ele5.addEventListener("mouseover", op5msov);
	Ele5.addEventListener("mouseout", op5msot);
	Ele5.addEventListener("click", op5mscl);
	
	
});

function op1msov(){
	Ele1.style.backgroundColor = "#e6e6e6";
	Ele1.style.cursor = "pointer";
}

function op1msot(){
	Ele1.style.backgroundColor = "#F8F8F8";
}

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

function op2msov(){
	Ele2.style.backgroundColor = "#e6e6e6";
	Ele2.style.cursor = "pointer";
}

function op2msot(){
	Ele2.style.backgroundColor = "#F8F8F8";
}

function op2mscl(){
	chrome.tabs.create({
		url: "options.html",
		active: true,
		pinned: false
	});
	window.close();
}

function op3msov(){
	Ele3.style.backgroundColor = "#e6e6e6";
	Ele3.style.cursor = "pointer";
}

function op3msot(){
	Ele3.style.backgroundColor = "#F8F8F8";
}

function op3mscl(){
	chrome.tabs.create({
		url: "http://www.chromelock.comxa.com/contact.php",
		active: true,
		pinned: false
	});
	window.close();
}

function op4msov(){
	Ele4.style.backgroundColor = "#e6e6e6";
	Ele4.style.cursor = "pointer";
}

function op4msot(){
	Ele4.style.backgroundColor = "#F8F8F8";
}

function op4mscl(){
	chrome.tabs.create({
		url: "about.html",
		active: true,
		pinned: false
	});
	window.close();
}

function op5msov(){
	Ele5.style.backgroundColor = "#e6e6e6";
	Ele5.style.cursor = "pointer";
}

function op5msot(){
	Ele5.style.backgroundColor = "#F8F8F8";
}

function op5mscl(){
	var newURL = "chrome://extensions/?id=" + chrome.runtime.id;
	chrome.tabs.create({ url : newURL});
	window.close();
}