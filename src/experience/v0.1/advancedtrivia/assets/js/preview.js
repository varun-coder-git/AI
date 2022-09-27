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
var playing = true;
var cameraPanFollowExecuted = false;
var cameraPanFollowOneExecuted = false;

var quizData = {
  Background_audio: "",
  branding_south_wall: {},
  branding_east_wall: {},
  branding_west_wall: {},
  Points: 10,
  Passing_Percentage: "",
  Show_right_answer: "",
  Show_score_at_end: "",
  End_Message: "",
  Heading_Message: "",
  Success_Message: "",
  Failuer_Message: "",
  launch_text: "",
  questionData: [],
};
var videoTag1;
var videoTag2;
var questionSelectData = {
  Question: "",
  Options: [
    {
      option: "",
      attempted: "false",
    },
    {
      option: "",
      attempted: "false",
    },
    {
      option: "",
      attempted: "false",
    },
    {
      option: "",
      attempted: "false",
    },
  ],
};
var expJson = "";
var questionJsonArray = {};
var questionReportArray = [];
var questionReportArray = [];
var scene = document.querySelector("a-scene");
var aaudio ;
var defaultMusic;
// aaudio = document.createElement('audio');
// aaudio.setAttribute('id', "audioEntity1");

function cleanQuestionJSONArray() {
  questionJsonArray = {};
}

var userAgent = navigator.userAgent;
if (
  userAgent.includes("Mobile") ||
  userAgent.includes("Android") ||
  userAgent.includes("iPhone")
) {
  var cameraId = document.querySelector("#cursor");
  cameraId.removeAttribute("cursor");
  cameraId.setAttribute("scale", "1 1 1");
  cameraId.setAttribute("cursor", "fuse", "true; fuseTimeout: 1500;");
}

function playMusic() {
  if (
    quizData.questionData[questionId].Background_audio == "" ||
    quizData.questionData[questionId].Background_audio == undefined
  ) {
    //increase the default volume
   aaudio.setAttribute("src", "");
   defaultMusic.volume=1;
  } else {
    //decrease the default volume
    defaultMusic.volume=0.1;
    aaudio.setAttribute("src", "");
    aaudio.setAttribute(
      "src",
      quizData.questionData[questionId].Background_audio
    );
    aaudio.loop = false;
    
  }
  // aaudio.setAttribute('position', '2 -0.282 0 ');
  // scene.appendChild(aaudio);
  if (cameraPanFollowExecuted == true) {
    aaudio.addEventListener("loadeddata", () => {
      aaudio.pause();
      defaultMusic.pause();
      videoTag1.play();
    });
  } else {
    aaudio.addEventListener("loadeddata", () => {
      aaudio.play();
      defaultMusic.play();
      videoTag1.pause();
      videoTag1.currentTime = 0;
      videoTag2.pause();
      videoTag2.currentTime = 0;

      aaudio.addEventListener('ended', function () {
      //increase default volume
      aaudio.setAttribute("src", "");
      defaultMusic.volume=1;
      });
      defaultMusic.addEventListener('ended', function () {
        //increase default volume
        if (quizData.Background_audio_loop == "Indefinite") {
        defaultMusic.volume=1;
        }else{
          defaultMusic.setAttribute("src","")
        }
        });
});
  }

  if (cameraPanFollowOneExecuted == true) {
    aaudio.addEventListener("loadeddata", () => {
      aaudio.pause();
      defaultMusic.pause();
      videoTag2.play();
    });
  } else {
    aaudio.addEventListener("loadeddata", () => {
      aaudio.play();
      defaultMusic.play();
      videoTag1.pause();
      videoTag1.currentTime = 0;
      videoTag2.pause();
      videoTag2.currentTime = 0;

      aaudio.addEventListener('ended', function () {
      
        defaultMusic.volume=1;
      });
      defaultMusic.addEventListener('ended', function () {
        //increase default volume
        if (quizData.Background_audio_loop == "Indefinite") {
        defaultMusic.volume=1;
        }else{
          defaultMusic.setAttribute("src","")
        }
        });
    });
  }
}


function playWestVideo() {
  var cv1 = document.getElementById("video1");
  var videoPlane1 = document.getElementById("customeVideoPlane1");
  if (
    quizData.questionData[questionId].Background_video1 == "" ||
    quizData.questionData[questionId].Background_video1 == undefined
  ) {
    cv1.setAttribute("visible", "false");
    cv1.setAttribute("muted", "true");
    videoTag1.setAttribute("src", "");
    cv1.setAttribute("position", "2000 2000 2000");
    videoPlane1.setAttribute("position", "2000 2000 2000");
    videoPlane1.setAttribute("visible", "false");
  } else {
    cv1.setAttribute("visible", "true");
    videoTag1.setAttribute("src", "");
    videoTag1.setAttribute(
      "src",
      quizData.questionData[questionId].Background_video1,
      "loop:false"
    );
    cv1.setAttribute("muted", "false");
    cv1.setAttribute("position", "-0.850 1.9361 5.96129");
    videoPlane1.setAttribute("position", "-1.20989 1.9361 5.96129");
    videoTag1.pause();
  }
}

