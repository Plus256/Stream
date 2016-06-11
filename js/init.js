var msg_placeholder="Write Message Here...";
var last_id;//AS A RULE OF THUMB ALWAYS USE THIS FOR LAST ID CALLS
var str_id;//VERY KEY
var str_state;//VERY KEY
var check_latest_process=null;//used to clear the interval
$(document).ready(function(){
	$("#signup_button").click(signUp);
	$("#signin_button").click(signIn);
	if(document.getElementById("mobile_menu_icon")){
		document.getElementById("mobile_menu_icon").addEventListener("click", function(){
			document.getElementById("mobile_menu_container").style.display="block";
		}, false);
	}
	if(document.getElementById("menu_drawer_cancel")){
		document.getElementById("menu_drawer_cancel").addEventListener("click", function(){
			document.getElementById("mobile_menu_container").style.display="none";
		}, false);
	}
	if(document.getElementById("user_flyout")){
		document.getElementById("user_flyout_dp").addEventListener("click", toggleMenu, false);
	}
	if(document.getElementById("trend_main")){//why is $("#feed_container") returning true even when elem is absent? is it because of the HTML5 <section> elem?
		//getFeed("uganda", "trend_main", 10);//pass container as argument
	}
});

function _(tag_name){
	return document.createElement(tag_name);
}

function addStream(){
	if(check_latest_process!==null){
		clearInterval(check_latest_process);
	}
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
			getSVGIcon('ic_save', 'save_stream_button', saveStream, "user_dash_main_cpanel");
			getSVGIcon('ic_cancel', 'cancel_stream_button', fetchStream, "user_dash_main_cpanel");
		}
	}
	xhr.send(null);
}

function saveStream(){
	document.getElementById("user_dash_main_feedback").innerHTML="Sending...";
	var xhr;
	var url="inc/fun.php?save_stream";
	var keywords=document.getElementById("keywords").value;//we need to learn the jQuery way of getting the value
	var fd="keywords="+keywords+"";
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
			//console.log(data);
			var fed_b;
			switch(data){
				case "1":
					fetchStream();
				break;
				case "0":
					fed_b="Choose at least one Keyword."
					document.getElementById("user_dash_main_feedback").style.color="#F00";
					document.getElementById("user_dash_main_feedback").innerHTML=fed_b;
					setTimeout(function (){
							document.getElementById("user_dash_main_feedback").innerHTML="&nbsp;";
							document.getElementById("keywords").value="";
					}, 2000);
				break;
			}
		}
	}
	xhr.send(fd);
}

function fetchStream(){
	if(check_latest_process!==null){
		clearInterval(check_latest_process);
	}
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
			getSVGIcon('ic_add', 'new_stream_button', addStream, "user_dash_main_cpanel");
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
					var celltext=document.createTextNode("Keywords");
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
						var celltext=document.createTextNode(data[i].keywords);
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
			//tbl.appendChild(tblhead);
			tbl.appendChild(tblbody);
			document.getElementById("user_dash_main_content").appendChild(tbl);
		}
	}
	xhr.send(null);
}

