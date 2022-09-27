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
var img = document.getElementById("markerOverlayAsset");
var imgPath = img.getAttribute("src");

function draw(setVideo, canvas, img) {
  // get the canvas context for drawing
  var imgPath = img.getAttribute("src");
  var context = canvas.getContext("2d");

  // draw the video contents into the canvas x, y, width, height
  context.drawImage(setVideo, 0, 0, canvas.width, canvas.height);

  // get the image data from the canvas object
  var dataURL = canvas.toDataURL();

  // set the source of the img tag
  img.setAttribute("src", "");
  img.setAttribute("src", dataURL);
}

// function setVideoInitialScreen(){
//     // var img= document.getElementById("markerOverlayAsset");
//     // var img="";

//     var setVideo= document.getElementById("videoID-0")
//     var canvas = document.getElementById("canvas");
//     draw( setVideo, canvas, img);
//   //   setVideo.addEventListener('loadstart', function(){
//   //     draw( setVideo, canvas, img);
//   // }, false);

// };

$(document).ready(function () {
  $("#fixOpacity").on("input", function () {
    fixOpacity = $(this).val();
    var displayvalue = "(" + Math.round(fixOpacity * 100) + "%)";
    document.getElementById("rangeValue").innerText = displayvalue;
    augmentedOverlayData.Opacity = fixOpacity;
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

function checkTextAreaLength(el) {
  var Length =el.value.length;
  var maxLen = 250;
  if (Length >= maxLen) {
    popSnackbar("warning", "Limit exceed.");
    return;
  }
}

function initializeCustomization(experienceToCustomize) {
  augmentedOverlayData = JSON.parse(experienceToCustomize);
  for (
    let index = 0;
    index < augmentedOverlayData.actionMarkers.length;
    index++
  ) {
    if (index + 1 == augmentedOverlayData.actionMarkers.length) {
      var assetType = augmentedOverlayData.actionMarkers.slice(-1).pop().type;
      if (assetType == "Image") {
        if (
          augmentedOverlayData.actionMarkers.slice(-1).pop().actionPointImage
        ) {
          $("#markerOverlayAsset").attr(
            "src",
            augmentedOverlayData.actionMarkers.slice(-1).pop().actionPointImage
          );
          $("#assetNameVideo").html("");
          $("#assetNameAudio").html("");
          $("#assetNameImage").html("");
          $("#assetNameImage").html("");
          $("#assetNameImage").html(
            augmentedOverlayData.actionMarkers
              .slice(-1)
              .pop()
              .actionPointImage.split("/")
              .pop()
          );
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
      } else if (assetType == "Video") {
        $("#markerOverlayAsset").attr("src", "assets/images/imgplay.jpg");
        $("#assetNameVideo").html("");
        $("#assetNameAudio").html("");
        $("#assetNameImage").html("");
        $("#assetNameVideo").html(
          augmentedOverlayData.actionMarkers
            .slice(-1)
            .pop()
            .actionPointVideo.split("/")
            .pop()
        );
      } else if (assetType == "Audio") {
        $("#markerOverlayAsset").attr("src", "assets/images/imgmusic.jpg");
        $("#assetNameAudio").html("");
        $("#assetNameVideo").html("");
        $("#assetNameImage").html("");
        $("#assetNameAudio").html(
          augmentedOverlayData.actionMarkers
            .slice(-1)
            .pop()
            .actionPointAudio.split("/")
            .pop()
        );
      } else if (assetType == "Audio with Text") {
        $("#markerOverlayAsset").attr("src", "assets/images/audio_text.jpg");
        $("#assetNameAudio").html("");
        $("#assetNameVideo").html("");
        $("#assetNameImage").html("");
        $("#assetNameAudio").html(
          augmentedOverlayData.actionMarkers
            .slice(-1)
            .pop()
            .actionPointAudio.split("/")
            .pop()
        );
      } else if (assetType == "Image with Text") {
        $("#markerOverlayAsset").attr("src", "assets/images/img_text.jpg");
        $("#assetNameImage").html("");
        $("#assetNameVideo").html("");
        $("#assetNameAudio").html("");
        $("#assetNameImage").html(
          augmentedOverlayData.actionMarkers
            .slice(-1)
            .pop()
            .actionPointImage.split("/")
            .pop()
        );
      } else if (assetType == "Video with Text") {
        $("#markerOverlayAsset").attr("src", "assets/images/video_text.jpg");
        $("#assetNameVideo").html("");
        $("#assetNameAudio").html("");
        $("#assetNameImage").html("");
        $("#assetNameVideo").html(
          augmentedOverlayData.actionMarkers
            .slice(-1)
            .pop()
            .actionPointVideo.split("/")
            .pop()
        );
      } else if (assetType == "Audio with Image") {
        $("#markerOverlayAsset").attr("src", "assets/images/imgmusic.jpg");
        $("#assetNameImage").html("");
        $("#assetNameAudio").html("");
        $("#assetNameVideo").html("");
        $("#assetNameImage").html(
          augmentedOverlayData.actionMarkers
            .slice(-1)
            .pop()
            .actionPointImage.split("/")
            .pop()
        );
        $("#assetNameAudio").html(
          augmentedOverlayData.actionMarkers
            .slice(-1)
            .pop()
            .actionPointAudio.split("/")
            .pop()
        );
      } else if (assetType == "Audio with Text and Image") {
        $("#markerOverlayAsset").attr("src", "assets/images/audio_textimg.jpg");
        $("#assetNameImage").html("");
        $("#assetNameAudio").html("");
        $("#assetNameVideo").html("");
        $("#assetNameImage").html(
          augmentedOverlayData.actionMarkers
            .slice(-1)
            .pop()
            .actionPointImage.split("/")
            .pop()
        );
        $("#assetNameAudio").html(
          augmentedOverlayData.actionMarkers
            .slice(-1)
            .pop()
            .actionPointAudio.split("/")
            .pop()
        );
      } else {
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

  if (augmentedOverlayData.splash_instruction){
    document.getElementsByClassName("instructionSetForDesktop").value =augmentedOverlayData.splash_instruction;
    $(".instructionSetForDesktop").summernote("code",augmentedOverlayData.splash_instruction );
  }
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
    document.getElementById("splashBackground").style.opacity = opacity.value;
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
var AudioPath = null;
var VideoPath = null;
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
  $.getJSON("assets/js/settingJson.json", function (result_setting) {
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
var previousAssetImage;
var previousAssetVideo;
var previousAssetAudio;
var previousAssetMarkerImage;
function getAssetPath(assetPath) {
  if(assetPath==undefined || assetPath==""){
    return;
  }
  if (assetId == "splashImage") {
    splashImagePath = assetPath;
    if (assetPath != "") {
      var splashImageName = splashImagePath.split("/")[
        splashImagePath.split("/").length - 1
      ];
      $("#splashImageLable").text(splashImageName);
    } else if (assetPath == "") {
      splashImagePath = assetPath;
      var splashImageName = splashImagePath.split("/")[
        splashImagePath.split("/").length - 1
      ];
      $("#splashImageLable").text(splashImageName);
    }
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
        if (assetPath != "") {
          previousAssetImage = assetPath;
          experianceJSON.actionMarkers[i].actionPointImage = assetPath;
          $("#markerOverlayAsset").attr("src", assetPath);
          if ($.trim($("#assetNameImage").html()) == "") {
            $("#assetNameImage").html(assetPath.split("/").pop());
          } else {
            $("#assetNameImage").html("");
            $("#assetNameImage").html(assetPath.split("/").pop());
          }
          var j = i;

        } else {
          experianceJSON.actionMarkers[i].actionPointImage = previousAssetImage;
          $("#markerOverlayAsset").attr("src", previousAssetImage);
          if ($.trim($("#assetNameImage").html()) == "") {
            $("#assetNameImage").html(previousAssetImage.split("/").pop());
          } else {
            $("#assetNameImage").html("");
            $("#assetNameImage").html(previousAssetImage.split("/").pop());
          }
          var j = i;

        }
      }
    }

    if (assetPath != "") {
      // previousAssetImage = assetPath;
      $("#imgID-" + id).attr("src", assetPath);
      var imageName = assetPath.split("/");
      imageName = imageName[imageName.length - 1];
      $("#labelcustomfileinputimage-" + id).html(imageName);
    } else {
      $("#imgID-" + id).attr("src", previousAssetImage);
      var imageName = previousAssetImage.split("/");
      imageName = imageName[imageName.length - 1];
      $("#labelcustomfileinputimage-" + id).html(imageName);
    }
  } else if (assetId.indexOf("customfileinputvideo-") > -1) {
    var id = assetId.split("-");
    id = id[id.length - 1];
    for (var i = 0; i < experianceJSON.actionMarkers.length; i++) {
      if (experianceJSON.actionMarkers[i].actionId == id) {
        if (assetPath != "") {
          previousAssetVideo = assetPath;
          experianceJSON.actionMarkers[i].actionPointVideo = assetPath;
          $("#SelectedVidID-" + id).removeClass("active-story");
          $("#markerOverlayAsset").attr("src", "assets/images/imgplay.jpg");
          if ($.trim($("#assetNameVideo").html()) == "") {
            $("#assetNameAudio").html("");
            $("#assetNameImage").html("");
            $("#assetNameVideo").html(assetPath.split("/").pop());
          } else {
            $("#assetNameAudio").html("");
            $("#assetNameImage").html("");
            $("#assetNameVideo").html("");
            $("#assetNameVideo").html(assetPath.split("/").pop());
          }
          var j = i;
        } else {
          experianceJSON.actionMarkers[i].actionPointVideo = previousAssetVideo;
          $("#markerOverlayAsset").attr("src", "assets/images/imgplay.jpg");
          if ($.trim($("#assetNameVideo").html()) == "") {
            $("#assetNameAudio").html("");
            $("#assetNameImage").html("");
            $("#assetNameVideo").html(previousAssetVideo.split("/").pop());
          } else {
            $("#assetNameAudio").html("");
            $("#assetNameImage").html("");
            $("#assetNameVideo").html("");
            $("#assetNameVideo").html(previousAssetVideo.split("/").pop());
          }
          var j = i;
        }

      }
    }
    if (assetPath != "") {
      // $("#videoID-" + id).attr("src",'');
      $("#videoID-" + id).attr("src", assetPath);
      // setVideoInitialScreen();
      var videoName = assetPath.split("/");
      videoName = videoName[videoName.length - 1];
      $("#labelcustomfileinputvideo-" + id).html(videoName);
      // setVideoInitialScreen();
    } else {
      // $("#videoID-" + id).attr("src",'');
      $("#videoID-" + id).attr("src", previousAssetVideo);
      // setVideoInitialScreen();
      var videoName = previousAssetVideo.split("/");
      videoName = videoName[videoName.length - 1];
      $("#labelcustomfileinputvideo-" + id).html(videoName);
      // setVideoInitialScreen();
    }

  } else if (assetId.indexOf("customfileinputaudio-") > -1) {
    var id = assetId.split("-");
    id = id[id.length - 1];
    for (var i = 0; i < experianceJSON.actionMarkers.length; i++) {
      if (experianceJSON.actionMarkers[i].actionId == id) {
        if (assetPath != "") {
          previousAssetAudio = assetPath;
          experianceJSON.actionMarkers[i].actionPointAudio = assetPath;
          if ($.trim($("#assetNameAudio").html()) == "") {
            $("#assetNameAudio").html(assetPath.split("/").pop());
          } else {
            $("#assetNameAudio").html("");
            $("#assetNameAudio").html(assetPath.split("/").pop());
          }
          var j = i;
        } else {
          experianceJSON.actionMarkers[i].actionPointAudio = previousAssetAudio;
          if ($.trim($("#assetNameAudio").html()) == "") {
            $("#assetNameAudio").html(previousAssetAudio.split("/").pop());
          } else {
            $("#assetNameAudio").html("");
            $("#assetNameAudio").html(previousAssetAudio.split("/").pop());
          }
          var j = i;
        }

      }
    }
    if (assetPath != "") {
      $("#audioID-" + id).show();
      $("#SelectedAudID-" + id + "").toggleClass("active-story");
      $("#audioID-" + id).attr("src", assetPath);
      var audioName = assetPath.split("/");
      audioName = audioName[audioName.length - 1];
      $("#labelcustomfileinputaudio-" + id).html(audioName);
    } else {
      $("#audioID-" + id).attr("src", previousAssetAudio);
      var audioName = previousAssetAudio.split("/");
      audioName = audioName[audioName.length - 1];
      $("#labelcustomfileinputaudio-" + id).html(audioName);
    }

  } else if (assetId.indexOf("customFileInputPointImgae-") > -1) {
    var id = assetId.split("-");
    id = id[id.length - 1];
    for (var i = 0; i < experianceJSON.actionMarkers.length; i++) {
      if (experianceJSON.actionMarkers[i].actionId == id) {
        experianceJSON.actionMarkers[i].actionIcon = assetPath;
        experianceJSON.actionMarkers[i].actionIconID = "-i1";
        $("#customIconImage-" + id).attr("src", assetPath);
        $("#storypoint-" + id).attr("src", assetPath);
        $("#customIcon-" + id).attr("style", "display:block");
        for (var j = 0; j < imagesAugmentedOverlay.length; j++) {
          var iconIds = imagesAugmentedOverlay[j].iconId + "-" + id;
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
  } else if (assetId.indexOf("customfileinputmarkerimage-") > -1) {
    var id = assetId.split("-");
    id = id[id.length - 1];
    for (var i = 0; i < experianceJSON.actionMarkers.length; i++) {
      if (experianceJSON.actionMarkers[i].actionId == id) {
        if (assetPath != "") {
          previousAssetMarkerImage = assetPath;
          experianceJSON.actionMarkers[i].markerPattern = assetPath;
          var res = assetPath.substr(
            assetPath.lastIndexOf("."),
            assetPath.length
          );
          experianceJSON.actionMarkers[i].pattFile_path = assetPath.replace(
            res,
            ".patt"
          );
          var j = i;
        } else {
          experianceJSON.actionMarkers[i].markerPattern = previousAssetMarkerImage;
          var res = previousAssetMarkerImage.substr(
            previousAssetMarkerImage.lastIndexOf("."),
            previousAssetMarkerImage.length
          );
          experianceJSON.actionMarkers[i].pattFile_path = previousAssetMarkerImage.replace(
            res,
            ".patt"
          );
          var j = i;
        }

      }
    }
    if (assetPath != "") {
      $("#markerimgID-" + id).attr("src", assetPath);
      $("#downloadMarkerImage-" + id).attr("src", assetPath);
      $("#markerImageDisplay").attr("src", assetPath);
      var markerpatternimagename = assetPath.split("/");
      markerpatternimagename =
        markerpatternimagename[markerpatternimagename.length - 1];
      $("#labelcustomfileinputmarkerimage-" + id).html(markerpatternimagename);
      generateMarkerPatternFile(markerpatternimagename, assetPath);
    } else {
      $("#markerimgID-" + id).attr("src", previousAssetMarkerImage);
      $("#downloadMarkerImage-" + id).attr("src", previousAssetMarkerImage);
      $("#markerImageDisplay").attr("src", previousAssetMarkerImage);
      var markerpatternimagename = previousAssetMarkerImage.split("/");
      markerpatternimagename =
        markerpatternimagename[markerpatternimagename.length - 1];
      $("#labelcustomfileinputmarkerimage-" + id).html(markerpatternimagename);
      generateMarkerPatternFile(markerpatternimagename, previousAssetMarkerImage);
    }

  }
}
// var hotspotsToSave = [];
// var placeToSave = [];
var hotspotIndex = 0;
// var placeIndex = 1;

AFRAME.registerComponent("mouseclick", {
  init: function () {
    this.el.addEventListener("click", function () {
      if (selectedHotspot === this) selectedHotspot = null;
      else {
        selectedHotspot = this;
        editHotspot();
      }
      toggleToolbarButtons(selectedHotspot);
    });

    this.el.addEventListener("dragend", function () {
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
  [].forEach.call(sidenavList, function (navigation) {
    if (navigation.classList.contains("active") && navigation.id != sidenavId)
      navigation.classList.remove("active");
  });
  document.getElementById(sidenavId).classList.toggle("active");
  if(sidenavId=="storyPointSidenav"){
    if(experianceJSON.actionMarkers.length>=1){
    for (var i = 1; i < experianceJSON.actionMarkers.length; i++) {
      $("#collapse-storypoint-"+i).removeClass("show");
    }
    }
    $("#collapse-storypoint-0").addClass("show");
    
  }
  toggleOverlay();
}

function openSideNav(sidenavId) {
  var sidenavList = document.getElementsByClassName("sidenav");
  var overlayIndex = augmentedOverlayIndex - 1;
  [].forEach.call(sidenavList, function (navigation) {
    if (navigation.classList.contains("active") && navigation.id != sidenavId)
      navigation.classList.remove("active");
    $("#collapse-storypoint-" + overlayIndex).addClass("show");
  });

  if (document.getElementById(sidenavId).classList.contains("active")) {
  } else {
    document.getElementById(sidenavId).classList.toggle("active");
    toggleOverlay();
  }
}

function toggleOverlay() {
  var sidenavActive = false;
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function (navigation) {
    if (navigation.classList.contains("active")) sidenavActive = true;
  });
  if (sidenavActive)
    document.getElementById("overlay").classList.add("overlay");
  else document.getElementById("overlay").classList.remove("overlay");
}

function closeSideNav() {
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function (navigation) {
    navigation.classList.remove("active");
  });
  toggleOverlay();
}

function addNewHotspot(size, type) {
  // var note=document.getElementById('markerNote').innerHTML;
  document.getElementById("markerNote").style.display = "none";
  augmentedOverlayIndex;
  if (augmentedOverlayIndex < 10) {
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
      mediatype: "T",
      type: "Text",
      pattFile_path: "",
      markerPattern: "",
      markarTitle: 'Marker'
    };
    experianceJSON.actionMarkers.push(newActionPoint);
    // console.log('experianceJSON.actionMarkers : ', experianceJSON.actionMarkers);
    augmentedGenerator(
      experianceJSON,
      settingsVisibilityJson,
      settingsTypeJson,
      imagesAugmentedOverlay
    );
  } else {
    popSnackbar("warning", "Maximum markers reached! Try editing existing ones.");
  }
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
    if (experianceJSON.actionMarkers[i].actionPointImage == "") {
      experianceJSON.actionMarkers[i].actionPointImage =
        "assets/images/default.jpg";
    }
  }
  if (experianceJSON.actionMarkers.length >= 1) {
    document.getElementById("markerNote").style.display = "none";
  } else {
    document.getElementById("markerNote").style.display = "block";
  }
  if( experianceJSON.actionMarkers.length>0){
  var notetext="<p style='color: white;margin-left: 10px;' class='col-12'>Click on the side image below to customise.</p>"
  $("#tileRow").append(notetext);
  }

  experianceJSON.actionMarkers.forEach(augmentedOverlay => {
    uniqueVisibility = augmentedOverlay.actionPointVisibility;
    uniqueType = augmentedOverlay.type;
    uniqueIcon = augmentedOverlay.actionIconID;
    markerTitle = augmentedOverlay.markarTitle;
    markerValue = augmentedOverlay.markarTitle;

    if (!markerTitle) {

      markerTitle = "Marker";
      markerValue = "";
    }
    var imagename = "Choose Image";
    var defaultImage = "assets/images/default.jpg";
    if (augmentedOverlay.actionPointImage != defaultImage) {
      imagename = augmentedOverlay.actionPointImage.split("/");
      imagename = imagename[imagename.length - 1];
    }

    var markerpatternimagename = "Choose Image";
    if (augmentedOverlay.markerPattern) {
      markerpatternimagename = augmentedOverlay.markerPattern.split("/");
      markerpatternimagename =
        markerpatternimagename[markerpatternimagename.length - 1];
    }

    var videoname = "Choose Video";
    if (augmentedOverlay.actionPointVideo) {
      videoname = augmentedOverlay.actionPointVideo.split("/");
      videoname = videoname[videoname.length - 1];
    }
    var audioname = "Choose Audio";
    if (augmentedOverlay.actionPointAudio) {
      audioname = augmentedOverlay.actionPointAudio.split("/");
      audioname = audioname[audioname.length - 1];
    }
    var markerPatternName;
    // settings
    if (augmentedOverlay.markerPattern) {
      var augmentedOverlayMarkerTiles =
        "<div id='downloadMarkerImageDiv-" +
        augmentedOverlayIndex +
        "' class='marker-tiles footer-col-1-style' ><img id='downloadMarkerImage-" +
        augmentedOverlayIndex +
        "' class='footer-img-style  marker-image-display'' src=\"" +
        augmentedOverlay.markerPattern +
        "\"  onclick='editHotspot(" +
        augmentedOverlayIndex +
        ")' ></div>";
      $("#markerImageDisplay").attr("src", augmentedOverlay.markerPattern);
      markerPatternName = augmentedOverlay.markerPattern;
    } else {
      var augmentedOverlayMarkerTiles =
        "<div id='downloadMarkerImageDiv-" +
        augmentedOverlayIndex +
        "' class='marker-tiles' ><img id='downloadMarkerImage-" +
        augmentedOverlayIndex +
        "' class='footer-img-style  marker-image-display'' src='assets/images/default.jpg'  onclick='editHotspot(" +
        augmentedOverlayIndex +
        ")'></div>";
      $("#markerImageDisplay").attr("src", "assets/images/default.jpg");
      markerPatternName = "assets/images/default.jpg";
    }
    var augmentedOverlayAccordion =
      "<div class='card story-accordion-border' id='story'><div class='card-header story-color-accordion' id='headingTwo'><span class='fas fa-trash-alt mt-3 mr-3 pull-right handPointer delete-icon' onclick='$(&#39;#deleteConfirmationModal&#39;).modal(&#39;show&#39;); deleteIconId=&#39;" +
      augmentedOverlayIndex +
      "&#39;' onmouseenter='mouseEnter(&#39;You can delete the image from your experience by simply hitting this button.&#39;);' onmouseleave='mouseLeave();'></span><h3 class='mb-0'><button class='btn btn-link btn-decor' onmouseenter='mouseEnter(&#39;Markers help you overlay Media over the Area images. Configure the markers on the screen using this option.&#39;);' onclick='bindMarkerAndOverlayedAsset(" +
      augmentedOverlayIndex +
      ")' onmouseleave='mouseLeave()' data-toggle='collapse' data-target='#collapse-storypoint-" +
      augmentedOverlayIndex +
      "' aria-expanded='true' aria-controls='collapse-storypoint-" +
      augmentedOverlayIndex +
      "'><i class='fa' aria-hidden='true'></i><span id='titleMarkerId-" +
      augmentedOverlay.actionId +
      "'>" +
      markerTitle +
      "</span></button></h3></div><div id='collapse-storypoint-" +
      augmentedOverlayIndex +
      "' class='collapse back-color' aria-labelledby='headingTwo' data-parent='#augmentedOverlay-accordion'><div class='card-body'><div class='form-group'><lable for='markerTitleID-" +
      augmentedOverlay.actionId +
      "' class='font_color'>Marker Title:</lable><input class='col-12 form-control input_box_trasparent' maxlength='25' onblur='changeMarkerTilte(this)' placeholder='Marker Title' type='text' id='markerTitleID-" +
      augmentedOverlay.actionId +
      "' value='" +
      markerValue +
      "'></div><div class='form-group '><lable for='typeDropDownID-" +
      augmentedOverlay.actionId +
      "' class='font_color'>Marker Type:</lable><select name='type' id='typeDropDownID-" +
      augmentedOverlay.actionId +
      "' class='col-10 select-dropdown form-control' onchange='toggleTypeOption(this," +
      augmentedOverlay.actionId +
      ")'></select></div><div class='form-group active-story' id= 'textAreaID-" +
      augmentedOverlay.actionId +
      "'> <lable for='place-text-input' class='font_color'>Text:</lable> <textarea maxlength='250' placeholder='Text' class='form-control custom-input input_box_trasparent' id='place-text-input' onKeyPress='checkTextAreaLength(this)' onblur='changeText(this," +
      augmentedOverlay.actionId +
      ")'>" +
      augmentedOverlay.actionPointText +
      "</textarea></div><div class='form-group mb-2 active-story' id='textfontcolor-" +
      augmentedOverlay.actionId +
      "'><label>Description Font Color:</label><input class='jscolor pointer' onchange='changeInfofont(this," +
      augmentedOverlay.actionId +
      ")' value='' style='width: 100%' id='descriptionTextColor-" +
      augmentedOverlay.actionId +
      "'></div><div class='form-group mb-2 active-story' id='textbgcolor-" +
      augmentedOverlay.actionId +
      "'></div><div class='form-group  mb-2 active-story' id= 'descriptionbgOpacity-" +
      augmentedOverlay.actionId +
      "'><div class='slidecontainer'><input id='descriptionBgOpacity-" +
      augmentedOverlay.actionId +
      "' type='range' min='0.1' max='1' step='0.001' value='' class='slider' oninput='changeOpacity(this," +
      augmentedOverlay.actionId +
      ")'  /></div></div><div class='form-group mb-2 set-image-size active-story' id = 'SelectedImgID-" +
      augmentedOverlay.actionId +
      "'><label>Display Image:</label><img src=\"" +
      augmentedOverlay.actionPointImage +
      "\" alt='Display Image' class='set-image-size' id = 'imgID-" +
      augmentedOverlay.actionId +
      "' ></div><div class='form-group custom-file mb-3 active-story' id = 'BrowseImgID-" +
      augmentedOverlay.actionId +
      "'style=' margin-top: 35px;'><input type='button' class='custom-file-input handPointer' id='customfileinputimage-" +
      augmentedOverlay.actionId +
      "' onclick='openAssestsPopup(&#39;Image&#39;,this)'> <label class='custom-file-label' for='customfileinputimage-" +
      augmentedOverlay.actionId +
      "'><span class='text-overflow' id='labelcustomfileinputimage-" +
      augmentedOverlay.actionId +
      "'>" +
      imagename +
      "</span></label><label class='aspect-ratio-style ' for='startquizbtn' style='font-size: 12px'>Note: Recommended aspect ratio 1:1</label></div><div class='form-group custom-file my-3 set-video-size active-story' id = 'SelectedVidID-" +
      augmentedOverlay.actionId +
      "'><video class='set-video-size' controls='controls' id='videoID-" +
      augmentedOverlay.actionId +
      "' src=\"" +
      augmentedOverlay.actionPointVideo +
      "\"></video></div><div class='form-group custom-file my-2 active-story' id = 'BrowseVidID-" +
      augmentedOverlay.actionId +
      "'><input type='button' class='custom-file-input handPointer' id='customfileinputvideo-" +
      augmentedOverlay.actionId +
      "' onclick='openAssestsPopup(&#39;Video&#39;,this)'> <label class='custom-file-label' for='customfileinputvideo-" +
      augmentedOverlay.actionId +
      "'><span class='text-overflow' id='labelcustomfileinputvideo-" +
      augmentedOverlay.actionId +
      "'>" +
      videoname +
      "</span></label> </div> <div class='form-group custom-file mb-2 active-story' id = 'SelectedAudID-" +
      augmentedOverlay.actionId +
      "'><audio class='audio-width' controls id='audioID-" +
      augmentedOverlay.actionId +
      "' src=\"" +
      augmentedOverlay.actionPointAudio +
      "\"></audio></div> <div class='form-group custom-file mb-2 active-story' id = 'BrowseAudID-" +
      augmentedOverlay.actionId +
      "'><input type='button' class='custom-file-input handPointer' id='customfileinputaudio-" +
      augmentedOverlay.actionId +
      "' onclick='openAssestsPopup(&#39;Audio&#39;,this)'><label class='custom-file-label' for='custom-file-input-audio'><span class='text-overflow' id='labelcustomfileinputaudio-" +
      augmentedOverlay.actionId +
      "' class='text-overflow'>" +
      audioname +
      "</span></label></div><div class='form-group mb-2 set-image-size' id = 'SelectedMarkerImgID-" +
      augmentedOverlay.actionId +
      "'><lable for='markerImageID-" +
      augmentedOverlay.actionId +
      "' class='font_color'>Marker Image:</lable><img src=\"" +
      markerPatternName +
      "\" class='set-image-size' style='border: 20px solid black;background-color: white;' id = 'markerimgID-" +
      augmentedOverlay.actionId +
      "' ></div><div class='form-group custom-file mb-3' id = 'BrowseMarkerImgID-" +
      augmentedOverlay.actionId +
      "' style='margin-top:25px''><input type='button' class='custom-file-input handPointer' id='customfileinputmarkerimage-" +
      augmentedOverlay.actionId +
      "' onclick='openAssestsPopup(&#39;Image&#39;,this)'> <label class='custom-file-label' for='customfileinputmarkerimage-" +
      augmentedOverlay.actionId +
      "'><span class='text-overflow' id='labelcustomfileinputmarkerimage-" +
      augmentedOverlay.actionId +
      "'>" +
      markerpatternimagename +
      "</span></label> <label class='aspect-ratio-style ' for='startquizbtn' style='font-size: 12px'>Note: Recommended aspect ratio 1:1</label></div></div></div></div></div>";
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
      fontcolor.style.backgroundColor = augmentedOverlay.actionPointBgColor;
    }
    if (augmentedOverlay.actionPointBgOpacity) {
      var opacity = document.getElementById(
        "descriptionBgOpacity-" + augmentedOverlay.actionId
      );
      opacity.value = augmentedOverlay.actionPointBgOpacity;
      var displayvalue = "(" + Math.round(opacity.value * 100) + "%)";
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
      } else if (experianceJSON.actionMarkers[i].mediatype == "V") {
        $("#markerOverlayAsset").attr("src", "assets/images/imgplay.jpg");
        $("#assetNameVideo").html("");
        $("#assetNameImage").html("");
        $("#assetNameVideo").html("");
        $("#assetNameVideo").html(
          experianceJSON.actionMarkers[i].actionPointVideo.split("/").pop()
        );
      } else if (experianceJSON.actionMarkers[i].mediatype == "A") {
        $("#markerOverlayAsset").attr("src", "assets/images/imgmusic.jpg");
        $("#assetNameAudio").html("");
        $("#assetNameVideo").html("");
        $("#assetNameImage").html("");
        $("#assetNameAudio").html(
          experianceJSON.actionMarkers[i].actionPointAudio.split("/").pop()
        );
      } else if (experianceJSON.actionMarkers[i].mediatype == "AI") {
        $("#markerOverlayAsset").attr("src", "assets/images/imgmusic.jpg");
        $("#assetNameAudio").html("");
        $("#assetNameImage").html("");
        $("#assetNameVideo").html("");
        $("#assetNameAudio").html(
          experianceJSON.actionMarkers[i].actionPointAudio.split("/").pop()
        );
        $("#assetNameImage").html(
          experianceJSON.actionMarkers[i].actionPointImage.split("/").pop()
        );
      } else if (experianceJSON.actionMarkers[i].mediatype == "IT") {
        $("#markerOverlayAsset").attr("src", "assets/images/img_text.jpg");
        $("#assetNameImage").html("");
        $("#assetNameAudio").html("");
        $("#assetNameVideo").html("");
        $("#assetNameImage").html(
          experianceJSON.actionMarkers[i].actionPointImage.split("/").pop()
        );
      } else if (experianceJSON.actionMarkers[i].mediatype == "T") {
        $("#markerOverlayAsset").attr("src", "assets/images/imgtext.jpg");
        $("#assetNameImage").html("");
        $("#assetNameAudio").html("");
        $("#assetNameVideo").html("");
      } else if (experianceJSON.actionMarkers[i].mediatype == "AT") {
        $("#markerOverlayAsset").attr("src", "assets/images/audio_text.jpg");
        $("#assetNameImage").html("");
        $("#assetNameAudio").html("");
        $("#assetNameVideo").html("");
        $("#assetNameAudio").html(
          experianceJSON.actionMarkers[i].actionPointAudio.split("/").pop()
        );
      } else if (experianceJSON.actionMarkers[i].mediatype == "AIT") {
        $("#markerOverlayAsset").attr("src", "assets/images/audio_textimg.jpg");
        $("#assetNameImage").html("");
        $("#assetNameAudio").html("");
        $("#assetNameVideo").html("");
        $("#assetNameAudio").html(
          experianceJSON.actionMarkers[i].actionPointAudio.split("/").pop()
        );
        $("#assetNameImage").html(
          experianceJSON.actionMarkers[i].actionPointImage.split("/").pop()
        );
      } else if (experianceJSON.actionMarkers[i].mediatype == "VT") {
        $("#markerOverlayAsset").attr("src", "assets/images/video_text.jpg");
        $("#assetNameImage").html("");
        $("#assetNameAudio").html("");
        $("#assetNameVideo").html("");
        $("#assetNameVideo").html(
          experianceJSON.actionMarkers[i].actionPointVideo.split("/").pop()
        );
      } else {
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
          $("#assetNameImage").html(
            experianceJSON.actionMarkers[i].actionPointImage.split("/").pop()
          );
        } else {
          $("#markerOverlayAsset").attr("src", "assets/images/default.jpg");
          $("#imgID-" + actionId).attr("src", "assets/images/default.jpg");
          $("#assetNameImage").html("");
        }
      } else if (typeMedia == "Text") {
        $("#markerOverlayAsset").attr("src", "assets/images/imgtext.jpg");
        $("#assetNameVideo").html("");
        $("#assetNameAudio").html("");
        $("#assetNameImage").html("");
      } else if (typeMedia == "Video") {
        $("#markerOverlayAsset").attr("src", "assets/images/imgplay.jpg");
        $("#assetNameVideo").html("");
        $("#assetNameAudio").html("");
        $("#assetNameImage").html("");
        $("#assetNameVideo").html(
          experianceJSON.actionMarkers[i].actionPointVideo.split("/").pop()
        );
      } else if (typeMedia == "Audio") {
        $("#markerOverlayAsset").attr("src", "assets/images/imgmusic.jpg");
        $("#assetNameAudio").html("");
        $("#assetNameVideo").html("");
        $("#assetNameImage").html("");
        $("#assetNameAudio").html(
          experianceJSON.actionMarkers[i].actionPointAudio.split("/").pop()
        );
      } else if (typeMedia == "Audio with Text") {
        $("#markerOverlayAsset").attr("src", "assets/images/audio_text.jpg");
        $("#assetNameAudio").html("");
        $("#assetNameVideo").html("");
        $("#assetNameImage").html("");
        $("#assetNameAudio").html(
          experianceJSON.actionMarkers[i].actionPointAudio.split("/").pop()
        );
      } else if (typeMedia == "Image with Text") {
        $("#markerOverlayAsset").attr("src", "assets/images/img_text.jpg");
        $("#assetNameImage").html("");
        $("#assetNameVideo").html("");
        $("#assetNameAudio").html("");
        $("#assetNameImage").html(
          experianceJSON.actionMarkers[i].actionPointImage.split("/").pop()
        );
      } else if (typeMedia == "Video with Text") {
        $("#markerOverlayAsset").attr("src", "assets/images/video_text.jpg");
        $("#assetNameVideo").html("");
        $("#assetNameAudio").html("");
        $("#assetNameImage").html("");
        $("#assetNameVideo").html(
          experianceJSON.actionMarkers[i].actionPointVideo.split("/").pop()
        );
      } else if (typeMedia == "Audio with Image") {
        $("#markerOverlayAsset").attr("src", "assets/images/imgmusic.jpg");
        $("#assetNameImage").html("");
        $("#assetNameAudio").html("");
        $("#assetNameVideo").html("");
        $("#assetNameImage").html(
          experianceJSON.actionMarkers[i].actionPointImage.split("/").pop()
        );
        $("#assetNameAudio").html(
          experianceJSON.actionMarkers[i].actionPointAudio.split("/").pop()
        );
      } else if (typeMedia == "Audio with Text and Image") {
        $("#markerOverlayAsset").attr("src", "assets/images/audio_textimg.jpg");
        $("#assetNameImage").html("");
        $("#assetNameAudio").html("");
        $("#assetNameVideo").html("");
        $("#assetNameImage").html(
          experianceJSON.actionMarkers[i].actionPointImage.split("/").pop()
        );
        $("#assetNameAudio").html(
          experianceJSON.actionMarkers[i].actionPointAudio.split("/").pop()
        );
      } else {
        $("#markerOverlayAsset").attr("src", "assets/images/default.jpg");
        $("#assetNameImage").html("");
        $("#assetNameAudio").html("");
        $("#assetNameVideo").html("");
      }
    }
  }
  $("#textAreaID-" + actionId + "").addClass("active-story");
  $("#textfontcolor-" + actionId + "").addClass("active-story");
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

function changeMarkerTilte(event) {
  var actionID = event.id.split("-")[1];
  if (event.value) {
    for (var i = 0; i < experianceJSON.actionMarkers.length; i++) {
      if (experianceJSON.actionMarkers[i].actionId == actionID) {
        experianceJSON.actionMarkers[i].markarTitle = event.value;
        var j = i;
      }
    }
    $("#titleMarkerId-" + actionID).html(event.value);
  } else {
    for (var i = 0; i < experianceJSON.actionMarkers.length; i++) {
      if (experianceJSON.actionMarkers[i].actionId == actionID) {
        experianceJSON.actionMarkers[i].markarTitle = event.value;
        var j = i;
      }
    }
    $("#titleMarkerId-" + actionID).html("Marker");
  }
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
      $("#textfontcolor-" + actionId + "").toggleClass("active-story");
      // $("#descriptionbgOpacity-" + actionId + "").toggleClass("active-story");
      // $("#textbgcolor-" + actionId + "").toggleClass("active-story");
      experianceJSON.actionMarkers[j].mediatype = "T";
      break;
    case "Image":
      $("#SelectedImgID-" + actionId + "").toggleClass("active-story");
      $("#BrowseImgID-" + actionId + "").toggleClass("active-story");
      experianceJSON.actionMarkers[j].mediatype = "I";
      break;
    case "Audio":
      var audioTag = document.getElementById("audioID-" + actionId);
      var src = audioTag.getAttribute("src");
      if (src == "" || src == undefined) {
        $("#audioId" + actionId).hide();
        $("#BrowseAudID-" + actionId + "").toggleClass("active-story");
      } else {
        $("#audioId" + actionId).show();
        $("#SelectedAudID-" + actionId + "").toggleClass("active-story");
        $("#BrowseAudID-" + actionId + "").toggleClass("active-story");
      }
      experianceJSON.actionMarkers[j].mediatype = "A";
      break;
    case "Video":
      $("#SelectedVidID-" + actionId + "").toggleClass("active-story");
      $("#BrowseVidID-" + actionId + "").toggleClass("active-story");
      experianceJSON.actionMarkers[j].mediatype = "V";
      if (experianceJSON.actionMarkers[actionId].actionPointVideo) {
        $("#SelectedVidID-" + actionId).removeClass("active-story");
      } else {
        $("#SelectedVidID-" + actionId).addClass("active-story");
      }
      break;
    case "Image with Text":
      $("#textAreaID-" + actionId + "").toggleClass("active-story");
      $("#textfontcolor-" + actionId + "").toggleClass("active-story");
      // $("#textbgcolor-" + actionId + "").toggleClass("active-story");
      // $("#descriptionbgOpacity-" + actionId + "").toggleClass("active-story");
      $("#SelectedImgID-" + actionId + "").toggleClass("active-story");
      $("#BrowseImgID-" + actionId + "").toggleClass("active-story");
      experianceJSON.actionMarkers[j].mediatype = "IT";
      break;
    case "Audio with Text":
      var audioTag = document.getElementById("audioID-" + actionId);
      var src = audioTag.getAttribute("src");
      if (src == "" || src == undefined) {
        $("#audioId" + actionId).hide();
        $("#BrowseAudID-" + actionId + "").toggleClass("active-story");
      } else {
        $("#audioId" + actionId).show();
        $("#SelectedAudID-" + actionId + "").toggleClass("active-story");
        $("#BrowseAudID-" + actionId + "").toggleClass("active-story");
        experianceJSON.actionMarkers[j].mediatype = "A";
      }
      $("#textAreaID-" + actionId + "").toggleClass("active-story");
      $("#textfontcolor-" + actionId + "").toggleClass("active-story");
      // $("#textbgcolor-" + actionId + "").toggleClass("active-story");
      // $("#descriptionbgOpacity-" + actionId + "").toggleClass("active-story");
      experianceJSON.actionMarkers[j].mediatype = "AT";
      break;
    case "Audio with Image":
      var audioTag = document.getElementById("audioID-" + actionId);
      var src = audioTag.getAttribute("src");
      if (src == "" || src == undefined) {
        $("#audioId" + actionId).hide();
        $("#BrowseAudID-" + actionId + "").toggleClass("active-story");
      } else {
        $("#audioId" + actionId).show();
        $("#SelectedAudID-" + actionId + "").toggleClass("active-story");
        $("#BrowseAudID-" + actionId + "").toggleClass("active-story");
      }
      $("#SelectedImgID-" + actionId + "").toggleClass("active-story");
      $("#BrowseImgID-" + actionId + "").toggleClass("active-story");
      experianceJSON.actionMarkers[j].mediatype = "AI";
      break;
    case "Audio with Text and Image":
      var audioTag = document.getElementById("audioID-" + actionId);
      var src = audioTag.getAttribute("src");
      if (src == "" || src == undefined) {
        $("#audioId" + actionId).hide();
        $("#BrowseAudID-" + actionId + "").toggleClass("active-story");
      } else {
        $("#audioId" + actionId).show();
        $("#SelectedAudID-" + actionId + "").toggleClass("active-story");
        $("#BrowseAudID-" + actionId + "").toggleClass("active-story");
      }
      $("#textAreaID-" + actionId + "").toggleClass("active-story");
      $("#textfontcolor-" + actionId + "").toggleClass("active-story");
      // $("#textbgcolor-" + actionId + "").toggleClass("active-story");
      // $("#descriptionbgOpacity-" + actionId + "").toggleClass("active-story");
      $("#SelectedImgID-" + actionId + "").toggleClass("active-story");
      $("#BrowseImgID-" + actionId + "").toggleClass("active-story");
      experianceJSON.actionMarkers[j].mediatype = "AIT";
      break;
    case "Video with Text":
      $("#textAreaID-" + actionId + "").toggleClass("active-story");
      $("#textfontcolor-" + actionId + "").toggleClass("active-story");
      // $("#textbgcolor-" + actionId + "").toggleClass("active-story");
      // $("#descriptionbgOpacity-" + actionId + "").toggleClass("active-story");
      $("#SelectedVidID-" + actionId + "").toggleClass("active-story");
      $("#BrowseVidID-" + actionId + "").toggleClass("active-story");
      if (experianceJSON.actionMarkers[actionId].actionPointVideo) {
        $("#SelectedVidID-" + actionId).removeClass("active-story");
      } else {
        $("#SelectedVidID-" + actionId).addClass("active-story");
      }
      experianceJSON.actionMarkers[j].mediatype = "VT";
      break;
  }
}
// reading browse paths
document.addEventListener("DOMContentLoaded", function () { });

function VideoLoad(vid) {
  vidID = vid.attributes.id.nodeValue;
  vidName = vid.files["0"].name;
  if (vid.files && vid.files["0"]) {
    var fileInputLabel = document.getElementById("label-" + vidID);
    fileInputLabel.innerText = vidName;
    var reader = new FileReader();
    reader.onload = function (e) {
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
    reader.onload = function (e) {
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
    reader.onload = function (e) {
      PointIconPath = e.target.result;
    };
    reader.readAsDataURL(icon.files["0"]);
  }
}

function CustomizeData() {
  $.getJSON("assets/js/StoryPointJson.json", function (data) {
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
  allPlaces.forEach(place => { });
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
    document.getElementById("markerNote").style.display = "";
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
  setTimeout(function () {
    x.className = x.className.replace("show " + type, "");
  }, 3000);
}
$("#summernote").bind("change paste keyup", function () { });

/* Summernote MAxlength, maxcount and popsnacker */



function printMarker() {
  generateMarkerImageFile(augmentedOverlayData);
}

/* Summernote MAxlength, maxcount and popsnacker */
