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
  <link rel="icon" href="assets/images/favicon.png">
  <script src="assets/js/aframe-v1.0.4.min.js"></script>

  <link rel="stylesheet" href="assets/css/bootstrap.min.css">
  <link rel="stylesheet" href="../verbose/css/SplashScreenToogleButton.css">
  <link rel="stylesheet" type="text/css" href="../verbose/splash.css">

  <script src="assets/js/jquery-3.3.1.min.js"></script>

  <link rel="stylesheet" type="text/css" href="../verbose/splash.css">
  <script src="assets/js/bootstrap.min.js"></script>

  <script src="assets/js/aframe-video-controls.min.js"></script>
  <script src="assets/js/aframe-vid-shader.min.js"></script>
  <script src="assets/js/aframe-look-at-billboard-component.min.js"></script>
  <script src="../verbose/scripts/TinCanJS/build/tincan.js"></script>
  <script src="../verbose/scripts/base64.js"></script>
  <script src="../verbose/trackingData.js"></script>
  <script src="../verbose/config.js"></script>
  <script src="../verbose/verboseLaunch.js"></script>

  <link rel="stylesheet" href="../verbose/css/fa-v5.css">
  <meta name="google-signin-client_id"
    content="227903861079-q9gj2q8n6p1qmfkoo6eec1esqhq6p9u7.apps.googleusercontent.com">
  <script src="https://apis.google.com/js/platform.js?onload=onLoadGoogleCallback" async defer></script>

</head>

