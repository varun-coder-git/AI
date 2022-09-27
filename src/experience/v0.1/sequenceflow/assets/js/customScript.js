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
var experianceJSON;
var splashImagePath;
var fixOpacity = 0.2;
var fixsubmitOpacity=0.6;
var congratulations = "";
var thankmsg = "";
var thankyou = "";
var correctAnswer = 0;
var newpos ;
var newrot;
var previousIcon;

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
    sequenceData.Opacity = fixOpacity;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  });
  $("#submitPanelOpacity").on("input", function() {
    fixsubmitOpacity = $(this).val();
    var displayvalue = "(" + Math.round(fixsubmitOpacity * 100) + "%)";
    document.getElementById("submitPanel").innerText = displayvalue;
    sequenceData.submitPanelBgOpacity = fixsubmitOpacity;
  });
  
});

jQuery(function($) {
  var panelList = $("#sequence-accordion");
  panelList.sortable({
    // Only make the .panel-heading child elements support dragging.
    // Omit this to make then entire <li>...</li> draggable.
    handle: ".panelheader",
    update: function() {
      $(".dragCard", panelList).each(function(index, elem) {
        var $listItem = $(elem),
          newIndex = $listItem.index();
        // Persist the new indices.
      });

      var dragElements = document.getElementsByClassName("dragCard");
      for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
        for (let j = 0; j < dragElements.length; j++) {
          dragElementsId = parseInt(dragElements[j].id);
          if (experianceJSON.actionPoints[i].markerId === dragElementsId) {
          //  experianceJSON.actionPoints[i].actionId = j;
            experianceJSON.actionPoints[i].sortOrder = j;
          }
        }

        if (i == experianceJSON.actionPoints.length - 1) {
          var sortedArray = sortArray(experianceJSON.actionPoints);
          experianceJSON.actionPoints = sortedArray;
        }
      }
    }
  });
});

function sortArray(actionPoints) {
  actionPoints.sort(function(a, b) {
   // return a.actionId - b.actionId;
    return a.sortOrder - b.sortOrder;
  });
  return actionPoints;
}

