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

  var EverestData;
  var cam ;
  var infoBox;
  var experienceStarted=false;
   var clicked = false;
   var nosafari = false;
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
      EverestData = JSON.parse(experienceJSON);
      $("#loaderq").addClass("hidden-login");
    $("#innerInfo").removeClass("hidden-login");
       
 var instructionSet =EverestData.splash_instruction;;
 var lunchTextSet =  EverestData.launch_text;
   
 //if json includes splashbgcolor and opacity
 if (EverestData.splashBackgroundColor && EverestData.Opacity) {
  var rgbformat = hexToRgb(EverestData.splashBackgroundColor, EverestData.Opacity);
  document.getElementById('innerInfo').style.backgroundColor = "rgba(" + rgbformat.r + "," + rgbformat.g + "," + rgbformat.b + "," + rgbformat.alpha + ")";
}
 //if json includes splashheadercolor
 if(EverestData.splashHeaderColor){
 document.getElementById('titleText').style.color = EverestData.splashHeaderColor
 }
	document.getElementById('titleText').innerHTML = ExperienceName;
    document.getElementById('instruction').innerHTML = instructionSet;
    document.getElementById('titleDescription').innerHTML = lunchTextSet;
    document.getElementById('splashLogo').src = EverestData.splash_image;
   
    loggedin = true;
      loadExperience(EverestData);
      if (EverestData["entry_view"]) {
        $("#CamEntity").attr("rotation", EverestData["entry_view"]);
        }
   
  }
