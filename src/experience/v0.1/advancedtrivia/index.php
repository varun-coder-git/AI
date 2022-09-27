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

    <link rel="icon" href="/act/favicon.png" />
    <link rel="icon" href="./assets/images/favicon.png" />
    <script src="./assets/js/aframe-v1.0.4.min.js"></script>
    <script src="assets/js/aframe-click-drag-component.min.js"></script>
    <link rel="stylesheet" href="./assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/act/v0.1/verbose/css/SplashScreenToogleButton.css" />
    <link rel="stylesheet" type="text/css" href="/act/v0.1/verbose/splash.css" />

    <script src="/act/v0.1/verbose/scripts/TinCanJS/build/tincan.js"></script>
    <script src="/act/v0.1/verbose/scripts/base64.js"></script>
    <script src="/act/v0.1/verbose/trackingData.js"></script>
    <script src="/act/v0.1/verbose/config.js"></script>
    <script src="/act/v0.1/verbose/verboseLaunch.js"></script>
    <link rel="stylesheet" href="/act/v0.1/verbose/css/fa-v5.css" />
    <meta
      name="google-signin-client_id"
      content="227903861079-q9gj2q8n6p1qmfkoo6eec1esqhq6p9u7.apps.googleusercontent.com"
    />
    <script
      src="https://apis.google.com/js/platform.js?onload=onLoadGoogleCallback"
      async
      defer
    ></script>
    <script src="./assets/js/advanceTrivia.json"></script>

    <script src="/act/v0.1/verbose/aframe-svgfile-component.js"></script>
    <script src="/act/v0.1/advancedtrivia/assets/js/jquery-3.3.1.min.js"></script>
    <script src="/act/v0.1/advancedtrivia/assets/js/apppub.js"></script>
  </head>
  <body class="" id="mainBody">
    <div
      id="loaderq"
      class="lds-roller lds-roller-pos-assets-popup"
      style="position: absolute; z-index: 9999"
    >
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
        <div
          class="inner-overloy hidden-login"
          style="overflow-y: auto"
          id="innerInfo"
        >
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div class="row">
                <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                  <label id="titleText" class="titleheader">Loading..</label>
                  <label id="titleDescription"></label>
                </div>
                <div
                  id="toogleButtonStyle"
                  class="col-lg-2 col-md-2 col-sm-2 col-xs-2"
                >
                  <img id="qrcode" src="" />
                  <div class="onoffswitch1 mt-2 ml-3" id="divOnOff">
                    <input
                      type="checkbox"
                      name="onoffswitch1"
                      class="onoffswitch1-checkbox"
                      id="myonoffswitch1"
                      checked
                    />
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
                  <img
                    src="assets/images/logo.png"
                    id="splashLogo"
                    class="logo "
                  />
                </div>
              </div>
              <div
                class="row text-align-center button-center-top mt-4"
                id="buttonTop"
              >
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <label id="loading"><b>Loading...</b></label>
                  <button class="button disabled " id="start_experience">
                    Enter
                  </button>
                  <div id="loginForm" style="display: flex">
                    <div
                      class="row"
                      style="margin-left: 0px;width: 100%;margin-right: 0px;"
                    >
                      <div class="col-12">
                        <div
                          class="row"
                          style="margin-left: 0px;width: 100%;margin-right: 0px;"
                        >
                          <div class="col-lg-6 col-md-6 col-sm-6 col-12">
                            <button
                              id="googleSignIn"
                              class="btn btn-google-color mx-auto signin-google-facebook-button mb-2"
                              type="button"
                            >
                              <i aria-hidden="true" class="fab fa-google"></i>
                              Google
                            </button>
                          </div>
                          <div class="col-lg-6 col-md-6 col-sm-6 col-12">
                            <button
                              class="btn btn-facebook-color mx-auto signin-google-facebook-button mb-2"
                              type="button"
                              onclick="facebookLogin()"
                            >
                              <i
                                aria-hidden="true"
                                class="fab fa-facebook-f"
                              ></i>
                              Facebook
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 mb-2">Or</div>
                      <div class="col-12">
                        <div
                          class="row"
                          style="margin-left: 0px;width: 100%;margin-right: 0px;"
                        >
                          <div class="col-lg-2 col-md-2 col-sm-2 col-12"></div>
                          <div class="col-lg-8 col-md-8 col-sm-8 col-12">
                            <form onsubmit="UserLogin(1); return false">
                              <input
                                type="email"
                                class="form-control width-size mb-2"
                                id="email"
                                placeholder="Email"
                                name="uname"
                                required
                              />

                              <input
                                type="password"
                                class="form-control width-size mb-2"
                                id="psw"
                                placeholder="Password"
                                name="psw"
                                required
                              />

                              <button type="submit" class="button">
                                Login
                              </button>
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
    <div class="inactiveMessage" id="myDiv">
      This Experience is no longer Active in this room.
    </div>
    <a-scene embeded shadow="type:pcfsoft" id="aScene" loading-screen="enabled:false">
      <a-assets>
        <a-mixin id="floorMat" material="color:#BBB"></a-mixin>
        <img id="office" src="./assets/images/sky.jpg" />
        <a-asset-item
          id="cuberoom-obj"
          src="/act/v0.1/quiz/assets/images/CubeRoom.obj"
        ></a-asset-item>
        <img
          id="cuberoom-texture"
          src="/act/v0.1/quiz/assets/images/default_bg.png"
        />
        <video
          id="customVideo1"
          autoplay="false"
          loop="false"
          src="/act/v0.1/storypoint/assets/videos/test.mp4"
          crossorigin="anonymous"
          onended="westVideoEnd()"
        ></video>
        <video
          id="customVideo2"
          autoplay="false"
          loop="false"
          src="/act/v0.1/storypoint/assets/videos/test.mp4"
          crossorigin="anonymous"
          onended="eastVideoEnd()"
        ></video>
        <audio id="audioEntity1" src="" loop="false" autoplay="false"></audio>
        
      <audio id="audioEntity2" src="" loop="false" autoplay="false"></audio>
      </a-assets>

      <a-sky
        id="sky"
        src="./assets/images/sky.jpg"
        rotation="0 90 0"
        geometry=""
      ></a-sky>
      <a-entity
        id="Table_lamp"
        obj-model="mtl:./assets/images/obj/table_lamp.mtl;obj:./assets/images/obj/table_lamp.obj"
        position="-7.310547841589662 -0.02891118556281952 -1.3984058042258816"
        rotation="0 -90 0"
        scale="0.3 0.3 0.3"
      >
      </a-entity>
      <a-entity
        id="oldJug"
        obj-model="mtl:./assets/images/obj/old_jar.mtl;obj:./assets/images/obj/old_jar.obj"
        position="-7.199583779099295 0.2538698847168046 2.209038343314762"
        rotation="0 -90 0"
        scale="0.76 0.76 0.76"
      >
      </a-entity>
      <a-entity
        id="table_2"
        obj-model="mtl:./assets/images/obj/tvStand.mtl;obj:./assets/images/obj/tvStand.obj"
        position="-7.053 -2.073 0.4158480469645802"
        rotation="0 90 0"
        scale="0.04 0.04 0.04"
      ></a-entity>
      <a-entity
        id="lamp"
        obj-model="obj:url(./assets/images/living_lamp.obj);mtl:url(./assets/images/living_lamp.mtl);"
        position="6.229 -2.073 6.555"
        rotation="0 -90 0"
        scale="2.5 2.5 2.5"
      ></a-entity>
      <a-entity
        id="lamp-2"
        obj-model="obj:./assets/images/living_lamp.obj;mtl:./assets/images/living_lamp.mtl"
        position="6.229 -2.073 -6.623279691595794"
        rotation="0 -90 0"
        scale="2.5 2.5 2.5"
      ></a-entity>
      <a-entity
        id="sofa"
        obj-model="obj:./assets/images/sofa1.obj"
        material="metalness:0.6;src:./assets/images/pantalla_color.jpg"
        position="-1.630 -1.854 2.096"
        rotation="0 90 0"
        scale="0.015 0.020 0.020"
      ></a-entity>
      <a-entity
        id="table"
        shadow="cast:true;receive:true"
        obj-model="mtl:./assets/images/table.mtl;obj:./assets/images/table.obj"
        position="1.944 -1.943 0.150"
        rotation="0 -90 0"
        scale="-0.024 0.022 0.022"
      ></a-entity>
      <a-entity
        obj-model="obj:./assets/images/CubeRoom.obj"
        material="metalness:0.6;src:"
        position="-0.43004353980647725 -2.073 0.03519584671299558"
        rotation="0 90 0"
        scale="1.5 1.5 1.5"
        id="cuberoom"
      >
      </a-entity>

      <a-entity
        light="intensity:15;color:#ffffff;decay:10;distance:20;penumbra:1;type:spot;groundColor:#ffffff;angle:20;shadowCameraFar:1000"
        position="5.928290865401249 1.55 -6.017450637815735"
        rotation="-90 0 0"
        light-shadow=""
        visible=""
      ></a-entity>
      <a-entity
        light="intensity:15;color:#ffffff;decay:10;distance:20;penumbra:1;type:spot;groundColor:#ffffff;angle:20;shadowCameraFar:1000"
        position="5.959 1.55 6.824"
        rotation="-90 0 0"
        light-shadow
      ></a-entity>
      <a-entity light="type: hemisphere; color: #FFF; intensity: 1.2" position="2 20 0" light-shadow >
      </a-entity>
      <a-entity id="cameraId" animation="property: rotation; to: 0 -360 0; dur: 100000;easing:linear;loop:true"
      animation__one="property: rotation;to: 0 360 0; dur: 2000;easing:easeInOutCirc;enabled:false">
      <a-entity id="CamEntity">
        <a-entity id="firstrotation" camera look-controls="reverseTouchDrag:true" wasd-controls-enabled="false" position="-0.85 0.303 0">
          <a-entity cursor="fuse: true; fuseTimeout: 1150" visible="false" raycaster="objects: .cursorEntry"
          position="0 0 -1" scale="0.02 0.02 0.02" geometry="primitive: ring" material="color: #ff0000; shader: flat">
          </a-entity>
          <a-entity cursor="fuse: true; fuseTimeout: 1150" visible="false" raycaster="objects: .cursorEntry1" position="0 0 -1" scale="0.02 0.02 0.02" geometry="primitive: ring" material="color: #ff0000; shader: flat">
          </a-entity>
          <a-entity id="cursor" cursor="rayOrigin:mouse" raycaster="objects: .clickable" position="0 0 -1"
            scale="0 0 0" geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"	material="color: red; shader: flat" sky>
                    
            <!-- <a-entity id="cursorImage" svgfile="svgFile:assets/images/viewfinder.svg; width:0.012;opacity:1; "position="-0.054 0.044 -0.014" material="shader: flat;" scale="1 1 1"></a-entity> -->
          </a-entity>
        </a-entity>
      </a-entity>
    </a-entity>

      <a-image
        visible="true"
        id="flex1"
        src="./assets/images/bg.png"
        geometry="height:3;width:6"
        position="6.75 1.0312388739393026 0.2309748624510259"
        rotation="0 90 0"
        scale="1.8 2 0.7"
        material=""
      ></a-image>
      <!-- <a-image visible="false" id="flex2" src="./assets/images/bg.png" geometry="height:3;width:6" position="6.75 1.0312388739393026 0.2309748624510259"
      rotation="0 90 0" scale="1.8 2 0.7" material=""></a-image> -->
      <!--MainScreen Start-->
      <a-entity id="mainScreen" position="1.758 -0.311 0">
        <a-entity id="questionText" text="width: 10.5; value: :Question will appear here; wrapCount: 89; lineHeight: 60; height: 5; baseline: top" position="4.966 4.084365795823561 0.23130820017334597" rotation="0 -90 0" sky=""  visible="false"></a-entity>
        <a-entity id="option0" value=""
          text="anchor:center;width:4;tabSize:1;height:5;color:#fff;wrapCount:0;wrapPixels:900;whiteSpace:pre;lineHeight:60;baseline:top;value:option" visible="false"
          position="4.966 2.481 -2.76" rotation="0 -90 0" sky="" scale=""></a-entity>
        <a-entity id="option1" value=""
          text="anchor:center;width:4;tabSize:1;height:5;color:#fff;lineHeight:60;wrapCount:0;wrapPixels:900;baseline:top;value:option" visible="false"
          position="4.966 2.481 2.227" rotation="0 -90 0" sky="" scale=""></a-entity>
        <a-entity id="option2"
          text="anchor:center;width:4;tabSize:1;height:5;color:#fff;lineHeight:60;wrapCount:0;wrapPixels:900;baseline:top;value:option" visible="false"
          position="4.966 1.2685708549991848 -2.7579280007383216" rotation="0 -90 0" sky="" scale=""> </a-entity>
        <a-entity id="option3" 
          text="anchor:center;width:4;height:5;tabSize:1;color:#fff;wrapCount:0;wrapPixels:900;lineHeight:60;baseline:top;value:option" visible="false"
          position="4.966 1.269 2.227" rotation="0 -90 0" sky="" scale=""> </a-entity>
        <a-entity
          id="1"
          position="200 200 200"
          rotation="0 -90 0"
          geometry="height:5;width:3.8"
          class="clickable"
          material="opacity:0;transparent:true;color:#FFFFFF"
          option-click=""
          sky=""
          scale="1.02 0.14 0.00001"
        ></a-entity>
        <a-entity
          id="2"
          position="200 200 200"
          rotation="0 -90 0"
          geometry="height:5;width:3.8"
          class="clickable"
          material="opacity:0;transparent:true;color:#FFFFFF"
          option-click=""
          sky=""
          scale="1.02 0.14 0.00001"
        ></a-entity>
        <a-entity
          id="3"
          position="200 200 200"
          rotation="0 -90 0"
          geometry="height:5;width:3.8"
          class="clickable"
          material="opacity:0;transparent:true;color:#FFFFFF"
          option-click=""
          sky=""
          scale="1.02 0.14 0.00001"
        ></a-entity>
        <a-entity
          id="4"
          position="200 200 200"
          rotation="0 -90 0"
          geometry="height:5;width:3.8"
          class="clickable"
          material="opacity:0;transparent:true;color:#FFFFFF"
          option-click=""
          sky=""
          scale="1.02 0.14 0.00001"
        ></a-entity>
        <a-text
          id="feedback"
          visible="false"
          value=""
          text="anchor:center;width:9;value:;height:5;tabSize:1;color:#ffff00;wrapCount:74.79;lineHeight:60;baseline:top;shader:msdf"
          position="4.966 -0.146 -0.24285051571172755"
          rotation="0 -90 0"
          sky=""
          scale=""
        >
        </a-text>
        <a-entity
          id="submit"
          class="clickable"
          submit=""
          geometry="primitive:plane;width:1.5;height:0.5"
          rotation="0 -90 0"
          material="src:assets/images/submit.png;opacity:0.99;shader:flat"
          sky=""
          position="20 20 20"
        >
        </a-entity>
        <a-entity
          id="next"
          class="clickable"
          submit=""
          geometry="primitive:plane;width:1.5;height:0.5"
          rotation="0 -90 0"
          material="src:assets/images/next.png;opacity:0.99;shader:flat"
          sky=""
          position="20 20 20"
        ></a-entity>
        <a-entity
          id="submitDisabled"
          submit=""
          geometry="primitive:plane;width:1.5;height:0.5"
          rotation="0 -90 0"
          material="src:assets/images/submit_d.png;opacity:0.99"
          position="4.919 -1.27 -0.667"
        ></a-entity>
        <a-entity
          id="nextDisabled"
          submit=""
          geometry="primitive:plane;width:1.5;height:0.5"
          rotation="0 -90 0"
          material="src:assets/images/next_d.png;opacity:0.99"
          position="4.919 -1.27 1.104"
        ></a-entity>
      </a-entity>
      <!--MainScreen End-->

      <!-- <a-image visible="false" id="flex2" src="./assets/images/score.png" geometry="height:3;width:6" position="6.75 1.0312388739393026 0.2309748624510259"rotation="0 90 0" scale="1.8 1.7 0.7" material=""></a-image> -->

      <a-image
        visible="false"
        id="flex2"
        src="assets/images/score.png"
        geometry="height:3;width:6"
        position="6.75 1.0312388739393026 0.2309748624510259"
        rotation="0 90 0"
        scale="1.8 2 0.7"
        material=""
      ></a-image>

      <!--ScoreScreen Start-->
      <a-entity id="scoreScreen" position="1.758412798271217 -0.311 0">
        <a-text
          visible="false"
          id="heading"
          value=""
          text="anchor:center;width:9;align:center;font:kelsonsans;height:5;tabSize:1;wrapCount:30"
          position="4.75 3.7002725225378312 0.053709460849015456"
          rotation="0 -90 0"
          visible=""
        ></a-text>
        <a-text
          visible="false"
          id="subheading"
          value=""
          text="anchor:center;width:10;value:;font:kelsonsans;height:5;tabSize:1;align:center;wrapCount:60"
          position="4.75 2.94 0.05777866401694359"
          rotation="0 -90 0"
        ></a-text>
        <a-text
          visible="false"
          id="endUserMsg"
          value="Thank you..!"
          text="anchor:center;width:9;value:Thank you..! bdhjbdh j bd h j b d h j b d h j bdhj dbhjb dhjb dhjbd hjbh;font:kelsonsans;height:5;tabSize:1;wrapCount:59.98;align:center;baseline:top"
          position="4.75 -0.08653729362667995 -0.1656692412054599"
          rotation="0 -90 0"
        ></a-text>
        <a-text
          visible="false"
          id="pointScreen"
          visible=""
          value="Thank you For the Quiz"
          text="anchor:center;width:9;value:Points:;font:kelsonsans;height:5;tabSize:1;wrapCount:59.98"
          position="4.75 0.573411424367809 2.7109682146068335"
          rotation="0 -90 0"
        ></a-text>
        <a-text
          visible="false"
          id="total2"
          value=""
          text="anchor:center;width:10;align:center;font:kelsonsans;height:5;tabSize:1"
          position="4.75 2.115 -0.18970303213011985"
          rotation="0 -90 0"
        ></a-text>
        <a-text
          visible="false"
          id="total3"
          value=""
          text="anchor:center;width:10;align:center;font:kelsonsans;height:5;tabSize:1"
          position="4.75 1.594 0.10634100061154483"
          rotation="0 -90 0"
        ></a-text>
        <a-text
          visible="false"
          id="total4"
          value=""
          text="anchor:center;width:8;value:=;align:center;font:kelsonsans;height:5;tabSize:1"
          position="4.75 1.721 -0.19394903082242146"
          rotation="0 -90 0"
          visible="false"
        ></a-text>
        <a-text
          visible="false"
          id="total5"
          value="10"
          text="anchor:center;width:20;align:center;color:#ff0000;font:kelsonsans;height:5;tabSize:1"
          position="4.787 0.6656751757759267 0.08424512916176641"
          rotation="0 -90.01166961505233 0"
        ></a-text>
        <a-entity
          visible="false"
          id="slash"
          position="4.75 1.886 0.005587378530517828"
          rotation="-1.6783050610352221 -91.48818169867035 38.57637682064517"
          scale="1 0.03 0.00001"
          geometry="primitive:plane"
          material=""
        ></a-entity>
        <!-- <a-text visible="false"  id="total12" value="Thank You!" text="align:center;anchor:center;font:kelsonsans;height:5;tabSize:1;width:12" position="4.75 1.485 -0.061" rotation="0 -90 0"></a-text> -->
        <a-entity
          geometry="primitive:ring;radiusOuter:0.9"
          position="4.753 1.7279453672712204 0"
          rotation="0 -90 0"
          scale=""
          material=""
          visible="false"
        ></a-entity>
      </a-entity>

      <!--ScoreScreen End-->

      <a-image
        id="southLogo"
        class="clickable"
        mouseclick
        crossorigin="anonymous"
        src="./assets/images/default.jpg"
        width="4"
        height="3"
        geometry=""
        material="width:0;height:0"
        visible=""
        rotation="0 90 0"
        position="-7.819990525662335 5.041909205171174 -3.7255516165615816"
        scale="1 1 0.00001"
      ></a-image>
      <a-image
        id="south_image2"
        class="clickable"
        mouseclick
        crossorigin="anonymous"
        src="./assets/images/default.jpg"
        width="4"
        height="3"
        geometry=""
        material="width:0;height:0"
        visible=""
        position="-7.903 2.590 1.814"
        rotation="0 90 0"
        scale="1 1 0.00001"
      ></a-image>
      <!--East Wall Branding Start-->
      <a-image
        id="eastImage"
        class="clickable"
        mouseclick
        crossorigin="anonymous"
        src="assets/images/default.jpg"
        width="4"
        height="3"
        geometry="width:215;height:161"
        rotation=""
        material="width:0;height:0"
        visible=""
        position="-0.804526074332113 2.22 -7.357679047676627"
        scale="0.06 0.057 0.00001"
      ></a-image>
      <a-image
        id="westImage"
        class="clickable"
        mouseclick
        crossorigin="anonymous"
        src="assets/images/default.jpg"
        width="4"
        height="3"
        geometry="width:215;height:161"
        rotation="0 180 0"
        material="width:0;height:0"
        visible=""
        position="-0.804526074332113 2.22 7.357679047676627"
        scale="0.06 0.057 0.00001"
      ></a-image>
      <a-plane
        id="customeVideoPlane1"
        class="cursorEntry"
        visible="false"
        camera-pan-follow
        color="#CCC"
        width="16"
        height="9"
        position="-1.20989 1.9361 5.96129"
        scale="0.5 0.5 0.00001"
        rotation="0 180 0"
        material=""
        geometry=""
      >
      </a-plane>
      <a-video
        id="video1"
        src="#customVideo1"
        autostart="false"
        width="25"
        height="15"
        position="2000 2000 2000"
        scale="0.3 0.3 0.00001"
        rotation="0 180 0"
        material=""
        geometry=""
      ></a-video>

      <a-plane
        id="customeVideoPlane2"
        class="cursorEntry1"
        visible="false"
        camera-pan-follow-1
        color="#CCC"
        width="16"
        height="9"
        position="-1.20989 1.9361 -5.96129"
        scale="0.5 0.5 0.00001"
        rotation="0 360 0"
        material="side: double"
        geometry=""
      ></a-plane>
      <a-video
        id="video2"
        src="#customVideo2"
        width="25"
        height="15"
        position="2000 2000 2000"
        scale="0.3 0.3 0.00001"
        rotation="0 360 0"
        material=""
        geometry=""
      ></a-video>
    </a-scene>
    
  </body>
  <script src="/act/v0.1/verbose/common.js"></script>
  <script src="/act/v0.1/verbose/SplashScreen.js"></script>
</html>
