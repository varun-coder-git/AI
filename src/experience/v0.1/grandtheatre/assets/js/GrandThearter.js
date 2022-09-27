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
var objGrandTheater = "";
var toggleFlag = false;
var SplashPath = "";
var VideoPath = "";
var Lights = "";
var LightsAns = "";
var Colors = "";
var ColorsAns = "";
var Delay = "";
var DelayAns = "";
var Loop = "";
var LoopAns = "";
var MovieFile = "";
var SplashFile = "";
var LogoFile = "";
var finalGlobalData = "";
var assetspath;
var assettype;
var imageType;
var splashImagePath;
var fixOpacity = 0.2;

$(document).ready(function () {
  document.getElementById('overlay').addEventListener('click', function (e) {

    if (!document.getElementById('auditoriumSidenav').contains(e.target) && document.getElementById('auditoriumSidenav').classList.contains('active')) {
      closeSideNav();
    } else if (!document.getElementById('movieSidenav').contains(e.target) && document.getElementById('movieSidenav').classList.contains('active')) {
      closeSideNav();
    } else if (!document.getElementById('launchSidenav').contains(e.target) && document.getElementById('launchSidenav').classList.contains('active')) {
      closeSideNav();
    }
  });
  document.querySelector('[camera]').setAttribute("keyboard-controls", "");
  document.querySelector('[camera]').setAttribute("wasd-controls", "");

  $("#fixOpacity").on("input", function () {
    fixOpacity = $(this).val();
    var displayvalue = '(' + Math.round(fixOpacity * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    finalGlobalData.Opacity=fixOpacity;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  });
});

function initializeCustomization(experienceToCustomize) {

  finalGlobalData = JSON.parse(experienceToCustomize);

  Lights = document.getElementById("lightsDropDown");
  setSelectedValue(Lights, finalGlobalData.Settings[0].lights);

  Colors = document.getElementById("colorDropDown");
  setSelectedValue(Colors, finalGlobalData.Settings[0].color);

  // Delay = document.getElementById("movieDelayDrownDownID");
  // if(finalGlobalData.Settings[0].delay == 'No Delay'){
  //   setSelectedValue(Delay, finalGlobalData.Settings[0].delay);
  // }else{
  //   setSelectedValue(Delay, finalGlobalData.Settings[0].delay+" Seconds");
  // }

  Loop = document.getElementById("loopDropDownID");
  setSelectedValue(Loop, finalGlobalData.Settings[0].loop);
  if (finalGlobalData.VideoSrc != "") {
    var videoFileName = finalGlobalData.VideoSrc.replace(/^.*[\\\/]/, '');
    if (videoFileName.length > 25) {
      var strat = videoFileName.substr(0, 15);
      var end = videoFileName.substr(videoFileName.length - 7, videoFileName.length);
      videoFileName = strat + '....' + end;
    }
    var VideoInputLabel = document.getElementById('customLabelVideo');
    VideoInputLabel.innerText = videoFileName;
  }

  if (finalGlobalData.SplashImg != "") {
    var imageFileName = finalGlobalData.SplashImg.replace(/^.*[\\\/]/, '');
    if (imageFileName.length > 25) {
      var strat = imageFileName.substr(0, 15);
      var end = imageFileName.substr(imageFileName.length - 7, imageFileName.length);
      imageFileName = strat + '....' + end;
    }
    var SplashImgInputLabel = document.getElementById('customLabelImage');
    SplashImgInputLabel.innerHTML = imageFileName;
  }

  if (finalGlobalData.Logo !== undefined) {
    if (finalGlobalData.Logo != "") {
      var logoFileName = finalGlobalData.Logo.replace(/^.*[\\\/]/, '');
      if (logoFileName.length > 25) {
        var strat = logoFileName.substr(0, 15);
        var end = logoFileName.substr(logoFileName.length - 7, logoFileName.length);
        logoFileName = strat + '....' + end;
      }
      var LogoImgInputLabel = document.getElementById('customLogoImage');
      LogoImgInputLabel.innerHTML = logoFileName;
    }
  }

  if (finalGlobalData.launch_text){    
  document.getElementsByClassName("lunchScreenText").value = finalGlobalData.launch_text;
  $('.lunchScreenText').summernote('code', finalGlobalData.launch_text);
  customScriptFunction(finalGlobalData);

  var lauchText = $(".lunchScreenText");
  var div = document.createElement("div");
  div.innerHTML = lauchText[0].value;
  var plainText = div.textContent || div.innerText || "";
      var maxLength = 350;
      $('#maxCount').text( plainText.length);
      console.log("Text",  $('#maxCount'));
  }
  if (finalGlobalData.splash_image) {
    splashImagePath = finalGlobalData.splash_image;
    var splashImageName = splashImagePath.split("/")[splashImagePath.split("/").length - 1];
    $("#splashImageLable").text(splashImageName);
  }
  if (finalGlobalData.splash_instruction) {
    document.getElementsByClassName("instructionSetForDesktop").value = finalGlobalData.splash_instruction;
    $('.instructionSetForDesktop').summernote('code', finalGlobalData.splash_instruction);
  }
  if (finalGlobalData.splash_android_instruction) {
    document.getElementsByClassName("instructionSetForAndroid").value = finalGlobalData.splash_android_instruction;
    $('.instructionSetForAndroid').summernote('code', finalGlobalData.splash_android_instruction);
  }
  
  if (finalGlobalData.splashBackgroundColor) {
    var splashBackground = document.getElementById("splashBackground");
    splashBackground.value = finalGlobalData.splashBackgroundColor;
    splashBackground.style.backgroundColor = splashBackground.value;
  }
  else {
    var splashBackground = document.getElementById("splashBackground");
    splashBackground.style.backgroundColor = "#8F8F8F";
    splashBackground.value="#8F8F8F";
}
  if (finalGlobalData.Opacity) {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = finalGlobalData.Opacity;
    var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    document.getElementById("splashBackground").style.opacity = opacity.value;
  } else {
    var opacity = document.getElementById("fixOpacity")
    opacity.value = fixOpacity;
    var displayvalue = '(' + Math.round(fixOpacity * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  }
  if (finalGlobalData.splashHeaderColor) {
    var splashHeaderColor = document.getElementById('splashHeaderColor')
    splashHeaderColor.value = finalGlobalData.splashHeaderColor;
    splashHeaderColor.style.backgroundColor = splashHeaderColor.value;
  }
  if (finalGlobalData["entry_view"]) {
    $("#CamEntity").attr("rotation", finalGlobalData["entry_view"]);
  }

}

function setEntryView() {
  if ($('#freezeView').hasClass('disabled')) {
    //Nothing to do here
  } else {
    var cam = document.querySelector("[camera]");
    var pos = cam.getAttribute("rotation");
    var posY = "0";
    if (finalGlobalData["entry_view"]) {
      posY = finalGlobalData["entry_view"].split(" ")[1];
    }
    finalGlobalData["entry_view"] = "0 " + (pos.y + parseInt(posY)) + " 0";
    $('#freezeView').addClass('disabled');
    $('#freezeView').click(toastr.success('Presto! This view is now the Launch View of this Experience.'));
    // finalGlobalData["entry_view"] = (pos.x) + " " + (pos.y + parseInt(posY)) + " 0";
  }
}

AFRAME.registerComponent('mousedrag', {
  init: function () {
    this.el.addEventListener('mouseup', function () {
      $('#freezeView').removeClass('disabled');
    });
  }
});

function openAssetPopup(type, imagetype) {
  assettype = type;
  if (type == 'Image')
    imageType = imagetype;
  window.parent.triggerAssetsPopup();
}

function getAssetPath(assetPath) {
  if(assetPath==undefined || assetPath==""){
    return;
  }
  assetspath = assetPath;
  if (assettype == 'Video') {
    VideoPath = assetspath;
    var videoFileName = VideoPath.replace(/^.*[\\\/]/, '');
    if (videoFileName.length > 25) {
      var strat = videoFileName.substr(0, 15);
      var end = videoFileName.substr(videoFileName.length - 7, videoFileName.length);
      videoFileName = strat + '....' + end;
    }
    var VideoInputLabel = document.getElementById('customLabelVideo');
    VideoInputLabel.innerText = videoFileName;
    finalGlobalData.VideoSrc = VideoPath;
  } else if (assettype == 'Image') {
    if (imageType === 'Logo') {
      LogoPath = assetspath;
      var logoFileName = LogoPath.replace(/^.*[\\\/]/, '');
      if (logoFileName.length > 25) {
        var strat = logoFileName.substr(0, 15);
        var end = logoFileName.substr(logoFileName.length - 7, logoFileName.length);
        logoFileName = strat + '....' + end;
      }
      var LogoImgInputLabel = document.getElementById('customLogoImage');
      LogoImgInputLabel.innerHTML = logoFileName;
      finalGlobalData.Logo = LogoPath;
    } else if (imageType === 'Splash') {
      SplashPath = assetspath;
      var imageFileName = SplashPath.replace(/^.*[\\\/]/, '');
      if (imageFileName.length > 25) {
        var strat = imageFileName.substr(0, 15);
        var end = imageFileName.substr(imageFileName.length - 7, imageFileName.length);
        imageFileName = strat + '....' + end;
      }
      var SplashImgInputLabel = document.getElementById('customLabelImage');
      SplashImgInputLabel.innerHTML = imageFileName;
      finalGlobalData.SplashImg = SplashPath;
    }
    else if (imageType === 'SplashImage') {
      splashImagePath = assetspath;
      var splashImageName = splashImagePath.split("/")[splashImagePath.split("/").length - 1];
      $("#splashImageLable").text(splashImageName);
    }

  }
  customScriptFunction(finalGlobalData);
  // OnChangeOption();
}

function getAssetType() {
  return assettype;
}

function OnChangeOption() {
  Lights = document.getElementById("lightsDropDown");
  LightsAns = Lights.options[Lights.selectedIndex].text;

  Colors = document.getElementById("colorDropDown");
  ColorsAns = Colors.options[Colors.selectedIndex].text;

  // Delay = document.getElementById("movieDelayDrownDownID");
  // DelayAns = Delay.options[Delay.selectedIndex].text;
  // if (DelayAns == "No Delay") { DelayAns = 0; }
  // else { DelayAns = DelayAns.replace(/\D/g, ''); }

  Loop = document.getElementById("loopDropDownID");
  LoopAns = Loop.options[Loop.selectedIndex].text;

  if (MovieFile == "") {
    MovieFile = "";
  }

  if (SplashFile == "") {
    SplashFile = "";
  }

  if (LogoFile == "") {
    LogoFile = "";
  }
  finalGlobalData.Settings[0].lights = LightsAns;
  finalGlobalData.Settings[0].color = ColorsAns;
  finalGlobalData.Settings[0].delay = finalGlobalData.Settings[0].delay;
  finalGlobalData.Settings[0].loop = LoopAns;
  customScriptFunction(finalGlobalData);

}

function toggleSideNav(sidenavId) {
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function (navigation) {
    if (navigation.classList.contains('active') && navigation.id != sidenavId)
      navigation.classList.remove('active');
  });
  document.getElementById(sidenavId).classList.toggle("active");
  toggleFlag = true;
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

function closeSideNav() {
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function (navigation) {
    navigation.classList.remove('active');
    toggleFlag = false;
  });
  toggleOverlay();
}

function onClickOutside() {
  if (toggleFlag == true) {

  }
}

function setSelectedValue(selectObj, valueToSet) {
  for (var i = 0; i < selectObj.options.length; i++) {
    if (selectObj.options[i].text == valueToSet) {
      selectObj.options[i].selected = true;
      return;
    }
  }
}
var populationData;
$.getJSON('assets/json/GrandTheater.json', function (jData) {
  populationData = jData;
  var data = $.parseJSON(JSON.stringify(jData));
  // populateCustomizationData(data);
});

function populateCustomizationData(data) {
  //console.log("comin")
  $('#lightsDropDown').html('');
  $('#colorDropDown').html('');
  //$('#movieDelayDrownDownID').html('');
  $('#loopDropDownID').html('');
  //iterate over the data and append a select option
  $.each(data.lights, function (key, val) {
    //console.log("-->" + key);
    $('#lightsDropDown').append('<option id="' + val.lightID + '">' + val.LightOption + '</option>');
  })
  $.each(data.colors, function (key, val) {
    $('#colorDropDown').append('<option id="' + val.colorID + '">' + val.colorOption + '</option>');
  })
  $.each(data.loop, function (key, val) {
    $('#loopDropDownID').append('<option id="' + val.loopID + '">' + val.loopOption + '</option>');
  })


  $('#colorDropDown').on('change', function () {
    var id = "";
    var img = "";
    var path = "";
    var Lights = "";
    var LightsAns = "";
    Lights = document.getElementById("lightsDropDown");
    LightsAns = Lights.options[Lights.selectedIndex].text;
    if (LightsAns == "Always On") {
      id = $(this).children(":selected").attr("id");
      path = data.colors[id - 1].colorPath.pathOn;
      $('#outerImage').attr('src', path);
    }

    else if (LightsAns == "Always Off") {
      id = $(this).children(":selected").attr("id");
      path = data.colors[id - 1].colorPath.pathOff;
      $('#outerImage').attr('src', path);
    }
  });

  $('#lightsDropDown').on('change', function () {
    var id = "";
    var img = "";
    var path = "";
    var Colors = "";
    var ColorID = "";
    var Lights = "";
    var LightsAns = "";
    Colors = document.getElementById("colorDropDown");
    ColorID = Colors.options[Colors.selectedIndex].id;
    Lights = document.getElementById("lightsDropDown");
    LightsAns = Lights.options[Lights.selectedIndex].text;
    if (LightsAns == "Always On") {
      path = data.colors[ColorID - 1].colorPath.pathOn;
      $('#outerImage').attr('src', path);
    }

    else if (LightsAns == "Always Off") {
      path = data.colors[ColorID - 1].colorPath.pathOff;
      $('#outerImage').attr('src', path);
    }
  })

}

function SaveData() {
  Lights = document.getElementById("lightsDropDown");
  LightsAns = Lights.options[Lights.selectedIndex].text;

  Colors = document.getElementById("colorDropDown");
  ColorsAns = Colors.options[Colors.selectedIndex].text;

  // Delay = document.getElementById("movieDelayDrownDownID");
  // DelayAns = Delay.options[Delay.selectedIndex].text;
  // if (DelayAns == "No Delay") { DelayAns = 0; }
  // else { DelayAns = DelayAns.replace(/\D/g, ''); }

  Loop = document.getElementById("loopDropDownID");
  LoopAns = Loop.options[Loop.selectedIndex].text;

  if (MovieFile == "") {
    MovieFile = "";
  }

  if (SplashFile == "") {
    SplashFile = "";
  }

  if (LogoFile == "") {
    LogoFile = "";
  }

  customScriptFunction(finalGlobalData);
}

function getExperienceToSave() {
  var lauchText = $(".lunchScreenText");

  var lunchTextItem = lauchText[0].value;
  finalGlobalData.launch_text = lunchTextItem;

  var splashInstruction = $(".instructionSetForDesktop");
  var splashAndroidInstruction=$(".instructionSetForAndroid")

  var item = splashInstruction[0].value;
  finalGlobalData.splash_instruction = item;
  var item = splashAndroidInstruction[0].value;
  finalGlobalData.splash_android_instruction=item;

  finalGlobalData.splash_image = splashImagePath;

  var headerFont = $(".headerfont");
  var headerFontColor = headerFont[0].value;
  if (headerFontColor.includes('#')) {
    finalGlobalData.splashHeaderColor = headerFontColor;
  } else {
    finalGlobalData.splashHeaderColor = '#' + headerFontColor;
  }

    var splashbg = $(".splashBg");
    var splashBgColor = splashbg[0].value;
    if (splashBgColor.includes('#')) {
      finalGlobalData.splashBackgroundColor = splashBgColor;
    } else {
      finalGlobalData.splashBackgroundColor = '#' + splashBgColor;
    }
  

  if(finalGlobalData.Opacity){
    var opacity = document.getElementById("fixOpacity");
    opacity.value = finalGlobalData.Opacity;
    var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
  }else{
    finalGlobalData.Opacity = fixOpacity;
  }
  
  var modifiedJSON = finalGlobalData;
  modifiedJSON.entry_view = finalGlobalData.entry_view;
  var dataToPost = JSON.stringify(modifiedJSON);
  return dataToPost;
  //   dataToPost.unwrap();
}

function addLaunchScreenText() {
  toggleSideNav('launchSidenav');
  finalGlobalData.launch_text = document.getElementById("lunchScreenText").value;
}

function changeSplashImage() {
  assettype = 'Image';
  imageLocation = "Splash";
  window.parent.triggerAssetsPopup();
}

function popSnackbar(type, message) {
  var x = document.getElementById("snackbar");
x.innerText = message;
  x.className = "show " + type;
  setTimeout(function () {
    x.className = x.className.replace("show " + type, "");
  }, 3000);
}
 $("#summernote").bind("change paste keyup", function () {
});


AFRAME.registerComponent('set-sky', {
  init() {

    this.el.addEventListener('click', () => {
      if (this.el.id == "blankScreen")
        toggleSideNav('movieSidenav');
      else
        toggleSideNav('auditoriumSidenav');
    });
  }
});

