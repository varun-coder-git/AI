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
var augmentedOverlayData;
var splashImagePath;
var fixOpacity = 0.2;
var deleteIconId;

$(document).ready(function() {
  $("#fixOpacity").on("input", function() {
    fixOpacity = $(this).val();
    var displayvalue = "(" + Math.round(fixOpacity * 100) + "%)";
    document.getElementById("rangeValue").innerText = displayvalue;
    augmentedOverlayData.Opacity = fixOpacity;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  });
});

function initializeCustomization(experienceToCustomize) {
  augmentedOverlayData = JSON.parse(experienceToCustomize);
  for (
    let index = 0;
    index < augmentedOverlayData.actionMarkers.length;
    index++
  ) {
    if ((index + 1) <= augmentedOverlayData.actionMarkers.length) {
      var assetType = augmentedOverlayData.actionMarkers[index].type; 
      if (assetType == "Image") {
        if (augmentedOverlayData.actionMarkers[index].actionPointImage) {
          $("#markerOverlayAsset").attr(
            "src",
            augmentedOverlayData.actionMarkers[index].actionPointImage
          );
          $("#assetNameVideo").html("");
          $("#assetNameAudio").html("");
          $("#assetNameImage").html("");
          $("#assetNameImage").html("");
          $("#assetNameImage").html(
            augmentedOverlayData.actionMarkers[index].actionPointImage
              .split("/")
              .pop()
          );
          var cube=document.getElementById('cube'+(index+1));
          cube.setAttribute('src',augmentedOverlayData.actionMarkers[index].actionPointImage);
        } else {
          $("#markerOverlayAsset").attr("src", "assets/images/default.jpg");
          $("#imgID-" + actionId).attr("src", "assets/images/default.jpg");
          $("#assetNameImage").html("");
        }
      } else if (assetType == "Text") {
        $("#markerOverlayAsset").attr("src", "assets/images/imgtext.jpg");
        $("#assetNameVideo").html("");
        $("#assetNameAudio").html("");
        $("#assetNameImage").html("");
        var cube=document.getElementById('cube'+(index+1));
          cube.setAttribute('src',"");
        var entity1=document.getElementById("text"+(index+1));
        entity1.setAttribute('text',"value",augmentedOverlayData.actionMarkers[index].actionPointText);
      }else {
        $("#markerOverlayAsset").attr("src", "assets/images/default.jpg");
        $("#assetNameImage").html("");
        $("#assetNameAudio").html("");
        $("#assetNameVideo").html("");
      }
    }
  }
  augmentedOverlayData.actionMarkers;
  renderExperience(augmentedOverlayData);
  if (augmentedOverlayData.launch_text) {
    document.getElementsByClassName("lunchScreenText").value =
      augmentedOverlayData.launch_text;
    $(".lunchScreenText").summernote("code", augmentedOverlayData.launch_text);
    var lauchText = $(".lunchScreenText");
    var div = document.createElement("div");
    div.innerHTML = lauchText[0].value;
    var plainText = div.textContent || div.innerText || "";
    var maxLength = 350;
    $("#maxCount").text(plainText.length);
    console.log("Text", $("#maxCount"));
  }

  if (augmentedOverlayData.splash_instruction)
    document.getElementsByClassName("instructionSetForDesktop").value =
      augmentedOverlayData.splash_instruction;
  $(".instructionSetForDesktop").summernote(
    "code",
    augmentedOverlayData.splash_instruction
  );

  if (augmentedOverlayData.splash_android_instruction) {
    document.getElementsByClassName("instructionSetForAndroid").value = augmentedOverlayData.splash_android_instruction;
    $('.instructionSetForAndroid').summernote('code', augmentedOverlayData.splash_android_instruction);
  }

  if (augmentedOverlayData.splash_image) {
    splashImagePath = augmentedOverlayData.splash_image;
    var splashImageName = splashImagePath.split("/")[
      splashImagePath.split("/").length - 1
    ];
    $("#splashImageLable").text(splashImageName);
  }
  if (augmentedOverlayData.splashBackgroundColor) {
    var splashBackground = document.getElementById("splashBackground");
    splashBackground.value = augmentedOverlayData.splashBackgroundColor;
    splashBackground.style.backgroundColor = splashBackground.value;
  } else {
    var splashBackground = document.getElementById("splashBackground");
    splashBackground.style.backgroundColor = "#8F8F8F";
    splashBackground.value = "#8F8F8F";
  }
  if (augmentedOverlayData.Opacity) {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = augmentedOverlayData.Opacity;
    var displayvalue = "(" + Math.round(opacity.value * 100) + "%)";
    document.getElementById("rangeValue").innerText = displayvalue;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  } else {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = fixOpacity;
    var displayvalue = "(" + Math.round(fixOpacity * 100) + "%)";
    document.getElementById("rangeValue").innerText = displayvalue;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  }
  if (augmentedOverlayData.splashHeaderColor) {
    var splashHeaderColor = document.getElementById("splashHeaderColor");
    splashHeaderColor.value = augmentedOverlayData.splashHeaderColor;
    splashHeaderColor.style.backgroundColor = splashHeaderColor.value;
  }
  if (augmentedOverlayData["entry_view"]) {
    $("#CamEntity").attr("rotation", augmentedOverlayData["entry_view"]);
  }
}

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
var experianceJSON = null;
var experianceData = null;
var settingsVisibilityJson = null;
var settingsTypeJson = null;
var imagesAugmentedOverlay = null;

