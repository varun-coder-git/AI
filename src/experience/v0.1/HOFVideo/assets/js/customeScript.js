

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

var fixOpacity = 0.2;
var museum_data;
var assettype;
var imageLocation;
var loadedAscene = false;
var loadedAassets = false;
var checkAssetsLoaded = setInterval(function () {
	if (loadedAscene && loadedAassets) {
		$("#loaderq").hide();
		document.getElementById("loaderoverlay").style.display = "none";
		clearInterval(checkAssetsLoaded);
	}
}, 5000);

function initializeCustomization(experienceToCustomize) {
	museum_data = JSON.parse(experienceToCustomize);
	if (museum_data["entry_view"]) {
		// $("#CamEntity").attr("rotation", museum_data["entry_view"]);
		// $("#mainCam").attr("position", museum_data["entry_position"]);
	}
	renderExperience(museum_data);
}

function setEntryView() {
	if ($('#freezeView').hasClass('disabled')) {
		//Nothing to do here
	} else {
		var cam = document.querySelector("[camera]");
		var rot = cam.getAttribute("rotation");
		// var pos = cam.getAttribute("position");
		var oldrot = 0;
		if (museum_data["entry_view"]) {
			oldrot = museum_data["entry_view"].split(" ")[1];
		}
		// museum_data["entry_position"] = "0 1.6 0";	
		museum_data["entry_view"] = "0 " + (rot.y + parseInt(oldrot)) + " 0";
		$('#freezeView').addClass('disabled');
		$('#freezeView').click(toastr.success('Presto! This view is now the Starting View of this Experience.'));
	}
}

AFRAME.registerComponent('mousedrag', {
	init: function () {
		this.el.addEventListener('mouseup', function () {
			$('#freezeView').removeClass('disabled');
		});
	}
});

function getExperienceToSave() {
	var lauchText = $(".lunchScreenText");

	var lunchTextItem = lauchText[0].value;
	museum_data.launch_text = lunchTextItem;

	var splashInstruction = $(".instructionSet");
	var item = splashInstruction[0].value;
	museum_data.splash_instruction = item;
	// museum_data.launch_text = document.getElementById("lunchScreenText").value;
	// museum_data.splash_instruction = document.getElementById("instructionSet").value;
	museum_data.splash_image = splashImagePath;

	var headerFont = $(".headerfont");
	var headerFontColor = headerFont[0].value;
	if (headerFontColor.includes('#')) {
		museum_data.splashHeaderColor = headerFontColor;
	} else {
		museum_data.splashHeaderColor = '#' + headerFontColor;
	}

		var splashbg = $(".splashBg");
		var splashBgColor = splashbg[0].value;
		if (splashBgColor.includes('#')) {
			museum_data.splashBackgroundColor = splashBgColor;
		} else {
			museum_data.splashBackgroundColor = '#' + splashBgColor;
		}
	

	if(museum_data.Opacity){
		var opacity = document.getElementById("fixOpacity");
		opacity.value =museum_data.Opacity;
		var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
		document.getElementById("rangeValue").innerText = displayvalue;
	  }else{
		museum_data.Opacity = fixOpacity;
	  }

	var modifiedJSON = museum_data;
	modifiedJSON.entry_view = museum_data.entry_view;
	var dataToPost = JSON.stringify(modifiedJSON);
	return dataToPost;
}


