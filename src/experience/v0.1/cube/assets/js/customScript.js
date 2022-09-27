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
var augmentedInspectData;
var splashImagePath;
var fixOpacity = 0.2;
var deleteIconId;

$(document).ready(function() {
  $("#fixOpacity").on("input", function() {
    fixOpacity = $(this).val();
    var displayvalue = "(" + Math.round(fixOpacity * 100) + "%)";
    document.getElementById("rangeValue").innerText = displayvalue;
    augmentedInspectData.Opacity = fixOpacity;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  });

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
});

function initializeCustomization(experienceToCustomize) {
  augmentedInspectData = JSON.parse(experienceToCustomize);
  renderExperience(augmentedInspectData);
  if (augmentedInspectData.launch_text) {
    document.getElementsByClassName("lunchScreenText").value =
      augmentedInspectData.launch_text;
    $(".lunchScreenText").summernote("code", augmentedInspectData.launch_text);
    var lauchText = $(".lunchScreenText");
    var div = document.createElement("div");
    div.innerHTML = lauchText[0].value;
    var plainText = div.textContent || div.innerText || "";
    var maxLength = 350;
    $("#maxCount").text(plainText.length);
  }
  if (augmentedInspectData.splash_instruction)
    document.getElementsByClassName("instructionSetForDesktop").value =
      augmentedInspectData.splash_instruction;
  $(".instructionSetForDesktop").summernote(
    "code",
    augmentedInspectData.splash_instruction
  );

  if (augmentedInspectData.splash_android_instruction) {
    document.getElementsByClassName("instructionSetForAndroid").value = augmentedInspectData.splash_android_instruction;
    $('.instructionSetForAndroid').summernote('code', augmentedInspectData.splash_android_instruction);
  }

  if (augmentedInspectData.splash_image) {
    splashImagePath = augmentedInspectData.splash_image;
    var splashImageName = splashImagePath.split("/")[
      splashImagePath.split("/").length - 1
    ];
    $("#splashImageLable").text(splashImageName);
  }
  if (augmentedInspectData.splashBackgroundColor) {
    var splashBackground = document.getElementById("splashBackground");
    splashBackground.value = augmentedInspectData.splashBackgroundColor;
    splashBackground.style.backgroundColor = splashBackground.value;
  } else {
    var splashBackground = document.getElementById("splashBackground");
    splashBackground.style.backgroundColor = "#8F8F8F";
    splashBackground.value = "#8F8F8F";
  }
  if (augmentedInspectData.Opacity) {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = augmentedInspectData.Opacity;
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
  if (augmentedInspectData.splashHeaderColor) {
    var splashHeaderColor = document.getElementById("splashHeaderColor");
    splashHeaderColor.value = augmentedInspectData.splashHeaderColor;
    splashHeaderColor.style.backgroundColor = splashHeaderColor.value;
  }
  if (augmentedInspectData["entry_view"]) {
    $("#CamEntity").attr("rotation", augmentedInspectData["entry_view"]);
  }
}

// AFRAME.registerComponent('mousedrag', {
//     init: function () {
//         this.el.addEventListener('mouseup', function () {
//             $('#freezeView').removeClass('disabled');
//         });
//     }
// });

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
  } else {
    experianceJSON.Opacity = fixOpacity;
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
var imagesAugmentedInspect = null;
var uniqueVisibility = null;
var setVisibility = null;
var uniqueType = null;
var setType = null;
var SkyImagePath = null;
var ImagePath = null;
var PointIconPath = null;
var AudioPath = null;
var VideoPath = null;
var augmentedInspectIndex = 0;

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

function renderExperience(augmentedInspectData) {
  experianceJSON = augmentedInspectData;
  $.getJSON("assets/js/settingJson.json", function(result_setting) {
    settingsVisibilityJson = result_setting.Visibility;
    settingsTypeJson = result_setting.Type;
    augmentedInspectGenerator(
      experianceJSON,
      settingsVisibilityJson,
      settingsTypeJson,
      imagesAugmentedInspect
    );

    // $.getJSON("assets/js/PointImagesJson.json", function (result_images) {
    //     imagesAugmentedInspect = result_images.PointImages;
    //     augmentedInspectGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson, imagesAugmentedInspect);
    // });
  });
}

var assettype;
var assetId;

function getAssetType() {
  return assettype;
}
function objectImage(image){
  $("#markerInspectAsset").attr("src", "");
  $("#markerInspectAsset").removeClass('active-story');
  $("#markerInspectAsset").attr("src", image + "?" + new Date().getTime());
}

function getThreeDAssetPath(
  mtlPath,
  objPath,
  gltfPath,
  parentFolder,
  rotation,
  scale,
  modelImage
) {
  var id = assetId.split("-");
  id = id[id.length - 1];

  experianceJSON.actionPoints[id].obj_scale = scale;
  experianceJSON.actionPoints[id].obj_rotation = rotation;
  experianceJSON.actionPoints[id].obj_image = modelImage;
  // $("#markerInspectAsset").attr("src", "");
  // $("#markerInspectAsset").attr("src", modelImage + "?" + new Date().getTime());
  if (gltfPath != "" && gltfPath != undefined) {
    experianceJSON.actionPoints[id].model_name = parentFolder;
    experianceJSON.actionPoints[id].model = gltfPath;
    experianceJSON.actionPoints[id].object_type = "gltf";
    // var j = i;
    // $('#imgID-' + id).attr('src', assetPath);
    // var imageName = assetPath.split('/');
    // imageName = imageName[imageName.length - 1];
    // experianceJSON.actionPoints[i].image_name = imageName;
    // $('#labelcustomfileinputimage-' + id).html(imageName);
  } else if (objPath != "" && objPath != undefined) {
    experianceJSON.actionPoints[id].model_name = parentFolder;
    experianceJSON.actionPoints[id].model = objPath;
    experianceJSON.actionPoints[id].mtl = mtlPath;
    experianceJSON.actionPoints[id].object_type = "obj";
  }
  $("#labelcustomfileinputModel-" + id).html(parentFolder);
}
function openThreeDAssestsPopup(type, event,id) {
  var model=experianceJSON.actionPoints[id].model;
  var scale=experianceJSON.actionPoints[id].obj_scale ;
 var rotation= experianceJSON.actionPoints[id].obj_rotation ;
  assettype = type;
  assetId = event.id;
  window.parent.triggerThreeDAssetsPopup(model,scale,rotation);
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
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
      if (experianceJSON.actionPoints[i].actionId == id) {
        experianceJSON.actionPoints[i].image_path = assetPath;
        var res = assetPath.substr(
          assetPath.lastIndexOf("."),
          assetPath.length
        );
        experianceJSON.actionPoints[i].pattFile_path = assetPath.replace(
          res,
          ".patt"
        );
        var j = i;
       // $("#imgID-" + id).attr("src", assetPath);
        $("#displayMarkerImage-" + id).attr("src", assetPath);
        $("#markerImageDisplay").attr("src", assetPath);

        var imageName = assetPath.split("/");
        imageName = imageName[imageName.length - 1];
        experianceJSON.actionPoints[i].image_name = imageName;
        $("#labelcustomfileinputimage-" + id).html(imageName);
        generateMarkerPatternFile(imageName, assetPath);
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
        for (var i = 0; i < imagesAugmentedInspect.length; i++) {
          var iconIds = imagesAugmentedInspect[i].iconId + "-" + id;
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

function addNewHotspot(size, type) {
  augmentedInspectIndex;
  if (experianceJSON.actionPoints.length == 1) {
    // $("#customLabelNewImage").html("<span>Choose Image</span>");
    // $("#customLabelAudio-0").html("<span>Choose Audio</span>");
    // document.querySelector("#newImageDiscription").value = "";
    //popSnackbar("warning", "You can select only 10 markers.");
    return;
  }
  var markerEl = document.querySelector("#marker");
  var newActionPoint = {
    // image_path: "",
    // pattFile_path: "",
    // image_name: "",
    model_name: "",
    object_type: "",
    obj_scale: "",
    obj_rotation: "0 0 0",
    model: "",
    mtl: "",
    obj_image: "",
    // actionId: "",
    // type: "gltf file"
  };
  experianceJSON.actionPoints.push(newActionPoint);
  augmentedInspectGenerator(
    experianceJSON,
    settingsVisibilityJson,
    settingsTypeJson,
    imagesAugmentedInspect
  );
}

function augmentedInspectGenerator(
  experianceJSON,
  settingsVisibilityJson,
  settingsTypeJson,
  imagesAugmentedInspect
) {
  $("#augmentedInpsect-accordion").empty();
  $("#tile-row").empty();
  augmentedInspectIndex = 0;
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    experianceJSON.actionPoints[i].actionId = i;
    if (
      experianceJSON.actionPoints[i].obj_scale == null ||
      experianceJSON.actionPoints[i].obj_scale == undefined ||
      experianceJSON.actionPoints[i].obj_scale == ""
    ) {
      experianceJSON.actionPoints[i].obj_scale = "1 1 1";
    }
  }

  experianceJSON.actionPoints.forEach(augmentedInpsect => {
    // uniqueVisibility = augmentedInpsect.actionPointVisibility;
    uniqueType = augmentedInpsect.type;
    // uniqueIcon = augmentedInpsect.actionIconID;
    markerTitle = augmentedInpsect.markarTitle;
    markerValue = augmentedInpsect.markarTitle;
    // ChekedTrue = augmentedInpsect.actionChecked;
    // if (ChekedTrue == "true") {
    //     var checkedboxTrue = "checked";
    // }
    // if(augmentedInpsect)

    if (!markerTitle) {
      markerTitle = "Marker";
      markerValue = "";
    }
    var imagename = "Choose Image";
    if (augmentedInpsect.image_path) {
      imagename = augmentedInpsect.image_path.split("/");
      imagename = imagename[imagename.length - 1];
    }
    var modelName = "Choose 3D Model";
    if (augmentedInpsect.model_name) {
      modelName = augmentedInpsect.model_name;
    }

    
    var augmentedInspectAccordion =
       
     
      "<div class='form-group '><lable for='typeDropDownID-" +
      augmentedInpsect.actionId +
      "' class='font_color'>3D  Model:</lable></div><div class='form-group '></label></div><div class='form-group custom-file mb-3' id='BrowseImgID-" +
      augmentedInpsect.actionId +
      "'><input type='button' class='custom-file-input handPointer' id='customfileModel-" +
      augmentedInpsect.actionId +
      "' onclick='openThreeDAssestsPopup(&#39;3DObjects&#39;,this,"+augmentedInpsect.actionId +")'><label class='custom-file-label' for='customfileinputModel-" +
      augmentedInpsect.actionId +
      "' 'style=' margin-top: 25px;'><span class='text-overflow' id='labelcustomfileinputModel-" +
      augmentedInpsect.actionId +
      "'>" +
      modelName +
      "</span></label></div></div></div></div>";

    $("#augmentedInpsect-accordion").append(augmentedInspectAccordion);
    if (augmentedInpsect.image_path) {
      $("#markerImageDisplay").attr("src", augmentedInpsect.image_path);
      $("#displayMarkerImage-" + augmentedInspectIndex).attr(
        "src",
        augmentedInpsect.image_path
      );
    } else {
      $("#markerImageDisplay").attr("src", "assets/images/default.jpg");
      $("#displayMarkerImage-" + augmentedInspectIndex).attr(
        "src",
        "assets/images/default.jpg"
      );
    }
    if (augmentedInpsect.obj_image) {
      
      $("#markerInspectAsset").removeClass('active-story');
      $("#markerInspectAsset").attr("src", augmentedInpsect.obj_image+"?"+new Date().getTime());
    } else {
      $("#markerInspectAsset").addClass('active-story');
      $("#markerInspectAsset").attr("src", "");
    }

    jscolor.installByClassName("jscolor");

    augmentedInspectIndex++;
  });
}

function bindMarkerAndOverlayedAsset(id) {
  for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
    if (experianceJSON.actionPoints[i].actionId == id) {
      var assetPath = experianceJSON.actionPoints[i].image_path;
      var modelImage = experianceJSON.actionPoints[i].obj_image;
      if (modelImage == "" || modelImage == undefined) {
        // modelImage = "assets/images/default.jpg";
      }
      if (assetPath == "" || assetPath == undefined) {
        // assetPath = "assets/images/default.jpg";
      }
     $("#imgID-" + i).attr("src", assetPath);
      $("#markerImageDisplay").attr("src", assetPath);
      if(modelImage){
      $("#markerInspectAsset").attr("src", modelImage+"?"+new Date().getTime());
      $("#markerInspectAsset").removeClass('active-story');
      }else{
        
      $("#markerInspectAsset").addClass('active-story');
      }
    }
  }
}

function editHotspot(id) {
  // console.log("In edithotspot");
  if(experianceJSON.actionPoints.length==0){
    addNewHotspot('large', 'teleport');
  }else{
  bindMarkerAndOverlayedAsset(id);
  }
  openSideNav("storyPointSidenav");
  $("#augmentedInpsect-accordion")
    .find(".collapse")
    .collapse("hide");
  $("#collapse-storypoint-" + id).addClass("show");
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
    $("#titleMarkerId-" + actionID).html("Marker");
  }
}



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
  augmentedInspectGenerator(
    experianceJSON,
    settingsVisibilityJson,
    settingsTypeJson,
    imagesAugmentedInspect
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



function deleteSelectedHotspot() {
  var id = parseInt(deleteIconId);
  experianceJSON.actionPoints.splice(id, 1);
  augmentedInspectGenerator(
    experianceJSON,
    settingsVisibilityJson,
    settingsTypeJson,
    imagesAugmentedInspect
  );
  $("#deleteConfirmationModal").modal("hide");
}
/* Summernote MAxlength, maxcount and popsnacker */

/* sidebar toogle for marker*/

function openSideNav(sidenavId) {
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function(navigation) {
    if (navigation.classList.contains("active") && navigation.id != sidenavId)
      navigation.classList.remove("active");
  });

  if (document.getElementById(sidenavId).classList.contains("active")) {
  } else {
    document.getElementById(sidenavId).classList.toggle("active");
    toggleOverlay();
  }
}

function printMarker() {
  generateMarkerImageFile(augmentedInspectData);
}

