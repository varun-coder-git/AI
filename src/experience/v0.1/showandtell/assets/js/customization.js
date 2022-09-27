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
var splashImagePath;
var fixOpacity = 0.2;
var imageOpacity = 0.6;
var showandtelldata;

function initializeCustomization(experienceToCustomize) {
  showandtelldata = JSON.parse(experienceToCustomize);
  if (showandtelldata["entry_view"]) {
    $("#CamEntity").attr("rotation", showandtelldata["entry_view"]);
  }
  renderExperience(showandtelldata);
}

function setEntryView() {
  if ($('#freezeView').hasClass('disabled')) {
    //Nothing to do here
  } else {
    var cam = document.querySelector("[camera]");
    var pos = cam.getAttribute("rotation");
    var oldpos = 0;
    if (showandtelldata["entry_view"]) {
      oldpos = showandtelldata["entry_view"].split(" ")[1];
    }
    showandtelldata["entry_view"] = "0 " + (pos.y + parseInt(oldpos)) + " 0";
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

function getExperienceToSave() {

  var lauchText = $(".lunchScreenText");

  var lunchTextItem = lauchText[0].value;
  showandtelldata.launch_text = lunchTextItem;

  var splashInstruction = $(".instructionSetForDesktop");
  var item = splashInstruction[0].value;
  showandtelldata.splash_instruction = item;

  var splashAndroidInstruction = $(".instructionSetForAndroid")
  var item = splashAndroidInstruction[0].value;
  showandtelldata.splash_android_instruction = item;

  showandtelldata.splash_image = splashImagePath;

  var headerFont = $(".headerfont");
  var headerFontColor = headerFont[0].value;
  if (headerFontColor.includes('#')) {
    showandtelldata.splashHeaderColor = headerFontColor;
  } else {
    showandtelldata.splashHeaderColor = '#' + headerFontColor;
  }

  var splashbg = $(".splashBg");
  var splashBgColor = splashbg[0].value;
  if (splashBgColor.includes('#')) {
    showandtelldata.splashBackgroundColor = splashBgColor;
  } else {
    showandtelldata.splashBackgroundColor = '#' + splashBgColor;
  }



  if (showandtelldata.Opacity) {
    var opacity = document.getElementById("splashOpacity");
    opacity.value = showandtelldata.Opacity;
    var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
  } else {
    var opacity = document.getElementById("splashOpacity");
    opacity.value = fixOpacity;
    var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    showandtelldata.Opacity = opacity.value;
  }

  var modifiedJSON = showandtelldata;
  modifiedJSON.entry_view = showandtelldata.entry_view;
  var dataToPost = JSON.stringify(modifiedJSON);
  return dataToPost;
  //   dataToPost.unwrap();
}

////////////save json////////
var showandtelldata;
var assettype;
var assetPath;
var imageID = '';
var isSky = true;
var clicked = false;
var newImage = false;
var editImage = true;
var newImageDate = {
  "imagelocation": '',
  "imagetext": '',
  "audiolocation": ''
};

function toggleSideNav(sidenavId) {
  // document.querySelector("#selectedImageTag").setAttribute("src", "assets/images/default.png");
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function (navigation) {
    if (navigation.classList.contains('active') && navigation.id != sidenavId)
      navigation.classList.remove('active');
  });
  document.getElementById(sidenavId).classList.toggle("active");

  if (sidenavId == "imagesSidenav") {
    if (showandtelldata.image.length > 0) {
      for (var i = 1; i <= showandtelldata.image.length; i++) {
        $("#collapseImage-" + i).removeClass("show");
      }
      $("#collapseNewImage").removeClass("show");
    }
    $("#collapseImage-1").addClass("show");

  }

  toggleOverlay();
}


function getAssetType() {
  return assettype;
}

function getAssetPath(assetPath) {
  if(assetPath==undefined || assetPath==""){
    return;
  }
  if (assetPath) {

    if (assetId == 'splashImage') {
      splashImagePath = assetPath;
      var splashImageName = splashImagePath.split("/")[splashImagePath.split("/").length - 1];
      $("#splashImageLable").text(splashImageName);
    } else if (assetId == 'customFileThemeImage') {
      $('a-videosphere').attr('visible', 'false');
      $('#videoskyid').attr('src', '');

      document.querySelector("#bgImage").setAttribute("src", assetPath);


      if (!document.querySelector('a-sky')) {
        $('a-sky').remove();
        var assets = document.querySelector('a-assets');
        var scene = document.querySelector('a-scene');
        var aSky = '';
        aSky = document.createElement('a-sky');
        aSky.setAttribute('src', assetPath);
        aSky.setAttribute('crossorigin', 'anonymous');
        scene.appendChild(aSky);
      } else {
        $('a-sky').attr('visible', 'true');
        $("a-sky").attr('src', "");
        $("a-sky").attr('src', assetPath);
      }
      var name = assetPath.split('/');
      name = name[name.length - 1];
      $('#customLabelThemeImage').html('<span>' + name + '</span>');
      showandtelldata.videoskypath = '';
      showandtelldata.imageskypath = assetPath;
    } else if (assetId == 'customFileThemeVideo') {
      var assets = document.querySelector('a-assets');
      var scene = document.querySelector('a-scene');
      $('a-sky').attr('visible', 'false');
      $('a-sky').attr('src', '');
      $('a-videosphere').attr('visible', 'true');
      if (!document.querySelector('a-videosphere')) {
        var skyVideo = document.createElement('video');
        skyVideo.setAttribute('id', "videoskyid");
        skyVideo.setAttribute('src', assetPath);
        skyVideo.setAttribute('autoplay', 'true');
        // skyVideo.setAttribute('muted', 'true');
        skyVideo.setAttribute('loop', '');
        skyVideo.setAttribute('crossorigin', 'anonymous');
        assets.appendChild(skyVideo);
        skyVideo.muted = true;
        skyVideo.play();
        var aVideoSphere = '';
        aVideoSphere = document.createElement('a-videosphere');
        aVideoSphere.setAttribute('src', "#videoskyid");
        aVideoSphere.setAttribute('crossorigin', 'anonymous');
        scene.appendChild(aVideoSphere);
      } else {
        $('#videoskyid').attr('src', assetPath);
        skyVideo = document.querySelector("#videoskyid");
        skyVideo.play();
        $('a-videosphere').attr('src', '');
        $('a-videosphere').attr('src', '#videoskyid');
      }
      showandtelldata.imageskypath = '';
      showandtelldata.videoskypath = assetPath;
      var name = assetPath.split('/');
      name = name[name.length - 1];
      $('#customLabelThemeVideo').html('<span>' + name + '</span>');

    } else if (assetId.indexOf('customFileImage') >= 0) {
      customizeImage(assetPath, assetId);
    } else if (assetId.indexOf('customFileAudio') >= 0) {
      var id = assetId.split('-');
      id = id[id.length - 1];
      var name = assetPath.split('/');
      name = name[name.length - 1];
      // if(name.length > 25){
      //     var strat = name.substr(0, 15);
      //     var end = name.substr(name.length-7, name.length);
      //     name = strat +'....'+ end;
      // }
      $('#customLabelAudio-' + id).html('<span>' + name + '</span>');
      customizeAudio(assetPath, assetId);
    }
  }
}

function openHelpModal(assetsType) {

  assettype = 'Image';
  window.parent.triggerAssetsPopup();
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
  });
  toggleOverlay();
}

