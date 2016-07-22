'use strict';

var incog = false;
var data1,encrPasswd = [],passwdLength,i,j,u,randomDigs = [];
var startRandomDigs,numRandomDigs;
var veryImpFlag = false;
var flg1 = false;
var body,win;
var adp = false;
var notImpFlag = false;
var ele;
var alarmSet = false;

document.addEventListener('DOMContentLoaded', function () {
	console.clear();
	console.log("login.js loaded");
	
	validate();
	body = document.querySelector('.bd');
	ele = document.querySelector('.ip');
	document.querySelector('.bt1').addEventListener("click", subclick);
	document.querySelector('.bt2').addEventListener("click", forclick);
	document.querySelector('.bt3').addEventListener("click", latclick);
	document.querySelector('.incog').addEventListener("click", incogclk);
	
	ele.focus();
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
		console.log(adp);
	});
	
	chrome.windows.getCurrent(function(w){
		win = w;
	});
	
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	var resp;
	console.log("Message recieved : " + request.method);
	switch(request.method){
		case "codeBlack" : resp = onBlack(request);
						    break;
							
		case "codeWhite"  : resp = onWhite(request);
							break;
	}
	sendResponse({methodReturn : resp});
});
});

window.onbeforeunload = sendM;

function validate(){
	chrome.tabs.getCurrent(function(tab){
		chrome.runtime.sendMessage({method : "validate", code : "248057", tabId : tab.id}, function(resp){
			if(resp.methodReturn == false){
				window.close();
			}else{
				console.log("Tab Validated successfully.");
			}
		});
	});
}

function onBlack(request){
	console.log("Black");
	if(request.code == "248057"){
		body.style.visibility = 'visible';
		ele.focus();
		
		if(adp){
			alarmSet = true;
			chrome.windows.update(win.id, {state: 'fullscreen'});
			chrome.alarms.create("checkMax", {when: Date.now() + 100, periodInMinutes: 0.00166667});
			chrome.alarms.onAlarm.addListener(function(alarm){
				if(win.state != 'minimized' || 'fullscreen'){
					chrome.windows.update(win.id, {state: 'fullscreen'});
				}
			});
		}
	}else{
		alert("Error - 604.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
	}
	
	return 0;
}

function onWhite(request){
	console.log("White");
	if(request.code == "248057"){
		body.style.visibility = 'hidden';
		if(adp){
			if(alarmSet){
			chrome.alarms.clear("checkMax", function(fl){
					chrome.windows.update(win.id, {state: 'maximized'});
					if(!fl){
						alert("Error - 604.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
					}
				});
			}
		}
	}else{
		alert("Error - 604.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
	}
	
	return 0;
}

function latclick(){
	chrome.runtime.sendMessage({method : "codeWhite", code : "248057"}, function(response){
		if(response.methodReturn != 0){
			alert("Error - 609.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
		}
	});
}

function shake(e, oncomplete, distance, time) {
    if (typeof e === "string") e = document.getElementById(e);
    if (!time) time = 500;
    if (!distance) distance = 5;

    var originalStyle = e.style.cssText;
    e.style.position = "relative";
    var start = (new Date()).getTime();
    animate();

    function animate() {
        var now = (new Date()).getTime();
        var elapsed = now-start;
        var fraction = elapsed/time;
        
        if (fraction < 1) {
            var x = distance * Math.sin(fraction*4*Math.PI);
            e.style.left = x + "px";
            setTimeout(animate, Math.min(25, time-elapsed));
        }
        else {
            e.style.cssText = originalStyle
            if (oncomplete) oncomplete(e);
        }
    }
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function subclick(){
	var ip,passwd,charPasswd = [];
	ip = document.querySelector('.ip');
	data1 = ip.value;
	
	if(data1.length == 0){
		ip.style.borderColor = "#FF3333";
		ip.style.boxShadow = "0 0 7px #FF3333";
		alert("Password can not be empty.!");
		shake(ip);
		ele.focus();
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
							//window.close();
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