<body>
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

          <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 border-left">
            <div class="row text-align-center logo-center-top" id="logoTop">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 pb-2">
              <img src="assets/images/logo.png" id="splashLogo1" class="logo ">
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

  <a-scene id="sceneid" embeded shadow="type:pcfsoft" loading-screen="enabled:false">
    <a-entity id="cameraId" animation="property: rotation; to: 0 -360 0; dur: 100000;easing:linear;loop:true"
      animation__one="property: rotation;to: 0 360 0; dur: 2000;easing:easeInOutCirc;enabled:false"
      animation__finalRotation="property: rotation; to: 0 -360 0; dur: 100000;easing:linear;loop:true;enabled:false">

      <a-entity id="CamEntity">
        <a-entity id="mainCam" camera look-controls="reverseTouchDrag:true" wasd-controls-enabled="false"
          position="0 1.6 0">
          <a-entity id="cursor" cursor="rayOrigin:mouse" raycaster="objects: .clickable" position="0 0 -1" scale="0 0 0"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03" material="color: red; shader: flat" sky>
          </a-entity>
        </a-entity>
      </a-entity>
    </a-entity>
    <a-assets id="assets">
      <img id="office" src="">
      <audio id="sound" src="assets/audio/Work Ethics.mp3"></audio>
      <video id="vid" src="assets/videos/test.mp4" crossOrigin="anonymous" loop="true" style="display: none"></video>
    </a-assets>



    <a-plane id="mainInfo" material="side:back;opacity:0;transparent:true" visible="false" geometry="height:7;width:19"
      position="2000 2000 2000" scale="1.4 1.4 0" look-at="src: #mainCam">
      <a-plane id="option-panel-banner" color="#000000" material="shader:flat;flatShading:true;side:double;opacity:0.8;transparent:true"
        visible="false" geometry="height:10;width:19" position="-0.00744 -3.01455 -13.3856" scale="1.4 1.4 1.4">
      </a-plane>
      <a-plane id="option-panel" material="side:double;opacity:0;transparent:true" visible="false"
        geometry="height:12;width:18" position="-0.16698 -1.9639 -12.72329" scale="1.4 1.4 1.4">

        <a-plane id="option-panel-container" material="depthTest: false; depthWrite: false;">
          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-1'
            material="src:icons/select.png;transparent:true" position="-7.5 2.8 0.011" visible="false" scale="1 1 0">
          </a-box>
          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-7'
            material="src:icons/select.png;transparent:true" position="7.5 2.8 0.011" visible="false" scale="1 1 0">
          </a-box>
          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-6'
            material="src:icons/select.png;transparent:true" position="5 2.8 0.011" visible="false" scale="1 1 0">
          </a-box>
          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-5'
            material="src:icons/select.png;transparent:true" position="2.5 2.8 0.011" visible="false" scale="1 1 0">
          </a-box>
          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-4'
            material="src:icons/select.png;transparent:true" position="0 2.8 0.011" visible="false" scale="1 1 0">
          </a-box>
          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-3'
            material="src:icons/select.png;transparent:true" position="-2.5 2.8 0.011" visible="false" scale="1 1 0">
          </a-box>
          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-2'
            material="src:icons/select.png;transparent:true" position="-5 2.8 0.011" visible="false" scale="1 1 0">
          </a-box>

          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-8'
            material="src:icons/select.png;transparent:true" position="-7.5 0.4 0.011" visible="false" scale="1 1 0">
          </a-box>
          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-14'
            material="src:icons/select.png;transparent:true" position="7.5 0.4 0.011" visible="false" scale="1 1 0">
          </a-box>
          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-13'
            material="src:icons/select.png;transparent:true" position="5 0.4 0.011" visible="false" scale="1 1 0">
          </a-box>
          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-12'
            material="src:icons/select.png;transparent:true" position="2.5 0.4 0.011" visible="false" scale="1 1 0">
          </a-box>
          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-11'
            material="src:icons/select.png;transparent:true" position="0 0.4 0.011" visible="false" scale="1 1 0">
          </a-box>
          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-10'
            material="src:icons/select.png;transparent:true" position="-2.5 0.4 0.011" visible="false" scale="1 1 0">
          </a-box>
          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-9'
            material="src:icons/select.png;transparent:true" position="-5 0.4 0.011" visible="false" scale="1 1 0">
          </a-box>

          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-15'
            material="src:icons/select.png;transparent:true" position="-7.5 -2 0.011" visible="false" scale="1 1 0">
          </a-box>
          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-20'
            material="src:icons/select.png;transparent:true" position="5 -2 0.011" visible="false" scale="1 1 0">
          </a-box>
          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-19'
            material="src:icons/select.png;transparent:true" position="2.5 -2 0.011" visible="false" scale="1 1 0">
          </a-box>
          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-18'
            material="src:icons/select.png;transparent:true" position="0 -2 0.011" visible="false" scale="1 1 0">
          </a-box>
          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-17'
            material="src:icons/select.png;transparent:true" position="-2.5 -2 0.011" visible="false" scale="1 1 0">
          </a-box>
          <a-box geometry="primitive:plane;height:2.3;width:2.3" id='option-select-16'
            material="src:icons/select.png;transparent:true" position="-5 -2 0.011" visible="false" scale="1 1 0">
          </a-box>

          <!--Loaded Option-->
          <a-box geometry="height:2;width:2" id='option-1' material="src:icons/1.png;transparent:true"
            position="-7.5 2.8 0.032" visible="false" scale="1 1 0"></a-box>
          <a-box geometry="height:2;width:2" id='option-7' material="src:icons/7.png;transparent:true"
            position="7.5 2.8 0.032" visible="false" scale="1 1 0"></a-box>
          <a-box geometry="height:2;width:2" id='option-6' material="src:icons/6.png;transparent:true"
            position="5 2.8 0.032" visible="false" scale="1 1 0"></a-box>
          <a-box geometry="height:2;width:2" id='option-5' material="src:icons/5.png;transparent:true"
            position="2.5 2.8 0.032" visible="false" scale="1 1 0"></a-box>
          <a-box geometry="height:2;width:2" id='option-4' material="src:icons/4.png;transparent:true"
            position="0 2.8 0.032" visible="false" scale="1 1 0"></a-box>
          <a-box geometry="height:2;width:2" id='option-3' material="src:icons/3.png;transparent:true"
            position="-2.5 2.8 0.032" visible="false" scale="1 1 0"></a-box>
          <a-box geometry="height:2;width:2" id='option-2' material="src:icons/2.png;transparent:true"
            position="-5 2.8 0.032" visible="false" scale="1 1 0"></a-box>

          <a-box geometry="height:2;width:2" id='option-8' material="src:icons/8.png;transparent:true"
            position="-7.5 0.4 0.032" visible="false" scale="1 1 0"></a-box>
          <a-box geometry="height:2;width:2" id='option-14' material="src:icons/14.png;transparent:true"
            position="7.5 0.4 0.032" visible="false" scale="1 1 0"></a-box>
          <a-box geometry="height:2;width:2" id='option-13' material="src:icons/13.png;transparent:true"
            position="5 0.4 0.032" visible="false" scale="1 1 0"></a-box>
          <a-box geometry="height:2;width:2" id='option-12' material="src:icons/12.png;transparent:true"
            position="2.5 0.4 0.032" visible="false" scale="1 1 0"></a-box>
          <a-box geometry="height:2;width:2" id='option-11' material="src:icons/11.png;transparent:true"
            position="0 0.4 0.032" visible="false" scale="1 1 0"></a-box>
          <a-box geometry="height:2;width:2" id='option-10' material="src:icons/10.png;transparent:true"
            position="-2.5 0.4 0.032" visible="false" scale="1 1 0"></a-box>
          <a-box geometry="height:2;width:2" id='option-9' material="src:icons/9.png;transparent:true"
            position="-5 0.4 0.032" visible="false" scale="1 1 0"></a-box>

          <a-box geometry="height:2;width:2" id='option-15' material="src:icons/15.png;transparent:true"
            position="-7.5 -2 0.032" visible="false" scale="1 1 0"></a-box>
          <a-box geometry="height:2;width:2" id='option-20' material="src:icons/20.png;transparent:true"
            position="5 -2 0.032" visible="false" scale="1 1 0"></a-box>
          <a-box geometry="height:2;width:2" id='option-19' material="src:icons/19.png;transparent:true"
            position="2.5 -2 0.032" visible="false" scale="1 1 0"></a-box>
          <a-box geometry="height:2;width:2" id='option-18' material="src:icons/18.png;transparent:true"
            position="0 -2 0.032" visible="false" scale="1 1 0"></a-box>
          <a-box geometry="height:2;width:2" id='option-17' material="src:icons/17.png;transparent:true"
            position="-2.5 -2 0.032" visible="false" scale="1 1 0"></a-box>
          <a-box geometry="height:2;width:2" id='option-16' material="src:icons/16.png;transparent:true"
            position="-5 -2 0.032" visible="false" scale="1 1 0"></a-box>

          <a-entity id="ok" class="clickable" geometry="primitive:plane;width:1.5;height:0.5" rotation=""
            material="src:assets/images/submit.png;opacity:0.99;shader:flat" ok-close="" position="2000 2000 2000"
            scale="2.5 2.5 0.00001"></a-entity>
          <a-entity id="okDisabled" geometry="primitive:plane;width:1.5;height:0.5" rotation=""
            material="src:assets/images/submit_d.png;opacity:0.99" position="2000 2000 2000" scale="2.5 2.5 0.00001">
          </a-entity>
          <a-entity id="closeOptions" class="clickable" geometry="primitive:plane;width:1.5;height:0.5" rotation=""
            material="src:assets/images/close.png;opacity:0.99;shader:flat" ok-close="" position="2000 2000 2000"
            scale="2.5 2.5 0.00001"></a-entity>
        </a-plane>

        <a-text id="exitmsg"
          text="anchor:left;width:16;align:center;font:kelsonsans;height:7;tabSize:1;wrapCount:40;lineHeight:40;baseline:top"
          value="" rotation="" position="-7.5 2.8 0.032" visible="false"></a-text>


        <a-entity id="submit" class="clickable" geometry="primitive:plane;width:1.5;height:0.5" rotation=""
          material="src:assets/images/submit.png;opacity:0.99;shader:flat" submit-close="" position="2000 2000 2000"
          scale="2.5 2.5 0.00001"></a-entity>
        <a-entity id="submitDisabled" geometry="primitive:plane;width:1.5;height:0.5" rotation=""
          material="src:assets/images/submit_d.png;opacity:0.99" position="2000 2000 2000" scale="2.5 2.5 0.00001">
        </a-entity>
        <a-entity id="close" class="clickable" geometry="primitive:plane;width:1.5;height:0.5" rotation=""
          material="src:assets/images/close.png;opacity:0.99;shader:flat" submit-close="" position="2000 2000 2000"
          scale="2.5 2.5 0.00001"></a-entity>
      </a-plane>
    </a-plane>

    <a-plane id="panelScreen" material="side:back;opacity:0;transparent:true" visible="false" look-at="src: #mainCam"
      geometry="height:7;width:19" position="2000 2000 2000" scale="1.4 1.4 0">
      <a-plane id="scoreScreen" color="#000000" material="shader:flat;flatShading:true;side:double;opacity:0.8;transparent:true" visible="true"
        geometry="height:7;width:19" position="0 0 0" scale="0 0 0">
      </a-plane>
      <a-plane id="scoreScreen2" material="side:double;opacity:0;transparent:true" visible="true"
        geometry="height:12;width:18" position="0 0 500" scale="0 0 0">
        <a-text id="congratulations"
          text="anchor:left;width:16;align:center;font:kelsonsans;height:7;tabSize:1;wrapCount:60;lineHeight:40;baseline:top"
          value="" rotation="" position="-7.876 2.00966 0.45166"></a-text>
      </a-plane>
    </a-plane>

    <a-plane id="getScore" class="clickable" material="src:assets/images/submit.png;transparent:true"
      geometry="height:2.5;width:5.2" shader="flat" shadow=""
      position="-32.01005367520824 2.0657531291669415 -3.2666825005995603" rotation="0 0 0" look-at="src:#main-camera"
      show-score=""></a-plane>

    <!--    Audio    -->
    <a-entity id="audio1" sound="src: #sound" position="0 1 0"></a-entity>
    <!--     sky-->
    <a-sky id="space" src="#office"></a-sky>
  </a-scene>

  <script src="assets/js/jquery-3.3.1.min.js"></script>
  <script src="../verbose/common.js"></script>
  <script src="assets/js/app.js"></script>
  <script src="../verbose/SplashScreen.js"></script>
</body>

</html>