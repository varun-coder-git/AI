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
 var customObj;
 var isMobile=false;
 var experienceStarted = false;
 var callToTacking = new TrackingData();
 var focusTime = 0,
   screenActiveTime = 0,
   videoStreamTime = 0;
 var framename = "";
 var action = "";
 var ExperienceName = "";
 var startTracking = false;
 var applyAnimation = true;
 var xapiEnable = false;
 var framecount = 0;
 var screenshotVar, source, videoElement, frameImg1El, frameImg2El, frameImg3El, frameImg4El, header1, header2, header3, header4, header5, subheader1, subheader2, subheader3, subheader4, subheader5, playvideo;
 var flag = 0;
 var frameId = 0;
 var cur;

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

 
 function hexToRgb(hex, opacity) {

   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
   return result ? {
     r: parseInt(result[1], 16),
     g: parseInt(result[2], 16),
     b: parseInt(result[3], 16),
     alpha: opacity
   } : null;
 }

 function loadExperience(experienceToCustomize, ExperienceName) {
   customObj = experienceToCustomize;
   //if json includes splashbgcolor and opacity
   if (customObj.splashBackgroundColor && customObj.Opacity) {
     var rgbformat = hexToRgb(customObj.splashBackgroundColor, customObj.Opacity);
     document.getElementById('innerInfo').style.backgroundColor = "rgba(" + rgbformat.r + "," + rgbformat.g + "," + rgbformat.b + "," + rgbformat.alpha + ")";
   }
   //if json includes splashheadercolor
   if (customObj.splashHeaderColor) {
     document.getElementById('titleText').style.color = customObj.splashHeaderColor;
   }
   document.getElementById('titleText').innerHTML = ExperienceName;
  //  document.getElementById('instruction').innerHTML = customObj.splash_instruction;
  if (isMobile && customObj.splash_android_instruction!=undefined) {
		document.getElementById('instruction').innerHTML = customObj.splash_android_instruction;
	  } else {
		document.getElementById('instruction').innerHTML = customObj.splash_instruction;
   }
   document.getElementById('titleDescription').innerHTML = customObj.launch_text;
   document.getElementById('splashLogo').src = customObj.splash_image;
   loggedin = true;

   if (window.matchMedia("(orientation: portrait)").matches) {
     if (customObj["entry_view"]) {
       var entryView_y = customObj["entry_view"].split(" ")[1];
       $("#CamEntity").attr("rotation", "0 " + (parseInt(entryView_y) - 270) + " 0");
     } else {
       $("#CamEntity").attr("rotation", "0 0 0");
     }
   }

   if (window.matchMedia("(orientation: landscape)").matches) {
     if (customObj["entry_view"]) {
       var entryView_y = customObj["entry_view"].split(" ")[1];
       $("#CamEntity").attr("rotation", "0 " + (parseInt(entryView_y) - 90) + " 0");
     }
   }
   setTheater();
 }

 $(document).ready(() => {
  var userAgent = navigator.userAgent;
  // Json binding and splash screen
  if (userAgent.includes("Mobile") || userAgent.includes("Android") || userAgent.includes("iPhone")) {
    isMobile=true;
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
 
   var startExperienteBtn = document.getElementById('start_experience');
   cam = document.getElementById("cameraId");
   startExperienteBtn.onclick = function () {
     cam.setAttribute("animation", "enabled:false");
     cam.setAttribute("animation__one", "enabled:true");
     ascene.style.zIndex = 'auto';
     document.getElementById('container').style.display = "none";
     document.getElementById('loaderq').style.display = "none";
     experienceStarted = true;
    //  countdown();

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
   };

 });


 function setTheater() {
   // Set background , frame images,video,header,subheader
   var setLogo = document.getElementById('logo');
   setLogo.setAttribute('material', "src:" + customObj.Settings[0].logo);
   var cuberoom = document.querySelector('#cuberoom');
   cuberoom.setAttribute('material', 'src:' + customObj.Settings[0].decor);
   cuberoom.setAttribute('crossorigin', "anonymous");
   var background_theme = document.getElementById('southLogo');
   background_theme.setAttribute('src', customObj.branding_south_wall.Logo);
   background_theme.setAttribute('crossorigin', "anonymous");
   var south_image2 = document.getElementById('south_image2');
   south_image2.setAttribute('material', "src:" + customObj.branding_south_wall.image2);
   south_image2.setAttribute('crossorigin', "anonymous");
   var background_theme = document.getElementById('eastLogo');
   background_theme.setAttribute('material', "opacity:1;src:" + customObj.branding_east_wall.Logo);
   background_theme.setAttribute('crossorigin', "anonymous");
   var background_theme = document.getElementById('westLogo');
   background_theme.setAttribute('material', "opacity:1;src:" + customObj.branding_west_wall.Logo);
   background_theme.setAttribute('crossorigin', "anonymous");

   customSplashScreenEl = document.getElementById('screenshot1');
   frameImg1El = document.getElementById('frame1');
   frameImg2El = document.getElementById('frame2');
   frameImg3El = document.getElementById('frame3');
   frameImg4El = document.getElementById('frame4');
   header1 = document.getElementById('header1');
   header2 = document.getElementById('header2');
   header3 = document.getElementById('header3');
   header4 = document.getElementById('header4');
   header5 = document.getElementById('header5');
   subheader1 = document.getElementById('subheader1');
   var textPanel = document.getElementById('text-panel');
   header1.setAttribute('scale','0 0 0');
   subheader1.setAttribute('scale','0 0 0');

   playvideo = document.getElementById('playbutton');

   customSplashScreenEl.setAttribute('material', 'src:' + customObj.DefaultFramePicture + ';side:double', );
   frameImg1El.setAttribute('material', 'src:' + customObj.Frame.frameImageSrc1 + ';side:double', );
   frameImg2El.setAttribute('material', 'src:' + customObj.Frame.frameImageSrc2 + ';side:double');
   frameImg3El.setAttribute('material', 'src:' + customObj.Frame.frameImageSrc3 + ';side:double');
   frameImg4El.setAttribute('material', 'src:' + customObj.Frame.frameImageSrc4 + ';side:double');
   header2.setAttribute('text', 'anchor:center;width:1.5;font:/act/v0.1/verbose/fonts/anton/Anton-Regular.json;shader:msdf;tabSize:1;height:5;color:#fff;wrapCount:16;whiteSpace:pre;lineHeight:60;baseline:top;color:' + customObj.Frame.frameHeader1Color);
   header2.setAttribute('text','value', customObj.Frame.frameHeader1);
   header3.setAttribute('text', 'anchor:center;width:1.5;font:/act/v0.1/verbose/fonts/anton/Anton-Regular.json;shader:msdf;tabSize:1;height:5;color:#fff;wrapCount:16;whiteSpace:pre;lineHeight:60;baseline:top;color:' + customObj.Frame.frameHeader2Color);
   header3.setAttribute('text','value', customObj.Frame.frameHeader2);
   header4.setAttribute('text', 'anchor:center;width:1.5;font:/act/v0.1/verbose/fonts/anton/Anton-Regular.json;shader:msdf;tabSize:1;height:5;color:#fff;wrapCount:16;whiteSpace:pre;lineHeight:60;baseline:top;color:' + customObj.Frame.frameHeader3Color);
   header4.setAttribute('text','value', customObj.Frame.frameHeader3);
   header5.setAttribute('text', 'anchor:center;width:1.5;font:/act/v0.1/verbose/fonts/anton/Anton-Regular.json;shader:msdf;tabSize:1;height:5;color:#fff;wrapCount:16;whiteSpace:pre;lineHeight:60;baseline:top;color:' + customObj.Frame.frameHeader4Color);
   header5.setAttribute('text','value', customObj.Frame.frameHeader4);

 };

 function mainVideo(source) {
   if (source != "") {
     var textPanel = document.getElementById('text-panel');
     var frameclick1 = document.querySelector('#clickFrame-1');
     var frameclick2 = document.querySelector('#clickFrame-2');
     var frameclick3 = document.querySelector('#clickFrame-3');
     var frameclick4 = document.querySelector('#clickFrame-4');
     var videoEl = document.querySelector('#customVideo');
     var back = document.getElementById('back');
     screenshotVar = document.getElementById('screenshot1');
     screenshotVar.setAttribute('position', '8.335 200 2.165');
     frameImg1El.setAttribute('position', '8.335 200 2.165');
     frameImg2El.setAttribute('position', '8.335 200 2.165');
     frameImg3El.setAttribute('position', '8.335 200 2.165');
     frameImg4El.setAttribute('position', '8.335 200 2.165');
     playvideo.setAttribute('position', '8.335 200 2.165');
     back.setAttribute('position', "6.442 4.275320840016663 -4.636544072062353");
     videoEl.setAttribute('position', '6.45 1.7398490703680225 0.019');
     frameclick1.setAttribute('position', '200 200 200');
     frameclick2.setAttribute('position', '200 200 200');
     frameclick3.setAttribute('position', '200 200 200');
     frameclick4.setAttribute('position', '200 200 200');
     textPanel.setAttribute('position', '200 200 200');
     var vid = document.querySelector('#vid');
     vid.setAttribute('src', source);
     if (customObj.Settings[0].loop == "Indefinite") {
       vid.setAttribute('loop','true');
     } else {
       //vid.setAttribute('loop', 'false');
       $('#customVideo').removeAttr('loop');
     }

   } else {
     var nomedia = document.querySelector('#nomedia');
     var nomediatext = document.querySelector('#nomediatext');
     nomedia.setAttribute('position', '6.45 1.7398490703680225 0.019');
     nomediatext.setAttribute('position', '6.426234755410172 1.8014299203025563 0.6259531108536633');
     nomedia.play();
     var textPanel = document.getElementById('text-panel');
     var frameclick1 = document.querySelector('#clickFrame-1');
     var frameclick2 = document.querySelector('#clickFrame-2');
     var frameclick3 = document.querySelector('#clickFrame-3');
     var frameclick4 = document.querySelector('#clickFrame-4');
     var videoEl = document.querySelector('#customVideo');
     var back = document.getElementById('back');
     screenshotVar = document.getElementById('screenshot1');
     screenshotVar.setAttribute('position', '8.335 200 2.165');
     frameImg1El.setAttribute('position', '8.335 200 2.165');
     frameImg2El.setAttribute('position', '8.335 200 2.165');
     frameImg3El.setAttribute('position', '8.335 200 2.165');
     frameImg4El.setAttribute('position', '8.335 200 2.165');
     playvideo.setAttribute('position', '8.335 200 2.165');
     back.setAttribute('position', "6.442 4.275320840016663 -4.636544072062353");
     videoEl.setAttribute('position', '6.45 1.7398490703680225 0.019');
     frameclick1.setAttribute('position', '200 200 200');
     frameclick2.setAttribute('position', '200 200 200');
     frameclick3.setAttribute('position', '200 200 200');
     frameclick4.setAttribute('position', '200 200 200');
     textPanel.setAttribute('position', '200 200 200');
   }
 }

 AFRAME.registerComponent('playvideo', {
   schema: {
     default: ''
   },
   init() {
     this.el.addEventListener('click', () => {
       if (experienceStarted == true) {

         var frame = "frame" + (this.el.id.split("-")[1]);
         var frameclick1 = document.querySelector('#clickFrame-1');
         var frameclick2 = document.querySelector('#clickFrame-2');
         var frameclick3 = document.querySelector('#clickFrame-3');
         var frameclick4 = document.querySelector('#clickFrame-4');
         var frame = "frame" + (this.el.id.split("-")[1]);
         if (frame == 'frame1' || frame == 'frame2' || frame == 'frame3' || frame == 'frame4') {
           playvideo = document.getElementById('playbutton');
           playvideo.setAttribute('position', '6.442 0.856 -3.249');
         }
         if (frame == 'frame1') {
          //   First Frame
          var frame1 = document.querySelector('#frame1');
          frame1.setAttribute("animation__imageEnd1", "property: scale;from:1.9 0.85 1;to: 1.67 0.79 1; dur: 500;enabled:true;");
          frame1.setAttribute("animation__imageEnd11", "property: position;from:6.392449557118177 -0.411 -3.674;to:6.450649384492285 -0.446 -3.84;dur: 500;enabled:true;");

          setTimeout(function () {
            frame1.removeAttribute("animation__imageEnd1");
            frame1.removeAttribute("animation__imageEnd11");
          }, 500);

          frameId = 1;
          customSplashScreenEl.setAttribute('src', customObj.Frame.frameImageSrc1);
         
          subheader1.setAttribute('text','value', customObj.Frame.frameSubHeader1);
          header1.setAttribute('text', 'font:assets/fonts/anton/Anton-Regular.json;anchor:center;width:220;tabSize:1;height:5;color:' + customObj.Frame.frameHeader1Color + ';wrapCount:20;whiteSpace:pre;lineHeight:60;shader:msdf;baseline:top');
          subheader1.setAttribute('text', 'anchor:center;width:9.879999999999999;color:#fff; shader:msdf;baseline:top;wrapCount:50;lineHeight:50;color:' + customObj.Frame.frameSubHeader1Color);
         
          if(customObj.Frame.frameHeader1!=null){
            header1.setAttribute('scale','1 1 1');
            header1.setAttribute('text','value', customObj.Frame.frameHeader1);
          }else{
            header1.setAttribute('scale','0 0 0');
          }
          if(customObj.Frame.frameSubHeader1!=null){
            subheader1.setAttribute('scale','1 1 1');
            subheader1.setAttribute('text','value', customObj.Frame.frameSubHeader1);
          }else{
            subheader1.setAttribute('scale','0 0 0');
          }
        } else if (frame == 'frame2') {
          //   Secound Frame
          var frame1 = document.querySelector('#frame2');

          frame1.setAttribute("animation__imageEnd2", "property: scale;from:1.9 0.85 1;to: 1.67 0.79 1; dur: 500;enabled:true;");
          frame1.setAttribute("animation__imageEnd22", "property: position;from:6.380999999999999 -0.409 -1.2349999999999999;to:6.451 -0.44647484258134396 -1.2651183491856703;dur: 500;enabled:true");

          setTimeout(function () {
            frame1.removeAttribute("animation__imageEnd2");
            frame1.removeAttribute("animation__imageEnd22");
          }, 500);

          frameId = 2;
          customSplashScreenEl.setAttribute('src', customObj.Frame.frameImageSrc2);
          header1.setAttribute('text','value', customObj.Frame.frameHeader2);
          subheader1.setAttribute('text','value', customObj.Frame.frameSubHeader2);
          header1.setAttribute('text', 'font:assets/fonts/anton/Anton-Regular.json;anchor:center;width:220;tabSize:1;height:5;color:' + customObj.Frame.frameHeader2Color + ';wrapCount:20;whiteSpace:pre;lineHeight:60;shader:msdf;baseline:top');
          subheader1.setAttribute('text', 'anchor:center;width:9.879999999999999;color:#fff; shader:msdf;baseline:top;wrapCount:50;lineHeight:50;color:' + customObj.Frame.frameSubHeader2Color);
          if(customObj.Frame.frameHeader2!=null){
            header1.setAttribute('scale','1 1 1');
            header1.setAttribute('text','value', customObj.Frame.frameHeader2);
          }else{
            header1.setAttribute('scale','0 0 0');
          }
          if(customObj.Frame.frameSubHeader2!=null){
            subheader1.setAttribute('scale','1 1 1');
            subheader1.setAttribute('text','value', customObj.Frame.frameSubHeader2);
          }else{
            subheader1.setAttribute('scale','0 0 0');
          }

        } else if (frame == 'frame3') {
          // Third Frame
          var frame1 = document.querySelector('#frame3');

          frame1.setAttribute("animation__imageEnd3", "property: scale;from:1.9 0.85 1;to: 1.67 0.79 1; dur: 500;enabled:true;");
          frame1.setAttribute("animation__imageEnd33", "property: position;from:6.243558628373066 -0.40789136641534474 1.3980750108506124;to:6.451 -0.44647484258134396 1.301823465933687;enabled:true;dur:500");

          setTimeout(function () {
            frame1.removeAttribute("animation__imageEnd3");
            frame1.removeAttribute("animation__imageEnd33");
          }, 500);

          frameId = 3;
          customSplashScreenEl.setAttribute('src', customObj.Frame.frameImageSrc3);
          header1.setAttribute('text','value', customObj.Frame.frameHeader3);
          subheader1.setAttribute('text','value', customObj.Frame.frameSubHeader3);
          header1.setAttribute('text', 'font:assets/fonts/anton/Anton-Regular.json;anchor:center;width:220;tabSize:1;height:5;color:' + customObj.Frame.frameHeader3Color + ';wrapCount:20;whiteSpace:pre;lineHeight:60;shader:msdf;baseline:top');
          subheader1.setAttribute('text', 'anchor:center;width:9.879999999999999;color:#fff; shader:msdf;baseline:top;wrapCount:50;lineHeight:50;color:' + customObj.Frame.frameSubHeader3Color);
          if(customObj.Frame.frameHeader3!=null){
            header1.setAttribute('scale','1 1 1');
            header1.setAttribute('text','value', customObj.Frame.frameHeader3);
          }else{
            header1.setAttribute('scale','0 0 0');
          }
          if(customObj.Frame.frameSubHeader3!=null){
            subheader1.setAttribute('scale','1 1 1');
            subheader1.setAttribute('text','value', customObj.Frame.frameSubHeader3);
          }else{
            subheader1.setAttribute('scale','0 0 0');
          }

        } else if (frame == 'frame4') {
          //   Fourth Frame
          var frame1 = document.querySelector('#frame4');
          frame1.setAttribute("animation__imageEnd4", "property: scale;from:1.9 0.85 1;to: 1.67 0.79 1; dur: 500;enabled:true;");
          frame1.setAttribute("animation__imageEnd44", "property: position;from:6.220999999999999 -0.35572922937128143 3.640451453666469;to:6.451 -0.446 3.869020815444363;enabled:true;dur:500");

          setTimeout(function () {
            frame1.removeAttribute("animation__imageEnd4");
            frame1.removeAttribute("animation__imageEnd44");
          }, 500);

          frameId = 4;
          customSplashScreenEl.setAttribute('src', customObj.Frame.frameImageSrc4);
          
          header1.setAttribute('text','value', customObj.Frame.frameHeader4);
          subheader1.setAttribute('text','value', customObj.Frame.frameSubHeader4);
          header1.setAttribute('text', 'font:assets/fonts/anton/Anton-Regular.json;anchor:center;width:220;tabSize:1;height:5;color:' + customObj.Frame.frameHeader4Color + ';wrapCount:20;whiteSpace:pre;lineHeight:60;shader:msdf;baseline:top');
          subheader1.setAttribute('text', 'anchor:center;width:9.879999999999999;color:#fff; shader:msdf;baseline:top;wrapCount:50;lineHeight:50;color:' + customObj.Frame.frameSubHeader4Color);
          if(customObj.Frame.frameHeader4!=null){
            header1.setAttribute('scale','1 1 1');
            header1.setAttribute('text','value', customObj.Frame.frameHeader4);
          }else{
            header1.setAttribute('scale','0 0 0');
          }
          if(customObj.Frame.frameSubHeader4!=null){
            subheader1.setAttribute('scale','1 1 1');
            subheader1.setAttribute('text','value', customObj.Frame.frameSubHeader4);
          }else{
            subheader1.setAttribute('scale','0 0 0');
          }

        } else if (this.el.id == 'playbutton') {
          var frameclick1 = document.querySelector('#clickFrame-1');
          var frameclick2 = document.querySelector('#clickFrame-2');
          var frameclick3 = document.querySelector('#clickFrame-3');
          var frameclick4 = document.querySelector('#clickFrame-4');
          frameclick1.setAttribute('position', '200 200 200');
          frameclick2.setAttribute('position', '200 200 200');
          frameclick3.setAttribute('position', '200 200 200');
          frameclick4.setAttribute('position', '200 200 200');
           applyAnimation = false;
           //   Play button hit
           var vid = document.querySelector('#vid');

           setTimeout(function () {
             if (frameId == 1) {
               framecount = 1;
               videoStreamTime = 0;
               if (startTracking) {
                 params.Verb = "Viewed";
                 params.Object = customObj.Frame.frameHeader1;
                 params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
                 callToTacking.callToApi(params);
               }
               if (xapiEnable) {
                 sendToXapi("Viewed", "viewed", params.Object, params.Object.replace(/\s/g, ''));
               }
               mainVideo(customObj.Frame.frameVideoSrc1);
               vid.setAttribute('src', customObj.Frame.frameVideoSrc1);
             } else if (frameId == 2) {
               framecount = 2;
               videoStreamTime = 0;
               if (startTracking) {
                 params.Verb = "Viewed";
                 params.Object = customObj.Frame.frameHeader1;
                 params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
                 callToTacking.callToApi(params);
               }
               if (xapiEnable) {
                 sendToXapi("Viewed", "viewed", params.Object, params.Object.replace(/\s/g, ''));
               }
               mainVideo(customObj.Frame.frameVideoSrc2);
               vid.setAttribute('src', customObj.Frame.frameVideoSrc2);
             } else if (frameId == 3) {
               framecount = 3;
               videoStreamTime = 0;
               if (startTracking) {
                 params.Verb = "Viewed";
                 params.Object = customObj.Frame.frameHeader1;
                 params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
                 callToTacking.callToApi(params);
               }
               if (xapiEnable) {
                 sendToXapi("Viewed", "viewed", params.Object, params.Object.replace(/\s/g, ''));
               }
               mainVideo(customObj.Frame.frameVideoSrc3);
               vid.setAttribute('src', customObj.Frame.frameVideoSrc3);
             } else if (frameId == 4) {
               framecount = 4;
               videoStreamTime = 0;
               if (startTracking) {
                 params.Verb = "Viewed";
                 params.Object = customObj.Frame.frameHeader1;
                 params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
                 callToTacking.callToApi(params);
               }
               if (xapiEnable) {
                 sendToXapi("Viewed", "viewed", params.Object, params.Object.replace(/\s/g, ''));
               }
               mainVideo(customObj.Frame.frameVideoSrc4);
               vid.setAttribute('src', customObj.Frame.frameVideoSrc4);
             }
             vid.load();
             vid.play();
           }, 500);

         } else if (this.el.id == 'back') {
           applyAnimation = true;
           var textPanel = document.getElementById('text-panel');
           var vid = document.querySelector('#vid');
           vid.setAttribute('src', '');
           // Back button click     
           var frame = "frame" + (this.el.id.split("-")[1]);
          
           var frame1 = document.querySelector('#frame1');
           frame1.setAttribute("animation__imageEnd1", "property: scale;from:1.9 0.85 1;to: 1.67 0.79 1; dur: 500;enabled:true;");
           frame1.setAttribute("animation__imageEnd11", "property: position;from:6.392449557118177 -0.411 -3.674;to:6.450649384492285 -0.446 -3.84;enabled:true;dur:500");
 
           setTimeout(function () {
             frame1.removeAttribute("animation__imageEnd1");
             frame1.removeAttribute("animation__imageEnd11");
           }, 500);
 
           var frame2 = document.querySelector('#frame2');
           frame2.setAttribute("animation__imageEnd2", "property: scale;from:1.9 0.85 1;to: 1.67 0.79 1; dur: 500;enabled:true;");
           frame2.setAttribute("animation__imageEnd22", "property: position;from:6.380999999999999 -0.409 -1.2349999999999999;to:6.451 -0.44647484258134396 -1.2651183491856703;enabled:true;dur:500");
 
           setTimeout(function () {
             frame2.removeAttribute("animation__imageEnd2");
             frame2.removeAttribute("animation__imageEnd22");
           }, 500);
 
           var frame3 = document.querySelector('#frame3');
           frame3.setAttribute("animation__imageEnd3", "property: scale;from:1.9 0.85 1;to: 1.67 0.79 1; dur: 500;enabled:true;");
           frame3.setAttribute("animation__imageEnd33", "property: position;from:6.243558628373066 -0.40789136641534474 1.3980750108506124;to:6.451 -0.44647484258134396 1.301823465933687;enabled:true;dur:500");
 
           setTimeout(function () {
             frame3.removeAttribute("animation__imageEnd3");
             frame3.removeAttribute("animation__imageEnd33");
           }, 500);
 
           var frame4 = document.querySelector('#frame4');
           frame4.setAttribute("animation__imageEnd4", "property: scale;from:1.9 0.85 1;to: 1.67 0.79 1; dur: 500;enabled:true;");
           frame4.setAttribute("animation__imageEnd44", "property: position;from:6.220999999999999 -0.35572922937128143 3.640451453666469;to:6.451 -0.446 3.869020815444363;enabled:true;dur:500");
 
           setTimeout(function () {
             frame4.removeAttribute("animation__imageEnd4");
             frame4.removeAttribute("animation__imageEnd44");
           }, 500);
 
           flag = 0;
           var frameName = "blank";
           if (framecount == 1) {
             frameName = customObj.Frame.frameHeader1;
           } else if (framecount == 2) {
             frameName = customObj.Frame.frameHeader2;
           } else if (framecount == 3) {
             frameName = customObj.Frame.frameHeader3;
           } else if (framecount == 4) {
             frameName = customObj.Frame.frameHeader4;
           }
           params.Verb = "Viewed";
           params.Object = frameName + " for " + videoStreamTime + " sec";
           params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
           callToTacking.callToApi(params);
           if (xapiEnable) {
             sendToXapi("Viewed", "viewed", params.Object, params.Object.replace(/\s/g, ''));
           }
           screenshotVar = document.querySelector('#screenshot1');
           var back = document.getElementById('back');
           var videoEl = document.querySelector('#customVideo');
           videoEl.setAttribute('position', "8.335 200 2.165");
           screenshotVar.setAttribute('position', '6.458 2.5400203018447076 0.019');
           frameImg1El.setAttribute('position', '8.335 -2.0151360588491687 1.100415337077404');
           frameImg2El.setAttribute('position', '8.335 -2.015 3.6453437832544733');
           frameImg3El.setAttribute('position', '8.335 -2.015 6.194384520886265');
           frameImg4El.setAttribute('position', '8.335 -2.015 8.741999999999999');
           frameclick1.setAttribute('position', '6.372569545906207 -0.446 -3.84');
           frameclick2.setAttribute('position', '6.372569545906207 -0.446 -1.2651183491856703');
           frameclick3.setAttribute('position', '6.372569545906207 -0.446 1.301823465933687');
           frameclick4.setAttribute('position', '6.372569545906207 -0.446 3.869');
           playvideo.setAttribute('position', '6.442 0.856 -3.249');
           back.setAttribute('position', "8.335 200 2.165");
           textPanel.setAttribute('position', '6.44 3.480 0.056');
           var nomedia = document.querySelector('#nomedia');
           var nomediatext = document.querySelector('#nomediatext');
           nomedia.setAttribute('position', '6.45 200 0.019');
           nomediatext.setAttribute('position', '6.426234755410172 200 0.6259531108536633');
           var vid = document.querySelector('#vid');
           vid.pause();
           vid.load();
           vid.currentTime = 0;

        //    var frame = "frame" + (this.el.id.split("-")[1]);
        //    if (frame == 'frame1') {
        //     var frame1 = document.querySelector('#frame1');
  
        //     frame1.setAttribute("animation__imageEnd1", "property: scale;from:1.9 0.85 1;to: 1.67 0.79 1; dur: 500;enabled:true;");
        //     frame1.setAttribute("animation__imageEnd11", "property: position;from:6.392449557118177 -0.411 -3.674;to:6.450649384492285 -0.446 -3.84;enabled:true;dur:500");
  
        //     setTimeout(function () {
        //       frame1.removeAttribute("animation__imageEnd1");
        //       frame1.removeAttribute("animation__imageEnd11");
        //     }, 500);
  
        //   } else if (frame == 'frame2') {
        //     var frame1 = document.querySelector('#frame2');
        //     frame1.setAttribute("animation__imageEnd2", "property: scale;from:1.9 0.85 1;to: 1.67 0.79 1; dur: 500;enabled:true;");
        //     frame1.setAttribute("animation__imageEnd22", "property: position;from:6.380999999999999 -0.409 -1.2349999999999999;to:6.451 -0.44647484258134396 -1.2651183491856703;enabled:true;dur:500");
  
        //     setTimeout(function () {
        //       frame1.removeAttribute("animation__imageEnd2");
        //       frame1.removeAttribute("animation__imageEnd22");
        //     }, 500);
  
        //   } else if (frame == 'frame3') {
        //     var frame1 = document.querySelector('#frame3');
        //     frame1.setAttribute("animation__imageEnd3", "property: scale;from:1.9 0.85 1;to: 1.67 0.79 1; dur: 500;enabled:true;");
        //     frame1.setAttribute("animation__imageEnd33", "property: position;from:6.243558628373066 -0.40789136641534474 1.3980750108506124;to:6.451 -0.44647484258134396 1.301823465933687;enabled:true;dur:500");
  
        //     setTimeout(function () {
        //       frame1.removeAttribute("animation__imageEnd3");
        //       frame1.removeAttribute("animation__imageEnd33");
        //     }, 500);
        //   } else if (frame == 'frame4') {
        //     var frame1 = document.querySelector('#frame4');
        //     frame1.setAttribute("animation__imageEnd4", "property: scale;from:1.9 0.85 1;to: 1.67 0.79 1; dur: 500;enabled:true;");
        //     frame1.setAttribute("animation__imageEnd44", "property: position;from:6.220999999999999 -0.35572922937128143 3.640451453666469;to:6.451 -0.446 3.869020815444363;enabled:true;dur:500");
  
        //     setTimeout(function () {
        //       frame1.removeAttribute("animation__imageEnd4");
        //       frame1.removeAttribute("animation__imageEnd44");
        //     }, 500);
        //  }
         }
       }
     });
     // Start Animation
     //   Animation Part
     this.el.addEventListener('mouseenter', () => {

       if (experienceStarted == true && applyAnimation) {
         var frame = "frame" + (this.el.id.split("-")[1]);
         if (frame == 'frame1') {
            var frame1 = document.querySelector('#frame1');
            frame1.setAttribute("animation__image1", "property: scale;from:1.67 0.79 1;to: 1.9 0.85 1; dur: 500;enabled:true;");
            frame1.setAttribute("animation__image11", "property: position;from:6.450649384492285 -0.446 -3.84;to:6.392449557118177 -0.411 -3.674;enabled:true;dur:500");
  
          } else if (frame == 'frame2') {
            var frame1 = document.querySelector('#frame2');
  
            frame1.setAttribute("animation__image2", "property: scale;from:1.67 0.79 1;to: 1.9 0.85 1; dur: 500;enabled:true;");
            frame1.setAttribute("animation__image22", "property: position;from:6.451 -0.44647484258134396 -1.2651183491856703;to:6.380999999999999 -0.409 -1.2349999999999999;enabled:true;dur:500");
          } else if (frame == 'frame3') {
            var frame1 = document.querySelector('#frame3');
            frame1.setAttribute("animation__image3", "property: scale;from:1.67 0.79 1;to: 1.9 0.85 1; dur: 500;enabled:true;");
            frame1.setAttribute("animation__image33", "property: position;from:6.451 -0.44647484258134396 1.301823465933687;to:6.243558628373066 -0.40789136641534474 1.3980750108506124;enabled:true;dur:500");
  
          } else if (frame == 'frame4') {
            var frame1 = document.querySelector('#frame4');
            frame1.setAttribute("animation__image4", "property: scale;from:1.67 0.79 1;to: 1.9 0.85 1; dur: 500;enabled:true;");
            frame1.setAttribute("animation__image44", "property: position;from:6.451 -0.446 3.869020815444363;to:6.220999999999999 -0.35572922937128143 3.640451453666469;enabled:true;dur:500");
  
          }
  
       }
     });


     this.el.addEventListener('mouseleave', () => {
       if (experienceStarted == true && applyAnimation) {
         // End Animation

         var frame = "frame" + (this.el.id.split("-")[1]);
         if (frame == 'frame1') {
            var frame1 = document.querySelector('#frame1');
  
            frame1.setAttribute("animation__imageEnd1", "property: scale;from:1.9 0.85 1;to: 1.67 0.79 1; dur: 500;enabled:true;");
            frame1.setAttribute("animation__imageEnd11", "property: position;from:6.392449557118177 -0.411 -3.674;to:6.450649384492285 -0.446 -3.84;enabled:true;dur:500");
  
            setTimeout(function () {
              frame1.removeAttribute("animation__imageEnd1");
              frame1.removeAttribute("animation__imageEnd11");
            }, 500);
  
          } else if (frame == 'frame2') {
            var frame1 = document.querySelector('#frame2');
            frame1.setAttribute("animation__imageEnd2", "property: scale;from:1.9 0.85 1;to: 1.67 0.79 1; dur: 500;enabled:true;");
            frame1.setAttribute("animation__imageEnd22", "property: position;from:6.380999999999999 -0.409 -1.2349999999999999;to:6.451 -0.44647484258134396 -1.2651183491856703;enabled:true;dur:500");
  
            setTimeout(function () {
              frame1.removeAttribute("animation__imageEnd2");
              frame1.removeAttribute("animation__imageEnd22");
            }, 500);
  
          } else if (frame == 'frame3') {
            var frame1 = document.querySelector('#frame3');
            frame1.setAttribute("animation__imageEnd3", "property: scale;from:1.9 0.85 1;to: 1.67 0.79 1; dur: 500;enabled:true;");
            frame1.setAttribute("animation__imageEnd33", "property: position;from:6.243558628373066 -0.40789136641534474 1.3980750108506124;to:6.451 -0.44647484258134396 1.301823465933687;enabled:true;dur:500");
  
            setTimeout(function () {
              frame1.removeAttribute("animation__imageEnd3");
              frame1.removeAttribute("animation__imageEnd33");
            }, 500);
          } else if (frame == 'frame4') {
            var frame1 = document.querySelector('#frame4');
            frame1.setAttribute("animation__imageEnd4", "property: scale;from:1.9 0.85 1;to: 1.67 0.79 1; dur: 500;enabled:true;");
            frame1.setAttribute("animation__imageEnd44", "property: position;from:6.220999999999999 -0.35572922937128143 3.640451453666469;to:6.451 -0.446 3.869020815444363;enabled:true;dur:500");
  
            setTimeout(function () {
              frame1.removeAttribute("animation__imageEnd4");
              frame1.removeAttribute("animation__imageEnd44");
            }, 500);
         }


       }
     });


   }
 });

 //  Mouse Cursor Reset
 AFRAME.registerComponent('sky', {
   schema: {
     default: ''
   },
   init() {

     this.el.addEventListener('mouseleave', () => {
    //    var cur = document.querySelector('#cursor');
    //    cur.emit("startAnimantion");
     });
   }
 });

 // Xapi Implementation            

 function countdown() {
   startTracking = true;
   callToTacking.callToApi(params);
   addExperienceResult(params.UserId, params.PatronId, params.PublishedExperienceId, 0);

   function tick() {
     focusTime++;
     screenActiveTime++;
     videoStreamTime++;
     if (screenActiveTime == 5) {
       addExperienceView(params.PatronId, params.PublishedExperienceId);
     }
     if (screenActiveTime % 10 == 0)
       updateExperienceResult(10, 0, 0, "N/A");
     setTimeout(tick, 1000);
   }
   tick();
 }

 

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

 AFRAME.registerComponent('mouseclick', {
   init: function () {

     var Wallpaper = "";
     this.el.addEventListener('mouseenter', function () {
       if (experienceStarted == true) {
         if (this.getAttribute('id') == "eastLogo") {
           Wallpaper = "East Wallpaper"
         } else if (this.getAttribute('id') == "westLogo") {
           Wallpaper = "West Wallpaper"
         } else if (this.getAttribute('id') == "southLogo") {
           Wallpaper = "South logo 1"
         } else if (this.getAttribute('id') == "south_image2") {
           Wallpaper = "South logo 2"
         }
         focusTime = 0;
         if (startTracking) {
           params.Verb = "started Viewing";
           params.Object = Wallpaper;
           params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
           callToTacking.callToApi(params);
           if (xapiEnable) {
             sendToXapi("Viewed", "viewed", params.Object, params.Object.replace(/\s/g, ''));
           }
         }
       }
     });


     this.el.addEventListener('mouseleave', function () {
       if (experienceStarted == true) {
         if (startTracking) {

           if (this.getAttribute('id') == "eastLogo") {
             Wallpaper = "East Wallpaper"
           } else if (this.getAttribute('id') == "westLogo") {
             Wallpaper = "West Wallpaper"
           } else if (this.getAttribute('id') == "southLogo") {
             Wallpaper = "South logo 1"
           } else if (this.getAttribute('id') == "south_image2") {
             Wallpaper = "South logo 2"
           }

           params.Verb = "completed Viewing";
           params.Object = Wallpaper;
           params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
           callToTacking.callToApi(params);

           params.Verb = "Viewed";
           params.Object = Wallpaper + " for " + focusTime + "sec";
           params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
           callToTacking.callToApi(params);

           if (xapiEnable) {
             sendToXapi("Viewed", "viewed", params.Object, params.Object.replace(/\s/g, ''));
           }

         }



       }
     });

   }
 });

 function sendToXapi(verb, urlVerb, objectText, ObjectUrlName) {
   sendVerboseToXapi(verb, "http://adlnet.gov/expapi/verbs/" + urlVerb, objectText, "http://adlnet.gov/expapi/activities/HallOfFrame", "http://id.tincanapi.com/activity/experizer-template/" + ObjectUrlName.toLowerCase(), "http://adlnet.gov/expapi/activities/course", "Activity");
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
   var Url = window.location.href;
   getExperienceUrl()
   makeCode();
   $("#divOnOff").click(function () {
     $("#divOnOff").prop('disabled', true);
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
   // var qrcode = new QRCode("qrcode", {
   //     text: window.location.href,
   //     width: 90,
   //     height: 90,
   //     colorDark : "#000000",
   //     colorLight : "#ffffff",
   //     correctLevel : QRCode.CorrectLevel.H
   // });
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
