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
var experienceStarted = false;
function hexToRgb(hex, opacity) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16),
		alpha: opacity
	} : null;
}
// var userAgent = navigator.userAgent;
// if (userAgent.includes("Mobile") || userAgent.includes("Android") || userAgent.includes("iPhone")) {
// 	var cameraId = document.querySelector('#cursorImage');
// 	cameraId.setAttribute('material', 'opacity', '1');
// } else {
// 	var cameraId = document.querySelector('#cursorImage');
// 	cameraId.setAttribute('material', 'opacity', '0');
// }

AFRAME.registerComponent('ristrict', {
	init: function () {
	  this.el.addEventListener('collide', function (e) {
		console.log('Player has collided with ', e.detail.body.el);
		e.detail.target.el; // Original entity (playerEl).
		e.detail.body.el; // Other entity, which playerEl touched.
		e.detail.contact; // Stats about the collision (CANNON.ContactEquation).
		e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
	  });
	}
  })

function initializePreview(experienceJSON, ExperienceName) {
	
	museum_data = JSON.parse(experienceJSON);
	console.log("json",museum_data);
	$("#loaderq").addClass("hidden-login");
	$("#innerInfo").removeClass("hidden-login");
	var instructionSet = museum_data.splash_instruction;
	var lunchTextSet = museum_data.launch_text;


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
	document.getElementById('instruction').innerHTML = instructionSet;
	document.getElementById('titleDescription').innerHTML = lunchTextSet;
	document.getElementById('splashLogo').src = museum_data.splash_image;
	loadExperience(museum_data);
	loggedin = true;
	if (museum_data["entry_view"]) {
		// $("#CamEntity").attr("rotation", museum_data["entry_view"]);
		// $("#mainCam").attr("position", museum_data["entry_position"]);
	}
}

$(document).ready(() => {
	var startExperienteBtn = document.getElementById('start_experience');

	startExperienteBtn.onclick = function () {
		// var CamEntity = document.querySelector('#CamEntity');
		// var camera = document.querySelector('#mainCam');
		// CamEntity.removeChild(camera);
		// var mainCam = document.createElement('a-entity');
		// mainCam.setAttribute('id','mainCam');
		// mainCam.setAttribute('camera','userHeight:1.6');
		// mainCam.setAttribute('look-controls','');
		// mainCam.setAttribute('universal-controls','');
		// mainCam.setAttribute('kinematic-body','');
		// mainCam.setAttribute('wasd-controls','');
		// mainCam.setAttribute('mouse-controls','pointerlockEnabled: false');
		// CamEntity.appendChild(mainCam);
		// var cursor = document.createElement('a-entity');
		// cursor.setAttribute('cursor','fuse: true; fuseTimeout: 	1000')
		// var userAgent = navigator.userAgent;
		// if (
		//   userAgent.includes("Mobile") ||
		//   userAgent.includes("Android") ||
		//   userAgent.includes("iPhone") || userAgent.includes("OculusBrowser")
		// ) {
		//   var cameraId = document.querySelector("#cursorImage");
		//   cameraId.removeAttribute('cursor');
		//   cameraId.setAttribute("cursor", "fuse: true; fuseTimeout: 500");
		//   cameraId.setAttribute("scale", "1 1 1");
		//   var rig = document.querySelector("#rig");
		//   rig.removeAttribute('movement-controls');
		//   isMobile = true;
	  
		// } else {
		//   var cameraId = document.querySelector("#cursorImage");
		//   cameraId.setAttribute("scale", "0 0 0");
		// }

	//	var cam = document.querySelector("#rotation");
		//cam.emit('skayroation');
		cam = document.getElementById("rig");
		cam.setAttribute("animation", "enabled:false");
		cam.setAttribute("animation__one", "enabled:true");
		experienceStarted = true;
		var audio1 = document.getElementById('audio-1');
		if(museum_data.audio_url!=""){
		audio1.setAttribute('src', museum_data.audio_url);
		}
		document.getElementsByTagName('a-scene')[0].style.zIndex = 'auto';
		document.getElementById('container').style.display = "none";
		document.getElementById('loaderq').style.display = "none";
		clearInterval(timer);
	};
});


