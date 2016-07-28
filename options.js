var tmString1 = "Chrome Lock will automatically lock your browser after "
var timeOut;
var tmSting2 = "mins of Inactivity. Minimum = 2mins. Maximum = 30mins. <br /> <strong>Note: </strong>This option is still in beta-stage. May not work perfectly.</strong>"
var encrPasswd = [];
var mode;
var ip1,ip2,ip3,bt1,bt2,bt3,cb1,cb2,tm1,ena;
var randomDigs = [];
var passwdChanged = false;
var changesSaved = false;
var i,exc,allst,ctonly,enatm;
var tcb,tcb1,tcb2,trd1,trd2,tip1,innerOptions,siteList;
var add,remove,list,tm,sel;
var sitels = [];

document.addEventListener('DOMContentLoaded', function(){
	ip1 = document.querySelector('.ip1');
	ip2 = document.querySelector('.ip2');
	ip3 = document.querySelector('.ip3');
	bt1 = document.querySelector('.bt1');
	cb1 = document.querySelector('.cb1');
	cb2 = document.querySelector('.cb2');
	bt2 = document.querySelector('.ftbt1');
	bt3 = document.querySelector('.ftbt2');
	ena = document.querySelector('.en');
	tcb = document.querySelector('.tcb');
	tm = document.querySelector('.tm');
	tm1 = document.querySelector('.timeOut');
	tcb1 = document.querySelector('.tcb1');
	tcb2 = document.querySelector('.tcb2');
	innerOptions = document.querySelector('.innerOptions');
	trd1 = document.querySelector('.trd1');
	trd2 = document.querySelector('.trd2');
	siteList = document.querySelector('.siteList');
	tip1 = document.querySelector('.tip1');
	add = document.querySelector('.add');
	remove = document.querySelector('.remove');
	list = document.querySelector('.list');
	sel = document.querySelector('.list');
	
	console.clear();
	console.log("options.js loaded");
	
	chrome.storage.local.get({'randomDigs' : []}, function (data){
		randomDigs = data.randomDigs.slice();
	});
	
	chrome.storage.local.get('uiower', function(d){
		if(!(d.uiower)){
			document.querySelector('.cb1').checked = false;
		}
	});
	
	chrome.storage.local.get('tyudfg', function (d1){
		if(!(d1.tyudfg)){
			cb2.checked = false;
		}
	});
	
	chrome.storage.local.get({'encrPasswd': []}, function(data){
		encrPasswd = data.encrPasswd.slice();
		if(encrPasswd.length == 0){
			mode="set";
			console.log("Set password Mode...");
			document.querySelector('.topic1').innerHTML = "Set Password" ;
			document.querySelector('.p1').innerHTML = "Enter your password : ";
			document.querySelector('.p2').innerHTML = "Re-enter your password :";
			document.querySelector('.p3').innerHTML = "Enter your password hint <strong class=\"inRed\">*</strong> :";
			document.querySelector('.magicbox').style.visibility = 'visible';
			document.querySelector('.ip3').type = 'text';
		}else{
			mode="change";
			console.log("Change password mode");
			document.querySelector('.magicbox').style.visibility = 'visible';
			document.querySelector('.p4').innerHTML = "Enter Password Hint <strong class=\"inRed\">*</strong> : ";
			document.querySelector('.div1').innerHTML = "<input class=\"ip4\" type=\"text\"></input>";
			document.querySelector('.ip4').addEventListener("keypress", function(e){
				if(e.keyCode == 13){
					bt1cl();
				}
			});
		}
	});
	
	chrome.storage.local.get('pporte', function(data){
		timeOut =  data.pporte;
	});
	
	if(timeOut == undefined){
		timeOut = 5;
		chrome.storage.local.set({'pporte' : timeOut});
	}
	document.querySelector('.timeOut').value = timeOut;
	
	ip1.addEventListener("keypress", function(e){
		if(e.keyCode == 13){
			bt1cl();
		}
	});
	ip2.addEventListener("keypress", function(e){
		if(e.keyCode == 13){
			bt1cl();
		}
	});
	ip3.addEventListener("keypress", function(e){
		if(e.keyCode == 13){
			bt1cl();
		}
	});
	
	chrome.storage.local.get('bnmjkl', function(d1){
		if(d1.bnmjkl == undefined){
			enatm = true;
			chrome.storage.local.set({'bnmjkl' : true});
			return;
		}
		enatm = d1.bnmjkl;
		
		chrome.storage.local.get('bnmghj', function(d2){
			if(d2.bnmghj == undefined){
				exc = false;
				chrome.storage.local.set({'bnmghj' : false});
				return;
			}
			exc = d2.bnmghj;
			
			chrome.storage.local.get('bnmfgh', function(d3){
				if(d3.bnmfgh == undefined){
					allst = true;
					chrome.storage.local.set({'bnmfgh' : true});
					return;
				}
				allst = d3.bnmfgh;
				
				chrome.storage.local.get('bnmhjk', function(d4){
					if(d4.bnmhjk == undefined){
						ctonly = true;
						chrome.storage.local.set({'bnmhjk' : true});
						return;
					}
					ctonly = d4.bnmhjk;
					
					chrome.storage.local.get({'sitels' : []}, function(d5){
						if(d5.sitels == undefined){
							sitels = ["youtube.com", "netflix.com", "vimeo.com"];
							chrome.storage.local.set({'sitels' : sitels});
							onLoad();
							return;
						}else{
							if(d5.sitels.length == 0){
								sitels = ["youtube.com", "netflix.com", "vimeo.com"];
								chrome.storage.local.set({'sitels' : sitels});
								onLoad();
								return;
							}
						}
						sitels = d5.sitels.slice();
						onLoad();
					});
				});
			});
		});
	});
	
	bt1.addEventListener('click', bt1cl);
	bt2.addEventListener('click', bt2cl);
	bt3.addEventListener('click', bt3cl);
	ena.addEventListener('click', enaclk);
	tcb.addEventListener('click', tcbcl);
	tcb1.addEventListener('click', tcb1cl);
	trd1.addEventListener('click', trd1cl);
	trd2.addEventListener('click', trd2cl);
	tip1.addEventListener('keyup', tip1kd);
	add.addEventListener('click', addcl);
	remove.addEventListener('click', remcl);
	
});

