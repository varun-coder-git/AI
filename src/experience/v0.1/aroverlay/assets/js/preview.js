$(document).ready(() => {
  var startExperienteBtn = document.getElementById("start_experience");
  ascene = document.querySelector("a-scene");
//var experienceStarted=false;
  startExperienteBtn.onclick = function() {
    experienceStarted = true;
    ascene.style.zIndex = "auto";
    document.getElementById("container").style.display = "none";
    document.getElementById("loaderq").style.display = "none";
  };
});

var startexp = function() {
  var start = document.getElementById("start_experience");
  if (assetsLoaded) {
    if (start.classList.contains("disabled")) {
      var loading = document.getElementById("loading");
      loading.classList.add("disabled");
      start.classList.remove("disabled");
      clearTimeout(timer);
      timer = null;
    } else {
      clearTimeout(timer);
    }
  }
};

var timer = setInterval(startexp, 500);
var assetsLoaded = false;
var loggedin = false;
$(window).on("load", function() {
  setTimeout(function() {
    assetsLoaded = true;
  }, 3000);
});

function initializePreview(experienceJSON, ExperienceName) {
  arMarkersData = JSON.parse(experienceJSON);
  $("#loaderq").addClass("hidden-login");
  $("#innerInfo").removeClass("hidden-login");
  var instructionSet = arMarkersData.splash_instruction;
  var lunchTextSet = arMarkersData.launch_text;
  if (arMarkersData.splashBackgroundColor && arMarkersData.Opacity) {
    var rgbformat = hexToRgb(
      arMarkersData.splashBackgroundColor,
      arMarkersData.Opacity
    );
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
  if (arMarkersData.splashHeaderColor) {
    document.getElementById("titleText").style.color =
      arMarkersData.splashHeaderColor;
  }

  document.getElementById("instruction").innerHTML = instructionSet;
  document.getElementById("titleDescription").innerHTML = lunchTextSet;
  document.getElementById("splashLogo").src = arMarkersData.splash_image;
  loggedin = true;
  setTimeout(function() {
    generateMarkers();
  }, 3000);
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

function hexToRgb(hex, opacity) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        alpha: opacity
      }
    : null;
}

