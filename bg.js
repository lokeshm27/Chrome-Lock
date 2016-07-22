var loginPage = "login.html";
var loginTabs = [];
var resp;
var lockedWins = [];
var hutoia;
var optionsPage = "options.html";
var randomDigs = [];
var encrPasswd;
var pfl = false;
var winArr;
var numWhites = 0;
var atConfirm = false;
var sitels = [];
var enaTM = true;
var exception = false,checkURL = false,currentOnly = true,lockOnIdle = true;
var DND = false;
var disabled = false;
var firstMessage = false;

document.addEventListener('DOMContentLoaded', function () {
	console.clear();
	console.log("Chrome Locker is in Action");
	
	chrome.browserAction.setBadgeBackgroundColor({"color": "#FF0000"});
	chrome.storage.local.get('bnmjkl', function(dd){
		if(dd.bnmjkl){
			enaTM = true;
			chrome.storage.local.get({'sitels': []}, function (data){
				if(data.seitels == undefined){
					sitels = ["youtube.com", "netflix.com", "vimeo.com"];
					chrome.storage.local.set({'sitels' : sitels});
				}else{
					if(data.sitels.length == 0){
						sitels = ["youtube.com", "netflix.com", "vimeo.com"];
						chrome.storage.local.set({'sitels' : sitels});
					}else{
						sitels = data.sitels.slice();
					}
				}
			
				chrome.storage.local.get('bnmghj', function (d){
					if(d.bnmghj == undefined){
						chrome.storage.local.set({'bnmghj' : false});
						exception = false;
					}else{
						exception = d.bnmghj;
					}
			
					chrome.storage.local.get('bnmfgh', function(d1){
						if(d1.bnmfgh == undefined){
							chrome.storage.local.set({'bnmfgh' : true});
							checkURL = false;
						}else{
							checkURL = !(d1.bnmfgh);
						}
				
						chrome.storage.local.get('bnmhjk', function(d2){
							if(d2.bnmhjk == undefined){
								chrome.storage.local.set({'bnmhjk' : true});
								currentOnly = true;
							}else{
								currentOnly = d2.bnmhjk;
							}
					
							if(exception){
								chrome.tabs.onUpdated.addListener(function (updatedTabId, changedInfo, updatedTab){
									if(!disabled){
										var negative = false;
										chrome.tabs.query({active: true}, function(actArr){
											if(currentOnly){
												if(!chrome.runtime.lastError){
													var isActive = false;
													var i;
													for(i = 0; i < actArr.length; i++){
														if(actArr[i].id == updatedTabId){
															isActive = true;
															break;
														}
													}
													if(!isActive){
														negative = true;
													}
												}
											}
							
											if(checkURL){
												var url = updatedTab.url;
												var domain = extractDomain(url);
												if(sitels.indexOf(domain) == -1){
													negative = true;
												}
											}
								
											if(changedInfo.audible){
												if(!negative){
													disabled = true;
													lockOnIdle = false;
													notify();
												}	
											}
										});
									}else{
										chrome.tabs.query({audible: true}, function(audArr){
											if(audArr.length == 0){
												disabled = false;
												lockOnIdle = true;
												unNotify();
											}else{
												if(currentOnly && checkURL){
													chrome.tabs.query({active : true, audible : true}, function(arr1){
														if(arr1.length == 0){
															disabled = false;
															lockOnIdle = true;
															unNotify();
														}else{
															var i;
															for(i = 0; i < arr1.length; i++){
																var domain = extractDomain(arr1[i].url);
																if(sitels.indexOf(domain) > -1){
																	break;
																}
															}
										
															if(i >= arr1.length){
																disabled = false;
																lockOnIdle = true;
																unNotify();
															}
														}
													});
												}else if(currentOnly){
													chrome.tabs.query({active : true, audible : true}, function(arr1){
														if(arr1.length == 0){
															disabled = false;
															lockOnIdle = true;
															unNotify();
														}	
													});
												}else{
													var i;
													for(i = 0; i < arr1.length; i++){
														var domain = extractDomain(arr1[i].url);
														if(sitels.indexOf(domain) > -1){
															break;
														}
													}
									
													if(i >= arr1.length){
														disabled = false;
														lockOnIdle = true;
														unNotify();
													}
												}
											}
										});
									}
								});
							}
					
						});
					});
				});
			});
		
		}else{
			enaTM = false;
		}
	});
	
	chrome.storage.local.get('hutoia', function(data){
		switch(data.hutoia){
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
		}
	});
	
	chrome.storage.local.get({'sitels': []}, function (data){
		if(data.seitels == undefined){
			sitels = ["youtube.com", "netflix.com", "vimeo.com"];
			chrome.storage.local.set({'sitels' : sitels});
		}else{
			if(data.sitels.length == 0){
				sitels = ["youtube.com", "netflix.com", "vimeo.com"];
				chrome.storage.local.set({'sitels' : sitels});
			}
		}
	});
	
	
});