function readStream(id){
	str_id=id;//value to send with request
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
				stream_read_header_name.innerHTML=data[i].keywords;
				
				var stream_read_header_new_feeds=_("a");
				stream_read_header_new_feeds.setAttribute("class", "user_dash_main_cpanel_but");
				stream_read_header_new_feeds.setAttribute("id", "stream_read_header_new_feeds");
				stream_read_header_new_feeds.innerHTML="0";
				stream_read_header_new_feeds.addEventListener("click", function(){userStreamDisplayLatest(id);}, false);

				str_state=data[i].status;

				var stream_read_header_status=_("div");
				stream_read_header_status.setAttribute("class", "stream_read_header_status");
				stream_read_header_status.setAttribute("id", "stream_read_header_status");
				stream_read_header.appendChild(stream_read_header_status);

				var stream_read_header_created=_("div");
				stream_read_header_created.setAttribute("class", "stream_read_header_created");
				stream_read_header_created.innerHTML=data[i].created;
				stream_read_header.appendChild(stream_read_header_created);
				//keywords
				stream_read_header.appendChild(stream_read_header_name);
				stream_read_header.appendChild(stream_read_header_new_feeds);
				stream_read_header.appendChild(stream_read_header_spacer);
				/////////////////////////////////////
				var stream_read_main=_("div");
				stream_read_main.setAttribute("class", "stream_read_main");
				stream_read_main.setAttribute("id", "stream_read_main");
				var grid_sizer=_("div");
				grid_sizer.setAttribute("class", "grid_sizer");
				var stream_read_main_spacer=_("div");
				stream_read_main_spacer.setAttribute("class", "spacer");
				stream_read_main.appendChild(grid_sizer);
				stream_read_main.appendChild(stream_read_main_spacer);
				/////////////////////////////////////
				var stream_read_footer=_("div");
				stream_read_footer.setAttribute("id", "stream_read_footer");
				/////////////////////////////////////
				stream_read.appendChild(stream_read_header);
				stream_read.appendChild(stream_read_main);
				stream_read.appendChild(stream_read_footer);
				stream_read.appendChild(stream_read_spacer);
				document.getElementById("user_dash_main_content").appendChild(stream_read);
				userStreamDisplay(id);
			}
			getSVGIcon('ic_edit', 'edit_stream_button', editStream, "user_dash_main_cpanel");
			getSVGIcon('ic_add', 'new_stream_button', addStream, "user_dash_main_cpanel");
			getSVGIcon('ic_fullscreen', 'fullscreen_stream_button', fullScreen, "user_dash_main_cpanel");
			getSVGIcon('ic_power', 'power_stream_button', toggleStatus, "stream_read_header_status");
		}
	}
	xhr.send(null);
}

function editStream(){
	if(check_latest_process!==null){
		clearInterval(check_latest_process);
	}
	var xhr=new XMLHttpRequest;
	xhr.open('GET','inc/edit_stream.php?edit_stream&id='+str_id+'',true);
	xhr.onreadystatechange=function(){
	  if (xhr.readyState!=4) return;
		document.getElementById("user_dash_main_cpanel").innerHTML='';
		getSVGIcon('ic_save', 'save_stream_button', updateStream, "user_dash_main_cpanel");
		getSVGIcon('ic_cancel', 'cancel_stream_button', returnToStream, "user_dash_main_cpanel");
		var data=xhr.responseText;
		document.getElementById("user_dash_main_content").innerHTML=data;
	};
	xhr.send();
}

function updateStream(){
	document.getElementById("user_dash_main_feedback").innerHTML="Sending...";
	var xhr;
	var url="inc/edit_stream.php?update_stream&id="+str_id+"";
	var keywords=document.getElementById("keywords").value;
	var fd="keywords="+keywords+"";
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
				case "1":
					returnToStream();
				break;
				case "0":
					fed_b="Choose at least one Keyword."
					document.getElementById("user_dash_main_feedback").style.color="#F00";
					document.getElementById("user_dash_main_feedback").innerHTML=fed_b;
					setTimeout(function (){
							document.getElementById("user_dash_main_feedback").innerHTML="&nbsp;";
							document.getElementById("keywords").value="";
					}, 2000);
				break;
			}
		}
	}
	xhr.send(fd);
}

