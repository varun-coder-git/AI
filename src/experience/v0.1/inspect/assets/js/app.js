/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
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
var experienceJSON = "";
var isMobile=false;
function hexToRgb(hex, opacity) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        alpha: opacity
      }
    : null;
}
var modelCount='';


function loadExperience(data, ExperienceName) {
  //if json includes splashbgcolor and opacity

  experienceJSON = data;
 
  if (data.splashBackgroundColor && data.Opacity) {
    var rgbformat = hexToRgb(data.splashBackgroundColor, data.Opacity);
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
  if (data.splashHeaderColor) {
    document.getElementById("titleText").style.color = data.splashHeaderColor;
  }
  document.getElementById("titleText").innerHTML = ExperienceName;
  // document.getElementById("instruction").innerHTML = data.splash_instruction
  //   ? data.splash_instruction
  //   : "";
  if (isMobile && data.splash_android_instruction!=undefined) {
		document.getElementById('instruction').innerHTML = data.splash_android_instruction;
	  } else {
		document.getElementById('instruction').innerHTML = data.splash_instruction;
   }
  document.getElementById("titleDescription").innerHTML = data.launch_text
    ? data.launch_text
    : "";
  document.getElementById("splashLogo").src = data.splash_image;
  loggedin = true;
  var aLight = "";

    load(experienceJSON);
    assetsLoaded = true;
}

$(document).ready(() => {
  var userAgent = navigator.userAgent;
  if (
    userAgent.includes("Mobile") ||
    userAgent.includes("Android") ||
    userAgent.includes("iPhone")
  ) {
    isMobile=true;
  }
  // calculateLoadTimes();
//   var loadTime = window.performance.timing.domContentLoadedEventEnd- window.performance.timing.navigationStart;
// console.log("loadTime",loadTime);
  for(i=0;i<=9;i++){
    var marker="marker"+i+".patt";
    localStorage.setItem(marker,"");
  }
  var startExperienteBtn = document.getElementById("start_experience");
  startExperienteBtn.onclick = function() {
    
  document.getElementById("aScene").style.display="block";
   document.getElementById("container").style.display = "none";
    document.getElementById("loaderq").style.display = "none";
    experienceStarted = true;
   
  
  };
});

var timer = setInterval(startexp, 500);
var assetsLoaded = false;
var loggedin = false;


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
  makeCode();
  var Url = window.location.href;
  getExperienceUrl()

  $("#divOnOff").click(function () {
    $("#divOnOff").prop('disabled', true);
    var mode = '';
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
  var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + window.location.href + '&amp;size=50x50';
  document.getElementById("qrcode").src = url;
  // qrcode.makeCode(window.location.href);
}

var startexp = function () {
  var start = document.getElementById("start_experience");
  if (assetsLoaded && loggedin) {
    $("#loading").addClass("disabled");
    if (start.classList.contains("disabled")) {
      start.classList.remove("disabled");

      clearTimeout(timer);
    }
  }
}

  function load(experienceJSON) {
    var sceneEl = document.querySelector("a-scene");
    for (var i = 0; i < experienceJSON.actionPoints.length; i++) {
      // eslint-disable-next-line no-loop-func
      if (experienceJSON.actionPoints[i].object_type == "obj" && experienceJSON.actionPoints[i].pattFile_path != "") {
        var entity1 = document.createElement("a-marker");
        entity1.setAttribute("preset", "custom");
        entity1.setAttribute("type", "pattern");
        entity1.setAttribute("id", "marker" + i);
        entity1.setAttribute("title",experienceJSON.actionPoints[i].model_name );
        entity1.setAttribute("markerhandler", "");
        entity1.setAttribute("url", experienceJSON.actionPoints[i].pattFile_path);
        var entity11 = document.createElement("a-entity");
        entity11.setAttribute("id", "obj" + i);
        entity11.setAttribute( "obj-model", "obj: url(" + experienceJSON.actionPoints[i].model +");mtl: url(" +experienceJSON.actionPoints[i].mtl +")");    
        entity11.setAttribute("scale", experienceJSON.actionPoints[i].obj_scale); 
        entity11.setAttribute("rotation", experienceJSON.actionPoints[i].obj_rotation);
        entity11.setAttribute("static-body", "static-body");
        entity11.setAttribute("response-type", "arraybuffer");
        entity11.setAttribute("shadow", "cast: true");
        entity11.setAttribute("material","opacity:0;transparent:true;color:#FFFFFF");
        entity11.setAttribute("animation-mixer", "");
        entity11.setAttribute("modify-materials","");
        entity1.appendChild(entity11);
        sceneEl.appendChild(entity1);
        modelCount++;
        
      } else if(experienceJSON.actionPoints[i].object_type == "gltf" && experienceJSON.actionPoints[i].pattFile_path != ""){
        var entity2 = document.createElement("a-marker");
        entity2.setAttribute("preset", "custom");
        entity2.setAttribute("type", "pattern");
        entity2.setAttribute("markerhandler", "");
        entity2.setAttribute("id", "marker" + i);
        entity2.setAttribute("title",experienceJSON.actionPoints[i].model_name );
        entity2.setAttribute("url", experienceJSON.actionPoints[i].pattFile_path);
        var entity21 = document.createElement("a-entity");
        entity21.setAttribute("id", "obj" + i);
        entity21.setAttribute("gltf-model",experienceJSON.actionPoints[i].model);
        entity21.setAttribute("scale", experienceJSON.actionPoints[i].obj_scale);
        entity21.setAttribute("rotation", experienceJSON.actionPoints[i].obj_rotation);
        entity21.setAttribute("static-body", "static-body");
        entity21.setAttribute("response-type", "arraybuffer");
        entity21.setAttribute("shadow", "cast: true");
        entity21.setAttribute("animation-mixer", "");
        entity21.setAttribute("modify-materials","");
        entity2.appendChild(entity21);
        sceneEl.appendChild(entity2);
        modelCount++;
      }
    }
    if(i==experienceJSON.actionPoints.length){
      handle();
      AFRAME.registerComponent('modify-materials', {
        init: function () {
          // Wait for model to load.
          var loaded=0;
        var text=document.getElementById("loadingText");
          this.el.addEventListener('loaded', () => {
            loaded++;
          });
        }
      });
    }
  }
  

  
var callToTacking = new TrackingData();
var focusTime = 0,
screenActiveTime = 0;
var framename = "";
var action = "";
var ExperienceName = "";
var startTracking = false;
var xapiEnable = false;
var museum_data = {};
var endExp = false;



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
function countdown() {


  startTracking = true;
  callToTacking.callToApi(params);
  addExperienceResult(params.UserId, params.PatronId, params.PublishedExperienceId, 0);

  function tick() {
    focusTime++;
    screenActiveTime++;
    if (screenActiveTime == 5) {
      addExperienceView(params.PatronId, params.PublishedExperienceId);
    }
    if (screenActiveTime % 10 == 0 && endExp == false)
      updateExperienceResult(10, 0, 0, "Incomplete");
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

function sendToXapi(verb, urlVerb, objectText, ObjectUrlName) {
  sendVerboseToXapi(verb, "http://adlnet.gov/expapi/verbs/" + urlVerb, objectText, "http://adlnet.gov/expapi/activities/TriviaRoom", "http://id.tincanapi.com/activity/experizer-template/" + ObjectUrlName.toLowerCase(), "http://adlnet.gov/expapi/activities/course", "Activity");
}

function sendQuestionAnswerToXapi(verb, urlVerb, questionText, objectId, questionChoices, questionType, learnerResponse, correctAnswer, wasCorrect) {
  sendQuestionAnswerVerboseToXapi(verb, "http://adlnet.gov/expapi/verbs/" + urlVerb, "http://id.tincanapi.com/activity/experizer-template/" + objectId.toLowerCase(), questionText, questionChoices, questionType, learnerResponse, correctAnswer, wasCorrect);
}

function handle(){
      this.markerFound = (e) => {
          var side=e.target.title;
          params.Verb = "started Viewing";
          params.Object = side.replace(/^.*[\\\/]/, '');
          params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
          callToTacking.callToApi(params);
          
          console.log(params.Sentence);
          if (xapiEnable) {
              sendToXapi("Viewed", "viewed", params.Object, params.Object.replace(/\s/g, ''));
          }
      };
      this.markerLost = (e) => {
          var side=e.target.title;
          params.Verb = "completed Viewing";
          params.Object =side.replace(/^.*[\\\/]/, '');
          params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
          callToTacking.callToApi(params);
          console.log(params.Sentence);
          if (xapiEnable) {
              sendToXapi("Viewed", "viewed", params.Object, params.Object.replace(/\s/g, ''));
          }
      };

      const markers = document.querySelectorAll('a-marker');
      markers.forEach((marker) => {
          marker.addEventListener('markerFound', this.markerFound);
          marker.addEventListener('markerLost', this.markerLost);
      });
    }
function printMarker() {
  generateMarkerImageFile(experienceJSON);
}