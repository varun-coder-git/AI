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
  <link rel="stylesheet" href="/act/v0.1/verbose/splash.css">
  <script src="/act/v0.1/storypoint/assets/js/jquery-3.3.1.min.js"></script>
  <script src="/act/v0.1/storypoint/assets/js/aframe-v1.0.4.min.js"></script>
  <link rel="stylesheet" href="/act/v0.1/storypoint/assets/css/bootstrap.min.css">

  <link rel="stylesheet" href="/act/v0.1/verbose/css/SplashScreenToogleButton.css">
  <link rel="stylesheet" href="/act/v0.1/storypoint/assets/css/fa-v5.css">
  <script src="/act/v0.1/storypoint/assets/js/bootstrap.min.js"></script>
  <script src="/act/v0.1/storypoint/assets/js/aframe-gif-shader.min.js"></script>
  <script src="/act/v0.1/storypoint/assets/js/aframe-look-at-billboard-component.min.js"></script>
  <script src="/act/v0.1/storypoint/assets/js/aframe-video-controls.min.js"></script>
  <script src="/act/v0.1/storypoint/assets/js/aframe-vid-shader.min.js"></script>
  <script src="/act/v0.1/verbose/scripts/TinCanJS/build/tincan.js"></script>
  <script src="/act/v0.1/verbose/scripts/base64.js"></script>
  <script src="/act/v0.1/verbose/trackingData.js"></script>
  <script src="/act/v0.1/verbose/config.js"></script>
  <script src="/act/v0.1/verbose/verboseLaunch.js"></script>
  <script src="/act/v0.1/verbose/common.js"></script>
  <meta name="google-signin-client_id"
    content="227903861079-q9gj2q8n6p1qmfkoo6eec1esqhq6p9u7.apps.googleusercontent.com">
  <script src="https://apis.google.com/js/platform.js?onload=onLoadGoogleCallback" async defer></script>
  <script src="/act/v0.1/verbose/aframe-svgfile-component.js"></script>

</head>

