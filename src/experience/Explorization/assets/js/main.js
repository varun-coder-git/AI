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

document.querySelector("a-scene").addEventListener("enter-vr", function () {
  vrmodeOn();
  // if (screen.width < 1024) {
  //   var cameraEntity = document.querySelector("#camera");
  //   cameraEntity.setAttribute("position", "0 0 0");
  // }
});
var isMobile = false;
var Url;
experienceStarted = false;
AFRAME.registerComponent("mouseclick", {
  init: function () {
    this.el.addEventListener("mouseenter", function () {
      if (experienceStarted == true) {
        focusTime = 0;
        if (startTracking) {
          if (this.getAttribute("id").split("-")[2] == "wall") {
            params.Verb = "started Viewing";
            params.Object =
              this.getAttribute("id").split("-")[1] + " Branding Image";
            params.Sentence =
              params.Actor + " " + params.Verb + " " + params.Object;
            callToTacking.callToApi(params);
            if (xapiEnable) {
              sendToXapi(
                "Viewed",
                "viewed",
                params.Object,
                params.Object.replace(/\s/g, "")
              );
            }
          } else {
            params.Verb = "started Viewing";
            params.Object =
              museum_data.gallery_data[
                parseInt(this.getAttribute("id").split("-")[1]) - 1
              ].frame_name;
            params.Sentence =
              params.Actor + " " + params.Verb + " " + params.Object;
            callToTacking.callToApi(params);
            if (xapiEnable) {
              sendToXapi(
                "Viewed",
                "viewed",
                params.Object,
                params.Object.replace(/\s/g, "")
              );
            }
          }
        }
      }
    });

    this.el.addEventListener("mouseleave", function () {
      if (experienceStarted == true) {
        if (startTracking) {
          if (this.getAttribute("id").split("-")[2] == "wall") {
            params.Verb = "completed Viewing";
            params.Object =
              this.getAttribute("id").split("-")[1] + " Branding Image";
            params.Sentence =
              params.Actor + " " + params.Verb + " " + params.Object;
            callToTacking.callToApi(params);

            params.Verb = "Viewed";
            params.Object =
              this.getAttribute("id").split("-")[1] +
              " Branding Image for " +
              focusTime +
              " sec";
            params.Sentence =
              params.Actor + " " + params.Verb + " " + params.Object;
            callToTacking.callToApi(params);
            if (xapiEnable) {
              sendToXapi(
                "Viewed",
                "viewed",
                params.Object,
                params.Object.replace(/\s/g, "")
              );
            }
          } else {
            params.Verb = "completed Viewing";
            params.Object =
              museum_data.gallery_data[
                parseInt(this.getAttribute("id").split("-")[1]) - 1
              ].frame_name;
            params.Sentence =
              params.Actor + " " + params.Verb + " " + params.Object;
            callToTacking.callToApi(params);

            params.Verb = "Viewed";
            params.Object =
              museum_data.gallery_data[
                this.getAttribute("id").split("-")[1] - 1
              ].frame_name +
              " for " +
              focusTime +
              " sec";
            params.Sentence =
              params.Actor + " " + params.Verb + " " + params.Object;
            callToTacking.callToApi(params);
            if (xapiEnable) {
              sendToXapi(
                "Viewed",
                "viewed",
                params.Object,
                params.Object.replace(/\s/g, "")
              );
            }
          }
          focusTime = 0;
        }
      }
    });
  },
});

var callToTacking = new TrackingData();
var focusTime = 0,
  screenActiveTime = 0;
