var i,j;
var lastActive = new Date();
var loginPage = "login.html";
var loginTabs = [];
var attempts = 0;
var resp;
var lockedWins = [];
var hutoia;
var optionsPage = "options.html";
var randomDigs = [];
var i;
var encrPasswd;
var pfl = false;
var winArr;

document.addEventListener('DOMContentLoaded', function () {
	console.clear();
	console.log("Chrome Locker is in Action");
	chrome.storage.local.get('hutoia', function(data){
		hutoia = data.hutoia;
	});
	switch(hutoia){
		case undefined :    //check if password is set, If yes, Lock browser.
							console.log("Case : Undefined.")
							chrome.storage.local.get({'encrPasswd' : []}, function (data){
								if(!(data.encrPasswd.length == 0)){
									console.log("Locking Browser.!");
									lockBrowser({'method': "codeRed", 'code': "248057"});
									chrome.storage.local.set({'hutoia' : false});
								}
							});
							break;
							
		case false :  	console.log("Case: flase\nLocking..");
						lockBrowser({'method': "codeRed", 'code': "248057"});
						break;
						
		case true : console.log("case : true"); 
					//timeoutHandler();
	}
});

window.onbeforeunload = function(){
	chrome.storage.local.get('hutoia', function(data){
		if(data.hutoia == true){
			chrome.storage.local.set({'hutoia': false});
		}
	})
	chrome.storage.local.set({'yrueit': false});
}

chrome.runtime.onInstalled.addListener(function (details){
	var flag = false;
	flag = confirm("Thanks for Choosing Chrome Lock v1.0\n\nPlease take a moment and allow this extension in incognito mode for better performance.!\nWould you like to enable it now?");
	if(flag){
		var newURL = "chrome://extensions/?id=" + chrome.runtime.id;
		chrome.tabs.create({url : newURL});
	}
	chrome.storage.local.get({'randomDigs': []}, function (data){
		if(data.randomDigs.length==0){
			console.log("Generating random Numbers.!");
			for(i=0;i<=50;i++){
				num = Math.floor((Math.random() * 3 ) + 1); 
				randomDigs.push(num);
			}
			chrome.storage.local.set({'randomDigs' : randomDigs });
			console.log("Random Numbers Generated.!");
		}
	});
	
	chrome.storage.local.get({'encrPasswd' : []}, function (data){
		if(data.encrPasswd.length == 0){
			chrome.tabs.create({
				url: optionsPage,
				active: true,
				pinned: false
			});
		}
	});
});

function randomChar(){
	 var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	 return (possible.charAt(Math.floor(Math.random() * possible.length)));
}

chrome.windows.onCreated.addListener(function(win) {
	chrome.windows.getAll(function(winArr){
		if(winArr.length == 1){
			chrome.storage.local.get('hutoia', function(data){
				if(data.hutoia==undefined){
					//set hutoia key
					chrome.storage.local.set({'hutoia' : false});
		
					//check if password is set, If yes, Lock browser.
					chrome.storage.local.get({'encrPasswd' : []}, function (data){
						if(!(data.encrPasswd.length == 0)){
							console.log("Locking Browser.!");
							lockBrowser({'method': "codeRed", 'code': "248057"});
						}
					});
				}else if(data.hutoia==false){
					console.log("Locking");
					lockBrowser({'method': "codeRed", 'code': "248057"});
				}else{
					//timeoutHandler();
				}
			});
		}else{
			// new window created.!
			chrome.storage.local.get('hutoia', function(data){
				if(data.hutoia==undefined){
					//set hutoia key
					chrome.storage.local.set({'hutoia' : false});
		
					//check if password is set, If yes, Lock browser.
					chrome.storage.local.get({'encrPasswd' : []}, function (data){
						if(!(data.encrPasswd.length == 0)){
							console.log("Locking Browser.!");
							lockNewWindow(win);
						}
					});
				}else if(data.hutoia==false){
					console.log("Locking");
					lockNewWindow(win);
				}else{
					//timeoutHandler();
				}
			});
		}
	});
	
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		console.log("Message recieved : " + request.method); 
		switch(request.method){
			
			case "codeRed" : resp = reLockBrowser(request);
							 break;
							 
			case "codeGreen" : resp = unLockBrowser(request);
							   break;
							   
			case "codeYellow" : resp = lockBrowser(request);
								break;
								
			case "codePurple" : resp = onPurple();
								break;
		}
		sendResponse({methodReturn : resp});
});

