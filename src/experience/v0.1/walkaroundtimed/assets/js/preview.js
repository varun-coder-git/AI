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
var seconds;
var experienceStarted = false;
var audioPath;
var totalTime = 0;
var isInfoboxClick=false;
var prelaunchImageLoaded = false;
var walkArroundJson = ""

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
//   if (userAgent.includes("Mobile") || userAgent.includes("Android") || userAgent.includes("iPhone")) {
// 	var cameraId = document.querySelector('#cursor');
// 	cameraId.removeAttribute('cursor');
// 	cameraId.setAttribute('scale', '1 1 1');
// 	cameraId.setAttribute('cursor', 'fuse', 'true; fuseTimeout: 1500;');
//   }
function initializePreview(experienceJSON, ExperienceName) {

	walkArroundJson = JSON.parse(experienceJSON);
	
	$("#loaderq").addClass("hidden-login");
	$("#innerInfo").removeClass("hidden-login");
	var instructionSet =  walkArroundJson.splash_instruction;
	var lunchTextSet =  walkArroundJson.launch_text;

	//if json includes splashbgcolor and opacity
	if (walkArroundJson.splashBackgroundColor && walkArroundJson.Opacity) {
		var rgbformat = hexToRgb(walkArroundJson.splashBackgroundColor, walkArroundJson.Opacity);
		document.getElementById('innerInfo').style.backgroundColor = "rgba(" + rgbformat.r + "," + rgbformat.g + "," + rgbformat.b + "," + rgbformat.alpha + ")";
	}
	
	//if json includes splashheadercolor
	if (walkArroundJson.splashHeaderColor) {
	document.getElementById('titleText').style.color = walkArroundJson.splashHeaderColor;
	}
	document.getElementById('titleText').innerHTML = ExperienceName;
	document.getElementById('instruction').innerHTML = instructionSet;
    document.getElementById('titleDescription').innerHTML = lunchTextSet;
	document.getElementById('splashLogo').src = walkArroundJson.splash_image;
	document.getElementById('startCountDown').setAttribute("value", walkArroundJson.prelaunch_timer);


	var startActivity = document.querySelector("#startActivity");
	if(walkArroundJson.prelaunch_image)
		startActivity.setAttribute('material','src',walkArroundJson.prelaunch_image);
	else
		startActivity.setAttribute('material','src','assets/images/bg3.jpg');
	activeScreen = walkArroundJson.Nodes[0];
	if (activeScreen.entry_view) {
    $("#CamEntity").attr("rotation", activeScreen.entry_view);
  }
	seconds = parseInt(walkArroundJson.countdown_timer);
	totalTime = seconds;
	generateRoom(activeScreen);
	loggedin = true;
	// if (walkArroundJson["entry_view"]) {
  //   $("#CamEntity").attr("rotation", walkArroundJson["entry_view"]);
  // }
}

$(document).ready(() => {
	var startExperienteBtn = document.getElementById('start_experience');
	startExperienteBtn.onclick = function () {
	
		experienceStarted = true;
		var entity = document.querySelector('[sound]');
		entity.components.sound.playSound();
		document.getElementsByTagName('a-scene')[0].style.zIndex = 'auto';
		document.getElementById('container').style.display="none";
        document.getElementById('loaderq').style.display="none";
        clearInterval(timer);
		countdown();
		var ua = navigator.userAgent.toLowerCase();
		if (ua.indexOf('safari') != -1) { 
			if (ua.indexOf('chrome') ==-1 ) {
		audioElement = document.querySelector('#background-audio');
	audioElement.setAttribute('sound','src', walkArroundJson.background_sound);
	audioElement.components.sound.playSound();
	audioElement.setAttribute('sound','volume:0;');
			}
		}
	};
});




var startexp = function () {
	var start = document.getElementById("start_experience");

	if (assetsLoaded && loggedin) {
		if (start.classList.contains("disabled")) {
			var loading=document.getElementById("loading");
			loading.classList.add("disabled");  
						clearInterval(timer);					 
			start.classList.remove("disabled");
		}
	}
}
var timer = setInterval(startexp, 500);
var assetsLoaded = false;
var loggedin = false;
$(window).on('load', function () {
// 	var prelaunchBgImg = document.getElementById("startActivity");
// 	prelaunchBgImg.addEventListener('materialtextureloaded', function () {
//   setTimeout(function () {
// 		prelaunchImageLoaded = true;
//   }, 200);
// });
	setTimeout(function () {
		assetsLoaded = true;
	}, 3000);
})

