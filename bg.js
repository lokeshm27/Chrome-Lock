var i,j;
var lastActive = new Date();
var loginPage = "login.html";
var loginTabs = [];
var attempts = 0;
var resp;
var lockedWins = [];
var hutoia;
var optionsPage = "options.html";

document.addEventListener('DOMContentLoaded', function () {
	console.clear();
	console.log("Chrome Locker is in Action");
	onInit();
});

chrome.runtime.onInstalled.addListener(function (details){
	chrome.local.storage.get({'encrPasswd' : []}, function (data){
		if(data.encrPasswd == undefined){
			chrome.tabs.create({
				url: optionsPage;
				active: true;
				pinned: false;
			});
		}
	});
});

function onInit(){
	chrome.storage.local.get('hutoia', function(data){
		hutoia = data.hutoia;
	});
	
	if(hutoia ==  undefined){
		//set hutoia key
		chrome.storage.local.set({'hutoia' : false});
	}else if(hutoia == false){
		console.log("Locking");
		lockBrowser();
	}else{
		timeoutHandler();
	}
}

chrome.windows.onCreated.addListener(function() {
	onInit();
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
               chrome.tabs.update(loginTabs[i].id, { active : true } );
             }
         }         
     } 
});