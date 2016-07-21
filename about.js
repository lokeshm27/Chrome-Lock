var i,bnmghj,bnmfgh;
var bt1,cb1,rd1,rd2,ip1,bt2,innerOptions,siteList;
var add,remove,list;

document.addEventListener('DOMContentLoaded', function(){
	bt1 = document.querySelector('.bt1');
	cb1 = document.querySelector('.cb1');
	rd1 = document.querySelector('.rd1');
	rd2 = document.querySelector('.rd2');
	add = document.querySelector('.add');
	remove = document.querySelector('.remove');
	ip1 = document.querySelector('.ip1');
	innerOptions = document.querySelector('.innerOptions');
	siteList = document.querySelector('.siteList');
	optionsList = document.querySelector('.optionsList');
	list = document.querySelector('.list');
	
	chrome.storage.local.get('bnmghj', function(d){
		if(d.bnmghj == undefined){
			chrome.storage.local.set({'bnmghj' : false});
			bnmgj = false
		}else{
			bnmghj = d.bnmghj;
		}
		
		if(bnmghj){
			cb1.selected = true;
			chrome.storage.local.get('bnmfgh', function(d1){
				if(d1.bnmfgh == undefined){
					chrome.storage.local.set({'bnmfgh' : true});
					bnmfgh = true;
				}else{
					bnmfgh = d1.bnmfgh;
				}
				
				if(bnmfgh){
					
				}else{
					
				}
			})
		}else{
			cb1.selected = false;
			disable(innerOptions);
		}
	});
	
	bt1.addEventListener("click", bt1cl);
	cb1.addEventListener("click", cb1cl);
	rd1.addEventListener("click", rd1cl);
	rd2.addEventListener("click", rd2cl);
	ip1.addEventListener("keypress", ip1kp);
	add.addEventListener("click", addcl);
	remove.addEventListener("click", remcl);
});

function opsl(){
	enable(remove);
}

function remcl(){
	alert(list.value);
}

function addcl(){
	if(ip1.value != ""){
		var str = ip1.value;
		var opt = document.createElement('option');
		opt.appendChild(document.createTextNode(str));
		opt.value = "1";
		opt.class = "op";
		opt.addEventListener("click", opsl);
		list.appendChild(opt);
		ip1.value = "";
	}
}

function ip1kp(){
	enable(add);
}

function rd1cl(){
	disable(siteList);
}

function rd2cl(){
	enable(siteList);
	disable(add);
	disable(remove);
	
}

function bt1cl(){
	if(ip1.value == ""){
		alert("No input");
	}else{
		alert("Domain : " + extractDomain(ip1));
	}
}

function cb1cl(){
	if(cb1.checked){
		enable(innerOptions);
		
		if(!rd2.checked){
			disable(siteList);
		}
	}else{
		disable(innerOptions);
	}
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