$(document).ready(function () {
	$("#overlay").click(function () {
		var selectedFrame = document.getElementById("frameDropDown").selectedIndex;
		if(selectedFrame==0 || selectedFrame==4 || selectedFrame==9 || selectedFrame==10||selectedFrame==14|| selectedFrame==19){
			var gallerytext = document.querySelector('#text-' + (selectedFrame + 1));
		gallerytext.setAttribute('value', document.getElementById("frameDescription").value);
		if (galleryVideoName !== null && galleryVideoName !== undefined && galleryVideoName !== "") {
			museum_data.gallery_data[selectedFrame].image_path = galleryVideoName;
		}
		museum_data.gallery_data[selectedFrame].image_description = document.getElementById("frameDescription").value;
		museum_data.gallery_data[selectedFrame].frame_name = document.getElementById("frameName").value;
		galleryVideoName = "";
		}else{
			var gallerytext = document.querySelector('#text-' + (selectedFrame + 1));
		gallerytext.setAttribute('value', document.getElementById("frameDescription").value);
		if (galleryImageName !== null && galleryImageName !== undefined && galleryImageName !== "") {
			museum_data.gallery_data[selectedFrame].image_path = galleryImageName;
		}
		museum_data.gallery_data[selectedFrame].image_description = document.getElementById("frameDescription").value;
		museum_data.gallery_data[selectedFrame].frame_name = document.getElementById("frameName").value;
		galleryImageName = "";
		}
		

		museum_data.decore_option = selectedDecoreoption;
		if (northImageName != undefined && northImageName != "")
			museum_data.north_wall = northImageName;
		if (southImageName != undefined && southImageName != "")
			museum_data.south_wall = southImageName;
		if (audioFileName != undefined && audioFileName != "")
			museum_data.audio_url = audioFileName;
		southImageName = "";
		northImageName = "";
		$(".sidenav").removeClass('active');
		$("#overlay").removeClass('overlay');
		document.querySelector('[camera]').setAttribute("keyboard-controls", "");
		document.querySelector('[camera]').setAttribute("wasd-controls:", "");
		$("#southImageLable").removeClass("greenBackground");
		$("#northImageLable").removeClass("greenBackground");
		sidenavActive = false;
	});


	document.querySelector('a-scene').addEventListener('loaded', function () {
		loadedAscene = true;
	});

	document.querySelector('a-assets').addEventListener('loaded', function () {
		loadedAassets = true;
	});
	$('#gallerySidebar').trigger('click');
	$('#gallerySidebar').trigger('click');


	$(".bgThemeDiv > img").click(function () {
		$(".bgThemeDiv > img").removeClass("activeCLass");
		$(".bgThemeDiv > img").removeClass("border-active");
		$(this).addClass("activeCLass");
		$(this).addClass("border-active");
	});

	// document.getElementById('mainBlock').addEventListener('click', function (e) {
	// 	if (imageClick == false) {
	// 		var selectedFrame = document.getElementById("frameDropDown").selectedIndex;
	// 		var gallerytext = document.querySelector('#text-' + (selectedFrame + 1));
	// 		gallerytext.setAttribute('value', document.getElementById("frameDescription").value);
	// 		if (galleryImageName !== null && galleryImageName !== undefined && galleryImageName !== "") {
	// 			museum_data.gallery_data[selectedFrame].image_path = galleryImageName;
	// 		}
	// 		museum_data.gallery_data[selectedFrame].image_description = document.getElementById("frameDescription").value;
	// 		museum_data.gallery_data[selectedFrame].frame_name = document.getElementById("frameName").value;
	// 		galleryImageName = "";

	// 		museum_data.decore_option = selectedDecoreoption;
	// 		if (northImageName != undefined && northImageName != "")
	// 			museum_data.north_wall = northImageName;
	// 		if (southImageName != undefined && southImageName != "")
	// 			museum_data.south_wall = southImageName;
	// 		if (audioFileName != undefined && audioFileName != "")
	// 			museum_data.audio_url = audioFileName;
	// 		southImageName = "";
	// 		northImageName = "";
	// 		if (!document.getElementById('auditoriumSidenav').contains(e.target) &&
	// 			document.getElementById('auditoriumSidenav').classList.contains('active')) {

	// 			document.querySelector('[camera]').setAttribute("keyboard-controls", "");
	// 			document.querySelector('[camera]').setAttribute("wasd-controls:", "");
	// 			closeSideNav();
	// 		} else if (!document.getElementById('gallerySidenav').contains(e.target) && document.getElementById('gallerySidenav').classList.contains('active')) {

	// 			document.querySelector('[camera]').setAttribute("keyboard-controls", "");
	// 			document.querySelector('[camera]').setAttribute("wasd-controls:", "");
	// 			closeSideNav();
	// 		} else if (!document.getElementById('launchSidenav').contains(e.target) && document.getElementById('launchSidenav').classList.contains('active')) {

	// 			document.querySelector('[camera]').setAttribute("keyboard-controls", "");
	// 			document.querySelector('[camera]').setAttribute("wasd-controls:", "");
	// 			closeSideNav();
	// 		}
	// 	} else {
	// 		setTimeout(function () { imageClick = false; }, 100);

	// 	}
	// });


	// $("#fixOpacity").on("input", function () {
	// 	fixOpacity = $(this).val();
	// 	var displayvalue = '(' + Math.round(fixOpacity * 100) + '%)';
	// 	document.getElementById("rangeValue").innerText = displayvalue;
	// 	museum_data.Opacity=fixOpacity;
	// 	console.log("hi")
	// });
	// console.log("hi out")

});

