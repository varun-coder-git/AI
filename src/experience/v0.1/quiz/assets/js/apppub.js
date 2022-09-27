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
var quizData;
var cam;
var isMobile=false;
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

function cleanQuestionJSONArray() {
  questionJsonArray = {};
}


$(document).ready(() => {
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

  var startExperienteBtn = document.getElementById('start_experience');
  ascene = document.querySelector('a-scene');
  cam = document.querySelector("#cameraId");
  startExperienteBtn.onclick = function () {

    //cam.emit('skayroation');
    cam.setAttribute("animation", "enabled:false");
    cam.setAttribute("animation__one", "enabled:true");

    experienceStarted = true;
    ascene.style.zIndex = 'auto';
    var aaudio = '';
    var scene = document.querySelector('a-scene');
    aaudio = document.createElement('a-entity');
    aaudio.setAttribute('id', "audioEntity");
    aaudio.setAttribute('sound', "src: " + quizData.Background_audio + ";loop:true");
    aaudio.setAttribute('position', '2 -0.282 0 ');
    scene.appendChild(aaudio);
    audioEntity.addEventListener('sound-loaded', () => {
      audioEntity.components.sound.playSound();
    });
    ascene.style.zIndex = 'auto';
    document.getElementById('container').style.display = "none";
    document.getElementById('loaderq').style.display = "none";
    experienceStarted = true;
    // countdown();
    if (mode == 'EXP') {
      document.querySelector('a-scene').enterVR();
    }
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
// Json file binding and splash screen  
function loadExperience(experienceToCustomize, ExperienceName) {
  quizData = experienceToCustomize;



  var background_theme = document.getElementById('cuberoom');
  background_theme.setAttribute('material', "metalness:0.6;src:" + quizData.Background_theme);
  background_theme.setAttribute('crossorigin', "anonymous");

  //if json includes splashbgcolor and opacity
  if (quizData.splashBackgroundColor && quizData.Opacity) {
    var rgbformat = hexToRgb(quizData.splashBackgroundColor, quizData.Opacity);
    document.getElementById('innerInfo').style.backgroundColor = "rgba(" + rgbformat.r + "," + rgbformat.g + "," + rgbformat.b + "," + rgbformat.alpha + ")";
  }
  //if json includes splashheadercolor
  if (quizData.splashHeaderColor) {
    document.getElementById('titleText').style.color = quizData.splashHeaderColor;
  }
  document.getElementById('titleText').innerHTML = ExperienceName;
  if (isMobile && quizData.splash_android_instruction!=undefined) {
		document.getElementById('instruction').innerHTML = quizData.splash_android_instruction;
	  } else {
		document.getElementById('instruction').innerHTML = quizData.splash_instruction;
	 }
  // document.getElementById('instruction').innerHTML = quizData.splash_instruction;
  document.getElementById('titleDescription').innerHTML = quizData.launch_text;
  document.getElementById('splashLogo').src = quizData.splash_image;
  loggedin = true;
  // var audio1 = document.getElementById('audioAsset');
  // audio1.setAttribute("src", quizData.Background_audio);
  setQuiz();
  if (quizData.questionData.length <= 0) {
    var textview = document.getElementById('submitDisabled');
    textview.setAttribute("position", "200 200 2000");
    var textview = document.getElementById('nextDisabled');
    textview.setAttribute("position", "200 200 2000");
  }
  if (window.matchMedia("(orientation: portrait)").matches) {
    if (experienceToCustomize["entry_view"]) {
      var entryView_y = experienceToCustomize["entry_view"].split(" ")[1];
      $("#CamEntity").attr("rotation", "0 " + (parseInt(entryView_y)) + " 0");
    }
  }

  if (window.matchMedia("(orientation: landscape)").matches) {
    if (experienceToCustomize["entry_view"]) {
      $("#CamEntity").attr("rotation", experienceToCustomize["entry_view"]);
    }
  }

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
  }, 10000);
})

