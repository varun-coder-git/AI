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

var selectedValue;
var assettype;
var audiolbl;
var descriptionImage;
var imageType;
var questionDetails = [];
var editTopicId;
var topicCount = 0;
var topicSelected;
var y = 3.500;
var descriptionImagePath = '';
var StartQuizImagePath = '';
var StartVideoImagePath = '';
var topicImagePath = '';
var quizImagePath = '';
var mediaImagePath = '';
var scoreImagePath = '';
var selectedType = "text";
var knowledgeZoneData = {
  seeVideo: "",
  Background_audio: "",
  Topic_Instruction: "",
  window_wall: {},
  Points: 10,
  Passing_Percentage: "",
  Show_right_answer: "",
  Show_score_at_end: "",
  End_Message: "",
  Heading_Message: "",
  Success: "",
  Failuer_Message: "",
  launch_text: "",
  questionData: [],
  topicData: [],
  Start_Quiz_Button_Image: "",
  Start_Video_Button_Image: "",
  Topic_Wall_Heading_Logo: "",
  Quiz_Wall_Heading_Logo: "",
  Score_Wall_Heading_Logo: "",
  Media_Wall_Heading_Logo: ""
};
var fixOpacity = 0.2;
var questionCount = 0;
var imagePath;
var assettype;
var wall;
var order;
var validOption = false;
var selections = false;
var loadedAscene = false;
var loadedAassets = false;
var deleteQueId;
var deleteTopicId;
var splashImagePath;
var elementToUpdate;
var videoPath = "";
var defaultquizTopicsPanel;
var quizTopicsPanel;
var isClicked = false;
var checkSaveQuestion = false;
var newtopic = true;
var isEdit=false;
// var checkAssetsLoaded = setInterval(function () {
//   if (loadedAscene && loadedAassets) {
//     $("#loaderq").hide();
//     document.getElementById("loaderoverlay").style.display = "none";
//     clearInterval(checkAssetsLoaded);
//   }
// }, 5000);