function showAllImages() {
  $("#allImages").show();
  $("#showLess").show();
  $("#showMore").hide();
} ///////////show more/////////////

function hideAllImages() {
  $("#showMore").show();
  $("#showLess").hide();
  $("#allImages").hide();
} /////////////show less////////////////

function editImageSelect(image) {
  var editImageSelected = document.querySelector("#selectedImageTag");
  var selectedImage = document.querySelector("#" + image);
  editImageSelected.setAttribute("src", selectedImage.src);
  var temp = image.split("-");
  i = temp[1];
  $("#customLabelImage").text(showandtelldata.image[i - 1].imagelocation);
  $("#customLabelAudio").text(showandtelldata.image[i - 1].audiolocation);
  document.getElementById("imageDescription").value = showandtelldata.image[i - 1].imagetext;
  hideAllImages();
} ///////////edit on image click///////////////

function deleteImageSelect(image) {
  var temp = image.split("-");
  i = temp[1];
  document.querySelector("#deleteSelectedImageTag").setAttribute("src", showandtelldata.image[i - 1].imagelocation);
  document.getElementById('myModal').style.display = 'block'
} ///////////////popup on delete image click//////////////////

AFRAME.registerComponent('set-sky', {
  init() {
    this.el.addEventListener('mouseenter', () => {

      for (var i = 1; i <= showandtelldata.image.length; i++) {
        if (this.el.id != i) {
          var gif = document.querySelector('#gif' + i);
          gif.setAttribute('visible', "false");
        }
      }

      var gif = document.querySelector('#gif' + this.el.id);
      gif.setAttribute('visible', 'true'); ////////////show image border gif on enter///////////////
    });

    this.el.addEventListener('click', () => {
      toggleSideNav('imagesSidenav');
      // if (!document.querySelector('#collapseImage-' + this.el.id).classList.contains('show')){

      //     $('#btnImage-' + this.el.id).trigger('click');
      // }
      setTimeout(document.querySelector('#collapseImage-' + this.el.id).scrollIntoView(true), 2000);
      
      $("#collapseImage-1").removeClass("show");
      $("#collapseImage-" + this.el.id).addClass("show")
    });

    this.el.addEventListener('mouseleave', () => {
      for (var i = 1; i <= showandtelldata.image.length; i++) {
        var gif = document.querySelector('#gif' + i);
        gif.setAttribute('visible', "false");
      }
    });
  }
});


