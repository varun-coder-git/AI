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

var isMobile=false;
var isComlpeted=false;
var launchCounter =10;
var totalMarks = 0;
var obtainedMarks = 0;
var Result="N/A";
var seconds;
var experienceStarted = false;
var audioPath;
var totalTime = 0;
var isInfoboxClick=false;
var countdownEnd=false;
var isCountDownFinished = false;

// var userAgent = navigator.userAgent;
//   if (userAgent.includes("Mobile") || userAgent.includes("Android") || userAgent.includes("iPhone")) {
// 	var cameraId = document.querySelector('#cursor');
// 	cameraId.removeAttribute('cursor');
// 	cameraId.setAttribute('scale', '1 1 1');
// 	cameraId.setAttribute('cursor', 'fuse', 'true; fuseTimeout: 1500;');
//   }
$(document).ready(() => {
	var userAgent = navigator.userAgent;
	if (
	  userAgent.includes("Mobile") ||
	  userAgent.includes("Android") ||
	  userAgent.includes("iPhone") || userAgent.includes("OculusBrowser")
	) {
	  isMobile=true;
	}
	var startExperienteBtn = document.getElementById('start_experience');
	startExperienteBtn.onclick = function () {
	
		experienceStarted = true;
		var entity = document.querySelector('[sound]');
		entity.components.sound.playSound();
		document.getElementsByTagName('a-scene')[0].style.zIndex = 'auto';
		document.getElementById('container').style.display="none";
        document.getElementById('loaderq').style.display="none";
        clearInterval(timer);
		// countdown();
		var ua = navigator.userAgent.toLowerCase();
		if (ua.indexOf('safari') != -1) { 
			if (ua.indexOf('chrome') ==-1 ) {
		audioElement = document.querySelector('#background-audio');
	audioElement.setAttribute('src', walkArroundJson.background_sound);
	audioElement.components.sound.playSound();
	audioElement.setAttribute('sound','volume:0;');
			}
		}
	};
});
AFRAME.registerComponent('hotspotclick', {
	init: function () {
		this.el.addEventListener('click', function () {
			
			if (experienceStarted === true && countdownEnd=== true && isCountDownFinished == true) {
				if (this.getAttribute('id').split("-")[1] == "hotspot") {
					params.Verb = "clicked on teleport ";
					params.Object = activeScreen.teleports[this.getAttribute('id').split("-")[2]].name;
					params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
					callToTacking.callToApi(params);

					params.Verb = "spent " + screenActiveTime + "sec ";
					params.Object = "on " + activeScreen.placeName;
					params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
					callToTacking.callToApi(params);
					screenActiveTime = 0;
					telportName = activeScreen.teleports[this.getAttribute('id').split("-")[2]].name;
					if (xapiEnable) {
						var object = (activeScreen.teleports[this.getAttribute('id').split("-")[2]].name).replace(/\s/g, '');
						sendToXapi("Focused", "focused", activeScreen.teleports[this.getAttribute('id').split("-")[2]].name, object)
					}
					for (let i = 0; i < walkArroundJson.length; i++) {
						if (walkArroundJson[i].placeIndex == activeScreen.teleports[this.getAttribute('id').split("-")[2]].teleportToPlaceIndex) {
							activeScreen = walkArroundJson[i];
							params.Verb = "Moved  to";
							params.Object = activeScreen.placeName;
							params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
							callToTacking.callToApi(params);
							if (xapiEnable) {
								var object = activeScreen.placeName.replace(/\s/g, '');
								sendToXapi("Moved", "moved", activeScreen.placeName, object);
							}
							generateRoom(activeScreen);
							break;
						}
					}
				} else if(this.getAttribute('id').split("-")[1]=="infohotspot"){
					focusTime = 0;
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
					}
					else if(selectedInfobox.infoboxType === "Audio"){
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
          
					params.Verb="started Viewing infobox ";
					params.Object=selectedInfobox.infoboxName;
					params.Sentence=params.Actor+" "+params.Verb+" "+params.Object;
					callToTacking.callToApi(params);
					
					if(xapiEnable){
						var object=(selectedInfobox.infoboxName).replace(/\s/g,'');
						sendToXapi("Viewed", "viewed", selectedInfobox.infoboxName, object)			   
					}
			}
			}
		});

		this.el.addEventListener('mouseenter', function () {
			if (experienceStarted === true && countdownEnd=== true && isCountDownFinished == true) {
				focusTime = 0;
				if (this.getAttribute('id').split("-")[1] != "infohotspot") {
					if (previousImage != "") {
						var skyImage1 = document.querySelector("#skyImage1");
						skyImage1.setAttribute("src", previousImage);
					}

					params.Verb = "started Viewing teleport ";
					params.Object = activeScreen.teleports[this.getAttribute('id').split("-")[2]].name;
					params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
					callToTacking.callToApi(params);
					if (xapiEnable) {
						var object = (activeScreen.teleports[this.getAttribute('id').split("-")[2]].name).replace(/\s/g, '');
						sendToXapi("Viewed", "viewed", activeScreen.teleports[this.getAttribute('id').split("-")[2]].name, object);
					}
					var sphere = document.querySelector("#" + this.getAttribute('id'));
					sphere.setAttribute("animation__animationBegin","property:rotation;to:0 360 0; dur: 1500;enabled:true;loop:true");
				}
			}
		});

		this.el.addEventListener('mouseleave', function () {
			if(experienceStarted === true && countdownEnd=== true)
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
			
				if (experienceStarted === true && countdownEnd=== true && isCountDownFinished == true) {
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
						setTimeout(()=>{
							infoBox.removeAttribute("animation__endAnimation");
							MainPlain.removeAttribute("animation__endAnimation1");
							bannerEntity.setAttribute("scale","1 1 1");	
							infoBox.setAttribute("visible", "false");
							var sphere = document.querySelector("#sphere-infohotspot-" + this.getAttribute('id').split("-")[2]);
							var overlay = document.querySelector("#overlay-plane-" + this.getAttribute('id').split("-")[2]);
							sphere.setAttribute('visible', 'true');
							sphere.setAttribute('position', '0 0 0');
							overlay.setAttribute('position', '2000 2000 2000');

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
						},1500);
						isInfoboxClick=false;
						params.Verb="Completed Viewing infobox";
						params.Object=activeScreen.infoboxes[this.getAttribute('id').split("-")[2]].infoboxName;
						params.Sentence=params.Actor+" "+params.Verb+" "+params.Object;
						callToTacking.callToApi(params);
						
						params.Verb="Viewed infobox";
						params.Object=activeScreen.infoboxes[this.getAttribute('id').split("-")[2]].infoboxName+" for "+focusTime+"sec";
						params.Sentence=params.Actor+" "+params.Verb+" "+params.Object;
						callToTacking.callToApi(params);
			}
		}
		});
		this.el.addEventListener('mouseleave', () => {
			if(experienceStarted === true && countdownEnd=== true){
			}
		});
	}
});