<body class="" id='mainBody'>
  <div id="loaderq" class="lds-roller lds-roller-pos-assets-popup" style="position: absolute; z-index: 9999">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div id="container" class="container">
    <div class="info" id="info">
      <div class="inner-overloy hidden-login" style="overflow-y: auto" id="innerInfo">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="row">
              <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                <!-- <label id="titleText" class="titleheader">Loading..</label>
                <label id="titleDescription"></label> -->
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label id="titleText" class="titleheader">Loading..</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label id="titleDescription"></label>
                  </div>
                </div>
              </div>
              <div id="toogleButtonStyle" class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                <img id='qrcode' src="" />
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
            <div class="row ">
              <div class="col  instruction-scroll">

                <label id="instruction"></label>

              </div>
            </div>

          </div>

          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 border-left">
            <div class="row text-align-center logo-center-top" id="logoTop">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 pb-2">
                <img src="assets/images/experizerlogo_black.png" id="splashLogo" class="logo ">
              </div>
            </div>
            <div class="row text-align-center button-center-top mt-4" id="buttonTop">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <label id="loading"><b>Loading...</b></label>
                <button class="button disabled " id="start_experience">Enter</button>
                <div id="loginForm" style="display: flex">
                  <div class="row" style="margin-left: 0px;width: 100%;margin-right: 0px;">
                    <div class="col-12">
                      <div class="row" style="margin-left: 0px;width: 100%;margin-right: 0px;">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-12">
                          <button id="googleSignIn"
                            class="btn btn-google-color mx-auto signin-google-facebook-button mb-2" type="button">
                            <i aria-hidden="true" class="fab fa-google"></i> Google
                          </button>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-12">
                          <button class="btn btn-facebook-color mx-auto signin-google-facebook-button mb-2"
                            type="button" onclick="facebookLogin()">
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
                            <input type="email" class="form-control width-size mb-2" id="email" placeholder="Email"
                              name="uname" required>

                            <input type="password" class="form-control width-size mb-2" id="psw" placeholder="Password"
                              name="psw" required>

                            <button type="submit" class="button">Login</button>
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
  <a-scene id="sceneid" loading-screen="enabled:false">

    <a-entity id="cameraId" animation="property: rotation; to: 0 -360 0; dur: 100000;easing:linear;loop:true"
      animation__one="property: rotation;to: 0 360 0; dur: 2000;easing:easeInOutCirc;enabled:false">
      <a-entity id="CamEntity">
        <a-entity id="mainCam" camera look-controls="reverseTouchDrag:true" wasd-controls-enabled="false"
          position="0 1.6 0">
          <a-entity id="cursor" cursor="fuse: true; fuseTimeout: 1200" raycaster="objects: .clickable" position="0 0 -1"
            scale="1 1 1" geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: red; shader: flat" sky>
            <!-- <a-entity id="cursorImage" svgfile="svgFile:assets/images/viewfinder.svg; width:0.012;opacity:1; "position="-0.054 0.044 -0.014" material="shader: flat;" scale="1 1 1"></a-entity> -->
          </a-entity>
        </a-entity>
      </a-entity>
    </a-entity>
    <a-assets id="assets">
      <img id="office" src="">
      <audio id="sound" src="/act/v0.1/showandtell/assets/audio/Work Ethics.mp3"></audio>
      <video id="vid" src="/act/v0.1/storypoint/assets/videos/test.mp4" crossOrigin="anonymous" loop="true"
        style="display: none"></video>
    </a-assets>


    <a-entity id="mainInfo" class="banner-entity" position="0.26152 6.39399 -20.49568" look-at="src: #mainCam"
      scale="1 1 1">

      <a-plane id="infoBox" color="#000000" material="side:double;opacity:0.342;transparent:true" visible="false"
        geometry="height:15;width:30" position="-0.16698 -1.9639 -12.72329"
        animation__startAnimation="property: scale;from:0 0 0;to: 1 1 1; dur: 1000;enabled:false"
        animation__endAnimation="property: scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:false"></a-plane>

      <a-plane id="textAnimation" color="#000000" material="side:double;opacity:0;transparent:true" height="20"
        geometry="height:15;width:30" width="20" scale="0 0 0" position="0 -1.9639 -10" visible=""
        animation__startTextAnimation="property: scale;from:0 0 0;to:0.87 1 1; dur: 1000;enabled:false"
        animation__endTextAnimation="property: scale;from:0.87 1 1;to:0 0 0; dur: 1000;enabled:false">
        <!-- <a-entity look-at="[camera]" id="text1" position="-0.08462 5.9 0.04179" material="metalness:1; roughness:0; transparent: true; opacity: .0; shader: flat; 
         color: black; side:double;" text="baseline:top;wrapCount:48;lineHeight:50;width: 28;  align:left; value: Want to learn about Frame? \n
         Desktop: Click and drag to look around. Use the arrow keys or WASD to move. \n 
         Mobile: Tilt or swipe to look. Tap + drag in bottom left corner to move. \n
         VR headset? Click the VR button on bottom right to enter VR mode. 
         ; shader: msdf;">
        </a-entity> -->
        <a-entity look-at="[camera]" id="text1" position="-0.08462 5.9 0.04179" material="metalness:1; roughness:0; transparent: true; opacity: .0; shader: flat;
        color: black; side:double;" text="font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;width: 28; color: #fff; value: Want to learn about Frame? \n
        Desktop: Click and drag to look around. Use the arrow keys or WASD to move. \n 
        Mobile: Tilt or swipe to look. Tap + drag in bottom left corner to move. \n
        VR headset? Click the VR button on bottom right to enter VR mode.; wrapCount:48;lineHeight:50;width: 28; " >
        </a-entity>
        <a-entity look-at="[camera]" id="text2" position="-0.08462 4.03 0.04179" material="metalness:1; roughness:0; transparent: true; opacity: .0; shader: flat; 
         color: black; side:double;" text="baseline:top;wrapCount:48;lineHeight:50;width: 28;  align:left; value: Want to learn about Frame? \n
         Desktop: Click and drag to look around. Use the arrow keys or WASD to move. \n 
         Mobile: Tilt or swipe to look. Tap + drag in bottom left corner to move. \n
         VR headset? Click the VR button on bottom right to enter VR mode. 
         ; shader: msdf;"></a-entity>
        <!-- <a-text id="text1" position="-13.86466 5.9 1.12607"  text="width:28;baseline:top;wrapCount:48;lineHeight:50"  value=""></a-text>
              <a-text id="text2" position="-13.86466 4.03 1.12607"  text="width:28;baseline:top;wrapCount:48;lineHeight:50" value=""></a-text> -->
      </a-plane>

      <a-plane id="imageFrame" color="#fff" visible="false" geometry="height:16.88;width:30"
        material="side:double;opacity:1;shader:flat" position="0 7.78 0" scale="0.1 0.1 0.1"
        animation__startAnimationImage="property: scale;from:0 0 0;to:0.2 0.2 0.1; dur: 1500;enabled:false"
        animation__endAnimationImage="property: scale;from:0.2 0.2 0.1;to:0 0 0; dur: 1500;enabled:false">

        <a-image crossorigin="anonymous" id="img1" src="assets/images/loading.png" position="0 0 1" scale="5 5 5"
          geometry="height:7;width:14" visible="false">
        </a-image>
      </a-plane>
      <a-plane id="videoframe" color="#fff" visible="false" geometry="height:16.88;width:30"
        material="side:double;opacity:1;shader:flat" position="0 7.78 0" scale="0.1 0.1 0.1"
        animation__startAnimationVideo="property: scale;from:0 0 0;to:0.2 0.2 0.1; dur: 1500;enabled:false"
        animation__endAnimationVideo="property: scale;from:0.2 0.2 0.1;to:0 0 0; dur: 1500;enabled:false">

        <a-entity id="video1" geometry="width:6;height:3" scale=" 14 12 1.9" position="0 0 1"
          material="shader: flat; src: #vid;">
        </a-entity>
        <a-entity id="nomediaGif" geometry="primitive:plane;height:34;width:81"
          material="shader:gif;side:double;src:url(assets/images/nomedia.gif);opacity:0.9" position="0 0 2" rotation=""
          visible="false"></a-entity>
      </a-plane>
      <!-- </a-entity> -->
    </a-entity>

    <!--    Audio    -->
    <a-entity id="audio1" sound="src: #sound" position="0 1 0"></a-entity>
    <!--     sky-->
    <a-sky id="space" src="#office"></a-sky>
  </a-scene>
  <script src="/act/v0.1/verbose/SplashScreen.js"></script>
  <script src="/act/v0.1/storypoint/assets/js/position.js"></script>
</body>

</html>