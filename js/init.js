//be mindful of dual usage of jQuery and pure JavaScript
$(document).ready(function(){
	getTwitterFeeds();
	getFacebookPageFeeds();
});

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
	document.getElementById(cont).appendChild(buffer);//we don't use the jquery selector here bcoz it'll think thisz an elem
}
buffer.done=function(){
	buffer.style.display="none";
}

function getTwitterFeeds(){
	buffer.render("feed_container");
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
					var feed=_("div");
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

					$("#feed_container").append(feed);
				}
				/*$(document).ready(function(){
					var items=$(".feed");alert(items.length);
				});*/
				/*$('#feed_container').imagesLoaded(function(){
					var items=$(".feed");alert(items.length);
					var grid=$('#feed_container').masonry({
						itemSelector:'.feed',
						columnWidth:'.feed',
						isAnimated: true
					});

					//grid.append(items).masonry("appended", items);
				});*/
				$('#feed_container').masonry({
					itemSelector:'.feed',
					columnWidth:'.feed',
					isAnimated: true
				});
		}
	}
	xhr.send(null);

}

function getFacebookPageFeeds(){
	//buffer.render("feed_left_right_container");
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
			//$("feed_left_right_container").innerHTML=data;
				for(var c=0; c<(data.data).length; c++){

					//alert(c); text, image, user, created_at

					var feed=_("div");
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

					$("#feed_container").append(feed);
				}
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
