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
var EverestData;
var splashImagePath;
var fixOpacity = 0.2;
var cam ;
var radiusAction = 2.4;
registerAframeClickDragComponent(window.AFRAME);
var userAgent = navigator.userAgent;
if (userAgent.includes("Mobile") || userAgent.includes("Android") || userAgent.includes("iPhone")) {

    var cameraId = document.querySelector('#cursor');
    cameraId.removeAttribute('cursor');
    cameraId.setAttribute('cursor', {
      'fuse': 'true',
      'fuseTimeout': '1200'
    },
   true);
    cameraId.setAttribute('scale', {
      'x': '1',
      'y': '1',
      'z':'1'
    },
    true);
  }

function checkenter(){
    if (event.keyCode == 13) {
        event.preventDefault();
    }
}

$(document).ready(function () {

    $("#fixOpacity").on("input", function () {
        fixOpacity = $(this).val();
        var displayvalue = '(' + Math.round(fixOpacity * 100) + '%)';
        document.getElementById("rangeValue").innerText = displayvalue;
        EverestData.Opacity = fixOpacity
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

    var hotspotIndex = 0;
AFRAME.registerComponent("mouseclick", {
    init: function () {
        this.el.addEventListener('click', function () {
            if (selectedHotspot === this)
                selectedHotspot = null;
            else {
                selectedHotspot = this;
                editHotspot();
            }
            toggleToolbarButtons(selectedHotspot);
        });

        this.el.addEventListener('dragend', function () {
            var newPosition = this.getAttribute('position');
            var storyId = this.id.split("-")[1];
            var newpos = newPosition.x + " " + newPosition.y + " " + newPosition.z;
            $('#' + this.id).attr('position', newpos)
            for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
                if (experianceJSON.actionPoints[i].actionId == storyId) {
                    experianceJSON.actionPoints[i].actionPointPosition = newpos;
                }
            }
        });
    }
});
});

function initializeCustomization(experienceToCustomize) {
    EverestData = JSON.parse(experienceToCustomize);
    renderExperience(EverestData);
    if (EverestData.launch_text){
        document.getElementsByClassName("lunchScreenText").value = EverestData.launch_text;
    $('.lunchScreenText').summernote('code', EverestData.launch_text);
    var lauchText = $(".lunchScreenText");
  var div = document.createElement("div");
  div.innerHTML = lauchText[0].value;
  var plainText = div.textContent || div.innerText || "";
      var maxLength = 350;
      $('#maxCount').text( plainText.length);
      console.log("Text",  $('#maxCount'));
    }
    
    if (EverestData.splash_instruction){
        document.getElementsByClassName("instructionSetForDesktop").value = EverestData.splash_instruction;
    $('.instructionSetForDesktop').summernote('code', EverestData.splash_instruction);
    }
    if (EverestData.splash_android_instruction) {
        document.getElementsByClassName("instructionSetForAndroid").value = EverestData.splash_android_instruction;
        $('.instructionSetForAndroid').summernote('code', EverestData.splash_android_instruction);
      }
    if (EverestData.splash_image) {
        splashImagePath = EverestData.splash_image;
        var splashImageName = splashImagePath.split("/")[splashImagePath.split("/").length - 1];
        $("#splashImageLable").text(splashImageName);
    }
    if (EverestData.splashBackgroundColor) {
        var splashBackground = document.getElementById("splashBackground");
        splashBackground.value = EverestData.splashBackgroundColor;
        splashBackground.style.backgroundColor = splashBackground.value;
    } else {
        var splashBackground = document.getElementById("splashBackground");
        splashBackground.style.backgroundColor = "#8F8F8F";
        splashBackground.value = "#8F8F8F";
    }
    if (EverestData.Opacity) {
        var opacity = document.getElementById("fixOpacity")
        opacity.value = EverestData.Opacity;
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
    if (EverestData.splashHeaderColor) {
        var splashHeaderColor = document.getElementById('splashHeaderColor')
        splashHeaderColor.value = EverestData.splashHeaderColor;
        splashHeaderColor.style.backgroundColor = splashHeaderColor.value;
    }
    if (EverestData["entry_view"]) {
        $("#CamEntity").attr("rotation", EverestData["entry_view"]);
    }
    if(EverestData.CurveImageName1){
        var CurveImageName1 = (EverestData.CurveImageName1).split("/")[EverestData.CurveImageName1.split("/").length - 1];
        $('#customLabelCurve1').html(CurveImageName1);
        $('#quard1').attr('src', EverestData.CurveImageName1);
        $('#quard1').attr('visible', 'true');
    }
        
    if(EverestData.CurveImageName2){
            var CurveImageName2 = (EverestData.CurveImageName2).split("/")[EverestData.CurveImageName2.split("/").length - 1];
            $('#customLabelCurve2').html(CurveImageName2);
            $('#quard2').attr('src', EverestData.CurveImageName2);
            $('#quard2').attr('visible', 'true');
    }
}


var callToTacking = new TrackingData();
var focusTime = 0;
var screenActiveTime = 0;
var framename = "";
var action = "";
var ExperienceName = "";
var startTracking = true;
var xapiEnable = false;
function countdown() {
    startTracking = true;
    callToTacking.callToApi(params);
    addExperienceResult(params.UserId, params.PatronId, params.PublishedExperienceId, 0);
    function tick() {
        focusTime++;
        screenActiveTime++;
        if (screenActiveTime == 5) {
            addExperienceView(params.PatronId, params.PublishedExperienceId);
        }
        if (screenActiveTime % 10 == 0)
            updateExperienceResult(10, 0, 0, "N/A");
        setTimeout(tick, 1000);
    }
    tick();
}

function setEntryView() {
    if ($('#freezeView').hasClass('disabled')) {
        //Nothing to do here
    } else {
        var cam = document.querySelector("[camera]");
        var pos = cam.getAttribute("rotation");
        var oldpos = 0;
        if (EverestData["entry_view"]) {
            oldpos = EverestData["entry_view"].split(" ")[1];
        }
        EverestData["entry_view"] = "0 " + (pos.y + parseInt(oldpos)) + " 0";
        $('#freezeView').addClass('disabled');
        $('#freezeView').click(toastr.success('Presto! This view is now the Launch View of this Experience.'));
    }
}

$('div#scene').mouseup(function () {
    $('#freezeView').removeClass('disabled');
});

function getExperienceToSave() {
    var lauchText = $(".lunchScreenText");

    var lunchTextItem = lauchText[0].value;
    experianceJSON.launch_text = lunchTextItem;

    var splashInstruction = $(".instructionSetForDesktop");
    var item = splashInstruction[0].value;
    experianceJSON.splash_instruction = item;

    var splashAndroidInstruction = $(".instructionSetForAndroid")
    var item = splashAndroidInstruction[0].value;
    experianceJSON.splash_android_instruction = item;
    
    experianceJSON.splash_image = splashImagePath;

    var headerFont = $(".headerfont");
    var headerFontColor = headerFont[0].value;
    if (headerFontColor.includes('#')) {
        experianceJSON.splashHeaderColor = headerFontColor;
    } else {
        experianceJSON.splashHeaderColor = '#' + headerFontColor;
    }
    var splashbg = $(".splashBg");
    var splashBgColor = splashbg[0].value;
    if (splashBgColor.includes('#')) {
        experianceJSON.splashBackgroundColor = splashBgColor;
    } else {
        experianceJSON.splashBackgroundColor = '#' + splashBgColor;
    }

    if (experianceJSON.Opacity) {
        var opacity = document.getElementById("fixOpacity");
        opacity.value = experianceJSON.Opacity;
        var displayvalue = "(" + Math.round(opacity.value * 100) + "%)";
        document.getElementById("rangeValue").innerText = displayvalue;
        document.getElementById("splashBackground").style.opacity = opacity.value;
      } else {
        var opacity = document.getElementById("fixOpacity");
        opacity.value = fixOpacity;
        var displayvalue = "(" + Math.round(opacity.value * 100) + "%)";
        document.getElementById("rangeValue").innerText = displayvalue;
        experianceJSON.Opacity = fixOpacity;
        document.getElementById("splashBackground").style.opacity = fixOpacity;
      }

    

    var modifiedJSON = experianceJSON;
    modifiedJSON.entry_view = experianceJSON.entry_view;
    var dataToPost = JSON.stringify(modifiedJSON);
    return dataToPost;
}


var SkyPath;
var selectedPlace = null;
var selectedHotspot = null;
var selectedInfobox = null;
var experianceJSON = null;
var experianceData = null;
var settingsVisibilityJson = null;
var settingsTypeJson = null;
var imagesPointSTory = null;

var uniqueVisibility = null;
var setVisibility = null;
var uniqueType = null;
var setType = null;
var SkyImagePath = null;
var ImagePath = null;
var PointIconPath = null;
var AudioPath = null;
var VideoPath = null;
var storyPointIndex = 0;
var iconData = [{
    "iconId": 0,
    "iconName": "Assembly Point",
    "iconPath": "assets/images/icons/Assembly-Point.png"
},
{
    "iconId": 1,
    "iconName": "Gift",
    "iconPath": "assets/images/icons/gift.png"
},
{
    "iconId": 2,
    "iconName": "Hand Pointer",
    "iconPath": "assets/images/icons/Hand-Pointer.png"
},
{
    "iconId": 3,
    "iconName": "Info",
    "iconPath": "assets/images/icons/Info.png"
},
{
    "iconId": 4,
    "iconName": "Location",
    "iconPath": "assets/images/icons/Location-Marker.png"
},
{
    "iconId": 5,
    "iconName": "Money",
    "iconPath": "assets/images/icons/money.png"
},
{
    "iconId": 6,
    "iconName": "Question",
    "iconPath": "assets/images/icons/Question.png"
},
{
    "iconId": 7,
    "iconName": "Right",
    "iconPath": "assets/images/icons/right.png"
},
{
    "iconId": 8,
    "iconName": "Smiley",
    "iconPath": "assets/images/icons/smily.png"
},
{
    "iconId": 9,
    "iconName": "Star",
    "iconPath": "assets/images/icons/star.png"
},
{
    "iconId": 10,
    "iconName": "Warning",
    "iconPath": "assets/images/icons/Warning.png"
},
{
    "iconId": 11,
    "iconName": "Wrong",
    "iconPath": "assets/images/icons/wrong.png"
}
]

function toggleAssets(type) {
    if (type == 'Image') {
        $('#imageLable').show();
        $('#ImageFileUpload').show();
        $('#videoLable').hide();
        $('#videoFileUpload').hide();
    } else {
        $('#imageLable').hide();
        $('#ImageFileUpload').hide();
        $('#videoLable').show();
        $('#videoFileUpload').show();
    }
}

function renderExperience(EverestData) {
    experianceJSON = EverestData;
    $.getJSON("assets/js/settingJson.json", function (result_setting) {
        settingsVisibilityJson = result_setting.Visibility;
        settingsTypeJson = result_setting.Type;
        $.getJSON("assets/js/PointImagesJson.json", function (result_images) {
            imagesPointSTory = result_images.PointImages;
            storyPointGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson, imagesPointSTory);
        });
    });
    var assets = document.querySelector('a-assets');
    var scene = document.querySelector('a-scene');
    if (experianceJSON.imageSkyPath) {
        $('#imageRadio').click();
        var img = document.createElement('img');
        img.setAttribute('id', "imageskyid");
        img.setAttribute('src', experianceJSON.imageSkyPath);
        img.setAttribute('crossorigin', 'anonymous');
        assets.appendChild(img);
        var aSky = '';
        aSky = document.createElement('a-sky');
        aSky.setAttribute('src', experianceJSON.imageSkyPath);
        aSky.setAttribute('crossorigin', 'anonymous');
        scene.appendChild(aSky);
        var name = experianceJSON.imageSkyPath.split('/');
        name = name[name.length - 1];
        $('#customLabelSky').html(name); $('#customLabelSky').html(name); $('#customLabelSky').html(name);
    } else {
        $('#videoRadio').click();
        var skyVideo = document.createElement('video');
        skyVideo.setAttribute('id', "videoskyid");
        skyVideo.setAttribute('src', experianceJSON.videoskypath);
        skyVideo.setAttribute('autoplay', 'true');
        skyVideo.setAttribute('loop', '');
        skyVideo.muted = true;
        skyVideo.setAttribute('delay', '4000');
        skyVideo.setAttribute('crossorigin', 'anonymous');
        assets.appendChild(skyVideo);
        var aVideoSphere = '';
        aVideoSphere = document.createElement('a-videosphere');
        aVideoSphere.setAttribute('src', "#videoskyid");
        aVideoSphere.setAttribute('crossorigin', 'anonymous');
        scene.appendChild(aVideoSphere);
        var name = experianceJSON.videoskypath.split('/');
        name = name[name.length - 1];
        $('#customLabelSkyVideo').html(name);
    }
}



var assettype;
var assetId;

function getAssetType() {
    return assettype;
}

function openAssestsPopup(type, event) {
    assettype = type;
    assetId = event.id;
    window.parent.triggerAssetsPopup();
}

function AnimateMarker(event, id) {
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
        if (experianceJSON.actionPoints[i].actionId == id) {
            experianceJSON.actionPoints[i].actionChecked = '' + event.checked;
        }
    }
}