function initializeCustomization(experienceToCustomize) {

  knowledgeZoneData = JSON.parse(experienceToCustomize);
  topicCount = knowledgeZoneData.topicData.length;
  generateTopicAccordion();
  setSettingsAccordion();

  if (knowledgeZoneData.launch_text) {
    document.getElementsByClassName("lunchScreenText").value = knowledgeZoneData.launch_text;
    $('.lunchScreenText').summernote('code', knowledgeZoneData.launch_text);

    var lauchText = $(".lunchScreenText");
    var div = document.createElement("div");
    div.innerHTML = lauchText[0].value;
    var plainText = div.textContent || div.innerText || "";
    var maxLength = 350;
    $('#maxCount').text(plainText.length);

  }
  if (knowledgeZoneData.splash_image) {
    splashImagePath = knowledgeZoneData.splash_image;
    var splashLbl = document.getElementById('splashImageLable');
    var path = returnAssetName(splashImagePath);
    splashLbl.children[0].innerText = path;

  }
  if (knowledgeZoneData.splash_instruction) {
    document.getElementsByClassName("instructionSetForDesktop").value = knowledgeZoneData.splash_instruction;
    $('.instructionSetForDesktop').summernote('code', knowledgeZoneData.splash_instruction);
  }
  if (knowledgeZoneData.splash_android_instruction) {
    document.getElementsByClassName("instructionSetForAndroid").value = knowledgeZoneData.splash_android_instruction;
    $('.instructionSetForAndroid').summernote('code', knowledgeZoneData.splash_android_instruction);
  }
  if (knowledgeZoneData.splashBackgroundColor) {
    var splashBackground = document.getElementById("splashBackground");
    splashBackground.value = knowledgeZoneData.splashBackgroundColor;
    splashBackground.style.backgroundColor = splashBackground.value;
  } else {
    var splashBackground = document.getElementById("splashBackground");
    splashBackground.style.backgroundColor = "#8F8F8F";
    splashBackground.value = "#8F8F8F";
  }
  if (knowledgeZoneData.Opacity) {
    var opacity = document.getElementById("fixOpacity")
    opacity.value = knowledgeZoneData.Opacity;
    var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  } else {
    var opacity = document.getElementById("fixOpacity")
    opacity.value = fixOpacity;
    var displayvalue = '(' + Math.round(fixOpacity * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  }
  if (knowledgeZoneData.splashHeaderColor) {
    var splashHeaderColor = document.getElementById('splashHeaderColor')
    splashHeaderColor.value = knowledgeZoneData.splashHeaderColor;
    splashHeaderColor.style.backgroundColor = splashHeaderColor.value;
  }
  if (knowledgeZoneData["entry_view"]) {
    $("#CamEntity").attr("rotation", knowledgeZoneData["entry_view"]);
  }
  if (knowledgeZoneData.Start_Video_Button_Image) {
    var startvideoimage = document.getElementById("proceed");
    var startvideoLbl = document.getElementById('StartVideoImageLabel');
    startvideoimage.setAttribute("material", "src:" + knowledgeZoneData.Start_Video_Button_Image);
    var startVideoImageName = returnAssetName(knowledgeZoneData.Start_Video_Button_Image);
    startvideoLbl.innerText = startVideoImageName;
  }

  var instructions = document.getElementById("topicsPanel");
  instructions.setAttribute('visible', true);
  instructions.setAttribute('text', 'value:' + knowledgeZoneData.Topic_Instruction);

  var background_theme = document.getElementById('cuberoom');
  background_theme.setAttribute('material', "metalness:0.6;src:" + knowledgeZoneData.Background_theme);
  background_theme.setAttribute('crossorigin', "anonymous");
  setQuiz();
}

function setEntryView() {
  if ($('#freezeView').hasClass('disabled')) {} else {
    var cam = document.querySelector("[camera]");
    var pos = cam.getAttribute("rotation");
    var posY = "0";
    if (knowledgeZoneData["entry_view"]) {
      posY = knowledgeZoneData["entry_view"].split(" ")[1];
    }
    knowledgeZoneData["entry_view"] = "0 " + (pos.y + parseInt(posY)) + " 0";
    $('#freezeView').addClass('disabled');
    $('#freezeView').click(toastr.success('Presto! This view is now the Launch View of this Experience.'));
  }
}

AFRAME.registerComponent('mousedrag', {
  init: function () {
    this.el.addEventListener('mouseup', function () {
      $('#freezeView').removeClass('disabled');
    });
  }
});

AFRAME.registerComponent('mouseclick', {
  init: function () {
    this.el.addEventListener('click', function () {
      toggleSideNav('questionSidenav');
      $("#messageDivCollapse").addClass("show");
      $("#messageDivCollapse").scrollTop(700);

      if (this.id == "proceed") {
        $("#StartQuizImageLabel").removeClass(
          "background-color-forestgreen"
        );
        $("#StartVideoImageLabel").addClass("background-color-forestgreen");
      } else if(this.id=="startQuiz") {
        $("#StartVideoImageLabel").removeClass(
          "background-color-forestgreen"
        );
        $("#StartQuizImageLabel").addClass("background-color-forestgreen");
      }
      $("#addTopicDivCollapse").removeClass("show");
      for (i = 0; i < knowledgeZoneData.topicData.length; i++) {

        $("#collapseTopic" + i).removeClass("show");

      }
    });
  }
});

$(document).ready(function () {
  
  //these two lines are added to resolve loader issue in angular 13. (original code commented: 87-93 and 238-244)  
  $("#loaderq").hide();
  document.getElementById("loaderoverlay").style.display = "none";

  audiolbl = document.getElementById('BackgroundAudioLabel');
  descriptionImage = document.getElementById('customFileImage');

  // document.querySelector('a-scene').addEventListener('loaded', function () {
  //   loadedAscene = true;
  // });

  // document.querySelector('a-assets').addEventListener('loaded', function () {
  //   loadedAassets = true;
  // });

  $(".guideme")
    .mouseenter(function () {
      var title = $(this).attr("title");
      var box = window.parent;
      var bx1 = $("#customizerIframe");
      $(".box-body").empty();
      $(".box-body").append(' <div class="row margin-LR-0" style="min-height:148px;max-height:148px;" *ngIf="serviceApi.helpFlag"><div class="col-lg-12" style="margin-top:auto;margin-bottom:auto;">' + title + '</div></div>');
    })
    .mouseleave(function () {
      $(".box-body").empty();
      $(".box-body").append('<div class="row margin-LR-0 ng-star-inserted" style="min-height:148px;max-height:148px;"><div class="col-lg-7" style="margin-top:auto; margin-bottom:auto;"> This guide is mouse pointer sensitive. Point at a page item to view its help. </div><div class="col-lg-5" style="margin-top:auto; margin-bottom:auto;"><img src="assets/images/catques.png" style="width:95px;position:relative;top:-5px;left:-10px;"></div></div>');
    });

  // Add minus icon for collapse element which is open by default
  $(".collapse.in").each(function () {
    $(this).siblings(".panel-heading").find(".glyphicon").addClass("glyphicon-minus").removeClass("glyphicon-plus");
  });

  // Toggle plus minus icon on show hide of collapse element
  $(".collapse").on('show.bs.collapse', function () {
    $(this).parent().find(".glyphicon").removeClass("glyphicon-plus").addClass("glyphicon-minus");
  }).on('hide.bs.collapse', function () {
    $(this).parent().find(".glyphicon").removeClass("glyphicon-minus").addClass("glyphicon-plus");
  });

  $("#wallSidebar").click(function () {
    $("#collapseOne").addClass('show');
  });

  $(".bgThemeDiv > img").click(function () {
    $(".bgThemeDiv > img").removeClass("selected-theme");
    $(this).addClass("selected-theme");
    var str = $(this).attr("src");
    var n = str.lastIndexOf("/");
    var imageName = str.slice(n + 1, str.length);
    knowledgeZoneData["Background_theme"] = "assets/images/decor/" + imageName;
    $("#cuberoom-texture").attr("src", "assets/images/decor/" + imageName);
    var cuberoom = document.querySelector('#cuberoom');
    cuberoom.setAttribute('material', 'src: ');
    cuberoom.setAttribute('material', 'src: #cuberoom-texture');
  });

  $("#overlay").click(function () {
    var sidenavIdQue = document.getElementById("questionSidenav");
    if (sidenavIdQue) {
      if (checkSaveQuestion == false) {
        if ($("#topicTitle").val().length > 0) {
          $("#questionSidenav").addClass("active");
          $("#overlay").addClass("overlay");
            if(isEdit==true){
              popSnackbar("warning", "Please save " +"topic " + (editTopicId+1) +" first.");
            }else{
              popSnackbar("warning", "Please save " +"topic " + (topicCount+1) +" first.");
            }
          } else {
          $(".sidenav").removeClass("active");
          $("#overlay").removeClass("overlay");
        }
      } else {
        $(".sidenav").removeClass("active");
        $("#overlay").removeClass("overlay");
      }
    } else {
      $(".sidenav").removeClass("active");
      $("#overlay").removeClass("overlay");
    }
  });

  $("#answerSelect").on('change', function () {
    if (this.value == 0) {
      validOption = false;
      $("#validOption").removeClass("hidden");
      return;
    } else {
      var selectAnswer = $("#option" + this.value).val();
      if (selectAnswer == "") {
        $("#validOption").removeClass("hidden");
        $("#answerSelect").val("0");
        validOption = false;
      } else {
        $("#validOption").addClass("hidden");
        validOption = true;
      }
    }
  });
  $("#answerMultiSelect").change(function () {
    selections = false;

    $("#answerMultiSelect option:selected").each(function () {
      selections = true;
      selectedValue = $(this).val();
    });
    if (selections == true) {
      validOption = true;
      var option = $("#option" + selectedValue).val();
      if (option == "" || option == null || option == undefined) {
        selections = false;
        validOption = false;
        // var data = [];
        // $("#answerMultiSelect").val(data);
        // $("#answerMultiSelect").multiselect("refresh");
        $("#validOption").removeClass("hidden");
      } else {
        $("#validOption").addClass("hidden");
      }
    } else {
      validOption = false;
    }
  }).change();



  $("#addQuestion").click(function () {

    if (!$("#topicTitle").val().replace(/\s/g, '').length || $("#topicTitle").val() == "" || $("#topicTitle").val() == null || $("#topicTitle").val() == undefined) {
      $("#topicTitleValidation").removeClass("hidden");
      $("#questionSidenav").scrollTop(10);
      return;
    }

    checkSelectedOption();
    if (!$("#questionTextarea").val().replace(/\s/g, '').length || $("#questionTextarea").val() == "" || $("#questionTextarea").val() == null || $("#questionTextarea").val() == undefined) {
      $("#questionValidation").removeClass("hidden");

      $("#topicTitleValidation").addClass("hidden");
      $("#option1Validation").addClass("hidden");
      $("#option2Validation").addClass("hidden");
      $("#validOption").addClass("hidden");
      $("#questionSidenav").scrollTop(550);
      return;
    }
    if (validOption == false) {
      if (($("#option1").val() == "" || !$("#option1").val().replace(/\s/g, '').length) && ($("#option2").val() == "" || !$("#option2").val().replace(/\s/g, '').length) && ($("#option3").val() == "" || !$("#option3").val().replace(/\s/g, '').length) && ($("#option4").val() == "" || !$("#option1").val().replace(/\s/g, '').length)) {


        $("#topicTitleValidation").addClass("hidden");

        $("#option1Validation").removeClass("hidden");
        $("#option2Validation").addClass("hidden");
        $("#validOption").addClass("hidden");
        $("#questionSidenav").scrollTop(550);
        return;
      } else if (($("#option2").val() == "" || !$("#option2").val().replace(/\s/g, '').length) && ($("#option3").val() == "" || !$("#option3").val().replace(/\s/g, '').length) && ($("#option4").val() == "" || !$("#option4").val().replace(/\s/g, '').length)) {


        $("#topicTitleValidation").addClass("hidden");

        $("#option2Validation").removeClass("hidden");
        $("#validOption").addClass("hidden");
        $("#questionSidenav").scrollTop(550);
        return;
      } else if (selections == false) {
        $("#validOption").removeClass("hidden");
        $("#questionSidenav").scrollTop(800);
        return;
      }
    }
    if (($("#option2").val() == "")) {
      $("#topicTitleValidation").addClass("hidden");
      $("#option2Validation").removeClass("hidden");
      $("#validOption").addClass("hidden");
      $("#questionSidenav").scrollTop(550);
      return;
    }

    var selectedans = $("#answerMultiSelect").val();

    if (selectedans.length == "4") {
      if ($("#option3").val() == "" || $("#option3").val() == null || $("#option3").val() == undefined || $("#option4").val() == "" || $("#option4").val() == null || $("#option4").val() == undefined) {
        $("#validOption").removeClass("hidden");
        return;
      }
    }

    if (($("#option3").val() == "")) {
      if (($("#option4").val() != "")) {
        $("#option3").val($("#option4").val());
        $("#option4").val('');
        var selectedans = $("#answerMultiSelect").val();
        for (i = 0; i < selectedans.length; i++) {
          if (selectedans[i] == "4") {
            selectedans[i] = "3";
          }
        }
        $("#answerMultiSelect").val(selectedans);
      }
    }

    for (i = 4; i > 0; i--) {
      if ($("#option" + i).val().length != 0) {
        for (j = 1; j < i; j++) {
          if ($("#option" + j).val().length == 0) {
            $("#option" + j + "Validation").removeClass("hidden");
            $("#questionSidenav").scrollTop(550);
            return;
          }
        }
      }
    }


    if ($("#option").val() == "") {
      $("#option" + $(this).val() + "Validation").removeClass('hidden');
      var data = [];
      $("#answerMultiSelect").val(data);
      $("#answerMultiSelect").multiselect("refresh");
      return;
    }


    var answer = [];
    var selected = $("#answerMultiSelect option:selected");
    selected.each(function () {
      var selectedOption = $("#option" + $(this).val()).val();
      if (selectedOption == "") {
        $("#option" + $(this).val() + "Validation").removeClass('hidden');
        var data = [];
        $("#answerMultiSelect").val(data);
        $("#answerMultiSelect").multiselect("refresh");
        return;
      } else {
        answer.push($(this).val());
      }
    });

    $(".validationLabel").addClass("hidden");

    questionCount++;
    var questionText = $("#questionTextarea").val();
    var option1 = $("#option1").val().replace(/\s+$/, '');
    var option2 = $("#option2").val().replace(/\s+$/, '');
    var option3 = $("#option3").val().replace(/\s+$/, '');
    var option4 = $("#option4").val().replace(/\s+$/, '');

    var opt1 = [];
    var opt = {
      "option": ""
    };
    if (option1 != "" && option1 != null && option1 != undefined && option1.replace(/\s/g, '').length) {
      opt = {
        "option": option1
      };
      opt1.push(opt);
    }

    if (option2 != "" && option2 != null && option2 != undefined && option2.replace(/\s/g, '').length) {
      opt = {
        "option": option2
      };
      opt1.push(opt);
    }

    if (option3 != "" && option3 != null && option3 != undefined && option3.replace(/\s/g, '').length) {
      opt = {
        "option": option3
      };
      opt1.push(opt);
    }

    if (option4 != "" && option4 != null && option4 != undefined && option4.replace(/\s/g, '').length) {
      opt = {
        "option": option4
      };
      opt1.push(opt);
    }

    var reenforcement_feedback = $("#Reenforcement_Feedback").val().replace(/\s+$/, '');
    var correcitve_feedback = $("#Corrective_Feedback").val().replace(/\s+$/, '');
    if (questionDetails.length < 10) {
      questionData = {
        "Id": "" + questionCount,
        "Question": questionText,
        "Options": opt1,
        "Answer": answer,
        "Reenforcement_feedback": reenforcement_feedback,
        "Corrective_feedback": correcitve_feedback
      };
      questionDetails.push(questionData);
      
    
      $("#questionTextarea").val('');
      $("#option1").val('');
      $("#option2").val('');
      $("#option3").val('');
      $("#option4").val('');
      $("#answerSelect").val('0');
      $('#correctivecharcount').text("0");
      $('#reenforcecharcount').text("0");
      $("#Reenforcement_Feedback").val('');
      $("#Corrective_Feedback").val('')
      var data = [];
      $("#answerMultiSelect").val(data);
      $("#answerMultiSelect").multiselect("refresh");
      $("#answerMultiSelect").multiselect("disable");

      var data = questionDetails;


      $("#accordion > div").remove();

      for (i = 0; i < data.length; i++) {
        var bind_questionNum = (i + 1);
        var bind_questionText = data[i].Question;
        var bind_options = data[i].Options;
        var bind_answer = data[i].Answer;
        var bind_reenforcement = data[i].Reenforcement_feedback;
        var bind_corrective = data[i].Corrective_feedback;
        var dynamic_panel = "panel" + bind_questionNum;

        var answer_data = '<div class="row"><div class="col-12">Answer: ' + bind_answer + '</div></div>';
        var feedback_data = '<div class="row"><div class="col-12">Reinforcement Feedback: ' + bind_reenforcement + '</div></div><div class="row"><div class="col-12">Corrective Feedback: ' + bind_corrective + '</div></div>';

        var optionData = '';

        for (j = 0; j < bind_options.length; j++) {
          var tempData = '<div class="col-6"><span>' + (j + 1) + ' . </span><span>' + bind_options[j].option + '</span></div>'
          optionData = optionData.concat(tempData);
        }
        var accordionData = '<div class="card questionAccordion" id="divGroup' + bind_questionNum + '"> <div class="card-header" id="heading' + bind_questionNum + '" > <h3 class="mb-0"> <button id="que' + bind_questionNum + '" class="btn btn-link queDiv" data-toggle="collapse" data-target="#collapse' + bind_questionNum + '" aria-expanded="true" aria-controls="collapse' + bind_questionNum + '"> <i class="fa" aria-hidden="true"></i> Question <span>' + bind_questionNum + '</span></button> </h3> </div> <div id="collapse' + bind_questionNum + '" class="collapse" aria-labelledby="heading' + bind_questionNum + '" data-parent="#accordion"> <div class="card-body"> <div class="row ' + dynamic_panel + '"><div class="col-12"></div>' + bind_questionText + optionData + '</div> ' + answer_data + feedback_data + '<div class="row"><div class="col-12 actionDiv"><button onmouseenter="mouseEnter(\'Edit the question using this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-success" onclick="editQuestion(' + data[i].Id + ','+bind_questionNum+')">Edit</button><button onmouseenter="mouseEnter(\'In case if you wish to roll-back the changes without saving them, press this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-danger" onclick="deleteQuestion(' + data[i].Id + ')" >Delete</button></div></div></div></div></div>';

        $("#accordion").append(accordionData);
      }

      var questionLength = questionDetails.length;
      var len = questionLength;
      len = len - 1;
      if (questionDetails.length > 0) {
        textview = document.getElementById('questionText');
        textview.setAttribute('value', questionDetails[questionLength - 1].Question);

      }

      if (newtopic == true) {
        addNewTopic();
        editTopic(topicCount - 1);
        checkSaveQuestion = false;
        selectDescriptionType()
      } else {
        saveTopic();
        editTopic(editTopicId);
        checkSaveQuestion = false; 
        selectDescriptionType()
      }
      popSnackbar("success", "Question "+(qno)+" saved successfully.");
      $(".collapse").removeClass("show");
      $("#addTopicDivCollapse").addClass("show");
      $("#addQuestionDivCollapse").addClass("show");
    } else {
      popSnackbar('warning', "You can add atmost 10 questions.");
      $("#questionTextarea").val('');
      $("#option1").val('');
      $("#option2").val('');
      $("#option3").val('');
      $("#option4").val('');
      $('#questioncharcount').text('0');
      $("#option1charcount").text('0');
      $("#option2charcount").text('0');
      $("#option3charcount").text('0');
      $("#option4charcount").text('0');

      $('#correctivecharcount').text("0");
      $('#reenforcecharcount').text("0");

      $("#Reenforcement_Feedback").val('');
      $("#Corrective_Feedback").val('');

      var data = [];
      $("#answerMultiSelect").val(data);
      $("#answerMultiSelect").multiselect("refresh");
      return;
    }
    validOption = false;
    selections = false;
  });

  $("input[name='seeVideo']").click(function () {
    knowledgeZoneData.seeVideo = $("input[name='seeVideo']:checked").val();
  });

  $("input[name='score']").click(function () {
    knowledgeZoneData.Show_score_at_end = $("input[name='score']:checked").val();
  });

  $("input[name='right']").click(function () {
    knowledgeZoneData.Show_right_answer = $("input[name='right']:checked").val();
  });

  $("#messageTextarea").change(function () {

    var message = $("#messageTextarea").val();
    knowledgeZoneData.End_Message = message;
  });

  $(".questionAccordions").click(function () {
    {
      $("#addQuestion1").click();
    }
  });

  $(".custom-input").bind("change paste keyup", function () {
    var len = $(this).val().length;
    if (this.maxLength == len) {
      popSnackbar('warning', "Limit exceed.");
      return;
    }
  });

  $("#questionTextarea").bind("change paste keyup ", function () {
    if ($("#questionTextarea").val().length > 0)
      $("#questionValidation").addClass("hidden");
  });
  $("#topicTitle").bind("change paste keyup", function () {
    if ($("#topicTitle").val().length > 0)
      $("#topicTitleValidation").addClass("hidden");
  });


  $(".optionInput").bind("change paste keyup", function () {
    var inputId = this.id.split('option');
    inputId = parseInt(inputId[1]);
    $("#option" + inputId + "Validation").addClass("hidden");
    if ($("#questionTextarea").val().length == 0) {
      $("#questionValidation").removeClass("hidden");
      $(".optionInput").val("");
    } else {
      for (i = 1; i < inputId; i++) {
        if ($("#option" + i).val().length == 0) {
          $("#" + this.id).val("");
          $("#option" + i + "Validation").removeClass("hidden");
          return;
        }
      }

      var cnt = 0;
      $(".optionInput").each(function () {
        if ($(this).val().length > 0) {
          cnt++;
        }
      });
      if ($(".optionInput").val().length > 0)
        $("#optionValidation").addClass("hidden");

      if (cnt >= 2)
        $("#answerMultiSelect").multiselect("enable");
      else
        $("#answerMultiSelect").multiselect("disable");
    }
  });

  $("#fixOpacity").on("input", function () {
    fixOpacity = $(this).val();
    var displayvalue = '(' + Math.round(fixOpacity * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    knowledgeZoneData.Opacity = fixOpacity;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  });

  $('#topicInstruction').keypress(function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
      }
    });
});

$(function () {
  $('#answerMultiSelect').multiselect({
    includeSelectAllOption: true
  });
  $("#answerMultiSelect").multiselect("disable");
  $('#btnSelected').click(function () {
    var selected = $("#answerMultiSelect option:selected");
    var message = "";
    selected.each(function () {
      message += $(this).text() + " " + $(this).val() + "\n";
    });
    alert(message);
  });
});

function valueChanged() {
  if ($("#multi-choice").is(":checked")) {
    $("#answerSelect").addClass("hidden");
    $(".multiselect-native-select").css("display", "block");
  } else {
    var data = [];
    $("#answerMultiSelect").val(data);
    $("#answerMultiSelect").multiselect("refresh");
    $("#answerSelect").removeClass("hidden");
    $(".multiselect-native-select").css("display", "none");
  }
}

