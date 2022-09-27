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
var imVirtualTourJson = "";
var activeScreen = "";
var experienceStarted = false;

var isInfoboxClick = false;

function hexToRgb(hex, opacity) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        alpha: opacity,
      }
    : null;
}

function initializePreview(experienceJSON, ExperienceName) {
  imVirtualTourJson = JSON.parse(experienceJSON);
  $("#loaderq").addClass("hidden-login");
  $("#innerInfo").removeClass("hidden-login");
  var instructionSet = imVirtualTourJson.splash_instruction;
  var lunchTextSet = imVirtualTourJson.launch_text;

  //if json includes splashbgcolor and opacity
  if (imVirtualTourJson.splashBackgroundColor && imVirtualTourJson.Opacity) {
    var rgbformat = hexToRgb(
      imVirtualTourJson.splashBackgroundColor,
      imVirtualTourJson.Opacity
    );
    document.getElementById("innerInfo").style.backgroundColor =
      "rgba(" +
      rgbformat.r +
      "," +
      rgbformat.g +
      "," +
      rgbformat.b +
      "," +
      rgbformat.alpha +
      ")";
  }
  //if json includes splashheadercolor
  if (imVirtualTourJson.splashHeaderColor) {
    document.getElementById("titleText").style.color =
      imVirtualTourJson.splashHeaderColor;
  }
  document.getElementById("titleText").innerHTML = ExperienceName;
  document.getElementById("instruction").innerHTML = instructionSet;
  document.getElementById("titleDescription").innerHTML = lunchTextSet;
  document.getElementById("splashLogo").src = imVirtualTourJson.splash_image;

  activeScreen = imVirtualTourJson.Nodes[0];
  if (activeScreen.entry_view) {
    $("#CamEntity").attr("rotation", activeScreen.entry_view);
  }
  generateRoom(activeScreen);
  loggedin = true;
}

$(document).ready(() => {
  var startExperienteBtn = document.getElementById("start_experience");
  cam = document.getElementById("cameraId");
  startExperienteBtn.onclick = function () {
    var cam = document.querySelector("#rotation");
    // cam.emit('skayroation');
    cam.setAttribute("animation", "enabled:false");
    cam.setAttribute("animation__one", "enabled:true");

    experienceStarted = true;
    var entity = document.querySelector("[sound]");
    entity.components.sound.playSound();
    document.getElementsByTagName("a-scene")[0].style.zIndex = "auto";
    clearInterval(timer);
    document.getElementById("container").style.display = "none";
    document.getElementById("loaderq").style.display = "none";
  };
});

var assetsLoaded = false;
var loggedin = false;

var startexp = function () {
  var start = document.getElementById("start_experience");
  if (assetsLoaded && loggedin) {
    if (start.classList.contains("disabled")) {
      var loading = document.getElementById("loading");
      loading.classList.add("disabled");
      clearInterval(timer);
      start.classList.remove("disabled");
    }
  }
};
var timer = setInterval(startexp, 500);
$(window).on("load", function () {
  setTimeout(function () {
    assetsLoaded = true;
  }, 3000);
});

