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

var walkArroundJson = "";
var activeScreen = "";
var congratulations = "";
var thankmsg = "";
var thankyou = "";
var endMessageByUser = "";
var experienceStarted = false;
var isInfoboxClick = false;

var userAgent = navigator.userAgent;
if (userAgent.includes("Mobile") || userAgent.includes("Android") || userAgent.includes("iPhone")) {

  var cameraId = document.querySelector('#cursor');
  cameraId.removeAttribute('cursor');
  cameraId.setAttribute('scale', '1 1 1');
  cameraId.setAttribute('cursor', 'fuse', 'true; fuseTimeout: 1500;');
}
function hexToRgb(hex, opacity) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16),
		alpha: opacity
	} : null;
}


function initializePreview(experienceJSON, ExperienceName) {

	walkArroundJson = JSON.parse(experienceJSON);
	$("#loaderq").addClass("hidden-login");
	$("#innerInfo").removeClass("hidden-login");
	var instructionSet = walkArroundJson.splash_instruction;
	var lunchTextSet = walkArroundJson.launch_text;
	  //if json includes splashbgcolor and opacity
	if (walkArroundJson.splashBackgroundColor && walkArroundJson.Opacity) {
		var rgbformat = hexToRgb(walkArroundJson.splashBackgroundColor, walkArroundJson.Opacity);
		document.getElementById('innerInfo').style.backgroundColor = "rgba(" + rgbformat.r + "," + rgbformat.g + "," + rgbformat.b + "," + rgbformat.alpha + ")";
	}
	 //if json includes splashheadercolor
	if(walkArroundJson.splashHeaderColor){
	document.getElementById('titleText').style.color = walkArroundJson.splashHeaderColor
	 }
	document.getElementById('titleText').innerHTML = ExperienceName;
	document.getElementById('instruction').innerHTML = instructionSet;
	document.getElementById('titleDescription').innerHTML = lunchTextSet;
	document.getElementById('splashLogo').src = walkArroundJson.splash_image;


	loggedin = true;
	// if (walkArroundJson["entry_view"]) {
	// 	$("#CamEntity").attr("rotation", walkArroundJson["entry_view"]);
	//   }
	activeScreen = walkArroundJson.Nodes[0];
	if (activeScreen.entry_view) {
		$("#CamEntity").attr("rotation", activeScreen.entry_view);
	}
	congratulations = walkArroundJson.congratulations;
	thankmsg = walkArroundJson.thankYouMsg;
	thankyou = walkArroundJson.thankYou;
	endMessageByUser = walkArroundJson.endMessageByUser;
	points = walkArroundJson.points;

	generateRoom(activeScreen);
	var aLight = '';
	var scene = document.querySelector("a-scene");
	aLight = document.createElement('a-entity');
	aLight.setAttribute("light", "color:#f0f0f0;type:ambient")
	//aimg.setAttribute("animation","property: opacity; dir: normal; dur: 1500;easing: easeOutQuad; loop: false; from:0; to: 1; delay: "+(350*i));
	scene.appendChild(aLight);

	var height = $('#logdiv').height();
	$('#logoTop').css('top', height / 5.5);
	$('#buttonTop').css('top', height / 4);
}


$(document).ready(() => {
	var startExperienteBtn = document.getElementById('start_experience');
	startExperienteBtn.onclick = function () {
		var cam = document.querySelector("#rotation");
		cam.emit('skayroation');
		experienceStarted = true;
		document.getElementsByTagName('a-scene')[0].style.zIndex = 'auto';
		document.getElementById('container').style.display = "none";
		document.getElementById('loaderq').style.display = "none";
		clearInterval(timer);
	};
});
var assetsLoaded = false;
var loggedin = false;

var startexp = function () {
	var start = document.getElementById("start_experience");
	if (assetsLoaded && loggedin) {
		if (start.classList.contains("disabled")) {
			var loading = document.getElementById("loading");
			loading.classList.add("disabled");
			clearInterval(timer);
			start.classList.remove("disabled");
			var cur = document.querySelector('#cursor');
			cur.emit("startAnimantion");
		}
	}
}
var timer = setInterval(startexp, 500);
$(window).on('load', function () {
	setTimeout(function () {
		assetsLoaded = true;
	}, 3000);
})


var isSphereSelected = false;
var hotspotsToSave = [];
var placeToSave = [];



var questionSelectData = {
	"Question": "",
	"Options": [
		{ "option": "", "attempted": "false" },
		{ "option": "", "attempted": "false" },
		{ "option": "", "attempted": "false" },
		{ "option": "", "attempted": "false" }
	]
}