function getAssetPath(assetPath) {
    if(assetPath==undefined || assetPath==""){
        return;
      }

    if(assetPath!=""){
    if (assetId == 'splashImage') {
        splashImagePath = assetPath;
        var splashImageName = splashImagePath.split("/")[splashImagePath.split("/").length - 1];
        $("#splashImageLable").text(splashImageName);
    } else if (assetId == 'customFileSky') {
        experianceJSON.videoskypath = '';
        experianceJSON.imageSkyPath = assetPath;
        if (!document.querySelector('a-sky')) {
            var assets = document.querySelector('a-assets');
            var scene = document.querySelector('a-scene');
            var img = document.createElement('img');
            img.setAttribute('id', "imageskyid");
            img.setAttribute('src', experianceJSON.imageSkyPath);
            img.setAttribute('crossorigin', 'anonymous');
            assets.appendChild(img);
            var aSky = '';
            aSky = document.createElement('a-sky');
            aSky.setAttribute('src', "#imageskyid");
            aSky.setAttribute('crossorigin', 'anonymous');
            scene.appendChild(aSky);
        } else {
            
            $('a-videosphere').attr('visible', 'false');
            $('a-sky').attr('visible', 'true');
            $('a-sky').attr('src', '');
            $('a-sky').attr('src', experianceJSON.imageSkyPath);
        }
        var name = assetPath.split('/');
        name = name[name.length - 1];
        $('#customLabelSky').html(name);
    } else if (assetId == 'customFileSkyVideo') {
        var assets = document.querySelector('a-assets');
        var scene = document.querySelector('a-scene');
        $('a-sky').attr('visible', 'false');
        $('#imageskyid').attr('src', '');
        $('a-sky').attr('src', '');
        $('a-sky').attr('src', '#imageskyid');
        $('a-videosphere').attr('visible', 'true');
        if (!document.querySelector('a-videosphere')) {
            var skyVideo = document.createElement('video');
            skyVideo.setAttribute('id', "videoskyid");
            skyVideo.setAttribute('src', assetPath);
            skyVideo.setAttribute('autoplay', 'true');
            skyVideo.muted = true
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
        var skyVideoTag = document.querySelector("#videoskyid");
        var name = assetPath.split('/');
        name = name[name.length - 1];
        $('#customLabelSkyVideo').html(name);
        experianceJSON.imageSkyPath = '';
        experianceJSON.videoskypath = assetPath;
        setTimeout(()=>{
            skyVideoTag.play();
         },3000);
    } else if (assetId.indexOf('customfileinputimage-') > -1) {
        var id = assetId.split('-');
        id = id[id.length - 1];
        for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
            if (experianceJSON.actionPoints[i].actionId == id) {
                experianceJSON.actionPoints[i].actionPointImage = assetPath;
                var j = i;
            }
        }
        $('#imgID-' + id).attr('src', assetPath);
        var imageName = assetPath.split('/');
        imageName = imageName[imageName.length - 1];
        $('#labelcustomfileinputimage-' + id).html(imageName);
        $("#SelectedImgID-" + experianceJSON.actionPoints[id].actionId + "").removeClass("active-story");
    } else if (assetId.indexOf('customfileinputvideo-') > -1) {
        var id = assetId.split('-');
        id = id[id.length - 1];
        for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
            if (experianceJSON.actionPoints[i].actionId == id) {
                experianceJSON.actionPoints[i].actionPointVideo = assetPath;
                var j = i;
            }
        }
        $('#videoID-' + id).attr('src', assetPath);
        var videoName = assetPath.split('/');
        videoName = videoName[videoName.length - 1];
        $('#labelcustomfileinputvideo-' + id).html(videoName);

    } else if (assetId.indexOf('customfileinputaudio-') > -1) {
        var id = assetId.split('-');
        id = id[id.length - 1];
        for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
            if (experianceJSON.actionPoints[i].actionId == id) {
                experianceJSON.actionPoints[i].actionPointAudio = assetPath;
                var j = i;
            }
        }
        $('#audioID-' + id).attr('src', assetPath);
        var videoName = assetPath.split('/');
        videoName = videoName[videoName.length - 1];
        $('#labelcustomfileinputaudio-' + id).html(videoName);
    } else if (assetId.indexOf('customFileInputPointImgae-') > -1) {
        var id = assetId.split('-');
        id = id[id.length - 1];
        for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
            if (experianceJSON.actionPoints[i].actionId == id) {
                experianceJSON.actionPoints[i].actionIcon = assetPath;
                experianceJSON.actionPoints[i].actionIconID = '-i1';
                $('#customIconImage-' + id).attr('src', assetPath);
                $('#storypoint-' + id).attr('src', assetPath);
                $('#customIcon-' + id).attr('style', 'display:block');
                for (var j = 0; j < imagesPointSTory.length; j++) {
                    var iconIds = imagesPointSTory[j].iconId + '-' + id;
                    if (document.querySelector("#" + iconIds).classList.contains('icon-selected')) {
                        document.querySelector("#" + iconIds).classList.remove('icon-selected');
                    }
                }
                $('#customIconImage-' + id).addClass('icon-selected');

            }
        }
    }else if(assetId=="customFileCurve1"){
        var CurveImageName1 = assetPath.split("/")[assetPath.split("/").length - 1];
        $('#customLabelCurve1').html(CurveImageName1);
        experianceJSON.CurveImageName1=assetPath;
        $('#quard1').attr('visible', 'true');
        $('#quard1').attr('src', assetPath);
    }else if(assetId=="customFileCurve2"){
        var CurveImageName2 = assetPath.split("/")[assetPath.split("/").length - 1];
        $('#customLabelCurve2').html(CurveImageName2);
        experianceJSON.CurveImageName2=assetPath;
        $('#quard2').attr('visible', 'true');
        $('#quard2').attr('src', assetPath);
    }
}
}

