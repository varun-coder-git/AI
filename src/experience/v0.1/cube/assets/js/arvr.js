/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
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
var experienceJSON = "";
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

function loadExperience(data, ExperienceName) {
  //if json includes splashbgcolor and opacity

  experienceJSON = data;
  if (data.splashBackgroundColor && data.Opacity) {
    var rgbformat = hexToRgb(data.splashBackgroundColor, data.Opacity);
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
  //if json includes splashheadercolor
  if (data.splashHeaderColor) {
    document.getElementById("titleText").style.color = data.splashHeaderColor;
  }
  document.getElementById("titleText").innerHTML = ExperienceName;
  document.getElementById("instruction").innerHTML = data.splash_instruction
    ? data.splash_instruction
    : "";
  document.getElementById("titleDescription").innerHTML = data.launch_text
    ? data.launch_text
    : "";
  document.getElementById("splashLogo").src = data.splash_image;
  loggedin = true;
  var aLight = "";
}

$(document).ready(() => {
  $(document).ready(function() {
    $.getJSON("../aframe/assets/js/experience.json", function(data) {
      var ExperienceName = "The AirAsia Group";
      loadExperience(data, ExperienceName);
      startexp();
    });
  });
  var startExperienteBtn = document.getElementById("start_experience");
  startExperienteBtn.onclick = function() {
   document.getElementById("container").style.display = "none";
    document.getElementById("loaderq").style.display = "none";
    experienceStarted = true;
   
    for (i = 0; i < experienceJSON.marker_data.length; i++) {
   
      // eslint-disable-next-line no-loop-func
     
        if (experienceJSON.marker_data[0].object_type === "obj") {

          var sceneEl = document.querySelector("a-scene");
          var entity1 = document.createElement("a-marker");
          entity1.setAttribute("preset", "custom");
          entity1.setAttribute("type", "pattern");
          entity1.setAttribute("id", "marker"+i);
          // entity1.setAttribute("cursor", "rayOrigin: mouse");
          entity1.setAttribute("markerhandler",'');
          entity1.setAttribute("url", experienceJSON.marker_data[i].marker_path);
          var entity11 = document.createElement("a-entity");
          entity11.setAttribute("id", "obj"+i);
          entity11.setAttribute(
            "obj-model",
            "obj: url(" +
              experienceJSON.marker_data[i].model +
              ");mtl: url(" +
              experienceJSON.marker_data[i].mtl +
              ")"
          );
          // entity.setAttribute('gltf-model', 'https://andrescuervo.github.io/assets/ghostie/ghostie.gltf');
          entity11.setAttribute("scale", experienceJSON.marker_data[i].obj_scale);
          entity11.setAttribute("static-body", "static-body");
          entity11.setAttribute("response-type", "arraybuffer");
          entity11.setAttribute("shadow", "cast: true");
          entity11.setAttribute("dinoInteractionListener", " ");
          entity11.setAttribute(
            "material",
            "opacity:0;transparent:true;color:#FFFFFF"
          );
          entity1.appendChild(entity11);
          sceneEl.appendChild(entity1);
        } else {
          var sceneEl2 = document.querySelector("a-scene");
          var entity2 = document.createElement("a-marker");
          entity2.setAttribute("preset", "custom");
          entity2.setAttribute("type", "pattern");
          // entity2.setAttribute("cursor","rayOrigin: mouse");
          entity2.setAttribute("markerhandler",'');
          entity2.setAttribute("id", "marker"+i);
          entity2.setAttribute("url", experienceJSON.marker_data[i].marker_path);
          var entity21 = document.createElement("a-entity");
          entity21.setAttribute("id", "obj"+i);
          entity21.setAttribute("dinoInteractionListener", " ");
          entity21.setAttribute(
            "gltf-model",
            experienceJSON.marker_data[i].model
          );
          // entity21.setAttribute('gltf-model', 'https://andrescuervo.github.io/assets/ghostie/ghostie.gltf');
          entity21.setAttribute("scale", experienceJSON.marker_data[i].obj_scale);
          entity21.setAttribute("position", "0 0 0");
          entity21.setAttribute("static-body", "static-body");
          entity21.setAttribute("response-type", "arraybuffer");
          entity21.setAttribute("shadow", "cast: true");
          entity21.setAttribute(
            "material",
            "opacity:0;transparent:true;color:#FFFFFF"
          );
          entity2.appendChild(entity21);
          sceneEl2.appendChild(entity2);
        }
    
    }
  };
});

function startexp() {
  var start = document.getElementById("start_experience");
  var loading = document.getElementById("loading");
  loading.classList.add("disabled");
  document.getElementById("loaderq").style.display = "none";
  if (start.classList.contains("disabled")) {
    start.classList.remove("disabled");
  }
}

var timer = setInterval(startexp, 500);
var assetsLoaded = false;
var loggedin = false;
$(window).on("load", function() {
  setTimeout(function() {
    assetsLoaded = true;
  }, 3000);
});



AFRAME.registerComponent('dinoInteractionListener', {
    init: function () {
    var element = this.el;
       element.addEventListener('mouseenter', function (evt) {
          // lastIndex = (lastIndex + 1) % COLORS.length;
          // this.setAttribute('material', 'color', COLORS[lastIndex]);
          console.log('I was clicked at: ', evt.detail.intersection.point);
        });
    }
    
});




AFRAME.registerComponent('markerhandler', {
  init: function () {
    var marker = this.el;
    marker.addEventListener('markerFound', function() {
      var markerId = marker.id;
      console.log('markerFound', markerId);
      // TODO: Add your own code here to react to the marker being found.
    });
    marker.addEventListener('markerLost', function() {
      var markerId = marker.id;
      console.log('markerLost', markerId);
      // TODO: Add your own code here to react to the marker being lost.
    });
  }
});



