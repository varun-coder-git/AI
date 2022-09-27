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
registerAframeClickDragComponent(window.AFRAME);
var newIconImage = "/act/v0.1/pointandanswer/assets/images/icons/images.png";
var newIconSize;
var fixOpacity = 0.2;
var answerid = "";
var congratulations = "";
var thankmsg = "";
var thankyou = "";
var endMessageByUser = "";
var correctAnswer = 0;
var deleteTeleportID = null;
var printQuestionFlag = true;
var hotspotCount = 0;
var totalTeleports = 0;
var showscreen = "Yes";
var totalPoints = "";
var editQuestionId = null;
var isSphereSelected = false;
var hotspotsToSave = [];
var placeToSave = [];
var hotspotIndex = 0;
var right = false;
var selectedQuestion;
var answerslected = false;
var PointandAnswer = "";
var activeScreen = "";
var totalQuestion = 20;
var questionCount = 0;
var imagePath;
var wall;
var splashImagePath;
var order;
var assettype;
var imagetype;
var browsedImage = false;
var questionPanel = false;
var PanelLocation = "default";
var assetsLocation;
var questionIcon = '';
var selectedMarker = '';
var markerId = '';
var editQuestionID = '';
var editQuestionId = '';
var data;
var isDisplayed = false;
function initializeCustomization(experienceToCustomize) {
  PointandAnswer = JSON.parse(experienceToCustomize);
  activeScreen = PointandAnswer.experienceData[0];
  generateRoom(activeScreen);
  $('#Heading').val(activeScreen.congratulations);
  $('#Description').val(activeScreen.thankYouMsg);
  $('#messagePoint').val(activeScreen.totalPoints);
  if (activeScreen.Passing_Percentage) {
    $('#passingPercentage').val(activeScreen.Passing_Percentage);
  } else {
    $('#passingPercentage').val(0);
  }
  if (activeScreen.Success_Message) {
    $('#SuccessMessage').val(activeScreen.Success_Message);
  } else {
    $('#SuccessMessage').val("Wow! You'v done it! You scored");
  }
  if (activeScreen.Failuer_Message) {
    $('#failuerMessage').val(activeScreen.Failuer_Message);
  } else {
    $('#failuerMessage').val("Oops! Better luck next time! You scored");
  }

  if (PointandAnswer.launch_text) {
    document.getElementsByClassName("lunchScreenText").innerHTML = PointandAnswer.launch_text;
    $('.lunchScreenText').summernote('code', PointandAnswer.launch_text);


    var lauchText = $(".lunchScreenText");
    var div = document.createElement("div");
    div.innerHTML = lauchText[0].value;
    var plainText = div.textContent || div.innerText || "";
    var maxLength = 350;
    $('#maxCount').text(plainText.length);

  }
  if (PointandAnswer.splash_instruction) {
    document.getElementsByClassName("instructionSetForDesktop").value = PointandAnswer.splash_instruction;
    $('.instructionSetForDesktop').summernote('code', PointandAnswer.splash_instruction);
  }
  if (PointandAnswer.splash_android_instruction) {
    document.getElementsByClassName("instructionSetForAndroid").value = PointandAnswer.splash_android_instruction;
    $('.instructionSetForAndroid').summernote('code', PointandAnswer.splash_android_instruction);
  }
  if (PointandAnswer.splash_image) {
    splashImagePath = PointandAnswer.splash_image;
    var splashImageName = splashImagePath.split("/")[splashImagePath.split("/").length - 1];
    $("#splashImageLable").text(splashImageName);
  }
  if (PointandAnswer["entry_view"]) {
    $("#CamEntity").attr("rotation", PointandAnswer["entry_view"]);
  }

  if (PointandAnswer.splashBackgroundColor) {
    var splashBackground = document.getElementById("splashBackground");
    splashBackground.value = PointandAnswer.splashBackgroundColor;
    splashBackground.style.backgroundColor = splashBackground.value;
  } else {
    var splashBackground = document.getElementById("splashBackground");
    splashBackground.style.backgroundColor = "#8F8F8F";
    splashBackground.value = "#8F8F8F";
  }

  if (PointandAnswer.Opacity) {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = PointandAnswer.Opacity;
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

  if (PointandAnswer.splashHeaderColor) {
    var splashHeaderColor = document.getElementById('splashHeaderColor')
    splashHeaderColor.value = PointandAnswer.splashHeaderColor;
    splashHeaderColor.style.backgroundColor = splashHeaderColor.value;
  }
  var scene = document.querySelector('a-scene');
  if (activeScreen.placeSky) {
    var aSky = document.createElement('a-sky');
    aSky.setAttribute('id', 'skyImage');
    aSky.setAttribute('src', activeScreen.placeSky);
    scene.appendChild(aSky);
    $('#imageRadio').trigger('click');
    $('#imageFilePopup').css('display', 'block');
    $('#videoFilePopup').css('display', 'none');
    $('#skyImagePreview').css('display', 'block');
    $('#placeSky').attr('src', activeScreen.placeSky);
    var name = activeScreen.placeSky.split('/');
    name = name[name.length - 1];
    if (name.length > 25) {
      var strat = name.substr(0, 15);
      var end = name.substr(name.length - 7, name.length);
      name = strat + '...' + end;
    }
    $('#skyImageLable').html(name);
  } else {
    var assets = document.querySelector('a-assets');
    var skyVideo = document.createElement('video');
    $('#skyImagePreview').css('display', 'none');
    $('#imageFilePopup').css('display', 'none');
    $('#videoFilePopup').css('display', 'block');
    $('#videoRadio').trigger('click');
    skyVideo.setAttribute('id', "videoskyid");
    skyVideo.setAttribute('src', activeScreen.videoskypath);
    skyVideo.setAttribute('autoplay', 'true');
    skyVideo.muted = true;
    skyVideo.play()
    //skyVideo.setAttribute('muted', '');
    skyVideo.setAttribute('loop', '');
    skyVideo.setAttribute('crossorigin', 'anonymous');
    assets.appendChild(skyVideo);
    var aVideoSphere = '';
    aVideoSphere = document.createElement('a-videosphere');
    aVideoSphere.setAttribute('src', "#videoskyid");
    aVideoSphere.setAttribute('crossorigin', 'anonymous');
    scene.appendChild(aVideoSphere);
    var name = activeScreen.videoskypath.split('/');
    name = name[name.length - 1];
    if (name.length > 25) {
      var strat = name.substr(0, 15);
      var end = name.substr(name.length - 7, name.length);
      name = strat + '...' + end;
    }
    $('#skyVideoLable').html(name);
  }

}

function setEntryView() {
  if ($('#freezeView').hasClass('disabled')) {
    //Nothing to do here
  } else {
    var cam = document.querySelector("[camera]");
    var pos = cam.getAttribute("rotation");
    var oldpos = 0;
    if (PointandAnswer["entry_view"]) {
      oldpos = PointandAnswer["entry_view"].split(" ")[1];
    }
    PointandAnswer["entry_view"] = "0 " + (pos.y + parseInt(oldpos)) + " 0";
    $('#freezeView').addClass('disabled');
    $('#freezeView').click(toastr.success('Presto! This view is now the Launch View of this Experience.'));
  }
}

$('div#scene-div').mouseup(function () {
  $('#freezeView').removeClass('disabled');
});
// AFRAME.registerComponent('mousedrag', {
// init: function () {
//     this.el.addEventListener('click', function () {
//         $('#freezeView').removeClass('disabled');
//     });
// }
// });

function getExperienceToSave() {
  var passingPercentage = document.getElementById("passingPercentage")

  console.log(passingPercentage.value)

  PointandAnswer.experienceData[0].Passing_Percentage = passingPercentage.value;
  var lauchText = $(".lunchScreenText");

  var lunchTextItem = lauchText[0].value;
  PointandAnswer.launch_text = lunchTextItem;

  var splashInstruction = $(".instructionSetForDesktop");
  var item = splashInstruction[0].value;
  PointandAnswer.splash_instruction = item;

  var splashAndroidInstruction = $(".instructionSetForAndroid")
  var item = splashAndroidInstruction[0].value;
  PointandAnswer.splash_android_instruction = item;

  PointandAnswer.splash_image = splashImagePath;

  var headerFont = $(".headerfont");
  var headerFontColor = headerFont[0].value;
  if (headerFontColor.includes('#')) {
    PointandAnswer.splashHeaderColor = headerFontColor;
  } else {
    PointandAnswer.splashHeaderColor = '#' + headerFontColor;
  }

  var splashbg = $(".splashBg");
  var splashBgColor = splashbg[0].value;
  if (splashBgColor.includes('#')) {
    PointandAnswer.splashBackgroundColor = splashBgColor;
  } else {
    PointandAnswer.splashBackgroundColor = '#' + splashBgColor;
  }


  if (PointandAnswer.Opacity) {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = PointandAnswer.Opacity;
    var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
  } else {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = fixOpacity;
    var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    PointandAnswer.Opacity = opacity.value;
  }

  var modifiedJSON = PointandAnswer;
  var dataToPost = JSON.stringify(modifiedJSON);
  return dataToPost;
  //   dataToPost.unwrap();
}


function getAssetPath(assetPath) {
  if (assetPath) {
    if (imagetype == 'splashImage') {
      splashImagePath = assetPath;
      var splashImageName = splashImagePath.split("/")[splashImagePath.split("/").length - 1];
      $("#splashImageLable").text(splashImageName);
    } else if (imagetype == 'sky') {
      activeScreen.videoskypath = '';
      $('a-videosphere').attr('visible', 'false');
      $('#videoskyid').attr('src', '');
      activeScreen.placeSky = assetPath;
      if (!document.querySelector('a-sky')) {
        var scene = document.querySelector('a-scene');
        var aSky = document.createElement('a-sky');
        aSky.setAttribute('id', 'skyImage');
        aSky.setAttribute('src', activeScreen.placeSky);
        scene.appendChild(aSky);
        $('#placeSky').attr('src', activeScreen.placeSky);
      } else {
        $('a-sky').attr('visible', 'true');
        $('a-sky').attr('src', '');
        $('a-sky').attr('src', activeScreen.placeSky);
        $('#skyImagePreview').css('display', 'block');
        $('#placeSky').attr('src', activeScreen.placeSky);
      }
      var name = activeScreen.placeSky.split('/');
      name = name[name.length - 1];
      if (name.length > 25) {
        var strat = name.substr(0, 15);
        var end = name.substr(name.length - 7, name.length);
        name = strat + '...' + end;
      }
      $('#skyImageLable').html(name);
    } else if (imagetype == 'question') {
      for (var i = 0; i < 12; i++) {
        var iconIds = 'i' + i + '-1';
        if (document.querySelector("#" + iconIds).classList.contains('icon-selected')) {
          document.querySelector("#" + iconIds).classList.remove('icon-selected');
        }
      }

      var qID = $("#hidden-question-id").val();
      var name = assetPath.split('/');
      name = name[name.length - 1];
      if (name.length > 25) {
        var strat = name.substr(0, 15);
        var end = name.substr(name.length - 7, name.length);
        name = strat + '...' + end;
      }
      $('#questionIconImageLable').html(name);

      if (qID != '') {
        questionIcon = assetPath;
        browsedImage = false
      } else {
        browsedImage = true
        questionIcon = '';
        assetsLocation = assetPath;
      }
      //changepointandanswerIconImage();
    } else if (imagetype == 'skyVideo') {
      var assets = document.querySelector('a-assets');
      var scene = document.querySelector('a-scene');
      $('a-sky').attr('visible', 'false');
      $('#placeSky').attr('src', '');
      $('#skyImagePreview').css('display', 'none');
      $('a-sky').attr('src', '');
      $('a-videosphere').attr('visible', 'true');
      if (!document.querySelector('a-videosphere')) {
        var skyVideo = document.createElement('video');
        skyVideo.setAttribute('id', "videoskyid");
        skyVideo.setAttribute('src', assetPath);
        skyVideo.setAttribute('autoplay', 'true');
        //skyVideo.setAttribute('muted', '');
        skyVideo.muted = true;
        skyVideo.play()
        skyVideo.setAttribute('loop', '');
        skyVideo.setAttribute('crossorigin', 'anonymous');
        assets.appendChild(skyVideo);
        var aVideoSphere = '';
        aVideoSphere = document.createElement('a-videosphere');
        aVideoSphere.setAttribute('src', "#videoskyid");
        aVideoSphere.setAttribute('crossorigin', 'anonymous');
        scene.appendChild(aVideoSphere);
      } else {
        $('#videoskyid').attr('src', assetPath);
        $('a-videosphere').attr('src', '');
        $('a-videosphere').attr('src', '#videoskyid');
      }
      activeScreen.placeSky = '';
      activeScreen.videoskypath = assetPath;
      var name = activeScreen.videoskypath.split('/');
      name = name[name.length - 1];
      if (name.length > 25) {
        var strat = name.substr(0, 15);
        var end = name.substr(name.length - 7, name.length);
        name = strat + '...' + end;
      }
      $('#skyVideoLable').html(name);
    }
  } else {
    popSnackbar('warning', 'Please select a file');
  }
}

function popSnackbar(type, message) {
  var x = document.getElementById("snackbar");
  x.innerText = message;
  x.className = "show " + type;
  setTimeout(function () {
    x.className = x.className.replace("show " + type, "");
  }, 2000);
}

function getAssetType() {
  return assettype;
}

function openAssetsPopup(type, imageType) {
  assettype = type;
  imagetype = imageType;
  window.parent.triggerAssetsPopup();
}

AFRAME.registerComponent('mouseclick', {
  init: function () {
    this.el.addEventListener('mouseup', function (e) {
      setAccordian();
      $('#displayquestiontitle').html("Add Question");
      //unselect all question marker  
      $("#questionTextarea").val('');
      $("#accOption1").val('');
      $("#accOption2").val('');
      $("#accOption3").val('');
      $("#accOption4").val('');
      $("#answerSelect").val('0');
      $('#questionIconImageLable').html('Choose Image');
      $("#hidden-question-id").val('');

      $("#animateIconSelect").prop('checked', false);
      for (var i = 0; i < 12; i++) {
        var iconIds = 'i' + i + '-1';
        if (document.querySelector("#" + iconIds).classList.contains('icon-selected')) {
          document.querySelector("#" + iconIds).classList.remove('icon-selected');
        }
        var panelImgId = 'i' + i + '-Panelcss';
        if (document.querySelector("#" + panelImgId).classList.contains('icon-selected')) {
          document.querySelector("#" + panelImgId).classList.remove('icon-selected');
        }
      }


      selectedMarker = '';
      editQuestionID = '';
      if (selectedQuestion == this) {
        //  current marker and previous marker are same
        selectedQuestion = null;
        editQuestionId = null;
        $('#editTeleport').addClass('disabled');
        $('#removeTeleport').addClass('disabled');
      } else {
        selectedQuestion = this;
        var id = this.id.split('-');
        // $('#addQuestion1').removeClass('disabled');
        $('#editTeleport').removeClass('disabled');
        $('#removeTeleport').removeClass('disabled');
        id = id[id.length - 1];
        editQuestionId = 'teleport-' + id;
        selectedMarker = ''
        $('#questionSidebar').trigger('click');
        if (document.getElementById("que" + id)) {
          //default marker for new quetion 
          document.querySelector("#i6-1").classList.add('icon-selected');
          document.querySelector("#i0-Panelcss").classList.add('icon-selected');

          if (document.getElementById('addQuestionDivCollapse').classList.contains("show")) {
            $('#addQuestion1').trigger('click');
          }
          if (!document.querySelector('#collapse' + id).classList.contains('show'))
            $('#que' + id).trigger('click');
          // document.querySelector('#que'+id).scrollIntoView({ behavior: 'smooth'});
          setTimeout(function () {
            document.querySelector('#que' + id).scrollIntoView({
              behavior: 'smooth'
            });

          }, 400);
        } else {
          //default quetion panel for new quetion 
          document.querySelector("#i0-Panelcss").classList.add('icon-selected');

          var iD = this.id.split('-');
          markerId = iD[iD.length - 1];
          selectedMarker = 'teleport-' + iD[iD.length - 1];

          editedQuestionId = selectedMarker
          data = activeScreen.teleports;
          for (i = 0; i < data.length; i++) {
            if (data[i].teleportID == selectedMarker) {
              var name = data[i].teleportToPlaceImage.split('/');
              name = name[name.length - 1];
              if (name.length > 25) {
                var strat = name.substr(0, 15);
                var end = name.substr(name.length - 7, name.length);
                name = strat + '...' + end;
              }
              $('#questionIconImageLable').html(name);
              switch (name) {
                case 'Assembly-Point.png':
                  var id = 'i0-1';
                  break;
                case 'gift.png':
                  var id = 'i1-1';
                  break;
                case 'Hand-Pointer.png':
                  var id = 'i2-1';
                  break;
                case 'Info.png':
                  var id = 'i3-1';
                  break;
                case 'Location-Marker.png':
                  var id = 'i4-1';
                  break;
                case 'money.png':
                  var id = 'i5-1';
                  break;
                case 'images.png':
                  var id = 'i6-1';
                  break;
                case 'right.png':
                  var id = 'i7-1';
                  break;
                case 'smily.png':
                  var id = 'i8-1';
                  break;
                case 'star.png':
                  var id = 'i9-1';
                  break;
                case 'Warning.png':
                  var id = 'i10-1';
                  break;
                case 'wrong.png':
                  var id = 'i11-1';
                  break;
                default:
                  var id = '0000';
              }

              if (id != '0000')
                document.querySelector("#" + id).classList.add('icon-selected');

              if (data[i].questionIconSize == 'Small') {
                $("#questionIconSelect").val("Small");
              } else if (data[i].questionIconSize == 'Medium') {
                $('#questionIconSelect').val("Medium");
              } else if (data[i].questionIconSize == 'Large') {
                $('#questionIconSelect').val("Large");
              }

            }
            // document.querySelector("#" + id).classList.add('icon-selected');
          }


          // show add quetion panel 
          if (!document.getElementById('addQuestionDivCollapse').classList.contains('show')) {
            $('#addQuestion1').trigger('click');
          }

          // collapse all saved quetion panel
          for (i = 0; i <= id; i++) {
            if (document.querySelector('#collapse' + i).classList.contains('show'))
              $('#que' + id).trigger('click');
          }

        }

      }



    });
    this.el.addEventListener('dragstart', function () {
      //			var teleportTextEle = document.querySelector("#text-" + this.getAttribute('id'));
      //			teleportTextEle.setAttribute("visible", false);

    });
    this.el.addEventListener('dragend', function () {
      //var teleportTextEle = document.querySelector("#text-" + this.getAttribute('id'));
      var newPosition = this.getAttribute('position');
      //			teleportTextEle.setAttribute("position", "" + newPosition.x + " " + (newPosition.y - 7) + " " + newPosition.z);
      //			teleportTextEle.setAttribute("visible", true);
      var pos = newPos(newPosition.x, newPosition.y, newPosition.z);
      updateHotspotPosition(pos, this.id);
      $('#' + this.id).attr('position', pos);

    });
    // this.el.addEventListener('mouseup', function() {
    // 	updateHotspotPosition(this);
    // });
  }
});

function changeSkyType(type) {
  if (type == 'Image') {
    $('#imageFilePopup').css('display', 'block');
    $('#videoFilePopup').css('display', 'none');
    $('#skyImagePreview').css('display', 'block');
  } else {
    $('#imageFilePopup').css('display', 'none');
    $('#videoFilePopup').css('display', 'block');
    $('#skyImagePreview').css('display', 'none');
  }
}

function toggleSideNav(sidenavId) {
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function (navigation) {
    if (navigation.classList.contains('active') && navigation.id != sidenavId) {
      navigation.classList.remove('active');
    }
  });

  document.getElementById(sidenavId).classList.toggle("active");
  if (sidenavId == "questionSidenav") {
    if (activeScreen.teleports.length >= 1) {
      for (var i = 1; i < activeScreen.teleports.length; i++) {
        $("#collapse" + i).removeClass("show");
      }
      $("#addQuestionDivCollapse").removeClass("show");
    } else {
      $("#addQuestionDivCollapse").addClass("show");
    }
    $("#collapse0").addClass("show");

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

function scrollSideNav(id) {
  $('#' + id).scrollTop(0)
};

function closeSideNav() {

  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function (navigation) {
    navigation.classList.remove('active');
  });
  toggleOverlay();
}

$(document).ready(function () {
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

  // $("#overlay").click(function () {
  //   $(".sidenav").removeClass('active');
  //   $("#overlay").removeClass('overlay');
  // });

  $("#overlay").click(function () {
    var sidenavIdQue = document.getElementById("questionSidenav");
    if (sidenavIdQue) {
      if ($("#questionTextarea").val().length > 0) {
        $("#questionSidenav").addClass("active");
        $("#overlay").addClass("overlay");
        popSnackbar("warning", "Please save/cancel question first.");
      } else {
        $(".sidenav").removeClass("active");
        $("#overlay").removeClass("overlay");
      }
    } else {
      $(".sidenav").removeClass("active");
      $("#overlay").removeClass("overlay");
    }
  });
  $('#questionTextarea').keypress(function (event) {

    if (event.keyCode == 13) {
      event.preventDefault();
    }
  });
  // $("#addQuestion").click(function () {


  //     var questionText = $("#questionTextarea").val();
  //     var option1 = $("#accOption1").val();
  //     var option2 = $("#accOption2").val();
  //     var option3 = $("#accOption3").val();
  //     var option4 = $("#accOption4").val();
  //     var answer = $("#answerSelect option:selected").val();
  //     var totaloption = 2



  //     if (questionText == '' || questionText == undefined || questionText == null) {
  //         popSnackbar('warning', 'Please add Question');

  //         return;
  //     }
  //     if (option1 == '' || option1 == undefined || option1 == null) {
  //         popSnackbar('warning', 'Please add Option 1');
  //         return;
  //     }
  //     if (option2 == '' || option2 == undefined || option2 == null) {
  //         popSnackbar('warning', 'Please add Option 2');
  //         return;
  //     }

  //     if ($("#answerSelect option:selected").val() == 0) {
  //         popSnackbar('warning', 'Please select answer');

  //         return;
  //     }


  //     if (option3 != '' && option3 != undefined && option3 != null) {
  //         totaloption++;
  //     }
  //     if (option4 != '' && option4 != undefined && option4 != null) {
  //         totaloption++;
  //     }
  //     if (answer > totaloption) {

  //         popSnackbar('warning', 'Please select answer from option provided');
  //         return;
  //     }
  //     //questionCount++;
  //     var markerEl = document.querySelector('#marker');
  //     var position = markerEl.object3D.getWorldPosition();
  //     // newTeleport.setAttribute('position', position);
  //     if (activeScreen.teleports.length < 999) {
  //         questionData = {
  //             "teleportID": "teleport-" + id,
  //             "teleportPosition": position.x + ' ' + position.y + ' ' + position.z,
  //             "teleportToPlaceImage": "",
  //             "Question": questionText,
  //             "Options": [{
  //                 "option": option1
  //             },
  //             {
  //                 "option": option2
  //             },
  //             ],
  //             "Answer": answer - 1,
  //             "points": "10",
  //             "questionPanel": ""
  //         };
  //         if (questionImage) {
  //             questionData.teleportToPlaceImage = assetsLocation;
  //         } else {
  //             questionData.teleportToPlaceImage = 'assets/images/images.png';
  //         }
  //         if (option3 != '' && option3 != undefined && option3 != null) {
  //             questionData.Options.push({
  //                 "option": option3
  //             });
  //         }
  //         if (option4 != '' && option4 != undefined && option4 != null) {
  //             questionData.Options.push({
  //                 "option": option4
  //             });
  //         }
  //         questionData.questionPanel = PanelLocation + "_" + totaloption + ".jpg";
  //         questionData.questionIconSize = $('#questionIconSelect option:selected').val()
  //         activeScreen["teleports"].push(questionData);
  //     } else {
  //         $(".questionDiv > div").remove();
  //         var questionMessage = '<div style="font-size:20px;color:forestgreen;font-weight:bold;">You have added 20 questions successfully...!!!</div>';
  //         $(".questionDiv").append(questionMessage);
  //         $(".questionDiv").css("background-color", "#f7f7f7");
  //     }
  //     $(".add_question").trigger('click');
  //     $('#questionIconImageLable').html('Choose Image');
  //     generateRoom();
  //     questionImage = false;
  //     assetsLocation = '';
  // });

  $(".questionAccordions").click(function () {
    // 	if($("#addQuestionDivCollapse").hasClass("show"))
    {
      $("#addQuestion1").click();
    }
  });

  $("#fixOpacity").on("input", function () {
    fixOpacity = $(this).val();
    var displayvalue = '(' + Math.round(fixOpacity * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    PointandAnswer.Opacity = fixOpacity;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  });

});

function updateHotspotPosition(pos, id) {
  var ID = id.split("-")[2];
  data = activeScreen.teleports;
  for (i = 0; i < data.length; i++) {
    if (data[i].teleportID == 'teleport-' + ID) {
      ID = data.indexOf(data[i]);
    }
  }
  data[ID].teleportPosition = pos; //pos.x + ' ' + pos.y + ' ' + pos.z;
}

function setAccordian() {

  $("#questionTextarea").val('');
  $("#animateIconSelect").prop('checked', false);
  $("#accOption1").val('');
  $("#accOption2").val('');
  $("#accOption3").val('');
  $("#accOption4").val('');
  $("#answerSelect").val('0');
  data = activeScreen.teleports;
  //questionCount = data.length;
  $("#accordion > div").remove();
  var qno = 0;
  for (i = 0; i < data.length; i++) {
    if (data[i].Question == "") {
      continue;
    }
    qno++;
    var bind_questionId = data[i].teleportID.split('-')[1];
    var bind_questionNum = qno; //(i + 1);
    var bind_questionText = data[i].Question;
    var bind_options = data[i].Options;
    var bind_answer = data[i].Answer;
    var dynamic_panel = "panel" + bind_questionNum;
    var ans = parseInt(bind_answer) + 1;
    var answer_data = '<div class="row"><div class="col-12"><b>Answer</b>: ' + ans + '</div></div>';
    var optionData = '';
    for (j = 0; j < bind_options.length; j++) {
      var tempData = '<div class="col-6"><span>' + (j + 1) + ' . </span><span>' + bind_options[j].option + '</span></div>'
      optionData = optionData.concat(tempData);
    }
    if (data[i].questionPanel != undefined && data[i].questionPanel != "") {
      var questionPanelThumb = "/act/v0.1/pointandanswer/assets/images/Panel/" + data[i].questionPanel.split("_")[0] + "_t.jpg";
    } else {
      questionPanelThumb = "/act/v0.1/pointandanswer/assets/images/Panel/default_t.jpg";
    }


    var iconDiv = '<div class="row"><div class="col-6"><label><b>Question Icon</b>:</label></div><div class="col-6"><label><b>Question Panel</b>:</label></div><div class="col-6 icon-padding"><img src="' + data[i].teleportToPlaceImage + '" class="image-icon_size img-responsive" id="imageIcon' + bind_questionId + '"></div><div class="col-6 icon-padding"><img src="' + questionPanelThumb + '" class="image-icon_size img-responsive" id="imageIcon' + bind_questionId + '"></div></div>'
    var accordionData = '<div class="card questionAccordion" id="divGroup' + bind_questionNum + '"> <div class="card-header" id="heading' + bind_questionNum + '"> <h3 class="mb-0"> <button id="que' + bind_questionId + '" class="btn btn-link queDiv" data-toggle="collapse" data-target="#collapse' + bind_questionId + '" aria-expanded="true" aria-controls="collapse' + bind_questionNum + '"> <i class="fa" aria-hidden="true"></i> Question <span>' + bind_questionNum + '</span> </button> </h3> </div> <div id="collapse' + bind_questionId + '" class="collapse" aria-labelledby="heading' + bind_questionNum + '" data-parent="#accordion"> <div class="card-body"> ' + iconDiv + '<div class="row ' + dynamic_panel + '"><div class="col-12"><label><b>Question</b>:</label></div><div class="col-12">' + bind_questionText + '</div><div class="col-12"><label><b>Options</b>:</label></div>' + optionData + '</div> ' + answer_data + '<div class="row"><div class="col-12 actionDiv"><button type="button" onmouseenter="mouseEnter(\'Edit this question.\');" onmouseleave="mouseLeave()" class="btn btn-success btn-width-acc" onclick="editQuestion(&#039;' + data[i].teleportID + '&#039;)">Edit</button><button type="button" class="btn btn-danger btn-width-acc" onmouseenter="mouseEnter(\'Remove this question.\');" onmouseleave="mouseLeave()" onclick="$(&#039;#deleteConfirmationModal&#039;).modal(&#039;show&#039;); deleteTeleportID = &#039;' + data[i].teleportID + '&#039;">Delete</button></div></div></div></div></div>';
    $("#accordion").append(accordionData);
  }
}

function editQuestion(id) {
  browsedImage = false;
  assetsLocation = '';
  editQuestionID = id;
  editedQuestionId = id;
  selectedMarker = ''
  if (id != null) {
    if (!document.querySelector('#questionSidenav').classList.contains('active')) {
      toggleSideNav('questionSidenav');
      $("#collapse0").removeClass("show");
      document.querySelector('#addQuestion1').scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      $('#questionSidenav').animate({
        scrollTop: 0
      }, 100);
    }
    data = activeScreen.teleports;
    var qno = 0;
    for (i = 0; i < data.length; i++) {
      if (data[i].Question == "") {
        continue;
      }
      qno++;
      if (data[i].teleportID == id) {
        break;
      }
    }

    $("#hidden-question-id").val(id);

    for (i = 0; i < data.length; i++) {
      if (data[i].teleportID == id) {
        if (data[i].Question != "") {
          $('#displayquestiontitle').html("Question " + (qno));
        } else {
          $('#displayquestiontitle').html("Add Question");
        }

        if (data[i].AnimateCheckBox == true) {
          $("#animateIconSelect").prop("checked", true);
        } else {
          $("#animateIconSelect").prop('checked', false);
        }
        $("#questionTextarea").val(data[i].Question);
        $("#accOption1").val(data[i].Options[0].option);
        $("#accOption2").val(data[i].Options[1].option);
        if (data[i].Options[2])
          $("#accOption3").val(data[i].Options[2].option);
        else
          $("#accOption3").val('');
        if (data[i].Options[3])
          $("#accOption4").val(data[i].Options[3].option);
        else
          $("#accOption4").val('');
        $("#answerSelect").val(parseInt(data[i].Answer) + 1).trigger('change');

        var name = data[i].teleportToPlaceImage.split('/');
        name = name[name.length - 1];
        if (name.length > 25) {
          var strat = name.substr(0, 15);
          var end = name.substr(name.length - 7, name.length);
          name = strat + '...' + end;
        }

        if (data[i].questionIconSize == 'Small') {
          $("#questionIconSelect").val("Small");
        } else if (data[i].questionIconSize == 'Medium') {
          $('#questionIconSelect').val("Medium");
        } else if (data[i].questionIconSize == 'Large') {
          $('#questionIconSelect').val("Large");
        }
        // questionPanel=data[i].questionPanel
        for (var l = 0; l < 12; l++) {
          var panelImgId = 'i' + l + '-Panelcss';
          if (document.querySelector("#" + panelImgId).classList.contains('icon-selected')) {
            document.querySelector("#" + panelImgId).classList.remove('icon-selected');
          }
          if ((document.querySelector("#" + panelImgId + ">img").getAttribute('alt').split("_")[0]) === (data[i].questionPanel.split("_")[0])) {
            document.querySelector("#" + panelImgId).classList.add('icon-selected');
            PanelLocation = data[i].questionPanel.split("_")[0];
          }
        }

        $('#questionIconImageLable').html(name);
        switch (name) {
          case 'Assembly-Point.png':
            var id = 'i0-1';
            break;
          case 'gift.png':
            var id = 'i1-1';
            break;
          case 'Hand-Pointer.png':
            var id = 'i2-1';
            break;
          case 'Info.png':
            var id = 'i3-1';
            break;
          case 'Location-Marker.png':
            var id = 'i4-1';
            break;
          case 'money.png':
            var id = 'i5-1';
            break;
          case 'images.png':
            var id = 'i6-1';
            break;
          case 'right.png':
            var id = 'i7-1';
            break;
          case 'smily.png':
            var id = 'i8-1';
            break;
          case 'star.png':
            var id = 'i9-1';
            break;
          case 'Warning.png':
            var id = 'i10-1';
            break;
          case 'wrong.png':
            var id = 'i11-1';
            break;
          default:
            var id = '0000';
        }
        for (var i = 0; i < 12; i++) {
          var iconIds = 'i' + i + '-1';
          if (document.querySelector("#" + iconIds).classList.contains('icon-selected')) {
            document.querySelector("#" + iconIds).classList.remove('icon-selected');
          }
        }
        if (id != '0000')
          document.querySelector("#" + id).classList.add('icon-selected');
      }
    }
    //$("#accordion2").scrollTop(260);
    if (!document.querySelector('#addQuestionDivCollapse').classList.contains('show'))
      $(".add_question").trigger('click');
  }
}

function deleteQuestion(id) {

  data = activeScreen.teleports;
  if (id != null) {
    for (i = 0; i < data.length; i++) {
      if (data[i].teleportID == id) {
        var index = data.indexOf(data[i]);
        if (index > -1) {
          data.splice(index, 1);
          questionCount = 0;
        }
      }
    }
    //"teleport-" + activeScreen.teleports.length + 1,
    var all = document.querySelectorAll('.clickable');
    all.forEach((hotspot) => {
      hotspot.parentNode.removeChild(hotspot);
    });
    //$('#sphere-hotspot-' + id.split('-')[1]).remove();
    $('#displayquestiontitle').html("Add Question");
    generateRoom();
    cancelQuestion('delete');
    selectedQuestion = null;
    editQuestionId = null;
    $('#editTeleport').addClass('disabled');
    $('#removeTeleport').addClass('disabled');
  }
  $('#deleteConfirmationModal').modal('hide');
  deleteTeleportID = null;

}

function saveQuestion() {
  var size;
  data = activeScreen.teleports;
  var editedQuestionId = $("#hidden-question-id").val();
  var question = $("#questionTextarea").val();
  var option1 = $("#accOption1").val();
  var option2 = $("#accOption2").val();
  var option3 = $("#accOption3").val();
  var option4 = $("#accOption4").val();
  var animateIcon = $("#animateIconSelect").prop('checked');
  var totaloption = 2;
  var answer = $("#answerSelect option:selected").val();
  if (question == '' || question == undefined || question == null) {
    popSnackbar('warning', 'Please add Question');
    return;
  }
  if (option1 == '' || option1 == undefined || option1 == null) {
    popSnackbar('warning', 'Please add Option 1');
    return;
  }
  if (option2 == '' || option2 == undefined || option2 == null) {
    popSnackbar('warning', 'Please add Option 2');
    return;
  }
  if (answer == 0) {
    popSnackbar('warning', 'Please select valid answer');
    return;
  }

  if (option3 != '' && option3 != undefined && option3 != null) {
    totaloption++;
  }

  if (option4 != '' && option4 != undefined && option4 != null) {
    totaloption++;
  }

  check = $("#accOption" + answer).val();
    if(answer=="4"){
      if(option3 == '' || option3 == undefined || option3 == null){
        popSnackbar('warning', 'Please add Option 3');
        return;
      }
    }
  if (check == '' || check == undefined || check == null) {
    
    popSnackbar('warning', 'Please add Option '+answer);
    return;
  }

  if (answer > totaloption) {
    popSnackbar('warning', 'Please fill  from option provided');
    return;
  }

  
  if (editedQuestionId || selectedMarker) {
    var cam = document.querySelector("[camera]");
    var pos = cam.getAttribute("rotation");
    for (i = 0; i < data.length; i++) {

      if ((editedQuestionId && data[i].teleportID == editedQuestionId) || (!editedQuestionId && data[i].teleportID == selectedMarker)) {
        data[i].Question = question;
        data[i].AnimateCheckBox = animateIcon;
        data[i].questionIconSize = newIconSize;
        if (browsedImage) {
          newIconImage = assetsLocation;
          data[i].teleportToPlaceImage = assetsLocation;
        } else if (questionIcon != '' && data[i].teleportToPlaceImage != questionIcon) {
          data[i].teleportToPlaceImage = questionIcon;
        }

        if (data[i].questionIconSize == 'Small') {
          size = 4;
        } else if (data[i].questionIconSize == 'Medium') {
          size = 7;
        } else if (data[i].questionIconSize == 'Large') {
          size = 10;
        }

        if (selectedMarker) {
          var res = selectedMarker.replace("teleport-", "");
        } else {
          var res = editedQuestionId.replace("teleport-", "");
        }
        var newHotspot = document.getElementById("sphere-hotspot-" + (res));
        newHotspot.setAttribute('geometry', 'primitive:plane;height:' + size + ';width:' + size + ';');
        newHotspot.setAttribute('material', "src: " + newIconImage + "; opacity:0.9;");

        for (j = 0; j < data[i].Options.length; j++) {
          switch (j) {
            case 0:
              data[i].Options[j].option = option1;
              break;
            case 1:
              data[i].Options[j].option = option2;
              break;
            case 2:
              data[i].Options[j].option = option3;
              break;
            case 3:
              data[i].Options[j].option = option4;
              break;
          }
        }
        if ((option4 == '' || option4 == undefined || option4 == null) && data[i].Options.length <= 4) {
          data[i].Options.splice(3, 1);
        }

        if ((option3 == '' || option3 == undefined || option3 == null) && data[i].Options.length <= 3) {
          data[i].Options.splice(2, 1);
        }

        if (option3 != '' && option3 != undefined && option3 != null && data[i].Options.length < 3) {
          data[i].Options.push({
            "option": option3
          });
        }

        if (option4 != '' && option4 != undefined && option4 != null && data[i].Options.length < 4) {
          data[i].Options.push({
            "option": option4
          });
        }
        if (browsedImage) {
          data[i].teleportToPlaceImage = assetsLocation;
        } else if (questionIcon != '' && data[i].teleportToPlaceImage != questionIcon) {
          data[i].teleportToPlaceImage = questionIcon;
        }
        $('#displayquestiontitle').html("Add Question");
        data[i].questionPanel = PanelLocation + "_" + totaloption + ".jpg";
        questionPanel = false;

        data[i].questionIconSize = $('#questionIconSelect option:selected').val();
        data[i].Answer = $("#answerSelect option:selected").val() - 1;

        // if (isDisplayed == false) {
        //   var markerEl = document.querySelector('#marker');
        //   var pos = cam.getAttribute("rotation");
        //   var position = markerEl.object3D.getWorldPosition();
        //   data[i].teleportPosition = position.x + ' ' + position.y + ' ' + position.z;
        //   data[i].camRotwrtTeleport = pos;
        // }
        changepointandanswerIconImage()
        // isDisplayed = false;
      }

    }
    markerId = activeScreen.teleports.length;
    selectedMarker = 'teleport-' + markerId;
    if (activeScreen.teleports.length < 999) {
      questionData = {
        "teleportID": "teleport-" + (activeScreen.teleports.length),
        "teleportPosition": "",
        "teleportToPlaceImage": "",
        "Question": "",
        "Options": [{
          "option": ""
        },
        {
          "option": ""
        },
        ],
        "Answer": "-1",
        "points": "10",
        "questionPanel": "",
        "camRotwrtTeleport": ""
      };
      //PanelLocation = "default_2.jpg";
      questionData.teleportToPlaceImage = 'assets/images/images.png';
      questionData.questionIconSize = 'Medium';
      questionData.questionPanel = "default_2.jpg";
      activeScreen["teleports"].push(questionData);
    }
  } else {
    addQuestion();
  }
  generateRoom();
  $('#questionIconImageLable').html('Choose Image');
  $("#hidden-question-id").val('');
  $(".add_question").trigger('click');
  PanelLocation = "default";
  for (var i = 0; i < 12; i++) {
    var iconIds = 'i' + i + '-1';
    if (document.querySelector("#" + iconIds).classList.contains('icon-selected')) {
      document.querySelector("#" + iconIds).classList.remove('icon-selected');
    }
    var panelImgId = 'i' + i + '-Panelcss';
    if (document.querySelector("#" + panelImgId).classList.contains('icon-selected')) {
      document.querySelector("#" + panelImgId).classList.remove('icon-selected');
    }
  }
  document.querySelector("#i6-1").classList.add('icon-selected');
  document.querySelector("#i0-Panelcss").classList.add('icon-selected');
  popSnackbar("success", "Question saved successfully.");
}

function cancelQuestion(type) {
  var editedQuestionId = $("#hidden-question-id").val();
  $('#displayquestiontitle').html("Add Question");
  $("#questionTextarea").val('');
  $("#accOption1").val('');
  $("#accOption2").val('');
  $("#accOption3").val('');
  $("#accOption4").val('');
  $("#answerSelect").val('0');
  PanelLocation = "default";
  $("#hidden-question-id").val('');
  $("#animateIconSelect").prop('checked', false);
  $('#questionIconImageLable').html('Choose Image');
  questionIcon = '';
  if (type == 'cancel')
    $(".add_question").trigger('click');
  for (var i = 0; i < 12; i++) {
    var iconIds = 'i' + i + '-1';
    if (document.querySelector("#" + iconIds).classList.contains('icon-selected')) {
      document.querySelector("#" + iconIds).classList.remove('icon-selected');
    }
    var panelImgId = 'i' + i + '-Panelcss';
    if (document.querySelector("#" + panelImgId).classList.contains('icon-selected')) {
      document.querySelector("#" + panelImgId).classList.remove('icon-selected');
    }
  }
  data = activeScreen.teleports;
  for (i = 0; i < data.length; i++) {
    if ((editedQuestionId && data[i].teleportID == editedQuestionId) || (!editedQuestionId && data[i].teleportID == selectedMarker)) {

      if (data[i].questionIconSize == 'Small') {
        size = 4;
      } else if (data[i].questionIconSize == 'Medium') {
        size = 7;
      } else if (data[i].questionIconSize == 'Large') {
        size = 10;
      }

      if (editedQuestionId) {
        var res = editedQuestionId.replace("teleport-", "");
      } else {
        var res = selectedMarker.replace("teleport-", "");
      }
      var newHotspot = document.getElementById("sphere-hotspot-" + (res));
      newHotspot.setAttribute('geometry', 'primitive:plane;height:' + size + ';width:' + size + ';');
      newHotspot.setAttribute('material', "src: " + data[i].teleportToPlaceImage + "; opacity:0.9;");
    }
  }
  document.querySelector("#i6-1").classList.add('icon-selected');
  document.querySelector("#i0-Panelcss").classList.add('icon-selected');
  selectedMarker = '';
  editQuestionID = '';
  editedQuestionId = ''
  markerId = '';
}

////////////////aframe///////
function Heading() {
  activeScreen.congratulations = $('#Heading').val();
}

function Description() {
  activeScreen.thankYouMsg = $('#Description').val();
}

function messagePoint() {
  activeScreen.totalPoints = $('#messagePoint').val();
}

function passingPercentage() {
  activeScreen.Passing_Percentage = $('#passingPercentage').val();
}

function SuccessMessage() {
  activeScreen.Success_Message = $('#SuccessMessage').val();
}

function failuerMessage() {
  activeScreen.Failuer_Message = $('#failuerMessage').val();
}

function generateRoom() {
  for (let i = 0; i < activeScreen.teleports.length; i++) {
    activeScreen.teleports[i].teleportID = "teleport-" + i;
  }

  setAccordian();
  if (document.querySelector('#sceneLight')) {
    $('#sceneLight').remove();
  }
  var aLight = '';
  aLight = document.createElement('a-entity');
  aLight.setAttribute("light", "color:#f0f0f0;type:ambient");
  aLight.setAttribute("id", 'sceneLight');
  //aimg.setAttribute("animation","property: opacity; dir: normal; dur: 1500;easing: easeOutQuad; loop: false; from:0; to: 1; delay: "+(350*i));
  scene.appendChild(aLight);
  // var sphereArray = $("a-entity[id*='sphere-hotspot']");
  // var allhotspot = document.querySelectorAll('sphere-hotspot-');
  for (let i = 0; i < activeScreen.teleports.length; i++) {
    addHotspot(activeScreen.teleports[i]);
  }
  // addQuestion();
}

function addHotspot(teleport) {
  var id = teleport.teleportID.split('-');
  id = id[id.length - 1];
  if (document.querySelector('#sphere-hotspot-' + id))
    $('#sphere-hotspot-' + id).remove();

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
  newHotspot.setAttribute('id', "sphere-hotspot-" + id);
  newHotspot.setAttribute('color', '#00f');
  newHotspot.setAttribute('position', teleport.teleportPosition);
  newHotspot.setAttribute('geometry', 'primitive:plane;height:' + size + ';width:' + size + ';');
  newHotspot.setAttribute('material', "src: " + teleport.teleportToPlaceImage + "; opacity:0.9;");
  //newHotspot.setAttribute('opacity', '0.9');
  newHotspot.setAttribute('look-at', 'src:#cameraId')
  newHotspot.setAttribute('shader', 'flat');
  newHotspot.setAttribute('mouseclick', '');
  newHotspot.setAttribute('click-drag', '');
  newHotspot.setAttribute("class", "clickable");
  newHotspot.setAttribute('event-set__1', '_event: dragstart; material.opacity: 0.2');
  newHotspot.setAttribute('event-set__1', '_event: dragend; material.opacity: 1');
  sceneEl.appendChild(newHotspot);
  hotspotIndex++;
}

function addLaunchScreenText() {
  PointandAnswer.launch_text = document.getElementById("lunchScreenText").value;
}

function changepointandanswerIcon(evn) {

  var id = evn.id;
  browsedImage = true;
  assetsLocation = evn.alt;
  var name = assetsLocation.split('/');
  name = name[name.length - 1];
  if (name.length > 25) {
    var strat = name.substr(0, 15);
    var end = name.substr(name.length - 7, name.length);
    name = strat + '...' + end;
  }
  $('#questionIconImageLable').html(name);


  var storyId = id.split('-')[1];
  for (var i = 0; i < 12; i++) {
    var iconIds = 'i' + i + '-1';
    if (document.querySelector("#" + iconIds).classList.contains('icon-selected')) {
      document.querySelector("#" + iconIds).classList.remove('icon-selected');
    }
  }
  document.querySelector("#" + evn.id).classList.add('icon-selected');

  var editedQuestionId = $("#hidden-question-id").val();
  data = activeScreen.teleports;

  if (editedQuestionId != '') {
    var res = editedQuestionId.replace("teleport-", "");
    var newHotspot = document.getElementById("sphere-hotspot-" + (res));
    for (i = 0; i < data.length; i++) {
      if (data[i].teleportID == editedQuestionId) {
        if (browsedImage) {
          newIconImage = assetsLocation;
          //data[i].teleportToPlaceImage = assetsLocation;
          newHotspot.setAttribute('material', "src: " + assetsLocation + "; opacity:0.9;");


        } else if (questionIcon != '' && data[i].teleportToPlaceImage != questionIcon) {
          newIconImage = questionIcon;
          //data[i].teleportToPlaceImage = questionIcon;
          newHotspot.setAttribute('material', "src: " + questionIcon + "; opacity:0.9;");
        }
      }
    }
  }
  else if (selectedMarker) {
    var res = selectedMarker.replace("teleport-", "");
    var newHotspot = document.getElementById("sphere-hotspot-" + (res));
    for (i = 0; i < data.length; i++) {
      if (data[i].teleportID == selectedMarker) {
        if (browsedImage) {
          newIconImage = assetsLocation;
          newHotspot.setAttribute('material', "src: " + assetsLocation + "; opacity:0.9;");


        } else if (questionIcon != '' && data[i].teleportToPlaceImage != questionIcon) {
          newIconImage = questionIcon;
          newHotspot.setAttribute('material', "src: " + questionIcon + "; opacity:0.9;");
        }
      }
    }
  }

  // generateRoom();
  //questionIcons = '';
  // pointandanswerGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson, imagesPointSTory);
}


function changepointandanswerPanel(evn) {
  var id = evn.id;
  questionPanel = true;
  PanelLocation = evn.alt.split('_')[0];

  // var storyId = id.split('-')[1];
  for (var i = 0; i < 12; i++) {
    var PanelIds = 'i' + i + '-Panelcss';
    if (document.querySelector("#" + PanelIds).classList.contains('icon-selected')) {
      document.querySelector("#" + PanelIds).classList.remove('icon-selected');
    }
  }
  document.querySelector("#" + evn.id + "css").classList.add('icon-selected');
  //questionIcons = '';
  // pointandanswerGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson, imagesPointSTory);
}



function newPos(x, y, z) {
  var r = Math.pow(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2), 0.5);
  var phy = Math.acos(z / r);
  var thita = Math.asin(y / (r * Math.sin(phy)));
  if ((x < 0 && z < 0) || (x < 0 && z > 0)) {
    phy = -phy; //+ (Math.PI);
    thita = -thita;
  }
  r = 50;
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

function addNewQuestion(size, temp) {

  isDisplayed = true;
  //questionCount++;
  var cam = document.querySelector("[camera]");
  var pos = cam.getAttribute("rotation");
  var markerEl = document.querySelector('#marker');
  var position = markerEl.object3D.getWorldPosition();
  markerId = activeScreen.teleports.length;
  selectedMarker = 'teleport-' + markerId;
  // newTeleport.setAttribute('position', position);
  if (activeScreen.teleports.length < 999) {
    questionData = {
      "teleportID": "teleport-" + (activeScreen.teleports.length),
      "teleportPosition": position.x + ' ' + position.y + ' ' + position.z,
      "teleportToPlaceImage": "",
      "Question": "",
      "Options": [{
        "option": ""
      },
      {
        "option": ""
      },
      ],
      "Answer": "-1",
      "points": "10",
      "questionPanel": "",
      "camRotwrtTeleport": pos
    };
    //PanelLocation = "default_2.jpg";
    questionData.teleportToPlaceImage = 'assets/images/images.png';
    questionData.questionIconSize = size;
    questionData.questionPanel = "default_2.jpg";
    activeScreen["teleports"].push(questionData);
  } else {
    $(".questionDiv > div").remove();
    var questionMessage = '<div style="font-size:20px;color:forestgreen;font-weight:bold;">You have added 20 questions successfully...!!!</div>';
    $(".questionDiv").append(questionMessage);
    $(".questionDiv").css("background-color", "#f7f7f7");
  }

  var sidenavQuestion = document.querySelector('#questionSidenav');

  if (!sidenavQuestion.classList.contains('active'))
    toggleSideNav('questionSidenav');

  generateRoom();
  setTimeout(() => {
    editQuestion(questionData.teleportID);
    $('#displayquestiontitle').html("Add Question");
  }, 1000);
}

function deleteQuestionModel() {
  if (editQuestionId)
    $('#deleteConfirmationModal').modal('show');
}

$(".custom-input").bind("change paste keyup", function () {
  var clickedId = this.id;
  var len = $(this).val().length;
  if (this.maxLength == len) {
    popSnackbar('warning', "Limit exceed.");
    return;
  }
});


function mouseEnter(msg) {
  window.parent.mouseEnter(msg);
}

function mouseLeave() {
  window.parent.mouseLeave();
}

function addQuestion() {
  var markerEl = document.querySelector('#marker');

  var questionText = $("#questionTextarea").val();
  var option1 = $("#accOption1").val();
  var option2 = $("#accOption2").val();
  var option3 = $("#accOption3").val();
  var option4 = $("#accOption4").val();
  var answer = $("#answerSelect option:selected").val();
  var animateIcon = $("#animateIconSelect").prop('checked');

  var totaloption = 2



  if (questionText == '' || questionText == undefined || questionText == null) {
    popSnackbar('warning', 'Please add Question');

    return;
  }
  if (option1 == '' || option1 == undefined || option1 == null) {
    popSnackbar('warning', 'Please add Option 1');
    return;
  }
  if (option2 == '' || option2 == undefined || option2 == null) {
    popSnackbar('warning', 'Please add Option 2');
    return;
  }

  if ($("#answerSelect option:selected").val() == 0) {
    popSnackbar('warning', 'Please select answer');
    return;
  }


  if (option3 != '' && option3 != undefined && option3 != null) {
    totaloption++;
  }
  if (option4 != '' && option4 != undefined && option4 != null) {
    totaloption++;
  }
  if (answer > totaloption) {
    popSnackbar('warning', 'Please select answer from option provided');
    return;
  }
  //questionCount++;
  var markerEl = document.querySelector('#marker');
  var position = markerEl.object3D.getWorldPosition();
  // newTeleport.setAttribute('position', position);
  selectedMarker = "teleport-" + activeScreen.teleports.length;
  markerId = activeScreen.teleports.length;
  if (activeScreen.teleports.length < 999) {
    questionData = {
      "teleportID": "teleport-" + activeScreen.teleports.length,
      "teleportPosition": position.x + ' ' + position.y + ' ' + position.z,
      "teleportToPlaceImage": "",
      "Question": questionText,
      "Options": [{
        "option": option1
      },
      {
        "option": option2
      },
      ],
      "Answer": answer - 1,
      "points": "10",
      "questionPanel": "",
      "AnimateCheckBox": animateIcon
    };
    if (browsedImage) {
      questionData.teleportToPlaceImage = assetsLocation;
    } else {
      questionData.teleportToPlaceImage = 'assets/images/images.png';
    }
    if (option3 != '' && option3 != undefined && option3 != null) {
      questionData.Options.push({
        "option": option3
      });
    }
    if (option4 != '' && option4 != undefined && option4 != null) {
      questionData.Options.push({
        "option": option4
      });
    }
    questionData.questionPanel = PanelLocation + "_" + totaloption + ".jpg";
    questionData.questionIconSize = $('#questionIconSelect option:selected').val()
    activeScreen["teleports"].push(questionData);
    $('#displayquestiontitle').html("Add Question");
  } else {
    $(".questionDiv > div").remove();
    var questionMessage = '<div style="font-size:20px;color:forestgreen;font-weight:bold;">You have added 20 questions successfully...!!!</div>';
    $(".questionDiv").append(questionMessage);
    $(".questionDiv").css("background-color", "#f7f7f7");
  }
  $(".add_question").trigger('click');
  $('#questionIconImageLable').html('Choose Image');
  generateRoom();
  browsedImage = false;
  assetsLocation = '';
}

function getval(sel) {
  var editedQuestionId = $("#hidden-question-id").val();
  if ($('#questionIconSelect option:selected').val() == 'Small') {
    size = 4;
  } else if ($('#questionIconSelect option:selected').val() == 'Medium') {
    size = 7;
  } else if ($('#questionIconSelect option:selected').val() == 'Large') {
    size = 10;
  }
  data = activeScreen.teleports;
  if (editedQuestionId && size) {
    var res = editedQuestionId.replace("teleport-", "");
    var newHotspot = document.getElementById("sphere-hotspot-" + (res));
    newHotspot.setAttribute('geometry', 'primitive:plane;height:' + size + ';width:' + size + ';');
    for (i = 0; i < data.length; i++) {
      if (data[i].teleportID == editedQuestionId) {
        newIconSize = $('#questionIconSelect option:selected').val();
      }
    }
  } else if (selectedMarker && size) {
    var res = selectedMarker.replace("teleport-", "");
    var newHotspot = document.getElementById("sphere-hotspot-" + (res));
    newHotspot.setAttribute('geometry', 'primitive:plane;height:' + size + ';width:' + size + ';');
    for (i = 0; i < data.length; i++) {
      if (data[i].teleportID == selectedMarker) {
        newIconSize = $('#questionIconSelect option:selected').val();
      }
    }

  }
}

function changepointandanswerIconImage() {
  data = activeScreen.teleports;

  if (selectedMarker) {
    var res = selectedMarker.replace("teleport-", "");
    var newHotspot = document.getElementById("sphere-hotspot-" + (res));
    for (i = 0; i < data.length; i++) {
      if (data[i].teleportID == selectedMarker) {
        if (browsedImage) {
          data[i].teleportToPlaceImage = assetsLocation;
          newHotspot.setAttribute('material', "src: " + assetsLocation + "; opacity:0.9;");
        } else if (questionIcon != '' && data[i].teleportToPlaceImage != questionIcon) {
          data[i].teleportToPlaceImage = questionIcon;
          newHotspot.setAttribute('material', "src: " + questionIcon + "; opacity:0.9;");
        }
      }
    }
  } else if (editQuestionID) {
    var res = editQuestionID.replace("teleport-", "");
    var newHotspot = document.getElementById("sphere-hotspot-" + (res));
    for (i = 0; i < data.length; i++) {
      if (data[i].teleportID == editQuestionID) {
        if (browsedImage) {
          data[i].teleportToPlaceImage = assetsLocation;
          newHotspot.setAttribute('material', "src: " + assetsLocation + "; opacity:0.9;");
        } else if (questionIcon != '' && data[i].teleportToPlaceImage != questionIcon) {
          data[i].teleportToPlaceImage = questionIcon;
          newHotspot.setAttribute('material', "src: " + questionIcon + "; opacity:0.9;");
        }
      }
    }
  }

}
