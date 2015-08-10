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

function loadMore(){
	var xhr;
	var url="fun.php?load_more&l_id="+l_id+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	this.innerHTML="Loading...";
	xhr.open("GET", url);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var data=xhr.responseText;
			data=JSON.parse(data);
			var i=0; var c=0;
			while(i<data.length){
				if(c==(data.length)){
					break;
				}
				for(var j=0; j<2; j++){
					n_a=data[c].tot_r;
					l_id=data[c].id;
					var shule=_("div");
					shule.setAttribute("class", "shule");

					var shule_spacer=_("div");
					shule_spacer.setAttribute("class", "spacer");

					var shule_cover=_("div");
					shule_cover.setAttribute("class", "shule_cover");
					var img=_("img");
					img.src="img/"+data[c].cover;
					shule_cover.appendChild(img);
					var shule_cover_link=_("a");
					shule_cover_link.href="shule.php?id="+data[c].id+"";
					shule_cover_link.appendChild(shule_cover);
					shule.appendChild(shule_cover_link);

					var shule_details=_("div");
					shule_details.setAttribute("class", "shule_details");

					var shule_title=_("div");
					shule_title.setAttribute("class", "shule_title");
					shule_title.innerHTML=data[c].title;
					var shule_link=_("a");
					shule_link.href="shule.php?id="+data[c].id+"";
					shule_link.appendChild(shule_title);
					shule_details.appendChild(shule_link);

					var shule_pub_det=_("div");
					shule_pub_det.setAttribute("class", "shule_pub_det");

					var shule_author=_("div");
					shule_author.setAttribute("class", "shule_author");
					shule_author.innerHTML="By "+data[c].author;

					var shule_published=_("div");
					shule_published.setAttribute("class", "shule_published");
					shule_published.innerHTML=data[c].published;

					var shule_category=_("div");
					shule_category.setAttribute("class", "shule_category");
					shule_category.innerHTML=data[c].category;
					var shule_category_link=_("a");
					shule_category_link.href="./?cat="+data[c].category+"";
					shule_category_link.appendChild(shule_category);

					shule_pub_det.appendChild(shule_author);
					shule_pub_det.appendChild(shule_published);
					shule_pub_det.appendChild(shule_category_link);
					shule_details.appendChild(shule_pub_det);

					var shule_body=_("div");
					shule_body.setAttribute("class", "shule_body");
					shule_body.innerHTML=data[c].intro;
					shule_details.appendChild(shule_body);

					shule.appendChild(shule_details);
					shule.appendChild(shule_spacer);

					switch(j){
						case 0:
						$("shule_left_left_container").appendChild(shule);
						break;
						case 1:
						$("shule_left_right_container").appendChild(shule);
						break;
					}

					c++;
					if(c==(data.length)){
						break;
					}
				}
				i++;
			}
			var n_b=document.getElementsByClassName('shule');
			$("load_more_but").innerHTML="Load More";
			if(n_b.length<(n_a-1)){
				$("load_more_but").style.display="block";
				$("load_more_but").addEventListener("click", loadMore, false);
			}
			else{
			    $("load_more_but").style.display="none";
			}
		}
	}
	xhr.send(null);
}

function contact(e){
	msg_dialog.render();
	e.preventDefault();
}

function sendMsg(){
	var xhr;
	var url="fun.php?send_msg";
	var frm=$("frm").value;
	var sbj=$("sbj").value;
	var msg=$("msg_area").innerHTML;
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
				$("frm").value=frm_placeholder;//remove any junk and reset field
				$("frm").style.color="#F00";
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
		var dialog_box_overlay=$("dialog_box_overlay");
		dialog_box_overlay.style.display="block";
		///////////////////////////////////////////////////////////////
		var dialog_box=$("dialog_box");
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
		$("dialog_box_head").appendChild(this.tit);
		$("dialog_box_body").appendChild(this.frm);
		$("dialog_box_body").appendChild(this.sbj);
		$("dialog_box_body").appendChild(this.bod);
		$("dialog_box_foot").appendChild(this.fot);
		var spacer=_("div");
		spacer.setAttribute("id", "dialog_foot_spacer");
		$("dialog_box_foot").appendChild(spacer);
	}
	this.done=function(){
		$("dialog_box").style.display="none";
		$("dialog_box_overlay").style.display="none";
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

function fetchPoll(){
	var xhr;
	var url="fun.php?fetch_poll";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var data=xhr.responseText;
			data=JSON.parse(data);
			var i=0;
			var p_cand_spacer=_("div");
			p_cand_spacer.setAttribute("class", "spacer");
			var p_cand_details_spacer=_("div");
			p_cand_details_spacer.setAttribute("class", "spacer");
			while(i<data.length){
				var p_cand=_("div");
				p_cand.setAttribute("class", "p_cand");
				p_cand.setAttribute("id", ""+data[i].id+"");
				p_cand.addEventListener("click", candSelect, false);

				var p_cand_inner_spacer=_("div");
				p_cand_inner_spacer.setAttribute("class", "spacer");

				var p_cand_select=_("div");
				p_cand_select.setAttribute("class", "p_cand_select");
				var p_cand_select_outer=_("div");
				p_cand_select_outer.setAttribute("class", "p_cand_select_outer");
				var p_cand_select_inner=_("div");
				p_cand_select_inner.setAttribute("class", "p_cand_select_inner");
				p_cand_select_outer.appendChild(p_cand_select_inner);
				p_cand_select.appendChild(p_cand_select_outer);

				var p_cand_details=_("div");
				p_cand_details.setAttribute("class", "p_cand_details");

				var p_cand_details_pic=_("div");
				p_cand_details_pic.setAttribute("class", "p_cand_details_pic");
				var img=_("img");
				img.src="img/"+data[i].pic;
				p_cand_details_pic.appendChild(img);

				var p_cand_details_descr=_("div");
				p_cand_details_descr.setAttribute("class", "p_cand_details_descr");
				p_cand_details_descr.innerHTML=data[i].descr;

				p_cand_details.appendChild(p_cand_details_pic);
				p_cand_details.appendChild(p_cand_details_descr);
				p_cand_details.appendChild(p_cand_details_spacer);

				var p_cand_result=_("div");
				p_cand_result.setAttribute("class", "p_cand_result");
				p_cand_result.innerHTML=data[i].votes;

				p_cand.appendChild(p_cand_select);
				p_cand.appendChild(p_cand_details);
				p_cand.appendChild(p_cand_result);
				p_cand.appendChild(p_cand_inner_spacer);

				$("poll_topic").innerHTML=data[i].topic;
				$("poll_cat").innerHTML=data[i].cat;
				$("poll_start").innerHTML=data[i].start;
				$("poll_total").innerHTML=data[i].total;
				$("poll_candidates").appendChild(p_cand);

				i++;
			}
			$("poll_candidates").appendChild(p_cand_spacer);
		}
	}
	xhr.send(null);
}