function tcbcl(){
	console.log(sitels);
	if(tcb.checked){
		enable(tm);
		if(!tcb1.checked){
			disable(innerOptions);
		}
	}else{
		disable(tm);
	}
}

function tcb1cl(){
	if(tcb1.checked){
		enable(innerOptions);
		if(trd1.checked){
			disable(siteList);
		}else{
			enable(siteList);
		}
	}else{
		disable(innerOptions);
	}
}

function trd1cl(){
	disable(siteList);
}

function trd2cl(){
	enable(siteList);
	if(tip1.value.trim() == ""){
		disable(add);
	}
	if(sel.selectedIndex == -1){
		disable(remove);
	}
}

function tip1kd(e){
	if(tip1.value.trim() != ""){
		enable(add);
		if(e.keyCode == 13){
			addcl();
		}
	}else{
		disable(add);
	}
}

function addcl(){
	var str = tip1.value;
	var domain = "";
	if(!str == ""){
		if(validate(str)){
			if(sitels.indexOf(str) == -1){
				var strArr = str.split('.');
				if(strArr.length > 2){
					if(strArr[0] == "www" || strArr[0] == "WWW"){
						domain += strArr[i];
						for(i = 2; i < strArr.length; i++){
							domain += '.' + strArr[i];
						}
					}else{
						domain = str;
					}
					if(sitels.indexOf(domain) == -1){
						addtoList(domain, sitels.length);
						sitels.push(domain);
						tip1.value = "";
					}else{
						alert("op2 : The domain you are trying to add already exists.");
						tip1.value = "";
					}
				}else if(strArr.length = 2){
					addtoList(str, sitels.length);
					sitels.push(str);
					tip1.value = "";
				}else{
					alert("The domain you have entered is invalid. Try again.\nPlease don't add 'http' or 'ftp' or '//' or sub-domains.");
					tip1.value = "";
				}
			}else{
				alert("op1 : The domain you are trying to add already exists.");
				tip1.value = "";
			}
		}else{
			alert("The domain you have entered is invalid. Try again.\nPlease don't add 'http' or 'ftp' or '//' or sub-domains.");
			tip1.value = "";
		}
	}
}

function validate(domain){ 
    var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/); 
    return domain.match(re);
}