AFRAME.registerComponent('hotspotclick', {
	init: function () {
		this.el.addEventListener('click', function () {
			if(experienceStarted === true)
			{
			if (this.getAttribute('id').split("-")[1] == "hotspot") {
				for (let i = 0; i < walkArroundJson.Nodes.length; i++) {
					if (walkArroundJson.Nodes[i].placeIndex == activeScreen.teleports[this.getAttribute('id').split("-")[2]].teleportToPlaceIndex) {
						activeScreen = walkArroundJson.Nodes[i];
						generateRoom(activeScreen);
						break;
					}
				}
			}
				else if (this.getAttribute('id').split("-")[1] == "infohotspot") {
					var selectedInfobox = activeScreen.infoboxes[this.getAttribute('id').split("-")[2]];
					var hotspotEntity = document.querySelector("#hotspot-entity-" + this.getAttribute('id').split("-")[2]);
					var MainPlain = document.querySelector("#infobox-MainPlane-" + this.getAttribute('id').split("-")[2]);
					var infoBox = document.querySelector("#infobox-plane-" + this.getAttribute('id').split("-")[2]);
					var overlay = document.querySelector("#overlay-plane-" + this.getAttribute('id').split("-")[2]);
					var hotspotPosition = hotspotEntity.getAttribute("position");
					for (i = 0; i < activeScreen.infoboxes.length; i++) 
						{
							if(i!=this.getAttribute('id').split("-")[2]){
							var showinfohotspot = document.getElementById("hotspot-entity-"+i);
							showinfohotspot.setAttribute('visible','false');
					}
						}	
						for (j = 0; j <= activeScreen.teleports.length; j++)
						{
							var showteleport = document.getElementById("sphere-hotspot-"+j);
							var showspherehotspotbg =document.getElementById("sphere-hotspot-bg-"+j);
							var showfocusText =document.getElementById("focusText"+j);
							if(showteleport != null ){
							showteleport.setAttribute('visible', 'false');
							}
							if(showspherehotspotbg != null ){
								showspherehotspotbg.setAttribute('visible', 'false');
								}
								if(showfocusText !=null){
									
									showfocusText.setAttribute('visible', 'false');
									}								
							
						} 
					hotspotEntity.setAttribute("scale","2 2 2");
					infoBox.setAttribute("position", "0 0 -10");
					MainPlain.setAttribute("position", "0 0 -10");
					this.setAttribute('position', '200 200 0');
					this.setAttribute('visible', 'false');
					infoBox.setAttribute("visible", "true");
					MainPlain.setAttribute("visible", "true");
					if (selectedInfobox.infoboxType === "Image") {
						MainPlain.setAttribute("visible", "false");				
					}else if(selectedInfobox.infoboxType === "Audio"){
						MainPlain.setAttribute("visible", "false");	
						var audio1 = document.getElementById('audio-1');
						audio1.components.sound.pauseSound();
						var audio2 = document.getElementById('audio-2');
						audio2.setAttribute('sound','src', selectedInfobox.audioPath);
						if(selectedInfobox.audioPath != ""){
							audio2.components.sound.playSound();
						}
					}
					// var pod = hotspotPosition.split(" ");
					overlay.setAttribute('position', newPos(hotspotPosition.x,hotspotPosition.y,hotspotPosition.z ));
					
					infoBox.setAttribute("animation__startAnimation","property:scale;from:0 0 0;to:1 1 1; dur: 1500;enabled:true");
					MainPlain.setAttribute("animation__startAnimation1","property:scale;from:0 0 0;to:1 1 1; dur: 1500;enabled:true");
					
					isInfoboxClick = true;

					// setTimeout(()=>{
					// 	 isInfoboxClick = true;
					// },1500);
			}
		}
		});

		this.el.addEventListener('mouseenter', function () {
		if(experienceStarted === true)
			{
			if (this.getAttribute('id').split("-")[1] == "infohotspot") {
			
				// var selectedInfobox = activeScreen.infoboxes[this.getAttribute('id').split("-")[2]];
				// var positionPoints = selectedInfobox.infoboxPosition.split(" ");
				// var infoBox = document.querySelector("#infoBox");
				// infoBox.setAttribute("position", positionPoints[0] + " " + (positionPoints[1] - 15) + " " + positionPoints[2]);
				// infoBox.setAttribute("visible", "true");
				// infoBox.setAttribute("scale", "0.6 0.4 0.6");
				// var infoboxImage = document.querySelector("#infoBox");
				// if (selectedInfobox.infoboxType === "Text") {
				// 	infoboxImage.setAttribute("material", "src", "assets/images/tvscreenplane.jpg");
				// 	var textBox = document.querySelector("#textBox");
				// 	textBox.setAttribute("value", selectedInfobox.text);
				// }
				// else {
				// 	infoboxImage.setAttribute("material","src",'');
				// 	infoboxImage.setAttribute("material", "src", selectedInfobox.imagePath);
				// }
			} else {
				if (previousImage != "") {
					var skyImage1 = document.querySelector("#skyImage1");
					skyImage1.setAttribute("src", previousImage);
				}
				var sphere = document.querySelector("#" + this.getAttribute('id'));
				sphere.setAttribute("animation__animationBegin","property:rotation;to:0 360 0; dur: 1500;enabled:true;loop:true");
		
			}
		}
		});

		this.el.addEventListener('mouseleave', function () {
			if(experienceStarted === true)
			{
			if (this.getAttribute('id').split("-")[1] != "infohotspot") {
			
				var sphere = document.querySelector("#" + this.getAttribute('id'));
				if (sphere)
				sphere.removeAttribute("animation__animationBegin");
			}
	}
});
}});
AFRAME.registerComponent('infobox-leave',{
	init: function () {
		this.el.addEventListener('mouseleave', function () {
			if (experienceStarted === true) {

					if(isInfoboxClick){
						var audio2 = document.getElementById("audio-2");
						audio2.components.sound.stopSound();
						var audio1 = document.getElementById("audio-1");
						var srcCheck = audio1.getAttribute('sound');
						if(srcCheck.src != ""){
						audio1.components.sound.playSound();
						}

					var infoBox = document.querySelector("#infobox-plane-" + this.getAttribute('id').split("-")[2]);
					var MainPlain = document.querySelector("#infobox-MainPlane-" + this.getAttribute('id').split("-")[2]);
					var bannerEntity = document.querySelector("#hotspot-entity-" + this.getAttribute('id').split("-")[2]);
					
					infoBox.removeAttribute("animation__startAnimation");
					MainPlain.removeAttribute("animation__startAnimation1");
					
					infoBox.setAttribute("animation__endAnimation","property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true;");
					MainPlain.setAttribute("animation__endAnimation1","property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true;");
					setTimeout(() => {
						
						infoBox.removeAttribute("animation__endAnimation");
						MainPlain.removeAttribute("animation__endAnimation1");
						bannerEntity.setAttribute("scale","1 1 1");	
						infoBox.setAttribute("visible", "false");
						var sphere = document.querySelector("#sphere-infohotspot-" + this.getAttribute('id').split("-")[2]);
						var overlay = document.querySelector("#overlay-plane-" + this.getAttribute('id').split("-")[2]);
						sphere.setAttribute('visible', 'true');
						sphere.setAttribute('position', '0 0 0');
						overlay.setAttribute('position', '2000 2000 2000');
						infoBox.setAttribute('position', '2000 2000 2000');
						var hotspotEntity = document.querySelector("#hotspot-entity-" + this.getAttribute('id').split("-")[2]);
						hotspotEntity.setAttribute('scale', '1 1 1 ');

						for (i = 0; i < activeScreen.infoboxes.length; i++) 
							{
								if(i!=this.getAttribute('id').split("-")[2]){
								var showinfohotspot = document.getElementById("hotspot-entity-"+i);
								showinfohotspot.setAttribute('visible','true');
						}
							}	
							for (j = 0; j <= activeScreen.teleports.length; j++)
							{
								var showteleport = document.getElementById("sphere-hotspot-"+j);
								var showspherehotspotbg =document.getElementById("sphere-hotspot-bg-"+j);
								var showfocusText =document.getElementById("focusText"+j);
								if(showteleport != null ){
								showteleport.setAttribute('visible', 'true');
								}
								if(showspherehotspotbg != null ){
									showspherehotspotbg.setAttribute('visible', 'true');
									}
									if(showfocusText !=null){
										
										showfocusText.setAttribute('visible', 'true');
										}								
								
							} 
					}, 1500);
					isInfoboxClick = false;
				}
			}
		
		});

		this.el.addEventListener('mouseleave', () => {
			if(experienceStarted === true){
			}
		});
	}
});