AFRAME.registerComponent("hotspotclick", {
  init: function () {
    this.el.addEventListener("click", function () {
      if (experienceStarted === true) {
        if (this.getAttribute("id").split("-")[1] == "hotspot") {
          for (let i = 0; i < imVirtualTourJson.Nodes.length; i++) {
            if (
              imVirtualTourJson.Nodes[i].placeIndex ==
              activeScreen.teleports[this.getAttribute("id").split("-")[2]]
                .teleportToPlaceIndex
            ) {
              activeScreen = imVirtualTourJson.Nodes[i];
              generateRoom(activeScreen);
              break;
            }
          }
        } else if (this.getAttribute("id").split("-")[1] == "infohotspot") {
          var selectedInfobox =
            activeScreen.infoboxes[this.getAttribute("id").split("-")[2]];
          var hotspotEntity = document.querySelector(
            "#hotspot-entity-" + this.getAttribute("id").split("-")[2]
          );
          var MainPlain = document.querySelector(
            "#infobox-MainPlane-" + this.getAttribute("id").split("-")[2]
          );
          var infoBox = document.querySelector(
            "#infobox-plane-" + this.getAttribute("id").split("-")[2]
          );
          var overlay = document.querySelector(
            "#overlay-plane-" + this.getAttribute("id").split("-")[2]
          );
          var infoBoxTextPlane = document.querySelector(
            "#infobox-planeText-" + this.getAttribute("id").split("-")[2]
          );
          var hotspotPosition = hotspotEntity.getAttribute("position");

          hotspotEntity.setAttribute("scale", "2 2 2");
          infoBox.setAttribute("position", "0 0 -10");
          MainPlain.setAttribute("position", "0 0 -10");
          infoBoxTextPlane.setAttribute("position", "0 -17.194 -10");
          this.setAttribute("position", "200 200 0");
          this.setAttribute("visible", "false");
          infoBox.setAttribute("visible", "true");
          MainPlain.setAttribute("visible", "true");

          MainPlain.setAttribute(
            "animation__startAnimation1",
            "property:scale;from:0 0 0;to:1 1 1; dur: 1500;enabled:true"
          );
          if (selectedInfobox.infoboxType === "Image") {
            MainPlain.setAttribute("visible", "false");
            infoBox.setAttribute(
              "animation__startAnimation",
              "property:scale;from:0 0 0;to:1 1 1; dur: 1500;enabled:true"
            );
          } else if (selectedInfobox.infoboxType === "Text") {
            // MainPlain.setAttribute("visible", "false");
            infoBox.setAttribute(
              "animation__startAnimation",
              "property:scale;from:0 0 0;to:1 1 1; dur: 1500;enabled:true"
            );
          } else if (selectedInfobox.infoboxType === "Audio") {
            MainPlain.setAttribute("visible", "false");
            infoBox.setAttribute("visible", "false");
            var audio1 = document.getElementById("audio-1");
            audio1.components.sound.pauseSound();
            var audio2 = document.getElementById("audio-2");
            audio2.setAttribute("sound", "src", selectedInfobox.audioPath);
            if (
              selectedInfobox.audioPath != "" &&
              selectedInfobox.audioPath != undefined
            ) {
              audio2.components.sound.playSound();
            }
          } else if (selectedInfobox.infoboxType === "Video") {
            MainPlain.setAttribute("visible", "false");
            var skyVideo = document.getElementById("videoskyid");
            var aVideoId = document.getElementById("aVideoId");
            if (selectedInfobox.videoPath != undefined) {
              aVideoId.setAttribute("src", "#videoskyid");
              skyVideo.setAttribute("src", selectedInfobox.videoPath);
              if (skyVideo) {
                var audio1 = document.getElementById("audio-1");
                audio1.components.sound.pauseSound();
                skyVideo.play();
              }
            } else {
              skyVideo.setAttribute("src", "");
              aVideoId.setAttribute("src", "#blankVideo");
            }
            infoBox.setAttribute(
              "animation__startAnimation",
              "property:scale;from:0 0 0;to:1 1 1; dur: 1500;enabled:true"
            );
          } else if (selectedInfobox.infoboxType === "ImageText") {
            MainPlain.setAttribute("position", "0 -17.194 -10");
            infoBoxTextPlane.setAttribute("visible", "true");
            infoBox.setAttribute(
              "animation__startAnimation",
              "property:scale;from:0 0 0;to:1 1 1; dur: 1500;enabled:true"
            );
            infoBoxTextPlane.setAttribute(
              "animation__startAnimation2",
              "property:scale;from:0 0 0;to:1 1 1; dur: 1500;enabled:true"
            );
          } else if (selectedInfobox.infoboxType === "AudioText") {
            // MainPlain.setAttribute("visible", "false");
            var audio1 = document.getElementById("audio-1");
            audio1.components.sound.pauseSound();
            var audio2 = document.getElementById("audio-2");
            audio2.setAttribute("sound", "src", selectedInfobox.audioPath);
            if (
              selectedInfobox.audioPath != "" &&
              selectedInfobox.audioPath != undefined
            ) {
              audio2.components.sound.playSound();
            }
            infoBox.setAttribute(
              "animation__startAnimation",
              "property:scale;from:0 0 0;to:1 1 1; dur: 1500;enabled:true"
            );
          } else if (selectedInfobox.infoboxType === "AudioImage") {
            MainPlain.setAttribute("visible", "false");
            var audio1 = document.getElementById("audio-1");
            audio1.components.sound.pauseSound();
            var audio2 = document.getElementById("audio-2");
            audio2.setAttribute("sound", "src", selectedInfobox.audioPath);
            if (
              selectedInfobox.audioPath != "" &&
              selectedInfobox.audioPath != undefined
            ) {
              audio2.components.sound.playSound();
            }
            infoBox.setAttribute(
              "animation__startAnimation",
              "property:scale;from:0 0 0;to:1 1 1; dur: 1500;enabled:true"
            );
          } else if (selectedInfobox.infoboxType === "AudioTextImage") {
            MainPlain.setAttribute("position", "0 -17.194 -10");
            infoBoxTextPlane.setAttribute("visible", "true");
            var audio1 = document.getElementById("audio-1");
            audio1.components.sound.pauseSound();
            var audio2 = document.getElementById("audio-2");
            audio2.setAttribute("sound", "src", selectedInfobox.audioPath);
            if (
              selectedInfobox.audioPath != "" &&
              selectedInfobox.audioPath != undefined
            ) {
              audio2.components.sound.playSound();
            }
            infoBox.setAttribute(
              "animation__startAnimation",
              "property:scale;from:0 0 0;to:1 1 1; dur: 1500;enabled:true"
            );
            infoBoxTextPlane.setAttribute(
              "animation__startAnimation2",
              "property:scale;from:0 0 0;to:1 1 1; dur: 1500;enabled:true"
            );
          } else if (selectedInfobox.infoboxType === "VideoText") {
            MainPlain.setAttribute("position", "0 -17.194 -10");
            infoBoxTextPlane.setAttribute("visible", "true");
            var skyVideo = document.getElementById("videoTextskyid");
            var aVideoId = document.getElementById("aVideoId");
            if (selectedInfobox.videoPath != undefined) {
              aVideoId.setAttribute("src", "#videoTextskyid");
              skyVideo.setAttribute("src", selectedInfobox.videoPath);
              if (skyVideo) {
                var audio1 = document.getElementById("audio-1");
                audio1.components.sound.pauseSound();
                skyVideo.play();
              }
            } else {
              skyVideo.setAttribute("src", "");
              aVideoId.setAttribute("src", "#blankVideoText");
            }
            infoBox.setAttribute(
              "animation__startAnimation",
              "property:scale;from:0 0 0;to:1 1 1; dur: 1500;enabled:true"
            );
            infoBoxTextPlane.setAttribute(
              "animation__startAnimation2",
              "property:scale;from:0 0 0;to:1 1 1; dur: 1500;enabled:true"
            );
          }
          overlay.setAttribute(
            "position",
            newPos(hotspotPosition.x, hotspotPosition.y, hotspotPosition.z)
          );

          isInfoboxClick = true;

          // setTimeout(()=>{
          // 	 isInfoboxClick = true;
          // },1500);
          for (i = 0; i < activeScreen.infoboxes.length; i++) {
            var infohotspot = document.getElementById(
              "sphere-infohotspot-" + i
            );
            infohotspot.removeAttribute("animation");
            infohotspot.setAttribute(
              "animation__aEndAnimation",
              "property:scale;from:1 1 1;to:0 0 0; dur: 1300;enabled:true"
            );
          }
          for (j = 0; j < activeScreen.teleports.length; j++) {
            var hideteleport = document.getElementById("sphere-hotspot-" + j);
            var hidespherehotspotbg = document.getElementById(
              "sphere-hotspot-bg-" + j
            );
            if (hideteleport != null) {
              hideteleport.setAttribute("visible", "false");
            }
            if (hidespherehotspotbg != null) {
              hidespherehotspotbg.setAttribute("visible", "false");
            }
          }
          for (k = 0; k < focusTextIndexArray.length; k++) {
            var hidefocusText = document.getElementById("focusText" + k);
            if (hidefocusText != null) {
              hidefocusText.setAttribute("visible", "false");
            }
          }
        }
      }
    });

    this.el.addEventListener("mouseenter", function () {
      if (experienceStarted === true) {
        if (previousImage != "") {
          var skyImage1 = document.querySelector("#skyImage1");
          skyImage1.setAttribute("src", previousImage);
        }
        var sphere = document.querySelector("#" + this.getAttribute("id"));
        //sphere.emit("animationBegin-" + this.getAttribute('id').split("-")[2]);
        sphere.setAttribute(
          "animation__animationBegin",
          "property:rotation;to:0 360 0; dur: 1500;enabled:true;loop:true"
        );
      }
    });

    this.el.addEventListener("mouseleave", function () {
      if (experienceStarted === true) {
        if (this.getAttribute("id").split("-")[1] != "infohotspot") {
          var cur = document.querySelector("#cursor");
          cur.setAttribute("startAnimantion", "");
          cur.setAttribute(
            "startAnimantion",
            "property: geometry.thetaLength;from:360;to:0; dur: 0;fill:none;enable:true"
          );

          var sphere = document.querySelector("#" + this.getAttribute("id"));
          if (sphere)
            //sphere.emit("animationEnd-" + this.getAttribute('id').split("-")[2]);
            sphere.removeAttribute("animation__animationBegin");
        }
      }
    });
  },
});