function toggleSideNavv(sidenavId,quard) {

    var sidenavList = document.getElementsByClassName("sidenav");
    [].forEach.call(sidenavList, function (navigation) {
        if (navigation.classList.contains('active') && navigation.id != sidenavId)
            navigation.classList.remove('active');
    });
    document.getElementById(sidenavId).classList.toggle("active");
    toggleOverlay();

    if (quard == "quard1") {
        $("#customLabelCurve2").removeClass(
            "background-color-forestgreen"
          );
        $("#customLabelCurve1").addClass("background-color-forestgreen");
      } else {
        $("#customLabelCurve1").removeClass("background-color-forestgreen");
        $("#customLabelCurve2").addClass(
          "background-color-forestgreen"
        );
      }
     
     

}


function toggleSideNav(sidenavId) {

        var sidenavList = document.getElementsByClassName("sidenav");
        [].forEach.call(sidenavList, function (navigation) {
            if (navigation.classList.contains('active') && navigation.id != sidenavId)
                navigation.classList.remove('active');
        });
        if(sidenavId=="storyPointSidenav"){
            if(experianceJSON.actionPoints.length>0){
                $('#markerInstruction').attr('style', 'display:none');
            for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
              $("#collapse-storypoint-"+experianceJSON.actionPoints[i].actionId).removeClass("show");
            }
            $("#collapse-storypoint-0").addClass("show");
            }else{
                $('#markerInstruction').attr('style', 'display:block');
            }
            
          }
        document.getElementById(sidenavId).classList.toggle("active");
        toggleOverlay();
        $("#customLabelCurve2").removeClass("background-color-forestgreen");
        $("#customLabelCurve2").removeClass("background-color-forestgreen");
        
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

