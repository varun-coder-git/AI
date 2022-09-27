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
// var experianceJSON ='{"imageSkyPath":"assets/images/DefaultNightSky.jpg","actionPoints":[],"splash_image":"assets/images/logo.png","splash_instruction":"1.VR Goggles: Look around. Use the center screen dot to focus on yellow plates on the floor to navigate.2.Mobile: Look around or use thumb to move camera.Use the center screen dot to focus on yellow plates on the floor to navigate.3.Desktop: Use key board to navigate and drag mouse to look around","launch_text":"Welcome","inventories":[],"splashHeaderColor":"#FFFFFF","splashBackgroundColor":"#8F8F8F","Opacity":0.2}';

var splashImagePath;
var fixOpacity = 0.2;
var inventoryIndex = 0;
registerAframeClickDragComponent(window.AFRAME);
var userAgent = navigator.userAgent;
if (
  userAgent.includes("Mobile") ||
  userAgent.includes("Android") ||
  userAgent.includes("iPhone")
) {
  var cameraId = document.querySelector("#cursor");
  cameraId.removeAttribute("cursor");
  cameraId.setAttribute("scale", "1 1 1");
  cameraId.setAttribute("cursor", "fuse", "true; fuseTimeout: 1500;");
}

$(document).ready(function() {
  $("#fixOpacity").on("input", function() {
    fixOpacity = $(this).val();
    var displayvalue = "(" + Math.round(fixOpacity * 100) + "%)";
    document.getElementById("rangeValue").innerText = displayvalue;
    storyPontData.Opacity = fixOpacity;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  });
});

function initializeCustomization(experienceToCustomize) {
  storyPontData = JSON.parse(experienceToCustomize);
  renderExperience(storyPontData);  
  if (storyPontData.launch_text) {
    document.getElementsByClassName("lunchScreenText").value =
      storyPontData.launch_text;
    $(".lunchScreenText").summernote("code", storyPontData.launch_text);
    var lauchText = $(".lunchScreenText");
    var div = document.createElement("div");
    div.innerHTML = lauchText[0].value;
    var plainText = div.textContent || div.innerText || "";
    var maxLength = 350;
    $("#maxCount").text(plainText.length);
  }

  if (storyPontData.splash_instruction){
    document.getElementsByClassName("instructionSetForDesktop").value =
      storyPontData.splash_instruction;
  $(".instructionSetForDesktop").summernote("code", storyPontData.splash_instruction);
  }
  if (storyPontData.splash_android_instruction) {
    document.getElementsByClassName("instructionSetForAndroid").value = storyPontData.splash_android_instruction;
    $('.instructionSetForAndroid').summernote('code', storyPontData.splash_android_instruction);
  }
  if (storyPontData.splash_image) {
    splashImagePath = storyPontData.splash_image;
    var splashImageName = splashImagePath.split("/")[
      splashImagePath.split("/").length - 1
    ];
    $("#splashImageLable").text(splashImageName);
  }
  if (storyPontData.splashBackgroundColor) {
    var splashBackground = document.getElementById("splashBackground");
    splashBackground.value = storyPontData.splashBackgroundColor;
    splashBackground.style.backgroundColor = splashBackground.value;
  } else {
    var splashBackground = document.getElementById("splashBackground");
    splashBackground.style.backgroundColor = "#8F8F8F";
    splashBackground.value = "#8F8F8F";
  }
  if (storyPontData.Opacity) {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = storyPontData.Opacity;
    var displayvalue = "(" + Math.round(opacity.value * 100) + "%)";
    document.getElementById("rangeValue").innerText = displayvalue;
    document.getElementById("splashBackground").style.opacity = opacity.value;
  } else {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = fixOpacity;
    var displayvalue = "(" + Math.round(fixOpacity * 100) + "%)";
    document.getElementById("rangeValue").innerText = displayvalue;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  }
  if (storyPontData.splashHeaderColor) {
    var splashHeaderColor = document.getElementById("splashHeaderColor");
    splashHeaderColor.value = storyPontData.splashHeaderColor;
    splashHeaderColor.style.backgroundColor = splashHeaderColor.value;
  }
  if (storyPontData["entry_view"]) {
    $("#CamEntity").attr("rotation", storyPontData["entry_view"]);
  }
}

function setEntryView() {
  if ($("#freezeView").hasClass("disabled")) {
    //Nothing to do here
  } else {
    var cam = document.querySelector("[camera]");
    var pos = cam.getAttribute("rotation");
    var oldpos = 0;
    if (storyPontData["entry_view"]) {
      oldpos = storyPontData["entry_view"].split(" ")[1];
    }
    storyPontData["entry_view"] = "0 " + (pos.y + parseInt(oldpos)) + " 0";
    $("#freezeView").addClass("disabled");
    $("#freezeView").click(
      toastr.success(
        "Presto! This view is now the Launch View of this Experience."
      )
    );
  }
}

$("div#scene").mouseup(function() {
  $("#freezeView").removeClass("disabled");
});

function getExperienceToSave() {
  var lauchText = $(".lunchScreenText");

  var lunchTextItem = lauchText[0].value;
  experianceJSON.launch_text = lunchTextItem;

  var splashInstruction = $(".instructionSetForDesktop");
  var item = splashInstruction[0].value;
  experianceJSON.splash_instruction = item;

  var splashAndroidInstruction = $(".instructionSetForAndroid")
    var item = splashAndroidInstruction[0].value;
    experianceJSON.splash_android_instruction = item;

  experianceJSON.splash_image = splashImagePath;

  var headerFont = $(".headerfont");
  var headerFontColor = headerFont[0].value;
  if (headerFontColor.includes("#")) {
    experianceJSON.splashHeaderColor = headerFontColor;
  } else {
    experianceJSON.splashHeaderColor = "#" + headerFontColor;
  }
  var splashbg = $(".splashBg");
  var splashBgColor = splashbg[0].value;
  if (splashBgColor.includes("#")) {
    experianceJSON.splashBackgroundColor = splashBgColor;
  } else {
    experianceJSON.splashBackgroundColor = "#" + splashBgColor;
  }

  
  if (experianceJSON.Opacity) {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = experianceJSON.Opacity;
    var displayvalue = "(" + Math.round(opacity.value * 100) + "%)";
    document.getElementById("rangeValue").innerText = displayvalue;
    document.getElementById("splashBackground").style.opacity = opacity.value;
  } else {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = fixOpacity;
    var displayvalue = "(" + Math.round(opacity.value * 100) + "%)";
    document.getElementById("rangeValue").innerText = displayvalue;
    experianceJSON.Opacity = fixOpacity;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  }

  var modifiedJSON = experianceJSON;
  modifiedJSON.entry_view = experianceJSON.entry_view;
  var dataToPost = JSON.stringify(modifiedJSON);
  return dataToPost;
  //   dataToPost.unwrap();
}

var SkyPath;
var selectedPlace = null;
var selectedHotspot = null;
var selectedInfobox = null;
var experianceJSON;
var experianceData = null;
var settingsVisibilityJson = null;
var settingsTypeJson = null;
var imagesPointSTory = null;

var uniqueVisibility = null;
var setVisibility = null;
var uniqueType = null;
var setType = null;
var SkyImagePath = null;
var ImagePath = null;
var PointIconPath = null;
var AudioPath = null;
var VideoPath = null;
var storyPointIndex = 0;

function toggleAssets(type) {
  if (type == "Image") {
    $("#imageLable").show();
    $("#ImageFileUpload").show();
    $("#videoLable").hide();
    $("#videoFileUpload").hide();
  } else {
    $("#imageLable").hide();
    $("#ImageFileUpload").hide();
    $("#videoLable").show();
    $("#videoFileUpload").show();
  }
}

