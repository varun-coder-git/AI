<?php include '../verbose/socialpreview.php';?>
<!--**************************************************************************************************************************************
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
-->

  <link rel="icon" href="/act/favicon.png">
    <meta name="apple-mobile-web-app-capable" content="no">
    <link rel="stylesheet" href="/act/v0.1/personaltheater/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="/act/v0.1/verbose/css/SplashScreenToogleButton.css">
    <link rel="stylesheet" type="text/css" href="/act/v0.1/verbose/splash.css">
    <script src="/act/v0.1/personaltheater/assets/js/aframe-v1.0.4.min.js"></script>
    <!-- <script src="/act/v0.1/personaltheater/assets/js/arrow-key-rotation.js"></script>
    <script src="/act/v0.1/personaltheater/assets/js/play-on-window-click.js"></script>
    <script src="/act/v0.1/personaltheater/assets/js/play-with-delay.js"></script>
    <script src="/act/v0.1/personaltheater/assets/js/play-on-vrdisplayactivate-or-enter-vr.js"></script>
    <script src="/act/v0.1/personaltheater/assets/js/hide-once-playing.js"></script> -->
    <script src="/act/v0.1/verbose/scripts/TinCanJS/build/tincan.js"></script>
    <script src="/act/v0.1/verbose/scripts/base64.js"></script>
    <script src="/act/v0.1/verbose/trackingData.js"></script>
    <script src="/act/v0.1/verbose/config.js"></script>
    <script src="/act/v0.1/verbose/verboseLaunch.js"></script>
    <script src="assets/js/aframe-gif-shader.min.js"></script>
    <link rel="stylesheet" href="/act/v0.1/verbose/css/fa-v5.css">
    <meta name="google-signin-client_id" content="227903861079-q9gj2q8n6p1qmfkoo6eec1esqhq6p9u7.apps.googleusercontent.com">
    <script src="https://apis.google.com/js/platform.js?onload=onLoadGoogleCallback" async defer></script>
    <script src="/act/v0.1/verbose/aframe-svgfile-component.js"></script>

  
   
</head>