var uniqueVisibility = null;
var setVisibility = null;
var uniqueType = null;
var setType = null;
var SkyImagePath = null;
var ImagePath = null;
var PointIconPath = null;
var augmentedOverlayIndex = 0;

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

function renderExperience(augmentedOverlayData) {
  experianceJSON = augmentedOverlayData;
  $.getJSON("assets/js/settingJson.json", function(result_setting) {
    settingsVisibilityJson = result_setting.Visibility;
    settingsTypeJson = result_setting.Type;
    augmentedGenerator(
      experianceJSON,
      settingsVisibilityJson,
      settingsTypeJson,
      imagesAugmentedOverlay
    );
    // $.getJSON("assets/js/PointImagesJson.json", function (result_images) {
    //     imagesAugmentedOverlay = result_images.PointImages;
    //     augmentedGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson, imagesAugmentedOverlay);
    // });
  });
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

function getAssetPath(assetPath) {
  if(assetPath=='' || assetPath==null || assetPath==undefined){
    return;
  }
  if (assetId == "splashImage") {
    splashImagePath = assetPath;
    var splashImageName = splashImagePath.split("/")[
      splashImagePath.split("/").length - 1
    ];
    $("#splashImageLable").text(splashImageName);
  } else if (assetId == "customFileSky") {
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
      //  $('#imageskyid').attr('src', '');
      //  $('#imageskyid').attr('src', experianceJSON.imageSkyPath);
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
    for (var i = 0; i < experianceJSON.actionMarkers.length; i++) {
      if (experianceJSON.actionMarkers[i].actionId == id) {
        experianceJSON.actionMarkers[i].actionPointImage = assetPath;
        $("#markerOverlayAsset").attr("src", assetPath);
        if ($.trim($("#assetNameImage").html()) == "") {
          $("#assetNameImage").html(assetPath.split("/").pop());
        } else {
          $("#assetNameImage").html("");
          $("#assetNameImage").html(assetPath.split("/").pop());
        }
        var j = i;
        var cube=document.getElementById('cube'+(i+1));
        cube.setAttribute('src',experianceJSON.actionMarkers[i].actionPointImage);
       
      }
    }
    $("#imgID-" + id).attr("src", assetPath);
    var imageName = assetPath.split("/");
    imageName = imageName[imageName.length - 1];
    $("#labelcustomfileinputimage-" + id).html(imageName);

  }
}
// var hotspotsToSave = [];
// var placeToSave = [];
var hotspotIndex = 0;
// var placeIndex = 1;

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
      for (var i = 0; i < experianceJSON.actionMarkers.length; i++) {
        if (experianceJSON.actionMarkers[i].actionId == storyId) {
          experianceJSON.actionMarkers[i].actionPointPosition = newpos; // newPosition.x + ' ' + newPosition.y + ' ' + newPosition.z;
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
  document.getElementById(sidenavId).classList.toggle("active");
  
  toggleOverlay();
}

function openSideNav(sidenavId) {
  
  var sidenavList = document.getElementsByClassName("sidenav");
  for(var i=0;i<6;i++){
    addNewHotspot('large', 'teleport')
  }

  if (document.getElementById(sidenavId).classList.contains("active")) {
  } else {
    document.getElementById(sidenavId).classList.toggle("active");
  
    if(experianceJSON.actionMarkers.length>=1){
      for (var i = 1; i < experianceJSON.actionMarkers.length; i++) {
        $("#collapse-storypoint-"+i).removeClass("show");
      }
      }
      $("#collapse-storypoint-0").addClass("show");  

    toggleOverlay();
  }


}

function toggleOverlay() {
  var sidenavActive = false;
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function(navigation) {
    if (navigation.classList.contains("active")) sidenavActive = true;
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

function addNewHotspot(size, type) {
 // var note=document.getElementById('markerNote').innerHTML;
 //document.getElementById("markerNote").style.display= 'none';
  augmentedOverlayIndex;
  if (augmentedOverlayIndex < 6) {
    $("#assetNameImage").html("");
    $("#assetNameVideo").html("");
    $("#assetNameAudio").html("");
    var newActionPoint = {
      // "actionChecked": "false",
      // "actionIcon": "/act/v0.1/storypoint/assets/images/icons/smily.png",
      // "actionIconID": "i8",
      actionId: augmentedOverlayIndex,
      actionPointAudio: "",
      // "actionPointHeader": "",
      actionPointImage: "",
      // "actionPointPosition": position.x + " " + position.y + " " + position.z,
      actionPointText: "",
      actionPointVideo: "",
      // "actionPointVisibility": "Always Visible",
      // "actionSize": size,
      mediatype: "I",
      type: "Image",
      markerPattern: ""
    };
    experianceJSON.actionMarkers.push(newActionPoint);
    // console.log('experianceJSON.actionMarkers : ', experianceJSON.actionMarkers);
    augmentedGenerator(
      experianceJSON,
      settingsVisibilityJson,
      settingsTypeJson,
      imagesAugmentedOverlay
    );
  } 
  // else {
  //   popSnackbar("warning", "Marker Limit exceed.");
  // }
}

function augmentedGenerator(
  experianceJSON,
  settingsVisibilityJson,
  settingsTypeJson,
  imagesAugmentedOverlay
) {
  $("#augmentedOverlay-accordion").empty();
  $("#tileRow").empty();
  augmentedOverlayIndex = 0;
  for (var i = 0; i < experianceJSON.actionMarkers.length; i++) {
    experianceJSON.actionMarkers[i].actionId = i;
    if(experianceJSON.actionMarkers[i].actionPointImage==""){
      experianceJSON.actionMarkers[i].actionPointImage="assets/js/markers/"+(i+1)+".png";
    }
  }

  var notetext="<p style='color: white;margin-left: 10px;' class='col-12'>Click on the side image below to customise.</p>"
  $("#tileRow").append(notetext);

  experianceJSON.actionMarkers.forEach(augmentedOverlay => {
    uniqueVisibility = augmentedOverlay.actionPointVisibility;
    uniqueType = augmentedOverlay.type;
    uniqueIcon = augmentedOverlay.actionIconID;
    markerTitle = augmentedOverlay.markarTitle;
    markerValue = augmentedOverlay.markarTitle;

    var imagename = "Choose Image";
    if (augmentedOverlay.actionPointImage) {
      imagename = augmentedOverlay.actionPointImage.split("/");
      imagename = imagename[imagename.length - 1];
    }
  
    // settings
      var augmentedOverlayMarkerTiles =
        "<div id='downloadMarkerImageDiv-" +
        augmentedOverlayIndex +
        "' class='marker-tiles' ><img id='downloadMarkerImage-" +
        augmentedOverlayIndex +
        "' class='footer-img-style  marker-image-display'' src='assets/js/markers/"+(augmentedOverlayIndex+1)+".png'  onclick='editHotspot(" +
        augmentedOverlayIndex +
        ")'></div>";
  
    var augmentedOverlayAccordion =
      "<div class='card story-accordion-border' id='story'><div class='card-header story-color-accordion' id='headingTwo'><h3 class='mb-0'><button class='btn btn-link btn-decor' onmouseenter='mouseEnter(&#39;Markers help you overlay Media over the Area images. Configure the markers on the screen using this option.&#39;);' onclick='bindMarkerAndOverlayedAsset(" +
      augmentedOverlayIndex +
      ")' onmouseleave='mouseLeave()' data-toggle='collapse' data-target='#collapse-storypoint-" +
      augmentedOverlayIndex +
      "' aria-expanded='true' aria-controls='collapse-storypoint-" +
      augmentedOverlayIndex +
      "'><i class='fa' aria-hidden='true'></i><span id='titleMarkerId-" +
      augmentedOverlay.actionId +
      "'>" +
      "Face " + (augmentedOverlay.actionId+1) +
      "</span></button></h3></div><div id='collapse-storypoint-" +
      augmentedOverlayIndex +
      "' class='collapse back-color' aria-labelledby='headingTwo' data-parent='#augmentedOverlay-accordion'><div class='card-body'><div class='form-group'></div><div class='form-group '><lable for='typeDropDownID-" +
      augmentedOverlay.actionId +
      "' class='font_color'>What do you want to appear on this side of the cube?</lable><select name='type' id='typeDropDownID-" +
      augmentedOverlay.actionId +
      "' class='col-10 select-dropdown form-control' onchange='toggleTypeOption(this," +
      augmentedOverlay.actionId +
      ")'></select></div><div class='form-group active-story' id= 'textAreaID-" +
      augmentedOverlay.actionId +
      "'> <lable for='place-text-input' class='font_color'>Text:</lable> <textarea maxlength='200' placeholder='Text' class='form-control input_box_trasparent' id='place-text-input' onblur='changeText(this," +
      augmentedOverlay.actionId +
      ")'>" +
      augmentedOverlay.actionPointText +
      "</textarea></div><div class='form-group mb-2 active-story' id='textfontcolor-" +
      augmentedOverlay.actionId +
      "'><label>Description Font Color</label><input class='jscolor pointer' onchange='changeInfofont(this," +
      augmentedOverlay.actionId +
      ")' value='' style='width: 100%'  id='descriptionTextColor-" +
      augmentedOverlay.actionId +
      "'></div><div class='form-group mb-2 active-story' id='textbgcolor-" +
      augmentedOverlay.actionId +
      "'></div><div class='form-group  mb-2 active-story' id= 'descriptionbgOpacity-" +
      augmentedOverlay.actionId +
      "'><div class='slidecontainer'><input id='descriptionBgOpacity-" +
      augmentedOverlay.actionId +
      "' type='range' min='0.1' max='1' step='0.001' value='' class='slider' oninput='changeOpacity(this," +
      augmentedOverlay.actionId +
      ")'  /></div></div><div class='form-group set-image-size active-story' id = 'SelectedImgID-" +
      augmentedOverlay.actionId +
      "'><label>Display Image:</label><img src='" +
      augmentedOverlay.actionPointImage +
      "' alt='Display Image' class='set-image-size' id = 'imgID-" +
      augmentedOverlay.actionId +
      "' ></div><div class='form-group custom-file active-story' id = 'BrowseImgID-" +
      augmentedOverlay.actionId +
      "'style=' margin-top: 25px;'><input type='button' class='custom-file-input handPointer' id='customfileinputimage-" +
      augmentedOverlay.actionId +
      "' onclick='openAssestsPopup(&#39;Image&#39;,this)'> <label class='custom-file-label' for='customfileinputimage-" +
      augmentedOverlay.actionId +
      "'><span class='text-overflow' id='labelcustomfileinputimage-" +
      augmentedOverlay.actionId +
      "'>" +
      imagename +
      "</span></label><label class='aspect-ratio-style ' for='startquizbtn' style='font-size: 12px'>Note: Recommended aspect ratio 1:1</label></div><div class='form-group custom-file mb-3 set-video-size active-story' id = 'SelectedVidID-" +
      augmentedOverlay.actionId +
      "'></div></div></div></div></div>";
    $("#augmentedOverlay-accordion").append(augmentedOverlayAccordion);
    $("#tileRow").append(augmentedOverlayMarkerTiles); 
    
    jscolor.installByClassName("jscolor");
    if (augmentedOverlay.actionPointColor) {
      var fontcolor = document.getElementById(
        "descriptionTextColor-" + augmentedOverlay.actionId
      );
      fontcolor.style.backgroundColor = augmentedOverlay.actionPointColor;
    }
    if (augmentedOverlay.actionPointBgColor) {
      // var fontcolor = document.getElementById(
      //   "descriptionBgColor-" + augmentedOverlay.actionId
      // );
      fontcolor.style.backgroundColor = augmentedOverlay.actionPointBgColor;
    } else {
      // var fontcolor = document.getElementById(
      //   "descriptionBgColor-" + augmentedOverlay.actionId
      // );
      // fontcolor.style.backgroundColor = "#000";
    }
    if (augmentedOverlay.actionPointBgOpacity) {
      var opacity = document.getElementById(
        "descriptionBgOpacity-" + augmentedOverlay.actionId
      );
      opacity.value = augmentedOverlay.actionPointBgOpacity;
      var displayvalue = "(" + Math.round(opacity.value * 100) + "%)";
      // document.getElementById(
      //   "ImageDescriptionRangeValue-" + augmentedOverlay.actionId
      // ).innerText = displayvalue;
    } else {
      var opacity = document.getElementById(
        "descriptionBgOpacity-" + augmentedOverlay.actionId
      );
      opacity.value = 0.6;
      var default_value = "(" + Math.round(0.6 * 100) + "%)";
      // document.getElementById(
      //   "ImageDescriptionRangeValue-" + augmentedOverlay.actionId
      // ).innerText = default_value;
    }

    settingsTypeJson.forEach(type => {
      setType = type.type;
      if (uniqueType === setType) {
        var typeP =
          "<option  value='" +
          type.typeID +
          "' selected>" +
          setType +
          "</option>";
        toggleType(setType, augmentedOverlay.actionId);
      } else {
        var typeP =
          "<option  value='" + type.typeID + "'>" + setType + "</option>";
      }
      $("#typeDropDownID-" + augmentedOverlay.actionId + "").append(typeP);
    });

    //  addTeleports(storyPoint);
    augmentedOverlayIndex++;
  });
}

function bindMarkerAndOverlayedAsset(id) {
  for (var i = 0; i < experianceJSON.actionMarkers.length; i++) {
    if (experianceJSON.actionMarkers[i].actionId == id) {
      var assetPath = experianceJSON.actionMarkers[i].markerPattern;
      if (assetPath) {
        $("#markerImageDisplay").attr("src", assetPath);
      } else {
        $("#markerImageDisplay").attr("src", "assets/images/default.jpg");
      }
      if (experianceJSON.actionMarkers[i].mediatype == "I") {
        if (experianceJSON.actionMarkers[i].actionPointImage) {
          $("#markerOverlayAsset").attr(
            "src",
            experianceJSON.actionMarkers[i].actionPointImage
          );
          $("#assetNameImage").html("");
          $("#assetNameVideo").html("");
          $("#assetNameAudio").html("");
          $("#assetNameImage").html(
            experianceJSON.actionMarkers[i].actionPointImage.split("/").pop()
          );
        } else {
          $("#markerOverlayAsset").attr("src", "assets/images/default.jpg");
        }
      }  else if (experianceJSON.actionMarkers[i].mediatype == "T") {
        $("#markerOverlayAsset").attr("src", "assets/images/imgtext.jpg");
        $("#assetNameImage").html("");
        $("#assetNameAudio").html("");
        $("#assetNameVideo").html("");
      }
        else {
        $("#markerOverlayAsset").attr("src", "assets/images/default.jpg");
        $("#assetNameImage").html("");
        $("#assetNameAudio").html("");
        $("#assetNameVideo").html("");
      }
    }
  }
}

function toggleTypeOption(mediatype, actionId) {
  var typeMedia = mediatype.selectedOptions["0"].text;
  for (var i = 0; i < experianceJSON.actionMarkers.length; i++) {
    if (experianceJSON.actionMarkers[i].actionId == actionId) {
      if (typeMedia == "Image") {
        if (experianceJSON.actionMarkers[i].actionPointImage) {
          $("#markerOverlayAsset").attr(
            "src",
            experianceJSON.actionMarkers[i].actionPointImage
          );
          $("#assetNameVideo").html("");
          $("#assetNameAudio").html("");
          $("#assetNameImage").html("");
          $("#assetNameImage").html("");
          $("#assetNameImage").html( experianceJSON.actionMarkers[i].actionPointImage.split("/").pop() );
          var cube=document.getElementById('cube'+(i+1));
          cube.setAttribute('src',augmentedOverlayData.actionMarkers[i].actionPointImage);

          var entity1=document.getElementById("text"+(i+1));
          entity1.setAttribute('text',"value",'');
        } else {
          $("#markerOverlayAsset").attr("src", "assets/images/default.jpg");
          $("#imgID-" + actionId).attr("src", "assets/images/default.jpg");
          $("#assetNameImage").html("");
          var cube=document.getElementById('cube'+(i+1));
          cube.setAttribute('src','assets/js/markers/'+(i+1)+'.png');
        }
      } else if (typeMedia == "Text") {
        $("#markerOverlayAsset").attr("src", "assets/images/imgtext.jpg");
        $("#assetNameVideo").html("");
        $("#assetNameAudio").html("");
        $("#assetNameImage").html("");
        var cube=document.getElementById('cube'+(i+1));
          cube.setAttribute('src','');
        var entity1=document.getElementById("text"+(i+1));
        entity1.setAttribute('text',"value",augmentedOverlayData.actionMarkers[i].actionPointText);
      } else {
        $("#markerOverlayAsset").attr("src", "assets/images/default.jpg");
        $("#assetNameImage").html("");
        $("#assetNameAudio").html("");
        $("#assetNameVideo").html("");
      }
    }
  }
  $("#textAreaID-" + actionId + "").addClass("active-story");
  // $("#textfontcolor-" + actionId + "").addClass("active-story");
  // $("#descriptionbgOpacity-" + actionId + "").addClass("active-story");
  // $("#textbgcolor-" + actionId + "").addClass("active-story");
  $("#SelectedImgID-" + actionId + "").addClass("active-story");
  $("#BrowseImgID-" + actionId + "").addClass("active-story");

  $("#SelectedAudID-" + actionId + "").addClass("active-story");
  $("#BrowseAudID-" + actionId + "").addClass("active-story");
  $("#SelectedVidID-" + actionId + "").addClass("active-story");
  $("#BrowseVidID-" + actionId + "").addClass("active-story");
  toggleType(typeMedia, actionId);
}

function editHotspot(id) {
  var selectedMarkerId = id;
  bindMarkerAndOverlayedAsset(selectedMarkerId);
  openSideNav("storyPointSidenav");
  $("#augmentedOverlay-accordion")
    .find(".collapse")
    .collapse("hide");
  $("#collapse-storypoint-" + id).addClass("show");
}


function toggleVisibilityOption(event, id) {
  for (var i = 0; i < experianceJSON.actionMarkers.length; i++) {
    if (experianceJSON.actionMarkers[i].actionId == id) {
      experianceJSON.actionMarkers[i].actionPointVisibility = event.value;
      var j = i;
    }
  }
}

function changeText(event, id) {
  for (var i = 0; i < experianceJSON.actionMarkers.length; i++) {
    if (experianceJSON.actionMarkers[i].actionId == id) {
      experianceJSON.actionMarkers[i].actionPointText = event.value;
      var entity1=document.getElementById("text"+(id+1));
        entity1.setAttribute('text',"value",event.value);
    }
  }
}

function changeInfofont(event, id) {
  for (var i = 0; i < experianceJSON.actionMarkers.length; i++) {
    if (experianceJSON.actionMarkers[i].actionId == id) {
      if (event.value.includes("#")) {
        experianceJSON.actionMarkers[i].actionPointColor = event.value;
      } else {
        experianceJSON.actionMarkers[i].actionPointColor = "#" + event.value;
      }
    }
  }
}

function changeInfoBg(event, id) {
  for (var i = 0; i < experianceJSON.actionMarkers.length; i++) {
    if (experianceJSON.actionMarkers[i].actionId == id) {
      if (event.value.includes("#")) {
        experianceJSON.actionMarkers[i].actionPointBgColor = event.value;
      } else {
        experianceJSON.actionMarkers[i].actionPointBgColor = "#" + event.value;
      }
    }
  }
}

function changeOpacity(event, id) {
  for (var i = 0; i < experianceJSON.actionMarkers.length; i++) {
    if (experianceJSON.actionMarkers[i].actionId == id) {
      experianceJSON.actionMarkers[i].actionPointBgOpacity = event.value;
      var displayvalue = "(" + Math.round(event.value * 100) + "%)";
      // var newval = document.getElementById("ImageDescriptionRangeValue-" + id);
      // newval.innerText = displayvalue;
    }
  }
}

function toggleType(mediatype, actionId) {
  for (var i = 0; i < experianceJSON.actionMarkers.length; i++) {
    if (experianceJSON.actionMarkers[i].actionId == actionId) {
      experianceJSON.actionMarkers[i].type = mediatype;

      var j = i;
    }
  }
  switch (mediatype) {
    case "Text":
      $("#textAreaID-" + actionId + "").toggleClass("active-story");
      // $("#textfontcolor-" + actionId + "").toggleClass("active-story");
      // $("#descriptionbgOpacity-" + actionId + "").toggleClass("active-story");
      // $("#textbgcolor-" + actionId + "").toggleClass("active-story");
      experianceJSON.actionMarkers[j].mediatype = "T";
      break;
    case "Image":
      $("#SelectedImgID-" + actionId + "").toggleClass("active-story");
      $("#BrowseImgID-" + actionId + "").toggleClass("active-story");
      experianceJSON.actionMarkers[j].mediatype = "I";
      break;
    
  }
}
// reading browse paths
document.addEventListener("DOMContentLoaded", function() {});

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
    if (Story.actionSize === "small") {
      radiusAction = 1.5;
    } else if (Story.actionSize === "medium") {
      radiusAction = 2.5;
    } else {
      radiusAction = 4;
    }
    if (document.querySelector("#storypoint-" + Story.actionId)) {
      $("#storypoint-" + Story.actionId).remove();
    }
    var newTeleport = document.createElement("a-box");
    newTeleport.setAttribute("id", "storypoint-" + Story.actionId);
    newTeleport.setAttribute("mouseclick", "");
    newTeleport.setAttribute("material", "src", Story.actionIcon);
    newTeleport.setAttribute("material", "transparent", "true");
    newTeleport.setAttribute("geometry", "height", radiusAction);
    newTeleport.setAttribute("geometry", "width", radiusAction);
    newTeleport.setAttribute("click-drag", "");
    newTeleport.setAttribute("shader", "flat");
    newTeleport.setAttribute("shadow", "cast", "true");
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

function deleteHotspot(type) {
  var getId=selectedHotspot.id;
    $("#"+getId).remove();
  // selectedHotspot.parentNode.removeChild(selectedHotspot);
  $("#deleteConfirmationModal").modal("hide");
  var id = selectedHotspot.id.split("-")[1];
  for (var i = 0; i < experianceJSON.actionMarkers.length; i++) {
    if (experianceJSON.actionMarkers[i].actionId == id) {
      experianceJSON.actionMarkers.splice(i, 1);
    }
  }
  var sphereArray = document.querySelectorAll("a-box");
  if (sphereArray.length > 0) {
    sphereArray.forEach(sphere => {
      sphere.parentNode.removeChild(sphere);
    });
  }
  selectedHotspot = null;
  toggleToolbarButtons(selectedHotspot);
  augmentedGenerator(
    experianceJSON,
    settingsVisibilityJson,
    settingsTypeJson,
    imagesAugmentedOverlay
  );
}

function deleteSelectedHotspot() {
  var id = parseInt(deleteIconId);
  experianceJSON.actionMarkers.splice(id, 1);
  if (experianceJSON.actionMarkers.length == 0) {
    $("#assetNameImage").html("");
    $("#assetNameAudio").html("");
    $("#assetNameVideo").html("");
    $("#markerOverlayAsset").attr("src", "assets/images/default.jpg");
    $("#markerImageDisplay").attr("src", "assets/images/default.jpg");
    document.getElementById("markerNote").style.display= '';
  }
  augmentedGenerator(
    experianceJSON,
    settingsVisibilityJson,
    settingsTypeJson,
    imagesAugmentedOverlay
  );
  $("#deleteConfirmationModal").modal("hide");
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
function printMarker() {
  var cube=document.getElementById("cubeRotation");
  console.log(cube.getAttribute('scale'));
}

/* Summernote MAxlength, maxcount and popsnacker */
