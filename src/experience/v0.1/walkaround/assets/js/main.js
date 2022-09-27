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
var isInfoboxClick=false;
var isMobile=false;
var focusTextIndexArray = [];
AFRAME.registerComponent('hotspotclick', {
	init: function () {		
		this.el.addEventListener('click', function () {
			if(experienceStarted === true){
			if(this.getAttribute('id').split("-")[1]=="hotspot"){
				params.Verb="clicked on teleport ";
				params.Object=activeScreen.teleports[this.getAttribute('id').split("-")[2]].name;
				params.Sentence=params.Actor+" "+params.Verb+" "+params.Object;
				callToTacking.callToApi(params);
				
				params.Verb="spent "+screenActiveTime+"sec ";
				params.Object="on "+activeScreen.placeName;
				params.Sentence=params.Actor+" "+params.Verb+" "+params.Object;
				callToTacking.callToApi(params);
				screenActiveTime=0;
				telportName=activeScreen.teleports[this.getAttribute('id').split("-")[2]].name;
				if(xapiEnable){
					var object=(activeScreen.teleports[this.getAttribute('id').split("-")[2]].name).replace(/\s/g,'');
					sendToXapi("Focused", "focused", activeScreen.teleports[this.getAttribute('id').split("-")[2]].name, object)		   
				}
				for(let i=0;i<walkArroundJson.length;i++){
					if(walkArroundJson[i].placeIndex==activeScreen.teleports[this.getAttribute('id').split("-")[2]].teleportToPlaceIndex){
						activeScreen=walkArroundJson[i];
						params.Verb="Moved  to";
						params.Object=activeScreen.placeName;
						params.Sentence=params.Actor+" "+params.Verb+" "+params.Object;
						callToTacking.callToApi(params);
				if(xapiEnable){
					var object=(activeScreen.placeName).replace(/\s/g,'');
					sendToXapi("Moved", "moved", activeScreen.placeName, object);					
				}
						generateRoom(activeScreen);
						break;
					}
				}

			}	else if(this.getAttribute('id').split("-")[1]=="infohotspot"){
				var selectedInfobox = activeScreen.infoboxes[this.getAttribute('id').split("-")[2]];
				var hotspotEntity = document.querySelector("#hotspot-entity-" + this.getAttribute('id').split("-")[2]);
				var MainPlain = document.querySelector("#infobox-MainPlane-" + this.getAttribute('id').split("-")[2]);					
				var infoBox = document.querySelector("#infobox-plane-" + this.getAttribute('id').split("-")[2]);
					var overlay = document.querySelector("#overlay-plane-" + this.getAttribute('id').split("-")[2]);
					var hotspotPosition = hotspotEntity.getAttribute("position");
				
					hotspotEntity.setAttribute("scale","2 2 2");
					this.setAttribute('position', "200 200 0");
					this.setAttribute('visible', 'false');
					infoBox.setAttribute("position", "0 0 -10");
					MainPlain.setAttribute("position", "0 0 -10");
					infoBox.setAttribute("visible", "true");
					MainPlain.setAttribute("visible", "true");
					// var pod = hotspotPosition.split(" ");
					if (selectedInfobox.infoboxType === "Image") {
						MainPlain.setAttribute("visible", "false");				
					}else if(selectedInfobox.infoboxType === "Audio"){
						MainPlain.setAttribute("visible", "false");	
						var audio1 = document.getElementById('audio-1');
						audio1.components.sound.pauseSound();
						var audio2 = document.getElementById('audio-2');
						audio2.setAttribute('sound', 'src', selectedInfobox.audioPath);
						if(selectedInfobox.audioPath != ""){
							audio2.components.sound.playSound();
						}
					}
					overlay.setAttribute('position', newPos(hotspotPosition.x,hotspotPosition.y,hotspotPosition.z ));
					infoBox.setAttribute("animation__startAnimation","property:scale;from:0 0 0;to:1 1 1; dur: 1500;enabled:true");
					MainPlain.setAttribute("animation__startAnimation1","property:scale;from:0 0 0;to:1 1 1; dur: 1500;enabled:true");
						isInfoboxClick = true;
					for (i = 0; i < activeScreen.infoboxes.length; i++)
					{
						var infohotspot = document.getElementById("sphere-infohotspot-"+i);
						infohotspot.removeAttribute("animation");
						infohotspot.setAttribute("animation__aEndAnimation","property:scale;from:1 1 1;to:0 0 0; dur: 1300;enabled:true");
						
					}
					for (j = 0; j < activeScreen.teleports.length; j++)
					{
					
					var hideteleport = document.getElementById("sphere-hotspot-"+j);
					var hidespherehotspotbg =document.getElementById("sphere-hotspot-bg-"+j);
					if(hideteleport != null ){
						hideteleport.setAttribute('visible', 'false');
						}
						if(hidespherehotspotbg != null ){
							hidespherehotspotbg.setAttribute('visible', 'false');
							}
					}
					for(k=0; k <  focusTextIndexArray.length ; k++){
						var hidefocusText =document.getElementById("focusText"+k);
						if(hidefocusText !=null){								
							hidefocusText.setAttribute('visible', 'false');
							}
					}
					
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
		
		this.el.addEventListener('mouseenter', function() {
			if(experienceStarted === true){
			focusTime = 0;
			if(this.getAttribute('id').split("-")[1]!="infohotspot"){
				if(previousImage!=""){
					var skyImage1 = document.querySelector("#skyImage1");
					skyImage1.setAttribute("src",previousImage);
				}
				
				params.Verb="started Viewing teleport ";
				params.Object=activeScreen.teleports[this.getAttribute('id').split("-")[2]].name;
				params.Sentence=params.Actor+" "+params.Verb+" "+params.Object;
				callToTacking.callToApi(params);
				if(xapiEnable){
					var object=(activeScreen.teleports[this.getAttribute('id').split("-")[2]].name).replace(/\s/g,'');
					sendToXapi("Viewed", "viewed", activeScreen.teleports[this.getAttribute('id').split("-")[2]].name, object);	   
				}
				var sphere=document.querySelector("#"+this.getAttribute('id'));
				sphere.setAttribute("animation__animationBegin","property:rotation;to:0 360 0; dur: 1500;enabled:true;loop:true");
			}
		}
		});
		
		this.el.addEventListener('mouseleave', function() {
			if(experienceStarted === true){
				var cur = document.querySelector('#cursor');
				cur.setAttribute("startAnimantion","");
				cur.setAttribute("startAnimantion","property: geometry.thetaLength;from:360;to:0; dur: 0;fill:none;enable:true");
				var sphere = document.querySelector("#" + this.getAttribute('id'));
					if (sphere)
						//sphere.emit("animationEnd-" + this.getAttribute('id').split("-")[2]);
						sphere.removeAttribute("animation__animationBegin");
			if(this.getAttribute('id').split("-")[1]!="infohotspot"){
				params.Verb="Viewed teleport ";
				params.Object=telportName;
				params.Sentence=params.Actor+" "+params.Verb+" "+params.Object;
				callToTacking.callToApi(params);
			}
		}
		});
	}
});

AFRAME.registerComponent('infobox-leave',{
	init: function () {
		this.el.addEventListener('mouseleave', function () {
			if (experienceStarted === true) {
				var cur = document.querySelector('#cursor');
					var infoBox = document.querySelector("#infobox-plane-" + this.getAttribute('id').split("-")[2]);
					if(isInfoboxClick){
						/////Audio for each place
						var audio2 = document.getElementById("audio-2");
						audio2.components.sound.stopSound();
						var audio1 = document.getElementById("audio-1");
						var srcCheck = audio1.getAttribute('sound');
						if(srcCheck.src != ""){
						audio1.components.sound.playSound();
						}
						var cur = document.querySelector('#cursor');
						cur.setAttribute("startAnimantion","");
					cur.setAttribute("startAnimantion","property: geometry.thetaLength;from:360;to:0; dur: 0;fill:none;enable:true");
						var infoBox = document.querySelector("#infobox-plane-" + this.getAttribute('id').split("-")[2]);
						var MainPlain = document.querySelector("#infobox-MainPlane-" + this.getAttribute('id').split("-")[2]);
						var hotspotEntity = document.querySelector("#hotspot-entity-" + this.getAttribute('id').split("-")[2]);
						
					infoBox.removeAttribute("animation__startAnimation");
					MainPlain.removeAttribute("animation__startAnimation1");
					
					infoBox.setAttribute("animation__endAnimation","property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true;");
					MainPlain.setAttribute("animation__endAnimation1","property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true;");
							setTimeout(()=>{
								
								hotspotEntity.setAttribute("scale","1 1 1");
								infoBox.setAttribute("visible", "false");
								var sphere = document.querySelector("#sphere-infohotspot-" + this.getAttribute('id').split("-")[2]);
								var overlay = document.querySelector("#overlay-plane-" + this.getAttribute('id').split("-")[2]);
								sphere.setAttribute('visible', 'true');
								sphere.setAttribute('position', '0 0 0');
								overlay.setAttribute('position', '2000 2000 2000');
								infoBox.setAttribute('position', '2000 2000 2000');
								infoBox.removeAttribute("animation__endAnimation");
							MainPlain.removeAttribute("animation__endAnimation1");
							
							},1500);
							for (i = 0; i < activeScreen.infoboxes.length; i++) 
							{
								var showinfohotspot = document.getElementById("sphere-infohotspot-"+i);
							showinfohotspot.removeAttribute("animation__aEndAnimation");
							showinfohotspot.setAttribute("animation","property:scale;from:0 0 0;to:1 1 1;dur: 1500;enabled:true;");
							
							}	
							for (j = 0; j < activeScreen.teleports.length; j++)
							{
							var showteleport = document.getElementById("sphere-hotspot-"+j);
							var showspherehotspotbg =document.getElementById("sphere-hotspot-bg-"+j);
							if(showteleport != null ){
								showteleport.setAttribute('visible', 'true');
								}
								if(showspherehotspotbg != null ){
									showspherehotspotbg.setAttribute('visible', 'true');
									}	
							}	
							for(k=0; k <  focusTextIndexArray.length ; k++){
								var showfocusText =document.getElementById("focusText"+k);
								if(showfocusText !=null){									
									showfocusText.setAttribute('visible', 'true');
									}
							}
							isInfoboxClick=false;
				}
					params.Verb="Completed Viewing infobox";
					params.Object=activeScreen.infoboxes[this.getAttribute('id').split("-")[2]].infoboxName;
					params.Sentence=params.Actor+" "+params.Verb+" "+params.Object;
					callToTacking.callToApi(params);
					
					params.Verb="Viewed infobox";
					params.Object=activeScreen.infoboxes[this.getAttribute('id').split("-")[2]].infoboxName+" for "+focusTime+"sec";
					params.Sentence=params.Actor+" "+params.Verb+" "+params.Object;
					callToTacking.callToApi(params);
					
			}
		});
		this.el.addEventListener('mouseleave', () => {
			if(experienceStarted === true){
			var cur = document.querySelector('#cursor');
			cur.setAttribute("startAnimantion","");
					cur.setAttribute("startAnimantion","property: geometry.thetaLength;from:360;to:0; dur: 0;fill:none;enable:true");
			}
		});
	}
});

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
		var cam = document.querySelector("#rotation");
		cam.setAttribute("animation","enabled:false");
		cam.setAttribute("animation__one","enabled:true");
		ascene.style.zIndex = 'auto';
		document.getElementById('container').style.display="none";
		document.getElementById('loaderq').style.display="none";
		experienceStarted=true;

	}           
});

var telportName="";
var callToTacking = new TrackingData();
var focusTime = 0;
var screenActiveTime=0;
var framename="";
var action="";
var ExperienceName="";
var startTracking=false;
var xapiEnable=false;
var isView = false;

function countdown() {
	var entity = document.querySelector('[sound]');
		entity.components.sound.playSound();
	experienceStarted = true;
	startTracking=true;
   	callToTacking.callToApi(params);
	addExperienceResult(params.UserId,params.PatronId,params.PublishedExperienceId,0);
    function tick() {
		focusTime++;
		screenActiveTime++;
		if(!isView && screenActiveTime==5){
			isView = true;
			addExperienceView(params.PatronId,params.PublishedExperienceId);
		}
		if(screenActiveTime%10==0)
			updateExperienceResult(10,0, 0, "N/A");
		setTimeout(tick, 1000);	
    }
    tick();
}
      
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

function assignVerboseData(data){
	if(data.EnablexAPI==1){
		xapiEnable=data.EnablexAPI
		callToTacking.setData(true,true);
		setXAPIData(data);
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
	sendVerboseToXapi(verb,"http://adlnet.gov/expapi/verbs/"+urlVerb, objectText, "http://adlnet.gov/expapi/activities/VirtualTour", "http://id.tincanapi.com/activity/experizer-template/"+ObjectUrlName.toLowerCase(), "http://adlnet.gov/expapi/activities/course", "Activity");
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

var walkArroundJson="";
var activeScreen="";
function loadExperience(data, ExperienceName){
	//if json includes splashbgcolor and opacity
	if (data.splashBackgroundColor && data.Opacity) {
		var rgbformat = hexToRgb(data.splashBackgroundColor, data.Opacity);
		document.getElementById('innerInfo').style.backgroundColor = "rgba(" + rgbformat.r + "," + rgbformat.g + "," + rgbformat.b + "," + rgbformat.alpha + ")";
	}
	//if json includes splashheadercolor
	if (data.splashHeaderColor) {
	document.getElementById('titleText').style.color = data.splashHeaderColor
	}
	document.getElementById('titleText').innerHTML = ExperienceName;
	// document.getElementById('instruction').innerHTML = data.splash_instruction;
	if (isMobile && data.splash_android_instruction!=undefined) {
		document.getElementById('instruction').innerHTML = data.splash_android_instruction;
	  } else {
		document.getElementById('instruction').innerHTML = data.splash_instruction;
	  }
    document.getElementById('titleDescription').innerHTML = data.launch_text;
    document.getElementById('splashLogo').src = data.splash_image;
    loggedin = true;
	walkArroundJson=data.Nodes;
	activeScreen=walkArroundJson[0];
	if (activeScreen.entry_view) {
    $("#CamEntity").attr("rotation", activeScreen.entry_view);
  }
	generateRoom(activeScreen);
}

var isSphereSelected = false;
var previousImage="";
var hotspotsToSave = [];
var placeToSave = [];
var hotspotIndex = 0;

function generateRoom(activeScreen){
	var sphereArray = document.querySelectorAll('.hotspot-entity');
	if(sphereArray.length>0){
		for(var i = 0; i < sphereArray.length; i++) {
			sphereArray[i].parentNode.removeChild(sphereArray[i]);
		}
	}	
	/////Audio for each place
	
	var audio1 = document.getElementById("audio-1");
   audio1.components.sound.stopSound();
  
  if (activeScreen.placeAudio) {
    audio1.setAttribute("sound", "src", activeScreen.placeAudio);
    if (experienceStarted) {
      if(activeScreen.placeAudio != ""){
        audio1.components.sound.playSound();
      }      
    }
  }else{
    audio1.setAttribute("sound", "src","");
  }

	var skyImage = document.querySelector("#skyImage");
	skyImage.setAttribute("src",activeScreen.placeSky);
	previousImage=activeScreen.placeSky;
	skyImage.removeAttribute("smallSphereAnimationStart");
	// skyImage.removeAttribute("bigSphereAnimationStart");
	skyImage.setAttribute("smallSphereAnimationStart","property: geometry.thetaLength;from:0;to:360; dur: 2000;fill:forward;enable:true");
	// skyImage.setAttribute("bigSphereAnimationStart","property: scale;from:-0.0000035 0.0000035 0.0000035; to: -1 1 1; dur: 1000;delay:2000;enabled:true");
	setTimeout (function(){
		for (let i=0; i<activeScreen.teleports.length; i++) {
			addHotspot(activeScreen.teleports[i],i);
		}

		for (let i=0; i<activeScreen.infoboxes.length; i++) {
			addInfoHotspot(activeScreen.infoboxes[i],i);
		}
	},2000);
	if (activeScreen.entry_view) {
		var camid = document.querySelector("#cameraId");
		var camrot = camid.getAttribute('rotation');
		var cam = document.querySelector("#CamEntity");
		oldpos = activeScreen.entry_view.split(" ")[1];
		cam.setAttribute('rotation', "0 " + (parseInt(oldpos)-camrot.y) + " 0");
	}
}

function addHotspot(teleport,index) {
	if(teleport.teleportToPlaceIndex != null) {
	var sceneEl = document.querySelector('a-scene');

	var hotSpotEntity = document.createElement('a-entity');
	hotSpotEntity.setAttribute('id','hotspot-entity');
	hotSpotEntity.setAttribute('class','hotspot-entity');
	hotSpotEntity.setAttribute('position',teleport.teleportPosition);
	hotSpotEntity.setAttribute('look-at','src:#cameraId');
	hotSpotEntity.setAttribute('scale','1 1 1');

	sceneEl.appendChild(hotSpotEntity);
	var newHotspot = document.createElement('a-sphere');
	newHotspot.setAttribute('id',"sphere-hotspot-"+index);
	newHotspot.setAttribute('position', '0 0 0');
	newHotspot.setAttribute('radius', teleport.teleportSize);
	newHotspot.setAttribute('opacity', teleport.teleportVisibility);
	newHotspot.setAttribute('shader', 'flat');
	newHotspot.setAttribute('src', teleport.teleportToPlaceImage);
	newHotspot.setAttribute('class', "clickable");
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
	hotspotSphereBG.setAttribute("animation","property:scale;from:0.9 0.9 0.9;to:1 1 1;loop:true;enabled:true;dir:alternate;autoplay:true");
	//Hotspot Background
	if(teleport.focusText){
	var teleportText = document.createElement('a-text');
	teleportText.setAttribute('id','focusText'+ index);
	teleportText.setAttribute('text',{'align':'center', 'width':50});
	teleportText.setAttribute('value',teleport.focusText);
	// teleportText.setAttribute('geometry','primitive:plane');
	teleportText.setAttribute('material','transparent:true');
	teleportText.setAttribute('material','alphaTest: 1');
	// teleportText.setAttribute('look-at','src:#cameraId');
	hotSpotEntity.appendChild(teleportText);
	teleportText.setAttribute('position','0 '+( -teleport.teleportSize - 5)+' 0');
	focusTextIndexArray.push(hotspotIndex);
	}
	hotspotIndex++;
	}
}

function addInfoHotspot(teleport,index) {
	var sceneEl = document.querySelector('a-scene');
	var hotSpotEntity = document.createElement('a-entity');
	hotSpotEntity.setAttribute('id', 'hotspot-entity-'+index);
	hotSpotEntity.setAttribute('class', 'hotspot-entity');
	hotSpotEntity.setAttribute('position',teleport.infoboxPosition);
	hotSpotEntity.setAttribute("look-at","src: #cameraId");

	
	sceneEl.appendChild(hotSpotEntity);
	var newHotspot = document.createElement('a-sphere');
	newHotspot.setAttribute('id',"sphere-infohotspot-"+index);
//	newHotspot.setAttribute('color', '#ff0000');
	newHotspot.setAttribute('position', '0 0 0');
	newHotspot.setAttribute('radius', teleport.infoboxSize);
	newHotspot.setAttribute('opacity', teleport.infoboxVisibility);
	newHotspot.setAttribute('shader', 'flat');
	newHotspot.setAttribute('class', "clickable");
	newHotspot.setAttribute('hotspotclick', '');
	if (teleport.infoBannerBgColor) {
		newHotspot.setAttribute('color', teleport.infoBannerBgColor);
	} else {
		newHotspot.setAttribute('color', "#ff0000");
	}
	hotSpotEntity.appendChild(newHotspot);

	var infoboxPlane1 = document.createElement('a-plane');
	infoboxPlane1.setAttribute("id", "infobox-MainPlane-" + index);
	if (teleport.infoBgColor) {
		infoboxPlane1.setAttribute('color', teleport.infoBgColor);
	} else {
		infoboxPlane1.setAttribute('color', "#000000");
	}
	infoboxPlane1.setAttribute('geometry', "height:15;width:30");
	if (teleport.infoBgOpacity) {
		infoboxPlane1.setAttribute('material', "side:double;opacity:" + teleport.infoBgOpacity + ";transparent:true");
	} else {
		infoboxPlane1.setAttribute('material', "side:double;opacity:0.8;transparent:true");
	}
	infoboxPlane1.setAttribute("scale", "0 0 0");
	hotSpotEntity.appendChild(infoboxPlane1);

	var infoboxPlane = document.createElement('a-plane');
	infoboxPlane.setAttribute("id", "infobox-plane-" + index);
	 	infoboxPlane.setAttribute('color', "#000000");
	infoboxPlane.setAttribute('geometry', "height:20;width:40");
	infoboxPlane.setAttribute('material', "side:double;opacity:0;transparent:true");
	infoboxPlane.setAttribute("position", "2000 2000 2000");
	
	hotSpotEntity.appendChild(infoboxPlane);
	if (teleport.infoboxType === "Image") {
		infoboxPlane.setAttribute('color', "#fff");
		infoboxPlane.setAttribute("material", "src", '');
		infoboxPlane.setAttribute('geometry', "height:16.88;width:30");
		infoboxPlane.setAttribute('material', "side:double;opacity:1;shader:flat");
		infoboxPlane.setAttribute("material", "src", teleport.imagePath);
	} else if (teleport.infoboxType === "Text") {
		var infoboxText = document.createElement('a-text');
		infoboxText.setAttribute("text", "width:28;baseline:top;wrapCount:48;lineHeight:50");
		infoboxText.setAttribute("value", teleport.text);
		infoboxText.setAttribute("position", "-13.86466 5.9 1.12607");

		if (teleport.infoFontColor) {
			infoboxText.setAttribute("color", teleport.infoFontColor);
		}
		infoboxPlane.appendChild(infoboxText);
	}
	infoboxPlane.setAttribute("visible","true");

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
			if(experienceStarted === true){
			var cur = document.querySelector('#cursor');
			cur.setAttribute("startAnimantion","");
					cur.setAttribute("startAnimantion","property: geometry.thetaLength;from:360;to:0; dur: 0;fill:none;enable:true");
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
    
      console.log("barcode" );
      var url = 'https://api.qrserver.com/v1/create-qr-code/?data='+window.location.href+'&amp;size=50x50';
      console.log("barcode",url);
      document.getElementById("qrcode").src = url;
     
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

