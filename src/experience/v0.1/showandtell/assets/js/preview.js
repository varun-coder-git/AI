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
var experienceData;
var experienceStarted = false;

var clicked = false;

function hexToRgb(hex, opacity) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    alpha: opacity
  } : null;
}

function initializePreview(experienceJSON, ExperienceName) {
 

  experienceData = JSON.parse(experienceJSON);
  
  if (experienceData["entry_view"]) {
    $("#CamEntity").attr("rotation", experienceData["entry_view"]);
  }
  loadExperience(experienceData);
  $("#loaderq").addClass("hidden-login");
  $("#innerInfo").removeClass("hidden-login");

  var instructionSet = experienceData.splash_instruction;
  var lunchTextSet = experienceData.launch_text;


  if (experienceData.splashBackgroundColor && experienceData.Opacity) {
    var rgbformat = hexToRgb(experienceData.splashBackgroundColor, experienceData.Opacity);
    document.getElementById('innerInfo').style.backgroundColor = "rgba(" + rgbformat.r + "," + rgbformat.g + "," + rgbformat.b + "," + rgbformat.alpha + ")";
  }
  document.getElementById('titleText').innerHTML = ExperienceName;
  document.getElementById('titleText').style.color = experienceData.splashHeaderColor;
  document.getElementById('instruction').innerHTML = instructionSet;
  document.getElementById('titleDescription').innerHTML = lunchTextSet;
  document.getElementById('splashLogo').src = experienceData.splash_image;

  loggedin = true;
}

$(document).ready(() => {
  var startExperienteBtn = document.getElementById('start_experience');

  startExperienteBtn.onclick = function () {
    experienceStarted = true;
    var cam = document.querySelector("#rotation");
    cam.setAttribute("animation", "enabled:false");
    cam.setAttribute("animation__one", "enabled:true");
    document.getElementsByTagName('a-scene')[0].style.zIndex = 'auto';
    document.getElementById('container').style.display = "none";
    document.getElementById('loaderq').style.display = "none";
    clearTimeout(timer);
    if (document.querySelector('#videoskyid'))
      document.querySelector('#videoskyid').play();
    
      var audioEntity = document.getElementById("audioEntity");
      audioEntity.components.sound.playSound();
      audioEntity.setAttribute("sound", "volume:0;");
  };
});


