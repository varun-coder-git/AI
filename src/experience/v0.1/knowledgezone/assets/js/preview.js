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
var Result = "N/A";
var totalMarks = 0;
var questionId = 0;
var experienceStarted = false;
var correctAnswer = 0;
var knowledgeZoneData;
var topicSelected;
var isPlaying = false;
var topicCompeleted = 0;
var totalQuizTopics = 0;
var totalQuestions = 0;
var startQuiz;
var proceed;
var player;
var playpausebtn;
var restartVideo;
var seeVideo = true;
var isVideoPlaying = false;
var cam;
var unfold = false;
var questionSelectData = {
  "Question": "",
  "Options": [{
      "option": "",
      "attempted": "false"
    },
    {
      "option": "",
      "attempted": "false"
    },
    {
      "option": "",
      "attempted": "false"
    },
    {
      "option": "",
      "attempted": "false"
    }
  ]
};
var expJson = "";
var questionJsonArray = {};
var questionReportArray = [];
var questionReportArray = [];

function cleanQuestionJSONArray() {
  questionJsonArray = {};
}

var userAgent = navigator.userAgent;
if (userAgent.includes("Mobile") || userAgent.includes("Android") || userAgent.includes("iPhone")) {
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

// Json file binding and splash screen 
function initializePreview(experienceJSON, ExperienceName) {
  knowledgeZoneData = JSON.parse(experienceJSON);
  $("#loaderq").addClass("hidden-login");
  $("#innerInfo").removeClass("hidden-login");
  var instructionSet = knowledgeZoneData.splash_instruction;
  var lunchTextSet = knowledgeZoneData.launch_text;

  //if json includes splashbgcolor and opacity
  if (knowledgeZoneData.splashBackgroundColor && knowledgeZoneData.Opacity) {
    var rgbformat = hexToRgb(knowledgeZoneData.splashBackgroundColor, knowledgeZoneData.Opacity);
    document.getElementById('innerInfo').style.backgroundColor = "rgba(" + rgbformat.r + "," + rgbformat.g + "," + rgbformat.b + "," + rgbformat.alpha + ")";
  }

  document.getElementById('titleText').innerHTML = ExperienceName;
  if (knowledgeZoneData.splashHeaderColor) {
    document.getElementById('titleText').style.color = knowledgeZoneData.splashHeaderColor;
  }
  document.getElementById('instruction').innerHTML = instructionSet;
  document.getElementById('titleDescription').innerHTML = lunchTextSet;
  document.getElementById('splashLogo').src = knowledgeZoneData.splash_image;
  loggedin = true;


  if (knowledgeZoneData.topicData.length <= 0) {
    var textview = document.getElementById('submitDisabled');
    textview.setAttribute("position", "200 200 2000");
    var textview = document.getElementById('nextDisabled');
    textview.setAttribute("position", "200 200 2000");
  }
  if (knowledgeZoneData["entry_view"]) {
    $("#CamEntity").attr("rotation", knowledgeZoneData["entry_view"]);
  }

  for (i = 0; i < knowledgeZoneData.topicData.length; i++) {
    if (knowledgeZoneData.topicData[i].questionData.length > 0) {
      totalQuizTopics = totalQuizTopics + 1;
      totalQuestions = totalQuestions + knowledgeZoneData.topicData[i].questionData.length;
    }
  }

  var window_image = document.getElementById('flex2');
  window_image.setAttribute("src", knowledgeZoneData.window_wall.Logo);

  var background_theme = document.getElementById('cuberoom');
  background_theme.setAttribute('material', "metalness:0.6;src:" + knowledgeZoneData.Background_theme);
  background_theme.setAttribute('crossorigin', "anonymous");

  if (window.matchMedia("(orientation: portrait)").matches) {
    if (knowledgeZoneData["entry_view"]) {
      var entryView_y = knowledgeZoneData["entry_view"].split(" ")[1];
      $("#CamEntity").attr("rotation", "0 " + (parseInt(entryView_y) - 180) + " 0");
    }
  }

  if (window.matchMedia("(orientation: landscape)").matches) {
    if (knowledgeZoneData["entry_view"]) {
      $("#CamEntity").attr("rotation", knowledgeZoneData["entry_view"]);
    }
  }

  if (knowledgeZoneData.Topic_Wall_Heading_Logo != undefined && knowledgeZoneData.Topic_Wall_Heading_Logo != "") {
    var topicWallHeadingimage = document.getElementById("topicWallHeading");
    topicWallHeadingimage.setAttribute("src", "");
    topicWallHeadingimage.setAttribute("src", knowledgeZoneData.Topic_Wall_Heading_Logo);
  }
  if (knowledgeZoneData.Quiz_Wall_Heading_Logo != undefined && knowledgeZoneData.Quiz_Wall_Heading_Logo != "") {
    var quizWallHeadingimage = document.getElementById("quizWallHeading");
    quizWallHeadingimage.setAttribute("src", "");
    quizWallHeading.setAttribute("src", knowledgeZoneData.Quiz_Wall_Heading_Logo);
  }
  if (knowledgeZoneData.Score_Wall_Heading_Logo != undefined && knowledgeZoneData.Score_Wall_Heading_Logo != "") {
    var scoreWallHeadingimage = document.getElementById("scoreWallHeading");
    scoreWallHeadingimage.setAttribute("src", "");
    scoreWallHeadingimage.setAttribute("src", knowledgeZoneData.Score_Wall_Heading_Logo);
  }
  if (knowledgeZoneData.Media_Wall_Heading_Logo != undefined && knowledgeZoneData.Media_Wall_Heading_Logo != "") {
    var mediaWallHeadingimage = document.getElementById("mediaWallHeading");
    mediaWallHeadingimage.setAttribute("src", "");
    mediaWallHeadingimage.setAttribute("src", knowledgeZoneData.Media_Wall_Heading_Logo);
  }

  var instruction = document.getElementById('topicsPanel');
  instruction.setAttribute('visible', 'true');
  instruction.setAttribute('text', 'value:' + knowledgeZoneData.Topic_Instruction);
}
var sceneEl = document.querySelector('a-scene');
sceneEl.components.inspector.remove();

$(document).ready(() => {

  var startExperienteBtn = document.getElementById('start_experience');
  ascene = document.querySelector('a-scene');
  cam = document.getElementById("cameraId");

  var textview = document.getElementById('questionText');
  textview.setAttribute("visible", "true");
  textview.setAttribute('text', 'value:This is your quiz wall question will appear here one by one for the selected topic');

  startExperienteBtn.onclick = function () {

    cam.setAttribute("animation", "enabled:false");
    cam.setAttribute("animation__one", "enabled:true");

    experienceStarted = true;
    ascene.style.zIndex = 'auto';

    if (knowledgeZoneData.Background_audio != undefined && knowledgeZoneData.Background_audio != "") {
      var aaudio = '';
      var scene = document.querySelector('a-scene');
      aaudio = document.createElement('a-entity');
      aaudio.setAttribute('id', "audioEntity");
      aaudio.setAttribute('sound', "src: " + knowledgeZoneData.Background_audio + ";loop:true");
      aaudio.setAttribute('position', '2 -0.282 0 ');
      scene.appendChild(aaudio);
      audioEntity.addEventListener('sound-loaded', () => {

        if (isVideoPlaying == false) {
          audioEntity.components.sound.playSound();
        }
      });


    }

    document.getElementById('container').style.display = "none";
    document.getElementById('loaderq').style.display = "none";

    ///get all elements for hide and show
    startQuiz = document.getElementById('startQuiz');

    startQuiz.setAttribute("position", "200 200 200");
    restartVideo = document.getElementById('restartVideo');
    player = document.getElementById("video");
    playpausebtn = document.getElementById('playVideo');

    unfold = true;

  };
});

function hexToRgb(hex, opacity) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    alpha: opacity
  } : null;
}