function addNewHotspot(type) {
    storyPointIndex;
    var markerEl = document.querySelector('#marker');
    var position = markerEl.object3D.getWorldPosition();
    var newActionPoint = {
        "actionChecked": "false",
        "actionIcon": "/act/v0.1/storypoint/assets/images/icons/smily.png",
        "actionIconID": "i8",
        "actionId": storyPointIndex,
        "actionPointAudio": "",
        "actionPointHeader": "",
        "actionPointImage": "",
        "actionPointPosition": position.x + " " + position.y + " " + position.z,
        "actionPointText": "",
        "actionPointVideo": "",
        "actionPointVisibility": "Always Visible",
        "markerSize": 2.4,
        "mediatype": "T",
        "type": "Text"
    }
    experianceJSON.actionPoints.push(newActionPoint);
    storyPointGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson, imagesPointSTory);

    closeSideNav();
    toggleSideNav('storyPointSidenav');
  
    $('#story-accordion').find('.collapse').collapse('hide');
  
    $("#collapse-storypoint-" + (storyPointIndex - 1)).addClass("show");
}



function storyPointGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson, imagesPointSTory) {
    $("#story-accordion").empty();
    storyPointIndex = 0;
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
        experianceJSON.actionPoints[i].actionId = i;
    }

    experianceJSON.actionPoints.forEach(storyPoint => {
        uniqueVisibility = storyPoint.actionPointVisibility;
        uniqueType = storyPoint.type;
        uniqueIcon = storyPoint.actionIconID;
        markerTitle = storyPoint.markerTitle;
        markerValue = storyPoint.markerTitle;
        ChekedTrue = storyPoint.actionChecked;
        if (ChekedTrue == "true") {
            var checkedboxTrue = "checked";
        }


        if (!markerTitle) {
            markerTitle = 'Marker';
            markerValue = '';
        }
        var imagename = 'Choose Image'
        if (storyPoint.actionPointImage) {
            imagename = storyPoint.actionPointImage.split('/');
            imagename = imagename[imagename.length - 1];
            $("#SelectedImgID-" + storyPoint.actionId + "").removeClass("active-story");
        }
        var videoname = 'Choose Video'
        if (storyPoint.actionPointVideo) {
            videoname = storyPoint.actionPointVideo.split('/');
            videoname = videoname[videoname.length - 1];
        }
        var audioname = 'Choose Audio'
        if (storyPoint.actionPointAudio) {
            audioname = storyPoint.actionPointAudio.split('/');
            audioname = audioname[audioname.length - 1];
        }

        // settings
        var storyAccordion = "<div class='card story-accordion-border' id='story'><div class='card-header story-color-accordion' id='headingTwo'><h3 class='mb-0'><button class='btn btn-link btn-decor' onmouseenter='mouseEnter(&#39;Markers help you overlay Media over the Area images. Configure the markers on the screen using this option.&#39;);' onmouseleave='mouseLeave()' data-toggle='collapse' data-target='#collapse-storypoint-" + storyPointIndex + "' aria-expanded='true' aria-controls='collapse-storypoint-" + storyPointIndex + "'><i class='fa' aria-hidden='true'></i><span id='titleMarkerId-" + storyPoint.actionId + "'>" + markerTitle + "</span></button></h3></div><div id='collapse-storypoint-" + storyPointIndex + "' class='collapse back-color' aria-labelledby='headingTwo' data-parent='#story-accordion'><div class='card-body'><div class='form-group'><lable for='markerTitleID-" + storyPoint.actionId + "' class='font_color'>Marker Title:</lable><input class='col-12 custom-input form-control input_box_trasparent ' maxlength='25' onblur='changeMarkerTilte(this)' placeholder='Marker Title' type='text' title='Marker Title' id='markerTitleID-" + storyPoint.actionId + "' value='" + markerValue + "'></div><div class='form-group'><lable for='visibilityDropDownID-" + storyPoint.actionId + "' class='font_color'>Marker Visibility:</lable> <select name='Visiblility' id='visibilityDropDownID-" + storyPoint.actionId + "' class='col-10 select-dropdown form-control' onchange='toggleVisibilityOption(this, " + storyPoint.actionId + ")' ></select></div><div class='form-group '><lable for='typeDropDownID-" + storyPoint.actionId + "' class='font_color'>Marker Type:</lable><select name='type' id='typeDropDownID-" + storyPoint.actionId + "' class='col-10 select-dropdown form-control' onchange='toggleTypeOption(this," + storyPoint.actionId + ")'></select></div><div class='form-group active-story' id= 'textAreaID-" + storyPoint.actionId + "'>  <div class='row' > <div class='col-8' style=''><lable for='place-header-input' class='font_color'>Heading:</lable></div>  <div class='col-4' style='text-align: right;'> <span id='custom-headingInput-" + storyPoint.actionId + "'>0</span><span >/ 40</span></div> </div><textarea maxlength='40' placeholder='Heading'  class='custom-input form-control form-group input_box_trasparent custom-headingInput ' id='custom-headingInput' onkeypress='checkenter()' onblur='changeHeader(this," + storyPoint.actionId + ")' onkeyup='ontextChange(this," + storyPoint.actionId + ",40)' >" + storyPoint.actionPointHeader + "</textarea> <div class='row' > <div class='col-8' style=''><lable for='place-header-input' class='font_color'>Text:</lable></div>  <div class='col-4' style='text-align: right;'> <span id='custom-textInput-" + storyPoint.actionId + "'>0</span><span >/ 400</span></div> </div> <textarea maxlength='400' placeholder='Text' class='form-control input_box_trasparent' id='custom-textInput' onkeyup='ontextChange(this," + storyPoint.actionId + ",400)' onblur='changeText(this," + storyPoint.actionId + ")'>" + storyPoint.actionPointText + "</textarea></div><div class='form-group mb-2 active-story' id='textfontcolor-" + storyPoint.actionId + "'><label>Description Font Color:</label><input class='jscolor pointer' onchange='changeInfofont(this," + storyPoint.actionId + ")' value='' style='width: 100%'  id='descriptionTextColor-" + storyPoint.actionId + "'></div><div class='form-group mb-2 active-story' id='textbgcolor-" + storyPoint.actionId + "'><label>Description Background Color:</label><input class='jscolor  pointer' id='descriptionBgColor-" + storyPoint.actionId + "'  style='width: 100%' onchange='changeInfoBg(this," + storyPoint.actionId + ")' value=''></div><div class='form-group  mb-2 active-story' id= 'descriptionbgOpacity-" + storyPoint.actionId + "'> <div class='row'><div class='col-9'><label style='color:#fff;width: 100%'>Description Background Opacity (Drag to change):</label></div><div class='col-3' style='text-align: right;'><label style='color:#fff' id='ImageDescriptionRangeValue-" + storyPoint.actionId + "'></label></div></div><div class='slidecontainer'><input id='descriptionBgOpacity-" + storyPoint.actionId + "' type='range' min='0.1' max='1' step='0.001' value='' class='slider' oninput='changeOpacity(this," + storyPoint.actionId + ")'  /></div></div><div class='form-group mb-2 set-image-size active-story' id = 'SelectedImgID-" + storyPoint.actionId + "'><img src='" + storyPoint.actionPointImage + "' alt='Display Image' class='set-image-size' id = 'imgID-" + storyPoint.actionId + "' ></div><div class='form-group custom-file mb-3 active-story' id = 'BrowseImgID-" + storyPoint.actionId + "'><input type='button' class='custom-file-input handPointer' id='customfileinputimage-" + storyPoint.actionId + "' onclick='openAssestsPopup(&#39;Image&#39;,this)'> <label class='custom-file-label' for='customfileinputimage-" + storyPoint.actionId + "'><span class='text-overflow' id='labelcustomfileinputimage-" + storyPoint.actionId + "'>" + imagename + "</span></label> <label class='aspect-ratio-style ' for='startquizbtn' style='font-size: 12px'>Note: Recommended aspect ratio 4:3</label></div><div class='form-group custom-file mb-3 set-video-size active-story' id = 'SelectedVidID-" + storyPoint.actionId + "'><video class='set-video-size' controls='controls' id='videoID-" + storyPoint.actionId + "' src='" + storyPoint.actionPointVideo + "'></video></div><div class='form-group custom-file mb-2 active-story' id = 'BrowseVidID-" + storyPoint.actionId + "'><input type='button' class='custom-file-input handPointer' id='customfileinputvideo-" + storyPoint.actionId + "' onclick='openAssestsPopup(&#39;Video&#39;,this)'> <label class='custom-file-label' for='customfileinputvideo-" + storyPoint.actionId + "'><span class='text-overflow' id='labelcustomfileinputvideo-" + storyPoint.actionId + "'>" + videoname + "</span></label> </div> <div class='form-group custom-file mt-3 active-story' id = 'SelectedAudID-" + storyPoint.actionId + "'><audio class='audio-width' controls id='audioID-" + storyPoint.actionId + "' src='" + storyPoint.actionPointAudio + "'></audio></div> <div class='form-group custom-file mb-2 active-story' id = 'BrowseAudID-" + storyPoint.actionId + "'><input type='button' class='custom-file-input handPointer' id='customfileinputaudio-" + storyPoint.actionId + "' onclick='openAssestsPopup(&#39;Audio&#39;,this)'><label class='custom-file-label' for='custom-file-input-audio handPointer'><span class='text-overflow' id='labelcustomfileinputaudio-" + storyPoint.actionId + "' class='text-overflow'>" + audioname + "</span></label></div><div class='form-group' id = 'SelectedIconID-" + storyPoint.actionId + "'> <label class='font_color' id='customLabelTeleport' >Marker Image:</label><div class='row' style='display:none' id='customIcon-" + storyPoint.actionId + "'><div class='col-3 icon-padding'><img src='' style='width:50px;height:50px !important;' onclick='changeStoryPointIcon(this)' id='customIconImage-" + storyPoint.actionId + "' /></div></div> <div class='row'  id='ptIconDivID-" + storyPoint.actionId + "'> </div><input type='checkbox' name='Animate' " + checkedboxTrue + " onClick='AnimateMarker(this," + storyPoint.actionId + ")'>   <label>Animate Marker</label> <div class='form-group  mb-2'> <div class='row'><div class='col-10'><label style='color:#fff;width: 100%'>Resize Marker (Drag to change):</label></div></div><div class='slidecontainer'><input id='markerImageSize-" + storyPoint.actionId + "' type='range' min='1.2' max='4.8' step='0.01' value='' class='slider' oninput='changeSize(this," + storyPoint.actionId + ")'  /></div></div><div class='form-group  custom-file mb-2 mt-2' id = 'BrowseIconID-" + storyPoint.actionId + "'>Choose Marker: <label class='btn btn-color-browse btn-width btn-shadow' id='customFileInputPointImgae-" + storyPoint.actionId + "' onmouseenter='mouseEnter(&#39;Change the Icon for the marker by browsing a new one OR you can select one of the existing icons.&#39;);' onmouseleave='mouseLeave()' onclick='openAssestsPopup(&#39;Image&#39;,this)'>Browse</label></div><label class='aspect-ratio-style ' for='startquizbtn' style='font-size: 12px'>Note: Recommended aspect ratio 1:1</label></div></div></div></div></div>";
        $("#story-accordion").append(storyAccordion);
        jscolor.installByClassName("jscolor");
        if (storyPoint.actionPointColor) {
            var fontcolor = document.getElementById("descriptionTextColor-" + storyPoint.actionId);
            fontcolor.style.backgroundColor = storyPoint.actionPointColor;
        }
        if (storyPoint.actionPointBgColor) {
            var fontcolor = document.getElementById("descriptionBgColor-" + storyPoint.actionId);
            fontcolor.style.backgroundColor = storyPoint.actionPointBgColor;
        } else {
            var fontcolor = document.getElementById("descriptionBgColor-" + storyPoint.actionId);
            fontcolor.style.backgroundColor = "#000";
        }
        if (storyPoint.actionPointBgOpacity) {
            var opacity = document.getElementById("descriptionBgOpacity-" + storyPoint.actionId);
            opacity.value = storyPoint.actionPointBgOpacity;
            var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
            document.getElementById("ImageDescriptionRangeValue-" + storyPoint.actionId).innerText = displayvalue
        } else {
            var opacity = document.getElementById("descriptionBgOpacity-" + storyPoint.actionId);
            opacity.value = 0.6;
            var default_value = '(' + Math.round(0.6 * 100) + '%)';
            document.getElementById("ImageDescriptionRangeValue-" + storyPoint.actionId).innerText = default_value;
        } 
        $('#custom-headingInput-'+storyPoint.actionId).text( storyPoint.actionPointHeader.length);  
        $('#custom-textInput-'+storyPoint.actionId).text(storyPoint.actionPointText.length);
        if (storyPoint.markerSize) {
            var markersize = document.getElementById("markerImageSize-" + storyPoint.actionId);
            markersize.value = storyPoint.markerSize;
        }else{
            var markersize = document.getElementById("markerImageSize-" + storyPoint.actionId);
            markersize.value = 2.4;
        }

        settingsVisibilityJson.forEach(visibility => {
            setVisibility = visibility.visibility;

            if (uniqueVisibility === setVisibility) {
                var visi = "<option value='" + visibility.visibility + "' selected>" + setVisibility + "</option>";
            } else {
                var visi = "<option  value='" + visibility.visibility + "'>" + setVisibility + "</option>";
            }
            $("#visibilityDropDownID-" + storyPoint.actionId + "").append(visi);
            // drop down bind for visibility
        });
        settingsTypeJson.forEach(type => {
            setType = type.type;
            if (uniqueType === setType) {
                var typeP = "<option  value='" + type.typeID + "' selected>" + setType + "</option>";
                toggleType(setType, storyPoint.actionId);
            } else {
                var typeP = "<option  value='" + type.typeID + "'>" + setType + "</option>";
            }
            $("#typeDropDownID-" + storyPoint.actionId + "").append(typeP);
        });
        imagesPointSTory.forEach(pointImages => {
            setIcon = pointImages.iconId;
            if (uniqueIcon === setIcon) {
                var icon = "<div class='col-3 icon-padding' ><img src=" + pointImages.iconPath + " onclick='changeStoryPointIcon(this)' alt='location' class='image_size img-responsive icon-selected' id= '" + pointImages.iconId + "-" + storyPoint.actionId + "'/></div>";
            } else {
                var icon = "<div class='col-3 icon-padding' ><img src=" + pointImages.iconPath + " onclick='changeStoryPointIcon(this)' alt='location' class='image_size img-responsive'id= '" + pointImages.iconId + "-" + storyPoint.actionId + "' /></div>";
            }
            $("#ptIconDivID-" + storyPoint.actionId + "").append(icon);
        });
        if (uniqueIcon == '-i1') {
            $('#customIconImage-' + storyPoint.actionId).attr('src', storyPoint.actionIcon);
            $('#customIcon-' + storyPoint.actionId).attr('style', 'display:block');
            $('#customIconImage-' + storyPoint.actionId).attr('class', 'image_size img-responsive icon-selected');
        }
        //$("#SelectedImgID-" + actionId + "").removeClass("active-story");
        addTeleports(storyPoint);
        storyPointIndex++;
    });

}

