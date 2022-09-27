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
var customObj;

function hexToRgb(hex,opacity) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      alpha:opacity
    } : null;
  }

  var userAgent = navigator.userAgent;
if (userAgent.includes("Mobile") || userAgent.includes("Android") || userAgent.includes("iPhone")) {

  var cameraId = document.querySelector('#cursor');
  cameraId.removeAttribute('cursor');
  cameraId.setAttribute('scale', '1 1 1');
  cameraId.setAttribute('cursor', 'fuse', 'true; fuseTimeout: 1500;');

}
  
function initializePreview(experienceJSON, ExperienceName) {
    customObj = JSON.parse(experienceJSON);
    $("#loaderq").addClass("hidden-login");
    $("#innerInfo").removeClass("hidden-login");
    //if json includes splashbgcolor and opacity
    if (customObj.splashBackgroundColor && customObj.Opacity) {
        var rgbformat = hexToRgb(customObj.splashBackgroundColor, customObj.Opacity);
        document.getElementById('innerInfo').style.backgroundColor = "rgba(" + rgbformat.r + "," + rgbformat.g + "," + rgbformat.b + "," + rgbformat.alpha + ")";
    }
    //if json includes splashheadercolor
    if(customObj.splashHeaderColor){
        document.getElementById('titleText').style.color = customObj.splashHeaderColor;
    }
    document.getElementById('titleText').innerHTML = ExperienceName;
    document.getElementById('instruction').innerHTML = customObj.splash_instruction;
    document.getElementById('titleDescription').innerHTML = customObj.launch_text;
    document.getElementById('splashLogo').src = customObj.splash_image;
       loggedin = true;
    setTheatre();
    if (customObj.SplashImg != "") {
        var curtainElement = document.createElement('a-image');
        curtainElement.setAttribute('id', 'screenshot1');
        curtainElement.setAttribute('src', customObj.SplashImg);
        curtainElement.setAttribute('width', '248');
        curtainElement.setAttribute('height', '125');
        // curtainElement.setAttribute('position', '237.041 29.9 84.19133602668066');
        // curtainElement.setAttribute('rotation', '-3.0000000000000004 -110 0');
        curtainElement.setAttribute('position', '-0.779 28.357 -248');
        curtainElement.setAttribute('rotation', '-0.286 0.745 0.000');
        curtainElement.setAttribute('geometry', 'width:248;height:125');
        var sceneEl = document.querySelector('a-scene');
        sceneEl.appendChild(curtainElement);
    }
    if (customObj["entry_view"]) {
        $("#CamEntity").attr("rotation", customObj["entry_view"]);
    } 
    
}

$(document).ready(() => {

    var startExperienteBtn = document.getElementById('start_experience');
  cam = document.getElementById("cameraId");
    startExperienteBtn.onclick = function () {
        document.body.onkeyup = (e) => {
            if(e.keyCode==65 || e.keyCode==37){
               cameraAnimation("left");
            }
            else if(e.keyCode==68 || e.keyCode==39){
             cameraAnimation("right");
            }
         //    else if(e.keyCode==87 || e.keyCode==38){
         //     cameraAnimation("up");
         //    }
         //    else if(e.keyCode==83 || e.keyCode==40){
         //     cameraAnimation("down");
         //    }
         }
       document.getElementsByTagName('a-scene')[0].style.zIndex = 'auto';
       document.getElementById('container').style.display="none";
       document.getElementById('loaderq').style.display="none";
        //setTheatre();
        setVideoAndSplashScreen();
        cam.setAttribute("animation","enabled:false");
        cam.setAttribute("animation__one","enabled:true");
        
    };
});

var startexp = function () {
    var start = document.getElementById("start_experience");
    if (assetsLoaded && loggedin) {
      
        if (start.classList.contains("disabled")) {
            var loading=document.getElementById("loading");
            loading.classList.add("disabled");  
            start.classList.remove("disabled");
            clearTimeout(timer);
        }
    }
}
var timer = setInterval(startexp, 500);
var assetsLoaded = false;
var loggedin = false;
$(window).on('load', function () {
    setTimeout(function () {
        assetsLoaded = true;
    }, 3000);
})

