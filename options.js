var tmString1 = "Chrome Lock will automatically lock your browser after "
var timeOut;
var tmSting2 = "mins of Inactivity. Minimum = 2mins. Maximum = 30mins. <br /> <strong>Note: </strong>This option is still in beta-stage. May not work perfectly.</strong>"
var encrPasswd;

document.addEventListener('DOMContentLoaded', function(){
	console.clear();
	console.log("options.js loaded");
	chrome.storage.local.get({'encrPasswd': []}, function(data){
		encrPasswd = data.encrPasswd;
	});
	
	if(encrPasswd==undefined){
		console.log("Set password Mode...");
		document.querySelector('.topic1').innerHTML = "Set Password" ;
		document.querySelector('.p1').innerHTML = "Enter your password : ";
		document.querySelector('.p2').innerHTML = "Re-enter your password :";
		document.querySelector('.p3').innerHTML = "Enter your password hint <strong class=\"inRed\">*</strong> :";
		document.querySelector('.magicbox').style.visibility = 'visible';
		document.querySelector('.ip3').type = 'text';
	}else{
		console.log("Change password mode");
		document.querySelector('.magicbox').style.visibility = 'hidden';
	}
	
	chrome.storage.local.get('pporte', function(data){
		timeOut =  data.pporte;
	});
	
	if(timeOut == undefined){
			timeOut = 5;
			chrome.storage.local.set({'pporte' : timeOut});
	}
	
	document.querySelector('.tm').innerHTML += tmString1 + timeOut + tmSting2;
	document.querySelector('.timeOut').value = timeOut;
});