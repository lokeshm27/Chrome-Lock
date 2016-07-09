var incog = false;
var data1,passwd,encrPasswd = [],passwdLength,i,j,u,randomDigs = [],charPasswd = [];
var startRandomDigs,numRandomDigs;

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
	});
	
	chrome.storage.local.get({'encrPasswd': []}, function(data){
		encrPasswd = data.encrPasswd.slice();
	});
	
	chrome.storage.local.get({'randomDigs': []}, function(data){
		randomDigs = data.randomDigs.slice();
	});
});

window.onbeforeunload = sendM;

function subclick(){
	var ip = document.querySelector('.ip');
	data1 = ip.value;
	
	if(data1.length == 0){
		alert("Password can not be empty.!");
	}else{
		chrome.storage.local.get('bhfyda', function (dat1){
			passwdLength = dat1.bhfyda;

			chrome.storage.local.get('hyskal', function (data){
				numRandomDigs = passwdLength + 1;
				j=0;
				u=0;
				startRandomDigs = data.hyskal;
				for(i=startRandomDigs; i<(startRandomDigs + numRandomDigs);i++){
					if(u == 0){
						j += (randomDigs[i]-1);
					}else{
						j += randomDigs[i];
					}
					if(u<passwdLength){
						charPasswd.push(encrPasswd[j]);
						u++;
					}
				}
				passwd = charPasswd.join("");
				
				if(data1 != passwd){
					alert("Password incorrect.!");
					ip.value = "";
				}else{
					chrome.runtime.sendMessage({method : "codeGreen", code: "248057"},
					function(response){
						if(response.methodReturn == 0){
							window.close();
						}else{
							alert("Error - 602.\nSorry for inconvenience. Please Report the problem.!");
						}
					});
				}
			});
		});
	}
}

function forclick(){
	chrome.storage.local.get('aspire', function(d){
		if(d.aspire){
			chrome.storage.local.get('hint', function(d1){
				alert("Password hint : \n" + d1.hint);
			});
		}else{
			alert("Sorry, Password hint is not set.");
		}
	});
}

function incogclk(){
	if(incog){
		chrome.windows.create({"incognito": true, "state": "maximized"});
	}
}

function sendM(){
	chrome.runtime.sendMessage({method : "codeRed", code : "248057"},
		function(response){
			if(response.methodReturn == 0){
				// Do Nothing
			}
		});
		return null;
}
