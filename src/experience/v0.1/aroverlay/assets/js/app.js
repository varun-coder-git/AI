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
 var arMarkersData;
 var userAgent = navigator.userAgent;
if (userAgent.includes("Mobile") || userAgent.includes("Android") || userAgent.includes("iPhone")) {
  isMobile=true;
}
 $(document).ready(() => {
    var startExperienteBtn = document.getElementById('start_experience');
    ascene=  document.querySelector('a-scene'); 
   
    startExperienteBtn.onclick = function(){
        
         experienceStarted=true;
        ascene.style.zIndex = 'auto';     
        document.getElementById('container').style.display="none";
        document.getElementById('loaderq').style.display="none";
        if (mode == 'EXP') {
            document.querySelector('a-scene').enterVR();
          }
          for(k=0;k<arMarkersData.actionMarkers.length;k++){
            var vid = document.querySelector('#video'+(k+1));
            if(vid!=null){
            vid.load();
            setTimeout(function () {
              vid.play();
              setTimeout(function () {
                vid.pause();
                vid.load();
              }, 50);
            }, 1000);
            }

            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf('safari') != -1) {
              if (ua.indexOf('chrome') == -1) {
                var audio1 = document.getElementById('sound'+(k+1));
                if(audio1!=null){
                audio1.play();
                audio1.pause();
              //  audio1.setAttribute('sound', 'volume:0;');
                nosafari = true;
                }
              }
            }
          }
    }; 
  
    });

var startexp = function(){
    var start= document.getElementById("start_experience");
    if(assetsLoaded && loggedin){
        var loading = document.getElementById("loading");
        loading.classList.add("disabled");
        if (start.classList.contains("disabled")) {
          start.classList.remove("disabled");
          clearTimeout(timer);
        }
    } 
}

var timer =  setInterval(startexp,500);
        var assetsLoaded = false;
    var loggedin = false;
     $(window).on('load', function() {
                    
                    setTimeout(function () { 
                     assetsLoaded = true;  
                    
             
        }, 3000);   
    })

function loadExperience(experienceJSON, ExperienceName) {
    arMarkersData = experienceJSON;
    
    var instructionSet = arMarkersData.splash_instruction;
    var lunchTextSet = arMarkersData.launch_text;

     //if json includes splashbgcolor and opacity
    if (arMarkersData.splashBackgroundColor && arMarkersData.Opacity) {
        var rgbformat = hexToRgb(arMarkersData.splashBackgroundColor, arMarkersData.Opacity);
        document.getElementById('innerInfo').style.backgroundColor = "rgba(" + rgbformat.r + "," + rgbformat.g + "," + rgbformat.b + "," + rgbformat.alpha + ")";
    }
    
    document.getElementById('titleText').innerHTML = ExperienceName;
    if(arMarkersData.splashHeaderColor){
    document.getElementById('titleText').style.color = arMarkersData.splashHeaderColor;
    }
   
    if (isMobile  && arMarkersData.splash_android_instruction!=undefined) {
      document.getElementById('instruction').innerHTML = arMarkersData.splash_android_instruction;
    } else {
      document.getElementById('instruction').innerHTML = arMarkersData.splash_instruction;
    }
    document.getElementById('titleDescription').innerHTML = lunchTextSet;
    document.getElementById('splashLogo').src = arMarkersData.splash_image;
    loggedin = true;
    soundHandlerController();
    imagehandlerController();
    videoHandlerCOntroller();
    videoTextController();
    audioTexthandlerController();
    setTimeout(function(){ generateMarkers(); }, 3000);
}

// var userAgent = navigator.userAgent;
// if (userAgent.includes("Mobile") || userAgent.includes("Android") || userAgent.includes("iPhone")) {
//     var cameraId = document.querySelector('#cursor');
//     cameraId.removeAttribute('cursor');
//     cameraId.setAttribute('scale', '1 1 1');
//     cameraId.setAttribute('cursor', 'fuse', 'true; fuseTimeout: 1500;');

// }