AFRAME.registerComponent("infobox-leave", {
  init: function () {
    this.el.addEventListener("mouseleave", function () {
      if (experienceStarted === true) {
        if (isInfoboxClick) {
          var audio2 = document.getElementById("audio-2");
          audio2.components.sound.stopSound();
          var audio1 = document.getElementById("audio-1");
          var srcCheck = audio1.getAttribute("sound");
          if (srcCheck.src != "") {
            audio1.components.sound.playSound();
          }

          var cur = document.querySelector("#cursor");
          cur.setAttribute("startAnimantion", "");
          cur.setAttribute(
            "startAnimantion",
            "property: geometry.thetaLength;from:360;to:0; dur: 0;fill:none;enable:true"
          );

          var infoBox = document.querySelector(
            "#infobox-plane-" + this.getAttribute("id").split("-")[2]
          );
          var MainPlain = document.querySelector(
            "#infobox-MainPlane-" + this.getAttribute("id").split("-")[2]
          );
          var infoBoxTextPlane = document.querySelector(
            "#infobox-planeText-" + this.getAttribute("id").split("-")[2]
          );
          var bannerEntity = document.querySelector(
            "#hotspot-entity-" + this.getAttribute("id").split("-")[2]
          );

          // MainPlain.setAttribute("visible", "true");
          infoBox.removeAttribute("animation__startAnimation");
          MainPlain.removeAttribute("animation__startAnimation1");
          infoBoxTextPlane.removeAttribute("animation__startAnimation2");

          // infoBox.setAttribute("animation__endAnimation","property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true;");
          MainPlain.setAttribute(
            "animation__endAnimation1",
            "property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true;"
          );

          var selectedInfobox =
            activeScreen.infoboxes[this.getAttribute("id").split("-")[2]];
          if (selectedInfobox.infoboxType === "Audio") {
          } else if (selectedInfobox.infoboxType === "Text") {
            infoBox.setAttribute(
              "animation__endAnimation",
              "property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true;"
            );
          } else if (selectedInfobox.infoboxType === "Image") {
            infoBox.setAttribute(
              "animation__endAnimation",
              "property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true;"
            );
          } else if (selectedInfobox.infoboxType === "Video") {
            infoBox.setAttribute(
              "animation__endAnimation",
              "property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true;"
            );
            var skyVideo = document.getElementById("videoskyid");
            if (skyVideo) {
              skyVideo.pause();
            }
            skyVideo.removeAttribute("src");
          } else if (selectedInfobox.infoboxType === "ImageText") {
            MainPlain.setAttribute("position", "0 0 -10");
            MainPlain.setAttribute("visible", "false");
            infoBoxTextPlane.setAttribute(
              "animation__endAnimation2",
              "property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true;"
            );
            infoBox.setAttribute(
              "animation__endAnimation",
              "property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true;"
            );
          } else if (selectedInfobox.infoboxType === "AudioText") {
            infoBox.setAttribute(
              "animation__endAnimation",
              "property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true;"
            );
          } else if (selectedInfobox.infoboxType === "AudioImage") {
            var audio2 = document.getElementById("audio-2");
            audio2.src="";
            infoBox.setAttribute(
              "animation__endAnimation",
              "property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true;"
            );
          } else if (selectedInfobox.infoboxType === "AudioTextImage") {
            MainPlain.setAttribute("position", "0 0 -10");
            MainPlain.setAttribute("visible", "false");
            infoBoxTextPlane.setAttribute(
              "animation__endAnimation2",
              "property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true;"
            );
            infoBox.setAttribute(
              "animation__endAnimation",
              "property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true;"
            );
          } else if (selectedInfobox.infoboxType === "VideoText") {
            var skyVideo = document.getElementById("videoTextskyid");
            if (skyVideo) {
              skyVideo.pause();
            }
            skyVideo.removeAttribute("src");
            MainPlain.setAttribute("position", "0 0 -10");
            MainPlain.setAttribute("visible", "false");
            infoBox.setAttribute(
              "animation__endAnimation",
              "property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true;"
            );
            infoBoxTextPlane.setAttribute(
              "animation__endAnimation2",
              "property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true;"
            );
          }
          setTimeout(() => {
            bannerEntity.setAttribute("scale", "1 1 1");
            infoBox.setAttribute("visible", "false");
            var sphere = document.querySelector(
              "#sphere-infohotspot-" + this.getAttribute("id").split("-")[2]
            );
            var overlay = document.querySelector(
              "#overlay-plane-" + this.getAttribute("id").split("-")[2]
            );
            sphere.setAttribute("visible", "true");
            sphere.setAttribute("position", "0 0 0");
            overlay.setAttribute("position", "2000 2000 2000");
            infoBox.setAttribute("position", "2000 2000 2000");
            var hotspotEntity = document.querySelector(
              "#hotspot-entity-" + this.getAttribute("id").split("-")[2]
            );
            hotspotEntity.setAttribute("scale", "1 1 1 ");
            infoBox.removeAttribute("animation__endAnimation");
            MainPlain.removeAttribute("animation__endAnimation1");
            infoBoxTextPlane.removeAttribute("animation__endAnimation2");
          }, 2000);
          for (i = 0; i < activeScreen.infoboxes.length; i++) {
            var showinfohotspot = document.getElementById(
              "sphere-infohotspot-" + i
            );
            showinfohotspot.removeAttribute("animation__aEndAnimation");
            showinfohotspot.setAttribute(
              "animation",
              "property:scale;from:0 0 0;to:1 1 1;dur: 1500;enabled:true;"
            );
          }
          for (j = 0; j < activeScreen.teleports.length; j++) {
            var showteleport = document.getElementById("sphere-hotspot-" + j);
            var showspherehotspotbg = document.getElementById(
              "sphere-hotspot-bg-" + j
            );
            if (showteleport != null) {
              showteleport.setAttribute("visible", "true");
            }
            if (showspherehotspotbg != null) {
              showspherehotspotbg.setAttribute("visible", "true");
            }
          }
          for (k = 0; k < focusTextIndexArray.length; k++) {
            var showfocusText = document.getElementById("focusText" + k);
            if (showfocusText != null) {
              showfocusText.setAttribute("visible", "true");
            }
          }
          isInfoboxClick = false;
        }
      }
    });
  },
});