function editQuestion(id,qno) {
  $("#addQuestion").removeClass('show');
  $("#addQuestion").addClass('display-none');
  $("#saveQuestion").removeClass('display-none');
  $("#cancelQuestion").removeClass('display-none');
  $("#questionValidation").addClass("hidden");

  $("#topicTitleValidation").addClass("hidden");

  $("#option1Validation").addClass("hidden");
  $("#option2Validation").addClass("hidden");
  $("#validOption").addClass("hidden");


  $("#hidden-question-id").val(id);
  var data = questionDetails;

  for (i = 0; i < data.length; i++) {
    if (data[i].Id == id) {
      $('#displayquestiontitle').html("Question " + (qno));
      $("#questionTextarea").val(data[i].Question);
      $('#questioncharcount').text(data[i].Question.length);
      if (data[i].Options[0] != "" && data[i].Options[0] != null && data[i].Options[0] != undefined) {
        $("#option1").val(data[i].Options[0].option);

        $('#option1charcount').text(data[i].Options[0].option.length);

      }

      if (data[i].Options[1] != "" && data[i].Options[1] != null && data[i].Options[1] != undefined) {
        $("#option2").val(data[i].Options[1].option);
        $('#option2charcount').text(data[i].Options[1].option.length);
      }

      if (data[i].Options[2] != "" && data[i].Options[2] != null && data[i].Options[2] != undefined) {
        $("#option3").val(data[i].Options[2].option);

        $('#option3charcount').text(data[i].Options[2].option.length);
      }

      if (data[i].Options[3] != "" && data[i].Options[3] != null && data[i].Options[3] != undefined) {
        $("#option4").val(data[i].Options[3].option);

        $('#option4charcount').text(data[i].Options[3].option.length);
      }
      $('#Corrective_Feedback').val(data[i].Corrective_feedback);
      $('#Reenforcement_Feedback').val(data[i].Reenforcement_feedback);
      $('#correctivecharcount').text(data[i].Corrective_feedback.length);
      $('#reenforcecharcount').text(data[i].Reenforcement_feedback.length);
      $("#answerMultiSelect").val(data[i].Answer);
      $("#answerMultiSelect").multiselect("refresh");
      $("#answerMultiSelect").multiselect("enable");
      
    }
  }

  $('#addQuestionDivCollapse').addClass("show");
  $("#questionSidenav").scrollTop(550);
}

function deleteQuestion(id) {
  deleteQueId = id;
  var data = questionDetails;
  if (data.length <= 1) {
    //$("#deleteConfirmationModal").modal('hide');
    popSnackbar('warning', "At least one question should be added.");
  } else {

    $("#deleteConfirmationModal").modal('show');
  }
}

function deleteQuestionAfterConfirmation() {

  var data = questionDetails;


  for (i = 0; i < data.length; i++) {
    if (data[i].Id == deleteQueId) {
      var index = data.indexOf(data[i]);
      if (index > -1) {
        data.splice(index, 1);
        questionCount = 0;
      }
    }
  }


  $("#accordion > div").remove();
  for (i = 0; i < data.length; i++) {
    var bind_questionNum = (i + 1);
    var bind_questionText = data[i].Question;
    var bind_options = data[i].Options;
    var bind_answer = data[i].Answer;
    var bind_reenforcement = data[i].Reenforcement_feedback;
    var bind_corrective = data[i].Corrective_feedback;
    var dynamic_panel = "panel" + bind_questionNum;

    var answer_data = '<div class="row"><div class="col-12">Answer: ' + bind_answer + '</div></div>';
    var feedback_data = '<div class="row"><div class="col-12">Reinforcement Feedback: ' + bind_reenforcement + '</div></div><div class="row"><div class="col-12">Corrective Feedback: ' + bind_corrective + '</div></div>';
    var optionData = '';


    for (j = 0; j < bind_options.length; j++) {
      var tempData = '<div class="col-6"><span>' + (j + 1) + ' . </span><span>' + bind_options[j].option + '</span></div>'
      optionData = optionData.concat(tempData);
    }
    var accordionData = '<div class="card questionAccordion" id="divGroup' + bind_questionNum + '"> <div class="card-header" id="heading' + bind_questionNum + '"> <h3 class="mb-0"> <button id="que' + bind_questionNum + '" class="btn btn-link" data-toggle="collapse" data-target="#collapse' + bind_questionNum + '" aria-expanded="true" aria-controls="collapse' + bind_questionNum + '"> <i class="fa" aria-hidden="true"></i> Question <span>' + bind_questionNum + '</span> </button> </h3> </div> <div id="collapse' + bind_questionNum + '" class="collapse" aria-labelledby="heading' + bind_questionNum + '" data-parent="#accordion"> <div class="card-body"> <div class="row ' + dynamic_panel + '"><div class="col-12">' + bind_questionText + '</div>' + optionData + '</div> ' + answer_data + feedback_data + '<div class="row"><div class="col-12 actionDiv"><button type="button" onmouseenter="mouseEnter(\'Edit the question using this button.\');" onmouseleave="mouseLeave()" class="btn btn-success" onclick="editQuestion(' + data[i].Id + ','+bind_questionNum+')">Edit</button><button onmouseenter="mouseEnter(\'In case if you wish to roll-back the changes without saving them, press this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-danger" onclick="deleteQuestion(' + data[i].Id + ')" >Delete</button></div></div></div></div></div>';
    $("#accordion").append(accordionData);
  }
  popSnackbar("success", "Question deleted successfully.");
  questionCount = data.length;
  $("#questionTextarea").val('');
  $("#option1").val('');
  $("#option2").val('');
  $("#option3").val('');
  $("#option4").val('');
  $('#questioncharcount').text('0');
  $("#option1charcount").text('0');
  $("#option2charcount").text('0');
  $("#option3charcount").text('0');
  $("#option4charcount").text('0');
  $("#answerSelect").val('0');
  $('#correctivecharcount').text("0");
  $('#reenforcecharcount').text("0");
  $("#Reenforcement_Feedback").val('');
  $("#Corrective_Feedback").val('');
  $('#displayquestiontitle').html("Add Question");
  var data = [];
  $("#answerMultiSelect").val(data);
  $("#answerMultiSelect").multiselect("refresh");
  $("#answerMultiSelect").multiselect("disable");
  $("#addQuestion").removeClass('display-none');
  $("#saveQuestion").addClass('display-none');
  $("#cancelQuestion").addClass('display-none');

  $("#deleteConfirmationModal").modal('hide');
  
  generateTopicAccordion();

}

function deleteTopic(id) {
  deleteTopicId = id;
}

function deleteTopicAfterConfirmation() {

  deleteTopicPanel(knowledgeZoneData.topicData);
  var data = knowledgeZoneData.topicData;
  data.splice(deleteTopicId, 1);
  questionDetails = [];
  topicCount--;
  generateTopicAccordion();
  popSnackbar("success", "Topic deleted successfully.");
  $("#deleteTopicConfirmationModal").modal('hide');
  $("#accordion > div").remove();
  $("#addTopicDivCollapse").removeClass("show");
  $("#topicTitle").val('');
  $('#titlecharcount').text('0');
  $("#topicDescription").val('');
  $('#descriptioncharcount').text('0');
  var videoNameLbl = document.getElementById('customLabelVideo');
  videoNameLbl.innerText = "Choose Video";
  $("#questionTextarea").val('');
  var imgNameLbl = document.getElementById('customImageLabel');
  imgNameLbl.innerText = "Choose Description Image";

  var descriptionimg = document.getElementById('uploadedimg');
  descriptionimg.setAttribute("src", "");

  document.getElementById("typeDropDownID").selectedIndex = "0";

  $("#descriptionInText").removeClass("active-story");
  $("#descriptionInImage").addClass("active-story");
  $("#uploadedimgdiv").addClass('display-none');
  $("#option1").val('');
  $("#option2").val('');
  $("#option3").val('');
  $("#option4").val('');
  $('#questioncharcount').text('0');
  $("#option1charcount").text('0');
  $("#option2charcount").text('0');
  $("#option3charcount").text('0');
  $("#option4charcount").text('0');
  $('#correctivecharcount').text("0");
  $('#reenforcecharcount').text("0");
  $("#Reenforcement_Feedback").val('');
  $("#Corrective_Feedback").val('');
  var data = [];
  $("#answerMultiSelect").val(data);
  $("#answerMultiSelect").multiselect("refresh");
  $("#answerMultiSelect").multiselect("disable");
  $("#addTopic").removeClass('display-none');
  $("#addTopic2").removeClass('display-none');
  $("#saveTopic").addClass('display-none');
  $("#saveTopic1").addClass('display-none');
  $("#cancelTopic").addClass('display-none');
  $("#cancelTopic1").addClass('display-none');
}

function popSnackbar(type, message) {
  var x = document.getElementById("snackbar");
  x.innerText = message;
  x.className = "show " + type;
  setTimeout(function () {
    x.className = x.className.replace("show " + type, "");
  }, 3000);
}

function saveQuestion() {
  if (!$("#questionTextarea").val().replace(/\s/g, '').length || $("#questionTextarea").val() == "" || $("#questionTextarea").val() == null || $("#questionTextarea").val() == undefined) {
    $("#questionValidation").removeClass("hidden");
    $("#topicTitleValidation").addClass("hidden");
    $("#option1Validation").addClass("hidden");
    $("#option2Validation").addClass("hidden");
    $("#validOption").addClass("hidden");
    $("#questionSidenav").scrollTop(550);
    return;
  }
  if (($("#option2").val() == "")) {
    $("#topicTitleValidation").addClass("hidden");
    $("#option2Validation").removeClass("hidden");
    $("#validOption").addClass("hidden");
    $("#questionSidenav").scrollTop(550);
    return;
  }
  var selectedans = $("#answerMultiSelect").val();

    if (selectedans.length == "4") {
      if ($("#option3").val() == "" || $("#option3").val() == null || $("#option3").val() == undefined || $("#option4").val() == "" || $("#option4").val() == null || $("#option4").val() == undefined) {
        $("#validOption").removeClass("hidden");
        return;
      }
    }

  if (($("#option3").val() == "")) {
    if (($("#option4").val() != "")) {
      $("#option3").val($("#option4").val());
      $("#option4").val('');
      var selectedans = $("#answerMultiSelect").val();
      for (i = 0; i < selectedans.length; i++) {
        if (selectedans[i] == "4") {
          selectedans[i] = "3";
        }
      }
      $("#answerMultiSelect").val(selectedans);
    }
  }

  $("#answerMultiSelect option:selected").each(function () {
    selections = true;
    selectedValue = $(this).val();
  });

  var selectedOptionVal = $("#option" + selectedValue).val();
  if (selections == true && selectedOptionVal != "") {
    validOption = true;
  } else if (selections == true && selectedOptionVal == "") {
    $("#option" + selectedValue + "Validation").removeClass("hidden");
    $("#questionSidenav").scrollTop(550);
    return;
  }

  if (validOption == false) {
    if ($("#questionTextarea").val() == "" || $("#questionTextarea").val() == null || $("#questionTextarea").val() == undefined) {
      $("#questionValidation").removeClass("hidden");
      $("#questionSidenav").scrollTop(550);
      return;
    } else if ($("#option1").val() == "" && $("#option2").val() == "" && $("#option3").val() == "" && $("#option4").val() == "") {
      $("#optionValidation").removeClass("hidden");
      $("#questionSidenav").scrollTop(550);
      return;
    } else if (selections == false) {
      $("#validOption").removeClass("hidden");
      $("#questionSidenav").scrollTop(800);
      return;
    }
  }

  for (i = 4; i > 0; i--) {
    if ($("#option" + i).val().length != 0) {
      for (j = 1; j < i; j++) {
        if ($("#option" + j).val().length == 0) {
          $("#option" + j + "Validation").removeClass("hidden");
          $("#questionSidenav").scrollTop(550);
          return;
        }
      }
    }
  }


  var answer = [];
  var selected = $("#answerMultiSelect option:selected");
  selected.each(function () {
    var selectedOption = $("#option" + $(this).val()).val();
    if (selectedOption == "") {
      $("#option" + $(this).val() + "Validation").removeClass('hidden');
      var data = [];
      $("#answerMultiSelect").val(data);
      $("#answerMultiSelect").multiselect("refresh");
      return;
    } {
      answer.push($(this).val());
    }
  });

  $(".validationLabel").addClass("hidden");


  var editedQuestionId = $("#hidden-question-id").val();

  var data = questionDetails;

  var option1 = $("#option1").val();
  var option2 = $("#option2").val();
  var option3 = $("#option3").val();
  var option4 = $("#option4").val();
  var opt1 = [];
  var opt = {
    "option": ""
  };
  // var optionCounter = 0;
  if (option1 != "" && option1 != null && option1 != undefined) {
    opt = {
      "option": option1
    };
    opt1.push(opt);
    //   optionCounter = optionCounter + 1;
  }

  if (option2 != "" && option2 != null && option2 != undefined) {
    opt = {
      "option": option2
    };
    opt1.push(opt);
    //   optionCounter = optionCounter + 1;
  }

  if (option3 != "" && option3 != null && option3 != undefined) {
    opt = {
      "option": option3
    };
    opt1.push(opt);
    //   optionCounter = optionCounter + 1;
  }

  if (option4 != "" && option4 != null && option4 != undefined) {
    opt = {
      "option": option4
    };
    opt1.push(opt);
    //    optionCounter = optionCounter + 1;
  }

  var answer = [];

  var selected = $("#answerMultiSelect option:selected");
  selected.each(function () {
    answer.push($(this).val());
  });

  for (i = 0; i < data.length; i++) {
    if (data[i].Id == editedQuestionId) {
      data[i].Question = $("#questionTextarea").val();
      data[i].Options = opt1;
      data[i].Answer = answer;
      data[i].Corrective_feedback = $('#Corrective_Feedback').val();
      data[i].Reenforcement_feedback = $('#Reenforcement_Feedback').val();
    }
  }

  $("#accordion > div").remove();
  for (i = 0; i < data.length; i++) {
    var bind_questionNum = (i + 1);
    var bind_questionText = data[i].Question;
    var bind_options = data[i].Options;
    var bind_answer = data[i].Answer;
    var bind_reenforcement = data[i].Reenforcement_feedback;
    var bind_corrective = data[i].Corrective_feedback;
    var dynamic_panel = "panel" + bind_questionNum;

    var answer_data = '<div class="row"><div class="col-12">Answer: ' + bind_answer + '</div></div>';
    var feedback_data = '<div class="row"><div class="col-12">Reinforcement Feedback: ' + bind_reenforcement + '</div></div><div class="row"><div class="col-12">Corrective Feedback: ' + bind_corrective + '</div></div>';

    var optionData = '';

    for (j = 0; j < bind_options.length; j++) {
      var tempData = '<div class="col-6"><span>' + (j + 1) + ' . </span><span>' + bind_options[j].option + '</span></div>'
      optionData = optionData.concat(tempData);
    }
    var accordionData = '<div class="card questionAccordion" id="divGroup' + bind_questionNum + '"> <div class="card-header" id="heading' + bind_questionNum + '"> <h3 class="mb-0"> <button id="que' + bind_questionNum + '" class="btn btn-link" data-toggle="collapse" data-target="#collapse' + bind_questionNum + '" aria-expanded="true" aria-controls="collapse' + bind_questionNum + '"> <i class="fa" aria-hidden="true"></i> Question <span>' + bind_questionNum + '</span> </button> </h3> </div> <div id="collapse' + bind_questionNum + '" class="collapse" aria-labelledby="heading' + bind_questionNum + '" data-parent="#accordion"> <div class="card-body"> <div class="row ' + dynamic_panel + '"><div class="col-12">' + bind_questionText + '</div>' + optionData + '</div> ' + answer_data + feedback_data + '<div class="row"><div class="col-12 actionDiv"><button  onmouseenter="mouseEnter(\'Edit the question using this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-success" onclick="editQuestion(' + data[i].Id + ','+bind_questionNum+')">Edit</button><button onmouseenter="mouseEnter(\'In case if you wish to roll-back the changes without saving them, press this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-danger" onclick="deleteQuestion(' + data[i].Id + ')" >Delete</button></div></div></div></div></div>';
    $("#accordion").append(accordionData);
  }
  checkSaveQuestion = false;
  questionCount = data.length;
  $("#questionTextarea").val('');
  $("#option1").val('');
  $("#option2").val('');
  $("#option3").val('');
  $("#option4").val('');
  $('#questioncharcount').text('0');
  $("#option1charcount").text('0');
  $("#option2charcount").text('0');
  $("#option3charcount").text('0');
  $("#option4charcount").text('0');
  $("#answerSelect").val('0');
  $("#Reenforcement_Feedback").val('');
  $("#Corrective_Feedback").val('')
  $('#correctivecharcount').text("0");
  $('#reenforcecharcount').text("0");
  $("#addQuestion").removeClass('display-none');
  $("#saveQuestion").addClass('display-none');
  $("#cancelQuestion").addClass('display-none');
  $('#displayquestiontitle').html("Add Question");
  var data = [];
  $("#answerMultiSelect").val(data);
  $("#answerMultiSelect").multiselect("refresh");

  validOption = false;
  $("#addTopicDivCollapse").addClass('show');

  popSnackbar("success", "Question "+(bind_questionNum)+" saved successfully.");
  selections = false;
}

