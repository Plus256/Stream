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
	$(cont).appendChild(buffer);
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

function fetchShule(){
	buffer.render("shule_left_container");
	var xhr;
	var url="fun.php?fetch_shule";
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
			if(n_b.length<(n_a-1)){
				$("load_more_but").style.display="block";
				$("load_more_but").addEventListener("click", loadMore, false);
			}
		}
	}
	xhr.send(null);
}


function $(id){
	return document.getElementById(id);
}

function _(tag_name){
	return document.createElement(tag_name);
}

function moreShule(id){
	buffer.render("more_shule_left");
	var xhr;
	var url="fun.php?more_shule&shule_id="+id+"";
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft:XMLHTTP");
	}
	xhr.open("GET", url);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			$("dashboard").style.display="none";//remove placeholder element
			buffer.done();
			var data=xhr.responseText;
			data=JSON.parse(data);
			var shule=_("div");
			shule.setAttribute("class", "shule");

			var shule_title=_("div");
			shule_title.setAttribute("class", "shule_title");
			shule_title.innerHTML=data.title;
			shule.appendChild(shule_title);

			var shule_pub_det=_("div");
			shule_pub_det.setAttribute("class", "shule_pub_det");

			var shule_author=_("div");
			shule_author.setAttribute("class", "shule_author");
			shule_author.innerHTML="By "+data.author;

			var shule_published=_("div");
			shule_published.setAttribute("class", "shule_published");
			shule_published.innerHTML=data.published;

			var shule_category=_("div");
			shule_category.setAttribute("class", "shule_category");
			shule_category.innerHTML=data.category;
			var shule_category_link=_("a");
			shule_category_link.href="./?cat="+data.category+"";
			shule_category_link.appendChild(shule_category);

			shule_pub_det.appendChild(shule_author);
			shule_pub_det.appendChild(shule_published);
			shule_pub_det.appendChild(shule_category_link);
			shule.appendChild(shule_pub_det);

			var fb_share=_("img");
			fb_share.src="./gra/facebook.png";

			//var twt_share=_("a");
			//twt_share.href="https://twitter.com/share";
			//twt_share.setAttribute("target", "_blank");
			var twt_share=_("img");
			twt_share.src="./gra/twitter.png";
			twt_share.addEventListener("click",function(){
				window.open("https://twitter.com/share?text="+data.title+"&url="+escape(window.location.href), "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600");
			},false);

			var gp_share=_("img");
			gp_share.src="./gra/google.png";
			gp_share.addEventListener("click",function(){
				window.open("https://plus.google.com/share?url="+escape(window.location.href), "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600");
			},false);
			//var fb_share=_("div");
			//fb_share.setAttribute("class", "fb_share");
			//.innerHTML="Share on Facebook";
			fb_share.addEventListener("click", function fbShareDial(){
				/*FB.ui({
				  method: 'share',
				  href: ''+window.location.href+'',
				}, function(response){});
				FB.ui({
				  method: 'share_open_graph',
				  action_type: 'og.likes',
				  action_properties: JSON.stringify({
				      object:''+window.location.href+'',
				  })
				}, function(response){});*/
				window.open("https://www.facebook.com/sharer/sharer.php?s=100&u="+escape(window.location.href)+"&t="+data.title, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
				//window.open("https://www.facebook.com/sharer/sharer.php?s=100&p[title]="+document.title+"&p[summary]=EXAMPLE&p[url]="+escape(window.location.href)+"&p[images][0]=EXAMPLE&u="+escape(window.location.href)+"&t="+document.title+"");
			}, false);

			var social_spacer=_("div");
			social_spacer.setAttribute("class", "spacer");

			var views=_("div");
			views.setAttribute("class", "views");
			views.innerHTML=data.views+" Views";

			var social=_("div");
			social.setAttribute("class", "social");

			social.appendChild(fb_share);
			social.appendChild(twt_share);
			social.appendChild(gp_share);
			social.appendChild(views);
			social.appendChild(social_spacer);
			shule.appendChild(social);

			var shule_cover=_("div");
			shule_cover.setAttribute("class", "dash_cover");
			var img=_("img");
			img.src="img/"+data.cover;
			shule_cover.appendChild(img);
			shule.appendChild(shule_cover);

			var shule_body=_("div");
			shule_body.setAttribute("class", "shule_body");
			shule_body.innerHTML=data.intro;
			shule.appendChild(shule_body);

			$("more_shule_left_this").appendChild(shule);
		}
	}
	xhr.send(null);
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
					auth_name.appendChild(auth_screen_name);
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

					$("shule_left_container").appendChild(shule);



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

					$("shule_left_container").appendChild(shule);
				}
		}
	}
	xhr.send(null);
}

function Buffer(){
	return _("div");
}
