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

var InventoryData;
var experienceStarted = false;
var clicked = false;
var nosafari = false;
var banner = document.getElementById('option-panel-banner');
var banner1 = document.getElementById('option-panel');
var selectedHotspot;
var selectedOption;
var wrongAnswer = 0;
var answerdques = 0;
var pos;
var isRightFlag = 0;
var hotspotVisited = 0;
var assets = document.querySelector('a-assets');
var scene = document.querySelector('a-scene');
var textActive = false;
var selectedOptionId;
var isSuccess = false;
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

var userAgent = navigator.userAgent;
if (userAgent.includes("Mobile") || userAgent.includes("Android") || userAgent.includes("iPhone")) {
  var cameraId = document.querySelector('#cursor');
  cameraId.removeAttribute('cursor');
  cameraId.setAttribute('scale', '1 1 1');
  cameraId.setAttribute('cursor', 'fuse', 'true; fuseTimeout: 1500;');
  isMobile=true;
}

$(document).ready(() => {
  var startExperienteBtn = document.getElementById('start_experience');
  ascene = document.querySelector('a-scene');
  startExperienteBtn.onclick = function () {
    var cam = document.querySelector("#rotation");
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

function loadExperience(experienceJSON, ExperienceName) {
  InventoryData = experienceJSON;
  var instructionSet = InventoryData.splash_instruction;
  var lunchTextSet = InventoryData.launch_text;

  //if json includes splashbgcolor and opacity
  if (InventoryData.splashBackgroundColor && InventoryData.Opacity) {
    var rgbformat = hexToRgb(InventoryData.splashBackgroundColor, InventoryData.Opacity);
    document.getElementById('innerInfo').style.backgroundColor = "rgba(" + rgbformat.r + "," + rgbformat.g + "," + rgbformat.b + "," + rgbformat.alpha + ")";
  }
  //if json includes splashheadercolor
  document.getElementById('titleText').innerHTML = ExperienceName;
  if (InventoryData.splashHeaderColor) {
    document.getElementById('titleText').style.color = InventoryData.splashHeaderColor
  }
  // document.getElementById('instruction').innerHTML = instructionSet;
  if (isMobile && InventoryData.splash_android_instruction!=undefined) {
		document.getElementById('instruction').innerHTML = InventoryData.splash_android_instruction;
	  } else {
		document.getElementById('instruction').innerHTML = InventoryData.splash_instruction;
   }
  document.getElementById('titleDescription').innerHTML = lunchTextSet;
  document.getElementById('splashLogo').src = InventoryData.splash_image;
  loggedin = true;

  if (InventoryData["entry_view"]) {
    $("#CamEntity").attr("rotation", InventoryData["entry_view"]);
  }


  if (InventoryData.imageSkyPath) {
    var aSky = '';
    aSky = document.createElement('a-sky');
    aSky.setAttribute('src', InventoryData.imageSkyPath);
    aSky.setAttribute('crossorigin', 'anonymous');
    scene.appendChild(aSky);
  } else {
    var skyVideo = document.createElement('video');
    skyVideo.setAttribute('id', "videoskyid");
    skyVideo.setAttribute('src', InventoryData.videoskypath);
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

  var inventoryPanel = document.getElementById("inventory-panel"); 
  var resetPanel = document.getElementById("reset-panel"); 
  inventoryPanel.setAttribute("material","src:"+InventoryData.inventoryPanelImage );
  if(InventoryData.showReset == true){
    resetPanel.setAttribute("material","src:"+InventoryData.resetPanelImage);
    resetPanel.setAttribute("visible","true");
    resetPanel.setAttribute("scale","1 1 1");
  } else {
    resetPanel.setAttribute("visible","false");
    resetPanel.setAttribute("scale","0 0 0");
  }

  //create hotspot
  for (i = 0; i < InventoryData.actionPoints.length; i++) {
    var newTeleport = document.createElement('a-sphere');
    newTeleport.setAttribute('id', i);
    newTeleport.classList.add('clickable');
    newTeleport.setAttribute('shadow', 'cast', 'true');
    newTeleport.setAttribute("mouseclick", "");
    newTeleport.setAttribute("material","shader","flat");
    newTeleport.setAttribute("material","flatShading","true");
    newTeleport.setAttribute('radius', InventoryData.actionPoints[i].actionSize);
    newTeleport.setAttribute('color', InventoryData.actionPoints[i].actionPointColor);
    newTeleport.setAttribute('opacity', InventoryData.actionPoints[i].actionPointOpacity);
    newTeleport.setAttribute('position', InventoryData.actionPoints[i].actionPointPosition);
    newTeleport.setAttribute('look-at', 'src', '#mainCam');
    newTeleport.setAttribute("visible", "false");
    newTeleport.setAttribute("scale", "0 0 0");
    scene.appendChild(newTeleport);

    var newTeleport = document.createElement('a-box');
    newTeleport.setAttribute('id', 'visited-' + i);
    newTeleport.classList.add('clickable');
    newTeleport.setAttribute('shadow', 'cast', 'true');
    newTeleport.setAttribute("option-click", "");
    newTeleport.setAttribute('opacity', InventoryData.actionPoints[i].actionPointOpacity);
    newTeleport.setAttribute('geometry', 'height:4;width:4');
    newTeleport.setAttribute('shader', 'flat');
    newTeleport.setAttribute('position', '20000 20000 20000');
    newTeleport.setAttribute('look-at', 'src', '#mainCam');
    newTeleport.setAttribute("visible", "true");
    newTeleport.setAttribute("scale", "0 0 0");
    scene.appendChild(newTeleport);

    var hotSpotEntity = document.createElement('a-entity');
    hotSpotEntity.setAttribute('id', 'hotspot-entity' + i);
    hotSpotEntity.setAttribute('class', 'hotspot-entity');
    hotSpotEntity.setAttribute('position', InventoryData.actionPoints[i].actionPointPosition);
    hotSpotEntity.setAttribute('look-at', 'src', '#mainCam');
    hotSpotEntity.setAttribute('scale', '0 0 0');
    hotSpotEntity.setAttribute('visible', 'false');
    scene.appendChild(hotSpotEntity);

    var infoboxPlane1 = document.createElement('a-plane');
    infoboxPlane1.setAttribute("id", "infobox-MainPlane-" + i);
    infoboxPlane1.setAttribute('color', "#000000");
    infoboxPlane1.setAttribute('geometry', "height:15;width:30");
    infoboxPlane1.setAttribute('material', "side:double;opacity:0.8;transparent:true;shader:flat;flatShading:true;");
    infoboxPlane1.setAttribute("position", "0 0 -10");
    infoboxPlane1.setAttribute("scale", "0 0 0");
    infoboxPlane1.setAttribute("visible", "false");
    hotSpotEntity.appendChild(infoboxPlane1);

    var infoboxPlane = document.createElement('a-plane');
    infoboxPlane.setAttribute("id", "infobox-plane-" + i);
    infoboxPlane.setAttribute('color', "#000000");
    infoboxPlane.setAttribute('geometry', "height:20;width:40");
    infoboxPlane1.setAttribute("scale", "0 0 0");
    infoboxPlane1.setAttribute("visible", "false");
    infoboxPlane.setAttribute('material', "side:double;opacity:0;transparent:true");
    infoboxPlane.setAttribute("position", "0 0 -10");
    hotSpotEntity.appendChild(infoboxPlane);

    var infoboxText = document.createElement('a-text');
    infoboxText.setAttribute("text", "width:28;baseline:top;wrapCount:48;lineHeight:50");
    infoboxText.setAttribute("id", "text-" + i);
    infoboxText.setAttribute("value", "");
    infoboxText.setAttribute("position", "-13.86466 5.9 1.12607");
    infoboxText.setAttribute('scale', '1 1 1');
    // infoboxText.setAttribute("visible", "false");
    infoboxPlane.appendChild(infoboxText);
    infoboxPlane.setAttribute("visible", "true");

    var closeButton = document.createElement('a-entity');
    closeButton.setAttribute("id", "close");
    closeButton.setAttribute("class", "clickable");
    closeButton.setAttribute("hotspot-leave", "");
    closeButton.setAttribute("geometry", "primitive:plane;width:1.5;height:0.5");
    closeButton.setAttribute("material", "src:assets/images/close.png;opacity:0.99;shader:flat");
    closeButton.setAttribute("close", "");
    closeButton.setAttribute("position", "9 -4.37047 5.58094");
    closeButton.setAttribute("scale", "2.5 2.5 0.00001");
    infoboxPlane.appendChild(closeButton);

  }


  for (i = 1; i <= InventoryData.inventories.length; i++) {
    var unselectedSelectBox = document.getElementById('item-' + i);
    unselectedSelectBox.setAttribute('visible', 'true');
    unselectedSelectBox.setAttribute('class', 'clickable');
    unselectedSelectBox.setAttribute('item-click', '');
    unselectedSelectBox.setAttribute('name', InventoryData.inventories[i - 1].inventoryTitle);
    unselectedSelectBox.setAttribute('material', 'src:' + InventoryData.inventories[i - 1].inventoryImage + ';transparent:true');
  }

  if (window.matchMedia("(orientation: portrait)").matches) {
    if (InventoryData["entry_view"]) {
      var entryView_y = InventoryData["entry_view"].split(" ")[1];
      $("#CamEntity").attr("rotation", "0 " + (parseInt(entryView_y) - 180) + " 0");
    }
  }

  if (window.matchMedia("(orientation: landscape)").matches) {
    if (InventoryData["entry_view"]) {
      $("#CamEntity").attr("rotation", InventoryData["entry_view"]);
    }
  }
}

AFRAME.registerComponent('inventory-click', {
  schema: {
    default: ''
  },
  init() {
    this.el.addEventListener('mouseenter', () => {
    });
    this.el.addEventListener('click', () => {
      var banner = document.getElementById('option-panel-banner');
      var banner1 = document.getElementById('option-panel');
      if (experienceStarted == true) {
        var colorPanel = document.getElementById('option-panel-banner');
        var InventoryText = document.getElementById('option0');
        colorPanel.setAttribute('color', InventoryData.inventoryPanelColor);
        colorPanel.setAttribute('material', 'side:double;opacity:' + InventoryData.inventoryPanelOpacity + ';transparent:true');
        InventoryText.setAttribute('text', 'value:' + InventoryData.inventoryPanelHeaderText + ';color:' + InventoryData.inventoryPanelHeaderColor);
        var mainInfo = document.getElementById('mainInfo');
        mainInfo.setAttribute("animation__startAnimationPanel", "property: scale;from:0 0 0 ;to:2.2 2.2 1; dur: 2000;enabled:true;");
        pos = '20.70959 -3.70754 -7.26232';
        mainInfo.setAttribute('position', pos);
        // mainInfo.setAttribute('scale', '3 3 1');
        mainInfo.setAttribute('visible', 'true');
        var hideTeleport = document.getElementById("InventoryHotspot");
        hideTeleport.setAttribute("visible", "false");
        hideTeleport.setAttribute("animation__startAnimation", "property: scale;from:2 2 2;to: 0 0 0; dur: 1300;enabled:true;");
        setTimeout(() => {
          mainInfo.removeAttribute("animation__startAnimationPanel");
          hideTeleport.removeAttribute("animation__startAnimation");
          //hideTeleport.setAttribute("visible","false");
        }, 2500);

        for (i = 0; i < InventoryData.actionPoints.length; i++) {
          var hideTeleport = document.getElementById(InventoryData.actionPoints[i].actionId);
          hideTeleport.setAttribute("animation__endAnimation", "property: scale;to:0 0 0;from: 1 1 1; dur: 2100;enabled:true;");
          //hideTeleport.setAttribute('visible', 'false');
          setTimeout(() => {
            hideTeleport.removeAttribute("animation__endAnimation");
          }, 2500);
        }
        for (markerData = 0; markerData < InventoryData.actionPoints.length; markerData++) {
          var hotspotElement = document.getElementById('visited-' + InventoryData.actionPoints[markerData].actionId);
          if (hotspotElement != null) {
            hotspotElement.setAttribute('visible', 'true');
            hotspotElement.setAttribute("animation__startAnimation", "property: scale;from:1 1 1;to:0 0 0; dur: 1300;enabled:true;");
            setTimeout(() => {
              hotspotElement.removeAttribute("animation__startAnimation");
            }, 1800);
          }
        }
        banner.setAttribute("visible", 'true');
        banner1.setAttribute("visible", 'true');
        clicked = true;
      }
    });
    //onmouseleave    
    this.el.addEventListener('mouseleave', () => {
      if (experienceStarted && clicked) {
        var videoSphere = document.querySelector('#videoskyid');
        if (videoSphere) {
          videoSphere.muted = false;
        }
        for (i = 1; i <= InventoryData.actionPoints.length; i++) {
          var showTeleport = document.getElementById(i);
        }
        clicked = false;
      } else {
        var mediatype = this.data.split(" ");
      }
    });

  }
});
//on clikcing inventory item this event will trigger
AFRAME.registerComponent('item-click', {
  schema: { default: '' },
  init() {
    this.el.addEventListener('mouseenter', () => { });
    this.el.addEventListener('click', () => {
      hotspotVisited = 0;
      selectedOptionTagId = this.el.id;
      var elementVar = document.getElementById(this.el.id);
      selectedOption = elementVar.getAttribute("name");
      var selectedOptionArray = selectedOptionTagId.split('-');
      var selectedInventoryId = parseInt(selectedOptionArray[1]) - 1;
      var inventoryImage = document.getElementById('inventory-image');
      var cursorImage = document.getElementById('cursor');
      cursorImage.setAttribute("material", 'visible', 'false');
      inventoryImage.setAttribute('src', InventoryData.inventories[selectedInventoryId].inventoryImage);
      inventoryImage.setAttribute('visible', 'true');
      for (var optionData = 1; optionData <= 10; optionData++) {
        var optionPanel = document.getElementById("option-select-" + optionData);;
        optionPanel.setAttribute("visible", "false");
      }
      var plane = document.getElementById("option-select-" + selectedOptionArray[1]);
      plane.setAttribute("visible", "true");
      var mainInfo = document.getElementById('mainInfo');
      mainInfo.setAttribute("animation__endAnimation", "property: scale;from:2.2 2.2 2.2;to: 0 0 0 ; dur: 2000;enabled:true;");
      setTimeout(() => {
        mainInfo.setAttribute('visible', 'false');
        mainInfo.removeAttribute("animation__endAnimation");
      }, 2500);
      for (markerData = 0; markerData < InventoryData.actionPoints.length; markerData++) {
        for (MatchbleMarkerData = 0; MatchbleMarkerData < InventoryData.actionPoints[markerData].matchableInventories.length; MatchbleMarkerData++) {
          if ((InventoryData.actionPoints[markerData].matchableInventories[MatchbleMarkerData].name == selectedOption) && (InventoryData.actionPoints[markerData].matchableInventories[MatchbleMarkerData].value == true)) {
            if (InventoryData.actionPoints[markerData].isVisited == false) {
              var hotspotElement = document.getElementById(InventoryData.actionPoints[markerData].actionId);
              hotspotElement.setAttribute('visible', 'true');
              hotspotElement.setAttribute("animation__startAnimation", "property: scale;from:0 0 0;to:1 1 1; dur: 1300;enabled:true;");
              setTimeout(() => {
                hotspotElement.removeAttribute("animation__startAnimation");
              }, 1800);
            } else {
              var hotspotElement = document.getElementById('visited-' + InventoryData.actionPoints[markerData].actionId);
              if (hotspotElement != null) {
                hotspotElement.setAttribute('visible', 'true');
                hotspotElement.setAttribute("animation__startAnimation", "property: scale;from:0 0 0;to:1 1 1; dur: 1300;enabled:true;");
                setTimeout(() => {
                  hotspotElement.removeAttribute("animation__startAnimation");
                }, 1800);
              }
            }
          }
        }
      }
    });
    //onmouseleave    
    this.el.addEventListener('mouseleave', () => { });
  }

});
//on marker clicking this event will trigger
AFRAME.registerComponent('mouseclick', {
  schema: {
    default: ''
  },
  init() {
    this.el.addEventListener('mouseenter', () => { });
    this.el.addEventListener('click', () => {
      var scene = document.querySelector('a-scene');
      var isWrongFlag = 0;
      hotspotVisited++;
      selectedOptionId = this.el.id;
      var inventoryImage = document.getElementById('inventory-image');
      var cursorImage = document.getElementById('cursor');
      cursorImage.setAttribute("material", 'visible', 'true');
      inventoryImage.setAttribute('visible', 'false');
      for (markerData = 0; markerData < InventoryData.actionPoints.length; markerData++) {
        for (rightMatchInventoriesData = 0; rightMatchInventoriesData < InventoryData.actionPoints[markerData].rightMatchInventories.length; rightMatchInventoriesData++) {
          if (InventoryData.actionPoints[markerData].isVisited == true) {
            var hotspotElement = document.getElementById('visited-' + InventoryData.actionPoints[markerData].actionId);
            hotspotElement.setAttribute('visible', 'true');
            hotspotElement.setAttribute("animation__startAnimation", "property: scale;from:1 1 1;to:0 0 0; dur: 1300;enabled:true;");
          } else {
            var hotspotElement = document.getElementById(InventoryData.actionPoints[markerData].actionId);
            hotspotElement.setAttribute("animation__startAnimation", "property: scale;from:1 1 1;to:0 0 0; dur: 1300;enabled:true;");
          }
        }
      }
      setTimeout(() => {
        for (markerData = 0; markerData < InventoryData.actionPoints.length; markerData++) {
          for (rightMatchInventoriesData = 0; rightMatchInventoriesData < InventoryData.actionPoints[markerData].matchableInventories.length; rightMatchInventoriesData++) {
            if (InventoryData.actionPoints[markerData].isVisited == false) {
              var hotspotElement = document.getElementById(InventoryData.actionPoints[markerData].actionId);
              hotspotElement.removeAttribute("animation__startAnimation");
            } else {
              var hotspotElement = document.getElementById('visited-' + InventoryData.actionPoints[markerData].actionId);
              hotspotElement.removeAttribute("animation__startAnimation");
              hotspotElement.setAttribute('opacity', '1');
            }
          }
        }
      }, 1800);
      var updateSymbol = document.getElementById(selectedOptionId);
      updateSymbol.setAttribute("animation__startAnimation", "property: scale;from:1 1 1;to: 0 0 0; dur: 500;enabled:true;");
      setTimeout(() => {
        updateSymbol.removeAttribute("animation__startAnimation");
      }, 800);

      for (matchableInventories = 0; matchableInventories < InventoryData.actionPoints[selectedOptionId].matchableInventories.length; matchableInventories++) {
        if ((InventoryData.actionPoints[selectedOptionId].matchableInventories[matchableInventories].name == selectedOption) && (InventoryData.actionPoints[selectedOptionId].matchableInventories[matchableInventories].value == true)) {
          InventoryData.actionPoints[selectedOptionId].isVisited = true;
          var hotspotElement = document.getElementById(selectedOptionId);
          setTimeout(() => {
            hotspotElement.setAttribute('scale', '0 0 0');
            hotspotElement.setAttribute('visible', 'false');
            hotspotElement.removeAttribute('mouseclick');
          }, 1800);
          break;
        }
      }

      for (rightMatchInventoriesData = 0; rightMatchInventoriesData < InventoryData.actionPoints[selectedOptionId].rightMatchInventories.length; rightMatchInventoriesData++) {
        // InventoryData.actionPoints[selectedOptionId].matchableInventories[rightMatchInventoriesData].isVisited  = true;
        if ((InventoryData.actionPoints[selectedOptionId].rightMatchInventories[rightMatchInventoriesData].name == selectedOption) && (InventoryData.actionPoints[selectedOptionId].rightMatchInventories[rightMatchInventoriesData].value == true)) {
          isSuccess = true;
          var newTeleport = document.getElementById('visited-' + selectedOptionId);
          newTeleport.setAttribute('material', 'src', InventoryData.actionPoints[selectedOptionId].rightMatchSymbol);
          newTeleport.setAttribute('position', InventoryData.actionPoints[selectedOptionId].actionPointPosition);
          newTeleport.setAttribute('opacity', '1');
          var infobox = document.getElementById('infobox-plane-' + selectedOptionId);
          var hotspot = document.getElementById('hotspot-entity' + selectedOptionId);
          var text = document.getElementById('text-' + selectedOptionId);
          hotspot.setAttribute('visible', 'true');
          hotspot.setAttribute("animation__startAnimation", "property: scale;from:0 0 0;to: 2 2 2; dur: 2100;enabled:true;")
          infobox.setAttribute('visible', 'true');
          infobox.setAttribute("animation__startAnimation", "property: scale;from:0 0 0;to: 1 1 1; dur: 2100;enabled:true;")
          var MainPlane = document.getElementById('infobox-MainPlane-' + selectedOptionId);
          if (InventoryData.actionPoints[selectedOptionId].rightMatchTextBackgroundOpacity) {
            MainPlane.setAttribute('material', "side:double;transparent:true;opacity:" + InventoryData.actionPoints[selectedOptionId].rightMatchTextBackgroundOpacity);
          }
          MainPlane.setAttribute('color', InventoryData.actionPoints[selectedOptionId].rightMatchTextBackgroundColor);
          MainPlane.setAttribute('visible', 'true');
          MainPlane.setAttribute("animation__startAnimation", "property: scale;from:0 0 0;to: 1 1 1; dur: 2100;enabled:true;")
          text.setAttribute('value', InventoryData.actionPoints[selectedOptionId].rightMatchText);
          text.setAttribute('color', InventoryData.actionPoints[selectedOptionId].rightMatchTextColor);
          setTimeout(() => {
            hotspot.removeAttribute("animation__startAnimation");
            infobox.removeAttribute("animation__startAnimation");
            MainPlane.removeAttribute("animation__startAnimation");

          }, 3000);

          break;
        } else {
          isSuccess = false;
        }
      }
      if (isSuccess != true) {
        var markervisible = document.getElementById(InventoryData.actionPoints[selectedOptionId].actionId);
        console.log("markervisibilityStatus : ",markervisible.getAttribute('visible'));
        if(markervisible.getAttribute('visible')==true || markervisible.getAttribute('visible')=="true"){
        var newTeleport = document.getElementById('visited-' + selectedOptionId);
        newTeleport.setAttribute('material', 'src', InventoryData.actionPoints[selectedOptionId].wrongMatchSymbol);
        newTeleport.setAttribute('position', InventoryData.actionPoints[selectedOptionId].actionPointPosition);

        var infobox = document.getElementById('infobox-plane-' + selectedOptionId);
        var hotspot = document.getElementById('hotspot-entity' + selectedOptionId);
        var text = document.getElementById('text-' + selectedOptionId);
        hotspot.setAttribute('visible', 'true');
        hotspot.setAttribute("animation__startAnimation", "property: scale;from:0 0 0;to: 2 2 2; dur: 2100;enabled:true;")
        infobox.setAttribute('visible', 'true');
        infobox.setAttribute("animation__startAnimation", "property: scale;from:0 0 0;to: 1 1 1; dur: 2100;enabled:true;")
        var MainPlane = document.getElementById('infobox-MainPlane-' + selectedOptionId);

        if (InventoryData.actionPoints[selectedOptionId].wrongMatchTextBackgroundOpacity) {
          MainPlane.setAttribute('material', "side:double;transparent:true;opacity:" + InventoryData.actionPoints[selectedOptionId].wrongMatchTextBackgroundOpacity);
        }
        MainPlane.setAttribute('color', InventoryData.actionPoints[selectedOptionId].wrongMatchTextBackgroundColor);
        MainPlane.setAttribute('visible', 'true');
        MainPlane.setAttribute("animation__startAnimation", "property: scale;from:0 0 0;to: 1 1 1; dur: 2100;enabled:true;")
        text.setAttribute('value', InventoryData.actionPoints[selectedOptionId].wrongMatchText);
        text.setAttribute('color', InventoryData.actionPoints[selectedOptionId].wrongMatchTextColor);
        setTimeout(() => {
          hotspot.removeAttribute("animation__startAnimation");
          infobox.removeAttribute("animation__startAnimation");
          MainPlane.removeAttribute("animation__startAnimation");
        }, 2500);
      }
    }
    });
    //onmouseleave    
    this.el.addEventListener('mouseleave', () => { });

  }

});
AFRAME.registerComponent('hotspot-leave', {
  schema: {
    default: ''
  },
  init() {
    this.el.addEventListener('click', () => {
      var hotspot = document.getElementById('hotspot-entity' + selectedOptionId);
      hotspot.setAttribute("animation__startAnimation", "property: scale;from:2 2 2;to: 0 0 0; dur: 2000;enabled:true;");
      var showTeleport = document.getElementById("InventoryHotspot");
      showTeleport.setAttribute("visible", "true");
      showTeleport.setAttribute("animation__startAnimation1", "property: scale;from:0 0 0;to: 2 2 2; dur: 2100;enabled:true;");
      hotspot.setAttribute('visible', 'false');
      setTimeout(() => {
        hotspot.setAttribute('visible', 'false');
        hotspot.removeAttribute("animation__startAnimation");
        showTeleport.removeAttribute("animation__startAnimation1");
      }, 2500);

      for (markerData = 0; markerData < InventoryData.actionPoints.length; markerData++) {
        var isMatch = false;
        for (rightMatchInventoriesData = 0; rightMatchInventoriesData < InventoryData.actionPoints[markerData].matchableInventories.length; rightMatchInventoriesData++) {
          if ((InventoryData.actionPoints[markerData].matchableInventories[rightMatchInventoriesData].name == selectedOption) && (InventoryData.actionPoints[markerData].matchableInventories[rightMatchInventoriesData].value == true)) {
          if (InventoryData.actionPoints[markerData].isVisited == false) {
            if (isMatch == false) {
              if (selectedOptionId != markerData) {
                var hotspotElement = document.getElementById(InventoryData.actionPoints[markerData].actionId);
                var visitedHotspotElement = document.getElementById('visited-' + InventoryData.actionPoints[markerData].actionId);
                hotspotElement.setAttribute('visible', 'true');
                hotspotElement.setAttribute("animation__startAnimation", "property: scale;from:0 0 0;to:1 1 1; dur: 1300;enabled:true;");
                visitedHotspotElement.setAttribute('visible', 'false');
                visitedHotspotElement.setAttribute('scale', '0 0 0');
                setTimeout(() => {
                  hotspotElement.removeAttribute("animation__startAnimation");
                }, 1800);
              }

            }
          } else {
            var hotspotElement = document.getElementById(InventoryData.actionPoints[markerData].actionId);
            hotspotElement.setAttribute('visible', 'false');
            hotspotElement.setAttribute('scale', '0 0 0');
            var visitedHotspotElement = document.getElementById('visited-' + InventoryData.actionPoints[markerData].actionId);
            visitedHotspotElement.setAttribute('visible', 'true');
            visitedHotspotElement.setAttribute("animation__startAnimation", "property: scale;from:0 0 0;to:1 1 1; dur: 1300;enabled:true;");
            setTimeout(() => {
              visitedHotspotElement.removeAttribute("animation__startAnimation");
            }, 1800);
            isMatch = true;
          }
        }
        }
      }
    });
  }
});
AFRAME.registerComponent('reset-click', {
  schema: {
    default: ''
  },
  init() {
    this.el.addEventListener('click', () => {
      location.reload();
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
        var showTeleport = document.getElementById("InventoryHotspot");
        showTeleport.setAttribute("animation__startAnimation","property: scale;from:0 0 0;to: 1 1 1; dur: 2100;enabled:true;");
        setTimeout(()=>{
          showTeleport.removeAttribute("animation__startAnimation");
        },2100);
      });
      //onmouseleave    
      this.el.addEventListener('mouseleave', () => { });
    }
  });
    //onmouseleave   
//onmouseleave    
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
  }, 3000);
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