function setQuiz() {

  //Audio,Background and branding images binding

  var background_theme = document.getElementById('southLogo');
  background_theme.setAttribute('material', "opacity:1;src:" + quizData.branding_south_wall.Logo);
  background_theme.setAttribute('crossorigin', "anonymous");
  var south_image2 = document.getElementById('south_image2');
  south_image2.setAttribute('material', "src:" + quizData.branding_south_wall.image2);
  south_image2.setAttribute('crossorigin', "anonymous");
  var background_theme = document.getElementById('eastLogo');
  background_theme.setAttribute('material', "opacity:1;src:" + quizData.branding_east_wall.Logo);
  background_theme.setAttribute('crossorigin', "anonymous");

  var background_theme = document.getElementById('westLogo');
  background_theme.setAttribute('material', "opacity:1;src:" + quizData.branding_west_wall.Logo);
  background_theme.setAttribute('crossorigin', "anonymous");
  // var audio1 = document.getElementById('audio1');
  // audio1.setAttribute("sound", "src:");
  // audio1.setAttribute("sound", "src:  url(" + quizData.Background_audio + ");autoplay: true;loop:true;");



  //Print question and options on screen
  if (quizData.questionData.length > 0) {
    var textview = document.getElementById('questionText');
    textview.setAttribute("text", "value:" + quizData.questionData[questionId].Question);
    

    for (let k = 0; k < quizData.questionData[questionId].Options.length; k++) {


      if (k == 0) {
        var textBox0 = document.querySelector("#option" + k);
        var click0 = document.getElementById(k + 1);
        var optiontext0 = quizData.questionData[questionId].Options[k].option;
        var optionchar0 = '';
          textBox0.setAttribute("visible", "true");
          textBox0.setAttribute("text", "value:" + optiontext0);
          textBox0.emit("getOption0");
          setTimeout(function () {
            click0.setAttribute('position', '4.92 2.151 -2.8057443020314294');
          }, 1600);
      } else if (k == 1) {

        var textBox1 = document.querySelector("#option" + k);
        var click1 = document.getElementById(k + 1);
        var optiontext1 = quizData.questionData[questionId].Options[k].option;
        var optionchar1 = '';
          textBox1.setAttribute("visible", "true");
          textBox1.setAttribute("text", "value:" + optiontext1);
          textBox1.emit("getOption1");
          setTimeout(function () {
            click1.setAttribute('position', '4.92 2.151 2.157');
          }, 1600);
          setTimeout(function () {
            var submit = document.querySelector('#submit');
            submit.setAttribute('position', '4.919 -1.27 -0.667');
            var submitDisabled = document.querySelector('#submitDisabled');
            submitDisabled.setAttribute('visible', 'false');
          }, 3000);
      } else if (k == 2) {

        var textBox2 = document.querySelector("#option" + k);
        var click2 = document.getElementById(k + 1);
        var optiontext2 = quizData.questionData[questionId].Options[k].option;
        var optionchar2 = '';
          textBox2.setAttribute("visible", "true");
          textBox2.setAttribute("text", "value:" + optiontext2);
          textBox2.emit("getOption2");
          setTimeout(function () {
            click2.setAttribute('position', '4.92 0.9502846371231314 -2.8');
          }, 1600);
      } else if (k == 3) {

        var textBox3 = document.querySelector("#option" + k);
        var click3 = document.getElementById(k + 1);
        var optiontext3 = quizData.questionData[questionId].Options[k].option;
        var optionchar3 = '';
          textBox3.setAttribute("visible", "true");
          textBox3.setAttribute("text", "value:" + optiontext3);
          textBox3.emit("getOption3");
          setTimeout(function () {
            click3.setAttribute('position', '4.92 0.95 2.156');
          }, 1600);

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
    questionJsonArray.Question = quizData.questionData[questionId].Question;
    for (let k = 0; k < quizData.questionData[questionId].Options.length; k++) {
      questionJsonArray.Options[k].option = quizData.questionData[questionId].Options[k].option;
      questionJsonArray.Options[k].attempted = false;
    }


  }
}

//Question binding after answering first question.
function timeout() {
  for (let i = 0; i <= 3; i++) {
    textview = document.getElementById('option' + i);
    textview.setAttribute('text', 'anchor:center;tabSize:1;height:5;color:#fff');
    textview.setAttribute('text', 'value:');
  }
  var textview = document.getElementById('questionText');
  textview.setAttribute("text", "value:");
  questionId = questionId + 1;
  if (quizData.questionData.length > questionId) {

    var sentence = quizData.questionData[questionId].Question;
    var car = '';
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
        var optionchar0 = '';
        setTimeout(function () {
          textBox0.setAttribute("visible","true");
          textBox0.setAttribute("text", "value:" + optiontext0);
          textBox0.emit("getOption0");
          setTimeout(function () {
            click0.setAttribute('position', '4.92 2.151 -2.8057443020314294');
          }, 1600);
        }, 1900 + 60 * sentence.length + 200);
      } else if (k == 1) {
        var textBox1 = document.querySelector("#option" + k);
        var click1 = document.getElementById(k + 1);
        var optiontext1 = quizData.questionData[questionId].Options[k].option;
        var optionchar1 = '';
        setTimeout(function () {
          textBox1.setAttribute("visible","true");
          textBox1.setAttribute("text", "value:" + optiontext1);
          textBox1.emit("getOption1");
          setTimeout(function () {
            click1.setAttribute('position', '4.92 2.151 2.157');
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
        var optiontext2 = quizData.questionData[questionId].Options[k].option;
        var optionchar2 = '';
        setTimeout(function () {
          textBox2.setAttribute("visible","true");
          textBox2.setAttribute("text", "value:" + optiontext2);
          textBox2.emit("getOption2");
          setTimeout(function () {
            click2.setAttribute('position', '4.92 0.9502846371231314 -2.8');
          }, 1600);
        }, 1900 + 60 * sentence.length + 600);
      } else if (k == 3) {
        var textBox3 = document.querySelector("#option" + k);
        var click3 = document.getElementById(k + 1);
        var optiontext3 = quizData.questionData[questionId].Options[k].option;
        var optionchar3 = '';
        setTimeout(function () {
          textBox3.setAttribute("visible","true");
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
    questionJsonArray.Question = quizData.questionData[questionId].Question;
    for (let k = 0; k < quizData.questionData[questionId].Options.length; k++) {
      questionJsonArray.Options[k].option = quizData.questionData[questionId].Options[k].option;
      questionJsonArray.Options[k].attempted = false;
    }

  } else {
    //Data binding for Scorescreen
    var questionText = document.getElementById('flex1');
    questionText.setAttribute('visible', false);
    var questionText = document.getElementById('flex2');
    questionText.setAttribute('visible', true);
    var toatalScore = correctAnswer * quizData.Points;
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
    endUserMsg.setAttribute('value', quizData.End_Message);
    endUserMsg.setAttribute('visible', true);
    var heading = document.getElementById('heading');
    heading.setAttribute('value', quizData.Heading_Message);
    heading.setAttribute('visible', true);
    totalMarks = quizData.questionData.length * quizData.Points;
    // var subheading = document.getElementById('subheading');
    // subheading.setAttribute('value', quizData.Success_Message);
    // subheading.setAttribute('visible', true);
    //Screen with Score
    if (quizData.Show_score_at_end == "Yes") {
      var point = document.getElementById('total5');
      point.setAttribute('value', toatalScore);
      point.setAttribute('visible', true);

      if (quizData.Passing_Percentage) {
        if (quizData.Passing_Percentage >= 0) {
          var subheading = document.getElementById('subheading');
          var percentage = (correctAnswer / quizData.questionData.length) * 100;
          if (quizData.Passing_Percentage <= percentage) {
            subheading.setAttribute('value', quizData.Success_Message + " " + percentage + "%.");
            subheading.setAttribute('visible', true);
            Result = "Pass";
          } else {
            subheading.setAttribute('value', quizData.Failuer_Message + " " + percentage + "%.");
            subheading.setAttribute('visible', true);
            Result = "Fail";
          }
        } else {
          Result = "N/A";

        }
      }
      var total = document.getElementById('total3');
      total.setAttribute('value', quizData.questionData.length);
      total.setAttribute('visible', true);
      var correct = document.getElementById('total2');
      correct.setAttribute('value', correctAnswer);
      correct.setAttribute('visible', true);
      var pointScreen = document.getElementById('pointScreen');
      pointScreen.setAttribute('visible', true);
      var slash = document.getElementById('slash');
      slash.setAttribute('visible', true);

      for (var j = 0; j < quizData.questionData[questionId - 1].Options.length; j++) {
        var option1 = document.getElementById('option' + j);
        option1.setAttribute('value', '');
      }
    } else {
      var thankyou = document.getElementById('endUserMsg');
      thankyou.setAttribute('visible', true);
    }
    if (startTracking) {
      params.Verb = "Answered";
      params.Object = correctAnswer + " Correct Answer Out of " + quizData.questionData.length;
      params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
      callToTacking.callToApi(params);
    }
    if (xapiEnable) {
      sendToXapi("Answered", "answered", correctAnswer + " Correct Answer Out of " + quizData.questionData.length, ExperienceName.replace(/\s/g, '') + Date.now());
    }
    setTimeout(function () {
      if (startTracking) {
        params.Verb = "Total Score Points";
        params.Object = '"' + toatalScore + '"';
        params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
        callToTacking.callToApi(params);
      }
      if (xapiEnable) {
        sendToXapi("Scored", "scored", toatalScore + " points", ExperienceName.replace(/\s/g, '') + Date.now());
      }
    }, 1000);
    endExp = true;
    updateExperienceResult(9, toatalScore, totalMarks, Result);
  }
}


AFRAME.registerComponent('option-click', {
  schema: {
    default: ''
  },
  init() {
    //selected option validations with correct answer
    this.el.addEventListener('click', () => {

      if (experienceStarted == true) {

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

          if (quizData.Show_right_answer == "Yes") {
            for (l = 0; l < 4; l++) {
              var opt = document.querySelector("#option" + l);
              opt.setAttribute('text', 'anchor:center;width:4;tabSize:1;height:5;color:#fff;wrapCount:0;wrapPixels:900;whiteSpace:pre;lineHeight:60;baseline:top');
            }
          }

          if (questionReportArray.length == quizData.questionData[questionId].Answer.length) {
            for (var j = 0; j < quizData.questionData[questionId].Answer.length; j++) {
              if (questionReportArray[j] == (quizData.questionData[questionId].Answer[j] - 1)) {
                resultCount++;
              } else {
                if (quizData.Show_right_answer == "Yes") {
                  var key1 = document.querySelector("#option" + questionReportArray[j]);
                  key1.setAttribute('text', 'anchor:center;width:4;tabSize:1;height:5;color:#ff0000;wrapCount:0;wrapPixels:900;whiteSpace:pre;lineHeight:60;baseline:top');
                }
              }
            }

          } else {
            if (quizData.Show_right_answer == "Yes") {
              for (var j = 0; j < questionReportArray.length; j++) {
                var key1 = document.querySelector("#option" + questionReportArray[j]);
                key1.setAttribute('text', 'anchor:center;width:4;tabSize:1;height:5;color:#ff0000;wrapCount:0;wrapPixels:900;whiteSpace:pre;lineHeight:60;baseline:top');
              }
            }
          }

          if (resultCount == quizData.questionData[questionId].Answer.length) {
            correctAnswer = correctAnswer + 1;

            resultFlag = 1;
            var Option = "";
            var answerKey = "";
            for (var j = 0; j < quizData.questionData[questionId].Answer.length; j++) {
              var value = (quizData.questionData[questionId].Answer[j]) - 1;
              answerKey = answerKey + quizData.questionData[questionId].Options[value].option + ",";
            }
            var selectedOption = "";
            answerKey = answerKey.replace(/,\s*$/, "");
            for (var j = 0; j < questionReportArray.length; j++) {
              selectedOption = questionReportArray[j];
              Option = Option + quizData.questionData[questionId].Options[selectedOption].option + ",";
            }
            Option = Option.replace(/,\s*$/, "");
            params.Verb = "answered";
            params.Object = "question '" + quizData.questionData[questionId].Question + "' with correct options'" + Option + "'";
            params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
            callToTacking.callToApi(params);
            if (xapiEnable) {
              var date = new Date();
              var timestamp = date.getTime();
              sendQuestionAnswerToXapi("Answered", "answered", quizData.questionData[questionId].Question, timestamp + "", quizData.questionData[questionId].Options, "choice", "answerKey", Option, true);
            }

          } else {
            var Option = "";
            var answerKey = "";
            for (var j = 0; j < quizData.questionData[questionId].Answer.length; j++) {
              var value = (quizData.questionData[questionId].Answer[j]) - 1;
              answerKey = answerKey + quizData.questionData[questionId].Options[value].option + ",";
            }
            answerKey = answerKey.replace(/,\s*$/, "");
            var selectedOption = "";
            for (var j = 0; j < questionReportArray.length; j++) {
              selectedOption = questionReportArray[j];
              Option = Option + quizData.questionData[questionId].Options[selectedOption].option + ",";
            }
            Option = Option.replace(/,\s*$/, "");
            params.Verb = "answered";
            params.Object = "question '" + quizData.questionData[questionId].Question + "' with wrong options'" + Option + "'";
            params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
            callToTacking.callToApi(params);
            if (xapiEnable) {
              var date = new Date();
              var timestamp = date.getTime();
              sendQuestionAnswerToXapi("Answered", "answered", quizData.questionData[questionId].Question, timestamp + "", quizData.questionData[questionId].Options, "choice", answerKey, Option, false);
            }

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

          if (quizData.Show_right_answer == "Yes") {
            for (m = 0; m < quizData.questionData[questionId].Answer.length; m++) {
              var key = (quizData.questionData[questionId].Answer[m]) - 1;
              var key1 = document.querySelector("#option" + key);
              key1.setAttribute('text', 'anchor:center;width:4;tabSize:1;height:5;color:#00ff00;wrapCount:0;wrapPixels:900;whiteSpace:pre;lineHeight:60;baseline:top');
            }
            var feedback = document.querySelector("#feedback");
            if (resultFlag == 1) {
              feedback.setAttribute('visible', 'true');
              feedback.setAttribute('value', quizData.questionData[questionId].Reenforcement_feedback);

            } else {
              feedback.setAttribute('visible', 'true');
              feedback.setAttribute('value', quizData.questionData[questionId].Corrective_feedback);

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

//Xapi and verbose     
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

AFRAME.registerComponent('mouseclick', {
  init: function () {

    var Wallpaper = "";
    this.el.addEventListener('mouseenter', function () {
      if (experienceStarted == true) {
        if (this.getAttribute('id') == "eastLogo") {
          Wallpaper = "East Wallpaper"
        } else if (this.getAttribute('id') == "westLogo") {
          Wallpaper = "West Wallpaper"
        } else if (this.getAttribute('id') == "southLogo") {
          Wallpaper = "South logo 1"
        } else if (this.getAttribute('id') == "south_image2") {
          Wallpaper = "South logo 2"
        }
        focusTime = 0;
        if (startTracking) {
          params.Verb = "started Viewing";
          params.Object = Wallpaper;
          params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
          callToTacking.callToApi(params);
          if (xapiEnable) {
            sendToXapi("Viewed", "viewed", params.Object, params.Object.replace(/\s/g, ''));
          }
        }
      }
    });


    this.el.addEventListener('mouseleave', function () {
      if (experienceStarted == true) {
        if (startTracking) {

          if (this.getAttribute('id') == "eastLogo") {
            Wallpaper = "East Wallpaper"
          } else if (this.getAttribute('id') == "westLogo") {
            Wallpaper = "West Wallpaper"
          } else if (this.getAttribute('id') == "southLogo") {
            Wallpaper = "South logo 1"
          } else if (this.getAttribute('id') == "south_image2") {
            Wallpaper = "South logo 2"
          }

          params.Verb = "completed Viewing";
          params.Object = Wallpaper;
          params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
          callToTacking.callToApi(params);

          params.Verb = "Viewed";
          params.Object = Wallpaper + " for " + focusTime + "sec";
          params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
          callToTacking.callToApi(params);

          if (xapiEnable) {
            sendToXapi("Viewed", "viewed", params.Object, params.Object.replace(/\s/g, ''));
          }

        }



      }
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
  // var qrcode = new QRCode("qrcode", {
  //     text: window.location.href,
  //     width: 90,
  //     height: 90,
  //     colorDark : "#000000",
  //     colorLight : "#ffffff",
  //     correctLevel : QRCode.CorrectLevel.H
  // });
  console.log("barcode");
  var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + window.location.href + '&amp;size=50x50';
  console.log("barcode", url);
  document.getElementById("qrcode").src = url;
  // qrcode.makeCode(window.location.href);
}
