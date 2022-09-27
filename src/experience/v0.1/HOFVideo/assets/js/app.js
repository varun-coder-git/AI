 /*************************************************************************
 * 
 * EQUATIONS WORK CONFIDENTIAL
 * __________________
 * 
 *  [2018] - [2020] Equations Work IT Services Private Limited, India
 *  All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Equations Work IT Services Private Limited and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Equations Work IT Services Private Limited
 * and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Equations Work IT Services Private Limited.
*
 * Copyright (C) Equations Work IT Services Pvt. Ltd.
 * NOTE: Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Owned and written by the proprietors of Equations Work IT Private Limited, India, August 2018
 */


document.querySelector('a-scene').addEventListener('enter-vr', function () {
	vrmodeOn();
    if(screen.width < 1024){  
    var cameraEntity = document.querySelector('#cameraWrapper');
    cameraEntity.setAttribute('position', "0 0 0");
   }
});
var userAgent = navigator.userAgent;
  if (userAgent.includes("Mobile") || userAgent.includes("Android") || userAgent.includes("iPhone")) {
	var cameraId = document.querySelector('#cursorImage');
	cameraId.setAttribute('svgfile','opacity', '1');
  }else{
	var cameraId = document.querySelector('#cursorImage');
	cameraId.setAttribute('svgfile','opacity', '0');
  }
experienceStarted=false;
AFRAME.registerComponent('mouseclick', {
	init: function () {
	
		this.el.addEventListener('mouseenter', function() {
			if(experienceStarted==true){
			focusTime = 0;
			if(startTracking){
				if (this.getAttribute('id').split("-")[2] == 'wall') {
					params.Verb="started Viewing";
					params.Object=this.getAttribute('id').split("-")[1]+" Branding Image";
					params.Sentence=params.Actor+" "+params.Verb+" "+params.Object;
					callToTacking.callToApi(params);
					if(xapiEnable){
						sendToXapi("Viewed", "viewed", params.Object,  params.Object.replace(/\s/g,''));
					}
				}
				else {
					params.Verb="started Viewing";
					params.Object= museum_data.gallery_data[parseInt(this.getAttribute('id').split("-")[1])-1].frame_name;
					params.Sentence=params.Actor+" "+params.Verb+" "+params.Object;
					callToTacking.callToApi(params);
					if(xapiEnable){
						sendToXapi("Viewed", "viewed", params.Object,  params.Object.replace(/\s/g,''));
					}
				}
			}
		}
        });
		
		
		this.el.addEventListener('mouseleave', function() {
			if(experienceStarted==true){
			if(startTracking){
				if (this.getAttribute('id').split("-")[2] == 'wall') {
					params.Verb="completed Viewing";
					params.Object=this.getAttribute('id').split("-")[1]+" Branding Image";
					params.Sentence=params.Actor+" "+params.Verb+" "+params.Object;
					callToTacking.callToApi(params);

					params.Verb="Viewed";
					params.Object=this.getAttribute('id').split("-")[1]+" Branding Image for "+focusTime+" sec";
					params.Sentence=params.Actor+" "+params.Verb+" "+params.Object;
					callToTacking.callToApi(params);
					if(xapiEnable){
						sendToXapi("Viewed", "viewed", params.Object,  params.Object.replace(/\s/g,''));
					}
				}
				else {
					params.Verb="completed Viewing";
					params.Object=museum_data.gallery_data[parseInt(this.getAttribute('id').split("-")[1])-1].frame_name;
					params.Sentence=params.Actor+" "+params.Verb+" "+params.Object;
					callToTacking.callToApi(params);

					params.Verb="Viewed";
					params.Object=museum_data.gallery_data[this.getAttribute('id').split("-")[1]-1].frame_name+" for "+focusTime+" sec";
					params.Sentence=params.Actor+" "+params.Verb+" "+params.Object;
					callToTacking.callToApi(params);
					if(xapiEnable){
						sendToXapi("Viewed", "viewed", params.Object,  params.Object.replace(/\s/g,''));
					}
				}
				focusTime=0;
			}
		}
		});
	}
	
});