function cancelQuestion() {
  $("#questionTextarea").val('');
  $("#option1").val('');
  $("#option2").val('');
  $("#option3").val('');
  $("#option4").val('');
  $('#questioncharcount').text('0');
  $("#option1charcount").text('0');
  $("#option2charcount").text('0');
  $("#option3charcount").text('0');
  $("#option4charcount").text('0');
  $("#answerSelect").val('0');
  $('#displayquestiontitle').html("Add Question");
  var data = [];
  $("#answerMultiSelect").val(data);
  $("#answerMultiSelect").multiselect("refresh");
  $('#Corrective_Feedback').val('');
  $('#Reenforcement_Feedback').val('');
  $('#correctivecharcount').text("0");
  $('#reenforcecharcount').text("0");
  $("#addQuestion").removeClass('display-none');
  $("#saveQuestion").addClass('display-none');
  $("#cancelQuestion").addClass('display-none');
  $("#validOption").addClass("hidden");
}

function showFrameImage(input1) {
  assettype = 'Image';
  elementToUpdate = "Wall";
  window.parent.triggerAssetsPopup();
}

function startquizbtn() {
  assettype = 'Image';
  elementToUpdate = "StartQuizImage";
  window.parent.triggerAssetsPopup();
}

function startvideobtn() {
  assettype = 'Image';
  elementToUpdate = "StartVideoImage";
  window.parent.triggerAssetsPopup();
}

function changeSplashImage() {
  assettype = 'Image';
  elementToUpdate = "Splash";
  window.parent.triggerAssetsPopup();
}

function addImage() {
  assettype = 'Image';
  elementToUpdate = "decription";
  window.parent.triggerAssetsPopup();
}

function addVideo() {
  assettype = 'Video';
  elementToUpdate = "Video";
  window.parent.triggerAssetsPopup();
}

function BindAudio() {
  assettype = 'Audio';
  elementToUpdate = "Audio";
  window.parent.triggerAssetsPopup();
}

function BindVideo() {
  assettype = 'Video';
  elementToUpdate = "Video";
  window.parent.triggerAssetsPopup();
}

function mediawallheading() {
  assettype = 'Image';
  elementToUpdate = "mediaheading";
  window.parent.triggerAssetsPopup();
}

function scorewallheading() {
  assettype = 'Image';
  elementToUpdate = "scoreheading";
  window.parent.triggerAssetsPopup();
}

function topicwallheading() {
  assettype = 'Image';
  elementToUpdate = "topicheading";
  window.parent.triggerAssetsPopup();
}

function quizwallheading() {
  assettype = 'Image';
  elementToUpdate = "quizheading";
  window.parent.triggerAssetsPopup();
}

function getAssetPath(assetPath) {
  imagePath = assetPath;
  if (imagePath != "") {
    if (elementToUpdate == 'Splash') {
      splashImagePath = assetPath;
      var splashLbl = document.getElementById('splashImageLable');
      var path = returnAssetName(splashImagePath);
      splashLbl.children[0].innerText = path;
    } else if (elementToUpdate == 'Wall') {
      var scoreWallLbl = document.getElementById('score-wall-imagelabel');
      var scoreWallImageName = returnAssetName(imagePath);
      scoreWallLbl.innerText = scoreWallImageName;
      knowledgeZoneData.window_wall.Logo = imagePath;
      var scoreScreenImage = document.getElementById('score-screen-default-image');
      scoreScreenImage.setAttribute("src", imagePath);
    } else if (elementToUpdate == 'Video') {
      var videoNameLbl = document.getElementById('customLabelVideo');

      var videoName = returnAssetName(imagePath);
      videoNameLbl.innerText = videoName;
      videoPath = imagePath;

    } else if (elementToUpdate == 'Audio') {
      knowledgeZoneData.Background_audio = assetPath;
      var path = returnAssetName(imagePath);
      audiolbl.innerText = path;
    } else if (elementToUpdate == 'decription') {
      var imgNameLbl = document.getElementById('customImageLabel');
      descriptionImagePath = assetPath;
      var path = returnAssetName(imagePath);
      imgNameLbl.innerText = path;
      var descriptionimg = document.getElementById('uploadedimg');
      descriptionimg.setAttribute("src", descriptionImagePath);
      $("#uploadedimgdiv").removeClass('display-none');
    } else if (elementToUpdate == 'StartQuizImage') {
      StartQuizImagePath = assetPath;
      var startQuizLbl = document.getElementById('StartQuizImageLabel');
      var path = returnAssetName(StartQuizImagePath);
      startQuizLbl.innerText = path;
      var startquizimage = document.getElementById("startQuiz");
      startquizimage.setAttribute("src", "");
      startquizimage.setAttribute("src", StartQuizImagePath);
      knowledgeZoneData.Start_Quiz_Button_Image = StartQuizImagePath;
    } else if (elementToUpdate == 'StartVideoImage') {
      StartVideoImagePath = assetPath;
      var startvideoLbl = document.getElementById('StartVideoImageLabel');
      var path = returnAssetName(StartVideoImagePath);
      startvideoLbl.innerText = path;
      var startvideoimage = document.getElementById("proceed");
      startvideoimage.setAttribute("material", "src:");
      startvideoimage.setAttribute("material", "src:" + StartVideoImagePath);
      knowledgeZoneData.Start_Video_Button_Image = StartVideoImagePath;
    } else if (elementToUpdate == 'topicheading') {
      topicImagePath = assetPath;
      var topicLbl = document.getElementById('topic-wall-logoLabel');
      var path = returnAssetName(topicImagePath);
      topicLbl.innerText = path;
      var topicWallHeadingimage = document.getElementById("topic-WallHeadingimage");
      topicWallHeadingimage.setAttribute("src", "");
      topicWallHeadingimage.setAttribute("src", topicImagePath);
      knowledgeZoneData.Topic_Wall_Heading_Logo = topicImagePath;
    } else if (elementToUpdate == 'quizheading') {
      quizImagePath = assetPath;
      var quizLbl = document.getElementById('quiz-wall-logoLabel');
      var path = returnAssetName(quizImagePath);
      quizLbl.innerText = path;
      var quizWallHeading = document.getElementById("quiz-WallHeading");
      quizWallHeading.setAttribute("src", "");
      quizWallHeading.setAttribute("src", quizImagePath);
      knowledgeZoneData.Quiz_Wall_Heading_Logo = quizImagePath;
    } else if (elementToUpdate == 'mediaheading') {
      mediaImagePath = assetPath;
      var mediaLbl = document.getElementById('media-wall-logoLabel');
      var path = returnAssetName(mediaImagePath);
      mediaLbl.innerText = path;
      var mediaWallHeading = document.getElementById("media-WallHeading");
      mediaWallHeading.setAttribute("src", "");
      mediaWallHeading.setAttribute("src", mediaImagePath);
      knowledgeZoneData.Media_Wall_Heading_Logo = mediaImagePath;
    } else if (elementToUpdate == 'scoreheading') {
      scoreImagePath = assetPath;
      var scoreLbl = document.getElementById('score-wall-logolabel');
      var path = returnAssetName(scoreImagePath);
      scoreLbl.innerText = path;
      var scoreWallHeading = document.getElementById("score-WallHeading");
      scoreWallHeading.setAttribute("src", "");
      scoreWallHeading.setAttribute("src", scoreImagePath);
      knowledgeZoneData.Score_Wall_Heading_Logo = scoreImagePath;
    }
  }

}

function selectDescriptionType() {

  var DropDownValue = document.getElementById("typeDropDownID");
  selectedType = DropDownValue.options[DropDownValue.selectedIndex].value;
  if (selectedType == "image") {
     var image=document.getElementById("uploadedimg").getAttribute("src");
    if(image){
      if(image==""){
        
      }else{
        $("#uploadedimgdiv").removeClass('display-none');
      }
     }
     $("#descriptionInImage").removeClass("active-story");
    $("#descriptionInText").addClass("active-story");
 
  } else if (selectedType == "text") {
    $("#uploadedimgdiv").addClass('display-none');
    $("#descriptionInText").removeClass("active-story");
    $("#descriptionInImage").addClass("active-story");

  }
}

function getAssetType() {
  return assettype;
}

function bindData(input) {
  if (input != null) {

    var galleryImageName = input;
    var gallery_entity = document.querySelector('#' + wall + '-wall-entity' + order);
    var changedgallery = document.querySelector('#' + wall + '-wall-texture' + order);
    changedgallery.setAttribute('crossorigin', "anonymous");
    changedgallery.setAttribute('src', galleryImageName);
    gallery_entity.setAttribute('material', 'src: #');
    gallery_entity.setAttribute('material', 'src: #' + wall + '-wall-texture' + order);


    knowledgeZoneData.window_wall.Logo = galleryImageName;
    var lbl = document.getElementById('score-screen-wall-logo');
    var path = returnAssetName(galleryImageName);
    lbl.children[0].innerText = path;

  }

}


$(function () {
  $("#accordion")
    .accordion({
      header: "> div > div.card-header"
    })
    .sortable({
      axis: "y",
      handle: "div.card-header",
      update: function (event, ui) {
        updateJson();
      }
    });
});