function startCountDown() {
	var signValue = "";
	var walkOutTimer = document.getElementById('walkOutTimer');
	walkOutTimer.setAttribute("visible", "true");
	var banner = document.querySelector("#walkOutTimer");
	banner.setAttribute("animation__skayroation","enabled:true");
	banner.setAttribute("animation__skayroation1","enabled:true");
	function tick() {
		var counter = document.getElementById("counter");
		seconds--;
		if (seconds < 0)
			signValue = "-";
		var minute = Math.abs(parseInt(seconds / 60));
		var sign = minute ? minute < 0 ? -1 : 1 : 0;
		minute = minute * sign + ''; // poor man's absolute value
		var dec = minute.match(/\.\d+$/);
		var int = minute.match(/^[^\.]+/);
		var minute = (sign < 0 ? '-' : '') + ("0" + int).slice(-2) + (dec !== null ? dec : '');
		var second = Math.abs(seconds % 60);
		var sign = second ? second < 0 ? -1 : 1 : 0;
		second = second * sign + 1 + ''; // poor man's absolute value
		var dec = second.match(/\.\d+$/);
		var int = second.match(/^[^\.]+/);
		var second = (sign < 0 ? '-' : '') + ("0" + int).slice(-2) + (dec !== null ? dec : '');
		var walkOutTimerText = document.getElementById('walkOutTimerText');
		walkOutTimerText.setAttribute("text", "value:" + signValue + "" + minute + ":" + second);
		setTimeout(tick, 1000);
	}
	tick();
	
}

