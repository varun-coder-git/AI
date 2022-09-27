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
var storyPontData;
var splashImagePath;
var fixOpacity = 0.2;

registerAframeClickDragComponent(window.AFRAME);
var userAgent = navigator.userAgent;
if (userAgent.includes("Mobile") || userAgent.includes("Android") || userAgent.includes("iPhone")) {

  var cameraId = document.querySelector('#cursor');
  cameraId.removeAttribute('cursor');
  cameraId.setAttribute('cursor', {
      'fuse': 'true',
      'fuseTimeout': '1200'
    },
    true);
  cameraId.setAttribute('scale', {
      'x': '1',
      'y': '1',
      'z': '1'
    },
    true);
}

$(document).ready(function () {
  $("#fixOpacity").on("input", function () {
    fixOpacity = $(this).val();
    var displayvalue = '(' + Math.round(fixOpacity * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    storyPontData.Opacity = fixOpacity
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  });
});

jQuery(function ($) {
  var panelList = $("#story-accordion");
  panelList.sortable({
    // Only make the .panel-heading child elements support dragging.
    // Omit this to make then entire <li>...</li> draggable.
    handle: ".panelheader",
    update: function () {
      $(".dragCard", panelList).each(function (index, elem) {
        var $listItem = $(elem),
          newIndex = $listItem.index();
        // Persist the new indices.
      });

      var dragElements = document.getElementsByClassName("dragCard");
      for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
        for (let j = 0; j < dragElements.length; j++) {
          dragElementsId = parseInt(dragElements[j].id);
          if (experianceJSON.actionPoints[i].markerId === dragElementsId) {
           // experianceJSON.actionPoints[i].actionId = j;
            experianceJSON.actionPoints[i].sortOrder = j;
            experianceJSON.actionPoints[i].actionIcon="/act/v0.1/sequence/assets/images/icons/square-"+(j+1)+".png";
          }
        }

        if (i == experianceJSON.actionPoints.length - 1) {
          var sortedArray = sortArray(experianceJSON.actionPoints);
          experianceJSON.actionPoints = sortedArray;
          console.log("sortedArray :", experianceJSON.actionPoints);
        }
        experianceJSON.actionPoints.forEach(sequence => {
          addTeleports(sequence);
        });
      }
    }
  });
});

function sortArray(actionPoints) {
  actionPoints.sort(function (a, b) {
   // return a.actionId - b.actionId;
    return a.sortOrder - b.sortOrder;
  });
  return actionPoints;
}

