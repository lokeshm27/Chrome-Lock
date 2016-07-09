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
});

function randomChar(){
	 var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	 return (possible.charAt(Math.floor(Math.random() * possible.length)));
}

chrome.windows.onCreated.addListener(function() {
	chrome.storage.local.get('hutoia', function(data){
		hutoia = data.hutoia;
		console.log(data.hutoia);
	});
	
	if(hutoia==undefined){
		//set hutoia key
		chrome.storage.local.set({'hutoia' : false});
		
		//check if password is set, If yes, Lock browser.
		chrome.storage.local.get({'encrPasswd' : []}, function (data){
			encrPasswd = data.encrPasswd;
		});
		if(!(encrPasswd == undefined)){
			console.log("Locking Browser.!");
			lockBrowser({'method': "codeRed", 'code': "248057"});
		}
		
	}else if(hutoia==false){
		console.log("Locking");
		lockBrowser({'method': "codeRed", 'code': "248057"});
	}else{
		timeoutHandler();
	}
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
		}
		sendResponse({methodReturn : resp});
});

	
function lockBrowser(request){
	console.log("Working on it.");
	
	if(request.code != "248057" ){
		prompt("Runtime Error.! Error code : 601, Please report.!");
		return -1;
	}else{
		chrome.windows.getAll(function(winArray){
			for(i = 0; i < winArray.length; i++){
				if(winArray[i].type == "normal"){
					if(!winArray[i].incognito){
						if(lockedWins.indexOf(winArray[i].Id) == -1){
							chrome.tabs.create({
								url : loginPage,
								pinned : false,
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
		});
		return 0;
	}
}

function unLockBrowser(request){
	return 0;
}


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