var telportName = "";
var callToTacking = new TrackingData();
var focusTime = 0;
var screenActiveTime = 0;
var framename = "";
var action = "";
var ExperienceName = "";
var startTracking = false;
var xapiEnable = false;
var isView = false;

function startCountDown() {
	experienceStarted = true;
	var entity = document.querySelector('[sound]');
		entity.components.sound.playSound();
	startTracking = true;
	callToTacking.callToApi(params);
	var signValue = "";
	var walkOutTimer = document.getElementById('walkOutTimer');
	walkOutTimer.setAttribute("visible", "true");
	var banner = document.querySelector("#walkOutTimer");
	banner.setAttribute("animation__skayroation","enabled:true");
	banner.setAttribute("animation__skayroation1","enabled:true");
	function startTick() {
		focusTime++;
		screenActiveTime++;
		if(!isView && screenActiveTime==5 && isCountDownFinished == true){
			isView = true;
			addExperienceView(params.PatronId, params.PublishedExperienceId);
		}
		if (screenActiveTime % 10 == 0 && isCountDownFinished == true)
			updateExperienceResult(10, 0, 0, "Incomplete");
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
		second = second * sign + 1 +''; // poor man's absolute value
		var dec = second.match(/\.\d+$/);
		var int = second.match(/^[^\.]+/);
		var second = (sign < 0 ? '-' : '') + ("0" + int).slice(-2) + (dec !== null ? dec : '');
		var walkOutTimerText = document.getElementById('walkOutTimerText');
		walkOutTimerText.setAttribute("text", "value:" + signValue + "" + minute + ":" + second);
		setTimeout(startTick, 1000);
	}
	startTick();
}