function renderExperience(storyPontData) {
  experianceJSON = storyPontData;
  if(experianceJSON.inventoryPanelColor==undefined || experianceJSON.inventoryPanelColor==null){
    experianceJSON['inventoryPanelColor']='#ffffff';
    experianceJSON['inventoryPanelOpacity']=0.6;
    var displayvalue = "(" + Math.round( 0,6 * 100) + "%)";
    document.getElementById("panelOpacity").innerText = displayvalue;
  }
  bindInventorySettingPanel(experianceJSON);
  $.getJSON("assets/js/settingJson.json", function(result_setting) {
    settingsVisibilityJson = result_setting.Visibility;
    settingsTypeJson = result_setting.Type;
    $.getJSON("assets/js/PointImagesJson.json", function(result_images) {
      imagesPointSTory = result_images.PointImages;
      inventoryGenerator(experianceJSON);
      markersAccordionGenerator(
        experianceJSON,
        settingsVisibilityJson,
        settingsTypeJson
      );
    });
  });
  var assets = document.querySelector("a-assets");
  var scene = document.querySelector("a-scene");
  if (experianceJSON.imageSkyPath) {
    $("#imageRadio").click();
    var img = document.createElement("img");
    img.setAttribute("id", "imageskyid");
    img.setAttribute("src", experianceJSON.imageSkyPath);
    img.setAttribute("crossorigin", "anonymous");
    assets.appendChild(img);
    var aSky = "";
    aSky = document.createElement("a-sky");
    aSky.setAttribute("src", experianceJSON.imageSkyPath);
    aSky.setAttribute("crossorigin", "anonymous");
    scene.appendChild(aSky);
    var name = experianceJSON.imageSkyPath.split("/");
    name = name[name.length - 1];
    $("#customLabelSky").html(name);
  } else {
    $("#videoRadio").click();
    var skyVideo = document.createElement("video");
    skyVideo.setAttribute("id", "videoskyid");
    skyVideo.setAttribute("src", experianceJSON.videoskypath);
    skyVideo.setAttribute("autoplay", "true");
    skyVideo.setAttribute("loop", "");
    skyVideo.muted = true;
    skyVideo.setAttribute("delay", "4000");
    skyVideo.setAttribute("crossorigin", "anonymous");
    assets.appendChild(skyVideo);
    var aVideoSphere = "";
    aVideoSphere = document.createElement("a-videosphere");
    aVideoSphere.setAttribute("src", "#videoskyid");
    aVideoSphere.setAttribute("crossorigin", "anonymous");
    scene.appendChild(aVideoSphere);
    var name = experianceJSON.videoskypath.split("/");
    name = name[name.length - 1];
    $("#customLabelSkyVideo").html(name);
  }
}

var assettype;
var assetId;

function getAssetType() {
  return assettype;
}

function openAssestsPopup(type, event) {
  assettype = type;
  assetId = event.id;
  window.parent.triggerAssetsPopup();
}

function AnimateMarker(event, id) {
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    if (experianceJSON.actionPoints[i].actionId == id) {
      experianceJSON.actionPoints[i].actionChecked = "" + event.checked;
    }
  }
}

function getAssetPath(assetPath) {
  if(assetPath==undefined || assetPath==""){
    return;
  }
  if (assetId == "splashImage") {
    splashImagePath = assetPath;
    var splashImageName = splashImagePath.split("/")[
      splashImagePath.split("/").length - 1
    ];
    $("#splashImageLable").text(splashImageName);
  }else if (assetId == "PanelImage") {
    experianceJSON.inventoryPanelImage = assetPath;
    var assetPath = assetPath.split("/")[
      assetPath.split("/").length - 1
    ];
    $("#PanelImage").attr("src", experianceJSON.inventoryPanelImage);
    $("#PanelImageLable").text(assetPath);
  } else if (assetId == "ResetButtonImage") {
    experianceJSON.resetPanelImage = assetPath;
    var assetPath = assetPath.split("/")[
      assetPath.split("/").length - 1
    ];
    $("#ResetButtonImage").attr("src", experianceJSON.resetPanelImage);
    $("#ResetButtonImageLable").text(assetPath);
  } 
  else if (assetId == "customFileSky") {
    experianceJSON.videoskypath = "";
    experianceJSON.imageSkyPath = assetPath;
    if (!document.querySelector("a-sky")) {
      var assets = document.querySelector("a-assets");
      var scene = document.querySelector("a-scene");
      var img = document.createElement("img");
      img.setAttribute("id", "imageskyid");
      img.setAttribute("src", experianceJSON.imageSkyPath);
      img.setAttribute("crossorigin", "anonymous");
      assets.appendChild(img);
      var aSky = "";
      aSky = document.createElement("a-sky");
      aSky.setAttribute("src", "#imageskyid");
      aSky.setAttribute("crossorigin", "anonymous");
      scene.appendChild(aSky);
    } else {
      $("a-sky").attr("src", "");
      $("a-sky").attr("src", experianceJSON.imageSkyPath);
    }
    var name = assetPath.split("/");
    name = name[name.length - 1];
    $("#customLabelSky").html(name);
  } else if (assetId == "customFileSkyVideo") {
    var assets = document.querySelector("a-assets");
    var scene = document.querySelector("a-scene");
    $("a-sky").attr("visible", "false");
    $("#imageskyid").attr("src", "");
    $("a-sky").attr("src", "");
    $("a-sky").attr("src", "#imageskyid");
    $("a-videosphere").attr("visible", "true");
    if (!document.querySelector("a-videosphere")) {
      var skyVideo = document.createElement("video");
      skyVideo.setAttribute("id", "videoskyid");
      skyVideo.setAttribute("src", assetPath);
      skyVideo.setAttribute("autoplay", "true");
      skyVideo.muted = true;
      // skyVideo.setAttribute('muted', '');
      skyVideo.setAttribute("loop", "");
      skyVideo.setAttribute("crossorigin", "anonymous");
      assets.appendChild(skyVideo);
      var aVideoSphere = "";
      aVideoSphere = document.createElement("a-videosphere");
      aVideoSphere.setAttribute("src", "#videoskyid");
      aVideoSphere.setAttribute("crossorigin", "anonymous");
      scene.appendChild(aVideoSphere);
    } else {
      $("#videoskyid").attr("src", assetPath);
      $("a-videosphere").attr("src", "");
      $("a-videosphere").attr("src", "#videoskyid");
    }
    var name = assetPath.split("/");
    name = name[name.length - 1];
    $("#customLabelSkyVideo").html(name);
    experianceJSON.imageSkyPath = "";
    experianceJSON.videoskypath = assetPath;
  } else if (assetId.indexOf("customfileinputimage-") > -1) {
    var id = assetId.split("-");
    id = id[id.length - 1];
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
      if (experianceJSON.actionPoints[i].actionId == id) {
        if(assetId.indexOf("customfileinputimage-rightMatch") > -1){
        experianceJSON.actionPoints[i].rightMatchSymbol = assetPath;
        $("#customImage-rightMatch-" + id).attr("src", assetPath);
        var imageName = assetPath.split("/");
        imageName = imageName[imageName.length - 1];
        $("#labelcustomfileinputimage-rightMatch-" + id).html(imageName);
        }else{
          
        experianceJSON.actionPoints[i].wrongMatchSymbol = assetPath;
          $("#customImage-wrongMatch-" + id).attr("src", assetPath);
          var imageName = assetPath.split("/");
          imageName = imageName[imageName.length - 1];
          $("#labelcustomfileinputimage-wrongMatch-" + id).html(imageName);
        }
      }
    }
  
  } else if (assetId.indexOf("customfileinputvideo-") > -1) {
    var id = assetId.split("-");
    id = id[id.length - 1];
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
      if (experianceJSON.actionPoints[i].actionId == id) {
        experianceJSON.actionPoints[i].actionPointVideo = assetPath;
        var j = i;
      }
    }
    $("#videoID-" + id).attr("src", assetPath);
    var videoName = assetPath.split("/");
    videoName = videoName[videoName.length - 1];
    $("#labelcustomfileinputvideo-" + id).html(videoName);
  } else if (assetId.indexOf("customfileinputaudio-") > -1) {
    var id = assetId.split("-");
    id = id[id.length - 1];
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
      if (experianceJSON.actionPoints[i].actionId == id) {
        experianceJSON.actionPoints[i].actionPointAudio = assetPath;
        var j = i;
      }
    }
    $("#audioID-" + id).attr("src", assetPath);
    var videoName = assetPath.split("/");
    videoName = videoName[videoName.length - 1];
    $("#labelcustomfileinputaudio-" + id).html(videoName);
  }  else if (assetId.indexOf("customFileInputInventoryImage-") > -1 || assetId.indexOf("customInventoryImage-") > -1) {
    var id = assetId.split("-");
    id = id[id.length - 1];
    for (var i = 0; i < experianceJSON.inventories.length; i++) {
      if (experianceJSON.inventories[i].inventoryId == id) {
        experianceJSON.inventories[i].inventoryImage = assetPath;
        $("#customInventoryImage-" + id).attr("src", assetPath);
        $("#customInventoryIcon-" + id).attr("style", "display:block");
        var imagename = assetPath.split("/");
        $("#labelcustomFileInputInventoryImage-" + id).html(
          imagename[imagename.length - 1]
        );
      }
    }
  }
}