var questionJsonArray = {};
var answerid = "";
var questionPrinted = false;
var correctAnswer = 0;
var flag = 0;
var showscreen = "Yes";
var points = "";
var totalTeleports = 0;
printQuestionFlag = true;
var question = "";
var questionReportArray = [];
function cleanQuestionJSONArray() {
	questionJsonArray = {};
}
AFRAME.registerComponent('hotspotclick', {
	init: function () {
		this.el.addEventListener('click', function () {
			if (experienceStarted === true) {
				var positionPoints = activeScreen.teleports[this.getAttribute('id').split("-")[2]].teleportPosition.split(" ");
				resetColor();
				//Panel Binding 
				var infoBox = document.querySelector("#infoBox1");
				var astartPosAnimation = '';
				astartPosAnimation = document.createElement('a-animation');
				astartPosAnimation.setAttribute('id', "positionanimation")
				astartPosAnimation.setAttribute('attribute', "position");
				astartPosAnimation.setAttribute('dur', "1500");
				astartPosAnimation.setAttribute('fill', "forwards");
				astartPosAnimation.setAttribute('to', positionPoints[0] + " " + (positionPoints[1] - 22) + " " + positionPoints[2]);
				infoBox1.appendChild(astartPosAnimation);
				infoBox1.setAttribute("visible", "true");
				infoBox1.emit("endAnimation");

				if (printQuestionFlag) {
					questionPrinted = false;
					var textview = document.getElementById('question');
					textview.setAttribute("text", "value:");
					// textview.setAttribute("value","");
					answerid = this.getAttribute('id');
					textview.setAttribute('visible', true);
					var sentence = activeScreen.teleports[this.getAttribute('id').split("-")[2]].Question;
					var car = '';
					setTimeout(function () {
						for (var i = 0; i < sentence.length; i++) {
							(function (index) {
								setTimeout(function () {
									var temp = sentence[index];
									car += temp;
									textview.setAttribute("text", "value:" + car);
								}, 60 * i);
							})(i);
						}
						questionPrinted = true;
					}, 1900);

					var positionPoints = activeScreen.teleports[this.getAttribute('id').split("-")[2]].teleportPosition.split(" ");
					var infoBox = document.querySelector("#infoBox1");
					var astartPosAnimation = '';
					astartPosAnimation = document.createElement('a-animation');
					astartPosAnimation.setAttribute('id', "positionanimation")
					astartPosAnimation.setAttribute('attribute', "position");
					astartPosAnimation.setAttribute('dur', "1500");
					astartPosAnimation.setAttribute('fill', "forwards");
					astartPosAnimation.setAttribute('to', positionPoints[0] + " " + (positionPoints[1] - 22) + " " + positionPoints[2]);
					infoBox1.appendChild(astartPosAnimation);
					infoBox.setAttribute("visible", "true");
					infoBox.emit("endAnimation");
					question = activeScreen.teleports[this.getAttribute('id').split("-")[2]].Question;
					for (let i = 0; i < activeScreen.teleports[this.getAttribute('id').split("-")[2]].Options.length; i++) {
						if (i == 0) {
							var textBox0 = document.querySelector("#textBox" + i);
							var option0 = document.querySelector("#option" + i);
							var optiontext0 = activeScreen.teleports[this.getAttribute('id').split("-")[2]].Options[i].option;
							var optionchar0 = '';
							if (optiontext0.length) {
								setTimeout(function () {
									for (var j = 0; j < optiontext0.length; j++) {
										(function (index) {
											setTimeout(function () {
												var temp2 = optiontext0[index];
												optionchar0 += temp2;
												textBox0.setAttribute("value", optionchar0);
												setTimeout(function () {
													option0.setAttribute("class", "clickable");
												}, 120 * optiontext0.length);
											}, 60 * j);
										})(j);
									}
								}, 1900 + 60 * sentence.length);
							}
						} else if (i == 1) {
							var textBox1 = document.querySelector("#textBox" + i);
							var option1 = document.querySelector("#option" + i);
							// option1.setAttribute("class","clickable");
							var optiontext1 = activeScreen.teleports[this.getAttribute('id').split("-")[2]].Options[i].option;
							var optionchar1 = '';
							setTimeout(function () {
								if (optiontext1.length) {
									for (var j = 0; j < optiontext1.length; j++) {
										(function (index) {
											setTimeout(function () {
												var temp2 = optiontext1[index];
												optionchar1 += temp2;
												textBox1.setAttribute("value", optionchar1);
												setTimeout(function () {
													option1.setAttribute("class", "clickable");
												}, 120 * optiontext1.length);
											}, 60 * j);
										})(j);
									}
								}
								var submitBtn = document.querySelector("#btn");
								submitBtn.setAttribute('position', '23.11045245133109 -14.89095655465407 9.842219909832203');
							}, 1900 + 60 * sentence.length + 120);
						} else if (i == 2) {
							var textBox2 = document.querySelector("#textBox" + i);
							var option2 = document.querySelector("#option" + i);

							var optiontext2 = activeScreen.teleports[this.getAttribute('id').split("-")[2]].Options[i].option;
							var optionchar2 = '';
							if (optiontext2.length) {
								setTimeout(function () {
									for (var j = 0; j < optiontext2.length; j++) {
										(function (index) {
											setTimeout(function () {
												var temp2 = optiontext2[index];
												optionchar2 += temp2;
												textBox2.setAttribute("value", optionchar2);
												setTimeout(function () {
													option2.setAttribute("class", "clickable");
												}, 120 * optiontext2.length);
											}, 60 * j);
										})(j);
									}
								}, 1900 + 60 * sentence.length + 120);
							}
						} else if (i == 3) {
							var textBox3 = document.querySelector("#textBox" + i);
							var option3 = document.querySelector("#option" + i);

							var optiontext3 = activeScreen.teleports[this.getAttribute('id').split("-")[2]].Options[i].option;
							var optionchar3 = '';
							if (optiontext3.length) {
								setTimeout(function () {
									for (var j = 0; j < optiontext3.length; j++) {
										(function (index) {
											setTimeout(function () {
												var temp2 = optiontext3[index];
												optionchar3 += temp2;
												textBox3.setAttribute("value", optionchar3);
												setTimeout(function () {
													option3.setAttribute("class", "clickable");
												}, 120 * optiontext3.length);
											}, 60 * j);
										})(j);
									}
								}, 1900 + 60 * sentence.length + 120);
							}
						}
					}

					if (activeScreen.teleports[this.getAttribute('id').split("-")[2]].questionPanel) {
						var panel = activeScreen.teleports[this.getAttribute('id').split("-")[2]].questionPanel;
						if (activeScreen.teleports[this.getAttribute('id').split("-")[2]].Options[3].option.length > 0) {
							infoBox1.setAttribute('material', 'src:assets/images/QuestionPanel/' + panel + '_4.jpg;side:double');
						} else if (activeScreen.teleports[this.getAttribute('id').split("-")[2]].Options[2].option.length > 0) {
							infoBox1.setAttribute('material', 'src:assets/images/QuestionPanel/' + panel + '_3.jpg;side:double');
						} else {
							infoBox1.setAttribute('geometry', 'height:3;width:3;');
							infoBox1.setAttribute('material', 'src:assets/images/QuestionPanel/' + panel + '_2.jpg;side:double');
						}
					} else {
						if (activeScreen.teleports[this.getAttribute('id').split("-")[2]].Options[3].option.length > 0) {
							infoBox1.setAttribute('material', 'src:assets/images/quesboard3_ans4.jpg;side:double');
						} else if (activeScreen.teleports[this.getAttribute('id').split("-")[2]].Options[2].option.length > 0) {
							infoBox1.setAttribute('material', 'src:assets/images/quesboard3_ans3.jpg;side:double');
						} else {
							infoBox1.setAttribute('geometry', 'height:3;width:3;');
							infoBox1.setAttribute('material', 'src:assets/images/quesboard3_ans2.jpg;side:double');
						}
					}
					setTimeout(function () {
						printQuestionFlag = true;
					}, 1900 + 60 * sentence.length + 120 * optiontext0.length + 120 * optiontext1.length)
					answerslected = false;
				}
				printQuestionFlag = false;
				questionJsonArray = {};
				questionSelectData = {
					"Question": "",
					"Options": [
						{ "option": "", "attempted": "false" },
						{ "option": "", "attempted": "false" },
						{ "option": "", "attempted": "false" },
						{ "option": "", "attempted": "false" }
					]
				};
				questionJsonArray = questionSelectData;

				questionJsonArray.Question = question;
				for (let i = 0; i < activeScreen.teleports[this.getAttribute('id').split("-")[2]].Options.length; i++) {
					questionJsonArray.Options[i].option = activeScreen.teleports[this.getAttribute('id').split("-")[2]].Options[i].option;
					questionJsonArray.Options[i].attempted = false;
				}
			}

		});
		this.el.addEventListener('mouseenter', function () {
			if (experienceStarted === true) {
				var sphere = document.querySelector("#" + this.getAttribute('id'));
				sphere.emit("animationEnd-" + this.getAttribute('id').split("-")[2]);
			}
		});
		this.el.addEventListener('mouseleave', () => {
			if (experienceStarted === true) {
				var cur = document.querySelector('#cursor');
				cur.emit("startAnimantion");
			}
		});


	}
});