function returnToStream(){
	document.getElementById("user_dash_main_feedback").innerHTML="Sending Request...";
	var xhr;
	var url="inc/fun.php?read_stream&id="+str_id+"";
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
				stream_read_header_name.innerHTML=data[i].keywords;
				
				var stream_read_header_new_feeds=_("a");
				stream_read_header_new_feeds.setAttribute("class", "user_dash_main_cpanel_but");
				stream_read_header_new_feeds.setAttribute("id", "stream_read_header_new_feeds");
				stream_read_header_new_feeds.innerHTML="0";
				stream_read_header_new_feeds.addEventListener("click", function(){userStreamDisplayLatest(str_id);}, false);

				str_state=data[i].status;

				var stream_read_header_status=_("div");
				stream_read_header_status.setAttribute("class", "stream_read_header_status");
				stream_read_header_status.setAttribute("id", "stream_read_header_status");
				stream_read_header.appendChild(stream_read_header_status);

				var stream_read_header_created=_("div");
				stream_read_header_created.setAttribute("class", "stream_read_header_created");
				stream_read_header_created.innerHTML=data[i].created;
				stream_read_header.appendChild(stream_read_header_created);
				//keywords
				stream_read_header.appendChild(stream_read_header_name);
				stream_read_header.appendChild(stream_read_header_new_feeds);
				stream_read_header.appendChild(stream_read_header_spacer);
				/////////////////////////////////////
				var stream_read_main=_("div");
				stream_read_main.setAttribute("class", "stream_read_main");
				var stream_read_main_spacer=_("div");
				stream_read_main_spacer.setAttribute("class", "spacer");
				stream_read_main.appendChild(stream_read_main_spacer);
				/////////////////////////////////////
				var stream_read_footer=_("div");
				stream_read_footer.setAttribute("id", "stream_read_footer");
				/////////////////////////////////////
				stream_read.appendChild(stream_read_header);
				stream_read.appendChild(stream_read_main);
				stream_read.appendChild(stream_read_footer);
				stream_read.appendChild(stream_read_spacer);
				document.getElementById("user_dash_main_content").appendChild(stream_read);
				userStreamDisplay(str_id);
			}
			getSVGIcon('ic_edit', 'edit_stream_button', editStream, "user_dash_main_cpanel");
			getSVGIcon('ic_add', 'new_stream_button', addStream, "user_dash_main_cpanel");
			getSVGIcon('ic_fullscreen', 'fullscreen_stream_button', fullScreen, "user_dash_main_cpanel");
			getSVGIcon('ic_power', 'power_stream_button', toggleStatus, "stream_read_header_status");
		}
	}
	xhr.send(null);
}

function signUp(){
	document.getElementById("signup_footer").innerHTML="Sending...";
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
			//console.log(data);
			var fed_b;
			switch(data){
				case "0":
					fed_b="Email not Available. Use a different one, or Sign In."
					document.getElementById("signup_footer").style.color="#09F";
				break;
				case "2":
					fed_b="Thank you. Check your mail for a link on how to proceed."
					document.getElementById("signup_footer").style.color="#090";
				break;
				case "3":
					fed_b="Confirmation not sent. Please try again later."
					document.getElementById("signup_footer").style.color="#F00";
				break;
				case "4":
					fed_b="Both Fields are Required."
					document.getElementById("signup_footer").style.color="#F00";
				break;
				case "1":
					fed_b="Make sure the Email is Valid."
					document.getElementById("signup_footer").style.color="#F00";
				break;
			}
			document.getElementById("signup_footer").innerHTML=fed_b;
			setTimeout(function (){
					document.getElementById("signup_footer").innerHTML="&nbsp;";
					//document.getElementById("signup_email").value="";
					document.getElementById("signup_password").value="";
			}, 2000);
		}
	}
	xhr.send(fd);
}

function signIn(){
	document.getElementById("signin_footer").innerHTML="Sending...";
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
					document.getElementById("signin_footer").style.color="#09F";
				break;
				case "1":
					//location.reload(true);//set to true so as to load from server - not browser cache
					window.location.href="./";
					fed_b="Redirecting..."
					document.getElementById("signin_footer").style.color="#090";
				break;
				case "2":
					fed_b="Both Fields are Required."
					document.getElementById("signin_footer").style.color="#F00";
				break;
				case "3":
					fed_b="You're missing out something. <a href='#' style='color:#766968;'>Reset password?</a>"
					document.getElementById("signin_footer").style.color="#F00";
				break;
				case "4":
					fed_b="Confirm your Email. <a href='#' style='color:#766968;'>Resend confirmation?</a>"
					document.getElementById("signin_footer").style.color="#F00";
				break;
			}
			document.getElementById("signin_footer").innerHTML=fed_b;
			setTimeout(function (){
					document.getElementById("signin_footer").innerHTML="&nbsp;";
					//document.getElementById("signin_email").value="";
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

function toggleStatus(){
	if(str_state==0){//draft
		document.getElementById("power_stream_button").style.background="rgb(0, 153, 255)";
		str_state=1;
		upState(1);//make live
	}
	else{//live
		document.getElementById("power_stream_button").style.background="rgb(238, 238, 238)";
		str_state=0;
		upState(0);//make draft
	}
}

function getSVGIcon(type, id, callback, cont){
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
		//cpanel_but.setAttribute("onclick", ""+callback+"()");
		cpanel_but.appendChild(svg);

	  document.getElementById(cont).appendChild(cpanel_but);
		if(document.getElementById("power_stream_button")){//state color
			if(str_state==0){//draft
				document.getElementById("power_stream_button").style.background="rgb(238, 238, 238)";
			}
			else{//live
				document.getElementById("power_stream_button").style.background="rgb(0, 153, 255)";
			}
		}
	};
	xhr.send();
}

function upState(state){
	var xhr;
	var url="inc/edit_stream.php?up_state&id="+str_id+"";
	var fd="state="+state+"";
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
					fed_b="Stream has been Stopped.";
					document.getElementById("user_dash_main_feedback").style.color="#000";
					document.getElementById("user_dash_main_feedback").innerHTML=fed_b;
					setTimeout(function (){
							document.getElementById("user_dash_main_feedback").innerHTML="&nbsp;";
					}, 3000);
					if(check_latest_process!==null){//stop checking for new ones
						clearInterval(check_latest_process);
					}
				break;
				case "1":
					clearInterval(check_latest_process);
					fed_b="Stream has gone Live.";
					document.getElementById("user_dash_main_feedback").style.color="#09F";
					document.getElementById("user_dash_main_feedback").innerHTML=fed_b;
					setTimeout(function (){
							document.getElementById("user_dash_main_feedback").innerHTML="&nbsp;";
					}, 3000);
					check_latest_process=setInterval(function(){//wrap parameterized callback in a function definition
						userStreamCheckLatest(str_id);//this is the callback with two arguments
					}, 1000);
				break;
			}
		}
	}
	xhr.send(fd);
}