function setTopics() {
  var scene = document.querySelector('a-scene');
  var y = 3.500;
  for (i = 0; i < knowledgeZoneData.topicData.length; i++) {
    y = y - 0.5;

    var topicPanel = document.createElement('a-text');
    topicPanel.setAttribute(
      "text",
      "font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;anchor:center;width:3;value:Topic1;height:3.5;tabSize:1;color:#fff;wrapCount:30;zOffset:0.081;align:center;letterSpacing:1"
    );
    topicPanel.setAttribute("id", "topic" + i);

    topicPanel.setAttribute("value", (knowledgeZoneData.topicData[i].Name));
    topicPanel.setAttribute("position", "3.507 " + y + " 7.18241");
    topicPanel.setAttribute("rotation", "0 180 0");
    topicPanel.setAttribute("scale", "1.45 1 1");
    scene.appendChild(topicPanel);

    var panel = document.getElementById('t' + i);
    panel.setAttribute("topic-click", "");
    panel.setAttribute("class", "clickable");
  }
}

function setQuiz() {

  //Print question and options on screen
  if (knowledgeZoneData.topicData[topicSelected].questionData.length > 0) {

    var questionText = document.getElementById('mainScreen');
    questionText.setAttribute('visible', 'true');
    var textview = document.getElementById('questionText');
  

    var sentence = knowledgeZoneData.topicData[topicSelected].questionData[questionId].Question;
    var car = '';
    setTimeout(function () {

      for (var m = 0; m < sentence.length; m++) {
        (function (index) {
          setTimeout(function () {
            var temp = sentence[index];
            car += temp;
            textview.setAttribute("visible", "true");

            textview.setAttribute("scale", "1 1 1");
            textview.setAttribute('text', 'value:' + car);

          }, 60 * m);
        })(m);
      }
    }, 1900);



    for (let k = 0; k < knowledgeZoneData.topicData[topicSelected].questionData[questionId].Options.length; k++) {

      if (k == 0) {
        var textBox0 = document.querySelector("#option" + k);
        var click0 = document.getElementById(k + 1);
        var optiontext0 = knowledgeZoneData.topicData[topicSelected].questionData[questionId].Options[k].option;
        var optionchar0 = '';
        setTimeout(function () {
          textBox0.setAttribute("visible", "true");
          textBox0.setAttribute("text", "value:" + optiontext0);

          textBox0.emit("getOption0");
          setTimeout(function () {
            click0.setAttribute('position', '4.92 1.9608142140494453 -2.8057443020314294');
          }, 1600);
        }, 1900 + 60 * sentence.length + 200);
      } else if (k == 1) {

        var textBox1 = document.querySelector("#option" + k);
        var click1 = document.getElementById(k + 1);
        var optiontext1 = knowledgeZoneData.topicData[topicSelected].questionData[questionId].Options[k].option;
        var optionchar1 = '';
        setTimeout(function () {
          textBox1.setAttribute("visible", "true");
          textBox1.setAttribute("text", "value:" + optiontext1);
          textBox1.emit("getOption1");
          setTimeout(function () {
            click1.setAttribute('position', '4.92 1.961 2.157');
          }, 1600);
          setTimeout(function () {
            var submit = document.querySelector('#submit');
            submit.setAttribute('position', '4.919 -1.27 -0.667');
            var submitDisabled = document.querySelector('#submitDisabled');
            submitDisabled.setAttribute('visible', 'false');
          }, 3000);
        }, 1900 + 60 * sentence.length + 400);
      } else if (k == 2) {

        var textBox2 = document.querySelector("#option" + k);
        var click2 = document.getElementById(k + 1);
        var optiontext2 = knowledgeZoneData.topicData[topicSelected].questionData[questionId].Options[k].option;
        var optionchar2 = '';
        setTimeout(function () {
          textBox2.setAttribute("visible", "true");
          textBox2.setAttribute("text", "value:" + optiontext2);
          textBox2.emit("getOption2");
          setTimeout(function () {
            click2.setAttribute('position', '4.92 0.9502846371231314 -2.8');
          }, 1600);
        }, 1900 + 60 * sentence.length + 600);
      } else if (k == 3) {

        var textBox3 = document.querySelector("#option" + k);
        var click3 = document.getElementById(k + 1);
        var optiontext3 = knowledgeZoneData.topicData[topicSelected].questionData[questionId].Options[k].option;
        var optionchar3 = '';
        setTimeout(function () {
          textBox3.setAttribute("visible", "true");
          textBox3.setAttribute("text", "value:" + optiontext3);
          textBox3.emit("getOption3");
          setTimeout(function () {
            click3.setAttribute('position', '4.92 0.95 2.156');
          }, 1600);

        }, 1900 + 60 * sentence.length + 800);
      }
    }

    questionJsonArray = {};
    questionSelectData = {
      "Question": "",
      "Options": [{
          "option": "",
          "attempted": "false"
        },
        {
          "option": "",
          "attempted": "false"
        },
        {
          "option": "",
          "attempted": "false"
        },
        {
          "option": "",
          "attempted": "false"
        }
      ]
    };
    questionJsonArray = questionSelectData;
    questionJsonArray.Question = knowledgeZoneData.topicData[topicSelected].questionData[questionId].Question;
    for (let k = 0; k < knowledgeZoneData.topicData[topicSelected].questionData[questionId].Options.length; k++) {
      questionJsonArray.Options[k].option = knowledgeZoneData.topicData[topicSelected].questionData[questionId].Options[k].option;
      questionJsonArray.Options[k].attempted = false;
    }

  }
}