AFRAME.registerComponent('optionclick', {
	init: function () {

		this.el.addEventListener('click', () => {
			if (experienceStarted === true && questionPrinted == true) {
				var sky = document.querySelector('#' + this.el.id);
				var optionVal = sky.id;
				var res = optionVal.split("option");

				if (questionJsonArray.Options[res[1]].attempted == false) {
					var textview6 = document.getElementById('textBox' + res[1]);
					textview6.setAttribute('text', 'width:60;color:#00ff00');
					questionJsonArray.Options[res[1]].attempted = true;
				} else {
					var textview6 = document.getElementById('textBox' + res[1]);
					textview6.setAttribute('text', 'width:60;color:#fff');
					questionJsonArray.Options[res[1]].attempted = false;
				}
			}
		});
		this.el.addEventListener('mouseleave', () => {
			if (experienceStarted === true) {
				var cur = document.querySelector('#cursor');
				cur.emit("startAnimantion");
			}
		});
	}
});


AFRAME.registerComponent('next', {
	init: function () {
		this.el.addEventListener('click', () => {
			if (experienceStarted === true) {
				questionReportArray.push(questionJsonArray);
				cleanQuestionJSONArray();
				activeScreen = walkArroundJson.Nodes[parseInt(activeScreen.teleports[answerid.split("-")[2]].teleportToPlaceIndex)];
				generateRoom(activeScreen);
			}
		});
		this.el.addEventListener('mouseleave', () => {
			if (experienceStarted === true) {
				var cur = document.querySelector('#cursor');
				cur.emit("startAnimantion");
			}
		});
	}
});


