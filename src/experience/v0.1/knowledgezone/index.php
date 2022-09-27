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


  <link rel="icon" href="assets/images/favicon.png">
  <script src="assets/js/jquery-3.3.1.min.js"></script>
  <script src="assets/js/bootstrap.min.js"></script>
  <script src="assets/js/aframe-click-drag-component.min.js"></script>
  <script src="assets/js/aframe-v1.0.4.min.js"></script>

  <link rel="stylesheet" href="assets/css/bootstrap.min.css">
  <link rel="stylesheet" href="../verbose/css/SplashScreenToogleButton.css">
  <link rel="stylesheet" type="text/css" href="../verbose/splash.css">

  <script src="../verbose/scripts/TinCanJS/build/tincan.js"></script>
  <script src="../verbose/scripts/base64.js"></script>
  <script src="../verbose/trackingData.js"></script>
  <script src="../verbose/config.js"></script>
  <script src="../verbose/verboseLaunch.js"></script>
  <link rel="stylesheet" href="../verbose/css/fa-v5.css">

  <meta name="google-signin-client_id"
    content="227903861079-q9gj2q8n6p1qmfkoo6eec1esqhq6p9u7.apps.googleusercontent.com">
  <script src="https://apis.google.com/js/platform.js?onload=onLoadGoogleCallback" async defer></script>
  <script src="../verbose/aframe-svgfile-component.js"></script>


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
  <a-scene embeded shadow="type:pcfsoft" id="aScene" loading-screen="enabled:false">
    <!-- <a-entity id="firstrotation" camera look-controls="reverseTouchDrag:true" wasd-controls-enabled="false"
      position="-0.85 0.303 0" rotation="0 90 0"
      animation="property: rotation; to: 0 -360 0; dur: 100000;easing:linear;loop:true"
      animation__one="property: rotation;to: 0 360 0; dur: 2000;easing:easeInOutCirc;enabled:false"
      animation__video="property: rotation;to: 0 0 0; dur: 1000;enabled:false;easing:linear;">
      <a-entity id="mainCursor" cursor="rayOrigin:mouse" raycaster="objects: .clickable" position="0 0 -1" scale="0 0 0"
        geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03" material="color: red; shader: flat" sky>
        <a-entity cursor="fuse: true; fuseTimeout: 1150" visible="false" raycaster="objects: .cursorEntry"
          position="0 0 -1" scale="0.02 0.02 0.02" geometry="primitive: ring" material="color: #ff0000; shader: flat">
        </a-entity>
      </a-entity>
    </a-entity> -->
    <a-entity id="cameraId" animation="property: rotation; to: 0 -360 0; dur: 100000;easing:linear;loop:true"
      animation__one="property: rotation;to: 0 360 0; dur: 2000;easing:easeInOutCirc;enabled:false"
      animation__video="property: rotation;to: 0 0 0; dur: 1000;enabled:false;easing:linear;" position="0 1 0">
      <a-entity id="CamEntity">
        <a-entity id="firstrotation" camera look-controls="reverseTouchDrag:true" wasd-controls-enabled="false"
          position="-0.85 0.303 0" rotation="0 90 0">
          <a-entity id="mainCursor" cursor="rayOrigin:mouse" raycaster="objects: .clickable" position="0 0 -1"
            scale="0 0 0" geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: red; shader: flat" sky>
            <a-entity cursor="fuse: true; fuseTimeout: 1150" visible="false" raycaster="objects: .cursorEntry"
              position="0 0 -1" scale="0.02 0.02 0.02" geometry="primitive: ring"
              material="color: #ff0000; shader: flat">
            </a-entity>

          </a-entity>
        </a-entity>
      </a-entity>
    </a-entity>

    <a-assets id="assetId">

      <a-mixin id="floorMat" material="color:#BBB"></a-mixin>
      <img id="office" src="assets/images/sky.jpg">
      <a-asset-item id="cuberoom-obj" src="assets/images/CubeRoom.obj"></a-asset-item>
      <img id="cuberoom-texture" src="assets/images/decor/natural.jpg">
      <img id="scratchImage" src="assets/images/textcutbtn.png">
      <video id="topicvideo" src="assets/videos/test.mp4" crossorigin="anonymous" loop="true"></video>
      <a-mixin id="board" geometry="depth: .01; height:1; width: 6.2"
        material="src:assets/images/woodenbtn.png;opacity:0.99" pivot="0 0.01 0" position="0 -1 0"></a-mixin>
      <a-mixin id="unhinge" animation="property: rotation; to: 0 0 0; dur: 2000"></a-mixin>
      <audio id="blip1">
        <source src="assets/videos/click.wav" type="audio/wav">
        </audio>
    </a-assets>

    <a-entity obj-model="obj:assets/images/CubeRoom.obj" material="metalness:0.6;src:assets/images/decor/natural.jpg"
      position="-0.43004353980647725 -2.073 0.03519584671299558" rotation="0 90 0" scale="1.5 1.5 1.5" id="cuberoom">
    </a-entity>

    <!-- Question panel Background image -->
    <a-image visible="true" id="flex1" src="assets/images/bg.png" geometry="height:3;width:6"
      position="6.75 1.0312388739393026 0.2309748624510259" rotation="0 90 0" scale="1.8 2 0.7" material=""></a-image>

    <!--MainScreen Start-->
    <a-entity id="mainScreen" position="1.758 -0.311 0">
      <a-entity id="questionText" value="questionText" text="width: 10; tabSize: 1; color: #fff; wrapCount: 0; wrapPixels: 1800; whiteSpace: pre; lineHeight: 45; baseline: top; value: In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content." position="4.966 4.16637 0.11415" rotation="0 -90 0" sky="" scale="0 0 0" visible=""></a-entity>
      <a-entity id="option0" value=""
        text="anchor:center;width:4;tabSize:1;height:5;color:#fff;wrapCount:0;wrapPixels:900;whiteSpace:pre;lineHeight:60;baseline:top;value:option"
        visible="false" position="4.966 2.481 -2.76" rotation="0 -90 0" sky="" scale=""></a-entity>
      <a-entity id="option1" value=""
        text="anchor:center;width:4;tabSize:1;height:5;color:#fff;lineHeight:60;wrapCount:0;wrapPixels:900;baseline:top;value:option"
        visible="false" position="4.966 2.48119 2.227" rotation="0 -90 0" sky="" scale=""></a-entity>
      <a-entity id="option2"
        text="anchor:center;width:4;tabSize:1;height:5;color:#fff;lineHeight:60;wrapCount:0;wrapPixels:900;baseline:top;value:option"
        visible="false" position="4.966 1.2685708549991848 -2.7579280007383216" rotation="0 -90 0" sky="" scale="">
      </a-entity>
      <a-entity id="option3"
        text="anchor:center;width:4;height:5;tabSize:1;color:#fff;wrapCount:0;wrapPixels:900;lineHeight:60;baseline:top;value:option"
        visible="false" position="4.966 1.269 2.227" rotation="0 -90 0" sky="" scale=""> </a-entity>

      <a-entity id="1" position="200 200 200" rotation="0 -90 0" geometry="height:5;width:3.8" class="clickable"
        material="opacity:0;transparent:true;color:#FFFFFF" option-click="" sky="" scale="1.02 0.14 0.00001"
        >
      </a-entity>
      <a-entity id="2" position="200 200 200" rotation="0 -90 0" geometry="height:5;width:3.8" class="clickable"
        material="opacity:0;transparent:true;color:#FFFFFF" option-click="" sky="" scale="1.02 0.14 0.00001"
        >
      </a-entity>
      <a-entity id="3" position="200 200 200" rotation="0 -90 0" geometry="height:5;width:3.8" class="clickable"
        material="opacity:0;transparent:true;color:#FFFFFF" option-click="" sky="" scale="1.02 0.14 0.00001"
        >
      </a-entity>
      <a-entity id="4" position="200 200 200" rotation="0 -90 0" geometry="height:5;width:3.8" class="clickable"
        material="opacity:0;transparent:true;color:#FFFFFF" option-click="" sky="" scale="1.02 0.14 0.00001"
        >
      </a-entity>
      <a-text id="feedback" visible="false" value=""
        text="anchor:center;width:9;value:;height:5;tabSize:1;color:#ffff00;wrapCount:74.79;lineHeight:60;baseline:top;font:assets/fonts/OpenSans-Italic.json;shader:msdf"
        position="4.966 -0.146  -0.24285051571172755" rotation="0 -90 0" sky="" scale=""> </a-text>
      <a-entity id="submit" class="clickable" submit="" geometry="primitive:plane;width:1.5;height:0.5"
        rotation="0 -90 0" material="src:assets/images/submit.png;opacity:0.99;shader:flat" sky="" position="20 20 20"
        ></a-entity>
      <a-entity id="next" class="clickable" submit="" geometry="primitive:plane;width:1.5;height:0.5" rotation="0 -90 0"
        material="src:assets/images/next.png;opacity:0.99;shader:flat" sky="" position="20 20 20"
        ></a-entity>
      <a-entity id="submitDisabled" submit="" geometry="primitive:plane;width:1.5;height:0.5" rotation="0 -90 0"
        material="src:assets/images/submit_d.png;opacity:0.99" position="4.919 -1.27 -0.667"></a-entity>
      <a-entity id="nextDisabled" submit="" geometry="primitive:plane;width:1.5;height:0.5" rotation="0 -90 0"
        material="src:assets/images/next_d.png;opacity:0.99" position="4.919 -1.27 1.104"></a-entity>
    </a-entity>
    <!--MainScreen End-->

    <!-- Video player location -->
    <a-entity id="videoPlayer" material="shader:flat;src:#topicvideo" width="4" height="3"
      geometry="primitive:plane;width:215;height:140" rotation="" visible="" position="-0.80453 1.190 -7.35768"
      scale="0.06 0.046 0.00001"></a-entity>

    <a-entity id="playVideo" class="clickable" crossorigin="anonymous" geometry="primitive:plane;width:0.71;height:0.4"
      rotation="" material="src:assets/images/pause.png;opacity:0.99;shader:flat" position="-5.78066 -1.41447 -7.243"
      play-pause="" scale="0.99 1 1"></a-entity>

    <a-entity id="restartVideo" class="clickable" geometry="primitive:plane;width:0.71;height:0.4" rotation=""
      material="src:assets/images/startovericon.png;opacity:0.99;shader:flat" position="-6.66663 -1.41447 -7.243"
      crossorigin="anonymous" restart-video="" scale="0.99 1 1"></a-entity>

    <a-image id="startQuiz" class="clickable" crossorigin="anonymous" src="" visible="" geometry="width:1.5;height:0.5"
      rotation="" material="" position="2000 2000 2000" ></a-image>

    <!-- Quiz Topics panel location -->

    <a-image id="quizTopicsPanel" cursor-listener rotation="0 180 0" position="-0.291 1.12407 7.358"
      scale="0.530 0.535 0.5" crossorigin="anonymous" src="assets/images/blackboard.jpg"
      geometry="height: 12; width: 25" material="" class="cursorEntry"></a-image>

      <a-entity id="topicsPanel"
                text="font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;width: 12.5; color: #ffff00; wrapCount: 80; value:Instruction; letterSpacing: 1; tabSize: 1; whiteSpace: pre"
                position="-0.406 3.766 7.34927" rotation="0 180 0" scale="" visible="false"></a-entity>


                <a-entity id="topicTitle" position="-2.650 3.091 7.159" rotation="0 180 0" scale=""
                text="font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;width:  8;  color:  #fff;  value: topic title;  align:  center;  letterSpacing: 0.5;  tabSize:  1;  wrapCount:  55"
                visible="false">
              </a-entity>

    <a-entity id="topicDescription" position="-2.7746 2.7 7.153" rotation="0 180 0" scale="" text="width: 7.5; color: white; wrapCount: 55; baseline: top; letterSpacing: 0.5; tabSize: 1; value: Description" visible="false">
    </a-entity>

    <a-image id="topicDescriptionImage" baseline:top="" position="-2.75823 0.71123 7.193" scale="" rotation="0 180 0"
      visible="false" geometry="height: 4; width: 7"></a-image>


    <a-entity id="proceed" class="clickable" geometry="primitive:plane;width:1.5;height:0.4" rotation="0 180 0"
      material="src:assets/images/continuebtn.png;opacity:0.99;shader:flat" position="-5.655 -1.599 7.229" visible="false"
      startvideo="" scale="1 1 1"></a-entity>

    <a-image visible="true" id="flex2" src="assets/images/score.png" crossorigin="anonymous" geometry="height:3;width:6"
      position="-7.80213 1.107 -1.24304" rotation="0 90 0" scale="1.6 2.11 0.7" material=""></a-image>

    <a-image id="topicWallHeading" position="4.95534 4.793 7.427" rotation="0 180 0" a-image="" scale="3 0.87 0.00001">
    </a-image>
    <a-image id="quizWallHeading" position="6.94653 4.588 -3.793" rotation="0 270 0" a-image="" scale="3 0.87 0.1">
    </a-image>
    <a-image id="scoreWallHeading" position="-7.82676 4.740 2.03197" rotation="0 90 0" a-image="" scale="3 0.87 0.18">
    </a-image>
    <a-image id="mediaWallHeading" position="-5.778 4.922 -7.462" rotation="" a-image="" scale="3 0.87 0.00001">
    </a-image>

    <!--ScoreScreen Start-->
    <a-entity id="scoreScreen" position="-1.16408 -0.429 -0.68834" rotation="0 180 0" visible="false">
      <a-text visible="" id="heading" value="Congratulations!"
        text="anchor:center;width:9;align:center;font:kelsonsans;height:5;tabSize:1;wrapCount:30"
        position="5.46681 3.63259 0.28256" rotation="0 -90 0"></a-text>
      <a-text visible="" id="subheading" value=""
        text="anchor:center;width:8;font:kelsonsans;height:5;tabSize:1;align:center;wrapCount:60"
        position="5.976 2.940 0.440" rotation="0 -90 0"></a-text>
      <a-text visible="" id="endUserMsg" value="Thank you for the Quiz"
        text="anchor:center;width:8;font:kelsonsans;height:5;tabSize:1;wrapCount:59.98;align:center;baseline:top"
        position="4.75 -0.08654 0.15204" rotation="0 -90 0"></a-text>
      <a-text visible="false" id="pointScreen" value="Thank you For the Quiz"
        text="anchor:center;width:9;value:Points:;font:kelsonsans;height:5;tabSize:1;wrapCount:59.98"
        position="4.75 0.573411424367809 2.7109682146068335" rotation="0 -90 0"></a-text>
      <a-text visible="false" id="total2" value="2"
        text="anchor:center;width:10;align:center;font:kelsonsans;height:5;tabSize:1"
        position="4.75 2.276896033547815 -0.18970303213011985" rotation="0 -90 0"></a-text>
      <a-text visible="false" id="total3" value="3"
        text="anchor:center;width:10;align:center;font:kelsonsans;height:5;tabSize:1"
        position="4.75 1.712380245063678 0.10634100061154483" rotation="0 -90 0"></a-text>
      <a-text visible="false" id="total4" value=""
        text="anchor:center;width:8;value:=;align:center;font:kelsonsans;height:5;tabSize:1"
        position="4.75 1.721 -0.19394903082242146" rotation="0 -90 0"></a-text>
      <a-text visible="false" id="total5" value="20"
        text="anchor:center;width:20;align:center;color:#ff0000;font:kelsonsans;height:5;tabSize:1"
        position="4.787 0.6656751757759267 0.08424512916176641" rotation="0 -90.01166961505233 0"></a-text>
      <a-entity visible="false" id="slash" position="4.75 1.9749794556743967 0.005587378530517828"
        rotation="-1.6783050610352221 -91.48818169867035 38.57637682064517" scale="1 0.03 0.00001"
        geometry="primitive:plane" material=""></a-entity>
      <a-entity geometry="primitive:ring;radiusOuter:0.9" position="4.753 1.7279453672712204 0" rotation="0 -90 0"
        scale="" material="" visible="false"></a-entity>
    </a-entity>

    <!--ScoreScreen End-->

    <a-image visible="false" id="flex3" src="assets/images/score.png" geometry="height:3;width:6"
      position="6.94236 0.95961 0.28422" rotation="0 90 0" scale="1.860 2.11 0.7" material=""></a-image>


    <a-entity id="singleQuiz" position="1.366 1.300 0.134" rotation="" scale="0.72 0.5 1.04">


      <a-text id="endSingleQuizMsg" value="Great!!Choose the next topic"
      text="anchor: center; width: 9; font: kelsonsans; height: 7; tabSize: 1; wrapCount: 50; align: center; baseline: top; letterSpacing: 2"
        position="7.50044 4.6794 0.19653" rotation="0 -90 0" visible="false"></a-text>

      <a-entity id="folds" position="3.176 4.525 6.742" scale=""
        animation__position="attribute: position; to: 3.176 -5 6.742; dur: 2000" visible="false"
        animation__rotation="property: rotation; from: 0 0 0; to: 0 180 0; dur: 3000">
        <!-- <a-plane id="tt0" rotation="-10 0 0" animation="delay: 1000">
            <a-plane id="tt1" rotation="180 0" animation="delay: 150" >
              <a-plane id="tt2" rotation="180 0" animation="delay: 250" >
                <a-plane id="tt3" rotation="180 0" animation="delay: 350" >
                  <a-plane id="tt4" rotation="180 0" animation="delay: 450" >
                    <a-plane id="tt5" rotation="180 0" animation="delay: 550" >
                      <a-plane id="tt6" rotation="180 0" animation="delay: 650" >
                        <a-plane id="tt7" rotation="180 0" animation="delay: 750" >
                          <a-plane id="tt8" rotation="180 0" animation="delay: 850" >
                            <a-plane id="tt9" rotation="180 0" animation="delay: 950">
                            </a-plane>
                          </a-plane>
                        </a-plane>
                      </a-plane>
                    </a-plane>
                  </a-plane>
                </a-plane>
              </a-plane>
            </a-plane>
          </a-plane> -->
      </a-entity>

      <a-entity id="t0" position="3.176 3.485 6.742" rotation="0 180 0" geometry="height: 5; width: 3.8"
        material="opacity: 0.5; color: #FFFFFF" scale="1.7 0.15 0.00001" visible="false" >
      </a-entity>

      <a-entity id="t1" position="3.176 2.458 6.742" rotation="0 180 0" geometry="height:5;width:3.8"
        material="opacity:0.5;color:#FFFFFF" scale="1.7 0.15 0.00001" visible="false" >
      </a-entity>

      <a-entity id="t2" position="3.176 1.451 6.742" rotation="0 180 0" geometry="height:5;width:3.8"
        material="opacity:0.5;color:#FFFFFF" scale="1.7 0.15 0.00001" visible="false" >
      </a-entity>

      <a-entity id="t3" position="3.176 0.467 6.742" rotation="0 180 0" geometry="height:5;width:3.8"
        material="opacity:0.5;color:#FFFFFF" scale="1.7 0.15 0.00001" visible="false" >
      </a-entity>

      <a-entity id="t4" position="3.176 -0.539 6.742" rotation="0 180 0" geometry="height:5;width:3.8"
        material="opacity:0.5;color:#FFFFFF" scale="1.7 0.15 0.00001" visible="false" >
      </a-entity>

      <a-entity id="t5" position="3.176 -1.512 6.742" rotation="0 180 0" geometry="height:5;width:3.8"
        material="opacity:0.5;color:#FFFFFF" scale="1.7 0.15 0.00001" visible="false" >
      </a-entity>

      <a-entity id="t6" position="3.176 -2.551 6.742" rotation="0 180 0" geometry="height:5;width:3.8"
        material="opacity:0.5;color:#FFFFFF" scale="1.7 0.15 0.00001" visible="false" >
      </a-entity>

      <a-entity id="t7" position="3.176 -3.608 6.742" rotation="0 180 0" geometry="height:5;width:3.8"
        material="opacity:0.5;color:#FFFFFF" scale="1.7 0.15 0.00001" visible="false" >
      </a-entity>

      <a-entity id="t8" position="3.176 -4.567 6.742" rotation="0 180 0" geometry="height:5;width:3.8"
        material="opacity:0.5;color:#FFFFFF" scale="1.7 0.15 0.00001" visible="false" >
      </a-entity>

      <a-entity id="t9" position="3.176 -5.614 6.742" rotation="0 180 0" geometry="height:5;width:3.8"
        material="opacity:0.5;color:#FFFFFF" scale="1.7 0.15 0.00001" visible="false" >
      </a-entity>

      <a-image id="imaget0" position="3.01771 3.329 6.572" rotation="0 180 0" geometry="height:5;width:3.8" a-image=""
        scale="0 0 0 " src="#scratchImage" visible="false" material=""></a-image>

      <a-image id="imaget1" position="3.01771 2.364 6.572" rotation="0 180 0" geometry="height:5;width:3.8" a-image=""
        scale="0 0 0 " src="#scratchImage" visible="false"></a-image>

      <a-image id="imaget2" position="3.01771 1.363 6.572" rotation="0 180 0" geometry="height:5;width:3.8" a-image=""
        scale="0 0 0 " src="#scratchImage" visible="false"></a-image>

      <a-image id="imaget3" position="3.01771 0.364 6.572" rotation="0 180 0" geometry="height:5;width:3.8" a-image=""
        scale="0 0 0 " src="#scratchImage" visible="false"></a-image>

      <a-image id="imaget4" position="3.01771 -0.585 6.572" rotation="0 180 0" geometry="height:5;width:3.8" a-image=""
        scale="0 0 0 " src="#scratchImage" visible="false"></a-image>

      <a-image id="imaget5" position="3.01771 -1.581 6.572" rotation="0 180 0" geometry="height:5;width:3.8" a-image=""
        scale="0 0 0 " src="#scratchImage" visible="false"></a-image>

      <a-image id="imaget6" position="3.01771 -2.564 6.572" rotation="0 180 0" geometry="height:5;width:3.8" a-image=""
        scale="0 0 0 " src="#scratchImage" visible="false"></a-image>

      <a-image id="imaget7" position="3.01771 -3.550 6.572" rotation="0 180 0" geometry="height:5;width:3.8" a-image=""
        scale="0 0 0 " src="#scratchImage" visible="false"></a-image>

      <a-image id="imaget8" position="3.01771 -4.530 6.572" rotation="0 180 0" geometry="height:5;width:3.8" a-image=""
        scale="0 0 0 " src="#scratchImage" visible="false"></a-image>

      <a-image id="imaget9" position="3.01771 -5.565 6.572" rotation="0 180 0" geometry="height:5;width:3.8"
        scale="0 0 0 " src="#scratchImage" visible="false"></a-image>

    </a-entity>
    <a-entity light="type:ambient;intensity:1" visible=""></a-entity>
    <a-entity light="intensity: 0.6" position="-0.054 7.17403 -0.014" visible=""></a-entity>
  </a-scene>

  <script src="../verbose/common.js"></script>
  <script src="assets/js/app.js"></script>
  <script src="../verbose/SplashScreen.js"></script>
</body>

</html>