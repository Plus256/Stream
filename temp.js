//be mindful of dual usage of jQuery and pure JavaScript
$(document).ready(function(){
	$(".contact_button").click(contact);
	$("#signup_button").click(signUp);
	$("#signin_button").click(signIn);
	if(document.getElementById("trend_main")){//why is $("#feed_container") returning true even when elem is absent? is it because of the HTML5 <section> elem?
			getFeed("ferguson", "mashable", "trend_main", 10);//pass container as argument
		}
		if(document.getElementById("user_flyout")){
			document.getElementById("user_flyout_dp").addEventListener("click", toggleMenu, false);
		}
		if(document.getElementById("mobile_menu")){
			document.getElementById("mobile_menu").addEventListener("click", toggleNav, false);
		}
});

var buffer=new Buffer();
buffer.render=function(cont){
	buffer.setAttribute("id", "buffer");
	buffer.style.display="block";//remains with none attribute, so we either set this display or remove it on done()
	var statements=new Array("Sending Request", "In Just a Moment", "Stream Live");
	var thisStatement=0;
	buffer.innerHTML=statements[thisStatement];
	setInterval(function (){
		thisStatement++;
		if(thisStatement==statements.length){
			thisStatement=0;
		}
		buffer.innerHTML=statements[thisStatement];
	}, 5000);
	document.getElementById(cont).appendChild(buffer);//we don't use the jquery selector here bcoz it'll think thisz an elem
}
buffer.done=function(){
	buffer.style.display="none";
}

function getTwitterFeeds(twt, cont, limit){
	buffer.render(cont);
	var xhr;
	var url="twitterlib?twt_src="+twt+"&limit="+limit+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			buffer.done();
			var data=xhr.responseText;
			//document.getElementById(cont).innerHTML=data;
			data=JSON.parse(data);
				for(var c=0; c<(data.statuses).length; c++){
					var feed=_("article");
					feed.setAttribute("class", "feed");

					var feed_spacer=_("div");
					feed_spacer.setAttribute("class", "spacer");

					//null check for the image
					if(data.statuses[c].entities.media){

						var feed_cover=_("div");
						feed_cover.setAttribute("class", "feed_cover");
						for(var m in (data.statuses[c].entities.media)){
							var img=_("img");
							img.src=data.statuses[c].entities.media[m].media_url;
							feed_cover.appendChild(img);
						}
					}
					var feed_details=_("div");
					feed_details.setAttribute("class", "feed_details");

					var feed_pub_det=_("div");
					feed_pub_det.setAttribute("class", "feed_pub_det");

					var auth_spacer=_("div");
					auth_spacer.setAttribute("class", "spacer");

					var auth_img=_("div");
					auth_img.setAttribute("class", "auth_img");
					var auth_img_img=_("img");
					auth_img_img.src=data.statuses[c].user.profile_image_url;
					auth_img.appendChild(auth_img_img);

					var auth_name=_("div");
					auth_name.setAttribute("class", "auth_name");

					var auth_name_spacer=_("div");
					auth_name_spacer.setAttribute("class", "spacer");

					var auth_name_name=_("div");
					auth_name_name.innerHTML=""+data.statuses[c].user.name+"";
					auth_name_name.setAttribute("class", "auth_name_name");

					var auth_screen_name=_("div");
					auth_screen_name.innerHTML="@"+data.statuses[c].user.screen_name+"";
					auth_screen_name.setAttribute("class", "auth_screen_name");

					auth_name.appendChild(auth_name_name);
					//auth_name.appendChild(auth_screen_name);
					auth_name.appendChild(auth_name_spacer);

					var feed_published=_("div");
					feed_published.setAttribute("class", "feed_published");
					feed_published.innerHTML=data.statuses[c].created_at;

					var auth_details=_("div");
					auth_details.setAttribute("class", "auth_details");
					auth_details.appendChild(auth_name);
					auth_details.appendChild(feed_published);


					var feed_author=_("div");
					feed_author.setAttribute("class", "feed_author");

					feed_author.appendChild(auth_img);
					feed_author.appendChild(auth_details);
					feed_author.appendChild(auth_spacer);

					feed_details.appendChild(feed_author);

					var feed_body=_("div");
					feed_body.setAttribute("class", "feed_body");
					feed_body.innerHTML=data.statuses[c].text;
					feed_details.appendChild(feed_body);

					feed.appendChild(feed_details);
					if(data.statuses[c].entities.media){
						feed.appendChild(feed_cover);

					}


					feed.appendChild(feed_spacer);

					$("#"+cont+"").append(feed);
				}
				$('#'+cont+'').masonry({
					itemSelector:'.feed',
					columnWidth:'.feed',
					isAnimated: true
				});
		}
	}
	xhr.send(null);

}

