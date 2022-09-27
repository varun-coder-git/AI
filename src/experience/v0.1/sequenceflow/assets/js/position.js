
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

var storypointsdata;
var experienceData;
var experienceStarted = false;
var clicked = false;
var callToTacking = new TrackingData();
var focusTime = 0,
screenActiveTime = 0;
var framename = "";
var action = "";
var ExperienceName = "";
var startTracking = false;
var xapiEnable = false;
var nosafari = false;
// var userAgent = navigator.userAgent;
// if (userAgent.includes("Mobile") || userAgent.includes("Android") || userAgent.includes("iPhone")) {

//   var cameraId = document.querySelector('#cursor');
//   cameraId.removeAttribute('cursor');
//   cameraId.setAttribute('scale', '1 1 1');
//   cameraId.setAttribute('cursor', 'fuse', 'true; fuseTimeout: 1500;');
// }

$(document).ready(() => {
  var startExperienteBtn = document.getElementById('start_experience');
  startExperienteBtn.onclick = function () {
     cam = document.getElementById("cameraId");
     cam.setAttribute("animation","enabled:false");
    cam.setAttribute("animation__one","enabled:true");
    ascene.style.zIndex = 'auto';
    document.getElementById('container').style.display = "none";
    document.getElementById('loaderq').style.display = "none";
    experienceStarted = true;
    countdown();
    // mainVideo(customObj.Frame.frameVideoSrc1);
    var vid = document.querySelector('#vid');
    vid.load();
    setTimeout(function () {
      vid.play();
      setTimeout(function () {
        vid.pause();
        vid.load();
      }, 50);
    }, 1000);
    if (mode == 'EXP') {
      document.querySelector('a-scene').enterVR();
    }
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') != -1) {
      if (ua.indexOf('chrome') == -1) {
        var audio1 = document.getElementById('audio1');
        audio1.components.sound.playSound();
        audio1.setAttribute('sound', 'volume:0;');
        nosafari = true;
      }
    }
  };

});

function countdown() {
  startTracking = true;
  callToTacking.callToApi(params);
  addExperienceResult(params.UserId, params.PatronId, params.PublishedExperienceId, 0);

  function tick() {
    focusTime++;
    screenActiveTime++;
    if (screenActiveTime == 5) {
      addExperienceView(params.PatronId, params.PublishedExperienceId);
    }
    if (screenActiveTime % 10 == 0)
      updateExperienceResult(10, 0, 0, "N/A");
    setTimeout(tick, 1000);
  }
  tick();
  if (document.querySelector('#videoskyid'))
    document.querySelector('#videoskyid').play();
  //   var skyVideo = document.querySelector('#videoskyid');
  //             if(skyVideo)
  //                 skyVideo.play();
  // var ua = navigator.userAgent.toLowerCase(); 
  // if (ua.indexOf('safari') != -1) { 
  //   if (ua.indexOf('chrome') ==-1 ) {
  //       console.log("Safari browser");
  //     var audio1 = document.getElementById('audio1');
  //     audio1.components.sound.playSound();
  //     audio1.setAttribute('sound','volume:0;');
  //    }
  // }


}

var params = {
  "UserId": "",
  "PatronId": "",
  "PublishedExperienceId": "",
  "RoomId": "",
  "Actor": "",
  "Verb": "",
  "Object": "",
  "Sentence": ""
};

function assignVerboseData(data) {
  if (data.EnablexAPI == 1) {
    xapiEnable = data.EnablexAPI
    callToTacking.setData(true, true);
    setXAPIData(data);
  } else
    callToTacking.setData(false, true);
  params.UserId = data.UserId;
  params.PatronId = data.patronId;
  params.PublishedExperienceId = data.Id;
  params.RoomId = data.roomId;
  if (data.patronName != null)
    params.Actor = data.patronName;
  else
    params.Actor = 'Guest';
  params.Verb = "Started watching";
  params.Object = data.ExperienceName;
  params.Sentence = params.Actor + " Started watching " + data.ExperienceName;
  if (xapiEnable) {
    sendToXapi("Launched", "launched", data.ExperienceName, data.ExperienceName.replace(/\s/g, ''));
  }
}

function sendToXapi(verb, urlVerb, objectText, ObjectUrlName) {
  sendVerboseToXapi(verb, "http://adlnet.gov/expapi/verbs/" + urlVerb, objectText, "http://adlnet.gov/expapi/activities/AreaGuide", "http://id.tincanapi.com/activity/experizer-template/" + ObjectUrlName.toLowerCase(), "http://adlnet.gov/expapi/activities/course", "Activity");
}
function hexToRgb(hex, opacity) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    alpha: opacity
  } : null;
}