function getTrending(){
	var follow_main=document.getElementById("follow_main");
	var buffer=new Buffer(follow_main);
	buffer.render();
	var xhr;
	var url="inc/fun.php?get_trending";
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
			//document.getElementById("trend_main").innerHTML=data;
			data=JSON.parse(data);
			for(var c=0; c<data.length; c++){
				last_id=data[0].id;//to cater for descending order of fetching - rem last is least!
				var jsnobj=JSON.parse(data[c].json);
				if(jsnobj.entities.urls){
					for(var u in (jsnobj.entities.urls)){
						var data_url=jsnobj.entities.urls[u].url;
						//console.log(data_url);
					}
				}
				var feed=_("article");
				feed.setAttribute("class", "feed");

				var feed_spacer=_("div");
				feed_spacer.setAttribute("class", "spacer");

				//null check for the image
				if(jsnobj.entities.media){

					var feed_cover=_("div");
					feed_cover.setAttribute("class", "feed_cover");
					for(var m in (jsnobj.entities.media)){
						var img=_("img");
						img.src=jsnobj.entities.media[m].media_url;
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
				auth_img_img.src=jsnobj.user.profile_image_url;
				auth_img.appendChild(auth_img_img);

				var auth_name=_("div");
				auth_name.setAttribute("class", "auth_name");

				var auth_name_spacer=_("div");
				auth_name_spacer.setAttribute("class", "spacer");

				var auth_name_name=_("div");
				auth_name_name.innerHTML=""+jsnobj.user.name+"";
				auth_name_name.setAttribute("class", "auth_name_name");

				var auth_screen_name=_("div");
				auth_screen_name.innerHTML="@"+jsnobj.user.screen_name+"";
				auth_screen_name.setAttribute("class", "auth_screen_name");

				auth_name.appendChild(auth_name_name);
				//auth_name.appendChild(auth_screen_name);
				auth_name.appendChild(auth_name_spacer);

				var feed_published=_("div");
				feed_published.setAttribute("class", "feed_published");
				var occured=parseInt(jsnobj.timestamp_ms);
				var feed_occured=elapsedTime(occured);
				feed_published.innerHTML=feed_occured;

				var auth_details=_("div");
				auth_details.setAttribute("class", "auth_details");
				auth_details.appendChild(auth_name);
				auth_details.appendChild(feed_published);


				var feed_author=_("a");
				if(jsnobj.entities.urls){
					feed_author.href=data_url;
				}
				feed_author.setAttribute("class", "feed_author");
				feed_author.setAttribute("target", "_NEW");

				feed_author.appendChild(auth_img);
				feed_author.appendChild(auth_details);
				feed_author.appendChild(auth_spacer);

				feed_details.appendChild(feed_author);

				var feed_body=_("div");
				feed_body.setAttribute("class", "feed_body");
				feed_body.innerHTML=jsnobj.text;
				feed_details.appendChild(feed_body);

				feed.appendChild(feed_details);
				if(jsnobj.entities.media){
					feed.appendChild(feed_cover);
				}


				feed.appendChild(feed_spacer);

				$("#follow_main").append(feed);
			}
			var grid=$('#follow_main').masonry({
				itemSelector:'.feed',
				columnWidth:'.grid_sizer',
				percentPosition: true
			});
			grid.imagesLoaded().progress( function() {
			  grid.masonry('layout');
			});
			//At this Point Run a Process to Check for New Statuses when needed.
		}
	}
	xhr.send(null);
}