function getFacebookPageFeeds(fb, cont, limit){
	buffer.render(cont);
	var xhr;
	var url="inc/fun.php?fb_page_feed?fb_src="+fb+"&limit="+limit+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			//alert(fb)
			buffer.done();
			var data=xhr.responseText;
			document.getElementById(cont).innerHTML=data;
			//data=JSON.parse(data);
				/*for(var c=0; c<(data.data).length; c++){

					//alert(c); text, image, user, created_at

					var feed=_("article");
					feed.setAttribute("class", "feed");

					var feed_spacer=_("div");
					feed_spacer.setAttribute("class", "spacer");

					//null check for the image
					if(data.data[c].full_picture){

						var feed_cover=_("div");
						feed_cover.setAttribute("class", "feed_cover");
						var img=_("img");
						img.src=data.data[c].full_picture;
						feed_cover.appendChild(img);

					}
					var feed_details=_("div");
					feed_details.setAttribute("class", "feed_details");

					var feed_pub_det=_("div");
					feed_pub_det.setAttribute("class", "feed_pub_det");

					var auth_spacer=_("div");
					auth_spacer.setAttribute("class", "spacer");

					var auth_img=_("div");
					auth_img.setAttribute("class", "auth_img");
					var auth_img_img=_("img");
					auth_img_img.src="https://graph.facebook.com/"+data.data[c].from.id+"/picture";
					auth_img.appendChild(auth_img_img);

					var auth_name=_("div");
					auth_name.setAttribute("class", "auth_name");

					var auth_name_spacer=_("div");
					auth_name_spacer.setAttribute("class", "spacer");

					var auth_name_name=_("div");
					auth_name_name.innerHTML=""+data.data[c].from.name+"";
					auth_name_name.setAttribute("class", "auth_name_name");

					var auth_screen_name=_("div");
					auth_screen_name.innerHTML="@"+data.data[c].from.name+"";
					auth_screen_name.setAttribute("class", "auth_screen_name");

					auth_name.appendChild(auth_name_name);
					//auth_name.appendChild(auth_screen_name);
					auth_name.appendChild(auth_name_spacer);

					var feed_published=_("div");
					feed_published.setAttribute("class", "feed_published");
					feed_published.innerHTML=data.data[c].created_time;

					var auth_details=_("div");
					auth_details.setAttribute("class", "auth_details");
					auth_details.appendChild(auth_name);
					auth_details.appendChild(feed_published);

					var feed_author=_("div");
					feed_author.setAttribute("class", "feed_author");

					feed_author.appendChild(auth_img);
					feed_author.appendChild(auth_details);
					feed_author.appendChild(auth_spacer);

					feed_details.appendChild(feed_author);

					if(data.data[c].message){
						var feed_body=_("div");
						feed_body.setAttribute("class", "feed_body");
						feed_body.innerHTML=data.data[c].message;
						feed_details.appendChild(feed_body);
					}

					feed.appendChild(feed_details);
					if(data.data[c].full_picture){
						feed.appendChild(feed_cover);

					}
					feed.appendChild(feed_spacer);

					$("#"+cont+"").append(feed);
				}*/
				//var items=$(".feed");alert(items.length);
		}
	}
	xhr.send(null);
}

function Buffer(){
	return _("div");
}

function _(tag_name){
	return document.createElement(tag_name);
}