function initializeCustomization(experienceToCustomize) {
  storyPontData = JSON.parse(experienceToCustomize);
  renderExperience(storyPontData);
  if (storyPontData.launch_text) {
    document.getElementsByClassName("lunchScreenText").value = storyPontData.launch_text;
    $('.lunchScreenText').summernote('code', storyPontData.launch_text);
    var lauchText = $(".lunchScreenText");
    var div = document.createElement("div");
    div.innerHTML = lauchText[0].value;
    var plainText = div.textContent || div.innerText || "";
    var maxLength = 350;
    $('#maxCount').text(plainText.length);
    console.log("Text", $('#maxCount'));
  }

  if (storyPontData.splash_instruction) {
    document.getElementsByClassName("instructionSetForDesktop").value = storyPontData.splash_instruction;
    $('.instructionSetForDesktop').summernote('code', storyPontData.splash_instruction);
  }
  if (storyPontData.splash_android_instruction) {
    document.getElementsByClassName("instructionSetForAndroid").value = storyPontData.splash_android_instruction;
    $('.instructionSetForAndroid').summernote('code', storyPontData.splash_android_instruction);
  }

  if (storyPontData.splash_image) {
    splashImagePath = storyPontData.splash_image;
    var splashImageName = splashImagePath.split("/")[splashImagePath.split("/").length - 1];
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
    var opacity = document.getElementById("fixOpacity")
    opacity.value = storyPontData.Opacity;
    var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    document.getElementById("splashBackground").style.opacity = opacity.value;
  } else {
    var opacity = document.getElementById("fixOpacity")
    opacity.value = fixOpacity;
    var displayvalue = '(' + Math.round(fixOpacity * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  }
  if (storyPontData.splashHeaderColor) {
    var splashHeaderColor = document.getElementById('splashHeaderColor')
    splashHeaderColor.value = storyPontData.splashHeaderColor;
    splashHeaderColor.style.backgroundColor = splashHeaderColor.value;
  }
  if (storyPontData["entry_view"]) {
    $("#CamEntity").attr("rotation", storyPontData["entry_view"]);
  }
}

function setEntryView() {
  if ($('#freezeView').hasClass('disabled')) {
    //Nothing to do here
  } else {
    var cam = document.querySelector("[camera]");
    var pos = cam.getAttribute("rotation");
    var oldpos = 0;
    if (storyPontData["entry_view"]) {
      oldpos = storyPontData["entry_view"].split(" ")[1];
    }
    storyPontData["entry_view"] = "0 " + (pos.y + parseInt(oldpos)) + " 0";
    $('#freezeView').addClass('disabled');
    $('#freezeView').click(toastr.success('Presto! This view is now the Launch View of this Experience.'));
  }
}

$('div#scene').mouseup(function () {
  $('#freezeView').removeClass('disabled');
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
  if (headerFontColor.includes('#')) {
    experianceJSON.splashHeaderColor = headerFontColor;
  } else {
    experianceJSON.splashHeaderColor = '#' + headerFontColor;
  }
  var splashbg = $(".splashBg");
  var splashBgColor = splashbg[0].value;
  if (splashBgColor.includes('#')) {
    experianceJSON.splashBackgroundColor = splashBgColor;
  } else {
    experianceJSON.splashBackgroundColor = '#' + splashBgColor;
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
// var iconData = [{
//     "iconId": 0,
//     "iconName": "Assembly Point",
//     "iconPath": "assets/images/icons/Assembly-Point.png"
//   },
//   {
//     "iconId": 1,
//     "iconName": "Gift",
//     "iconPath": "assets/images/icons/gift.png"
//   },
//   {
//     "iconId": 2,
//     "iconName": "Hand Pointer",
//     "iconPath": "assets/images/icons/Hand-Pointer.png"
//   },
//   {
//     "iconId": 3,
//     "iconName": "Info",
//     "iconPath": "assets/images/icons/Info.png"
//   },
//   {
//     "iconId": 4,
//     "iconName": "Location",
//     "iconPath": "assets/images/icons/Location-Marker.png"
//   },
//   {
//     "iconId": 5,
//     "iconName": "Money",
//     "iconPath": "assets/images/icons/money.png"
//   },
//   {
//     "iconId": 6,
//     "iconName": "Question",
//     "iconPath": "assets/images/icons/Question.png"
//   },
//   {
//     "iconId": 7,
//     "iconName": "Right",
//     "iconPath": "assets/images/icons/right.png"
//   },
//   {
//     "iconId": 8,
//     "iconName": "Smiley",
//     "iconPath": "assets/images/icons/smily.png"
//   },
//   {
//     "iconId": 9,
//     "iconName": "Star",
//     "iconPath": "assets/images/icons/star.png"
//   },
//   {
//     "iconId": 10,
//     "iconName": "Warning",
//     "iconPath": "assets/images/icons/Warning.png"
//   },
//   {
//     "iconId": 11,
//     "iconName": "Wrong",
//     "iconPath": "assets/images/icons/wrong.png"
//   }
// ]

function toggleAssets(type) {
  if (type == 'Image') {
    $('#imageLable').show();
    $('#ImageFileUpload').show();
    $('#videoLable').hide();
    $('#videoFileUpload').hide();
  } else {
    $('#imageLable').hide();
    $('#ImageFileUpload').hide();
    $('#videoLable').show();
    $('#videoFileUpload').show();
  }
}

function renderExperience(storyPontData) {
  experianceJSON = storyPontData;
  $.getJSON("assets/js/settingJson.json", function (result_setting) {
    settingsVisibilityJson = result_setting.Visibility;
    settingsTypeJson = result_setting.Type;
    $.getJSON("assets/js/PointImagesJson.json", function (result_images) {
      imagesPointSTory = result_images.PointImages;
      sequenceGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson, imagesPointSTory);
    });
  });
  var assets = document.querySelector('a-assets');
  var scene = document.querySelector('a-scene');
  if (experianceJSON.imageSkyPath) {
    $('#imageRadio').click();
    var img = document.createElement('img');
    img.setAttribute('id', "imageskyid");
    img.setAttribute('src', experianceJSON.imageSkyPath);
    img.setAttribute('crossorigin', 'anonymous');
    assets.appendChild(img);
    var aSky = '';
    aSky = document.createElement('a-sky');
    aSky.setAttribute('src', experianceJSON.imageSkyPath);
    aSky.setAttribute('crossorigin', 'anonymous');
    scene.appendChild(aSky);
    var name = experianceJSON.imageSkyPath.split('/');
    name = name[name.length - 1];
    $('#customLabelSky').html(name);
  } else {
    $('#videoRadio').click();
    var skyVideo = document.createElement('video');
    skyVideo.setAttribute('id', "videoskyid");
    skyVideo.setAttribute('src', experianceJSON.videoskypath);
    skyVideo.setAttribute('autoplay', 'true');
    skyVideo.setAttribute('loop', '');
    skyVideo.muted = true;
    skyVideo.setAttribute('delay', '4000');
    skyVideo.setAttribute('crossorigin', 'anonymous');
    assets.appendChild(skyVideo);
    var aVideoSphere = '';
    aVideoSphere = document.createElement('a-videosphere');
    aVideoSphere.setAttribute('src', "#videoskyid");
    aVideoSphere.setAttribute('crossorigin', 'anonymous');
    scene.appendChild(aVideoSphere);
    var name = experianceJSON.videoskypath.split('/');
    name = name[name.length - 1];
    $('#customLabelSkyVideo').html(name);

    setTimeout(() => {
      skyVideo.play();
    }, 3000);
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
      experianceJSON.actionPoints[i].actionChecked = '' + event.checked;
    }
  }
}

function getAssetPath(assetPath) {
  if(assetPath==undefined || assetPath==""){
    return;
  }
  if (assetId == 'splashImage') {
    splashImagePath = assetPath;
    var splashImageName = splashImagePath.split("/")[splashImagePath.split("/").length - 1];
    $("#splashImageLable").text(splashImageName);
  } else if (assetId == 'customFileSky') {
    experianceJSON.videoskypath = '';
    experianceJSON.imageSkyPath = assetPath;
    if (!document.querySelector('a-sky')) {
      var assets = document.querySelector('a-assets');
      var scene = document.querySelector('a-scene');
      var img = document.createElement('img');
      img.setAttribute('id', "imageskyid");
      img.setAttribute('src', experianceJSON.imageSkyPath);
      img.setAttribute('crossorigin', 'anonymous');
      assets.appendChild(img);
      var aSky = '';
      aSky = document.createElement('a-sky');
      aSky.setAttribute('src', "#imageskyid");
      aSky.setAttribute('crossorigin', 'anonymous');
      scene.appendChild(aSky);
    } else {
      $('a-videosphere').attr('visible', 'false');
      $('a-sky').attr('visible', 'true');
      $('a-sky').attr('src', '');
      $('a-sky').attr('src', experianceJSON.imageSkyPath);
    }
    var name = assetPath.split('/');
    name = name[name.length - 1];
    $('#customLabelSky').html(name);
  } else if (assetId == 'customFileSkyVideo') {
    var assets = document.querySelector('a-assets');
    var scene = document.querySelector('a-scene');
    $('a-sky').attr('visible', 'false');
    $('#imageskyid').attr('src', '');
    $('a-sky').attr('src', '');
    $('a-sky').attr('src', '#imageskyid');
    $('a-videosphere').attr('visible', 'true');
    if (!document.querySelector('a-videosphere')) {
      var skyVideo = document.createElement('video');
      skyVideo.setAttribute('id', "videoskyid");
      skyVideo.setAttribute('src', assetPath);
      skyVideo.setAttribute('autoplay', 'true');
      skyVideo.muted = true
      // skyVideo.setAttribute('muted', '');
      skyVideo.setAttribute('loop', '');
      skyVideo.setAttribute('crossorigin', 'anonymous');
      assets.appendChild(skyVideo);
      var aVideoSphere = '';
      aVideoSphere = document.createElement('a-videosphere');
      aVideoSphere.setAttribute('src', "#videoskyid");
      aVideoSphere.setAttribute('crossorigin', 'anonymous');
      scene.appendChild(aVideoSphere);
    } else {
      $('#videoskyid').attr('src', assetPath);
      $('a-videosphere').attr('src', '');
      $('a-videosphere').attr('src', '#videoskyid');
    }

    var skyVideoTag = document.querySelector("#videoskyid");
    var name = assetPath.split('/');
    name = name[name.length - 1];
    $('#customLabelSkyVideo').html(name);
    experianceJSON.imageSkyPath = '';
    experianceJSON.videoskypath = assetPath;
    setTimeout(() => {
      skyVideoTag.play();
    }, 3000);
  } else if (assetId.indexOf('customfileinputimage-') > -1) {
    var id = assetId.split('-');
    id = id[id.length - 1];
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
      if (experianceJSON.actionPoints[i].actionId == id) {
        experianceJSON.actionPoints[i].actionPointImage = assetPath;
        var j = i;
      }
    }
    $('#imgID-' + id).attr('src', assetPath);
    var imageName = assetPath.split('/');
    imageName = imageName[imageName.length - 1];
    $('#labelcustomfileinputimage-' + id).html(imageName);
    //$("#imgID-" + id + "").toggleClass("active-story");

  } else if (assetId.indexOf('customfileinputvideo-') > -1) {
    var id = assetId.split('-');
    id = id[id.length - 1];
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
      if (experianceJSON.actionPoints[i].actionId == id) {
        experianceJSON.actionPoints[i].actionPointVideo = assetPath;
        var j = i;
      }
    }
    $('#videoID-' + id).attr('src', assetPath);
    var videoName = assetPath.split('/');
    videoName = videoName[videoName.length - 1];
    $('#labelcustomfileinputvideo-' + id).html(videoName);

  } else if (assetId.indexOf('customfileinputaudio-') > -1) {
    var id = assetId.split('-');
    id = id[id.length - 1];
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
      if (experianceJSON.actionPoints[i].actionId == id) {
        experianceJSON.actionPoints[i].actionPointAudio = assetPath;
        var j = i;
      }
    }
    $('#audioID-' + id).attr('src', assetPath);
    var videoName = assetPath.split('/');
    videoName = videoName[videoName.length - 1];
    $('#labelcustomfileinputaudio-' + id).html(videoName);
  } else if (assetId.indexOf('customFileInputPointImgae-') > -1) {
    var id = assetId.split('-');
    id = id[id.length - 1];
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
      if (experianceJSON.actionPoints[i].actionId == id) {
        experianceJSON.actionPoints[i].actionIcon = assetPath;
        experianceJSON.actionPoints[i].actionIconID = '-i1';
        $('#customIconImage-' + id).attr('src', assetPath);
        $('#sequence-' + id).attr('src', assetPath);
        $('#customIcon-' + id).attr('style', 'display:block');
        for (var j = 0; j < imagesPointSTory.length; j++) {
          var iconIds = imagesPointSTory[j].iconId + '-' + id;
          if (document.querySelector("#" + iconIds).classList.contains('icon-selected')) {
            document.querySelector("#" + iconIds).classList.remove('icon-selected');
          }
        }
        $('#customIconImage-' + id).addClass('icon-selected');

      }
    }
  }
}
var hotspotIndex = 0;
// var placeIndex = 1;