var framename = "";
var action = "";
var ExperienceName = "";
var startTracking = false;
var xapiEnable = false;
var museum_data = {};
function countdown() {
  // var cam = document.querySelector("#cameraWrapper");
  // cam.emit('skayroation');
  // var element = document.getElementById("autoAnimation");
  //  element.parentNode.removeChild(element);
  // document.getElementsById("autoAnimation").remove();

  startFlagActive();
  // var cameraEntity = document.querySelector('#cameraEntity');
  // cameraEntity.setAttribute('wasd-controls-enabled','true');
  // cameraEntity.setAttribute('keyboard-controls','');
  var sound = document.getElementById("sound");
  sound.setAttribute("src", museum_data.audio_url);
  var audio1 = document.getElementById("audio1");
  audio1.setAttribute("sound", "src:");
  audio1.setAttribute("sound", "src: #sound");
  audio1.components.sound.playSound();

  startTracking = true;
  callToTacking.callToApi(params);
  addExperienceResult(
    params.UserId,
    params.PatronId,
    params.PublishedExperienceId,
    0
  );
  function tick() {
    focusTime++;
    screenActiveTime++;
    if (screenActiveTime == 5) {
      addExperienceView(params.PatronId, params.PublishedExperienceId);
    }
    if (screenActiveTime % 10 == 0) updateExperienceResult(10, 0, 0, "N/A");
    setTimeout(tick, 1000);
  }
  tick();
}

var params = {
  UserId: "",
  PatronId: "",
  PublishedExperienceId: "",
  RoomId: "",
  Actor: "",
  Verb: "",
  Object: "",
  Sentence: "",
};

function assignVerboseData(data) {
  if (data.EnablexAPI == 1) {
    xapiEnable = true;
    callToTacking.setData(true, true);
    setXAPIData(data);
    //IntializeXapi();
  } else callToTacking.setData(false, true);
  params.UserId = data.UserId;
  params.PatronId = data.patronId;
  params.PublishedExperienceId = data.Id;
  params.RoomId = data.roomId;
  if (data.patronName != null) params.Actor = data.patronName;
  else params.Actor = "Guest";
  params.Verb = "Started watching";
  params.Object = data.ExperienceName;
  params.Sentence = params.Actor + " Started watching " + data.ExperienceName;
  if (xapiEnable) {
    sendToXapi(
      "Launched",
      "launched",
      data.ExperienceName,
      data.ExperienceName.replace(/\s/g, "")
    );
  }
}

function sendToXapi(verb, urlVerb, objectText, ObjectUrlName) {
  sendVerboseToXapi(
    verb,
    "http://adlnet.gov/expapi/verbs/" + urlVerb,
    objectText,
    "http://adlnet.gov/expapi/activities/HallOfFrame",
    "http://id.tincanapi.com/activity/experizer-template/" +
    ObjectUrlName.toLowerCase(),
    "http://adlnet.gov/expapi/activities/course",
    "Activity"
  );
}

var experienceStarted = false;
function hexToRgb(hex, opacity) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      alpha: opacity,
    }
    : null;
}