function Buffer(wrapper){
	var svg;
	this.render=function(){
		var xhr=new XMLHttpRequest;
		xhr.open('GET','gra/logo.svg',true);
		xhr.onreadystatechange=function(){
			if (xhr.readyState!=4) return;
			svg=xhr.responseXML.documentElement;
			svg=document.importNode(svg, true);
			//svg.style.transform='rotate(-1000deg)';
			wrapper.style.textAlign='center';
			wrapper.appendChild(svg);
		}
		xhr.send();
	}
	this.done=function(){
		wrapper.removeChild(svg);
		wrapper.style.textAlign='left';
	}
}

function userStreamDisplay(id){
	/*var stream_read_main=$(".stream_read_main");
	console.log(stream_read_main);
	var buffer=new Buffer(stream_read_main);
	buffer.render();*/
	var xhr;
	var url="inc/fun.php?user_stream_display&id="+id+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			//buffer.done();
			var data=xhr.responseText;
			//console.log(data);
			if(data!="[]"){//not empty
				try{
					data=JSON.parse(data);
					for(var c=0; c<data.length; c++){
						last_id=data[0].id;//to cater for descending order of fetching - rem last is least!
						var jsnobj=JSON.parse(data[c].json);
						if(jsnobj.entities.urls){
							for(var u in (jsnobj.entities.urls)){
								var data_url=jsnobj.entities.urls[u].url;
								//console.log(data_url);
							}
						}
						var feed=_("article");
						feed.setAttribute("class", "feed");
		
						var feed_spacer=_("div");
						feed_spacer.setAttribute("class", "spacer");
		
						//null check for the image
						if(jsnobj.entities.media){
		
							var feed_cover=_("div");
							feed_cover.setAttribute("class", "feed_cover");
							for(var m in (jsnobj.entities.media)){
								var img=_("img");
								img.src=jsnobj.entities.media[m].media_url;
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
						auth_img_img.src=jsnobj.user.profile_image_url;
						auth_img.appendChild(auth_img_img);
		
						var auth_name=_("div");
						auth_name.setAttribute("class", "auth_name");
		
						var auth_name_spacer=_("div");
						auth_name_spacer.setAttribute("class", "spacer");
		
						var auth_name_name=_("div");
						auth_name_name.innerHTML=""+jsnobj.user.name+"";
						auth_name_name.setAttribute("class", "auth_name_name");
		
						var auth_screen_name=_("div");
						auth_screen_name.innerHTML="@"+jsnobj.user.screen_name+"";
						auth_screen_name.setAttribute("class", "auth_screen_name");
		
						auth_name.appendChild(auth_name_name);
						//auth_name.appendChild(auth_screen_name);
						auth_name.appendChild(auth_name_spacer);
		
						var feed_published=_("div");
						feed_published.setAttribute("class", "feed_published");
						var occured=parseInt(jsnobj.timestamp_ms);
						var feed_occured=elapsedTime(occured);
						feed_published.innerHTML=feed_occured;
		
						var auth_details=_("div");
						auth_details.setAttribute("class", "auth_details");
						auth_details.appendChild(auth_name);
						auth_details.appendChild(feed_published);
		
		
						var feed_author=_("a");
						if(jsnobj.entities.urls){
							feed_author.href=data_url;
						}
						feed_author.setAttribute("class", "feed_author");
						feed_author.setAttribute("target", "_NEW");
		
						feed_author.appendChild(auth_img);
						feed_author.appendChild(auth_details);
						feed_author.appendChild(auth_spacer);
		
						feed_details.appendChild(feed_author);
		
						var feed_body=_("div");
						feed_body.setAttribute("class", "feed_body");
						feed_body.innerHTML=jsnobj.text;
						feed_details.appendChild(feed_body);
		
						feed.appendChild(feed_details);
						if(jsnobj.entities.media){
							feed.appendChild(feed_cover);
						}
		
		
						feed.appendChild(feed_spacer);
		
						$(".stream_read_main").append(feed);
					}
					var grid=$('#stream_read_main').masonry({
						itemSelector:'.feed',
						columnWidth:'.grid_sizer',
						percentPosition: true
					});
					grid.imagesLoaded().progress( function() {
					  grid.masonry('layout');
					});
				}
				catch(e){console.log(e+"<br />"+data);}//track json error
			}
			check_latest_process=setInterval(function(){//wrap parameterized callback in a function definition
				userStreamCheckLatest(id);//this is the callback with two arguments
			}, 1000);
		}
	}
	xhr.send(null);
}