function generateRoom(activeScreen) {
	var bannerArray = document.querySelectorAll('.banner-entity');
	if (bannerArray.length > 0) {
		// bannerArray.forEach(banner => {
		for (var i = 0; i < bannerArray.length; i++) {
			// banner.parentNode.removeChild(banner);
			bannerArray[i].parentNode.removeChild(bannerArray[i]);
			// });
		}
	}

	var entityInfobox = document.querySelector('a-entity#infoBox1');

	// As long as infobox has a child node, remove it

	if (entityInfobox != null) {
		while (entityInfobox.hasChildNodes()) {
			entityInfobox.removeChild(entityInfobox.firstChild);
		};
		entityInfobox.removeAttribute('geometry');
		entityInfobox.parentNode.removeChild(entityInfobox);
	}

	var sphereArray = document.querySelectorAll('a-sphere');
	if (sphereArray.length > 0) {
		// sphereArray.forEach(sphere => {
		for (i = 0; i < sphereArray.length; i++) {
			sphereArray[i].parentNode.removeChild(sphereArray[i]);
		}
		// });
	}

	var question = document.querySelector('#question');
	if (question) {
		question.setAttribute('visible', false);
	}

	if (flag != 2) {
		var skyImage = document.querySelector("#skyImage");
		skyImage.setAttribute("src", activeScreen.placeSky);
		resetColor();
		for (let i = 0; i < activeScreen.teleports.length; i++) {
			addHotspot(activeScreen.teleports[i], i);
		}
		for (let i = 0; i < activeScreen.infoboxes.length; i++) {
			addInfoHotspot(activeScreen.infoboxes[i], i);
		}
	}
	addQuestion();
	if (activeScreen.entry_view) {
		var camid = document.querySelector("#cameraId");
		var camrot = camid.getAttribute('rotation');
		var cam = document.querySelector("#CamEntity");
		oldpos = activeScreen.entry_view.split(" ")[1];
		cam.setAttribute('rotation', "0 " + (parseInt(oldpos) - camrot.y) + " 0");
	}
}

function resetColor() {
	var option0 = document.getElementById('textBox0');
	if (option0) {
		option0.setAttribute('text', 'width:60;color:#fff');
		option0.setAttribute('value', '');

		var option1 = document.getElementById('textBox1');
		option1.setAttribute('text', 'width:60;color:#fff');
		option1.setAttribute('value', '');

		var option2 = document.getElementById('textBox2');
		option2.setAttribute('text', 'width:60;color:#fff');
		option2.setAttribute('value', '');

		var option3 = document.getElementById('textBox3');
		option3.setAttribute('text', 'width:60;color:#fff');
		option3.setAttribute('value', '');

	}
}