function addStream(){
	document.getElementById("user_dash_main_feedback").innerHTML="Sending Request...";
	var xhr;
	var url="inc/new_stream.php";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);
	xhr.onreadystatechange=function(){
		document.getElementById("user_dash_main_content").innerHTML='';
		if(xhr.readyState==4 && xhr.status==200){
			document.getElementById("user_dash_main_feedback").innerHTML="&nbsp;";
			var data=xhr.responseText;
			document.getElementById("user_dash_main_content").innerHTML=data;
			//cpanel_buttons
			//we need to getin the SVG via ajax I guess
			document.getElementById("user_dash_main_cpanel").innerHTML='';
			getSVGIcon('ic_save', 'save_stream_button', saveStream);
			getSVGIcon('ic_cancel', 'cancel_stream_button', fetchStream);
		}
	}
	xhr.send(null);
}

function saveStream(){
	document.getElementById("user_dash_main_feedback").innerHTML="Sending...";
	var xhr;
	var url="inc/fun.php?save_stream";
	var name=document.getElementById("new_stream_name").value;//we need to learn the jQuery way of getting the value
	var fb=document.getElementById("new_stream_fb").value;
	var twt=document.getElementById("new_stream_twt").value;
	var fd="name="+name+"&fb="+fb+"&twt="+twt+"";
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
			var data=xhr.responseText;
			var fed_b;
			switch(data){
				case "0":
					fed_b="Oops."
					document.getElementById("user_dash_main_feedback").style.color="#09F";
					document.getElementById("user_dash_main_feedback").innerHTML=fed_b;
					setTimeout(function (){
							document.getElementById("user_dash_main_feedback").innerHTML="&nbsp;";
							document.getElementById("new_stream_name").value="";
							document.getElementById("new_stream_fb").value="";
							document.getElementById("new_stream_twt").value="";
					}, 2000);
				break;
				case "1":
					fetchStream();
				break;
				case "2":
					fed_b="Specify at least one Source."
					document.getElementById("user_dash_main_feedback").style.color="#F00";
					document.getElementById("user_dash_main_feedback").innerHTML=fed_b;
					setTimeout(function (){
							document.getElementById("user_dash_main_feedback").innerHTML="&nbsp;";
							document.getElementById("new_stream_name").value="";
							document.getElementById("new_stream_fb").value="";
							document.getElementById("new_stream_twt").value="";
					}, 2000);
				break;
			}
		}
	}
	xhr.send(fd);
}

function fetchStream(){
	document.getElementById("user_dash_main_feedback").innerHTML="Sending Request...";
	var xhr;
	var url="inc/fun.php?fetch_stream";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			document.getElementById("user_dash_main_content").innerHTML='';
			//cpanel_buttons
			document.getElementById("user_dash_main_cpanel").innerHTML='';
			getSVGIcon('ic_add', 'new_stream_button', addStream);
			document.getElementById("user_dash_main_feedback").innerHTML="&nbsp;";
			var data=xhr.responseText;
			//document.getElementById("user_dash_main_content").innerHTML=data;
			data=JSON.parse(data);
			var tbl=document.createElement("table");
			var tblhead=document.createElement("thead");
			var tblbody=document.createElement("tbody");
			tbl.setAttribute("class", "stream");
			for(var k=0; k<3; k++){
				var col_label=document.createElement("th");
				if(k==0){
					var celltext=document.createTextNode("Name");
					col_label.appendChild(celltext);
					tblhead.appendChild(col_label);
				}
				if(k==1){
					var celltext=document.createTextNode("Status");
					col_label.appendChild(celltext);
					tblhead.appendChild(col_label);
				}
				if(k==2){
					var celltext=document.createTextNode("Created");
					col_label.appendChild(celltext);
					tblhead.appendChild(col_label);
				}
			}
			for(var i in data){
				var id=data[i].id;
				var row=document.createElement("tr");
				row.setAttribute("id", ""+id+"");
				//row.addEventListener("click", readStream(id), false); <- it's missbehaving
				row.setAttribute("onclick", "readStream(this.id);");
				for(var j=0; j<3; j++){
					var cell=document.createElement("td");
					if(j==0){
						var celltext=document.createTextNode(data[i].name);
						cell.appendChild(celltext);
						row.appendChild(cell);
					}
					if(j==1){
						var qty=document.createTextNode(data[i].status);
						cell.appendChild(qty);
						row.appendChild(cell);
					}
					if(j==2){
						var celltext=document.createTextNode(data[i].created);
						cell.appendChild(celltext);
						row.appendChild(cell);
					}
				}
				tblbody.appendChild(row);
			}
			tbl.appendChild(tblhead);
			tbl.appendChild(tblbody);
			document.getElementById("user_dash_main_content").appendChild(tbl);
		}
	}
	xhr.send(null);
}