var startexp = function () {
	var start = document.getElementById("start_experience");

	if (assetsLoaded && loggedin) {
		if (start.classList.contains("disabled")) {
			var loading = document.getElementById("loading");
			loading.classList.add("disabled");
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



function loadExperience(museum_data) {
	var i;
	for (i = 1; i <= museum_data.gallery_data.length; i++) {
		var gallery_entity = document.querySelector('#gallery-' + i);
		var changedgallery = document.querySelector('#texture-' + i);
		changedgallery.setAttribute('src', museum_data.gallery_data[i - 1].image_path);
		gallery_entity.setAttribute('material', 'src: #defaultgallery');
		gallery_entity.setAttribute('material', 'src: #texture-' + i);
		var textview = document.getElementById('text-' + i);
		textview.setAttribute('value', museum_data.gallery_data[i - 1].image_description);
		for (j = 1; j <= museum_data.gallery_data[i - 1].buttonsArray.length; j++) {
			var button = document.querySelector("#button-" + j + "-frame-" + i);
		  //  console.log(button);
		  button.removeAttribute("foo");
			button.setAttribute("material", "src: " + museum_data.gallery_data[i - 1].buttonsArray[j - 1].button + "; opacity:0.9;");
			button.setAttribute("visible", "false");
			if (" " != museum_data.gallery_data[i - 1].buttonsArray[j - 1].button) {
			  button.setAttribute("foo","");
			  button.setAttribute("class","clickable")
			  button.setAttribute("visible", "true");
			}
		  }
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
	var halltexture = document.querySelector("#hall");
	const regEx = /^https/;
	  if(museum_data.isHallUploaded){
	  halltexture.setAttribute("material","src:"+museum_data.decore_option_hall);
	  const regExFloor = /^https/;
	  if(regExFloor.test(museum_data.centerFloor)){
		var floortexture = document.querySelector('#floor');
		floortexture.setAttribute('material', 'src:' + museum_data.centerFloor);
	  }
	  else{
		var floortexture = document.querySelector("#floor");
		floortexture.setAttribute("material","src: /act/v0.1/wallofframe/assets/textures/" +museum_data.decore_option +"-floor.jpg");
	  }
	  if(regExFloor.test(museum_data.frontFloor)){
		var floortexture = document.querySelector('#floor2');
		floortexture.setAttribute('material', 'src:' + museum_data.frontFloor);
	  }
	  else{
		var floortexture = document.querySelector("#floor2");
		floortexture.setAttribute("material","src: /act/v0.1/wallofframe/assets/textures/" +museum_data.decore_option +"-floor.jpg");
	  }
	  if(regExFloor.test(museum_data.backFloor)){
		var floortexture = document.querySelector('#floor3');
		floortexture.setAttribute('material', 'src:' + museum_data.backFloor);
	  }
	  else{
		var floortexture = document.querySelector("#floor3");
		floortexture.setAttribute("material","src: /act/v0.1/wallofframe/assets/textures/" +museum_data.decore_option +"-floor.jpg");
	  }
	}else{
	  const regExFloor = /^https/;
	  if(regExFloor.test(museum_data.centerFloor)){
		var floortexture = document.querySelector('#floor');
		floortexture.setAttribute('material', 'src:' + museum_data.centerFloor);
	  }
	  else{
		var floortexture = document.querySelector("#floor");
		floortexture.setAttribute("material","src: /act/v0.1/wallofframe/assets/textures/" +museum_data.decore_option +"-floor.jpg");
	  }
	  if(regExFloor.test(museum_data.frontFloor)){
		var floortexture = document.querySelector('#floor2');
		floortexture.setAttribute('material', 'src:' + museum_data.frontFloor);
	  }
	  else{
		var floortexture = document.querySelector("#floor2");
		floortexture.setAttribute("material","src: /act/v0.1/wallofframe/assets/textures/" +museum_data.decore_option +"-floor.jpg");
	  }
	  if(regExFloor.test(museum_data.backFloor)){
		var floortexture = document.querySelector('#floor3');
		floortexture.setAttribute('material', 'src:' + museum_data.backFloor);
	  }
	  else{
		var floortexture = document.querySelector("#floor3");
		floortexture.setAttribute("material","src: /act/v0.1/wallofframe/assets/textures/" +museum_data.decore_option +"-floor.jpg");
	  }
	  halltexture.setAttribute("material","src: /act/v0.1/wallofframe/assets/textures/"+museum_data.decore_option +"-hall.jpg");
	}


	// var floortexture = document.querySelector('#floor');
	// floortexture.setAttribute('material', 'src: assets/textures/' + museum_data.decore_option + '-floor.jpg');
	// var floortexture1 = document.querySelector('#floor2');
	// floortexture1.setAttribute('material', 'src: assets/textures/' + museum_data.decore_option + '-floor.jpg');
	// var floortexture2 = document.querySelector('#floor3');
	// floortexture2.setAttribute('material', 'src: assets/textures/' + museum_data.decore_option + '-floor.jpg');
	// var halltexture = document.querySelector('#hall');
	// halltexture.setAttribute('material', 'src: assets/textures/' + museum_data.decore_option + '-hall.jpg');
}

window.addEventListener("keydown", function (e) {

	if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
		e.preventDefault();

	}
}, false);



var currentPlayingElement=[];
var currentImageElement=[];
AFRAME.registerComponent('foo', {
  init: function () {
    this.el.addEventListener('click', function (evt) {

      var temp = evt.target.id;
      var indexArray = temp.split('-');
     
      var btnIndex = indexArray[1];
      var frameIndex = indexArray[3];
      var k, l;
      for (k = 1; k <= museum_data.gallery_data.length; k++) {
        for (l = 1; l <= museum_data.gallery_data[k - 1].buttonsArray.length; l++) {
          if (k == frameIndex && l == btnIndex) {
            if(museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_media=="Web"){
            window.open(museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_content, '_blank');
            }
            else if(museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_media=="Video"){

              
              if(currentPlayingElement[0] == frameIndex) {
                console.log("Same frame play: ",frameIndex);
                console.log("Same frame play btnIndex: ",btnIndex);
               
                var remElm= document.querySelector("#gallery-" + currentPlayingElement[0]);
                remElm.setAttribute("material", "src:#texture-"+ currentPlayingElement[0]);
                var video=document.getElementById("penguin-sledding");
                video.pause();

               
                playBtn(frameIndex, currentPlayingElement[1]); 
                currentPlayingElement[0] = null;
                if(currentPlayingElement[1] != btnIndex) {
                 
                  pauseBtn(frameIndex, btnIndex); 
              
                  var button_video= document.querySelector("#gallery-" + frameIndex);
              var video=document.getElementById("penguin-sledding");
              video.setAttribute("src",museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_content);
             // video.setAttribute("src",museum_data.gallery_data[frameIndex].buttonsArray[btnIndex].button_content);
              button_video.setAttribute("material","src:#penguin-sledding");
              video.load();
              video.play();
              currentPlayingElement[1] = btnIndex;
              currentPlayingElement[0] = frameIndex;
                } else {
                  currentPlayingElement[1] = null;
                  currentPlayingElement[0] = null;
                 }
              
              
                
               // currentPlayingElement[0] = null;
                break;
              } else if(currentPlayingElement[0] != null && currentPlayingElement[0] != frameIndex ) {
                console.log("Else block Same frame play: ",frameIndex);
                console.log(" Else block Same frame play btnIndex: ",btnIndex);
                var remElm= document.querySelector("#gallery-" + currentPlayingElement[0]);
                remElm.setAttribute("material", "src:#texture-"+ currentPlayingElement[0]);

                playBtn(currentPlayingElement[0], currentPlayingElement[1]);
                pauseBtn(frameIndex, btnIndex);
            
              }
              console.log("initial block Same frame play: ",frameIndex);
              console.log(" initial block Same frame play btnIndex: ",btnIndex);
              currentPlayingElement[0] = frameIndex;
              currentPlayingElement[1] = btnIndex;
             
            
              var button_video= document.querySelector("#gallery-" + frameIndex);
              var video=document.getElementById("penguin-sledding");
              video.setAttribute("src",museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_content);
              button_video.setAttribute("material","src:#penguin-sledding");
              video.load();
              video.play();
              var light_entity=document.querySelector("#light-" + frameIndex);
              light_entity.setAttribute("visible","false");
              pauseBtn(frameIndex, btnIndex);

              

             // console.log("needToRemoveEle",document.querySelector("#gallery-" + frameIndex));
            }
            else if(museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_media=="Image"){
              // var button_image= document.querySelector("#gallery-" + frameIndex);
              // button_image.setAttribute("material","src:#"+museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_content);
            //   var gallery_entity = document.querySelector("#gallery-" + frameIndex);
            //   var changedgallery = document.querySelector("#texture-" + frameIndex);
            //   changedgallery.setAttribute("src", museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_content);
            //   gallery_entity.setAttribute("material", "src: #defaultgallery");
            //   gallery_entity.setAttribute("material", "src: #texture-" + frameIndex);
          //    alert(museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_content );


		  if(currentImageElement[0] == frameIndex) {
                console.log("Same frame play: ",frameIndex);
                console.log("Same frame play btnIndex: ",btnIndex);
               
                var remElm= document.querySelector("#gallery-" + currentImageElement[0]);
				remElm.setAttribute("material", "src:#texture-"+ currentImageElement[0]);
				var gallery_entity = document.querySelector("#gallery-" + frameIndex);
              var changedgallery = document.querySelector("#texture-" + frameIndex);
              changedgallery.setAttribute("src", museum_data.gallery_data[k - 1].image_path);
              gallery_entity.setAttribute("material", "src: #defaultgallery");
              gallery_entity.setAttribute("material", "src: #texture-" + frameIndex);
                 
                currentImageElement[0] = null;
                if(currentImageElement[1] != btnIndex) {
                 
               
              
              var gallery_entity = document.querySelector("#gallery-" + frameIndex);
              var changedgallery = document.querySelector("#texture-" + frameIndex);
              changedgallery.setAttribute("src", museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_content);
              gallery_entity.setAttribute("material", "src: #defaultgallery");
              gallery_entity.setAttribute("material", "src: #texture-" + frameIndex);
              currentImageElement[1] = btnIndex;
              currentImageElement[0] = frameIndex;
                } else {
					currentImageElement[1] = null;
					currentImageElement[0] = null;
                 }
              
              
                
               // currentPlayingElement[0] = null;
                break;
              } else if(currentImageElement[0] != null && currentImageElement[0] != frameIndex ) {
                console.log("Else block Same frame play: ",frameIndex);
                console.log(" Else block Same frame play btnIndex: ",btnIndex);
                var remElm= document.querySelector("#gallery-" + currentImageElement[0]);
                remElm.setAttribute("material", "src:#texture-"+ currentImageElement[0]);

                // playBtn(currentImageElement[0], currentImageElement[1]);
                // pauseBtn(frameIndex, btnIndex);
            
              }
              console.log("initial block Same frame play: ",frameIndex);
              console.log(" initial block Same frame play btnIndex: ",btnIndex);
              currentImageElement[0] = frameIndex;
              currentImageElement[1] = btnIndex;
                  
			  var gallery_entity = document.querySelector("#gallery-" + frameIndex);
              var changedgallery = document.querySelector("#texture-" + frameIndex);
              changedgallery.setAttribute("src", museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_content);
              gallery_entity.setAttribute("material", "src: #defaultgallery");
              gallery_entity.setAttribute("material", "src: #texture-" + frameIndex);
            }
          }
        }
      }
      // console.log(temp);
    });



  },
});
function pauseBtn( frameIdx,  btnIdx) {
  var tempPlayPause="#button-"+btnIdx+"-frame-"+frameIdx;
  var playPausebuttton=document.querySelector(tempPlayPause);
  if(museum_data.pauseMediaButton){
	playPausebuttton.setAttribute("material", "src:"+museum_data.pauseMediaButton);
  }else{
	playPausebuttton.setAttribute("material", "src:assets/images/play_2.png; opacity:0.9;");
  } 
}
function playBtn( frameIdx,  btnIdx) {
  var tempPlayPause="#button-"+btnIdx+"-frame-"+frameIdx;
  var playPausebuttton=document.querySelector(tempPlayPause);
  const regEx = /^https/;
  if(regEx.test(museum_data.gallery_data[frameIdx - 1].buttonsArray[btnIdx - 1].button)){
	playPausebuttton.setAttribute("material", "src:"+museum_data.gallery_data[frameIdx - 1].buttonsArray[btnIdx - 1].button);
}
else{
	playPausebuttton.setAttribute("material", "src:assets/images/play.png; opacity:0.9;");
}
}