var callToTacking = new TrackingData();
var focusTime = 0,screenActiveTime=0;
var framename="";
var action="";
var ExperienceName="";
var startTracking=false;
var xapiEnable=false;
var museum_data={};
function countdown() {
	var cam = document.querySelector("#cameraWrapper");
	cam.emit('skayroation');
	var element = document.getElementById("autoAnimation");
     element.parentNode.removeChild(element);
	// document.getElementsById("autoAnimation").remove();

	startFlagActive();
	var cameraEntity = document.querySelector('#cameraEntity');
    cameraEntity.setAttribute('wasd-controls-enabled','true');
	cameraEntity.setAttribute('keyboard-controls','');
	var sound = document.getElementById('sound');
	sound.setAttribute('src',museum_data.audio_url);
    var audio1 = document.getElementById('audio1');
    audio1.setAttribute("sound", "src:");
    audio1.setAttribute("sound", "src: #sound")
    audio1.components.sound.playSound();

	startTracking=true;
   	callToTacking.callToApi(params);
	addExperienceResult(params.UserId,params.PatronId,params.PublishedExperienceId,0);
    function tick() {
		focusTime++;
		screenActiveTime++;
		if(screenActiveTime==5){
			addExperienceView(params.PatronId,params.PublishedExperienceId);
		}
		if(screenActiveTime%10==0)
			updateExperienceResult(10,0, 0, "N/A");
		setTimeout(tick, 1000);	
    }
    tick();
}
      
var params = 
        {"UserId": "",
        "PatronId": "",
        "PublishedExperienceId": "",
        "RoomId": "",
        "Actor": "",
        "Verb": "",
        "Object": "",
        "Sentence": ""};

function assignVerboseData(data){
	if(data.EnablexAPI==1){
		xapiEnable=true
		callToTacking.setData(true,true);
		setXAPIData(data);
		//IntializeXapi();
	}else
		callToTacking.setData(false,true);
	params.UserId=data.UserId;
	params.PatronId=data.patronId;
	params.PublishedExperienceId=data.Id;
	params.RoomId=data.roomId;
	if(data.patronName!=null)
		params.Actor=data.patronName;
	else
		params.Actor='Guest';
	params.Verb="Started watching";
	params.Object=data.ExperienceName;
	params.Sentence=params.Actor+" Started watching "+data.ExperienceName;
	if(xapiEnable){
		sendToXapi("Launched", "launched", data.ExperienceName,  data.ExperienceName.replace(/\s/g,''));
	}
} 

function sendToXapi(verb, urlVerb, objectText, ObjectUrlName){
	sendVerboseToXapi(verb,"http://adlnet.gov/expapi/verbs/"+urlVerb, objectText, "http://adlnet.gov/expapi/activities/HallOfFrame", "http://id.tincanapi.com/activity/experizer-template/"+ObjectUrlName.toLowerCase(), "http://adlnet.gov/expapi/activities/course", "Activity");
} 

var experienceStarted=false;
function hexToRgb(hex, opacity) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16),
		alpha: opacity
	} : null;
}

