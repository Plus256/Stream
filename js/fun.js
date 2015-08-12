/*
News Media Publishing

//Supplies - General purpose consumable items which commonly have a shorter life span in use than equipment and machines, and which are stocked for recurring use.
//Thomas Reuters Business Classification.

News: newly received or noteworthy information, especially about recent or important events.
Media: tools for information/data delivery and storage.
Publishing: the activity of making information available to the general public.
*/
var msg_dialog=new DialogBox();
var msg_hed=new Head();
var msg_tit=new Title();
var msg_esc=new Esc();
var msg_area=new TextArea();
var send_msg_but=new Button();

////////////////////////////////////////////////////////////////////
msg_tit.innerHTML="Contact us";
msg_tit.setAttribute("id", "msg_tit");
////////////////////////////////////////////////////////////////////
msg_esc.innerHTML="+";
msg_esc.setAttribute("id", "msg_esc");
if(window.addEventListener){//browser not IE//////IT IS BEST TO USE THE OBJECT WHEN TESTING IF IT IS SUPPORTED - DETECTING THE BROWSER IS NOT RELIABLE!
	msg_esc.addEventListener("click", function(e){
		//using addEventListener with the function(e) notation eliminates errors
		//the single addEventListener: msg_esc.addEventListener("click", msg_dialog.done(), false); is not effective
		msg_dialog.done();
		e.preventDefault();
	}, false);
}
else{//for IE
	msg_esc.onclick=function (){msg_dialog.done()};
}
////////////////////////////////////////////////////////////////////
var dialog_head_spacer=_("div");
dialog_head_spacer.setAttribute("id", "dialog_head_spacer");
msg_hed.appendChild(msg_tit);
msg_hed.appendChild(msg_esc);
msg_hed.appendChild(dialog_head_spacer);
////////////////////////////////////////////////////////////////////
var frm=_("input");
frm.setAttribute("type", "text");
frm.setAttribute("class", "msg_dialog_text_input");
frm.setAttribute("id", "frm");
////simulating placeholder
var frm_placeholder="Your Email Address";//this automatically validates - no further validation required on submition
frm.value=frm_placeholder;
///
if(window.addEventListener){
	frm.addEventListener("focus", function(e){
		if(frm.value==frm_placeholder){
			frm.value="";
		}
		frm.style.color="#036";
		e.preventDefault();
	}, false);
}
else{
	frm.onfocus=function (){
		if(frm.value==frm_placeholder){
			frm.value="";
		}
		frm.style.color="#036";
	};
}
///
if(window.addEventListener){
	frm.addEventListener("blur", function(e){
		if(frm.value==""){
			frm.value=frm_placeholder;
		}
		e.preventDefault();
	}, false);
}
else{
	frm.onblur=function (){
		if(frm.value==""){
			frm.value=frm_placeholder;
		}
	};
}
////////////////////////////////////////////////////////////////////
var sbj=_("input");
sbj.setAttribute("type", "text");
sbj.setAttribute("class", "msg_dialog_text_input");
sbj.setAttribute("id", "sbj");
////simulating placeholder
var sbj_placeholder="Subject";//helps us set a default subject value
sbj.value=sbj_placeholder;
if(window.addEventListener){
	sbj.addEventListener("focus", function(e){
		if(sbj.value==sbj_placeholder){
			sbj.value="";
		}
		sbj.style.color="#036";
		e.preventDefault();
	}, false);
}
else{
	sbj.onfocus=function (){
		if(sbj.value==sbj_placeholder){
			sbj.value="";
		}
		sbj.style.color="#036";
	};
}
///
if(window.addEventListener){
	sbj.addEventListener("blur", function(e){
		if(sbj.value==""){
			sbj.value=sbj_placeholder;
		}
		e.preventDefault();
	}, false);
}
else{
	sbj.onblur=function (){
		if(sbj.value==""){
			sbj.value=sbj_placeholder;
		}
	};
}
////////////////////////////////////////////////////////////////////
msg_dialog.tit=msg_hed;
msg_dialog.frm=frm;
msg_dialog.sbj=sbj;
msg_dialog.bod=msg_area;
msg_dialog.fot=send_msg_but;
////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
send_msg_but.innerHTML="Send";
send_msg_but.setAttribute("class", "but");
send_msg_but.setAttribute("id", "send_msg_but");
if(window.addEventListener){
	send_msg_but.addEventListener("click", function(e){
		sendMsg();
		buffer.render("dialog_box");
		e.preventDefault();
	}, false);
}
else{
	send_msg_but.onclick=function (){buffer.render("dialog_box"); sendMsg();};
}
////////////////////////////////////////////////////////////////////
msg_area.setAttribute("id", "msg_area");
msg_area.setAttribute("contentEditable", "true");
//imitating placeholder attribute
var msg_placeholder="Write Message Here...";
msg_area.innerHTML=msg_placeholder;
if(window.addEventListener){
	msg_area.addEventListener("focus", function(e){
		if(this.innerHTML==msg_placeholder){
			this.innerHTML="";
		}
		this.style.color="#036";
		e.preventDefault();
	}, false);
}
else{
	msg_area.onfocus=function (){
		if(this.innerHTML==msg_placeholder){
			this.innerHTML="";
		}
		this.style.color="#036";
	};
}
///
if(window.addEventListener){
	msg_area.addEventListener("blur", function(e){
		if(this.innerHTML=="" || this.innerHTML=="<br>"){//when field contains data and it is removed with ctrl+a, a <br> is left, so field is not empty
			this.innerHTML=msg_placeholder;
		}
		e.preventDefault();
	}, false);
}
else{
	msg_area.onblur=function (){
		if(this.innerHTML=="" || this.innerHTML=="<br>"){
			this.innerHTML=msg_placeholder;
		}
	};
}
////////////////////////////////////////////////////////////////////