function renderExperience(showandtelldata) {
    
    var bgcustomimg = document.querySelector("#customBgThemeImage");

  if (showandtelldata.launch_text) {
    document.getElementsByClassName("lunchScreenText").value = showandtelldata.launch_text;
    $('.lunchScreenText').summernote('code', showandtelldata.launch_text);
    var lauchText = $(".lunchScreenText");
    var div = document.createElement("div");
    div.innerHTML = lauchText[0].value;
    var plainText = div.textContent || div.innerText || "";
    var maxLength = 350;
    $('#maxCount').text(plainText.length);
    console.log("Text", $('#maxCount'));

  }
  if (showandtelldata.splash_instruction) {
    document.getElementsByClassName("instructionSetForDesktop").value = showandtelldata.splash_instruction;
    $('.instructionSetForDesktop').summernote('code', showandtelldata.splash_instruction);
  }
  if (showandtelldata.splash_android_instruction) {
    document.getElementsByClassName("instructionSetForAndroid").value = showandtelldata.splash_android_instruction;
    $('.instructionSetForAndroid').summernote('code', showandtelldata.splash_android_instruction);
  }
  if (showandtelldata.splash_image) {
    splashImagePath = showandtelldata.splash_image;
    var splashImageName = splashImagePath.split("/")[splashImagePath.split("/").length - 1];
    $("#splashImageLable").text(splashImageName);
  }
  var splashBackground = document.getElementById("splashBackground");
  if (showandtelldata.splashBackgroundColor) {
    splashBackground.value = showandtelldata.splashBackgroundColor;
    splashBackground.style.backgroundColor = splashBackground.value;
  } else {
    splashBackground.style.backgroundColor = "#8F8F8F";
  }

  if (showandtelldata.Opacity) {
    var opacity = document.getElementById("splashOpacity");
    opacity.value = showandtelldata.Opacity;
    var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    document.getElementById("splashBackground").style.opacity = opacity.value;
  } else {
    var opacity = document.getElementById("splashOpacity");
    opacity.value = fixOpacity;
    var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  }

  if (showandtelldata.splashHeaderColor) {
    var splashHeaderColor = document.getElementById('splashHeaderColor')
    splashHeaderColor.value = showandtelldata.splashHeaderColor;
    splashHeaderColor.style.backgroundColor = splashHeaderColor.value;
  }

  var opacity1 = document.getElementById("descriptionBgOpacity");
  if (showandtelldata.descriptionBgOpacity) {
    opacity1.value = showandtelldata.descriptionBgOpacity;
    var displayvalue = '(' + Math.round(opacity1.value * 100) + '%)';
    document.getElementById("ImageDescriptionRangeValue").innerText = displayvalue;
  } else {
    opacity1.value = 0.6;
    var default_value = '(' + Math.round(opacity1.value * 100) + '%)';
    document.getElementById("ImageDescriptionRangeValue").innerText = default_value;
  }
  if (showandtelldata.descriptionBgColor) {
    var var1 = document.getElementById("descriptionBgColor");
    var1.value = showandtelldata.descriptionBgColor;
    var1.style.backgroundColor = showandtelldata.descriptionBgColor;
  } else {
    var defaultBackground = document.getElementById("descriptionBgColor");
    defaultBackground.style.backgroundColor = "#000";
    defaultBackground.value = "#8F8F8F";
  }
  if (showandtelldata.descriptionFontColor) {
    var var2 = document.getElementById("descriptionFontColor");
    var2.value = showandtelldata.descriptionFontColor;
    var2.style.backgroundColor = showandtelldata.descriptionFontColor;
  }

  $("#allImages").hide();
  $("#showLess").hide();
  var assets = document.querySelector('a-assets');
  var scene = document.querySelector('a-scene');



  var aLight = '';
  aLight = document.createElement('a-entity');
  aLight.setAttribute("light", "color:#f0f0f0;type:ambient")
  scene.appendChild(aLight);

  createPoints();
  $("#accordionImage > div").remove();
  for (var i = 1; i <= showandtelldata.image.length; i++) {
    createAccordion(i);
  }
  if (showandtelldata.imageskypath) {
    var innerDiv = document.createElement('div');
    innerDiv.setAttribute("id", "innerBgDiv");
    innerDiv.setAttribute("onclick", "themeChanged(this)");
    bgcustomimg.appendChild(innerDiv);
    var span = document.createElement('span');
    span.innerHTML = "Custom Theme";
    var br = document.createElement('br');
    var img = document.createElement('img');
    img.setAttribute("id", "bgImage");
    img.setAttribute("class", "imagePanel");
    img.setAttribute("src", showandtelldata.imageskypath);
    document.querySelector("#innerBgDiv").appendChild(span);
    document.querySelector("#innerBgDiv").appendChild(br);
    document.querySelector("#innerBgDiv").appendChild(img);

    //$('#imageSkyPopup').show();
    $('#imageRadio').click();
    //$('#videoSkyPopup').hide();
    var aSky = '';
    aSky = document.createElement('a-sky');
    aSky.setAttribute('src', showandtelldata.imageskypath);
    aSky.setAttribute('crossorigin', 'anonymous');
    scene.appendChild(aSky);
    var name = showandtelldata.imageskypath.split('/');
    name = name[name.length - 1];
    // if(name.length > 25){
    //     var strat = name.substr(0, 15);
    //     var end = name.substr(name.length-7, name.length);
    //     name = strat +'....'+ end;
    // }
    $('#customLabelThemeImage').html('<span>' + name + '</span>');
  } else {
    $('#videoRadio').click();
    // $('#imageSkyPopup').hide();
    // $('#videoSkyPopup').show();
    var skyVideo = document.createElement('video');
    skyVideo.setAttribute('id', "videoskyid");
    skyVideo.setAttribute('src', showandtelldata.videoskypath);
    skyVideo.setAttribute('autoplay', 'true');
    //skyVideo.setAttribute('muted', 'true');
    skyVideo.setAttribute('loop', '');
    skyVideo.setAttribute('crossorigin', 'anonymous');
    assets.appendChild(skyVideo);
    skyVideo.muted = true;
    skyVideo.play()
    var aVideoSphere = '';
    aVideoSphere = document.createElement('a-videosphere');
    aVideoSphere.setAttribute('src', "#videoskyid");
    aVideoSphere.setAttribute('crossorigin', 'anonymous');
    scene.appendChild(aVideoSphere);
    var name = showandtelldata.videoskypath.split('/');
    name = name[name.length - 1];
    // if(name.length > 25){
    //     var strat = name.substr(0, 15);
    //     var end = name.substr(name.length-7, name.length);
    //     name = strat +'....'+ end;
    // }
    $('#customLabelThemeVideo').html('<span>' + name + '</span>');
  }
}

