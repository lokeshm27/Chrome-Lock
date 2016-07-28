var loginPage = "login.html";
var optionsPage = "options.html";
var resp, attempt = 3;
var ID,randomDigs = [], encrPasswd = [], sitels = [];
var enaTM = true,exception = false,checkURL = false,currentOnly = true,lockOnIdle = true;
var DND = false,disabled = false;

document.addEventListener('DOMContentLoaded', function(){
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
										console.log("UP : disabled = false");
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
										console.log("UP : disabled = true");
										chrome.tabs.query({audible: true}, function(audArr){
											if(audArr.length == 0){
												console.log("UP : No audible tabs found");
												disabled = false;
												lockOnIdle = true;
												unNotify();
											}else{
												console.log("UP : Audible tabs found");
												if(currentOnly && checkURL){
													console.log("UP : currentOnly && checkURL");
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
													console.log("UP : currentOnly");
													chrome.tabs.query({active : true, audible : true}, function(arr1){
														if(arr1.length == 0){
															disabled = false;
															lockOnIdle = true;
															unNotify();
														}	
													});
												}else if(checkURL){
													console.log("UP : checkURL");
													chrome.tabs.query({audible : true}, function(arr1){
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
													});
												}else{
													chrome.tabs.query({audible : true}, function(Arr){
														if(Arr.length == 0){
															disabled = false;
															lockOnIdle = true;
															unNotify();
														}
													});
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
						
			case true : //Do nothing.
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

chrome.windows.onCreated.addListener(function(win){
	chrome.windows.getAll(function(Arr){
		if(Arr.length == 1){
			chrome.storage.local.set({'hutoia' : false});
			lockBrowser({code : "248057"});
		}
	});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	console.log("Message recieved : " + request.method);
	switch(request.method){
		case "codeYellow" : resp = lockBrowser(request);
							break;
							
		case "codeBrown" : resp = onBrown(request);
							break;
							
		case "codeGreen" : resp = unLockBrowser(request);
							break;
		
		case "codeRed" : resp = reLockBrowser(request);
						break;
						 
		case "validate" : resp = validate(request);
						break;
							
		case "codeWhite" : resp = onWhite(request);
							break;
							
		case "codeUltraRed" : resp = onUltraRed(request);
								break;
	}
	sendResponse({methodReturn : resp});
});

chrome.runtime.onSuspend.addListener(function(){
	chrome.storage.local.get('hutoia', function(data){
		if(data.hutoia == true){
			chrome.storage.local.set({'hutoia': false});
		}
	});
	chrome.storage.local.set({'yrueit': false});
});

chrome.tabs.onActivated.addListener(function(activeInfo){
	var negative = false;
	chrome.tabs.get(activeInfo.tabId, function(tab){
		if(!chrome.runtime.lastError){
			if(exception){
				if(!disabled){
					if(checkURL){
						var domain = extractDomain(tab.url);
						if(sitels.indexOf(domain) == -1){
							negative = true;
						}
					}
					
					if(currentOnly){
						if(!tab.active){
							negative = true;
						}
					}
					
					if(tab.audible){
						if(!negative){
							lockOnIdle = false;
							disabled = true;
							notify();
						}
					}
				}else{
					console.log("Break point 1 : disabled = true");
					chrome.tabs.query({audible: true}, function(audArr){
						if(audArr.length == 0){
							console.log("No audible tabs");
							lockOnIdle = true;
							disabled = false;
							unNotify();
						}else{
							console.log("Audible tabs found");
							if(currentOnly && checkURL){
								console.log("currentOnly && checkURL");
								chrome.tabs.query({active: true, audible: true},function(Arr1){
									if(Arr1.length == 0){
										lockOnIdle = true;
										disabled = false;
										unNotify();
									}else{
										var i;
										for(i = 0; i < Arr1.length; i++){
											var domain = extractDomain(Arr1[i].url);
											if(sitels.indexOf(domain) > -1){
												break;
											}
										}
										if(i >= Arr1.length){
											lockOnIdle = true;
											disabled = false;
											unNotify();
										}
									}
								});
							}else if(currentOnly){
								console.log("currentOnly");
								chrome.tabs.query({active: true, audible: true}, function(Arr){
									if(Arr.length == 0){
										lockOnIdle = true;
										disabled = false;
										unNotify();
									}
								});
							}else if(checkURL){
								console.log("checkURL");
								chrome.tabs.query({audible: true}, function(Arr){
									var i;
									for(i = 0; i < Arr.length; i++){
										var domain = extractDomain(Arr[i].url);
										if(sitels.indexOf(domain) > -1){
											break;
										}
										
										if(i >= Arr.length){
											lockOnIdle = true;
											disabled = false;
											unNotify();
										}
									}
								});
							}else{
								chrome.tabs.query({audible : true}, function(Arr){
									if(Arr.length == 0){
										lockOnIdle = true;
										disabled = false;
										unNotify();
									}
								});
							}
						}
					});
				}
			}
		}else{
			console.log("Tab ID : " + activeInfo.tabId + "Caused runtime Error");
		}
	});
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

chrome.contextMenus.create({
	"title" : "Lock Now",
	"contexts" : ["all"],
	"onclick" : contextClick 	
});

chrome.notifications.onButtonClicked.addListener(function (id, buttonIndex) {
	console.log("Button clicked.");
	chrome.notifications.clear("autoOff");
	if(buttonIndex == 1){
		DND = true;
	}
});

chrome.storage.local.get('pporte', function (d){
	chrome.idle.setDetectionInterval(parseInt(d.pporte) * 60);
});

chrome.runtime.setUninstallURL("http://www.chromelock.comxa.com/feedback.php");

chrome.windows.onFocusChanged.addListener(function(windowId){
	console.log("Focus changed to : " + windowId);
	if(windowId != -1){
		console.log("Chrome window changed.");
		if(ID != windowId){
			chrome.storage.local.get('yrueit', function(d1){
				if(d1.yrueit){
					chrome.windows.get(windowId, function(w){
						if(!chrome.runtime.lastError){
							if(w.incognito){
								chrome.storage.local.get('uiower', function(d){
									if(!d.uiower){
										focusLockWindow();
									}
								});
							}else{
								focusLockWindow();
							}
						}
					});
				}
			});
		}
	}
});

function onUltraRed(request){
	if(request.code == "248057"){
		chrome.storage.local.get('yrueit', function(d){
			if(d.yrueit){
				ID = undefined;
				smartGuy();
			}
		});
	}else{
		alert("Error - 613.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
	}
}

function onWhite(request){
	chrome.windows.getAll(function(Arr){
		var i;
		for(i = 0; i < Arr.length; i++){
			if(Arr[i].id != ID){
				chrome.windows.update(Arr[i].id, {"state": "minimized"});
			}
		}
		chrome.windows.update(ID, {"state": "minimized"});
	});
	
	return 0;
}

function contextClick(info, tab){
	lockBrowser({code : "248057"});
}

function notify(){
	chrome.browserAction.setBadgeText({"text": "A"});
	chrome.browserAction.setTitle({"title": "Chrome Lock.\nAuto Lock disabled."});
	if(!DND){
		chrome.notifications.create("autoOff", {
			"type" : "basic",
			"iconUrl" : "/Images/icon128.png",
			"title" : "Auto Lock Disabled",
			"message" : "Automatic lock due to inactivity is disabled for now.\n" + 
			"Red colored 'A' in the icon indicates that Auto-Lock is disabled.",
			"contextMessage" : "Chrome Lock",
			"buttons" : [{"title": "OK"}, {"title" : "Don't show this message again."}],
			"isClickable" : false
		});
	}
}

function unNotify(){
	chrome.browserAction.setTitle({"title": "Chrome Lock"});
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

function validate(request){
	if(request.code == "248057"){
		if(ID == undefined){
			return false;
		}else if(ID == request.windowId){
			return true;
		}else{
			return false;
		}
	}else{
		alert("Error - 613.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");
		return false;
	}
}

function unLockBrowser(request){
	if(request.code == "248057"){
		if(unLockBrowser.caller != null){
			ID = undefined;
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
	ID = undefined;
	chrome.storage.local.set({'hutoia': false});
	chrome.storage.local.set({'yrueit': false});
	chrome.windows.getAll(function(Arr){
		var i;
		for(i = 0; i < Arr.length; i++){
			chrome.windows.remove(Arr[0].id);
		}
	});
}

function reLockBrowser(request){
	console.log("Working on closed Lock Window");
	var exactPage = "chrome-extension://" + chrome.runtime.id + "/login.html";
	
	if(ID != undefined){
		chrome.storage.local.get('yrueit', function(d){
			if(d.yrueit){
				chrome.windows.get(ID, function(win){
					if(chrome.runtime.lastError){
						attempt--;
						if(attempt >= 0){
							console.log("Lock Window closed. Re-Opening.");
							chrome.windows.create({
								"url": loginPage,
								"focused": true,
								"type": "popup",
								"state": "maximized"
							}, function(w){
								console.log("reOpened Lock WIndow ID : " + w.id);
								ID = w.id;
								warn();	
							});
						}else{
							smartGuy();
						}
					}else{
						console.log("Lock Window still exists checking URL");
						chrome.tabs.query({windowId: ID}, function(tabs){
							if(tabs.length == 0){
								attempt--;
								if(attempt >= 0){
									console.log("Lock Window closed. Re-Opening.");
									chrome.windows.create({
										"url": loginPage,
										"focused": true,
										"type": "popup",
										"state": "maximized"
									}, function(w){
										console.log("reOpened Lock WIndow ID : " + w.id);
										ID = w.id;
										warn();
									});
								}else{
									smartGuy();
								}
							}else{
								var url = tabs[0].url;
								console.log("URL : " + url);
								if(url == exactPage){
									console.log("Lock Window reloaded.");
								}else{
									attempt--;
									if(attempt >= 0){
										console.log("Lock Window URL Changed, is taken care of");
										chrome.windows.remove(ID);
										chrome.windows.create({
											"url": loginPage,
											"focused": true,
											"type": "popup",
											"state": "maximized"
										}, function(w){
											console.log("reOpened Lock WIndow ID : " + w.id);
											ID = w.id;
											warn();
										});
									}else{
										smartGuy();
									}
								}
							}
						});
					}
				});
			}
		});
	}else{
		//Do nothing, ID not set.
	}
}

function warn(){
	var str = "Please don't do that again.!\nYou can use \"Unlock Later\" button to minimize all chrome windows " +
				" so that you can use other applications\n\nAttempts Left : " + attempt;
	alert(str);
}

function focusLockWindow(){
	if(ID != undefined){
		chrome.windows.update(ID, {"state" : "maximized", "focused": true}, function(win){
			if(chrome.runtime.lastError){
				console.log("Lock WIndow doesn't exist");
			}
		});
	}
}

function idleStateHandler(){
	if(lockOnIdle){
		lockBrowser({code : "248057"});
	}
}

function lockBrowser(request){
	if(request.code == "248057"){
		chrome.storage.local.set({'hutoia': false});
		chrome.storage.local.get('yrueit', function(d){
			if(!d.yrueit){
				console.log("Locking Browser.!");
				chrome.windows.create({
					"url": loginPage,
					"focused": true,
					"type": "popup",
					"state": "maximized"
				}, function(win){
					console.log("Locked window ID : " + win.id);
					ID = win.id;
					chrome.storage.local.set({'yrueit': true});
				});
			}else{
				console.log("Already Under LockDown.!");
			}
		});
	}else{
		alert("Error code : 601.\nSorry for your inconvenience.\nPlease Take a moment to report this problem.!");	
	}
	return 0;
}

function onBrown(request){
	chrome.windows.update(ID, {state : "maximized"});
	return 0;
}