$(document).ready(() => {
    var startExperienteBtn = document.getElementById('start_experience');
    ascene=  document.querySelector('a-scene'); 
    cam = document.getElementById("cameraId");
    infoBox=document.getElementById("infoBox");
    startExperienteBtn.onclick = function(){
      cam.setAttribute("animation","enabled:false");
      cam.setAttribute("animation__one","enabled:true");
         experienceStarted=true;
        ascene.style.zIndex = 'auto';     
        document.getElementById('container').style.display="none";
        document.getElementById('loaderq').style.display="none";
              
        var skyVideo = document.querySelector('#videoskyid');
            if(skyVideo)
            skyVideo.play();
            var ua = navigator.userAgent.toLowerCase(); 
            if (ua.indexOf('safari') != -1) { 
              if (ua.indexOf('chrome') ==-1 ) {
                var audio1 = document.getElementById('audio1');
                audio1.components.sound.playSound();
                audio1.setAttribute('sound','volume:0;');
                nosafari= true;
               }
            }
             var vid = document.querySelector('#vid');
             vid.load();
             setTimeout(function(){ 
             vid.play();
             setTimeout(function(){ 
                 vid.pause();
                 vid.load();
             },50);
         },1000); 
    };
    
    });
    
    
    var startexp = function(){
        var start= document.getElementById("start_experience");
        if(assetsLoaded && loggedin){
                   if(start.classList.contains("disabled")){
                    var loading=document.getElementById("loading");
                    loading.classList.add("disabled");  
                        start.classList.remove("disabled");
                       clearTimeout(timer);
                       timer = null;
                               }else{ 
                               clearTimeout(timer);
                               }
        } 
    }
     var timer =  setInterval(startexp,500);
        var assetsLoaded = false;
    var loggedin = false;
     $(window).on('load', function() {
                    
                    setTimeout(function () { 
                     assetsLoaded = true;  
                    
             
        }, 3000);   
    })

  
  function loadExperience(EverestData) {
      var assets = document.querySelector('a-assets');
      var scene = document.querySelector('a-scene');
      if (EverestData.imageSkyPath) {
          var aSky = '';
          aSky = document.createElement('a-sky');
          aSky.setAttribute('src', EverestData.imageSkyPath);
          aSky.setAttribute('crossorigin', 'anonymous');
          scene.appendChild(aSky);

      } else {
        var skyVideo = document.createElement('video');
        skyVideo.setAttribute('id', "videoskyid");
        skyVideo.setAttribute('src', EverestData.videoskypath);
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
      for (i = 1; i <= EverestData.actionPoints.length; i++) {
              radiusAction = EverestData.actionPoints[i - 1].markerSize;
         
          var background = '';
          background = document.createElement('a-entity');
          background.setAttribute('id', i + "background");
          background.classList.add('clickable');
          background.setAttribute('geometry', "primitive:plane; height: "+ radiusAction+"; width: "+ radiusAction);
          background.setAttribute('opacity', '0.9');
          background.setAttribute('look-at', "src: #mainCam");

          background.setAttribute('set-sky', EverestData.actionPoints[i - 1].mediatype + " " + i);
          background.setAttribute('visible', 'false');
          background.setAttribute('transparent', 'true');
          var posbackground = EverestData.actionPoints[i - 1].actionPointPosition.split(" ");
          background.setAttribute('position', posbackground[0] + " " + posbackground[1] + " " + posbackground[2]);

          scene.appendChild(background);
          var newTeleport = document.createElement('a-box');
          newTeleport.setAttribute('id', i);
          newTeleport.setAttribute('material', 'src', EverestData.actionPoints[i - 1].actionIcon);
          newTeleport.setAttribute('material', 'transparent', 'true');
          newTeleport.setAttribute('geometry', 'height', radiusAction);
          newTeleport.setAttribute('geometry', 'width', radiusAction);
          newTeleport.setAttribute('crossorigin', 'anonymous');
          newTeleport.setAttribute('shadow', 'cast', 'true');
          newTeleport.setAttribute("visible", "false");
          newTeleport.setAttribute('position', posbackground[0] + " " + posbackground[1] + " " + posbackground[2]);
          newTeleport.setAttribute('look-at', 'src', '#mainCam');

          if(EverestData.actionPoints[i - 1].actionChecked=="true"){   
          newTeleport.setAttribute("animation","property: scale; from:0.5 0.5 0.5;dir:alternate;to:1 1 1; dur: 700; easing: easeInOutCubic;enabled:true;loop:true");
          
          }
          if (EverestData.actionPoints[i - 1].actionPointVisibility == "Always Visible") {
              newTeleport.setAttribute("visible", "true");
          }
          scene.appendChild(newTeleport);
      }
      if(EverestData.CurveImageName1){
        $('#quard1').attr('src', EverestData.CurveImageName1);
        $('#quard1').attr('visible', 'true');
        }
        
      if(EverestData.CurveImageName2){
            $('#quard2').attr('src', EverestData.CurveImageName2);
            $('#quard2').attr('visible', 'true');
            }
  }
  // ongaze
  AFRAME.registerComponent('set-sky', {
      schema: {
          default: ''
      },
      init() {
          this.el.addEventListener('mouseenter', () => {
            if(experienceStarted){
              var mediatype = this.data.split(" ");
              if (EverestData.actionPoints[mediatype[1] - 1].actionPointVisibility == "Visible while gaze over object") {
                  var plane = document.getElementById(mediatype[1]);
                  plane.setAttribute("visible", "true");
              }
           } });
          this.el.addEventListener('click', () => {
            if(experienceStarted){
              
              infoBox.setAttribute("color",'#000');
              infoBox.setAttribute("material","opacity","0.6")
              var background = document.getElementById(this.el.id);
              
              var mainInfo = document.getElementById('mainInfo');
              var mediatype = this.data.split(" ");
              var posvid = EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointPosition.split(" ");
              var pos = newPos(posvid[0], posvid[1], posvid[2]);
             
              if (EverestData.actionPoints[mediatype[1] - 1].markerSize >= 1.2 || EverestData.actionPoints[mediatype[1] - 1].markerSize <2.8) {
                background.setAttribute("animation__startAnimation","property: scale;to: 17.5 19.5 1; dur: 1500;enabled:true;");
                background.setAttribute('scale','17.5 19.5 1');

              } else if (EverestData.actionPoints[mediatype[1] - 1].markerSize >= 2.8 || EverestData.actionPoints[mediatype[1] - 1].markerSize <4.0) {
                  background.setAttribute("animation__startAnimation","property: scale;to: 10.5 12.5 1; dur: 1500;enabled:true");
                  background.setAttribute('scale',' 10.5 12.5 1');
              } else {
                background.setAttribute("animation__startAnimation","property: scale;to: 6.7 8.5 1; dur: 1500;enabled:true");
                background.setAttribute('scale','6.7 8.5 1');
              }
            
              for (i = 1; i <= EverestData.actionPoints.length; i++) {

                var hideTeleport = document.getElementById( i);
           
              hideTeleport.setAttribute("animation__aEndAnimation","property: opacity;from:0.9;to: 0; dur: 1300;enabled:true");
              }
			          for (i=1;i<=EverestData.actionPoints.length;i++){
                var backgroundData = document.getElementById(i+'background');
                if(background!=backgroundData){
                backgroundData.setAttribute("animation__imgPlaneStartAnimationHide","property: scale;to: 0 0 0; dur: 1500;enabled:true");   
				        }
              }
              switch (mediatype[0]) {
                  case 'V':
                      var videoframe = document.getElementById('videoframe');
                      var video = document.getElementById('video1');
                      var vid = document.getElementById('vid');
                      videoframe.setAttribute("animation__startAnimationVideo","property: scale;from:0 0 0;to:0.2 0.2 0.1; dur: 1500;enabled:true");
                      vid.setAttribute("src", '');
                
                      var videoSource= EverestData.actionPoints[mediatype[1] - 1].actionPointVideo;
                      var agif =  document.getElementById('nomediaGif');
                      
                      agif.setAttribute("visible", "false");
                      vid.setAttribute("src", videoSource);
                      video.setAttribute("material", "src: ");
                      video.setAttribute("visible", "true");
                      video.setAttribute("material", "src: #vid");
                      videoframe.setAttribute("visible", "true");
                      vid.load();
                      vid.play();
                      mainInfo.setAttribute("position", pos);

                      if(videoSource=="" || videoSource==undefined || videoSource==null){
                        video.setAttribute("visible", "false");
                        agif.setAttribute("visible", "true");
                    }
                    
                     
                      
                      var videoSphere = document.querySelector('#videoskyid');
                        if(videoSphere){
                            videoSphere.muted = true;
                        }
                       
                       
                    
                      break;
                  case 'VT':
                  var textAnimation = document.getElementById('textAnimation');
                  var videoframe = document.getElementById('videoframe');
                  var video = document.getElementById('video1');
                  var vid = document.getElementById('vid');
                  videoframe.setAttribute("animation__startAnimationVideo","property: scale;from:0 0 0;to:0.2 0.2 0.1; dur: 1500;enabled:true");
                  vid.setAttribute("src", '');
                      
                  var agif =  document.getElementById('nomediaGif');
                 
                  var videoSource= EverestData.actionPoints[mediatype[1] - 1].actionPointVideo;
                  vid.setAttribute("src", videoSource);
                  video.setAttribute("material", "src: ");
                  video.setAttribute("visible", "true");
                  video.setAttribute("material", "src: #vid");
                  videoframe.setAttribute("visible", "true");
                  mainInfo.setAttribute("position", pos);
                  agif.setAttribute("visible", "false");
                  vid.load();
                  vid.play();

                  if(videoSource=="" || videoSource==undefined || videoSource==null){
                    video.setAttribute("visible", "false");
                    agif.setAttribute("visible", "true");
                }
                

                  var videoSphere = document.querySelector('#videoskyid');
                        if(videoSphere){
                            videoSphere.muted = true;
                        }
                      
                      
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor){
                        infoBox.setAttribute("color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
                      }
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity){
                        infoBox.setAttribute('material', 'opacity', EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
                      }
                      var postext = EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointPosition.split(" ");
                      infoBox.setAttribute("scale", "1.5 1.5 1.5")
                      infoBox.setAttribute("visible", "true");
                      var text = document.getElementById('text1');
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointHeader!=""){
                        text.setAttribute('text',"value", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointHeader);
                        }else{
                          text.setAttribute('text',"value","");
                        }
                        var text1 = document.getElementById('text2');
                        if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointText!=""){
                        text1.setAttribute('text',"value", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointText);
                        }else{
                          text1.setAttribute('text',"value","");
                        }
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor){
                        text1.setAttribute('text',"color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
                        text.setAttribute('text',"color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
                      }else{
                        text1.setAttribute("color","#fffff");
                        text.setAttribute("color","#fffff");
                      }
                      infoBox.setAttribute("animation__startAnimation","property: scale;from:0 0 0;to: 1 1 1; dur: 1500;enabled:true");
                      textAnimation.setAttribute("animation__startTextAnimation","property: scale;from:0 0 0;to:0.87 1 1; dur: 1500;enabled:true");
                      
                      break;
                  case 'A':
                    if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio!=""){
                  var ua = navigator.userAgent.toLowerCase(); 
                  if (ua.indexOf('safari') != -1) { 
                    if (ua.indexOf('chrome') ==-1 ) {
                        var audio1 = document.getElementById('audio1');
                        var audio = document.getElementById('sound')
                      audio.setAttribute("src", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                        audio1.setAttribute('sound', 'src: #sound');
                        audio1.setAttribute('sound','volume:1;');
                        audio1.components.sound.playSound();
                        var videoSphere = document.querySelector('#videoskyid');
                        if(videoSphere){
                            videoSphere.muted = true;
                        }
                    } else {
                      var audio = document.getElementById('sound')
                      audio.setAttribute("src", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                      var audio1 = document.getElementById('audio1');
                    
                      audio1.setAttribute("sound", "src: #sound");
                      audio1.components.sound.playSound();
                      var videoSphere = document.querySelector('#videoskyid');
                      if(videoSphere){
                        videoSphere.muted = true;
                      }
                   }  
                   } else {
                    var audio = document.getElementById('sound')
                    audio.setAttribute("src", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                    var audio1 = document.getElementById('audio1');
                  
                    audio1.setAttribute("sound", "src: #sound");
                    audio1.components.sound.playSound();
                    var videoSphere = document.querySelector('#videoskyid');
                    if(videoSphere){
                      videoSphere.muted = true;
                    }
                 }
                }
                      break;
                  case 'AT':
                  var textAnimation = document.getElementById('textAnimation');
                  if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio!=""){
                  var ua = navigator.userAgent.toLowerCase(); 
                  if (ua.indexOf('safari') != -1) { 
                    if (ua.indexOf('chrome') ==-1 ) {
                        var audio1 = document.getElementById('audio1');
                        var audio = document.getElementById('sound')
                      audio.setAttribute("src", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                        audio1.setAttribute('sound', 'src: #sound');
                        audio1.setAttribute('sound','volume:1;');
                        audio1.components.sound.playSound();
                        var videoSphere = document.querySelector('#videoskyid');
                        if(videoSphere){
                            videoSphere.muted = true;
                        }
                    } else {
                      var audio = document.getElementById('sound')
                      audio.setAttribute("src", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                      var audio1 = document.getElementById('audio1');
                    
                      audio1.setAttribute("sound", "src: #sound");
                      audio1.components.sound.playSound();
                      var videoSphere = document.querySelector('#videoskyid');
                      if(videoSphere){
                        videoSphere.muted = true;
                      }
                   }  
                   } else {
                    var audio = document.getElementById('sound')
                    audio.setAttribute("src", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                    var audio1 = document.getElementById('audio1');
                  
                    audio1.setAttribute("sound", "src: #sound");
                    audio1.components.sound.playSound();
                    var videoSphere = document.querySelector('#videoskyid');
                    if(videoSphere){
                      videoSphere.muted = true;
                    }
                 }
                }
                      mainInfo.setAttribute("position", pos);
                      infoBox.setAttribute("visible", "true");
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor){
                        infoBox.setAttribute("color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
                      }
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity){
                        infoBox.setAttribute('material', 'opacity', EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
                      }
                      var text = document.getElementById('text1');
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointHeader!=""){
                        text.setAttribute('text',"value", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointHeader);
                        }else{
                          text.setAttribute('text',"value","");
                        }
                        var text1 = document.getElementById('text2');
                        if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointText!=""){
                        text1.setAttribute('text',"value", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointText);
                        }else{
                          text1.setAttribute('text',"value","");
                        }
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor){
                        text1.setAttribute('text',"color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
                        text.setAttribute('text',"color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
                      }else{
                        text1.setAttribute("color","#fffff");
                        text.setAttribute("color","#fffff");
                      }
                      infoBox.setAttribute("animation__startAnimation","property: scale;from:0 0 0;to: 1 1 1; dur: 1500;enabled:true");
                      textAnimation.setAttribute("animation__startTextAnimation","property: scale;from:0 0 0;to:0.87 1 1; dur: 1500;enabled:true");
                      break;
                  case 'AI':
                    if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio!=""){
                  var ua = navigator.userAgent.toLowerCase(); 
                  if (ua.indexOf('safari') != -1) { 
                    if (ua.indexOf('chrome') ==-1 ) {
                        var audio1 = document.getElementById('audio1');
                        var audio = document.getElementById('sound')
                      audio.setAttribute("src", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                        audio1.setAttribute('sound', 'src: #sound');
                        audio1.setAttribute('sound','volume:1;');
                        audio1.components.sound.playSound();
                        var videoSphere = document.querySelector('#videoskyid');
                        if(videoSphere){
                            videoSphere.muted = true;
                        }
                    } else {
                      var audio = document.getElementById('sound')
                      audio.setAttribute("src", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                      var audio1 = document.getElementById('audio1');
                    
                      audio1.setAttribute("sound", "src: #sound");
                      audio1.components.sound.playSound();
                      var videoSphere = document.querySelector('#videoskyid');
                      if(videoSphere){
                        videoSphere.muted = true;
                      }
                   }  
                   } else {
                    var audio = document.getElementById('sound')
                    audio.setAttribute("src", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                    var audio1 = document.getElementById('audio1');
                  
                    audio1.setAttribute("sound", "src: #sound");
                    audio1.components.sound.playSound();
                    var videoSphere = document.querySelector('#videoskyid');
                    if(videoSphere){
                      videoSphere.muted = true;
                    }
                 }
                }
                      var image = document.getElementById('img1');
                      var imageFrame = document.getElementById('imageFrame');
                      image.setAttribute("src", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointImage);
                      imageFrame.setAttribute("visible", "true");
                      image.setAttribute("visible", "true");
                      mainInfo.setAttribute("position", pos);
                      imageFrame.setAttribute("animation__startAnimationImage","property:scale;from:0 0 0;to:0.2 0.2 0.1; dur: 1000;enabled:true");
                      
                      break;
                  case 'AIT':
                  var textAnimation = document.getElementById('textAnimation');
                  var imageFrame = document.getElementById('imageFrame');

                  if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio!=""){
                  var ua = navigator.userAgent.toLowerCase(); 
                  if (ua.indexOf('safari') != -1) { 
                    if (ua.indexOf('chrome') ==-1 ) {
                        var audio1 = document.getElementById('audio1');
                        var audio = document.getElementById('sound')
                      audio.setAttribute("src", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                        audio1.setAttribute('sound', 'src: #sound');
                        audio1.setAttribute('sound','volume:1;');
                        audio1.components.sound.playSound();
                        var videoSphere = document.querySelector('#videoskyid');
                        if(videoSphere){
                            videoSphere.muted = true;
                        }
                    } else {
                      var audio = document.getElementById('sound')
                      audio.setAttribute("src", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                      var audio1 = document.getElementById('audio1');
                    
                      audio1.setAttribute("sound", "src: #sound");
                      audio1.components.sound.playSound();
                      var videoSphere = document.querySelector('#videoskyid');
                      if(videoSphere){
                        videoSphere.muted = true;
                      }
                   }  
                   } else {
                    var audio = document.getElementById('sound')
                    audio.setAttribute("src", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointAudio);
                    var audio1 = document.getElementById('audio1');
                  
                    audio1.setAttribute("sound", "src: #sound");
                    audio1.components.sound.playSound();
                    var videoSphere = document.querySelector('#videoskyid');
                    if(videoSphere){
                      videoSphere.muted = true;
                    }
                 }
                }
                 
                      imageFrame.setAttribute("visible", "true");
                      var image = document.getElementById('img1');
                      
                      image.setAttribute("src", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointImage);
                      image.setAttribute("visible", "true");
                      mainInfo.setAttribute("position", pos);
                      imageFrame.setAttribute("animation__startAnimationImage","property:scale;from:0 0 0;to:0.2 0.2 0.1; dur: 1500;enabled:true");
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor){
                        infoBox.setAttribute("color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
                      }
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity){
                        infoBox.setAttribute('material', 'opacity', EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
                      }
                      var postext = EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointPosition.split(" ");
                      infoBox.setAttribute("visible", "true");
                      var text = document.getElementById('text1');
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointHeader!=""){
                        text.setAttribute('text',"value", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointHeader);
                        }else{
                          text.setAttribute('text',"value","");
                        }
                        var text1 = document.getElementById('text2');
                        if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointText!=""){
                        text1.setAttribute('text',"value", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointText);
                        }else{
                          text1.setAttribute('text',"value","");
                        }
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor){
                        text1.setAttribute('text',"color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
                        text.setAttribute('text',"color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
                        }else{
                          text1.setAttribute("color","#fffff");
                          text.setAttribute("color","#fffff");
                        }
                      infoBox.setAttribute("animation__startAnimation","property: scale;from:0 0 0;to: 1 1 1; dur: 1500;enabled:true");
                      textAnimation.setAttribute("animation__startTextAnimation","property: scale;from:0 0 0;to:0.87 1 1; dur: 1500;enabled:true");
                      break;
                  case 'T':
                        var textAnimation = document.getElementById('textAnimation');
                        if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor){
                          infoBox.setAttribute("color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
                        }
                        if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity){
                          infoBox.setAttribute('material', 'opacity', EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
                        }
                      mainInfo.setAttribute("position", pos);
                      var text = document.getElementById('text1');
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointHeader!=""){
                        text.setAttribute('text',"value", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointHeader);
                        }else{
                          text.setAttribute('text',"value","");
                        }
                        var text1 = document.getElementById('text2');
                        if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointText!=""){
                        text1.setAttribute('text',"value", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointText);
                        }else{
                          text1.setAttribute('text',"value","");
                        }
                    if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor){
                        text1.setAttribute('text',"color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
                        text.setAttribute('text',"color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
                      }else{
                        text1.setAttribute("color","#fffff");
                        text.setAttribute("color","#fffff");
                      }
                      infoBox.setAttribute("visible", "true");
                      infoBox.setAttribute("animation__startAnimation","property: scale;from:0 0 0;to: 1 1 1; dur: 1500;enabled:true");
                      textAnimation.setAttribute("animation__startTextAnimation","property: scale;from:0 0 0;to:0.87 1 1; dur: 1500;enabled:true");
                      break;
                  case 'IT':
                      var textAnimation = document.getElementById('textAnimation'); 
                      var imageFrame = document.getElementById('imageFrame');
                      var image = document.getElementById('img1');
                      image.setAttribute("src", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointImage);
                      imageFrame.setAttribute("visible", "true");
                      image.setAttribute("visible", "true");
                      mainInfo.setAttribute("position", pos);
                      imageFrame.setAttribute("animation__startAnimationImage","property:scale;from:0 0 0;to:0.2 0.2 0.1; dur: 1500;enabled:true");
                      var postext = EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointPosition.split(" ");
                      var text = document.getElementById('text1');
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointHeader!=""){
                        text.setAttribute('text',"value", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointHeader);
                        }else{
                          text.setAttribute('text',"value","");
                        }
                        var text1 = document.getElementById('text2');
                        if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointText!=""){
                        text1.setAttribute('text',"value", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointText);
                        }else{
                          text1.setAttribute('text',"value","");
                        }
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor){
                        text1.setAttribute('text',"color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
                        text.setAttribute('text',"color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointColor);
                      }else{
                        text1.setAttribute("color","#fffff");
                        text.setAttribute("color","#fffff");
                      }
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor){
                        infoBox.setAttribute("color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
                      }
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity){
                        infoBox.setAttribute('material', 'opacity', EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
                      }
                      infoBox.setAttribute("visible", "true");
                      infoBox.setAttribute("animation__startAnimation","property: scale;from:0 0 0;to: 1 1 1; dur: 1500;enabled:true");
                     textAnimation.setAttribute("animation__startTextAnimation","property: scale;from:0 0 0;to:0.87 1 1; dur: 1500;enabled:true");
                      break;
                  case 'I':
                      var image = document.getElementById('img1');
                      var imageFrame = document.getElementById('imageFrame');
                      image.setAttribute("src", EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointImage);
                      imageFrame.setAttribute("visible", "true");
                      image.setAttribute("visible", "true");
                      mainInfo.setAttribute("position", pos);
                      imageFrame.setAttribute("animation__startAnimationImage","property:scale;from:0 0 0;to:0.2 0.2 0.1; dur: 1500;enabled:true");
                      break;
              }

              clicked = true;
       } });
          //            onmouseleave
          this.el.addEventListener('mouseleave', () => {
            //var cur = document.querySelector('#cursor');
            //cur.emit("startAnimantion");
            if(experienceStarted && clicked){
         

              var background = document.getElementById(this.el.id);
              background.setAttribute("animation__imgPlaneendAnimation","property: scale;to: 1 1 1; dur: 1500;enabled:true");
              var mediatype = this.data.split(" ");
              if (EverestData.actionPoints[mediatype[1] - 1].actionPointVisibility == "Visible while gaze over object" ) {
                  var plane = document.getElementById(mediatype[1]);
                  plane.setAttribute("visible", "false");  
              }
			  
			        for (i=1;i<=EverestData.actionPoints.length;i++){
                var backgroundData = document.getElementById(i+'background'); 
                 backgroundData.setAttribute("animation__imgPlaneendAnimation","property: scale;to: 1 1 1; dur: 1500;enabled:true");        
                 backgroundData.setAttribute('scale','1 1 1');
              }
              var mediatype = this.data.split(" ");
              switch (mediatype[0]) {
                  case 'V':  
                  var videoframe = document.getElementById('videoframe');
                      var video = document.getElementById('vid');
                      video.pause();
                      videoframe.setAttribute("animation__endAnimationVideo","property: scale;from:0.2 0.2 0.1;to:0 0 0; dur: 1500;enabled:true");
                      setTimeout(function() {
                        videoframe.removeAttribute("animation__startAnimationVideo");
                        videoframe.removeAttribute("animation__endAnimationVideo");
                    }, 1500);
                     
                      break;

                  case 'VT':
                  var textAnimation = document.getElementById('textAnimation');
                      var videoframe = document.getElementById('videoframe');
                      var sphere = document.getElementById('video1');
                      var video = document.getElementById('vid');
                      video.pause();
                      videoframe.setAttribute("animation__endAnimationVideo","property: scale;from:0.2 0.2 0.1;to:0 0 0; dur: 1500;enabled:true");
                      
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor){
                        infoBox.setAttribute("color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
                      }
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity){
                        infoBox.setAttribute('material', 'opacity', EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
                      }
                      
                      infoBox.setAttribute("animation__endAnimation","property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true");
                      textAnimation.setAttribute("animation__endTextAnimation","property:scale;from:0.87 1 1;to:0 0 0; dur: 1500;enabled:true");
                      
                      setTimeout(function() {
                          infoBox.setAttribute("visible", "false");
                          videoframe.removeAttribute("animation__startAnimationVideo");
                          videoframe.removeAttribute("animation__endAnimationVideo");
                          textAnimation.removeAttribute('animation__endTextAnimation');  
                          infoBox.removeAttribute('animation__endAnimation');
                          textAnimation.removeAttribute('animation__startTextAnimation');  
                          infoBox.removeAttribute('animation__startAnimation');
                      }, 1500);
                      break;
                  case 'A':
                      var audio = document.getElementById('audio1');
                      if(nosafari)
                        audio.setAttribute('sound','volume:0;');
                      else
                        audio.components.sound.stopSound();
                      audio1.setAttribute("sound","");
                      
                      break;
                  case 'AT':
                  var textAnimation = document.getElementById('textAnimation');
                      var audio = document.getElementById('audio1');
                      if(nosafari)
                        audio.setAttribute('sound','volume:0;');
                      else
                      audio.components.sound.stopSound();
                      
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor){
                        infoBox.setAttribute("color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
                      }
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity){
                        infoBox.setAttribute('material', 'opacity', EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
                      }
                      
                      infoBox.setAttribute("animation__endAnimation","property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true");
                      
                      textAnimation.setAttribute("animation__endTextAnimation","property:scale;from:0.87 1 1;to:0 0 0; dur: 1500;enabled:true");
                      setTimeout(function() {
                        infoBox.setAttribute("visible", "false");
                        textAnimation.removeAttribute('animation__endTextAnimation');  
                        infoBox.removeAttribute('animation__endAnimation');
                        textAnimation.removeAttribute('animation__startTextAnimation');  
                        infoBox.removeAttribute('animation__startAnimation');
                      }, 1500);
                      break;
                  case 'AI':
                      var audio = document.getElementById('audio1');
                      if(nosafari)
                        audio.setAttribute('sound','volume:0;');
                      else
                      audio.components.sound.stopSound();
                      
                      var image = document.getElementById('img1');
                      var imageFrame = document.getElementById('imageFrame');
                      
                      imageFrame.setAttribute("animation__endAnimationImage","property:scale;from:0.2 0.2 0.1;to:0 0 0; dur: 1000;enabled:true");
                      setTimeout(function() {
                        image.setAttribute("src", "assets/images/loading.png");
                        imageFrame.setAttribute("visible", "false");
                        imageFrame.removeAttribute('animation__endAnimationImage');  imageFrame.removeAttribute('animation__startAnimationImage');
                      }, 1000);
                      break;
                  case 'AIT':
                    var textAnimation = document.getElementById('textAnimation');
                    var imageFrame = document.getElementById('imageFrame');
                    var audio = document.getElementById('audio1');
                    if (nosafari)
                      audio.setAttribute('sound', 'volume:0;');
                    else
                      audio.components.sound.stopSound();
                    var image = document.getElementById('img1');
                    imageFrame.setAttribute("animation__endAnimationImage","property:scale;from:0.2 0.2 0.1;to:0 0 0; dur: 1500;enabled:true");
                   

                    if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor){
                      infoBox.setAttribute("color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
                    }
                    if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity){
                      infoBox.setAttribute('material', 'opacity', EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
                    }
                     
                    textAnimation.setAttribute("animation__endTextAnimation","property:scale;from:0.87 1 1;to:0 0 0; dur: 1500;enabled:true");
                    
                    infoBox.setAttribute("animation__endAnimation","property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true");
                   
                    setTimeout(function () {
                      imageFrame.setAttribute("visible", "false");
                      infoBox.setAttribute("visible", "false");
                      textAnimation.removeAttribute('animation__endTextAnimation');  
                      infoBox.removeAttribute('animation__endAnimation');
                      textAnimation.removeAttribute('animation__startTextAnimation');  
                      infoBox.removeAttribute('animation__startAnimation');
                      image.setAttribute("src", "assets/images/loading.png");
                      image.removeAttribute("animation__endAnimationImage");
                      imageFrame.removeAttribute("animation__endAnimationImage");
                      imageFrame.removeAttribute("animation__startAnimationImage");
                    }, 1500);

                      break;
                  case 'T':
                  var textAnimation = document.getElementById('textAnimation');
                      
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor){
                        infoBox.setAttribute("color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
                      }
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity){
                        infoBox.setAttribute('material', 'opacity', EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
                      }
                      
                      infoBox.setAttribute("animation__endAnimation","property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true");
                      
                      textAnimation.setAttribute("animation__endTextAnimation","property:scale;from:0.87 1 1;to:0 0 0; dur: 1500;enabled:true");
                      setTimeout(function() {
                          infoBox.setAttribute("visible", "false");
                          textAnimation.removeAttribute('animation__endTextAnimation');  
                          infoBox.removeAttribute('animation__endAnimation');
                          textAnimation.removeAttribute('animation__startTextAnimation');  
                          infoBox.removeAttribute('animation__startAnimation');
                      }, 1500);
                      break;
                  case 'IT':
                  var textAnimation = document.getElementById('textAnimation');
                      var image = document.getElementById('img1');
                      var imageFrame = document.getElementById('imageFrame');
                      
                      imageFrame.setAttribute("animation__endAnimationImage","property:scale;from:0.2 0.2 0.1;to:0 0 0; dur: 1500;enabled:true");
                      
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor){
                        infoBox.setAttribute("color",EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgColor);
                      }
                      if(EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity){
                        infoBox.setAttribute('material', 'opacity', EverestData.actionPoints[parseInt(mediatype[1]) - 1].actionPointBgOpacity)
                      }
                      
                      infoBox.setAttribute("animation__endAnimation","property:scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true");
                      
                      textAnimation.setAttribute("animation__endTextAnimation","property:scale;from:0.87 1 1;to:0 0 0; dur: 1500;enabled:true");
                      setTimeout(function() {
                        image.setAttribute("src", "assets/images/loading.png");
                        infoBox.setAttribute("visible", "false");
                        
                          imageFrame.removeAttribute("animation__startAnimationImage");
                          imageFrame.removeAttribute("animation__endAnimationImage");
                          imageFrame.setAttribute("visible", "false");
                          textAnimation.removeAttribute('animation__endTextAnimation');  
                          infoBox.removeAttribute('animation__endAnimation');
                          textAnimation.removeAttribute('animation__startTextAnimation');  
                          infoBox.removeAttribute('animation__startAnimation');
                      }, 1500);
                      break;
                  case 'I':
                      var image = document.getElementById('img1');
                      var imageFrame = document.getElementById('imageFrame');
                      imageFrame.setAttribute("animation__endAnimationImage","property:scale;from:0.2 0.2 0.1;to:0 0 0; dur: 1000;enabled:true");
                      setTimeout(function() {
                        image.setAttribute("src", "assets/images/loading.png");
                          imageFrame.setAttribute("visible", "false");
                          image.setAttribute("visible", "false");
                          imageFrame.removeAttribute('animation__endAnimationImage');  imageFrame.removeAttribute('animation__startAnimationImage');
                      }, 1000);
                      break;
              }
              var videoSphere = document.querySelector('#videoskyid');
                        if(videoSphere){
                            videoSphere.muted = false;
                        }
                        for (i = 1; i <= EverestData.actionPoints.length; i++) {

                            var showTeleport = document.getElementById( i);
                       
                          showTeleport.setAttribute("animation__aEndAnimation","property: opacity;from:0;to: 0.9; dur: 1300;enabled:true");
                          }

                          clicked = false;
       }
       else{
        var mediatype = this.data.split(" ");
        if (EverestData.actionPoints[mediatype[1] - 1].actionPointVisibility == "Visible while gaze over object" ) {
            var plane = document.getElementById(mediatype[1]);
            plane.setAttribute("visible", "false");
        }
       }
     });
      }
  });

  function newPos(x, y, z){
    var r = Math.pow(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2), 0.5);
    var phy =Math.acos(z/r);
    var thita = Math.asin(y/(r*Math.sin(phy)));
    if((x < 0 && z < 0) || (x < 0 && z > 0)){
        phy = -phy ;//+ (Math.PI);
        thita= -thita;
    }
    r = 20;
    var newx = r*Math.sin(phy)*Math.cos(thita);
    var newy = r*Math.sin(phy)*Math.sin(thita);
    var newz = r*Math.cos(phy);
    return newx +' '+ newy +' '+ newz;
}
function toDegrees (angle) {
  return angle * (180 / Math.PI);
}
function toRadians (angle) {
  return angle * (Math.PI / 180);
}