function addHotspot(teleport, index) {
	if (teleport.teleportToPlaceIndex != null && teleport.teleportToPlaceIndex != undefined) {
		var sceneEl = document.querySelector('a-scene');
		var newHotspot = document.createElement('a-sphere');
		newHotspot.setAttribute('id', "sphere-hotspot-" + index);
		newHotspot.setAttribute('position', teleport.teleportPosition);
		newHotspot.setAttribute('radius', teleport.teleportSize);
		newHotspot.setAttribute('src', teleport.teleportToPlaceImage);
		newHotspot.setAttribute('opacity', teleport.teleportVisibility);
		newHotspot.setAttribute('shader', 'flat');
		if ((teleport.Question != null && teleport.Question != undefined && teleport.Question != "") && (teleport.Options[1].option != "" && teleport.Options[1].option != null && teleport.Options[1].option != undefined)) {
			newHotspot.setAttribute('hotspotclick', '');
		}
		else {
			newHotspot.setAttribute('forward', '');
		}
		newHotspot.setAttribute("class", "clickable");
		newHotspot.setAttribute('sky', '');
		sceneEl.appendChild(newHotspot);
		var hotspot = document.querySelector("#sphere-hotspot-" + index);
		var animation = document.createElement('a-animation');
		animation.setAttribute('attribute', 'rotation');
		animation.setAttribute('dur', '2000');
		animation.setAttribute('easing', 'linear');
		animation.setAttribute('fill', 'forwards');
		animation.setAttribute('to', '0  360 0');
		animation.setAttribute('repeat', 'indefinite');
		animation.setAttribute('end', 'animationEnd-' + index);
		hotspot.appendChild(animation);
		//Hotspot Background
		var hotspotBg = document.createElement("a-sphere");
		hotspotBg.setAttribute("id", "sphere-hotspot-bg-" + index);
		// hotspotBg.setAttribute("radius-inner", teleport.teleportSize - 0.6);
		// hotspotBg.setAttribute("radius-outer", teleport.teleportSize + 0.5);
		hotspotBg.setAttribute("radius", teleport.teleportSize);
		hotspotBg.setAttribute("color", "#fff");
		hotspotBg.setAttribute("position", teleport.teleportPosition);
		hotspotBg.setAttribute("opacity", "0.370");
		hotspotBg.setAttribute("shader", "flat");
		sceneEl.appendChild(hotspotBg);
		var hotspotSphereBG = document.querySelector("#sphere-hotspot-bg-" + index);
		var animationBG = document.createElement("a-animation");
		animationBG.setAttribute("attribute", "scale");
		animationBG.setAttribute("direction", "alternate");
		animationBG.setAttribute("dur", "1000");
		animationBG.setAttribute("fill", "forwards");
		animationBG.setAttribute("from", "0.9 0.9 0.9");
		animationBG.setAttribute("to", "1.2 1.2 1.2");
		animationBG.setAttribute("repeat", "indefinite");
		animationBG.setAttribute("autoplay", "true");
		hotspotSphereBG.appendChild(animationBG);
		//Hotspot Background
	}
}

function addQuestion() {
	var sceneEl = document.querySelector('a-scene');
	var newQuestion = document.createElement('a-entity');
	newQuestion.setAttribute('id', "infoBox1");
	newQuestion.setAttribute('visible', 'false');
	newQuestion.setAttribute('obj-model', 'obj:assets/images/moonlight.obj');
	newQuestion.setAttribute('material', 'src:assets/images/quesboard3_ans2.jpg;side:double;');
	newQuestion.setAttribute('position', '2000 2000 2000');
	newQuestion.setAttribute('scale', '0.5 0.5 0.5');
	newQuestion.setAttribute('look-at', 'src:#cameraId');
	sceneEl.appendChild(newQuestion);

	var question = document.createElement('a-text');
	question.setAttribute('id', "question");
	question.setAttribute('mixin', "questions");
	question.setAttribute('text', 'width:60;color:#fff;align:left;wrapCount:50;');
	question.setAttribute('value', '');
	question.setAttribute('position', '-29.528 12.250 7.473');
	question.setAttribute('scale', '1 1 1');
	question.setAttribute('visible', 'false');
	newQuestion.appendChild(question);
	var aEndAnimation = '';
	aEndAnimation = document.createElement('a-animation');
	aEndAnimation.setAttribute('attribute', "scale");
	aEndAnimation.setAttribute('dur', "3000");
	aEndAnimation.setAttribute('fill', "forwards");
	aEndAnimation.setAttribute('from', "0 0 0");
	aEndAnimation.setAttribute('to', "0.5 0.5 0.5");
	aEndAnimation.setAttribute('begin', "endAnimation");
	newQuestion.appendChild(aEndAnimation);


	//First Option
	var entity1 = document.createElement('a-entity');
	entity1.setAttribute('id', "option0");
	entity1.setAttribute('position', '0 5 5');
	entity1.setAttribute('optionclick', '');
	entity1.setAttribute("class", "clickable");
	entity1.setAttribute('sky', '');
	entity1.setAttribute("geometry", "height:5;width:30");
	entity1.setAttribute("material", "opacity:0;transparent:true;color:#FFFFFF");
	newQuestion.appendChild(entity1);

	var entity1 = document.querySelector('#option0');
	var textBox1 = document.createElement('a-text');
	textBox1.setAttribute('id', "textBox0");
	textBox1.setAttribute('text', 'width:60;color:#fff;wrapCount:50;');
	textBox1.setAttribute('value', '');
	textBox1.setAttribute('position', '-23 0 0');
	entity1.appendChild(textBox1);

	//Second Option
	var entity1 = document.createElement('a-entity');
	entity1.setAttribute('id', "option1");
	entity1.setAttribute('position', '0 0 5');
	entity1.setAttribute('optionclick', '');
	entity1.setAttribute("geometry", "height:5;width:30");
	entity1.setAttribute("material", "opacity:0;transparent:true;color:#FFFFFF");
	newQuestion.appendChild(entity1);

	var entity1 = document.querySelector('#option1');
	var textBox1 = document.createElement('a-text');
	textBox1.setAttribute('id', "textBox1");
	textBox1.setAttribute('text', 'width:60;color:#fff;wrapCount:50;');
	textBox1.setAttribute('value', '');
	textBox1.setAttribute('position', '-23 0 0');
	entity1.appendChild(textBox1);

	//Third Option
	var entity1 = document.createElement('a-entity');
	entity1.setAttribute('id', "option2");
	entity1.setAttribute('position', '0 -4.5 5');
	entity1.setAttribute('optionclick', '');
	entity1.setAttribute('sky', '');
	entity1.setAttribute("class", "clickable");
	entity1.setAttribute("geometry", "height:5;width:30");
	entity1.setAttribute("material", "opacity:0;transparent:true;color:#FFFFFF");
	newQuestion.appendChild(entity1);

	var entity1 = document.querySelector('#option2');
	var textBox1 = document.createElement('a-text');
	textBox1.setAttribute('id', "textBox2");
	textBox1.setAttribute('text', 'width:60;color:#fff;wrapCount:50;');
	textBox1.setAttribute('value', '');
	textBox1.setAttribute('position', '-23 0 0');
	entity1.appendChild(textBox1);

	//Fourth Option
	var entity1 = document.createElement('a-entity');
	entity1.setAttribute('id', "option3");
	entity1.setAttribute('position', '0 -9 5');
	entity1.setAttribute('optionclick', '');
	entity1.setAttribute('sky', '');
	entity1.setAttribute("class", "clickable");
	entity1.setAttribute("geometry", "height:5;width:30");
	entity1.setAttribute("material", "opacity:0;transparent:true;color:#FFFFFF");
	newQuestion.appendChild(entity1);

	var entity1 = document.querySelector('#option3');
	var textBox1 = document.createElement('a-text');
	textBox1.setAttribute('id', "textBox3");
	textBox1.setAttribute('text', 'width:60;color:#fff;wrapCount:50;');
	textBox1.setAttribute('value', '');
	textBox1.setAttribute('position', '-23 0 0');
	entity1.appendChild(textBox1);

	var entity1 = document.createElement('a-image');
	entity1.setAttribute('id', "btn");
	entity1.setAttribute('geometry', 'primitive: sphere;radius: 5000;segmentsWidth: 64;segmentsHeight: 64;"');
	entity1.setAttribute('material', '"shader: flat; src:assets/images/btn.png;');
	entity1.setAttribute('position', '200 200 200');
	entity1.setAttribute('next', '');
	entity1.setAttribute('sky', '');
	entity1.setAttribute("class", "clickable");
	entity1.setAttribute('scale', '15 5 0');
	newQuestion.appendChild(entity1);
}

