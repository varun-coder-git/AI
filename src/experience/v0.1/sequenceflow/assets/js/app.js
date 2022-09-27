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

var sequenceData;
var experienceStarted = false;
var clicked = false;
var nosafari = false;
var banner ;
var banner1 ;
var selectedHotspot;
var selectedOption;
var wrongAnswer = 0;
var correctAnswer = 0;
var answerdques = 0;
var pos;
var revisitMarker = [];
var scoreScreen;
var scoreScreen2;
var isMobile=false;
function hexToRgb(hex, opacity) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    alpha: opacity
  } : null;
}



$(document).ready(() => {
  var userAgent = navigator.userAgent;
  if (
    userAgent.includes("Mobile") ||
    userAgent.includes("Android") ||
    userAgent.includes("iPhone")
  ) {
    isMobile=true;
    var cameraId = document.querySelector("#cursor");
    cameraId.removeAttribute("cursor");
    cameraId.setAttribute(
      "cursor",
      {
        fuse: "true",
        fuseTimeout: "1200",
      },
      true
    );
    cameraId.setAttribute(
      "scale",
      {
        x: "1",
        y: "1",
        z: "1",
      },
      true
    );
  }
  var startExperienteBtn = document.getElementById('start_experience');
  ascene = document.querySelector('a-scene');
  cam = document.getElementById("cameraId");
  startExperienteBtn.onclick = function () {
    cam.setAttribute("animation", "enabled:false");
    cam.setAttribute("animation__one", "enabled:true");
    experienceStarted = true;
    ascene.style.zIndex = 'auto';

    document.getElementById('container').style.display = "none";
    document.getElementById('loaderq').style.display = "none";

    var skyVideo = document.querySelector('#videoskyid');
    if (skyVideo)
      skyVideo.play();
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') != -1) {
      if (ua.indexOf('chrome') == -1) {
        var audio1 = document.getElementById('audio1');
        audio1.components.sound.playSound();
        audio1.setAttribute('sound', 'volume:0;');
        nosafari = true;
      }
    }
    var vid = document.querySelector('#vid');
    vid.load();
    setTimeout(function () {
      vid.play();
      setTimeout(function () {
        vid.pause();
        vid.load();
      }, 50);
    }, 1000);
  };

});