function loadExperience(museumData, ExperienceName){
	
	museum_data=museumData;
	ExperienceName=ExperienceName;
	
	//if json includes splashbgcolor and opacity
	if (museum_data.splashBackgroundColor && museum_data.Opacity) {
		var rgbformat = hexToRgb(museum_data.splashBackgroundColor, museum_data.Opacity);
		document.getElementById('innerInfo').style.backgroundColor = "rgba(" + rgbformat.r + "," + rgbformat.g + "," + rgbformat.b + "," + rgbformat.alpha + ")";
	}
	//if json includes splashheadercolor
	if (museum_data.splashHeaderColor) {
		
		document.getElementById('titleText').style.color = museum_data.splashHeaderColor;
	}
	document.getElementById('titleText').innerHTML = ExperienceName;
    document.getElementById('instruction').innerHTML = museum_data.splash_instruction;
    document.getElementById('titleDescription').innerHTML = museum_data.launch_text;
    document.getElementById('splashLogo').src = museum_data.splash_image;
    loggedin = true;
		// if (museum_data["entry_view"]) {
		// 	$("#CamEntity").attr("rotation", museum_data["entry_view"]);
		// }
	var i;
	for (i = 1; i <= museum_data.gallery_data.length; i++) { 
		var gallery_entity = document.querySelector('#gallery-' + i);
		var changedgallery = document.querySelector('#texture-'+i);
		changedgallery.setAttribute('src', museum_data.gallery_data[i-1].image_path);
		gallery_entity.setAttribute('material', 'src: #defaultgallery');	
		gallery_entity.setAttribute('material', 'src: #texture-'+i);	
	var textview = document.getElementById('text-'+i);
		textview.setAttribute('value',museum_data.gallery_data[i-1].image_description);
	}
	
	var north_texture = document.querySelector('#north-texture');
	north_texture.setAttribute('src', museum_data.north_wall);
	var north_wall = document.querySelector('#north-entity');
	north_wall.setAttribute('material', 'src: #defaultgallery');
	north_wall.setAttribute('material', 'src: #north-texture');
	
	var south_texture = document.querySelector('#south-texture');
	south_texture.setAttribute('src', museum_data.south_wall);
	var south_wall = document.querySelector('#south-entity');
	south_wall.setAttribute('material', 'src: #defaultgallery');
	south_wall.setAttribute('material', 'src: #south-texture');
	
	var floortexture = document.querySelector('#floor');
	floortexture.setAttribute('material', 'src: /act/v0.1/wallofframe/assets/textures/' + museum_data.decore_option + '-floor.jpg');
	var floortexture = document.querySelector('#floor2');
	floortexture.setAttribute('material', 'src: /act/v0.1/wallofframe/assets/textures/' + museum_data.decore_option + '-floor.jpg');
	var floortexture = document.querySelector('#floor3');
	floortexture.setAttribute('material', 'src: /act/v0.1/wallofframe/assets/textures/' + museum_data.decore_option + '-floor.jpg');
	var halltexture = document.querySelector('#hall');
	halltexture.setAttribute('material', 'src: /act/v0.1/wallofframe/assets/textures/' + museum_data.decore_option + '-hall.jpg');
}




function getExperienceUrl(){
    var mode="";
    var Url = window.location.href;
     if(Url.indexOf('index-hd.php') > 0){
       $("#onOffSwitch").addClass("onoffswitch1-innerHD");
       mode = "HD mode ON";
  
     }else{
      $("#onOffSwitch").addClass("onoffswitch1-innerSD");
      mode = "SD mode ON";
     }
     document.getElementById("mode").innerHTML = mode;
  }
  $(document).ready(function(){
    makeCode();
      var Url = window.location.href;
      getExperienceUrl()
     
      $("#divOnOff").click(function(){
          $("#divOnOff").prop('disabled', true);
          var mode = '';
          if(Url.indexOf('index-hd.php') > 0){
              var Index = Url.indexOf('index-hd.php');
          var location = Url.slice(0,Index)  + Url.slice(Index + 12);
          window.location = location;
             
         
            }else{
            var Index = Url.indexOf('?');
          var location = Url.slice(0,Index) + "index-hd.php" + Url.slice(Index);
          window.location= location;
            }
      });
    });
    
    function makeCode () {  
      // var qrcode = new QRCode("qrcode", {
      //     text: window.location.href,
      //     width: 90,
      //     height: 90,
      //     colorDark : "#000000",
      //     colorLight : "#ffffff",
      //     correctLevel : QRCode.CorrectLevel.H
      // });
      console.log("barcode" );
      var url = 'https://api.qrserver.com/v1/create-qr-code/?data='+window.location.href+'&amp;size=50x50';
      console.log("barcode",url);
      document.getElementById("qrcode").src = url;
      // qrcode.makeCode(window.location.href);
  }

var startexp = function () {
    var start = document.getElementById("start_experience");
    if (assetsLoaded && loggedin) {
        var loading=document.getElementById("loading");
            loading.classList.add("disabled");  
        if (start.classList.contains("disabled")) {
            start.classList.remove("disabled");
             clearTimeout(timer);
        }
    }
}
var timer = setInterval(startexp, 500);
var assetsLoaded = false;
var loggedin = false;
$(window).on('load', function () {
    setTimeout(function () {
        assetsLoaded = true;
    }, 3000);
})