//Question binding after answering first question.
function timeout() {
  for (let i = 0; i <= 3; i++) {
    textview = document.getElementById('option' + i);
    textview.setAttribute('text', 'anchor:center;tabSize:1;height:5;color:#fff');
    textview.setAttribute("text", "value:");
  }
  var textview = document.getElementById('questionText');
  textview.setAttribute('visible', true);
  textview.setAttribute("text", "value:");
  questionId = questionId + 1;
  if (knowledgeZoneData.topicData[topicSelected].questionData.length > questionId) {

    var sentence = knowledgeZoneData.topicData[topicSelected].questionData[questionId].Question;
    var car = '';
    setTimeout(function () {
      for (var m = 0; m < sentence.length; m++) {
        (function (index) {
          setTimeout(function () {
            var temp = sentence[index];
            car += temp;
            textview.setAttribute("text", "value:" + car);
            textview.setAttribute("scale", "1 1 1");
          }, 60 * m);
        })(m);
      }
    }, 1900);

    for (let k = 0; k < knowledgeZoneData.topicData[topicSelected].questionData[questionId].Options.length; k++) {


      if (k == 0) {
        var textBox0 = document.querySelector("#option" + k);

        var click0 = document.getElementById(k + 1);
        var optiontext0 = knowledgeZoneData.topicData[topicSelected].questionData[questionId].Options[k].option;
        var optionchar0 = '';
        setTimeout(function () {
          textBox0.setAttribute("visible", "true");
          textBox0.setAttribute("text", "value:" + optiontext0);
          textBox0.emit("getOption0");
          setTimeout(function () {
            click0.setAttribute('position', '4.92 1.9608142140494453 -2.8057443020314294');
          }, 1600);
        }, 1900 + 60 * sentence.length + 200);
      } else if (k == 1) {
        var textBox1 = document.querySelector("#option" + k);
        var click1 = document.getElementById(k + 1);
        var optiontext1 = knowledgeZoneData.topicData[topicSelected].questionData[questionId].Options[k].option;
        var optionchar1 = '';
        setTimeout(function () {
          textBox1.setAttribute("visible", "true");
          textBox1.setAttribute("text", "value:" + optiontext1);
          textBox1.emit("getOption1");
          setTimeout(function () {
            click1.setAttribute('position', '4.92 1.961 2.157');
          }, 1600);
          setTimeout(function () {
            var submit = document.querySelector('#submit');
            submit.setAttribute('position', '4.919 -1.27 -0.667');
            var submitDisabled = document.querySelector('#submitDisabled');
            submitDisabled.setAttribute('visible', 'false');
            var next = document.querySelector('#next');
            next.setAttribute('position', '20 -0.50 1.104');
          }, 3000);
        }, 1900 + 60 * sentence.length + 400);
      } else if (k == 2) {

        var textBox2 = document.querySelector("#option" + k);
        var click2 = document.getElementById(k + 1);
        var optiontext2 = knowledgeZoneData.topicData[topicSelected].questionData[questionId].Options[k].option;
        var optionchar2 = '';
        setTimeout(function () {
          textBox2.setAttribute("visible", "true");
          textBox2.setAttribute("text", "value:" + optiontext2);
          textBox2.emit("getOption2");
          setTimeout(function () {
            click2.setAttribute('position', '4.92 0.9502846371231314 -2.8');
          }, 1600);
        }, 1900 + 60 * sentence.length + 600);
      } else if (k == 3) {
        var textBox3 = document.querySelector("#option" + k);
        var click3 = document.getElementById(k + 1);
        var optiontext3 = knowledgeZoneData.topicData[topicSelected].questionData[questionId].Options[k].option;
        var optionchar3 = '';
        setTimeout(function () {
          textBox3.setAttribute("visible", "true");
          textBox3.setAttribute("text", "value:" + optiontext3);
          textBox3.emit("getOption3");
          setTimeout(function () {
            click3.setAttribute('position', '4.92 0.95 2.156');
          }, 1600);



        }, 1900 + 60 * sentence.length + 800);
      }
    }


    questionJsonArray = {};
    questionSelectData = {
      "Question": "",
      "Options": [{
          "option": "",
          "attempted": "false"
        },
        {
          "option": "",
          "attempted": "false"
        },
        {
          "option": "",
          "attempted": "false"
        },
        {
          "option": "",
          "attempted": "false"
        }
      ]
    };
    questionJsonArray = questionSelectData;
    questionJsonArray.Question = knowledgeZoneData.topicData[topicSelected].questionData[questionId].Question;
    for (let k = 0; k < knowledgeZoneData.topicData[topicSelected].questionData[questionId].Options.length; k++) {
      questionJsonArray.Options[k].option = knowledgeZoneData.topicData[topicSelected].questionData[questionId].Options[k].option;
      questionJsonArray.Options[k].attempted = false;
    }

  } else {
    questionId = 0;
    if (totalQuizTopics == topicCompeleted) {

      //Data binding for Scorescreen
      var window_image = document.getElementById('flex2');
      window_image.setAttribute('material', "opacity:0.9;src:assets/images/score.png");
      window_image.setAttribute('crossorigin', "anonymous");

      var completedMesssage = document.getElementById('endSingleQuizMsg');
      completedMesssage.setAttribute('visible', true);

      if (knowledgeZoneData.All_Topic_Completed_Message) {
        completedMesssage.setAttribute('value', knowledgeZoneData.All_Topic_Completed_Message);
      } else {
        completedMesssage.setAttribute('value', "You have successfully done with all the quiz");
      }



      var questionText = document.getElementById('flex3');
      questionText.setAttribute('visible', true);
      var questionText = document.getElementById('scoreScreen');
      questionText.setAttribute('visible', true);
      var questionText = document.getElementById('flex1');
      questionText.setAttribute('visible', false);
      var totalScore = correctAnswer * knowledgeZoneData.Points;
      var questionText = document.getElementById('mainScreen');
      questionText.setAttribute('visible', false);
      var entity1 = document.getElementById('1');
      entity1.setAttribute('position', '4.92 7.888 1.23');
      var entity2 = document.getElementById('2');
      entity2.setAttribute('position', '4.92 7.888 1.23');
      var entity3 = document.getElementById('3');
      entity3.setAttribute('position', '4.92 7.888 1.23');
      var entity4 = document.getElementById('4');
      entity4.setAttribute('position', '4.92 7.888 1.23');
      var endUserMsg = document.getElementById('endUserMsg');
      endUserMsg.setAttribute('value', knowledgeZoneData.End_Message);
      endUserMsg.setAttribute('visible', true);
      var heading = document.getElementById('heading');
      heading.setAttribute('value', knowledgeZoneData.Heading_Message);
      heading.setAttribute('visible', true);
      totalMarks = totalQuestions * knowledgeZoneData.Points;

      //Screen with Score
      if (knowledgeZoneData.Show_score_at_end == "Yes") {
        var point = document.getElementById('total5');
        point.setAttribute('value', totalScore);
        point.setAttribute('visible', true);

        if (knowledgeZoneData.Passing_Percentage) {
          if (knowledgeZoneData.Passing_Percentage >= 0) {
            var subheading = document.getElementById('subheading');
            var percentage = (correctAnswer / totalQuestions) * 100;

            if (knowledgeZoneData.Passing_Percentage <= percentage) {
              subheading.setAttribute('value', knowledgeZoneData.Success_Message + " You Scored " +
                roundUp(percentage, 2) + "%.");
              subheading.setAttribute('visible', true);
              Result = "Pass";
            } else {
              subheading.setAttribute('value', knowledgeZoneData.Failuer_Message + " You Scored  " +
                roundUp(percentage, 2) + "%.");
              subheading.setAttribute('visible', true);
              Result = "Fail";
            }
          } else {
            Result = "N/A";

          }
        }
        var total = document.getElementById('total3');
        total.setAttribute('value', totalQuestions);
        total.setAttribute('visible', true);
        var correct = document.getElementById('total2');
        correct.setAttribute('value', correctAnswer);
        correct.setAttribute('visible', true);
        var pointScreen = document.getElementById('pointScreen');
        pointScreen.setAttribute('visible', true);
        var slash = document.getElementById('slash');
        slash.setAttribute('visible', true);

      } else {
        var thankyou = document.getElementById('endUserMsg');
        thankyou.setAttribute('visible', true);
      }
      setTimeout(function () {
        // cam.setAttribute("animation__video", "property: rotation;from:0 90 0 ;to: 0 -90 0; dur: 1500;round	:	false;enabled:true");
        cameraAnimation(-450);
      }, 1000);

      player.setAttribute('src', '');
      endExp = true;

    } else {
      var flex = document.querySelector('#flex3');
      flex.setAttribute('visible', true);

      var completedMesssage = document.getElementById('endSingleQuizMsg');
      if (knowledgeZoneData.Single_Topic_Completed_Message) {
        completedMesssage.setAttribute('value', knowledgeZoneData.Single_Topic_Completed_Message);
      } else {
        completedMesssage.setAttribute('value', "Great!!Choose the next topic");
      }

      completedMesssage.setAttribute('visible', true);


      var questionText = document.getElementById('flex1');
      questionText.setAttribute('visible', false);

      var questionText = document.getElementById('mainScreen');
      questionText.setAttribute('visible', false);


      for (let j = 0; j < knowledgeZoneData.topicData.length; j++) {
        var disablePanelClick = document.getElementById("t" + j);

        var selectedTopic = document.getElementById('imaget' + j);
        var isVisible = selectedTopic.getAttribute('visible');
        if (isVisible == false) {
          disablePanelClick.setAttribute("class", "clickable");
          disablePanelClick.setAttribute("topic-click");
        }
      }

      setTimeout(function () {
        // cam.setAttribute("animation__video", "property: rotation;from:0 90 0 ;to: 0 0 0; dur: 1000;enabled:true");
        cameraAnimation(-360);
      }, 1000);



    }
  }
}

