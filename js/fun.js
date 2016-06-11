function handleMsg(){
	var message_send_button=document.getElementById("message_send_button");
	var msg_body=document.getElementById("msg_body");
	var contact_footer=document.getElementById("contact_footer");

	if(window.addEventListener){
		message_send_button.addEventListener("click", function(e){
			sendMsg();
			e.preventDefault();
		}, false);
	}
	else{
		message_send_button.onclick=function (){sendMsg();};
	}
	////////////////////////////////////////////////////////////////////
	msg_body.innerHTML=msg_placeholder;
	if(window.addEventListener){
		msg_body.addEventListener("focus", function(e){
			if(this.innerHTML==msg_placeholder){
				this.innerHTML="";
			}
			this.style.color="#000";
			e.preventDefault();
		}, false);
	}
	else{
		msg_body.onfocus=function (){
			if(this.innerHTML==msg_placeholder){
				this.innerHTML="";
			}
			this.style.color="#000";
		};
	}
	///
	if(window.addEventListener){
		msg_body.addEventListener("blur", function(e){
			if(this.innerHTML=="" || this.innerHTML=="<br>"){//when field contains data and it is removed with ctrl+a, a <br> is left, so field is not empty
				this.innerHTML=msg_placeholder;
			}
			e.preventDefault();
		}, false);
	}
	else{
		msg_body.onblur=function (){
			if(this.innerHTML=="" || this.innerHTML=="<br>"){
				this.innerHTML=msg_placeholder;
			}
		};
	}
}

function sendMsg(){
	var xhr;
	var url="inc/fun.php?send_msg";
	var frm=document.getElementById("msg_frm").value;
	var sbj=document.getElementById("msg_sbj").value;
	var msg=document.getElementById("msg_body").innerHTML;
	var fd="frm="+frm+"&sbj="+sbj+"&msg="+msg+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var ret=xhr.responseText;
			if(ret=="0"){//problem with email address
				contact_footer.innerHTML="Make sure the Email is Valid";
				contact_footer.style.color="#F00";
				setTimeout(function (){
						contact_footer.innerHTML="&nbsp;";
						document.getElementById("msg_frm").value="";
				}, 2000);
			}
			if(ret=="1"){//problem with message area
				msg_body.innerHTML=msg_placeholder;
				contact_footer.innerHTML="You forgot the Message?";
				contact_footer.style.color="#F00";
				setTimeout(function (){
						contact_footer.innerHTML="&nbsp;";
				}, 2000);
			}
			if(ret=="2"){//message sent successfully
				contact_footer.innerHTML="Message Sent Successfully";
				contact_footer.style.color="#090";
				setTimeout(function (){
						contact_footer.innerHTML="&nbsp;";
				}, 2000);
			}
			if(ret=="3"){//something went wrong - message not sent
				contact_footer.innerHTML="Something Went Wrong";
				contact_footer.style.color="#F00";
				setTimeout(function (){
						contact_footer.innerHTML="&nbsp;";
				}, 2000);
			}
		}
	}
	xhr.send(fd);
}