var hotspotIndex = 0;

AFRAME.registerComponent("mouseclick", {
  init: function() {
    this.el.addEventListener("click", function() {
      if (selectedHotspot === this) selectedHotspot = null;
      else {
        selectedHotspot = this;
        editHotspot();
      }
      toggleToolbarButtons(selectedHotspot);
    });

    this.el.addEventListener("dragend", function() {
      var newPosition = this.getAttribute("position");
      var storyId = this.id.split("-")[1];
      // var newpos = newPos(newPosition.x, newPosition.y, newPosition.z);
      var newpos = newPosition.x + " " + newPosition.y + " " + newPosition.z;
      $("#" + this.id).attr("position", newpos);
      for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
        if (experianceJSON.actionPoints[i].actionId == storyId) {
          experianceJSON.actionPoints[i].actionPointPosition = newpos; // newPosition.x + ' ' + newPosition.y + ' ' + newPosition.z;
        }
      }
    });
  }
});

function toggleSideNav(sidenavId) {
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function(navigation) {
    if (navigation.classList.contains("active") && navigation.id != sidenavId)
      navigation.classList.remove("active");
  });
  if(sidenavId=="inventorynav"){
    if(experianceJSON.inventories.length>=1){
      $("#collapse-inventorySetting").removeClass("show");
    for (var i = 0; i < experianceJSON.inventories.length; i++) {
      $("#collapse-inventory-"+experianceJSON.inventories[i].inventoryId).removeClass("show");
    }
    $("#collapse-inventory-0").addClass("show");
    }else{
      $("#collapse-inventorySetting").addClass("show");
    }
    
  }

  if(sidenavId=="storyPointSidenav"){
    if(experianceJSON.actionPoints.length>0){
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
      $("#collapse-storypoint-"+experianceJSON.actionPoints[i].actionId).removeClass("show");
    }
    $("#collapse-storypoint-0").addClass("show");
    }
    
  }
  
  document.getElementById(sidenavId).classList.toggle("active");
  toggleOverlay();
}

function toggleOverlay() {
  var sidenavActive = false;
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function(navigation) {
    if (navigation.classList.contains("active")) {
    sidenavActive = true;
    }
  });
  if (sidenavActive)
    document.getElementById("overlay").classList.add("overlay");
  else document.getElementById("overlay").classList.remove("overlay");
}

function closeSideNav() {
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function(navigation) {
    navigation.classList.remove("active");
  });
  toggleOverlay();
}

function addNewHotspot() {
  closeSideNav();
  storyPointIndex;
  var markerEl = document.querySelector("#marker");
  var position = markerEl.object3D.getWorldPosition();
  var matchableInventories=[];
  var rightMatchInventories=[];
   for(var k=0;k< experianceJSON.inventories.length;k++){
    var temp = {};
    temp["name"] =experianceJSON.inventories[k].inventoryTitle;
    temp["value"] = false;
    temp["isVisited"] = false;
  matchableInventories[k]=temp;
  rightMatchInventories[k]=temp;
  }
  
  var newActionPoint = {  
    markarTitle:'Marker',
    actionChecked: "false",
    actionId: storyPointIndex,
    actionPointPosition: position.x + " " + position.y + " " + position.z,
    actionPointOpacity:'0.6',
    actionSize: '3',
    mediatype: "T",
    actionPointColor:'#ff0000',
    matchableInventories: matchableInventories,
    rightMatchInventories: rightMatchInventories,
    wrongMatchText:'Wrong match text',
    wrongMatchTextColor:'#ffffff',
    wrongMatchTextBackgroundColor:'#000000',
    wrongMatchTextBackgroundOpacity:'0.6',
    rightMatchText:'Right match text.',
    rightMatchTextColor:'#ffffff',
    rightMatchTextBackgroundColor:'#000000',
    rightMatchTextBackgroundOpacity:'0.6',
    rightMatchSymbol:'assets/images/icons/right.png',
    wrongMatchSymbol:'assets/images/icons/wrong.png',
    type: "Text",
    isVisited : false
  };
  
  
  experianceJSON.actionPoints.push(newActionPoint);
  markersAccordionGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson);

  closeSideNav();
    toggleSideNav('storyPointSidenav');
  
    $('#story-accordion').find('.collapse').collapse('hide');
  
    $("#collapse-storypoint-" + (storyPointIndex - 1)).addClass("show");
}