AFRAME.registerComponent('mouseclick', {
  init: function () {
    this.el.addEventListener('click', function () {
      if (selectedHotspot === this)
        selectedHotspot = null;
      else {
        selectedHotspot = this;
        editHotspot();
      }
      toggleToolbarButtons(selectedHotspot);
    });

    this.el.addEventListener('dragend', function () {
      /* var newPosition = this.getAttribute('position');
       var storyId = this.id.split("-")[1];
       // var newpos = newPos(newPosition.x, newPosition.y, newPosition.z);
       var newpos = newPosition.x + " " + newPosition.y + " " + newPosition.z;
       $('#' + this.id).attr('position', newpos)
       for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
         if (experianceJSON.actionPoints[i].actionId == storyId) {
           experianceJSON.actionPoints[i].actionPointPosition = newpos; // newPosition.x + ' ' + newPosition.y + ' ' + newPosition.z;
         }
       }*/

      var allTeleports = document.getElementsByTagName('a-box');
      experianceJSON.actionPoints.forEach(element => {
        for (var i = 0; i < allTeleports.length; i++) {
          var newPosition = allTeleports[i].getAttribute("position");
          var storyId = allTeleports[i].id.split("-")[1];
          var newpos = newPosition.x + " " + newPosition.y + " " + newPosition.z;
          $("#" + allTeleports[i].id).attr("position", newpos);
          if (element.actionId == storyId) {
            element.actionPointPosition = newpos;
          }
        }
      });

    });
  }
});



