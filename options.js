var tmString1 = "Chrome Lock will automatically lock your browser after "
var timeOut;
var tmSting2 = "mins of Inactivity. Minimum = 2mins. Maximum = 30mins. <br /> <strong>Note: </strong>This option is still in beta-stage. May not work perfectly.</strong>"
var encrPasswd = [];
var mode;
var ip1,ip2,ip3,bt1,bt2,bt3,cb1,tm1;
var randomDigs = [];

document.addEventListener('DOMContentLoaded', function(){
	ip1 = document.querySelector('.ip1');
	ip2 = document.querySelector('.ip2');
	ip3 = document.querySelector('.ip3');
	bt1 = document.querySelector('.bt1');
	cb1 = document.querySelector('.cb1');
	tm1 = document.querySelector('.timeOut');
	bt2 = document.querySelector('.ftbt1');
	bt3 = document.querySelector('.ftbt2');
	console.clear();
	console.log("options.js loaded");
	
	chrome.storage.local.get({'randomDigs' : []}, function (data){
		randomDigs = data.randomDigs;
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
			document.querySelector('.magicbox').style.visibility = 'hidden';
			document.querySelector('.p4').innerHTML = "Enter Password Hint : ";
			document.querySelector('.div1').innerHTML = "<input class=\"ip4\" type=\"text\"></input>"
		}
	});
	
	chrome.storage.local.get('pporte', function(data){
		timeOut =  data.pporte;
	});
	
	if(timeOut == undefined){
			timeOut = 5;
			chrome.storage.local.set({'pporte' : timeOut});
	}
	
	document.querySelector('.tm').innerHTML += tmString1 + timeOut + tmSting2;
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
	
	bt1.addEventListener('click', bt1cl);
	bt2.addEventListener('click', bt2cl);
	bt3.addEventListener('click', bt3cl);
});

function bt1cl(){
	var data1,data2,passwdLength,data3,data4,u=0,j,passwd,i,chr,numRandomDigs,charPasswd = [],startRandomDigs;
	var flag = false;
	var flag1 = false;
	data1 = ip1.value;
	data2 = ip2.value;
	data3 = ip3.value;
	var ip4;
	
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
					console.log("Encrypting Password");
				
					ip1.value = ip2.value = ip3.value = "";
					startRandomDigs = Math.floor((Math.random() *35) + 5);
					numRandomDigs = data1.length + 1;
					charPasswd = data1.split('');
				
					for(j=startRandomDigs;j<startRandomDigs+numRandomDigs;j++){
						for(i=0;i<randomDigs[j];i++){
							encrPasswd.push(randomChar());
						}
						if(u < data1.length){
							encrPasswd.push(charPasswd[u]);
							u++;
						}
					}
					
					console.log("Storing password.");
					
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
		
		chrome.storage.local.get('bhfyda', function (dat1){
			passwdLength = dat1.bhfyda;

			chrome.storage.local.get('hyskal', function (data){
				numRandomDigs = passwdLength + 1;
				j=0;
				u=0;
				startRandomDigs = data.hyskal;
				
				for(i=startRandomDigs; i<(startRandomDigs + numRandomDigs);i++){
					if(u==0){
						j+=randomDigs[i];
					}else{
						j+=randomDigs[i]+1;
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
									console.log("Encrypting Password");
				
									ip1.value = ip2.value = ip3.value = ip4.value = "";
									startRandomDigs = Math.floor((Math.random() *35) + 5);
									numRandomDigs = data2.length + 1;
									charPasswd = data2.split('');
				
									for(j=startRandomDigs;j<startRandomDigs+numRandomDigs;j++){
										for(i=0;i<randomDigs[j];i++){
											encrPasswd.push(randomChar());
										}
										if(u < data2.length){
											encrPasswd.push(charPasswd[u]);
											u++;
										}
									}
									
									console.log("Storing password.");
					
									chrome.storage.local.set({'bhfyda': data2.length});
									chrome.storage.local.set({'encrPasswd': encrPasswd});
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
	}
}

function bt2cl(){
	alert("Button 2");
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