(function () {
	var sel=document.querySelector("#fixOpacity");
	document.querySelector('#rangeValue').innerText = sel.value;
	sel.addEventListener('input', function () {
	fixOpacity = sel.value;
	var displayvalue = '(' + Math.round(fixOpacity * 100) + '%)';
	document.querySelector('#rangeValue').innerText = displayvalue;
	museum_data.Opacity=fixOpacity;
	});
	})()

AFRAME.registerComponent('mouseclick', {
	init: function () {
		this.el.addEventListener('click', function () {
			imageClick = true;
			if (this.getAttribute('id').split("-")[2] == 'wall') {
				$("#collapseOne").removeClass("show");
				$("#collapseTwo").addClass("show");
				if (this.getAttribute('id').split("-")[1] == "North") {
					$("#southImageLable").removeClass("greenBackground");
					$("#northImageLable").addClass("greenBackground");
				} else {
					$("#northImageLable").removeClass("greenBackground");
					$("#southImageLable").addClass("greenBackground");
				}
				toggleSideNav('auditoriumSidenav');
			}
			else if(this.getAttribute('id').split("-")[1] !=1 || this.getAttribute('id').split("-")[1] !=5 || this.getAttribute('id').split("-")[1] !=10 || this.getAttribute('id').split("-")[1] !=11 || this.getAttribute('id').split("-")[1] !=15 || this.getAttribute('id').split("-")[1] !=20 ){
				document.getElementById("frameDropDown").selectedIndex = this.getAttribute('id').split("-")[1] - 1;
				$("#frameImageLabel").text(museum_data.gallery_data[this.getAttribute('id').split("-")[1] - 1].image_path.split("/")[museum_data.gallery_data[this.getAttribute('id').split("-")[1] - 1].image_path.split("/").length - 1]);
				document.getElementById("frameDescription").value = museum_data.gallery_data[this.getAttribute('id').split("-")[1] - 1].image_description;
				if (museum_data.gallery_data[this.getAttribute('id').split("-")[1] - 1].frame_name == undefined || museum_data.gallery_data[this.getAttribute('id').split("-")[1] - 1].frame_name == "")
					document.getElementById("frameName").value = "";
				else
					document.getElementById("frameName").value = museum_data.gallery_data[this.getAttribute('id').split("-")[1] - 1].frame_name;
				galleryImage = "";
				if (this.getAttribute('id').split("-")[1] == 9 || this.getAttribute('id').split("-")[1] == 19)
					$('#frameImageTitle').text("Note: Recommended aspect ratio 3:4");
				else if (this.getAttribute('id').split("-")[1] == 10 || this.getAttribute('id').split("-")[1] == 20)
					$('#frameImageTitle').text("Note: Recommended aspect ratio 4:3");
				else
					$('#frameImageTitle').text("Note: Recommended aspect ratio 3:2");
				toggleSideNav('gallerySidenav');
				$("#imageGroup").addClass("show");
			}else{
				document.getElementById("frameDropDown").selectedIndex = this.getAttribute('id').split("-")[1] - 1;
				$("#frameVideoLabel").text(museum_data.gallery_data[this.getAttribute('id').split("-")[1] - 1].video_path.split("/")[museum_data.gallery_data[this.getAttribute('id').split("-")[1] - 1].video_path.split("/").length - 1]);
				document.getElementById("videoDescription").value = museum_data.gallery_data[this.getAttribute('id').split("-")[1] - 1].video_description;
				if (museum_data.gallery_data[this.getAttribute('id').split("-")[1] - 1].video_name == undefined || museum_data.gallery_data[this.getAttribute('id').split("-")[1] - 1].video_name == "")
					document.getElementById("videoName").value = "";
				else
					document.getElementById("videoName").value = museum_data.gallery_data[this.getAttribute('id').split("-")[1] - 1].video_name;
				galleryVideo = "";
				if (this.getAttribute('id').split("-")[1] == 10 || this.getAttribute('id').split("-")[1] == 20)
					$('#frameVideoTitle').text("Note: Recommended aspect ratio 3:4");
				else if (this.getAttribute('id').split("-")[1] == 1 || this.getAttribute('id').split("-")[1] == 11)
					$('#frameVideoTitle').text("Note: Recommended aspect ratio 4:3");
				else
					$('#frameVideoTitle').text("Note: Recommended aspect ratio 3:2");
				toggleSideNav('gallerySidenav');
				$("#videoGroup").addClass("show");
			}
		});
	}
});