AFRAME.registerComponent('startVideo', {
  schema: {
    default: ''
  },
  init() {
    this.el.addEventListener('click', () => {
      cameraAnimation(-180);
      // cam.setAttribute("animation__video", "property: rotation;from:0 360 0 ;to: 0 180 0; dur: 1500;enabled:true;easing:linear;");
      
      var setVideo = document.getElementById("videoPlayer");
      setVideo.setAttribute("material", "src:assets/images/appearvideoscreen.jpg");
      document.getElementById('blip1').play();

      isVideoPlaying = true;
      if (knowledgeZoneData.Background_audio != undefined && knowledgeZoneData.Background_audio != "") {
        var audio1 = document.getElementById('audioEntity');
        audio1.components.sound.pauseSound();
      }

      if (knowledgeZoneData.Start_Quiz_Button_Image) {
        var startQuizimage = document.getElementById("startQuiz");
        startQuizimage.setAttribute("src", "");
        startQuizimage.setAttribute("src", knowledgeZoneData.Start_Quiz_Button_Image);
      }


      var mediaUrl = knowledgeZoneData.topicData[topicSelected].videoUrl;
      if (mediaUrl != '' && mediaUrl != undefined) {
        player.setAttribute('src', '');
        player.setAttribute('src', mediaUrl);
        var setVideo = document.getElementById("videoPlayer");
        setVideo.setAttribute("material", "src:#video");
        player.play();
        playpausebtn.setAttribute("material", "src:assets/images/pause.png");
        isPlaying = true;

        player.addEventListener('ended', function (evt) {
          playpausebtn.setAttribute("material", "src:assets/images/play.png");
          player.pause();
          isPlaying = false;
        });
      } else {
        var setVideo = document.getElementById("videoPlayer");
        player.setAttribute("src", "");
        setVideo.setAttribute("material", "src:assets/images/novideoscreen.jpg");
      }

      topicCompeleted += 1;

      var selectedTopic = document.getElementById('imaget' + topicSelected);
      selectedTopic.setAttribute("visible", "true");

      proceed.setAttribute('position', '1000 1000 1000');

      playpausebtn.setAttribute("class", "clickable");
      playpausebtn.setAttribute("crossorigin", "anonymous");
      playpausebtn.setAttribute("play-pause", '');

      restartVideo.setAttribute("class", "clickable");
      restartVideo.setAttribute("crossorigin", "anonymous");
      restartVideo.setAttribute("restart-video", '');

      for (let j = 0; j < knowledgeZoneData.topicData.length; j++) {
        //var disablePanelClick=document.getElementById('topic'+j);
        var disablePanelClick = document.getElementById("t" + j);
        disablePanelClick.removeAttribute("class", "clickable");
        disablePanelClick.removeAttribute("topic-click");
      }

      if (knowledgeZoneData.seeVideo == "No") {
        setTimeout(function () {
          //setting up the player with its control

          startQuiz.setAttribute("position", "4.71 -1.41447 -7.243");

        }, 5000);

      } else {
        startQuiz.setAttribute("position", "4.71 -1.41447 -7.243");
      }
      startQuiz.setAttribute('start-quiz', '');
    });
  }
});