function initializeCustomization(experienceToCustomize) {
  sequenceData = JSON.parse(experienceToCustomize);
  
  var submitbtn=document.getElementById("getScore");
    submitbtn.setAttribute("mouseclick","");
    submitbtn.setAttribute("click-drag","");

    newpos=sequenceData.submitPosition;
    newrot=sequenceData.submitRotation;
  
  if(sequenceData.SubmitMessage){
    $("#submitMessage").val(sequenceData.SubmitMessage);
  }else{
    $("#submitMessage").val("Do you really wish to submit the sequence?");
  }
  if (sequenceData.Success_Message) {
    $("#SuccessMessage").val(sequenceData.Success_Message);
  } else {
    $("#SuccessMessage").val("Wow! You'v done it! You scored");
  }
  if (sequenceData.Failuer_Message) {
    $("#failuerMessage").val(sequenceData.Failuer_Message);
  } else {
    $("#failuerMessage").val("Oops! Better luck next time! You scored");
  }
  renderExperience(sequenceData);
  if (sequenceData.launch_text) {
    document.getElementsByClassName("lunchScreenText").value =
      sequenceData.launch_text;
    $(".lunchScreenText").summernote("code", sequenceData.launch_text);
    var lauchText = $(".lunchScreenText");
    var div = document.createElement("div");
    div.innerHTML = lauchText[0].value;
    var plainText = div.textContent || div.innerText || "";
    var maxLength = 350;
    $("#maxCount").text(plainText.length);
    console.log("Text", $("#maxCount"));
  }

  if (sequenceData.splash_instruction){
    document.getElementsByClassName("instructionSetForDesktop").value =
      sequenceData.splash_instruction;
  $(".instructionSetForDesktop").summernote("code", sequenceData.splash_instruction);
  }

  if (sequenceData.splash_android_instruction) {
    document.getElementsByClassName("instructionSetForAndroid").value = sequenceData.splash_android_instruction;
    $('.instructionSetForAndroid').summernote('code', sequenceData.splash_android_instruction);
  }

  if (sequenceData.splash_image) {
    splashImagePath = sequenceData.splash_image;
    var splashImageName = splashImagePath.split("/")[
      splashImagePath.split("/").length - 1
    ];
    $("#splashImageLable").text(splashImageName);
  }
  if (sequenceData.splashBackgroundColor) {
    var splashBackground = document.getElementById("splashBackground");
    splashBackground.value = sequenceData.splashBackgroundColor;
    splashBackground.style.backgroundColor = splashBackground.value;
  } else {
    var splashBackground = document.getElementById("splashBackground");
    splashBackground.style.backgroundColor = "#8F8F8F";
    splashBackground.value = "#8F8F8F";
  }
  if (sequenceData.Opacity) {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = sequenceData.Opacity;
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

  if (sequenceData.submitPanelBgOpacity) {
    var opacity = document.getElementById("submitPanelOpacity");
    opacity.value = sequenceData.submitPanelBgOpacity;
    var displayvalue = "(" + Math.round(opacity.value * 100) + "%)";
    document.getElementById("submitPanel").innerText = displayvalue;
  } else {
    var opacity = document.getElementById("submitPanelOpacity");
    opacity.value = fixsubmitOpacity;
    var displayvalue = "(" + Math.round(fixsubmitOpacity * 100) + "%)";
    document.getElementById("submitPanel").innerText = displayvalue;
  }

  if (sequenceData.splashHeaderColor) {
    var splashHeaderColor = document.getElementById("splashHeaderColor");
    splashHeaderColor.value = sequenceData.splashHeaderColor;
    splashHeaderColor.style.backgroundColor = splashHeaderColor.value;
  }
  if (sequenceData["entry_view"]) {
    $("#CamEntity").attr("rotation", sequenceData["entry_view"]);
  }

  if(sequenceData.submitPosition){
  var hideTeleport = document.getElementById("getScore");
  hideTeleport.setAttribute('position', sequenceData.submitPosition);
  }
  if (sequenceData.submitMessageBackgroundColor) {
    var SubmitBackground = document.getElementById("submitPanelBgColor");
    SubmitBackground.value = sequenceData.submitMessageBackgroundColor;
    SubmitBackground.style.backgroundColor = SubmitBackground.value;
  } else {
    var SubmitBackground = document.getElementById("submitPanelBgColor");
    SubmitBackground.style.backgroundColor = "#2B2B2B";
    SubmitBackground.value = "#2B2B2B";
  }

  if (sequenceData.submitMessageTextColor) {
    var SubmitTextColor = document.getElementById("submitPanelTextColor");
    SubmitTextColor.value = sequenceData.submitMessageTextColor;
    SubmitTextColor.style.backgroundColor = SubmitTextColor.value;
  } else {
    var SubmitTextColor = document.getElementById("submitPanelTextColor");
    SubmitTextColor.style.backgroundColor = "#FFFFFF";
    SubmitTextColor.value = "#FFFFFF";
  }
  
   
}

function setEntryView() {
  if ($("#freezeView").hasClass("disabled")) {
    //Nothing to do here
  } else {
    var cam = document.querySelector("[camera]");
    var pos = cam.getAttribute("rotation");
    var oldpos = 0;
    if (sequenceData["entry_view"]) {
      oldpos = sequenceData["entry_view"].split(" ")[1];
    }
    sequenceData["entry_view"] = "0 " + (pos.y + parseInt(oldpos)) + " 0";
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
  experianceJSON.submitPosition=newpos;
  experianceJSON.submitRotation=newrot;
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

  var submitbg = $(".submitpanel");
  var submitbgColor = submitbg[0].value;
  if (submitbgColor.includes("#")) {
    experianceJSON.submitMessageBackgroundColor = submitbgColor;
  } else {
    experianceJSON.submitMessageBackgroundColor = "#" + submitbgColor;
  }

  var submittext = $(".submitpaneltext");
  var submittextColor = submittext[0].value;
  if (submittextColor.includes("#")) {
    experianceJSON.submitMessageTextColor = submittextColor;
  } else {
    experianceJSON.submitMessageTextColor = "#" + submittextColor;
  }

  if (experianceJSON.submitPanelBgOpacity) {
    var opacity = document.getElementById("submitPanelOpacity");
    opacity.value = experianceJSON.submitPanelBgOpacity;
    var displayvalue = "(" + Math.round(opacity.value * 100) + "%)";
    document.getElementById("submitPanel").innerText = displayvalue;
  } else {
    experianceJSON.submitPanelBgOpacity = fixsubmitOpacity;
  }

  if (experianceJSON.Opacity) {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = experianceJSON.Opacity;
    var displayvalue = "(" + Math.round(opacity.value * 100) + "%)";
    document.getElementById("rangeValue").innerText = displayvalue;
  } else {
    experianceJSON.Opacity = fixOpacity;
  }


  experianceJSON.Success_Message = $("#SuccessMessage").val();

  experianceJSON.Failuer_Message = $("#failuerMessage").val();

  experianceJSON.SubmitMessage=$("#submitMessage").val();
 

  var modifiedJSON = experianceJSON;
  modifiedJSON.entry_view = experianceJSON.entry_view;
  var dataToPost = JSON.stringify(modifiedJSON);
  return dataToPost;
}

var SkyPath;
var selectedPlace = null;
var selectedHotspot = null;
var selectedInfobox = null;
var experianceJSON = null;
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
var sequenceIndex = 0;
var iconData = [
  {
    iconId: 0,
    iconName: "Assembly Point",
    iconPath: "assets/images/icons/Assembly-Point.png"
  },
  {
    iconId: 1,
    iconName: "Gift",
    iconPath: "assets/images/icons/gift.png"
  },
  {
    iconId: 2,
    iconName: "Hand Pointer",
    iconPath: "assets/images/icons/Hand-Pointer.png"
  },
  {
    iconId: 3,
    iconName: "Info",
    iconPath: "assets/images/icons/Info.png"
  },
  {
    iconId: 4,
    iconName: "Location",
    iconPath: "assets/images/icons/Location-Marker.png"
  },
  {
    iconId: 5,
    iconName: "Money",
    iconPath: "assets/images/icons/money.png"
  },
  {
    iconId: 6,
    iconName: "Question",
    iconPath: "assets/images/icons/Question.png"
  },
  {
    iconId: 7,
    iconName: "Smiley",
    iconPath: "assets/images/icons/smily.png"
  },
  {
    iconId: 8,
    iconName: "Star",
    iconPath: "assets/images/icons/star.png"
  },
  {
    iconId: 9,
    iconName: "Warning",
    iconPath: "assets/images/icons/Warning.png"
  },
  {
    iconId: 10,
    iconName: "Wrong",
    iconPath: "assets/images/icons/wrong.png"
  }
];

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

function renderExperience(sequenceData) {
  experianceJSON = sequenceData;
  $.getJSON("assets/js/settingJson.json", function(result_setting) {
    settingsVisibilityJson = result_setting.Visibility;
    settingsTypeJson = result_setting.Type;
    $.getJSON("assets/js/PointImagesJson.json", function(result_images) {
      imagesPointSTory = result_images.PointImages;
      sequenceGenerator(
        experianceJSON,
        settingsVisibilityJson,
        settingsTypeJson,
        imagesPointSTory
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
     setTimeout(()=>{
        skyVideo.play();
     },3000);
  }
}

// function totalMarks() {
//   sequenceData.total_marks = $("#totalMarks").val();
// }
function SuccessMessage() {
  sequenceData.Success_Message = $("#SuccessMessage").val();
}
function failuerMessage() {
  sequenceData.Failuer_Message = $("#failuerMessage").val();
}

function SubmitMessageText(){
  sequenceData.SubmitMessage=$("#submitMessage").val();
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
  if (assetId == "splashImage") {
    splashImagePath = assetPath;
    var splashImageName = splashImagePath.split("/")[
      splashImagePath.split("/").length - 1
    ];
    $("#splashImageLable").text(splashImageName);
  } else if (assetId == "customFileSky") {
    $("#customFileSkyVideo").html("Choose Video");
    experianceJSON.videoskypath = "";
    experianceJSON.imageSkyPath = assetPath;
    $("a-videosphere").attr("visible", "false");
    $("a-sky").attr("visible", "true");
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
    $("#customFileSky").html("Choose Image");
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
    
    var skyVideoTag = document.querySelector("#videoskyid");
    setTimeout(()=>{
      skyVideoTag.play();
   },3000);
  } else if (assetId.indexOf("customfileinputimage-") > -1) {
    var id = assetId.split("-");
    id = id[id.length - 1];
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
      if (experianceJSON.actionPoints[i].actionId == id) {
        experianceJSON.actionPoints[i].actionPointImage = assetPath;
        var j = i;
      }
    }
    $("#imgID-" + id).attr("src", assetPath);
    var imageName = assetPath.split("/");
    imageName = imageName[imageName.length - 1];
    $("#labelcustomfileinputimage-" + id).html(imageName);
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
  } else if (assetId.indexOf("customFileInputPointImgae-") > -1) {
    var id = assetId.split("-");
    id = id[id.length - 1];
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
      if (experianceJSON.actionPoints[i].actionId == id) {
        experianceJSON.actionPoints[i].actionIcon = assetPath;
        experianceJSON.actionPoints[i].actionIconID = "-i1";
        $("#customIconImage-" + id).attr("src", assetPath);
        $("#storypoint-" + id).attr("src", assetPath);
        $("#customIcon-" + id).attr("style", "display:block");
        for (var j = 0; j < imagesPointSTory.length; j++) {
          var iconIds = imagesPointSTory[j].iconId + "-" + id;
          if (
            document
              .querySelector("#" + iconIds)
              .classList.contains("icon-selected")
          ) {
            document
              .querySelector("#" + iconIds)
              .classList.remove("icon-selected");
          }
        }
        $("#customIconImage-" + id).addClass("icon-selected");
      }
    }
  }
}
var hotspotIndex = 0;
var storyPointRotDrag;
AFRAME.registerComponent("mouseclick", {
  init: function() {
    this.el.addEventListener("click", function() {

      if(this.id=='getScore'){
        toggleSideNav('scoreSidenav');
        return;
      }
      
      if (selectedHotspot === this) selectedHotspot = null;
      else {
        selectedHotspot = this;
        if(this.id!="getScore"){
        editHotspot();
        
      toggleToolbarButtons(selectedHotspot);
        }
      }
    });

    this.el.addEventListener("dragstart", function() {
      var storyPoint = document.getElementById(this.id);
      storyPointRotDrag = storyPoint.getAttribute("position");
    });

    this.el.addEventListener("dragend", function() {


      var storyPoint = document.getElementById(this.id);
      var storyPointRotDrop = storyPoint.getAttribute("position");
      var newPosition = this.getAttribute("position");
      var storyId = this.id.split("-")[1];
      var newrotation = this.getAttribute("rotation");

      if(this.id=="getScore"){
        newpos = newPosition.x + " " + newPosition.y + " " + newPosition.z;
        experianceJSON.submitPosition=newpos;
        newrot= newrotation.x + " " + newrotation.y + " " + newrotation.z
        experianceJSON.submitRotation=newrot;
      }
      else{
       /* var newposmarker = storyPointRotDrop.x + " " + storyPointRotDrop.y + " " + storyPointRotDrop.z;
        $("#" + this.id).attr("position", newposmarker);
        for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
          if (experianceJSON.actionPoints[i].actionId == storyId) {
            experianceJSON.actionPoints[i].actionPointPosition = newposmarker;
          }
        }*/

        var allTeleports = document.getElementsByTagName('a-box');
        experianceJSON.actionPoints.forEach(experianceJSONElement => {
            for(var i=0; i < allTeleports.length; i++){
              var markerPosition = allTeleports[i].getAttribute("position");
              var storyId = allTeleports[i].id.split("-")[1];
              var newposmarker = markerPosition.x + " " + markerPosition.y + " " + markerPosition.z;
              $("#" + allTeleports[i].id).attr("position", newposmarker);
               if(experianceJSONElement.actionId == storyId){
                experianceJSONElement.actionPointPosition = newposmarker;
               }
            }
        });
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

function addNewHotspot(size) {
  sequenceIndex;
  if (sequenceIndex < 20) {
    var maxValueOfMarkerId;
    if (experianceJSON.actionPoints.length < 1) {
      maxValueOfMarkerId = 0;
    } else {
      maxValueOfMarkerId = Math.max.apply(
        Math,
        experianceJSON.actionPoints.map(function(o) {
          return o.markerId;
        })
      );
    }

    maxValueOfMarkerId++;
    var markerEl = document.querySelector("#marker");
    var position = markerEl.object3D.getWorldPosition();
    var newActionPoint = {
      actionChecked: "false",
      actionIcon: "/act/v0.1/storypoint/assets/images/icons/smily.png",
      actionIconID: "i8",
      actionId: sequenceIndex,
      actionPointAudio: "",
      actionPointHeader: "",
      actionPointImage: "",
      actionPointPosition: position.x + " " + position.y + " " + position.z,
      actionPointText: "",
      actionPointVideo: "",
      actionPointVisibility: "Always Visible",
      actionSize: size,
      markerId: maxValueOfMarkerId,
      sortOrder:sequenceIndex
    };
    experianceJSON.actionPoints.push(newActionPoint);
    sequenceGenerator(
      experianceJSON,
      settingsVisibilityJson,
      settingsTypeJson,
      imagesPointSTory
    );

      closeSideNav();
      toggleSideNav("storyPointSidenav");
      $("#sequence-accordion").find(".collapse").collapse("hide");
      $("#collapse-storypoint-" + (sequenceIndex-1)).addClass("show");
    

  } else {
    popSnackbar("warning", "Limit exceed.");
  }
}

function sequenceGenerator(
  experianceJSON,
  settingsVisibilityJson,
  settingsTypeJson,
  imagesPointSTory
) {
  $("#sequence-accordion").empty();
  sequenceIndex = 0;

  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    experianceJSON.actionPoints[i].actionId = i;
  }

  if (experianceJSON.actionPoints.length == 1) {
    if (experianceJSON.actionPoints[0].hasOwnProperty("markerId")) {
      //Do nothing
    } else {
      experianceJSON.actionPoints[0].markerId = 0;
    }
  }

  experianceJSON.actionPoints.forEach(sequence => {
    uniqueVisibility = sequence.actionPointVisibility;
    uniqueType = sequence.type;
    uniqueIcon = sequence.actionIconID;
    markerTitle = sequence.markarTitle;
    markerValue = sequence.markarTitle;
    ChekedTrue = sequence.actionChecked;
    if (ChekedTrue == "true") {
      var checkedboxTrue = "checked";
    }

    if (!markerTitle) {
      markerTitle = "Step";
      markerValue = "";
    }
    var imagename = "Choose Image";
    if (sequence.actionPointImage) {
      imagename = sequence.actionPointImage.split("/");
      imagename = imagename[imagename.length - 1];
    }
    var videoname = "Choose Video";
    if (sequence.actionPointVideo) {
      videoname = sequence.actionPointVideo.split("/");
      videoname = videoname[videoname.length - 1];
    }
    var audioname = "Choose Audio";
    if (sequence.actionPointAudio) {
      audioname = sequence.actionPointAudio.split("/");
      audioname = audioname[audioname.length - 1];
    }

    // settings
    var storyAccordion =
      "<div class='card story-accordion-border panelcard' id='story' style='transition:none;'><div class='card-header story-color-accordion panelheader' id='headingTwo' style='transition:none;'><h3 class='mb-0 dragCard' id='" +
      sequence.markerId +
      "'><button class='btn btn-link btn-decor btndrag' onmouseenter='mouseEnter(&#39;Markers help you overlay Media over the Area images. Configure the markers on the screen using this option.&#39;);' onmouseleave='mouseLeave()' data-toggle='collapse' data-target='#collapse-storypoint-" +
      sequenceIndex +
      "' aria-expanded='true' aria-controls='collapse-storypoint-" +
      sequenceIndex +
      "'style='width:auto;' ><i class='fa' aria-hidden='true'></i><span id='titleMarkerId-" +
      sequence.actionId +
      "'>" +
      markerTitle +
      "</span></button><img src='assets/images/up-down-arrow-white.png' style='float: right;margin-top: 3%;margin-right: 3%;'></h3></div><div id='collapse-storypoint-" +
      sequenceIndex +
      "' class='collapse back-color' aria-labelledby='headingTwo' data-parent='#sequence-accordion'><div class='card-body'><div class='form-group'><lable for='markerTitleID-" +
      sequence.actionId +
      "' class='font_color'>Step Title:</lable><input class='col-12 form-control input_box_trasparent' maxlength='25' onblur='changeMarkerTilte(this)' placeholder='Step Title' type='text' title='Step Title' id='markerTitleID-" +
      sequence.actionId +
      "' value=\"" +
      markerValue +
      "\"></div><div class='form-group'><lable for='visibilityDropDownID-" +
      sequence.actionId +
      "' class='font_color'>Step Visibility:</lable> <select name='Visiblility' id='visibilityDropDownID-" +
      sequence.actionId +
      "' class='col-10 select-dropdown form-control' onchange='toggleVisibilityOption(this, " +
      sequence.actionId +
      ")' ></select></div><div class='form-group mb-2 set-image-size active-story' id = 'SelectedImgID-" +
      sequence.actionId +
      "'><img src='" +
      sequence.actionPointImage +
      "' alt='Display Image' class='set-image-size' id = 'imgID-" +
      sequence.actionId +
      "' ></div><div class='form-group custom-file mb-3 active-story' id = 'BrowseImgID-" +
      sequence.actionId +
      "'><input type='button' class='custom-file-input handPointer' id='customfileinputimage-" +
      sequence.actionId +
      "' onclick='openAssestsPopup(&#39;Image&#39;,this)'> <label class='custom-file-label' for='customfileinputimage-" +
      sequence.actionId +
      "'><span class='text-overflow' id='labelcustomfileinputimage-" +
      sequence.actionId +
      "'>" +
      imagename +
      "</span></label></div><div class='form-group custom-file mb-3 set-video-size active-story' id = 'SelectedVidID-" +
      sequence.actionId +
      "'><video class='set-video-size' controls='controls' id='videoID-" +
      sequence.actionId +
      "' src='" +
      sequence.actionPointVideo +
      "'></video></div><div class='form-group custom-file mb-2 active-story' id = 'BrowseVidID-" +
      sequence.actionId +
      "'><input type='button' class='custom-file-input handPointer' id='customfileinputvideo-" +
      sequence.actionId +
      "' onclick='openAssestsPopup(&#39;Video&#39;,this)'> <label class='custom-file-label' for='customfileinputvideo-" +
      sequence.actionId +
      "'><span class='text-overflow' id='labelcustomfileinputvideo-" +
      sequence.actionId +
      "'>" +
      videoname +
      "</span></label> </div> <div class='form-group custom-file mb-2 active-story' id = 'SelectedAudID-" +
      sequence.actionId +
      "'><audio class='audio-width' controls id='audioID-" +
      sequence.actionId +
      "' src='" +
      sequence.actionPointAudio +
      "'></audio></div> <div class='form-group custom-file mb-2 active-story' id = 'BrowseAudID-" +
      sequence.actionId +
      "'><input type='button' class='custom-file-input handPointer' id='customfileinputaudio-" +
      sequence.actionId +
      "' onclick='openAssestsPopup(&#39;Audio&#39;,this)'><label class='custom-file-label' for='custom-file-input-audio'><span class='text-overflow' id='labelcustomfileinputaudio-" +
      sequence.actionId +
      "' class='text-overflow'>" +
      audioname +
      "</span></label></div><div class='form-group' id = 'SelectedIconID-" +
      sequence.actionId +
      "'> <label class='font_color' id='customLabelTeleport' >Step Icon:</label><div class='row' style='display:none' id='customIcon-" +
      sequence.actionId +
      "'><div class='col-3 icon-padding'><img src='' style='width:80px;height:80px !important;' onclick='changeSequenceIcon(this)' id='customIconImage-" +
      sequence.actionId +
      "' /></div></div> <div class='row'  id='ptIconDivID-" +
      sequence.actionId +
      "'> </div> <div class='form-group  custom-file mb-2 mt-2' id = 'BrowseIconID-" +
      sequence.actionId +
      "'>Choose Step: <label class='btn btn-color-browse btn-width btn-shadow' id='customFileInputPointImgae-" +
      sequence.actionId +
      "' onmouseenter='mouseEnter(&#39;Change the Icon for the marker by browsing a new one OR you can select one of the existing icons.&#39;);' onmouseleave='mouseLeave()' onclick='openAssestsPopup(&#39;Image&#39;,this)'>Browse</label></div> <label class='aspect-ratio-style'>Note: Recommended aspect ratio 1:1</label></div></div></div></div></div>";
    $("#sequence-accordion").append(storyAccordion);
    jscolor.installByClassName("jscolor");


    settingsVisibilityJson.forEach(visibility => {
      setVisibility = visibility.visibility;

      if (uniqueVisibility === setVisibility) {
        var visi =
          "<option value='" +
          visibility.visibility +
          "' selected>" +
          setVisibility +
          "</option>";
      } else {
        var visi =
          "<option  value='" +
          visibility.visibility +
          "'>" +
          setVisibility +
          "</option>";
      }
      $("#visibilityDropDownID-" + sequence.actionId + "").append(visi);
      // drop down bind for visibility
    });
    settingsTypeJson.forEach(type => {
      setType = type.type;
      if (uniqueType === setType) {
        var typeP =
          "<option  value='" +
          type.typeID +
          "' selected>" +
          setType +
          "</option>";
        toggleType(setType, sequence.actionId);
      } else {
        var typeP =
          "<option  value='" + type.typeID + "'>" + setType + "</option>";
      }
      $("#typeDropDownID-" + sequence.actionId + "").append(typeP);
    });
    imagesPointSTory.forEach(pointImages => {
      setIcon = pointImages.iconId;
      if (uniqueIcon === setIcon) {
        var icon =
          "<div class='col-3 icon-padding' ><img src=" +
          pointImages.iconPath +
          " onclick='changeSequenceIcon(this)' alt='location' class='image_size img-responsive icon-selected'  id= '" +
          pointImages.iconId +
          "-" +
          sequence.actionId +
          "'/></div>";
      } else {
        var icon =
          "<div class='col-3 icon-padding' ><img src=" +
          pointImages.iconPath +
          " onclick='changeSequenceIcon(this)' alt='location' class='image_size img-responsive'id= '" +
          pointImages.iconId +
          "-" +
          sequence.actionId +
          "' /></div>";
      }
      $("#ptIconDivID-" + sequence.actionId + "").append(icon);
    });
    if (uniqueIcon == "-i1") {
      $("#customIconImage-" + sequence.actionId).attr(
        "src",
        sequence.actionIcon
      );
      $("#customIcon-" + sequence.actionId).attr("style", "display:block");
      $("#customIconImage-" + sequence.actionId).attr(
        "class",
        "image_size img-responsive icon-selected"
      );
    }
    addTeleports(sequence);
    sequenceIndex++;
  });
}

function changeSequenceIcon(evn) {
  var id = evn.id;
  var storyId = id.split("-")[1];
  for (var i = 0; i < imagesPointSTory.length; i++) {
    var iconIds = imagesPointSTory[i].iconId + "-" + storyId;
    if (
      document.querySelector("#" + iconIds).classList.contains("icon-selected")
    ) {
      document.querySelector("#" + iconIds).classList.remove("icon-selected");
    }
  }
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    if (experianceJSON.actionPoints[i].actionId == storyId) {
      experianceJSON.actionPoints[i].actionIconID = id.split("-")[0];
      imagesPointSTory.forEach(icons => {
        if (icons.iconId == id.split("-")[0])
          experianceJSON.actionPoints[i].actionIcon = icons.iconPath;
      });
      if (id.indexOf("customIconImage-") > -1) {
        experianceJSON.actionPoints[i].actionIcon = evn.src;
      }
    }
  }

  document
    .querySelector("#customIconImage-" + storyId)
    .classList.remove("icon-selected");
  document.querySelector("#" + evn.id).classList.add("icon-selected");
  
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    addTeleports(experianceJSON.actionPoints[i]);
  }
}
function changeMarkerTilte(event) {
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
    $("#titleMarkerId-" + actionID).html("Step");
  }
}
function toggleVisibilityOption(event, id) {
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    if (experianceJSON.actionPoints[i].actionId == id) {
      experianceJSON.actionPoints[i].actionPointVisibility = event.value;
      var j = i;
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
    newTeleport.setAttribute("material", "depthTest", "false");
    newTeleport.setAttribute("material", "depthWrite", "false");
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

function editHotspot() {
  if (selectedHotspot) {
    toggleSideNav("storyPointSidenav");
    $("#sequence-accordion")
      .find(".collapse")
      .collapse("hide");
    $("#collapse-" + selectedHotspot.getAttribute("id")).addClass("show");
  }
}

function deleteHotspot(type) {
  selectedHotspot.parentNode.removeChild(selectedHotspot);
  $("#deleteConfirmationModal").modal("hide");
  var id = selectedHotspot.id.split("-")[1];
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    if (experianceJSON.actionPoints[i].actionId == id) {
      experianceJSON.actionPoints.splice(i, 1);
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


  sequenceGenerator(
    experianceJSON,
    settingsVisibilityJson,
    settingsTypeJson,
    imagesPointSTory
  );
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

/* Summernote MAxlength, maxcount and popsnacker */


function openSideNav(sidenavId) {
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function (navigation) {
      if (navigation.classList.contains('active') && navigation.id != sidenavId)
          navigation.classList.remove('active');
  });

  if(document.getElementById(sidenavId).classList.contains("active")){

  }
  else{
      document.getElementById(sidenavId).classList.toggle("active");
      toggleOverlay();
  }
  
}