function loadExperience(experienceToCustomize, ExperienceName) {
  sequenceData = experienceToCustomize;
  banner = document.getElementById('option-panel-banner');
  banner1 = document.getElementById('option-panel')
  var submitquiz = document.getElementById("getScore");
  submitquiz.setAttribute('position', sequenceData.submitPosition);
  submitquiz.setAttribute('rotation', sequenceData.submitRotation);
  var instructionSet = sequenceData.splash_instruction;

  var lunchTextSet = sequenceData.launch_text;

  //if json includes splashbgcolor and opacity
  if (sequenceData.splashBackgroundColor && sequenceData.Opacity) {
    var rgbformat = hexToRgb(sequenceData.splashBackgroundColor, sequenceData.Opacity);
    document.getElementById('innerInfo').style.backgroundColor = "rgba(" + rgbformat.r + "," + rgbformat.g + "," + rgbformat.b + "," + rgbformat.alpha + ")";
  }
  //if json includes splashheadercolor
  document.getElementById('titleText').innerHTML = ExperienceName;
  if (sequenceData.splashHeaderColor) {
    document.getElementById('titleText').style.color = sequenceData.splashHeaderColor
  }
  if (isMobile && sequenceData.splash_android_instruction!=undefined) {
		document.getElementById('instruction').innerHTML = sequenceData.splash_android_instruction;
	  } else {
		document.getElementById('instruction').innerHTML = sequenceData.splash_instruction;
	 }
  document.getElementById('titleDescription').innerHTML = lunchTextSet;
  //document.getElementById('splashLogo').src = sequenceData.splash_image;

  loggedin = true;

  if (sequenceData["entry_view"]) {
    $("#CamEntity").attr("rotation", sequenceData["entry_view"]);
  }

  var assets = document.querySelector('a-assets');
  var scene = document.querySelector('a-scene');
  if (sequenceData.imageSkyPath) {
    var aSky = '';
    aSky = document.createElement('a-sky');
    aSky.setAttribute('src', sequenceData.imageSkyPath);
    aSky.setAttribute('crossorigin', 'anonymous');
    scene.appendChild(aSky);
  } else {
    var skyVideo = document.createElement('video');
    skyVideo.setAttribute('id', "videoskyid");
    skyVideo.setAttribute('src', sequenceData.videoskypath);
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

  //create existing markers
  for (i = 1; i <= sequenceData.actionPoints.length; i++) {
    if (sequenceData.actionPoints[i - 1].actionSize === "small") {
      radiusAction = 1.5;
    } else if (sequenceData.actionPoints[i - 1].actionSize === "medium") {
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

    background.setAttribute('set-sky', sequenceData.actionPoints[i - 1].mediatype + " " + i);
    background.setAttribute('visible', 'true');
    background.setAttribute('transparent', 'true');
    var posbackground = sequenceData.actionPoints[i - 1].actionPointPosition.split(" ");
    background.setAttribute('position', posbackground[0] + " " + posbackground[1] + " " + posbackground[2]);

    // scene.appendChild(background);

    var newTeleport = document.createElement('a-box');
    newTeleport.setAttribute('id', i);
    newTeleport.setAttribute('material', 'src', sequenceData.actionPoints[i - 1].actionIcon);
    newTeleport.setAttribute('material', 'transparent', 'true');
    newTeleport.setAttribute('geometry', 'height', radiusAction);
    newTeleport.setAttribute('geometry', 'width', radiusAction);
    newTeleport.setAttribute('shader', "flat");
    newTeleport.classList.add('clickable');
    newTeleport.setAttribute('shadow', 'cast', 'true');
    newTeleport.setAttribute('set-sky', sequenceData.actionPoints[i - 1].mediatype + " " + i);
    newTeleport.setAttribute('position', posbackground[0] + " " + posbackground[1] + " " + posbackground[2]);
    newTeleport.setAttribute('look-at', 'src', '#mainCam');
    newTeleport.setAttribute("visible", "false");

    if (sequenceData.actionPoints[i - 1].actionChecked == "true") {
      newTeleport.setAttribute("animation__newTeleport", "property: scale;from:0 0 0;to:1 1 1; dur: 2000;enabled:true;easing;ease-in-out-circ;loop:true");
      setTimeout(function () {
        newTeleport.removeAttribute("animation__newTeleport");
      }, 2100);
    }
    if (sequenceData.actionPoints[i - 1].actionPointVisibility == "Always Visible") {
      newTeleport.setAttribute("visible", "true");
    }
    scene.appendChild(newTeleport);
  }

  for (i = 1; i <= sequenceData.actionPoints.length; i++) {
    var unselectedSelectBox = document.getElementById('option-' + i);
    unselectedSelectBox.setAttribute('visible', 'true');
    unselectedSelectBox.setAttribute('class', 'clickable');
    unselectedSelectBox.setAttribute('option-click', '');
  }

  if (window.matchMedia("(orientation: portrait)").matches) {
    if (sequenceData["entry_view"]) {
      var entryView_y = sequenceData["entry_view"].split(" ")[1];
      $("#CamEntity").attr("rotation", "0 " + (parseInt(entryView_y) - 180) + " 0");
    }
  }

  if (window.matchMedia("(orientation: landscape)").matches) {
    if (sequenceData["entry_view"]) {
      $("#CamEntity").attr("rotation", sequenceData["entry_view"]);
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
        if (sequenceData.actionPoints[mediatype[1] - 1].actionPointVisibility == "Visible while gaze over object") {
          var plane = document.getElementById(mediatype[1]);
          plane.setAttribute("visible", "true");
        }
      }
    });
    this.el.addEventListener('click', () => {
      if (experienceStarted == true) {
        
        answerdques++;
        var mainInfo = document.getElementById('mainInfo');
        mainInfo.setAttribute("animation__startAnimationpanel", "property: scale;from:0 0 0;to:1.5 1.5 1.5; dur: 2000;enabled:true;");
        setTimeout(function () {
          mainInfo.removeAttribute("animation__startAnimationpanel");
        }, 2100);

        for (i = 1; i <= sequenceData.actionPoints.length; i++) {
          var unselectedSelectBox = document.getElementById('option-' + i);
          unselectedSelectBox.setAttribute('class', 'clickable');
          unselectedSelectBox.setAttribute('option-click', '');
        }

        var mediatype = this.data.split(" ");
        selectedHotspot = sequenceData.actionPoints[parseInt(mediatype[1]) - 1].sortOrder;
        var posvid = sequenceData.actionPoints[parseInt(mediatype[1]) - 1].actionPointPosition.split(" ");
        pos = newPos(posvid[0], posvid[1], posvid[2]);
        mainInfo.setAttribute('position', pos);
        mainInfo.setAttribute('scale', '1.5 1.5 1.5');
        mainInfo.setAttribute('visible', 'true');

        for (i = 0; i < revisitMarker.length; i++) {
          if (revisitMarker[i].index == selectedHotspot + 1) {
            var plane = document.getElementById("option-select-" + revisitMarker[i].answer);
            plane.setAttribute("visible", "true");
          } else {
            var plane = document.getElementById("option-select-" + revisitMarker[i].answer);
            plane.setAttribute("visible", "false");
          }
        }
        var obj = 'Marker';
        for (i = 1; i <= sequenceData.actionPoints.length; i++) {
          var hideTeleport = document.getElementById(i);
          hideTeleport.setAttribute("animation__hideTeleport", "property: opacity;from:1;to:0; dur: 2000;enabled:true;");
          hideTeleport.setAttribute('scale', '0 0 0');
        }

        setTimeout(function () {
          for (i = 1; i <= sequenceData.actionPoints.length; i++) {
            var hideTeleport = document.getElementById(i);
            hideTeleport.setAttribute('position', '2000 2000 2000');
          }
          var hideTeleport = document.getElementById("getScore");
          hideTeleport.setAttribute('position', '2000 2000 2000');
        }, 1200);

        banner.setAttribute("visible", 'true');
        banner.setAttribute("material","color:#000000;opacity:0.8");
        banner1.setAttribute("visible", 'true');
        var options = document.getElementById('option-panel-container');
        options.setAttribute("visible", 'true');
        var exit = document.getElementById("exitmsg");
        exit.setAttribute("visible", 'false');
        clicked = true;
        if (sequenceData.actionPoints[parseInt(mediatype[1]) - 1].markarTitle)
          obj = sequenceData.actionPoints[parseInt(mediatype[1]) - 1].markarTitle
      }

      var okButton = document.getElementById('ok');
      okButton.setAttribute('position', '2000 2000 2000');
      var closeButton = document.getElementById('closeOptions');
      closeButton.setAttribute('position', '-2.9792 -4.35947 0.032');
      var okDisabled = document.getElementById('okDisabled');
      okDisabled.setAttribute('position', '2.60196 -4.35947 0.032');

      var submitButton = document.getElementById('submit');
      var submitDisabled = document.getElementById('submitDisabled');
      submitButton.setAttribute('position', '2000 2000 2000');
      submitDisabled.setAttribute('position', '2000 2000 2000');
      var closeButton = document.getElementById('close');
      closeButton.setAttribute('position', '-2000 2000 2000');
    });

    //onmouseleave    
    this.el.addEventListener('mouseleave', () => {
      if (experienceStarted && clicked) {

        var mediatype = this.data.split(" ");
        if (sequenceData.actionPoints[mediatype[1] - 1].actionPointVisibility == "Visible while gaze over object") {
          var plane = document.getElementById(mediatype[1]);
          plane.setAttribute("visible", "false");
        }
        var obj = 'Marker';
        var mediatype = this.data.split(" ");

        if (sequenceData.actionPoints[parseInt(mediatype[1]) - 1].markarTitle)
          obj = sequenceData.actionPoints[parseInt(mediatype[1]) - 1].markarTitle
        var videoSphere = document.querySelector('#videoskyid');
        if (videoSphere) {
          videoSphere.muted = false;
        }
        for (i = 1; i <= sequenceData.actionPoints.length; i++) {

          var showTeleport = document.getElementById(i);
        }
        clicked = false;
      } else {
        var mediatype = this.data.split(" ");
        if (sequenceData.actionPoints[mediatype[1] - 1].actionPointVisibility == "Visible while gaze over object") {
          var plane = document.getElementById(mediatype[1]);
          plane.setAttribute("visible", "false");
        }
      }
    });
  }
});



