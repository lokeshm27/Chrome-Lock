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
var numWhites = 0;

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
	
	chrome.storage.local.set({'yrueit': false});
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
					chrome.storage.local.set({'yrueit': false});
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
								
			case "codeWhite" : resp = onWhite(request, sender);
							   break;
		}
		sendResponse({methodReturn : resp});
});

function onWhite(request, sender){
	if(request.code = "248057"){
		onLock();
	}else{
		alert("Error - 607.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
	}
	
	return 0;
}

function onLock(){
	var f1 = false;
	var str = "Chrome Lock has locked your Browser.\n\nClick \"Ok\" and enter password to unlock your Browser.\nOR click \"Cancel\" to close browser.";
	for(i=0; i<loginTabs.length; i++){
		chrome.tabs.sendMessage(loginTabs[i].id, {method : "codeWhite", code : "248057"}, function(response){
			if(response.methodReturn != 0){
				alert("Error - 610.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
			}
		});
	}
	chrome.storage.local.get('uiower', function(d){
		if(d.uiower){
			str += "\n\nYou can use incognito window by Clicking : \n Ok -> Open incognito window.";
		}
		
		f1 = confirm(str);
		if(f1){
			for(i=0; i<loginTabs.length; i++){
				chrome.tabs.sendMessage(loginTabs[i].id, {method : "codeBlack", code : "248057"}, function(response){
					if(response.methodReturn != 0){
						alert("Error - 611.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
					}
				});
			}
		}else{
			ultraRed();
		}
	});
	
}

function ultraRed(){
	numWhites = 0;
	chrome.windows.getAll(function(arr){
		if(!arr.length == 0){
			for(i=0; i<arr.length; i++){
				chrome.windows.remove(arr[i].id);
			}
		}
	});
	return 0;
}

function reLockBrowser(request){
	var flag,tabId,winId,exactPage,index;
	exactPage = "chrome-extension://" + chrome.runtime.id + "/login.html";
	console.log("Working on closed tab");
	
	chrome.storage.local.get('yrueit', function (d){
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
							windowId : request.tab.windowId
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
								windowId : dat.windowId
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
					console.log(winArray);
					for(i = 0; i < winArray.length; i++){
						if(winArray[i].type == "normal"){
							if(!winArray[i].incognito){
								if(lockedWins.indexOf(winArray[i].id) == -1){
									chrome.tabs.create({
										url : loginPage,
										pinned : true,
										active : true,
										windowId : winArray[i].id,
										index : 0
									}, function (tab){
										loginTabs.push(tab);
										lockedWins.push(tab.windowId);
									});
								}
							}
						}
					}
					chrome.storage.local.set({'yrueit': true});
					onLock();
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
							windowId : win.id
						}, function (tab){
							loginTabs.push(tab);
							lockedWins.push(tab.windowId);
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