function loadExperience(museumData, ExperienceName) {
  console.log("data",museumData);
//  museum_temp = {"gallery_data":[{"image_id":"1","image_path":"assets/textures/defaultgallery.jpg","image_description":"Frame one","frame_name":"Frame one","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://www.google.com","button_media":"Web",},{"button":"assets/images/play.png","button_content":"assets/videos/demo.mp4","button_media":"Video",},{"button":"","button_content":"assets/videos/videoplayback.mp4","button_media":"Video",}]},{"image_id":"2","image_path":"assets/images/chitkara/events/cultural 1.jpg","image_description":"Frame two","frame_name":"Frame two","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://stackoverflow.com/","button_media":"Web",},{"button":"assets/images/play.png","button_content":"assets/videos/videoplayback.mp4","button_media":"Video",},{"button":"","button_content":"","button_media":"Audio",}]},{"image_id":"3","image_path":"assets/images/chitkara/events/cultural 2.jpg","image_description":"Frame three","frame_name":"Frame three","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://www.w3schools.com/","button_media":"Web",},{"button":"assets/images/play.png","button_content":"","button_media":"Video",},{"button":"","button_content":"","button_media":"Audio",}]},{"image_id":"4","image_path":"assets/images/chitkara/events/cultural 3.jpg","image_description":"Frame four","frame_name":"Frame four","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://outlook.office.com/","button_media":"Web",},{"button":"assets/images/play.png","button_content":"","button_media":"Video",},{"button":"","button_content":"","button_media":"Audio",}]},{"image_id":"5","image_path":"assets/images/chitkara/logo/images.png","image_description":"Frame five","frame_name":"Frame five","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://www.chitkara.edu.in/","button_media":"Web",},{"button":"assets/images/play.png","button_content":"assets/videos/videoplayback.mp4","button_media":"Video",},{"button":"","button_content":"","button_media":"Audio",}]},{"image_id":"6","image_path":"assets/images/chitkara/events/convocation.jpg","image_description":"Frame six","frame_name":"Frame six","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://github.com/","button_media":"Web",},{"button":"assets/images/play.png","button_content":"","button_media":"Video",},{"button":"","button_content":"","button_media":"Audio",}]},{"image_id":"7","image_path":"assets/images/chitkara/events/culture4.jpg","image_description":"Frame seven","frame_name":"Frame seven","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://aframe.io/","button_media":"Web",},{"button":"assets/images/play.png","button_content":"","button_media":"Video",},{"button":"","button_content":"","button_media":"Audio",}]},{"image_id":"8","image_path":"assets/images/chitkara/events/culture5.jpg","image_description":"Frame eight","frame_name":"Frame eight","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://www.google.com","button_media":"Web",},{"button":"assets/images/play.png","button_content":"","button_media":"Video",},{"button":"","button_content":"","button_media":"Audio",}]},{"image_id":"9","image_path":"assets/textures/defaultgallery.jpg","image_description":"Frame nine","frame_name":"Frame nine","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://stackoverflow.com/","button_media":"Web",},{"button":"assets/images/play.png","button_content":"","button_media":"Video",},{"button":"","button_content":"","button_media":"Audio",}]},{"image_id":"10","image_path":"assets/textures/defaultgallery.jpg","image_description":"Frame ten","frame_name":"Frame ten","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://outlook.office.com/","button_media":"Web",},{"button":"assets/images/play.png","button_content":"","button_media":"Video",},{"button":"","button_content":"","button_media":"Audio",}]},{"image_id":"11","image_path":"assets/textures/defaultgallery.jpg","image_description":"Frame eleven","frame_name":"Frame eleven","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://aframe.io/","button_media":"Web",},{"button":"assets/images/play.png","button_content":"","button_media":"Video",},{"button":"","button_content":"","button_media":"Audio",}]},{"image_id":"12","image_path":"assets/images/Khyati foundation/Events/unnamed (1).jpg","image_description":"Frame twelve","frame_name":"Frame twelve","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://www.google.com","button_media":"Web",},{"button":"assets/images/play.png","button_content":"","button_media":"Video",},{"button":"","button_content":"","button_media":"Audio",}]},{"image_id":"13","image_path":"assets/images/Khyati foundation/Events/unnamed (2).jpg","image_description":"Frame thirteen","frame_name":"Frame thirteen","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://www.google.com","button_media":"Web",},{"button":"assets/images/play.png","button_content":"","button_media":"Video",},{"button":"","button_content":"","button_media":"Audio",}]},{"image_id":"14","image_path":"assets/images/Education Counselling Mela/Education counselling_ss2.jpg","image_description":"Frame fourteen","frame_name":"Frame fourteen","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://www.google.com","button_media":"Web",},{"button":"assets/images/play.png","button_content":"","button_media":"Video",},{"button":"","button_content":"","button_media":"Audio",}]},{"image_id":"15","image_path":"assets/images/Education Counselling Mela/Education counselling_ss1.jpg","image_description":"Frame fifteen","frame_name":"Frame fifteen","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://imaginxp.com/ecm/","button_media":"Web",},{"button":"assets/images/play.png","button_content":"assets/images/Education Counselling Mela/Launching ECM.mp4","button_media":"Video",},{"button":"","button_content":"","button_media":"Audio",}]},{"image_id":"16","image_path":"assets/images/Education Counselling Mela/Education counselling_ss3.jpg","image_description":"Frame sixteen","frame_name":"Frame sixteen","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://www.google.com","button_media":"Web",},{"button":"assets/images/play.png","button_content":"","button_media":"Video",},{"button":"","button_content":"","button_media":"Audio",}]},{"image_id":"17","image_path":"assets/images/Khyati foundation/Events/unnamed.jpg","image_description":"Frame seventeen","frame_name":"Frame seventeen","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://www.google.com","button_media":"Web",},{"button":"assets/images/play.png","button_content":"","button_media":"Video",},{"button":"","button_content":"","button_media":"Audio",}]},{"image_id":"18","image_path":"assets/images/Khyati foundation/Events/unnamed(7).jpg","image_description":"Frame eighteen","frame_name":"Frame eighteen","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://www.google.com","button_media":"Web",},{"button":"assets/images/play.png","button_content":"","button_media":"Video",},{"button":"","button_content":"","button_media":"Audio",}]},{"image_id":"19","image_path":"assets/textures/defaultgallery.jpg","image_description":"Frame nineteen","frame_name":"Frame nineteen","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://www.google.com","button_media":"Web",},{"button":"assets/images/play.png","button_content":"","button_media":"Video",},{"button":"","button_content":"","button_media":"Audio",}]},{"image_id":"20","image_path":"assets/textures/defaultgallery.jpg","image_description":"Frame twenty","frame_name":"Frame twenty","buttonsArray":[{"button":"assets/images/web.png","button_content":"https://www.google.com","button_media":"Web",},{"button":"assets/images/play.png","button_content":"","button_media":"Video",},{"button":"","button_content":"","button_media":"Audio",}]}]}
  museum_data = museumData;
  ExperienceName = ExperienceName;

  //if json includes splashbgcolor and opacity
  if (museum_data.splashBackgroundColor && museum_data.Opacity) {
    var rgbformat = hexToRgb(
      museum_data.splashBackgroundColor,
      museum_data.Opacity
    );
    document.getElementById("innerInfo").style.backgroundColor =
      "rgba(" +
      rgbformat.r +
      "," +
      rgbformat.g +
      "," +
      rgbformat.b +
      "," +
      rgbformat.alpha +
      ")";
  }
  //if json includes splashheadercolor
  if (museum_data.splashHeaderColor) {
    document.getElementById("titleText").style.color =
      museum_data.splashHeaderColor;
  }
  document.getElementById("titleText").innerHTML = ExperienceName;
  if (isMobile && museumData.splash_android_instruction != undefined) {
    document.getElementById('instruction').innerHTML = museum_data.splash_android_instruction;
  } else {
    document.getElementById('instruction').innerHTML = museum_data.splash_instruction;
  }
  document.getElementById("titleDescription").innerHTML =
    museum_data.launch_text;
  document.getElementById("splashLogo").src = museum_data.splash_image;
  loggedin = true;
  // if (museum_data["entry_view"]) {
  // 	$("#CamEntity").attr("rotation", museum_data["entry_view"]);
  // }
  var i;
  for (i = 1; i <= museum_data.gallery_data.length; i++) {
    var gallery_entity = document.querySelector("#gallery-" + i);
    var changedgallery = document.querySelector("#texture-" + i);
    changedgallery.setAttribute("src", museum_data.gallery_data[i - 1].image_path);
    gallery_entity.setAttribute("material", "src: #defaultgallery");
    gallery_entity.setAttribute("material", "src: #texture-" + i);
    var textview = document.getElementById("text-" + i);
    textview.setAttribute("value", museum_data.gallery_data[i - 1].image_description);

    for (j = 1; j <= museum_data.gallery_data[i - 1].buttonsArray.length; j++) {
      var button = document.querySelector("#button-" + j + "-frame-" + i);
    //  console.log(button);
    button.removeAttribute("foo");
      button.setAttribute("material", "src: " + museum_data.gallery_data[i - 1].buttonsArray[j - 1].button + "; opacity:0.9;");
      button.setAttribute("visible", "false");
      if (" " != museum_data.gallery_data[i - 1].buttonsArray[j - 1].button) {
        button.setAttribute("foo","");
        button.setAttribute("class","clickable")
        button.setAttribute("visible", "true");
      }
    }

  }

  var north_texture = document.querySelector("#north-texture");
  north_texture.setAttribute("src", museum_data.north_wall);
  var north_wall = document.querySelector("#north-entity");
  north_wall.setAttribute("material", "src: #defaultgallery");
  north_wall.setAttribute("material", "src: #north-texture");

  var south_texture = document.querySelector("#south-texture");
  south_texture.setAttribute("src", museum_data.south_wall);
  var south_wall = document.querySelector("#south-entity");
  south_wall.setAttribute("material", "src: #defaultgallery");
  south_wall.setAttribute("material", "src: #south-texture");
  var halltexture = document.querySelector("#hall");
  const regEx = /^https/;
	if(museum_data.isHallUploaded){
    halltexture.setAttribute("material","src:"+museum_data.decore_option_hall);
    const regExFloor = /^https/;
    if(regExFloor.test(museum_data.centerFloor)){
      var floortexture = document.querySelector('#floor');
      floortexture.setAttribute('material', 'src:' + museum_data.centerFloor);
    }
    else{
      var floortexture = document.querySelector("#floor");
      floortexture.setAttribute("material","src: /act/v0.1/wallofframe/assets/textures/" +museum_data.decore_option +"-floor.jpg");
    }
    if(regExFloor.test(museum_data.frontFloor)){
      var floortexture = document.querySelector('#floor2');
      floortexture.setAttribute('material', 'src:' + museum_data.frontFloor);
    }
    else{
      var floortexture = document.querySelector("#floor2");
      floortexture.setAttribute("material","src: /act/v0.1/wallofframe/assets/textures/" +museum_data.decore_option +"-floor.jpg");
    }
    if(regExFloor.test(museum_data.backFloor)){
      var floortexture = document.querySelector('#floor3');
      floortexture.setAttribute('material', 'src:' + museum_data.backFloor);
    }
    else{
      var floortexture = document.querySelector("#floor3");
      floortexture.setAttribute("material","src: /act/v0.1/wallofframe/assets/textures/" +museum_data.decore_option +"-floor.jpg");
    }
  }else{
    const regExFloor = /^https/;
    if(regExFloor.test(museum_data.centerFloor)){
      var floortexture = document.querySelector('#floor');
      floortexture.setAttribute('material', 'src:' + museum_data.centerFloor);
    }
    else{
      var floortexture = document.querySelector("#floor");
      floortexture.setAttribute("material","src: /act/v0.1/wallofframe/assets/textures/" +museum_data.decore_option +"-floor.jpg");
    }
    if(regExFloor.test(museum_data.frontFloor)){
      var floortexture = document.querySelector('#floor2');
      floortexture.setAttribute('material', 'src:' + museum_data.frontFloor);
    }
    else{
      var floortexture = document.querySelector("#floor2");
      floortexture.setAttribute("material","src: /act/v0.1/wallofframe/assets/textures/" +museum_data.decore_option +"-floor.jpg");
    }
    if(regExFloor.test(museum_data.backFloor)){
      var floortexture = document.querySelector('#floor3');
      floortexture.setAttribute('material', 'src:' + museum_data.backFloor);
    }
    else{
      var floortexture = document.querySelector("#floor3");
      floortexture.setAttribute("material","src: /act/v0.1/wallofframe/assets/textures/" +museum_data.decore_option +"-floor.jpg");
    }
    halltexture.setAttribute("material","src: /act/v0.1/wallofframe/assets/textures/"+museum_data.decore_option +"-hall.jpg");
  }
//  halltexture.setAttribute("material","src: /act/v0.1/wallofframe/assets/textures/"+museum_data.decore_option +"-hall.jpg");
}