function markersAccordionGenerator(
  experianceJSON,
  settingsVisibilityJson,
  settingsTypeJson
) {
  $("#story-accordion").empty();
  storyPointIndex = 0;
  var i=0;
  if(experianceJSON.actionPoints.length>0){
    $("#addNewMarker").addClass("hidden");
  }else{
    $("#addNewMarker").removeClass("hidden");
  }
  experianceJSON.actionPoints.forEach(storyPoint => {
    storyPoint.actionId=i;
    i++;
    uniqueType = storyPoint.type;
    uniqueIcon = storyPoint.actionIconID;
    markerTitle = storyPoint.markarTitle;
    markerValue = storyPoint.markarTitle;
    ChekedTrue = storyPoint.actionChecked;
    var imagenameRightMatch = "Choose Symbol";
    var imagenameWrongMatch = "Choose Symbol";
    if (storyPoint.rightMatchSymbol) {
      imagenameRightMatch = storyPoint.rightMatchSymbol.split("/");
      imagenameRightMatch = imagenameRightMatch[imagenameRightMatch.length - 1];
    }
    if (storyPoint.wrongMatchSymbol) {
      imagenameWrongMatch = storyPoint.wrongMatchSymbol.split("/");
      imagenameWrongMatch = imagenameWrongMatch[imagenameWrongMatch.length - 1];
    }
    var videoname = "Choose Video";
    if (storyPoint.actionPointVideo) {
      videoname = storyPoint.actionPointVideo.split("/");
      videoname = videoname[videoname.length - 1];
    }
    var audioname = "Choose Audio";
    if (storyPoint.actionPointAudio) {
      audioname = storyPoint.actionPointAudio.split("/");
      audioname = audioname[audioname.length - 1];
    }

    // settings
    var storyAccordion =
      "<div class='card story-accordion-border' id='story'> <div class='card-header story-color-accordion' id='headingTwo'> <h3 class='mb-0'><button class='btn btn-link btn-decor' onmouseenter='mouseEnter(&#39;Markers help you overlay Media over the Area images. Configure the markers on the screen using this option.&#39;);' onmouseleave='mouseLeave()' data-toggle='collapse' onclick='setSelectedHotspot(" +
      storyPoint.actionId +
      ")' data-target='#collapse-storypoint-" +
      storyPoint.actionId +
      "' aria-expanded='true' aria-controls='collapse-storypoint-" +
      storyPoint.actionId +
      "'><i class='fa' aria-hidden='true'></i><span id='titleMarkerId-" +
      storyPoint.actionId +
      "'>" +
      markerTitle +
      "</span></button></h3></div><div id='collapse-storypoint-" +
      storyPoint.actionId +
      "' class='collapse back-color' aria-labelledby='headingTwo' data-parent='#story-accordion'> <div class='card-body'> <div class='form-group'> <lable for='markerTitleID-" +
      storyPoint.actionId +
      "' class='font_color'>Marker Title:</lable> <input class='col-12 form-control input_box_trasparent' maxlength='25' onblur='changeMarkerTitle(this)' placeholder='Marker Title' type='text' onkeyup='checkTitle(this)' id='markerTitleID-" +
      storyPoint.actionId +
      "' value='" +
      markerValue +
      "'> </div><div class='form-group'> <label for='Marker-size-input-' " +
      storyPoint.actionId +
      " ''>Marker Size:</label> <input type='range' min='1' max='5' step='0.01' value=" +
      storyPoint.actionSize +
      " class='slider' id='Marker-size-input-' " +
      storyPoint.actionId +
      " '' oninput='resizeMarker(this," +
      storyPoint.actionId +
      ");'> </div><div class='row'> <div class='col-8'> <label style='color:#fff;width: 100%'>Marker Opacity (Drag to change):</label> </div><div class='col-2'><label style='color:#fff' id='actionPointDescriptionRangeValue-" + storyPoint.actionId + "'></label></div></div><div class='slidecontainer'> <input id='actionPointOpacity-" +
      storyPoint.actionId +
      "' type='range' min='0' max='1' step='0.001' value='' class='slider' oninput='changeOpacity(this," +
      storyPoint.actionId +
      ")'/> </div><div class='form-group mt-2 ' > <label>Marker Color:</label> <input class='jscolor pointer' id='markerColor-" +
      storyPoint.actionId +
      "' style='width: 100%' onchange='changeMarkerColor(this," +
      storyPoint.actionId +
      ")' value=''> </div><div class='form-group'> <lable for='multiSelectInventory" +
      storyPoint.actionId +
      "' class='font_color'>Select Matching Inventories:</lable> <select name='Visiblility' id='multiSelectInventory" +
      storyPoint.actionId +
      "' multiple class='col-12 mt-2 form-control selectpicker select-dropdown' onSelect='checkInventory()' onchange='multiSelectInventory(event, " +
      storyPoint.actionId +
      ")'></select> </div><div class='form-group'> <lable for='multiSelectRightInventory" +
      storyPoint.actionId +
      "' class='font_color'>Select Right Match Inventories:</lable> <select name='Visiblility' id='multiSelectRightInventory"+
      storyPoint.actionId +
      "' multiple class='col-12 mt-2 form-control selectpicker select-dropdown' onchange='multiSelectRightInventory(event, " +
      storyPoint.actionId +
      ")'></select> </div><div class='form-group ' id='BrowseImgID-rightMatch-" +
      storyPoint.actionId +
      "'> <label>Right Match Symbol:</label><div class=' icon-padding' ><img style='height:75px;width:75px' id='customImage-rightMatch-" +
      storyPoint.actionId +
      "' src='" +
      storyPoint.rightMatchSymbol +
      " ' /></div><div class='form-group custom-file' id = 'BrowseImg-" +
      storyPoint.actionId +
      "'><input type='button' class='custom-file-input handPointer' id='customfileinputimage-rightMatch-" +
      storyPoint.actionId +
      "' onclick='openAssestsPopup(&#39;Image&#39;,this)'> <label class='custom-file-label' for='customfileinputimage-rightMatch-" +
      storyPoint.actionId +
      "'><span class='text-overflow' id='labelcustomfileinputimage-rightMatch-" +
      storyPoint.actionId +
      "'>" +
      imagenameRightMatch +
      "</span></label><label class='aspect-ratio-style'>Note: Recommended aspect ratio 1:1</label></div> </div><div class='form-group  mt-2' id='textAreaIDRightMatch-" +
      storyPoint.actionId +
      "'> <lable for='rightMatch-" +
      storyPoint.actionId +
      "' class='font_color'>Right Match Text:</lable> <textarea maxlength='456' placeholder='Text' class='form-control input_box_trasparent' id='rightMatch-" +
      storyPoint.actionId +
      "' onblur='changeText(this," +
      storyPoint.actionId +
      ")'>" +
      storyPoint.rightMatchText +
      " </textarea> <div class='form-group mt-2 '> <label>Right Match Text Font Color:</label> <input class='jscolor pointer' onchange='changeRightInfofont(this," +  
      storyPoint.actionId +
      ")'  value='"+storyPoint.rightMatchTextColor+"' style='width: 100%' id='rightDescriptionTextColor-" +
      storyPoint.actionId +
      "'> </div><div class='form-group mt-2 '> <label>Right Match Text Background:</label> <input class='jscolor pointer' id='rightDescriptionBackgroundColor-" +
      storyPoint.actionId +
      "' style='width: 100%' onchange='changeRightInfoBg(this," +
      storyPoint.actionId +
      ")' value='"+storyPoint.rightMatchTextBackgroundColor+"'> </div><div class='row'> <div class='col-8'> <label style='color:#fff;width: 100%'>Right Match Text Background Opacity (Drag to change):</label> </div><div class='col-2'><label style='color:#fff' id='rightmatchRangeValue-" + storyPoint.actionId + "'></label></div></div><div class='slidecontainer mt-2'><input id='rightInfoBgOpcity-" +
      storyPoint.actionId +
      "' type='range' min='0' max='1' step='0.001' value='"+storyPoint.rightMatchTextBackgroundOpacity+"' class='slider' oninput='changeRightInfoBgOpcity(this," +
      storyPoint.actionId +
      ")'/> </div> </div><hr style='background-color: white;'><div class='form-group  ' id='BrowseImgID-wrongMatch-" +
      storyPoint.actionId +
      "'> <label>Wrong Match Symbol:</label><div class=' icon-padding' ><img style='height:75px;width:75px' id='customImage-wrongMatch-" +
      storyPoint.actionId +
      "' src='" +
      storyPoint.wrongMatchSymbol +
      " ' /></div><div class='form-group custom-file'><input type='button' class='custom-file-input handPointer' id='customfileinputimage-wrongMatch-" +
      storyPoint.actionId +
      "' onclick='openAssestsPopup(&#39;Image&#39;,this)'> <label class='custom-file-label' for='customfileinputimage-wrongMatch-" +
      storyPoint.actionId +
      "'><span class='text-overflow' id='labelcustomfileinputimage-wrongMatch-" +
      storyPoint.actionId +
      "'>" +
      imagenameWrongMatch +
      "</span></label><label class='aspect-ratio-style'>Note: Recommended aspect ratio 1:1</label> </div></div><div class='form-group mt-2' id='textAreaIDWrongMatch-" +
      storyPoint.actionId +
      "'><lable for='wrongMatch-" +
      storyPoint.actionId +
      "' class='font_color '>Wrong Match Text:</lable> <textarea maxlength='456' placeholder='Text' class='form-control input_box_trasparent mt-2' id='wrongMatch-" +
      storyPoint.actionId +
      "' onblur='changeText(this," + storyPoint.actionId +")' >" + storyPoint.wrongMatchText +
      " </textarea><div class='form-group mt-2 '> <label>Wrong Match Text Font Color:</label> <input class='jscolor pointer' onchange='changeWrongInfofont(this," +
      storyPoint.actionId +
      ")' value='"+storyPoint.wrongMatchTextColor+"' style='width: 100%' id='WrongDescriptionTextColor-" +
      storyPoint.actionId +
      "'> </div><div class='form-group mt-2 '> <label>Wrong Match Text Background:</label> <input class='jscolor pointer' id='wrongDescriptionBackgroundColor-" +
      storyPoint.actionId +
      "' style='width: 100%' onchange='changeWrongInfoBg(this," +
      storyPoint.actionId +
      ")'  value='"+storyPoint.wrongMatchTextBackgroundColor+"'></div><div class='row'> <div class='col-8'> <label style='color:#fff;width: 100%'>Wrong Match Text Background Opacity (Drag to change):</label> </div><div class='col-2'><label style='color:#fff' id='wrongmatchRangeValue-" + storyPoint.actionId + "'></label></div></div><div class='slidecontainer mt-2'> <input id='wrongInfoBgOpcity-" +
    storyPoint.actionId +
    "' type='range' min='0' max='1' step='0.001' value='"+storyPoint.wrongMatchTextBackgroundOpacity+"' class='slider' oninput='changeWrongInfoBgOpcity(this," +
    storyPoint.actionId +
    ")'/> </div> <div class='row'><div class='col-12 actionDiv'><button type='button' onmouseenter='mouseEnter(\'Edit the question using this button.\');' onmouseleave='mouseLeave()' class='btn btn-success' onclick='cloneMarker(" + storyPoint.actionId + ")'>Clone</button></div></div> </div></div></div></div>";

    $("#story-accordion").append(storyAccordion);
    jscolor.installByClassName("jscolor");
    if (storyPoint.actionPointColor) {
      var fontcolor = document.getElementById(
        "markerColor-" + storyPoint.actionId
      );
      fontcolor.style.backgroundColor = storyPoint.actionPointColor;
    }
    if (storyPoint.actionPointColor) {
      var fontcolor = document.getElementById(
        "markerColor-" + storyPoint.actionId
      );
      fontcolor.style.backgroundColor = storyPoint.actionPointColor;
    } else {
      var fontcolor = document.getElementById(
        "markerColor-" + storyPoint.actionId
      );
      fontcolor.style.backgroundColor = "#000";
    }

    if (storyPoint.actionPointOpacity) {
      var opacity = document.getElementById(
        "actionPointOpacity-" + storyPoint.actionId
      );
      opacity.value = storyPoint.actionPointOpacity;
      var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
      document.getElementById("actionPointDescriptionRangeValue-" + storyPoint.actionId).innerText = displayvalue
    } else {
      var opacity = document.getElementById(
        "actionPointOpacity-" + storyPoint.actionId
      );
      opacity.value = 0.6;
      var default_value = '(' + Math.round(0.6 * 100) + '%)';
      document.getElementById("actionPointDescriptionRangeValue-" + storyPoint.actionId).innerText = default_value;
    }

    if (storyPoint.rightMatchTextBackgroundOpacity) {
    var displayvalue = "(" + Math.round(storyPoint.rightMatchTextBackgroundOpacity * 100) + "%)";
      document.getElementById("rightmatchRangeValue-"+storyPoint.actionId).innerText = displayvalue;
    }else{
      var displayvalue = "(" + Math.round(0.6 * 100) + "%)";
      document.getElementById("rightmatchRangeValue-"+storyPoint.actionId).innerText = displayvalue;
    }

    if (storyPoint.wrongMatchTextBackgroundOpacity) {
      var displayvalue = "(" + Math.round(storyPoint.wrongMatchTextBackgroundOpacity * 100) + "%)";
        document.getElementById("wrongmatchRangeValue-"+storyPoint.actionId).innerText = displayvalue;
      }else{
        var displayvalue = "(" + Math.round(0.6 * 100) + "%)";
        document.getElementById("wrongmatchRangeValue-"+storyPoint.actionId).innerText = displayvalue;
      }

    multiSelectInventoryGenerator(storyPoint.actionId);
    multiSelectRightMatchInventoryGenerator(storyPoint.actionId);
    addTeleports(storyPoint);
    storyPointIndex++;
  });
}

