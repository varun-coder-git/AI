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
AFRAME.registerComponent('hotspotclick', {
	init: function () {
		this.el.addEventListener('click', function () {
			if(this.getAttribute('id').split("-")[1]=="hotspot"){
				for(let i=0;i<walkArroundJson.length;i++){
					if(walkArroundJson[i].placeIndex==activeScreen.teleports[this.getAttribute('id').split("-")[2]].teleportToPlaceIndex){
						activeScreen=walkArroundJson[i];
						generateRoom(activeScreen);
						break;
					}
				}
			}
		});
		
		this.el.addEventListener('mouseenter', function() {
			if(this.getAttribute('id').split("-")[1]=="infohotspot"){
				var positionPoints=activeScreen.infoboxes[this.getAttribute('id').split("-")[2]].infoboxPosition.split(" ");
				var infoBox = document.querySelector("#infoBox");
				infoBox.setAttribute("position",positionPoints[0]+" "+(positionPoints[1]-15)+" "+positionPoints[2]);
				infoBox.setAttribute("visible","true");
				infoBox.setAttribute("scale","0.6 0.4 0.6");
				var textBox = document.querySelector("#textBox");
				textBox.setAttribute("value",activeScreen.infoboxes[this.getAttribute('id').split("-")[2]].text)
			}else {
				if(previousImage!=""){
					var skyImage1 = document.querySelector("#skyImage1");
					skyImage1.setAttribute("src",previousImage);
				}
				var sphere=document.querySelector("#"+this.getAttribute('id'));
				sphere.emit("animationBegin-"+this.getAttribute('id').split("-")[2]);
			}
		});
		
		this.el.addEventListener('mouseleave', function() {
			if(this.getAttribute('id').split("-")[1]=="infohotspot"){
				var infoBox = document.querySelector("#infoBox");
				infoBox.setAttribute("visible","false");
			}else{
				var sphere=document.querySelector("#"+this.getAttribute('id'));
				if(sphere)
					sphere.emit("animationEnd-"+this.getAttribute('id').split("-")[2]);
			}
		});
	}
});

function countdown() {
	var cam = document.querySelector("#rotation");
	cam.emit('skayroation');
    var seconds = 120;
	var signValue="";
    function tick() {
        var counter = document.getElementById("counter");
        seconds--;
		if( seconds < 0 )
			signValue="-";
		var minute =Math.abs(parseInt(seconds/60));
		var sign = minute?minute<0?-1:1:0;
		minute = minute * sign + ''; // poor man's absolute value
		var dec = minute.match(/\.\d+$/);
		var int = minute.match(/^[^\.]+/);
		var minute = (sign < 0 ? '-' : '') + ("0" + int).slice(-2) + (dec !== null ? dec : '');
		var second =Math.abs(seconds%60);
		var sign = second?second<0?-1:1:0;
		second = second * sign + ''; // poor man's absolute value
		var dec = second.match(/\.\d+$/);
		var int = second.match(/^[^\.]+/);
		var second = (sign < 0 ? '-' : '') + ("0" + int).slice(-2) + (dec !== null ? dec : '');
		var walkOutTimer = document.getElementById('walkOutTimer');
		walkOutTimer.setAttribute("visible","true");
		var walkOutTimerText = document.getElementById('walkOutTimerText');
		walkOutTimerText.setAttribute("text","value:"+signValue+""+minute+":"+second);
           setTimeout(tick, 1000);
    }
    tick();
}

function startCountDown()
{
	var startActivity = document.querySelector("#startActivity");
		    startActivity.setAttribute("visible","true");
	 var seconds = 10;
    function tick() {
        var counter = document.getElementById("counter");
        if( seconds > 1 ) 
		{
			var minute =parseInt(seconds/60);
			var second =seconds%60;
			var startCountDown = document.getElementById('startCountDown');
			startCountDown.setAttribute("value",second-1)
            setTimeout(tick, 1000);
        } else if(seconds == 1){
			var startCountDown = document.getElementById('startCountDown');
			startCountDown.setAttribute("value","Here We Go!!!")
			setTimeout(tick, 1000);
		}
		else {
			setTimeout(tickClose, 2000);	
        }
		seconds--;
    }
    tick();
}

function tickClose(){
	countdown();
	var startActivity = document.querySelector("#startActivity");
	startActivity.setAttribute("visible","false");
}

var walkArroundJson="";
var activeScreen="";
$.getJSON( "assets/js/WalkAround.json", function( data ) {
	walkArroundJson=data.experienceData;
	activeScreen=walkArroundJson[0];
	generateRoom(activeScreen);
});

var isSphereSelected = false;
var isFirstTime=true;
var previousImage="";
var hotspotsToSave = [];
var placeToSave = [];
var hotspotIndex = 0;

function generateRoom(activeScreen){
	var sphereArray = document.querySelectorAll('a-sphere');
	if(sphereArray.length>0){
		sphereArray.forEach(sphere => {
			sphere.parentNode.removeChild(sphere);
		});
	}	
	var skyImage = document.querySelector("#skyImage");
	skyImage.setAttribute("src",activeScreen.placeSky);
	previousImage=activeScreen.placeSky;
	if(!isFirstTime){
	skyImage.emit("smallSphereAnimationStart");
	skyImage.emit("bigSphereAnimationStart");
	}
	setTimeout (function(){
		for (let i=0; i<activeScreen.teleports.length; i++) {
			addHotspot(activeScreen.teleports[i],i);
		}
		for (let i=0; i<activeScreen.infoboxes.length; i++) {
			addInfoHotspot(activeScreen.infoboxes[i],i);
		}
		if(isFirstTime){
			isFirstTime=false;
			startCountDown();
		}
	},2000);
}

function addHotspot(teleport,index) {	
	var sceneEl = document.querySelector('a-scene');
	var newHotspot = document.createElement('a-sphere');
	newHotspot.setAttribute('id',"sphere-hotspot-"+index);
	newHotspot.setAttribute('position', teleport.teleportPosition);
	newHotspot.setAttribute('radius', '5');
	newHotspot.setAttribute('opacity', '0.9');
	newHotspot.setAttribute('shader', 'flat');
	newHotspot.setAttribute('src', teleport.teleportToPlaceImage);
	newHotspot.setAttribute('hotspotclick', '');
	sceneEl.appendChild(newHotspot);
	var hotspot=document.querySelector("#sphere-hotspot-"+index);
	var animation = document.createElement('a-animation');
	animation.setAttribute('attribute','rotation');
	animation.setAttribute('dur','1500');
	animation.setAttribute('fill','forwards');
	animation.setAttribute('to','0 360 0');
	animation.setAttribute('repeat','indefinite');
	animation.setAttribute('begin','animationBegin-'+index);
	animation.setAttribute('end','animationEnd-'+index);
	hotspot.appendChild(animation);
	hotspotIndex++;
}

function addInfoHotspot(teleport,index) {
	var sceneEl = document.querySelector('a-scene');
	var newHotspot = document.createElement('a-sphere');
	newHotspot.setAttribute('id',"sphere-infohotspot-"+index);
	newHotspot.setAttribute('color', '#ff0000');
	newHotspot.setAttribute('position', teleport.infoboxPosition);
	newHotspot.setAttribute('radius', '5');
	newHotspot.setAttribute('opacity', '0.5');
	newHotspot.setAttribute('shader', 'flat');
	newHotspot.setAttribute('hotspotclick', '');
	sceneEl.appendChild(newHotspot);
	hotspotIndex++;
}
