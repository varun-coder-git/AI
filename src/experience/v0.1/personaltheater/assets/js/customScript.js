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
var fixOpacity = 0.2;
var customObj = {};
var imagePath;
var assettype;
var frameID;
var validOption = false;
var loadedAscene = false;
var loadedAassets = false;
var splashImagePath;

$(document).ready(function () {
  document.querySelector("a-scene").addEventListener("loaded", function () {
    loadedAscene = true;
  });
  document.querySelector("a-assets").addEventListener("loaded", function () {
    loadedAassets = true;
  });
});

var checkAssetsLoaded = setInterval(function () {
  if (loadedAscene && loadedAassets) {
    $("#loaderq").hide();
    document.getElementById("loaderoverlay").style.display = "none";
    clearInterval(checkAssetsLoaded);
  }
}, 5000);

AFRAME.registerComponent("mouseclick", {
  init: function () {
    this.el.addEventListener("click", function () {
      var clickedImageId = this.id;
      if (clickedImageId.includes("wall")) {
        toggleSideNav("wallSidenav");
        $(".collapse").removeClass("show");
        var res = clickedImageId.split("-");
        if (res[0] == "south") {
          if (!$("#collapse-One").hasClass("show")) {
            $("#heading-One h3 button").trigger("click");
          }
          $("label").removeClass("background-color-forestgreen");
          if (res[3] == 1) {
            $("#south-wall-logoLabel").addClass("background-color-forestgreen");
          } else {
            $("#south-wall-image2Label").addClass(
              "background-color-forestgreen"
            );
          }
        } else if (res[0] == "east") {
          if (!$("#collapse-Three").hasClass("show")) {
            $("#heading-Three h3 button").trigger("click");
          }
          $("label").removeClass("background-color-forestgreen");
          $("#east-wall-logoLabel").addClass("background-color-forestgreen");
        } else if (res[0] == "west") {
          if (!$("#collapse-Two").hasClass("show")) {
            $("#heading-Two h3 button").trigger("click");
          }
          $("label").removeClass("background-color-forestgreen");
          $("#west-wall-logoLabel").addClass("background-color-forestgreen");
        }
      } else if (clickedImageId == "screenshot1") {
        toggleSideNav("movieFrameSidenav");
        $("label").removeClass("background-color-forestgreen");
        $("input").removeClass("background-color-forestgreen");
        $("#movieframe-0-ThumbnailLabel").addClass(
          "background-color-forestgreen"
        );
        $("#movieframe-0-headerInput").addClass("background-color-forestgreen");
        // $("#movieframe-0-subheaderInput").addClass('background-color-forestgreen');
      } else if (clickedImageId == "logo") {
        toggleSideNav("movieSidenav");
        $("label").removeClass("background-color-forestgreen");
        $("#settings-logo-ThumbnailLabel").addClass(
          "background-color-forestgreen"
        );
      } else {
        toggleSideNav("movieFrameSidenav");
        $(".collapse").removeClass("show");
        var res = clickedImageId.split("frame");
        if (!$("#collapse-" + res[1]).hasClass("show")) {
          $("#heading-" + res[1] + " h3 button").trigger("click");
        }
        $("label").removeClass("background-color-forestgreen");
        $("input").removeClass("background-color-forestgreen");
        $("#movieframe-" + res[1] + "-ThumbnailLabel").addClass(
          "background-color-forestgreen"
        );
        $("#movieframe-" + res[1] + "-VideoLabel").addClass(
          "background-color-forestgreen"
        );
        $("#movieframe-" + res[1] + "-headerInput").addClass(
          "background-color-forestgreen"
        );
        $("#movieframe-" + res[1] + "-subheaderInput").addClass(
          "background-color-forestgreen"
        );
      }
    });
  }
});

function initializeCustomization(experienceToCustomize) {
  customObj = JSON.parse(experienceToCustomize);
  //    if(customObj.launch_text)
  //    document.getElementById("lunchScreenText").value = customObj.launch_text;
  setPersonalTheatre();
  if (customObj["entry_view"]) {
    $("#CamEntity").attr("rotation", customObj["entry_view"]);
  }
}