function addNewInventory() {
  toggleSideNav('inventorynav');
  $("#inventorynav").addClass("active");
  toggleOverlay();
  var inventoriesCount=experianceJSON.inventories.length;
  if (inventoriesCount < 10) {
    var newActionPoint = {
      inventoryId: inventoryIndex,
      inventoryImage: "assets/images/default.jpg",
      inventoryTitle: 'Inventory-'+inventoryIndex
    };

    experianceJSON.inventories.push(newActionPoint);

    for(var k=0;k< experianceJSON.actionPoints.length;k++){
      var temp = {};
      temp["name"] ='Inventory-'+inventoryIndex;
      temp["value"] = false;
      temp["isVisited"] = false;
    experianceJSON.actionPoints[k].matchableInventories[inventoriesCount]=temp;
    experianceJSON.actionPoints[k].rightMatchInventories[inventoriesCount]=temp;
    }
    inventoryGenerator(experianceJSON);
    markersAccordionGenerator(
      experianceJSON,
      settingsVisibilityJson,
      settingsTypeJson
    );
    $("#inventory-accordion")
    .find(".collapse")
    .collapse("hide");
    $("#collapse-inventorySetting").removeClass("show");
    $("#collapse-inventory-0").removeClass("show");
  $("#collapse-inventory-"+(inventoryIndex-1)).addClass("show");
  } else {
    popSnackbar("warning", "Limit exceed.");
  }
}
function inventoryGenerator(experianceJSON) {
  $("#inventory-accordion").empty();
  inventoryIndex = 0;
  if(experianceJSON.inventories.length>0){
    $("#addNewInvenotor").addClass("hidden");
  }else{
    $("#addNewInvenotor").removeClass("hidden");
  }

  for (var i = 0; i < experianceJSON.inventories.length; i++) {
    experianceJSON.inventories[i].inventoryId = i;
  }

  experianceJSON.inventories.forEach(storyPoint => {
    inventoryTitle = storyPoint.inventoryTitle;
    inventoryValue = storyPoint.inventoryTitle;

    if (!inventoryTitle) {
      inventoryTitle = "Inventory";
      inventoryValue = "";
    }
    var imagename = "Choose Image";
    if (storyPoint.inventoryImage) {
      imagename = storyPoint.inventoryImage.split("/");
      imagename = imagename[imagename.length - 1];
    }

    // settings
    var storyAccordion =
      "<div class='card story-accordion-border' id='inventory'><div class='card-header story-color-accordion' id='headingTwo'><div class='row'><div class='col-10'><h3 class='mb-0'><button class='btn btn-link btn-decor' onmouseenter='mouseEnter(&#39;Markers help you overlay Media over the Area images. Configure the markers on the screen using this option.&#39;);' onmouseleave='mouseLeave()' data-toggle='collapse' data-target='#collapse-inventory-" +
      inventoryIndex +
      "' aria-expanded='true' aria-controls='collapse-inventory-" +
      inventoryIndex +
      "'><i class='fa' aria-hidden='true'></i><span id='titleInventoryId-" +
      storyPoint.inventoryId +
      "'>" +
      inventoryTitle +
      "</span></button></h3></div><div class='col-2'><span class='fas fa-trash-alt mt-3 mr-3 pull-right handPointer delete-icon' onclick='deleteInventory(" +
      inventoryIndex +
      ")' onmouseenter='mouseEnter('You can delete this Inventory by simply hitting this button. ')' onmouseleave='mouseLeave()'></span></div></div></div><div id='collapse-inventory-" +
      inventoryIndex +
      "' class='collapse back-color' aria-labelledby='headingTwo' data-parent='#inventory-accordion'><div class='card-body'><div class='form-group'><lable for='inventoryTitleID-" +
      storyPoint.inventoryId +
      "' class='font_color'>Inventory Title:</lable><input class='col-12 form-control input_box_trasparent' maxlength='25' onblur='changeInventoryTitle(this)' onkeyup='checkTitle(this)' placeholder='Inventory Title' type='text'  id='inventoryTitleID-" +
      storyPoint.inventoryId +
      "' value='" +
      inventoryValue +
      "'></div><div class='form-group' id = 'SelectedInventoryIconID-" +
      storyPoint.inventoryId +
      "'> <label class='font_color' id='customLabelInventory' >Inventory Image:</label><div class='row' style='' id='customInventoryIcon-" +
      storyPoint.inventoryId +
      "'><div class='icon-padding handPointer' ><img style='height:75px;width:75px' id='customInventoryImage-" +
      storyPoint.inventoryId +
      "' src='" +
      storyPoint.inventoryImage +
      " ' onclick='openAssestsPopup(&#39;Image&#39;,this)'/></div></div> <div class='row'  id='InventoryIconDivID-" +
      storyPoint.inventoryId +
      "'> </div> <div class='form-group custom-file' id = 'BrowseImg-" +
      storyPoint.inventoryId +
      "'><input type='button' class='custom-file-input handPointer' id='customFileInputInventoryImage-" +
      storyPoint.inventoryId +
      "' onclick='openAssestsPopup(&#39;Image&#39;,this)'> <label class='custom-file-label' for='customcustomFileInputInventoryImage-" +
      storyPoint.inventoryId +
      "'><span class='text-overflow' id='labelcustomFileInputInventoryImage-" +
      storyPoint.inventoryId +
      "'>" +
      imagename +
      "</span></label><label class='aspect-ratio-style'>Note: Recommended aspect ratio 1:1</label></div></div></div></div></div>";
    $("#inventory-accordion").append(storyAccordion);
    inventoryIndex++;
  });
}