AFRAME.registerComponent('option-click', {
  schema: {
    default: ''
  },
  init() {

    this.el.addEventListener('mouseenter', () => { });
    this.el.addEventListener('click', () => {

      var okButton = document.getElementById('ok');
      var closeButton = document.getElementById('closeOptions');
      closeButton.setAttribute('position', '-2.9792 -4.35947 0.032');
      var okDisabled = document.getElementById('okDisabled');
      okButton.setAttribute('position', '2.60196 -4.35947 0.032');
      okDisabled.setAttribute('position', '2000 2000 2000');

      var selectedOptionId = this.el.id;
      var selectedOptionArray = selectedOptionId.split('-');
      selectedOption = parseInt(selectedOptionArray[1]);
      for (var i = 1; i <= sequenceData.actionPoints.length; i++) {
        var optionPanel = document.getElementById("option-select-" + i);;
        optionPanel.setAttribute("visible", "false");
      }
      var plane = document.getElementById("option-select-" + selectedOptionArray[1]);
      plane.setAttribute("visible", "true");
    });
    //onmouseleave    
    this.el.addEventListener('mouseleave', () => {
    });
  }
});

AFRAME.registerComponent('submit-close', {
  schema: {
    default: ''
  },
  init() {
    this.el.addEventListener('mouseenter', () => { });
    this.el.addEventListener('click', () => {
      var mainInfo = document.getElementById('mainInfo');
      mainInfo.setAttribute("animation__endAnimation", "property: scale;to:0 0 0;from:1.5 1.5 1.5; dur: 2000;enabled:true;");
      setTimeout(function () {
        mainInfo.removeAttribute("animation__endAnimation");
      }, 2100);
      if (this.el.id == "submit") {

        var panelScreen = document.getElementById("panelScreen");
        scoreScreen = document.getElementById("scoreScreen");
        scoreScreen2 = document.getElementById("scoreScreen2");
        var congratulations = document.getElementById("congratulations");

        var posvid = sequenceData.submitPosition.split(" ");
        pos = newPos(posvid[0], posvid[1], posvid[2]);

        panelScreen.setAttribute('position', pos);
        panelScreen.setAttribute('visible', 'true');

        for (i = 0; i < revisitMarker.length; i++) {
          if (revisitMarker[i].result == "wrong") {
            wrongAnswer++;
          }
        }
        if (wrongAnswer >= 1 || revisitMarker.length<sequenceData.actionPoints.length) {
          congratulations.setAttribute("text","color:"+sequenceData.submitMessageTextColor);
          congratulations.setAttribute('value', sequenceData.Failuer_Message + " 0");
        } else {
          
          congratulations.setAttribute("text","color:"+sequenceData.submitMessageTextColor);
          congratulations.setAttribute('value', sequenceData.Success_Message + " 100");
        }
         if (sequenceData.submitMessageBackgroundColor) {
            scoreScreen.setAttribute("material","color:"+sequenceData.submitMessageBackgroundColor);
          } else {
            scoreScreen.setAttribute("material","color:#FFFFFF");
          }
  
          if (sequenceData.submitPanelBgOpacity) {
            scoreScreen.setAttribute("material","opacity:"+sequenceData.submitPanelBgOpacity);
          } else {
            scoreScreen.setAttribute("material","opacity:0.8");
          }
        setTimeout(function () {
          scoreScreen.setAttribute("animation__scoreAnimation", "property: scale;from:0 0 0;to:1.4 1.4 0; dur: 2000;enabled:true;");
          scoreScreen2.setAttribute("animation__score1Animation", "property: scale;from:0 0 0;to:1.4 1.5 0; dur: 2000;enabled:true;");

          setTimeout(function () {
            scoreScreen.removeAttribute("animation__scoreAnimation");
            scoreScreen2.removeAttribute("animation__score1Animation");
          }, 2100);
          for (i = 1; i <= sequenceData.actionPoints.length; i++) {
            var hideTeleport = document.getElementById(i);
            hideTeleport.setAttribute('visible', 'false')
          }
          for (i = 1; i <= sequenceData.actionPoints.length; i++) {
            var position = sequenceData.actionPoints[i - 1].actionPointPosition;
            var showTeleport = document.getElementById(i);
            showTeleport.setAttribute('position', position);
          }
          scorecard();
          for (i = 1; i <= sequenceData.actionPoints.length; i++) {
            var hideTeleport = document.getElementById(i);
            hideTeleport.removeAttribute('class', 'clickable')
          }
        }, 1500);



      } else if (this.el.id == "close") {


        if (selectedOption != null && selectedOption != undefined) {
          var plane = document.getElementById("option-select-" + selectedOption);
          plane.setAttribute("visible", "false");
        }
        for (i = 1; i <= sequenceData.actionPoints.length; i++) {
          var position = sequenceData.actionPoints[i - 1].actionPointPosition;
          var showTeleport = document.getElementById(i);
          showTeleport.setAttribute('position', position);
          var showTeleport = document.getElementById(i);
          showTeleport.setAttribute('position', position);
          showTeleport.setAttribute("animation__teleport", "property: opacity;from:0;to:1; dur: 2000;enabled:true;");
          showTeleport.setAttribute('scale', '1 1 1');


        }
        setTimeout(function () {
          for (i = 1; i <= sequenceData.actionPoints.length; i++) {
            var showTeleport = document.getElementById(i);
            showTeleport.removeAttribute("animation__teleport");
            var hideTeleport = document.getElementById("getScore");
            hideTeleport.setAttribute('position', sequenceData.submitPosition);
            hideTeleport.setAttribute('rotation', sequenceData.submitRotation);
          }
        }, 2100);

      }
    });

    //onmouseleave    
    this.el.addEventListener('mouseleave', () => { });
  }
});
$(document).ready(() => {
  var submitclick=document.getElementById("ok");
  submitclick.setAttribute("class","clickable");
  submitclick.setAttribute("ok-close");

  var closeclick=document.getElementById("closeOptions");
  closeclick.setAttribute("class","clickable");
  closeclick.setAttribute("ok-close");
  
AFRAME.registerComponent('ok-close', {
  schema: {
    default: ''
  },
  init() {
    this.el.addEventListener('mouseenter', () => { });
    this.el.addEventListener('click', () => {
      for (i = 1; i <= sequenceData.actionPoints.length; i++) {
        var unselectedSelectBox = document.getElementById('option-' + i);
        unselectedSelectBox.removeAttribute('class', 'clickable');
        unselectedSelectBox.removeAttribute('option-click', '');
      }

      var mainInfo = document.getElementById('mainInfo');
      mainInfo.setAttribute("animation__endAnimation", "property: scale;to:0 0 0;from:1.5 1.5 1.5; dur: 2000;enabled:true;");
      setTimeout(function () {
        mainInfo.removeAttribute("animation__endAnimation");
      }, 2100);
      if (this.el.id == "ok") {

        var okButton = document.getElementById('ok');
        var okDisabled = document.getElementById('okDisabled');
        okButton.setAttribute('position', '2000 2000 2000');
        okDisabled.setAttribute('position', '2.60196 -4.35947 -0.25128');

        for (i = 0; i < revisitMarker.length; i++) {
          if (revisitMarker[i].index == selectedHotspot + 1) {
            revisitMarker.splice(i,1);
            break;
          }
        }
        if (selectedOption != selectedHotspot + 1) {
          revisitMarker.push({ index: (selectedHotspot + 1), result: "wrong", answer: selectedOption });
        } else {
          revisitMarker.push({ index: (selectedHotspot + 1), result: "right", answer: selectedOption });
        }

        for (var i = 1; i <= sequenceData.actionPoints.length; i++) {
          var optionPanel = document.getElementById("option-select-" + i);
          optionPanel.setAttribute("visible", "false");
        }

        for (i = 1; i <= sequenceData.actionPoints.length; i++) {
          var position = sequenceData.actionPoints[i - 1].actionPointPosition;
          var showTeleport = document.getElementById(i);
          showTeleport.setAttribute('position', position);
          showTeleport.setAttribute("animation__teleport", "property: scale;from:0 0 0;to:1 1 1; dur: 2000;enabled:true;");
          showTeleport.setAttribute('scale', '1 1 1');
          showTeleport.setAttribute('material','opacity:1');
        }
        setTimeout(function () {
          for (i = 1; i <= sequenceData.actionPoints.length; i++) {
            var showTeleport = document.getElementById(i);
           showTeleport.removeAttribute("animation__teleport");
          }
        }, 2100);

        var hideTeleport = document.getElementById("getScore");
        hideTeleport.setAttribute('position', sequenceData.submitPosition);
        hideTeleport.setAttribute('rotation', sequenceData.submitRotation);
        var hotspoticon = document.getElementById(selectedHotspot + 1);
        hotspoticon.setAttribute('material', 'src', "assets/images/icons/right.png");

      } else if (this.el.id == "closeOptions") {
        var hideTeleport = document.getElementById("getScore");
        hideTeleport.setAttribute('position', sequenceData.submitPosition);
        hideTeleport.setAttribute('rotation', sequenceData.submitRotation);
        answerdques--;

        if (selectedOption != null && selectedOption != undefined) {
          var plane = document.getElementById("option-select-" + selectedOption);
          plane.setAttribute("visible", "false");
        }
        for (i = 1; i <= sequenceData.actionPoints.length; i++) {
          var position = sequenceData.actionPoints[i - 1].actionPointPosition;
          var showTeleport = document.getElementById(i);
          showTeleport.setAttribute('position', position);
          showTeleport.setAttribute("animation__teleport", "property: scale;from:0 0 0;to:1 1 1; dur: 2000;enabled:true;");
          showTeleport.setAttribute('scale', '1 1 1');
          showTeleport.setAttribute('material','opacity:1');

        }
        setTimeout(function () {
          for (i = 1; i <= sequenceData.actionPoints.length; i++) {
            var showTeleport = document.getElementById(i);
           showTeleport.removeAttribute("animation__teleport");
          }
        }, 2100);
      }
      var okButton = document.getElementById('ok');
      okButton.setAttribute('position', '2000 2000 2000');
      var closeButton = document.getElementById('closeOptions');
      closeButton.setAttribute('position', '2000 2000 2000');
      var okDisabled = document.getElementById('okDisabled');
      okDisabled.setAttribute('position', '2000 2000 2000');

    });

    //onmouseleave    
    this.el.addEventListener('mouseleave', () => { });

  }
});

AFRAME.registerComponent('show-score', {
  schema: {
    default: ''
  },
  init() {

    this.el.addEventListener('click', () => {
      ismarker=false;
      if(sequenceData.actionPoints.length>0)
      {
      var hideTeleport = document.getElementById("getScore");
      hideTeleport.setAttribute('position', '2000 2000 2000');
      
      var mainInfo = document.getElementById('mainInfo');
        mainInfo.setAttribute("animation__startAnimationpanel","property: scale;from:0 0 0;to:1.5 1.5 1.5; dur: 2000;enabled:true;");
        setTimeout(function() {
          mainInfo.removeAttribute("animation__startAnimationpanel");
        },2100);

      var posvid = sequenceData.submitPosition.split(" ");
        pos = newPos(posvid[0], posvid[1], posvid[2]);
        
        mainInfo.setAttribute('position', pos);
        mainInfo.setAttribute('scale', '1.5 1.5 1.5');
        mainInfo.setAttribute('visible', 'true');
        for (i = 1; i <= sequenceData.actionPoints.length; i++) {
          var hideTeleport = document.getElementById(i);
          hideTeleport.setAttribute("animation__hideTeleport","property: opacity;from:1;to:0; dur: 2000;enabled:true;");
          hideTeleport.setAttribute('scale','0 0 0');
        }
        setTimeout(function () {
          for (i = 1; i <= sequenceData.actionPoints.length; i++) {
            hideTeleport.removeAttribute("animation__hideTeleport");
          }
          hideTeleport.setAttribute('scale','0 0 0');
        }, 2100);


        banner.setAttribute("visible", 'true');

        if (sequenceData.submitMessageBackgroundColor) {
          banner.setAttribute("material","color:"+sequenceData.submitMessageBackgroundColor);
        } else {
         
          banner.setAttribute("material","color:#FFFFFF");
        }

        if (sequenceData.submitPanelBgOpacity) {
          banner.setAttribute("material","opacity:"+sequenceData.submitPanelBgOpacity);
        } else {
         
          banner.setAttribute("material","opacity:0.8");
        }
      
        banner1.setAttribute("visible", 'true');

        var options = document.getElementById('option-panel-container');
        options.setAttribute("visible", 'false');

        var okButton = document.getElementById('ok');
        okButton.setAttribute('position', '2000 2000 2000');
        var closeButton = document.getElementById('closeOptions');
        closeButton.setAttribute('position', '2000 2000 2000');
        var okDisabled = document.getElementById('okDisabled');
        okDisabled.setAttribute('position', '2000 2000 2000');

        var submitButton = document.getElementById('submit');
        var submitDisabled = document.getElementById('submitDisabled');
        submitButton.setAttribute('position', '2.60196 -4.35947 0.032');
        submitDisabled.setAttribute('position', '2000 2000 2000');
        var closeButton = document.getElementById('close');
        closeButton.setAttribute('position', '-2.9792 -4.35947 0.032');

         var exit = document.getElementById("exitmsg");
         if (sequenceData.submitMessageTextColor) {
          exit.setAttribute("text","color:"+sequenceData.submitMessageTextColor);
          }else{
           exit.setAttribute("text","color:#FFFFFF");
          }

         if(sequenceData.SubmitMessage){
          exit.setAttribute('value',sequenceData.SubmitMessage);
        }else{
          exit.setAttribute('value',"Do you really wish to submit the sequence?");
        }
         exit.setAttribute("visible", 'true');
      }
    });
  
  }
});
});