$(document).ready(function () {

  document.getElementById('overlay').addEventListener('click', function (e) {
    $(".sidenav").removeClass('active');
    $("#overlay").removeClass('overlay');

  });
  document.querySelector('a-scene').addEventListener('loaded', function () {
    loadedAscene = true;
  });
  document.querySelector('a-assets').addEventListener('loaded', function () {
    loadedAassets = true;
  });

  $("#splashOpacity").on("input", function () {
    fixOpacity = $(this).val();
    var displayvalue = '(' + Math.round(fixOpacity * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    showandtelldata.Opacity = fixOpacity;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  });
  $(".descriptionBgOpacity").on("input", function () {
    var value = $(this).val();
    var displayvalue = '(' + Math.round(value * 100) + '%)';
    document.getElementById("ImageDescriptionRangeValue").innerText = displayvalue;
  });
});
var loadedAscene = false;
var loadedAassets = false;

var checkAssetsLoaded = setInterval(function () {
  if (loadedAscene && loadedAassets) {
    clearInterval(checkAssetsLoaded);
    $("#loaderq").hide();
document.getElementById("loaderoverlay").style.display = "none";

  }
}, 1000);

function createPoints() {
  var assets = document.querySelector('a-assets');
  var scene = document.querySelector('a-scene');
  for (var i = 1; i <= showandtelldata.image.length + 1; i++) {
    //////////////////delete all////////////////////
    if (document.querySelector("#imageasset" + i))
      $("#imageasset" + i).remove();
    if (document.getElementById(i))
      $("#" + i).remove();
    if (document.querySelector("#aImage" + i))
      $("#aImage" + i).remove();
    if (document.querySelector("#planeEntity" + i))
      $("#planeEntity" + i).remove();
    if (document.querySelector("#audioAssets" + i))
      $("#audioAssets" + i).remove();
    if (document.querySelector("#audio" + i))
      $("#audio" + i).remove();
    if (document.querySelector("#mainDiv" + i))
      $("#mainDiv" + i).remove();
    if (document.querySelector("#deleteMainDiv" + i))
      $("#deleteMainDiv" + i).remove();
    if (document.querySelector("#gif" + i))
      $("#gif" + i).remove();
    //////////////////delete all////////////////////
  }
  for (var i = 1; i <= showandtelldata.image.length; i++) {
    ///////////////img/////////////
    var img = '';
    img = document.createElement('img');
    img.setAttribute('id', "imageasset" + i);
    img.setAttribute('crossorigin', 'anonymous');
    img.setAttribute('src', showandtelldata.image[i - 1].imagelocation);
    assets.appendChild(img);
    var aimg = '';
    aimg = document.createElement('a-image');
    aimg.setAttribute('id', "aImage" + i);
    aimg.setAttribute("src", "#imageasset" + i);
    scene.appendChild(aimg);

    var aimgPlane = '';
    aimgPlane = document.createElement('a-entity');
    aimgPlane.setAttribute('id', i);
    aimgPlane.classList.add('clickable');
    aimgPlane.setAttribute('geometry', "primitive:plane;height:2.4;width:2.9;");
    aimgPlane.setAttribute('opacity', '0.7');
    aimgPlane.setAttribute('visible', 'false');
    aimgPlane.setAttribute('transparent', 'true');
    aimgPlane.setAttribute('set-sky', '');
    aimgPlane.setAttribute("material", "color:#FFFFFF;")
    scene.appendChild(aimgPlane);

    aimg.setAttribute("animation__displayImage", "property: opacity;from:0;to:1; dur: 1500;delay:" + (450 * i) + ";fill:forwards");
    // setTimeout(function () {
    //   aimg.removeAttribute("animation__opacityFirstOpaAnimation");
    // }, 1500);


    //////////////////////img//////////////
    ///////////////////gif/////////////////////////
    var agif = '';
    agif = document.createElement('a-entity');
    agif.setAttribute('id', "gif" + i);
    agif.setAttribute("geometry", "primitive:plane;");
    agif.setAttribute("material", "shader:gif;src:url(./assets/images/bdr.gif);opacity:.9");
    agif.setAttribute("scale", "2.8 2.15 2");
    agif.setAttribute("visible", "false");
    scene.appendChild(agif);

    ///////////////////gif/////////////////////////
    ////////////////plane and text/////////////
    var aplane = '';
    aplane = document.createElement('a-entity');
    aplane.setAttribute('id', "planeEntity" + i);
    aplane.setAttribute('obj-model', "obj:assets/images/moonlight.obj");
    aplane.setAttribute('material', "src:assets/images/tvscreenplane.jpg;side:double;");
    aplane.setAttribute('visible', "false");
    aplane.setAttribute('scale', "0.04 0.04 0.1");
    scene.appendChild(aplane);

    var atext = '';
    atext = document.createElement('a-text');
    atext.setAttribute('id', "text" + i);
    atext.setAttribute('text', "align:center;width:10;color:black");
    atext.setAttribute('scale', "8 10 1");
    atext.setAttribute('wrap-pixels', "1000");
    if (showandtelldata.image[i - 1].imagelocation)
      atext.setAttribute('value', showandtelldata.image[i - 1].imagetext);
    atext.setAttribute('position', "0 0 1");
    aplane.appendChild(atext);


    ////////////////plane and text/////////////
    ////////////////audio/////////////
    // var audio = '';
    // audio = document.createElement('audio');
    // audio.setAttribute('id', "audioAssets" + i);
    // audio.setAttribute('src', showandtelldata.image[i - 1].audiolocation);
    // assets.appendChild(audio);

    // var aaudio = '';
    // aaudio = document.createElement('a-entity');
    // aaudio.setAttribute('id', "audio" + i);
    // aaudio.setAttribute('sound', "src: #audioAssets" + i);
    // aaudio.setAttribute('position', 15 * Math.cos(toRadians((i - 1) * 36)) + " 0.1 " + 15 * Math.sin(toRadians((i - 1) * 36)));
    // scene.appendChild(aaudio);
    ////////////////audio/////////////
  }

  for (var i = 1; i <= showandtelldata.image.length; i++) {
    $("#aImage" + i).attr("position", 8 * Math.cos(toRadians((i - 1) * 36)) + " 1.6 " + 8 * Math.sin(toRadians((i - 1) * 36)));
    $("#aImage" + i).attr("rotation", "0 " + (270 - ((i - 1) * 36)) + " 0");
    $("#aImage" + i).attr("geometry", "width:2.8;height:2.1");

    $("#gif" + i).attr("position", 7.9 * Math.cos(toRadians((i - 1) * 36)) + " 1.6 " + 7.9 * Math.sin(toRadians((i - 1) * 36)));
    $("#gif" + i).attr("rotation", "0 " + (270 - ((i - 1) * 36)) + " 0");

    $("#" + i).attr("position", 8 * Math.cos(toRadians((i - 1) * 36)) + " 1.6 " + 8 * Math.sin(toRadians((i - 1) * 36)));
    $("#" + i).attr("rotation", "0 " + (270 - ((i - 1) * 36)) + " 0");
    $("#" + i).attr("geometry", "width:2.8;height:2.1");

    $("#planeEntity" + i).attr("position", 8 * Math.cos(toRadians((i - 1) * 36)) + " -1.4 " + 8 * Math.sin(toRadians((i - 1) * 36)));
    $("#planeEntity" + i).attr("rotation", "-10 " + (270 - ((i - 1) * 36)) + " 0");
  }
}
var OrbitId;

function createAccordion(i) {

  var accordion = document.querySelector("#accordionImage");

  var card = document.createElement('div');
  card.setAttribute("class", "card");

  var cardheader = document.createElement('div');
  cardheader.setAttribute("class", "card-header");
  cardheader.setAttribute("id", "headingImage-" + i);

  var header = document.createElement('h3');
  header.setAttribute("class", "mb-0");

  var button = document.createElement('button');
  button.setAttribute("class", "btn btn-link south");
  button.setAttribute("id", "btnImage-" + i);
  button.setAttribute("data-toggle", "collapse");
  button.setAttribute("data-target", "#collapseImage-" + i);
  button.setAttribute("aria-expanded", "true");
  button.setAttribute("aria-controls", "collapseImage-" + i);
  button.innerHTML = "Image " + i;

  var deleteBtn = document.createElement('span');
  deleteBtn.setAttribute('class', 'fas fa-trash-alt mt-3 mr-3 pull-right handPointer delete-icon');
  deleteBtn.setAttribute('onclick', '$("#deleteConfirmationModal").modal("show"); OrbitId = ' + i); //'deleteImageOnSelect('+i+')')
  deleteBtn.setAttribute('onmouseenter', 'mouseEnter(\'You can delete the image from your Image Orbit by simply hitting this button. \');');
  deleteBtn.setAttribute('onmouseleave', 'mouseLeave();');
  header.appendChild(button);
  cardheader.appendChild(deleteBtn);
  cardheader.appendChild(header);
  card.appendChild(cardheader);
  accordion.appendChild(card);

  var cardAccordion = document.createElement('div');
  cardAccordion.setAttribute("class", "collapse");
  cardAccordion.setAttribute("id", "collapseImage-" + i);
  cardAccordion.setAttribute("aria-labelledby", "headingImage-" + i);
  cardAccordion.setAttribute("data-parent", "#accordionImage");

  var cardBody = document.createElement('div');
  cardBody.setAttribute("class", "card-body");

  var divRow = document.createElement('div');
  divRow.setAttribute("class", "row");

  var divCol = document.createElement('div');
  divCol.setAttribute("class", "col-12 padding-bottom-0px");

  var img = document.createElement('img');
  img.setAttribute("src", showandtelldata.image[i - 1].imagelocation);
  img.setAttribute("id", "imageAccordion-" + i);
  img.setAttribute("onclick", "rotateCam(" + (36 * i) + ")");
  img.setAttribute("style", "width:120px;height:90px;");

  var divCollabale = document.createElement('div');
  divCollabale.setAttribute("class", "col-12");
  divCollabale.setAttribute("style", "padding-top: 0px;");

  var lable = document.createElement('label');
  lable.setAttribute("class", "aspect-ratio-style");
  lable.setAttribute("id", "frameImageTitle");
  lable.innerText = "Note: Recommended aspect ratio 4:3";

  var divCol1 = document.createElement('div');
  divCol1.setAttribute("class", "col-12");

  var divfile = document.createElement('div');
  divfile.setAttribute("class", "custom-file mb-1per");

  var imageUpload = document.createElement('input');
  imageUpload.setAttribute("class", "custom-file-input handPointer input_box_trasparent");
  imageUpload.setAttribute("type", "button");
  imageUpload.setAttribute("id", "customFileImage-" + i);
  imageUpload.setAttribute("accept", "image/png, image/jpeg");
  imageUpload.setAttribute("onclick", "customSkyImage('Image', this)");

  var imageUploadLable = document.createElement('label');
  imageUploadLable.setAttribute("class", "custom-file-label form-control input_box_trasparent text-overflow");
  imageUploadLable.setAttribute("id", "customLabelImage-" + i);
  imageUploadLable.setAttribute("for", "customFileImage-" + i);
  imageUploadLable.innerHTML = '<span class="text-overflow">Choose Image</span>';
  if (showandtelldata.image[i - 1].imagelocation != null && showandtelldata.image[i - 1].imagelocation != undefined && showandtelldata.image[i - 1].imagelocation != '') {

    var name = showandtelldata.image[i - 1].imagelocation.split('/');
    name = name[name.length - 1];
    //         if(name.length > 25){
    //             var strat = name.substr(0, 15);
    //             var end = name.substr(name.length-7, name.length);
    //             name = strat +'....'+ end;
    //         }

    // imageUploadLable.innerHTML = name;
    imageUploadLable.innerHTML = '<span class="text-overflow">' + name + '</span>';
  }

  var divCol2 = document.createElement('div');
  divCol2.setAttribute("class", "col-12");

  var textarea = document.createElement('textarea');
  textarea.setAttribute("class", "form-control input_box_trasparent");

  textarea.setAttribute("placeholder", "Description text here.");
  textarea.setAttribute("maxlength", "300");
  textarea.setAttribute("id", "imageDescription-" + i);
  textarea.setAttribute("onblur", "editText(" + i + ")");

  if (showandtelldata.image[i - 1].imagetext != null && showandtelldata.image[i - 1].imagetext != undefined && showandtelldata.image[i - 1].imagetext != '')
    textarea.innerHTML = showandtelldata.image[i - 1].imagetext

  var divCol3 = document.createElement('div');
  divCol3.setAttribute("class", "col-12 margin-bottom-col12");


  var divAudio = document.createElement('div');
  divAudio.setAttribute("class", "custom-file");

  var audioUpload = document.createElement('input');
  audioUpload.setAttribute("class", "custom-file-input handPointer input_box_trasparent text-overflow");
  audioUpload.setAttribute("type", "button");
  audioUpload.setAttribute("id", "customFileAudio-" + i);
  audioUpload.setAttribute("accept", "audio/*");
  audioUpload.setAttribute("onclick", "customSkyImage('Audio', this)");

  var audioUploadLable = document.createElement('label');
  audioUploadLable.setAttribute("class", "custom-file-label form-control input_box_trasparent text-overflow");
  audioUploadLable.setAttribute("id", "customLabelAudio-" + i);
  audioUploadLable.setAttribute("for", "customFileAudio-" + i);
  audioUploadLable.innerHTML = '<span>Choose Audio</span>';

  var audioremove = document.createElement('span');
  audioremove.setAttribute('id', 'customFileRemoveAudio-' + i);
  audioremove.setAttribute('onclick', 'removeAudio(this)');
  audioremove.setAttribute('onmouseleave', 'mouseLeave()');
  audioremove.setAttribute('class', 'remove-audio');
  audioremove.setAttribute('onmouseenter', 'mouseEnter("In case if you wish to remove the Audio you have set for this orbit image, use this option.")');
  audioremove.innerHTML = 'Remove Audio';
  if (showandtelldata.image[i - 1].audiolocation != null && showandtelldata.image[i - 1].audiolocation != undefined && showandtelldata.image[i - 1].audiolocation != '') {

    var audioName = showandtelldata.image[i - 1].audiolocation.split('/');
    audioName = audioName[audioName.length - 1];
    //             if(audioName.length > 25){
    //                 var strat = audioName.substr(0, 15);
    //                 var end = audioName.substr(audioName.length-7, audioName.length);
    //                 audioName = strat +'....'+ end;
    //             }
    //     audioUploadLable.innerHTML = audioName;
    audioUploadLable.innerHTML = '<span>' + audioName + '</span>';
  }
  // var divCol4 = document.createElement("DIV");
  // divCol4.setAttribute("id", "bannerid-" + i)
  // divCol4.setAttribute("style", "width:100%")

  divCol.appendChild(img);

  divfile.appendChild(imageUploadLable);
  divfile.appendChild(imageUpload);
  divCol1.appendChild(divfile);

  divCol2.appendChild(textarea);

  divAudio.appendChild(audioUploadLable);
  divAudio.appendChild(audioUpload);
  divAudio.appendChild(audioremove);
  divCol3.appendChild(divAudio);

  divRow.appendChild(divCol);
  divRow.appendChild(divCollabale);
  divCollabale.appendChild(lable);
  divRow.appendChild(divCol1);
  divRow.appendChild(divCol2);
  //divRow.appendChild(divCol4);
  divRow.appendChild(divCol3);

  cardBody.appendChild(divRow);
  cardAccordion.appendChild(cardBody);
  card.appendChild(cardAccordion);
  //createAccordionAddColorPicker(i);
}

var assetId;

function customSkyImage(type, event) {
  assettype = type;
  assetId = event.id;
  window.parent.triggerAssetsPopup();
} /////////////add custom sky and add in json/////////////////

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function rotateCam(angle) {
  var cam = document.querySelector('#mainCam');
  // var camera = document.querySelector('#mainCamto');
  // cam.setAttribute('rotation', "0 " + angle + " 0");
  cam.setAttribute("animation__firstrotation", "property: rotation;to:0 0 0;from:" + "0 " + angle + " 0" + "; dur: 1500;delay:" + (450 * i) + ";fill:forwards")
}

function themeChanged(theme) {
  var sky = document.querySelector("a-sky");
  sky.setAttribute('src', "");
  sky.setAttribute('src', theme.children[2].src);
  showandtelldata.imageskypath = theme.children[2].src;
} /////////////////////add default sky in json//////////

function changeSkyType(type) {
  if (type == 'Image') {
    $('#imageSkyPopup').show();
    $('#videoSkyPopup').hide();
    $('#customBgThemeImage').show();
  } else {
    $('#imageSkyPopup').hide();
    $('#videoSkyPopup').show();
    $('#customBgThemeImage').hide();
  }
}

function customizeImage(imgData, id) {
  id = id.split('-');
  id = id[id.length - 1];
  if (id == 0) {
    saveNewImage(imgData, id);
  } else {
    editSelectedImage(imgData, id);
  }

} /////////////image file data extraction ////////////////

function customizeAudio(audioData, id) {
  id = id.split('-');
  id = id[id.length - 1];
  if (id == 0) {
    newAudio(audioData);
  } else {
    editAudio(audioData, id);
  }

} /////////////////////audio file data extraction//////////

function popSnackbar(type, message) {
  var x = document.getElementById("snackbar");
  x.innerText = message;
  x.className = "show " + type;
  setTimeout(function () {
    x.className = x.className.replace("show " + type, "");
  }, 3000);
}

function removeAudio(event) {
  id = event.id.split('-')[1];
  showandtelldata.image[id - 1].audiolocation = '';
  $('#customLabelAudio-' + id).html('<span>Choose Audio</span>');
  createPoints();
}

function customizeText() {
  var imageDescription = document.getElementById("imageDescription");
  if (imageDescription.value != '' && imageDescription.value != null && imageDescription.value != undefined) {
    if (editImage) {
      editText();
    }
  }
  if (newImage) {
    newText();
  }
  if (editImage) {
    createPoints();
  }
} ///////////change image text/////////////

function newText() {
  var imageDescription = document.getElementById("newImageDiscription");
  newImageDate.imagetext = imageDescription.value;
}

function addNewImage() {
  if (showandtelldata.image.length >= 10) {
    $('#customLabelNewImage').html('<span>Choose Image</span>');
    $('#customLabelAudio-0').html('<span>Choose Audio</span>');
    document.querySelector('#newImageDiscription').value = '';
    popSnackbar('warning', "You can add only 10 images.");
    //        $('#loaderoverlay').show();
    return;
  }
  if (newImageDate.imagelocation == '' || newImageDate.imagelocation == undefined || newImageDate.imagelocation == null) {

    popSnackbar('warning', 'Please select an image');
    return;
  }
  var temp = {
    "imagelocation": '',
    "imagetext": '',
    "audiolocation": '',
    "descriptionFontColor": '',
    "descriptionBgColor": '',
    "descriptionBgOpacity": ''
  };
  temp.audiolocation = newImageDate.audiolocation;
  temp.imagetext = newImageDate.imagetext;
  temp.imagelocation = newImageDate.imagelocation;

  var descriptionFontColor = $("#descriptionFontColor");
  if (descriptionFontColor[0].value.includes('#')) {
    temp.descriptionFontColor = descriptionFontColor[0].value;
  } else {
    temp.descriptionFontColor = '#' + descriptionFontColor[0].value;
  }

  var descriptionBgColor = $("#descriptionBgColor");
  if (descriptionBgColor[0].value.includes('#')) {
    temp.descriptionBgColor = descriptionBgColor[0].value;
  } else {
    temp.descriptionBgColor = '#' + descriptionBgColor[0].value;
  }

  var descriptionBgOpacity = $("#descriptionBgOpacity");
  var item3 = descriptionBgOpacity[0].value;
  temp.descriptionBgOpacity = item3;


  if (newImageDate.audiolocation != '' || newImageDate.imagetext != '' || newImageDate.imagelocation != '') {
    showandtelldata.image.push(temp); /////////////////push new image data in json///////////

    newImageDate.audiolocation = '';
    newImageDate.imagetext = '';
    newImageDate.imagelocation = '';
    document.querySelector('#newImageDiscription').value = '';
    createPoints();
    $('#customLabelNewImage').html('<span>Choose Image</span>');
    $('#customLabelAudio-0').html('<span>Choose Audio</span>');

    $("#accordionImage > div").remove();
    for (var i = 1; i <= showandtelldata.image.length; i++) {
      createAccordion(i);

    }
  }
}

function saveNewImage(imageData, id) {
  var name = imageData.split('/');
  name = name[name.length - 1];
  //                 if(name.length > 25){
  //                     var strat = name.substr(0, 15);
  //                     var end = name.substr(name.length-7, name.length);
  //                     name = strat +'....'+ end;
  //                 }
  $('#customLabelNewImage').html('<span>' + name + '</span>');
  newImageDate.imagelocation = imageData;
} ///////////////create new image///////////////

function newAudio(audioData) {

  newImageDate.audiolocation = audioData;

} /////////////////////create new audio////////////

function editSelectedImage(imageDate, id) {
  var i = id;
  showandtelldata.image[i - 1].imagelocation = imageDate;
  var assets = document.querySelector("#imageasset" + i);
  var customLabelImage = document.querySelector("#customLabelImage-" + i);
  var name = imageDate.split('/');
  name = name[name.length - 1];
  //                 if(name.length > 25){
  //                     var strat = name.substr(0, 15);
  //                     var end = name.substr(name.length-7, name.length);
  //                     name = strat +'....'+ end;
  //                 }

  customLabelImage.innerHTML = '';
  customLabelImage.innerHTML = '<span class="text-overflow">' + name + '</span>';
  var aImage = document.getElementById(i);
  var imagePanel = document.querySelector("#imageAccordion-" + i);

  imagePanel.setAttribute("src", showandtelldata.image[i - 1].imagelocation);
  // assets.setAttribute("src", showandtelldata.image[i - 1].imagelocation);
  // aImage.setAttribute("src", '');
  // aImage.setAttribute("src", "#imageasset" + i);
  createPoints();
} ////////////////edit image onchange////////////

function editAudio(audioData, id) {
  var i = id;
  showandtelldata.image[i - 1].audiolocation = audioData;
  var audioAsset = document.querySelector("#audioAssets" + i);
  var audio = document.querySelector("#audio" + i);
  audioAsset.setAttribute("src", showandtelldata.image[i - 1].audiolocation);
  audio.setAttribute("sound", "")
  audio.setAttribute('sound', "src: #audioAssets" + i);
  createPoints();
} /////////////////edit audio data for image/////////////////

function editText(i) {
  var imageDescription = document.getElementById("imageDescription-" + i);
  showandtelldata.image[i - 1].imagetext = imageDescription.value;

  createPoints();
}

function deleteImageOnSelect() {
  var id = OrbitId;
  showandtelldata.image.splice((id - 1), 1);
  createPoints();
  $("#accordionImage > div").remove();
  for (var i = 1; i <= showandtelldata.image.length; i++) {
    createAccordion(i);
  }
  $("#deleteConfirmationModal").modal('hide')
}

function addLaunchScreenText() {
  toggleSideNav('launchSidenav');

  showandtelldata.launch_text = document.getElementsByClassName("lunchScreenText").value;
}

function mouseEnter(msg) {
  window.parent.mouseEnter(msg);
}

function mouseLeave() {
  window.parent.mouseLeave();
}
// function createAccordionAddColorPicker(i) {

//     var imageBannerBgColor = '<div class="col-12" style="margin-top: 2%"><label>Description Font Color</label><input class="jscolor pointer  " id="descriptionFontColor' + i + '" onchange="changeDescriptionfont(' + i + ')" value="" style="width: 100%"><div></div></div><div class="col-12" style="margin-top: 2%"><label>Choose Description Background</label><input class="jscolor  pointer " id="descriptionBgColor' + i + '" value=""  style="width: 100%" onchange="changeDescriptionBg(' + i + ')"><div></div></div><div class="col-12" style="margin-top: 2%"><div class="row"><div class="col-10"><label style="color:#fff;width: 100%">Background Opacity(Drag tochange):</label></div><div class="col-2"><label id="ImageDescriptionRangeValue' + i + '" style:"color:#fff"></label></div></div><div class="slidecontainer"><input type="range" min="0" max="1" step="0.001" value="" class="slider" onchange="changeCss(this,' + i + ')" id="descriptionBgOpacity' + i + '" /></div></div>';
//     $("#bannerid-" + i).append(imageBannerBgColor);
//     jscolor.installByClassName("jscolor");
//     if (showandtelldata.image[i - 1].descriptionBgOpacity) {
//         var opacity = document.getElementById("descriptionBgOpacity" + i);
//         opacity.value = showandtelldata.image[i - 1].descriptionBgOpacity;
//         var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
//         document.getElementById("ImageDescriptionRangeValue" + i).innerText = displayvalue;
//     } else {
//         var opacity = document.getElementById("descriptionBgOpacity" + i)
//         opacity.value = fixOpacity;
//         var default_value = '(' + Math.round(opacity.value * 100) + '%)';
//         document.getElementById("ImageDescriptionRangeValue" + i).innerText = default_value;
//     }
//     if (showandtelldata.image[i - 1].descriptionBgColor) {
//         var var1 = document.getElementById("descriptionBgColor" + i);
//         var1.value = showandtelldata.image[i - 1].descriptionBgColor;
//         var1.style.backgroundColor = showandtelldata.image[i - 1].descriptionBgColor;
//     } else {
//         var defaultBackground = document.getElementById("descriptionBgColor" + i);
//         defaultBackground.style.backgroundColor = "#8F8F8F";
//     }
//     if (showandtelldata.image[i - 1].descriptionFontColor) {
//         var var2 = document.getElementById("descriptionFontColor" + i);
//         var2.value = showandtelldata.image[i - 1].descriptionFontColor;
//         var2.style.backgroundColor = showandtelldata.image[i - 1].descriptionFontColor;
//     }
// }

function changeCss(event) {
  showandtelldata.descriptionBgOpacity = event.value;
  var displayvalue = '(' + Math.round(event.value * 100) + '%)';
  document.getElementById("ImageDescriptionRangeValue").innerText = displayvalue;
}

function changeDescriptionBg() {
  var dbgColor = $("#descriptionBgColor");
  if (dbgColor[0].value.includes('#')) {
    showandtelldata.descriptionBgColor = dbgColor[0].value;
  } else {
    showandtelldata.descriptionBgColor = '#' + dbgColor[0].value;
  }
}

function changeDescriptionfont() {
  var dbgColor = $("#descriptionFontColor");
  if (dbgColor[0].value.includes('#')) {
    showandtelldata.descriptionFontColor = dbgColor[0].value;
  } else {
    showandtelldata.descriptionFontColor = '#' + dbgColor[0].value;
  }
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