function changeInventoryTitle(event) {
  var actionID = event.id.split("-")[1];
  var newName=(event.value).trim();
  var oldName=experianceJSON.inventories[actionID].inventoryTitle;
  if(newName==''){
    popSnackbar("warning", "Inventory title can not be empty.");
    event.value=oldName;
    return;
  }
    for (var i = 0; i < experianceJSON.inventories.length; i++) {

      // if((experianceJSON.inventories[i].inventoryTitle==newName) && (actionID!=i)){
      //   popSnackbar("Warning", "Inventory name alredy exist.");
      //   event.value=oldName;
      // }
      if (experianceJSON.inventories[i].inventoryId == actionID) {
        experianceJSON.inventories[i].inventoryTitle = newName;
        for(var k=0;k< experianceJSON.actionPoints.length;k++){
              experianceJSON.actionPoints[k].matchableInventories[actionID].name=newName;
              experianceJSON.actionPoints[k].rightMatchInventories[actionID].name=newName;
        }
      }
    }
    $("#titleInventoryId-" + actionID).html(newName);
 
  markersAccordionGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson);
}

function changeMarkerTitle(event) {
  var actionID = event.id.split("-")[1];
  if (event.value) {
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
      if (experianceJSON.actionPoints[i].actionId == actionID) {
        experianceJSON.actionPoints[i].markarTitle = event.value;
        var j = i;
      }
    }
    $("#titleMarkerId-" + actionID).html(event.value);
  } else {
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
      if (experianceJSON.actionPoints[i].actionId == actionID) {
        experianceJSON.actionPoints[i].markarTitle = event.value;
        var j = i;
      }
    }
    $("#titleMarkerId-" + actionID).html("Marker");
  }
}


function changeText(event, id) {
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    if (experianceJSON.actionPoints[i].actionId == id) {
      var match=event.id.split("-")[0];
      if(match=='rightMatch'){
      experianceJSON.actionPoints[i].rightMatchText = event.value;
      }else{
        experianceJSON.actionPoints[i].wrongMatchText = event.value;
      }
    }
  }
}

function changeMarkerColor(event, id) {
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    if (experianceJSON.actionPoints[i].actionId == id) {
      
      var teleport = document.querySelector("a-sphere#storypoint-" + id);
      if (event.value.includes("#")) {
        experianceJSON.actionPoints[i].actionPointColor = event.value;
      teleport.setAttribute( "material", "color",  event.value);
      } else {
        experianceJSON.actionPoints[i].actionPointColor = "#" + event.value;
      teleport.setAttribute( "material", "color",  "#"+event.value);
      }
    }
  }
}
function changeOpacity(event, id) {
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    if (experianceJSON.actionPoints[i].actionId == id) {
      experianceJSON.actionPoints[i].actionPointOpacity = event.value;
      var teleport = document.querySelector("a-sphere#storypoint-" + id);
      teleport.setAttribute("material", "opacity",  event.value);
      var displayvalue = '(' + Math.round(event.value * 100) + '%)';
      document.getElementById("actionPointDescriptionRangeValue-" + id).innerText = displayvalue
    }
  }
}

function changeHeader(event, id) {
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    if (experianceJSON.actionPoints[i].actionId == id) {
      experianceJSON.actionPoints[i].actionPointHeader = event.value;
    }
  }
}

function resizeMarker(event, id) {
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    if (experianceJSON.actionPoints[i].actionId == id) {
      experianceJSON.actionPoints[i].actionSize = event.value;
      var teleport = document.querySelector("a-sphere#storypoint-" + id);
      teleport.setAttribute("radius", event.value);
    }
  }
}

// reading browse paths
document.addEventListener("DOMContentLoaded", function() {});

function VideoLoad(vid) {
  vidID = vid.attributes.id.nodeValue;
  vidName = vid.files["0"].name;
  if (vid.files && vid.files["0"]) {
    var fileInputLabel = document.getElementById("label-" + vidID);
    fileInputLabel.innerText = vidName;
    var reader = new FileReader();
    reader.onload = function(e) {
      VideoPath = e.target.result;
    };
    reader.readAsDataURL(vid.files["0"]);
  }
}

function AudioLoad(aud) {
  audID = aud.attributes.id.nodeValue;
  audName = aud.files["0"].name;
  if (aud.files && aud.files["0"]) {
    var fileInputLabel = document.getElementById("label-" + audID);
    fileInputLabel.innerText = audName;
    var reader = new FileReader();
    reader.onload = function(e) {
      AudioPath = e.target.result;
    };
    reader.readAsDataURL(aud.files["0"]);
  }
}

function IconLoad(icon) {
  iconID = icon.attributes.id.nodeValue;
  iconName = icon.files["0"].name;
  if (icon.files && icon.files["0"]) {
    var fileInputLabel = document.getElementById("label-" + iconID);
    fileInputLabel.innerText = iconName;
    var reader = new FileReader();
    reader.onload = function(e) {
      PointIconPath = e.target.result;
    };
    reader.readAsDataURL(icon.files["0"]);
  }
}

function CustomizeData() {
  $.getJSON("assets/js/StoryPointJson.json", function(data) {
    var Sky = document.getElementById("skyImageID");
    data.StoryPoints.imageSkyPath = Sky.attributes[1].baseURI();
  });
}

function addTeleports(Story) {
  var aSceneEl = document.querySelector("a-scene");
  var radiusAction = "";
  if (Story) {
    radiusAction = Story.actionSize;
    if (document.querySelector("#storypoint-" + Story.actionId)) {
      $("#storypoint-" + Story.actionId).remove();
    }

    var newTeleport = document.createElement("a-sphere");
    newTeleport.setAttribute("id", "storypoint-" + Story.actionId);
    newTeleport.setAttribute("mouseclick", "");
    newTeleport.setAttribute("material", "color", Story.actionPointColor);
    newTeleport.setAttribute("material", "transparent", "true");
    newTeleport.setAttribute("radius", radiusAction);
    // newTeleport.setAttribute("geometry", "width", radiusAction);
    newTeleport.setAttribute("click-drag", "");
    newTeleport.setAttribute("shader", "flat");
    newTeleport.setAttribute("shadow", "cast", "true");
    newTeleport.setAttribute("material", "opacity",  Story.actionPointOpacity);
    newTeleport.setAttribute("position", Story.actionPointPosition);
    newTeleport.setAttribute("look-at", "src", "#main-camera");
    aSceneEl.appendChild(newTeleport);
  }
}
//    end reading browse path
function saveAllHotspots() {
  var allPlaces = document.querySelectorAll("a-sky");
  allPlaces.forEach(place => {});
  var allHotspots = document.querySelectorAll("a-sphere");
  var nodeId = 0;
  allHotspots.forEach(hotspot => {
    var hotspotProp = {};
    hotspotProp.hotspotName = hotspot.getAttribute("name");
    hotspotProp.nodeId = nodeId;
    hotspotProp.position = hotspot.object3D.position;
    hotspotsToSave.push(hotspotProp);
    nodeId++;
  });
}

function toggleToolbarButtons(selectedSphere1) {
  if (selectedSphere1 === null || selectedSphere1 === undefined) {
    document.getElementById("editTeleport").classList.add("disabled");
    document.getElementById("removeTeleport").classList.add("disabled");
  } else {
    document.getElementById("editTeleport").classList.remove("disabled");
    document.getElementById("removeTeleport").classList.remove("disabled");
  }
}

function editHotspot() {
  if (selectedHotspot) {
    toggleSideNav("storyPointSidenav");
    $("#storyPointSidenav").addClass("active");
    toggleOverlay();
    $("#story-accordion")
      .find(".collapse")
      .collapse("hide");
    $("#collapse-" + selectedHotspot.getAttribute("id")).addClass("show");
  }
}

