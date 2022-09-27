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

  <link rel="icon" href="/favicon.png">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <script src="assets/js/aframe-v1.0.4.js"></script>
  <link rel="stylesheet" href="assets/css/bootstrap.min.css">
  <link rel="stylesheet" href="assets/css/splash.css">
  <script src="assets/js/jquery-3.3.1.min.js"></script>
  <script src="assets/js/bootstrap.min.js"></script>
   <script src="assets/js/aframe-ar.js"></script>
   <link rel="stylesheet" href="../verbose/css/SplashScreenToogleButton.css">
   <script src="../verbose/scripts/TinCanJS/build/tincan.js"></script>
<script src="../verbose/scripts/base64.js"></script>
<script src="../verbose/trackingData.js"></script>
<script src="../verbose/config.js"></script>
<script src="../verbose/verboseLaunch.js"></script>
<link rel="stylesheet" href="../verbose/css/fa-v5.css">
  <script src="assets/js/arcube.js"></script>
</head>
<body class="bodycss" style='margin : 0px; overflow: hidden !important;'>
  
  <div id="snackbar"></div>
  <div id="loaderq" class="lds-roller lds-roller-pos-assets-popup" style="position: absolute; z-index: 9999"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

  <div id="container" class="container">
  <div class="info" id="info">
    <div class="inner-overloy hidden-login" style="overflow-y: auto" id="innerInfo">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div class="row"> 
                <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                <label id="titleText" class="titleheader">Loading..</label>
                <br>
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
          
          <div class="row">
            <div class="col-9"></div>
            <div class="col-3" style="text-align: center">
            <a href="assets/pdf/cube.pdf" download>
              <div id="addTeleport"
              class="custom-button graph-button place-color " >
              <img class="img image-fluid " src="assets/images/fileicon.png" width="40">
              <div></div>
              <span class="tooltiptext">Print Cube</span>
           </div>
           </a>
          </div>
          </div>
        </div>
    </div>
   </div>
</div>
</div>
<!-- <div class="inactiveMessage" id="myDiv">This Experience is no longer Active in this room.</div>  -->
  <a-scene id="aScene" arjs=' sourceType: webcam;debugUIEnabled: false; ' embedded   loading-screen="enabled:false" style="display:none">
    <a-assets>
      </a-assets>
      <a-arcube id='cube'> 
        <a-entity rotation="-90 0 0">
          <a-plane position="0 0 .5" shader="flat" rotation="0 0 90" >
            <a-entity scale="1 1 0.00001" text="width: 0.98; color: #000; wrapCount: 21; baseline: top; tabSize: 1; value:; anchor: left; opacity: 1.03" position="-0.47341 0.47285 0.02871"  id="text1"></a-entity>
            <a-image src="" id="img1"></a-image>
          </a-plane>
          <a-plane position="-.5 0 0" rotation="0 -90 270" shader="flat">
            <a-entity scale="1 1 0.00001" text="width: 0.98; color: #000; wrapCount: 21; baseline: top; tabSize: 1; value:; anchor: left; opacity: 1.03" rotation="" position="-0.47341 0.47285 0.02871" id="text4"></a-entity>
            <a-image src="" id="img4"></a-image>
          </a-plane>
          <a-plane position=".5 0 0" rotation="0 90 90"  shader="flat">
            <a-entity scale="1 1 0.00001" text="width: 0.98; color: #000; wrapCount: 21; baseline: top; tabSize: 1; value:; anchor: left; opacity: 1.03" rotation="" position="-0.47341 0.47285 0.02871" id="text2"></a-entity>
            <a-image src="" id="img2"></a-image>
          </a-plane>
  
          <a-plane position="0 -.5 0" rotation="90 0 0"   shader="flat">
            <a-entity scale="1 1 0.00001" text="width: 0.98; color: #000; wrapCount: 21; baseline: top; tabSize: 1; value:; anchor: left; opacity: 1.03" rotation="" position="-0.47341 0.47285 0.02871" id="text5"></a-entity>
            <a-image src="" id="img5"></a-image>
          </a-plane>
  
          <a-plane position="0 .5 0" rotation="-90 180 0"   shader="flat">
            <a-entity scale="1 1 0.00001" text="width: 0.98; color: #000; wrapCount: 21; baseline: top; tabSize: 1; value:; anchor: left; opacity: 1.03" rotation="" position="-0.47341 0.47285 0.02871" id="text3"></a-entity>
            <a-image src="" id="img3"></a-image>
          </a-plane>
  
          <a-plane position="0 0 -.5" rotation="180 0 270"  shader="flat">
            <a-entity scale="1 1 0.00001" text="width: 0.98; color: #000; wrapCount: 21; baseline: top; tabSize: 1; value:; anchor: left; opacity: 1.03" rotation="" position="-0.47341 0.47285 0.02871" id="text6"></a-entity>
            <a-image src="" id="img6"></a-image>
          </a-plane>
    </a-entity>
    </a-arcube>
    <a-entity camera></a-entity>
  </a-scene>
  <div id='imageContainer' class="disabled"></div>
  <script src="assets/js/app.js"></script>
  <script src="../verbose/common.js"></script>
  <script src="../verbose/SplashScreen.js"></script>
</body>
</html>
    