function loadExperience(data, ExperienceName) {
  storypointsdata = data;
  //if json includes splashbgcolor and opacity
  if (storypointsdata.splashBackgroundColor && storypointsdata.Opacity) {
    var rgbformat = hexToRgb(storypointsdata.splashBackgroundColor, storypointsdata.Opacity);
    document.getElementById('innerInfo').style.backgroundColor = "rgba(" + rgbformat.r + "," + rgbformat.g + "," + rgbformat.b + "," + rgbformat.alpha + ")";
  }

  //if json includes splashheadercolor
  if (storypointsdata.splashHeaderColor) {
    document.getElementById('titleText').style.color = storypointsdata.splashHeaderColor;
  }
  document.getElementById('titleText').innerHTML = ExperienceName;
  document.getElementById('instruction').innerHTML = storypointsdata.splash_instruction;
  document.getElementById('titleDescription').innerHTML = storypointsdata.launch_text;
  document.getElementById('splashLogo').src = storypointsdata.splash_image;
loggedin = true;
  var assets = document.querySelector('a-assets');
  var scene = document.querySelector('a-scene');
  if (storypointsdata.imageSkyPath) {
    var aSky = '';
    aSky = document.createElement('a-sky');
    aSky.setAttribute('src', storypointsdata.imageSkyPath);
    aSky.setAttribute('crossorigin', 'anonymous');
    scene.appendChild(aSky);
  } else {
    var skyVideo = document.createElement('video');
    skyVideo.setAttribute('id', "videoskyid");
    skyVideo.setAttribute('src', storypointsdata.videoskypath);
    // skyVideo.setAttribute('autoplay', 'true');
    skyVideo.setAttribute('loop', '');
    skyVideo.setAttribute('crossorigin', 'anonymous');
    assets.appendChild(skyVideo);
    var aVideoSphere = '';
    aVideoSphere = document.createElement('a-videosphere');
    aVideoSphere.setAttribute('src', '#videoskyid');
    aVideoSphere.setAttribute('crossorigin', 'anonymous');
    scene.appendChild(aVideoSphere);
  }
  var scene = document.getElementById("sceneid");
  for (i = 1; i <= storypointsdata.actionPoints.length; i++) {
    if (storypointsdata.actionPoints[i - 1].actionSize === "small") {
      radiusAction = 1.5;
    } else if (storypointsdata.actionPoints[i - 1].actionSize === "medium") {
      radiusAction = 2.5;
    } else {
      radiusAction = 4;
    }

    var background = '';
    background = document.createElement('a-entity');
    background.setAttribute('id', i + "background");
    background.classList.add('clickable');
    background.setAttribute('geometry', "primitive:plane; height: " + radiusAction + "; width: " + radiusAction);
    background.setAttribute('opacity', '0.9');
    background.setAttribute('look-at', "src: #mainCam");

    background.setAttribute('set-sky', storypointsdata.actionPoints[i - 1].mediatype + " " + i);
    background.setAttribute('visible', 'false');
    background.setAttribute('transparent', 'true');
    var posbackground = storypointsdata.actionPoints[i - 1].actionPointPosition.split(" ");
    background.setAttribute('position', posbackground[0] + " " + posbackground[1] + " " + posbackground[2]);

    scene.appendChild(background);

    var aimgPlaneStartAnimation = '';
    aimgPlaneStartAnimation = document.createElement('a-animation');
    aimgPlaneStartAnimation.setAttribute('attribute', "scale");
    aimgPlaneStartAnimation.setAttribute('dur', "1500");
    aimgPlaneStartAnimation.setAttribute('fill', "forwards");
    aimgPlaneStartAnimation.setAttribute('to', "17.5 19.5 1");
    aimgPlaneStartAnimation.setAttribute('begin', "imgPlaneStartAnimation");
    background.appendChild(aimgPlaneStartAnimation);

    var aimgPlaneendAnimation = '';
    aimgPlaneendAnimation = document.createElement('a-animation');
    aimgPlaneendAnimation.setAttribute('attribute', "scale");
    aimgPlaneendAnimation.setAttribute('dur', "1500");
    aimgPlaneendAnimation.setAttribute('fill', "forwards");
    //aimgPlaneendAnimation.setAttribute('from', "18 18 1");
    aimgPlaneendAnimation.setAttribute('to', "1 1 1");
    aimgPlaneendAnimation.setAttribute('begin', "imgPlaneendAnimation");
    background.appendChild(aimgPlaneendAnimation);

    var aimgPlaneStartAnimationLarge = '';
    aimgPlaneStartAnimationLarge = document.createElement('a-animation');
    aimgPlaneStartAnimationLarge.setAttribute('attribute', "scale");
    aimgPlaneStartAnimationLarge.setAttribute('dur', "1500");
    aimgPlaneStartAnimationLarge.setAttribute('fill', "forwards");
    aimgPlaneStartAnimationLarge.setAttribute('to', "6.7 8.5 1");
    aimgPlaneStartAnimationLarge.setAttribute('begin', "imgPlaneStartAnimationLarge");
    background.appendChild(aimgPlaneStartAnimationLarge);


    var aimgPlaneStartAnimationMedium = '';
    aimgPlaneStartAnimationMedium = document.createElement('a-animation');
    aimgPlaneStartAnimationMedium.setAttribute('attribute', "scale");
    aimgPlaneStartAnimationMedium.setAttribute('dur', "1500");
    aimgPlaneStartAnimationMedium.setAttribute('fill', "forwards");
    aimgPlaneStartAnimationMedium.setAttribute('to', "10.5 12.5 1");
    aimgPlaneStartAnimationMedium.setAttribute('begin', "imgPlaneStartAnimationMedium");
    background.appendChild(aimgPlaneStartAnimationMedium);


    var newTeleport = document.createElement('a-box');
    newTeleport.setAttribute('id', i);
    newTeleport.setAttribute('material', 'src', storypointsdata.actionPoints[i - 1].actionIcon);
    newTeleport.setAttribute('material', 'transparent', 'true');
    newTeleport.setAttribute('geometry', 'height', radiusAction);
    newTeleport.setAttribute('geometry', 'width', radiusAction);
    newTeleport.setAttribute('shader', "flat");
    newTeleport.setAttribute('shadow', 'cast', 'true');
    newTeleport.setAttribute('position', posbackground[0] + " " + posbackground[1] + " " + posbackground[2]);
    newTeleport.setAttribute('look-at', 'src', '#mainCam');
    newTeleport.setAttribute("visible", "false");

    if (storypointsdata.actionPoints[i - 1].actionChecked == "true") {
      var aimgPlaneStartAnimationBLink = '';
      aimgPlaneStartAnimationBLink = document.createElement('a-animation');
      aimgPlaneStartAnimationBLink.setAttribute('attribute', "scale");
      aimgPlaneStartAnimationBLink.setAttribute('dur', "700");
      aimgPlaneStartAnimationBLink.setAttribute('from', "0.5 0.5 0.5 ");
      aimgPlaneStartAnimationBLink.setAttribute('direction', "alternate-reverse");
      aimgPlaneStartAnimationBLink.setAttribute('to', "1 1 1");
      aimgPlaneStartAnimationBLink.setAttribute('repeat', "indefinite");
      aimgPlaneStartAnimationBLink.setAttribute('easing', "ease-in-out-circ");
      newTeleport.appendChild(aimgPlaneStartAnimationBLink);
    }
    if (storypointsdata.actionPoints[i - 1].actionPointVisibility == "Always Visible") {
      newTeleport.setAttribute("visible", "true");
    }
    scene.appendChild(newTeleport);
  }
  document.title = ExperienceName;
  
  if (window.matchMedia("(orientation: portrait)").matches) {
    if (storypointsdata["entry_view"]) {
      var entryView_y = storypointsdata["entry_view"].split(" ")[1];
      $("#CamEntity").attr("rotation", "0 " + (parseInt(entryView_y) - 180) + " 0");
    }    
  }

  if (window.matchMedia("(orientation: landscape)").matches) {
    if (storypointsdata["entry_view"]) {
      $("#CamEntity").attr("rotation", storypointsdata["entry_view"]);
    }  
  }  
}
// ongaze
AFRAME.registerComponent('set-sky', {
  schema: {
    default: ''
  },
  init() {

    this.el.addEventListener('mouseenter', () => {
      if (experienceStarted) {
        var mediatype = this.data.split(" ");
        if (storypointsdata.actionPoints[mediatype[1] - 1].actionPointVisibility == "Visible while gaze over object") {
          var plane = document.getElementById(mediatype[1]);
          plane.setAttribute("visible", "true");
        }
      }
    });
    this.el.addEventListener('click', () => {
      if (experienceStarted == true) {
        var infoBox = document.getElementById('infoBox');
        infoBox.setAttribute("color", '#000');
        infoBox.setAttribute("material", "opacity", "0.6");
        
        var background = document.getElementById(this.el.id);
        var mainInfo = document.getElementById('mainInfo');
        var mediatype = this.data.split(" ");
        var posvid = storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointPosition.split(" ");
        var pos = newPos(posvid[0], posvid[1], posvid[2]);
        if (storypointsdata.actionPoints[mediatype[1] - 1].actionSize === "small") {
          background.setAttribute("animation__imgPlaneStartAnimation","property: scale;from:0 0 0;to:17.5 19.5 1; dur: 1500;enabled:true;loop:true");
        } else if (storypointsdata.actionPoints[mediatype[1] - 1].actionSize === "medium") {
          background.setAttribute("animation__imgPlaneStartAnimationMedium","property: scale;from:0 0 0;to:10.5 12.5 1; dur: 1500;enabled:true;loop:true");
        } else {
          background.setAttribute("animation__aimgPlaneStartAnimationLarge","property: scale;from:0 0 0;to:6.7 8.5 1; dur: 1500;enabled:true;loop:true");
        }
        var obj = 'Marker';
        for (i = 1; i <= storypointsdata.actionPoints.length; i++) {

          var hideTeleport = document.getElementById(i);

          var aEndAnimation = '';
          aEndAnimation = document.createElement('a-animation');
          aEndAnimation.setAttribute('attribute', "opacity");
          aEndAnimation.setAttribute('dur', "1300");
          aEndAnimation.setAttribute('fill', "forwards");
          aEndAnimation.setAttribute('from', "0.9");
          aEndAnimation.setAttribute('to', "0");
          hideTeleport.appendChild(aEndAnimation);
        }
        for (i = 1; i <= storypointsdata.actionPoints.length; i++) {
          var backgroundData = document.getElementById(i + 'background');
          if (background != backgroundData) {
            var aimgPlaneStartAnimationHide = '';
            backgroundData.setAttribute("animation__imgPlaneStartAnimationHide","property: scale;to:0 0 0; dur: 1500;enabled:true;loop:true");
          }
        }
        switch (mediatype[0]) {
          case 'V':
            //obj = 'video';
            var videoframe = document.getElementById('videoframe');
            var video = document.getElementById('video1');
            var vid = document.getElementById('vid');
            videoframe.emit("startAnimationvide");
            vid.setAttribute("src", '');

            var videoSource = storypointsdata.actionPoints[mediatype[1] - 1].actionPointVideo;
            vid.setAttribute("src", videoSource);
            video.setAttribute("material", "src: ");
            video.setAttribute("visible", "true");
            video.setAttribute("material", "src: #vid");
            videoframe.setAttribute("visible", "true");
            mainInfo.setAttribute("position", pos);
            var agif = document.getElementById('nomediaGif');
            agif.setAttribute("visible", "false");
            vid.load();
            vid.play();
            var videoSphere = document.querySelector('#videoskyid');
            if (videoSphere) {
              videoSphere.muted = true;
            }
            if (videoSource == "" || videoSource == undefined || videoSource == null) {
              video.setAttribute("visible", "false");
              agif.setAttribute("visible", "true");
            }
            break;
          case 'VT':
            //obj = 'video with text';
            var textAnimation = document.getElementById('textAnimation');
            var videoframe = document.getElementById('videoframe');
            var video = document.getElementById('video1');
            var vid = document.getElementById('vid');
            videoframe.emit("startAnimationvide");
            vid.setAttribute("src", '');

            var videoSource = storypointsdata.actionPoints[mediatype[1] - 1].actionPointVideo;
            vid.setAttribute("src", videoSource);
            video.setAttribute("material", "src: ");
            video.setAttribute("visible", "true");
            video.setAttribute("material", "src: #vid");
            videoframe.setAttribute("visible", "true");
            mainInfo.setAttribute("position", pos);
            var agif = document.getElementById('nomediaGif');
            agif.setAttribute("visible", "false");
            vid.load();
            vid.play();
            if (videoSource == "" || videoSource == undefined || videoSource == null) {
              video.setAttribute("visible", "false");
              agif.setAttribute("visible", "true");
            }
            var infoBox = document.getElementById('infoBox');
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor) {
              infoBox.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
            }
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity) {
              infoBox.setAttribute('material', 'opacity', storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
            }
            infoBox.setAttribute("scale", "1.5 1.5 1.5")
            infoBox.setAttribute("visible", "true");
            var text = document.getElementById('text1');
            text.setAttribute("value", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointHeader);
            var text1 = document.getElementById('text2');
            text1.setAttribute("value", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointText);
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor) {
              text1.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
              text.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
            }
            infoBox.emit("startAnimationtext");
            textAnimation.emit("textAnimationstart");
            var videoSphere = document.querySelector('#videoskyid');
            if (videoSphere) {
              videoSphere.muted = true;
            }
            break;
          case 'A':
            //obj = 'audio';
            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf('safari') != -1) {
              if (ua.indexOf('chrome') == -1) {
                var audio1 = document.getElementById('audio1');
                var audio = document.getElementById('sound');
                audio.setAttribute("src", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                audio1.setAttribute('sound', 'src: #sound');
                audio1.setAttribute('sound', 'volume:1;');
                audio1.components.sound.playSound();
                var videoSphere = document.querySelector('#videoskyid');
                if (videoSphere) {
                  videoSphere.muted = true;
                }
              } else {
                var audio = document.getElementById('sound')
                audio.setAttribute("src", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                var audio1 = document.getElementById('audio1');

                audio1.setAttribute("sound", "src: #sound");
                audio1.components.sound.playSound();
                var videoSphere = document.querySelector('#videoskyid');
                if (videoSphere) {
                  videoSphere.muted = true;
                }
              }
            } else {
              var audio = document.getElementById('sound')
              audio.setAttribute("src", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
              var audio1 = document.getElementById('audio1');

              audio1.setAttribute("sound", "src: #sound");
              audio1.components.sound.playSound();
              var videoSphere = document.querySelector('#videoskyid');
              if (videoSphere) {
                videoSphere.muted = true;
              }
            }
            break;
          case 'AT':
            var textAnimation = document.getElementById('textAnimation');
            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf('safari') != -1) {
              if (ua.indexOf('chrome') == -1) {
                var audio1 = document.getElementById('audio1');
                var audio = document.getElementById('sound')
                audio.setAttribute("src", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                audio1.setAttribute('sound', 'src: #sound');
                audio1.setAttribute('sound', 'volume:1;');
                audio1.components.sound.playSound();
                var videoSphere = document.querySelector('#videoskyid');
                if (videoSphere) {
                  videoSphere.muted = true;
                }
              } else {
                var audio = document.getElementById('sound')
                audio.setAttribute("src", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                var audio1 = document.getElementById('audio1');

                audio1.setAttribute("sound", "src: #sound");
                audio1.components.sound.playSound();
                var videoSphere = document.querySelector('#videoskyid');
                if (videoSphere) {
                  videoSphere.muted = true;
                }
              }
            } else {
              var audio = document.getElementById('sound')
              audio.setAttribute("src", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
              var audio1 = document.getElementById('audio1');

              audio1.setAttribute("sound", "src: #sound");
              audio1.components.sound.playSound();
              var videoSphere = document.querySelector('#videoskyid');
              if (videoSphere) {
                videoSphere.muted = true;
              }
            }
            var infoBox = document.getElementById('infoBox');
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor) {
              infoBox.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
            }
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity) {
              infoBox.setAttribute('material', 'opacity', storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
            }
            // var postext = storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointPosition.split(" ");
            mainInfo.setAttribute("position", pos);
            infoBox.setAttribute("visible", "true");
            var text1 = document.getElementById('text1');
            text1.setAttribute("value", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointHeader);
            var text = document.getElementById('text2');
            text.setAttribute("value", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointText);
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor) {
              text1.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
              text.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
            }
            infoBox.emit("startAnimationtext");
            textAnimation.emit("textAnimationstart");
            var videoSphere = document.querySelector('#videoskyid');
            if (videoSphere) {
              videoSphere.muted = true;
            }
            break;
          case 'AI':
            //obj = 'audio with image'
            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf('safari') != -1) {
              if (ua.indexOf('chrome') == -1) {
                var audio1 = document.getElementById('audio1');
                var audio = document.getElementById('sound')
                audio.setAttribute("src", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                audio1.setAttribute('sound', 'src: #sound');
                audio1.setAttribute('sound', 'volume:1;');
                audio1.components.sound.playSound();
                var videoSphere = document.querySelector('#videoskyid');
                if (videoSphere) {
                  videoSphere.muted = true;
                }
              } else {
                var audio = document.getElementById('sound')
                audio.setAttribute("src", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                var audio1 = document.getElementById('audio1');

                audio1.setAttribute("sound", "src: #sound");
                audio1.components.sound.playSound();
                var videoSphere = document.querySelector('#videoskyid');
                if (videoSphere) {
                  videoSphere.muted = true;
                }
              }
            } else {
              var audio = document.getElementById('sound')
              audio.setAttribute("src", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
              var audio1 = document.getElementById('audio1');

              audio1.setAttribute("sound", "src: #sound");
              audio1.components.sound.playSound();
              var videoSphere = document.querySelector('#videoskyid');
              if (videoSphere) {
                videoSphere.muted = true;
              }
            }
            var image = document.getElementById('img1');
            image.setAttribute("src", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointImage);
            imageFrame.setAttribute("visible", "true");
            image.setAttribute("visible", "true");
            // var posimg = storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointPosition.split(" ");
            mainInfo.setAttribute("position", pos);
            imageFrame.emit("startAnimation");
            var videoSphere = document.querySelector('#videoskyid');
            if (videoSphere) {
              videoSphere.muted = true;
            }
            break;
          case 'AIT':
            //obj = 'audio with image and text';
            var textAnimation = document.getElementById('textAnimation');
            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf('safari') != -1) {
              if (ua.indexOf('chrome') == -1) {
                var audio1 = document.getElementById('audio1');
                var audio = document.getElementById('sound')
                audio.setAttribute("src", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                audio1.setAttribute('sound', 'src: #sound');
                audio1.setAttribute('sound', 'volume:1;');
                audio1.components.sound.playSound();
                var videoSphere = document.querySelector('#videoskyid');
                if (videoSphere) {
                  videoSphere.muted = true;
                }
              } else {
                var audio = document.getElementById('sound')
                audio.setAttribute("src", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                var audio1 = document.getElementById('audio1');

                audio1.setAttribute("sound", "src: #sound");
                audio1.components.sound.playSound();
                var videoSphere = document.querySelector('#videoskyid');
                if (videoSphere) {
                  videoSphere.muted = true;
                }
              }
            } else {
              var audio = document.getElementById('sound')
              audio.setAttribute("src", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
              var audio1 = document.getElementById('audio1');

              audio1.setAttribute("sound", "src: #sound");
              audio1.components.sound.playSound();
              var videoSphere = document.querySelector('#videoskyid');
              if (videoSphere) {
                videoSphere.muted = true;
              }
            }
            var image = document.getElementById('img1');
            image.setAttribute("src", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointImage);
            image.setAttribute("visible", "true");
            imageFrame.setAttribute("visible", "true");
            //var posimg = storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointPosition.split(" ");
            mainInfo.setAttribute("position", pos);
            imageFrame.emit("startAnimation");
            var infoBox = document.getElementById('infoBox');
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor) {
              infoBox.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
            }
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity) {
              infoBox.setAttribute('material', 'opacity', storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
            }
            infoBox.setAttribute("visible", "true");
            var text1 = document.getElementById('text1');
            text1.setAttribute("value", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointHeader);
            var text = document.getElementById('text2');
            text.setAttribute("value", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointText);
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor) {
              text1.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
              text.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
            }
            infoBox.emit("startAnimationtext");
            textAnimation.emit("textAnimationstart");
            var videoSphere = document.querySelector('#videoskyid');
            if (videoSphere) {
              videoSphere.muted = true;
            }
            break;
          case 'T':
            //obj = 'text';
            var textAnimation = document.getElementById('textAnimation');
            var infoBox = document.getElementById('infoBox');
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor) {
              infoBox.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
            }
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity) {
              infoBox.setAttribute('material', 'opacity', storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
            }
            //var postext = storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointPosition.split(" ");
            mainInfo.setAttribute("position", pos);
            var text = document.getElementById('text1');
            text.setAttribute("value", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointHeader);
            var text1 = document.getElementById('text2');
            text1.setAttribute("value", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointText);
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor) {
              text1.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
              text.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
            }
            infoBox.setAttribute("visible", "true");
            infoBox.emit("startAnimationtext");
            textAnimation.emit("textAnimationstart");
            break;
          case 'IT':
            //obj = 'image with text';
            var textAnimation = document.getElementById('textAnimation');
            var image = document.getElementById('img1');
            image.setAttribute("src", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointImage);
            imageFrame.setAttribute("visible", "true");
            image.setAttribute("visible", "true");
            //var posimg = storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointPosition.split(" ");
            mainInfo.setAttribute("position", pos);
            imageFrame.emit("startAnimation");
            var infoBox = document.getElementById('infoBox');
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor) {
              infoBox.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
            }
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity) {
              infoBox.setAttribute('material', 'opacity', storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
            }
            var text = document.getElementById('text1');
            text.setAttribute("value", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointHeader);
            var text1 = document.getElementById('text2');
            text1.setAttribute("value", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointText);
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor) {
              text1.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
              text.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
            }
            infoBox.setAttribute("visible", "true");
            infoBox.emit("startAnimationtext");
            textAnimation.emit("textAnimationstart");
            break;
          case 'I':
            //obj = 'image';
            var image = document.getElementById('img1');
            image.setAttribute("src", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointImage);
            imageFrame.setAttribute("visible", "true");
            image.setAttribute("visible", "true");
            //var posimg = storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointPosition.split(" ");
            mainInfo.setAttribute("position", pos);
            imageFrame.emit("startAnimation");
            break;
        }
        clicked = true;
        if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].markarTitle)
          obj = storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].markarTitle
        if (startTracking) {
          params.Verb = "started viewing.";
          params.Object = 'marker with title ' + obj;
          params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
          callToTacking.callToApi(params);
        }
        if (xapiEnable) {
          sendToXapi("Viewed", "viewed", 'marker with title ' + obj, 'markerwithtitle' + obj.replace(/\s/g, ''));
        }
      }
    });
    //            onmouseleave
    this.el.addEventListener('mouseleave', () => {
      var cur = document.querySelector('#cursor');
      cur.emit("startAnimantion");
      if (experienceStarted && clicked) {
        var background = document.getElementById(this.el.id);
        background.emit("imgPlaneendAnimation");
        var mediatype = this.data.split(" ");
        if (storypointsdata.actionPoints[mediatype[1] - 1].actionPointVisibility == "Visible while gaze over object") {
          var plane = document.getElementById(mediatype[1]);
          plane.setAttribute("visible", "false");
        }
        for (i = 1; i <= storypointsdata.actionPoints.length; i++) {
          var backgroundData = document.getElementById(i + 'background');
          backgroundData.emit("imgPlaneendAnimation");
        }
        var obj = 'Marker';
        var mediatype = this.data.split(" ");
        switch (mediatype[0]) {
          case 'V':
            //obj = 'video';
            var videoframe = document.getElementById('videoframe');
            var sphere = document.getElementById('video1');
            var video = document.getElementById('vid');
            video.pause();
            videoframe.emit("endAnimation");
            break;
          case 'VT':
            //obj = 'video with text';
            var textAnimation = document.getElementById('textAnimation');
            var videoframe = document.getElementById('videoframe');
            var sphere = document.getElementById('video1');
            //  videoframe.setAttribute("visible", "false");
            var video = document.getElementById('vid');
            video.pause();
            videoframe.emit("endAnimation");
            var infoBox = document.getElementById('infoBox');
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor) {
              infoBox.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
            }
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity) {
              infoBox.setAttribute('material', 'opacity', storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
            }
            infoBox.emit("endAnimation");
            textAnimation.emit("endAnimationText")

            setTimeout(function () {
              infoBox.setAttribute("visible", "false");
            }, 1000);
            break;
          case 'A':
            //obj = 'audio';
            var audio = document.getElementById('audio1');
            if (nosafari)
              audio.setAttribute('sound', 'volume:0;');
            else
              audio.components.sound.stopSound();
            audio1.setAttribute("sound", "");
            break;
          case 'AT':
            //obj = 'audio with text';
            var textAnimation = document.getElementById('textAnimation');
            var audio = document.getElementById('audio1');
            if (nosafari)
              audio.setAttribute('sound', 'volume:0;');
            else
              audio.components.sound.stopSound();
            var infoBox = document.getElementById('infoBox');
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor) {
              infoBox.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
            }
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity) {
              infoBox.setAttribute('material', 'opacity', storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
            }
            textAnimation.emit("endAnimationText");
            infoBox.emit("endAnimation");
            setTimeout(function () {
            infoBox.setAttribute("visible", "false");
          }, 1000);
            break;
          case 'AI':
            //obj = 'audio with image'
            var audio = document.getElementById('audio1');
            if (nosafari)
              audio.setAttribute('sound', 'volume:0;');
            else
              audio.components.sound.stopSound();
            var image = document.getElementById('img1');
            var imageFrame = document.getElementById('imageFrame');
            imageFrame.emit("endAnimation");
            setTimeout(function () {
              image.setAttribute("src", "/act/v0.1/storypoint/assets/images/loading.png");
              imageFrame.setAttribute("visible", "false");
            }, 1000);
            break;
          case 'AIT':
            var textAnimation = document.getElementById('textAnimation');
            //obj = 'audio with image and text';
            var audio = document.getElementById('audio1');
            if (nosafari)
              audio.setAttribute('sound', 'volume:0;');
            else
              audio.components.sound.stopSound();
            var image = document.getElementById('img1');
            image.emit("endAnimation");

            var infoBox = document.getElementById('infoBox');
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor) {
              infoBox.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
            }
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity) {
              infoBox.setAttribute('material', 'opacity', storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
            }
            setTimeout(function () {
              image.setAttribute("src", "/act/v0.1/storypoint/assets/images/loading.png");
              image.setAttribute("visible", "false");
            }, 1000);
            textAnimation.emit("endAnimationText");
            infoBox.emit("endAnimation");
            //                infoBox.setAttribute("visible", "false");
            break;
          case 'T':
            //obj = 'text';
            var textAnimation = document.getElementById('textAnimation');
            var infoBox = document.getElementById('infoBox');
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor) {
              infoBox.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
            }
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity) {
              infoBox.setAttribute('material', 'opacity', storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
            }
            infoBox.emit("endAnimation");
            textAnimation.emit("endAnimationText")
            setTimeout(function () {
              infoBox.setAttribute("visible", "false");
            }, 1000);
            break;
          case 'IT':
            //obj = 'image with text';
            var textAnimation = document.getElementById('textAnimation');
            var image = document.getElementById('img1');
            var imageFrame = document.getElementById('imageFrame');
            imageFrame.emit("endAnimation");
            setTimeout(function () {
              imageFrame.setAttribute("visible", "false");
            }, 1000);
            var infoBox = document.getElementById('infoBox');
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor) {
              infoBox.setAttribute("color", storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
            }
            if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity) {
              infoBox.setAttribute('material', 'opacity', storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
            }
            infoBox.emit("endAnimation");
            textAnimation.emit("endAnimationText")
            setTimeout(function () {
              image.setAttribute("src", "/act/v0.1/storypoint/assets/images/loading.png");
              infoBox.setAttribute("visible", "false");
            }, 1000);
            break;
          case 'I':
            //obj = 'image';
            var image = document.getElementById('img1');
            var imageFrame = document.getElementById('imageFrame');
            imageFrame.emit("endAnimation");
            setTimeout(function () {
              image.setAttribute("src", "/act/v0.1/storypoint/assets/images/loading.png");
              imageFrame.setAttribute("visible", "false");
            }, 1000);
            break;
        }
        if (storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].markarTitle)
          obj = storypointsdata.actionPoints[parseInt(mediatype[1]) - 1].markarTitle
        if (startTracking) {
          params.Verb = "completed Viewing.";
          params.Object = 'marker with title ' + obj;
          params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
          callToTacking.callToApi(params);

          params.Verb = "Viewed";
          params.Object = 'marker with title ' + obj + ' for ' + focusTime + "sec";
          params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
          callToTacking.callToApi(params);
        }
        if (xapiEnable) {
          sendToXapi("Viewed", "viewed", 'marker with title ' + obj + ' for ' + focusTime + " sec", 'markerwithtitle' + obj.replace(/\s/g, ''));
        }
        var videoSphere = document.querySelector('#videoskyid');
        if (videoSphere) {
          videoSphere.muted = false;
        }
        for (i = 1; i <= storypointsdata.actionPoints.length; i++) {

          var showTeleport = document.getElementById(i);

          var aEndAnimation = '';
          aEndAnimation = document.createElement('a-animation');
          aEndAnimation.setAttribute('attribute', "opacity");
          aEndAnimation.setAttribute('dur', "1300");
          aEndAnimation.setAttribute('fill', "forwards");
          aEndAnimation.setAttribute('from', "0");
          aEndAnimation.setAttribute('to', "0.9");
          showTeleport.appendChild(aEndAnimation);
        }
        clicked = false;
      }
      else {
        var mediatype = this.data.split(" ");
        if (storypointsdata.actionPoints[mediatype[1] - 1].actionPointVisibility == "Visible while gaze over object") {
          var plane = document.getElementById(mediatype[1]);
          plane.setAttribute("visible", "false");
        }
      }
    });

  }
});