function toggleSideNav(sidenavId) {
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function (navigation) {
    if (navigation.classList.contains('active') && navigation.id != sidenavId)
      navigation.classList.remove('active');
  });
  if(sidenavId=="storyPointSidenav"){
    if(experianceJSON.actionPoints.length>0){
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
      $("#collapse-sequence-"+experianceJSON.actionPoints[i].actionId).removeClass("show");
    }
    $("#collapse-sequence-0").addClass("show");
    }
  }
  document.getElementById(sidenavId).classList.toggle("active");
  toggleOverlay();
}

function toggleOverlay() {
  var sidenavActive = false;
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function (navigation) {
    if (navigation.classList.contains('active'))
      sidenavActive = true;
  });
  if (sidenavActive)
    document.getElementById("overlay").classList.add('overlay');
  else
    document.getElementById("overlay").classList.remove('overlay');
}

function closeSideNav() {
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function (navigation) {
    navigation.classList.remove('active');
  });
  toggleOverlay();
}

function addNewHotspot(size, type) {
  sequenceIndex;

  if (sequenceIndex < 20) {
    var maxValueOfMarkerId;
    if (experianceJSON.actionPoints.length < 1) {
      maxValueOfMarkerId = 0;
    } else {
      maxValueOfMarkerId = Math.max.apply(
        Math,
        experianceJSON.actionPoints.map(function (o) {
          return o.markerId;
        })
      );
    }

    maxValueOfMarkerId++;

    var markerEl = document.querySelector('#marker');
    var position = markerEl.object3D.getWorldPosition();
    var newActionPoint = {
      "actionChecked": "false",
      "actionIcon": "/act/v0.1/sequence/assets/images/icons/square-"+(experianceJSON.actionPoints.length+1)+".png",
      "actionIconID": "i8",
      "actionId": sequenceIndex,
      "actionPointAudio": "",
      "actionPointHeader": "",
      "actionPointImage": "",
      "actionPointPosition": position.x + " " + position.y + " " + position.z,
      "actionPointText": "",
      "actionPointVideo": "",
      "actionPointVisibility": "Always Visible",
      "actionSize": size,
      "mediatype": "T",
      "type": "Text",
      "markerId": maxValueOfMarkerId,
      "sortOrder":sequenceIndex
    }
    experianceJSON.actionPoints.push(newActionPoint);
    sequenceGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson, imagesPointSTory);

    closeSideNav();
    toggleSideNav('storyPointSidenav');

    $('#story-accordion').find('.collapse').collapse('hide');

    $("#collapse-sequence-" + (sequenceIndex - 1)).addClass("show");
  } else {
    popSnackbar("warning", "Step Limit exceed.");
  }
}



function sequenceGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson, imagesPointSTory) {
  $("#story-accordion").empty();
  sequenceIndex = 0;
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    experianceJSON.actionPoints[i].actionId = i;
    experianceJSON.actionPoints[i].actionIcon="/act/v0.1/sequence/assets/images/icons/square-"+(i+1)+".png";
       
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
      markerTitle = 'Step';
      markerValue = '';
    }
    var imagename = 'Choose Image'
    if (sequence.actionPointImage) {
      imagename = sequence.actionPointImage.split('/');
      imagename = imagename[imagename.length - 1];
    }
    var videoname = 'Choose Video'
    if (sequence.actionPointVideo) {
      videoname = sequence.actionPointVideo.split('/');
      videoname = videoname[videoname.length - 1];
    }
    var audioname = 'Choose Audio'
    if (sequence.actionPointAudio) {
      audioname = sequence.actionPointAudio.split('/');
      audioname = audioname[audioname.length - 1];
    }

    // settings
    var storyAccordion = "<div class='card story-accordion-border' id='story' style='transition:none;'><div class='card-header story-color-accordion panelheader' id='headingTwo'><h3 class='mb-0 dragCard' id='" + sequence.markerId + "'><button style='width:auto;' class='btn btn-link btn-decor' onmouseenter='mouseEnter(&#39;Markers help you overlay Media over the Area images. Configure the Steps on the screen using this option.&#39;);' onmouseleave='mouseLeave()' data-toggle='collapse' data-target='#collapse-sequence-" + sequenceIndex + "' aria-expanded='true' aria-controls='collapse-sequence-" + sequenceIndex + "'><i class='fa' aria-hidden='true'></i><span id='titleStepId-" + sequence.actionId + "'>" + markerTitle + "</span></button><img src='assets/images/up-down-arrow-white.png' style='float: right;margin-top: 3%;margin-right: 3%;'></h3></div><div id='collapse-sequence-" + sequenceIndex + "' class='collapse back-color' aria-labelledby='headingTwo' data-parent='#story-accordion'><div class='card-body'><div class='form-group'><lable for='markerTitleID-" + sequence.actionId + "' class='font_color'>Step Title:</lable><input class='col-12 form-control input_box_trasparent' maxlength='25' onblur='changeMarkerTilte(this)' placeholder='Step Title' type='text' title='Step Title' id='markerTitleID-" + sequence.actionId + "' value='" + markerValue + "'></div><div class='form-group '><lable for='typeDropDownID-" + sequence.actionId + "' class='font_color'>Step Type:</lable><select name='type' id='typeDropDownID-" + sequence.actionId + "' class='col-10 select-dropdown form-control' onchange='toggleTypeOption(this," + sequence.actionId + ")'></select></div><div class='form-group active-story' id= 'textAreaID-" + sequence.actionId + "'> <lable for='place-header-input' class='font_color'>Heading:</lable> <textarea maxlength='40' placeholder='Heading' class='form-control form-group input_box_trasparent' id='place-header-input' onblur='changeHeader(this," + sequence.actionId + ")'>" + sequence.actionPointHeader + "</textarea> <lable for='place-text-input' class='font_color'>Text:</lable> <textarea maxlength='445' placeholder='Text' class='form-control input_box_trasparent' id='place-text-input' onblur='changeText(this," + sequence.actionId + ")'>" + sequence.actionPointText + "</textarea></div><div class='form-group mb-2 active-story' id='textfontcolor-" + sequence.actionId + "'><label>Description Font Color:</label><input class='jscolor pointer' onchange='changeInfofont(this," + sequence.actionId + ")' value='' style='width: 100%'  id='descriptionTextColor-" + sequence.actionId + "'></div><div class='form-group mb-2 active-story' id='textbgcolor-" + sequence.actionId + "'><label>Description Background Color:</label><input class='jscolor  pointer' id='descriptionBgColor-" + sequence.actionId + "'  style='width: 100%' onchange='changeInfoBg(this," + sequence.actionId + ")' value=''></div><div class='form-group  mb-2 active-story' id= 'descriptionbgOpacity-" + sequence.actionId + "'> <div class='row'><div class='col-9'><label style='color:#fff;width: 100%'>Background Opacity (Drag to change):</label></div><div class='col-3' style='text-align: right;'><label style='color:#fff' id='ImageDescriptionRangeValue-" + sequence.actionId + "'></label></div></div><div class='slidecontainer'><input id='descriptionBgOpacity-" + sequence.actionId + "' type='range' min='0.1' max='1' step='0.001' value='' class='slider' oninput='changeOpacity(this," + sequence.actionId + ")'  /></div></div><div class='form-group custom-file active-story' id = 'BrowseImgID-" + sequence.actionId + "'><input type='button' class='custom-file-input handPointer' id='customfileinputimage-" + sequence.actionId + "' onclick='openAssestsPopup(&#39;Image&#39;,this)'> <label class='custom-file-label ' for='customfileinputimage-" + sequence.actionId + "'><span class='text-overflow' id='labelcustomfileinputimage-" + sequence.actionId + "'>" + imagename + "</span></label> <label class='aspect-ratio-style  mb-3' for='startquizbtn' style='font-size: 12px'>Note: Recommended aspect ratio 4:3</label></div><div class=' mb-2 set-image-size active-story' id = 'SelectedImgID-" + sequence.actionId + "'><img src='" + sequence.actionPointImage + "'  class='set-image-size' id = 'imgID-" + sequence.actionId + "' ></div><div class='form-group custom-file mb-3 set-video-size active-story' id = 'SelectedVidID-" + sequence.actionId + "'><video class='set-video-size' controls='controls' id='videoID-" + sequence.actionId + "' src='" + sequence.actionPointVideo + "'></video></div><div class='form-group custom-file mb-2 active-story' id = 'BrowseVidID-" + sequence.actionId + "'><input type='button' class='custom-file-input handPointer' id='customfileinputvideo-" + sequence.actionId + "' onclick='openAssestsPopup(&#39;Video&#39;,this)'> <label class='custom-file-label' for='customfileinputvideo-" + sequence.actionId + "'><span class='text-overflow' id='labelcustomfileinputvideo-" + sequence.actionId + "'>" + videoname + "</span></label> </div> <div class='form-group custom-file mb-2 active-story' id = 'BrowseAudID-" + sequence.actionId + "'><input type='button' class='custom-file-input handPointer' id='customfileinputaudio-" + sequence.actionId + "' onclick='openAssestsPopup(&#39;Audio&#39;,this)'><label class='custom-file-label' for='custom-file-input-audio'><span class='text-overflow' id='labelcustomfileinputaudio-" + sequence.actionId + "' class='text-overflow'>" + audioname + "</span></label></div><div class='form-group custom-file active-story mt-3' id = 'SelectedAudID-" + sequence.actionId + "'><audio class='audio-width' controls id='audioID-" + sequence.actionId + "' src='" + sequence.actionPointAudio + "'></audio></div></div></div></div></div></div>";
    $("#story-accordion").append(storyAccordion);
    jscolor.installByClassName("jscolor");
    if (sequence.actionPointColor) {
      var fontcolor = document.getElementById("descriptionTextColor-" + sequence.actionId);
      fontcolor.style.backgroundColor = sequence.actionPointColor;
    }
    if (sequence.actionPointBgColor) {
      var fontcolor = document.getElementById("descriptionBgColor-" + sequence.actionId);
      fontcolor.style.backgroundColor = sequence.actionPointBgColor;
    } else {
      var fontcolor = document.getElementById("descriptionBgColor-" + sequence.actionId);
      fontcolor.style.backgroundColor = "#000";
    }
    if (sequence.actionPointBgOpacity) {
      var opacity = document.getElementById("descriptionBgOpacity-" + sequence.actionId);
      opacity.value = sequence.actionPointBgOpacity;
      var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
      document.getElementById("ImageDescriptionRangeValue-" + sequence.actionId).innerText = displayvalue
    } else {
      var opacity = document.getElementById("descriptionBgOpacity-" + sequence.actionId);
      opacity.value = 0.6;
      var default_value = '(' + Math.round(0.6 * 100) + '%)';
      document.getElementById("ImageDescriptionRangeValue-" + sequence.actionId).innerText = default_value;
    }

    settingsVisibilityJson.forEach(visibility => {
      setVisibility = visibility.visibility;

      if (uniqueVisibility === setVisibility) {
        var visi = "<option value='" + visibility.visibility + "' selected>" + setVisibility + "</option>";
      } else {
        var visi = "<option  value='" + visibility.visibility + "'>" + setVisibility + "</option>";
      }
      $("#visibilityDropDownID-" + sequence.actionId + "").append(visi);
      // drop down bind for visibility
    });
    settingsTypeJson.forEach(type => {
      setType = type.type;
      if (uniqueType === setType) {
        var typeP = "<option  value='" + type.typeID + "' selected>" + setType + "</option>";
        toggleType(setType, sequence.actionId);
      } else {
        var typeP = "<option  value='" + type.typeID + "'>" + setType + "</option>";
      }
      $("#typeDropDownID-" + sequence.actionId + "").append(typeP);
    });
    imagesPointSTory.forEach(pointImages => {
      setIcon = pointImages.iconId;
      if (uniqueIcon === setIcon) {
        var icon = "<div class='col-3 icon-padding' ><img src=" + pointImages.iconPath + " onclick='changesequenceIcon(this)' alt='location' class='image_size img-responsive icon-selected' id= '" + pointImages.iconId + "-" + sequence.actionId + "'/></div>";
      } else {
        var icon = "<div class='col-3 icon-padding' ><img src=" + pointImages.iconPath + " onclick='changesequenceIcon(this)' alt='location' class='image_size img-responsive'id= '" + pointImages.iconId + "-" + sequence.actionId + "' /></div>";
      }
      $("#ptIconDivID-" + sequence.actionId + "").append(icon);
    });
    if (uniqueIcon == '-i1') {
      $('#customIconImage-' + sequence.actionId).attr('src', sequence.actionIcon);
      $('#customIcon-' + sequence.actionId).attr('style', 'display:block');
      $('#customIconImage-' + sequence.actionId).attr('class', 'image_size img-responsive icon-selected');
    }
    addTeleports(sequence);
    sequenceIndex++;
  });

}