function countdown() {
	var startActivity = document.querySelector("#startActivity");
	if(walkArroundJson.prelaunch_image)
	startActivity.setAttribute('material','src',walkArroundJson.prelaunch_image);
	startActivity.setAttribute("visible", "true");
	
	if(walkArroundJson.prelaunch_timer)
		var	seconds = walkArroundJson.prelaunch_timer;
	else 
		var seconds = 0;
	function innerTick() {
		var counter = document.getElementById("counter");
		if (seconds > 1) {
			// var minute = parseInt(seconds / 60);
			// var second = seconds % 60;
			var startCountDown = document.getElementById('startCountDown');
			startCountDown.setAttribute('text','value:'+( seconds - 1))
			setTimeout(innerTick, 1000);
		} else if (seconds == 1) {
			var startCountDown = document.getElementById('startCountDown');
			startCountDown.setAttribute('text','value:Here We Go!!!')
			if(walkArroundJson.prelaunch_text)
			startCountDown.setAttribute("value", walkArroundJson.prelaunch_text)
			setTimeout(innerTick, 1000);
		}
		else {
			startActivity.removeAttribute("animation__startAnimation");
			startActivity.setAttribute("animation__startAnimation","property: scale;from:0.1 0.1 0.1;to:0 0 0; dur: 2000;fill:forwards;");
			setTimeout(tickClose, 2000);
		}
		seconds--;
	}
	innerTick();
}

function tickClose() {
	var cam = document.querySelector("#rotation");
	cam.setAttribute("animation","enabled:false");
	cam.setAttribute("animation__one","enabled:true");
	startCountDown();
	
	var cursor = document.getElementById('cursorImage');
	cursor.setAttribute('visible', 'true');
	cursor.setAttribute('light', 'type:ambient;intensity:1.71');
	var startActivity = document.querySelector("#startActivity");
	startActivity.setAttribute("visible", "false");
	audioElement = document.querySelector('#audio-1');
	audioElement.setAttribute('sound','src', walkArroundJson.background_sound);
	audioElement.components.sound.playSound();
	 audioElement.setAttribute('sound','volume:1;');
	
}


var isSphereSelected = false;
var isFirstTime = true;
var previousImage = "";
var hotspotsToSave = [];
var placeToSave = [];
var hotspotIndex = 0;