function checkTab(tabId){
	var negative = false;
	chrome.tabs.get(tabId, function(tab){
		if(exception){
			if(!disabled){
				if(checkURL){
					var domain = extractDomain(tab.url);
					if(sitels.indexOf(domain) == -1){
						negative = true;
					}
				}
			
				chrome.tabs.query({active: true}, function(actArr){	
					if(currentOnly){
						if(!chrome.runtime.lastError){
							var isActive = false;
							var i;
							for(i = 0; i < actArr.length; i++){
								if(actArr[i].id == tab.id){
									isActive = true;
									break;
								}
							}
							if(!isActive){
								negative = true;
							}
						}
					}
			
					if(tab.audible){
						if(!negative){	
							lockOnIdle = false;
							notify();
							disabled = true;
						}
					}
			
				});
			}else{
				chrome.tabs.query({audible: true}, function(audArr){
					if(audArr.length == 0){
						disabled = false;
						lockOnIdle = true;
						unNotify();
					}else{
						if(currentOnly && checkURL){
							chrome.tabs.query({active : true, audible : true}, function(arr1){
								if(arr1.length == 0){
									disabled = false;
									lockOnIdle = true;
									unNotify();
								}else{
									var i;
									for(i = 0; i < arr1.length; i++){
										var domain = extractDomain(arr1[i].url);
										if(sitels.indexOf(domain) > -1){
											break;
										}
									}
									
									if(i >= arr1.length){
										disabled = false;
										lockOnIdle = true;
										unNotify();
									}
								}
							});
						}else if(currentOnly){
							chrome.tabs.query({active : true, audible : true}, function(arr1){
								if(arr1.length == 0){
									disabled = false;
									lockOnIdle = true;
									unNotify();
								}
							});
						}else{
							var i;
							for(i = 0; i < arr1.length; i++){
								var domain = extractDomain(arr1[i].url);
								if(sitels.indexOf(domain) > -1){
									break;
								}
							}
									
							if(i >= arr1.length){
								disabled = false;
								lockOnIdle = true;
								unNotify();
							}
						}
					}
				});
			}
		}
	});	
}

chrome.notifications.onButtonClicked.addListener(function(id, buttonIndex){
	chrome.notifications.clear("autoOff");
	if(buttonIndex == 1){
		DND = true;
	}
});

function notify(){
	chrome.browserAction.setBadgeText({"text": "A"});
	chrome.browserAction.setTitle({"title": "Chrome Lock.\nAuto Lock disabled."});
	if(!DND){
		var str1 = "At this time, Conditions you specified matches, Therefore chrome lock will not automatically lock you browser\nA red 'A' is shown on the icon of Chrome Lock indicating that Auto Lock is disabled.";
		chrome.notifications.create("autoOff", {
			"type" : "basic",
			"iconUrl" : "/Images/icon128.png",
			"title" : "Chrome Lock : Auto Lock Disabled",
			"message" : "Automatic lock due to inactivity is disabled for now.",
			"contextMessage" : str1,
			"buttons" : [{"title": "OK"}, {"title" : "Don't show this message again."}],
			"isClickable" : false
		});
	}
}

function unNotify(){
	chrome.browserAction.setTitle({"title": "Chrome Lock."});
	chrome.browserAction.setBadgeText({"text": ""});
	chrome.notifications.clear("autoOff");
}

function extractDomain(url) {
    var domain;
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }
    
	domain = domain.split(':')[0];
	if(domain.split('.').length > 2){
		var splitArr = domain.split('.');
		domain = splitArr[splitArr.length - 2] + '.' + splitArr[splitArr.length - 1]; 
	}
	
	return domain;
}

chrome.runtime.setUninstallURL("http://www.chromelock.comxa.com/uninstallFeedback.php");

chrome.runtime.onSuspend.addListener(function(){
	chrome.storage.local.get('hutoia', function(data){
		if(data.hutoia == true){
			chrome.storage.local.set({'hutoia': false});
		}
	})
	chrome.storage.local.set({'yrueit': false});
});