function updateJson() {
  var values = [];
  $('#accordion > .card').each(function (index) {
    values.push($(this).attr("id").replace("divGroup", ""));
  });

  var data = knowledgeZoneData.questionData;
  var x, y;
  for (j = 0; j < values.length; j++) {
    var index = values.indexOf(values[j]);
    var diff = values[j] - index;
    if (diff <= 0) {
      x = (parseInt(values[j]) - 1);
      y = index;
    }
  }

  var a = data[x];
  data.splice(x, 1);
  data.splice(y, 0, a);

  for (i = 0; i < data.length; i++) {
    data[i].id = (i + 1);
  }

  $("#accordion > div").remove();
  for (i = 0; i < data.length; i++) {
    var bind_questionNum = (i + 1);
    var bind_questionText = data[i].Question;
    var bind_options = data[i].Options;
    var bind_answer = data[i].Answer;
    var bind_reenforcement = data[i].Reenforcement_feedback;
    var bind_corrective = data[i].Corrective_feedback;
    var dynamic_panel = "panel" + bind_questionNum;

    var answer_data = '<div class="row"><div class="col-12">Answer: ' + bind_answer + '</div></div>';
    var feedback_data = '<div class="row"><div class="col-12">Reinforcement Feedback: ' + bind_reenforcement + '</div></div><div class="row"><div class="col-12">Corrective Feedback: ' + bind_corrective + '</div></div>';

    var optionData = '';

    for (j = 0; j < bind_options.length; j++) {
      var tempData = '<div class="col-6"><span>' + (j + 1) + ' . </span><span>' + bind_options[j].option + '</span></div>'
      optionData = optionData.concat(tempData);
    }
    var accordionData = '<div class="card questionAccordion" id="divGroup' + bind_questionNum + '"> <div class="card-header" id="heading' + bind_questionNum + '"> <h3 class="mb-0"> <button class="btn btn-link" data-toggle="collapse" data-target="#collapse' + bind_questionNum + '" aria-expanded="true" aria-controls="collapse' + bind_questionNum + '"> <i class="fa" aria-hidden="true"></i> Question <span>' + bind_questionNum + '</span> </button> </h3> </div> <div id="collapse' + bind_questionNum + '" class="collapse" aria-labelledby="heading' + bind_questionNum + '" data-parent="#accordion"> <div class="card-body"> <div class="row ' + dynamic_panel + '"><div class="col-12">' + bind_questionText + '</div>' + optionData + '</div> ' + answer_data + feedback_data + '<div class="row"><div class="col-12 actionDiv"><button onmouseenter="mouseEnter(\'Edit the question using this button.\');" onmouseleave="mouseLeave() type="button" class="btn btn-success" onclick="editQuestion(' + data[i].Id + ','+bind_questionNum+')">Edit</button><button onmouseenter="mouseEnter(\'In case if you wish to roll-back the changes without saving them, press this button.\');" onmouseleave="mouseLeave() type="button" class="btn btn-danger" onclick="deleteQuestion(' + data[i].Id + ')" >Delete</button></div></div></div></div></div>';
    $("#accordion").append(accordionData);
  }
  questionCount = data.length;
  $("#questionTextarea").val('');
  $("#option1").val('');
  $("#option2").val('');
  $("#option3").val('');
  $("#option4").val('');
  $('#questioncharcount').text('0');
  $("#option1charcount").text('0');
  $("#option2charcount").text('0');
  $("#option3charcount").text('0');
  $("#option4charcount").text('0');
  $("#answerSelect").val('0');
  $("#Reenforcement_Feedback").val('');
  $("#Corrective_Feedback").val('');
  $('#correctivecharcount').text("0");
  $('#reenforcecharcount').text("0");
}

function removeAudio() {
  knowledgeZoneData.Background_audio = "";
  audiolbl.innerText = "Choose Background Audio";
}

function setQuiz() {

  if (knowledgeZoneData.Background_audio == "" || knowledgeZoneData.Background_audio == undefined) {
    audiolbl.innerText = "Choose Background Audio";
  } else {
    var audiopath = returnAssetName(knowledgeZoneData.Background_audio);
    audiolbl.innerText = audiopath;
  }


  $("#questionTextarea").val('');
  $("#option1").val('');
  $("#option2").val('');
  $("#option3").val('');
  $("#option4").val('');
  $('#questioncharcount').text('0');
  $("#option1charcount").text('0');
  $("#option2charcount").text('0');
  $("#option3charcount").text('0');
  $("#option4charcount").text('0');
  $("#answerSelect").val('0');
  $("#Reenforcement_Feedback").val('');
  $("#Corrective_Feedback").val('')
  $('#correctivecharcount').text("0");
  $('#reenforcecharcount').text("0");
}

function getExperienceToSave() {
  if ($("#topicInstruction").val() != "")
    knowledgeZoneData.Topic_Instruction = $("#topicInstruction").val().replace(/\s+$/, '');
  else
    knowledgeZoneData.Topic_Instruction = "";

  if ($("#HeaderMessage").val() != "")
    knowledgeZoneData.Heading_Message = $("#HeaderMessage").val().replace(/\s+$/, '');
  else
    knowledgeZoneData.Heading_Message = "";

  if ($("#SubheaderMessage").val() != "")
    knowledgeZoneData.Success_Message = $("#SubheaderMessage").val().replace(/\s+$/, '');
  else
    knowledgeZoneData.Success_Message = " ";

  if ($("#failuerMessage").val() != "")
    knowledgeZoneData.Failuer_Message = $("#failuerMessage").val().replace(/\s+$/, '');
  else
    knowledgeZoneData.Failuer_Message = " ";
  if ($("#EndMessage").val() != "")
    knowledgeZoneData.End_Message = $("#EndMessage").val().replace(/\s+$/, '');
  else
    knowledgeZoneData.End_Message = "";

  if ($("#passingPercentage").val() != "")
    knowledgeZoneData.Passing_Percentage = $("#passingPercentage").val().replace(/\s+$/, '');
  else
    knowledgeZoneData.Passing_Percentage = "";

  if ($("#singleTopicMessage").val() != "")
    knowledgeZoneData.Single_Topic_Completed_Message = $("#singleTopicMessage").val().replace(/\s+$/, '');
  else
    knowledgeZoneData.Single_Topic_Completed_Message = "Great!!Choose the next topic";

  if ($("#quizCompletedMessage").val() != "")
    knowledgeZoneData.All_Topic_Completed_Message = $("#quizCompletedMessage").val().replace(/\s+$/, '');
  else
    knowledgeZoneData.All_Topic_Completed_Message = "You have successfully done with all the quiz";


  var lauchText = $(".lunchScreenText");

  var lunchTextItem = lauchText[0].value;
  knowledgeZoneData.launch_text = lunchTextItem;

  var splashInstruction = $(".instructionSetForDesktop");
  var item = splashInstruction[0].value;
  knowledgeZoneData.splash_instruction = item;

  var splashAndroidInstruction = $(".instructionSetForAndroid")
  var item = splashAndroidInstruction[0].value;
  knowledgeZoneData.splash_android_instruction = item;

  if (splashImagePath)
    knowledgeZoneData.splash_image = splashImagePath;

  knowledgeZoneData.seeVideo = $("input[name='seeVideo']:checked").val();
  knowledgeZoneData.Show_right_answer = $("input[name='right']:checked").val();
  knowledgeZoneData.Show_score_at_end = $("input[name='score']:checked").val();

  var headerFont = $(".headerfont");
  var headerFontColor = headerFont[0].value;
  if (headerFontColor.includes('#')) {
    knowledgeZoneData.splashHeaderColor = headerFontColor;
  } else {
    knowledgeZoneData.splashHeaderColor = '#' + headerFontColor;
  }

  var splashbg = $(".splashBg");
  var splashBgColor = splashbg[0].value;
  if (splashBgColor.includes('#')) {
    knowledgeZoneData.splashBackgroundColor = splashBgColor;
  } else {
    knowledgeZoneData.splashBackgroundColor = '#' + splashBgColor;
  }

  if (knowledgeZoneData.Opacity) {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = knowledgeZoneData.Opacity;
    var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
  } else {
    knowledgeZoneData.Opacity = fixOpacity;
  }
  knowledgeZoneData.seeVideo = $("input[name='seeVideo']:checked").val()
  var modifiedJSON = knowledgeZoneData;
  var dataToPost = JSON.stringify(modifiedJSON);
  return dataToPost;
}

function addLaunchScreenText() {
  toggleSideNav('launchSidenav');
  knowledgeZoneData.launch_text = document.getElementById("lunchScreenText").value;

}

function toggleSideNav(sidenavId) {
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function (navigation) {
    if (navigation.classList.contains('active') && navigation.id != sidenavId)
      navigation.classList.remove('active');
  });
  document.getElementById(sidenavId).classList.toggle("active");
  if (sidenavId == 'questionSidenav') {
    $("#questionSidenav").scrollTop(0);
    $("#addTopicDivCollapse").addClass("show");

    if (isClicked == false) {
      if (knowledgeZoneData.topicData.length >= 1) {

        for (i = knowledgeZoneData.topicData.length - 1; i < 0; i--) {
          $("#collapseTopic" + i).removeClass("show");
        }
        $("#collapseTopic0").addClass("show");
        $("#addTopicDivCollapse").removeClass("show");
      }

      for (i = 0; i < knowledgeZoneData.topicData.length; i++) {
        $("#addTopicDivCollapse").removeClass("show");
        if (i == 0) {
          var panel = document.getElementById("topic" + i);
          panel.setAttribute("text", "font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;anchor:center;width:3;height:3.5;tabSize:1;color:#000f85;wrapCount:30;zOffset:0.081;align:center;letterSpacing:1");
        } else {
          var panel = document.getElementById("topic" + i);
          panel.setAttribute("text", "font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;anchor:center;width:3;height:3.5;tabSize:1;color:#fff;wrapCount:30;zOffset:0.081;align:center;letterSpacing:1");
        }
      }
    }else{
      if (knowledgeZoneData.topicData.length >= 1){
        $("#addTopicDivCollapse").removeClass("show");
      }
    }

    $("#StartQuizImageLabel").removeClass(
      "background-color-forestgreen"
    );
    $("#StartVideoImageLabel").removeClass("background-color-forestgreen");
  }



  toggleOverlay();
}

function toggleOverlay() {
  var sidenavActive = false;
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function (navigation) {
    if (navigation.classList.contains('active'))
      sidenavActive = true;
  });
  if (sidenavActive)
    document.getElementById("overlay").classList.add('overlay');
  else
    document.getElementById("overlay").classList.remove('overlay');
}

function returnAssetName(path) {
  if (path != undefined) {
    var str = path;
    var res = str.split("/");
    res = res[res.length - 1];
    if (res.length > 25) {
      var strat = res.substr(0, 15);
      var end = res.substr(res.length - 7, res.length);
      res = strat + '....' + end;
    }
    return res;
  } else {
    return path;
  }
}

function mouseEnter(msg) {
  window.parent.mouseEnter(msg);
}

function mouseLeave() {
  window.parent.mouseLeave();
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


function openAssetPopup(type, imagetype) {
  assettype = type;
  if (type == 'Video')
    imageType = imagetype;
  window.parent.triggerAssetsPopup();
}
/* Summernote MAxlength, maxcount and popsnacker */

$('.maxContentPost').summernote({
  placeholder: 'Splash Screen Text',
  tabsize: 2,
  height: 100,
  toolbar: [

    ['fontsize', ['fontsize']],
    ['color', ['color']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['fontname', ['fontname']],
    ['font', ['bold', 'italic', 'underline', 'clear']]


  ],
  callbacks: {
    onKeydown: function (e) {
      var sel = window.getSelection();
      if (sel.rangeCount) {
      var container = document.createElement("div");
        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
          container.appendChild(sel.getRangeAt(i).cloneContents());
        }
      }
      var selectedTextLength = container.innerText.length;
      var t = e.currentTarget.innerText;
      var cntolleKey = e.originalEvent.ctrlKey;
      $('#maxCount').text(t.length);
      if (t.length >= 350 && selectedTextLength <= 0) {
        if (cntolleKey) {
          
          if (e.keyCode != 8) {
          if (e.keyCode != 65) {
            if (e.keyCode != 67) {
              if (e.keyCode != 90) {
                if (e.keyCode != 88) {
                  if (e.keyCode != 86) {
                    if (e.keyCode != 46) {
                      if (e.keyCode != 17) {

                        popSnackbar("warning", "Limit exceed.");
                        e.preventDefault();
                      }
                      // popSnackbar("warning", "Limit exceed.");
                      // e.preventDefault();
                    }
                  }
                }
                }
              }
            }
          }
        } else {
          if (e.keyCode != 8) {
              if (e.keyCode != 46) {
                popSnackbar("warning", "Limit exceed.");
                e.preventDefault();
              }
          }
        }
      }
    },
    onKeyup: function (e) {
      var t = e.currentTarget.innerText;
      // $('.maxContentPost').text(350 - t.trim().length);
      $('#maxCount').text(t.length);
    },
    onPaste: function (e) {
      var container;
      var sel = window.getSelection();
      if (sel.rangeCount) {
        container = document.createElement("div");
        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
            container.appendChild(sel.getRangeAt(i).cloneContents());
        }
    }
    var selectedTextLength=container.innerText.length;
      var t = e.currentTarget.innerText;

      if (t.length >= 350 && selectedTextLength <= 0) {
        popSnackbar("warning", "Limit exceed.");
        e.preventDefault();
      }
      $("#maxCount").text(t.length);
      var bufferText = (
        (e.originalEvent || e).clipboardData || window.clipboardData
      ).getData("Text");
      e.preventDefault();
      for(var k=0;k<bufferText.length;k++){
    
    
      }
      var maxPaste = bufferText.length;
      var maxLength=(t.length-selectedTextLength) + bufferText.length;
      if ((t.length-selectedTextLength + bufferText.length) > 350) {
        popSnackbar("warning", "Limit exceed.");
        maxPaste = 350 - (t.length+-selectedTextLength);
      }
      if (maxPaste > 0) {
        document.execCommand(
          "insertText",
          false,
          bufferText.substring(0, maxPaste)
        );
      }
      var t = e.currentTarget.innerText;
      $("#maxCount").text(t.length);
    }
  }
});