function generateRoom(activeScreen) {
	var sphereArray = document.querySelectorAll('.hotspot-entity');
	if (sphereArray.length > 0) {
		for(var i=0; i < sphereArray.length; i++){
		// sphereArray.forEach(sphere => {
			sphereArray[i].parentNode.removeChild(sphereArray[i]);
		// });
		}
	}


///////Audio for each place
// var audio1 = document.getElementById("audio-1");
// audio1.components.sound.stopSound();

// if (activeScreen.placeAudio) {
//   audio1.setAttribute("sound", "src", activeScreen.placeAudio);
//   if (experienceStarted) {
// 	if(activeScreen.placeAudio != ""){
// 	  audio1.components.sound.playSound();
// 	}      
//   }
// }else{
//   audio1.setAttribute("sound", "src","");
// }

	var skyImage = document.querySelector("#skyImage");
	skyImage.setAttribute("src", activeScreen.placeSky);
	previousImage = activeScreen.placeSky;
	skyImage.removeAttribute("smallSphereAnimationStart");
	skyImage.removeAttribute("bigSphereAnimationStart");
	skyImage.setAttribute("smallSphereAnimationStart","property: scale;from:0 0 0; to: -0.0000025 0.0000025 0.0000025; dur: 2000;");
	skyImage.setAttribute("bigSphereAnimationStart","property: scale;from:-0.0000025 0.0000025 0.0000025; to: -1 1 1; dur: 1000;delay:2000;");
	
	if (activeScreen.isEndNode) {
		setTimeout(setEndNode, 1000);
	}
	else if (activeScreen.isEndNode != true) {
	setTimeout(function () {
			for (let i = 0; i < activeScreen.teleports.length; i++) {
				addHotspot(activeScreen.teleports[i], i);
			}
			for (let i = 0; i < activeScreen.infoboxes.length; i++) {
				addInfoHotspot(activeScreen.infoboxes[i], i);
			}
	}, 2000);

}
if (activeScreen.entry_view) {
	var camid = document.querySelector("#cameraId");
	var camrot = camid.getAttribute('rotation');
	var cam = document.querySelector("#CamEntity");
	oldpos = activeScreen.entry_view.split(" ")[1];
	cam.setAttribute('rotation', "0 " + (parseInt(oldpos)-camrot.y) + " 0");
}
}

function addHotspot(teleport, index) {
	if(teleport.teleportToPlaceIndex != null) {
	var sceneEl = document.querySelector('a-scene');

	var hotSpotEntity = document.createElement('a-entity');
	hotSpotEntity.setAttribute('id', 'hotspot-entity');
	hotSpotEntity.setAttribute('class', 'hotspot-entity');
	hotSpotEntity.setAttribute('position', teleport.teleportPosition);
	hotSpotEntity.setAttribute('look-at', 'src:#cameraId');
	sceneEl.appendChild(hotSpotEntity);
	var newHotspot = document.createElement('a-sphere');
	newHotspot.setAttribute('id',"sphere-hotspot-"+index);
	newHotspot.setAttribute('class',"clickable");
//	newHotspot.setAttribute('color', '#00f');
	newHotspot.setAttribute('position', '0 0 0');
	newHotspot.setAttribute('radius', teleport.teleportSize);
	newHotspot.setAttribute('opacity', teleport.teleportVisibility);
	newHotspot.setAttribute('shader', 'flat');
	newHotspot.setAttribute('src', teleport.teleportToPlaceImage);
	newHotspot.setAttribute('hotspotclick', '');
	hotSpotEntity.appendChild(newHotspot);
	//Hotspot Background
	var hotspotBg = document.createElement("a-ring");
	hotspotBg.setAttribute("id", "sphere-hotspot-bg-" + index);
	hotspotBg.setAttribute("radius-inner", teleport.teleportSize - 0.6);
	hotspotBg.setAttribute("radius-outer", teleport.teleportSize + 0.5);
	hotspotBg.setAttribute("color", "#fff");
	hotspotBg.setAttribute("position", "0 0 0");
	hotspotBg.setAttribute("opacity", "0.370");
	hotspotBg.setAttribute("shader", "flat");
	hotSpotEntity.appendChild(hotspotBg);
	var hotspotSphereBG = document.querySelector("#sphere-hotspot-bg-" + index);
	hotspotSphereBG.setAttribute("animation","property:scale;from:0.9 0.9 0.9;to:1.1 1.1 1.1;loop:true;enabled:true;dir:alternate;autoplay:true");

	//Hotspot Background
	var teleportText = document.createElement('a-text');
	teleportText.setAttribute('id', 'focusText' + hotspotIndex);
	teleportText.setAttribute('text', { 'align': 'center', 'width': 50 });
	teleportText.setAttribute('value', teleport.focusText);
	// teleportText.setAttribute('geometry', 'primitive:plane');
	teleportText.setAttribute('material', 'transparent:true');
	teleportText.setAttribute('material', 'alphaTest: 1');
	// teleportText.setAttribute('look-at', 'src:#cameraId');
	hotSpotEntity.appendChild(teleportText);
	teleportText.setAttribute('position','0 -'+(teleport.teleportSize + 5)+' 0');
	hotspotIndex++;
	}
}