var setTheatre = function () {
    // set background image
    var backgroundImageEl = document.getElementById('office');
    var prevSkyElement = document.querySelector('a-sky');
    if (prevSkyElement != null) {
        prevSkyElement.parentNode.removeChild(prevSkyElement);
    }
    var skyElement = document.createElement('a-sky');
    skyElement.setAttribute('id', 'sky');
    skyElement.setAttribute('src', '');
    skyElement.setAttribute('rotation', '0 -160 0');
    var sceneEl1 = document.querySelector('a-scene');
    sceneEl1.appendChild(skyElement);

   

    if (customObj.Settings[0].lights == "Always On" || customObj.Settings[0].lights == "Switch off lights during Show") {
        setSeatColorImageOn();
    } else if (customObj.Settings[0].lights == "Always Off") {
        setSeatColorImageOff();
    }
}

function setVideoAndSplashScreen() {
    var customSplashScreenEl = document.getElementById('splashImg');
    var vid = document.getElementById('customVideo');
    var prevImageElement = document.getElementById('screenshot1');
    var prevVideoElement = document.getElementById('customVideoEntity');

    var logo1 = document.getElementById('logo1');
    if (customObj.Logo !== "") {
        logo1.setAttribute('material', 'src:' + customObj.Logo + ';opacity:0.9');
    } else {
        logo1.setAttribute('material', 'src:assets/images/newImages/eqw.png;opacity:0.9');
    }

    var logo2 = document.getElementById('logo2');
    if (customObj.Logo !== "") {
        logo2.setAttribute('material', 'src:' + customObj.Logo + ';opacity:0.9');
    } else {
        logo2.setAttribute('material', 'src:assets/images/newImages/eqw.png;opacity:0.9');
    }

    if (prevImageElement != null) {
        prevImageElement.parentNode.removeChild(prevImageElement);
    }

    if (prevVideoElement != null) {
        prevVideoElement.parentNode.removeChild(prevVideoElement);
    }

   
    if (customObj.VideoSrc != "") {
        vid.setAttribute('src', '');
        // create video element in A-Frame    
        var videoElement = document.createElement('a-entity');
        videoElement.setAttribute('id', 'customVideoEntity');
        videoElement.setAttribute('material', 'shader:flat;src:#customVideo');
        // videoElement.setAttribute('src', '#customVideo');
        videoElement.setAttribute('width', '248');
        videoElement.setAttribute('height', '125');
        // videoElement.setAttribute('position', '237.041 29.9 84.19133602668066'); //old
        videoElement.setAttribute('position', '0.703 32.069 -253.336');
        // videoElement.setAttribute('rotation', '-3.0000000000000004 -110 0'); //old
        videoElement.setAttribute('rotation', '-1.203 2.235 0.377');
        videoElement.setAttribute('geometry', 'primitive:plane;width:248;height:125');

        if (customObj.Settings[0].loop == "Indefinite") {
            vid.setAttribute('loop', 'loop');
        } else {
            vid.setAttribute('loop', 'false');
            $('#customVideo').removeAttr('loop');
        }


       
            setTimeout(function () {
                var imageElement = document.getElementById('screenshot1');
                if (imageElement != null) {
                    imageElement.parentNode.removeChild(imageElement);
                }
                vid.setAttribute('src', customObj.VideoSrc);
                var sceneEl = document.querySelector('a-scene');
                sceneEl.appendChild(videoElement);
                vid.load();
                vid.play();
            }, 1000);
       

        vid.onplay = function () {
            if (customObj.Settings[0].lights == "Switch off lights during Show") {
                setSkyImageOff();
            }
        }

        vid.onpause = function () {
            if (customObj.Settings[0].lights == "Switch off lights during Show") {
                setSkyImageOn();
            }
            if (customObj.SplashImg != "") {
                var curtainElement = document.createElement('a-image');
                curtainElement.setAttribute('id', 'screenshot1');
                curtainElement.setAttribute('src', customObj.SplashImg);
                curtainElement.setAttribute('width', '248');
                curtainElement.setAttribute('height', '125');
                // curtainElement.setAttribute('position', '237.041 29.9 84.19133602668066');
                // curtainElement.setAttribute('rotation', '-3.0000000000000004 -110 0');
                curtainElement.setAttribute('position', '-0.779 28.357 -248');
                curtainElement.setAttribute('rotation', '-0.286 0.745 0.000');
                curtainElement.setAttribute('geometry', 'width:248;height:125');
                var sceneEl = document.querySelector('a-scene');
                sceneEl.appendChild(curtainElement);
            }
        }
    }
}