function hexToRgb(hex,opacity) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      alpha:opacity
    } : null;
  }

  function generateMarkers() {
    var scene = document.getElementById("sceneid");
    var asset = document.getElementById("assetId");
    for (i = 1, j = 0; i <= arMarkersData.actionMarkers.length; i++, j++) {
      if (arMarkersData.actionMarkers[i-1].pattFile_path != "" && arMarkersData.actionMarkers[i-1].pattFile_path != "undefined") {
   //   var markers = "";
    //  var markerPatt = localStorage.getItem("marker" + j + ".patt");
      // creation of markers
      markers = document.createElement("a-marker");
      markers.setAttribute("id", "marker-" + i);
      markers.setAttribute('title',arMarkersData.actionMarkers[i-1].markarTitle);
      markers.setAttribute("emitevents", "true");
      markers.setAttribute("preset", "custom");
      markers.setAttribute("type", "pattern");
  //    markers.setAttribute("cursor", "rayOrigin: mouse");
      markers.setAttribute("url", arMarkersData.actionMarkers[i-1].pattFile_path);
      scene.appendChild(markers);
      var selectedmarker;
      // creation of markeralong with there media type
      switch (arMarkersData.actionMarkers[i - 1].mediatype) {
        case "T":
          var textEntity = document.createElement("a-text");
          textEntity.setAttribute("id", "text" + i);
          textEntity.setAttribute("scale", "0.3 0.3 0.3");
          textEntity.setAttribute("wrap-count","20");
          textEntity.setAttribute("font", "roboto");
          textEntity.setAttribute("rotation", "-90 0 0");
          textEntity.setAttribute("position", "1 0 0");
          textEntity.setAttribute("value",arMarkersData.actionMarkers[i - 1].actionPointText);
          textEntity.setAttribute("color",arMarkersData.actionMarkers[i - 1].actionPointColor);
          selectedmarker = document.getElementById("marker-" + i);
          selectedmarker.appendChild(textEntity);
          break;
        case "I":
          var imageSource = document.createElement("img");
          imageSource.setAttribute("id", "img" + i);
          imageSource.setAttribute(
            "src",
            arMarkersData.actionMarkers[i - 1].actionPointImage
          );
          asset.appendChild(imageSource);
          var image = document.createElement("a-image");
          image.setAttribute("id", "imageplayer" + i);
          image.setAttribute("scale", "1 1 1");
          image.setAttribute("opacity", "1");
        //  image.setAttribute("position", "0 0 0");
          image.setAttribute("rotation", "-90 0 0");
          image.setAttribute("transparent", "true");
          image.setAttribute("alpha-test", "0.2");
          image.setAttribute("shader", "standard");
          selectedmarker = document.getElementById("marker-" + i);
          selectedmarker.setAttribute("imagehandler", "");
          selectedmarker.appendChild(image);
        //  imagehandlerController();
          break;
        case "V":
          //  asset video tag creation
          var videoSource = document.createElement("video");
          videoSource.setAttribute("id", "video" + i);
          videoSource.setAttribute("src",arMarkersData.actionMarkers[i - 1].actionPointVideo);
          videoSource.setAttribute("preload", "auto");
          videoSource.setAttribute("controls", "true");
          asset.appendChild(videoSource);
          //  scene video entity creation
          var videoentity = document.createElement("a-video");
          videoentity.setAttribute("id", "videoplayer" + i);
          videoentity.setAttribute("geometry", "primitive:plane");
          videoentity.setAttribute("preload", "auto");
          // videoentity.setAttribute('scale',"1 0.5 1");
        //  videoentity.setAttribute("position", "0 0 0");
          videoentity.setAttribute("rotation", "270 0 0");
          videoentity.setAttribute("autoload", "false");
          videoentity.setAttribute("src", "#video" + i);
          markers.appendChild(videoentity);
          selectedmarker = document.getElementById("marker-" + i);
          selectedmarker.setAttribute("vidhandler", "");
       //   videoHandlerCOntroller();
          break;
        case "A":
          //  asset audio tag creation
          var audioSource = document.createElement("audio");
          audioSource.setAttribute("id", "sound" + i);
          audioSource.setAttribute("src",arMarkersData.actionMarkers[i - 1].actionPointAudio);
          audioSource.setAttribute("preload", "auto");
          asset.appendChild(audioSource);
          //  scene audio entity creation
          var audioEntity = document.createElement("a-entity");
          audioEntity.setAttribute("id", "audioplayer" + i);
          audioEntity.setAttribute("position", "0 -0.5 0");
          audioEntity.setAttribute("sound", "src:#sound" + i + ";");
          scene.appendChild(audioEntity);
          var audio = document.getElementById("audioplayer" + i);
          selectedmarker = document.getElementById("marker-" + i);
          selectedmarker.setAttribute("soundhandler", "");
          selectedmarker.appendChild(audio);
       //   soundHandlerController();
          break;
        case "IT":
          var textEntity = document.createElement("a-text");
          textEntity.setAttribute("id", "text" + i);
          textEntity.setAttribute("scale", "0.3 0.3 0.3");
          textEntity.setAttribute("font", "roboto");
          textEntity.setAttribute("rotation", "-90 0 0");
          textEntity.setAttribute("wrap-count","20");
          textEntity.setAttribute("position", "1 0 0");
          textEntity.setAttribute("color",arMarkersData.actionMarkers[i - 1].actionPointColor);
          textEntity.setAttribute( "value",arMarkersData.actionMarkers[i - 1].actionPointText);
          selectedmarker = document.getElementById("marker-" + i);
          selectedmarker.appendChild(textEntity);
          var imageSource = document.createElement("img");
          imageSource.setAttribute("id", "img" + i);
          imageSource.setAttribute("src",arMarkersData.actionMarkers[i - 1].actionPointImage);
          asset.appendChild(imageSource);
          var image = document.createElement("a-image");
          image.setAttribute("id", "imageplayer" + i);
          image.setAttribute("scale", "1 1 1");
          image.setAttribute("opacity", "1");
          image.setAttribute("rotation", "-90 0 0");
          image.setAttribute("transparent", "true");
          image.setAttribute("alpha-test", "0.2");
          image.setAttribute("shader", "standard");
          selectedmarker.setAttribute("imagehandler", "");
          selectedmarker.appendChild(image);
        //  imagehandlerController();
          break;
        case "AT":
          var audioSource = document.createElement("audio");
          audioSource.setAttribute("id", "sound" + i);
          audioSource.setAttribute("src",arMarkersData.actionMarkers[i - 1].actionPointAudio);
          audioSource.setAttribute("preload", "auto");
          asset.appendChild(audioSource);
          //  scene audio entity creation
          var audioEntity = document.createElement("a-entity");
          audioEntity.setAttribute("id", "audioplayer" + i);
          audioEntity.setAttribute("position", "0 -0.5 0");
          audioEntity.setAttribute("sound", "src:#sound" + i + ";");
          scene.appendChild(audioEntity);
          var audio = document.getElementById("audioplayer" + i);
          var textEntity = document.createElement("a-text");
          textEntity.setAttribute("id", "text" + i);
          textEntity.setAttribute("scale", "0.3 0.3 0.3");
          textEntity.setAttribute("font", "roboto");
          textEntity.setAttribute("rotation", "-90 0 0");
          textEntity.setAttribute("wrap-count","20");
          textEntity.setAttribute("position", "1 0 0");
          textEntity.setAttribute("color",arMarkersData.actionMarkers[i - 1].actionPointColor);
          textEntity.setAttribute("value",arMarkersData.actionMarkers[i - 1].actionPointText);
          selectedmarker = document.getElementById("marker-" + i);
          selectedmarker.setAttribute("audiotexthandler", "");
          selectedmarker.appendChild(textEntity);
          selectedmarker.appendChild(audio);
        //  audioTexthandlerController();
         // soundHandlerController();
          break;
        case "AI":
          var audioSource = document.createElement("audio");
          audioSource.setAttribute("id", "sound" + i);
          audioSource.setAttribute("src",arMarkersData.actionMarkers[i - 1].actionPointAudio);
          audioSource.setAttribute("preload", "auto");
          asset.appendChild(audioSource);
          //  scene audio entity creation
          var audioEntity = document.createElement("a-entity");
          audioEntity.setAttribute("id", "audioplayer" + i);
          audioEntity.setAttribute("position", "0 -0.5 0");
          audioEntity.setAttribute("sound", "src:#sound" + i + ";");
          scene.appendChild(audioEntity);
          var audio = document.getElementById("audioplayer" + i);
          var imageSource = document.createElement("img");
          imageSource.setAttribute("id", "img" + i);
          imageSource.setAttribute("src",arMarkersData.actionMarkers[i - 1].actionPointImage);
          asset.appendChild(imageSource);
          var image = document.createElement("a-image");
          image.setAttribute("id", "imageplayer" + i);
          image.setAttribute("scale", "1 1 1");
          image.setAttribute("opacity", "1");
          image.setAttribute("rotation", "-90 0 0");
          image.setAttribute("transparent", "true");
          image.setAttribute("alpha-test", "0.2");
          image.setAttribute("shader", "standard");
          selectedmarker = document.getElementById("marker-" + i);
          selectedmarker.setAttribute("soundhandler", "");
          selectedmarker.appendChild(audio);
          selectedmarker.setAttribute("imagehandler", "");
          selectedmarker.appendChild(image);
        //  soundHandlerController();
          break;
        case "VT":
          //  asset video tag creation
          var videoSource = document.createElement("video");
          videoSource.setAttribute("id", "video" + i);
          videoSource.setAttribute("src",arMarkersData.actionMarkers[i - 1].actionPointVideo);
          videoSource.setAttribute("preload", "auto");
          videoSource.setAttribute("controls", "true");
          asset.appendChild(videoSource);
          //  scene video entity creation
          var videoentity = document.createElement("a-video");
          videoentity.setAttribute("id", "videoplayer" + i);
          videoentity.setAttribute("geometry", "primitive:plane");
          videoentity.setAttribute("preload", "auto");
          videoentity.setAttribute("scale", "1 1 1");
          videoentity.setAttribute("rotation", "270 0 0");
          videoentity.setAttribute("autoload", "false");
          videoentity.setAttribute("src", "#video" + i);
          var textEntity = document.createElement("a-text");
          textEntity.setAttribute("id", "text" + i);
          textEntity.setAttribute("scale", "0.3 0.3 0.3");
          textEntity.setAttribute("font", "roboto");
          textEntity.setAttribute("wrap-count","20");
          textEntity.setAttribute("rotation", "-90 0 0");
          textEntity.setAttribute("position", "1 0 0");
          textEntity.setAttribute("color",arMarkersData.actionMarkers[i - 1].actionPointColor);
          textEntity.setAttribute("value",arMarkersData.actionMarkers[i - 1].actionPointText);
          markers.appendChild(videoentity);
          selectedmarker = document.getElementById("marker-" + i);
          selectedmarker.setAttribute("texthandler", "");
          selectedmarker.appendChild(textEntity);
        //  videoTextController();
          break;
        case "AIT":
          var textEntity = document.createElement("a-text");
          textEntity.setAttribute("id", "text" + i);
          textEntity.setAttribute("scale", "0.3 0.3 0.3");
          textEntity.setAttribute("font", "roboto");
          textEntity.setAttribute("rotation", "-90 0 0");
          textEntity.setAttribute("wrap-count","20");
          textEntity.setAttribute("position", "1 0 0");
          textEntity.setAttribute("color",arMarkersData.actionMarkers[i - 1].actionPointColor);
          textEntity.setAttribute("value",arMarkersData.actionMarkers[i - 1].actionPointText);
          var imageSource = document.createElement("img");
          imageSource.setAttribute("id", "img" + i);
          imageSource.setAttribute("src",arMarkersData.actionMarkers[i - 1].actionPointImage);
          asset.appendChild(imageSource);
          var image = document.createElement("a-image");
          image.setAttribute("id", "imageplayer" + i);
          image.setAttribute("scale", "1 1 1");
          image.setAttribute("opacity", "1");
          image.setAttribute("rotation", "-90 0 0");
          image.setAttribute("transparent", "true");
          image.setAttribute("alpha-test", "0.2");
          image.setAttribute("shader", "standard");
          var audioSource = document.createElement("audio");
          audioSource.setAttribute("id", "sound" + i);
          audioSource.setAttribute("src",arMarkersData.actionMarkers[i - 1].actionPointAudio);
          audioSource.setAttribute("preload", "auto");
          asset.appendChild(audioSource);
          //  scene audio entity creation
          var audioEntity = document.createElement("a-entity");
          audioEntity.setAttribute("id", "audioplayer" + i);
          audioEntity.setAttribute("position", "0 -0.5 0");
          audioEntity.setAttribute("sound", "src:#sound" + i + ";");
          scene.appendChild(audioEntity);
          var audio = document.getElementById("audioplayer" + i);
          selectedmarker = document.getElementById("marker-" + i);
          selectedmarker.appendChild(textEntity);
          selectedmarker.appendChild(image);
          selectedmarker.setAttribute("soundhandler", "");
          selectedmarker.setAttribute("imagehandler", "");
          selectedmarker.appendChild(audio);
        //  soundHandlerController();
        //  imagehandlerController();
          break;
      }
    //   if(arMarkersData.actionMarkers.length)
    }
    }
    if(i>arMarkersData.actionMarkers.length){
      handle();
    }
  }