function addInfoHotspot(infobox, index) {
	var sceneEl = document.querySelector('a-scene');
	var hotSpotEntity = document.createElement('a-entity');
	hotSpotEntity.setAttribute('id', 'hotspot-entity-'+index);
	hotSpotEntity.setAttribute('class', 'hotspot-entity');
	hotSpotEntity.setAttribute('position', infobox.infoboxPosition);
	hotSpotEntity.setAttribute("look-at","src: #cameraId");

	sceneEl.appendChild(hotSpotEntity);
	var newHotspot = document.createElement('a-sphere');
	newHotspot.setAttribute('id', "sphere-infohotspot-" + index);
	newHotspot.setAttribute('class',"clickable");
//	newHotspot.setAttribute('color', '#ff0000');
	newHotspot.setAttribute('position', '0 0 0');
	newHotspot.setAttribute('radius', infobox.infoboxSize);
	newHotspot.setAttribute('opacity', infobox.infoboxVisibility);
	newHotspot.setAttribute('shader', 'flat');
	newHotspot.setAttribute('hotspotclick', '');
	if (infobox.infoBannerBgColor) {
		newHotspot.setAttribute('color', infobox.infoBannerBgColor);
	} else {
		newHotspot.setAttribute('color', "#ff0000");
	}
	hotSpotEntity.appendChild(newHotspot);

	var infoboxPlane1 = document.createElement('a-plane');
	infoboxPlane1.setAttribute("id", "infobox-MainPlane-" + index);
	if (infobox.infoBgColor) {
		infoboxPlane1.setAttribute('color', infobox.infoBgColor);
	} else {
		infoboxPlane1.setAttribute('color', "#000000");
	}
	infoboxPlane1.setAttribute('geometry', "height:15;width:30");
	if (infobox.infoBgOpacity) {
		infoboxPlane1.setAttribute('material', "side:double;opacity:" + infobox.infoBgOpacity + ";transparent:true");
	} else {
		infoboxPlane1.setAttribute('material', "side:double;opacity:0.5;transparent:true");
	}
	infoboxPlane1.setAttribute("position", "2000 2000 2000");
	hotSpotEntity.appendChild(infoboxPlane1);

	var infoboxPlane = document.createElement('a-plane');
	infoboxPlane.setAttribute("id", "infobox-plane-" + index);
	// if (teleport.infoBgColor) {
	// 	infoboxPlane.setAttribute('color', teleport.infoBgColor);
	// } else {
	// 	infoboxPlane.setAttribute('color', "#000000");
	// }
	 	infoboxPlane.setAttribute('color', "#000000");

	// infoboxPlane.setAttribute('height', "20");
	// infoboxPlane.setAttribute('width', "20");
	infoboxPlane.setAttribute('geometry', "height:15;width:30");
	// if (teleport.infoBgOpacity) {
	// 	infoboxPlane.setAttribute('material', "side:double;opacity:" + teleport.infoBgOpacity + ";transparent:true");
	// } else {
	// 	infoboxPlane.setAttribute('material', "side:double;opacity:0.5;transparent:true");
	// }
	infoboxPlane.setAttribute('material', "side:double;opacity:0;transparent:true");

	infoboxPlane.setAttribute("position", "2000 2000 2000");
	hotSpotEntity.appendChild(infoboxPlane);
	if (infobox.infoboxType === "Image") {
		infoboxPlane.setAttribute('color', "#fff");
		infoboxPlane.setAttribute("material", "src", '');
		infoboxPlane.setAttribute('geometry', "height:16.88;width:30");
		infoboxPlane.setAttribute('material', "side:double;opacity:1;shader:flat");
		infoboxPlane.setAttribute("material", "src", infobox.imagePath);
	} else if (infobox.infoboxType === "Text") {
		var infoboxText = document.createElement('a-text');
		infoboxText.setAttribute("text", "width:28;baseline:top;wrapCount:48;lineHeight:50");
		infoboxText.setAttribute("value", infobox.text);
		infoboxText.setAttribute("position", "-13.86466 5.9 1.12607");

		if (infobox.infoFontColor) {
			infoboxText.setAttribute("color", infobox.infoFontColor);
		}
		infoboxPlane.appendChild(infoboxText);
	}else if(infobox.infoboxType === 'Audio'){
		var audio2 = document.getElementById('audio-2');
		audio2.setAttribute('sound','src', infobox.audioPath);
	}
	infoboxPlane.setAttribute("visible", "false");

	var infoboxOverlay = document.createElement('a-entity');
	infoboxOverlay.setAttribute("id", "overlay-plane-" + index);
	infoboxOverlay.setAttribute("obj-model", "obj:assets/images/moonlight.obj");
	infoboxOverlay.setAttribute("material", "src:assets/images/tvscreenplane.jpg;side:double;transparent:true;opacity:0");
	infoboxOverlay.setAttribute('class', "clickable");
	infoboxOverlay.setAttribute('infobox-leave', '');
	infoboxOverlay.setAttribute('visible', 'false');
	infoboxOverlay.setAttribute("scale", "0.6 0.6 0.6");
	infoboxOverlay.setAttribute('position', "2000 2000 2000");
	infoboxOverlay.setAttribute("look-at", "src: #cameraId");
	sceneEl.appendChild(infoboxOverlay);
	hotspotIndex++;
}