var sidenavActive = false;
var imageClick = false;
var isSphereSelected = false;
var hotspotsToSave = [];
var placeToSave = [];
var hotspotIndex = 0;
var galleryImage = "";
var galleryImageName = "";
var galleryVideo = "";
var galleryVideoName = "";
var southImage = "";
var southImageName = "";
var northImage = "";
var northImageName = "";
var audioFile = "";
var audioFileName = "";
var splashImagePath = "";
var selectedFrame = "";
var selectedDecoreoption = "Executive";
var floortexture = document.getElementById('floor-texture');
floortexture.setAttribute('src', "assets/textures/Executive-floor.jpg");
var halltexture = document.getElementById('hall-texture');
halltexture.setAttribute('src', "assets/textures/Executive-hall.jpg");
function toggleSideNav(sidenavId) {
	var sidenavList = document.getElementsByClassName("sidenav");
	[].forEach.call(sidenavList, function (navigation) {
		if (navigation.classList.contains('active') && navigation.id != sidenavId)
			navigation.classList.remove('active');
	});
	document.getElementById(sidenavId).classList.toggle("active");
	toggleOverlay();
}

function toggleSideNavBar(navbar) {
	//	document.getElementById("frameDropDown").selectedIndex=0;
	$('#frameImageLabel').text("Choose Image");
	$('#southImageLable').text("Choose South Wall Image");
	$('#northImageLable').text("Choose North Wall Image");
	$('#audioLable').text("Choose Audio");
	document.getElementById("frameDescription").value = "";
	document.getElementById("frameDescription").style.background = " white !important;";
	toggleSideNav(navbar);
}

function toggleOverlay() {
	sidenavActive = false;
	var sidenavList = document.getElementsByClassName("sidenav");
	[].forEach.call(sidenavList, function (navigation) {
		if (navigation.classList.contains('active'))
			sidenavActive = true;
	});
	if (sidenavActive) {
		document.querySelector('[camera]').removeAttribute('wasd-controls');
		document.querySelector('[camera]').removeAttribute('keyboard-controls');
		document.getElementById("overlay").classList.add('overlay');
	}
	else {
		document.getElementById("overlay").classList.remove('overlay');
		document.querySelector('[camera]').setAttribute("keyboard-controls", "");
		document.querySelector('[camera]').setAttribute("wasd-controls:", "");
	}
}

function decoreOptionChanged(option) {
	selectedDecoreoption = option;
	var floortexture = document.querySelector('#floor');
	floortexture.setAttribute('material', 'src: assets/textures/' + selectedDecoreoption + '-floor.jpg');
	var floortexture = document.querySelector('#floor2');
	floortexture.setAttribute('material', 'src: assets/textures/' + selectedDecoreoption + '-floor.jpg');
	var floortexture = document.querySelector('#floor3');
	floortexture.setAttribute('material', 'src: assets/textures/' + selectedDecoreoption + '-floor.jpg');
	var halltexture = document.querySelector('#hall');
	halltexture.setAttribute('material', 'src: assets/textures/' + selectedDecoreoption + '-hall.jpg');
	museum_data.decore_option = selectedDecoreoption;
}

function getAssetType() {
	return assettype;
}