<body class="" id='mainBody'>
  
   <div id="loaderq" class="lds-roller lds-roller-pos-assets-popup" style="position: absolute; z-index: 9999"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    <div id="container" class="container">
      <div class="info" id="info">
        <div class="inner-overloy hidden-login" style="overflow-y: auto" id="innerInfo">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div class="row">
                    <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                    <label id="titleText" class="titleheader">Loading..</label>
                    <label id="titleDescription"></label>
                   </div>
                   <div id="toogleButtonStyle" class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    <img id='qrcode'  src=""  />
                      <div class="onoffswitch1 mt-2 ml-3" id="divOnOff">
                          <input type="checkbox" name="onoffswitch1" class="onoffswitch1-checkbox" id="myonoffswitch1" checked>
                          <label class="onoffswitch1-label" for="myonoffswitch1">
                              <span id="onOffSwitch"></span>
                              <span class="onoffswitch1-switch"></span>
                          </label>
                          </div> 
                          <p id="mode" style="margin-left: 18%;font-size: 10px;"></p>
                     </div>
                </div>
                    <hr>
                </div>
                </div>
  
              <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                      <div class="row " >
                          <div class="col  instruction-scroll">
                          
                          <label id="instruction"></label>
                            
                         </div>
                      </div>
                     
                  </div>
                 
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 border-left">
                    <div class="row text-align-center logo-center-top" id="logoTop">
                      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 pb-2">
                        <img src="/act/experizerlogo_black.png" id="splashLogo" class="logo ">
                      </div>
                    </div> 
                    <div class="row text-align-center button-center-top mt-4" id="buttonTop">
                      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <label id="loading" ><b>Loading...</b></label>
                        <button class="button disabled " id="start_experience"  >Enter</button>
                        <div id="loginForm" style="display: flex">
                          <div class="row" style="margin-left: 0px;width: 100%;margin-right: 0px;">
                            <div class="col-12">
                              <div class="row" style="margin-left: 0px;width: 100%;margin-right: 0px;">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-12">
                                  <button id="googleSignIn" class="btn btn-google-color mx-auto signin-google-facebook-button mb-2" type="button">
                                    <i aria-hidden="true" class="fab fa-google"></i> Google
                                  </button>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-12">
                                  <button class="btn btn-facebook-color mx-auto signin-google-facebook-button mb-2" type="button" onclick="facebookLogin()">
                                    <i aria-hidden="true" class="fab fa-facebook-f"></i> Facebook
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div class="col-12 mb-2"> Or </div>
                            <div class="col-12">
                              <div class="row" style="margin-left: 0px;width: 100%;margin-right: 0px;">
                                <div class="col-lg-2 col-md-2 col-sm-2 col-12"></div>
                                <div class="col-lg-8 col-md-8 col-sm-8 col-12">

                                  <form onsubmit="UserLogin(1); return false">
                                    <input type="email"  class="form-control width-size mb-2" id="email" placeholder="Email" name="uname" required>

                                    <input type="password" class="form-control width-size mb-2" id="psw" placeholder="Password" name="psw" required>

                                    <button type="submit" class="button" >Login</button>
                                  </form>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-12"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
              </div>
                </div>
          </div>
          </div>
          <div class="inactiveMessage" id="myDiv">This Experience is no longer Active in this room.</div>
    <a-scene   id="aScene"  antialias="true" loading-screen="enabled:false">
        <video id="vid" preload="true" crossorigin="anonymous" playsinline webkit-playsinline src="/act/v0.1/personaltheater/assets/videos/test.mp4"></video>
        <a-assets><img id="office" ></a-assets>
          
       <a-sky id="sky" src="#office" rotation="0 90 0"></a-sky>
           <a-entity obj-model="obj:/act/v0.1/quiz/assets/images/CubeRoom.obj" material="metalness:0.6;src:/act/v0.1/personaltheater/assets/images/decor/brick.jpg" position="-3.078 -2.073 0.035" rotation="0 90 0" scale="1.5 1.43 2.04" id="cuberoom"></a-entity>
       <a-entity id="Chair" obj-model="obj:/act/v0.1/personaltheater/assets/images/ChairBlend.obj;mtl:/act/v0.1/personaltheater/assets/images/ChairBlend.mtl" scale="0.003 0.003 0.003" rotation="-90 -90 0" position="-1.163 -2.3500000000000005 -0.560" visible=""></a-entity>
      
   <!-- Decor Objects-->
         <a-entity id="Table_lamp" obj-model="mtl:/act/v0.1/personaltheater/assets/images/obj/table_lamp.mtl;obj:/act/v0.1/personaltheater/assets/images/obj/table_lamp.obj" position="-12.02718639154422 -0.02891118556281952 -1.9055311551374998" rotation="0 -90 0" scale="0.3 0.3 0.3"></a-entity>
         <a-entity id="oldJug" obj-model="mtl:/act/v0.1/personaltheater/assets/images/obj/old_jar.mtl;obj:/act/v0.1/personaltheater/assets/images/obj/old_jar.obj" position="-11.623654743453805 0.2538698847168046 1.2087902251478397" rotation="0 -90 0" scale="0.76 0.76 0.76"></a-entity>
         <a-entity id="table_2" obj-model="mtl:/act/v0.1/personaltheater/assets/images/obj/tvStand.mtl;obj:/act/v0.1/personaltheater/assets/images/obj/tvStand.obj" position="-11.387165672288463 -2.073 -0.109" rotation="0 90 0" scale="0.04 0.04 0.04"></a-entity>
       
   <!-- Decor Objects End-->
         
       
   <a-entity id="cameraId" animation="property: rotation; to: 0 -360 0; dur: 100000;easing:linear;loop:true"
            animation__one="property: rotation;to: 0 360 0; dur: 2000;easing:easeInOutCirc;enabled:false">
            <a-entity id="CamEntity">
              <a-entity id="firstrotation" camera look-controls="reverseTouchDrag:true" wasd-controls-enabled="false" position="-0.85 0.303 0">
                <a-entity id="cursor" cursor="rayOrigin:mouse" raycaster="objects: .clickable" position="0 0 -1"
                  scale="0 0 0" geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"	material="color: red; shader: flat" sky>
                  <!-- <a-entity id="cursorImage" svgfile="svgFile:assets/images/viewfinder.svg; width:0.012;opacity:1; "position="-0.054 0.044 -0.014" material="shader: flat;" scale="1 1 1"></a-entity> -->
                </a-entity>
              </a-entity>
            </a-entity>
          </a-entity> 
   <!-- Camera Light End-->
   
   <!-- TV Screen -->
         <a-entity obj-model="obj:/act/v0.1/personaltheater/assets/images/moonlight.obj" material="opacity:0.9;src:/act/v0.1/personaltheater/assets/images/tvscreenPlane.jpg ;side:double" position="4.568037928244551 -5.69 -26.19207604761051" rotation="0 90 0" scale="4.6 3.75 1"></a-entity>     
           <a-entity id='customVideo' playvideo material="shader: flat; src: #vid;" width='16' height='9' position='8.335 200 2.165' rotation='0 -90 0' geometry='primitive:plane;width:215;height:125' scale='0.048 0.048 1' ></a-entity>
           <a-entity id='nomedia' material="shader:gif; src:url(/act/v0.1/personaltheater/assets/images/nomedia.gif);opacity:1" width='16' height='9' position='8.335 200 2.165' rotation='0 -90 0' geometry='primitive:plane;width:215;height:125' scale='0.048 0.048 1' ></a-entity>
           <a-text id="nomediatext" visible="" value="No media found" text="anchor:center;width:3;font:/act/v0.1/verbose/fonts/anton/Anton-Regular.json;tabSize:1;height:5;color:#000000;wrapCount:20;whiteSpace:pre;lineHeight:60;shader:msdf;baseline:top" position="6.426234755410172 200 0.6259531108536633" rotation="0 -90 0" sky="" scale=""> </a-text>         <a-image id="screenshot1" src="" width="16" height="9" position="6.458 2.54 0.019" rotation="0 -90 0" geometry="width:215;height:125" material="" visible="" scale="0.048 0.035 1">
            <a-text id="header1" visible="" value="" text="font:assets/fonts/anton/Anton-Regular.json;anchor:center;width:220;tabSize:1;height:5;color:#89FF85;wrapCount:20;whiteSpace:pre;lineHeight:60;shader:msdf;baseline:top;value:header header header" position="8 30 0.50" rotation="" sky="" scale=""> </a-text>
            <!-- <a-text id="subheader1" visible="" value="" text="anchor:center;width:190;tabSize:1;height:5;color:#FF622B;wrapCount:30;wrapPixels:1100;whiteSpace:pre;lineHeight:60;font:assets/fonts/robotomono/RobotoMono-Light.json;shader:msdf;baseline:top"  position="-5 20 0.030" rotation="0 0 4.881063327991453e-15" sky="" scale=""> </a-text> -->
                  
          </a-image>
          <a-entity id="text-panel"  position="6.44 3.480 0.056" rotation="0 -90 0">     
            <a-text id="subheader1" visible="" value="" text="anchor:center;width:9.879999999999999;shader:msdf;baseline:top;wrapCount:50;lineHeight:50;value:subheader subheader subheadersubheader subheader subheadersubheader subheader subheadersubheader subheader subheadersubheader subheader subheadersubheader subheader subheadersubheader subheader subheadersubheader subheader subheadersubheader subheader subheadersubheader subheader subheadersubheader subheader subheader" sky="" scale=""> </a-text>
          </a-entity>
          
          
                 <a-image visible="" id="frame1" src="" width="16" height="9" position="6.450649384492285 -0.446 -3.84" set-sky="" rotation="0 -90 0" geometry="width:1.53;height:1.95" material="src:" scale="1.67 0.79 1">
                 <!-- <a-animation begin="image1" end="stop1" attribute="position" dur="500" from="6.450649384492285 -0.446 -3.84" to="6.392449557118177 -0.411 -3.674" fill="forword"></a-animation> 
                 <a-animation begin="image1" end="stop1" attribute="scale" dur="500" from="1.67 0.79 1" to="1.9 0.85 1" fill="forword"></a-animation>  -->
                 <!-- <a-animation begin="imageEnd1" attribute="scale" dur="500" to="1.67 0.79 1" from="1.9 0.85 1" fill="forword"></a-animation>   
                 <a-animation begin="imageEnd1" attribute="position" dur="500" to="6.450649384492285 -0.446 -3.84" from="6.392449557118177 -0.411 -3.674" fill="forword"></a-animation>  -->
                 <a-text id="header2" visible="" value="" text="anchor:center;width:1.5;value:;font:assets/fonts/anton/Anton-Regular.json;shader:msdf;tabSize:1;height:5;color:#42FF2B;wrapCount:16;whiteSpace:pre;lineHeight:60;baseline:top;value:header header header" position="0.0014985262661884949 0.6263283348257931 0.030" rotation="" sky="" scale=""> </a-text>
              
               </a-image>
                   
                   <a-image visible=""  id="frame2" src="" width="16" height="9" position="6.451 -0.44647484258134396 -1.2651183491856703"  rotation="0 -90 0" geometry="width:1.53;height:1.95" material="src:" scale="1.67 0.79 1">
                 <!-- <a-animation begin="image2" end="stop2" attribute="position" dur="500" from="6.451 -0.44647484258134396 -1.2651183491856703" to="6.380999999999999 -0.409 -1.2349999999999999" fill="forword"></a-animation> 
                 <a-animation begin="image2" end="stop2" attribute="scale" dur="500" from="1.67 0.79 1" to="1.9 0.85 1" fill="forword"></a-animation>  -->
                 <!-- <a-animation begin="imageEnd2" attribute="scale" dur="500" to="1.67 0.79 1" from="1.9 0.85 1" fill="forword"></a-animation>   
                 <a-animation begin="imageEnd2" attribute="position" dur="500" to="6.451 -0.44647484258134396 -1.2651183491856703" from="6.380999999999999 -0.409 -1.2349999999999999" fill="forword"></a-animation>  -->
                  <a-text id="header3" visible="" value="" text="anchor:center;width:1.5;value:;font:assets/fonts/anton/Anton-Regular.json;shader:msdf;tabSize:1;height:5;color:#42FF2B;wrapCount:16;whiteSpace:pre;lineHeight:60;baseline:top;value:header header header" position="0.0014985262661884949 0.6263283348257931 0.030" rotation="" sky="" scale=""> </a-text>
              
         
               </a-image>
  
             
                   
                   <a-image visible="" id="frame3" src="" width="16" height="9" position="6.451 -0.44647484258134396 1.301823465933687"  rotation="0 -90 0" geometry="width:1.53;height:1.95" material="src:" scale="1.67 0.79 1">
                  <a-text id="header4" visible="" value="" text="anchor:center;width:1.5;value:;font:assets/fonts/anton/Anton-Regular.json;shader:msdf;tabSize:1;height:5;color:#42FF2B;wrapCount:16;whiteSpace:pre;lineHeight:60;baseline:top;value:header header header" position="0.0014985262661884949 0.6263283348257931 0.030" rotation="" sky="" scale=""> </a-text>
              
         
               </a-image>
                   
                   <a-image visible=""  id="frame4" src="" width="16" height="9" position="6.451 -0.446 3.869020815444363"  rotation="0 -90 0" geometry="width:1.53;height:1.95" material="src:" scale="1.67 0.79 1">
                <a-animation begin="imageEnd4" attribute="position" dur="500" to="6.451 -0.446 3.869020815444363" from="6.220999999999999 -0.35572922937128143 3.640451453666469" fill="forword"></a-animation> 
                  <a-text id="header5" visible="" value="" text="anchor:center;width:1.5;value:;font:assets/fonts/anton/Anton-Regular.json;shader:msdf;tabSize:1;height:5;color:#42FF2B;wrapCount:16;whiteSpace:pre;lineHeight:60;baseline:top;value:header header header" position="0.0014985262661884949 0.6263283348257931 0.030" rotation="" sky="" scale=""> </a-text>
   
                </a-image>
                <a-entity id="clickFrame-4" class="clickable" visible="" playvideo="" src="" width="16" height="9" position="6.372569545906207 -0.446 3.869" set-sky="" rotation="0 -90 0" geometry="width:1.53;height:1.95" material="transparent:true;visible:false" scale="1.67 0.79 0.00001"></a-entity>
                <a-entity id="clickFrame-3" class="clickable" visible="" playvideo="" src="" width="16" height="9" position="6.372569545906207 -0.446 1.301823465933687" set-sky="" rotation="0 -90 0" geometry="width:1.53;height:1.95" material="transparent:true;visible:false" scale="1.67 0.79 0.00001"></a-entity>
                <a-entity id="clickFrame-2" class="clickable" visible="" playvideo="" src="" width="16" height="9" position="6.372569545906207 -0.446 -1.2651183491856703" set-sky="" rotation="0 -90 0" geometry="width:1.53;height:1.95" material="transparent:true;visible:false" scale="1.67 0.79 0.00001"></a-entity>
                <a-entity id="clickFrame-1" class="clickable" visible="" playvideo="" src="" width="16" height="9" position="6.372569545906207 -0.446 -3.84" set-sky="" rotation="0 -90 0" geometry="width:1.53;height:1.95" material="transparent:true;visible:false" scale="1.67 0.79 0.00001"></a-entity>
   
           <a-entity id="playbutton" class="clickable" playvideo="" geometry="primitive:plane;width:2;height:0.61" rotation="0 -90 0" material="src:assets/images/play.png;opacity:0.99" sky="" position="20 20 20"></a-entity>
           <a-entity id="back" class="clickable" playvideo="" geometry="primitive:plane;width:0.7;height:0.7" rotation="0 -90 0" material="src:assets/images/back.png;opacity:0.99" sky position="8.260 200 2.165"></a-entity>
             <a-image id="logo" src="" width="16" height="9" position="6.427 4.420496872282168 4.379434917630172" rotation="0 -90 0" geometry="width:4;height:2" material="src:assets\images\eqw.png;opacity:0.9" visible="" scale="0.32999999999999996 0.18 1"></a-image>
       
       <a-image id="southLogo"  crossorigin="anonymous" src="assets/images/default.jpg" width="4" height="3" material="height:0;width:0" rotation="0 90 0" position="-13.271 4.686 -3.726" scale="1 1 0"></a-image>
       <a-image id="south_image2"  crossorigin="anonymous" src="assets/images/default.jpg" width="4" height="3" material="height:0;width:0" position="-13.134 2.59 1.814" rotation="0 90 0" scale="1 1 0.00001"></a-image>
       <a-image id="eastLogo"  crossorigin="anonymous" src="assets/images/default.jpg" width="4" height="3" geometry="height:161;width:215" material="height:0;width:0" position="-2.595 2.19 -7.358" scale="0.06 0.053 0.00001"></a-image>
       <a-image id="westLogo"  crossorigin="anonymous" src="assets/images/default.jpg" width="4" height="3" geometry="height:161;width:215" rotation="0 180 0" material="height:0;width:0" position="-2.576 2.207 7.513" scale="0.06 0.053 0.00001"></a-image> 
   
      </a-scene>
   
 </body>
 
 <script src="/act/v0.1/personaltheater/assets/js/jquery-3.3.1.min.js"></script>
 <script src="/act/v0.1/verbose/common.js"></script>
 <script src="/act/v0.1/personaltheater/assets/js/app.js"></script>
 <script src="/act/v0.1/verbose/SplashScreen.js"></script>
</html>