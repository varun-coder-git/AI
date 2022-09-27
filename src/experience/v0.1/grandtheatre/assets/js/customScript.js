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

var customScriptFunction = function (data) {
    var customObj = data;

    // set background image
    var backgroundImageEl = document.getElementById('office');
    var customSplashScreenEl = document.getElementById('splashImg');
    var videoEl = document.getElementById('customVideo');
    var prevImageElement = document.getElementById('screenshot1');
    var prevSkyElement = document.querySelector('a-sky');
    var prevVideoElement = document.querySelector('a-video');

    var logo1 =document.getElementById('logo1');
    if(customObj.Logo !== ""){
        logo1.setAttribute( 'material','src:'+customObj.Logo +';opacity:0.9');
    }else{
        logo1.setAttribute( 'material','src:assets/images/newImages/eqw.png;opacity:0.9');
    }
    
    
    var logo2 =document.getElementById('logo2');
    if(customObj.Logo !== ""){
        logo2.setAttribute( 'material','src:'+customObj.Logo +';opacity:0.9');
    }else{
        logo2.setAttribute( 'material','src:assets/images/newImages/eqw.png;opacity:0.9');
    }
    if (prevImageElement != null) {
        prevImageElement.parentNode.removeChild(prevImageElement);
    }

    if (prevSkyElement != null) {
        prevSkyElement.parentNode.removeChild(prevSkyElement);
    }

    if (prevVideoElement != null) {
        prevVideoElement.parentNode.removeChild(prevVideoElement);
    }

    var skyElement = document.createElement('a-sky');
    skyElement.setAttribute('id', 'sky');
    skyElement.setAttribute('src', '');
    skyElement.setAttribute('rotation', '0 -160 0');
    var sceneEl1 = document.querySelector('a-scene');
    sceneEl1.appendChild(skyElement);

    var setSeatColorImageOn = function () {
        if ((customObj.Settings[0].color != "Blue")) {
            var seatColor = customObj.Settings[0].color.toLowerCase();
            //  backgroundImageEl.setAttribute('src', 'assets/images/theater_'+seatColor+'.jpg');
            skyElement.setAttribute('src', 'assets/images/newImages/theater_' + seatColor + '.jpg');
        } else {
            // backgroundImageEl.setAttribute('src', 'assets/images/theater_background_light_on.jpg');
            skyElement.setAttribute('src', 'assets/images/newImages/theater_blue.jpg');
        }
    }

    var setSkyImageOn = function () {
        if ((customObj.Settings[0].color != "Blue")) {
            var seatColor = customObj.Settings[0].color.toLowerCase();
            document.querySelector('#office').setAttribute('src', '');
            document.querySelector('#office').setAttribute('src', 'assets/images/newImages/theater_' + seatColor + '.jpg');
            document.querySelector('a-sky').setAttribute('src', '');
            // document.querySelector('a-sky').setAttribute('src','#office');
            document.querySelector('a-sky').setAttribute('src', 'assets/images/newImages/theater_' + seatColor + '.jpg');
        } else {
            document.querySelector('#office').setAttribute('src', '');
            document.querySelector('#office').setAttribute('src', 'assets/images/newImages/theater_blue.jpg');
            document.querySelector('a-sky').setAttribute('src', '');
            document.querySelector('a-sky').setAttribute('src', 'assets/images/newImages/theater_blue.jpg');
            // document.querySelector('a-sky').setAttribute('src','#office');
        }
    }

    var setSkyImageOff = function () {
        if (customObj.Settings[0].color != "Blue") {
            var seatColor = customObj.Settings[0].color.toLowerCase();
            document.querySelector('#office').setAttribute('src', '');
            document.querySelector('#office').setAttribute('src', 'assets/images/newImages/theater_' + seatColor + '_off.jpg');
            document.querySelector('a-sky').setAttribute('src', '');
            // document.querySelector('a-sky').setAttribute('src','#office');
            document.querySelector('a-sky').setAttribute('src', 'assets/images/newImages/theater_' + seatColor + '_off.jpg');
        } else {
            document.querySelector('#office').setAttribute('src', '');
            document.querySelector('#office').setAttribute('src', 'assets/images/newImages/theater_blue_off.jpg');
            document.querySelector('a-sky').setAttribute('src', '');
            // document.querySelector('a-sky').setAttribute('src','#office');
            document.querySelector('a-sky').setAttribute('src', 'assets/images/newImages/theater_blue_off.jpg');


        }
    }

    var setSeatColorImageOff = function () {
        if (customObj.Settings[0].color != "Blue") {
            var seatColor = customObj.Settings[0].color.toLowerCase();
            //  backgroundImageEl.setAttribute('src', 'assets/images/theater_'+seatColor+'_off.jpg');
            skyElement.setAttribute('src', 'assets/images/newImages/theater_' + seatColor + '_off.jpg');

        } else {
            skyElement.setAttribute('src', 'assets/images/newImages/theater_blue_off.jpg');
            // backgroundImageEl.setAttribute('src', 'assets/images/theater_background_light_off.jpg');

        }
    }

    if (customObj.Settings[0].lights == "Always On" || customObj.Settings[0].lights == "Switch off lights during Show") {
        setSeatColorImageOn();
    } else if (customObj.Settings[0].lights == "Always Off") {
        setSeatColorImageOff();
    }

    // for setting Curtain Splash Screen
    if (customObj.SplashImg != "") {
        var curtainElement = document.createElement('a-image');
        curtainElement.setAttribute('id', 'screenshot1');
        curtainElement.setAttribute('src', customObj.SplashImg);
        curtainElement.setAttribute('width', '248');
        curtainElement.setAttribute('height', '125');
        curtainElement.setAttribute('position', '-0.779 28.357 -249.905');
        curtainElement.setAttribute('rotation', '-0.286 0.745 0.000');
        curtainElement.setAttribute('geometry', 'width:248;height:125');
        curtainElement.setAttribute('set-sky', '');
        curtainElement.setAttribute('class', 'clickable');
        var sceneEl = document.querySelector('a-scene');
        sceneEl.appendChild(curtainElement);
    }

}

function mouseEnter(msg){
 window.parent.mouseEnter(msg);
} 

function mouseLeave()
{
  window.parent.mouseLeave();
} 