var imVirtualTourJson = "";
var activeScreen = "";
var isSphereSelected = false;
var previousImage = "";
var hotspotsToSave = [];
var placeToSave = [];
var hotspotIndex = 0;
var focusTextIndexArray = [];
function generateRoom(activeScreen) {
  var sphereArray = document.querySelectorAll(".hotspot-entity");
  if (sphereArray.length > 0) {
    for (var i = 0; i < sphereArray.length; i++) {
      // sphereArray.forEach(sphere => {
      sphereArray[i].parentNode.removeChild(sphereArray[i]);
      // });
    }
  }

  var audio1 = document.getElementById("audio-1");
  audio1.components.sound.stopSound();

  if (activeScreen.placeAudio) {
    audio1.setAttribute("sound", "src", activeScreen.placeAudio);
    if (experienceStarted) {
      if (activeScreen.placeAudio != "") {
        audio1.components.sound.playSound();
      }
    }
  } else {
    audio1.setAttribute("sound", "src", "");
  }

  var skyImage = document.querySelector("#skyImage");
  skyImage.setAttribute("src", activeScreen.placeSky);
  previousImage = activeScreen.placeSky;
  // skyImage.emit("smallSphereAnimationStart");
  // skyImage.emit("bigSphereAnimationStart");

  setTimeout(function () {
    for (let i = 0; i < activeScreen.teleports.length; i++) {
      addHotspot(activeScreen.teleports[i], i);
    }

    for (let i = 0; i < activeScreen.infoboxes.length; i++) {
      addInfoHotspot(activeScreen.infoboxes[i], i);
    }
  }, 2000);
  if (activeScreen.entry_view) {
    var camid = document.querySelector("#cameraId");
    var camrot = camid.getAttribute("rotation");
    var cam = document.querySelector("#CamEntity");
    oldpos = activeScreen.entry_view.split(" ")[1];
    cam.setAttribute("rotation", "0 " + (parseInt(oldpos) - camrot.y) + " 0");
  }
}