AFRAME.registerComponent('topic-click', {
  schema: {
    default: ''
  },
  init() {
    this.el.addEventListener('click', () => {
      document.getElementById('blip1').play();

      var str = this.el.id;
      topicSelected = str.replace("t", "");
      if (knowledgeZoneData.Start_Video_Button_Image) {
        var startvideoimage = document.getElementById("proceed");
        startvideoimage.setAttribute("material", "src:");
        startvideoimage.setAttribute("material", "src:" + knowledgeZoneData.Start_Video_Button_Image);
      }
      for (i = 0; i < knowledgeZoneData.topicData.length; i++) {

        if (topicSelected == i) {
          var panel = document.getElementById("topic" + i);
          panel.setAttribute("text", "font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;anchor:center;width:3;height:3.5;tabSize:1;color:#000f85;wrapCount:30;zOffset:0.081;align:center;letterSpacing:1");

        } else {

          var panel = document.getElementById("topic" + i);
          if ($('#t' + i).hasClass("clickable")) {
            panel.setAttribute("text",  "font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;anchor:center;width:3;height:3.5;tabSize:1;color:#fff;wrapCount:30;zOffset:0.081;align:center;letterSpacing:1");
          } else {
            panel.setAttribute("text", "font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;anchor:center;width:3;height:3.5;tabSize:1;color:#0c360c;wrapCount:30;zOffset:0.081;align:center;letterSpacing:1");
          }
        }
      }

      // var setVideo = document.getElementById("videoPlayer");
      // setVideo.setAttribute("material", "src:assets/images/appearvideoscreen.jpg");


      var title = document.getElementById('topicTitle');
      var titleDescription = document.getElementById('topicDescription');
      var titleDescriptionImage = document.getElementById('topicDescriptionImage');
      title.setAttribute("visible", "true");
      titleDescriptionImage.setAttribute("visible", "false")

      title.setAttribute("text", 'value:' + (knowledgeZoneData.topicData[topicSelected].Name))

      if (knowledgeZoneData.topicData[topicSelected].DescriptionType == "image") {
        if (knowledgeZoneData.topicData[topicSelected].DescriptionImage != "") {
          titleDescriptionImage.setAttribute("src", knowledgeZoneData.topicData[topicSelected].DescriptionImage);
          titleDescriptionImage.setAttribute("visible", "true");
        }
        titleDescription.setAttribute('text', 'value:""');
        titleDescription.setAttribute("visible", "false");
      } else {
        titleDescription.setAttribute("visible", "true");
        //title.setAttribute('text', 'value:' + knowledgeZoneData.topicData[topicSelected].Name);
        titleDescription.setAttribute('text', 'value:' + knowledgeZoneData.topicData[topicSelected].Description);
        titleDescriptionImage.setAttribute("src", "");;
      }
      proceed = document.getElementById('proceed');
      proceed.setAttribute('startVideo', '');
      proceed.setAttribute('visible', 'true');
      proceed.setAttribute('position', '-5.655 -1.499 7.229');



      var questionText = document.getElementById('flex1');
      questionText.setAttribute('visible', true);

      var flex = document.querySelector('#flex3');
      flex.setAttribute('visible', false);
      var completedMesssage = document.getElementById('endSingleQuizMsg');
      completedMesssage.setAttribute('visible', false);


    });
  }
});