function changeStoryPointIcon(evn) {
    var id = evn.id
    var storyId = id.split('-')[1];
    for (var i = 0; i < imagesPointSTory.length; i++) {
        var iconIds = imagesPointSTory[i].iconId + '-' + storyId;
        if (document.querySelector("#" + iconIds).classList.contains('icon-selected')) {
            document.querySelector("#" + iconIds).classList.remove('icon-selected');
        }
    }
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
        if (experianceJSON.actionPoints[i].actionId == storyId) {
            experianceJSON.actionPoints[i].actionIconID = id.split('-')[0];
            imagesPointSTory.forEach(icons => {
                if (icons.iconId == id.split('-')[0])
                    experianceJSON.actionPoints[i].actionIcon = icons.iconPath;

            });
            if (id.indexOf("customIconImage-") > -1) {
                experianceJSON.actionPoints[i].actionIcon = evn.src;
            }

        }
    }

    document.querySelector("#customIconImage-" + storyId).classList.remove('icon-selected');
    document.querySelector("#" + evn.id).classList.add('icon-selected');


    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
        addTeleports(experianceJSON.actionPoints[i]);
    }
}
function changeMarkerTilte(event) {
    var actionID = event.id.split('-')[1];
    if (event.value) {
        for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
            if (experianceJSON.actionPoints[i].actionId == actionID) {
                experianceJSON.actionPoints[i].markerTitle = event.value;
                var j = i;
            }
        }
        $('#titleMarkerId-' + actionID).html(event.value);
    } else {
        for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
            if (experianceJSON.actionPoints[i].actionId == actionID) {
                experianceJSON.actionPoints[i].markerTitle = event.value;
                var j = i;
            }
        }
        $('#titleMarkerId-' + actionID).html('Marker');
    }
}
function toggleVisibilityOption(event, id) {
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
        if (experianceJSON.actionPoints[i].actionId == id) {
            experianceJSON.actionPoints[i].actionPointVisibility = event.value;
            var j = i;
        }
    }
}