function setEndNode() {
	var cursor = document.getElementById("cursorImage");
	cursor.setAttribute("visible", "true");
	var walkOutTimer = document.querySelector("#walkOutTimer");
	walkOutTimer.setAttribute("visible", "false");
	var timeinvested = totalTime - seconds;
	var endInfoBox = document.querySelector("#endInfoBox");
	endInfoBox.setAttribute("visible", "true");
	var endInfoTextBox = document.getElementById('endInfoTextBox');
	
	if(walkArroundJson.Success_Message){
	if(walkArroundJson.countdown_timer >= timeinvested){
		endInfoTextBox.setAttribute("value", walkArroundJson.Success_Message +" " +  timeinvested + " Seconds");
	}else{
		endInfoTextBox.setAttribute("value", walkArroundJson.Failuer_Message +" " +   timeinvested + " Seconds");

	}
}
else{
if(walkArroundJson.countdown_timer >= timeinvested){
	endInfoTextBox.setAttribute("value", "Wow! You\'ve done it! and you took "+ " " + timeinvested + " Seconds");
}else{
	endInfoTextBox.setAttribute("value", "Oops! Better luck next time! and you took "+" "+ timeinvested + " Seconds");
}
}
setTimeout(closeEndNodeBox, 10000);

}
function closeEndNodeBox() {
	var endInfoBox = document.querySelector("#endInfoBox");
	endInfoBox.setAttribute("position", "0 0 1500");
	endInfoBox.setAttribute("visible", "false");
	// for (let i = 0; i < activeScreen.infoboxes.length; i++) {
	// 	addInfoHotspot(activeScreen.infoboxes[i], i);
	// }
}


function newPos(x, y, z){
    var r = Math.pow(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2), 0.5);
    var phy =Math.acos(z/r);
    var thita = Math.asin(y/(r*Math.sin(phy)));
    if((x < 0 && z < 0) || (x < 0 && z > 0)){
        phy = -phy ;//+ (Math.PI);
        thita= -thita;
    }
    r =r-1;
    var newx = r*Math.sin(phy)*Math.cos(thita);
    var newy = r*Math.sin(phy)*Math.sin(thita);
    var newz = r*Math.cos(phy);
    return newx +' '+ newy +' '+ newz;
}
function toDegrees (angle) {
  return angle * (180 / Math.PI);
}
function toRadians (angle) {
  return angle * (Math.PI / 180);
}
AFRAME.registerComponent('sky', {
	schema: {
		default: ''
	},
	init() {
		this.el.addEventListener('mouseleave', () => {
			if(experienceStarted === true){
			}
		});
	}
});