function scorecard() {
  cam = document.getElementById("cameraId");
  setTimeout(function () {
    scoreScreen.setAttribute("animation__closeAnimation", "property: scale;to:0 0 0;from:1.4 1.5 0; dur: 2000;enabled:true;");
    scoreScreen2.setAttribute("animation__close1Animation", "property: scale;to:0 0 0;from:1.4 1.5 0; dur: 2000;enabled:true;");
    //cam.setAttribute("animation__finalRotation", "enabled:true");
    setTimeout(function () {
      scoreScreen.removeAttribute("animation__closeAnimation");
      scoreScreen2.removeAttribute("animation__close1Animation");
    }, 2100);
  }, 4000);
  setTimeout(function () {

    for (i = 1; i <= sequenceData.actionPoints.length; i++) {
      var hideTeleport = document.getElementById(i);
      hideTeleport.setAttribute('visible', 'true');
      for(j = 1; j <= revisitMarker.length; j++){
        if(revisitMarker[j-1].index==i){
          if(revisitMarker[j-1].answer==i){
            hideTeleport.setAttribute('material', 'src', "assets/images/solvedIcon/" + i + ".png");
            break;
          }else{
            hideTeleport.setAttribute('material', 'src', "assets/images/InvalidIcon/" + i + ".png");
          }
        }
        else{
            hideTeleport.setAttribute('material', 'src', "assets/images/InvalidIcon/" + i + ".png");
        }
      }
      hideTeleport.setAttribute("animation__visibleTrue", "property: opacity;from:0;to:1; dur: 2000;enabled:true;");
      hideTeleport.setAttribute('scale', '1 1 1');
    }
    setTimeout(function () {
      scoreScreen.removeAttribute("animation__visibleTrue");
    }, 2100);


  }, 6000);
}