function onPurple(){
	alert("Dont try anything smart. Please click on \"ok\" and enter password");
	return 0;
}

function reLockBrowser(request){
	var flag,tabId,winId,exactPage,index;
	exactPage = "chrome-extension://" + chrome.runtime.id + "/login.html";
	
	console.log("Working on closed tab");
	
	chrome.storage.local.get('yrueit', function (d){
		console.log(d.yrueit);
		if(d.yrueit){
			console.log("Under LockDown.!");
			tabId = request.tab.id;
			console.log(tabId);
			chrome.tabs.get(tabId, function (dat){
				if(chrome.runtime.lastError){
					// tab closed, Reopen
					console.log("Tab closed, Re-opening.");
					index = loginTabs.indexOf(dat);
					loginTabs.slice(index, 1);
					chrome.tabs.create({
							url : loginPage,
							pinned : true,
							active : true,
							windowId : request.tab.windowId,
						}, function (t1){
						loginTabs.push(t1);
					});
				}else{
					// Tab till exists. check url
					if(dat.url == exactPage){
						//Page reloaded. Dont Worry.!
						//Do nothing
					}else{
						index = loginTabs.indexOf(dat);
						loginTabs.slice(index, 1);
						chrome.tabs.remove(tabId);
						chrome.tabs.create({
								url : loginPage,
								pinned : true,
								active : true,
								windowId : dat.windowId,
							}, function (t1){
							loginTabs.push(t1);
						});
					}
				}
			});
		}
	});
	return 0;
}

	
function lockBrowser(request){
	console.log("Working on it.");
	
	if(request.code != "248057" ){
		prompt("Error code : 601.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
		return -1;
	}else{
		chrome.storage.local.get('yrueit', function(d){
			if(d.yrueit){
				//Already under lockdown,
			}else{
				chrome.windows.getAll(function(winArray){
					for(i = 0; i < winArray.length; i++){
						if(winArray[i].type == "normal"){
							if(!winArray[i].incognito){
								if(lockedWins.indexOf(winArray[i].Id) == -1){
									chrome.tabs.create({
										url : loginPage,
										pinned : true,
										active : true,
										windowId : winArray[i].Id,
									}, function (tab){
										loginTabs.push(tab);
										lockedWins.push(tab.windowId);
									});
								}
							}
						}
					}
					chrome.storage.local.set({'yrueit': true});
				});
			}
		});
		return 0;
	}
}

function lockNewWindow(win){
	chrome.storage.local.get('yrueit', function(d){
		if(d.yrueit == true){
			if(win.type == "normal"){
				if(!win.incognito){
					if(lockedWins.indexOf(win.Id) == -1){
						chrome.tabs.create({
							url : loginPage,
							pinned : true,
							active : true,
							windowId : win.Id,
						}, function (tab){
							loginTabs.push(tab);
							lockedWins.push(tab.windowInfo.id);
						});
					}
				}
			}	
		}
	});
}

function unLockBrowser(request){
	var tabs = loginTabs;
	loginTabs = [];
	for(i=0; i < tabs.length; i++){
		chrome.tabs.remove(tabs[i].id);
	}
	
	chrome.storage.local.set({'hutoia': true});
	chrome.storage.local.set({'yrueit': false});
	return 0;
}

chrome.windows.onFocusChanged.addListener(function (windowId) {
	if(windowId != -1){
		chrome.storage.local.get('yrueit', function (d){
			if(d.yrueit){
				chrome.storage.local.get('uiower', function(d1){
					if(!(d1.uiower)){
						chrome.windows.get(windowId, function (win) {
							if (win.incognito) {
								chrome.windows.update(win.id, { state : "minimized" } );
							}
						});
					}
				});	
			}
		});
	}
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    lastActive = new Date();
	if (loginTabs != null) {
		for(i = 0; i < loginTabs.length; i++) {
			if(activeInfo.tabId == loginTabs[i].id) {
				return;
			}
		}
			
		for(i=0;i<loginTabs.length;i++) {
			if(activeInfo.windowId == loginTabs[i].windowId) {
				chrome.tabs.update(loginTabs[i].id, { active : true }, function(){
					if(chrome.runtime.lastError){
						// Login tab closed, Let the other thing handle this suitiation.!
					}
				});
			}
		}         
	}
});