function readStream(id){
	document.getElementById("user_dash_main_feedback").innerHTML="Sending Request...";
	var xhr;
	var url="inc/fun.php?read_stream&id="+id+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			document.getElementById("user_dash_main_content").innerHTML='';
			//cpanel_buttons
			document.getElementById("user_dash_main_cpanel").innerHTML='';
			getSVGIcon('ic_edit', 'edit_stream_button', editStream(id));//do u realize ur calling the function rightly here? ts nt just an argument of the getSVGIcon fn. try: 'editStream('+id+')'
			getSVGIcon('ic_add', 'new_stream_button', addStream);
			document.getElementById("user_dash_main_feedback").innerHTML="&nbsp;";
			var data=xhr.responseText;
			//document.getElementById("user_dash_main_content").innerHTML=data;
			data=JSON.parse(data);

			for(var i in data){
				var stream_read=_("div");
				stream_read.setAttribute("class", "stream_read");
				var stream_read_spacer=_("div");
				stream_read_spacer.setAttribute("class", "spacer");
				////////////////////////////////////
				var stream_read_header=_("div");
				stream_read_header.setAttribute("class", "stream_read_header");
				var stream_read_header_spacer=_("div");
				stream_read_header_spacer.setAttribute("class", "spacer");

				var stream_read_header_name=_("div");
				stream_read_header_name.setAttribute("class", "stream_read_header_name");
				stream_read_header_name.innerHTML=data[i].name;
				stream_read_header.appendChild(stream_read_header_name);

				var stream_read_header_status=_("div");
				stream_read_header_status.setAttribute("class", "stream_read_header_status");
				stream_read_header_status.innerHTML=data[i].status;
				stream_read_header.appendChild(stream_read_header_status);

				var stream_read_header_created=_("div");
				stream_read_header_created.setAttribute("class", "stream_read_header_created");
				stream_read_header_created.innerHTML=data[i].created;
				stream_read_header.appendChild(stream_read_header_created);
				stream_read_header.appendChild(stream_read_header_spacer);
				/////////////////////////////////////
				var stream_read_main=_("div");
				stream_read_main.setAttribute("class", "stream_read_main");
				var stream_read_main_spacer=_("div");
				stream_read_main_spacer.setAttribute("class", "spacer");
				//we need to loop through the sources array and determine which source is which, and where it should go
				for(var j=0; j<(data[i].sources.length); j++){
					if(data[i].sources[j].type=="Facebook"){
						var stream_read_main_fb=_("div");
						stream_read_main_fb.setAttribute("class", "stream_read_main_fb");
						var stream_read_main_fb_icon=_("div");
						stream_read_main_fb_icon.setAttribute("class", "stream_read_main_fb_icon");
						stream_read_main_fb_icon.innerHTML='<img src="gra/facebook.png" style="width:5em; height:auto;" />';
						stream_read_main_fb.appendChild(stream_read_main_fb_icon);
						stream_read_main_fb.innerHTML+="/"+data[i].sources[j].url;
						stream_read_main.appendChild(stream_read_main_fb);
					}
					else if(data[i].sources[j].type=="Twitter"){
						var stream_read_main_twt=_("div");
						stream_read_main_twt.setAttribute("class", "stream_read_main_twt");
						var stream_read_main_twt_icon=_("div");
						stream_read_main_twt_icon.setAttribute("class", "stream_read_main_twt_icon");
						stream_read_main_twt_icon.innerHTML='<img src="gra/twitter.png" style="width:5em; height:auto;" />';
						stream_read_main_twt.appendChild(stream_read_main_twt_icon);
						stream_read_main_twt.innerHTML+="#"+data[i].sources[j].url;
						stream_read_main.appendChild(stream_read_main_twt);
					}
				}
				stream_read_main.appendChild(stream_read_main_spacer);
				/////////////////////////////////////
				var stream_read_footer=_("div");
				stream_read_footer.setAttribute("class", "stream_read_footer");
				/////////////////////////////////////
				stream_read.appendChild(stream_read_header);
				stream_read.appendChild(stream_read_main);
				stream_read.appendChild(stream_read_footer);
				stream_read.appendChild(stream_read_spacer);
				document.getElementById("user_dash_main_content").appendChild(stream_read);
			}
		}
	}
	xhr.send(null);
}