function countdown() {
	var startActivity = document.querySelector("#startActivity");
	startActivity.setAttribute("visible", "true");
	if(walkOutArroundJson.prelaunch_timer)
		launchCounter = walkOutArroundJson.prelaunch_timer;
	
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('safari') != -1) { 
		if (ua.indexOf('chrome') ==-1 ) {
			var audio1 = document.getElementById('audio-1');
			audio1.setAttribute('sound','src', walkOutArroundJson.background_sound);
			audio1.components.sound.playSound();
			audio1.setAttribute('sound','volume:0;');
		}
	}
	function tick() {
		var counter = document.getElementById("counter");
		if (launchCounter > 1) {
			var startCountDown = document.getElementById('startCountDown');
			startCountDown.setAttribute("value", launchCounter - 1)
			setTimeout(tick, 1000);
		} else if (launchCounter == 1) {
			var startCountDown = document.getElementById('startCountDown');
			startCountDown.setAttribute("value", "Here We Go!!!")
			if(walkOutArroundJson.prelaunch_text)
			startCountDown.setAttribute("value", walkOutArroundJson.prelaunch_text)
			countdownEnd = true;
			setTimeout(tick, 1000);
			var counter = document.getElementById("cursorImage");
			counter.setAttribute('cursor','fuse: true; fuseTimeout: 1200');
			addExperienceView(params.PatronId, params.PublishedExperienceId);
			isCountDownFinished = true;
			addExperienceResult(params.UserId, params.PatronId, params.PublishedExperienceId, 0);
		}
		else {
			startActivity.removeAttribute("animation__startAnimation");
			startActivity.setAttribute("animation__startAnimation","property: scale;from:0.1 0.1 0.1;to:0 0 0; dur: 2000;fill:forwards;");
			setTimeout(tickClose, 2000);
		}
		launchCounter--;
	}
	tick();
}

function tickClose() {
	var cam = document.querySelector("#rotation");
	cam.setAttribute("animation","enabled:false");
	cam.setAttribute("animation__one","enabled:true");
	startCountDown();
	var audio1 = document.getElementById('audio-1');
	audio1.setAttribute('sound','src', walkOutArroundJson.background_sound);
	
	var cursor = document.getElementById('cursorImage');
	cursor.setAttribute('visible', 'true');
	cursor.setAttribute('light', 'type:ambient;intensity:1.71');
	audio1 = document.querySelector('#audio-1');
	audio1.setAttribute('sound','src', walkOutArroundJson.background_sound);
	audio1.components.sound.playSound();
	audio1.setAttribute('sound','volume:1;');
	var startActivity = document.querySelector("#startActivity");
	startActivity.setAttribute("visible", "false");
}

var walkOutArroundJson = "";
var activeScreen = "";
var isSphereSelected = false;
var isFirstTime = true;
var previousImage = "";
var hotspotsToSave = [];
var placeToSave = [];
var hotspotIndex = 0;
var xapiEnable = false;
var totalTime = 0;
var params =
{
	"UserId": "",
	"PatronId": "",
	"PublishedExperienceId": "",
	"RoomId": "",
	"Actor": "",
	"Verb": "",
	"Object": "",
	"Sentence": ""
};

function assignVerboseData(data) {
	if (data.EnablexAPI == 1) {
		xapiEnable = data.EnablexAPI
		callToTacking.setData(true, true);
		setXAPIData(data);
		//IntializeXapi();
	} else
		callToTacking.setData(false, true);
	params.UserId = data.UserId;
	params.PatronId = data.patronId;
	params.PublishedExperienceId = data.Id;
	params.RoomId = data.roomId;
	if (data.patronName != null)
		params.Actor = data.patronName;
	else
		params.Actor = 'Guest';
	params.Verb = "Started watching";
	params.Object = data.ExperienceName;
	params.Sentence = params.Actor + " Started watching " + data.ExperienceName;
	if (xapiEnable) {
		sendToXapi("Launched", "launched", data.ExperienceName, data.ExperienceName.replace(/\s/g, ''));
	}
}

function sendToXapi(verb, urlVerb, objectText, ObjectUrlName) {
	if(isCountDownFinished){
	sendVerboseToXapi(verb, "http://adlnet.gov/expapi/verbs/" + urlVerb, objectText, "http://adlnet.gov/expapi/activities/VirtualTour", "http://id.tincanapi.com/activity/experizer-template/" + ObjectUrlName.toLowerCase(), "http://adlnet.gov/expapi/activities/course", "Activity");
}
}
function hexToRgb(hex, opacity) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
	  r: parseInt(result[1], 16),
	  g: parseInt(result[2], 16),
	  b: parseInt(result[3], 16),
	  alpha: opacity
	} : null;
  }