// function for marker with video
function videoHandlerCOntroller(){
  AFRAME.registerComponent("vidhandler", {
  init: function() {
    var marker = this.el;
    var markerId = marker.id;
    var str = markerId.split("-");
    var res = str[1];
    var videoplayer = document.getElementById("videoplayer" + res);
    var video = document.getElementById("video" + res);
    marker.addEventListener("markerFound", function() {
    //  video.setAttribute("src",arMarkersData.actionMarkers[res - 1].actionPointVideo);
    if(experienceStarted){
      video.play();
    }
    });
    marker.addEventListener("markerLost", function() {
      video.pause();
    });
  }
});
}

  // function for marker with audio
  function soundHandlerController(){
    AFRAME.registerComponent("soundhandler", {
      init: function() {
        var marker = this.el;
        var markerId = marker.id;
        var str = markerId.split("-");
        var res = str[1];
        var entity = document.querySelector("#audioplayer" + res);
        marker.addEventListener("markerFound", function() {
          if(experienceStarted){
          document.querySelector("#sound" + res).play();
          }
        });
        marker.addEventListener("markerLost", function() {
          document.querySelector("#sound" + res).pause();
        });
      }
    });
  }

  function imagehandlerController(){
    AFRAME.registerComponent("imagehandler", {
      init: function() {
        var marker = this.el;
        var markerId = marker.id;
        var str = markerId.split("-");
        var res = str[1];
        var image = document.getElementById("imageplayer" + res);
        marker.addEventListener("markerFound", function() {
          image.setAttribute("src",arMarkersData.actionMarkers[res - 1].actionPointImage);
        });
        marker.addEventListener("markerLost", function() {
        });
      }
    });
  }

 function videoTextController(){
  AFRAME.registerComponent("texthandler", {
    init: function() {
      var marker = this.el;
      var markerId = marker.id;
      var str = markerId.split("-");
      var res = str[1];
      var textdata = document.getElementById("text" + res);
      var video = document.getElementById("video" + res);
      marker.addEventListener("markerFound", function() {
      //  video.setAttribute("src",arMarkersData.actionMarkers[res - 1].actionPointVideo);
      if(experienceStarted){
        video.play();
        textdata.setAttribute("value",arMarkersData.actionMarkers[res - 1].actionPointText);
        textdata.setAttribute("position", "1 0 0");
        textdata.setAttribute("scale", "0.3 0.3 0.3");
        textdata.setAttribute("wrap-count","20");
      }
      });
      marker.addEventListener("markerLost", function() {
        video.pause();
      });
    }
  });
 }       

function  audioTexthandlerController(){
  AFRAME.registerComponent("audiotexthandler", {
    init: function() {
      var marker = this.el;
      var markerId = marker.id;
      var str = markerId.split("-");
      var res = str[1];
      var entity = document.querySelector("#audioplayer" + res);
      var textdata = document.getElementById("text" + res);
      marker.addEventListener("markerFound", function() {
        if(experienceStarted){
        document.querySelector("#sound" + res).play();
        textdata.setAttribute("value",arMarkersData.actionMarkers[res - 1].actionPointText);
        textdata.setAttribute("position", "1 0 0");
        textdata.setAttribute("scale", "0.3 0.3 0.3");
        textdata.setAttribute("wrap-count","20");
        }
      });
      marker.addEventListener("markerLost", function() {
        document.querySelector("#sound" + res).pause();
      });
    }
  });
}   

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
        console.log("barcode");
        var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + window.location.href + '&amp;size=50x50';
        console.log("barcode", url);
        document.getElementById("qrcode").src = url;
        // qrcode.makeCode(window.location.href);
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
function printMarker() {
  generateMarkerImageFile(arMarkersData);
}