function setEntryView() {
  if ($('#freezeView').hasClass('disabled')) {
    //Nothing to do here
  } else {
    var cam = document.querySelector("[camera]");
    var pos = cam.getAttribute("rotation");
    var posY = "0";
    if (customObj["entry_view"]) {
      posY = customObj["entry_view"].split(" ")[1];
    }
    customObj["entry_view"] = "0" + " " + (pos.y + parseInt(posY) + 90) + " 0";
    $('#freezeView').addClass('disabled');
    $('#freezeView').click(toastr.success('Presto! This view is now the Launch View of this Experience.'));
    // customObj["entry_view"] = (pos.x) + " " + (pos.y + parseInt(posY)) + " 0";
  }
}

AFRAME.registerComponent('mousedrag', {
  init: function () {
    this.el.addEventListener('mouseup', function () {
      $('#freezeView').removeClass('disabled');
    });
  }
});

$(document).ready(function () {
  $("#overlay").click(function () {
    $(".sidenav").removeClass("active");
    $("#overlay").removeClass("overlay");
  });

  $("#movieDelayDrownDownID").on("change", function () {
    customObj.Settings[0].delay = this.value;
  });

  $(".customHeaderInput").bind("change paste keyup", function () {
    var clickedId = this.id;
    var len = $(this).val().length;
    if (this.maxLength == len) {
      popSnackbar("warning", "Limit exceed.");
      // $(this).val("");
      //return;
    }

    var val = $("#" + clickedId).val();
    var res = clickedId.split("-");
    var num = parseInt(res[1]) + 1;
    if (clickedId.includes("subheader")) {
      subheader = document.getElementById("subheader" + num);
      subheader.setAttribute("value", val);
      if (res[1] == 0) {
        customObj.SubHeaderText = val.replace(/\s+$/, "");
      } else if (res[1] == 1) {
        customObj.Frame.frameSubHeader1 = val.replace(/\s+$/, "");
      } else if (res[1] == 2) {
        customObj.Frame.frameSubHeader2 = val.replace(/\s+$/, "");
      } else if (res[1] == 3) {
        customObj.Frame.frameSubHeader3 = val.replace(/\s+$/, "");
      } else if (res[1] == 4) {
        customObj.Frame.frameSubHeader4 = val.replace(/\s+$/, "");
      }
    } else {
      header = document.getElementById("header" + num);
      header.setAttribute("value", val);
      if (res[1] == 0) {
        customObj.HeaderText = val.replace(/\s+$/, "");
      } else if (res[1] == 1) {
        customObj.Frame.frameHeader1 = val.replace(/\s+$/, "");
      } else if (res[1] == 2) {
        customObj.Frame.frameHeader2 = val.replace(/\s+$/, "");
      } else if (res[1] == 3) {
        customObj.Frame.frameHeader3 = val.replace(/\s+$/, "");
      } else if (res[1] == 4) {
        customObj.Frame.frameHeader4 = val.replace(/\s+$/, "");
      }
    }
  });

  $("#fixOpacity").on("input", function () {
    fixOpacity = $(this).val();
    var displayvalue = '(' + Math.round(fixOpacity * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    customObj.Opacity = fixOpacity;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  });

  $(".moviecolor").bind("change paste keyup", function () {
    var color = $(this).val();
    $(this)
      .siblings()
      .css("background-color", "#" + color);
    var siblingId = $(this)
      .parent()
      .siblings(".form-control");
    var clickedId = siblingId[0].id;

    var val = $("#" + clickedId).val();
    var res = clickedId.split("-");
    var num = parseInt(res[1]) + 1;
    if (clickedId.includes("subheader")) {
      subheader = document.getElementById("subheader" + num);
      subheader.setAttribute("color", "#" + color);
      if (res[1] == 0) {
        customObj.SubHeaderTextColor = "#" + color;
      } else if (res[1] == 1) {
        customObj.Frame.frameSubHeader1Color = "#" + color;
      } else if (res[1] == 2) {
        customObj.Frame.frameSubHeader2Color = "#" + color;
      } else if (res[1] == 3) {
        customObj.Frame.frameSubHeader3Color = "#" + color;
      } else if (res[1] == 4) {
        customObj.Frame.frameSubHeader4Color = "#" + color;
      }
    } else {
      header = document.getElementById("header" + num);
      header.setAttribute("color", "#" + color);
      if (res[1] == 0) {
        customObj.HeaderTextColor = "#" + color;
      } else if (res[1] == 1) {
        customObj.Frame.frameHeader1Color = "#" + color;
      } else if (res[1] == 2) {
        customObj.Frame.frameHeader2Color = "#" + color;
      } else if (res[1] == 3) {
        customObj.Frame.frameHeader3Color = "#" + color;
      } else if (res[1] == 4) {
        customObj.Frame.frameHeader4Color = "#" + color;
      }
    }
  });

  $(".bgThemeDiv > img").click(function () {
    $(".bgThemeDiv > img").removeClass("selected-theme");
    $(this).addClass("selected-theme");
    var cuberoom = document.querySelector("#cuberoom");
    cuberoom.setAttribute(
      "material",
      "metalness:0.6;src:/act/v0.1/personaltheater/assets/images/decor/" +
      this.id +
      ".jpg"
    );
    customObj.Settings[0].decor =
      "/act/v0.1/personaltheater/assets/images/decor/" + this.id + ".jpg";
  });
});

function inputBoxChangeEvent(input) {
  var clickedId = input.id;
  var val = $("#" + clickedId).val();
  var res = clickedId.split("-");
  var num = parseInt(res[1]) + 1;
  if (clickedId.includes("subheader")) {
    subheader = document.getElementById("subheader" + num);
    setTimeout(function () {
      subheader.setAttribute("value", val);
    }, 200);
    if (res[1] == 0) {
      customObj.SubHeaderText = val.replace(/\s+$/, "");
    } else if (res[1] == 1) {
      customObj.Frame.frameSubHeader1 = val.replace(/\s+$/, "");
    } else if (res[1] == 2) {
      customObj.Frame.frameSubHeader2 = val.replace(/\s+$/, "");
    } else if (res[1] == 3) {
      customObj.Frame.frameSubHeader3 = val.replace(/\s+$/, "");
    } else if (res[1] == 4) {
      customObj.Frame.frameSubHeader4 = val.replace(/\s+$/, "");
    }
  } else {
    header = document.getElementById("header" + num);
    setTimeout(function () {
      header.setAttribute("value", val);
    }, 200);
    if (res[1] == 0) {
      customObj.HeaderText = val.replace(/\s+$/, "");
    } else if (res[1] == 1) {
      customObj.Frame.frameHeader1 = val.replace(/\s+$/, "");
    } else if (res[1] == 2) {
      customObj.Frame.frameHeader2 = val.replace(/\s+$/, "");
    } else if (res[1] == 3) {
      customObj.Frame.frameHeader3 = val.replace(/\s+$/, "");
    } else if (res[1] == 4) {
      customObj.Frame.frameHeader4 = val.replace(/\s+$/, "");
    }
  }
}

function onDefaultFrameChange(input) {
  var frameImg1 = document.getElementById("frameImg-1");
  var frame1_entity = document.querySelector("#frame1");
  var frameImg2 = document.getElementById("frameImg-2");
  var frame2_entity = document.querySelector("#frame2");
  var frameImg3 = document.getElementById("frameImg-3");
  var frame3_entity = document.querySelector("#frame3");
  var frameImg4 = document.getElementById("frameImg-4");
  var frame4_entity = document.querySelector("#frame4");

  if (input.files && input.files[0]) {
    galleryImageName = input.files[0].name;

    var reader = new FileReader();
    reader.onload = function (e) {
      galleryImage = e.target.result;
      $("#customLabel").text(galleryImage);
      frameImg1.setAttribute("src", galleryImage);
      frame1_entity.setAttribute("material", "src: #");
      frame1_entity.setAttribute("material", "src: #frameImg-1");
      frameImg2.setAttribute("src", galleryImage);
      frame2_entity.setAttribute("material", "src: #");
      frame2_entity.setAttribute("material", "src: #frameImg-2");
      frameImg3.setAttribute("src", galleryImage);
      frame3_entity.setAttribute("material", "src: #");
      frame3_entity.setAttribute("material", "src: #frameImg-3");
      frameImg4.setAttribute("src", galleryImage);
      frame4_entity.setAttribute("material", "src: #");
      frame4_entity.setAttribute("material", "src: #frameImg-4");
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function frameVideoChange(input, path) {
  var clickedId = input.id;
  var res = clickedId.split("-");
  lbl = document.getElementById("movieframe-" + res[1] + "-VideoLabel");
  lbl.children[0].innerText = returnAssetName(path);
  if (res[1] == 1) customObj.Frame.frameVideoSrc1 = path;
  else if (res[1] == 2) customObj.Frame.frameVideoSrc2 = path;
  else if (res[1] == 3) customObj.Frame.frameVideoSrc3 = path;
  else if (res[1] == 4) customObj.Frame.frameVideoSrc4 = path;
}

function frameImageChange(input, path) {
  var clickedImageId = input.id;
  if (clickedImageId == "splashImage") {
    splashImagePath = path;
    //var splashImageName = path.split("/")[path.split("/").length-1];;
    var splashlbl = document.getElementById("splashImageLable");
    splashlbl.children[0].innerText = returnAssetName(path);
    //$("#splashImageLable").text(splashImageName);
  } else {
    if (clickedImageId.includes("settings")) {
      var frameImg1El = document.getElementById("logo");
      frameImg1El.setAttribute("material", "src:" + path + ";opacity:0.9");
      var lbl = document.getElementById("settings-logo-ThumbnailLabel");
      lbl.children[0].innerText = returnAssetName(path);
      customObj.Settings[0].logo = path;
    } else if (clickedImageId.includes("wall")) {
      var frameImg1El;
      var lbl;
      var res = clickedImageId.split("-");
      if (res[0] == "south") {
        if (res[2] == "logo")
          frameImg1El = document.getElementById("south-wall-entity-1");
        else frameImg1El = document.getElementById("south-wall-entity-2");

        frameImg1El.setAttribute("src", path);
        if (res[2] == "logo") {
          lbl = document.getElementById("south-wall-logoLabel");
          customObj.branding_south_wall.Logo = path;
        } else {
          lbl = document.getElementById("south-wall-image2Label");
          customObj.branding_south_wall.image2 = path;
        }

        lbl.children[0].innerText = returnAssetName(path);
      } else if (res[0] == "east") {
        frameImg1El = document.getElementById("east-wall-entity");
        frameImg1El.setAttribute("src", path);
        lbl = document.getElementById("east-wall-logoLabel");
        lbl.children[0].innerText = returnAssetName(path);
        customObj.branding_east_wall.Logo = path;
      } else if (res[0] == "west") {
        frameImg1El = document.getElementById("west-wall-entity");
        frameImg1El.setAttribute("src", path);
        lbl = document.getElementById("west-wall-logoLabel");
        lbl.children[0].innerText = returnAssetName(path);
        customObj.branding_west_wall.Logo = path;
      }
    } else {
      var res = clickedImageId.split("-");
      if (res[1] == 0) {
        var frameImg1 = document.getElementById("screenshot1");
        frameImg1.setAttribute("src", path);
        lbl = document.getElementById("movieframe-0-ThumbnailLabel");
        lbl.children[0].innerText = returnAssetName(path);
      } else {
        var frameImg1 = document.getElementById("frame" + res[1]);
        lbl = document.getElementById(
          "movieframe-" + res[1] + "-ThumbnailLabel"
        );
        lbl.children[0].innerText = returnAssetName(path);
        frameImg1.setAttribute(
          "src" ,""+ path
        );
      }

      if (res[1] == 0) customObj.DefaultFramePicture = path;
      else if (res[1] == 1) customObj.Frame.frameImageSrc1 = path;
      else if (res[1] == 2) customObj.Frame.frameImageSrc2 = path;
      else if (res[1] == 3) customObj.Frame.frameImageSrc3 = path;
      else if (res[1] == 4) customObj.Frame.frameImageSrc4 = path;
    }
  }
}

function toggleSideNav(sidenavId) {
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function (navigation) {
    if (navigation.classList.contains("active") && navigation.id != sidenavId)
      navigation.classList.remove("active");
  });
  
  document.getElementById(sidenavId).classList.toggle("active");
  if(sidenavId=="launchSidenav"){
    $("#collapse1One").addClass("show");
  }else if(sidenavId=="wallSidenav"){
    $("#collapse-One").addClass("show");
    $("#collapse-Three").removeClass("show");
    $("#collapse-Two").removeClass("show");
  }
  toggleFlag = true;
  if (sidenavId == "movieFrameSidenav") {
    $(".collapse").removeClass("show");
    $("#movieFrameSidenav").scrollTop(0);
  }

  $("label").removeClass("background-color-forestgreen");
  $("input").removeClass("background-color-forestgreen");
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

function closeSideNav() {
  var sidenavList = document.getElementsByClassName("sidenav");
  [].forEach.call(sidenavList, function (navigation) {
    navigation.classList.remove("active");
    toggleFlag = false;
  });
  toggleOverlay();
}

function popSnackbar(type, message) {
  var x = document.getElementById("snackbar");
  x.innerText = message;
  x.className = "show " + type;
  setTimeout(function () {
    x.className = x.className.replace("show " + type, "");
  }, 3000);
}

function setPersonalTheatre() {
  var frameImg1 = document.getElementById("frame1");
  var frameImg2 = document.getElementById("frame2");
  var frameImg3 = document.getElementById("frame3");
  var frameImg4 = document.getElementById("frame4");
  
  frameImg1.setAttribute(
    "material",
    "src:" + customObj.Frame.frameImageSrc1
  );
  frameImg2.setAttribute(
    "material",
    "src:" + customObj.Frame.frameImageSrc2
  );
  frameImg3.setAttribute(
    "material",
    "src:" + customObj.Frame.frameImageSrc3
  );
  frameImg4.setAttribute(
    "material",
    "src:" + customObj.Frame.frameImageSrc4
  );
  var cuberoom = document.querySelector("#cuberoom");
  cuberoom.setAttribute(
    "material",
    "metalness:0.6;src:" + customObj.Settings[0].decor
  );

  var cuberoom = document.querySelector("#logo");
  cuberoom.setAttribute("material", "src:" + customObj.Settings[0].logo);

  var frameVid = document.getElementById("settings-logo-ThumbnailLabel");
  if (customObj.Settings[0].logo == "") {
    frameVid.children[0].innerText = "Choose Image";
  } else {
    frameVid.children[0].innerText = returnAssetName(
      customObj.Settings[0].logo
    );
  }

  $(".bgThemeDiv > img").removeClass("selected-theme");
  $(".colorSelector").append(
    "<div style='background-color: rgb(255, 255, 255);'></div>"
  );

  var str = customObj.Settings[0].decor;
  var res = str.split("/");
  var text = res[res.length - 1];
  var left_text = text.substring(0, text.indexOf("."));
  $("#" + left_text).addClass("selected-theme");
  if (customObj.launch_text) {
    $(".lunchScreenText").val(customObj.launch_text);
    $(".lunchScreenText").summernote("code", customObj.launch_text);

    var lauchText = $(".lunchScreenText");
    var div = document.createElement("div");
    div.innerHTML = lauchText[0].value;
    var plainText = div.textContent || div.innerText || "";
    var maxLength = 350;
    $('#maxCount').text(plainText.length);

  }
  if (customObj.splash_instruction) {
    document.getElementsByClassName("instructionSetForDesktop").value =
      customObj.splash_instruction;
    $(".instructionSetForDesktop").summernote("code", customObj.splash_instruction);
  }
  if (customObj.splash_android_instruction) {
    document.getElementsByClassName("instructionSetForAndroid").value = customObj.splash_android_instruction;
    $('.instructionSetForAndroid').summernote('code', customObj.splash_android_instruction);
  }
  if (customObj.splash_image) {
    splashImagePath = customObj.splash_image;
    var splashlbl = document.getElementById("splashImageLable");
    splashlbl.children[0].innerText = returnAssetName(splashImagePath);
    // var splashImageName = splashImagePath.split("/")[splashImagePath.split("/").length-1];
    // $("#splashImageLable").text(splashImageName);
  }

  if (customObj.splashBackgroundColor) {
    var splashBackground = document.getElementById("splashBackground");
    splashBackground.value = customObj.splashBackgroundColor;
    splashBackground.style.backgroundColor = splashBackground.value;
  } else {
    var splashBackground = document.getElementById("splashBackground");
    splashBackground.style.backgroundColor = "#8F8F8F";
    splashBackground.value = "#8F8F8F";
  }
  if (customObj.Opacity) {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = customObj.Opacity;
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
  if (customObj.splashHeaderColor) {
    var splashHeaderColor = document.getElementById("splashHeaderColor");
    splashHeaderColor.value = customObj.splashHeaderColor;
    splashHeaderColor.style.backgroundColor = splashHeaderColor.value;
  }

  customSplashScreenEl = document.getElementById("screenshot1");
  customSplashScreenEl.setAttribute("src", customObj.DefaultFramePicture);
  lbl = document.getElementById("movieframe-0-ThumbnailLabel");
  lbl.children[0].innerText = returnAssetName(customObj.DefaultFramePicture);
  $("#movieDelayDrownDownID").val(customObj.Settings[0].delay);
  $("#loopDropDownID").val(customObj.Settings[0].loop);
  // set background image
  var customSplashScreenEl = document.getElementById("splashImg");

  var wallImage = document.getElementById("south-wall-entity-1");
  var wallImagelbl = document.getElementById("south-wall-logoLabel");
  wallImage.setAttribute("src", customObj.branding_south_wall.Logo);
  wallImagelbl.children[0].innerText = returnAssetName(
    customObj.branding_south_wall.Logo
  );

  wallImage = document.getElementById("south-wall-entity-2");
  wallImagelbl = document.getElementById("south-wall-image2Label");
  wallImage.setAttribute("src", customObj.branding_south_wall.image2);
  wallImagelbl.children[0].innerText = returnAssetName(
    customObj.branding_south_wall.image2
  );

  wallImage = document.getElementById("east-wall-entity");
  wallImagelbl = document.getElementById("east-wall-logoLabel");
  wallImage.setAttribute("src", customObj.branding_east_wall.Logo);
  wallImagelbl.children[0].innerText = returnAssetName(
    customObj.branding_east_wall.Logo
  );

  wallImage = document.getElementById("west-wall-entity");
  wallImagelbl = document.getElementById("west-wall-logoLabel");
  wallImage.setAttribute("src", customObj.branding_west_wall.Logo);
  wallImagelbl.children[0].innerText = returnAssetName(
    customObj.branding_west_wall.Logo
  );

 

  var frameVid = document.getElementById("movieframe-1-VideoLabel");
  if (customObj.Frame.frameVideoSrc1 == "") {
    frameVid.children[0].innerText = "Choose video";
  } else {
    frameVid.children[0].innerText = returnAssetName(
      customObj.Frame.frameVideoSrc1
    );
  }

  frameVid = document.getElementById("movieframe-2-VideoLabel");
  if (customObj.Frame.frameVideoSrc2 == "") {
    frameVid.children[0].innerText = "Choose video";
  } else {
    frameVid.children[0].innerText = returnAssetName(
      customObj.Frame.frameVideoSrc2
    );
  }

  frameVid = document.getElementById("movieframe-3-VideoLabel");
  if (customObj.Frame.frameVideoSrc3 == "") {
    frameVid.children[0].innerText = "Choose video";
  } else {
    frameVid.children[0].innerText = returnAssetName(
      customObj.Frame.frameVideoSrc3
    );
  }

  frameVid = document.getElementById("movieframe-4-VideoLabel");
  if (customObj.Frame.frameVideoSrc4 == "") {
    frameVid.children[0].innerText = "Choose video";
  } else {
    frameVid.children[0].innerText = returnAssetName(
      customObj.Frame.frameVideoSrc4
    );
  }
  
  lbl = document.getElementById("movieframe-1-ThumbnailLabel");
  lbl.children[0].innerText = returnAssetName(customObj.Frame.frameImageSrc1);
  
  lbl = document.getElementById("movieframe-2-ThumbnailLabel");
  lbl.children[0].innerText = returnAssetName(customObj.Frame.frameImageSrc2);
 
  lbl = document.getElementById("movieframe-3-ThumbnailLabel");
  lbl.children[0].innerText = returnAssetName(customObj.Frame.frameImageSrc3);
  
  lbl = document.getElementById("movieframe-4-ThumbnailLabel");
  lbl.children[0].innerText = returnAssetName(customObj.Frame.frameImageSrc4);

  // var header = document.getElementById('header1');
  // header.setAttribute('value',customObj.HeaderText);
  // header.setAttribute('color',customObj.HeaderTextColor);
  // lbl = document.getElementById('movieframe-0-headerInput');
  // lbl.value = customObj.HeaderText;
  // $("#movieframe-0-headerInput").siblings().find('div').css('background-color',customObj.HeaderTextColor);
  // $("#movieframe-0-headerInput").siblings().find('input').val(customObj.HeaderTextColor);
  header = document.getElementById("header2");
  header.setAttribute("value", customObj.Frame.frameHeader1);
  header.setAttribute("color", customObj.Frame.frameHeader1Color);
  lbl = document.getElementById("movieframe-1-headerInput");
  lbl.value = customObj.Frame.frameHeader1;
  $("#movieframe-1-headerInput")
    .siblings()
    .find("div")
    .css("background-color", customObj.Frame.frameHeader1Color);
  $("#movieframe-1-headerInput")
    .siblings()
    .find("input")
    .val(customObj.Frame.frameHeader1Color);
  header = document.getElementById("header3");
  header.setAttribute("value", customObj.Frame.frameHeader2);
  header.setAttribute("color", customObj.Frame.frameHeader2Color);
  lbl = document.getElementById("movieframe-2-headerInput");
  lbl.value = customObj.Frame.frameHeader2;
  $("#movieframe-2-headerInput")
    .siblings()
    .find("div")
    .css("background-color", customObj.Frame.frameHeader2Color);
  $("#movieframe-2-headerInput")
    .siblings()
    .find("input")
    .val(customObj.Frame.frameHeader2Color);
  header = document.getElementById("header4");
  header.setAttribute("value", customObj.Frame.frameHeader3);
  header.setAttribute("color", customObj.Frame.frameHeader3Color);
  lbl = document.getElementById("movieframe-3-headerInput");
  lbl.value = customObj.Frame.frameHeader3;
  $("#movieframe-3-headerInput")
    .siblings()
    .find("div")
    .css("background-color", customObj.Frame.frameHeader3Color);
  $("#movieframe-3-headerInput")
    .siblings()
    .find("input")
    .val(customObj.Frame.frameHeader3Color);
  header = document.getElementById("header5");
  header.setAttribute("value", customObj.Frame.frameHeader4);
  header.setAttribute("color", customObj.Frame.frameHeader4Color);
  lbl = document.getElementById("movieframe-4-headerInput");
  lbl.value = customObj.Frame.frameHeader4;
  $("#movieframe-4-headerInput")
    .siblings()
    .find("div")
    .css("background-color", customObj.Frame.frameHeader4Color);
  $("#movieframe-4-headerInput")
    .siblings()
    .find("input")
    .val(customObj.Frame.frameHeader4Color);
  var subheader = document.getElementById("subheader1");
  subheader.setAttribute("value", customObj.SubHeaderText);
  subheader.setAttribute("color", customObj.SubHeaderTextColor);
  // lbl = document.getElementById('movieframe-0-subheaderInput');
  // lbl.value = customObj.SubHeaderText;
  // $("#movieframe-0-subheaderInput").siblings().find('div').css('background-color',customObj.SubHeaderTextColor);
  // $("#movieframe-0-subheaderInput").siblings().find('input').val(customObj.SubHeaderTextColor);
  // subheader = document.getElementById('subheader2');
  // subheader.setAttribute('value',customObj.Frame.frameSubHeader1);
  // subheader.setAttribute('color',customObj.Frame.frameSubHeader1Color);
  lbl = document.getElementById("movieframe-1-subheaderInput");
  lbl.value = customObj.Frame.frameSubHeader1;
  $("#movieframe-1-subheaderInput")
    .siblings()
    .find("div")
    .css("background-color", customObj.Frame.frameSubHeader1Color);
  $("#movieframe-1-subheaderInput")
    .siblings()
    .find("input")
    .val(customObj.Frame.frameSubHeader1Color);
  // subheader = document.getElementById('subheader3');
  // subheader.setAttribute('value',customObj.Frame.frameSubHeader2);
  // subheader.setAttribute('color',customObj.Frame.frameSubHeader2Color);
  lbl = document.getElementById("movieframe-2-subheaderInput");
  lbl.value = customObj.Frame.frameSubHeader2;
  $("#movieframe-2-subheaderInput")
    .siblings()
    .find("div")
    .css("background-color", customObj.Frame.frameSubHeader2Color);
  $("#movieframe-2-subheaderInput")
    .siblings()
    .find("input")
    .val(customObj.Frame.frameSubHeader2Color);
  // subheader = document.getElementById('subheader4');
  // subheader.setAttribute('value',customObj.Frame.frameSubHeader3);
  // subheader.setAttribute('color',customObj.Frame.frameSubHeader3Color);
  lbl = document.getElementById("movieframe-3-subheaderInput");
  lbl.value = customObj.Frame.frameSubHeader3;
  $("#movieframe-3-subheaderInput")
    .siblings()
    .find("div")
    .css("background-color", customObj.Frame.frameSubHeader3Color);
  $("#movieframe-3-subheaderInput")
    .siblings()
    .find("input")
    .val(customObj.Frame.frameSubHeader3Color);
  // subheader = document.getElementById('subheader5');
  // subheader.setAttribute('value',customObj.Frame.frameSubHeader4);
  // subheader.setAttribute('color',customObj.Frame.frameSubHeader4Color);
  lbl = document.getElementById("movieframe-4-subheaderInput");
  lbl.value = customObj.Frame.frameSubHeader4;
  $("#movieframe-4-subheaderInput")
    .siblings()
    .find("div")
    .css("background-color", customObj.Frame.frameSubHeader4Color);
  $("#movieframe-4-subheaderInput")
    .siblings()
    .find("input")
    .val(customObj.Frame.frameSubHeader4Color);

  // for setting Curtain Splash Screen for main frame video
  if (customObj.DefaultFramePicture != "No file selected") {
    customSplashScreenEl.setAttribute("src", customObj.DefaultFramePicture);
  }
}

function returnAssetName(path) {
  var str = path;
  var res = str.split("/");
  res = res[res.length - 1];
  return res;
}

function onFrameImageChange(id) {
  assettype = "Image";
  window.parent.triggerAssetsPopup();
  frameID = id;
}

function onFrameVideoChange(id) {
  assettype = "Video";
  window.parent.triggerAssetsPopup();
  frameID = id;
}

function getAssetPath(assetPath) {
  if(assetPath==undefined || assetPath==""){
    return;
  }
  if (assetPath) {
    imagePath = assetPath;
    if (assettype == "Video") {
      frameVideoChange(frameID, imagePath);
    } else {
      frameImageChange(frameID, imagePath);
    }
  }
}

function getAssetType() {
  return assettype;
}

function getExperienceToSave() {
  var lauchText = $(".lunchScreenText");

  var lunchTextItem = lauchText[0].value;
  customObj.launch_text = lunchTextItem;

  var splashInstruction = $(".instructionSetForDesktop");
  var item = splashInstruction[0].value;
  customObj.splash_instruction = item;

  var splashAndroidInstruction = $(".instructionSetForAndroid")
  var item = splashAndroidInstruction[0].value;
  customObj.splash_android_instruction = item;

  customObj.splash_image = splashImagePath;

  if (customObj.Frame.frameSubHeader1Color == undefined) {
    customObj.Frame.frameSubHeader1Color = "#fff";
  }

  if (customObj.Frame.frameSubHeader2Color == undefined) {
    customObj.Frame.frameSubHeader2Color = "#fff";
  }

  if (customObj.Frame.frameSubHeader3Color == undefined) {
    customObj.Frame.frameSubHeader3Color = "#fff";
  }

  if (customObj.Frame.frameSubHeader4Color == undefined) {
    customObj.Frame.frameSubHeader4Color = "#fff";
  }


  var headerFont = $(".headerfont");
  var headerFontColor = headerFont[0].value;
  if (headerFontColor.includes("#")) {
    customObj.splashHeaderColor = headerFontColor;
  } else {
    customObj.splashHeaderColor = "#" + headerFontColor;
  }


  var splashbg = $(".splashbg");
  var splashBgColor = splashbg[0].value;
  if (splashBgColor.includes("#")) {
    customObj.splashBackgroundColor = splashBgColor;
  } else {
    customObj.splashBackgroundColor = "#" + splashBgColor;
  }


  if (customObj.Opacity) {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = customObj.Opacity;
    var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
  } else {
    customObj.Opacity = fixOpacity;
  }


  var modifiedJSON = customObj;
  modifiedJSON.entry_view = customObj.entry_view;
  var dataToPost = JSON.stringify(modifiedJSON);
  return dataToPost;
}

function SaveData(event) {
  customObj.Settings[0].loop = event[event.selectedIndex].value;
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
