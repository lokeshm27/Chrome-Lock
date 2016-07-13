'use strict';

var incog = false;
var data1,passwd,encrPasswd = [],passwdLength,i,j,u,randomDigs = [],charPasswd = [];
var startRandomDigs,numRandomDigs;
var veryImpFlag = false;
var flg1 = false;
var body,win;
var adp = false;
var notImpFlag = false;
var ele;

document.addEventListener('DOMContentLoaded', function () {
	console.clear();
	console.log("login.js loaded");
	
	body = document.querySelector('.bd');
	ele = document.querySelector('.ip');
	document.querySelector('.bt1').addEventListener("click", subclick);
	document.querySelector('.bt2').addEventListener("click", forclick);
	document.querySelector('.bt3').addEventListener("click", latclick);
	document.querySelector('.incog').addEventListener("click", incogclk);
	
	ele.addEventListener("keypress", function(e){
		if(e.keyCode == 13){
			subclick();
		}
	});
	
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
	
	chrome.storage.local.get('tyudfg', function (d){
		adp = d.tyudfg;
	});
	
	onLoad();
});

window.onbeforeunload = sendM;

function onLoad(){
	body.style.visibility = 'hidden';
	notImpFlag = confirm("Chrome Lock has locked this window.!\n\nClick \"ok\" and enter password to unlock.\nClick \"cancel\" to close ALL windows.");
	if(notImpFlag){
		unlockHandler();
	}else{
		exit();
	}
}

function latclick(){
	if(adp){
		chrome.alarms.clearAll(function(fl){
			chrome.windows.update(win.id, {state: 'maximized'});
			if(!fl){
				alert("Error - 604.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
			}
		});
	}
	onLoad();
}

function unlockHandler(){
	chrome.windows.getCurrent(function(w){
		win = w;
		body.style.visibility = 'visible';
		ele.focus();
		if(adp){
			chrome.windows.update(win.id, {state: 'fullscreen'});
			chrome.alarms.create("checkMax", {when: Date.now() + 100, periodInMinutes: 0.00166667});
			chrome.alarms.onAlarm.addListener(function(alarm){
				if(win.state != 'minimized' || 'fullscreen'){
					chrome.windows.update(win.id, {state: 'fullscreen'});
				}
			});
		}
	});
}

function exit(){
	chrome.runtime.sendMessage({method : "codeUltraRed", code : "248057"}, function(response){
		if(response.methodReturn == 0){
			veryImpFlag = true;
			window.close();
		}else{
			alert("Error - 603.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
			window.close();
		}
	});
}

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
				charPasswd = [];
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
					veryImpFlag = true;
					if(adp){
						chrome.alarms.clearAll(function(fl){
							chrome.windows.update(win.id, {state: 'maximized'});
							if(!fl){
								alert("Error - 604.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
							}
						});
					}
					chrome.runtime.sendMessage({method : "codeGreen", code: "248057"},
					function(response){
						if(response.methodReturn == 0){
							window.close();
						}else{
							alert("Error - 602.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
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
	if(!veryImpFlag){
		chrome.tabs.getCurrent(function (Tab){
			chrome.runtime.sendMessage({method : "codeRed", code : "248057", tab : Tab},
			function(response){
				if(response.methodReturn == 0){
					// Do Nothing
				}
			});
		});
		return null;
	}
}