function userStreamDisplayLatest(stream_id){
	var xhr;
	var url="inc/fun.php?user_stream_display_latest&last_id="+last_id+"&stream_id="+stream_id+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var grid=$('#stream_read_main').masonry({
				itemSelector:'.feed',
				columnWidth:'.grid_sizer',
				percentPosition: true
			});
			var data=xhr.responseText;
			if(data!="[]"){//not empty
				//document.getElementById("trend_main").innerHTML=data;
				//stop the current check process and start a new one to avoid conflicting and useless child processes that weigh on the browser, or even produce undesirable results
				//kill previous process and listen for more - again
				/**the return value of setInterval is just a unique id you use to pass back to clearInterval.
				//It's not a structured object with any additional information, nor does it get set to null when you call clearTimeout.
				//clearInterval doesn't return anything. It will always be undefined and never true or false.*/
				clearInterval(check_latest_process);
				try{
					data=JSON.parse(data);
					//console.log(last_id+"-"+data.length);
					for(var c=0; c<data.length; c++){
						last_id=data[c].id;
						var jsnobj=JSON.parse(data[c].json);
						if(jsnobj.entities.urls){
							for(var u in (jsnobj.entities.urls)){
								var data_url=jsnobj.entities.urls[u].url;
								//console.log(data_url);
							}
						}
						var feed=_("article");
						feed.setAttribute("class", "feed");
		
						var feed_spacer=_("div");
						feed_spacer.setAttribute("class", "spacer");
		
						//null check for the image
						if(jsnobj.entities.media){
		
							var feed_cover=_("div");
							feed_cover.setAttribute("class", "feed_cover");
							for(var m in (jsnobj.entities.media)){
								var img=_("img");
								img.src=jsnobj.entities.media[m].media_url;
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
						auth_img_img.src=jsnobj.user.profile_image_url;
						auth_img.appendChild(auth_img_img);
		
						var auth_name=_("div");
						auth_name.setAttribute("class", "auth_name");
		
						var auth_name_spacer=_("div");
						auth_name_spacer.setAttribute("class", "spacer");
		
						var auth_name_name=_("div");
						auth_name_name.innerHTML=""+jsnobj.user.name+"";
						auth_name_name.setAttribute("class", "auth_name_name");
		
						var auth_screen_name=_("div");
						auth_screen_name.innerHTML="@"+jsnobj.user.screen_name+"";
						auth_screen_name.setAttribute("class", "auth_screen_name");
		
						auth_name.appendChild(auth_name_name);
						//auth_name.appendChild(auth_screen_name);
						auth_name.appendChild(auth_name_spacer);
		
						var feed_published=_("div");
						feed_published.setAttribute("class", "feed_published");
						var occured=parseInt(jsnobj.timestamp_ms);
						var feed_occured=elapsedTime(occured);
						feed_published.innerHTML=feed_occured;
		
						var auth_details=_("div");
						auth_details.setAttribute("class", "auth_details");
						auth_details.appendChild(auth_name);
						auth_details.appendChild(feed_published);
		
		
						var feed_author=_("a");
						if(jsnobj.entities.urls){
							feed_author.href=data_url;
						}
						feed_author.setAttribute("class", "feed_author");
						feed_author.setAttribute("target", "_NEW");
		
						feed_author.appendChild(auth_img);
						feed_author.appendChild(auth_details);
						feed_author.appendChild(auth_spacer);
		
						feed_details.appendChild(feed_author);
		
						var feed_body=_("div");
						feed_body.setAttribute("class", "feed_body");
						feed_body.innerHTML=jsnobj.text;
						feed_details.appendChild(feed_body);
		
						feed.appendChild(feed_details);
						if(jsnobj.entities.media){
							feed.appendChild(feed_cover);
						}
		
		
						feed.appendChild(feed_spacer);
		
						//$(".stream_read_main").prepend(feed);
						
						grid.prepend(feed).masonry('prepended', feed);
						grid.imagesLoaded().progress( function() {
						  grid.masonry('layout');
						});
					}
					//THANK YOU JESUS
					check_latest_process=setInterval(function(){//wrap parameterized callback in a function definition
						userStreamCheckLatest(stream_id);//this is the callback with two arguments
					}, 1000);
				}
				catch(e){console.log(e+"<br />"+data);}//track json error
			}
		}
	}
	xhr.send(null);
}