function newPos(x, y, z) {
  var r = Math.pow(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2), 0.5);
  var phy = Math.acos(z / r);
  var thita = Math.asin(y / (r * Math.sin(phy)));
  if ((x < 0 && z < 0) || (x < 0 && z > 0)) {
    phy = -phy; //+ (Math.PI);
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

function getExperienceUrl() {
  var mode = "";
  var Url = window.location.href;
  if (Url.indexOf('index-hd.php') > 0) {
    $("#onOffSwitch").addClass("onoffswitch1-innerHD");
    mode = "HD mode ON";

  } else {
    $("#onOffSwitch").addClass("onoffswitch1-innerSD");
    mode = "SD mode ON";
  }
  document.getElementById("mode").innerHTML = mode;
}
$(document).ready(function () {
  

  makeCode();
  var Url = window.location.href;
  getExperienceUrl()

  $("#divOnOff").click(function () {
    $("#divOnOff").prop('disabled', true);
    var mode = '';
    if (Url.indexOf('index-hd.php') > 0) {
      var Index = Url.indexOf('index-hd.php');
      var location = Url.slice(0, Index) + Url.slice(Index + 12);
      window.location = location;


    } else {
      var Index = Url.indexOf('?');
      var location = Url.slice(0, Index) + "index-hd.php" + Url.slice(Index);
      window.location = location;
    }
  });
});

function makeCode() {
  console.log("barcode");
  var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + window.location.href + '&amp;size=50x50';
  console.log("barcode", url);
  document.getElementById("qrcode").src = url;
  // qrcode.makeCode(window.location.href);
}

var startexp = function () {
  var start = document.getElementById("start_experience");
  if (assetsLoaded && loggedin) {
    var loading = document.getElementById("loading");
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




var callToTacking = new TrackingData();
var focusTime = 0,
  screenActiveTime = 0;
var framename = "";
var action = "";
var ExperienceName = "";
var startTracking = false;
var xapiEnable = false;
var museum_data = {};
var endExp = false;

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
    if (screenActiveTime % 10 == 0 && endExp == false)
      updateExperienceResult(10, 0, 0, "Incomplete");
    setTimeout(tick, 1000);
  }
  tick();
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
    //IntializeXapi();
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
  sendVerboseToXapi(verb, "http://adlnet.gov/expapi/verbs/" + urlVerb, objectText, "http://adlnet.gov/expapi/activities/TriviaRoom", "http://id.tincanapi.com/activity/experizer-template/" + ObjectUrlName.toLowerCase(), "http://adlnet.gov/expapi/activities/course", "Activity");
}

function sendQuestionAnswerToXapi(verb, urlVerb, questionText, objectId, questionChoices, questionType, learnerResponse, correctAnswer, wasCorrect) {
  sendQuestionAnswerVerboseToXapi(verb, "http://adlnet.gov/expapi/verbs/" + urlVerb, "http://id.tincanapi.com/activity/experizer-template/" + objectId.toLowerCase(), questionText, questionChoices, questionType, learnerResponse, correctAnswer, wasCorrect);
}