function contact(e){
	msg_dialog.render();
	e.preventDefault();
}

function sendMsg(){
	var xhr;
	var url="inc/fun.php?send_msg";
	var frm=document.getElementById("frm").value;
	var sbj=document.getElementById("sbj").value;
	var msg=document.getElementById("msg_area").innerHTML;
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
			buffer.done();
			var data=xhr.responseText;
			data=JSON.parse(data);
			var ret=data.ret;
			if(ret=="0"){//problem with email address
				document.getElementById("frm").value=frm_placeholder;//remove any junk and reset field
				document.getElementById("frm").style.color="#F00";
			}
			if(ret=="1"){//problem with message area
				msg_area.innerHTML=msg_placeholder;
				msg_area.style.color="#F00";
			}
			if(ret=="2"){//message sent successfully
				buffer.render("dialog_box");
				buffer.innerHTML="Message Sent Successfully";
				buffer.style.background="rgb(140, 198, 63)";
				if(navigator.userAgent.indexOf("MSIE")<0){
					buffer.style.background="rgba(140, 198, 63, 0.75)";
				}
				//then fade out dialog box and buffer after about 1 seconds
				setTimeout(function (){msg_dialog.done();buffer.done();}, 1000);
			}
			if(ret=="3"){//something went wrong - message not sent
				buffer.render("dialog_box");
				buffer.innerHTML="Something Went Wrong";
				setTimeout(function (){msg_dialog.done();buffer.done();}, 1000);
			}
		}
	}
	xhr.send(fd);
}

function getKey(e){
	var key=e.keyCode;
	//find a way of the user not escaping this when initial content is loading
	if(window.msg_dialog && key==27){//pressing escape key
		//it is very important to call this method after checking if it's object exists
		msg_dialog.done();
	}
	if(window.buffer && key==27){//if it exists
		buffer.done();//find a way of the user not escaping this when initial content is loading
	}
}

function DialogBox(){
	this.tit; this.frm; this.sbj; this.bod; this.fot;
	this.render=function(){
		var win_width=window.innerWidth || document.body.clientWidth;
		var win_height=window.innerHeight || document.body.clientHeight;
		if(document.body.clientWidth<=640){
			var dialog_box_width=(win_width-20);
		}
		else{
			dialog_box_width=(win_width*0.5); //measurements are in %
		}
		///////////////////////////////////////////////////////////////
		var dialog_box_overlay=document.getElementById("dialog_box_overlay");
		dialog_box_overlay.style.display="block";
		///////////////////////////////////////////////////////////////
		var dialog_box=document.getElementById("dialog_box");
		if(document.body.clientWidth<=640){
			dialog_box.style.left=""+(10)+"px"; //horizontally centre the div
		}
		else{
			dialog_box.style.left=""+(0.5*(win_width-dialog_box_width))+"px"; //horizontally centre the div
		}
		dialog_box.style.top=""+(0.1*win_height)+"px";
		dialog_box.style.display="block";
		dialog_box.style.width=""+dialog_box_width+"px";
		///////////////////////////////////////////////////////////////
		document.getElementById("dialog_box_head").appendChild(this.tit);
		document.getElementById("dialog_box_body").appendChild(this.frm);
		document.getElementById("dialog_box_body").appendChild(this.sbj);
		document.getElementById("dialog_box_body").appendChild(this.bod);
		document.getElementById("dialog_box_foot").appendChild(this.fot);
		var spacer=_("div");
		spacer.setAttribute("id", "dialog_foot_spacer");
		document.getElementById("dialog_box_foot").appendChild(spacer);
	}
	this.done=function(){
		document.getElementById("dialog_box").style.display="none";
		document.getElementById("dialog_box_overlay").style.display="none";
	}
}

function Button(){
	return _("span");
}

function TextArea(){
	return _("div");
}

function Title(){
	return _("div");
}

function Head(){
	return _("div");
}

function Esc(){
	return _("div");
}