function getAssetPath(assetPath) {
	if(assetPath==undefined || assetPath==""){
		return;
	  }
	if (assetPath != "") {
		if (imageLocation == "DefaultImage" || imageLocation == "DefaultVideo") {
			$('#defaultImageLable').text(assetPath.split("/")[assetPath.split("/").length - 1]);
			museum_data.default_image = assetPath;
			for (let i = 1; i <= 20; i++) {
				if(i==1 || i==5 || i==10 || i==11 || i==15 || i==20){
					museum_data.gallery_data[i - 1].image_path = assetPath
					var gallery_entity = document.querySelector('#gallery-' + i);
					gallery_entity.setAttribute('material', 'src: #defaultgalleryVideo');
					var changedgallery = document.querySelector('#changedvideo');
					changedgallery.setAttribute('src', assetPath);
					gallery_entity.setAttribute('material', 'src: #changedvideo');
				}else{
					museum_data.gallery_data[i - 1].image_path = assetPath
					var gallery_entity = document.querySelector('#gallery-' + i);
					gallery_entity.setAttribute('material', 'src: #defaultgallery');
					var changedgallery = document.querySelector('#changedgallery');
					changedgallery.setAttribute('src', assetPath);
					gallery_entity.setAttribute('material', 'src: #changedgallery');
				}
				
			}
		} else if (imageLocation == "NorthImage") {
			northImageName = assetPath;
			$('#northImageLable').text(assetPath.split("/")[assetPath.split("/").length - 1]);
			var north_texture = document.querySelector('#changedgallery');
			north_texture.setAttribute('src', assetPath);
			var north_wall = document.querySelector('#image-North-wall');
			north_wall.setAttribute('material', 'src: #north-texture');
			north_wall.setAttribute('material', 'src: #changedgallery');
		} else if (imageLocation == "SouthImage") {
			southImageName = assetPath;
			$('#southImageLable').text(assetPath.split("/")[assetPath.split("/").length - 1]);
			var south_texture = document.querySelector('#changedgallery');
			south_texture.setAttribute('src', assetPath);
			var south_wall = document.querySelector('#image-South-wall');
			south_wall.setAttribute('material', 'src: #south-texture');
			south_wall.setAttribute('material', 'src: #changedgallery');
		} else if (imageLocation == "Audio") {
			audioFileName = assetPath;
			$('#audioLable').text(assetPath.split("/")[assetPath.split("/").length - 1]);
		} else if (imageLocation == "Frame") {
			galleryImageName = assetPath;
			var fileNameIndex = assetPath.split("/").length - 1
			$('#frameImageLabel').text(assetPath.split("/")[fileNameIndex]);
			selectedFrame = document.getElementById("frameDropDown").value;
			var gallery_entity = document.querySelector('#gallery-' + selectedFrame);
			gallery_entity.setAttribute('material', 'src: #defaultgallery');
			var changedgallery = document.querySelector('#changedgallery');
			changedgallery.setAttribute('src', assetPath);
			gallery_entity.setAttribute('material', 'src: #changedgallery');
		} else if (imageLocation == "Video") {
			galleryVideoName = assetPath;
			var fileNameIndex = assetPath.split("/").length - 1
			$('#frameVideoLabel').text(assetPath.split("/")[fileNameIndex]);
			selectedFrame = document.getElementById("frameDropDown").value;
			var gallery_entity = document.querySelector('#gallery-' + selectedFrame);
			gallery_entity.setAttribute('material', 'src: #defaultgalleryVideo');
			var changedgallery = document.querySelector('#changedVideo');
			changedgallery.setAttribute('src', assetPath);
			gallery_entity.setAttribute('material', 'src: #changedVideo');
		} else if (imageLocation == "Splash") {
			splashImagePath = assetPath;
			var splashImageName = splashImagePath.split("/")[splashImagePath.split("/").length - 1];
			$("#splashImageLable").text(splashImageName);
		}
	}
}

function showDefaultImage() {
	assettype = 'Image';
	imageLocation = "DefaultImage";
	window.parent.triggerAssetsPopup();
}
function showDefaultVideo() {
	assettype = 'Video';
	imageLocation = "DefaultVideo";
	window.parent.triggerAssetsPopup();
}
function showNorthImage(input) {
	assettype = 'Image';
	imageLocation = "NorthImage";
	window.parent.triggerAssetsPopup();
}

function showSouthImage(input) {
	assettype = 'Image';
	imageLocation = "SouthImage";
	window.parent.triggerAssetsPopup();
}

function assignAudio(input) {
	assettype = 'Audio';
	imageLocation = "Audio";
	window.parent.triggerAssetsPopup();
}

function addDecoreOption() {

}

function showFrameImage(input) {
	assettype = 'Image';
	imageLocation = "Frame";
	window.parent.triggerAssetsPopup();
}
function showFrameVideo(input) {
	assettype = 'Video';
	imageLocation = "Video";
	window.parent.triggerAssetsPopup();
}
function addFrame() {
	toggleSideNav('gallerySidenav');
}

function removeAudio() {
	museum_data.audio_url = "";
	$('#audioLable').text("Choose Audio");
}