AFRAME.registerComponent('sky', {
	schema: {
		default: ''
	},
	init() {
		this.el.addEventListener('mouseleave', () => {
			if (experienceStarted === true) {
				var cur = document.querySelector('#cursor');
				cur.emit("startAnimantion");
			}
		});
	}
});

function addInfoHotspot(infobox, index) {
	var sceneEl = document.querySelector('a-scene');
	var hotSpotEntity = document.createElement('a-entity');
	hotSpotEntity.setAttribute('id', 'banner-entity-' + index);
	hotSpotEntity.setAttribute('class', 'banner-entity');
	hotSpotEntity.setAttribute('position', infobox.infoboxPosition);
	hotSpotEntity.setAttribute("look-at", "src: #cameraId");

	sceneEl.appendChild(hotSpotEntity);
	var newHotspot = document.createElement('a-sphere');
	newHotspot.setAttribute('id', "sphere-infohotspot-" + index);
	newHotspot.setAttribute('class', "clickable");
	//newHotspot.setAttribute('color', '#ff0000');
	newHotspot.setAttribute('position', '0 0 0');
	newHotspot.setAttribute('radius', infobox.infoboxSize);
	newHotspot.setAttribute('opacity', infobox.infoboxVisibility);
	newHotspot.setAttribute('shader', 'flat');
	newHotspot.setAttribute('bannerclick', '');
	newHotspot.setAttribute('sky', '');
	if (infobox.infoBannerBgColor) {
		newHotspot.setAttribute('color', infobox.infoBannerBgColor);
	} else {
		newHotspot.setAttribute('color', "#ff0000");
	}
	hotSpotEntity.appendChild(newHotspot);

	var infoboxPlane1 = document.createElement('a-plane');
	infoboxPlane1.setAttribute("id", "infobox-MainPlane-" + index);
	if (infobox.infoBgColor) {
		infoboxPlane1.setAttribute('color', infobox.infoBgColor);
	} else {
		infoboxPlane1.setAttribute('color', "#000000");
	}
	infoboxPlane1.setAttribute('geometry', "height:15;width:30");
	if (infobox.infoBgOpacity) {
		infoboxPlane1.setAttribute('material', "side:double;opacity:" + infobox.infoBgOpacity + ";transparent:true");
	} else {
		infoboxPlane1.setAttribute('material', "side:double;opacity:0.8;transparent:true");
	}
	infoboxPlane1.setAttribute("position", "2000 2000 2000");
	hotSpotEntity.appendChild(infoboxPlane1);

	var infoboxPlane = document.createElement('a-plane');
	infoboxPlane.setAttribute("id", "infobox-plane-" + index);
	infoboxPlane.setAttribute('color', "#000000");
	infoboxPlane.setAttribute('height', "20");
	infoboxPlane.setAttribute('width', "20");
	infoboxPlane.setAttribute('geometry', "height:15;width:30");
	infoboxPlane.setAttribute('material', "side:double;opacity:0;transparent:true");
	infoboxPlane.setAttribute("scale", "5 5 5");
	infoboxPlane.setAttribute("position", "2000 2000 2000");
	infoboxPlane.setAttribute("visible", "false");
	hotSpotEntity.appendChild(infoboxPlane);
	if (infobox.infoboxType === "Image") {
		if (infobox.imagePath) {
			infoboxPlane.setAttribute('color', "#fff");
			infoboxPlane.setAttribute("material", "src", '');
			infoboxPlane.setAttribute('geometry', "height:16.88;width:30");
			infoboxPlane.setAttribute('material', "side:double;opacity:1;shader:flat");
			infoboxPlane.setAttribute("material", "src", infobox.imagePath);
		}
	} else if (infobox.infoboxType === "Text") {
		var infoboxText = document.createElement('a-text');
		infoboxText.setAttribute("text", "width:28;baseline:top;wrapCount:48;lineHeight:50");
		infoboxText.setAttribute("value", infobox.text);
		infoboxText.setAttribute("position", "-13.86466 5.9 1.12607");
		if (infobox.infoFontColor) {
			infoboxText.setAttribute("color", infobox.infoFontColor);
		}
		infoboxPlane.appendChild(infoboxText);
	}

	var infoboxOverlay = document.createElement('a-entity');
	infoboxOverlay.setAttribute("id", "overlay-plane-" + index);
	infoboxOverlay.setAttribute("obj-model", "obj:assets/images/moonlight.obj");
	infoboxOverlay.setAttribute("material", "src:assets/images/tvscreenplane.jpg;side:double;transparent:true;opacity:0");
	infoboxOverlay.setAttribute('class', "clickable");
	infoboxOverlay.setAttribute('infobox-leave', '');
	infoboxOverlay.setAttribute("scale", "0.6 0.6 0.6");
	infoboxOverlay.setAttribute('visible', 'false');
	infoboxOverlay.setAttribute('position', "2000 2000 2000");
	infoboxOverlay.setAttribute("look-at", "src: #cameraId");
	sceneEl.appendChild(infoboxOverlay);
	

	var startAnimation = document.createElement('a-animation');
	startAnimation.setAttribute('attribute', "scale");
	startAnimation.setAttribute('dur', "1000");
	startAnimation.setAttribute('fill', "forwards");
	startAnimation.setAttribute('from', "0 0 0");
	startAnimation.setAttribute('to', "1 1 1");
	startAnimation.setAttribute('begin', "startAnimation");
	infoboxPlane.appendChild(startAnimation);

	var endAnimation = document.createElement('a-animation');
	endAnimation.setAttribute('attribute', "scale");
	endAnimation.setAttribute('dur', "1500");
	endAnimation.setAttribute('fill', "forwards");
	endAnimation.setAttribute('from', "1 1 1");
	endAnimation.setAttribute('to', "0 0 0");
	endAnimation.setAttribute('begin', "endAnimation");
	infoboxPlane.appendChild(endAnimation);

	var startAnimation1 = document.createElement('a-animation');
	startAnimation1.setAttribute('attribute', "scale");
	startAnimation1.setAttribute('dur', "1000");
	startAnimation1.setAttribute('fill', "forwards");
	startAnimation1.setAttribute('from', "0 0 0");
	startAnimation1.setAttribute('to', "1 1 1");
	startAnimation1.setAttribute('begin', "startAnimation1");
	infoboxPlane1.appendChild(startAnimation1);

	var endAnimation1 = document.createElement('a-animation');
	endAnimation1.setAttribute('attribute', "scale");
	endAnimation1.setAttribute('dur', "1500");
	endAnimation1.setAttribute('fill', "forwards");
	endAnimation1.setAttribute('from', "1 1 1");
	endAnimation1.setAttribute('to', "0 0 0");
	endAnimation1.setAttribute('begin', "endAnimation1");
	infoboxPlane1.appendChild(endAnimation1);

}