function changeText(event, id) {
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
        if (experianceJSON.actionPoints[i].actionId == id) {
            experianceJSON.actionPoints[i].actionPointText = event.value;
        }
    }
}
function changeInfofont(event, id) {
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
        if (experianceJSON.actionPoints[i].actionId == id) {
            if ((event.value).includes('#')) {
                experianceJSON.actionPoints[i].actionPointColor = event.value;
            } else {
                experianceJSON.actionPoints[i].actionPointColor = '#' + event.value;
            }
        }
    }
}
function changeInfoBg(event, id) {
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
        if (experianceJSON.actionPoints[i].actionId == id) {
            if ((event.value).includes('#')) {
                experianceJSON.actionPoints[i].actionPointBgColor = event.value;
            } else {
                experianceJSON.actionPoints[i].actionPointBgColor = '#' + event.value;
            }
        }
    }
}
function changeOpacity(event, id) {
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
        if (experianceJSON.actionPoints[i].actionId == id) {
            experianceJSON.actionPoints[i].actionPointBgOpacity = event.value;
            var displayvalue = '(' + Math.round(event.value * 100) + '%)';
            var newval = document.getElementById("ImageDescriptionRangeValue-" + id);
            newval.innerText = displayvalue;
        }
    }
}

function changeSize(event, id) {
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
        if (experianceJSON.actionPoints[i].actionId == id) {
            experianceJSON.actionPoints[i].markerSize = event.value;
            var marker = document.getElementById('storypoint-' + id);
            marker.setAttribute('geometry', 'height', event.value);
            marker.setAttribute('geometry', 'width', event.value);
        }
    }
}