function playEastVideo() {
  var cv2 = document.getElementById("video2");
  var videoPlane2 = document.getElementById("customeVideoPlane2");
  if (
    quizData.questionData[questionId].Background_video2 == "" ||
    quizData.questionData[questionId].Background_video2 == undefined
  ) {
    cv2.setAttribute("visible", "false");
    cv2.setAttribute("muted", "true");
    videoTag2.setAttribute("src", "");
    cv2.setAttribute("position", "2000 2000 2000");
    videoPlane2.setAttribute("position", "2000 2000 2000");
    videoPlane2.setAttribute("visible", "false");
  } else {
    cv2.setAttribute("visible", "true");
    videoTag2.setAttribute("src", "");
    videoTag2.setAttribute(
      "src",
      quizData.questionData[questionId].Background_video2,
      "loop:false"
    );
    cv2.setAttribute("muted", "false");
    cv2.setAttribute("position", "-0.850 1.9361 -5.96129");
    videoPlane2.setAttribute("position", "-1.20989 1.9361 -5.96129");
    videoTag2.pause();
  }
}

AFRAME.registerComponent("camera-pan-follow", {
  schema: {},
  init: function () {
    this.el.addEventListener("mouseenter", function () {
      if (
        quizData.questionData[questionId].Background_video1 != "" &&
        quizData.questionData[questionId].Background_video1 != undefined
      ) {
        cameraPanFollowExecuted = true;
        aaudio.pause();
        defaultMusic.pause();
        videoTag1.play();
      }
    });
    this.el.addEventListener("mouseleave", function () {
      if (
        quizData.questionData[questionId].Background_video1 != "" &&
        quizData.questionData[questionId].Background_video1 != undefined
      ) {
        videoTag1.pause();
        var audioDuration = aaudio.duration;
        var audioCurrentTime = aaudio.currentTime;
        if (audioDuration != audioCurrentTime) {
          aaudio.play();
        }
        defaultMusic.play();
      }
    });
  },
  tick: function () {},
});
AFRAME.registerComponent("camera-pan-follow-1", {
  schema: {},

  init: function () {
    this.el.addEventListener("mouseenter", function () {
      if (
        quizData.questionData[questionId].Background_video2 != "" &&
        quizData.questionData[questionId].Background_video2 != undefined
      ) {
        cameraPanFollowOneExecuted = true;
        videoTag2.play();
        aaudio.pause();
        defaultMusic.pause();
      }
    });
    this.el.addEventListener("mouseleave", function () {
      if (
        quizData.questionData[questionId].Background_video2 != "" &&
        quizData.questionData[questionId].Background_video2 != undefined
      ) {
        videoTag2.pause();
        var audioDuration = aaudio.duration;
        var audioCurrentTime = aaudio.currentTime;
        if (audioDuration != audioCurrentTime) {
          aaudio.play();
         
        }
        defaultMusic.play();
      }
    });
  },
  tick: function () {},
});
$(document).ready(() => {
  var startExperienteBtn = document.getElementById("start_experience");
  aaudio = document.getElementById("audioEntity1");
  defaultMusic = document.getElementById("audioEntity2");
  ascene = document.querySelector("a-scene");

 videoTag1 = document.getElementById("customVideo1");
 videoTag2 = document.getElementById("customVideo2");

 startExperienteBtn.onclick = function () {
    var cam = document.querySelector("#cameraId");
    // cam.emit("skyrotation");
    cam.setAttribute("animation","enabled:false");
    cam.setAttribute("animation__one","enabled:true");
    experienceStarted = true;
    ascene.style.zIndex = "auto";
    if (quizData.Background_audio != "") {
      defaultMusic.setAttribute("src", "");
      defaultMusic.setAttribute("src", quizData.Background_audio);
      
      defaultMusic.play();
      if (quizData.Background_audio_loop == "Indefinite") {
        defaultMusic.loop = true;
      }else{
        defaultMusic.loop = false;
      }
      
    }
    playMusic();
    changeImages();
    playWestVideo();
    playEastVideo();
    // ascene.style.zIndex = 'auto';
    document.getElementById("container").style.display = "none";
    document.getElementById("loaderq").style.display = "none";
    // experienceStarted = true;
  };
});
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
// Json file binding and splash screen
function initializePreview(experienceJSON, ExperienceName) {
  quizData = JSON.parse(experienceJSON);

  var eImage = document.getElementById("eastImage");
  setWallImages(eImage,quizData.branding_east_wall.image);
  var wImage = document.getElementById("westImage");
  setWallImages(wImage,quizData.branding_west_wall.image);
 
  var textview = document.getElementById("questionText");
  textview.setAttribute("visible","true");
  textview.setAttribute('text','value:This is your quiz wall question will appear here one by one');

  $("#loaderq").addClass("hidden-login");
  $("#innerInfo").removeClass("hidden-login");
  var instructionSet = quizData.splash_instruction;
  var lunchTextSet = quizData.launch_text;
  //if json includes splashbgcolor and opacity
  if (quizData.splashBackgroundColor && quizData.Opacity) {
    var rgbformat = hexToRgb(quizData.splashBackgroundColor, quizData.Opacity);
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

  document.getElementById("titleText").innerHTML = ExperienceName;
  //if json includes splashheadercolor
  if (quizData.splashHeaderColor) {
    document.getElementById("titleText").style.color =
      quizData.splashHeaderColor;
  }
  // document.getElementById('instruction').innerText = quizData.splash_instruction;
  // document.getElementById('titleDescription').innerHTML = quizData.launch_text;
  document.getElementById("instruction").innerHTML = instructionSet;
  document.getElementById("titleDescription").innerHTML = lunchTextSet;
  //document.getElementById("splashLogo").src = quizData.splash_image;
  loggedin = true;
  setQuiz();

  if (quizData.questionData.length <= 0) {
    var textview = document.getElementById("submitDisabled");
    textview.setAttribute("position", "200 200 2000");
    var textview = document.getElementById("nextDisabled");
    textview.setAttribute("position", "200 200 2000");
  }
  if (window.matchMedia("(orientation: portrait)").matches) {
    if (quizData["entry_view"]) {
      var entryView_y = quizData["entry_view"].split(" ")[1];
      $("#CamEntity").attr(
        "rotation",
        "0 " + (parseInt(entryView_y) - 180) + " 0"
      );
    }
  }
  if (window.matchMedia("(orientation: landscape)").matches) {
    if (quizData["entry_view"]) {
      $("#CamEntity").attr("rotation", quizData["entry_view"]);
    }
  }
  var background_theme = document.getElementById('cuberoom');
    background_theme.setAttribute('material', "metalness:0.6;src:" + quizData.Background_theme);
  background_theme.setAttribute('crossorigin', "anonymous");
}

var eastImage, westImage;
function setQuiz() {
  //Audio,Background and branding images binding
  var imagePath = "assets/images/default.jpg";
  
  var background_theme = document.getElementById("southLogo");
  if (
    quizData.branding_south_wall.Logo != "" &&
    quizData.branding_south_wall.Logo != undefined
  ) {
    background_theme.setAttribute(
      "material",
      "opacity:0.9;src:" + quizData.branding_south_wall.Logo
    );
    background_theme.setAttribute("crossorigin", "anonymous");
  }

  var south_image2 = document.getElementById("south_image2");
  if (
    quizData.branding_south_wall.image2 != "" &&
    quizData.branding_south_wall.image2 != undefined
  ) {
    south_image2.setAttribute(
      "material",
      "src:" + quizData.branding_south_wall.image2
    );
    south_image2.setAttribute("crossorigin", "anonymous");
  }
  eastImage = document.getElementById("eastImage");
  if (
    quizData.branding_east_wall.image != "" &&
    quizData.branding_east_wall.image != undefined
  ) {
   setWallImages(eastImage,quizData.branding_east_wall.image);
  }
  westImage = document.getElementById("westImage");
  if (
    quizData.branding_west_wall.image != "" &&
    quizData.branding_west_wall.image != undefined
  ) {
    setWallImages(westImage, quizData.branding_west_wall.image);
  }
  //Print question and options on screen
  if (quizData.questionData.length > 0) {
    var textview = document.getElementById("questionText");
    textview.setAttribute("visible","true");
     textview.setAttribute('text','value:'+quizData.questionData[questionId].Question);
    
 

    for (let k = 0; k < quizData.questionData[questionId].Options.length; k++) {


      if (k == 0) {
          var textBox0 = document.querySelector("#option" + k);
          var click0 = document.getElementById(k + 1);
          var optiontext0 = quizData.questionData[questionId].Options[k].option;
          var optionchar0 = '';
              textBox0.setAttribute("visible","true");
              textBox0.setAttribute("text", "value:" + optiontext0);
              textBox0.emit("getOption0");
                  click0.setAttribute('position', '4.92 2.151 -2.8057443020314294');
             
      } else if (k == 1) {

          var textBox1 = document.querySelector("#option" + k);
          var click1 = document.getElementById(k + 1);
          var optiontext1 = quizData.questionData[questionId].Options[k].option;
          var optionchar1 = '';
              textBox1.setAttribute("visible","true");
              textBox1.setAttribute("text", "value:" + optiontext1);
              textBox1.emit("getOption1");
             
                  click1.setAttribute('position', '4.92 2.151 2.157');
             
                  var submit = document.querySelector('#submit');
                  submit.setAttribute('position', '4.919 -1.27 -0.667');
                  var submitDisabled = document.querySelector('#submitDisabled');
                  submitDisabled.setAttribute('visible', 'false');
            
      } else if (k == 2) {

          var textBox2 = document.querySelector("#option" + k);
          var click2 = document.getElementById(k + 1);
          var optiontext2 = quizData.questionData[questionId].Options[k].option;
          var optionchar2 = '';
              textBox2.setAttribute("visible","true");
              textBox2.setAttribute("text", "value:" + optiontext2);
              textBox2.emit("getOption2");
                  click2.setAttribute('position', '4.92 0.9502846371231314 -2.8');
             
      } else if (k == 3) {

          var textBox3 = document.querySelector("#option" + k);
          var click3 = document.getElementById(k + 1);
          var optiontext3 = quizData.questionData[questionId].Options[k].option;
          var optionchar3 = '';
              textBox3.setAttribute("visible","true");
              textBox3.setAttribute("text", "value:" + optiontext3);
              textBox3.emit("getOption3");
                  click3.setAttribute('position', '4.92 0.95 2.156');
             
      }
  }

    questionJsonArray = {};
    questionSelectData = {
      Question: "",
      Options: [
        {
          option: "",
          attempted: "false",
        },
        {
          option: "",
          attempted: "false",
        },
        {
          option: "",
          attempted: "false",
        },
        {
          option: "",
          attempted: "false",
        },
      ],
    };
    questionJsonArray = questionSelectData;
    questionJsonArray.Question = quizData.questionData[questionId].Question;
    for (let k = 0; k < quizData.questionData[questionId].Options.length; k++) {
      questionJsonArray.Options[k].option =
        quizData.questionData[questionId].Options[k].option;
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
  var textview = document.getElementById("questionText");
  textview.setAttribute('visible', true);
  textview.setAttribute("text", "value:");
  questionId = questionId + 1;

  if (quizData.questionData.length > questionId) {
    var sentence = quizData.questionData[questionId].Question;
    var car = "";
    setTimeout(function () {
      for (var m = 0; m < sentence.length; m++) {
        (function (index) {
          setTimeout(function () {
            var temp = sentence[index];
            car += temp;
            textview.setAttribute("visible","true");
            textview.setAttribute("text", "value:" + car);
          }, 60 * m);
        })(m);
      }
    }, 1900);

    for (let k = 0; k < quizData.questionData[questionId].Options.length; k++) {
      if (k == 0) {
        var textBox0 = document.querySelector("#option" + k);

        var click0 = document.getElementById(k + 1);
        var optiontext0 = quizData.questionData[questionId].Options[k].option;
        var optionchar0 = "";
        setTimeout(function () {
          textBox0.setAttribute("visible","true");
          textBox0.setAttribute("text", "value:" +optiontext0);
          textBox0.emit("getOption0");
          setTimeout(function () {
            click0.setAttribute(
              "position",
              "4.92 2.151 -2.8057443020314294"
            );
          }, 1600);
        }, 1900 + 60 * sentence.length + 200);
      } else if (k == 1) {
        var textBox1 = document.querySelector("#option" + k);
        var click1 = document.getElementById(k + 1);
        var optiontext1 = quizData.questionData[questionId].Options[k].option;
        setTimeout(function () {
          textBox1.setAttribute("visible","true");
          textBox1.setAttribute("text", "value:" +optiontext1);
          textBox1.emit("getOption1");
          setTimeout(function () {
            click1.setAttribute("position", "4.92 2.151 2.157");
          }, 1600);
          setTimeout(function () {
            var submit = document.querySelector("#submit");
            submit.setAttribute("position", "4.919 -1.27 -0.667");
            var submitDisabled = document.querySelector("#submitDisabled");
            submitDisabled.setAttribute("visible", "false");
            var next = document.querySelector("#next");
            next.setAttribute("position", "20 -0.50 1.104");
          }, 3000);
        }, 1900 + 60 * sentence.length + 400);
      } else if (k == 2) {
        var textBox2 = document.querySelector("#option" + k);
        var click2 = document.getElementById(k + 1);
        var optiontext2 = quizData.questionData[questionId].Options[k].option;
        var optionchar2 = "";
        setTimeout(function () {
          textBox2.setAttribute("visible","true");
          textBox2.setAttribute("text", "value:" +optiontext2);
          textBox2.emit("getOption2");
          setTimeout(function () {
            click2.setAttribute("position", "4.92 0.9502846371231314 -2.8");
          }, 1600);
        }, 1900 + 60 * sentence.length + 600);
      } else if (k == 3) {
        var textBox3 = document.querySelector("#option" + k);
        var click3 = document.getElementById(k + 1);
        var optiontext3 = quizData.questionData[questionId].Options[k].option;
        setTimeout(function () {
          textBox3.setAttribute("visible","true");
          textBox3.setAttribute("text", "value:" +optiontext3);
          textBox3.emit("getOption3");
          setTimeout(function () {
            click3.setAttribute("position", "4.92 0.95 2.156");
          }, 1600);
        }, 1900 + 60 * sentence.length + 800);
      }
    }

    questionJsonArray = {};
    questionSelectData = {
      Question: "",
      Options: [
        {
          option: "",
          attempted: "false",
        },
        {
          option: "",
          attempted: "false",
        },
        {
          option: "",
          attempted: "false",
        },
        {
          option: "",
          attempted: "false",
        },
      ],
    };
    questionJsonArray = questionSelectData;
    questionJsonArray.Question = quizData.questionData[questionId].Question;
    for (let k = 0; k < quizData.questionData[questionId].Options.length; k++) {
      questionJsonArray.Options[k].option =
        quizData.questionData[questionId].Options[k].option;
      questionJsonArray.Options[k].attempted = false;
    }
  } else {
    //Data binding for Scorescreen
    var questionText = document.getElementById("flex1");
    questionText.setAttribute("visible", false);
    var questionText = document.getElementById("flex2");
    questionText.setAttribute("visible", true);
    var toatalScore = correctAnswer * quizData.Points;

    if (quizData.Passing_Percentage) {
      if (quizData.Passing_Percentage >= 0) {
        var subheading = document.getElementById("subheading");
        var percentage = (correctAnswer / quizData.questionData.length) * 100;
        if (quizData.Passing_Percentage <= percentage) {
          subheading.setAttribute(
            "value",
            quizData.Success_Message + " " + percentage + "%."
          );
          subheading.setAttribute("visible", true);
        } else {
          subheading.setAttribute(
            "value",
            quizData.Failuer_Message + " " + percentage + "%."
          );
          subheading.setAttribute("visible", true);
        }
      }
    }

    var questionText = document.getElementById("mainScreen");
    questionText.setAttribute("visible", false);
    var entity1 = document.getElementById("1");
    entity1.setAttribute("position", "4.92 7.888 1.23");
    var entity2 = document.getElementById("2");
    entity2.setAttribute("position", "4.92 7.888 1.23");
    var entity3 = document.getElementById("3");
    entity3.setAttribute("position", "4.92 7.888 1.23");
    var entity4 = document.getElementById("4");
    entity4.setAttribute("position", "4.92 7.888 1.23");
    var endUserMsg = document.getElementById("endUserMsg");
    endUserMsg.setAttribute("value", quizData.End_Message);
    endUserMsg.setAttribute("visible", true);
    var heading = document.getElementById("heading");
    heading.setAttribute("value", quizData.Heading_Message);
    heading.setAttribute("visible", true);
    totalMarks = quizData.questionData.length * quizData.Points;

    //Screen with Score

    if (quizData.Show_score_at_end == "Yes") {
      var point = document.getElementById("total5");
      point.setAttribute("value", toatalScore);
      point.setAttribute("visible", true);
      var total = document.getElementById("total3");
      total.setAttribute("value", quizData.questionData.length);
      total.setAttribute("visible", true);
      var correct = document.getElementById("total2");
      correct.setAttribute("value", correctAnswer);
      correct.setAttribute("visible", true);
      var pointScreen = document.getElementById("pointScreen");
      pointScreen.setAttribute("visible", true);
      var slash = document.getElementById("slash");
      slash.setAttribute("visible", true);
      defaultImage();
      removeVideo();
      defaultAudio();

      for (
        var j = 0;
        j < quizData.questionData[questionId - 1].Options.length;
        j++
      ) {
        var option1 = document.getElementById("option" + j);
        option1.setAttribute("value", "");
      }
    } else {
      var thankyou = document.getElementById("endUserMsg");
      thankyou.setAttribute("visible", true);
      var subheading = document.getElementById("subheading");
      subheading.setAttribute("visible", false);
    }
    endExp = true;
    //updateExperienceResult(9, toatalScore, totalMarks, Result);
  }
}

AFRAME.registerComponent("option-click", {
  schema: {
    default: "",
  },
  init() {
    //selected option validations with correct answer
    this.el.addEventListener("click", () => {
      if (experienceStarted == true) {
        var sky = document.querySelector(
          "#option" + (parseInt(this.el.id) - 1)
        );
        var optionVal = sky.id;
        var res = optionVal.split("option");

        if (questionJsonArray.Options[res[1]].attempted == false) {
          var textview6 = document.getElementById("option" + res[1]);
          textview6.setAttribute(
            "text",
            "anchor:center;width:4;tabSize:1;height:5;color:#ffff00;wrapCount:0;wrapPixels:900;whiteSpace:pre;lineHeight:60"
          );
          questionJsonArray.Options[res[1]].attempted = true;
        } else {
          var textview6 = document.getElementById("option" + res[1]);
          textview6.setAttribute(
            "text",
            "anchor:center;width:4;tabSize:1;height:5;color:#fff;wrapCount:0;wrapPixels:900;whiteSpace:pre;lineHeight:60"
          );
          questionJsonArray.Options[res[1]].attempted = false;
        }
      }
    });
  },
});

//Courser Reset
AFRAME.registerComponent("sky", {
  schema: {
    default: "",
  },
  init() {
    this.el.addEventListener("mouseleave", () => {
      var cur = document.querySelector("#cursor");
      cur.emit("startAnimantion");
    });
  },
});

//Submit
AFRAME.registerComponent("submit", {
  schema: {
    default: "",
  },
  init() {
    var count = 1;
    //selected option validations with correct answer
    this.el.addEventListener("click", () => {
      if (experienceStarted == true) {
        if (this.el.id == "submit") {
          var resultFlag = 0;
          var resultCount = 0;
          for (var z = 1; z <= 4; z++) {
            var click0 = document.getElementById(z);
            click0.setAttribute("position", "0 20 0 ");
          }
          for (n = 0; n < questionJsonArray.Options.length; n++) {
            if (questionJsonArray.Options[n].attempted == true) {
              questionReportArray.push(n);
            }
          }

          if (quizData.Show_right_answer == "Yes") {
            for (l = 0; l < 4; l++) {
              var opt = document.querySelector("#option" + l);
              opt.setAttribute(
                "text",
                "anchor:center;width:4;tabSize:1;height:5;color:#fff;wrapCount:0;wrapPixels:900;whiteSpace:pre;lineHeight:60;baseline:top"
              );
            }
          }

          if (
            questionReportArray.length ==
            quizData.questionData[questionId].Answer.length
          ) {
            for (
              var j = 0;
              j < quizData.questionData[questionId].Answer.length;
              j++
            ) {
              if (
                questionReportArray[j] ==
                quizData.questionData[questionId].Answer[j] - 1
              ) {
                resultCount++;
              } else {
                if (quizData.Show_right_answer == "Yes") {
                  var key1 = document.querySelector(
                    "#option" + questionReportArray[j]
                  );
                  key1.setAttribute(
                    "text",
                    "anchor:center;width:4;tabSize:1;height:5;color:#ff0000;wrapCount:0;wrapPixels:900;whiteSpace:pre;lineHeight:60;baseline:top"
                  );
                }
              }
            }
          } else {
            if (quizData.Show_right_answer == "Yes") {
              for (var j = 0; j < questionReportArray.length; j++) {
                var key1 = document.querySelector(
                  "#option" + questionReportArray[j]
                );
                key1.setAttribute(
                  "text",
                  "anchor:center;width:4;tabSize:1;height:5;color:#ff0000;wrapCount:0;wrapPixels:900;whiteSpace:pre;lineHeight:60;baseline:top"
                );
              }
            }
          }

          if (resultCount == quizData.questionData[questionId].Answer.length) {
            correctAnswer = correctAnswer + 1;

            resultFlag = 1;
            var Option = "";
            var answerKey = "";
            for (
              var j = 0;
              j < quizData.questionData[questionId].Answer.length;
              j++
            ) {
              var value = quizData.questionData[questionId].Answer[j] - 1;
              answerKey =
                answerKey +
                quizData.questionData[questionId].Options[value].option +
                ",";
            }
            var selectedOption = "";
            answerKey = answerKey.replace(/,\s*$/, "");
            for (var j = 0; j < questionReportArray.length; j++) {
              selectedOption = questionReportArray[j];
              Option =
                Option +
                quizData.questionData[questionId].Options[selectedOption]
                  .option +
                ",";
            }
          } else {
            var Option = "";
            var answerKey = "";
            for (
              var j = 0;
              j < quizData.questionData[questionId].Answer.length;
              j++
            ) {
              var value = quizData.questionData[questionId].Answer[j] - 1;
              answerKey =
                answerKey +
                quizData.questionData[questionId].Options[value].option +
                ",";
            }
            answerKey = answerKey.replace(/,\s*$/, "");
            var selectedOption = "";
            for (var j = 0; j < questionReportArray.length; j++) {
              selectedOption = questionReportArray[j];
              Option =
                Option +
                quizData.questionData[questionId].Options[selectedOption]
                  .option +
                ",";
            }
            Option = Option.replace(/,\s*$/, "");
          }
          var submitDisabled = document.querySelector("#submitDisabled");
          submitDisabled.setAttribute("visible", "true");
          var submit = document.querySelector("#submit");
          submit.setAttribute("position", "20 -0.50 -0.667");
          setTimeout(function () {
            var nextDisabled = document.querySelector("#nextDisabled");
            nextDisabled.setAttribute("visible", "false");
            var next = document.querySelector("#next");
            next.setAttribute("position", "4.919 -1.27 1.104");
          }, 1000);

          if (quizData.Show_right_answer == "Yes") {
            for (
              m = 0;
              m < quizData.questionData[questionId].Answer.length;
              m++
            ) {
              var key = quizData.questionData[questionId].Answer[m] - 1;
              var key1 = document.querySelector("#option" + key);
              key1.setAttribute(
                "text",
                "anchor:center;width:4;tabSize:1;height:5;color:#00ff00;wrapCount:0;wrapPixels:900;whiteSpace:pre;lineHeight:60;baseline:top"
              );
            }

            var feedback = document.querySelector("#feedback");
            if (resultFlag == 1) {
              feedback.setAttribute("visible", "true");
              feedback.setAttribute(
                "value",
                quizData.questionData[questionId].Reenforcement_feedback
              );
            } else {
              feedback.setAttribute("visible", "true");
              feedback.setAttribute(
                "value",
                quizData.questionData[questionId].Corrective_feedback
              );
            }
          }
        } else if (this.el.id == "next") {
          var submit = document.querySelector("#submit");
          submit.setAttribute(
            "position",
            "20 -0.4911325336898621 4.569645828671785"
          );
          var next = document.querySelector("#next");
          next.setAttribute(
            "position",
            "20 -0.4911325336898621 4.569645828671785"
          );
          var feedback = document.querySelector("#feedback");
          feedback.setAttribute("visible", "false");
          var nextDisabled = document.querySelector("#nextDisabled");
          nextDisabled.setAttribute("visible", "true");
          var submitDisabled = document.querySelector("#submitDisabled");
          submitDisabled.setAttribute("visible", "true");
          timeout();
          questionReportArray = [];

          changeImages(count);
          playNextMusic(count);
          var v1 = document.getElementById("video1");
          var v2 = document.getElementById("video2");
          v1.setAttribute('muted', 'true');
          v2.setAttribute('muted', 'true');
          playNextWestVideo(count);
          playNextEastVideo(count);
          count++;
        }
      }
    });
  },
});

function changeImages(count) {

  eastImage = document.getElementById("eastImage")
  var imagePath = "assets/images/default.jpg"
  if (quizData.questionData[questionId].branding_east_wall.Image == "" || quizData.questionData[questionId].branding_east_wall.Image == imagePath) {
      setWallImages(eastImage, quizData.branding_east_wall.image);
  }
  else {
      setWallImages(eastImage,  quizData.questionData[questionId].branding_east_wall.Image);
 

  }

  westImage = document.getElementById('westImage');
  if (quizData.questionData[questionId].branding_west_wall.Image == "" || quizData.questionData[questionId].branding_west_wall.Image == imagePath) {
      setWallImages(westImage, quizData.branding_west_wall.image);
  }
  else {
      setWallImages(westImage, quizData.questionData[questionId].branding_west_wall.Image);
  }


}


function playNextMusic(count) {
  if (
    quizData.questionData[questionId].Background_audio == "" ||
    quizData.questionData[questionId].Background_audio == undefined
  ) {
    aaudio.setAttribute("src", "");
   defaultMusic.volume=1;
  } else {
    aaudio.setAttribute("src", "");
    aaudio.setAttribute(
      "src",
      quizData.questionData[questionId].Background_audio
    );
    aaudio.loop = false;
    defaultMusic.volume=0.1;
  }
  // aaudio.setAttribute('position', '2 -0.282 0 ');
  aaudio.addEventListener("loadeddata", () => {
    aaudio.play();
    defaultMusic.play();
    videoTag1.pause();
    videoTag2.pause();
    defaultMusic.volume=0.1;
    aaudio.addEventListener('ended', function () {
      //increase default volume
        defaultMusic.volume=1;
    });
    defaultMusic.addEventListener('ended', function () {
      //increase default volume
      if (quizData.Background_audio_loop == "Indefinite") {
      defaultMusic.volume=1;
      }else{
        defaultMusic.setAttribute("src","")
      }
      });
  });
}

function playNextWestVideo(count) {
  var cv1 = document.getElementById("video1");
  var videoPlane1 = document.getElementById("customeVideoPlane1");

  if (
    quizData.questionData[questionId].Background_video1 == "" ||
    quizData.questionData[questionId].Background_video1 == undefined
  ) {
    cv1.setAttribute("visible", "false");
    cv1.setAttribute("muted", "true");
    videoTag1.setAttribute("src", "");
    //videoPlane1.removeAttribute('camera-pan-follow');
    cv1.setAttribute("position", "2000 2000 2000");
    videoPlane1.setAttribute("position", "2000 2000 2000");
    videoPlane1.setAttribute("visible", "false");
  } else {
    cv1.setAttribute("visible", "true");
    cv1.setAttribute("muted", "false");
    videoTag1.setAttribute("src", "");
    videoTag1.setAttribute(
      "src",
      quizData.questionData[questionId].Background_video1,
      "loop:false"
    );
    cv1.setAttribute("position", "-0.850 1.9361 5.96129");
    videoPlane1.setAttribute("position", "-1.20989 1.9361 5.96129");
    videoTag1.pause();
  }
}

function playNextEastVideo(count) {
  var cv2 = document.getElementById("video2");
  var videoPlane2 = document.getElementById("customeVideoPlane2");
  if (
    quizData.questionData[questionId].Background_video2 == "" ||
    quizData.questionData[questionId].Background_video2 == undefined
  ) {
    cv2.setAttribute("visible", "false");
    cv2.setAttribute("muted", "true");
    videoTag2.setAttribute("src", "");
    //videoPlane2.removeAttribute('camera-pan-follow-1');
    cv2.setAttribute("position", "2000 2000 2000");
    videoPlane2.setAttribute("position", "2000 2000 2000");
    videoPlane2.setAttribute("visible", "false");
    //aaudio.components.sound.playSound();
  } else {
    cv2.setAttribute("visible", "true");
    cv2.setAttribute("muted", "false");
    videoTag2.setAttribute("src", "");
    videoTag2.setAttribute(
      "src",
      quizData.questionData[questionId].Background_video2,
      "loop:false"
    );
    cv2.setAttribute("position", "-0.850 1.9361 -5.96129");
    videoPlane2.setAttribute("position", "-1.20989 1.9361 -5.96129");
    videoTag2.load();
    videoTag2.pause();
  }
}

AFRAME.registerComponent("mouseclick", {
  init: function () {
    var Wallpaper = "";
    this.el.addEventListener("mouseenter", function () {
      if (experienceStarted == true) {
        if (this.getAttribute("id") == "eastImage") {
          Wallpaper = "East Wallpaper";
        } else if (this.getAttribute("id") == "westImage") {
          Wallpaper = "West Wallpaper";
        } else if (this.getAttribute("id") == "southLogo") {
          Wallpaper = "South logo 1";
        } else if (this.getAttribute("id") == "south_image2") {
          Wallpaper = "South logo 2";
        }
        focusTime = 0;
      }
    });
  },
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
};
var timer = setInterval(startexp, 500);
var assetsLoaded = false;
var loggedin = false;
$(window).on("load", function () {
  setTimeout(function () {
    assetsLoaded = true;
  }, 10000);
});
// Function for set default audio at score screen
function defaultAudio() {
  if (quizData.Background_audio != "") {
    aaudio.pause();
    defaultMusic.volume=1;
  } else if (quizData.Background_audio == "") {
    aaudio.setAttribute("src", "");
    defaultMusic.setAttribute("src", "");
  }
}
// Function for set Default images at score screen
function defaultImage() {
  if (quizData.branding_west_wall.image != "") {
    setWallImages(westImage,quizData.branding_west_wall.image);
  }
  if (quizData.branding_east_wall.image != "") {
    setWallImages(eastImage,quizData.branding_east_wall.image);
  }
}
// Function for remove video panel at Score screen.
function removeVideo() {
  var cv1 = document.getElementById("video1");
  var videoPlane1 = document.getElementById("customeVideoPlane1");
  cv1.setAttribute("visible", "false");
  cv1.setAttribute("muted", "true");
  videoTag1.setAttribute("src", "");
  //videoPlane1.removeAttribute('camera-pan-follow');
  cv1.setAttribute("position", "2000 2000 2000");
  videoPlane1.setAttribute("position", "2000 2000 2000");
  videoPlane1.setAttribute("visible", "false");

  var cv2 = document.getElementById("video2");
  var videoPlane2 = document.getElementById("customeVideoPlane2");
  cv2.setAttribute("visible", "false");
  cv2.setAttribute("muted", "true");
  videoTag2.setAttribute("src", "");
  //videoPlane2.removeAttribute('camera-pan-follow-1');
  cv2.setAttribute("position", "2000 2000 2000");
  videoPlane2.setAttribute("position", "2000 2000 2000");
  videoPlane2.setAttribute("visible", "false");
}
// Functions for set Video end thumbnail.
function eastVideoEnd() {
  videoTag2.play();
  videoTag2.pause();
  videoTag2.currentTime = 3;
}
function westVideoEnd() {
  videoTag1.play();
  videoTag1.pause();
  videoTag1.currentTime = 3;
}

function setWallImages(el,image){
  var img = new Image();
  
img.onload = function() {
  var size;
 
  size=this.height/this.width;
  if((215*size)<161){
    //alert(size);
    el.setAttribute("geometry","height",(215*size));
  }else{
    el.setAttribute("geometry","height",161);
}
  el.setAttribute( "material", "src:" + image);
  el.setAttribute("crossorigin", "anonymous");
}
img.src = image;
}

