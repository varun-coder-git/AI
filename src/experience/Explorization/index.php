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


	<link href="https://fonts.googleapis.com/css?family=Poiret+One" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="/act/v0.1/verbose/splash.css">
	<link rel="stylesheet" type="text/css" href="/act/v0.1/wallofframe/assets/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="/act/v0.1/wallofframe/assets/css/popup.css">
	<link rel="stylesheet" type="text/css" href="/act/v0.1/wallofframe/assets/css/">
	<script src="/act/v0.1/wallofframe/assets/js/jquery-3.3.1.min.js"></script>
	<!-- Dont replace aframe-v0.8.2.min.js directly. I have made changes in it for mobile and desktop(Yogesh) -->
	<script src="/act/v0.1/wallofframe/assets/js/aframe.min.js"></script>
	<link rel="stylesheet" href="/act/v0.1/verbose/css/SplashScreenToogleButton.css">
	<script src="/act/v0.1/wallofframe/assets/js/mobile_component.js"></script>
	<script src="/act/v0.1/wallofframe/assets/js/bootstrap.min.js"></script>

	<script src="/act/v0.1/verbose/scripts/base64.js"></script>
	<script src="/act/v0.1/verbose/trackingData.js"></script>
	<script src="/act/v0.1/verbose/verboseLaunch.js"></script>
	<meta name="google-signin-client_id"
		content="227903861079-q9gj2q8n6p1qmfkoo6eec1esqhq6p9u7.apps.googleusercontent.com">
	<script src="https://apis.google.com/js/platform.js?onload=onLoadGoogleCallback" async defer></script>
	<script src="/act/v0.1/wallofframe/assets/js/aframe-extras-pub.min.js"></script>
    <script src="/act/v0.1/wallofframe/assets/js/aframe-physics-system.min.js"></script>



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
	<div class="container-fluid" id="popupForm">
 <p class="contactForm">ImaginXP</p>
     <div class="form-group">
 <input type="text" class="form-control" placeholder="First Name" id="fName" required>
 <small class="invalidfname" id="invalid-fname" >Please provide valid First Name</small>
</div>
    <div class="form-group">

 <input type="text" class="form-control" placeholder="Last Name" id="lName" required>
  <small class="invalidlname" id="invalid-lname" >Please provide valid Last Name</small>

</div>
     <div class="form-group">

 <input type="text" class="form-control" placeholder="Your Email" id="email" required> 
  <small class="invalidfname" id="invalid-email" >Please provide valid Email Address</small>

     </div>
     <div class="form-group">

 <input type="text" class="form-control" placeholder="Contact Number" id="cno" required>
  <small class="invalidfname" id="invalid-cno" >Please provide valid Contact Number</small>

     </div>
     <div class="form-group">

 <div class="text-center">
 <button type="submit" class="btn btn-outline-success"onclick="saveForm()" value="Save">Save</button>