/* Summernote MAxlength, maxcount and popsnacker */
function generateTopicAccordion() {

  quizTopicsPanel = document.getElementById("quizTopicsPanel");
  $("#topicaccordion > div").remove();
  if (knowledgeZoneData.topicData.length >= 10) {
    $("#addTopicCardDiv").addClass('display-none');
  } else {
    $("#addTopicCardDiv").removeClass('display-none');
  }
  y = 3.500;;
  $(".atext").remove();
  if (knowledgeZoneData.topicData.length > 1) {
    quizTopicsPanel.removeAttribute("open-add-topic");
    quizTopicsPanel.removeAttribute("clickable");
    //$("#collapseTopic0").addClass("show");

  }
  for (j = 0; j < knowledgeZoneData.topicData.length; j++) {
    y = y - 0.5;
    createTopicPanel(j, y);
    var bind_topicNum = j;
    var bind_topicTitle = knowledgeZoneData.topicData[j].Name;
    var bind_topicDescription = knowledgeZoneData.topicData[j].Description;

    var dynamic_topicpanel = "topicpanel" + bind_topicNum;

    var topicDescription = '<div class="col-12">Description: ' + bind_topicDescription + '</div>';
    var topicDescriptionImage = '<div class="col-12">Description Image:</div>';
    var questiondata = '';
    var optionData = '';
    for (k = 0; k < knowledgeZoneData.topicData[j].questionData.length; k++) {

      var questiontext = knowledgeZoneData.topicData[j].questionData[k].Question;
      var bind_options = knowledgeZoneData.topicData[j].questionData[k].Options;
      var bind_answer = knowledgeZoneData.topicData[j].questionData[k].Answer;
      var bind_reenforcement = knowledgeZoneData.topicData[j].questionData[k].Reenforcement_feedback;
      var bind_corrective = knowledgeZoneData.topicData[j].questionData[k].Corrective_feedback;

      var question = '<div class="col-12 mt-3"><b>Question ' + (k + 1) + ':</b> ' + questiontext + '</div>';
      questiondata = questiondata.concat(question);

      for (i = 0; i < bind_options.length; i++) {
        var tempData = '<div class="col-6"><span>' + (i + 1) + '. </span><span>' + bind_options[i].option + '</span></div>'
        optionData = optionData.concat(tempData);
      }
      questiondata = questiondata.concat(optionData);


      var answer_data = '<div class="col-12">Answer: ' + bind_answer + '</div>';
      questiondata = questiondata.concat(answer_data);
      optionData = ''

      var feedback_data = '<div class="col-12">Reinforcement Feedback: ' + bind_reenforcement + '</div><div class="col-12">Corrective Feedback: ' + bind_corrective + '</div>';
      questiondata = questiondata.concat(feedback_data);

    }

    if (knowledgeZoneData.topicData[j].DescriptionType == "image") {
      if (knowledgeZoneData.topicData[j].DescriptionImage != "") {
        var topic_details = '<div class="card topicAccordion" id="divGroup' + bind_topicNum + '"> <div class="card-header" id="heading' + bind_topicNum + '"> <h3 class="mb-0"> <button onclick="closeAddTopicAccordion(' + j + ')" id="top' + bind_topicNum + '" class="btn btn-link topicDiv" data-toggle="collapse" data-target="#collapseTopic' + bind_topicNum + '" aria-expanded="true" aria-controls="collapse' + bind_topicNum + '"> <i class="fa" aria-hidden="true"></i> Topic <span>' + (j + 1) + '</span> </button> </h3></div><div id="collapseTopic' + bind_topicNum + '" class="collapse" aria-labelledby="heading' + bind_topicNum + '" data-parent="#topicaccordion"><div class="card-body"> <div class="row ' + dynamic_topicpanel + '"><div class="col-12 mb-3">Title:' + bind_topicTitle + '</div>' + topicDescriptionImage + '<div id="main" style="width: 210px; height: 100px;text-align: center"><img src="' + knowledgeZoneData.topicData[j].DescriptionImage + '"height="100"  width="180"/></div>' + questiondata + '<div class="col-12 actionDiv"><button onmouseenter="mouseEnter(\'Edit the question using this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-success" onclick="editTopic(' + j + ')">Edit</button><button onmouseenter="mouseEnter(\'In case if you wish to roll-back the changes without saving them, press this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-danger" onclick="deleteTopic(' + j + ')" data-toggle="modal" data-target="#deleteTopicConfirmationModal">Delete</button></div></div></div></div></div>';
      } else {
        var topic_details = '<div class="card topicAccordion" id="divGroup' + bind_topicNum + '"> <div class="card-header" id="heading' + bind_topicNum + '"> <h3 class="mb-0"> <button onclick="closeAddTopicAccordion(' + j + ')" id="top' + bind_topicNum + '" class="btn btn-link topicDiv" data-toggle="collapse" data-target="#collapseTopic' + bind_topicNum + '" aria-expanded="true" aria-controls="collapse' + bind_topicNum + '"> <i class="fa" aria-hidden="true"></i> Topic <span>' + (j + 1) + '</span> </button> </h3></div><div id="collapseTopic' + bind_topicNum + '" class="collapse" aria-labelledby="heading' + bind_topicNum + '" data-parent="#topicaccordion"><div class="card-body"> <div class="row ' + dynamic_topicpanel + '"><div class="col-12 mb-3">Title:' + bind_topicTitle + '</div>' + questiondata + '<div class="col-12 actionDiv"><button onmouseenter="mouseEnter(\'Edit the question using this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-success" onclick="editTopic(' + j + ')">Edit</button><button onmouseenter="mouseEnter(\'In case if you wish to roll-back the changes without saving them, press this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-danger" onclick="deleteTopic(' + j + ')" data-toggle="modal" data-target="#deleteTopicConfirmationModal">Delete</button></div></div></div></div></div>';
      }
    } else {
      var topic_details = '<div class="card topicAccordion" id="divGroup' + bind_topicNum + '"> <div class="card-header" id="heading' + bind_topicNum + '"> <h3 class="mb-0"> <button onclick="closeAddTopicAccordion(' + j + ')" id="top' + bind_topicNum + '" class="btn btn-link topicDiv" data-toggle="collapse" data-target="#collapseTopic' + bind_topicNum + '" aria-expanded="true" aria-controls="collapse' + bind_topicNum + '"> <i class="fa" aria-hidden="true"></i> Topic <span>' + (j + 1) + '</span> </button> </h3></div><div id="collapseTopic' + bind_topicNum + '" class="collapse" aria-labelledby="heading' + bind_topicNum + '" data-parent="#topicaccordion"><div class="card-body"> <div class="row ' + dynamic_topicpanel + '"><div class="col-12 mb-3">Title:' + bind_topicTitle + '</div>' + topicDescription + questiondata + '<div class="col-12 actionDiv"><button onmouseenter="mouseEnter(\'Edit the question using this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-success" onclick="editTopic(' + j + ')">Edit</button><button onmouseenter="mouseEnter(\'In case if you wish to roll-back the changes without saving them, press this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-danger" onclick="deleteTopic(' + j + ')" data-toggle="modal" data-target="#deleteTopicConfirmationModal">Delete</button></div></div></div></div></div>';
    }
    $("#topicaccordion").append(topic_details);

  }

}

function editTopic(id) {
  descriptionImagePath = "";
  videoPath = "";
  
  isEdit=true;

  newtopic = false;

  $("#questionValidation").addClass("hidden");
  $("#topicTitleValidation").addClass("hidden");

  $("#option1Validation").addClass("hidden");
  $("#option2Validation").addClass("hidden");
  $("#validOption").addClass("hidden");

  $("#questionSidenav").scrollTop(0);
  $("#addTopicCardDiv").removeClass('display-none');
  $("#addTopic").addClass('display-none');
  $("#addTopic2").addClass('display-none');
  $("#saveTopic").removeClass('display-none');
  $("#saveTopic1").removeClass('display-none');
  $("#cancelTopic").removeClass('display-none');
  $("#cancelTopic1").removeClass('display-none');
  $("#topicAccordion").removeClass('show');
  $("#addTopicDivCollapse").addClass('show');
  $("#addQuestionDivCollapse").removeClass('show');
  $("#collapse1").addClass('show');

  $("#accordion > div").remove();
  editTopicId = id;

  var data = knowledgeZoneData.topicData;

  $("#topicTitle").val(data[id].Name);
  if (data[id].Name != "" && data[id].Name != null && data[id].Name != undefined) {
    $("#topicTitle").val(data[id].Name);
    $('#titlecharcount').text(data[id].Name.length);
  }

  
  $('#displaytopictitle').html("Topic " + (id + 1));
  $('#displayquestiontitle').html("Add Question");
  if (data[id].DescriptionType == "image") {
    document.getElementById("typeDropDownID").selectedIndex = "1";
    var descriptionimg = document.getElementById('uploadedimg');
    if (data[id].DescriptionImage != "") {
      descriptionimg.setAttribute("src", data[id].DescriptionImage);

      $("#uploadedimgdiv").removeClass('display-none');

      $("#descriptionInImage").removeClass("active-story");
      $("#descriptionInText").addClass("active-story");


      if (data[id].DescriptionImage != "" && data[id].DescriptionImage != null && data[id].DescriptionImage != undefined) {
        var imgNameLbl = document.getElementById('customImageLabel');
        var imgName = returnAssetName(data[id].DescriptionImage);
        imgNameLbl.innerText = imgName;
      }
    }


  } else {
    document.getElementById("typeDropDownID").selectedIndex = "0";

    var descriptionimg = document.getElementById('uploadedimg');
    descriptionimg.setAttribute("src", "");

    $("#uploadedimgdiv").addClass('display-none');


    $("#descriptionInText").removeClass("active-story");
    $("#descriptionInImage").addClass("active-story");
    if (data[id].Description != "" && data[id].Description != null && data[id].Description != undefined) {
      $("#topicDescription").val(data[id].Description);
    }
    $('#descriptioncharcount').text(data[id].Description.length);

  }
  $("#customFileVideo").val(data[id].videoUrl);
  if (data[id].videoUrl != "" && data[id].videoUrl != null && data[id].videoUrl != undefined) {
    var videoNameLbl = document.getElementById('customLabelVideo');
    var videoName = returnAssetName(data[id].videoUrl);
    videoNameLbl.innerText = videoName;

  }


  data = knowledgeZoneData.topicData[id].questionData;
  questionDetails = knowledgeZoneData.topicData[id].questionData;
  questionCount=data.length;
  for (i = 0; i < data.length; i++) {
    var bind_questionNum = (i + 1);
    var bind_questionText = data[i].Question;
    var bind_options = data[i].Options;
    var bind_answer = data[i].Answer;
    var bind_reenforcement = data[i].Reenforcement_feedback;
    var bind_corrective = data[i].Corrective_feedback;
    var dynamic_panel = "panel" + bind_questionNum;

    var answer_data = '<div class="row"><div class="col-12">Answer: ' + bind_answer + '</div></div>';
    var feedback_data = '<div class="row"><div class="col-12">Reinforcement Feedback: ' + bind_reenforcement + '</div></div><div class="row"><div class="col-12">Corrective Feedback: ' + bind_corrective + '</div></div>';

    var optionData = '';

    for (j = 0; j < bind_options.length; j++) {
      var tempData = '<div class="col-6"><span>' + (j + 1) + ' . </span><span>' + bind_options[j].option + '</span></div>'
      optionData = optionData.concat(tempData);
    }
    var accordionData = '<div class="card questionAccordion" id="divGroup' + bind_questionNum + '"> <div class="card-header" id="heading' + bind_questionNum + '"> <h3 class="mb-0"> <button id="que' + bind_questionNum + '" class="btn btn-link queDiv" data-toggle="collapse" data-target="#collapse' + bind_questionNum + '" aria-expanded="true" aria-controls="collapse' + bind_questionNum + '"> <i class="fa" aria-hidden="true"></i> Question <span>' + bind_questionNum + '</span> </button> </h3> </div> <div id="collapse' + bind_questionNum + '" class="collapse" aria-labelledby="heading' + bind_questionNum + '" data-parent="#accordion"> <div class="card-body"> <div class="row ' + dynamic_panel + '"><div class="col-12">' + bind_questionText + '</div>' + optionData + '</div> ' + answer_data + feedback_data + '<div class="row"><div class="col-12 actionDiv"><button onmouseenter="mouseEnter(\'Edit the question using this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-success" onclick="editQuestion(' + data[i].Id + ','+bind_questionNum+')">Edit</button><button onmouseenter="mouseEnter(\'In case if you wish to roll-back the changes without saving them, press this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-danger" onclick="deleteQuestion(' + data[i].Id + ')" >Delete</button></div></div></div></div></div>';

    $("#accordion").append(accordionData);
  }
  selectDescriptionType()
  checkSaveQuestion = false;

}

