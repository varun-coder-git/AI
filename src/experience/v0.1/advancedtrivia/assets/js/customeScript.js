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
var splashImagePath;
var elementToUpdate;
var westWallImagePath;
var westWallVideoPath;
var eastWallImagePath;
var eastWallVideoPath;
var Lights;
var backgroundAudioPath = "";
var LoopAns = "Indefinite";
var checkSaveQuestion = false;
var questiondisplayed = false;
AFRAME.registerComponent("select-on-mouseclick", {
  init: function () {
    this.el.addEventListener("click", function () {
      this.setAttribute("clicked", this.el);
    });
  },
});

function initializeCustomization(experienceToCustomize) {
  quizData = JSON.parse(experienceToCustomize);

  Lights = document.getElementById("loopDropDownID");
  for (var i = 0; i < Lights.options.length; i++) {
    if (Lights.options[i].text == quizData.Background_audio_loop) {
      Lights.options[i].selected = true;
      LoopAns = Lights.options[Lights.selectedIndex].text;
      quizData.Background_audio_loop = LoopAns;
      break;
    }
  }
  if (quizData.launch_text) {
    document.getElementsByClassName("lunchScreenText").value =
      quizData.launch_text;
    $(".lunchScreenText").summernote("code", quizData.launch_text);

    var lauchText = $(".lunchScreenText");
    var div = document.createElement("div");
    div.innerHTML = lauchText[0].value;
    var plainText = div.textContent || div.innerText || "";
    var maxLength = 350;
    $("#maxCount").text(plainText.length);
  }
  if (quizData.splash_image) {
    splashImagePath = quizData.splash_image;
    var splashLbl = document.getElementById("splashImageLable");
    var path = returnAssetName(splashImagePath);
    splashLbl.children[0].innerText = path;

    // var splashImageName = splashImagePath.split("/")[splashImagePath.split("/").length-1];
    // $("#splashImageLable").text(splashImageName);
  }
  if (quizData.splash_instruction) {
    document.getElementsByClassName("instructionSetForDesktop").value =
      quizData.splash_instruction;
    $(".instructionSetForDesktop").summernote("code", quizData.splash_instruction);
  }
  if (quizData.splash_android_instruction) {
    document.getElementsByClassName("instructionSetForAndroid").value = quizData.splash_android_instruction;
    $('.instructionSetForAndroid').summernote('code', quizData.splash_android_instruction);
  }
  if (quizData.splashBackgroundColor) {
    var splashBackground = document.getElementById("splashBackground");
    splashBackground.value = quizData.splashBackgroundColor;
    splashBackground.style.backgroundColor = splashBackground.value;
  } else {
    var splashBackground = document.getElementById("splashBackground");
    splashBackground.style.backgroundColor = "#8F8F8F";
    splashBackground.value = "#8F8F8F";
  }
  if (quizData.Opacity) {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = quizData.Opacity;
    var displayvalue = "(" + Math.round(opacity.value * 100) + "%)";
    document.getElementById("rangeValue").innerText = displayvalue;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  } else {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = fixOpacity;
    var displayvalue = "(" + Math.round(fixOpacity * 100) + "%)";
    document.getElementById("rangeValue").innerText = displayvalue;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  }
  if (quizData.splashHeaderColor) {
    var splashHeaderColor = document.getElementById("splashHeaderColor");
    splashHeaderColor.value = quizData.splashHeaderColor;
    splashHeaderColor.style.backgroundColor = splashHeaderColor.value;
  }
  if (quizData["entry_view"]) {
    $("#CamEntity").attr("rotation", quizData["entry_view"]);
  }
  setQuiz();
  clearDefaultImageValue();
}

function setEntryView() {
  if ($("#freezeView").hasClass("disabled")) {
    //Nothing to do here
  } else {
    var cam = document.querySelector("[camera]");
    var pos = cam.getAttribute("rotation");
    var posY = "0";
    if (quizData["entry_view"]) {
      posY = quizData["entry_view"].split(" ")[1];
    }
    quizData["entry_view"] = "0 " + (pos.y + parseInt(posY)) + " 0";
    // quizData["entry_view"] = "0 0 0";
    //quizData["entry_view"] = (pos.x) + " " + (pos.y + parseInt(posY)) + " 0";
    $("#freezeView").addClass("disabled");
    $("#freezeView").click(
      toastr.success(
        "Presto! This view is now the Launch View of this Experience."
      )
    );
  }
}

AFRAME.registerComponent("mousedrag", {
  init: function () {
    this.el.addEventListener("mouseup", function () {
      $("#freezeView").removeClass("disabled");
    });
  },
});

AFRAME.registerComponent("open-existing-question", {
  init: function () {
    this.el.addEventListener("click", function () {
      var sidenavList = document.getElementsByClassName("sidenav");
      [].forEach.call(sidenavList, function (navigation) {
        if (navigation.classList.contains('active') && navigation.id != "questionSidenav")
          navigation.classList.remove('active');
      });

      document.getElementById("questionSidenav").classList.toggle("active");

      $("#messageDivCollapse").removeClass("show");

    });
  }
});

AFRAME.registerComponent("mouseclick", {
  init: function () {
    this.el.addEventListener("click", function () {

      toggleSideNav("wallSidenav");

      if ($("#collapseOne").hasClass("show")) {
        $("#collapseOne").removeClass("show");
      }
      if ($("#collapseTwo").hasClass("show")) {
        $("#collapseTwo").removeClass("show");
      }
      if ($("#collapseThree").hasClass("show")) {
        $("#collapseThree").removeClass("show");
      }


      var clickedImageId = this.id;
      clickedImageId = clickedImageId.split("-");
      if (clickedImageId[0] == "west") {
        //$(".west").trigger('click');
        $("#collapseTwo").addClass("show");
      } else if (clickedImageId[0] == "south") {
        //$(".south").trigger('click');
        $("#collapseOne").addClass("show");
      } else if (clickedImageId[0] == "east") {
        //$(".east").trigger('click');
        $("#collapseThree").addClass("show");
      }

      $(".custom-file-label").removeClass("background-color-forestgreen");

      var imageOrder = clickedImageId[2].split("entity");
      //east-wall-logoLabel east-wall-image1Label east-wall-image2Label
      if (imageOrder[1] == "0")
        $("#" + clickedImageId[0] + "-wall-logoLabel").addClass(
          "background-color-forestgreen"
        );
      else if (imageOrder[1] == "1")
        $("#" + clickedImageId[0] + "-wall-image1Label").addClass(
          "background-color-forestgreen"
        );
      else if (imageOrder[1] == "2")
        $("#" + clickedImageId[0] + "-wall-image2Label").addClass(
          "background-color-forestgreen"
        );

    });
  },
});

// function checkIfAssetsLoaded() {
//   setTimeout(() => {
//     if (loadedAscene && loadedAassets) {
//       $("#loaderq").hide();
//       document.getElementById("loaderoverlay").style.display = "none";
//       clearInterval(checkAssetsLoaded);
//     }
//      else {
//       checkIfAssetsLoaded();
//     }
//   }, 100);
// }

