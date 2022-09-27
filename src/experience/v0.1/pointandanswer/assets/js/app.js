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
 var isComplete = false;
 var totalMarks = 0;
 var Result = "N/A";
 var answerid = "";
 var congratulations = "";
 var experienceStarted = false;
 var thankmsg = "";
 var thankyou = "";
 var endMessageByUser = "";
 var correctAnswer = 0;
 var printQuestionFlag = true;
 var hotspotCount = 0;
 var totalTeleports = 0;
 var showscreen = "Yes";
 var totalPoints = "";
 var cam;
 var isMobile=false;
 var userAgent = navigator.userAgent;

 if (userAgent.includes("Mobile") || userAgent.includes("Android") || userAgent.includes("iPhone")) {
  isMobile=true;
   var cameraId = document.querySelector('#cursor');
   cameraId.removeAttribute('cursor');
   cameraId.setAttribute('cursor', {
       'fuse': 'true',
       'fuseTimeout': '1200'
     },
     true);
   cameraId.setAttribute('scale', {
       'x': '1',
       'y': '1',
       'z': '1'
     },
     true);
 }

 AFRAME.registerComponent('hotspotclick', {
   init: function () {
     this.el.addEventListener('click', function () {
       if (experienceStarted == true) {
         if (printQuestionFlag) {
           if (startTracking) {
             params.Verb = "started Reading Question";
             params.Object = '"' + activeScreen.teleports[this.getAttribute('id').split("-")[2]].Question + '"';
             params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
             callToTacking.callToApi(params);
           }
           if (xapiEnable) {
             sendToXapi("Focused", "focused", "on Question " + (parseInt(this.getAttribute('id').split("-")[2]) + 1), "question" + ((this.getAttribute('id').split("-")[2]) + 1));
           }

           var textview = document.getElementById('question1');
         
           answerid = this.getAttribute('id');
           textview.setAttribute("scale", "0 0 0");
           textview.setAttribute('visible', true);
           textview.setAttribute("text", "value:Question will appear here one which is added to each marker");
           var sentence = activeScreen.teleports[this.getAttribute('id').split("-")[2]].Question;
          
           var car = '';
   
           setTimeout(function () {
             for (var i = 0; i < sentence.length; i++) {
               (function (index) {
                 setTimeout(function () {
                  
                   
                   var temp = sentence[index];
                   car += temp;
                   textview.setAttribute("scale", "1 1 1");
                   textview.setAttribute("text", "value:" + car);

                 }, 60 * i);
               })(i);
             }
           }, 1900);


           var positionPoints = activeScreen.teleports[this.getAttribute('id').split("-")[2]].teleportPosition.split(" ");
           var infoBox = document.querySelector("#infoBox1");
           var mainInfo = document.querySelector("#mainInfo");
           var pos = newPos(positionPoints[0], positionPoints[1], positionPoints[2]);

           mainInfo.setAttribute("animation__astartPosAnimation", "property: position;to:" + pos + ";dur: 1500;enabled:true")
           infoBox.setAttribute("visible", "true");

           infoBox.setAttribute("animation", "property: scale;from:0 0 0;to:0.5 0.5 0.5; dur: 3600;enabled:true");
           for (let i = 0; i < 4; i++) {
             var textBox = document.querySelector("#textBox" + i);
             textBox.setAttribute("value", "");
             var option0 = document.querySelector("#option" + i);
             option0.setAttribute("class", "");
             var entity1 = document.querySelector('#option0');
             entity1.setAttribute("position", "-23 -1.031 3.362");
             var entity2 = document.querySelector('#option1');
             entity2.setAttribute("position", "16.993 -1.191 3.355");
           }
           for (let i = 0; i < activeScreen.teleports[this.getAttribute('id').split("-")[2]].Options.length; i++) {
             if (i == 0) {
               var textBox0 = document.querySelector("#textBox" + i);
               var option0 = document.querySelector("#option" + i);

               var optiontext0 = activeScreen.teleports[this.getAttribute('id').split("-")[2]].Options[i].option;
               var optionchar0 = '';
               textBox0.setAttribute("scale", "0 0 0");
               textBox0.setAttribute("text", "value:First option will appear here");
               textBox0.setAttribute("visible", true);
               setTimeout(function () {

                 for (var j = 0; j < optiontext0.length; j++) {
                   (function (index) {
                     setTimeout(function () {

                       var temp2 = optiontext0[index];
                       optionchar0 += temp2;
                       textBox0.setAttribute("scale", "1 1 1");
                       textBox0.setAttribute("text", "value:" + optionchar0);
                       setTimeout(function () {
                         option0.setAttribute("class", "clickable");
                       }, 30 * optiontext0.length);
                     }, 30 * j);
                   })(j);
                 }
               }, 1900 + 60 * sentence.length);
             } else if (i == 1) {
               var textBox1 = document.querySelector("#textBox" + i);
               var option1 = document.querySelector("#option" + i);
               // option1.setAttribute("class","clickable");
               var optiontext1 = activeScreen.teleports[this.getAttribute('id').split("-")[2]].Options[i].option;
               var optionchar1 = '';
               textBox1.setAttribute("scale", "0 0 0");
               textBox1.setAttribute("text", "value:Second option will appear here");
               textBox1.setAttribute("visible", true);
               setTimeout(function () {

                 for (var j = 0; j < optiontext1.length; j++) {
                   (function (index) {
                     setTimeout(function () {
                       var temp2 = optiontext1[index];
                       optionchar1 += temp2;
                       textBox1.setAttribute("scale", "1 1 1");
                       textBox1.setAttribute("text", "value:" + optionchar1);
                       setTimeout(function () {
                         option1.setAttribute("class", "clickable");
                       }, 30 * optiontext1.length);
                     }, 30 * j);
                   })(j);
                 }
               }, 1900 + 60 * sentence.length + 30 * optiontext0.length);
             } else if (i == 2) {
               var textBox2 = document.querySelector("#textBox" + i);
               var option2 = document.querySelector("#option" + i);

               var optiontext2 = activeScreen.teleports[this.getAttribute('id').split("-")[2]].Options[i].option;
               var optionchar2 = '';
               textBox2.setAttribute("scale", "0 0 0");
               textBox2.setAttribute("text", "value:Third option will appear here");
               textBox2.setAttribute("visible", true);
               setTimeout(function () {
                 for (var j = 0; j < optiontext2.length; j++) {
                   (function (index) {
                     setTimeout(function () {
                       var temp2 = optiontext2[index];
                       optionchar2 += temp2;
                       textBox2.setAttribute("scale", "1 1 1");
                       textBox2.setAttribute("text", "value:" + optionchar2);
                       setTimeout(function () {
                         option2.setAttribute("class", "clickable");
                       }, 30 * optiontext2.length);
                     }, 30 * j);
                   })(j);
                 }
               }, 1900 + 60 * sentence.length + 30 * optiontext0.length + 30 * optiontext1.length);
             } else if (i == 3) {
               var textBox3 = document.querySelector("#textBox" + i);
               var option3 = document.querySelector("#option" + i);

               var optiontext3 = activeScreen.teleports[this.getAttribute('id').split("-")[2]].Options[i].option;
               var optionchar3 = '';
               textBox3.setAttribute("visible", true);
               textBox3.setAttribute("scale", "0 0 0");
            textBox3.setAttribute("text","value:Fourth option will appear here");
            setTimeout(function () {
              for (var j = 0; j < optiontext3.length; j++) {
                (function (index) {
                  setTimeout(function () {
                    var temp2 = optiontext3[index];
                    optionchar3 += temp2;
                    textBox3.setAttribute("scale", "1 1 1");
                    textBox3.setAttribute("text","value:"+optionchar3);
                       setTimeout(function () {
                         option3.setAttribute("class", "clickable");
                       }, 30 * optiontext3.length);
                     }, 30 * j);
                   })(j);
                 }
               }, 1900 + 60 * sentence.length + 30 * optiontext0.length + 30 * optiontext1.length + 30 * optiontext2.length);
             }

             if (activeScreen.teleports[this.getAttribute('id').split("-")[2]].Options.length == 2) {
              var entity1 = document.querySelector('#option0');
             
  
              entity1.setAttribute("position", "-22.973 -5.82161 3.03173");
              var entity2 = document.querySelector('#option1');
              entity2.setAttribute("position", "17.019 -6.301 3.140");
              var textBox = document.querySelector("#textBox2");
              textBox.setAttribute("text","value:");
              var textBox = document.querySelector("#textBox3");
              textBox.setAttribute("text","value:");
            }
            if (activeScreen.teleports[this.getAttribute('id').split("-")[2]].Options.length == 3) {
              var textBox = document.querySelector("#textBox3");
              textBox.setAttribute("text","value:");
            }
           }

           if (activeScreen.teleports[this.getAttribute('id').split("-")[2]].questionPanel != "" && activeScreen.teleports[this.getAttribute('id').split("-")[2]].questionPanel != undefined) {
             infoBox1.setAttribute('material', 'src:assets/images/QuestionPanel/' + activeScreen.teleports[this.getAttribute('id').split("-")[2]].questionPanel + ';side:double');
           } else {
             infoBox1.setAttribute('material', 'src:assets/images/QuestionPanel/default_' + activeScreen.teleports[this.getAttribute('id').split("-")[2]].Options.length + '.jpg;side:double');

           }
           setTimeout(function () {
             printQuestionFlag = true;
           }, 1900 + 60 * sentence.length + 60 * optiontext0.length + 60 * optiontext1.length)
           answerslected = false;
         }
         printQuestionFlag = false;
       }
     });
     this.el.addEventListener('mouseleave', () => {

     });
   }
 });

 var right = false;
 var answerslected = false;
 AFRAME.registerComponent('optionclick', {
   init: function () {
     this.el.addEventListener('click', () => {
       if (!answerslected) {
         printQuestionFlag = false;
         hotspotCount = hotspotCount + 1;
         var infoBox1 = document.querySelector("#infoBox1");
         var sky = document.querySelector('#' + this.el.id);
         var optionVal = sky.id;
         var res = optionVal.split("option");

         if (res[1] == activeScreen.teleports[answerid.split("-")[2]].Answer) {
           correctAnswer = correctAnswer + 1;

           if (startTracking) {
             params.Verb = "Option Answered";
             params.Object = activeScreen.teleports[answerid.split("-")[2]].Options[res[1]].option;
             params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
             callToTacking.callToApi(params);
           }
           if (xapiEnable) {
             var date = new Date();
             var timestamp = date.getTime();
             sendQuestionAnswerToXapi("Answered", "answered", activeScreen.teleports[answerid.split("-")[2]].Question, timestamp + "", activeScreen.teleports[answerid.split("-")[2]].Options, "choice", activeScreen.teleports[answerid.split("-")[2]].Options[res[1]].option, activeScreen.teleports[answerid.split("-")[2]].Options[activeScreen.teleports[answerid.split("-")[2]].Answer].option, true);
           }
           right = true;
           $("#"+answerid).removeClass("clickable");
         } else {
           //	if (activeScreen.Show_right_answer == "Yes") {
           var textview6 = document.getElementById('textBox' + res[1]);
           if (startTracking) {
             params.Verb = "Option Answered";
             params.Object = textview6.attributes[2].nodeValue;
             params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
             callToTacking.callToApi(params);
           }
           if (xapiEnable) {
             var date = new Date();
             var timestamp = date.getTime();
             sendQuestionAnswerToXapi("Answered", "answered", activeScreen.teleports[answerid.split("-")[2]].Question, timestamp + "", activeScreen.teleports[answerid.split("-")[2]].Options, "choice", activeScreen.teleports[answerid.split("-")[2]].Options[res[1]].option, activeScreen.teleports[answerid.split("-")[2]].Options[activeScreen.teleports[answerid.split("-")[2]].Answer].option, false);
           }
           textview6.setAttribute('text', 'width:33;wrapPixels:600.03;color:#ff0000');
           right = false;
           $("#"+answerid).removeClass("clickable");
           //}
         }
         var textview6 = document.getElementById('textBox' + activeScreen.teleports[answerid.split("-")[2]].Answer);
         textview6.setAttribute('text', 'width:33;wrapPixels:600.03;color:#00ff00');
         setTimeout(function () {
           infoBox1.setAttribute("animation", "property: scale;from:0.5 0.5 0.5;to:0 0 0; dur: 2000;enabled:true");
         }, 2000);
         var local = answerid;
         setTimeout(function () {
           resetAndClose(local);
         }, 4000);

         setTimeout(function () {
           if (hotspotCount == totalHotspot) {
             var positionPoints = activeScreen.teleports[answerid.split("-")[2]].teleportPosition.split(" ");
             var positionPoint = (positionPoints[0]) + " " + (positionPoints[1] - 14) + " " + positionPoints[2];
             scoreScreen(positionPoint);
           }

         }, 9000);

         answerslected = true;

       }
     });
     this.el.addEventListener('mouseleave', () => {
       // var cur = document.querySelector('#cursor');
       // cur.emit("startAnimantion");
     });
   }
 });




 var PointandAnswer = "";
 var activeScreen = "";

 function hexToRgb(hex, opacity) {
   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
   return result ? {
     r: parseInt(result[1], 16),
     g: parseInt(result[2], 16),
     b: parseInt(result[3], 16),
     alpha: opacity
   } : null;
 }

 function loadExperience(data, ExperienceName) {

   //if json includes splashbgcolor and opacity
   if (data.splashBackgroundColor && data.Opacity) {
     var rgbformat = hexToRgb(data.splashBackgroundColor, data.Opacity);
     document.getElementById('innerInfo').style.backgroundColor = "rgba(" + rgbformat.r + "," + rgbformat.g + "," + rgbformat.b + "," + rgbformat.alpha + ")";
   }
   //if json includes splashheadercolor
   if (data.splashHeaderColor) {
     document.getElementById('titleText').style.color = data.splashHeaderColor;
   }
   document.getElementById('titleText').innerHTML = ExperienceName;
  //  document.getElementById('instruction').innerHTML = data.splash_instruction;
  if (isMobile && data.splash_android_instruction!=undefined) {
		document.getElementById('instruction').innerHTML = data.splash_android_instruction;
	  } else {
		document.getElementById('instruction').innerHTML = data.splash_instruction;
   }
   
   document.getElementById('titleDescription').innerHTML = data.launch_text;
   document.getElementById('splashLogo').src = data.splash_image;
   loggedin = true;

   PointandAnswer = data.experienceData;
   activeScreen = PointandAnswer[0];
   congratulations = data.experienceData[0].congratulations;
   thankmsg = data.experienceData[0].thankYouMsg;
   thankyou = data.experienceData[0].thankYou;
   endMessageByUser = data.experienceData[0].endMessageByUser;
   points = data.experienceData[0].points;
   totalTeleports = data.experienceData[0].totalTeleports;
   totalPoints = data.experienceData[0].totalPoints;
   generateRoom(activeScreen);
   var scene = document.querySelector('a-scene');
   if (activeScreen.placeSky) {
     var aSky = document.createElement('a-sky');
     aSky.setAttribute('id', 'skyImage');
     aSky.setAttribute('src', activeScreen.placeSky);
     scene.appendChild(aSky);
   } else {
     var assets = document.querySelector('a-assets');
     var skyVideo = document.createElement('video');
     skyVideo.setAttribute('id', "videoskyid");
     skyVideo.setAttribute('src', activeScreen.videoskypath);
     //skyVideo.setAttribute('autoplay', 'true');
     skyVideo.setAttribute('loop', '');
     skyVideo.setAttribute('crossorigin', 'anonymous');
     assets.appendChild(skyVideo);
     var aVideoSphere = '';
     aVideoSphere = document.createElement('a-videosphere');
     aVideoSphere.setAttribute('src', "#videoskyid");
     aVideoSphere.setAttribute('crossorigin', 'anonymous');
     scene.appendChild(aVideoSphere);
   }
   document.title = ExperienceName;

   if (window.matchMedia("(orientation: portrait)").matches) {
     if (data["entry_view"]) {
       var entryView_y = data["entry_view"].split(" ")[1];
       $("#CamEntity").attr("rotation", "0 " + (parseInt(entryView_y) - 180) + " 0");
     }
   }

   if (window.matchMedia("(orientation: landscape)").matches) {
     if (data["entry_view"]) {
       $("#CamEntity").attr("rotation", data["entry_view"]);
     }
   }
 };

 var isSphereSelected = false;
 var hotspotsToSave = [];
 var placeToSave = [];
 var hotspotIndex = 0;
 var totalHotspot = 0;


 function generateRoom() {
   var sphereArray = $("a-entity[id*='sphere-hotspot']");


   for (let i = 0; i < activeScreen.teleports.length; i++) {
     if (!(activeScreen.teleports[i].Question == "")) {
       addHotspot(activeScreen.teleports[i], i);
       totalHotspot++;
     }
   }
   addQuestion();


 }
 $('document').ready(() => {
   var startExperienteBtn = document.getElementById('start_experience');
   cam = document.getElementById("cameraId");
   startExperienteBtn.onclick = function () {
     cam.setAttribute("animation", "enabled:false");
     cam.setAttribute("animation__one", "enabled:true");
     ascene.style.zIndex = 'auto';
     document.getElementById('container').style.display = "none";
     document.getElementById('loaderq').style.display = "none";
     experienceStarted = true;
     //  countdown();
   };
   var aLight = '';
   aLight = document.createElement('a-entity');

   aLight.setAttribute("light", "color:#f0f0f0;type:ambient")
   scene.appendChild(aLight);
 });

 function resetAndClose(ansid) {
   var sphereArray = $("a-entity[id*='sphere-hotspot']");
   if (sphereArray.length > 0) {
     for (var i = 0; i < sphereArray.length; i++) {
       if (sphereArray[i].id == ansid) {
         var element = document.querySelector("#" + ansid);
         element.setAttribute("animation__close", "property: scale;from:1 1 1;to:0 0 0; dur: 1500;enabled:true");

         setTimeout(function () {
           element.removeAttribute("animation__close");
         }, 1500)

         var sceneEl = document.querySelector('a-scene');
         var newHotspot = document.createElement('a-entity');
         newHotspot.setAttribute('color', '#00f');

         newHotspot.setAttribute('position', activeScreen.teleports[ansid.split("-")[2]].teleportPosition);
         var size;
         if (activeScreen.teleports[ansid.split("-")[2]].questionIconSize == 'Small') {
           size = 4;
         } else if (activeScreen.teleports[ansid.split("-")[2]].questionIconSize == 'Medium') {
           size = 7;
         } else if (activeScreen.teleports[ansid.split("-")[2]].questionIconSize == 'Large') {
           size = 10;
         }
         newHotspot.setAttribute('geometry', 'primitive:plane;height:' + size + ';width:' + size + ';');
         if (right)
           newHotspot.setAttribute('material', "src: " + activeScreen.correctImage + "; opacity:0.9;");
         else
           newHotspot.setAttribute('material', "src: " + activeScreen.wrongImage + "; opacity:0.9;");
         newHotspot.setAttribute('look-at', 'src:#mainCam')
         newHotspot.setAttribute('shader', 'flat');


         setTimeout(function () {
           newHotspot.setAttribute("animation__hotspot", "property: scale;from:0 0 0;to:1 1 1; dur: 1500;enabled:true");

           sceneEl.appendChild(newHotspot);
         }, 1500)

       }
     }
   }
   var infoboxHide = document.querySelector("#infoBox1");
   infoboxHide.parentNode.removeChild(infoboxHide);
   setTimeout(() => {
     addQuestion();
   }, 600);
 }


 function addHotspot(teleport, index) {
   var checkHotSpot = document.querySelector("#sphere-hotspot-" + index);
   if (checkHotSpot) {
     $("#sphere-hotspot-" + index).remove();
   }
   var size;
   if (teleport.questionIconSize == 'Small') {
     size = 4;
   } else if (teleport.questionIconSize == 'Medium') {
     size = 7;
   } else if (teleport.questionIconSize == 'Large') {
     size = 10;
   }
   var sceneEl = document.querySelector('a-scene');
   var newHotspot = document.createElement('a-entity');
   newHotspot.setAttribute('id', "sphere-hotspot-" + index);
   newHotspot.setAttribute('color', '#00f');
   newHotspot.setAttribute('position', teleport.teleportPosition);
   newHotspot.setAttribute('geometry', 'primitive:plane;height:' + size + ';width:' + size + ';');
   newHotspot.setAttribute('material', "src: " + teleport.teleportToPlaceImage + "; opacity:0.9;");
   //newHotspot.setAttribute('opacity', '0.9');
   newHotspot.setAttribute('look-at', 'src:#mainCam')
   newHotspot.setAttribute('shader', 'flat');
   newHotspot.setAttribute('hotspotclick', '');
   newHotspot.setAttribute("class", "clickable");
   //  sceneEl.appendChild(newHotspot);
   if (teleport.AnimateCheckBox == true) {
     newHotspot.setAttribute("animation", "property: scale; from:0.5 0.5 0.5;dir:alternate;to:1 1 1; dur: 700; easing: easeInOutCubic;enabled:true;loop:true");
     //newHotspot.appendChild(aimgPlaneStartAnimationBLink);

   }
   sceneEl.appendChild(newHotspot);
   hotspotIndex++;
 }



 function addQuestion() {
   printQuestionFlag = true;
   var checkhotspotQuestiont = document.querySelector("#mainInfo");
   if (checkhotspotQuestiont) {
     $("#mainInfo").remove();
   }
   var sceneEl = document.querySelector('a-scene');
   // create main panel
   var mainInfoBox = document.createElement('a-entity');
   mainInfoBox.setAttribute('id', "mainInfo");
   mainInfoBox.setAttribute('geometry', "primitive:plane");
   mainInfoBox.setAttribute('material', "transparent:true;opacity:0.03;side:back");
   mainInfoBox.setAttribute('look-at', 'src: #mainCam');
   // create main question panel
   var newQuestion = document.createElement('a-entity');
   newQuestion.setAttribute('id', "infoBox1");
   newQuestion.setAttribute('visible', 'false');
   newQuestion.setAttribute('obj-model', 'obj:assets/images/moonlight.obj');
   newQuestion.setAttribute('material', 'src:assets/images/tvscreenPlane.jpg;side:double;');
   newQuestion.setAttribute('position', '0 -17 0');
   newQuestion.setAttribute('scale', '0.5 0.5 0.5');

   // create question text
   var question = document.createElement('a-entity');
   question.setAttribute('id', "question1");
   question.setAttribute('look-at', '[camera]');
   question.setAttribute('text', 'baseline:top;wrapCount:48;lineheight:50;width:75;align:left;value: Question will appear here one which is added to each marker;shader: msdf;');
   question.setAttribute('material', 'metalness:1; roughness:0; transparent: true; opacity: .0; shader: flat; color: white; side:double');
   question.setAttribute('position', '0.75135 13.92467 5.08867');
   question.setAttribute('scale', '1 1 1');
   question.setAttribute('visible', 'false');
   // create option 1 clickable
   var option0 = document.createElement('a-entity');
   option0.setAttribute('id', "option0");
   option0.setAttribute('position', '-23 -1.031 3.362');
   option0.setAttribute('optionclick', '');
   option0.setAttribute("geometry", "height:5;width:27");
   option0.setAttribute("material", "opacity:0;transparent:true;color:#FFFFFF");
   // create option 1 text
   var textBox0 = document.createElement('a-entity');
   textBox0.setAttribute('id', "textBox0");
   textBox0.setAttribute('look-at', '[camera]');
   textBox0.setAttribute('text', 'baseline:top;wrapPixels:600.03;lineheight:50;width:33;align:left;value:First Option will appear here ;shader: msdf;');
   textBox0.setAttribute('material', 'metalness:1; roughness:0; transparent: true; opacity: .0; shader: flat; color: white; side:double');
   textBox0.setAttribute('position', '3 1.5 0');
   textBox0.setAttribute('scale', '1 1 1');
   textBox0.setAttribute('visible', 'false');
   // bind option 1 text
   option0.appendChild(textBox0);
   // create option 2 clickable
   var option1 = document.createElement('a-entity');
   option1.setAttribute('id', "option1");
   option1.setAttribute('position', '16.993 -1.191 3.355');
   option1.setAttribute('optionclick', '');
   option1.setAttribute("geometry", "height:5;width:30");
   option1.setAttribute("material", "opacity:0;transparent:true;color:#FFFFFF");
   // create option 2 text

   var textBox1 = document.createElement('a-entity');
   textBox1.setAttribute('id', "textBox1");
   textBox1.setAttribute('look-at', '[camera]');
   textBox1.setAttribute('text', 'baseline:top;wrapPixels:600.03;lineheight:50;width:33;align:left;value:Second Option will appear here ;shader: msdf;');
   textBox1.setAttribute('material', 'metalness:1; roughness:0; transparent: true; opacity: .0; shader: flat; color: white; side:double');
   textBox1.setAttribute('position', '3 1.5 0');
   textBox1.setAttribute('scale', '1 1 1');
   textBox1.setAttribute('visible', 'false');
   // bind option 2 text
   option1.appendChild(textBox1);
   // create option 3 clickable
   var option2 = document.createElement('a-entity');
   option2.setAttribute('id', "option2");
   option2.setAttribute('position', '-24 -10.4 0.3');
   option2.setAttribute('optionclick', '');
   option2.setAttribute("geometry", "height:5;width:27");
   option2.setAttribute("material", "opacity:0;transparent:true;color:#FFFFFF");
   // create option 3 text
   var textBox2 = document.createElement('a-entity');
   textBox2.setAttribute('id', "textBox2");
   textBox2.setAttribute('look-at', '[camera]');
   textBox2.setAttribute('text', 'baseline:top;wrapPixels:600.03;lineheight:50;width:33;align:left;value:Third Option will appear here ;shader: msdf;');
   textBox2.setAttribute('material', 'metalness:1; roughness:0; transparent: true; opacity: .0; shader: flat; color: white; side:double');
   textBox2.setAttribute('position', '3 1.5 0');
   textBox2.setAttribute('scale', '1 1 1');
   textBox2.setAttribute('visible', 'false');
   // bind option 3 text
   option2.appendChild(textBox2);
   // create option 4 clickable
   var option3 = document.createElement('a-entity');
   option3.setAttribute('id', "option3");
   option3.setAttribute('position', '17 -10.4 0.3');
   option3.setAttribute('optionclick', '');
   option3.setAttribute("geometry", "height:5;width:30");
   option3.setAttribute("material", "opacity:0;transparent:true;color:#FFFFFF");
   // create option 4 text
   var textBox3 = document.createElement('a-entity');
  textBox3.setAttribute('id', "textBox3");
  textBox3.setAttribute('look-at', '[camera]');
  textBox3.setAttribute('text', 'baseline:top;wrapPixels:600.03;lineheight:50;width:33;align:left;value:Fourth Option will appear here ;shader: msdf;');
  textBox3.setAttribute('material', 'metalness:1; roughness:0; transparent: true; opacity: .0; shader: flat; color: white; side:double');
  textBox3.setAttribute('position', '3 1.5 0');
  textBox3.setAttribute('scale', '1 1 1');
  textBox3.setAttribute('visible', 'false');

   // bind option 4 text
   option3.appendChild(textBox3);
   // bind all option clickable
   newQuestion.appendChild(option3);
   newQuestion.appendChild(option2);
   newQuestion.appendChild(option1);
   newQuestion.appendChild(option0);
   // bind question text
   newQuestion.appendChild(question);
   // bind infobox to main panel
   mainInfoBox.appendChild(newQuestion);
   // bind panel to scene
   sceneEl.appendChild(mainInfoBox);
 }


 //////////////////

 function scoreScreen(positionPoint) {
   // Thank You Screen
   positionPoint = positionPoint.split(' ');
   var pos = newPos(positionPoint[0], positionPoint[1], positionPoint[2]);
   var toatalScore = correctAnswer * points;
   totalMarks = totalHotspot * points;
   var sceneEl = document.querySelector('a-scene');

   var scoreBoard = document.createElement('a-entity');
   scoreBoard.setAttribute('id', "scoreScreen");
   scoreBoard.setAttribute('obj-model', 'obj:assets/images/moonlight.obj');
   scoreBoard.setAttribute('material', 'src:assets/images/bg.png;side:double');
   scoreBoard.setAttribute('position', '0 0 0');
   scoreBoard.setAttribute('scale', '0 0 0');
   scoreBoard.setAttribute('look-at', 'src:#mainCam');
   sceneEl.appendChild(scoreBoard);

   var newQuestion = document.getElementById('scoreScreen');
   var textBox1 = document.createElement('a-text');
   textBox1.setAttribute('id', "congratulations");
   textBox1.setAttribute('text', 'align:center;anchor:center;font:kelsonsans;height:5;tabSize:1;width:70');
   textBox1.setAttribute('value', congratulations);
   textBox1.setAttribute('rotation', '0 0 0');
   textBox1.setAttribute('position', '1.8125958083565648 19.245377124300987 1.9374560831059906');
   newQuestion.appendChild(textBox1);


   var complete = document.createElement('a-text');
   complete.setAttribute('id', "thankyou");
   complete.setAttribute('text', 'align:center;anchor:center;font:kelsonsans;tabSize:1;width:90');
   complete.setAttribute('value', thankmsg);
   complete.setAttribute('wrap-count', '60');
   complete.setAttribute('rotation', '0 0 0');
   complete.setAttribute('position', '1.2392109047179087 12.448666709112757 8.298469058585017');
   newQuestion.appendChild(complete);


   var correctanswer = document.createElement('a-text');
   correctanswer.setAttribute('id', "correctanswer");
   correctanswer.setAttribute('text', 'align:center;anchor:center;font:kelsonsans;tabSize:1;width:150;wrapCount:70');
   correctanswer.setAttribute('value', correctAnswer);
   correctanswer.setAttribute('rotation', '0 0 0');
   correctanswer.setAttribute('position', '-1.9333922072666705 1.4035300334290264 2.4124185383709844');
   newQuestion.appendChild(correctanswer);

   var outof = document.createElement('a-text');
   outof.setAttribute('id', "outof");
   outof.setAttribute('text', 'align:center;anchor:center;font:kelsonsans;tabSize:1;width:150;wrapCount:70');
   outof.setAttribute('value', totalHotspot); // activeScreen.teleports.length);
   outof.setAttribute('rotation', '0 0 0');
   outof.setAttribute('position', '3.900594183469069 -1.0975681486767894 3.2494358755117116');
   newQuestion.appendChild(outof);


   var totalPoint = document.createElement('a-text');
   totalPoint.setAttribute('id', "totalPoints");
   totalPoint.setAttribute('text', 'align:center;anchor:center;font:kelsonsans;tabSize:1;width:150;wrapCount:70');
   totalPoint.setAttribute('value', totalPoints);
   totalPoint.setAttribute('wrapCount', '60');
   totalPoint.setAttribute('rotation', '0 0 0');
   totalPoint.setAttribute('position', '-5.802617813460849 -11.395122448096656 12.501890832989009');
   newQuestion.appendChild(totalPoint);

   var score = document.createElement('a-text');
   score.setAttribute('id', "score");
   score.setAttribute('text', 'align:center;anchor:center;font:kelsonsans;tabSize:1;width:150');
   score.setAttribute('value', toatalScore);
   score.setAttribute('wrapCount', '60');
   score.setAttribute('rotation', '0 0 0');
   score.setAttribute('position', '10.265353385085842 -11.47302456572135 10.340848799777419');
   newQuestion.appendChild(score);

   var message = document.createElement('a-text');
   message.setAttribute('id', "message");
   message.setAttribute('text', 'anchor:center;width:90;align:center;font:kelsonsans;tabSize:1;wrapCount:64');
   message.setAttribute('value', "");
   message.setAttribute('rotation', '0 0 0');
   message.setAttribute('visible', 'false');
   message.setAttribute('position', '-0.20983351249285143 -18.392115724700993 8.403535370996353');
   newQuestion.appendChild(message);

   var slash = document.createElement('a-entity');
   slash.setAttribute('id', "slash");
   slash.setAttribute('material', '');
   slash.setAttribute('geometry', 'primitive:plane');
   slash.setAttribute('rotation', '6.965 -2.803 -25.787');
   slash.setAttribute('scale', '0.5 8 0.00001');
   slash.setAttribute('position', '0.5266654531157525 0.04 2.14636854784264');
   newQuestion.appendChild(slash);

   var ring = document.createElement('a-entity');
   ring.setAttribute('id', "ring");
   ring.setAttribute('material', '');
   ring.setAttribute('geometry', 'primitive: ring; radiusInner:1;');
   ring.setAttribute('rotation', '0 0 0');
   ring.setAttribute('scale', '7 7 0.00001');
   ring.setAttribute('position', '0.5627648790656121 0 4.008900109327026');
   newQuestion.appendChild(ring);

   if (activeScreen.Passing_Percentage) {

     if (activeScreen.Passing_Percentage >= 0) {
       var message = document.querySelector("#message");

       var percentage = parseInt((correctAnswer / totalHotspot) * 100);
       if (activeScreen.Passing_Percentage <= percentage) {

         message.setAttribute('value', activeScreen.Success_Message + " " + percentage + "%.");
         message.setAttribute('visible', true);
         Result = "Pass";
       } else {
         message.setAttribute('value', activeScreen.Failuer_Message + " " + percentage + "%.");
         message.setAttribute('visible', true);
         Result = "Fail";
       }
     } else {
       Result = "N/A";
     }
   }

   scoreBoard.setAttribute('position', pos);
   setTimeout(function () {
     newQuestion.setAttribute("animation__scoreAnimation", "property: scale;from:0 0 0;to:0.5 0.5 0.5; dur: 1500;enabled:true");
   }, 1500);

   if (startTracking) {
     params.Verb = "Answered";
     params.Object = correctAnswer + " Correct Answer Out of " + totalHotspot;
     params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
     callToTacking.callToApi(params);
   }
   if (xapiEnable) {
     sendToXapi("Answered", "answered", correctAnswer + " Correct Answer Out of " + totalHotspot, ExperienceName.replace(/\s/g, '') + Date.now());
   }
   if (startTracking) {
     params.Verb = "Total Score Points";
     params.Object = '"' + toatalScore + '"';
     params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
     callToTacking.callToApi(params);
   }
   if (xapiEnable) {
     sendToXapi("Scored", "scored", toatalScore + " points", ExperienceName.replace(/\s/g, '') + Date.now());
   }
   isComplete = true;
   updateExperienceResult(9, toatalScore, totalMarks, Result);

 }


 var callToTacking = new TrackingData();
 var focusTime = 0,
   screenActiveTime = 0;
 var framename = "";
 var action = "";
 var ExperienceName = "";
 var startTracking = false;
 var xapiEnable = false;

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
     if (!isComplete) {
       if (screenActiveTime % 10 == 0)
         updateExperienceResult(10, 0, 0, "Incomplete");
       setTimeout(tick, 1000);
     }
   }
   tick();
   if (document.querySelector('#videoskyid'))
     document.querySelector('#videoskyid').play();
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
   sendVerboseToXapi(verb, "http://adlnet.gov/expapi/verbs/" + urlVerb, objectText, "http://adlnet.gov/expapi/activities/FamiliarityChecker", "http://id.tincanapi.com/activity/experizer-template/" + ObjectUrlName.toLowerCase(), "http://adlnet.gov/expapi/activities/course", "Activity");
 }

 function sendQuestionAnswerToXapi(verb, urlVerb, questionText, objectId, questionChoices, questionType, learnerResponse, correctAnswer, wasCorrect) {
   sendQuestionAnswerVerboseToXapi(verb, "http://adlnet.gov/expapi/verbs/" + urlVerb, "http://id.tincanapi.com/activity/experizer-template/" + objectId.toLowerCase(), questionText, questionChoices, questionType, learnerResponse, correctAnswer, wasCorrect);
 }

 function newPos(x, y, z) {
   var r = Math.pow(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2), 0.5);
   var phy = Math.acos(z / r);
   var thita = Math.asin(y / (r * Math.sin(phy)));
   if ((x < 0 && z < 0) || (x < 0 && z > 0)) {
     phy = -phy; //+ (Math.PI);
     thita = -thita;
   }
   r = 38;
   var newx = r * Math.sin(phy) * Math.cos(thita);
   var newy = r * Math.sin(phy) * Math.sin(thita);
   var newz = r * Math.cos(phy);
   return newx + ' ' + newy + ' ' + newz;
 }

 function toDegrees(angle) {
   return angle * (180 / Math.PI);
 }

 function toRadians(angle) {
   return angle * (Math.PI / 180);
 }

 function popSnackbar(type, message) {
   var x = document.getElementById("snackbar");
   x.innerText = message;
   x.className = "show " + type;
   setTimeout(function () {
     x.className = x.className.replace("show " + type, "");
   }, 3000);
 }
 $("#summernote").bind("change paste keyup", function () {});


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
 }
 var timer = setInterval(startexp, 500);
 var assetsLoaded = false;
 var loggedin = false;
 $(window).on('load', function () {
   setTimeout(function () {
     assetsLoaded = true;
   }, 3000);
 })