chrome.runtime.onInstalled.addListener(function (details){
	chrome.storage.local.get({'randomDigs': []}, function (data){
		if(data.randomDigs.length == 0){
			var i;
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
			console.log("Only one window. Locking");
			chrome.storage.local.set({'yrueit' : false});
			chrome.storage.local.get('hutoia', function(data){
				if(data.hutoia == undefined){
					//set hutoia key
					chrome.storage.local.set({'hutoia' : false});
		
					//check if password is set, If yes, Lock browser.
					chrome.storage.local.get({'encrPasswd' : []}, function (data){
						if(!(data.encrPasswd.length == 0)){
							console.log("Locking Browser.!");
							lockBrowser({'method': "codeRed", 'code': "248057"});
						}
					});
				}else if(data.hutoia == false){
					console.log("Locking");
					chrome.storage.local.set({'yrueit': false});
					lockBrowser({'method': "codeRed", 'code': "248057"});
				}else{
					console.log("Locking");
					chrome.storage.local.set({'yrueit': false});
					chrome.storage.local.set({'hutoia': false});
					lockBrowser({'method': "codeRed", 'code': "248057"});
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

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	console.log("Message recieved : " + request.method);
	if(sender.id == chrome.runtime.id){
		switch(request.method){
			case "codeRed" : resp = reLockBrowser(request);
							 break;
							 
			case "codeGreen" : resp = unLockBrowser(request);
							   break;
							   
			case "codeYellow" : resp = lockBrowser(request);
								break;
								
			case "codeWhite" : resp = onWhite(request, sender);
							   break;
							   
			case "validate" : resp = validateTab(request);
							  break;
		}
		sendResponse({methodReturn : resp});
	}else{
		sendResponse({methodReturn : null});
	}
});

function validateTab(request){
	if(request.code == "248057"){
		if(loginTabs == null){
			return false;
		}else{
			var i;
			for(i = 0; i < loginTabs.length; i++){
				if(loginTabs[i].id == request.tabId){
					return true;
				}
			}
			return false;
		}
	}else{
		alert("Error - 613.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
		return false;
	}
}

function onWhite(request, sender){
	if(request.code = "248057"){
		onLock();
	}else{
		alert("Error - 607.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
	}
	
	return 0;
}

function onLock(){
	atConfirm = true;
	var f1 = false;
	var i;
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
			var i;
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
	
	atConfirm = false;
	
}

function ultraRed(){
	numWhites = 0;
	chrome.windows.getAll(function(arr){
		if(!arr.length == 0){
			var i;
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
					console.log("Tab still exists, Checking URL");
					if(dat.url == exactPage){
						console.log("Same URL, Page reloaded.!");
						//Page reloaded. Dont Worry.!
						//Do nothing
					}else{
						console.log("URL changed.");
						index = loginTabs.indexOf(dat);
						loginTabs.slice(index, 1);
						//chrome.tabs.remove(tabId);
						chrome.tabs.update({
								url : loginPage,
								pinned : true,
								active : true,
								//windowId : dat.windowId
							}, function (t1){
								//loginTabs.push(t1);
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
	
	chrome.storage.local.set({'hutoia' : false});
	if(request.code != "248057" ){
		alert("Error code : 601.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
		return -1;
	}else{
		chrome.storage.local.get('yrueit', function(d){
			if(d.yrueit){
				//Already under lockdown,
			}else{
				chrome.windows.getAll(function(winArray){
					var i;
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
					setTimeout(onLock, 500);
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
							if(atConfirm){
								chrome.tabs.sendMessage(tab.id, {method : "codeWhite", code : "248057"}, function(response){
									if(response.methodReturn != 0){
										alert("Error - 611.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
									}
								});
							}
						});
					}
				}
			}	
		}
	});
}

function unLockBrowser(request){
	if(request.code == "248057"){
		if(unLockBrowser.caller != null){
			var tabs = loginTabs;
			loginTabs = [];
			lockedWins = [];
			var i;
			for(i=0; i < tabs.length; i++){
				chrome.tabs.remove(tabs[i].id, function (info){
					if(chrome.runtime.lastError){
				
					}
				});
			}
	
			chrome.storage.local.set({'hutoia': true});
			chrome.storage.local.set({'yrueit': false});
			return 0;
		}else{
			setTimeout(smartGuy, 3000);
			alert("You are smart, But not smart enough.!\nDon't forget to check the console.!");
			return "Want to work for me?";
		}
	}else{
		alert("Error - 614.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
	}
}

function smartGuy(){
	chrome.windows.getAll(function(arr){
		if(!arr.length == 0){
			var i;
			for(i=0; i<arr.length; i++){
				chrome.windows.remove(arr[i].id);
			}
		}
	});
}


chrome.windows.onFocusChanged.addListener(function (windowId) {
	if(windowId != -1){
		chrome.storage.local.get('yrueit', function (d){
			if(d.yrueit){
				chrome.storage.local.get('uiower', function(d1){
					if(!(d1.uiower)){
						chrome.windows.get(windowId, function (w) {
							if(w.incognito || (lockedWins.indexOf(windowId) == -1)){
								chrome.windows.update(w.id,{state: "minimized"}, function (t){
									if(chrome.runtime.lastError){
										alert("Error - 612.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
									}
								});
							}
						});
					}
				});	
			}
		});
	}
});

chrome.tabs.onActivated.addListener(function(activeInfo){
	checkTab(activeInfo.tabId);
	if (loginTabs != null) {
		var i;
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

function contextClick(info, tab){
	lockBrowser({code : "248057"});
}
chrome.storage.local.get('pporte', function (d){
	chrome.idle.setDetectionInterval(d.pporte * 60);
});

chrome.idle.onStateChanged.addListener(function (newState){
	console.log("StateChanged = " + newState);
	chrome.idle.onStateChanged.removeListener();
	switch(newState){
		case "locked" : lockBrowser({code : "248057"});
						break;
		case "idle" : if(enaTM){
						idleStateHandler();
					  }
					  break;
		case "active" : //do Nothing.!
	}
});

function idleStateHandler(){
	if(lockOnIdle){
		lockBrowser({code : "248057"});
	}
}

chrome.contextMenus.create({
	"title" : "Lock Now",
    "contexts" : ["all"],
	"onclick" : contextClick });