AFRAME.registerComponent('play-pause', {
  schema: {
    default: ''
  },
  init() {
    this.el.addEventListener('click', () => {
      if (isPlaying) {
        playpausebtn.setAttribute("material", "src:assets/images/play.png");
        player.pause();
        isPlaying = false;
      } else {
        playpausebtn.setAttribute("material", "src:assets/images/pause.png");
        
        player.play();
        isPlaying = true;
      }


    });
  }
});

AFRAME.registerComponent('restart-video', {
  schema: {
    default: ''
  },
  init() {
    this.el.addEventListener('click', () => {
      player.load();
      player.play();
      isPlaying = true;
      playpausebtn.setAttribute("material", "src:assets/images/pause.png");
    });
  }
});

AFRAME.registerComponent('start-quiz', {
  schema: {
    default: ''
  },
  init() {
    this.el.addEventListener('click', () => {

      document.getElementById('blip1').play();

      // cam.setAttribute("animation__video", "property: rotation;from:0 180 0 ;to: 0 90 0; dur: 1000;enabled:true");
      cameraAnimation(-270);
      startQuiz.setAttribute('position', '1000 1000 1000');

      player.pause();
      playpausebtn.setAttribute("material", "src:assets/images/play.png");
      isPlaying = false;
      setQuiz();
    });
  }
});