function loadExperience(data, ExperienceName) {
	ExperienceName = ExperienceName;
	walkOutArroundJson = data;
	//if json includes splashbgcolor and opacity
	if (walkOutArroundJson.splashBackgroundColor && walkOutArroundJson.Opacity) {
		var rgbformat = hexToRgb(walkOutArroundJson.splashBackgroundColor, walkOutArroundJson.Opacity);
		document.getElementById('innerInfo').style.backgroundColor = "rgba(" + rgbformat.r + "," + rgbformat.g + "," + rgbformat.b + "," + rgbformat.alpha + ")";
	}
	
	//if json includes splashheadercolor
	if (walkOutArroundJson.splashHeaderColor) {
	document.getElementById('titleText').style.color = walkOutArroundJson.splashHeaderColor;
	}
	
	document.getElementById('titleText').innerHTML = ExperienceName;
	// document.getElementById('instruction').innerHTML = walkOutArroundJson.splash_instruction;
	if (isMobile && walkOutArroundJson.splash_android_instruction!=undefined) {
		document.getElementById('instruction').innerHTML = walkOutArroundJson.splash_android_instruction;
	  } else {
		document.getElementById('instruction').innerHTML = walkOutArroundJson.splash_instruction;
	  }
	document.getElementById('titleDescription').innerHTML = walkOutArroundJson.launch_text;
	document.getElementById('splashLogo').src = walkOutArroundJson.splash_image;
	loggedin = true;
	if( walkOutArroundJson.prelaunch_timer)
	document.getElementById('startCountDown').setAttribute("value", walkOutArroundJson.prelaunch_timer);
	else
	document.getElementById('startCountDown').setAttribute("value", launchCounter);

	var startActivity = document.querySelector("#startActivity");
	if(walkOutArroundJson.prelaunch_image)
		startActivity.setAttribute('material','src',walkOutArroundJson.prelaunch_image);
	else
		startActivity.setAttribute('material','src','assets/images/bg3.jpg');
	seconds = parseInt(data.countdown_timer);
	totalTime = seconds;
	walkArroundJson = data.Nodes;
	activeScreen = walkArroundJson[0];
	if (activeScreen.entry_view) {
    $("#CamEntity").attr("rotation", activeScreen.entry_view);
  }
	generateRoom(activeScreen);
	// if (data["entry_view"]) {
	// 	$("#CamEntity").attr("rotation", data["entry_view"]);
	//   }
}