AFRAME.registerComponent('bannerclick', {
	init: function () {
		this.el.addEventListener('click', function () {
			if (experienceStarted === true) {
				if (this.getAttribute('id').split("-")[1] == "infohotspot") {
					var selectedInfobox = activeScreen.infoboxes[this.getAttribute('id').split("-")[2]];
					var bannerEntity = document.querySelector("#banner-entity-" + this.getAttribute('id').split("-")[2]);
					var infoBox = document.querySelector("#infobox-plane-" + this.getAttribute('id').split("-")[2]);
					var MainPlain = document.querySelector("#infobox-MainPlane-" + this.getAttribute('id').split("-")[2]);					
					var overlay = document.querySelector("#overlay-plane-" + this.getAttribute('id').split("-")[2]);
					var bannerPosition = bannerEntity.getAttribute("position");
					bannerEntity.setAttribute("scale","2 2 2");
					infoBox.setAttribute('position', '0 0 -10');
					MainPlain.setAttribute('position', '0 0 -10');
					this.setAttribute('position', '200 200 0');
					this.setAttribute('visible', 'false');
					infoBox.setAttribute("visible", "true");
					MainPlain.setAttribute("visible", "true");
					// var pod = bannerPosition.split(" ");
					overlay.setAttribute('position', newPos(bannerPosition.x, bannerPosition.y, bannerPosition.z));
					infoBox.emit("startAnimation");
					MainPlain.emit("startAnimation1");
					if (selectedInfobox.infoboxType === "Image") {
						MainPlain.setAttribute("visible", "false");				
					}
					isInfoboxClick = true;

					// setTimeout(()=>{
					// 	 isInfoboxClick = true;
					// },1500);
				}
			}
		});
		this.el.addEventListener('mouseleave', () => {
			if (experienceStarted === true) {
				var cur = document.querySelector('#cursor');
				cur.emit("startAnimantion");
			}
		});
		// this.el.addEventListener('mouseleave', function () {
		// 	if (experienceStarted === true) {
		// 		if (this.getAttribute('id').split("-")[1] == "infohotspot") {
		// 			var infoBox = document.querySelector("#infobox-plane-" + this.getAttribute('id').split("-")[2]);
		// 			infoBox.setAttribute("visible", "false");
		// 		}
		// 	}
		// });
	}
});