function changeHeader(event, id) {
  
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
        if (experianceJSON.actionPoints[i].actionId == id) {
            experianceJSON.actionPoints[i].actionPointHeader = event.value;
        }
    }
}

function toggleTypeOption(mediatype, actionId) {
    var typeMedia = mediatype.selectedOptions["0"].text;
    $("#textAreaID-" + actionId + "").addClass("active-story");
    $("#textfontcolor-" + actionId + "").addClass("active-story");
    $('#descriptionbgOpacity-' + actionId + "").addClass("active-story");
    $("#textbgcolor-" + actionId + "").addClass("active-story");
    $("#SelectedImgID-" + actionId + "").addClass("active-story");
    $("#BrowseImgID-" + actionId + "").addClass("active-story");
    $("#SelectedAudID-" + actionId + "").addClass("active-story");
    $("#BrowseAudID-" + actionId + "").addClass("active-story");
    $("#SelectedVidID-" + actionId + "").addClass("active-story");
    $("#BrowseVidID-" + actionId + "").addClass("active-story");
    toggleType(typeMedia, actionId);
}

function toggleType(mediatype, actionId) {
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
        if (experianceJSON.actionPoints[i].actionId == actionId) {
            experianceJSON.actionPoints[i].type = mediatype;
            var j = i;
        }
    }
    switch (mediatype) {

        case 'Text':
            $("#textAreaID-" + actionId + "").toggleClass("active-story");
            $("#textfontcolor-" + actionId + "").toggleClass("active-story");
            $("#descriptionbgOpacity-" + actionId + "").toggleClass("active-story");
            $("#textbgcolor-" + actionId + "").toggleClass("active-story");
            experianceJSON.actionPoints[j].mediatype = 'T';
            break;
        case 'Image':
            if(experianceJSON.actionPoints[j].actionPointImage!=""){
            $("#SelectedImgID-" + actionId + "").removeClass("active-story");
            }
            $("#BrowseImgID-" + actionId + "").toggleClass("active-story");
            experianceJSON.actionPoints[j].mediatype = 'I';
            break;
        case 'Audio':
            $("#SelectedAudID-" + actionId + "").toggleClass("active-story");
            $("#BrowseAudID-" + actionId + "").toggleClass("active-story");
            experianceJSON.actionPoints[j].mediatype = 'A';
            break;
        case 'Video':
            $("#SelectedVidID-" + actionId + "").toggleClass("active-story");
            $("#BrowseVidID-" + actionId + "").toggleClass("active-story");
            experianceJSON.actionPoints[j].mediatype = 'V';
            break;
        case 'Image with Text':
            $("#textAreaID-" + actionId + "").toggleClass("active-story");
            $("#textfontcolor-" + actionId + "").toggleClass("active-story");
            $("#textbgcolor-" + actionId + "").toggleClass("active-story");
            $("#descriptionbgOpacity-" + actionId + "").toggleClass("active-story");
            if(experianceJSON.actionPoints[j].actionPointImage!=""){
                $("#SelectedImgID-" + actionId + "").removeClass("active-story");
                }
            $("#BrowseImgID-" + actionId + "").toggleClass("active-story");
            experianceJSON.actionPoints[j].mediatype = 'IT';
            break;
        case 'Audio with Text':
            $("#textAreaID-" + actionId + "").toggleClass("active-story");
            $("#textfontcolor-" + actionId + "").toggleClass("active-story");
            $("#textbgcolor-" + actionId + "").toggleClass("active-story");
            $("#descriptionbgOpacity-" + actionId + "").toggleClass("active-story");
            $("#SelectedAudID-" + actionId + "").toggleClass("active-story");
            $("#BrowseAudID-" + actionId + "").toggleClass("active-story");
            experianceJSON.actionPoints[j].mediatype = 'AT';
            break;
        case 'Audio with Image':
            if(experianceJSON.actionPoints[j].actionPointImage!=""){
                $("#SelectedImgID-" + actionId + "").removeClass("active-story");
                }
            $("#BrowseImgID-" + actionId + "").toggleClass("active-story");
            $("#SelectedAudID-" + actionId + "").toggleClass("active-story");
            $("#BrowseAudID-" + actionId + "").toggleClass("active-story");
            experianceJSON.actionPoints[j].mediatype = 'AI';
            break;
        case 'Audio with Text and Image':
            $("#textAreaID-" + actionId + "").toggleClass("active-story");
            $("#textfontcolor-" + actionId + "").toggleClass("active-story");
            $("#textbgcolor-" + actionId + "").toggleClass("active-story");
            $("#descriptionbgOpacity-" + actionId + "").toggleClass("active-story");
            if(experianceJSON.actionPoints[j].actionPointImage!=""){
                $("#SelectedImgID-" + actionId + "").removeClass("active-story");
                }
            $("#BrowseImgID-" + actionId + "").toggleClass("active-story");
            $("#SelectedAudID-" + actionId + "").toggleClass("active-story");
            $("#BrowseAudID-" + actionId + "").toggleClass("active-story");
            experianceJSON.actionPoints[j].mediatype = 'AIT';
            break;
        case 'Video with Text':
            $("#textAreaID-" + actionId + "").toggleClass("active-story");
            $("#textfontcolor-" + actionId + "").toggleClass("active-story");
            $("#textbgcolor-" + actionId + "").toggleClass("active-story");
            $("#descriptionbgOpacity-" + actionId + "").toggleClass("active-story");
            $("#SelectedVidID-" + actionId + "").toggleClass("active-story");
            $("#BrowseVidID-" + actionId + "").toggleClass("active-story");
            experianceJSON.actionPoints[j].mediatype = 'VT';
            break;
    }
}
// reading browse paths
document.addEventListener('DOMContentLoaded', function () {
});

