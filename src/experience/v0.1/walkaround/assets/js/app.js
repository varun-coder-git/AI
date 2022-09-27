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

  var loadedAscene = false;
  var loadedAassets = false;

AFRAME.registerComponent('mouseclick', {
	init: function () {
		// this.el.addEventListener('click', function () {
		// 	if (selectedHotspot === this)
		// 		selectedHotspot = null;
		// 	else {
		// 		selectedHotspot = this;
		// 		openSidenav(selectedHotspot);
		// 	}
		// 	toggleToolbarButtons(selectedHotspot);
		// });
		this.el.addEventListener('click', function () {
			selectedHotspot = this;
			openSidenav(selectedHotspot);
			toggleToolbarButtons(selectedHotspot);
			});
		this.el.addEventListener('dragstart', function () {
			var teleportTextEle = document.querySelector("#text-" + this.getAttribute('id'));
			teleportTextEle.setAttribute("visible", false);
		});
		this.el.addEventListener('dragging', function () {
			var teleportTextEle = document.querySelector("#text-" + this.getAttribute('id'));
			teleportTextEle.setAttribute("visible", false);
		});
		this.el.addEventListener('dragend', function () {
			var teleportTextPlane = document.querySelector("#text-" + this.getAttribute('id'));
			var newPosition= this.getAttribute('position');
			var newTeleportSize = this.getAttribute('geometry');
			var updatedPosition = newPos(newPosition.x,newPosition.y,newPosition.z)
			this.setAttribute('position', updatedPosition);
			teleportTextPlane.setAttribute("position", updatedPosition);
			var teleportText = document.querySelector("#text-" + this.getAttribute('id' )+" > a-text");
			teleportText.setAttribute("position", "0 "+ (-newTeleportSize.radius-2) +" 0");
			teleportTextPlane.setAttribute("visible", true);
			updateHotspotPosition(this);
		});
	}
});


AFRAME.registerComponent('disable-inspector', {
	init: function () {
		this.el.components.inspector.remove();
	}
});

function toggleSideNav(sidenavId) {
	var sidenavList = document.getElementsByClassName("sidenav");
	[].forEach.call(sidenavList, function (navigation) {
		if (navigation.classList.contains('active') && navigation.id != sidenavId)
			navigation.classList.remove('active');
	});
	document.getElementById(sidenavId).classList.toggle("active");
	for (i = 0; i < experianceJSON.Nodes.length; i++) {
		$('#' + sidenavId + ' > .accordion-class > .card:nth-child('+(experianceJSON.Nodes[i].placeIndex+1)+') > .collapse').removeClass("show");  
	}
		if(selectedNode){
			$('#' + sidenavId + ' > .accordion-class > .card:nth-child('+(selectedNode.placeIndex+1)+') > .collapse').addClass("show");
    }
		// $('#' + sidenavId + ' > .accordion-class > .card > .collapse').removeClass("show");
		else
		$('#' + sidenavId + ' > .accordion-class > .card:nth-child(1) > .collapse').addClass("show");
	

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
function toggleToolbarButtons(selectedSphere) {
	if (selectedSphere === null || selectedSphere === undefined) {
		document.getElementById('editTeleport').classList.add('disabled');
		document.getElementById('removeTeleport').classList.add('disabled');
		document.getElementById('editInfobox').classList.add('disabled');
		document.getElementById('removeInfobox').classList.add('disabled');
	}
	else if (selectedSphere.getAttribute('type') == 'teleport') {
		document.getElementById('editTeleport').classList.remove('disabled');
		document.getElementById('removeTeleport').classList.remove('disabled');
		document.getElementById('editInfobox').classList.add('disabled');
		document.getElementById('removeInfobox').classList.add('disabled');
	}
	else if (selectedSphere.getAttribute('type') == 'infobox') {
		document.getElementById('editInfobox').classList.remove('disabled');
		document.getElementById('removeInfobox').classList.remove('disabled');
		document.getElementById('editTeleport').classList.add('disabled');
		document.getElementById('removeTeleport').classList.add('disabled');
	}
}

function openSidenav(selectedHotspot) {

	if (selectedHotspot.getAttribute('type') == 'teleport') {
		toggleSideNav('teleportSidenav');
		$('#teleport-accordion').find('.collapse').collapse('hide');
		$("#collapse-teleport-" + selectedHotspot.getAttribute('id')).addClass("show");
	}
	else if (selectedHotspot.getAttribute('type') == 'infobox') {
		toggleSideNav('infoboxSidenav');
		$('#infobox-accordion').find('.collapse').collapse('hide');
		$("#collapse-" + selectedHotspot.getAttribute('id')).addClass("show");
	}
}

function updateHotspotPosition(sphereEle) {
	if (sphereEle) {
		var sphereType = sphereEle.getAttribute('type');
		var spherePosition = sphereEle.getAttribute('position');
		nodes.forEach(node => {
			if (selectedNode.id === node.id) {
				if (sphereType === 'teleport') {
					selectedNode.teleports.forEach(teleport => {
						if (sphereEle.getAttribute('id') == teleport.teleportID) {
							teleport.teleportPosition = "" + spherePosition.x + " " + spherePosition.y + " " + spherePosition.z;
						}
					});
					// selectedNode.teleports[sphereEle.id.split("teleport-")[1]].teleportPosition = "" + spherePosition.x + " " + spherePosition.y + " " + spherePosition.z;
				}
				else if (sphereType === 'infobox') {
					selectedNode.infoboxes.forEach(infobox => {
						if (sphereEle.getAttribute('id') == infobox.infoboxID) {
							infobox.infoboxPosition = "" + spherePosition.x + " " + spherePosition.y + " " + spherePosition.z;
						}
					});
					// selectedNode.infoboxes[sphereEle.id.split("infobox-")[1]].infoboxPosition = "" + spherePosition.x + " " + spherePosition.y + " " + spherePosition.z;
				}
			}
		});
	}
}


$(document).ready(function(){
	$("#loaderq").hide();
	document.getElementById("loaderoverlay").style.display = "none";

	
});


function newPos(x, y, z){
	var r = Math.pow(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2), 0.5);
	var phy =Math.acos(z/r);
	var thita = Math.asin(y/(r*Math.sin(phy)));
	// phy = toDegrees(phy);
	// thita = toDegrees(thita);
	// thita -= 8;
	// phy = toRadians(phy);
	// thita = toRadians(thita);

	if((x < 0 && z < 0) || (x < 0 && z > 0)){
			phy = -phy ;//+ (Math.PI);
			thita= -thita;
	}
	r = 50;
	var newx = r*Math.sin(phy)*Math.cos(thita);
	var newy = r*Math.sin(phy)*Math.sin(thita);
	var newz = r*Math.cos(phy);
	// if(phy < -2.7 || phy > 2.7){
	// 	 newy -= 5;
	// 	 }
	// if(phy > -0.5 && phy < 0.5){
	// 	 newy -= 5;
	// 	 }
// var hotp = document.querySelector('#sphere-0');
// hotp.setAttribute('position',newx +' '+ newy +' '+ newz);
// console.log(phy, thita,newx, newy, newz);
	return newx +' '+ newy +' '+ newz;
}
function toDegrees (angle) {
return angle * (180 / Math.PI);
}
function toRadians (angle) {
return angle * (Math.PI / 180);
}