function remcl(){
	var index;
	index = sel.selectedIndex;
	if(index == -1){
		// Do nothing.
	}else{
		sitels.splice(index, 1);
		sel.removeChild(sel.options[index]);
		disable(remove);
	}
}

function opsl(){
	enable(remove);
}


function onLoad(){
	if(enatm){
		tcb.checked = true;
		enable(tm);
		if(exc){
			tcb1.checked = true;
			enable(innerOptions);
			if(allst){
				trd1.checked = true;
				disable(siteList);
			}else{
				trd2.checked = true;
				enable(siteList);
				disable(add);
				disable(remove);
			}
			tcb2.checked = ctonly;
		}else{
			tcb1.checked = false;
			disable(innerOptions);
		}
	}else{
		tcb.checked = false;
		disable(tm);
	}
	
	for(i = 0; i < sitels.length; i++){
		addtoList(sitels[i], i);
	}
}

function addtoList(str, val){
	var opt = document.createElement('option');
	opt.appendChild(document.createTextNode(str));
	opt.value = val;
	opt.addEventListener("click", opsl);
	list.appendChild(opt);
}

function disable(e){
	var allChild = e.getElementsByTagName('*');

	e.disabled = true;
	for(i = 0; i < allChild.length; i++ ){
		allChild[i].disabled = true;
	}
}

function enable(e){
	var allChild = e.getElementsByTagName('*');
	
	e.disabled = false;
	for(i = 0; i < allChild.length; i++ ){
		allChild[i].disabled = false;
	}
}

function enaclk(){
	var newURL = "chrome://extensions/?id=" + chrome.runtime.id;
	chrome.tabs.create({ url : newURL});
}

function bt1cl(){
	var data1,data2,passwdLength,data3,data4,u=0,j,passwd,i,chr,numRandomDigs,charPasswd = [],startRandomDigs;
	var flag = false;
	var flag1 = false;
	data1 = ip1.value;
	data2 = ip2.value;
	data3 = ip3.value;
	var ip4;
	var unknown;
	var passwdEncr = [];
	var passwdChar = [];
	
	if(mode == "set"){
		// Password set mode.
		if(data1.length == 0){
			alert("Password can not be empty.!");
		}else if(data1.length < 4){
			alert("Password should be atleast 5 characters.!");
		}else{
			if(data2.length == 0){
				alert("Re-enter your Password.!");
			}else if(!(data1 == data2)){
				alert("Passwords you have entered did not match.!");
			}else{
				if(data3.length == 0){
					flag = confirm("You have not entered password hint.\nHint helps you to remember password.\nAre you sure to continue without password hint?");
				}
			
				if((data3.length != 0) || (flag)){
					passwdChanged = true;
					console.log("Encrypting Password");
				
					ip1.value = ip2.value = ip3.value = "";
					startRandomDigs = Math.floor((Math.random() *35) + 5);
					numRandomDigs = data1.length + 1;
					charPasswd = data1.split('');

					for(j=startRandomDigs;j<startRandomDigs+numRandomDigs;j++){
						for(i=1;i<randomDigs[j];i++){
							encrPasswd.push(randomChar());
						}
						if(u < data1.length){
							encrPasswd.push(charPasswd[u]);
							u++;
						}
					}
					
					chrome.storage.local.set({'bhfyda': data1.length});
					chrome.storage.local.set({'encrPasswd': encrPasswd});
					chrome.storage.local.set({'hyskal': startRandomDigs});
					if(data3.length != 0){
						chrome.storage.local.set({'aspire': true});
						chrome.storage.local.set({'hint': data3});
					}else{
						chrome.storage.local.set({'aspire': false});
					}
					
					alert("Password saved.!");
				}
			}
		}
	}else{
		//pasword change mode
		console.log("Decrypting password.");
		ip4 = document.querySelector('.ip4');
		data4 = ip4.value;
		
		chrome.storage.local.get({'encrPasswd': []}, function(d2){
			encrPasswd = d2.encrPasswd.slice();
			
			chrome.storage.local.get('bhfyda', function (dat1){
				passwdLength = dat1.bhfyda;

				chrome.storage.local.get('hyskal', function (data){
					numRandomDigs = passwdLength + 1;
					j=0;
					u=0;
					startRandomDigs = data.hyskal;
					console.log(startRandomDigs);
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
					
					if(data1.length == 0){
						alert("Please enter current password.!");
					}else{
						if(data2.length == 0){
							alert("New password can not be empty.!");
						}else if(data2.length < 4){
							alert("Password should be atleast 5 characters.!");
						}else{
							if(data3.length == 0){
								alert("Please re-enter the password.!");
							}else if(!(data2 == data3)){
								alert("Password you have entered didn't match.!");
							}else{
								if(!(data1 == passwd)){
									alert("Old Password incorrect.!");
									data1.value = "";
								}else{
									if(data4.length == 0){
										flag2 = confirm("You have not entered password hint.\nHint helps you to remember password.\nAre you sure to continue without password hint?");
									}
				
									if((data4.length != 0) || (flag2)){
										passwdChanged = true;
										
										console.log("Encrypting Password");
										u=0;
										ip1.value = ip2.value = ip3.value = ip4.value = "";
										startRandomDigs = Math.floor((Math.random() *35) + 5);
										numRandomDigs = data2.length + 1;
										passwdChar = data2.split('');
									
										for(j=startRandomDigs;j<(startRandomDigs+numRandomDigs);j++){
											for(i=1;i<randomDigs[j];i++){
												passwdEncr.push(randomChar());
											}
											if(u < data2.length){
												passwdEncr.push(passwdChar[u]);
												u++;
											}
										}
									
										chrome.storage.local.set({'bhfyda': data2.length});
										chrome.storage.local.set({'encrPasswd': passwdEncr});
										chrome.storage.local.set({'hyskal': startRandomDigs});
										if(data4.length != 0){
											chrome.storage.local.set({'aspire': true});
											chrome.storage.local.set({'hint': data4});
										}else{
											chrome.storage.local.set({'aspire': false});
										}
									
										alert("Password Change successful.!");
									}	
								}
							}
						}
					}
				});
			});
		});	
	}
}