function editStream(id){
	var xhr=new XMLHttpRequest;
	xhr.open('GET','inc/edit_stream.php?edit_stream&id='+id+'',true);
	xhr.onreadystatechange=function(){
	  if (xhr.readyState!=4) return;
		document.getElementById("user_dash_main_cpanel").innerHTML='';
		getSVGIcon('ic_save', 'save_stream_button', updateStream(id));
		getSVGIcon('ic_cancel', 'cancel_stream_button', readStream(id));
		var data=xhr.responseText;
		document.getElementById("user_dash_main_content").innerHTML=data;
	};
	xhr.send();
}

function updateStream(id){
	document.getElementById("user_dash_main_feedback").innerHTML="Sending...";
	var xhr;
	var url="inc/fun.php?update_stream&id="+id+"";
	var name=document.getElementById("new_stream_name").value;//we need to learn the jQuery way of getting the value
	var fb=document.getElementById("new_stream_fb").value;
	var twt=document.getElementById("new_stream_twt").value;
	var fd="name="+name+"&fb="+fb+"&twt="+twt+"";
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
			var data=xhr.responseText;
			var fed_b;
			switch(data){
				case "0":
					fed_b="Oops."
					document.getElementById("user_dash_main_feedback").style.color="#09F";
					document.getElementById("user_dash_main_feedback").innerHTML=fed_b;
					setTimeout(function (){
							document.getElementById("user_dash_main_feedback").innerHTML="&nbsp;";
							document.getElementById("new_stream_name").value="";
							document.getElementById("new_stream_fb").value="";
							document.getElementById("new_stream_twt").value="";
					}, 2000);
				break;
				case "1":
					fetchStream();
				break;
				case "2":
					fed_b="Specify at least one Source."
					document.getElementById("user_dash_main_feedback").style.color="#F00";
					document.getElementById("user_dash_main_feedback").innerHTML=fed_b;
					setTimeout(function (){
							document.getElementById("user_dash_main_feedback").innerHTML="&nbsp;";
							document.getElementById("new_stream_name").value="";
							document.getElementById("new_stream_fb").value="";
							document.getElementById("new_stream_twt").value="";
					}, 2000);
				break;
			}
		}
	}
	xhr.send(fd);
}

function signUp(){
	document.getElementById("start_signup_footer").innerHTML="Sending...";
	var xhr;
	var url="inc/fun.php?signup_req";
	var email=document.getElementById("signup_email").value;//we need to learn the jQuery way of getting the value
	var password=document.getElementById("signup_password").value;
	var fd="email="+email+"&password="+password+"";
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
			var data=xhr.responseText;
			var fed_b;
			switch(data){
				case "0":
					fed_b="Email not Available. Use a different one, or Sign In."
					document.getElementById("start_signup_footer").style.color="#09F";
				break;
				case "2":
					fed_b="Thank you. Check your mail for a link on how to proceed."
					document.getElementById("start_signup_footer").style.color="#090";
				break;
				case "3":
					fed_b="Something went wrong. Check your connection."
					document.getElementById("start_signup_footer").style.color="#F00";
				break;
				case "4":
					fed_b="Both Fields are Required."
					document.getElementById("start_signup_footer").style.color="#F00";
				break;
				case "1":
					fed_b="Make sure the Email is Valid."
					document.getElementById("start_signup_footer").style.color="#F00";
				break;
			}
			document.getElementById("start_signup_footer").innerHTML=fed_b;
			setTimeout(function (){
					document.getElementById("start_signup_footer").innerHTML="&nbsp;";
					document.getElementById("signup_email").value="";
					document.getElementById("signup_password").value="";
			}, 2000);
		}
	}
	xhr.send(fd);
}