function deleteHotspot(type) {
  $("#deleteConfirmationModal").modal("hide");
  var id = selectedHotspot.id.split("-")[1];
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    if (experianceJSON.actionPoints[i].actionId == id) {
      experianceJSON.actionPoints.splice(i, 1);
    }
  }
  var sphereArray = document.querySelectorAll("a-sphere");
  if (sphereArray.length > 0) {
    sphereArray.forEach(sphere => {
      sphere.parentNode.removeChild(sphere);
    });
  }
  selectedHotspot = null;
  toggleToolbarButtons(selectedHotspot);
  markersAccordionGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson);
}
function addLaunchScreenText() {
  experianceJSON.launch_text = document.getElementById("lunchScreenText").value;
}
function hideNav() {
  $(".sidenav").removeClass("active");
  $("#overlay").removeClass("overlay");
}
function newPos(x, y, z) {
  var r = Math.pow(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2), 0.5);
  var phy = Math.acos(z / r);
  var thita = Math.asin(y / (r * Math.sin(phy)));
  if ((x < 0 && z < 0) || (x < 0 && z > 0)) {
    phy = -phy; //+ (Math.PI);
    thita = -thita;
  }
  r = 25;
  var newx = r * Math.sin(phy) * Math.cos(thita);
  var newy = r * Math.sin(phy) * Math.sin(thita);
  var newz = r * Math.cos(phy);
  return newx + " " + newy + " " + newz;
}
function toDegrees(angle) {
  return angle * (180 / Math.PI);
}
function toRadians(angle) {
  return angle * (Math.PI / 180);
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
  setTimeout(function() {
    x.className = x.className.replace("show " + type, "");
  }, 3000);
}
$("#summernote").bind("change paste keyup", function() {});

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
      var sel = window.getSelection();
      if (sel.rangeCount) {
      var container = document.createElement("div");
        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
          container.appendChild(sel.getRangeAt(i).cloneContents());
        }
      }
      var selectedTextLength = container.innerText.length;
      var t = e.currentTarget.innerText;
      var cntolleKey = e.originalEvent.ctrlKey;
      $('#maxCount').text(t.length);
      if (t.length >= 350 && selectedTextLength <= 0) {
        if (cntolleKey) {
          
          if (e.keyCode != 8) {
          if (e.keyCode != 65) {
            if (e.keyCode != 67) {
              if (e.keyCode != 90) {
                if (e.keyCode != 88) {
                  if (e.keyCode != 86) {
                    if (e.keyCode != 46) {
                      if (e.keyCode != 17) {

                        popSnackbar("warning", "Limit exceed.");
                        e.preventDefault();
                      }
                      // popSnackbar("warning", "Limit exceed.");
                      // e.preventDefault();
                    }
                  }
                }
                }
              }
            }
          }
        } else {
          if (e.keyCode != 8) {
              if (e.keyCode != 46) {
                popSnackbar("warning", "Limit exceed.");
                e.preventDefault();
              }
          }
        }
      }
    },
    onKeyup: function (e) {
      var t = e.currentTarget.innerText;
      // $('.maxContentPost').text(350 - t.trim().length);
      $('#maxCount').text(t.length);
    },
    onPaste: function (e) {
      var container;
      var sel = window.getSelection();
      if (sel.rangeCount) {
        container = document.createElement("div");
        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
            container.appendChild(sel.getRangeAt(i).cloneContents());
        }
    }
    var selectedTextLength=container.innerText.length;
      var t = e.currentTarget.innerText;

      if (t.length >= 350 && selectedTextLength <= 0) {
        popSnackbar("warning", "Limit exceed.");
        e.preventDefault();
      }
      $("#maxCount").text(t.length);
      var bufferText = (
        (e.originalEvent || e).clipboardData || window.clipboardData
      ).getData("Text");
      e.preventDefault();
      for(var k=0;k<bufferText.length;k++){
    
    
      }
      var maxPaste = bufferText.length;
      var maxLength=(t.length-selectedTextLength) + bufferText.length;
      if ((t.length-selectedTextLength + bufferText.length) > 350) {
        popSnackbar("warning", "Limit exceed.");
        maxPaste = 350 - (t.length+-selectedTextLength);
      }
      if (maxPaste > 0) {
        document.execCommand(
          "insertText",
          false,
          bufferText.substring(0, maxPaste)
        );
      }
      var t = e.currentTarget.innerText;
      $("#maxCount").text(t.length);
    }
  }
});


function deleteInventory(index) {
  inventoryId = index;
  $("#deleteInventoryConfirmationModal").modal("show");
}

function deleteInventoryOnSelect() {
  var id = inventoryId;
  for(var i=0;i<experianceJSON.actionPoints.length;i++){
    // for(var j=0;j<experianceJSON.actionPoints[i].matchableInventories.length;j++){
    // if(experianceJSON.inventories[inventoryId].inventoryTitle==experianceJSON.actionPoints[i].matchableInventories[j].name){
    //   experianceJSON.actionPoints[i].matchableInventories.splice(j, 1);
    // }
    // }
    // for(var k=0;k<experianceJSON.actionPoints[i].rightMatchInventories.length;k++){
    //   if(experianceJSON.inventories[inventoryId].inventoryTitle==experianceJSON.actionPoints[i].rightMatchInventories[k].name){
    //     experianceJSON.actionPoints[i].rightMatchInventories.splice(k, 1);
    //   }
    //   }
    
  experianceJSON.actionPoints[i].matchableInventories.splice(id, 1);
  experianceJSON.actionPoints[i].rightMatchInventories.splice(id, 1);

  }

  
  $("#deleteInventoryConfirmationModal").modal("hide");
  experianceJSON.inventories.splice(id, 1);
  inventoryGenerator(experianceJSON);
  markersAccordionGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson);
}


function multiSelectInventory(event, id) {
  for (i = 0; i < event.target.options.length; i++) {
    var temp = {};
    temp["name"] = event.target.options[i].value;
    temp["value"] = event.target.options[i].selected;
    temp["isVisited"] = false;
    experianceJSON.actionPoints[id].matchableInventories[i] = temp;
    if(event.target.options[i].selected==false){
      experianceJSON.actionPoints[id].rightMatchInventories[i] = temp;
    }
  }
  console.log('multiSelectInventory', experianceJSON.actionPoints[id].matchableInventories);
  multiSelectRightMatchInventoryGenerator(id);
}

function multiSelectRightInventory(event, id) {
  for (i = 0; i < event.target.options.length; i++) {
    var temp = {};
    temp["name"] = event.target.options[i].value;
    temp["value"] = event.target.options[i].selected;
    temp["isVisited"] = false;
    experianceJSON.actionPoints[id].rightMatchInventories[i] = temp;
  }
  console.log('multiSelectRightInventory', experianceJSON.actionPoints[id].rightMatchInventories);
}

function multiSelectInventoryGenerator(id) {
  $("#multiSelectInventory" + id).html("");
  var output = [];
  for ( var j = 0; j < experianceJSON.inventories.length;j++) {
    if(experianceJSON.inventories[j].inventoryTitle!=''){
      var name=(experianceJSON.inventories[j].inventoryTitle).replace(/\s+/g, '-');
     output.push("<option value='"+experianceJSON.inventories[j].inventoryTitle+"' id='multiSelectInventory-"+id+"-"+j+"-"+name+"'>" + experianceJSON.inventories[j].inventoryTitle +"</option>");
  }
  }
  $("#multiSelectInventory" + id).html(output.join(" "));
  for(var i=0;i<experianceJSON.actionPoints[id].matchableInventories.length;i++){
    if(experianceJSON.actionPoints[id].matchableInventories[i].value==true){
      var name=(experianceJSON.inventories[i].inventoryTitle).replace(/\s+/g, '-');
     $("#multiSelectInventory-"+id+"-"+i+"-"+name).prop("selected", true);
    }
  }
  $("#multiSelectInventory" + id).selectpicker("refresh");
}

function multiSelectRightMatchInventoryGenerator(id) {
  $("#multiSelectRightInventory" + id).html("");
  var output1 = [];
  for ( i = 0,count=0;i < experianceJSON.actionPoints[id].matchableInventories.length;i++ ) {
    var name=(experianceJSON.actionPoints[id].matchableInventories[i].name).replace(/\s+/g, '-');
    output1.push( "<option value='"+experianceJSON.actionPoints[id].matchableInventories[i].name+"' id='multiSelectRightInventory-"+id+"-"+i+"-"+name+"'>" + experianceJSON.actionPoints[id].matchableInventories[i].name +"</option>");
  }
 
  var newDrop=$("#multiSelectRightInventory" + id)
  $("#multiSelectRightInventory" + id).html(output1.join(" "));
  for(var i=0;i<experianceJSON.actionPoints[id].rightMatchInventories.length;i++){
     if(experianceJSON.actionPoints[id].matchableInventories[i].value==false){
    var name=(experianceJSON.actionPoints[id].matchableInventories[i].name).replace(/\s+/g, '-');
     $("#multiSelectRightInventory-"+id+"-"+i+"-"+name).prop("disabled",true);
    
    }else{
    if(experianceJSON.actionPoints[id].rightMatchInventories[i].value==true){
      var name=(experianceJSON.actionPoints[id].rightMatchInventories[i].name).replace(/\s+/g, '-');
     $("#multiSelectRightInventory-"+id+"-"+i+"-"+name).prop("selected",true);
    }
  }
  }
  
  $("#multiSelectRightInventory" + id).selectpicker("refresh");
}


