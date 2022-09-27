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
  <meta name="apple-mobile-web-app-capable" content="yes">
  <script src="/act/v0.1/grandtheatre/assets/js/aframe-v1.0.4.min.js"></script>
  <link rel="stylesheet" href="/act/v0.1/grandtheatre/assets/css/bootstrap.min.css">

  <link rel="stylesheet" href="/act/v0.1/verbose/css/SplashScreenToogleButton.css">
  <link rel="stylesheet" href="/act/v0.1/verbose/splash.css">
  <script src="/act/v0.1/grandtheatre/assets/js/arrow-key-rotation.js"></script>
  <script src="/act/v0.1/grandtheatre/assets/js/play-on-window-click.js"></script>
  <script src="/act/v0.1/grandtheatre/assets/js/play-with-delay.js"></script>
  <script src="/act/v0.1/grandtheatre/assets/js/play-on-vrdisplayactivate-or-enter-vr.js"></script>
  <script src="/act/v0.1/grandtheatre/assets/js/hide-once-playing.js"></script>
  <script src="/act/v0.1/grandtheatre/assets/js/jquery-3.3.1.min.js"></script>
  <script src="/act/v0.1/grandtheatre/assets/js/bootstrap.min.js"></script>
  <script src="/act/v0.1/verbose/scripts/TinCanJS/build/tincan.js"></script>
  <script src="/act/v0.1/verbose/scripts/base64.js"></script>
  <script src="/act/v0.1/verbose/trackingData.js"></script>
  <script src="/act/v0.1/verbose/config.js"></script>
  <script src="/act/v0.1/verbose/verboseLaunch.js"></script>
  <script src="/act/v0.1/verbose/common.js"></script>
  <script src="/act/v0.1/grandtheatre/assets/js/main.js"></script>
  <link rel="stylesheet" href="/act/v0.1/verbose/css/fa-v5.css">
 <meta name="google-signin-client_id"
    content="227903861079-q9gj2q8n6p1qmfkoo6eec1esqhq6p9u7.apps.googleusercontent.com">
  <script src="https://apis.google.com/js/platform.js?onload=onLoadGoogleCallback" async defer></script>
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
                <label id="titleText" class="titleheader">Loading..</label>
                <label id="titleDescription"></label>
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

          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 border-left ">
            <div class="row text-align-center logo-center-top" id="logoTop">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 pb-2">
                <img src="/act/experizerlogo_black.png" id="splashLogo" class="logo ">
              </div>
            </div>
            <div class="row text-align-center button-center-top mt-2" id="buttonTop">
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
  <a-scene antialias="true" loading-screen="enabled:false">
    <img id="office" crossorigin="anonymous" src="">
    <img id="splashImg" crossorigin="anonymous" src="">
    <video id="customVideo" autoplay crossorigin="anonymous" playsinline webkit-playsinline src="">

    </video>
    <!-- <a-assets >
                       
                      </a-assets> -->
    <!--  <a-video src="#video" log="Hello WORLD" autoplay play-on-vrdisplayactivate-or-enter-vr width="16" height="9" position="3.344 27.257 225" rotation="1 180 0" geometry="width:214;height:108"></a-video>-->
    <a-image class="clickable" id="screenshot1" src="#splashImg" width="16" height="9" position="0.703 32.069 -253"
      rotation="-1.203 2.235 0.057" geometry="width:214;height:108" material="opacity:0"></a-image>
    <a-entity id="msg" position="3.344 27.257 225" text="align:center; 
                  width:3;
                  wrapCount:100;
                  color:red;
                  value:Click window to make the video play, if needed." hide-once-playing="#video">
    </a-entity>
    <a-image id="logo1" src="" width="4" height="2" set-sky class="clickable" position="91.387 26.964 -17.220"
      rotation="5.042 -90.585 -0.115" geometry="width:5;height:2"
      material="src:assets\images\newImages\eqw.png;opacity:0.9" visible="" scale="8 5.669 8"></a-image>
    <a-image id="logo2" src="" width="4" height="2" set-sky class="clickable" position="-91.387 26.964 -17.220"
      rotation="-5.042 90.585 0.115" geometry="width:5;height:2"
      material="src:assets/images/newImages/eqw.png;opacity:0.9" visible="" scale="7.79 5.35 8"></a-image>

    <!--                  <a-sky id="sky" src="#office" rotation="0 90 0"></a-sky>-->
    <a-entity id="cameraId" animation="property: rotation; to: 0 -360 0; dur: 100000;easing:linear;loop:true"
      animation__one="property: rotation;to: 0 360 0; dur: 2000;easing:easeInOutCirc;enabled:false"
      animation__video="property: rotation;to: 0 0 0; dur: 1000;enabled:false;easing:linear;">
      <a-entity id="CamEntity">
        <a-entity id="firstrotation" camera look-controls="reverseTouchDrag:true" wasd-controls-enabled="false"
          position="-0.85 0.303 0" rotation="0 90 0">
          <a-entity id="mainCursor" cursor="rayOrigin:mouse" raycaster="objects: .clickable" position="0 0 -1"
            scale="0 0 0" sky>
            <a-entity id="cursorImage" svgfile="svgFile:assets/images/viewfinder.svg; width:0.012;opacity:1;"
              position="-0.054 0.044 -0.014" material="shader: flat;" scale="1 1 1" light="type:ambient;intensity:1">
            </a-entity>
            <a-entity cursor="fuse: true; fuseTimeout: 1150" visible="false" raycaster="objects: .cursorEntry"
              position="0 0 -1" scale="0.02 0.02 0.02" geometry="primitive: ring"
              material="color: #ff0000; shader: flat"></a-entity>

          </a-entity>
        </a-entity>
      </a-entity>
    </a-entity>
  </a-scene>
  <script src="/act/v0.1/verbose/SplashScreen.js"></script>
</body>


</html>