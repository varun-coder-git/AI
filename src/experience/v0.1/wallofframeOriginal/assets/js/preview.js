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

function initializePreview(experienceJSON, ExperienceName) {
	
	museum_data = JSON.parse(experienceJSON);
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
		var cam = document.querySelector("#rotation");
		cam.emit('skayroation');
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
	floortexture.setAttribute('material', 'src: assets/textures/' + museum_data.decore_option + '-floor.jpg');
	var floortexture1 = document.querySelector('#floor2');
	floortexture1.setAttribute('material', 'src: assets/textures/' + museum_data.decore_option + '-floor.jpg');
	var floortexture2 = document.querySelector('#floor3');
	floortexture2.setAttribute('material', 'src: assets/textures/' + museum_data.decore_option + '-floor.jpg');
	var halltexture = document.querySelector('#hall');
	halltexture.setAttribute('material', 'src: assets/textures/' + museum_data.decore_option + '-hall.jpg');
}

window.addEventListener("keydown", function (e) {

	if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
		e.preventDefault();

	}
}, false);