function saveTopic() {
  
  isEdit=false;
  if (!$("#topicTitle").val().replace(/\s/g, '').length || $("#topicTitle").val() == "" || $("#topicTitle").val() == null || $("#topicTitle").val() == undefined) {
    $("#topicTitleValidation").removeClass("hidden");
    $("#questionSidenav").scrollTop(10);
    return;
  }
  if (questionDetails == 0) {

    $("#topicTitleValidation").addClass("hidden");
    $("#option1Validation").addClass("hidden");
    $("#option2Validation").addClass("hidden");
    $("#validOption").addClass("hidden");
    popSnackbar('warning', "At least one question should be added.");
  } else {
    checkSaveQuestion=false;
    popSnackbar("success", "Topic "+(editTopicId+1)+ " saved.");

    var title = $("#topicTitle").val();
    knowledgeZoneData.topicData[editTopicId].Name = title;

    var DropDownValue = document.getElementById("typeDropDownID");
    selectedType = DropDownValue.options[DropDownValue.selectedIndex].value;
    knowledgeZoneData.topicData[editTopicId].DescriptionType = selectedType;

    if (selectedType == "image") {
      knowledgeZoneData.topicData[editTopicId].Description = "";
      if (descriptionImagePath != "") {
        knowledgeZoneData.topicData[editTopicId].DescriptionImage = descriptionImagePath;
      }
    } else {
      knowledgeZoneData.topicData[editTopicId].DescriptionImage = "";
      var description = $("#topicDescription").val();
      knowledgeZoneData.topicData[editTopicId].Description = description;
    }

    if (videoPath != "") {

      knowledgeZoneData.topicData[editTopicId].videoUrl = videoPath;
    }
    knowledgeZoneData.topicData[editTopicId].questionData = questionDetails;

    questionDetails = [];
    $("#topicTitle").val('');
    $('#titlecharcount').text('0');
    $("#topicDescription").val('');
    $('#descriptioncharcount').text('0');
    var videoNameLbl = document.getElementById('customLabelVideo');
    videoNameLbl.innerText = "Choose Video";

    var descriptionimg = document.getElementById('uploadedimg');
    descriptionimg.setAttribute("src", "");


    var imgNameLbl = document.getElementById('customImageLabel');
    imgNameLbl.innerText = "Choose Description Image";

    document.getElementById("typeDropDownID").selectedIndex = "0";

    $("#descriptionInText").removeClass("active-story");
    $("#descriptionInImage").addClass("active-story");

    $("#uploadedimgdiv").addClass('display-none');


    $("#addTopic").removeClass('display-none');
    $("#addTopic2").removeClass('display-none');
    $("#saveTopic").addClass('display-none');
    $("#saveTopic1").addClass('display-none');
    $("#cancelTopic").addClass('display-none');
    $("#cancelTopic1").addClass('display-none');

    generateTopicAccordion();
    $("#accordion > div").remove();
    $("#addQuestionDivCollapse").addClass('show');
    $("#questionTextarea").val('');
    $("#option1").val('');
    $("#option2").val('');
    $("#option3").val('');
    $("#option4").val('');
    $('#questioncharcount').text('0');
    $("#option1charcount").text('0');
    $("#option2charcount").text('0');
    $("#option3charcount").text('0');
    $("#option4charcount").text('0');
    $('#displaytopictitle').html("Add Topic");
    $('#displayquestiontitle').html("Add Question");
    newtopic = true;

  }
}

function cancelTopic() {
  
  isEdit=false;
  questionCount = knowledgeZoneData.topicData[editTopicId].questionData.questionLength;
  if (questionCount == 0) {

    $("#topicTitleValidation").addClass("hidden");


    $("#option1Validation").addClass("hidden");
    $("#option2Validation").addClass("hidden");
    $("#validOption").addClass("hidden");
    popSnackbar('warning', "At least one question should be added.");
  } else {
    $("#accordion > div").remove();
    $("#addTopicDivCollapse").removeClass("show");
    $("#topicTitle").val('');
    $('#titlecharcount').text('0');
    $("#topicDescription").val('');
    $('#descriptioncharcount').text('0');
    var videoNameLbl = document.getElementById('customLabelVideo');
    videoNameLbl.innerText = "Choose Video";
    $("#questionTextarea").val('');
    var imgNameLbl = document.getElementById('customImageLabel');
    imgNameLbl.innerText = "Choose Description Image";

    var descriptionimg = document.getElementById('uploadedimg');
    descriptionimg.setAttribute("src", "");

    document.getElementById("typeDropDownID").selectedIndex = "0";

    $("#descriptionInText").removeClass("active-story");
    $("#descriptionInImage").addClass("active-story");
    $("#uploadedimgdiv").addClass('display-none');
    $("#option1").val('');
    $("#option2").val('');
    $("#option3").val('');
    $("#option4").val('');
    $('#questioncharcount').text('0');
    $("#option1charcount").text('0');
    $("#option2charcount").text('0');
    $("#option3charcount").text('0');
    $("#option4charcount").text('0');
    $('#correctivecharcount').text("0");
    $('#reenforcecharcount').text("0");
    $("#Reenforcement_Feedback").val('');
    $("#Corrective_Feedback").val('');
    var data = [];
    $("#answerMultiSelect").val(data);
    $("#answerMultiSelect").multiselect("refresh");
    $("#answerMultiSelect").multiselect("disable");

    $("#addTopic").removeClass('display-none');
    $("#addTopic2").removeClass('display-none');
    $("#saveTopic").addClass('display-none');
    $("#saveTopic1").addClass('display-none');
    $("#cancelTopic").addClass('display-none');
    $("#cancelTopic1").addClass('display-none');
    $("#addQuestion").removeClass('display-none');
    $("#saveQuestion").addClass('display-none');
    $("#cancelQuestion").addClass('display-none');
    questionCount=0
    questionDetails=[]
    generateTopicAccordion();
    $('#displaytopictitle').html("Add Topic");
    $('#displayquestiontitle').html("Add Question");
  }
}

function closeAddTopicAccordion(index) {
  $("#addTopicDivCollapse").removeClass('show');

  setTopicDataToScreen(index);
}

function createTopicPanel(id, y) {
  var checkifexists = document.getElementById('topic' + id);


  if (checkifexists == "" || checkifexists == null) {
    var scene = document.querySelector('a-scene');

    var topicPanel = document.createElement('a-text');
    topicPanel.setAttribute("text", "font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;anchor:center;width:3;value:Topic1;height:3.5;tabSize:1;color:#fff;wrapCount:30;zOffset:0.081;align:center;letterSpacing:1");
    topicPanel.setAttribute("id", 'topic' + id);
    topicPanel.setAttribute("value", "");
    topicPanel.setAttribute("value", (knowledgeZoneData.topicData[id].Name));

    topicPanel.setAttribute("position", "3.507 " + y + " 7.18241");
    topicPanel.setAttribute("rotation", "0 180 0");
    topicPanel.setAttribute("scale", "1.45 1 1");
    scene.appendChild(topicPanel);

    var panel = document.getElementById(id);
    panel.setAttribute("topic-click", "");
    panel.setAttribute("visible", "true");
    panel.setAttribute("sound", "volume:1");
    
  } else {
    checkifexists.setAttribute("value", "");
    checkifexists.setAttribute("value", (knowledgeZoneData.topicData[id].Name));

  }
}

AFRAME.registerComponent('topic-click', {
  schema: {
    default: ''
  },
  init() {
    this.el.addEventListener('click', () => {

      isClicked = true;
      $("#messageDivCollapse").removeClass("show");
      document.getElementById('blip1').play();

      for (i = 0; i < knowledgeZoneData.topicData.length; i++) {

        if (this.el.id == i) {
          var panel = document.getElementById("topic" + i);
          panel.setAttribute("text", "font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;anchor:center;width:3;height:3.5;tabSize:1;color:#000f85;wrapCount:30;zOffset:0.081;align:center;letterSpacing:1");

        } else {
          var panel = document.getElementById("topic" + i);
          panel.setAttribute("text", "font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;anchor:center;width:3;height:3.5;tabSize:1;color:#fff;wrapCount:30;zOffset:0.081;align:center;letterSpacing:1");
        }
      }
      var title = document.getElementById('topicTitle1');
      var titleDescription = document.getElementById('topicDescription1');
      var titleDescriptionImage = document.getElementById('topicDescriptionImage1');

      title.setAttribute("visible", "true");
      titleDescriptionImage.setAttribute("visible", "false");
      if (knowledgeZoneData.topicData.length > this.el.id) {
        if (knowledgeZoneData.topicData[this.el.id].DescriptionType == "image") {
          if (knowledgeZoneData.topicData[this.el.id].DescriptionImage != "") {
            titleDescriptionImage.setAttribute("src", knowledgeZoneData.topicData[this.el.id].DescriptionImage);
            titleDescriptionImage.setAttribute("visible", "true");
          }
          titleDescription.setAttribute('text', 'value:');
          titleDescription.setAttribute("visible", "false");
        } else {
          titleDescription.setAttribute("visible", "true");
          titleDescription.setAttribute("text", 'value:' + (knowledgeZoneData.topicData[this.el.id].Description));
          titleDescriptionImage.setAttribute("src", "");
        }

        title.setAttribute("text", 'value:' + (knowledgeZoneData.topicData[this.el.id].Name));
        
        
        toggleSideNav('questionSidenav');
        $("#addTopicDivCollapse").removeClass("show");
        
        for (i = 0; i < topicCount; i++) {
          if (this.el.id == i) {
            $("#collapseTopic" + this.el.id).addClass("show");

          } else {
            $("#collapseTopic" + i).removeClass("show");
          }
        }
      }
    });
  }
});

AFRAME.registerComponent('open-add-topic', {
  schema: {
    default: ''
  },
  init() {
    this.el.addEventListener('click', () => {
      toggleSideNav('questionSidenav');
      $("#messageDivCollapse").removeClass("show");
      $("#addTopicDivCollapse").addClass("show");
    });
  }
});

function setSettingsAccordion() {

  $("#cuberoom-texture").attr("src", knowledgeZoneData.Background_theme);
  var cuberoom = document.querySelector('#cuberoom');
  cuberoom.setAttribute('material', 'src: #');
  cuberoom.setAttribute('material', 'src: #cuberoom-texture');

  $(".bgThemeDiv > img").removeClass("selected-theme");
  var str = knowledgeZoneData.Background_theme;
  var res = str.split("/");
  var text = res[res.length - 1];
  var left_text = text.substring(0, text.indexOf("."));
  $("#" + left_text).addClass("selected-theme");

  if (knowledgeZoneData.Background_audio == "" || knowledgeZoneData.Background_audio == undefined) {
    audiolbl.innerText = "Choose Background Audio";

  } else {
    var audiopath = returnAssetName(knowledgeZoneData.Background_audio);
    audiolbl.innerText = audiopath;
  }
  $("#HeaderMessage").val(knowledgeZoneData.Heading_Message);
  $("#topicInstruction").val(knowledgeZoneData.Topic_Instruction);

  if (knowledgeZoneData.Success_Message) {
    $("#SubheaderMessage").val(knowledgeZoneData.Success_Message);
  } else {
    $("#SubheaderMessage").val("Wow! You'v done it!");
  }
  if (knowledgeZoneData.Failuer_Message) {
    $("#failuerMessage").val(knowledgeZoneData.Failuer_Message);
  } else {
    $("#failuerMessage").val("Oops! Better luck next time!");
  }
  if (knowledgeZoneData.Passing_Percentage) {
    $("#passingPercentage").val(knowledgeZoneData.Passing_Percentage);
  } else {
    $("#passingPercentage").val(0);
  }
  if (knowledgeZoneData.Single_Topic_Completed_Message) {
    $("#singleTopicMessage").val(knowledgeZoneData.Single_Topic_Completed_Message);
  } else {
    $("#singleTopicMessage").val("Great!!Choose the next topic");
  }
  if (knowledgeZoneData.All_Topic_Completed_Message) {
    $("#quizCompletedMessage").val(knowledgeZoneData.All_Topic_Completed_Message);
  } else {
    $("#quizCompletedMessage").val("You have successfully done with all the quiz");
  }

  $("#message").val(knowledgeZoneData.message);
  $("#EndMessage").val(knowledgeZoneData.End_Message);

  var scoreWallLbl = document.getElementById('score-wall-imagelabel');

  if (knowledgeZoneData.window_wall.Logo) {

    var scoreimage = document.getElementById("score-screen-default-image");
    scoreimage.setAttribute("src", knowledgeZoneData.window_wall.Logo);
    var scoreWallImageName = returnAssetName(knowledgeZoneData.window_wall.Logo);
    scoreWallLbl.innerText = scoreWallImageName;
  } else {
    scoreWallLbl.innerText = "Choose Image";
  }

  var startquizLbl = document.getElementById("StartQuizImageLabel");
  if (knowledgeZoneData.Start_Quiz_Button_Image) {
    var startQuizimage = document.getElementById("startQuiz");
    startQuizimage.setAttribute("src", knowledgeZoneData.Start_Quiz_Button_Image);
    var startQuizImageName = returnAssetName(knowledgeZoneData.Start_Quiz_Button_Image);
    startquizLbl.innerText = startQuizImageName;
  }




  var topicheadingLbl = document.getElementById("topic-wall-logoLabel");
  if (knowledgeZoneData.Topic_Wall_Heading_Logo) {
    var topicWallHeading = document.getElementById("topic-WallHeadingimage");
    topicWallHeading.setAttribute("src", knowledgeZoneData.Topic_Wall_Heading_Logo);
    var startQuizImageName = returnAssetName(knowledgeZoneData.Topic_Wall_Heading_Logo);
    topicheadingLbl.innerText = startQuizImageName;

  }
  var quizLbl = document.getElementById('quiz-wall-logoLabel');
  if (knowledgeZoneData.Quiz_Wall_Heading_Logo) {
    var quizWallHeading = document.getElementById("quiz-WallHeading");
    quizWallHeading.setAttribute("src", knowledgeZoneData.Quiz_Wall_Heading_Logo);
    var quizImageName = returnAssetName(knowledgeZoneData.Quiz_Wall_Heading_Logo);
    quizLbl.innerText = quizImageName;
  }
  var mediaLbl = document.getElementById('media-wall-logoLabel');
  if (knowledgeZoneData.Media_Wall_Heading_Logo) {
    var mediaWallHeading = document.getElementById("media-WallHeading");
    mediaWallHeading.setAttribute("src", knowledgeZoneData.Media_Wall_Heading_Logo);
    var mediaImageName = returnAssetName(knowledgeZoneData.Media_Wall_Heading_Logo);
    mediaLbl.innerText = mediaImageName;
  }
  var scoreLbl = document.getElementById('score-wall-logolabel');
  if (knowledgeZoneData.Score_Wall_Heading_Logo) {
    var scoreWallHeading = document.getElementById("score-WallHeading");
    scoreWallHeading.setAttribute("src", knowledgeZoneData.Score_Wall_Heading_Logo);
    var scoreImageName = returnAssetName(knowledgeZoneData.Score_Wall_Heading_Logo);
    scoreLbl.innerText = scoreImageName;
  }
  $('input:radio[name="right"]').filter('[value="' + knowledgeZoneData.Show_right_answer + '"]').attr('checked', true);
  $('input:radio[name="score"]').filter('[value="' + knowledgeZoneData.Show_score_at_end + '"]').attr('checked', true);
  $('input:radio[name="seeVideo"]').filter('[value="' + knowledgeZoneData.seeVideo + '"]').attr('checked', true);
  $("#lunchScreenText").val(knowledgeZoneData.launch_text);
}