function closeSideNav() {
	if (imageClick) {
		imageClick = false;
	} else {
		var sidenavList = document.getElementsByClassName("sidenav");
		[].forEach.call(sidenavList, function (navigation) {
			navigation.classList.remove('active');
			toggleFlag = false;
		});
		toggleOverlay();
	}
}


function renderExperience(experienceData) {
	var museum_data=experienceData;
	decoreOptionChanged(experienceData.decore_option);
	if(museum_data.launch_text){
	document.getElementsByClassName("lunchScreenText").value = museum_data.launch_text;
	$('.lunchScreenText').summernote('code', museum_data.launch_text);
	
	var lauchText = $(".lunchScreenText");
	var div = document.createElement("div");
	div.innerHTML = lauchText[0].value;
	var plainText = div.textContent || div.innerText || "";
		var maxLength = 350;
		$('#maxCount').text( plainText.length);
	   
	}
	if (museum_data.splashBackgroundColor) {
		var splashBackground = document.getElementById("splashBackground");
		splashBackground.value = museum_data.splashBackgroundColor;
		splashBackground.style.backgroundColor = splashBackground.value;

	} else {
		var splashBackground = document.getElementById("splashBackground");
		splashBackground.style.backgroundColor = "#8F8F8F";
		splashBackground.value="#8F8F8F";
	}

	if (museum_data.Opacity) {
		var opacity = document.getElementById("fixOpacity")
		opacity.value = museum_data.Opacity;
		var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
		document.getElementById("rangeValue").innerText = displayvalue;
	} else {
		var opacity = document.getElementById("fixOpacity")
		opacity.value = fixOpacity;
		var displayvalue = '(' + Math.round(fixOpacity * 100) + '%)';
		document.getElementById("rangeValue").innerText = displayvalue;
	}

	if (museum_data.splashHeaderColor) {
		var splashHeaderColor = document.getElementById('splashHeaderColor')
		splashHeaderColor.value = museum_data.splashHeaderColor;
		splashHeaderColor.style.backgroundColor = splashHeaderColor.value;
	}
	if (museum_data.splash_instruction) {
		document.getElementsByClassName("instructionSet").value = museum_data.splash_instruction;
		$('.instructionSet').summernote('code', museum_data.splash_instruction);
	}
	if (museum_data.splash_image) {
		splashImagePath = museum_data.splash_image;
		var splashImageName = splashImagePath.split("/")[splashImagePath.split("/").length - 1];
		$("#splashImageLable").text(splashImageName);
	}

	if (museum_data.default_image) {
		var defaultimage = museum_data.default_image;
		var defaultimage = defaultimage.split("/")[defaultimage.split("/").length - 1];
		$("#defaultImageLable").text(defaultimage);
	}

	var north_wall = document.querySelector('#image-North-wall');
	north_wall.setAttribute('material', 'src:' + experienceData.north_wall);
	if (experienceData.north_wall != "")
		$('#northImageLable').text(experienceData.north_wall.split("/")[experienceData.north_wall.split("/").length - 1]);
	var south_wall = document.querySelector('#image-South-wall');
	south_wall.setAttribute('material', 'src:' + experienceData.south_wall);
	if (experienceData.south_wall != "")
		$('#southImageLable').text(experienceData.south_wall.split("/")[experienceData.south_wall.split("/").length - 1]);
	//	var audio1 = document.getElementById('audio-1');
	//	audio1.setAttribute('src', experienceData.audio_url);
	if (experienceData.audio_url != "")
		$('#audioLable').text(experienceData.audio_url.split("/")[experienceData.audio_url.split("/").length - 1]);
	for (let i = 0; i < experienceData.gallery_data.length; i++) {
		var gallery_entity = document.querySelector('#gallery-' + (i + 1));
		gallery_entity.setAttribute('material', 'src:' + experienceData.gallery_data[i].image_path);
		var gallerytext = document.querySelector('#text-' + (i + 1));
		gallerytext.setAttribute('value', experienceData.gallery_data[i].image_description);
	}
	$("#frameImageLabel").text(museum_data.gallery_data[0].image_path.split("/")[museum_data.gallery_data[0].image_path.split("/").length - 1]);
	document.getElementById("frameDescription").value = museum_data.gallery_data[0].image_description;
	if (museum_data.gallery_data[0].frame_name == undefined || museum_data.gallery_data[0].frame_name == "")
		document.getElementById("frameName").value = "";
	else
		document.getElementById("frameName").value = museum_data.gallery_data[0].frame_name;
	$('#frameImageTitle').text("Note: Recommended aspect ratio 3:2");

	$("#" + museum_data.decore_option).addClass("border-active");
}