function getExperienceUrl() {
  var mode = "";
  Url = window.location.href;
  if (Url.indexOf("index-hd.php") > 0) {
    $("#onOffSwitch").addClass("onoffswitch1-innerHD");
    mode = "HD mode ON";
  } else {
    $("#onOffSwitch").addClass("onoffswitch1-innerSD");
    mode = "SD mode ON";
  }
  document.getElementById("mode").innerHTML = mode;
}



function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

function saveForm()
{
  var firstName=document.getElementById("fName").value;
      //  var lastName=document.getElementById("lName").value;
        var email=document.getElementById("email").value;
        var cno=document.getElementById("cno").value;
        var iret=0;
        var filter=/^[a-z ,.'-]+$/i;
        if(firstName=="" || filter.test(firstName)==false || firstName.length<3 )
          document.getElementById("invalid-fname").style.display = "block";
        else
        {
          document.getElementById("invalid-fname").style.display = "none";

           iret=+1;
        }
       
       
        // if(lastName=="" || lastName==" " || filter.test(lastName)==false || lastName.length<3)
        //   document.getElementById("invalid-lname").style.display = "block"
        // else
        //   {
        //     document.getElementById("invalid-lname").style.display = "none"
        //     iret+=1;
        //   }

      
         filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
         if(email=="" || email==" " || filter.test(email)==false)
          document.getElementById("invalid-email").style.display = "block"
        else
        {
          document.getElementById("invalid-email").style.display = "none";

          iret+=1;

        }

        filter=/[7-9]{1}[0-9]{9}/;
        if(cno=="" || cno==" "|| filter.test(cno)==false || cno.length!=10)
          document.getElementById("invalid-cno").style.display = "block"
        else 
          {
            document.getElementById("invalid-cno").style.display = "none"

            iret+=1;
          }
  if(iret==3)
  {
 var jsonData={};
 jsonData ["name"] = firstName;
// jsonData ["lastname"] = lastName;
 jsonData ["email"] = email;
 jsonData ["mobile"] = cno;
// SendToMySql(jsonData)
 document.getElementById("popupForm").style.display = "none";
  }
}

function SendToMySql(jsonData){
var token="VlItRXhwZXJpc2VyIHBhc3N3b3Jk";
var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
var theUrl = "https://imaginxp.com/wp-json/wp/v2/users/vrlead";
xmlhttp.open("POST", theUrl);
xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.setRequestHeader('Authorization', 'Bearer VlItRXhwZXJpc2VyIHBhc3N3b3Jk');
xmlhttp.send(JSON.stringify(jsonData));
}

$(document).ready(function () {

  var startExperienteBtn = document.getElementById("start_experience");
  $('#start_experience').click(function () {
    cam = document.getElementById("rig");
    cam.setAttribute("animation", "enabled:false");
    cam.setAttribute("animation__one", "enabled:true");
    //  setTimeout(function(){ 
    //   document.getElementById("popupInstructions").style.display = "block";
    //  }, 1000);
    
    
    // setTimeout(function(){ 
    //   document.getElementById("popupInstructions").style.display = "none";
    //   document.getElementById("popupForm").style.display = "block";
    // }, 5000);
   
  });
 
  var userAgent = navigator.userAgent;
  if (
    userAgent.includes("Mobile") ||
    userAgent.includes("Android") ||
    userAgent.includes("iPhone") || userAgent.includes("OculusBrowser")
  ) {
    var cameraId = document.querySelector("#cursorImage");
    cameraId.removeAttribute('cursor');
    cameraId.setAttribute("cursor", "fuse: true; fuseTimeout: 500");
    cameraId.setAttribute("scale", "1 1 1");
    var rig = document.querySelector("#rig");
    rig.removeAttribute('movement-controls');
    isMobile = true;

  } else {
    var cameraId = document.querySelector("#cursorImage");
    cameraId.setAttribute("scale", "0 0 0");
  }
  makeCode();
  getExperienceUrl();

  $("#divOnOff").click(function () {
    $("#divOnOff").prop("disabled", true);
    var mode = "";
    if (Url.indexOf("index-hd.php") > 0) {
      var Index = Url.indexOf("index-hd.php");
      var location = Url.slice(0, Index) + Url.slice(Index + 12);
      window.location = location;
    } else {
      var Index = Url.indexOf("?");
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
  var url =
    "https://api.qrserver.com/v1/create-qr-code/?data=" +
    window.location.href +
    "&amp;size=50x50";
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
};
var timer = setInterval(startexp, 500);
var assetsLoaded = false;
var loggedin = false;
$(window).on("load", function () {
  setTimeout(function () {
    assetsLoaded = true;
  }, 3000);
});

AFRAME.registerComponent('ristrict', {
  init: function () {
    this.el.addEventListener('collide', function (e) {
      console.log('Player has collided with ', e.detail.body.el);
      e.detail.target.el; // Original entity (playerEl).
      e.detail.body.el; // Other entity, which playerEl touched.
      e.detail.contact; // Stats about the collision (CANNON.ContactEquation).
      e.detail.contact.ni; // Normal (direction) of the collision (CANNON.Vec3).
    });
  }
})

 var currentPlayingElement=[];
 var currentImageElement=[];
AFRAME.registerComponent('foo', {
  init: function () {
    this.el.addEventListener('click', function (evt) {

      var temp = evt.target.id;
      var indexArray = temp.split('-');
     
      var btnIndex = indexArray[1];
      var frameIndex = indexArray[3];
      var k, l;
      for (k = 1; k <= museum_data.gallery_data.length; k++) {
        for (l = 1; l <= museum_data.gallery_data[k - 1].buttonsArray.length; l++) {
          if (k == frameIndex && l == btnIndex) {
            if(museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_media=="Web"){
            window.open(museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_content, '_blank');
            }
            else if(museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_media=="Video"){

              
              if(currentPlayingElement[0] == frameIndex) {
                console.log("Same frame play: ",frameIndex);
                console.log("Same frame play btnIndex: ",btnIndex);
               
                var remElm= document.querySelector("#gallery-" + currentPlayingElement[0]);
                remElm.setAttribute("material", "src:#texture-"+ currentPlayingElement[0]);
                var video=document.getElementById("penguin-sledding");
                video.pause();

               
                playBtn(frameIndex, currentPlayingElement[1]); 
                currentPlayingElement[0] = null;
                if(currentPlayingElement[1] != btnIndex) {
                 
                  pauseBtn(frameIndex, btnIndex); 
              
                  var button_video= document.querySelector("#gallery-" + frameIndex);
              var video=document.getElementById("penguin-sledding");
              video.setAttribute("src",museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_content);
             // video.setAttribute("src",museum_data.gallery_data[frameIndex].buttonsArray[btnIndex].button_content);
              button_video.setAttribute("material","src:#penguin-sledding");
              video.load();
              video.play();
              currentPlayingElement[1] = btnIndex;
              currentPlayingElement[0] = frameIndex;
                } else {
                  currentPlayingElement[1] = null;
                  currentPlayingElement[0] = null;
                 }
              
              
                
               // currentPlayingElement[0] = null;
                break;
              } else if(currentPlayingElement[0] != null && currentPlayingElement[0] != frameIndex ) {
                console.log("Else block Same frame play: ",frameIndex);
                console.log(" Else block Same frame play btnIndex: ",btnIndex);
                var remElm= document.querySelector("#gallery-" + currentPlayingElement[0]);
                remElm.setAttribute("material", "src:#texture-"+ currentPlayingElement[0]);

                playBtn(currentPlayingElement[0], currentPlayingElement[1]);
                pauseBtn(frameIndex, btnIndex);
            
              }
              console.log("initial block Same frame play: ",frameIndex);
              console.log(" initial block Same frame play btnIndex: ",btnIndex);
              currentPlayingElement[0] = frameIndex;
              currentPlayingElement[1] = btnIndex;
             
            
              var button_video= document.querySelector("#gallery-" + frameIndex);
              var video=document.getElementById("penguin-sledding");
              video.setAttribute("src",museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_content);
              button_video.setAttribute("material","src:#penguin-sledding");
              video.load();
              video.play();
              var light_entity=document.querySelector("#light-" + frameIndex);
              light_entity.setAttribute("visible","false");
              pauseBtn(frameIndex, btnIndex);

              

             // console.log("needToRemoveEle",document.querySelector("#gallery-" + frameIndex));
            }
            else if(museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_media=="Image"){
                   // var button_image= document.querySelector("#gallery-" + frameIndex);
              // button_image.setAttribute("material","src:#"+museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_content);
            //   var gallery_entity = document.querySelector("#gallery-" + frameIndex);
            //   var changedgallery = document.querySelector("#texture-" + frameIndex);
            //   changedgallery.setAttribute("src", museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_content);
            //   gallery_entity.setAttribute("material", "src: #defaultgallery");
            //   gallery_entity.setAttribute("material", "src: #texture-" + frameIndex);
          //    alert(museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_content );


		  if(currentImageElement[0] == frameIndex) {
        console.log("Same frame play: ",frameIndex);
        console.log("Same frame play btnIndex: ",btnIndex);
       
        var remElm= document.querySelector("#gallery-" + currentImageElement[0]);
remElm.setAttribute("material", "src:#texture-"+ currentImageElement[0]);
var gallery_entity = document.querySelector("#gallery-" + frameIndex);
      var changedgallery = document.querySelector("#texture-" + frameIndex);
      changedgallery.setAttribute("src", museum_data.gallery_data[k - 1].image_path);
      gallery_entity.setAttribute("material", "src: #defaultgallery");
      gallery_entity.setAttribute("material", "src: #texture-" + frameIndex);
         
        currentImageElement[0] = null;
        if(currentImageElement[1] != btnIndex) {
         
       
      
      var gallery_entity = document.querySelector("#gallery-" + frameIndex);
      var changedgallery = document.querySelector("#texture-" + frameIndex);
      changedgallery.setAttribute("src", museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_content);
      gallery_entity.setAttribute("material", "src: #defaultgallery");
      gallery_entity.setAttribute("material", "src: #texture-" + frameIndex);
      currentImageElement[1] = btnIndex;
      currentImageElement[0] = frameIndex;
        } else {
  currentImageElement[1] = null;
  currentImageElement[0] = null;
         }
      
      
        
       // currentPlayingElement[0] = null;
        break;
      } else if(currentImageElement[0] != null && currentImageElement[0] != frameIndex ) {
        console.log("Else block Same frame play: ",frameIndex);
        console.log(" Else block Same frame play btnIndex: ",btnIndex);
        var remElm= document.querySelector("#gallery-" + currentImageElement[0]);
        remElm.setAttribute("material", "src:#texture-"+ currentImageElement[0]);

        // playBtn(currentImageElement[0], currentImageElement[1]);
        // pauseBtn(frameIndex, btnIndex);
    
      }
      console.log("initial block Same frame play: ",frameIndex);
      console.log(" initial block Same frame play btnIndex: ",btnIndex);
      currentImageElement[0] = frameIndex;
      currentImageElement[1] = btnIndex;
          
var gallery_entity = document.querySelector("#gallery-" + frameIndex);
      var changedgallery = document.querySelector("#texture-" + frameIndex);
      changedgallery.setAttribute("src", museum_data.gallery_data[k - 1].buttonsArray[l - 1].button_content);
      gallery_entity.setAttribute("material", "src: #defaultgallery");
      gallery_entity.setAttribute("material", "src: #texture-" + frameIndex);

            }
          }
        }
      }
      // console.log(temp);
    });



  },
});
function pauseBtn( frameIdx,  btnIdx) {
  var tempPlayPause="#button-"+btnIdx+"-frame-"+frameIdx;
  var playPausebuttton=document.querySelector(tempPlayPause);
  if(museum_data.pauseMediaButton){
	playPausebuttton.setAttribute("material", "src:"+museum_data.pauseMediaButton);
  }else{
	playPausebuttton.setAttribute("material", "src:assets/images/play_2.png; opacity:0.9;");
  } 
}
function playBtn( frameIdx,  btnIdx) {
  var tempPlayPause="#button-"+btnIdx+"-frame-"+frameIdx;
  var playPausebuttton=document.querySelector(tempPlayPause);
  const regEx = /^https/;
  if(regEx.test(museum_data.gallery_data[frameIdx - 1].buttonsArray[btnIdx - 1].button)){
	playPausebuttton.setAttribute("material", "src:"+museum_data.gallery_data[frameIdx - 1].buttonsArray[btnIdx - 1].button);
}
else{
	playPausebuttton.setAttribute("material", "src:assets/images/play.png; opacity:0.9;");
}
}