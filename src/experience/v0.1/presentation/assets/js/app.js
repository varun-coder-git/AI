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
var isMobile = false;
var experienceJSON = "";
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
var userAgent = navigator.userAgent;
if (userAgent.includes("Mobile") || userAgent.includes("Android") || userAgent.includes("iPhone")) {
  isMobile=true;
}
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
}

$(document).ready(() => {
  // calculateLoadTimes();
//   var loadTime = window.performance.timing.domContentLoadedEventEnd- window.performance.timing.navigationStart;
// console.log("loadTime",loadTime);
 
  var startExperienteBtn = document.getElementById("start_experience");
  startExperienteBtn.onclick = function() {
   var cube= document.getElementById("cube");
    cube.setAttribute('scale', `2 2 2`);
  document.getElementById("aScene").style.display="block";
   document.getElementById("container").style.display = "none";
    document.getElementById("loaderq").style.display = "none";
    experienceStarted = true;
    $("body").removeClass("bodycss");
   
  
  };
});

var timer = setInterval(startexp, 500);
var assetsLoaded = false;
var loggedin = false;

AFRAME.registerComponent('markerhandler', {
  init: function () {
    var marker = this.el;
    marker.addEventListener('markerFound', function() {
      var markerId = marker.id;
      // TODO: Add your own code here to react to the marker being found.
    });
    marker.addEventListener('markerLost', function() {
      var markerId = marker.id;
    });
  }
});

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
  function load(experienceJSON) {
    
    var sceneEl = document.querySelector("a-arcube");
    for (var i = 0; i < experienceJSON.actionMarkers.length; i++) {
      // eslint-disable-next-line no-loop-func
      if (experienceJSON.actionMarkers[i].mediatype == "I" ) {
        
        var entity="img"+(i+1);
        var entity1=document.getElementById(entity);
        entity1.setAttribute('src',experienceJSON.actionMarkers[i].actionPointImage);

      } else if(experienceJSON.actionMarkers[i].mediatype == "T" ){
        var entity="text"+(i+1);
        var entity1=document.getElementById(entity);
        entity1.setAttribute('text',"value",experienceJSON.actionMarkers[i].actionPointText)
      }
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