function frameChanged() {
	var selectedFrame = document.getElementById("frameDropDown").selectedIndex;
	$("#frameImageLabel").text(museum_data.gallery_data[selectedFrame].image_path.split("/")[museum_data.gallery_data[selectedFrame].image_path.split("/").length - 1]);
	document.getElementById("frameDescription").value = museum_data.gallery_data[selectedFrame].image_description;
	if (museum_data.gallery_data[selectedFrame].frame_name == undefined || museum_data.gallery_data[selectedFrame].frame_name == "")
		document.getElementById("frameName").value = "";
	else
		document.getElementById("frameName").value = museum_data.gallery_data[selectedFrame].frame_name;
	if (selectedFrame == 9 || selectedFrame == 19)
		$('#frameImageTitle').text("Note: Recommended aspect ratio 3:4");
	else if (selectedFrame == 10 || selectedFrame == 20)
		$('#frameImageTitle').text("Note: Recommended aspect ratio 4:3");
	else
		$('#frameImageTitle').text("Note: Recommended aspect ratio 3:2");
}

function bindFrameData() {
	var selectedFrame = document.getElementById("frameDropDown").selectedIndex;
	$("#frameImageLabel").text(museum_data.gallery_data[selectedFrame - 1].image_path.split("/")[museum_data.gallery_data[selectedFrame - 1].image_path.split("/").length - 1]);
	document.getElementById("frameDescription").value = museum_data.gallery_data[selectedFrame - 1].image_description;
	document.getElementById("frameName").value = museum_data.gallery_data[selectedFrame - 1].frame_name;
}

function addLaunchScreenText() {
	toggleSideNav('launchSidenav');
	museum_data.launch_text = document.getElementById("lunchScreenText").value;
}

window.addEventListener("keydown", function (e) {
	if (sidenavActive == false) {
		if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
			e.preventDefault();
		}
	}
}, false);

function changeSplashImage() {
	assettype = 'Image';
	imageLocation = "Splash";
	window.parent.triggerAssetsPopup();
}

function mouseEnter(msg) {
	window.parent.mouseEnter(msg);
}

function mouseLeave() {
	window.parent.mouseLeave();
} 
function popSnackbar(type, message) {
	var x = document.getElementById("snackbar");
  x.innerText = message;
	x.className = "show " + type;
	setTimeout(function () {
	  x.className = x.className.replace("show " + type, "");
	}, 3000);
  }
   $("#summernote").bind("change paste keyup", function () {
  });
  
 /* Summernote MAxlength, maxcount and popsnacker */


 $('.maxContentPost').summernote({
	placeholder: 'Splash Screen Text',
	tabsize: 2,
	height: 100,
	toolbar: [
		['fontsize', ['fontsize']],
		['color', ['color']],
		['para', ['ul', 'ol', 'paragraph']],
		['fontname', ['fontname']],
		['font', ['bold', 'italic', 'underline', 'clear']]
	  
		],
	callbacks: {
		onKeydown: function (e) { 
						var t = e.currentTarget.innerText; 
						$('#maxCount').text( t.length);
						if (t.length >= 350) {
						if (e.keyCode != 8 ){
							if (e.keyCode != 65 ) {
								if (e.keyCode != 67 ) {
								if (e.keyCode != 90 ) {
									if (e.keyCode != 88 ) {
									if (e.keyCode != 86) {
									if (e.keyCode != 46 ) {
						popSnackbar("warning", "Limit exceed.");
							e.preventDefault(); 
									}}}}}
							} 
						}
						} 
					},
				onKeyup: function (e) {
					var t = e.currentTarget.innerText;
					$('.maxContentPost').text(350 - t.trim().length);
					$('#maxCount').text( t.length);
				},
				onPaste: function (e) {
					var t = e.currentTarget.innerText;
				  $('#maxCount').text( t.length);
					var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
					e.preventDefault();
					var maxPaste = bufferText.length;
					if(t.length + bufferText.length > 350){
					  popSnackbar("warning", "Limit exceed.");
						maxPaste = 350 - t.length;
					}
					if(maxPaste > 0){
						document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
					}
					$('.maxContentPost').text(350 - t.length);
				}    
	}
	});
	
	
	/* Summernote MAxlength, maxcount and popsnacker */