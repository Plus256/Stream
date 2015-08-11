window.onload=initAll;
var n_a; var l_id;

var buffer=new Buffer();
buffer.render=function(cont){
	buffer.setAttribute("id", "buffer");
	buffer.style.display="block";//remains with none attribute, so we either set this display or remove it on done()
	var statements=new Array("Fetching Content", "In Just a Moment", "Stream Live");
	var thisStatement=0;
	buffer.innerHTML=statements[thisStatement];
	setInterval(function (){
		thisStatement++;
		if(thisStatement==statements.length){
			thisStatement=0;
		}
		buffer.innerHTML=statements[thisStatement];
	}, 5000);
	document.getElementById(cont).appendChild(buffer);
}
buffer.done=function(){
	buffer.style.display="none";
	//this.parentNode.removeChild(this);
}

/*
TechShule - a Tech Knowledge Sharing Platform.
Inspiring Innovation (in Africa) [through tech knowledge sharing]

Knowledge is a familiarity, awareness or understanding of someone or something, such as facts, information, descriptions, or skills, which is acquired through experience or education by perceiving, discovering, or learning.

Promoting Creativity/Innovation/Invention
Promote=Nature/Advance/Encourage/Foster

Fostering Innovation
Fostering Creativity

[useful] http://startbloggingonline.com/101-blog-post-ideas-that-make-your-blog-hot/

1. Where I'd like to travel.
2. Web Tuts/Help

Inspiring Creaivity
Inspiring Innovation

Creativity is a phenomenon whereby something new and in some way valuable is created(idea, solution, invention)[wikipedia]
Innovation is a new idea, device or process
*/

function initAll(){
	getTwitterFeeds();
	getFacebookPageFeeds();
}

function getTwitterFeeds(){
	buffer.render("shule_left_container");
	var xhr;
	var url="twitterlib";
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
			data=JSON.parse(data);
				for(var c=0; c<(data.statuses).length; c++){
					var shule=_("div");
					shule.setAttribute("class", "shule");

					var shule_spacer=_("div");
					shule_spacer.setAttribute("class", "spacer");

					//null check for the image
					if(data.statuses[c].entities.media){

						var shule_cover=_("div");
						shule_cover.setAttribute("class", "shule_cover");
						for(var m in (data.statuses[c].entities.media)){
							var img=_("img");
							img.src=data.statuses[c].entities.media[m].media_url;
							shule_cover.appendChild(img);
						}
					}
					var shule_details=_("div");
					shule_details.setAttribute("class", "shule_details");

					var shule_pub_det=_("div");
					shule_pub_det.setAttribute("class", "shule_pub_det");

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

					var shule_published=_("div");
					shule_published.setAttribute("class", "shule_published");
					shule_published.innerHTML=data.statuses[c].created_at;

					var auth_details=_("div");
					auth_details.setAttribute("class", "auth_details");
					auth_details.appendChild(auth_name);
					auth_details.appendChild(shule_published);


					var shule_author=_("div");
					shule_author.setAttribute("class", "shule_author");

					shule_author.appendChild(auth_img);
					shule_author.appendChild(auth_details);
					shule_author.appendChild(auth_spacer);

					shule_details.appendChild(shule_author);

					var shule_body=_("div");
					shule_body.setAttribute("class", "shule_body");
					shule_body.innerHTML=data.statuses[c].text;
					shule_details.appendChild(shule_body);

					shule.appendChild(shule_details);
					if(data.statuses[c].entities.media){
						shule.appendChild(shule_cover);

					}


					shule.appendChild(shule_spacer);

					document.getElementById("shule_left_container").appendChild(shule);



				}
		}
	}
	xhr.send(null);

}

function getFacebookPageFeeds(){
	//buffer.render("shule_left_right_container");
	var xhr;
	var url="inc/fun.php?fb_page_feed";
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
			data=JSON.parse(data);
			//$("shule_left_right_container").innerHTML=data;
				for(var c=0; c<(data.data).length; c++){

					//alert(c); text, image, user, created_at

					var shule=_("div");
					shule.setAttribute("class", "shule");

					var shule_spacer=_("div");
					shule_spacer.setAttribute("class", "spacer");

					//null check for the image
					if(data.data[c].full_picture){

						var shule_cover=_("div");
						shule_cover.setAttribute("class", "shule_cover");
						var img=_("img");
						img.src=data.data[c].full_picture;
						shule_cover.appendChild(img);

					}
					var shule_details=_("div");
					shule_details.setAttribute("class", "shule_details");

					var shule_pub_det=_("div");
					shule_pub_det.setAttribute("class", "shule_pub_det");

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

					var shule_published=_("div");
					shule_published.setAttribute("class", "shule_published");
					shule_published.innerHTML=data.data[c].created_time;

					var auth_details=_("div");
					auth_details.setAttribute("class", "auth_details");
					auth_details.appendChild(auth_name);
					auth_details.appendChild(shule_published);

					var shule_author=_("div");
					shule_author.setAttribute("class", "shule_author");

					shule_author.appendChild(auth_img);
					shule_author.appendChild(auth_details);
					shule_author.appendChild(auth_spacer);

					shule_details.appendChild(shule_author);

					if(data.data[c].message){
						var shule_body=_("div");
						shule_body.setAttribute("class", "shule_body");
						shule_body.innerHTML=data.data[c].message;
						shule_details.appendChild(shule_body);
					}

					shule.appendChild(shule_details);
					if(data.data[c].full_picture){
						shule.appendChild(shule_cover);

					}
					shule.appendChild(shule_spacer);

					document.getElementById("shule_left_container").appendChild(shule);
				}
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