function newPos(x, y, z) {
  var r = Math.pow(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2), 0.5);
  var phy = Math.acos(z / r);
  var thita = Math.asin(y / (r * Math.sin(phy)));
  if ((x < 0 && z < 0) || (x < 0 && z > 0)) {
    phy = -phy;//+ (Math.PI);
    thita = -thita;
  }
  r = 20;
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

function getExperienceUrl(){
  var mode="";
  var Url = window.location.href;
   if(Url.indexOf('index-hd.php') > 0){
     $("#onOffSwitch").addClass("onoffswitch1-innerHD");
     mode = "HD mode ON";

   }else{
    $("#onOffSwitch").addClass("onoffswitch1-innerSD");
    mode = "SD mode ON";
   }
   document.getElementById("mode").innerHTML = mode;
}
$(document).ready(function(){
  makeCode();
    var Url = window.location.href;
    getExperienceUrl()
   
    $("#divOnOff").click(function(){
        $("#divOnOff").prop('disabled', true);
        var mode = '';
        if(Url.indexOf('index-hd.php') > 0){
            var Index = Url.indexOf('index-hd.php');
        var location = Url.slice(0,Index)  + Url.slice(Index + 12);
        window.location = location;
           
       
          }else{
          var Index = Url.indexOf('?');
        var location = Url.slice(0,Index) + "index-hd.php" + Url.slice(Index);
        window.location= location;
          }
    });
  });
  
  function makeCode () {  
    // var qrcode = new QRCode("qrcode", {
    //     text: window.location.href,
    //     width: 90,
    //     height: 90,
    //     colorDark : "#000000",
    //     colorLight : "#ffffff",
    //     correctLevel : QRCode.CorrectLevel.H
    // });
    console.log("barcode" );
    var url = 'https://api.qrserver.com/v1/create-qr-code/?data='+window.location.href+'&amp;size=50x50';
    console.log("barcode",url);
    document.getElementById("qrcode").src = url;
    // qrcode.makeCode(window.location.href);
}

var startexp = function () {
  var start = document.getElementById("start_experience");
  if (assetsLoaded && loggedin) {
      
    var loading=document.getElementById("loading");
    loading.classList.add("disabled"); 
      if (start.classList.contains("disabled")) {
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
  }, 10000);
})