AFRAME.registerComponent('infobox-leave', {
	init: function () {
		this.el.addEventListener('mouseleave', function () {
			if (experienceStarted === true) {
				var cur = document.querySelector('#cursor');
				cur.emit("startAnimantion");

				if (isInfoboxClick) {
					var cur = document.querySelector('#cursor');
					cur.emit("startAnimantion");
					var infoBox = document.querySelector("#infobox-plane-" + this.getAttribute('id').split("-")[2]);
					var MainPlain = document.querySelector("#infobox-MainPlane-" + this.getAttribute('id').split("-")[2]);
					var bannerEntity = document.querySelector("#banner-entity-" + this.getAttribute('id').split("-")[2]);
					
					infoBox.emit("endAnimation");
					MainPlain.emit("endAnimation1");
					

					setTimeout(() => {
						bannerEntity.setAttribute("scale","1 1 1");
						infoBox.setAttribute("visible", "false");
						var sphere = document.querySelector("#sphere-infohotspot-" + this.getAttribute('id').split("-")[2]);
						var overlay = document.querySelector("#overlay-plane-" + this.getAttribute('id').split("-")[2]);
						sphere.setAttribute('visible', 'true');
						sphere.setAttribute('position', '0 0 0');
						overlay.setAttribute('position', '2000 2000 2000');
						infoBox.setAttribute('position', '2000 2000 2000');
					}, 1500);
					isInfoboxClick = false;
				}
			}
		});
	}
});

function newPos(x, y, z) {
	var r = Math.pow(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2), 0.5);
	var phy = Math.acos(z / r);
	var thita = Math.asin(y / (r * Math.sin(phy)));
	if ((x < 0 && z < 0) || (x < 0 && z > 0)) {
		phy = -phy;//+ (Math.PI);
		thita = -thita;
	}
	r = r - 1;
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

AFRAME.registerComponent('forward', {
	init: function () {
		this.el.addEventListener('click', () => {
			if (experienceStarted === true) {
				var placeIndex = Object.keys(walkArroundJson.Nodes).find(key => walkArroundJson.Nodes[key].placeIndex === parseInt(activeScreen.teleports[this.el.getAttribute('id').split("-")[2]].teleportToPlaceIndex));
				activeScreen = walkArroundJson.Nodes[parseInt(placeIndex)];
				questionReportArray.push(questionJsonArray);
				cleanQuestionJSONArray();
				generateRoom(activeScreen);
			}
		});
		this.el.addEventListener('mouseleave', () => {
			if (experienceStarted === true) {
				var cur = document.querySelector('#cursor');
				cur.emit("startAnimantion");
			}
		});
	}
});