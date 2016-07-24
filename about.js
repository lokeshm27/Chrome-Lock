var license;

document.addEventListener("DOMContentLoaded", function(){
	console.clear();
	console.log("About.js loaded.");
	
	license = document.querySelector('.license');
	license.addEventListener("mouseover", changeImg);
	license.addEventListener("mouseout", changeBack);
});

function changeBack(){
	license.src = "/Images/cc-black.png";
}

function changeImg(){
	license.src = "/Images/cc-blue.png";
}