function candSelect(){
	$("poll_vote_button").disabled=false;
	$("poll_vote_button").setAttribute("p_cand", ""+this.id+"");
	$("poll_vote_button").style.background="#09F";
	$("poll_vote_button").style.cursor="pointer";
	$("poll_vote_button").addEventListener("mouseover", function(){this.style.color="#000"}, false);
	$("poll_vote_button").addEventListener("mouseout", function(){this.style.color="#FFF"}, false);
	$("poll_vote_button").addEventListener("click", vote, false);
	var p_cand_select_inner=this.getElementsByClassName("p_cand_select_inner");
	for(var x=0; x<p_cand_select_inner.length; x++){
		p_cand_select_inner[x].style.background="#090";
	}
	var siblings=this.parentNode.children;
	for(var j=0; j<siblings.length; j++){
		if(siblings[j]!=this){
			p_cand_select_inner=siblings[j].getElementsByClassName("p_cand_select_inner");
			for(var y=0; y<p_cand_select_inner.length; y++){
			p_cand_select_inner[y].style.background="none";
	}
		}
	}
}

function vote(){
	this.value="Voting...";
	var p_cand=this.getAttribute("p_cand");
	var xhr;
	var url="fun.php?vote="+p_cand+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var data=xhr.responseText;
			data=JSON.parse(data);
			if(data.ret=="1"){
				pollResults();
			}
		}
	}
	xhr.send(null);
}

function pollResults(){
	var xhr;
	var url="fun.php?poll_result";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			$("poll_candidates").innerHTML="";
			var data=xhr.responseText;
			data=JSON.parse(data);
			var i=0;
			var p_cand_spacer=_("div");
			p_cand_spacer.setAttribute("class", "spacer");
			var p_cand_details_spacer=_("div");
			p_cand_details_spacer.setAttribute("class", "spacer");
			while(i<data.length){
				var p_cand=_("div");
				p_cand.setAttribute("class", "p_cand");
				p_cand.style.cursor="auto";

				var p_cand_inner_spacer=_("div");
				p_cand_inner_spacer.setAttribute("class", "spacer");

				var p_cand_details=_("div");
				p_cand_details.setAttribute("class", "p_cand_details");

				var p_cand_details_pic=_("div");
				p_cand_details_pic.setAttribute("class", "p_cand_details_pic");
				var img=_("img");
				img.src="img/"+data[i].pic;
				p_cand_details_pic.appendChild(img);

				var p_cand_details_descr=_("div");
				p_cand_details_descr.setAttribute("class", "p_cand_details_descr");
				p_cand_details_descr.innerHTML=data[i].descr;

				p_cand_details.appendChild(p_cand_details_pic);
				p_cand_details.appendChild(p_cand_details_descr);
				p_cand_details.appendChild(p_cand_details_spacer);

				var p_cand_result=_("div");
				p_cand_result.setAttribute("class", "p_cand_result");
				p_cand_result.innerHTML=data[i].votes;

				p_cand.appendChild(p_cand_details);
				p_cand.appendChild(p_cand_result);
				p_cand.appendChild(p_cand_inner_spacer);

				$("poll_total").innerHTML=data[i].total;
				$("poll_candidates").appendChild(p_cand);

				i++;
			}
			$("poll_candidates").appendChild(p_cand_spacer);

			$("poll_vote_button").disabled=true;
			$("poll_vote_button").value="Thank you";
			$("poll_vote_button").style.background="#CCC";
			$("poll_vote_button").style.color="#FFF";
			$("poll_vote_button").style.cursor="auto";
			$("poll_vote_button").addEventListener("mouseover", function(){this.style.color="none"}, false);
			$("poll_vote_button").addEventListener("mouseout", function(){this.style.color="none"}, false);
		}
	}
	xhr.send(null);
}