function changeRightInfoBg(event, id) {
      if (event.value.includes("#")) {
        experianceJSON.actionPoints[id].rightMatchTextBackgroundColor = event.value;
      } else {
        experianceJSON.actionPoints[id].rightMatchTextBackgroundColor = "#" + event.value;
      }
}
function changeWrongInfoBg(event, id) {
      if (event.value.includes("#")) {
        experianceJSON.actionPoints[id].wrongMatchTextBackgroundColor = event.value;
      } else {
        experianceJSON.actionPoints[id].wrongMatchTextBackgroundColor = "#" + event.value;
      }
}
function changeRightInfofont(event, id) {
      if (event.value.includes("#")) {
        experianceJSON.actionPoints[id].rightMatchTextColor = event.value;
      } else {
        experianceJSON.actionPoints[id].rightMatchTextColor = "#" + event.value;
      }
}
function changeWrongInfofont(event, id) {
      if (event.value.includes("#")) {
        experianceJSON.actionPoints[id].wrongMatchTextColor = event.value;
      } else {
        experianceJSON.actionPoints[id].wrongMatchTextColor = "#" + event.value;
      }
}

function changeRightInfoBgOpcity(event, id) {
      experianceJSON.actionPoints[id].rightMatchTextBackgroundOpacity = event.value;
      var displayvalue = "(" + Math.round(event.value * 100) + "%)";
      document.getElementById("rightmatchRangeValue-"+id).innerText = displayvalue;
}

function changeWrongInfoBgOpcity(event, id) {
      experianceJSON.actionPoints[id].wrongMatchTextBackgroundOpacity = event.value;
      var displayvalue = "(" + Math.round(event.value * 100) + "%)";
      document.getElementById("wrongmatchRangeValue-"+id).innerText = displayvalue;
  }

function changeInventoryInfoBg(event) {
    if (event.value.includes("#")) {
      experianceJSON.inventoryPanelColor = event.value;
    } else {
      experianceJSON.inventoryPanelColor = "#" + event.value;
    }
}
function changeHeaderTextcolor(event) {
  if (event.value.includes("#")) {
    experianceJSON.inventoryPanelHeaderColor = event.value;
  } else {
    experianceJSON.inventoryPanelHeaderColor = "#" + event.value;
  }
}
function changeHeaderText(event){
  experianceJSON.inventoryPanelHeaderText= event.value;
}

function changeInventoryInfoBgOpcity(event) {
  experianceJSON.inventoryPanelOpacity= event.value;
    var displayvalue = "(" + Math.round(event.value * 100) + "%)";
    document.getElementById("panelOpacity").innerText = displayvalue;
}

function bindInventorySettingPanel(experianceJSON){
  var inventoryPanelImage;
  var ResetPanelImage;
  if(experianceJSON.inventoryPanelImage){
   inventoryPanelImage = experianceJSON.inventoryPanelImage;
  }
  else{
    experianceJSON.inventoryPanelImage="/act/v0.1/matchinventory/assets/images/icons/inventory.png";
     inventoryPanelImage = experianceJSON.inventoryPanelImage;
  }
   inventoryPanelImage = inventoryPanelImage.split("/")[
    inventoryPanelImage.split("/").length - 1
  ];
  
  $("#PanelImage ").attr("src", experianceJSON.inventoryPanelImage);
  $("#PanelImageLable").text(inventoryPanelImage);
  
  $('input:radio[name="Reset"]').filter('[value="' + experianceJSON.showReset + '"]').attr('checked', true);


  if(experianceJSON.resetPanelImage){
    ResetPanelImage = experianceJSON.resetPanelImage;
   }
   else{
     experianceJSON.resetPanelImage="/act/v0.1/matchinventory/assets/images/icons/reset.png";
     ResetPanelImage = experianceJSON.resetPanelImage;
   }
   ResetPanelImage = ResetPanelImage.split("/")[
      ResetPanelImage.split("/").length - 1
   ];
   $("#ResetButtonImage").attr("src", experianceJSON.resetPanelImage);
   $("#ResetButtonImageLable").text(ResetPanelImage);
  var inverntoryPanelBackgroundColor = document.getElementById("inventoryInfoBg");
  inverntoryPanelBackgroundColor.value = experianceJSON.inventoryPanelColor;
  inverntoryPanelBackgroundColor.style.backgroundColor = experianceJSON.inventoryPanelColor;
  var inverntoryPanelBackgroundOpacity = document.getElementById("inventoryInfoBgOpcity");
  inverntoryPanelBackgroundOpacity.value = experianceJSON.inventoryPanelOpacity;
  var displayvalue = "(" + Math.round( inverntoryPanelBackgroundOpacity.value * 100) + "%)";
  document.getElementById("panelOpacity").innerText = displayvalue;
  var inverntoryPanelBackgroundOpacity = document.getElementById("inventoryPanelHeaderText");
  inverntoryPanelBackgroundOpacity.value = experianceJSON.inventoryPanelHeaderText;
  var inverntoryPanelTextColor = document.getElementById("inventoryPanelHeaderColor");
  inverntoryPanelTextColor.value = experianceJSON.inventoryPanelHeaderColor;
  inverntoryPanelTextColor.style.backgroundColor = experianceJSON.inventoryPanelHeaderColor;
}

$(document).on("click", '.selectpicker', function(a) {
  if(experianceJSON.inventories.length<1){
    popSnackbar("warning", "No inventory item added.");
  } 
    });

function cloneMarker(id){
  var ele=JSON.parse(JSON.stringify(experianceJSON.actionPoints[id]));
  var pos=(ele.actionPointPosition).split(" ");
  var posY= 2*(ele.actionSize)+0.5;
  var newActionPoint = {
  markarTitle:ele.markarTitle+'-1',
  actionId: ele.actionId,
  actionPointPosition:pos[0]+" "+(pos[1]-posY)+" "+pos[2] ,
  actionPointOpacity:ele.actionPointOpacity,
  actionSize: ele.actionSize,
  mediatype: ele.mediatype,
  actionPointColor:ele.actionPointColor,
  matchableInventories: ele.matchableInventories,
  rightMatchInventories:ele.rightMatchInventories,
  wrongMatchText:ele.wrongMatchText,
  wrongMatchTextColor:ele.wrongMatchTextColor,
  wrongMatchTextBackgroundColor:ele.wrongMatchTextBackgroundColor,
  wrongMatchTextBackgroundOpacity:ele.wrongMatchTextBackgroundOpacity,
  rightMatchText:ele.rightMatchText,
  rightMatchTextColor:ele.rightMatchTextColor,
  rightMatchTextBackgroundColor:ele.rightMatchTextBackgroundColor,
  rightMatchTextBackgroundOpacity:ele.rightMatchTextBackgroundOpacity,
  rightMatchSymbol:ele.rightMatchSymbol,
  wrongMatchSymbol:ele.wrongMatchSymbol,
  type: ele.type,
  isVisited : false
};


document.getElementById("editTeleport").classList.remove("disabled");
document.getElementById("removeTeleport").classList.remove("disabled");
  experianceJSON.actionPoints.push(newActionPoint);
  markersAccordionGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson);
  var actionPointLength=experianceJSON.actionPoints.length;
   selectedHotspot=document.getElementById("storypoint-"+(actionPointLength-1));
  editHotspot();

} 



function checkTitle(el){
  var title=el.value;
  var pattern=new RegExp(/[\/\\#|\]\[,+()$~%.!^'":;*?<>{}]/g);
  if (pattern.test(title)) {
    popSnackbar("warning", "Special characters are not allowed.");
}
  el.value = title.replace(/[\/\\#|\]\[,+()$~%.!^'":;*?<>{}]/g, '');
// if(title.contains()){

// }
}


function setSelectedHotspot(id){
  document.getElementById("editTeleport").classList.remove("disabled");
  document.getElementById("removeTeleport").classList.remove("disabled");
  selectedHotspot=document.getElementById("storypoint-"+id);
}

$("input[name='Reset']").click(function () {
  experianceJSON.showReset = $("input[name='Reset']:checked").val();
});