function fullScreen(){
	var elem = document.getElementById("stream_read_main");
	if (elem.requestFullscreen) {
	  elem.requestFullscreen();
	} else if (elem.msRequestFullscreen) {
	  elem.msRequestFullscreen();
	} else if (elem.mozRequestFullScreen) {
	  elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) {
	  elem.webkitRequestFullscreen();
	}
}

function userStreamCheckLatest(stream_id){
	var xhr;
	var url="inc/fun.php?user_stream_check_latest&last_id="+last_id+"&stream_id="+stream_id+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			//document.getElementById("trend_main").innerHTML='';
			var data=xhr.responseText;
			var new_feed_container=document.getElementById("stream_read_header_new_feeds");
			if(data!="[]"){//not empty
				try{
					data=JSON.parse(data);
					new_feed_container.innerHTML=data.length;
					var new_feeds=parseInt(new_feed_container.innerHTML);
					if(new_feeds>10){
						new_feed_container.innerHTML="10+";
					}
				}
				catch(e){console.log(e+"<br />"+data);}//track json error
			}
			else{
				new_feed_container.innerHTML="0";//reset
			}
			//calling setInterval in its own self is a bad idea here. it means whenever this function is called, a different value
			//of check_latest_process is made available during the period of execution of the block
			//and many other complexities
			//console.log(check_latest_process);
			//console.log(last_id);
			//console.log(data.length);
		}
	}
	xhr.send(null);
}

function elapsedTime(occured){
	var now_stamp=Date.now();
	var elapsed_time=Math.abs(Math.floor((now_stamp-occured)/1000));//difference converted to seconds
	if(elapsed_time<60){
		if(elapsed_time==1){
			elapsed_time=elapsed_time+" Second Ago";
		}
		else{
			elapsed_time=elapsed_time+" Seconds Ago";
		}
	}
	else if(elapsed_time>=60 && elapsed_time<(60*60)){
		elapsed_time=Math.floor(elapsed_time/(60));
		if(elapsed_time==1){
			elapsed_time=elapsed_time+" Minute Ago";
		}
		else{
			elapsed_time=elapsed_time+" Minutes Ago";
		}
	}
	else if(elapsed_time>=(60*60) && elapsed_time<(60*60*24)){
		elapsed_time=Math.floor(elapsed_time/(60*60));
		if(elapsed_time==1){
			elapsed_time=elapsed_time+" Hour Ago";
		}
		else{
			elapsed_time=elapsed_time+" Hours Ago";
		}
	}
	else if(elapsed_time>=(60*60*24) && elapsed_time<(60*60*24*7)){
		elapsed_time=Math.floor(elapsed_time/(60*60*24));
		if(elapsed_time==1){
			elapsed_time=elapsed_time+" Day Ago";
		}
		else{
			elapsed_time=elapsed_time+" Days Ago";
		}
	}
	else{
		var month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		elapsed_time=new Date(occured);
		elapsed_time=month_names[elapsed_time.getMonth()]+" "+elapsed_time.getDate()+", "+elapsed_time.getFullYear();
	}
	return elapsed_time;
}

function twitterOauth(){
	console.log('Not doing JS oAuth!');
	//var callback="http://stream.ug";
	//window.open("https://api.twitter.com/oauth/request_token?oauth_callback="+encodeURIComponent(callback)+"&oauth_consumer_key=jJKTm9IwzRo1dKKP87WX8Fjkp", "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600");
	//window.open("https://api.twitter.com/oauth/authorize", "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600");
}