function addHotspot(teleport, index) {
  if (teleport.teleportToPlaceIndex != null) {
    var sceneEl = document.querySelector("a-scene");

    var hotSpotEntity = document.createElement("a-entity");
    hotSpotEntity.setAttribute("id", "hotspot-entity");
    hotSpotEntity.setAttribute("class", "hotspot-entity");
    hotSpotEntity.setAttribute("position", teleport.teleportPosition);
    hotSpotEntity.setAttribute("look-at", "src:#cameraId");
    hotSpotEntity.setAttribute("scale", "1 1 1");

    sceneEl.appendChild(hotSpotEntity);
    var newHotspot = document.createElement("a-sphere");
    newHotspot.setAttribute("id", "sphere-hotspot-" + index);
    //	newHotspot.setAttribute('color', '#00f');
    newHotspot.setAttribute("position", "0 0 0");
    newHotspot.setAttribute("radius", teleport.teleportSize);
    newHotspot.setAttribute("opacity", teleport.teleportVisibility);
    newHotspot.setAttribute("shader", "flat");
    newHotspot.setAttribute("src", teleport.teleportToPlaceImage);
    newHotspot.setAttribute("class", "clickable");
    newHotspot.setAttribute("hotspotclick", "");
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

    hotspotSphereBG.setAttribute(
      "animation",
      "property:scale;from:0.9 0.9 0.9;to:1.1 1.1 1.1;loop:true;enabled:true;dir:alternate;autoplay:true"
    );

    //Hotspot Background
    var teleportText = document.createElement("a-text");
    teleportText.setAttribute("id", "focusText" + index);
    teleportText.setAttribute("text", { align: "center", width: 50 });
    teleportText.setAttribute("value", teleport.focusText);
    // teleportText.setAttribute("geometry", "primitive:plane");
    teleportText.setAttribute("material", "transparent:true");
    teleportText.setAttribute("material", "alphaTest: 1");
    // teleportText.setAttribute('look-at','src:#cameraId');
    hotSpotEntity.appendChild(teleportText);
    teleportText.setAttribute(
      "position",
      "0 " + (-teleport.teleportSize - 5) + " 0"
    );
    focusTextIndexArray.push(hotspotIndex);
    hotspotIndex++;
  }
}

