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
var experienceJSON;

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

function initializePreview(data, ExperienceName) {
  experienceJSON = JSON.parse(data);
    loadExperience(experienceJSON);
    assetsLoaded = true;
  
  
  $("#loaderq").addClass("hidden-login");
  $("#innerInfo").removeClass("hidden-login");
  var instructionSet = experienceJSON.splash_instruction;
  var lunchTextSet = experienceJSON.launch_text;
  if (experienceJSON.splashBackgroundColor && experienceJSON.Opacity) {
    var rgbformat = hexToRgb(
      experienceJSON.splashBackgroundColor,
      experienceJSON.Opacity
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
  //if json includes splashheadercolor
  if (experienceJSON.splashHeaderColor) {
    document.getElementById("titleText").style.color =
      experienceJSON.splashHeaderColor;
  }
  document.getElementById("titleText").innerHTML = ExperienceName;
  document.getElementById("instruction").innerHTML = instructionSet;
  document.getElementById("titleDescription").innerHTML = lunchTextSet;
  //document.getElementById("splashLogo").src = experienceJSON.splash_image;
  loggedin = true;
  // loadExperience(experienceJSON);
  if (experienceJSON["entry_view"]) {
    $("#CamEntity").attr("rotation", experienceJSON["entry_view"]);
  }
}

$(document).ready(() => {
  var startExperienteBtn = document.getElementById("start_experience");
  var ascene = document.querySelector("a-scene");
  for(i=0;i<=9;i++){
    var marker="marker"+i+".patt";
    localStorage.setItem(marker,"");
  }
  startExperienteBtn.onclick = function() {
 
    document.getElementById("aScene").style.display='block';
    ascene.style.zIndex = "auto";
    document.getElementById("container").style.display = "none";
    document.getElementById("loaderq").style.display = "none";
    
 
  };

});
var startexp = function() {
  var start = document.getElementById("start_experience");
  if (assetsLoaded && loggedin) {
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

function loadExperience(experienceJSON) {

  var sceneEl = document.querySelector("a-scene");
  for (var i = 0; i < experienceJSON.actionPoints.length; i++) {
    // eslint-disable-next-line no-loop-func
    if (experienceJSON.actionPoints[i].object_type == "obj" && experienceJSON.actionPoints[i].pattFile_path != "") {
      var entity1 = document.createElement("a-marker");
      entity1.setAttribute("preset", "custom");
      entity1.setAttribute("type", "pattern");
      entity1.setAttribute("id", "marker" + i);
      entity1.setAttribute("markerhandler", "");
      entity1.setAttribute("url",experienceJSON.actionPoints[i].pattFile_path);
      var entity11 = document.createElement("a-entity");
      entity11.setAttribute("id", "obj" + i);
      entity11.setAttribute( "obj-model", "obj: url(" + experienceJSON.actionPoints[i].model +");mtl: url(" +experienceJSON.actionPoints[i].mtl +")");
      entity11.setAttribute("scale", experienceJSON.actionPoints[i].obj_scale);
      entity11.setAttribute("rotation", experienceJSON.actionPoints[i].obj_rotation);
      entity11.setAttribute("static-body", "static-body");
      entity11.setAttribute("response-type", "arraybuffer");
      entity11.setAttribute("shadow", "cast: true");
      entity11.setAttribute("animation-mixer", "");
      entity1.appendChild(entity11);
      sceneEl.appendChild(entity1);
    } else if(experienceJSON.actionPoints[i].object_type == "gltf" && experienceJSON.actionPoints[i].pattFile_path != ""){
      var entity2 = document.createElement("a-marker");
      entity2.setAttribute("preset", "custom");
      entity2.setAttribute("type", "pattern");
      entity2.setAttribute("markerhandler", "");
      entity2.setAttribute("id", "marker" + i);
      entity2.setAttribute("url", experienceJSON.actionPoints[i].pattFile_path);
      var entity21 = document.createElement("a-gltf-model");
      entity21.setAttribute("id", "obj" + i);
      entity21.setAttribute( "src",experienceJSON.actionPoints[i].model);
      entity21.setAttribute("scale", experienceJSON.actionPoints[i].obj_scale);
      entity21.setAttribute("rotation", experienceJSON.actionPoints[i].obj_rotation);
      entity21.setAttribute("static-body", "static-body");
      entity21.setAttribute("response-type", "arraybuffer");
      entity21.setAttribute("animation-mixer", "");
      entity21.setAttribute("shadow", "cast: true");
      entity2.appendChild(entity21);
      sceneEl.appendChild(entity2);
    }
  }
}

$(document).ready(() => {
  const sceneEl = document.querySelector('a-scene');
  var newCamera = new THREE.PerspectiveCamera();
      newCamera.near = 1;
      newCamera.far = 100;
      sceneEl.camera = newCamera;
    sceneEl.addEventListener('loaded', () => {
      var newCamera = new THREE.PerspectiveCamera();
      newCamera.near = 1;
      newCamera.far = 100;
      sceneEl.camera = newCamera;
    });
  });