var startexp = function () {
  var start = document.getElementById("start_experience");
  if (assetsLoaded && loggedin) {
    if (start.classList.contains("disabled")) {
      var loading = document.getElementById("loading");
      loading.classList.add("disabled");
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


AFRAME.registerComponent("set-sky", {
  schema: {
    default: ''
  },
  init() {
    this.el.addEventListener("mouseenter", () => {
      var sd = this.el.id
      var sky = document.getElementById(sd);
      var gif = document.querySelector('#gif' + this.el.id);
      //if(clicked)
      gif.setAttribute('visible', this.data);
      //sky.setAttribute('scale', "2 2 2");
    });

    this.el.addEventListener("click", () => {
      if (experienceStarted == true) {
        clicked = true;
        

        $("#" + this.el.id).attr("geometry", "width:3.6;height:2.4");
        var plane = document.querySelector('#planeEntity' + this.el.id);
        var MainPlane = document.querySelector('#planeMainEntity' + this.el.id);
        var text = document.querySelector("#text" + this.el.id);
        var gif = document.querySelector('#gif' + this.el.id);
        var imgPlane = document.getElementById(this.el.id);

        imgPlane.setAttribute("animation__imgPlaneEndAnimation", "enabled:false");
        
        imgPlane.setAttribute("animation__posEndAnimation", "enabled:false");
        
        imgPlane.setAttribute("animation__imgPlaneStartAnimation", "enabled:true");

        imgPlane.setAttribute("animation__posStartAnimation", "enabled:true");

        
        document.getElementById("aImage" + this.el.id).setAttribute("animation__endAnimation", "enabled:false");
        document.getElementById("aImage" + this.el.id).setAttribute("animation__startAnimation", "enabled:true");

        if (plane) {
          plane.setAttribute("animation__endAnimationPlane", "enabled:false");
          plane.setAttribute("animation__startAnimationPlane", "enabled:true");
          plane.setAttribute('visible', this.data);
          text.setAttribute('value', experienceData.image[this.el.id - 1].imagetext);
        }

        if (MainPlane) {

          MainPlane.setAttribute("animation__endMainAnimationPlane", "enabled:false");
          MainPlane.setAttribute("animation__startMainAnimationPlane", "enabled:true");

          MainPlane.setAttribute('visible', 'true');
        }
        if (text) {
          text.setAttribute("animation__startMainAnimationText", "enabled:true");
        }
        if (gif) {
          gif.setAttribute("animation__gifendAnimation", "enabled:false");
          gif.setAttribute("animation__gifstartAnimation", "enabled:true");
        }
        //document.querySelector('a-sphere').emit("startSphereOpaAnimation");
        for (var i = 1; i <= experienceData.image.length; i++) {
          if (i != this.el.id) {
            document.getElementById("aImage" + i).setAttribute("animation__endopaAnimation", "enabled:false");

            document.getElementById("aImage" + i).setAttribute("animation__endposAnimation", "enabled:false");

            document.querySelector('#gif' + i).setAttribute("animation__smallGifEndAnimation", "enabled:false");

            document.getElementById("aImage" + i).setAttribute("animation__startopaAnimation", "enabled:true");

            document.getElementById("aImage" + i).setAttribute("animation__startposAnimation", "enabled:true");

            document.querySelector('#gif' + i).setAttribute("animation__smallGifStartAnimation", "enabled:true");
          }
        }
        if (experienceData.image[ this.el.id- 1].audiolocation) {
            var audio = '';
            audio = document.getElementById('audioAsset');
            audio.setAttribute('src', '');
            audio.setAttribute('src', experienceData.image[ this.el.id - 1].audiolocation);
          
          
          var audioEntity = document.getElementById('audioEntity');
          audioEntity.setAttribute('sound', 'src: #audioAsset');
          audioEntity.setAttribute('sound', 'volume:1;');
          audioEntity.components.sound.playSound();

          var videoSphere = document.querySelector('#videoskyid');
          if (videoSphere) {
            videoSphere.muted = true;
          }
        }

         
       // }
       
        
      }
    });

    this.el.addEventListener("mouseleave", () => {

        $("#" + this.el.id).attr("geometry", "width:2.8;height:2.1");
        var audioEntity = document.getElementById('audioEntity');
        audioEntity.setAttribute('sound', 'volume:0;');
        audioEntity.setAttribute('sound', 'src: ');


        if (experienceStarted == true) {
        var gif = document.querySelector("#gif" + this.el.id);
        gif.setAttribute("visible", "false");
        if (clicked) {

        var sky = document.querySelector('#planeEntity' + this.el.id);
        var MainSky = document.querySelector('#planeMainEntity' + this.el.id);
        var imgPlane = document.getElementById(this.el.id);

        
        imgPlane.setAttribute("animation__posStartAnimation","enabled:false");
        imgPlane.setAttribute("animation__posEndAnimation", "enabled:true");


        var aImage = document.querySelector('#aImage' + this.el.id);
        if (imgPlane) {
          imgPlane.setAttribute("animation__imgPlaneStartAnimation", "enabled:false");
          imgPlane.setAttribute("animation__imgPlaneEndAnimation", "enabled:true");

        }
        if (aImage) {
          aImage.setAttribute("animation__startAnimation", "enabled:false");
          aImage.setAttribute("animation__endAnimation", "enabled:true");
        }

        if (sky) {
          sky.setAttribute("animation__startAnimationPlane", "enabled:false");
          sky.setAttribute("animation__endAnimationPlane", "enabled:true");
        }
        if (MainSky) {
            
            MainSky.setAttribute("animation__startMainAnimationPlane", "enabled:false");
            MainSky.setAttribute("animation__endMainAnimationPlane", "enabled:true");
        }
        if (gif) {
          gif.setAttribute("animation__gifstartAnimation", "enabled:false");
          gif.setAttribute("animation__gifendAnimation", "enabled:true");
        }
        //document.querySelector('a-sphere').emit("endSphereOpaAnimation");
        for (var i = 1; i <= experienceData.image.length; i++) {

          if (i != this.el.id) {
            document.getElementById("aImage" + i).setAttribute("animation__startopaAnimation", "enabled:false");

            document.getElementById("aImage" + i).setAttribute("animation__startposAnimation", "enabled:false");

            document.querySelector('#gif' + i).setAttribute("animation__smallGifStartAnimation", "enabled:false");

            document.getElementById("aImage" + i).setAttribute("animation__endopaAnimation", "enabled:true");


            document.getElementById("aImage" + i).setAttribute("animation__endposAnimation", "enabled:true");

            document.querySelector('#gif' + i).setAttribute("animation__smallGifEndAnimation", "enabled:true");
          }
        }
        clicked = false;
        var videoSphere = document.querySelector('#videoskyid');
        if (videoSphere) {
          videoSphere.muted = false;
        }
    }
      }
    });
  }
});

function loadExperience(data) {
  experienceData = data;
  var assets = document.querySelector('a-assets');
  var scene = document.querySelector('a-scene');
  var aLight = '';
  aLight = document.createElement('a-entity');
  aLight.setAttribute("light", "color:#f0f0f0;type:ambient;intensity: 0.9")
  scene.appendChild(aLight);
  createPoints();
  if (experienceData.imageskypath) {
    //$('#imageSkyPopup').show();
    $('#imageRadio').click();
    //$('#videoSkyPopup').hide();
    var img = document.createElement('img');
    img.setAttribute('id', "imageskyid");
    img.setAttribute('src', experienceData.imageskypath);
    img.setAttribute('crossorigin', 'anonymous');
    assets.appendChild(img);
    var aSky = '';
    aSky = document.createElement('a-sky');
    aSky.setAttribute('src', experienceData.imageskypath);
    aSky.setAttribute('crossorigin', 'anonymous');
    scene.appendChild(aSky);
  } else {
    $('#imageSkyPopup').hide();
    $('#videoSkyPopup').show();
    var skyVideo = document.createElement('video');
    skyVideo.setAttribute('id', "videoskyid");
    skyVideo.setAttribute('src', experienceData.videoskypath);
    // skyVideo.setAttribute('autoplay', 'true');
    skyVideo.setAttribute('loop', '');
    skyVideo.setAttribute('crossorigin', 'anonymous');
    assets.appendChild(skyVideo);
    var aVideoSphere = '';
    aVideoSphere = document.createElement('a-videosphere');
    aVideoSphere.setAttribute('src', "#videoskyid");
    aVideoSphere.setAttribute('crossorigin', 'anonymous');
    scene.appendChild(aVideoSphere);
  }
}


function createPoints() {
  var assets = document.querySelector('a-assets');
  var scene = document.querySelector('a-scene');
  for (var i = 1; i <= experienceData.image.length; i++) {
    //////////////////delete all////////////////////
    if (document.querySelector("#imageasset" + i))
      $("#imageasset" + i).remove();
    if (document.getElementById(i))
      $("#" + i).remove();
    if (document.querySelector("#aImage" + i))
      $("#aImage" + i).remove();
    if (document.querySelector("#planeEntity" + i))
      $("#planeEntity" + i).remove();
    if (document.querySelector("#audioAssets" + i))
      $("#audioAssets" + i).remove();
    if (document.querySelector("#audio" + i))
      $("#audio" + i).remove();
    if (document.querySelector("#mainDiv" + i))
      $("#mainDiv" + i).remove();
    if (document.querySelector("#deleteMainDiv" + i))
      $("#deleteMainDiv" + i).remove();
    if (document.querySelector("#gif" + i))
      $("#gif" + i).remove();
    //////////////////delete all////////////////////
  }
  for (var i = 1; i <= experienceData.image.length; i++) {
    ///////////////img/////////////
    var img = '';
    img = document.createElement('img');
    img.setAttribute('id', "imageasset" + i);
    //img.setAttribute('src', experienceData.image[i - 1].imagelocation);
    img.setAttribute('crossorigin', "anonymous");
    assets.appendChild(img);

    var aimg = '';
    aimg = document.createElement('a-image');
    aimg.setAttribute('id', "aImage" + i);
    aimg.setAttribute("src", experienceData.image[i - 1].imagelocation);
    aimg.setAttribute('crossorigin', "anonymous");
    //aimg.setAttribute('opacity', '0');
    
   

    scene.appendChild(aimg);

    var aimgPlane = '';
    aimgPlane = document.createElement('a-entity');
    aimgPlane.setAttribute('id', i);
    aimgPlane.classList.add('clickable');
    aimgPlane.setAttribute('geometry', "primitive:plane;height:2.4;width:2.9;");
    aimgPlane.setAttribute('opacity', '0');
    aimgPlane.setAttribute('visible', 'false');
    aimgPlane.setAttribute('transparent', 'true');
    aimgPlane.setAttribute('set-sky', '');
    aimgPlane.setAttribute("material", "color:#FFFFFF;")
  
     aimgPlane.setAttribute("animation__imgPlaneStartAnimation", "property: scale;to:2 3.5 2; dur: 1500;fill:forwards;enabled:false");
     
    aimgPlane.setAttribute("animation__posStartAnimation", "property: position;to:" + 8 * Math.cos(toRadians((i - 1) * 36)) + " -0.50 " + 8 * Math.sin(toRadians((i - 1) * 36)) + "; dur: 1500;fill:forwards;enabled:false");
    
    aimgPlane.setAttribute("animation__posEndAnimation", "property: position;to:" + 8 * Math.cos(toRadians((i - 1) * 36)) + " 1.6 " + 8 * Math.sin(toRadians((i - 1) * 36)) + "; dur: 1500;fill:forwards;enabled:false");
    
    aimgPlane.setAttribute("animation__imgPlaneEndAnimation", "property: scale;to:1 1 1;dur: 1500;fill:forwards;enabled:false");

    aimg.setAttribute("animation__displayImage", "property: opacity;from:0;to:1; dur: 1500;delay:" + (450 * i) + ";fill:forwards");
   
    aimg.setAttribute("animation__endAnimation", "property: scale;to:1 1 1;dur: 1500;fill:forwards;enabled:false");
    
    aimg.setAttribute("animation__startAnimation", "property: scale;to:2 2 2;dur: 1500;fill:forwards;enabled:false");
   
    aimg.setAttribute("animation__startAnimation", "property: scale;to:2 2 2;dur: 1500;fill:forwards;enabled:false");
    
    aimg.setAttribute("animation__startposAnimation", "property: position;to:" + 15 * Math.cos(toRadians((i - 1) * 36)) + " 1.6 " + 15 * Math.sin(toRadians((i - 1) * 36)) + ";dur: 1500;fill:forwards;enabled:false");
   
    aimg.setAttribute("animation__endopaAnimation", "property: opacity;from:0.4;to:1;dur: 1500;fill:forwardsenabled:false");
    
    aimg.setAttribute("animation__endposAnimation", "property: position;to:" + 8 * Math.cos(toRadians((i - 1) * 36)) + " 1.6 " + 8 * Math.sin(toRadians((i - 1) * 36)) + ";dur: 1500;fill:forwards;enabled:false");
   
    scene.appendChild(aimgPlane);

    //////////////////////img//////////////
    ///////////////////gif/////////////////////////
    var agif = '';
    agif = document.createElement('a-entity');
    agif.setAttribute('id', "gif" + i);
    agif.setAttribute("geometry", "primitive:plane;");
    agif.setAttribute("material", "shader:gif;src:url(/act/v0.1/showandtell/assets/images/bdr.gif);opacity:.9");
    agif.setAttribute("scale", "2.8 2.15 2");
    agif.setAttribute("visible", "false");


    agif.setAttribute("animation__gifstartAnimation", "property: scale;from:2.8 2.15 2;to:5.7 4.4 4; dur: 1500;fill:forwards;enabled:false");
    scene.appendChild(agif);

    agif.setAttribute("animation__gifendAnimation", "property: scale;to:2.8 2.15 2; dur: 1500;fill:forwards;enabled:false");

    
    agif.setAttribute("animation__smallGifStartAnimation", "property: position;to:" + 14.9 * Math.cos(toRadians((i - 1) * 36)) + " 1.6 " + 14.9 * Math.sin(toRadians((i - 1) * 36)) + "; dur: 1500;fill:forwards;enabled:false");

    agif.setAttribute("animation__smallGifEndAnimation", "property: position;to:" + 7.9 * Math.cos(toRadians((i - 1) * 36)) + " 1.6 " + 7.9 * Math.sin(toRadians((i - 1) * 36)) + "; dur: 1500;fill:forwards;enabled:false");


    var aplane1 = '';
    aplane1 = document.createElement('a-plane');
    aplane1.setAttribute('id', "planeMainEntity" + i);
    aplane1.classList.add('clickable');

    if (experienceData.descriptionBgOpacity) {
      aplane1.setAttribute('material', "side:double;opacity:" + experienceData.descriptionBgOpacity + ";transparent:true");
    } else {
      aplane1.setAttribute('material', "side:double;opacity:0.6;transparent:true");
    }
    if (experienceData.descriptionBgColor) {
      aplane1.setAttribute('color', experienceData.descriptionBgColor);
    } else {
      aplane1.setAttribute('color', "#000000");
    }
    aplane1.setAttribute('position', "2000 2000 2000");
    aplane1.setAttribute('geometry', "height:2.9;width:7");
    aplane1.setAttribute('rotation', "-10 270 0");
    aplane1.setAttribute('visible', "false");
    aplane1.setAttribute('look-at', "src: #mainCam");


    aplane1.setAttribute("animation__startMainAnimationPlane", "property: scale;from:0 0 0;to:1.2 1.2 1.2;dur: 1500;fill:forwards;enabled:false");

    aplane1.setAttribute("animation__endMainAnimationPlane", "property: scale;to:0 0 0;from:1.2 1.2 1.2;dur: 1500;fill:forwards;enabled:false");


    scene.appendChild(aplane1);

    var aplane = '';
    aplane = document.createElement('a-plane');
    aplane.setAttribute('id', "planeEntity" + i);

    aplane.setAttribute('color', "#000000");
    aplane.setAttribute('geometry', "height:2.9;width:7");
    aplane.setAttribute('material', "side:back;opacity:0;transparent:true");
    aplane.setAttribute('rotation', "-10 270 0");
    aplane.setAttribute('visible', "false");
    aplane.setAttribute('look-at', "src: #mainCam");


    aplane.setAttribute("animation__startAnimationPlane", "property: scale;from:0 0 0;to:1.2 1.2 1.2;dur: 1500;fill:forwards;enabled:false");

    aplane.setAttribute("animation__endAnimationPlane", "property: scale;to:0 0 0;from:1.2 1.2 1.2;dur: 1500;fill:forwards;enabled:false");
    scene.appendChild(aplane);

    var atext = '';
    atext = document.createElement('a-text');
    atext.setAttribute('id', "text" + i);
    atext.setAttribute('text', "anchor:center;width:5.9;wrapPixels:1050;height:4.97;wrapCount:100;lineHeight:60;baseline:top");
    atext.setAttribute('position', "-0.04034 1.1 0.33429");
    if (experienceData.descriptionFontColor)
      atext.setAttribute('color', experienceData.descriptionFontColor);

    atext.setAttribute("animation__startMainAnimationText", "property: scale;from:0 0 0;to:1 1 1;dur: 1500;fill:forwards;enabled:false");
    aplane.appendChild(atext);


    ////////////////plane and text/////////////
    ////////////////audio/////////////
   
  }

  for (var i = 1; i <= experienceData.image.length; i++) {
        $("#aImage" + i).attr("position", 8 * Math.cos(toRadians((i - 1) * 36)) + " 1.6 " + 8 * Math.sin(toRadians((i - 1) * 36)));
       
        $("#aImage" + i).attr("rotation", "0 " + (270 - ((i - 1) * 36)) + " 0");
        $("#aImage" + i).attr("geometry", "width:2.8;height:2.1");

        $("#gif" + i).attr("position", 7.9 * Math.cos(toRadians((i - 1) * 36)) + " 1.6 " + 7.9 * Math.sin(toRadians((i - 1) * 36)));
        $("#gif" + i).attr("rotation", "0 " + (270 - ((i - 1) * 36)) + " 0");
     
        $("#" + i).attr("position", 8 * Math.cos(toRadians((i - 1) * 36)) + " 1.6 " + 8 * Math.sin(toRadians((i - 1) * 36)));
        $("#" + i).attr("rotation", "0 " + (270 - ((i - 1) * 36)) + " 0");
        $("#" + i).attr("geometry", "width:2.8;height:2.1");

        $("#planeEntity" + i).attr("position", 8 * Math.cos(toRadians((i - 1) * 36)) + " -2.86364 " + 8 * Math.sin(toRadians((i - 1) * 36)));
        $("#planeEntity" + i).attr("rotation", "-10 " + (270 - ((i - 1) * 36)) + " 0");
        
       $("#planeMainEntity" + i).attr("position", 8 * Math.cos(toRadians((i - 1) * 36)) + " -2.86364 " + 8 * Math.sin(toRadians((i - 1) * 36)));
        $("#planeMainEntity" + i).attr("rotation", "-10 " + (270 - ((i - 1) * 36)) + " 0");
        
  }

}

function toRadians(angle) {
  return (angle * (Math.PI / 180)).toFixed(5);
}