function changesequenceIcon(evn) {
  var id = evn.id
  var storyId = id.split('-')[1];
  for (var i = 0; i < imagesPointSTory.length; i++) {
    var iconIds = imagesPointSTory[i].iconId + '-' + storyId;
    if (document.querySelector("#" + iconIds).classList.contains('icon-selected')) {
      document.querySelector("#" + iconIds).classList.remove('icon-selected');
    }
  }
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    if (experianceJSON.actionPoints[i].actionId == storyId) {
      experianceJSON.actionPoints[i].actionIconID = id.split('-')[0];
      imagesPointSTory.forEach(icons => {
        if (icons.iconId == id.split('-')[0])
          experianceJSON.actionPoints[i].actionIcon = icons.iconPath;

      });
      if (id.indexOf("customIconImage-") > -1) {
        experianceJSON.actionPoints[i].actionIcon = evn.src;
      }

    }
  }

  document.querySelector("#customIconImage-" + storyId).classList.remove('icon-selected');
  document.querySelector("#" + evn.id).classList.add('icon-selected');


  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    addTeleports(experianceJSON.actionPoints[i]);
  }
  // sequenceGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson, imagesPointSTory);
}

function changeMarkerTilte(event) {
  var actionID = event.id.split('-')[1];
  if (event.value) {
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
      if (experianceJSON.actionPoints[i].actionId == actionID) {
        experianceJSON.actionPoints[i].markarTitle = event.value;
        var j = i;
      }
    }
    $('#titleStepId-' + actionID).html(event.value);
  } else {
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
      if (experianceJSON.actionPoints[i].actionId == actionID) {
        experianceJSON.actionPoints[i].markarTitle = event.value;
        var j = i;
      }
    }
    $('#titleStepId-' + actionID).html('Step');
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

function changeText(event, id) {
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    if (experianceJSON.actionPoints[i].actionId == id) {
      experianceJSON.actionPoints[i].actionPointText = event.value;
    }
  }
}

function changeInfofont(event, id) {
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    if (experianceJSON.actionPoints[i].actionId == id) {
      if ((event.value).includes('#')) {
        experianceJSON.actionPoints[i].actionPointColor = event.value;
      } else {
        experianceJSON.actionPoints[i].actionPointColor = '#' + event.value;
      }
    }
  }
}

function changeInfoBg(event, id) {
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    if (experianceJSON.actionPoints[i].actionId == id) {
      if ((event.value).includes('#')) {
        experianceJSON.actionPoints[i].actionPointBgColor = event.value;
      } else {
        experianceJSON.actionPoints[i].actionPointBgColor = '#' + event.value;
      }
    }
  }
}