<button type="button" class="btn btn-outline-danger"onclick="closeForm()">Close</button>
 </div>
 </div>
 </form>
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
							<div id="toogleButtonStyle" class="col-lg-2 col-md-2 col-sm-2 col-xs-2 display_element ">
								<img id='qrcode' src="" />
								<div class="onoffswitch1 mt-2 ml-3" id="divOnOff">
									<input type="checkbox" name="onoffswitch1" class="onoffswitch1-checkbox"
										id="myonoffswitch1" checked>
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
														class="btn btn-google-color mx-auto signin-google-facebook-button mb-2"
														type="button">
														<i aria-hidden="true" class="fab fa-google"></i> Google
													</button>
												</div>
												<div class="col-lg-6 col-md-6 col-sm-6 col-12">
													<button
														class="btn btn-facebook-color mx-auto signin-google-facebook-button mb-2"
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
														<input type="email" class="form-control width-size mb-2"
															id="email" placeholder="Email" name="uname" required>

														<input type="password" class="form-control width-size mb-2"
															id="psw" placeholder="Password" name="psw" required>

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


	<a-scene embeded shadow="type:pcfsoft" id="aScene" loading-screen="enabled:false"  physics="debug: true">

		<a-entity id="rig" position="0 0 0" movement-controls kinematic-body 	animation="property: rotation; to: 0 -360 0; dur: 100000;easing:linear;loop:true"
		animation__one="property: rotation;to: 0 360 0; dur: 2000;easing:easeInOutCirc;enabled:false">
			<a-entity id="camera" camera position="0 1.6 0" look-controls="reverseTouchDrag:true">
				<a-entity id="cursorImage" position="0 0 -1" cursor="rayOrigin:mouse"
					geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03" material="color: red; shader: flat" 
					scale="0 0 0">
				</a-entity>
			</a-entity>
			
		</a-entity>
		<a-grid  static-body position="0 -0.01 0"></a-grid>
		<a-box color="#39BB82" scale="1 6 1" width="15" height="1" depth="3" position="9.607 0.391 -0.049"
			static-body rotation="0 90 0" geometry="depth:0.1;width:5" material="opacity:0.1">
		</a-box>
		<a-box color="#39BB82" scale="1 6 1" width="15" height="1" depth="3" position="4.171 0.391 -8.113"
			static-body rotation="0 90 0" geometry="width:12;depth:0.1" material="opacity:0.1">
		</a-box>
		<a-box color="#39BB82" scale="1 6 1" width="15" height="1" depth="3" position="-0.102 0.391 -14.12"
			static-body geometry="width:8;depth:0.1" material="opacity:0.1"></a-box>
		<a-box color="#39BB82" scale="1 6 1" width="15" height="1" depth="3" position="-4.143 0.391 -8.113"
			static-body rotation="0 90 0" geometry="depth:0.1;width:12" material="opacity:0.1">
		</a-box>
		<a-box color="#39BB82" scale="1 6 1" width="15" height="1" depth="3" position="-9.563 0.391 -0.049"
			static-body rotation="0 90 0" geometry="depth:0.1;width:5" material="opacity:0.1">
		</a-box>
		<a-box color="#39BB82" scale="1 6 1" width="15" height="1" depth="3" position="-0.004 0.391 14.174"
			static-body geometry="width:8;depth:0.1" material="opacity:0.1"></a-box>
		<a-box color="#39BB82" scale="1 6 1" width="15" height="1" depth="3" position="-6.958 0.391 2.479"
			static-body geometry="width:5.5;height:1;depth:0.1" material="opacity:0.1"></a-box>
		<a-box color="#39BB82" scale="1 6 1" width="15" height="1" depth="3" position="-6.958 0.391 -2.175"
			static-body geometry="width:5.5;height:1;depth:0.1" material="opacity:0.1"></a-box>
		<a-box color="#39BB82" scale="1 6 1" width="15" height="1" depth="3" position="6.882 0.391 -2.175"
			static-body geometry="width:5.5;height:1;depth:0.1" material="opacity:0.1"></a-box>
		<a-box color="#39BB82" scale="1 6 1" width="15" height="1" depth="3" position="6.882 0.391 2.275"
			static-body geometry="width:5.5;height:1;depth:0.1" material="opacity:0.1"></a-box>
		<a-box color="#39BB82" scale="1 6 1" width="15" height="1" depth="3" position="4.094 0.391 8.197"
			static-body rotation="0 90 0" geometry="depth:0.1;width:12" material="opacity:0.1">
		</a-box>
		<a-box color="#39BB82" scale="1 6 1" width="15" height="1" depth="3" position="-4.143 0.391 8.171"
			static-body rotation="0 90 0" geometry="depth:0.1;width:12" material="opacity:0.1">
		</a-box>
		<a-entity mobile></a-entity>
		<a-entity light="type: directional; color: #FFF; intensity: 0.5" position="2 20 0"></a-entity>
		<a-entity light="type: ambient; color: #FFF"></a-entity>
	

		<a-assets>
			<a-mixin id="checkpoint"></a-mixin>
			<a-mixin id="checkpoint-hovered" color="#6CEEB5"></a-mixin>
			<img id="sky_sphere-texture" src="/act/v0.1/wallofframe/assets/textures/sky_sphere.jpg">
			<audio id="sound" src=""></audio>

			<!-- floor -->
			<a-asset-item id="floor-obj" src="/act/v0.1/wallofframe/assets/models/floor.obj"></a-asset-item>
			<img id="floor-texture" src="/act/v0.1/wallofframe/assets/textures/Executive-floor.jpg">
			<img id="floor_normal-texture" src="/act/v0.1/wallofframe/assets/textures/floor_normal.jpg">
			<!-- - floor -->
			<!-- hall -->
			<a-asset-item id="hall-obj" src="/act/v0.1/wallofframe/assets/models/hall.obj"></a-asset-item>
			<img id="hall-texture" src="/act/v0.1/wallofframe/assets/textures/Executive-hall.jpg">
			<!--<img id="hall_normal-texture" src="textures/hall_normal.jpg">-->
			<!-- - hall -->
			<!-- acropolis -->
			<a-asset-item id="1-obj" src="/act/v0.1/wallofframe/assets/models/acropolis.obj"></a-asset-item>
			<img id="defaultgallery" crossorigin="anonymous">
			<img id="changedgallery" crossorigin="anonymous">
			<img id="texture-1" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - acropolis -->
			<!-- moonlight -->
			<a-asset-item id="2-obj" src="/act/v0.1/wallofframe/assets/models/moonlight.obj"></a-asset-item>
			<img id="texture-2" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - moonlight -->
			<!-- moonlight -->
			<a-asset-item id="3-obj" src="/act/v0.1/wallofframe/assets/models/moonlight.obj"></a-asset-item>
			<img id="texture-3" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - moonlight -->
			<!-- moonlight -->
			<a-asset-item id="4-obj" src="/act/v0.1/wallofframe/assets/models/moonlight.obj"></a-asset-item>
			<img id="texture-4" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - moonlight -->
			<!-- castle_lake -->
			<a-asset-item id="5-obj" src="/act/v0.1/wallofframe/assets/models/castle_lake.obj"></a-asset-item>
			<img id="texture-5" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - castle_lake -->

			<!-- moonlight -->
			<a-asset-item id="6-obj" src="/act/v0.1/wallofframe/assets/models/moonlight.obj"></a-asset-item>
			<img id="texture-6" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - moonlight -->


			<!-- moonlight -->
			<a-asset-item id="7-obj" src="/act/v0.1/wallofframe/assets/models/moonlight.obj"></a-asset-item>
			<img id="texture-7" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - moonlight -->

			<!-- moonlight -->
			<a-asset-item id="8-obj" src="/act/v0.1/wallofframe/assets/models/moonlight.obj"></a-asset-item>
			<img id="texture-8" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - moonlight -->

			<!-- good_samaritan -->
			<a-asset-item id="9-obj" src="/act/v0.1/wallofframe/assets/models/good_samaritan.obj"></a-asset-item>
			<img id="texture-9" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - good_samaritan -->

			<!-- moonlight -->
			<a-asset-item id="10-obj" src="/act/v0.1/wallofframe/assets/models/moonlight.obj"></a-asset-item>
			<img id="texture-10" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - moonlight -->
			<!-- acropolis -->
			<a-asset-item id="11-obj" src="/act/v0.1/wallofframe/assets/models/acropolis.obj"></a-asset-item>
			<img id="texture-11" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - acropolis -->

			<!-- moonlight -->
			<a-asset-item id="12-obj" src="/act/v0.1/wallofframe/assets/models/moonlight.obj"></a-asset-item>
			<img id="texture-12" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - moonlight -->

			<!-- moonlight -->
			<a-asset-item id="13-obj" src="/act/v0.1/wallofframe/assets/models/moonlight.obj"></a-asset-item>
			<img id="texture-13" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - moonlight -->

			<!-- moonlight -->
			<a-asset-item id="14-obj" src="/act/v0.1/wallofframe/assets/models/moonlight.obj"></a-asset-item>
			<img id="texture-14" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - moonlight -->

			<!-- castle_lake -->
			<a-asset-item id="15-obj" src="/act/v0.1/wallofframe/assets/models/castle_lake.obj"></a-asset-item>
			<img id="texture-15" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - castle_lake -->

			<!-- moonlight -->
			<a-asset-item id="16-obj" src="/act/v0.1/wallofframe/assets/models/moonlight.obj"></a-asset-item>
			<img id="texture-16" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - moonlight -->

			<!-- moonlight -->
			<a-asset-item id="17-obj" src="/act/v0.1/wallofframe/assets/models/moonlight.obj"></a-asset-item>
			<img id="texture-17" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - moonlight -->

			<!-- moonlight -->
			<a-asset-item id="18-obj" src="/act/v0.1/wallofframe/assets/models/moonlight.obj"></a-asset-item>
			<img id="texture-18" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - moonlight -->

			<!-- good_samaritan -->
			<a-asset-item id="19-obj" src="/act/v0.1/wallofframe/assets/models/good_samaritan.obj"></a-asset-item>
			<img id="texture-19" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - good_samaritan -->

			<!-- moonlight -->
			<a-asset-item id="20-obj" src="/act/v0.1/wallofframe/assets/models/moonlight.obj"></a-asset-item>
			<img id="texture-20" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/defaultgallery.jpg">
			<!-- - moonlight -->

			<!-- moonlight -->
			<a-asset-item id="north-obj" src="/act/v0.1/wallofframe/assets/models/moonlight.obj"></a-asset-item>
			<img id="north-texture" crossorigin="anonymous"
				src="/act/v0.1/wallofframe/assets/textures/defaultbrandingold.jpg">
			<!-- - moonlight -->
			<!-- moonlight -->
			<a-asset-item id="south-obj" src="/act/v0.1/wallofframe/assets/models/moonlight.obj"></a-asset-item>
			<img id="south-texture" crossorigin="anonymous"
				src="/act/v0.1/wallofframe/assets/textures/defaultbrandingold.jpg">
			<!-- - moonlight -->

			<!-- moonlight -->
			<a-asset-item id="bg-obj" src="/act/v0.1/wallofframe/assets/models/moonlight.obj"></a-asset-item>
			<img id="bg-texture" crossorigin="anonymous" src="/act/v0.1/wallofframe/assets/textures/bg_light.png">
			<!-- - moonlight -->

			<!-- moonlight -->
			<a-asset-item id="lightoverlay-obj" src="/act/v0.1/wallofframe/assets/models/moonlight.obj"></a-asset-item>
			<img id="lightoverlay-texture" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png">
			<!-- - moonlight -->

			<!-- hall low floor -->
			<!-- this piece is only meant for teleportation -->
			<a-asset-item id="hall_low_floor-obj" src="/act/v0.1/wallofframe/assets/models/hall_low_floor.obj">
			</a-asset-item>

			<!-- - hall low floor-->

			<!-- lamps -->
			<a-asset-item id="lamps-obj" src="/act/v0.1/wallofframe/assets/models/lamps.obj"></a-asset-item>
			<img id="lamps-texture" src="/act/v0.1/wallofframe/assets/textures/lamps.jpg">
			<!-- - lamps -->
			<a-asset-item id="lamps-obj1" src="/act/v0.1/wallofframe/assets/models/lampsnew.obj"></a-asset-item>
			<img id="lamps-texture1" src="/act/v0.1/wallofframe/assets/textures/lamps.jpg">

			<!-- mocaps -->
			<a-asset-item id="am_threejs_CEC_BODY_1_HEAD-mocap"
				src="/act/v0.1/wallofframe/assets/js/mocap/am_threejs_CEC_BODY_1_HEAD.js"></a-asset-item>
			<a-asset-item id="am_threejs_CEC_BODY_1_LEFT-mocap"
				src="/act/v0.1/wallofframe/assets/js/mocap/am_threejs_CEC_BODY_1_LEFT.js"></a-asset-item>
			<a-asset-item id="am_threejs_CEC_BODY_1_RIGHT-mocap"
				src="/act/v0.1/wallofframe/assets/js/mocap/am_threejs_CEC_BODY_1_RIGHT.js"></a-asset-item>

			<a-asset-item id="am_threejs_CEC_BODY_2_HEAD-mocap"
				src="/act/v0.1/wallofframe/assets/js/mocap/am_threejs_CEC_BODY_2_HEAD.js"></a-asset-item>
			<a-asset-item id="am_threejs_CEC_BODY_2_LEFT-mocap"
				src="/act/v0.1/wallofframe/assets/js/mocap/am_threejs_CEC_BODY_2_LEFT.js"></a-asset-item>
			<a-asset-item id="am_threejs_CEC_BODY_2_RIGHT-mocap"
				src="/act/v0.1/wallofframe/assets/js/mocap/am_threejs_CEC_BODY_2_RIGHT.js"></a-asset-item>

			<a-asset-item id="am_threejs_CEC_BODY_3_HEAD-mocap"
				src="/act/v0.1/wallofframe/assets/js/mocap/am_threejs_CEC_BODY_3_HEAD.js"></a-asset-item>
			<a-asset-item id="am_threejs_CEC_BODY_3_LEFT-mocap"
				src="/act/v0.1/wallofframe/assets/js/mocap/am_threejs_CEC_BODY_3_LEFT.js"></a-asset-item>
			<a-asset-item id="am_threejs_CEC_BODY_3_RIGHT-mocap"
				src="/act/v0.1/wallofframe/assets/js/mocap/am_threejs_CEC_BODY_3_RIGHT.js"></a-asset-item>

			<a-asset-item id="am_threejs_CEC_BODY_4_HEAD-mocap"
				src="/act/v0.1/wallofframe/assets/js/mocap/am_threejs_CEC_BODY_4_HEAD.js"></a-asset-item>
			<a-asset-item id="am_threejs_CEC_BODY_4_LEFT-mocap"
				src="/act/v0.1/wallofframe/assets/js/mocap/am_threejs_CEC_BODY_4_LEFT.js"></a-asset-item>
			<a-asset-item id="am_threejs_CEC_BODY_4_RIGHT-mocap"
				src="/act/v0.1/wallofframe/assets/js/mocap/am_threejs_CEC_BODY_4_RIGHT.js"></a-asset-item>
			<!-- - mocaps -->
			<video id="penguin-sledding" src="assets/videos/demo.mp4"></video>
			<img id="pausebutton" src="/act/v0.1/wallofframe/assets/images/play_2.png">
		</a-assets>
		<a-entity id="audio1" sound="src: #audio-1;loop:true;" position="0 0 -1"></a-entity>
		<a-sky color="#EEEEFF" material="src: #sky_sphere-texture"></a-sky>

		<a-entity obj-model="obj: #floor-obj;"
			material="src: #floor-texture; normalMap: #floor_normal-texture; metalness: 0.6" id="floor"></a-entity>
		<a-entity obj-model="obj: #floor-obj;" position="0.000 0.018 8.104" scale="0.820 1.000 1.000"
			rotation="0.000 90 0" material="src: #floor-texture; normalMap: #floor_normal-texture; metalness: 0.6"
			id="floor2"></a-entity>
		<a-entity obj-model="obj: #floor-obj;" position="0.000 0.038 -7.895" scale="0.800 1.000 1.000"
			rotation="0.000 90 0" material="src: #floor-texture; normalMap: #floor_normal-texture; metalness: 0.6"
			id="floor3"></a-entity>
		<a-entity obj-model="obj: #hall-obj;" material="src: #hall-texture" id="hall"></a-entity>
		<!-- <a-entity gltf-model="/act/v0.1/wallofframe/assets/models/gallery2.draco.glb" material="src: #hall-texture" id="hall"></a-entity> -->
		<a-entity obj-model="obj: #hall_low_floor-obj;" material="opacity: 0.0" id="hall_low_floor"></a-entity>

		<a-entity obj-model="obj: #lamps-obj;" material="src: #lamps-texture; side: double;"></a-entity>

		<!--		1 Image and text-->
		<a-image mouseclick="" id="light-1" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="5.17 2.002 1.873" scale="2.5 2 1" material="opacity:0.5"></a-image>
		<a-entity mouseclick="" id="gallery-1" obj-model="obj: #1-obj;" material="src: #texture-1"></a-entity>
		<a-entity data-brackets-id="6448" id="no-hmd-intro" position="5.163 0.726 2.058"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13 180 0">
			<a-entity data-brackets-id="6449" geometry="primitive:plane;height:0.4;width:2.1"
				position="-0.081 0.051 0.22" material="color:#000000">
				<a-text id="text-1" data-brackets-id="6450" text="align:center;width:2"></a-text>
			</a-entity>
		<a-entity  id="button-1-frame-1"    visible="false" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.738 1.947 0.546">   
		</a-entity>
		<a-entity id="button-2-frame-1"    visible="false" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.738 1.547 0.441">   
		</a-entity>
		<a-entity id="button-3-frame-1"    visible="false" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.738 1.151 0.347" >   
		</a-entity>
		<a-entity id="button-4-frame-1" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.738 0.726 0.272"
		visible="false"> </a-entity>
		<a-entity id="button-5-frame-1" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.738 0.270 0.272"
		visible="false"></a-entity>
		</a-entity>
		<!--		1 Image and text end-->

		<!--		2 Image and text-->
		<a-image mouseclick="" id="light-2" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="3.728 1.88 4.213" rotation="0 90 0" scale="2 1.7 1" material="opacity:0.5"></a-image>
		<a-entity mouseclick="" id="gallery-2" obj-model="obj: #2-obj;" material="src: #texture-2"
			position="1.917 -0.13 -1.511" rotation="0 90 0"></a-entity>
		<a-entity data-brackets-id="8579" id="no-hmd-intro" position="4.043 0.692 4.272"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13 270 0">
			<a-entity data-brackets-id="8580" geometry="primitive:plane;height:0.4;width:2.1"
				position="-0.081 0.051 0.22" material="color:#000000">
				<a-text data-brackets-id="8581" id="text-2" text="align:center;width:2"></a-text>
			</a-entity>
		<a-entity id="button-1-frame-2"    visible="false"   geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 1.690 0.487">   
		</a-entity>
		<a-entity id="button-2-frame-2"    visible="false"   geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 1.292 0.387">   
		</a-entity>
		<a-entity id="button-3-frame-2"    visible="false"   geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 0.893 0.287">   
		</a-entity>
		<a-entity id="button-4-frame-2" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 0.505 0.197" visible="false">   
		</a-entity>
		<a-entity id="button-5-frame-2" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 0.116 0.108" visible="false"> 
		</a-entity>	
		</a-entity>
		<!--2 Image and text -->

		<!--		3 Image and text-->
		<a-image mouseclick="" id="light-3" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="3.728 1.832 7.909" rotation="0 90 0" scale="2 1.7 1" material="opacity:0.5"></a-image>
		<a-entity mouseclick="" id="gallery-3" obj-model="obj: #3-obj;" material="src: #texture-3"
			position="1.875 -0.155 2.167" rotation="0 90 0"></a-entity>
		<a-entity data-brackets-id="8583" id="no-hmd-intro" position="3.982 0.68 7.948"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13 270 0">
			<a-entity data-brackets-id="8584" geometry="primitive:plane;height:0.4;width:2.1"
				position="-0.081 0.051 0.22" material="color:#000000">
				<a-text data-brackets-id="8585" id="text-3" text="align:center;width:2"></a-text>
			</a-entity>
		<a-entity id="button-1-frame-3"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 1.690 0.487">   
		</a-entity>
		<a-entity id="button-2-frame-3"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 1.292 0.387">   
		</a-entity>
		<a-entity id="button-3-frame-3"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 0.893 0.287">   
		</a-entity>
		<a-entity id="button-4-frame-3" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 0.505 0.197" visible="false">   
		</a-entity>
		<a-entity id="button-5-frame-3" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 0.112 0.107" visible="false">   
		</a-entity>
		</a-entity>
		<!--		3 Image and text end-->

		<!--		4 Image and text-->
		<a-image mouseclick="" id="light-4" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="3.728 1.908 11.727" rotation="0 90 0" scale="2 1.7 1" material="opacity:0.5"></a-image>
		<a-entity mouseclick="" id="gallery-4" obj-model="obj: #4-obj;" material="src: #texture-4"
			position="1.884 -0.08 6.039" rotation="0 90 0"></a-entity>
		<a-entity data-brackets-id="8587" id="no-hmd-intro" position="4.09 0.68 11.816"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13 270 0">
			<a-entity data-brackets-id="8588" geometry="primitive:plane;height:0.4;width:2.1"
				position="-0.081 0.051 0.22" material="color:#000000">
				<a-text data-brackets-id="8589" id="text-4" text="align:center;width:2"></a-text>
			</a-entity>
		<a-entity id="button-1-frame-4"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.274 1.655 0.643">   
		</a-entity>
		<a-entity id="button-2-frame-4"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.282 1.25 0.568">   
		</a-entity>
		<a-entity id="button-3-frame-4"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.288 0.849 0.46">   
		</a-entity>
		<a-entity id="button-4-frame-4" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.288 0.472 0.373" visible="false">   
		</a-entity>
		<a-entity id="button-5-frame-4" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.288 0.092 0.285" visible="false">   
		</a-entity>
		</a-entity>
		<!--		4 Image and text end-->

		<!--		5 Image and text-->
		<a-image mouseclick="" id="light-5" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="0.006 2.01 13.888" rotation="0 180 0" scale="2.5 1.8 1" material="opacity:0.5"></a-image>
		<a-entity mouseclick="" id="gallery-5" obj-model="obj: #5-obj;" material="src: #texture-5"></a-entity>
		<a-entity data-brackets-id="7268" id="no-hmd-intro" position="-0.043 0.795 14.062"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13 180 0">
			<a-entity data-brackets-id="7269" geometry="primitive:plane;height:0.4;width:2.1"
				position="-0.081 0.051 0.22" material="color:#000000">
				<a-text data-brackets-id="7270" id="text-5" text="align:center;width:2"></a-text>
			</a-entity>
		<a-entity id="button-1-frame-5"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.424 1.690 0.487">   
		</a-entity>
		<a-entity id="button-2-frame-5"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.424 1.292 0.387">   
		</a-entity>
		<a-entity id="button-3-frame-5"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.424 0.893 0.287">   
		</a-entity>
		<a-entity id="button-4-frame-5" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.424 0.494 0.195" visible="false">   
		</a-entity>
		<a-entity id="button-5-frame-5" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.424 0.122 0.109" visible="false">   
		</a-entity>
		</a-entity>
		<!--		5 Image and text end-->

		<!--		6 Image and text-->
		<a-image mouseclick="" id="light-6" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="-3.718 1.888 11.723" rotation="0 270 0" scale="2 1.7 1" material="opacity:0.5"></a-image>
		<a-entity mouseclick="" id="gallery-6" obj-model="obj: #6-obj;" material="src: #texture-6"
			position="-1.908 -0.229 17.366" rotation="0 270 0"></a-entity>
		<a-entity data-brackets-id="8595" id="no-hmd-intro" position="-4.017 0.726 11.556"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13.02 90 0">
			<a-entity data-brackets-id="8596" geometry="primitive:plane;height:0.4;width:2.1"
				position="-0.081 0.051 0.22" material="color:#000000">
				<a-text data-brackets-id="8597" id="text-6" text="align:center;width:2"></a-text>
			</a-entity>
		<a-entity id="button-1-frame-6"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 1.690 0.487">   
		</a-entity>
		<a-entity id="button-2-frame-6"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 1.292 0.387">   
		</a-entity>
		<a-entity id="button-3-frame-6"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 0.893 0.287">   
		</a-entity>
		<a-entity id="button-4-frame-6" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 0.505 0.197" visible="false">   
		</a-entity>
		<a-entity id="button-5-frame-6" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 0.094 0.102" visible="false">   
		</a-entity>
		</a-entity>
		<!--		6 Image and text end-->

		<!--		7 Image and text -->
		<a-image mouseclick="" id="light-7" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="-3.718 1.863 8.042" rotation="0 270 0" scale="2 1.7 1" material="opacity:0.5"></a-image>
		<a-entity mouseclick="" id="gallery-7" obj-model="obj: #7-obj;" material="src: #texture-7"
			position="-1.945 -0.21 13.673" rotation="0 270 0"></a-entity>
		<a-entity data-brackets-id="8599" id="no-hmd-intro" position="-4.017 0.699 7.887"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13.02 90 0">
			<a-entity data-brackets-id="8600" geometry="primitive:plane;height:0.4;width:2.1"
				position="-0.081 0.051 0.22" material="color:#000000">
				<a-text data-brackets-id="8601" id="text-7" text="align:center;width:2"></a-text>
			</a-entity>
		<a-entity id="button-1-frame-7"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 1.690 0.487">   
		</a-entity>
		<a-entity id="button-2-frame-7"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 1.292 0.387">   
		</a-entity>
		<a-entity id="button-3-frame-7"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 0.893 0.287">   
		</a-entity>	
		<a-entity id="button-4-frame-7" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 0.509 0.198" visible="false">   
		</a-entity>
		<a-entity id="button-5-frame-7" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 0.103 0.104" visible="false">   
		</a-entity>
		</a-entity>
		<!--		7 Image and text end-->

		<!--		8 Image and text -->
		<a-image mouseclick="" id="light-8" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="-3.718 1.871 4.275" rotation="0 270 0" scale="2 1.7 1" material="opacity:0.5"></a-image>
		<a-entity mouseclick="" id="gallery-8" obj-model="obj: #8-obj;" material="src: #texture-8"
			position="-1.895 -0.239 9.972" rotation="0 270 0"></a-entity>
		<a-entity data-brackets-id="8603" id="no-hmd-intro" position="-3.985 0.698 4.2"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13.02 90 0">
			<a-entity data-brackets-id="8604" geometry="primitive:plane;height:0.4;width:2.1"
				position="-0.081 0.051 0.22" material="color:#000000">
				<a-text data-brackets-id="8605" id="text-8" text="align:center;width:2"></a-text>
			</a-entity>
		<a-entity id="button-1-frame-8"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 1.690 0.487">   
		</a-entity>
		<a-entity id="button-2-frame-8"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 1.292 0.387">   
		</a-entity>
		<a-entity id="button-3-frame-8"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 0.893 0.287">   
		</a-entity>
		<a-entity id="button-4-frame-8" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 0.445 0.183" visible="false">   
		</a-entity>
		<a-entity id="button-5-frame-8" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.324 0.023 0.086" visible="false">   
		</a-entity>
		</a-entity>
		<!--		8 Image and text end-->

		<!--		9 Image and text -->
		<a-image mouseclick="" id="light-9" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="-2.936 2.028 1.922" scale="1.8 1.9 1" material="opacity:0.5"></a-image>

		<a-entity mouseclick="" id="gallery-9" obj-model="obj: #9-obj;" material="src: #texture-9"></a-entity>
		<a-entity data-brackets-id="7429" id="no-hmd-intro" position="-3.067 0.774 2.058"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13 180 0">
			<a-entity data-brackets-id="7430" geometry="width:1.6;primitive:plane;height:0.4"
				position="-0.128 0.051 0.22" material="color:#000000">
				<a-text data-brackets-id="7431" id="text-9" text="width:1.5;align:center" position="0 0.003 0.001">
				</a-text>
			</a-entity>
		<a-entity id="button-1-frame-9"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="0.858 1.836 0.6">   
		</a-entity>
		<a-entity id="button-2-frame-9"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="0.981 1.453 0.41">   
		</a-entity>
		<a-entity id="button-3-frame-9"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="0.858 0.99905 0.37066">   
		</a-entity>
		<a-entity id="button-4-frame-9" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="0.981 0.852 0.285" visible="false">   
		</a-entity>
		<a-entity id="button-5-frame-9" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="0.981 0.486 0.2" visible="false">   
		</a-entity>
		</a-entity>
		<!--		9 Image and text end-->

		<!--		10 Image and text -->
		<a-image mouseclick="" id="light-10" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="-5.723 2.019 1.947" scale="2 1.8 1" material="opacity:0.5"></a-image>

		<a-entity mouseclick="" id="gallery-10" obj-model="obj: #10-obj;" material="src: #texture-10"></a-entity>
		<a-entity data-brackets-id="7429" id="no-hmd-intro" position="-5.808 0.828 2.058"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13 180 0">
			<a-entity data-brackets-id="7430" geometry="primitive:plane;height:0.4;width:2.1"
				position="-0.081 0.051 0.22" material="color:#000000">
				<a-text data-brackets-id="7431" id="text-10" text="align:center;width:2"></a-text>
			</a-entity>
		<a-entity id="button-1-frame-10"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.388 1.714 0.476">   
		</a-entity>
		<a-entity id="button-2-frame-10"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.388 1.254 0.353">   
		</a-entity>
		<a-entity id="button-3-frame-10"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.356 0.776 0.287">   
		</a-entity>
		<a-entity id="button-4-frame-10" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.356 0.649 0.258"  visible="false">   
		</a-entity>
		<a-entity id="button-5-frame-10" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.356 0.279 0.172"  visible="false">   
		</a-entity>
		</a-entity>
		<!--		10 Image and text  end-->

		<!--		11 Image and text -->
		<a-image mouseclick="" id="light-11" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="-5.185 2.014 -1.95" rotation="0 180 0" scale="2.5 2 1" material="opacity:0.5"></a-image>
		<a-entity mouseclick="" id="gallery-11" obj-model="obj: #11-obj;" material="src: #texture-11"
			rotation="0 180 0"></a-entity>
		<a-entity data-brackets-id="7608" id="no-hmd-intro" position="-5.142 0.726 -2.064"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13 0 0">
			<a-entity data-brackets-id="7609" geometry="primitive:plane;height:0.4;width:2.1"
				position="-0.081 0.051 0.22" material="color:#000000">
				<a-text data-brackets-id="7610" id="text-11" text="align:center;width:2"></a-text>
			</a-entity>
		<a-entity id="button-1-frame-11"      geometry="primitive:plane;height:0.3;width:0.3" visible="false" rotation="13 0 0" position="1.647 2.035 0.537"> 
		</a-entity>
		<a-entity  id="button-2-frame-11"      geometry="primitive:plane;height:0.3;width:0.3" visible="false" rotation="13 0 0" position="1.647 1.64 0.467"> 
		</a-entity>
		<a-entity id="button-3-frame-11"      geometry="primitive:plane;height:0.3;width:0.3" visible="false" rotation="13 0 0" position="1.647 1.268 0.374"> 
		</a-entity>	
		<a-entity id="button-4-frame-11" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.647 0.871 0.282"  visible="false">   
		</a-entity>
		<a-entity id="button-5-frame-11" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.647 0.472 0.19"  visible="false">   
		</a-entity>
		</a-entity>
		<!--		11 Image and text  end-->


		<!--		12 Image and text -->
		<a-image mouseclick="" id="light-12" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="-3.802 1.857 -4.142" rotation="0 270 0" scale="2 1.7 1" material="opacity:0.5"></a-image>
		<a-entity mouseclick="" id="gallery-12" obj-model="obj: #12-obj;" material="src: #texture-12"
			position="-1.895 -0.143 1.45" rotation="0 270 0"></a-entity>
		<a-entity data-brackets-id="8213" id="no-hmd-intro" position="-4.01 0.709 -4.325"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13 90 0">
			<a-entity data-brackets-id="8214" geometry="primitive:plane;height:0.4;width:2.1"
				position="-0.081 0.051 0.22" material="color:#000000">
				<a-text data-brackets-id="8215" id="text-12" text="align:center;width:2"></a-text>
			</a-entity>
		<a-entity id="button-1-frame-12"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.284 1.690 0.487">   
		</a-entity>
		<a-entity id="button-2-frame-12"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.284 1.292 0.387">   
		</a-entity>
		<a-entity id="button-3-frame-12"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.284 0.893 0.287">   
		</a-entity>
		<a-entity id="button-4-frame-12" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.284 0.487 0.193"  visible="false">   
		</a-entity>
		<a-entity id="button-5-frame-12" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.284 0.036 0.089"  visible="false">   
		</a-entity>
		</a-entity>
		<!--		12 Image and text end-->

		<!--		13 Image and text -->
		<a-image mouseclick="" id="light-13" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="-3.802 1.876 -7.987" rotation="0 270 0" scale="2 1.7 1" material="opacity:0.5"></a-image>
		<a-entity mouseclick="" id="gallery-13" obj-model="obj: #13-obj;" material="src: #texture-13"
			position="-1.895 -0.143 -2.314" rotation="0 270 0"></a-entity>
		<a-entity data-brackets-id="8017" id="no-hmd-intro" position="-4.009 0.69 -8.083"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13 90 0">
			<a-entity data-brackets-id="8018" geometry="primitive:plane;height:0.4;width:2.1"
				position="-0.081 0.051 0.22" material="color:#000000">
				<a-text data-brackets-id="8019" id="text-13" text="align:center;width:2"></a-text>
			</a-entity>
			<a-entity id="button-1-frame-13"       geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.284 1.690 0.487"> 
		</a-entity>
		<a-entity id="button-2-frame-13"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.284 1.292 0.387">   
		</a-entity>
		<a-entity id="button-3-frame-13"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.284 0.893 0.287">   
		</a-entity>
		<a-entity id="button-4-frame-13" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.284 0.516 0.2"  visible="false">   
		</a-entity>
		<a-entity id="button-5-frame-13" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.284 0.134 0.112"  visible="false">   
		</a-entity>
		</a-entity>
		<!--		13 Image and text end-->

		<!--		14 Image and text -->
		<a-image mouseclick="" id="light-14" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="-3.802 1.876 -11.75" rotation="0 270 0" scale="2 1.7 1" material="opacity:0.5"></a-image>
		<a-entity mouseclick="" id="gallery-14" obj-model="obj: #14-obj;" material="src: #texture-14"
			position="-1.895 -0.143 -6.079" rotation="0 270 0"></a-entity>
		<a-entity data-brackets-id="8017" id="no-hmd-intro" position="-4.005 0.69 -11.875"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13 90 0">
			<a-entity data-brackets-id="8018" geometry="primitive:plane;height:0.4;width:2.1"
				position="-0.081 0.051 0.22" material="color:#000000">
				<a-text data-brackets-id="8019" id="text-14" text="align:center;width:2"></a-text>
			</a-entity>
			<a-entity id="button-1-frame-14"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.284 1.690 0.487"> 
		</a-entity>
		<a-entity id="button-2-frame-14"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.284 1.292 0.387">   
		</a-entity>
		<a-entity id="button-3-frame-14"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.284 0.893 0.287">   
		</a-entity>
		<a-entity id="button-4-frame-14" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.284 0.502 0.197"  visible="false">   
		</a-entity>
		<a-entity id="button-5-frame-14" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.284 0.125 0.11"  visible="false">   
		</a-entity>
		</a-entity>
		<!--		14 Image and text end-->

		<!--		15 Image and text -->
		<a-image mouseclick="" id="light-15" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="-0.027 2.047 -13.922" scale="2.5 1.7 1" material="opacity:0.5"></a-image>
		<a-entity mouseclick="" id="gallery-15" obj-model="obj: #15-obj;" material="src: #texture-15"
			rotation="0 180 0"></a-entity>
		<a-entity data-brackets-id="8017" id="no-hmd-intro" position="0.038 0.833 -14.092"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13 0 0">
			<a-entity data-brackets-id="8018" geometry="primitive:plane;height:0.4;width:2.1"
				position="-0.081 -0.032 0.22" material="color:#000000">
				<a-text data-brackets-id="8019" id="text-15" text="align:center;width:2"></a-text>
			</a-entity>  
			<a-entity id="button-1-frame-15"       geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.424 1.690 0.525"> 
		</a-entity>
		<a-entity id="button-2-frame-15"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.424 1.292 0.525">   
		</a-entity>
		<a-entity id="button-3-frame-15"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.424 0.893 0.525">   
		</a-entity>
		<a-entity id="button-4-frame-15" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.424 0.419 0.416"  visible="false">   
		</a-entity>
		<a-entity id="button-5-frame-15" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.424 0.016 0.323"  visible="false">   
		</a-entity>
		</a-entity>
		<!--		15 Image and text end-->

		<!--		16 Image and text-->
		<a-image mouseclick="" id="light-16" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="3.801 1.925 -11.777" rotation="0 90 0" scale="2 1.7 1" material="opacity:0.5"></a-image>
		<a-entity mouseclick="" id="gallery-16" obj-model="obj: #16-obj;" material="src: #texture-16"
			position="1.917 -0.079 -17.474" rotation="0 90 0"></a-entity>
		<a-entity data-brackets-id="8373" id="no-hmd-intro" position="3.982 0.692 -11.915"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13 270 0">
			<a-entity data-brackets-id="8374" geometry="primitive:plane;height:0.4;width:2.1"
				position="0.143 0.051 0.22" material="color:#000000">
				<a-text data-brackets-id="8375" id="text-16" text="align:center;width:2"></a-text>
			</a-entity>
			<a-entity id="button-1-frame-16"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.524 1.690 0.487"> 
		</a-entity>
		<a-entity id="button-2-frame-16"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.524 1.292 0.387">   
		</a-entity>
		<a-entity id="button-3-frame-16"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.524 0.893 0.287">   
		</a-entity>
		<a-entity id="button-4-frame-16" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.524 0.45 0.185"  visible="false">   
		</a-entity>
		<a-entity id="button-5-frame-16" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.524 -0.009 0.079"  visible="false">   
		</a-entity>
		</a-entity>
		<!--		16 Image and text end-->

		<!--		17 Image and text-->
		<a-image mouseclick="" id="light-17" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="3.801 1.907 -8.133" rotation="0 90 0" scale="2 1.7 1" material="opacity:0.5"></a-image>
		<a-entity mouseclick="" id="gallery-17" obj-model="obj: #17-obj;" material="src: #texture-17"
			position="1.917 -0.079 -13.77" rotation="0 90 0"></a-entity>
		<a-entity data-brackets-id="8373" id="no-hmd-intro" position="3.991 0.726 -8.232"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13 270 0">
			<a-entity data-brackets-id="8374" geometry="primitive:plane;height:0.4;width:2.1"
				position="0.143 0.051 0.22" material="color:#000000">
				<a-text data-brackets-id="8375" id="text-17" text="align:center;width:2"></a-text>
			</a-entity>
			<a-entity id="button-1-frame-17"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.524 1.690 0.487"> 
		</a-entity>
		<a-entity id="button-2-frame-17"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.524 1.292 0.387">   
		</a-entity>
		<a-entity id="button-3-frame-17"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.524 0.893 0.287">   
		</a-entity>
		<a-entity id="button-4-frame-17" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.524 0.472 0.19"  visible="false">   
		</a-entity>
		<a-entity id="button-5-frame-17" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.524 -0.024 0.075"  visible="false">   
		</a-entity>
		</a-entity>
		<!--		17 Image and text end-->

		<!--		18 Image and text-->

		<a-image mouseclick="" id="light-18" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="3.801 1.952 -4.293" rotation="0 90 0" scale="2 1.7 1" material="opacity:0.5"></a-image>
		<a-entity mouseclick="" id="gallery-18" obj-model="obj: #18-obj;" material="src: #texture-18"
			position="1.917 -0.027 -9.969" rotation="0 90 0"></a-entity>
		<a-entity data-brackets-id="8373" id="no-hmd-intro" position="3.984 0.692 -4.429"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13 270 0">
			<a-entity data-brackets-id="8374" geometry="primitive:plane;height:0.4;width:2.1"
				position="0.143 0.051 0.22" material="color:#000000">
				<a-text data-brackets-id="8375" id="text-18" text="align:center;width:2"></a-text>
			</a-entity>
			<a-entity id="button-1-frame-18"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.524 1.690 0.487"> 
		</a-entity>
		<a-entity id="button-2-frame-18"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.524 1.292 0.387">   
		</a-entity>
		<a-entity id="button-3-frame-18"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.524 0.893 0.287">   
		</a-entity>
		<a-entity id="button-4-frame-18" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.524 0.502 0.197"  visible="false">   
		</a-entity>
		<a-entity id="button-5-frame-18" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.524 0.122 0.109"  visible="false">   
		</a-entity>
		</a-entity>
		<!--		18 Image and text end-->

		<!--		19 Image and text-->
		<a-image mouseclick="" id="light-19" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="2.92 2.063 -1.95" rotation="0 180 0" scale="1.8 1.8 1" material="opacity:0.5"></a-image>
		<a-entity mouseclick="" id="gallery-19" obj-model="obj: #19-obj;" material="src: #texture-19"
			rotation="0 180 0"></a-entity>
		<a-entity data-brackets-id="8401" id="no-hmd-intro" position="3.056 0.825 -2.057"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13 0 0">
			<a-entity data-brackets-id="8402" geometry="primitive:plane;height:0.4;width:1.6"
				position="-0.128 0.051 0.22" material="color:#000000">
				<a-text data-brackets-id="8403" id="text-19" text="align:center;width:1.5" position="0 0.003 0.001">
				</a-text>
			</a-entity>
			<a-entity id="button-1-frame-19"     geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="0.994 1.853 0.487"> 
		</a-entity>
		<a-entity id="button-2-frame-19"     geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="0.981 1.453 0.41">   
		</a-entity>
		<a-entity id="button-3-frame-19"     geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="0.981 1.075 0.336"> 
		</a-entity>
		<a-entity id="button-4-frame-19" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="0.981 0.635 0.234"  visible="false">   
		</a-entity>
		<a-entity id="button-5-frame-19" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="0.981 0.142 0.12"  visible="false">   
		</a-entity>
		<!-- <a-entity id="button-4-frame-19"     geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="0.981 0.980 0.336">   
		</a-entity> -->
			<!-- <a-sphere id="blue-cube" position="-2.82407 2.42292 -2.24988" rotation="" radius="2"
             color="blue" roughness="0.8" link="href:http://aframe.io/; " target="_blank" material=""  geometry="" 
             scale="0.5 0.5 0.00001">
            </a-sphere> -->
		</a-entity>
		<!--		19 Image and text end-->

		<!--		20 Image and text-->
		<a-image mouseclick="" id="light-20" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="5.62 2.037 -1.932" rotation="0 180 0" scale="2 1.7 1" material="opacity:0.5"></a-image>
		<a-entity mouseclick="" id="gallery-20" obj-model="obj: #20-obj;" material="src: #texture-20"
			material="src:[object HTMLImageElement]" rotation="0 180 0"></a-entity>
		<a-entity data-brackets-id="8405" id="no-hmd-intro" position="5.799 0.873 -2.055"
			geometry="primitive:plane;height:0.46;width:1.8" material="opacity:0.5;transparent:true;color:#FFFFFF"
			rotation="-13 0 0">
			<a-entity data-brackets-id="8406" geometry="primitive:plane;height:0.4;width:2.1"
				position="-0.108 0.051 0.22" material="color:#000000">
				<a-text data-brackets-id="8407" id="text-20" text="align:center;width:2"></a-text>
			</a-entity>
			<a-entity id="button-1-frame-20"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.388 1.714 0.455"> 
		</a-entity>
		<a-entity id="button-2-frame-20"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.388 1.254 0.353">   
		</a-entity>
		<a-entity id="button-3-frame-20"      geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.356 0.776 0.287">   
		</a-entity>
		<a-entity id="button-4-frame-20" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.356 0.295 0.176"  visible="false">   
		</a-entity>
		<a-entity id="button-5-frame-20" geometry="primitive:plane;height:0.3;width:0.3" rotation="13 0 0" position="1.356 -0.134 0.077"  visible="false">   
		</a-entity>
		</a-entity>
		<!--		20 Image and text end-->

		<a-entity material="src: #bg-texture" position="-7.313 0.173 5.674" rotation="0 270 0"></a-entity>

		<a-image mouseclick id="light-North-wall" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="-9.433 1.999 -0.028" rotation="0 90.01166961505233 0" scale="2 1.754 1" material="opacity:0.5">
		</a-image>
		<a-entity id="north-entity" obj-model="obj: #north-obj;" material="src: #north-texture"
			position="-7.513 -0.009 5.672" rotation="0 270 0"></a-entity>

		<a-image mouseclick id="light-South-wall" src="/act/v0.1/wallofframe/assets/textures/lightoverlay.png"
			position="9.327 1.961 -0.034" rotation="0 270 0" scale="2.5 1.7 1" material="opacity:0.5"></a-image>
		<a-entity id="south-entity" obj-model="obj: #south-obj;" material="src: #south-texture"
			position="7.436 -0.02 -5.707" rotation="0 90 0"></a-entity>

		<a-entity obj-model="obj: #podiums-obj;" material="src: #podiums-texture"></a-entity>


		<a-entity obj-model="obj: #acropolis-obj;" material="src: #acropolis-texture" position="0.043 0.01 0.041"
			rotation="180 0 180"></a-entity>

		<a-entity obj-model="obj: #castle_lake-obj;" material="src: #castle_lake-texture" rotation="180 0 180">
		</a-entity>

		<!--		//Four Light Combo-->
		<a-entity obj-model="obj: #lamps-obj;" material="src: #lamps-texture; side: double;"></a-entity>
		<a-entity obj-model="obj: #lamps-obj;" material="src: #lamps-texture; side: double;" rotation="180 0 180">
		</a-entity>
		<!--		//Four light combo end-->

		<!--		//single lights-->
		<a-entity obj-model="obj: #lamps-obj1;" material="src: #lamps-texture1; side: double;" rotation="-15 90 0"
			position="5.29 3.584 1.431"></a-entity>

		<a-entity obj-model="obj: #lamps-obj1;" material="src: #lamps-texture1; side: double;" rotation="-15 90 0"
			position="5.189 3.525 5.054"></a-entity>

		<a-entity obj-model="obj: #lamps-obj1;" material="src: #lamps-texture1; side: double;" rotation="-15 90 0"
			position="5.313 3.645 8.985"></a-entity>

		<a-entity obj-model="obj: #lamps-obj1;" material="src: #lamps-texture1; side: double;" rotation="-15 90 0"
			position="5.448 3.707 -7.043"></a-entity>

		<a-entity obj-model="obj: #lamps-obj1;" material="src: #lamps-texture1; side: double;" rotation="-15 90 0"
			position="5.44 3.621 -10.916"></a-entity>

		<a-entity obj-model="obj: #lamps-obj1;" material="src: #lamps-texture1; side: double;" rotation="-15 90 0"
			position="5.433 3.609 -14.541"></a-entity>

		<a-entity obj-model="obj: #lamps-obj1;" material="src: #lamps-texture1; side: double;" rotation="-10 -90 0"
			position="-5.469 3.415 -1.328"></a-entity>

		<a-entity obj-model="obj: #lamps-obj1;" material="src: #lamps-texture1; side: double;" rotation="-10 -90 0"
			position="-5.414 3.419 -5.246"></a-entity>

		<a-entity obj-model="obj: #lamps-obj1;" material="src: #lamps-texture1; side: double;" rotation="-10 -90 0"
			position="-5.414 3.419 -8.974"></a-entity>

		<a-entity obj-model="obj: #lamps-obj1;" material="src: #lamps-texture1; side: double;" rotation="-10 -90 0"
			position="-5.451 3.402 6.906"></a-entity>

		<a-entity obj-model="obj: #lamps-obj1;" material="src: #lamps-texture1; side: double;" rotation="-10 -90 0"
			position="-5.451 3.402 10.747"></a-entity>

		<a-entity obj-model="obj: #lamps-obj1;" material="src: #lamps-texture1; side: double;" rotation="-10 -90 0"
			position="-5.451 3.402 14.534"></a-entity>

		<a-entity obj-model="obj: #lamps-obj1;" material="src: #lamps-texture1; side: double;" rotation="-10 -90 0"
			position="-10.785 3.515 2.761"></a-entity>

		<a-entity obj-model="obj:/act/v0.1/wallofframe/assets/models/lampsnew.obj"
			material="src: #lamps-texture1; side: double;" rotation="-15 90 0" position="10.657 3.588 -2.773">
		</a-entity>

	</a-scene>

	<script src="/act/v0.1/verbose/common.js"></script>
	<script src="/act/v0.1/wallofframe/assets/js/main.js"></script>
	<script src="/act/v0.1/verbose/SplashScreen.js"></script>

</body>
</html>