$(document).ready(() => {
  AFRAME.registerComponent('option-click', {
    schema: {
      default: ''
    },
    init() {
      //selected option validations with correct answer
      this.el.addEventListener('click', () => {

        if (experienceStarted == true) {

          document.getElementById('blip1').play();


          var sky = document.querySelector('#option' + (parseInt(this.el.id) - 1));
          var optionVal = sky.id;
          var res = optionVal.split("option");

          if (questionJsonArray.Options[res[1]].attempted == false) {
            var textview6 = document.getElementById('option' + res[1]);
            textview6.setAttribute('text', 'anchor:center;width:4;tabSize:1;height:5;color:#ffff00;wrapCount:0;wrapPixels:900;whiteSpace:pre;lineHeight:60');
            questionJsonArray.Options[res[1]].attempted = true;
          } else {
            var textview6 = document.getElementById('option' + res[1]);
            textview6.setAttribute('text', 'anchor:center;width:4;tabSize:1;height:5;color:#fff;wrapCount:0;wrapPixels:900;whiteSpace:pre;lineHeight:60');
            questionJsonArray.Options[res[1]].attempted = false;
          }

        }
      });
    }
  });
});

//Courser Reset
AFRAME.registerComponent('sky', {
  schema: {
    default: ''
  },
  init() {

    this.el.addEventListener('mouseleave', () => {
      var cur = document.querySelector('#cursor');
      cur.emit("startAnimantion");
    });
  }
});


//Submit
AFRAME.registerComponent('submit', {
  schema: {
    default: ''
  },
  init() {
    //selected option validations with correct answer
    this.el.addEventListener('click', () => {
      if (experienceStarted == true) {
        document.getElementById('blip1').play();
        if (this.el.id == "submit") {
          var resultFlag = 0;
          var resultCount = 0;
          for (var z = 1; z <= 4; z++) {
            var click0 = document.getElementById(z);
            click0.setAttribute('position', '0 20 0 ');
          }
          for (n = 0; n < questionJsonArray.Options.length; n++) {
            if (questionJsonArray.Options[n].attempted == true) {
              questionReportArray.push(n);
            }
          }

          if (knowledgeZoneData.Show_right_answer == "Yes") {
            for (l = 0; l < 4; l++) {
              var opt = document.querySelector("#option" + l);
              opt.setAttribute('text', 'anchor:center;width:4;tabSize:1;height:5;color:#fff;wrapCount:0;wrapPixels:900;whiteSpace:pre;lineHeight:60;baseline:top');
            }
          }

          // if (knowledgeZoneData.seeVideo == "No") {
          //   seeVideo=false;
          // }


          if (questionReportArray.length == knowledgeZoneData.topicData[topicSelected].questionData[questionId].Answer.length) {
            for (var j = 0; j < knowledgeZoneData.topicData[topicSelected].questionData[questionId].Answer.length; j++) {
              if (questionReportArray[j] == (knowledgeZoneData.topicData[topicSelected].questionData[questionId].Answer[j] - 1)) {
                resultCount++;
              } else {
                if (knowledgeZoneData.Show_right_answer == "Yes") {
                  var key1 = document.querySelector("#option" + questionReportArray[j]);
                  key1.setAttribute('text', 'anchor:center;width:4;tabSize:1;height:5;color:#ff0000;wrapCount:0;wrapPixels:900;whiteSpace:pre;lineHeight:60;baseline:top');
                }
              }
            }

          } else {
            if (knowledgeZoneData.Show_right_answer == "Yes") {
              for (var j = 0; j < questionReportArray.length; j++) {
                var key1 = document.querySelector("#option" + questionReportArray[j]);
                key1.setAttribute('text', 'anchor:center;width:4;tabSize:1;height:5;color:#ff0000;wrapCount:0;wrapPixels:900;whiteSpace:pre;lineHeight:60;baseline:top');
              }
            }
          }

          if (resultCount == knowledgeZoneData.topicData[topicSelected].questionData[questionId].Answer.length) {
            correctAnswer = correctAnswer + 1;

            resultFlag = 1;
            var Option = "";
            var answerKey = "";
            for (var j = 0; j < knowledgeZoneData.topicData[topicSelected].questionData[questionId].Answer.length; j++) {
              var value = (knowledgeZoneData.topicData[topicSelected].questionData[questionId].Answer[j]) - 1;
              answerKey = answerKey + knowledgeZoneData.topicData[topicSelected].questionData[questionId].Options[value].option + ",";
            }
            var selectedOption = "";
            answerKey = answerKey.replace(/,\s*$/, "");
            for (var j = 0; j < questionReportArray.length; j++) {
              selectedOption = questionReportArray[j];
              Option = Option + knowledgeZoneData.topicData[topicSelected].questionData[questionId].Options[selectedOption].option + ",";
            }


          } else {
            var Option = "";
            var answerKey = "";
            for (var j = 0; j < knowledgeZoneData.topicData[topicSelected].questionData[questionId].Answer.length; j++) {
              var value = (knowledgeZoneData.topicData[topicSelected].questionData[questionId].Answer[j]) - 1;
              answerKey = answerKey + knowledgeZoneData.topicData[topicSelected].questionData[questionId].Options[value].option + ",";
            }
            answerKey = answerKey.replace(/,\s*$/, "");
            var selectedOption = "";
            for (var j = 0; j < questionReportArray.length; j++) {
              selectedOption = questionReportArray[j];
              Option = Option + knowledgeZoneData.topicData[topicSelected].questionData[questionId].Options[selectedOption].option + ",";
            }
            Option = Option.replace(/,\s*$/, "");


          }
          var submitDisabled = document.querySelector('#submitDisabled');
          submitDisabled.setAttribute('visible', 'true');
          var submit = document.querySelector('#submit');
          submit.setAttribute('position', '20 -0.50 -0.667');
          setTimeout(function () {
            var nextDisabled = document.querySelector('#nextDisabled');
            nextDisabled.setAttribute('visible', 'false');
            var next = document.querySelector('#next');
            next.setAttribute('position', '4.919 -1.27 1.104');
          }, 1000);

          if (knowledgeZoneData.Show_right_answer == "Yes") {
            for (m = 0; m < knowledgeZoneData.topicData[topicSelected].questionData[questionId].Answer.length; m++) {
              var key = (knowledgeZoneData.topicData[topicSelected].questionData[questionId].Answer[m]) - 1;
              var key1 = document.querySelector("#option" + key);
              key1.setAttribute('text', 'anchor:center;width:4;tabSize:1;height:5;color:#00ff00;wrapCount:0;wrapPixels:900;whiteSpace:pre;lineHeight:60;baseline:top');

            }

            var feedback = document.querySelector("#feedback");
            if (resultFlag == 1) {
              feedback.setAttribute('visible', 'true');
              feedback.setAttribute('value', knowledgeZoneData.topicData[topicSelected].questionData[questionId].Reenforcement_feedback);
            } else {
              feedback.setAttribute('visible', 'true');
              feedback.setAttribute('value', knowledgeZoneData.topicData[topicSelected].questionData[questionId].Corrective_feedback);
            }
          }
        } else if (this.el.id == "next") {
          var submit = document.querySelector('#submit');
          submit.setAttribute('position', '20 -0.4911325336898621 4.569645828671785');
          var next = document.querySelector('#next');
          next.setAttribute('position', '20 -0.4911325336898621 4.569645828671785');
          var feedback = document.querySelector("#feedback");
          feedback.setAttribute('visible', 'false');
          var nextDisabled = document.querySelector('#nextDisabled');
          nextDisabled.setAttribute('visible', 'true');
          var submitDisabled = document.querySelector('#submitDisabled');
          submitDisabled.setAttribute('visible', 'true');
          timeout();
          questionReportArray = [];

        }
      }

    });

  }
});


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
  }, 10000);
});