function generateMarkers() {
  var scene = document.getElementById("sceneid");
  var asset = document.getElementById("assetId");
  for (i = 1, j = 0; i <= arMarkersData.actionMarkers.length; i++, j++) {
    if (arMarkersData.actionMarkers[i-1].pattFile_path != "" && arMarkersData.actionMarkers[i-1].pattFile_path != "undefined") {
    var markers = "";
  //  var markerPatt = localStorage.getItem("marker" + j + ".patt");
    // creation of markers
    markers = document.createElement("a-marker");
    markers.setAttribute("id", "marker-" + i);
    markers.setAttribute("emitevents", "true");
    markers.setAttribute("preset", "custom");
    markers.setAttribute("type", "pattern");
    markers.setAttribute("cursor", "rayOrigin: mouse");
    markers.setAttribute("url", arMarkersData.actionMarkers[i-1].pattFile_path);
    scene.appendChild(markers);
    var selectedmarker;
    // creation of markeralong with there media type
    switch (arMarkersData.actionMarkers[i - 1].mediatype) {
      case "T":
        var textEntity = document.createElement("a-text");
        textEntity.setAttribute("id", "text" + i);
        textEntity.setAttribute("scale", "0.3 0.3 0.3");
        textEntity.setAttribute("wrap-count","20");
        textEntity.setAttribute("font", "roboto");
        textEntity.setAttribute("rotation", "-90 0 0");
        textEntity.setAttribute("position", "1 0 0");
        textEntity.setAttribute("value",arMarkersData.actionMarkers[i - 1].actionPointText);
        textEntity.setAttribute("color",arMarkersData.actionMarkers[i - 1].actionPointColor);
        selectedmarker = document.getElementById("marker-" + i);
        selectedmarker.appendChild(textEntity);
        break;
      case "I":
        var imageSource = document.createElement("img");
        imageSource.setAttribute("id", "img" + i);
        imageSource.setAttribute("src",arMarkersData.actionMarkers[i - 1].actionPointImage);
        asset.appendChild(imageSource);
        var image = document.createElement("a-image");
        image.setAttribute("id", "imageplayer" + i);
        image.setAttribute("scale", "1 1 1");
        image.setAttribute("opacity", "1");
      //  image.setAttribute("position", "0 0 0");
        image.setAttribute("rotation", "-90 0 0");
        image.setAttribute("transparent", "true");
        image.setAttribute("alpha-test", "0.2");
        image.setAttribute("shader", "standard");
        selectedmarker = document.getElementById("marker-" + i);
        selectedmarker.setAttribute("imagehandler", "");
        selectedmarker.appendChild(image);
        break;
      case "V":
        //  asset video tag creation
        var videoSource = document.createElement("video");
        videoSource.setAttribute("id", "video" + i);
        videoSource.setAttribute("src",arMarkersData.actionMarkers[i - 1].actionPointVideo);
        videoSource.setAttribute("preload", "auto");
        videoSource.setAttribute("controls", "true");
        asset.appendChild(videoSource);
        //  scene video entity creation
        var videoentity = document.createElement("a-video");
        videoentity.setAttribute("id", "videoplayer" + i);
        videoentity.setAttribute("geometry", "primitive:plane");
        videoentity.setAttribute("preload", "auto");
        // videoentity.setAttribute('scale',"1 0.5 1");
       // videoentity.setAttribute("position", "0 0 0");
        videoentity.setAttribute("rotation", "270 0 0");
        videoentity.setAttribute("autoload", "false");
        videoentity.setAttribute("src", "#video" + i);
        markers.appendChild(videoentity);
        selectedmarker = document.getElementById("marker-" + i);
        selectedmarker.setAttribute("vidhandler", "");
        break;
      case "A":
        //  asset audio tag creation
        var audioSource = document.createElement("audio");
        audioSource.setAttribute("id", "sound" + i);
        audioSource.setAttribute("src",arMarkersData.actionMarkers[i - 1].actionPointAudio);
        audioSource.setAttribute("preload", "auto");
        asset.appendChild(audioSource);
        //  scene audio entity creation
        var audioEntity = document.createElement("a-entity");
        audioEntity.setAttribute("id", "audioplayer" + i);
        audioEntity.setAttribute("position", "0 -0.5 0");
        audioEntity.setAttribute("sound", "src:#sound" + i + ";");
        scene.appendChild(audioEntity);
        var audio = document.getElementById("audioplayer" + i);
        selectedmarker = document.getElementById("marker-" + i);
        selectedmarker.setAttribute("soundhandler", "");
        selectedmarker.appendChild(audio);
        break;
      case "IT":
        var textEntity = document.createElement("a-text");
        textEntity.setAttribute("id", "text" + i);
        textEntity.setAttribute("scale", "0.3 0.3 0.3");
        textEntity.setAttribute("font", "roboto");
        textEntity.setAttribute("rotation", "-90 0 0");
        textEntity.setAttribute("wrap-count","20");
        textEntity.setAttribute("position", "1 0 0");
        textEntity.setAttribute("color",arMarkersData.actionMarkers[i - 1].actionPointColor);
        textEntity.setAttribute( "value",arMarkersData.actionMarkers[i - 1].actionPointText);
        selectedmarker = document.getElementById("marker-" + i);
        selectedmarker.appendChild(textEntity);
        var imageSource = document.createElement("img");
        imageSource.setAttribute("id", "img" + i);
        imageSource.setAttribute("src",arMarkersData.actionMarkers[i - 1].actionPointImage);
        asset.appendChild(imageSource);
        var image = document.createElement("a-image");
        image.setAttribute("id", "imageplayer" + i);
        image.setAttribute("scale", "1 1 1");
        image.setAttribute("opacity", "1");
        image.setAttribute("rotation", "-90 0 0");
        image.setAttribute("transparent", "true");
        image.setAttribute("alpha-test", "0.2");
        image.setAttribute("shader", "standard");
        selectedmarker.setAttribute("imagehandler", "");
        selectedmarker.appendChild(image);
        break;
      case "AT":
        var audioSource = document.createElement("audio");
        audioSource.setAttribute("id", "sound" + i);
        audioSource.setAttribute("src",arMarkersData.actionMarkers[i - 1].actionPointAudio);
        audioSource.setAttribute("preload", "auto");
        asset.appendChild(audioSource);
        //  scene audio entity creation
        var audioEntity = document.createElement("a-entity");
        audioEntity.setAttribute("id", "audioplayer" + i);
        audioEntity.setAttribute("position", "0 -0.5 0");
        audioEntity.setAttribute("sound", "src:#sound" + i + ";");
        scene.appendChild(audioEntity);
        var audio = document.getElementById("audioplayer" + i);
        var textEntity = document.createElement("a-text");
        textEntity.setAttribute("id", "text" + i);
        textEntity.setAttribute("scale", "0.3 0.3 0.3");
        textEntity.setAttribute("font", "roboto");
        textEntity.setAttribute("rotation", "-90 0 0");
        textEntity.setAttribute("wrap-count","20");
        textEntity.setAttribute("position", "1 0 0");
        textEntity.setAttribute("color",arMarkersData.actionMarkers[i - 1].actionPointColor);
        textEntity.setAttribute("value",arMarkersData.actionMarkers[i - 1].actionPointText);
        selectedmarker = document.getElementById("marker-" + i);
        selectedmarker.setAttribute("audiotexthandler", "");
        selectedmarker.appendChild(textEntity);
        selectedmarker.appendChild(audio);
        break;
      case "AI":
        var audioSource = document.createElement("audio");
        audioSource.setAttribute("id", "sound" + i);
        audioSource.setAttribute("src",arMarkersData.actionMarkers[i - 1].actionPointAudio);
        audioSource.setAttribute("preload", "auto");
        asset.appendChild(audioSource);
        //  scene audio entity creation
        var audioEntity = document.createElement("a-entity");
        audioEntity.setAttribute("id", "audioplayer" + i);
        audioEntity.setAttribute("position", "0 -0.5 0");
        audioEntity.setAttribute("sound", "src:#sound" + i + ";");
        scene.appendChild(audioEntity);
        var audio = document.getElementById("audioplayer" + i);
        var imageSource = document.createElement("img");
        imageSource.setAttribute("id", "img" + i);
        imageSource.setAttribute("src",arMarkersData.actionMarkers[i - 1].actionPointImage);
        asset.appendChild(imageSource);
        var image = document.createElement("a-image");
        image.setAttribute("id", "imageplayer" + i);
        image.setAttribute("scale", "1 1 1");
        image.setAttribute("opacity", "1");
        image.setAttribute("rotation", "-90 0 0");
        image.setAttribute("transparent", "true");
        image.setAttribute("alpha-test", "0.2");
        image.setAttribute("shader", "standard");
        selectedmarker = document.getElementById("marker-" + i);
        selectedmarker.setAttribute("soundhandler", "");
        selectedmarker.appendChild(audio);
        selectedmarker.setAttribute("imagehandler", "");
        selectedmarker.appendChild(image);
        break;
      case "VT":
        //  asset video tag creation
        var videoSource = document.createElement("video");
        videoSource.setAttribute("id", "video" + i);
        videoSource.setAttribute("src",arMarkersData.actionMarkers[i - 1].actionPointVideo);
        videoSource.setAttribute("preload", "auto");
        videoSource.setAttribute("controls", "true");
        asset.appendChild(videoSource);
        //  scene video entity creation
        var videoentity = document.createElement("a-video");
        videoentity.setAttribute("id", "videoplayer" + i);
        videoentity.setAttribute("geometry", "primitive:plane");
        videoentity.setAttribute("preload", "auto");
        videoentity.setAttribute("scale", "1 1 1");
        videoentity.setAttribute("rotation", "270 0 0");
        videoentity.setAttribute("autoload", "false");
        videoentity.setAttribute("src", "#video" + i);
        var textEntity = document.createElement("a-text");
        textEntity.setAttribute("id", "text" + i);
        textEntity.setAttribute("scale", "0.3 0.3 0.3");
        textEntity.setAttribute("font", "roboto");
        textEntity.setAttribute("rotation", "-90 0 0");
        textEntity.setAttribute("wrap-count","20");
        textEntity.setAttribute("position", "1 0 0");
        textEntity.setAttribute("color",arMarkersData.actionMarkers[i - 1].actionPointColor);
        textEntity.setAttribute("value",arMarkersData.actionMarkers[i - 1].actionPointText);
        markers.appendChild(videoentity);
        selectedmarker = document.getElementById("marker-" + i);
        selectedmarker.setAttribute("texthandler", "");
        selectedmarker.appendChild(textEntity);
        break;
      case "AIT":
        var textEntity = document.createElement("a-text");
        textEntity.setAttribute("id", "text" + i);
        textEntity.setAttribute("scale", "0.3 0.3 0.3");
        textEntity.setAttribute("font", "roboto");
        textEntity.setAttribute("rotation", "-90 0 0");
        textEntity.setAttribute("wrap-count","20");
        textEntity.setAttribute("position", "1 0 0");
        textEntity.setAttribute("color",arMarkersData.actionMarkers[i - 1].actionPointColor);
        textEntity.setAttribute("value",arMarkersData.actionMarkers[i - 1].actionPointText);
        var imageSource = document.createElement("img");
        imageSource.setAttribute("id", "img" + i);
        imageSource.setAttribute("src",arMarkersData.actionMarkers[i - 1].actionPointImage);
        asset.appendChild(imageSource);
        var image = document.createElement("a-image");
        image.setAttribute("id", "imageplayer" + i);
        image.setAttribute("scale", "1 1 1");
        image.setAttribute("opacity", "1");
        image.setAttribute("rotation", "-90 0 0");
        image.setAttribute("transparent", "true");
        image.setAttribute("alpha-test", "0.2");
        image.setAttribute("shader", "standard");
        var audioSource = document.createElement("audio");
        audioSource.setAttribute("id", "sound" + i);
        audioSource.setAttribute("src",arMarkersData.actionMarkers[i - 1].actionPointAudio);
        audioSource.setAttribute("preload", "auto");
        asset.appendChild(audioSource);
        //  scene audio entity creation
        var audioEntity = document.createElement("a-entity");
        audioEntity.setAttribute("id", "audioplayer" + i);
        audioEntity.setAttribute("position", "0 -0.5 0");
        audioEntity.setAttribute("sound", "src:#sound" + i + ";");
        scene.appendChild(audioEntity);
        var audio = document.getElementById("audioplayer" + i);
        selectedmarker = document.getElementById("marker-" + i);
        selectedmarker.appendChild(textEntity);
        selectedmarker.appendChild(image);
        selectedmarker.setAttribute("soundhandler", "");
        selectedmarker.setAttribute("imagehandler", "");
        selectedmarker.appendChild(audio);
        break;
       }
    }
  }
}
// function for marker with video
AFRAME.registerComponent("vidhandler", {
  init: function() {
    var marker = this.el;
    var markerId = marker.id;
    var str = markerId.split("-");
    var res = str[1];
    var videoplayer = document.getElementById("videoplayer" + res);
    var video = document.getElementById("video" + res);
    marker.addEventListener("markerFound", function() {
      if(experienceStarted){
      video.play();
      }
    });
    marker.addEventListener("markerLost", function() {
      video.pause();
    });
  }
});

