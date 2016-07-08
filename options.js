var tmString1 = "Chrome Lock will automatically lock your browser after "
var timeOut;
var tmSting2 = "mins of Inactivity. Minimum = 2mins. Maximum = 30mins. <br /> <strong>Note: </strong>This option is still in beta-stage. May not work perfectly.</strong>"
var encrPasswd = [];
var mode;
var ip1,ip2,ip3,bt1,bt2,bt3,cb1,tm1;

document.addEventListener('DOMContentLoaded', function(){
	ip1 = document.querySelector('.ip1');
	ip2 = document.querySelector('.ip2');
	ip3 = document.querySelector('.ip3');
	bt1 = document.querySelector('.bt1');
	cb1 = document.querySelector('.cb1');
	tm1 = document.querySelector('.timeOut');
	bt2 = document.querySelector('.ftbt1');
	bt3 = document.querySelector('.ftbt2');
	console.clear();
	console.log("options.js loaded");
	chrome.storage.local.get({'encrPasswd': []}, function(data){
		encrPasswd = data.encrPasswd;
	});
	
	if(encrPasswd.length == 0){
		mode="set";
		console.log("Set password Mode...");
		document.querySelector('.topic1').innerHTML = "Set Password" ;
		document.querySelector('.p1').innerHTML = "Enter your password : ";
		document.querySelector('.p2').innerHTML = "Re-enter your password :";
		document.querySelector('.p3').innerHTML = "Enter your password hint <strong class=\"inRed\">*</strong> :";
		document.querySelector('.magicbox').style.visibility = 'visible';
		document.querySelector('.ip3').type = 'text';
	}else{
		mode="change";
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
	
	ip1.addEventListener("keypress", function(e){
		if(e.keyCode == 13){
			kpress();
		}
	});
	ip2.addEventListener("keypress", function(e){
		if(e.keyCode == 13){
			kpress();
		}
	});
	ip3.addEventListener("keypress", function(e){
		if(e.keyCode == 13){
			kpress();
		}
	});
	
	bt1.addEventListener('click', bt1cl);
	bt2.addEventListener('click', bt2cl);
	bt3.addEventListener('click', bt3cl);
});

function kpress(){
	var data1,data2,data3;
	bt1cl();
}

function bt1cl(){
	alert("Button 1");
}

function bt2cl(){
	alert("Button 2");
}

function bt3cl(){
	alert("Button 3");
}