function deleteTopicPanel(data) {
  var scene = document.querySelector('a-scene');


  var title = document.getElementById('topicTitle1');
  var titleDescription = document.getElementById('topicDescription1');
  var titleDescriptionImage = document.getElementById('topicDescriptionImage1');

  title.setAttribute("text", 'value:');
  titleDescription.setAttribute("text", 'value:');
  titleDescriptionImage.removeAttribute("src");
  titleDescriptionImage.setAttribute("visible", "false");

  for (let i = 0; i < data.length; i++) {
    var checkifexists = document.getElementById('topic' + i);

    if (checkifexists != "" && checkifexists != null) {
      scene.removeChild(checkifexists);
      $('#displaytopictitle').html("Add Topic");
    }
  }

  var woodenbtn = document.getElementById("" + (data.length - 1));
  woodenbtn.setAttribute("visible", "false");
}

function setTopicDataToScreen(index) {
  for (i = 0; i < knowledgeZoneData.topicData.length; i++) {

    if (index == i) {
      var panel = document.getElementById("topic" + i);
      panel.setAttribute("text", "font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;anchor:center;width:3;height:3.5;tabSize:1;color:#000f85;wrapCount:30;zOffset:0.081;align:center;letterSpacing:1");

    } else {
      var panel = document.getElementById("topic" + i);
      panel.setAttribute("text", "font: https://cdn.aframe.io/fonts/Exo2Bold.fnt;anchor:center;width:3;height:3.5;tabSize:1;color:#fff;wrapCount:30;zOffset:0.081;align:center;letterSpacing:1");
    }
  }

  var title = document.getElementById('topicTitle1');
  var titleDescription = document.getElementById('topicDescription1');
  var titleDescriptionImage = document.getElementById('topicDescriptionImage1');
  title.setAttribute("visible", "true");
  titleDescriptionImage.setAttribute("visible", "false");
  if (knowledgeZoneData.topicData.length > index) {
    if (knowledgeZoneData.topicData[index].DescriptionType == "image") {
      if (knowledgeZoneData.topicData[index].DescriptionImage != "") {
        titleDescriptionImage.setAttribute("src", knowledgeZoneData.topicData[index].DescriptionImage);
        titleDescriptionImage.setAttribute("visible", "true");
      }
      titleDescription.setAttribute("text", 'value:');
    } else {
      titleDescription.setAttribute("visible", "true");
      titleDescription.setAttribute("text", 'value:' + knowledgeZoneData.topicData[index].Description);
      titleDescriptionImage.setAttribute("src", "");

    }

    title.setAttribute("text", 'value:' + (knowledgeZoneData.topicData[index].Name));

  }

}

function addNewTopic() {
  var DropDownValue = document.getElementById("typeDropDownID");
  selectedType = DropDownValue.options[DropDownValue.selectedIndex].value;
  var videoNameLbl = document.getElementById('customLabelVideo');
  if (validOption == false) {

    if (!$("#topicTitle").val().replace(/\s/g, '').length || $("#topicTitle").val() == "" || $("#topicTitle").val() == null || $("#topicTitle").val() == undefined) {
      $("#topicTitleValidation").removeClass("hidden");
      $("#questionSidenav").scrollTop(10);
      return;
    }

  }
  if (questionDetails.length == 0) {
    $("#topicTitleValidation").addClass("hidden");
    $("#option1Validation").addClass("hidden");
    $("#option2Validation").addClass("hidden");
    $("#validOption").addClass("hidden");
    popSnackbar('warning', "At least one question should be added.");
  } else {
    var title = $("#topicTitle").val();

    var description = $("#topicDescription").val();


    topicData = {
      "id": "" + topicCount,
      "Name": title,
      "Description": description,
      "videoUrl": videoPath,
      "DescriptionType": selectedType,
      "DescriptionImage": descriptionImagePath,
      "questionData": questionDetails
    }

    topicCount += 1;
    knowledgeZoneData["topicData"].push(topicData);
    questionDetails = [];


    $("#topicTitle").val('');
    $('#titlecharcount').text('0');
    $("#topicDescription").val('');
    $('#descriptioncharcount').text('0');
    var videoNameLbl = document.getElementById('customLabelVideo');
    videoNameLbl.innerText = "Choose Video";
    $("#questionTextarea").val('');
    var imgNameLbl = document.getElementById('customImageLabel');
    imgNameLbl.innerText = "Choose Description Image";

    var descriptionimg = document.getElementById('uploadedimg');
    descriptionimg.setAttribute("src", "");

    document.getElementById("typeDropDownID").selectedIndex = "0";

    $("#descriptionInText").removeClass("active-story");
    $("#descriptionInImage").addClass("active-story");
    $("#uploadedimgdiv").addClass('display-none');

    $("#option1").val('');
    $("#option2").val('');
    $("#option3").val('');
    $("#option4").val('');
    $('#questioncharcount').text('0');
    $("#option1charcount").text('0');
    $("#option2charcount").text('0');
    $("#option3charcount").text('0');
    $("#option4charcount").text('0');
    $("#answerSelect").val('0');
    $('#correctivecharcount').text("0");
    $('#reenforcecharcount').text("0");
    $("#Reenforcement_Feedback").val('');
    $("#Corrective_Feedback").val('')
    var data = [];
    $("#answerMultiSelect").val(data);
    $("#answerMultiSelect").multiselect("refresh");
    $("#answerMultiSelect").multiselect("disable");



    $("#questionValidation").addClass("hidden");

    $("#topicTitleValidation").addClass("hidden");

    $("#option1Validation").addClass("hidden");
    $("#option2Validation").addClass("hidden");
    $("#validOption").addClass("hidden");

    generateTopicAccordion();

    $("#accordion > div").remove();
    $("#questionSidenav").scrollTop(0);
    $("#addQuestionDivCollapse").addClass("show");


    popSnackbar("success", "Question "+ (topicCount)+" saved.");
  }

  descriptionImagePath = "";
  videoPath = "";
}

AFRAME.registerComponent('open-browse-image', {
  init: function () {
    this.el.addEventListener("click", function () {
      toggleSideNav("wallSidenav");
      $("#topic-wall-logoLabel").removeClass(
        "background-color-forestgreen"
      );
      $("#quiz-wall-logoLabel").removeClass(
        "background-color-forestgreen"
      );
      $("#media-wall-logoLabel").removeClass(
        "background-color-forestgreen"
      );
      $("#score-wall-logolabel").removeClass(
        "background-color-forestgreen"
      );
      $("#score-wall-imagelabel").removeClass(
        "background-color-forestgreen"
      );
      
      if ($("#collapseOne").hasClass("show")) {
        $("#collapseOne").removeClass("show");
      }
      if ($("#collapseTwo").hasClass("show")) {
        $("#collapseTwo").removeClass("show");
      }
      if ($("#collapseThree").hasClass("show")) {
        $("#collapseThree").removeClass("show");
      }
      if ($("#collapseFour").hasClass("show")) {
        $("#collapseFour").removeClass("show");
      }


      var clickedImageId = this.id;
      clickedImageId = clickedImageId.split("-");
      if (clickedImageId[0] == "score") {
        $("#collapseOne").addClass("show");
        if(clickedImageId=="score-WallHeading"){
          $("#score-wall-logolabel").addClass(
          "background-color-forestgreen"
        );
        }else{
          $("#score-wall-imagelabel").addClass(
            "background-color-forestgreen"
          );
        }
      } else if (clickedImageId[0] == "media") {
        $("#collapseTwo").addClass("show");
        $("#media-wall-logoLabel").addClass(
          "background-color-forestgreen"
        );
      } else if (clickedImageId[0] == "quiz") {
        $("#collapseThree").addClass("show");
        $("#quiz-wall-logoLabel").addClass(
          "background-color-forestgreen"
        );
      } else if (clickedImageId[0] == "topic") {
        $("#collapseFour").addClass("show");
        $("#topic-wall-logoLabel").addClass(
          "background-color-forestgreen"
        );
      }

    });
  }
});

function showOnScreen() {
  $('#topicInstruction').val($('#topicInstruction').val().replace(/\n/g," "));
  var instructionsText = (document.getElementById("topicInstruction")).value;
  var instructions = document.getElementById("topicsPanel");
  instructions.setAttribute("text", "value:" + instructionsText);
}

function checkSelectedOption() {
  selections = false;
  $("#answerMultiSelect option:selected").each(function () {
    selections = true;
    selectedValue = $(this).val();
  });
  if (selections == true) {
    validOption = true;
    var option = $("#option" + selectedValue).val();
    if (option == "" || option == null || option == undefined) {
      selections = false;
      validOption = false;
      var data = [];
      $("#answerMultiSelect").val(data);
      $("#answerMultiSelect").multiselect("refresh");
      $("#validOption").removeClass("hidden");
      validOption = false;
    } else {
      $("#validOption").addClass("hidden");
    }
  } else {
    validOption = false;
  }
}

function ontextChange(event, len) {
  var txtLength = event.value.length;
  var id = event.id;
  if (id == "topicDescription") {
    $('#descriptioncharcount').text(txtLength);
    if (txtLength >= len) {
      popSnackbar('warning', "Limit exceed.");
    }
  } else if (id == "questionTextarea") {
    $('#questioncharcount').text(txtLength);
    if (txtLength >= len) {
      popSnackbar('warning', "Limit exceed.");
    }
  } else if (id == "option1") {
    $('#option1charcount').text(txtLength);
    if (txtLength >= len) {
      popSnackbar('warning', "Limit exceed.");
    }
  } else if (id == "option2") {
    $('#option2charcount').text(txtLength);
    if (txtLength >= len) {
      popSnackbar('warning', "Limit exceed.");
    }
  } else if (id == "option3") {
    $('#option3charcount').text(txtLength);
    if (txtLength >= len) {
      popSnackbar('warning', "Limit exceed.");
    }
  } else if (id == "option4") {
    $('#option4charcount').text(txtLength);
    if (txtLength >= len) {
      popSnackbar('warning', "Limit exceed.");
    }
  } else if (id == "topicTitle") {
    $('#titlecharcount').text(txtLength);
    if (txtLength >= len) {
      popSnackbar('warning', "Limit exceed.");
    }
  } else if (id == "Reenforcement_Feedback") {
    $('#reenforcecharcount').text(txtLength);
    if (txtLength >= len) {
      popSnackbar('warning', "Limit exceed.");
    }
  } else if (id == "Corrective_Feedback") {
    $('#correctivecharcount').text(txtLength);
    if (txtLength >= len) {
      popSnackbar('warning', "Limit exceed.");
    }
  }

}
function pasteText(element,size) {
  setTimeout(function(){
    ontextChange(element,size)
}, 0);
}