var setSeatColorImageOn = function () {
    var skyElement = document.querySelector('a-sky');
    if ((customObj.Settings[0].color != "Blue")) {
        var seatColor = customObj.Settings[0].color.toLowerCase();
        skyElement.setAttribute('src', 'assets/images/newImages/theater_' + seatColor + '.jpg');
    } else {
       
        skyElement.setAttribute('src', 'assets/images/newImages/theater_blue.jpg');
    }
}

var setSkyImageOn = function () {
    if ((customObj.Settings[0].color != "Blue")) {
        var seatColor = customObj.Settings[0].color.toLowerCase();
        document.querySelector('#office').setAttribute('src', '');
        document.querySelector('#office').setAttribute('src', 'assets/images/newImages/theater_' + seatColor + '.jpg');
        document.querySelector('a-sky').setAttribute('src', '');
       
        document.querySelector('a-sky').setAttribute('src', 'assets/images/newImages/theater_' + seatColor + '.jpg');
    } else {
        document.querySelector('#office').setAttribute('src', '');
        document.querySelector('#office').setAttribute('src', 'assets/images/newImages/theater_blue.jpg');
        document.querySelector('a-sky').setAttribute('src', '');
        document.querySelector('a-sky').setAttribute('src', 'assets/images/newImages/theater_blue.jpg');
      
    }
}

var setSkyImageOff = function () {
    if (customObj.Settings[0].color != "Blue") {
        var seatColor = customObj.Settings[0].color.toLowerCase();
        document.querySelector('#office').setAttribute('src', '');
        document.querySelector('#office').setAttribute('src', 'assets/images/newImages/theater_' + seatColor + '_off.jpg');
        document.querySelector('a-sky').setAttribute('src', '');
       
        document.querySelector('a-sky').setAttribute('src', 'assets/images/newImages/theater_' + seatColor + '_off.jpg');
    } else {
        document.querySelector('#office').setAttribute('src', '');
        document.querySelector('#office').setAttribute('src', 'assets/images/newImages/theater_blue_off.jpg');
        document.querySelector('a-sky').setAttribute('src', '');
      
        document.querySelector('a-sky').setAttribute('src', 'assets/images/newImages/theater_blue_off.jpg');


    }
}

var setSeatColorImageOff = function () {
    var skyElement = document.querySelector('a-sky');
    if (customObj.Settings[0].color != "Blue") {
        var seatColor = customObj.Settings[0].color.toLowerCase();
       
        skyElement.setAttribute('src', 'assets/images/newImages/theater_' + seatColor + '_off.jpg');

    } else {
        skyElement.setAttribute('src', 'assets/images/newImages/theater_blue_off.jpg');
       
    }
}


function cameraAnimation(angle){
    var cameraIdRotation=document.getElementById('cameraId').getAttribute('rotation');
      
    var rotation;
       switch (angle){
            case 'left':
                rotation=cameraIdRotation.x+" "+(cameraIdRotation.y+45)+" "+cameraIdRotation.z;
               break;
            case 'right':
                rotation=cameraIdRotation.x+" "+(cameraIdRotation.y-45)+" "+cameraIdRotation.z;
                break;
            case 'up':
                // cameraIdRotation.x=cameraIdRotation.x+45;
                // if(cameraIdRotation.x>90){
                //     cameraIdRotation.x=90;
                // }
                // rotation=(cameraIdRotation.x)+" "+cameraIdRotation.y+" "+cameraIdRotation.z;
                   break;
            case 'down':
                // cameraIdRotation.x=cameraIdRotation.x-45;
                // if(cameraIdRotation.x<(-90)){
                // cameraIdRotation.x=-90;
                // }
                // rotation=(cameraIdRotation.x)+" "+cameraIdRotation.y+" "+cameraIdRotation.z;
                break;
       }  
       console.log(rotation);
          cam.setAttribute(
              "animation__video",
              "property: rotation;to: "+rotation+"; dur: 1000;enabled:true;"
            );
    }