$(document).ready(function () {
  document.querySelector("a-scene").addEventListener("loaded", function () {
    loadedAscene = true;
  });

  document.querySelector("a-assets").addEventListener("loaded", function () {
    loadedAassets = true;
  });

  setTimeout(() => {
    $("#loaderq").hide();
    document.getElementById("loaderoverlay").style.display = "none";
  }, 3000);
  // $("#loaderq").hide();
  // document.getElementById("loaderoverlay").style.display = "none";

  $(".guideme")
    .mouseenter(function () {
      var title = $(this).attr("title");
      var box = window.parent;
      var bx1 = $("#customizerIframe");
      $(".box-body").empty();
      $(".box-body").append(
        ' <div class="row margin-LR-0" style="min-height:148px;max-height:148px;" *ngIf="serviceApi.helpFlag"><div class="col-lg-12" style="margin-top:auto;margin-bottom:auto;">' +
        title +
        "</div></div>"
      );
    })
    .mouseleave(function () {
      $(".box-body").empty();
      $(".box-body").append(
        '<div class="row margin-LR-0 ng-star-inserted" style="min-height:148px;max-height:148px;"><div class="col-lg-7" style="margin-top:auto; margin-bottom:auto;"> This guide is mouse pointer sensitive. Point at a page item to view its help. </div><div class="col-lg-5" style="margin-top:auto; margin-bottom:auto;"><img src="assets/images/catques.png" style="width:95px;position:relative;top:-5px;left:-10px;"></div></div>'
      );
    });

  // Add minus icon for collapse element which is open by default
  $(".collapse.in").each(function () {
    $(this)
      .siblings(".panel-heading")
      .find(".glyphicon")
      .addClass("glyphicon-minus")
      .removeClass("glyphicon-plus");
  });

  // Toggle plus minus icon on show hide of collapse element
  $(".collapse")
    .on("show.bs.collapse", function () {
      $(this)
        .parent()
        .find(".glyphicon")
        .removeClass("glyphicon-plus")
        .addClass("glyphicon-minus");
    })
    .on("hide.bs.collapse", function () {
      $(this)
        .parent()
        .find(".glyphicon")
        .removeClass("glyphicon-minus")
        .addClass("glyphicon-plus");
    });

  $("#wallSidebar").click(function () {
    $("#collapseOne").addClass("show");
    if ($("#collapseTwo").hasClass("show")) {
      $(".west").trigger("click");
    }
    if ($("#collapseThree").hasClass("show")) {
      $(".east").trigger("click");
    }

    $(".custom-file-label").removeClass("background-color-forestgreen");
  });

  $(".bgThemeDiv > img").click(function () {
    $(".bgThemeDiv > img").removeClass("selected-theme");
    $(this).addClass("selected-theme");
    var str = $(this).attr("src");
    var n = str.lastIndexOf("/");
    var imageName = str.slice(n + 1, str.length);
    quizData["Background_theme"] = "assets/images/decor/" + imageName;
    $("#cuberoom-texture").attr("src", "assets/images/decor/" + imageName);
    var cuberoom = document.querySelector("#cuberoom");
    cuberoom.setAttribute("material", "src: ");
    cuberoom.setAttribute("material", "src: #cuberoom-texture");
  });

  $("#overlay").click(function () {
    var sidenavIdQue = document.getElementById("questionSidenav");
    if (sidenavIdQue) {
      if (checkSaveQuestion == false) {
        if ($("#questionTextarea").val().length > 0) {
          $("#questionSidenav").addClass("active");
          $("#overlay").addClass("overlay");
          popSnackbar("warning", "Please save question "+ $("#hidden-question-id").val() +" first.");
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

  $("#answerSelect").on("change", function () {
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
 
  $("#answerMultiSelect")
    .change(function () {
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
    })
    .change();

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

  $("#addQuestion").click(function () {
    if (
      !$("#questionTextarea").val().replace(/\s/g, "").length ||
      $("#questionTextarea").val() == "" ||
      $("#questionTextarea").val() == null ||
      $("#questionTextarea").val() == undefined
    ) {
      $("#questionValidation").removeClass("hidden");
      return;
    }
    checkSelectedOption();
    if (validOption == false) {
      if (
        !$("#questionTextarea").val().replace(/\s/g, "").length ||
        $("#questionTextarea").val() == "" ||
        $("#questionTextarea").val() == null ||
        $("#questionTextarea").val() == undefined
      ) {
        $("#questionValidation").removeClass("hidden");
        $("#option1Validation").addClass("hidden");
        $("#option2Validation").addClass("hidden");
        $("#validOption").addClass("hidden");
        return;
      } else if (
        ($("#option1").val() == "" ||
          !$("#option1").val().replace(/\s/g, "").length) &&
        ($("#option2").val() == "" ||
          !$("#option2").val().replace(/\s/g, "").length) &&
        ($("#option3").val() == "" ||
          !$("#option3").val().replace(/\s/g, "").length) &&
        ($("#option4").val() == "" ||
          !$("#option4").val().replace(/\s/g, "").length)
      ) {
        $("#option1Validation").removeClass("hidden");
        $("#option2Validation").addClass("hidden");
        $("#validOption").addClass("hidden");
        return;
      } else if (
        ($("#option2").val() == "" ||
          !$("#option2").val().replace(/\s/g, "").length) &&
        ($("#option3").val() == "" ||
          !$("#option3").val().replace(/\s/g, "").length) &&
        ($("#option4").val() == "" ||
          !$("#option4").val().replace(/\s/g, "").length)
      ) {
        $("#option2Validation").removeClass("hidden");
        $("#validOption").addClass("hidden");
        return;
      } else if (selections == false) {
        $("#validOption").removeClass("hidden");
        $("#questionSidenav").scrollTop(500);
        return;
      }
    }

    var selectedans = $("#answerMultiSelect").val();

    if (selectedans.length == "4") {
      if ($("#option3").val() == "" || $("#option3").val() == null || $("#option3").val() == undefined || $("#option4").val() == "" || $("#option4").val() == null || $("#option4").val() == undefined) {
        $("#validOption").removeClass("hidden");
        $("#questionSidenav").scrollTop(150);
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
            return;
          }
        }
      }
    }

    if ($("#option").val() == "") {
      $("#option" + $(this).val() + "Validation").removeClass("hidden");
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
        $("#option" + $(this).val() + "Validation").removeClass("hidden");
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
    var option1 = $("#option1").val().replace(/\s+$/, "");
    var option2 = $("#option2").val().replace(/\s+$/, "");
    var option3 = $("#option3").val().replace(/\s+$/, "");
    var option4 = $("#option4").val().replace(/\s+$/, "");

    var opt1 = [];
    var opt = {
      option: ""
    };
    if (
      option1 != "" &&
      option1 != null &&
      option1 != undefined &&
      option1.replace(/\s/g, "").length
    ) {
      opt = {
        option: option1
      };
      opt1.push(opt);
    }

    if (
      option2 != "" &&
      option2 != null &&
      option2 != undefined &&
      option2.replace(/\s/g, "").length
    ) {
      opt = {
        option: option2
      };
      opt1.push(opt);
    }

    if (
      option3 != "" &&
      option3 != null &&
      option3 != undefined &&
      option3.replace(/\s/g, "").length
    ) {
      opt = {
        option: option3
      };
      opt1.push(opt);
    }

    if (
      option4 != "" &&
      option4 != null &&
      option4 != undefined &&
      option4.replace(/\s/g, "").length
    ) {
      opt = {
        option: option4
      };
      opt1.push(opt);
    }

    var reenforcement_feedback = $("#Reenforcement_Feedback")
      .val()
      .replace(/\s+$/, "");
    var correcitve_feedback = $("#Corrective_Feedback")
      .val()
      .replace(/\s+$/, "");
    if (quizData.questionData.length < 20) {
      questionData = {
        Id: "" + questionCount,
        Question: questionText,
        Options: opt1,
        Answer: answer,
        Reenforcement_feedback: reenforcement_feedback,
        Corrective_feedback: correcitve_feedback,
        Background_video1: westWallVideoPath,
        Background_video2: eastWallVideoPath,
        branding_east_wall: {
          Image: eastWallImagePath,
        },
        branding_west_wall: {
          Image: westWallImagePath,
        },
        Background_audio: backgroundAudioPath,
      };
      quizData["questionData"].push(questionData);
      makeFieldEmpty();
      $("#questionSidenav").scrollTop(0);
      $(".collapse").removeClass("show");
      $("#messageDivCollapse").removeClass("show");
      $("#addQuestionDivCollapse").addClass("show");
      if (quizData.questionData.length >= 20) {
        $("#addQuestionMainAccordion").addClass('display-none');
      } else {
        $("#addQuestionMainAccordion").removeClass('display-none');
      }
      setQuestionOnScreen(questionCount);
      $("#questionTextarea").val("");
      $('#questioncharcount').text("0");
      $("#option1").val("");
      $('#option1charcount').text("0");
      $("#option2").val("");
      $('#option2charcount').text("0");
      $("#option3").val("");
      $('#option3charcount').text("0");
      $("#option4").val("");
      $('#option4charcount').text("0");
      $('#correctivecharcount').text("0");
      $('#reenforcecharcount').text("0");
      $("#answerSelect").val("0");
      $("#Reenforcement_Feedback").val("");
      $("#Corrective_Feedback").val("");
      makeFieldEmpty();
      var data = [];
      $("#answerMultiSelect").val(data);
      $("#answerMultiSelect").multiselect("refresh");
      $("#answerMultiSelect").multiselect("disable");

      var data = quizData.questionData;

      $("#accordion > div").remove();

      for (i = 0; i < data.length; i++) {
        var bind_questionNum = i + 1;
        var bind_questionText = data[i].Question;
        var bind_options = data[i].Options;
        var bind_answer = data[i].Answer;
        var bind_reenforcement = data[i].Reenforcement_feedback;
        var bind_corrective = data[i].Corrective_feedback;
        var dynamic_panel = "panel" + bind_questionNum;

        var answer_data =
          '<div class="row"><div class="col-12">Answer: ' +
          bind_answer +
          "</div></div>";
        var feedback_data =
          '<div class="row"><div class="col-12">Reinforcement Feedback: ' +
          bind_reenforcement +
          '</div></div><div class="row"><div class="col-12">Corrective Feedback: ' +
          bind_corrective +
          "</div></div>";

        var optionData = "";

        for (j = 0; j < bind_options.length; j++) {
          var tempData =
            '<div class="col-6"><span>' +
            (j + 1) +
            " . </span><span>" +
            bind_options[j].option +
            "</span></div>";
          optionData = optionData.concat(tempData);
        }
        var accordionData =
          '<div class="card questionAccordion" id="divGroup' +
          bind_questionNum +
          '"> <div class="card-header" id="heading' +
          bind_questionNum +
          '"> <h3 class="mb-0"> <button id="que' +
          bind_questionNum +
          '" class="btn btn-link queDiv" data-toggle="collapse" data-target="#collapse' +
          bind_questionNum +
          '" aria-expanded="true" aria-controls="collapse' +
          bind_questionNum +
          '" onclick="setQuestionOnScreen(' +
          bind_questionNum +
          ')"> <i class="fa" aria-hidden="true"></i> Question <span>' +
          bind_questionNum +
          '</span> </button> </h3> </div> <div id="collapse' +
          bind_questionNum +
          '" class="collapse" aria-labelledby="heading' +
          bind_questionNum +
          '" data-parent="#accordion"> <div class="card-body"> <div class="row ' +
          dynamic_panel +
          '"><div class="col-12">' +
          bind_questionText +
          "</div>" +
          optionData +
          "</div> " +
          answer_data +
          feedback_data +
          '<div class="row"><div class="col-12 actionDiv"><button onmouseenter="mouseEnter(\'Edit the question using this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-success btn-margin-right" onclick="editQuestion(' +
          data[i].Id +
          ')">Edit</button><button onmouseenter="mouseEnter(\'In case if you wish to roll-back the changes without saving them, press this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-danger" onclick="deleteQuestion(' +
          data[i].Id +
          ')" data-toggle="modal" data-target="#deleteConfirmationModal">Delete</button></div></div></div></div></div>';
        $("#accordion").append(accordionData);
      }

      var questionLength = quizData.questionData.length;
      var len = questionLength;
      len = len - 1;
      if (quizData.questionData.length > 0) {
        textview = document.getElementById("questionText");
        textview.setAttribute("visible", "true");
        textview.setAttribute("text", "value", quizData.questionData[questionLength - 1].Question);
        var option = document.getElementById("option-0");
        option.setAttribute("text", "value", "");
        option = document.getElementById("option-1");
        option.setAttribute("text", "value", "");
        option = document.getElementById("option-2");
        option.setAttribute("text", "value", "");
        option = document.getElementById("option-3");
        option.setAttribute("text", "value", "");
        for (var j = 0; j < quizData.questionData[len].Options.length; j++) {
          option = document.getElementById("option-" + j);
          option.setAttribute("visible", "true");
          option.setAttribute("text", "value", quizData.questionData[len].Options[j].option);
        }
      }
      $("#questionSidenav").scrollTop(0);
      $("#addQuestionDivCollapse").addClass("show");
      if (quizData.questionData.length >= 20) {
        $("#addQuestionMainAccordion").addClass('display-none');
      } else {
        $("#addQuestionMainAccordion").removeClass('display-none');
      }
      $("#messageDivCollapse").removeClass("show");
      popSnackbar("success", "Question "+(questionCount)+" saved successfully.");
    } else {
      // $(".questionDiv > div").remove();
      // var questionMessage = '<div style="font-size:20px;color:#fff;font-weight:bold;">You have added 20 questions successfully...!!!</div>';
      // $(".questionDiv").append(questionMessage);
      //$(".questionDiv").css("background-color","#f7f7f7");
      popSnackbar("warning", "You can add atmost 20 questions.");
      $("#questionTextarea").val("");
      $('#questioncharcount').text("0");
      $("#option1").val("");
      $('#option1charcount').text("0");
      $("#option2").val("");
      $('#option2charcount').text("0");
      $("#option3").val("");
      $('#option3charcount').text("0");
      $("#option4").val("");
      $('#option4charcount').text("0");
      $('#reenforcecharcount').text("0");
      $('#correctivecharcount').text("0");
      $("#Reenforcement_Feedback").val("");
      $("#Corrective_Feedback").val("");

      var data = [];
      $("#answerMultiSelect").val(data);
      $("#answerMultiSelect").multiselect("refresh");

      // $("#div1").hide();
      // $(".addQuestionDiv").hide();
      //$("#addQuestionDiv").remove();
      // $("#addQuestionDivCollapse").remove();
      // $("#addQuestionDiv").remove();
      return;
    }
    validOption = false;
    selections = false;
    checkSaveQuestion = true;
  });

  $("input[name='score']").click(function () {
    quizData.Show_score_at_end = $("input[name='score']:checked").val();
  });

  $("input[name='right']").click(function () {
    quizData.Show_right_answer = $("input[name='right']:checked").val();
  });

  $("#messageTextarea").change(function () {
    var message = $("#messageTextarea").val();
    quizData.End_Message = message;
  });

  $(".questionAccordions").click(function () {
    // 	if($("#addQuestionDivCollapse").hasClass("show"))
    {
      $("#addQuestion1").click();
    }
  });

  $(".custom-input").bind("change paste keyup", function () {
    
    var clickedId = this.id;
    var len = $(this).val().length;

    var enteredVal = $(this).val();
    var maxPerc = "100";
    if(clickedId === "passingPercentage"){
      if (enteredVal > maxPerc) {
        popSnackbar("warning", "Limit exceed.");
        return;
      }
    }else if(this.maxLength == len){
      popSnackbar("warning", "Limit exceed.");
      return;
    } 
  });

  $("#questionTextarea").bind("change keyup", function () {
    if ($("#questionTextarea").val().length > 0) {
      $("#questionValidation").addClass("hidden");
      checkSaveQuestion = false;
    } else {
      $("#questionValidation").removeClass("hidden");
      checkSaveQuestion = true;
    }
  });

  $(".optionInput").bind("change paste keyup", function () {
    var inputId = this.id.split("option");
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

      if (cnt >= 2) $("#answerMultiSelect").multiselect("enable");
      else $("#answerMultiSelect").multiselect("disable");
    }
  });

  $("#fixOpacity").on("input", function () {
    fixOpacity = $(this).val();
    var displayvalue = "(" + Math.round(fixOpacity * 100) + "%)";
    document.getElementById("rangeValue").innerText = displayvalue;
    quizData.Opacity = fixOpacity;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  });

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
});

$(function () {
  $("#answerMultiSelect").multiselect({
    includeSelectAllOption: true,
  });
  $("#answerMultiSelect").multiselect("disable");
  $("#btnSelected").click(function () {
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

function editQuestion(id) {
  $("#addQuestionMainAccordion").removeClass('display-none');
  $("#addQuestion").addClass("display-none");
  var editQuestionTitle = document.getElementById("addQuestion1");
  editQuestionTitle.setAttribute("text","Question "+id);
  $('#addQuestion1').text("Question " +id);
  $("#saveQuestion").removeClass("display-none");
  $("#cancelQuestion").removeClass("display-none");

  $("#questionValidation").addClass("hidden");
  $("#option1Validation").addClass("hidden");
  $("#option2Validation").addClass("hidden");
  
  $("#hidden-question-id").val(id);
  var data = quizData.questionData;

  for (i = 0; i < data.length; i++) {
    if (data[i].Id == id) {
      $("#questionTextarea").val(data[i].Question);
      $('#questioncharcount').text(data[i].Question.length);
      if (
        data[i].Options[0] != "" &&
        data[i].Options[0] != null &&
        data[i].Options[0] != undefined
      ) {
        $("#option1").val(data[i].Options[0].option);
        $('#option1charcount').text(data[i].Options[0].option.length);
      }

      if (
        data[i].Options[1] != "" &&
        data[i].Options[1] != null &&
        data[i].Options[1] != undefined
      ) {
        $("#option2").val(data[i].Options[1].option);
        $('#option2charcount').text(data[i].Options[1].option.length);
      }

      if (
        data[i].Options[2] != "" &&
        data[i].Options[2] != null &&
        data[i].Options[2] != undefined
      ) {
        $("#option3").val(data[i].Options[2].option);
        $('#option3charcount').text(data[i].Options[2].option.length);
      }

      if (
        data[i].Options[3] != "" &&
        data[i].Options[3] != null &&
        data[i].Options[3] != undefined
      ) {
        $("#option4").val(data[i].Options[3].option);
        $('#option4charcount').text(data[i].Options[3].option.length);
      }

      if (data[i].branding_east_wall.Image) {
        var bind_eastWallImage = data[i].branding_east_wall.Image.split(
          "/"
        ).pop();
        eastWallImagePath = data[i].branding_east_wall.Image;
      } else {
        var bind_eastWallImage = "Select Image";
        eastWallImagePath = "";
      }

      if (data[i].Background_video2) {
        var bind_eastWallVideo = data[i].Background_video2.split("/").pop();
        eastWallVideoPath = data[i].Background_video2;
      } else {
        var bind_eastWallVideo = "Select Video";
        eastWallVideoPath = "";
      }

      if (data[i].branding_west_wall.Image) {
        var bind_westWallImage = data[i].branding_west_wall.Image.split(
          "/"
        ).pop();
        westWallImagePath = data[i].branding_west_wall.Image;
      } else {
        var bind_westWallImage = "Select Image";
        westWallImagePath = "";
      }
      if (data[i].Background_video1) {
        var bind_westWallVideo = data[i].Background_video1.split("/").pop();
        westWallVideoPath = data[i].Background_video1;
      } else {
        var bind_westWallVideo = "Select Video";
        westWallVideoPath = "";
      }

      if (data[i].Background_audio) {
        var bind_backgroundAudio = data[i].Background_audio.split("/").pop();
        backgroundAudioPath = data[i].Background_audio;
      } else {
        var bind_backgroundAudio = "Select Audio";
        backgroundAudioPath = "";
      }

      var eastWallImageSpan = document.getElementById("eastWallImageSpan");
      eastWallImageSpan.innerText = bind_eastWallImage;

      var westWallImageSpan = document.getElementById("westWallImageSpan");
      westWallImageSpan.innerText = bind_westWallImage;

      var eastWallVideoSpan = document.getElementById("EastWallIVideoSpan");
      eastWallVideoSpan.innerText = bind_eastWallVideo;

      var westWallVideoSpan = document.getElementById("westWallIVideoSpan");
      westWallVideoSpan.innerText = bind_westWallVideo;

      var backgroundAudioSpan = document.getElementById("backgroundAudioSpan");
      backgroundAudioSpan.innerText = bind_backgroundAudio;

      $("#Corrective_Feedback").val(data[i].Corrective_feedback);
      $("#Reenforcement_Feedback").val(data[i].Reenforcement_feedback);
      $('#reenforcecharcount').text(data[i].Corrective_feedback.length);
      $('#correctivecharcount').text(data[i].Reenforcement_feedback.length);
      $("#answerMultiSelect").val(data[i].Answer);
      $("#answerMultiSelect").multiselect("refresh");
      $("#answerMultiSelect").multiselect("enable");
    }
  }

  $("#questionSidenav").scrollTop(0);
  $("#messageDivCollapse").removeClass("show");
  $(".collapse").removeClass("show");
  $("#addQuestionDivCollapse").addClass("show");
  // if (quizData.questionData.length >= 20) {
  //   $("#addQuestionMainAccordion").addClass('display-none');
  // } else {
  //   $("#addQuestionMainAccordion").removeClass('display-none');
  // }
  checkSaveQuestion = false;
}

function deleteQuestion(id) {
  deleteQueId = id;
}

function deleteQuestionAfterConfirmation() {
  var data = quizData.questionData;

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
    var bind_questionNum = i + 1;
    var bind_questionText = data[i].Question;
    var bind_options = data[i].Options;
    var bind_answer = data[i].Answer;
    var bind_reenforcement = data[i].Reenforcement_feedback;
    var bind_corrective = data[i].Corrective_feedback;
    var dynamic_panel = "panel" + bind_questionNum;

    var answer_data =
      '<div class="row"><div class="col-12">Answer: ' +
      bind_answer +
      "</div></div>";
    var feedback_data =
      '<div class="row"><div class="col-12">Reinforcement Feedback: ' +
      bind_reenforcement +
      '</div></div><div class="row"><div class="col-12">Corrective Feedback: ' +
      bind_corrective +
      "</div></div>";
    var optionData = "";

    for (j = 0; j < bind_options.length; j++) {
      var tempData =
        '<div class="col-6"><span>' +
        (j + 1) +
        " . </span><span>" +
        bind_options[j].option +
        "</span></div>";
      optionData = optionData.concat(tempData);
    }
    var accordionData =
      '<div class="card questionAccordion" id="divGroup' +
      bind_questionNum +
      '"> <div class="card-header" id="heading' +
      bind_questionNum +
      '"> <h3 class="mb-0"> <button id="que' +
      bind_questionNum +
      '" class="btn btn-link" data-toggle="collapse" data-target="#collapse' +
      bind_questionNum +
      '" aria-expanded="true" aria-controls="collapse' +
      bind_questionNum +
      '" onclick="setQuestionOnScreen(' +
      bind_questionNum +
      ')"> <i class="fa" aria-hidden="true"></i> Question <span>' +
      bind_questionNum +
      '</span> </button> </h3> </div> <div id="collapse' +
      bind_questionNum +
      '" class="collapse" aria-labelledby="heading' +
      bind_questionNum +
      '" data-parent="#accordion"> <div class="card-body"> <div class="row ' +
      dynamic_panel +
      '"><div class="col-12">' +
      bind_questionText +
      "</div>" +
      optionData +
      "</div> " +
      answer_data +
      feedback_data +
      '<div class="row"><div class="col-12 actionDiv"><button type="button" onmouseenter="mouseEnter(\'Edit the question using this button.\');" onmouseleave="mouseLeave()" class="btn btn-success btn-margin-right" onclick="editQuestion(' +
      data[i].Id +
      ')">Edit</button><button onmouseenter="mouseEnter(\'In case if you wish to roll-back the changes without saving them, press this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-danger" onclick="deleteQuestion(' +
      data[i].Id +
      ')" data-toggle="modal" data-target="#deleteConfirmationModal">Delete</button></div></div></div></div></div>';
    $("#accordion").append(accordionData);
  }
  questionCount = data.length;
  $("#questionTextarea").val("");
  $('#questioncharcount').text("0");
  $("#option1").val("");
  $('#option1charcount').text("0");
  $("#option2").val("");
  $('#option2charcount').text("0");
  $("#option3").val("");
  $('#option3charcount').text("0");
  $("#option4").val("");
  $('#option4charcount').text("0");
  $("#answerSelect").val("0");
  $("#Reenforcement_Feedback").val("");
  $("#Corrective_Feedback").val("");
  $('#reenforcecharcount').text("0");
  $('#correctivecharcount').text("0");
  var data = [];
  $("#answerMultiSelect").val(data);
  $("#answerMultiSelect").multiselect("refresh");
  $("#answerMultiSelect").multiselect("disable");
  $("#addQuestion").removeClass('display-none');
  $("#saveQuestion").addClass('display-none');
  $("#cancelQuestion").addClass('display-none');
  $("#addQuestion1").text("Add Question");
  for (var j = 0; j < 4; j++) {
    var clearedOption = document.getElementById("option-" + j);
    clearedOption.setAttribute("text", "value", "");
  }
  popSnackbar("success", "Question deleted successfully.");
  $("#questionSidenav").scrollTop(0);
  $("#addQuestionDivCollapse").addClass("show");
  if (quizData.questionData.length >= 20) {
    $("#addQuestionMainAccordion").addClass('display-none');
  } else {
    $("#addQuestionMainAccordion").removeClass('display-none');
  }
  $("#messageDivCollapse").removeClass("show");
  var questionLength = quizData.questionData.length;
  if (quizData.questionData.length > 0) {
    textview = document.getElementById("questionText");
    textview.setAttribute("visible", "true");
    textview.setAttribute("text", "value", quizData.questionData[questionLength - 1].Question);

    for (
      var j = 0; j < quizData.questionData[questionLength - 1].Options.length; j++
    ) {
      var option1 = document.getElementById("option-" + j);
      option1.setAttribute(
        "text", "value:" +
        quizData.questionData[questionLength - 1].Options[j].option
      );
    }
  } else {
    textview = document.getElementById("questionText");
    textview.setAttribute("text", "value", "");

    for (var j = 0; j < 4; j++) {
      var option1 = document.getElementById("option-" + j);
      option1.setAttribute("text", "value", "");
    }
  }

  $("#deleteConfirmationModal").modal("hide");
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
    $("#option1Validation").addClass("hidden");
    $("#option2Validation").addClass("hidden");
    $("#validOption").addClass("hidden");
    $("#questionSidenav").scrollTop(120);
    return;
  }

  if (($("#option2").val() == "")) {
    $("#option2Validation").removeClass("hidden");
    $("#validOption").addClass("hidden");
    $("#questionSidenav").scrollTop(200);
    return;
  }

  var selectedans = $("#answerMultiSelect").val();

    if (selectedans.length == "4") {
      if ($("#option3").val() == "" || $("#option3").val() == null || $("#option3").val() == undefined || $("#option4").val() == "" || $("#option4").val() == null || $("#option4").val() == undefined) {
        $("#validOption").removeClass("hidden");
        $("#questionSidenav").scrollTop(150);
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
    return;
  }

  if (validOption == false) {
    if (
      $("#questionTextarea").val() == "" ||
      $("#questionTextarea").val() == null ||
      $("#questionTextarea").val() == undefined
    ) {
      $("#questionValidation").removeClass("hidden");
      return;
    } else if (
      $("#option1").val() == "" &&
      $("#option2").val() == "" &&
      $("#option3").val() == "" &&
      $("#option4").val() == ""
    ) {
      $("#optionValidation").removeClass("hidden");
      return;
    } else if (selections == false) {
      $("#validOption").removeClass("hidden");
      $("#questionSidenav").scrollTop(500);
      return;
    }
  }

  for (i = 4; i > 0; i--) {
    if ($("#option" + i).val().length != 0) {
      for (j = 1; j < i; j++) {
        if ($("#option" + j).val().length == 0) {
          $("#option" + j + "Validation").removeClass("hidden");
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
      $("#option" + $(this).val() + "Validation").removeClass("hidden");
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

  var data = quizData.questionData;
  var option1 = $("#option1").val();
  var option2 = $("#option2").val();
  var option3 = $("#option3").val();
  var option4 = $("#option4").val();
  var opt1 = [];
  var opt = {
    option: ""
  };
  // var optionCounter = 0;
  if (option1 != "" && option1 != null && option1 != undefined) {
    opt = {
      option: option1
    };
    opt1.push(opt);
    //   optionCounter = optionCounter + 1;
  }

  if (option2 != "" && option2 != null && option2 != undefined) {
    opt = {
      option: option2
    };
    opt1.push(opt);
    //   optionCounter = optionCounter + 1;
  }

  if (option3 != "" && option3 != null && option3 != undefined) {
    opt = {
      option: option3
    };
    opt1.push(opt);
    //   optionCounter = optionCounter + 1;
  }

  if (option4 != "" && option4 != null && option4 != undefined) {
    opt = {
      option: option4
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
      data[i].Corrective_feedback = $("#Corrective_Feedback").val();
      data[i].Reenforcement_feedback = $("#Reenforcement_Feedback").val();
      data[i].branding_east_wall["Image"] = eastWallImagePath;
      data[i].branding_west_wall["Image"] = westWallImagePath;
      data[i].Background_video1 = westWallVideoPath;
      data[i].Background_video2 = eastWallVideoPath;
      data[i].Background_audio = backgroundAudioPath;
    }
  }

  makeFieldEmpty();


  $("#accordion > div").remove();
  for (i = 0; i < data.length; i++) {
    var bind_questionNum = i + 1;
    var bind_questionText = data[i].Question;
    var bind_options = data[i].Options;
    var bind_answer = data[i].Answer;
    var bind_reenforcement = data[i].Reenforcement_feedback;
    var bind_corrective = data[i].Corrective_feedback;
    var dynamic_panel = "panel" + bind_questionNum;

    var answer_data =
      '<div class="row"><div class="col-12">Answer: ' +
      bind_answer +
      "</div></div>";
    var feedback_data =
      '<div class="row"><div class="col-12">Reinforcement Feedback: ' +
      bind_reenforcement +
      '</div></div><div class="row"><div class="col-12">Corrective Feedback: ' +
      bind_corrective +
      "</div></div>";

    var optionData = "";

    for (j = 0; j < bind_options.length; j++) {
      var tempData =
        '<div class="col-6"><span>' +
        (j + 1) +
        " . </span><span>" +
        bind_options[j].option +
        "</span></div>";
      optionData = optionData.concat(tempData);
    }
    var accordionData =
      '<div class="card questionAccordion" id="divGroup' +
      bind_questionNum +
      '"> <div class="card-header" id="heading' +
      bind_questionNum +
      '"> <h3 class="mb-0"> <button id="que' +
      bind_questionNum +
      '" class="btn btn-link" data-toggle="collapse" data-target="#collapse' +
      bind_questionNum +
      '" aria-expanded="true" aria-controls="collapse' +
      bind_questionNum +
      '" onclick="setQuestionOnScreen(' +
      bind_questionNum +
      ')"> <i class="fa" aria-hidden="true"></i> Question <span>' +
      bind_questionNum +
      '</span> </button> </h3> </div> <div id="collapse' +
      bind_questionNum +
      '" class="collapse" aria-labelledby="heading' +
      bind_questionNum +
      '" data-parent="#accordion"> <div class="card-body"> <div class="row ' +
      dynamic_panel +
      '"><div class="col-12">' +
      bind_questionText +
      "</div>" +
      optionData +
      "</div> " +
      answer_data +
      feedback_data +
      '<div class="row"><div class="col-12 actionDiv"><button  onmouseenter="mouseEnter(\'Edit the question using this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-success btn-margin-right" onclick="editQuestion(' +
      data[i].Id +
      ')">Edit</button><button onmouseenter="mouseEnter(\'In case if you wish to roll-back the changes without saving them, press this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-danger" onclick="deleteQuestion(' +
      data[i].Id +
      ')" data-toggle="modal" data-target="#deleteConfirmationModal">Delete</button></div></div></div></div></div>';
    $("#accordion").append(accordionData);
  }


  questionCount = data.length;
  $("#questionTextarea").val("");
  $('#questioncharcount').text("0");
  $("#option1").val("");
  $('#option1charcount').text("0");
  $("#option2").val("");
  $('#option2charcount').text("0");
  $("#option3").val("");
  $('#option3charcount').text("0");
  $("#option4").val("");
  $('#option4charcount').text("0");
  $("#answerSelect").val("0");
  $("#Reenforcement_Feedback").val("");
  $("#Corrective_Feedback").val("");
  $('#reenforcecharcount').text("0");
  $('#correctivecharcount').text("0");
  $("#addQuestion").removeClass("display-none");
  $("#saveQuestion").addClass("display-none");
  $("#cancelQuestion").addClass("display-none");
  var data = [];
  $("#answerMultiSelect").val(data);
  $("#answerMultiSelect").multiselect("refresh");
  //$(".add_question").trigger("click");

  var questionLength = quizData.questionData.length;
  var len = questionLength;
  len = len - 1;
  if (quizData.questionData.length > 0) {
    textview = document.getElementById("questionText");
    textview.setAttribute("visible", "true");
    textview.setAttribute("text", "value", quizData.questionData[questionLength - 1].Question);
    var option = document.getElementById("option-0");
    option.setAttribute("text", "value", "");
    option = document.getElementById("option-1");
    option.setAttribute("text", "value", "");
    option = document.getElementById("option-2");
    option.setAttribute("text", "value", "");
    option = document.getElementById("option-3");
    option.setAttribute("text", "value", "");
    for (var j = 0; j < quizData.questionData[len].Options.length; j++) {
      option = document.getElementById("option-" + j);
      option.setAttribute("visible", "true");
      option.setAttribute("text", "value", quizData.questionData[len].Options[j].option);
    }
  }
  setQuestionOnScreen(editedQuestionId);
  makeFieldEmpty();
  popSnackbar("success", "Question "+(editedQuestionId)+" saved successfully.");
  $("#questionSidenav").scrollTop(0);
  $("#addQuestionDivCollapse").addClass("show");
  if (quizData.questionData.length >= 20) {
    $("#addQuestionMainAccordion").addClass('display-none');
  } else {
    $("#addQuestionMainAccordion").removeClass('display-none');
  }
  $("#messageDivCollapse").removeClass("show");
  validOption = false;
  selections = false;
  $("#hidden-question-id").val('')
  // checkSaveQuestion = true;
}

function cancelQuestion() {
  $("#questionTextarea").val("");
  $('#questioncharcount').text("0");
  $("#option1").val("");
  $('#option1charcount').text("0");
  $("#option2").val("");
  $('#option2charcount').text("0");
  $("#option3").val("");
  $('#option3charcount').text("0");
  $("#option4").val("");
  $('#option4charcount').text("0");
  $("#answerSelect").val("0");
  var data = [];
  $("#answerMultiSelect").val(data);
  $("#answerMultiSelect").multiselect("refresh");
  $("#Corrective_Feedback").val("");
  $("#Reenforcement_Feedback").val("");
  $('#reenforcecharcount').text("0");
  $('#correctivecharcount').text("0");
  $("#addQuestion").removeClass("display-none");
  $("#saveQuestion").addClass("display-none");
  $("#cancelQuestion").addClass("display-none");
  $("#validOption").addClass("hidden");
  //$(".add_question").trigger("click");
  makeFieldEmpty();
  $("#questionSidenav").scrollTop(0);
  $(".collapse").removeClass("show");
  $("#messageDivCollapse").removeClass("show");
  $("#addQuestionDivCollapse").addClass("show");
  if (quizData.questionData.length >= 20) {
    $("#addQuestionMainAccordion").addClass('display-none');
  } else {
    $("#addQuestionMainAccordion").removeClass('display-none');
  }
  $("#hidden-question-id").val('')
}

function showFrameImage(input1, wall1, order1) {
  assettype = "Image";
  elementToUpdate = "Wall";
  window.parent.triggerAssetsPopup();
  wall = wall1;
  order = order1;
}

function changeSplashImage() {
  assettype = "Image";
  elementToUpdate = "Splash";
  window.parent.triggerAssetsPopup();
}

function uploadWestWallImage() {
  assettype = "Image";
  elementToUpdate = "westWall";
  window.parent.triggerAssetsPopup();
}

function uploadEastWallImage() {
  assettype = "Image";
  elementToUpdate = "eastWall";
  window.parent.triggerAssetsPopup();
}

function uploadWestWallVideo() {
  assettype = "Video";
  elementToUpdate = "westWall";
  window.parent.triggerAssetsPopup();
}

function uploadEastWallVideo() {
  assettype = "Video";
  elementToUpdate = "eastWall";
  window.parent.triggerAssetsPopup();
}

function uploadBackgroundAudio() {
  assettype = "Audio";
  elementToUpdate = "backgroundAudio";
  window.parent.triggerAssetsPopup();
}

function BindAudio() {
  assettype = "Audio";
  elementToUpdate = "Audio";
  window.parent.triggerAssetsPopup();
}

function getAssetPath(assetPath) {
  imagePath = assetPath;
  if (elementToUpdate == "Splash") {
    splashImagePath = assetPath;
    var splashLbl = document.getElementById("splashImageLable");
    var path = returnAssetName(splashImagePath);
    splashLbl.children[0].innerText = path;
  } else if (elementToUpdate == "westWall") {
    if (assettype == "Image") {
      var gallery_entity = document.querySelector(
        "#west-wall-entity0"
      );
      if (assetPath != "") {
        westWallImagePath = assetPath;
        var lblWestWallImage = document.getElementById("westWallImageLable");
        lblWestWallImage.children[0].innerText = returnAssetName(
          westWallImagePath
        );
        setWallImages(gallery_entity, westWallImagePath);
      } else {
        var lblWestWallImage = document.getElementById("westWallImageLable");
        var westWallImageSpan = document.getElementById("westWallImageSpan");
        lblWestWallImage.children[0].innerText =
          westWallImageSpan.children[0].innerText;
      }
    } else if (assettype == "Video") {
      if (assetPath != "") {
        westWallVideoPath = assetPath;
        var lblWestWallVideoImage = document.getElementById(
          "westWallVideoLable"
        );
        lblWestWallVideoImage.children[0].innerText = returnAssetName(
          westWallVideoPath
        );

      } else {
        var lblWestWallVideoImage = document.getElementById(
          "lblWestWallVideoImage"
        );
        var westWallIVideoSpan = document.getElementById("westWallIVideoSpan");
        lblEastWallVideoImage.children[0].innerText =
          westWallIVideoSpan.children[0].innerText;
      }
    }
  } else if (elementToUpdate == "eastWall") {
    if (assettype == "Image") {
      var gallery_entity = document.querySelector(
        "#east-wall-entity0"
      );
      if (assetPath != "") {
        eastWallImagePath = assetPath;
        var lblEastWallImage = document.getElementById("eastWallImageLable");
        lblEastWallImage.children[0].innerText = returnAssetName(
          eastWallImagePath
        );
        setWallImages(gallery_entity, eastWallImagePath);
      } else {
        var lblEastWallImage = document.getElementById("eastWallImageLable");
        var eastWallImageSpan = document.getElementById("eastWallImageSpan");
        lblEastWallImage.children[0].innerText =
          eastWallImageSpan.children[0].innerText;
      }



    } else if (assettype == "Video") {
      if (assetPath != "") {
        eastWallVideoPath = assetPath;
        var lblEastWallVideoImage = document.getElementById(
          "eastWallVideoLable"
        );
        lblEastWallVideoImage.children[0].innerText = returnAssetName(
          eastWallVideoPath
        );
      } else {
        var lblEastWallVideoImage = document.getElementById(
          "eastWallVideoLable"
        );
        var EastWallIVideoSpan = document.getElementById("EastWallIVideoSpan");
        lblEastWallVideoImage.children[0].innerText =
          EastWallIVideoSpan.children[0].innerText;
      }
    }
  } else if (elementToUpdate == "backgroundAudio") {
    if (assettype == "Audio") {
      if (assetPath != "") {
        backgroundAudioPath = assetPath;
        var lblBackgroundAudio = document.getElementById(
          "backgroundAudioLable"
        );
        lblBackgroundAudio.children[0].innerText = returnAssetName(
          backgroundAudioPath
        );
      } else {
        var lblBackgroundAudio = document.getElementById(
          "backgroundAudioLable"
        );
        var backgroundAudioSpan = document.getElementById(
          "backgroundAudioLable"
        );
        lblBackgroundAudio.children[0].innerText =
          backgroundAudioSpan.children[0].innerText;
      }
    }
  } else {
    if (assettype == "Audio") {
      if (assetPath != "") {
        quizData.Background_audio = assetPath;
        //quizData.DefaultBackground_audio=assetPath;
        var lbl = document.getElementById("BackgroundAudioLabel");
        lbl.children[0].innerText = returnAssetName(assetPath);
      } else {
        var lbl = document.getElementById("BackgroundAudioLabel");
        var BackgroundAudioSpan = document.getElementById(
          "BackgroundAudioSpan"
        );
        lbl.children[0].innerText = BackgroundAudioSpan.children[0].innerText;
      }
    } else {
      bindData(imagePath, wall, order);
    }
  }
}

function getAssetType() {
  return assettype;
}

function bindData(input, wall, order) {
  var galleryImageName = input;
  var gallery_entity = document.querySelector(
    "#" + wall + "-wall-entity" + order
  );
  var changedgallery = document.querySelector(
    "#" + wall + "-wall-texture" + order
  );
  changedgallery.setAttribute("crossorigin", "anonymous");
  changedgallery.setAttribute("src", galleryImageName);
  gallery_entity.setAttribute("material", "src: #");
  //setWallImages(gallery_entity, galleryImageName);
  if (input != "") {
    if (wall == "south") {
      if (order == 0) {
        if (galleryImageName == "") {
          galleryImageName = "assets/images/default.jpg";
          quizData.branding_south_wall["Logo"] = galleryImageName;
          var lbl = document.getElementById("south-wall-logoLabel");
          var path = returnAssetName(galleryImageName);
          lbl.children[0].innerText = path;
          changedgallery.setAttribute("src", galleryImageName);
          gallery_entity.setAttribute("material", "src:" + galleryImageName);
          gallery_entity.setAttribute("crossorigin", "anonymous");
        } else {
          quizData.branding_south_wall["Logo"] = galleryImageName;
          var lbl = document.getElementById("south-wall-logoLabel");
          var path = returnAssetName(galleryImageName);
          lbl.children[0].innerText = path;
          changedgallery.setAttribute("src", galleryImageName);
          gallery_entity.setAttribute("material", "src:" + galleryImageName);
          gallery_entity.setAttribute("crossorigin", "anonymous");
        }
      } else if (order == 2) {
        if (galleryImageName == "") {
          galleryImageName = "assets/images/default.jpg";
          quizData.branding_south_wall["image2"] = galleryImageName;
          var lbl = document.getElementById("south-wall-image2Label");
          var path = returnAssetName(galleryImageName);
          lbl.children[0].innerText = path;
          changedgallery.setAttribute("src", galleryImageName);
          gallery_entity.setAttribute("material", "src:" + galleryImageName);
          gallery_entity.setAttribute("crossorigin", "anonymous");
        } else {
          quizData.branding_south_wall["image2"] = galleryImageName;
          var lbl = document.getElementById("south-wall-image2Label");
          var path = returnAssetName(galleryImageName);
          lbl.children[0].innerText = path;
          changedgallery.setAttribute("src", galleryImageName);
          gallery_entity.setAttribute("material", "src:" + galleryImageName);
          gallery_entity.setAttribute("crossorigin", "anonymous");
        }
      }
    } else if (wall == "east") {
      setWallImages(gallery_entity, galleryImageName);
      if (order == 0) {
        if (galleryImageName == "") {
          galleryImageName = "assets/images/default.jpg";
          quizData.branding_east_wall["image"] = galleryImageName;
          var lbl = document.getElementById("east-wall-logoLabel");
          var path = returnAssetName(galleryImageName);
          lbl.children[0].innerText = path;
          setWallImages(changedgallery, galleryImageName);
          changedgallery.setAttribute("src", galleryImageName);
        } else {
          quizData.branding_east_wall["image"] = galleryImageName;
          var lbl = document.getElementById("east-wall-logoLabel");
          var path = returnAssetName(galleryImageName);
          lbl.children[0].innerText = path;
          changedgallery.setAttribute("src", galleryImageName);
          setWallImages(changedgallery, galleryImageName);
        }
      }
    } else if (wall == "west") {
      setWallImages(gallery_entity, galleryImageName);
      if (order == 0) {
        if (galleryImageName == "") {
          galleryImageName = "assets/images/default.jpg";
          quizData.branding_west_wall["image"] = galleryImageName;
          var lbl = document.getElementById("west-wall-logoLabel");
          var path = returnAssetName(galleryImageName);
          lbl.children[0].innerText = path;
          changedgallery.setAttribute("src", galleryImageName);
          setWallImages(changedgallery, galleryImageName);
        } else {
          quizData.branding_west_wall["image"] = galleryImageName;
          var lbl = document.getElementById("west-wall-logoLabel");
          var path = returnAssetName(galleryImageName);
          lbl.children[0].innerText = path;
          changedgallery.setAttribute("src", galleryImageName);
          setWallImages(changedgallery, galleryImageName);
        }
      }
    }
  }
  if (input == "") {
    if (wall == "south") {
      if (order == 0) {
        var gallery_entity = document.querySelector("#south-wall-entity0");
        galleryImageName = quizData.branding_south_wall["Logo"];
        var lbl = document.getElementById("south-wall-logoLabel");
        var path = returnAssetName(galleryImageName);
        lbl.children[0].innerText = path;
        gallery_entity.setAttribute("src", "");
        gallery_entity.setAttribute("src", galleryImageName);
      } else if (order == 2) {
        var gallery_entity = document.querySelector("#south-wall-entity2");
        galleryImageName = quizData.branding_south_wall["image2"];
        var lbl = document.getElementById("south-wall-image2Label");
        var path = returnAssetName(galleryImageName);
        lbl.children[0].innerText = path;
        gallery_entity.setAttribute("src", "");
        gallery_entity.setAttribute("src", galleryImageName);
      }
    } else if (wall == "east") {
      setWallImages(gallery_entity, galleryImageName);
      if (order == 0) {
        var gallery_entity = document.querySelector("#east-wall-entity0");
        galleryImageName = quizData.branding_east_wall["image"];
        var lbl = document.getElementById("east-wall-logoLabel");
        var path = returnAssetName(galleryImageName);
        lbl.children[0].innerText = path;
        gallery_entity.setAttribute("src", "");
        gallery_entity.setAttribute("src", galleryImageName);
        setWallImages(gallery_entity, galleryImageName);
      }
    } else if (wall == "west") {
      setWallImages(gallery_entity, galleryImageName);
      if (order == 0) {
        var gallery_entity = document.querySelector("#west-wall-entity0");
        galleryImageName = quizData.branding_west_wall["image"];
        var lbl = document.getElementById("west-wall-logoLabel");
        var path = returnAssetName(galleryImageName);
        lbl.children[0].innerText = path;
        gallery_entity.setAttribute("src", "");
        gallery_entity.setAttribute("src", galleryImageName);
        setWallImages(gallery_entity, galleryImageName);
      }
    }
  }
}

$(function () {
  $("#accordion")
    .accordion({
      header: "> div > div.card-header",
    })
    .sortable({
      axis: "y",
      handle: "div.card-header",
      update: function (event, ui) {
        updateJson();
      },
    });
});

function updateJson() {
  var values = [];
  $("#accordion > .card").each(function (index) {
    values.push($(this).attr("id").replace("divGroup", ""));
  });

  var data = quizData.questionData;
  var x, y;
  for (j = 0; j < values.length; j++) {
    var index = values.indexOf(values[j]);
    var diff = values[j] - index;
    if (diff <= 0) {
      x = parseInt(values[j]) - 1;
      y = index;
    }
  }

  var a = data[x];
  data.splice(x, 1);
  data.splice(y, 0, a);

  for (i = 0; i < data.length; i++) {
    data[i].id = i + 1;
  }

  $("#accordion > div").remove();
  for (i = 0; i < data.length; i++) {
    var bind_questionNum = i + 1;
    var bind_questionText = data[i].Question;
    var bind_options = data[i].Options;
    var bind_answer = data[i].Answer;
    var bind_reenforcement = data[i].Reenforcement_feedback;
    var bind_corrective = data[i].Corrective_feedback;
    var dynamic_panel = "panel" + bind_questionNum;

    var answer_data =
      '<div class="row"><div class="col-12">Answer: ' +
      bind_answer +
      "</div></div>";
    var feedback_data =
      '<div class="row"><div class="col-12">Reinforcement Feedback: ' +
      bind_reenforcement +
      '</div></div><div class="row"><div class="col-12">Corrective Feedback: ' +
      bind_corrective +
      "</div></div>";

    var optionData = "";

    for (j = 0; j < bind_options.length; j++) {
      var tempData =
        '<div class="col-6"><span>' +
        (j + 1) +
        " . </span><span>" +
        bind_options[j].option +
        "</span></div>";
      optionData = optionData.concat(tempData);
    }
    var accordionData =
      '<div class="card questionAccordion" id="divGroup' +
      bind_questionNum +
      '"> <div class="card-header" id="heading' +
      bind_questionNum +
      '"> <h3 class="mb-0"> <button class="btn btn-link" data-toggle="collapse" data-target="#collapse' +
      bind_questionNum +
      '" aria-expanded="true" aria-controls="collapse' +
      bind_questionNum +
      '" > <i class="fa" aria-hidden="true"></i> Question <span>' +
      bind_questionNum +
      '</span> </button> </h3> </div> <div id="collapse' +
      bind_questionNum +
      '" class="collapse" aria-labelledby="heading' +
      bind_questionNum +
      '" data-parent="#accordion"> <div class="card-body"> <div class="row ' +
      dynamic_panel +
      '"><div class="col-12">' +
      bind_questionText +
      "</div>" +
      optionData +
      "</div> " +
      answer_data +
      feedback_data +
      '<div class="row"><div class="col-12 actionDiv"><button onmouseenter="mouseEnter(\'Edit the question using this button.\');" onmouseleave="mouseLeave() type="button" class="btn btn-success btn-margin-right" onclick="editQuestion(' +
      data[i].Id +
      ')">Edit</button><button onmouseenter="mouseEnter(\'In case if you wish to roll-back the changes without saving them, press this button.\');" onmouseleave="mouseLeave() type="button" class="btn btn-danger" onclick="deleteQuestion(' +
      data[i].Id +
      ')" data-toggle="modal" data-target="#deleteConfirmationModal">Delete</button></div></div></div></div></div>';
    $("#accordion").append(accordionData);
  }
  questionCount = data.length;
  $("#questionTextarea").val("");
  $('#questioncharcount').text("0");
  $("#option1").val("");
  $('#option1charcount').text("0");
  $("#option2").val("");
  $('#option2charcount').text("0");
  $("#option3").val("");
  $('#option3charcount').text("0");
  $("#option4").val("");
  $('#option4charcount').text("0");
  $("#answerSelect").val("0");
  $("#Reenforcement_Feedback").val("");
  $("#Corrective_Feedback").val("");
  $('#reenforcecharcount').text("0");
  $('#correctivecharcount').text("0");
}

function removeAudio() {
  quizData.Background_audio = "";
  var audiolbl = document.getElementById("BackgroundAudioLabel");
  audiolbl.children[0].innerText = "Choose Background Audio";
}

function setQuiz() {
  $("#cuberoom-texture").attr("src", quizData.Background_theme);
  var cuberoom = document.querySelector("#cuberoom");
  cuberoom.setAttribute("material", "src: ");
  cuberoom.setAttribute("material", "src: #cuberoom-texture");

  $(".bgThemeDiv > img").removeClass("selected-theme");
  var str = quizData.Background_theme;
  if (str) {
    var res = str.split("/");
    var text = res[res.length - 1];
    var left_text = text.substring(0, text.indexOf("."));
    $("#" + left_text).addClass("selected-theme");
  }
  var audiolbl = document.getElementById("BackgroundAudioLabel");
  if (quizData.Background_audio == "") {
    audiolbl.children[0].innerText = "Choose Background Audio";
  } else {
    var audiopath = returnAssetName(quizData.Background_audio);
    audiolbl.children[0].innerText = audiopath;
  }
  var defaultImage = "assets/images/default.jpg";
  var gallery_entity = document.querySelector("#east-wall-entity0");
  if (
    quizData.branding_east_wall.image != "" &&
    quizData.branding_east_wall.image != undefined
  ) {
    setWallImages(gallery_entity, quizData.branding_east_wall.image);
    var lbl = document.getElementById("east-wall-logoLabel");
    var path = returnAssetName(quizData.branding_east_wall.image);
    lbl.children[0].innerText = path;
    eastWallImagePath = quizData.branding_east_wall.image;
  } else {
    setWallImages(gallery_entity, defaultImage);
    var lbl = document.getElementById("east-wall-logoLabel");
    var path = returnAssetName(defaultImage);
    lbl.children[0].innerText = path;
    eastWallImagePath = defaultImage;
    quizData.branding_east_wall.image = eastWallImagePath;
  }
  var gallery_entity = document.querySelector("#west-wall-entity0");
  if (
    quizData.branding_west_wall.image != "" &&
    quizData.branding_west_wall.image != undefined
  ) {
    setWallImages(gallery_entity, quizData.branding_west_wall.image);
    var lbl = document.getElementById("west-wall-logoLabel");
    var path = returnAssetName(quizData.branding_west_wall.image);
    lbl.children[0].innerText = path;
    westWallImagePath = quizData.branding_west_wall.image;
  } else {
    setWallImages(gallery_entity, defaultImage);
    var lbl = document.getElementById("west-wall-logoLabel");
    var path = returnAssetName(defaultImage);
    lbl.children[0].innerText = path;
    westWallImagePath = defaultImage;
    quizData.branding_west_wall.image = westWallImagePath;
  }

  var southWallLogoPath = document.getElementById("south-wall-logoLabel");
  var gallery_entity = document.querySelector("#south-wall-entity0");
  if (
    quizData.branding_south_wall.Logo != "" &&
    quizData.branding_south_wall.Logo != undefined
  ) {
    gallery_entity.setAttribute("src", quizData.branding_south_wall.Logo);
    gallery_entity.setAttribute("crossorigin", "anonymous");
    var lbl = document.getElementById("south-wall-logoLabel");
    var path = returnAssetName(quizData.branding_south_wall.Logo);
    lbl.children[0].innerText = path;
    southWallLogoPath = quizData.branding_south_wall.Logo;
  } else {
    gallery_entity.setAttribute("src", defaultImage);
    gallery_entity.setAttribute("crossorigin", "anonymous");
    var lbl = document.getElementById("south-wall-logoLabel");
    var path = returnAssetName(defaultImage);
    lbl.children[0].innerText = path;
    southWallLogoPath = defaultImage;
    quizData.branding_south_wall.Logo = southWallLogoPath;
  }

  var southWallImagePath = document.getElementById("south-wall-image2Label");
  var gallery_entity = document.querySelector("#south-wall-entity2");
  if (
    quizData.branding_south_wall.image2 != "" &&
    quizData.branding_south_wall.image2 != undefined
  ) {
    gallery_entity.setAttribute("src", quizData.branding_south_wall.image2);
    gallery_entity.setAttribute("crossorigin", "anonymous");
    var lbl = document.getElementById("south-wall-image2Label");
    var path = returnAssetName(quizData.branding_south_wall.image2);
    lbl.children[0].innerText = path;
    southWallImagePath = quizData.branding_south_wall.image2;
  } else {
    gallery_entity.setAttribute("src", defaultImage);
    gallery_entity.setAttribute("crossorigin", "anonymous");
    var lbl = document.getElementById("south-wall-image2Label");
    var path = returnAssetName(defaultImage);
    lbl.children[0].innerText = path;
    southWallImagePath = defaultImage;
    quizData.branding_south_wall.image2 = southWallImagePath;
  }

  $("#HeaderMessage").val(quizData.Heading_Message);
  if (quizData.Success_Message) {
    $("#SubheaderMessage").val(quizData.Success_Message);
  } else {
    $("#SubheaderMessage").val("Wow! You'v done it! You scored");
  }
  if (quizData.Failuer_Message) {
    $("#failuerMessage").val(quizData.Failuer_Message);
  } else {
    $("#failuerMessage").val("Oops! Better luck next time! You scored");
  }
  if (quizData.Passing_Percentage) {
    $("#passingPercentage").val(quizData.Passing_Percentage);
  } else {
    $("#passingPercentage").val(0);
  }
  $("#message").val(quizData.message);
  $("#EndMessage").val(quizData.End_Message);

  $('input:radio[name="right"]')
    .filter('[value="' + quizData.Show_right_answer + '"]')
    .attr("checked", true);
  $('input:radio[name="score"]')
    .filter('[value="' + quizData.Show_score_at_end + '"]')
    .attr("checked", true);
  $("#lunchScreenText").val(quizData.launch_text);

  var data = quizData.questionData;
  for (i = 0; i < data.length; i++) {
    var bind_questionNum = i + 1;
    var bind_questionText = data[i].Question;
    var bind_options = data[i].Options;
    var bind_answer = data[i].Answer;
    var bind_reenforcement = data[i].Reenforcement_feedback;
    var bind_corrective = data[i].Corrective_feedback;
    var dynamic_panel = "panel" + bind_questionNum;
    var answer_data =
      '<div class="row"><div class="col-12">Answer: ' +
      bind_answer +
      "</div></div>";
    var feedback_data =
      '<div class="row"><div class="col-12">Reinforcement Feedback: ' +
      bind_reenforcement +
      '</div></div><div class="row"><div class="col-12">Corrective Feedback: ' +
      bind_corrective +
      "</div></div>";
    var optionData = "";

    for (j = 0; j < bind_options.length; j++) {
      var tempData =
        '<div class="col-6"><span>' +
        (j + 1) +
        " . </span><span>" +
        bind_options[j].option +
        "</span></div>";
      optionData = optionData.concat(tempData);
    }
    var accordionData =
      '<div class="card questionAccordion" id="divGroup' +
      bind_questionNum +
      '"> <div class="card-header" id="heading' +
      bind_questionNum +
      '"> <h3 class="mb-0"> <button class="btn btn-link" data-toggle="collapse" data-target="#collapse' +
      bind_questionNum +
      '" aria-expanded="true" aria-controls="collapse' +
      bind_questionNum +
      '"  onclick="setQuestionOnScreen(' +
      bind_questionNum +
      ')"> <i class="fa" aria-hidden="true"></i> Question <span>' +
      bind_questionNum +
      '</span> </button> </h3> </div> <div id="collapse' +
      bind_questionNum +
      '" class="collapse" aria-labelledby="heading' +
      bind_questionNum +
      '" data-parent="#accordion"> <div class="card-body"> <div class="row ' +
      dynamic_panel +
      '"><div class="col-12">' +
      bind_questionText +
      "</div>" +
      optionData +
      "</div> " +
      answer_data +
      feedback_data +
      '<div class="row"><div class="col-12 actionDiv"><button onmouseenter="mouseEnter(\'Edit the question using this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-success btn-margin-right" onclick="editQuestion(' +
      data[i].Id +
      ')">Edit</button><button onmouseenter="mouseEnter(\'In case if you wish to roll-back the changes without saving them, press this button.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-danger" onclick="deleteQuestion(' +
      data[i].Id +
      ')" data-toggle="modal" data-target="#deleteConfirmationModal">Delete</button></div></div></div></div></div>';
    $("#accordion").append(accordionData);
  }
  questionCount = data.length;
  $("#questionTextarea").val("");
  $('#questioncharcount').text("0");
  $("#option1").val("");
  $('#option1charcount').text("0");
  $("#option2").val("");
  $('#option2charcount').text("0");
  $("#option3").val("");
  $('#option3charcount').text("0");
  $("#option4").val("");
  $('#option4charcount').text("0");
  $("#answerSelect").val("0");
  $("#Reenforcement_Feedback").val("");
  $("#Corrective_Feedback").val("");
  $('#reenforcecharcount').text("0");
  $('#correctivecharcount').text("0");
}

function getExperienceToSave() {
  quizData.Background_audio_loop = LoopAns;

  if ($("#HeaderMessage").val() != "")
    quizData.Heading_Message = $("#HeaderMessage").val().replace(/\s+$/, "");
  else quizData.Heading_Message = "";

  if ($("#SubheaderMessage").val() != "")
    quizData.Success_Message = $("#SubheaderMessage").val().replace(/\s+$/, "");
  else quizData.Success_Message = " ";

  if ($("#failuerMessage").val() != "")
    quizData.Failuer_Message = $("#failuerMessage").val().replace(/\s+$/, "");
  else quizData.Failuer_Message = " ";
  if ($("#EndMessage").val() != "")
    quizData.End_Message = $("#EndMessage").val().replace(/\s+$/, "");
  else quizData.End_Message = "";

  if ($("#passingPercentage").val() != "")
    quizData.Passing_Percentage = $("#passingPercentage")
    .val()
    .replace(/\s+$/, "");
  else quizData.Passing_Percentage = "";

  var lauchText = $(".lunchScreenText");

  var lunchTextItem = lauchText[0].value;
  quizData.launch_text = lunchTextItem;

  var splashInstruction = $(".instructionSetForDesktop");
  var item = splashInstruction[0].value;
  quizData.splash_instruction = item;

  var splashAndroidInstruction = $(".instructionSetForAndroid")
  var item = splashAndroidInstruction[0].value;
  quizData.splash_android_instruction = item;

  if (splashImagePath) quizData.splash_image = splashImagePath;

  quizData.Show_right_answer = $("input[name='right']:checked").val();
  quizData.Show_score_at_end = $("input[name='score']:checked").val();

  var headerFont = $(".headerfont");
  var headerFontColor = headerFont[0].value;
  if (headerFontColor.includes("#")) {
    quizData.splashHeaderColor = headerFontColor;
  } else {
    quizData.splashHeaderColor = "#" + headerFontColor;
  }

  var splashbg = $(".splashBg");
  var splashBgColor = splashbg[0].value;
  if (splashBgColor.includes("#")) {
    quizData.splashBackgroundColor = splashBgColor;
  } else {
    quizData.splashBackgroundColor = "#" + splashBgColor;
  }

  if (quizData.Opacity) {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = quizData.Opacity;
    var displayvalue = "(" + Math.round(opacity.value * 100) + "%)";
    document.getElementById("rangeValue").innerText = displayvalue;
  } else {
    quizData.Opacity = fixOpacity;
  }

  var modifiedJSON = quizData;
  var dataToPost = JSON.stringify(modifiedJSON);
  return dataToPost;
}

function addLaunchScreenText() {
  toggleSideNav("launchSidenav");
  quizData.launch_text = document.getElementById("lunchScreenText").value;
}

function toggleSideNav(sidenavId) {
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function (navigation) {
    if (navigation.classList.contains("active") && navigation.id != sidenavId)
      navigation.classList.remove("active");
  });
  document.getElementById(sidenavId).classList.toggle("active");
  if(sidenavId=='launchSidenav'){
    
    $("#LaunchScreenCollapse").addClass("show");
  }
  if(sidenavId=="questionSidenav"){
    if (quizData.questionData.length >= 1) {
        
      for (i = quizData.questionData.length - 1; i < 0; i--) {
        $("#collapse" + i).removeClass("show");
      }
      
      $("#addQuestionDivCollapse").addClass("show");
      
    }else{
      $("#addQuestionDivCollapse").addClass("show");
    }
    
    if (quizData.questionData.length >= 20) {
      $("#addQuestionMainAccordion").addClass('display-none');
    } else {
      $("#addQuestionMainAccordion").removeClass('display-none');
    }
  }
  toggleOverlay();
}

function toggleOverlay() {
  var sidenavActive = false;
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function (navigation) {
    if (navigation.classList.contains("active")) sidenavActive = true;
  });
  if (sidenavActive)
    document.getElementById("overlay").classList.add("overlay");
  else document.getElementById("overlay").classList.remove("overlay");
}

function returnAssetName(path) {
  if (path != undefined) {
    var str = path;
    var res = str.split("/");
    res = res[res.length - 1];
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

/* Summernote MAxlength, maxcount and popsnacker */



function makeFieldEmpty() {
  westWallImagePath = "";
  westWallVideoPath = "";
  eastWallImagePath = "";
  eastWallVideoPath = "";
  backgroundAudioPath = "";
  $("#addQuestion1").text("Add Question");
  var lblEastWallImage = document.getElementById("eastWallImageLable");
  lblEastWallImage.children[0].innerText = "Select Image";

  var lblEastWallVideo = document.getElementById("eastWallVideoLable");
  lblEastWallVideo.children[0].innerText = "Select Video";

  var lblWestWallImage = document.getElementById("westWallImageLable");
  lblWestWallImage.children[0].innerText = "Select Image";

  var lblWestWallVideo = document.getElementById("westWallVideoLable");
  lblWestWallVideo.children[0].innerText = "Select Video";

  var backgroundAudio = document.getElementById("backgroundAudioLable");
  backgroundAudio.children[0].innerText = "Select Audio";
}

// function  for clear first question default image values from lable.
function clearDefaultImageValue() {
  westWallImagePath = "";
  eastWallImagePath = "";

  var lblEastWallImage = document.getElementById("eastWallImageLable");
  lblEastWallImage.children[0].innerText = "Select Image";
  var lblWestWallImage = document.getElementById("westWallImageLable");
  lblWestWallImage.children[0].innerText = "Select Image";
}

// Function to allow paste question text.
function pasteQuestionText(element,size) {
  setTimeout(function(){
    ontextChange(element,size)
}, 0);
}

function setQuestionOnScreen(questionNumber) {
  var questionLength = quizData.questionData.length;
  var decQuestionNumber = questionNumber - 1;
  for (var index = 0; index < questionLength; index++) {
    if (index == decQuestionNumber) {
      questiondisplayed = true;
      textview = document.getElementById("questionText");
      textview.setAttribute("visible", "true");
      textview.setAttribute("text", "value", quizData.questionData[index].Question);
      var option = document.getElementById("option-0");
      option.setAttribute("text", "value", "");
      option = document.getElementById("option-1");
      option.setAttribute("text", "value", "");
      option = document.getElementById("option-2");
      option.setAttribute("text", "value", "");
      option = document.getElementById("option-3");
      option.setAttribute("text", "value", "");
      for (var j = 0; j < quizData.questionData[index].Options.length; j++) {
        option = document.getElementById("option-" + j);
        option.setAttribute("visible", "true");
        option.setAttribute("text", "value", quizData.questionData[index].Options[j].option);
      }

      if (quizData.questionData[index].branding_west_wall.Image != "" && quizData.questionData[index].branding_west_wall.Image != undefined) {
        // var lblWestWallImage = document.getElementById("westWallImageLable");
        // lblWestWallImage.children[0].innerText = returnAssetName(
        //   quizData.questionData[index].branding_west_wall.Image
        // );
        var gallery_entity = document.querySelector(
          "#west-wall-entity0"
        );
        var changedgallery = document.querySelector(
          "#west-wall-texture0"
        );
        changedgallery.setAttribute("crossorigin", "anonymous");
        changedgallery.setAttribute("src", quizData.questionData[index].branding_west_wall.Image);
        gallery_entity.setAttribute("material", "src: #");
        setWallImages(gallery_entity, quizData.questionData[index].branding_west_wall.Image);
      } else {
        var gallery_entity = document.querySelector(
          "#west-wall-entity0"
        );
        var defaultImage = quizData.branding_west_wall["image"];
        setWallImages(gallery_entity, defaultImage);
      }
      if (quizData.questionData[index].branding_east_wall.Image != "" && quizData.questionData[index].branding_east_wall.Image != undefined) {
        // var lbleastWallImage = document.getElementById("eastWallImageLable");
        // lbleastWallImage.children[0].innerText = returnAssetName(
        //   quizData.questionData[index].branding_east_wall.Image
        // );

        var gallery_entity = document.querySelector(
          "#east-wall-entity0"
        );
        var changedgallery = document.querySelector(
          "#east-wall-texture0"
        );
        changedgallery.setAttribute("crossorigin", "anonymous");
        changedgallery.setAttribute("src", quizData.questionData[index].branding_east_wall.Image);
        gallery_entity.setAttribute("material", "src: #");
        setWallImages(gallery_entity, quizData.questionData[index].branding_east_wall.Image);
      } else {
        var gallery_entity = document.querySelector(
          "#east-wall-entity0"
        );
        var defaultImage = quizData.branding_east_wall["image"];
        setWallImages(gallery_entity, defaultImage);
      }
    }
  }
}
/* Summernote MAxlength, maxcount and popsnacker */
function setWallImages(el, image) {
  var img = new Image();

  img.onload = function () {
    var size;

    size = this.height / this.width;
    if ((215 * size) < 161) {
      //alert(size);
      el.setAttribute("geometry", "height", (215 * size));
    } else {
      el.setAttribute("geometry", "height", 161);
    }
    el.setAttribute("material", "src:" + image);
    el.setAttribute("crossorigin", "anonymous");
  }
  img.src = image;
}

function OnChangeOption() {

  Loop = document.getElementById("loopDropDownID");
  LoopAns = Loop.options[Loop.selectedIndex].text;

  quizData.Background_audio_loop = LoopAns;
}

// function logPaste(event) {
//   var txtLength = $('#questionTextarea').val().length;
//   if(event.which == 3){
//     $('#questioncharcount').text(txtLength);
//     if (txtLength >= 500) {
//       popSnackbar('warning', "Limit exceed.");
//     }
//   }
// }

// $("#questionTextarea").bind('input', function(e) {
//   // var ctl = $(this);
//   var txtLength = $('#questionTextarea').val().length;
//   setTimeout(function() {
//     $('#questioncharcount').text(txtLength);
//     if (txtLength >= 500) {
//       popSnackbar('warning', "Limit exceed.");
//     }
//   }, 100);
// });

function ontextChange(event, len) {
  var txtLength = event.value.length;
  var id = event.id;
  if (id == "questionTextarea") {
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