function addInfoHotspot(teleport, index) {
  var sceneEl = document.querySelector("a-scene");
  var hotSpotEntity = document.createElement("a-entity");
  hotSpotEntity.setAttribute("id", "hotspot-entity-" + index);
  hotSpotEntity.setAttribute("class", "hotspot-entity");
  hotSpotEntity.setAttribute("position", teleport.infoboxPosition);
  hotSpotEntity.setAttribute("look-at", "src: #cameraId");
  hotSpotEntity.setAttribute("sky", "");
  hotSpotEntity.setAttribute("scale", "1 1 1");

  sceneEl.appendChild(hotSpotEntity);
  var newHotspot = document.createElement("a-sphere");
  newHotspot.setAttribute("id", "sphere-infohotspot-" + index);
  newHotspot.setAttribute("class", "clickable");
  newHotspot.setAttribute("position", "0 0 0");
  newHotspot.setAttribute("radius", teleport.infoboxSize);
  newHotspot.setAttribute("opacity", teleport.infoboxVisibility);
  newHotspot.setAttribute("shader", "flat");
  newHotspot.setAttribute("hotspotclick", "");
  if (teleport.infoBannerBgColor) {
    newHotspot.setAttribute("color", teleport.infoBannerBgColor);
  } else {
    newHotspot.setAttribute("color", "#ff0000");
  }
  hotSpotEntity.appendChild(newHotspot);

  var infoboxPlane1 = document.createElement("a-plane");
  infoboxPlane1.setAttribute("id", "infobox-MainPlane-" + index);
  if (teleport.infoBgColor) {
    infoboxPlane1.setAttribute("color", teleport.infoBgColor);
  } else {
    infoboxPlane1.setAttribute("color", "#000000");
  }
  infoboxPlane1.setAttribute("geometry", "height:15;width:30");
  if (teleport.infoBgOpacity) {
    infoboxPlane1.setAttribute(
      "material",
      "side:double;opacity:" + teleport.infoBgOpacity + ";transparent:true"
    );
  } else {
    infoboxPlane1.setAttribute(
      "material",
      "side:double;opacity:0.5;transparent:true"
    );
  }
  infoboxPlane1.setAttribute("position", "2000 2000 2000");
  hotSpotEntity.appendChild(infoboxPlane1);

  var infoboxPlane = document.createElement("a-plane");
  infoboxPlane.setAttribute("id", "infobox-plane-" + index);
  if (teleport.infoBgColor) {
    infoboxPlane.setAttribute("color", teleport.infoBgColor);
  } else {
    infoboxPlane.setAttribute("color", "#000000");
  }
  infoboxPlane.setAttribute("geometry", "height:15;width:30");
  if (teleport.infoBgOpacity) {
    infoboxPlane.setAttribute(
      "material",
      "side:double;opacity:" + teleport.infoBgOpacity + ";transparent:true"
    );
  } else {
    infoboxPlane.setAttribute(
      "material",
      "side:double;opacity:0.5;transparent:true"
    );
  }
  infoboxPlane.setAttribute("position", "2000 2000 2000");
  hotSpotEntity.appendChild(infoboxPlane);

  var infoboxPlaneText = document.createElement("a-plane");
  infoboxPlaneText.setAttribute("id", "infobox-planeText-" + index);
  if (teleport.infoBgColor) {
    infoboxPlaneText.setAttribute("color", teleport.infoBgColor);
  } else {
    infoboxPlaneText.setAttribute("color", "#000000");
  }
  infoboxPlaneText.setAttribute("geometry", "height:15;width:30");

  if (teleport.infoBgOpacity) {
    infoboxPlaneText.setAttribute(
      "material",
      "side:double;opacity:" + teleport.infoBgOpacity + ";transparent:true"
    );
  } else {
    infoboxPlaneText.setAttribute(
      "material",
      "side:double;opacity:0.5;transparent:true"
    );
  }
  infoboxPlaneText.setAttribute("position", "2000 2000 2000");
  infoboxPlaneText.setAttribute("visible", "false");
  hotSpotEntity.appendChild(infoboxPlaneText);

  if (teleport.infoboxType === "Image") {
    infoboxPlane.setAttribute("color", "#fff");
    infoboxPlane.setAttribute("material", "src", "");
    infoboxPlane.setAttribute("geometry", "height:16.88;width:30");
    infoboxPlane.setAttribute("material", "side:double;opacity:1;shader:flat");
    infoboxPlane.setAttribute("material", "src", teleport.imagePath);
  } else if (teleport.infoboxType === "Text") {
    var infoboxText = document.createElement("a-text");
    infoboxText.setAttribute(
      "text",
      "width:28;baseline:top;wrapCount:48;lineHeight:50;alphaTest:4"
    );
    infoboxText.setAttribute("value", teleport.text);
    infoboxText.setAttribute("position", "-13.86466 5.9 1.12607");

    if (teleport.infoFontColor) {
      infoboxText.setAttribute("color", teleport.infoFontColor);
    }
    infoboxPlane.appendChild(infoboxText);
  } else if (teleport.infoboxType === "Video") {
    var aVideo = "";
    aVideo = document.createElement("a-video");
    aVideo.setAttribute("id", "aVideoId");
    aVideo.setAttribute("src", "");
    if (teleport.videoPath) {
      aVideo.setAttribute("src", "#videoskyid");
    } else {
      aVideo.setAttribute("src", "#blankVideo");
    }
    aVideo.setAttribute("position", "0 0 0.500");
    aVideo.setAttribute("geometry", "height:16.88;width:30");
    aVideo.setAttribute("crossorigin", "anonymous");
    infoboxPlane.appendChild(aVideo);
  } else if (teleport.infoboxType === "ImageText") {
    infoboxPlane.setAttribute("color", "#fff");
    infoboxPlane.setAttribute("material", "src", "");
    infoboxPlane.setAttribute("geometry", "height:16.88;width:30");
    infoboxPlane.setAttribute("material", "side:double;opacity:1;shader:flat");
    infoboxPlane.setAttribute("material", "src", teleport.imagePath);

    var infoboxText = document.createElement("a-text");
    infoboxText.setAttribute(
      "text",
      "width:28;baseline:top;wrapCount:48;lineHeight:50;alphaTest:4"
    );
    infoboxText.setAttribute("value", teleport.text);
    infoboxText.setAttribute("position", "-13.86466 5.9 1.12607");

    if (teleport.infoFontColor) {
      infoboxText.setAttribute("color", teleport.infoFontColor);
    }
    infoboxPlaneText.appendChild(infoboxText);
    // infoboxPlaneText.setAttribute("visible", "false");
  } else if (teleport.infoboxType === "AudioText") {
    var infoboxText = document.createElement("a-text");
    infoboxText.setAttribute(
      "text",
      "width:28;baseline:top;wrapCount:48;lineHeight:50;alphaTest:4"
    );
    infoboxText.setAttribute("value", teleport.text);
    infoboxText.setAttribute("position", "-13.86466 5.9 1.12607");

    if (teleport.infoFontColor) {
      infoboxText.setAttribute("color", teleport.infoFontColor);
    }
    infoboxPlane.appendChild(infoboxText);
  } else if (teleport.infoboxType === "AudioImage") {
    infoboxPlane.setAttribute("color", "#fff");
    infoboxPlane.setAttribute("material", "src", "");
    infoboxPlane.setAttribute("geometry", "height:16.88;width:30");
    infoboxPlane.setAttribute("material", "side:double;opacity:1;shader:flat");
    infoboxPlane.setAttribute("material", "src", teleport.imagePath);
  } else if (teleport.infoboxType === "AudioTextImage") {
    infoboxPlane.setAttribute("color", "#fff");
    infoboxPlane.setAttribute("material", "src", "");
    infoboxPlane.setAttribute("geometry", "height:16.88;width:30");
    infoboxPlane.setAttribute("material", "side:double;opacity:1;shader:flat");
    infoboxPlane.setAttribute("material", "src", teleport.imagePath);

    var infoboxText = document.createElement("a-text");
    infoboxText.setAttribute(
      "text",
      "width:28;baseline:top;wrapCount:48;lineHeight:50;alphaTest:4"
    );
    infoboxText.setAttribute("value", teleport.text);
    infoboxText.setAttribute("position", "-13.86466 5.9 1.12607");

    if (teleport.infoFontColor) {
      infoboxText.setAttribute("color", teleport.infoFontColor);
    }
    infoboxPlaneText.appendChild(infoboxText);
  } else if (teleport.infoboxType === "VideoText") {
    var aVideo = "";
    aVideo = document.createElement("a-video");
    aVideo.setAttribute("id", "aVideoId");
    aVideo.setAttribute("src", "");
    if (teleport.videoPath) {
      aVideo.setAttribute("src", "#videoTextskyid");
    } else {
      aVideo.setAttribute("src", "#blankVideoText");
    }
    aVideo.setAttribute("position", "0 0 0.500");
    aVideo.setAttribute("geometry", "height:16.88;width:30");
    aVideo.setAttribute("crossorigin", "anonymous");
    infoboxPlane.appendChild(aVideo);
    var infoboxText = document.createElement("a-text");
    infoboxText.setAttribute(
      "text",
      "width:28;baseline:top;wrapCount:48;lineHeight:50;alphaTest:4"
    );
    infoboxText.setAttribute("value", teleport.text);
    infoboxText.setAttribute("position", "-13.86466 5.9 1.12607");

    if (teleport.infoFontColor) {
      infoboxText.setAttribute("color", teleport.infoFontColor);
    }
    infoboxPlaneText.appendChild(infoboxText);
  }

  infoboxPlane.setAttribute("visible", "false");
  var infoboxOverlay = document.createElement("a-entity");
  infoboxOverlay.setAttribute("id", "overlay-plane-" + index);
  infoboxOverlay.setAttribute("obj-model", "obj:assets/images/moonlight.obj");
  infoboxOverlay.setAttribute(
    "material",
    "src:assets/images/tvscreenplane.jpg;side:double;transparent:true;opacity:0"
  );
  infoboxOverlay.setAttribute("class", "clickable");
  infoboxOverlay.setAttribute("infobox-leave", "");
  infoboxOverlay.setAttribute("visible", "false");
  infoboxOverlay.setAttribute("scale", "0.6 0.6 0.6");
  infoboxOverlay.setAttribute("position", "2000 2000 2000");
  infoboxOverlay.setAttribute("look-at", "src: #cameraId");
  sceneEl.appendChild(infoboxOverlay);
  hotspotIndex++;
}

function newPos(x, y, z) {
  var r = Math.pow(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2), 0.5);
  var phy = Math.acos(z / r);
  var thita = Math.asin(y / (r * Math.sin(phy)));
  if ((x < 0 && z < 0) || (x < 0 && z > 0)) {
    phy = -phy; //+ (Math.PI);
    thita = -thita;
  }
  r = r - 1;
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
AFRAME.registerComponent("sky", {
  schema: {
    default: "",
  },
  init() {
    this.el.addEventListener("mouseleave", () => {
      if (experienceStarted === true) {
        var cur = document.querySelector("#cursor");
        cur.setAttribute("startAnimantion", "");
        cur.setAttribute(
          "startAnimantion",
          "property: geometry.thetaLength;from:360;to:0; dur: 0;fill:none;enable:true"
        );
        // cur.emit("startAnimantion");
      }
    });
  },
});