function bt2cl(){
	var data1,data2,data3,data4,flag1,flag2,data5,flag0,tdat1,tdat2,tdat3,tdat4,tdat5;
	
	flag0 = confirm("Are you sure to save changes ?");
	
	if(flag0){
		data1 = document.querySelector('.ip1').value;
		data2 = document.querySelector('.ip2').value;
		data3 = document.querySelector('.ip3').value;
		flag1 = document.querySelector('.cb1').checked;
		flag2 = document.querySelector('.cb2').checked;
		data5 = document.querySelector('.timeOut').value;
		var tdat1 = tcb.checked;
		var tdat2 = tcb1.checked;
		var tdat3 = trd1.checked;
		var tdat5 = tcb2.checked;
	
		if(mode == "set"){
			if((data1.length != 0) && (data2.length != 0) && (data3.length != 0)){
				bt1cl();
			}
		}else{
			data4 = document.querySelector('.ip4').value;
			if((data1.length != 0) && (data2.length != 0) && (data3.length != 0) && (data4.length != 0)){
				bt1cl();
			}
		}
	
		if((data5 < 2) || (data5 > 30) || (Math.round(data5) != data5)){
			alert("Inactivity timeout should be a Integer (Decimal points not allowed.!) greater than 2mins and less than 30mins.!");
			document.querySelector('.timeOut').value = 5;
		}else{
			if(flag1 && flag2){
				alert("Can't allow the use of incognito window when Advanced Protection is enabled.");
			}else{
				changesSaved = true;
				chrome.storage.local.set({'uiower': flag1});
				chrome.storage.local.set({'pporte': data5});
				chrome.storage.local.set({'tyudfg': flag2});
				chrome.storage.local.set({'bnmjkl': tdat1});
				chrome.storage.local.set({'bnmghj': tdat2});
				chrome.storage.local.set({'bnmfgh': tdat3});
				chrome.storage.local.set({'bnmhjk': tdat5});
				chrome.storage.local.set({'sitels': sitels});
				alert("Changes saved successfully.!");
				window.close();
			}
		}
	}else{
		//do nothing
	}
}

function bt3cl(){
	var flag = confirm("Are sure to exit.? Changes may not be saved.!");
	if(flag == true){
		window.close();
	}
}

function randomChar(){
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	return (possible.charAt(Math.floor(Math.random() * possible.length)));
}