function changeOpacity(event, id) {
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    if (experianceJSON.actionPoints[i].actionId == id) {
      experianceJSON.actionPoints[i].actionPointBgOpacity = event.value;
      var displayvalue = '(' + Math.round(event.value * 100) + '%)';
      var newval = document.getElementById("ImageDescriptionRangeValue-" + id);
      newval.innerText = displayvalue;
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

function toggleTypeOption(mediatype, actionId) {
  var typeMedia = mediatype.selectedOptions["0"].text;
  $("#textAreaID-" + actionId + "").addClass("active-story");
  $("#textfontcolor-" + actionId + "").addClass("active-story");
  $('#descriptionbgOpacity-' + actionId + "").addClass("active-story");
  $("#textbgcolor-" + actionId + "").addClass("active-story");
  $("#SelectedImgID-" + actionId + "").addClass("active-story");
  $("#BrowseImgID-" + actionId + "").addClass("active-story");
  $("#SelectedAudID-" + actionId + "").addClass("active-story");
  $("#BrowseAudID-" + actionId + "").addClass("active-story");
  $("#SelectedVidID-" + actionId + "").addClass("active-story");
  $("#BrowseVidID-" + actionId + "").addClass("active-story");
  toggleType(typeMedia, actionId);
}

function toggleType(mediatype, actionId) {
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    if (experianceJSON.actionPoints[i].actionId == actionId) {
      experianceJSON.actionPoints[i].type = mediatype;

      var j = i;
    }
  }
  switch (mediatype) {

    case 'Text':
      $("#textAreaID-" + actionId + "").toggleClass("active-story");
      $("#textfontcolor-" + actionId + "").toggleClass("active-story");
      $("#descriptionbgOpacity-" + actionId + "").toggleClass("active-story");
      $("#textbgcolor-" + actionId + "").toggleClass("active-story");
      experianceJSON.actionPoints[j].mediatype = 'T';
      break;
    case 'Image':
      $("#SelectedImgID-" + actionId + "").toggleClass("active-story");
      $("#BrowseImgID-" + actionId + "").toggleClass("active-story");
      experianceJSON.actionPoints[j].mediatype = 'I';
      break;
    case 'Audio':
      $("#SelectedAudID-" + actionId + "").toggleClass("active-story");
      $("#BrowseAudID-" + actionId + "").toggleClass("active-story");
      experianceJSON.actionPoints[j].mediatype = 'A';
      break;
    case 'Video':
      $("#SelectedVidID-" + actionId + "").toggleClass("active-story");
      $("#BrowseVidID-" + actionId + "").toggleClass("active-story");
      experianceJSON.actionPoints[j].mediatype = 'V';
      break;
    case 'Image with Text':
      $("#textAreaID-" + actionId + "").toggleClass("active-story");
      $("#textfontcolor-" + actionId + "").toggleClass("active-story");
      $("#textbgcolor-" + actionId + "").toggleClass("active-story");
      $("#descriptionbgOpacity-" + actionId + "").toggleClass("active-story");
      $("#SelectedImgID-" + actionId + "").toggleClass("active-story");
      $("#BrowseImgID-" + actionId + "").toggleClass("active-story");
      experianceJSON.actionPoints[j].mediatype = 'IT';
      break;
    case 'Audio with Text':
      $("#textAreaID-" + actionId + "").toggleClass("active-story");
      $("#textfontcolor-" + actionId + "").toggleClass("active-story");
      $("#textbgcolor-" + actionId + "").toggleClass("active-story");
      $("#descriptionbgOpacity-" + actionId + "").toggleClass("active-story");
      $("#SelectedAudID-" + actionId + "").toggleClass("active-story");
      $("#BrowseAudID-" + actionId + "").toggleClass("active-story");
      experianceJSON.actionPoints[j].mediatype = 'AT';
      break;
    case 'Audio with Image':
      $("#SelectedImgID-" + actionId + "").toggleClass("active-story");
      $("#BrowseImgID-" + actionId + "").toggleClass("active-story");
      $("#SelectedAudID-" + actionId + "").toggleClass("active-story");
      $("#BrowseAudID-" + actionId + "").toggleClass("active-story");
      experianceJSON.actionPoints[j].mediatype = 'AI';
      break;
    case 'Audio with Text and Image':
      $("#textAreaID-" + actionId + "").toggleClass("active-story");
      $("#textfontcolor-" + actionId + "").toggleClass("active-story");
      $("#textbgcolor-" + actionId + "").toggleClass("active-story");
      $("#descriptionbgOpacity-" + actionId + "").toggleClass("active-story");
      $("#SelectedImgID-" + actionId + "").toggleClass("active-story");
      $("#BrowseImgID-" + actionId + "").toggleClass("active-story");
      $("#SelectedAudID-" + actionId + "").toggleClass("active-story");
      $("#BrowseAudID-" + actionId + "").toggleClass("active-story");
      experianceJSON.actionPoints[j].mediatype = 'AIT';
      break;
    case 'Video with Text':
      $("#textAreaID-" + actionId + "").toggleClass("active-story");
      $("#textfontcolor-" + actionId + "").toggleClass("active-story");
      $("#textbgcolor-" + actionId + "").toggleClass("active-story");
      $("#descriptionbgOpacity-" + actionId + "").toggleClass("active-story");
      $("#SelectedVidID-" + actionId + "").toggleClass("active-story");
      $("#BrowseVidID-" + actionId + "").toggleClass("active-story");
      experianceJSON.actionPoints[j].mediatype = 'VT';
      break;
  }
}
// reading browse paths
document.addEventListener('DOMContentLoaded', function () {});

function VideoLoad(vid) {
  vidID = vid.attributes.id.nodeValue;
  vidName = vid.files["0"].name;
  if (vid.files && vid.files["0"]) {
    var fileInputLabel = document.getElementById('label-' + vidID);
    fileInputLabel.innerText = vidName;
    var reader = new FileReader();
    reader.onload = function (e) {
      VideoPath = e.target.result
    }
    reader.readAsDataURL(vid.files["0"]);
  }
}

function AudioLoad(aud) {
  audID = aud.attributes.id.nodeValue;
  audName = aud.files["0"].name;
  if (aud.files && aud.files["0"]) {
    var fileInputLabel = document.getElementById('label-' + audID);
    fileInputLabel.innerText = audName;
    var reader = new FileReader();
    reader.onload = function (e) {
      AudioPath = e.target.result
    }
    reader.readAsDataURL(aud.files["0"]);
  }
}

function IconLoad(icon) {
  iconID = icon.attributes.id.nodeValue;
  iconName = icon.files["0"].name;
  if (icon.files && icon.files["0"]) {
    var fileInputLabel = document.getElementById('label-' + iconID);
    fileInputLabel.innerText = iconName;
    var reader = new FileReader();
    reader.onload = function (e) {
      PointIconPath = e.target.result
    }
    reader.readAsDataURL(icon.files["0"]);
  }
}

function CustomizeData() {
  $.getJSON('assets/js/sequenceJson.json', function (data) {
    var Sky = document.getElementById('skyImageID');
    data.sequences.imageSkyPath = Sky.attributes[1].baseURI();

  });
}

function addTeleports(Story) {
  var aSceneEl = document.querySelector('a-scene');
  var radiusAction = "";
  if (Story) {
    if (Story.actionSize === "small") {
      radiusAction = 1.5;
    } else if (Story.actionSize === "medium") {
      radiusAction = 2.5;
    } else {
      radiusAction = 4;
    }
    if (document.querySelector('#sequence-' + Story.actionId)) {
      $('#sequence-' + Story.actionId).remove();
    }
    var newTeleport = document.createElement('a-box');
    newTeleport.setAttribute('id', 'sequence-' + Story.actionId);
    newTeleport.setAttribute('mouseclick', '');
    newTeleport.setAttribute('material', 'src', Story.actionIcon);
    newTeleport.setAttribute('material', 'transparent', 'true');
    newTeleport.setAttribute('geometry', 'height', radiusAction);
    newTeleport.setAttribute('geometry', 'width', radiusAction);
    newTeleport.setAttribute('click-drag', '');
    newTeleport.setAttribute('shader', "flat");
    newTeleport.setAttribute('shadow', 'cast', 'true');
    newTeleport.setAttribute('position', Story.actionPointPosition);
    newTeleport.setAttribute('look-at', 'src', '#main-camera');
    aSceneEl.appendChild(newTeleport);
  }
}
//    end reading browse path
function saveAllHotspots() {
  var allPlaces = document.querySelectorAll('a-sky');
  allPlaces.forEach(place => {});
  var allHotspots = document.querySelectorAll('a-sphere');
  var nodeId = 0;
  allHotspots.forEach(hotspot => {
    var hotspotProp = {};
    hotspotProp.hotspotName = hotspot.getAttribute('name');
    hotspotProp.nodeId = nodeId;
    hotspotProp.position = hotspot.object3D.position;
    hotspotsToSave.push(hotspotProp);
    nodeId++;
  });
}

function toggleToolbarButtons(selectedSphere1) {
  if (selectedSphere1 === null || selectedSphere1 === undefined) {
    document.getElementById('editTeleport').classList.add('disabled');
    document.getElementById('removeTeleport').classList.add('disabled');
  } else {
    document.getElementById('editTeleport').classList.remove('disabled');
    document.getElementById('removeTeleport').classList.remove('disabled');
  }
}

function editHotspot() {
  if (selectedHotspot) {
    toggleSideNav('storyPointSidenav');
    $('#story-accordion').find('.collapse').collapse('hide');
    $("#collapse-" + selectedHotspot.getAttribute('id')).addClass("show");
  }
}

function deleteHotspot(type) {
  var getId=selectedHotspot.id;
    $("#"+getId).remove();
  // selectedHotspot.parentNode.removeChild(selectedHotspot);
  $('#deleteConfirmationModal').modal('hide');
  var id = selectedHotspot.id.split('-')[1];
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    if (experianceJSON.actionPoints[i].actionId == id) {
      experianceJSON.actionPoints.splice(i, 1);
    }
  }
  
  var sphereArray = document.querySelectorAll('a-box');
  if (sphereArray.length > 0) {
    sphereArray.forEach(sphere => {
      sphere.parentNode.removeChild(sphere);
    });
  }
  selectedHotspot = null;
  toggleToolbarButtons(selectedHotspot);
  sequenceGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson, imagesPointSTory);
}

function addLaunchScreenText() {
  experianceJSON.launch_text = document.getElementById("lunchScreenText").value;
}

function hideNav() {
  $(".sidenav").removeClass('active');
  $("#overlay").removeClass('overlay');
};

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
  return newx + ' ' + newy + ' ' + newz;
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
  setTimeout(function () {
    x.className = x.className.replace("show " + type, "");
  }, 3000);
}
$("#summernote").bind("change paste keyup", function () {});

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