function signIn(){
	document.getElementById("start_signin_footer").innerHTML="Sending...";
	var xhr;
	var url="inc/fun.php?signin_req";
	var email=document.getElementById("signin_email").value;//we need to learn the jQuery way of getting the value
	var password=document.getElementById("signin_password").value;
	var fd="email="+email+"&password="+password+"";
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
			var data=xhr.responseText;
			var fed_b;
			switch(data){
				case "0":
					fed_b="You should consider Signing up."
					document.getElementById("start_signin_footer").style.color="#09F";
				break;
				case "1":
					location.reload(true);//set to true so as to load from server - not browser cache
					fed_b="Redirecting..."
					document.getElementById("start_signin_footer").style.color="#090";
				break;
				case "2":
					fed_b="Both Fields are Required."
					document.getElementById("start_signin_footer").style.color="#F00";
				break;
				case "3":
					fed_b="You're missing out something. <a href='#' style='color:#766968;'>Reset password?</a>"
					document.getElementById("start_signin_footer").style.color="#F00";
				break;
				case "4":
					fed_b="Confirm your Email. <a href='#' style='color:#766968;'>Resend confirmation?</a>"
					document.getElementById("start_signin_footer").style.color="#F00";
				break;
			}
			document.getElementById("start_signin_footer").innerHTML=fed_b;
			setTimeout(function (){
					document.getElementById("start_signin_footer").innerHTML="&nbsp;";
					document.getElementById("signin_email").value="";
					document.getElementById("signin_password").value="";
			}, 3000);
		}
	}
	xhr.send(fd);
}

function toggleMenu(){
	var disp_v=window.getComputedStyle(document.getElementById("user_flyout_menu"), null).getPropertyValue("display");
	if(disp_v=="none"){
		document.getElementById("user_flyout_menu").style.display="block";
	}
	else{
		document.getElementById("user_flyout_menu").style.display="none";
	}
}

function toggleNav(){
	var disp_v=window.getComputedStyle(document.getElementById("mobile_menu_container"), null).getPropertyValue("display");
	if(disp_v=="none"){
		document.getElementById("mobile_menu_container").style.display="block";
	}
	else{
		document.getElementById("mobile_menu_container").style.display="none";
	}
}

function getSVGIcon(type, id, callback){
	var svg;
	var xhr=new XMLHttpRequest;
	xhr.open('GET','gra/'+type+'.svg',true);
	xhr.onreadystatechange=function(){
	  if (xhr.readyState!=4) return;
	  svg=xhr.responseXML.documentElement;
	  svg=document.importNode(svg,true); // surprisingly optional in these browsers
		//<a href="#" class="user_dash_main_cpanel_but" id="new_stream_button" onclick="addStream(); return false;"><?php echo file_get_contents("gra/ic_add.svg"); ?></a>;

		var cpanel_but=_("a");
		//cpanel_but.href="#";
		cpanel_but.setAttribute("class", "user_dash_main_cpanel_but");
		cpanel_but.setAttribute("id", ""+id+"");
		cpanel_but.addEventListener("click", callback, false);
		cpanel_but.appendChild(svg);

	  document.getElementById("user_dash_main_cpanel").appendChild(cpanel_but);
	};
	xhr.send();
}

function getFeed(twt, fb, cont, limit){
	getTwitterFeeds(twt, cont, limit);
	getFacebookPageFeeds(fb, cont, limit);
	//setInterval(getFeed, 1000);
}