// function for marker with audio
AFRAME.registerComponent("soundhandler", {
  init: function() {
    var marker = this.el;
    var markerId = marker.id;
    var str = markerId.split("-");
    var res = str[1];
    var entity = document.querySelector("#audioplayer" + res);
    marker.addEventListener("markerFound", function() {
      if(experienceStarted){
      document.querySelector("#sound" + res).play();
      }
    });
    marker.addEventListener("markerLost", function() {
      document.querySelector("#sound" + res).pause();
    });
  }
});

AFRAME.registerComponent("imagehandler", {
  init: function() {
    var marker = this.el;
    var markerId = marker.id;
    var str = markerId.split("-");
    var res = str[1];
    var image = document.getElementById("imageplayer" + res);
    marker.addEventListener("markerFound", function() {
      image.setAttribute("src",arMarkersData.actionMarkers[res - 1].actionPointImage);
    });
    marker.addEventListener("markerLost", function() {
    });
  }
});

AFRAME.registerComponent("texthandler", {
  init: function() {
    var marker = this.el;
    var markerId = marker.id;
    var str = markerId.split("-");
    var res = str[1];
    var textdata = document.getElementById("text" + res);
    var video = document.getElementById("video" + res);
    marker.addEventListener("markerFound", function() {
     // video.setAttribute("src",arMarkersData.actionMarkers[res - 1].actionPointVideo);
     if(experienceStarted){
      video.play();
      textdata.setAttribute("value",arMarkersData.actionMarkers[res - 1].actionPointText);
      textdata.setAttribute("position", "1 0 0");
      textdata.setAttribute("scale", "0.3 0.3 0.3");
      textdata.setAttribute("wrap-count","20");
    }
    });
    marker.addEventListener("markerLost", function() {
      video.pause();
    });
  }
});

AFRAME.registerComponent("audiotexthandler", {
    init: function() {
      var marker = this.el;
      var markerId = marker.id;
      var str = markerId.split("-");
      var res = str[1];
      var entity = document.querySelector("#audioplayer" + res);
      var textdata = document.getElementById("text" + res);
      marker.addEventListener("markerFound", function() {
        if(experienceStarted){
        document.querySelector("#sound" + res).play();
        textdata.setAttribute("value",arMarkersData.actionMarkers[res - 1].actionPointText);
        textdata.setAttribute("position", "1 0 0");
        textdata.setAttribute("scale", "0.3 0.3 0.3");
        textdata.setAttribute("wrap-count","20");
        }
      });
      marker.addEventListener("markerLost", function() {
        document.querySelector("#sound" + res).pause();
      });
    }
  });

function getExperienceUrl() {
  var mode = "";
  var Url = window.location.href;
  if (Url.indexOf("index-hd.php") > 0) {
    $("#onOffSwitch").addClass("onoffswitch1-innerHD");
    mode = "HD mode ON";
  } else {
    $("#onOffSwitch").addClass("onoffswitch1-innerSD");
    mode = "SD mode ON";
  }
  document.getElementById("mode").innerHTML = mode;
}
