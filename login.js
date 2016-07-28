var incog = false;
var data1,encrPasswd = [],passwdLength,i,j,u,randomDigs = [];
var startRandomDigs,numRandomDigs;
var adp = false;
var ele;
var test;

document.addEventListener('DOMContentLoaded', function () {
	console.clear();
	console.log("login.js loaded");
	
	chrome.storage.local.get({'encrPasswd' : []}, function(d){
		if(d.encrPasswd == undefined){
			chrome.tabs.create({
				url : "options.html",
				active : true
			});
			chrome.runtime.sendMessage({method : "codeGreen", code : "248057"},function(response){
				if(response.methodReturn != 0){
					alert("Error - 602.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
				}
			});
		}else{
			if(d.encrPasswd.length == 0){
				chrome.tabs.create({
					url : "options.html",
					active : true
				});
				chrome.runtime.sendMessage({method : "codeGreen", code : "248057"},function(response){
					if(response.methodReturn != 0){
						alert("Error - 602.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
					}
				});
			}
		}
	});
	
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
		if(d.tyudfg == undefined){
			chrome.storage.local.set({'tyudfg' : false});
			adp = false;
		}else{
			adp = d.tyudfg;
		}
	});
	
	validate();
});

function validate(){
	chrome.windows.getCurrent(function(w){
		chrome.runtime.sendMessage({method : "validate", code : "248057", windowId : w.id}, function(resp){
			if(resp.methodReturn == false){
				window.close();
			}else{
				console.log("Tab Validated successfully.");
				window.onbeforeunload = sendM;
				if(adp){
					document.querySelector('.or').style.visibility = "hidden";
					document.querySelector('.unADP').innerHTML = "<center><p class=\"inRed\">You have to unlock now, Advanced Protection enabled</p></center>";
					window.onblur = ultraRed;
				}
			}
		});
	});
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
					chrome.storage.local.set({'hutoia': true});
					chrome.storage.local.set({'yrueit': false});
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

window.addEventListener("resize", function(){
	chrome.runtime.sendMessage({method : "codeBrown", code : "248057"}, function(response){
		if(response.methodReturn != 0){
			alert("Error - 615.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
		}
	});
});

window.addEventListener("contextmenu",function(e){
	e.preventDefault();
});

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

function ultraRed(){
	chrome.runtime.sendMessage({method : "codeUltraRed", code : "248057"}, function(response){
				if(response.methodReturn == 0){
			// Do Nothing
		}
	});
	window.close();
	return null;
}

function sendM(){
	chrome.runtime.sendMessage({method : "codeRed", code : "248057"},function(response){
		if(response.methodReturn == 0){
			// Do Nothing
		}
	});
	return null;
}