function VideoLoad(vid) {
    vidID = vid.attributes.id.nodeValue;
    vidName = vid.files["0"].name;
    if (vid.files && vid.files["0"]) {
        var fileInputLabel = document.getElementById('label-' + vidID);
        fileInputLabel.innerText = vidName;
        var reader = new FileReader();
        reader.onload = function (e) {
            VideoPath = e.target.result
        }
        reader.readAsDataURL(vid.files["0"]);
    }
}

function AudioLoad(aud) {
    audID = aud.attributes.id.nodeValue;
    audName = aud.files["0"].name;
    if (aud.files && aud.files["0"]) {
        var fileInputLabel = document.getElementById('label-' + audID);
        fileInputLabel.innerText = audName;
        var reader = new FileReader();
        reader.onload = function (e) {
            AudioPath = e.target.result
        }
        reader.readAsDataURL(aud.files["0"]);
    }
}

function IconLoad(icon) {
    iconID = icon.attributes.id.nodeValue;
    iconName = icon.files["0"].name;
    if (icon.files && icon.files["0"]) {
        var fileInputLabel = document.getElementById('label-' + iconID);
        fileInputLabel.innerText = iconName;
        var reader = new FileReader();
        reader.onload = function (e) {
            PointIconPath = e.target.result
        }
        reader.readAsDataURL(icon.files["0"]);
    }
}

function CustomizeData() {
    $.getJSON('assets/js/StoryPointJson.json', function (data) {
        var Sky = document.getElementById('skyImageID');
        data.StoryPoints.imageSkyPath = Sky.attributes[1].baseURI();

    });
}

function addTeleports(Story) {
    var aSceneEl = document.querySelector('a-scene');
   
    if (Story) {
        radiusAction = Story.markerSize;
        if (document.querySelector('#storypoint-' + Story.actionId)) {
            $('#storypoint-' + Story.actionId).remove();
        }
        var newTeleport = document.createElement('a-box');
        newTeleport.setAttribute('id', 'storypoint-' + Story.actionId);
        
        newTeleport.setAttribute('material', 'src', Story.actionIcon);
        newTeleport.setAttribute('material', 'transparent', 'true');
        newTeleport.setAttribute('geometry', 'height', radiusAction);
        newTeleport.setAttribute('geometry', 'width', radiusAction);
        newTeleport.setAttribute('click-drag', '');
        newTeleport.setAttribute("mouseclick", '');
        newTeleport.setAttribute('shader', "flat");
        newTeleport.setAttribute('shadow', 'cast', 'true');
        newTeleport.setAttribute('position', Story.actionPointPosition);
        newTeleport.setAttribute('look-at', 'src', '#main-camera');
        aSceneEl.appendChild(newTeleport);
    }
}
//    end reading browse path
function saveAllHotspots() {
    var allPlaces = document.querySelectorAll('a-sky');
    allPlaces.forEach(place => {
    });
    var allHotspots = document.querySelectorAll('a-sphere');
    var nodeId = 0;
    allHotspots.forEach(hotspot => {
        var hotspotProp = {};
        hotspotProp.hotspotName = hotspot.getAttribute('name');
        hotspotProp.nodeId = nodeId;
        hotspotProp.position = hotspot.object3D.position;
        hotspotsToSave.push(hotspotProp);
        nodeId++;
    });
}

function toggleToolbarButtons(selectedSphere1) {
    if (selectedSphere1 === null || selectedSphere1 === undefined) {
        document.getElementById('editTeleport').classList.add('disabled');
        document.getElementById('removeTeleport').classList.add('disabled');
    } else {
        document.getElementById('editTeleport').classList.remove('disabled');
        document.getElementById('removeTeleport').classList.remove('disabled');
    }
}

function editHotspot() {
    if (selectedHotspot) {
        toggleSideNav('storyPointSidenav');
        $('#story-accordion').find('.collapse').collapse('hide');
        $("#collapse-" + selectedHotspot.getAttribute('id')).addClass("show");
    }
}

function deleteHotspot(type) {
    var getId=selectedHotspot.id;
    $("#"+getId).remove();
 //   selectedHotspot.parentNode.removeChild(selectedHotspot);
    $('#deleteConfirmationModal').modal('hide');
    var id = selectedHotspot.id.split('-')[1];
    for (var i = 0; i < experianceJSON.actionPoints.length; i++) {
        if (experianceJSON.actionPoints[i].actionId == id) {
            experianceJSON.actionPoints.splice(i, 1);
        }
    }
    var sphereArray = document.querySelectorAll('a-box');
    if (sphereArray.length > 0) {
        sphereArray.forEach(sphere => {
            sphere.parentNode.removeChild(sphere);
        });
    }
    selectedHotspot = null;
    toggleToolbarButtons(selectedHotspot);
    storyPointGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson, imagesPointSTory);
}
function addLaunchScreenText() {
    experianceJSON.launch_text = document.getElementById("lunchScreenText").value;
}
function hideNav() {
    $(".sidenav").removeClass('active');
    $("#overlay").removeClass('overlay');
};
function newPos(x, y, z) {
    var r = Math.pow(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2), 0.5);
    var phy = Math.acos(z / r);
    var thita = Math.asin(y / (r * Math.sin(phy)));
    if ((x < 0 && z < 0) || (x < 0 && z > 0)) {
        phy = -phy;//+ (Math.PI);
        thita = -thita;
    }
    r = 25;
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
   $("#summernote").bind("change paste keyup", function () {
  });
  
 /* Summernote MAxlength, maxcount and popsnacker */


 
    function removeImage1() {
        EverestData.CurveImageName1 = "";
        $('#customLabelCurve1').html("Choose Image");
        $('#quard1').attr('src', '');
        $('#quard1').attr('visible', 'false');
    }

    function removeImage2() {
        EverestData.CurveImageName2 = "";
        $('#customLabelCurve2').html("Choose Image");
        $('#quard2').attr('src', '');
        $('#quard2').attr('visible', 'false');
    }

    $(".custom-input").bind("change paste keyup input", function () {
        var len = $(this).val().length;
        if (this.maxLength == len) {
          popSnackbar('warning', "Limit exceed.");
          return;
        }
      });

      
   function ontextChange(event,id,max){
        console.log(event);
        var txtlable=event.id;
        var txtLength=event.value.length;
        $('#'+txtlable+'-'+id).text( txtLength);
        if(txtLength>=max){
            popSnackbar('warning', "Limit exceed.");
        }
      }