function generateRoom(activeScreen) {
	var sphereArray = document.querySelectorAll('.hotspot-entity');
	if (sphereArray.length > 0) {
		// sphereArray.forEach(sphere => {
		for (var i = 0; i < sphereArray.length; i++) {
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
	if (activeScreen.isEndNode === false) {
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

function setEndNode() {

	var walkOutTimer = document.querySelector("#walkOutTimer");
	walkOutTimer.setAttribute("visible", "false");
	var cursor = document.getElementById("cursorImage");
	cursor.setAttribute("visible", "true");
	var timeinvested = totalTime - seconds;
	var endInfoBox = document.querySelector("#endInfoBox");
	endInfoBox.setAttribute("visible", "true");
	var endInfoTextBox = document.getElementById('endInfoTextBox');
	totalMarks = walkOutArroundJson.Total_Marks;
	if(walkOutArroundJson.Success_Message){
	if(walkOutArroundJson.countdown_timer >= timeinvested){
		endInfoTextBox.setAttribute("value", walkOutArroundJson.Success_Message + " " +  timeinvested + " Seconds");
		Result = "Pass";
		obtainedMarks = walkOutArroundJson.Total_Marks;
	}else{
		endInfoTextBox.setAttribute("value", walkOutArroundJson.Failuer_Message + " " +  timeinvested + " Seconds");
		Result = "Fail";
		obtainedMarks = 0;
	}
}
else{
	if(walkArroundJson.countdown_timer >= timeinvested){
		endInfoTextBox.setAttribute("value", "Wow! You\'ve done it! and you took "+ " " + timeinvested + " Seconds");
		Result = "Pass";
		obtainedMarks = walkOutArroundJson.Total_Marks;
	}else{
		endInfoTextBox.setAttribute("value", "Oops! Better luck next time! and you took "+ " " + timeinvested + " Seconds");
		Result = "Fail";
		obtainedMarks = 0;
	}
	}
	setTimeout(closeEndNodeBox, 10000);
	params.Verb = "Completed";
	params.Object = ExperienceName + " in " + timeinvested + " sec";
	params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
	callToTacking.callToApi(params);
	if (xapiEnable) {
		var object = ExperienceName.replace(/\s/g, '');
		sendToXapi("Completed", "completed", ExperienceName + " in " + timeinvested + " sec", object);
	}
  	addExperienceView(params.PatronId, params.PublishedExperienceId);
	updateExperienceResult(9, obtainedMarks, totalMarks, Result);
	isCountDownFinished = false;
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
	newHotspot.setAttribute('position', '0 0 0');
	newHotspot.setAttribute('radius', teleport.teleportSize);
	newHotspot.setAttribute('opacity', teleport.teleportVisibility);
	newHotspot.setAttribute('shader', 'flat');
	newHotspot.setAttribute('src', teleport.teleportToPlaceImage);
	newHotspot.setAttribute('hotspotclick', '');
	hotSpotEntity.appendChild(newHotspot);
	var hotspot = document.querySelector("#sphere-hotspot-" + index);
	// var animation = document.createElement('a-animation');
	// animation.setAttribute('attribute', 'rotation');
	// animation.setAttribute('dur', '1500');
	// animation.setAttribute('fill', 'forwards');
	// animation.setAttribute('to', '0 360 0');
	// animation.setAttribute('repeat', 'indefinite');
	// animation.setAttribute('begin', 'animationBegin-' + index);
	// animation.setAttribute('end', 'animationEnd-' + index);
	// hotspot.appendChild(animation);
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
	}
	infoboxPlane.setAttribute("visible", "false");

	var infoboxOverlay = document.createElement('a-entity');
	infoboxOverlay.setAttribute("id", "overlay-plane-" + index);
	infoboxOverlay.setAttribute("obj-model", "obj:assets/images/moonlight.obj");
	infoboxOverlay.setAttribute("material", "src:assets/images/tvscreenplane.jpg;side:double;transparent:true;opacity:0");
	infoboxOverlay.setAttribute('class', "clickable");
	infoboxOverlay.setAttribute('infobox-leave','');
	infoboxOverlay.setAttribute('visible','false');
	infoboxOverlay.setAttribute("scale", "0.6 0.6 0.6");
	infoboxOverlay.setAttribute('position', "2000 2000 2000");
	infoboxOverlay.setAttribute("look-at", "src: #cameraId");
	sceneEl.appendChild(infoboxOverlay);

	// var startAnimation = document.createElement('a-animation');
	// startAnimation.setAttribute('attribute', "scale");
	// startAnimation.setAttribute('dur', "1000");
	// startAnimation.setAttribute('fill', "forwards");
	// startAnimation.setAttribute('from', "0 0 0");
	// startAnimation.setAttribute('to', "1 1 1");
	// startAnimation.setAttribute('begin', "startAnimation");
	// infoboxPlane.appendChild(startAnimation);

	var endAnimation = document.createElement('a-animation');
	endAnimation.setAttribute('attribute', "scale");
	endAnimation.setAttribute('dur', "1500");
	endAnimation.setAttribute('fill', "forwards");
	endAnimation.setAttribute('from', "1 1 1");
	endAnimation.setAttribute('to', "0 0 0");
	endAnimation.setAttribute('begin', "endAnimation");
	infoboxPlane.appendChild(endAnimation);
	
	// 	var startAnimation1 = document.createElement('a-animation');
	// startAnimation1.setAttribute('attribute', "scale");
	// startAnimation1.setAttribute('dur', "1000");
	// startAnimation1.setAttribute('fill', "forwards");
	// startAnimation1.setAttribute('from', "0 0 0");
	// startAnimation1.setAttribute('to', "1 1 1");
	// startAnimation1.setAttribute('begin', "startAnimation1");
	// infoboxPlane1.appendChild(startAnimation1);

	// var endAnimation1 = document.createElement('a-animation');
	// endAnimation1.setAttribute('attribute', "scale");
	// endAnimation1.setAttribute('dur', "1500");
	// endAnimation1.setAttribute('fill', "forwards");
	// endAnimation1.setAttribute('from', "1 1 1");
	// endAnimation1.setAttribute('to', "0 0 0");
	// endAnimation1.setAttribute('begin', "endAnimation1");
	// infoboxPlane1.appendChild(endAnimation1);

	hotspotIndex++;
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
			if(experienceStarted === true && countdownEnd=== true){
			}
		});
	}
});



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