function roundUp(num, precision) {
  precision = Math.pow(10, precision)
  return Math.ceil(num * precision) / precision
}

AFRAME.registerComponent('cursor-listener', {
  schema: {

  },

  init: function () {
    this.el.addEventListener('mouseenter', function () {
      var delay = 50;
      if (unfold == true) {
        var fold = document.getElementById("folds");
        fold.setAttribute("visible", "true");
        for (i = 0; i < knowledgeZoneData.topicData.length; i++) {

          if (i == 0) {
            var getparent = document.getElementById("folds");
            var createTile = document.createElement("a-plane");
            createTile.setAttribute("id", "tt" + i);
            createTile.setAttribute("rotation", "-10 0 0");
            createTile.setAttribute("animation", "delay: 1000");
            createTile.setAttribute("mixin", "board unhinge");
            getparent.appendChild(createTile);
          } else {
            delay = delay + 100;
            var getparent = document.getElementById("tt" + (i - 1));
            var createTile = document.createElement("a-plane");
            createTile.setAttribute("id", "tt" + i);
            createTile.setAttribute("rotation", "180 0 0");
            createTile.setAttribute("animation", "delay:" + delay);
            createTile.setAttribute("mixin", "board unhinge");
            getparent.appendChild(createTile);
          }
        }
        setTimeout(function () {
          setTopics();
        }, 1900);

        unfold = false;
      }
    });

  },
});


function cameraAnimation(angle){
  var cameraIdRotation=document.getElementById('cameraId').getAttribute('rotation');
        var firstrotationRotation=document.querySelector('#firstrotation').getAttribute('rotation');
        var y=(cameraIdRotation.y+firstrotationRotation.y)%360;
        let controls = document.querySelector('#firstrotation').components['look-controls']
        controls.pitchObject.rotation.x = 0;
        controls.yawObject.rotation.y = 0;
  
        if(y>0){
          y= (y-360)%360;
        }
       if(angle>y){
         y=360+y;
       }
        document.getElementById('cameraId').setAttribute('rotation'," "+cameraIdRotation.x+" "+y+" "+cameraIdRotation.z);
    console.log("rotation y:"+y);
        cam.setAttribute(
            "animation__video",
            "property: rotation;to: 0 "+angle+" 0; dur: 1500;enabled:true;easing:linear;"
          );
  }
