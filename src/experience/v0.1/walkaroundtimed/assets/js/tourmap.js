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
var isNewExperience = true;
var experianceID = 0;
var assettype;
var elementToUpdate;
var selectedElementIndex;
var splashImagePath;
// var previousPlaceImagePath;
var mapLable = "Toggle between the 360 View & the Map View";



$("#fixOpacity").on("input", function () {
  fixOpacity = $(this).val();
  experianceJSON.Opacity = fixOpacity;
  var displayvalue = '(' + Math.round(fixOpacity * 100) + '%)';
  document.getElementById("rangeValue").innerText = displayvalue;
  document.getElementById("splashBackground").style.opacity = fixOpacity;
});

function checkTextAreaLength(){
  var Length = $("#prelaunchText").val().length;
  var maxLen = 150;
      if(Length >= maxLen){
          popSnackbar("warning", "Limit exceed.");
          return;
      }
}

function initializeCustomization(experienceToCustomize) {

  experianceJSON = JSON.parse(experienceToCustomize);

  if (experianceJSON.launch_text) {
    document.getElementsByClassName("lunchScreenText").value = experianceJSON.launch_text;
    $('.lunchScreenText').summernote('code', experianceJSON.launch_text);
    
  var lauchText = $(".lunchScreenText");
  var div = document.createElement("div");
  div.innerHTML = lauchText[0].value;
  var plainText = div.textContent || div.innerText || "";
      var maxLength = 350;
      $('#maxCount').text( plainText.length);
     
  }
  if (experianceJSON.background_sound) {
    $('#environment-audio-name').text(experianceJSON.background_sound.split('/').pop());
    $('#environment-audio-path').text(experianceJSON.background_sound);
  }
  else {
    $('#environment-audio-name').text("Choose Background Audio");
  }
  if (experianceJSON.countdown_timer) {
    $("#countDownTimer").val(experianceJSON.countdown_timer)
  }
  if (experianceJSON.splash_image) {
    splashImagePath = experianceJSON.splash_image;
    var splashImageName = splashImagePath.split("/")[splashImagePath.split("/").length - 1];
    $("#splashImageLable>span").text(splashImageName);
  }
  // if (experianceJSON["entry_view"]) {
  //   $("#CamEntity").attr("rotation", experianceJSON["entry_view"]);
  // }
  if (experianceJSON.splash_instruction) {
    document.getElementsByClassName("instructionSetForDesktop").value = experianceJSON.splash_instruction;
    $('.instructionSetForDesktop').summernote('code', experianceJSON.splash_instruction);
  }
  if (experianceJSON.splash_android_instruction) {
		document.getElementsByClassName("instructionSetForAndroid").value = experianceJSON.splash_android_instruction;
		$('.instructionSetForAndroid').summernote('code', experianceJSON.splash_android_instruction);
	}

  if (experianceJSON.Success_Message) {
    document.getElementById("SuccessMessage").value = experianceJSON.Success_Message;
  } else {
    document.getElementById("SuccessMessage").value = "Wow! You'v done it! and you took ";
  }
  if (experianceJSON.Total_Marks) {
    document.getElementById("totalMarks").value = experianceJSON.Total_Marks;
  } else {
    document.getElementById("totalMarks").value = 0;
  }
  if (experianceJSON.Failuer_Message) {
    document.getElementById("failuerMessage").value = experianceJSON.Failuer_Message;
  } else {
    document.getElementById("failuerMessage").value = "Oops! Better luck next time! and you took";
  }

  if (experianceJSON.prelaunch_timer) {
    $("#prelaunchTimer").val(experianceJSON.prelaunch_timer)
  } else {
    $("#prelaunchTimer").val(10);
  }
  if (experianceJSON.prelaunch_image) {
    $('#prelaunchBgLabel>span').text(experianceJSON.prelaunch_image.split('/').pop());
    $('#prelaunchBgPreview').attr('src', experianceJSON.prelaunch_image);
  }
  if (experianceJSON.prelaunch_text) {
    document.getElementById("prelaunchText").value = experianceJSON.prelaunch_text;
  } else {
    document.getElementById("prelaunchText").value = "Here we go";
  }
  if (experianceJSON.splashBackgroundColor) {
    var splashBackground = document.getElementById("splashBackground");
    splashBackground.value = experianceJSON.splashBackgroundColor;
    if ((splashBackground.value).includes('#')) {
      splashBackground.style.backgroundColor = splashBackground.value;
    } else {
      splashBackground.style.backgroundColor = '#' + splashBackground.value;
    }
  } else {
    var defaultBackground = document.getElementById("splashBackground");
    defaultBackground.style.backgroundColor = '#8F8F8F';
    defaultBackground.value = '#8F8F8F';
  }
  if (experianceJSON.Opacity) {
    var opacity = document.getElementById("fixOpacity")
    opacity.value = experianceJSON.Opacity;
    var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    document.getElementById("splashBackground").style.opacity = opacity.value;
  } else {
    var opacity = document.getElementById("fixOpacity")
    opacity.value = fixOpacity;
    var displayvalue = '(' + Math.round(fixOpacity * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    experianceJSON.Opacity = fixOpacity;
    document.getElementById("splashBackground").style.opacity = fixOpacity;
  }
  if (experianceJSON.splashHeaderColor) {
    var splashHeaderColor = document.getElementById('splashHeaderColor')
    splashHeaderColor.value = experianceJSON.splashHeaderColor;
    if ((splashHeaderColor.value).includes('#')) {
      splashHeaderColor.style.backgroundColor = splashHeaderColor.value;
    } else {
      splashHeaderColor.style.backgroundColor = '#' + splashHeaderColor.value;
    }
  }
  drawMap();
}
function setEntryView() {
  if ($('#freezeView').hasClass('disabled')) {
    //Nothing to do here
  } else {
    var cam = document.querySelector("[camera]");
    var pos = cam.getAttribute("rotation");
    var oldpos = 0;
    if (selectedNode.entry_view) {
      oldpos = selectedNode.entry_view.split(" ")[1];
    }
    selectedNode.entry_view = "0 " + (pos.y + parseInt(oldpos)) + " 0";
    $('#freezeView').addClass('disabled');
    $('#freezeView').click(toastr.success('Presto! This view is now the Launch View of this Place.'));
  }
}
$('div#scene').mouseup(function () {
  $('#freezeView').removeClass('disabled');
});

function getExperienceToSave() {
  var dataToSave = {};
  addPrelaunchTimer();
  addSuccessMessage();
  addFailuerMessage();
  addTotalMarks();
  addPreLaunchScreenText();
  var lauchText = $(".lunchScreenText");

  var lunchTextItem = lauchText[0].value;
  dataToSave.launch_text = lunchTextItem;
  
  var splashInstruction = $(".instructionSetForDesktop");
  var item = splashInstruction[0].value;
  dataToSave.splash_instruction = item;

  var splashAndroidInstruction=$(".instructionSetForAndroid")
	var item = splashAndroidInstruction[0].value;
  dataToSave.splash_android_instruction=item;

  // dataToSave.entry_view = experianceJSON.entry_view;
  dataToSave.countdown_timer = experianceJSON.countdown_timer;
  dataToSave.prelaunch_timer = experianceJSON.prelaunch_timer;
  dataToSave.prelaunch_image = experianceJSON.prelaunch_image;
  dataToSave.prelaunch_text = experianceJSON.prelaunch_text;
  dataToSave.Success_Message = experianceJSON.Success_Message;
  dataToSave.Total_Marks = experianceJSON.Total_Marks;
  dataToSave.Failuer_Message = experianceJSON.Failuer_Message;

  dataToSave.background_sound = experianceJSON.background_sound;
  dataToSave.splash_image = splashImagePath;

  var headerFont = $(".headerfont");
  var headerFontColor = headerFont[0].value;
  if (headerFontColor.includes('#')) {
    dataToSave.splashHeaderColor = headerFontColor;
  } else {
    dataToSave.splashHeaderColor = '#' + headerFontColor;
  }

  var splashbg = $(".splashBg");
  var splashBgColor = splashbg[0].value;
  if (splashBgColor.includes('#')) {
    dataToSave.splashBackgroundColor = splashBgColor;
  } else {
    dataToSave.splashBackgroundColor = '#' + splashBgColor;
  }


  if (dataToSave.Opacity) {
    var opacity = document.getElementById("fixOpacity");
    opacity.value = dataToSave.Opacity;
    var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    experianceJSON.Opacity = fixOpacity;
  } else {
    dataToSave.Opacity = experianceJSON.Opacity;
  }

  dataToSave.Nodes = [];
  var endNodeAdded = false;
  nodes.forEach(node => {
    if (node.isEndNode) {
      endNodeAdded = true;
    }
    node.x = 0;
    node.y = 0;
    node.vx = 0;
    node.vy = 0;
    dataToSave.Nodes.push(node);
  });
  if (!endNodeAdded) {
    popSnackbar("warning", "Did you forget to add end place? We've marked '" + nodes[nodes.length - 1].placeName + "' as end place.");
    nodes[nodes.length - 1].isEndNode = true;
    nodes[nodes.length - 1].endMessage = "";
    dataToSave.Nodes[dataToSave.Nodes.length - 1].isEndNode = true;
    dataToSave.Nodes[dataToSave.Nodes.length - 1].endMessage = "";
  }
  var dataToPost = JSON.stringify(dataToSave);
  drawMap();
  return dataToPost;
}

function uploadImage(element, id, placeId) {
  if (element === "Place")
    assettype = '360Image';
  else if (element === "Infobox")
    assettype = 'Image';

  elementToUpdate = element;
  selectedElementIndex = id;
  selectedPlaceToAssign = placeId;
  window.parent.triggerAssetsPopup();
}
function uploadInfoboxAudio(element, id, placeId) {
    assettype = 'Audio';

  elementToUpdate = element;
  selectedElementIndex = id;
  selectedPlaceToAssign = placeId;
  window.parent.triggerAssetsPopup();
}


function changeSplashImage() {
  assettype = 'Image';
  elementToUpdate = "Splash";
  window.parent.triggerAssetsPopup();
}

function changePrelaunchImage() {
  assettype = 'Image';
  elementToUpdate = "Prelaunch";
  window.parent.triggerAssetsPopup();
}

function getAssetType() {
  return assettype;
}

function getAssetPath(assetPath) {
  if(assetPath==undefined || assetPath==""){
    return;
  }
  $("#freezeView").removeClass("hidden-label");
  $("#freezeView").addClass("visible");
  bindAssetPath(assetPath);
}

function bindAssetPath(assetPath) {
  switch (elementToUpdate) {
    case 'Splash':
      splashImagePath = assetPath;
      var splashImageName = splashImagePath.split("/")[splashImagePath.split("/").length - 1];
      $("#splashImageLable>span").text(splashImageName);
      break;
    case 'Prelaunch':
      $('#prelaunchBgLabel>span').text(assetPath.split('/').pop());
      $('#prelaunchBgPreview').attr('src', assetPath);
      experianceJSON.prelaunch_image = assetPath;
      break;
    case 'Place':
      if (assetPath != "") {
      var previousPlaceImagePath = assetPath;
      $('#place-sky-image-' + selectedElementIndex)[0].children[0].innerText = assetPath.split('/').pop();
      $("#place-image-path-" + selectedElementIndex).text(assetPath);
      $("#sky-image-preview-" + selectedElementIndex).attr('src', assetPath);
      addPlaceSkyToJSON(selectedElementIndex);
      }else{
        var placeElementIndex = $("#place-sky-image-" + selectedElementIndex);
      placeElementIndex[0].children[0].innerText = previousPlaceImagePath
        .split("/")
        .pop();
      $("#place-image-path-" + selectedElementIndex).text(
        previousPlaceImagePath
      );
      $("#sky-image-preview-" + selectedElementIndex).attr(
        "src",
        previousPlaceImagePath
      );
      addPlaceSkyToJSON(selectedElementIndex);
      }
      break;
    case 'Infobox':
      $('#infobox-image-label-' + selectedElementIndex)[0].children[0].innerText = assetPath.split('/').pop();
      $('#infobox-image-path-' + selectedElementIndex).text(assetPath);
      $("#infobox-image-preview-" + selectedElementIndex).attr('src', assetPath);
      saveInfoboxImageOnChange(selectedElementIndex);
      break;
    case 'EnvironmentAudio':
      $('#environment-audio-name').text(assetPath.split('/').pop());
      $('#environment-audio-path').text(assetPath);
      experianceJSON.background_sound = assetPath;
      break;
    // case 'placeAudio':
    //     var placeElementIndex = $('#place-sky-audio-' + selectedElementIndex);
    //     placeElementIndex[0].children[0].innerText = assetPath.split('/').pop();
    //     $("#place-audio-path-" + selectedElementIndex).text(assetPath);
    //     addPlaceSkyToJSON(selectedElementIndex);
    //   break;
    case 'InfoboxAudio':
      $('#infobox-audio-label-' + selectedElementIndex)[0].children[0].innerText = assetPath.split('/').pop();
      $('#infobox-audio-path-' + selectedElementIndex).text(assetPath);
      $("#infobox-audio-preview-" + selectedElementIndex).attr('src', assetPath);
      saveInfoboxAudioOnChange(selectedElementIndex);
      break;
    default:
      console.warning('element To Update', elementToUpdate);
      break;
  }


  // if(elementToUpdate === 'Splash') {
  // } else if (elementToUpdate === 'Place') {

  // }
  // else if (elementToUpdate === 'Infobox') {

  // }
  // else if (elementToUpdate === "EnvironmentAudio") {

  // }
}

const width = document.getElementById('graph').clientWidth;
const height = document.getElementById('graph').clientHeight - 5;
const colors = d3.scaleOrdinal(d3.schemeCategory10);

function drawMap() {
  if (nodes.length <= 0) {
    experianceJSON.Nodes.forEach(place => {
      place.x = 0,
        place.y = 0;
      nodes.push(place);
      lastNodeId = place.id;
      place.teleports.forEach(teleport => {
        var targetNode = null;
        var sourceNode = place;
        for (i = 0; i < experianceJSON.Nodes.length; i++) {
          if (parseInt(teleport.teleportToPlaceIndex) === experianceJSON.Nodes[i].placeIndex)
            targetNode = experianceJSON.Nodes[i];
        }
        if (targetNode != null) {
          link = { source: sourceNode, target: targetNode, left: false, right: true };
          links.push(link);
        }
      });
    });
  }
  else {
    links = [];
    nodes.forEach(place => {
      place.teleports.forEach(teleport => {
        var targetNode = null;
        var sourceNode = place;
        for (i = 0; i < nodes.length; i++) {
          if (parseInt(teleport.teleportToPlaceIndex) === nodes[i].placeIndex)
            targetNode = nodes[i];
        }
        if (targetNode != null) {
          link = { source: sourceNode, target: targetNode, left: false, right: true };
          links.push(link);
        }
      });
    });
  }
  restart();
  var placeId = null;
  if (selectedNode) {
    placeId = selectedNode.placeIndex;
  }
  addPlaceCards(nodes, placeId);
}

svg = d3.select('#graph')
  .append('svg')
  .attr('oncontextmenu', 'graph-svg')
  .attr('id', 'return false;');
// .attr('width', width)
// .attr('height', height);

// init D3 force layout
force = d3.forceSimulation()
  .force('link', d3.forceLink().id((d) => d.id).distance(150))
  .force('charge', d3.forceManyBody().strength(-500))
  .force('x', d3.forceX(width / 2))
  .force('y', d3.forceY(height / 2))
  .on('tick', tick);

svg.append('svg:defs').append('svg:marker')
  .attr('id', 'end-arrow')
  .attr('viewBox', '0 -5 10 10')
  .attr('refX', 6)
  .attr('markerWidth', 5)
  .attr('markerHeight', 5)
  .attr('orient', 'auto')
  .append('svg:path')
  .attr('d', 'M0,-5L10,0L0,5')
  .attr('fill', '#000');

svg.append('svg:defs').append('svg:marker')
  .attr('id', 'start-arrow')
  .attr('viewBox', '0 -5 10 10')
  .attr('refX', 4)
  .attr('markerWidth', 5)
  .attr('markerHeight', 5)
  .attr('orient', 'auto')
  .append('svg:path')
  .attr('d', 'M10,-5L0,0L10,5')
  .attr('fill', '#000');

dragLine = svg.append('svg:path')
  .attr('class', 'link dragline hidden')
  .attr('d', 'M0,0L0,0');

path = svg.append('svg:g').selectAll('path');
circle = svg.append('svg:g').selectAll('g');

selectedNode = null;
selectedLink = null;
mousedownLink = null;
mousedownNode = null;
mouseupNode = null;

function resetMouseVars() {
  mousedownNode = null;
  mouseupNode = null;
  mousedownLink = null;
}

function tick() {
  path.attr('d', (d) => {
    const deltaX = d.target.x - d.source.x;
    const deltaY = d.target.y - d.source.y;
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const normX = deltaX / dist;
    const normY = deltaY / dist;
    const sourcePadding = d.left ? 17 : 12;
    const targetPadding = d.right ? 17 : 12;
    const sourceX = d.source.x + (sourcePadding * normX);
    const sourceY = d.source.y + (sourcePadding * normY);
    const targetX = d.target.x - (targetPadding * normX);
    const targetY = d.target.y - (targetPadding * normY);

    return `M${sourceX},${sourceY}L${targetX},${targetY}`;
  });

  circle.attr('transform', (d) => `translate(${d.x},${d.y})`);
}

function restart() {
  path = path.data(links);

  path.classed('selected', (d) => d === selectedLink)
    .style('marker-start', (d) => d.left ? 'url(#start-arrow)' : '')
    .style('marker-end', (d) => d.right ? 'url(#end-arrow)' : '');

  path.exit().remove();

  path = path.enter().append('svg:path')
    .attr('class', 'link')
    .classed('selected', (d) => d === selectedLink)
    .style('marker-start', (d) => d.left ? 'url(#start-arrow)' : '')
    .style('marker-end', (d) => d.right ? 'url(#end-arrow)' : '')
    .on('mousedown', (d) => {
      if (d3.event.ctrlKey) return;

      mousedownLink = d;
      selectedLink = (mousedownLink === selectedLink) ? null : mousedownLink;
      selectedNode = null;
      restart();
    })
    .merge(path);

  circle = circle.data(nodes, (d) => d.id);
  circle.selectAll('circle')
    .attr('transform', (d) => (d === selectedNode) ? 'scale(1.3)' : 'scale(1)')
    .style('fill', (d) => (d === selectedNode) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id))
  circle.exit().remove();
  const g = circle.enter().append('svg:g');

  g.append('svg:circle')
    .attr('class', 'node')
    .attr('r', 12)
    .style('fill', (d) => (d === selectedNode) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id))
    .style('stroke', (d) => d3.rgb(colors(d.id)).darker().toString())
    .on('mouseover', function (d) {
      if (!mousedownNode || d === mousedownNode) return;
      d3.select(this).attr('transform', 'scale(1.1)');
    })
    .on('mouseout', function (d) {
      if (!mousedownNode || d === mousedownNode) return;
      d3.select(this).attr('transform', '');
    })
    .on('mousedown', (d) => {
      if (d3.event.ctrlKey) return;
      mousedownNode = d;
      selectedNode = (mousedownNode === selectedNode) ? null : mousedownNode;
      if (selectedNode == null)
        $('#place-accordion').find('.collapse').collapse('hide');
      toggleToolbarPlaceButtons(selectedNode);
      addInfoboxCards(selectedNode);
      addTeleportCards(selectedNode);
      selectedLink = null;
      dragLine
        // .style('marker-end', 'url(#end-arrow)')
        .classed('hidden', false)
        .attr('d', `M${mousedownNode.x},${mousedownNode.y}L${mousedownNode.x},${mousedownNode.y}`);
      restart();
    })
    .on('mouseup', function (d) {
      if (!mousedownNode) return;
      dragLine
        .classed('hidden', true)
        .style('marker-end', '');
      mouseupNode = d;
      if (mouseupNode === mousedownNode) {
        resetMouseVars();
        return;
      }
      d3.select(this).attr('transform', '');
      restart();
    });

  g.append('svg:text')
    .attr('x', 0)
    .attr('y', 30)
    .attr('class', 'id')
    .attr('id', function (d) {
      return "place-text-" + d.id
    })
    .text(function (d) {
      return d.placeName
    }
    );

  circle = g.merge(circle);

  force
    .nodes(nodes)
    .force('link').links(links);

  force.alphaTarget(0.3).restart();

}

function mousedown() {
  svg.classed('active', true);
  if (d3.event.ctrlKey || mousedownNode || mousedownLink) return;
}

function mouseup() {
  if (mousedownNode) {
    // hide drag line
    dragLine
      .classed('hidden', true)
      .style('marker-end', '');
  }

  // because :active only works in WebKit?
  svg.classed('active', false);

  // clear mouse event vars
  resetMouseVars();
}

function spliceLinksForNode(node) {
  const toSplice = links.filter((l) => l.source === node || l.target === node);
  for (const l of toSplice) {
    links.splice(links.indexOf(l), 1);
  }
}

// app starts here
svg.on('mousedown', mousedown)
  .on('mouseup', mouseup);
restart();

function addNewPlace(flag) {
  svg.classed('active', true);
  const newPlace = { id: ++lastNodeId, nodeIndex: lastNodeId, placeName: "New place", placeIndex: lastNodeId, placeSky: "assets/images/DefaultNightSky.jpg", placeImageName: "DefaultNightSky.jpg", isEndNode: false, endMessage: "", teleports: [], infoboxes: [] };
  experianceJSON.Nodes.push(newPlace);
  nodes.push(newPlace);
  addPlaceCards(nodes, lastNodeId);
  restart();
  if(flag){  
    toggleSideNav('placeSidenav');
  }
  $('#place-accordion').find('.collapse').collapse('hide');
  $("#collapse-place-" + lastNodeId).addClass("show");
}

function removePlace() {
  if (nodes.length == 2) {
    popSnackbar('warning', "At least two places are required for Escape Simulation. Can not remove this place.");
    return;
  }
  if (selectedNode && nodes.length > 2) {
    nodes.splice(nodes.indexOf(selectedNode), 1);
    nodes.forEach(node => {
      node.teleports.forEach(teleport => {
        if (selectedNode.placeIndex == teleport.teleportToPlaceIndex) {
          node.teleports.splice(node.teleports.indexOf(teleport), 1);
        }
      });
    });
    spliceLinksForNode(selectedNode);
    // var placeToSplice = null;
    // experianceJSON.forEach(place => {
    //   if(place.nodeIndex === selectedNode.id)
    //     placeToSplice = place;
    // });
    // experianceJSON.splice(experianceJSON.indexOf(placeToSplice), 1);
    addPlaceCards(nodes);
  } else if (selectedLink) {
    links.splice(links.indexOf(selectedLink), 1);
  }
  selectedLink = null;
  selectedNode = null;
  toggleToolbarPlaceButtons(selectedNode);
  addInfoboxCards(selectedNode);
  addTeleportCards(selectedNode);
  restart();
}

function editPlace() {
  if (selectedNode) {
    toggleSideNav('placeSidenav');
    $('#place-accordion').find('.collapse').collapse('hide');
    $("#collapse-place-" + selectedNode.placeIndex).addClass("show");
  }
}

function toggleToolbarPlaceButtons(selectedPlace) {
  if (selectedPlace) {
    document.getElementById('toggleMapEditor').classList.remove('disabled');
    document.getElementById('editPlace').classList.remove('disabled');
    document.getElementById('removePlace').classList.remove('disabled');
    toggleSideNav('placeSidenav');
    $('#place-accordion').find('.collapse').collapse('hide');
    $("#collapse-place-" + selectedNode.placeIndex).addClass("show");
    $("#place-name").text('Customize: ' + selectedNode.placeName);
    $("#selected-place-label").text('Active Place: ' + selectedNode.placeName);
    $("#teleport-place-name").text('Customize teleports for ' + selectedNode.placeName);
    $("#infobox-place-name").text('Customize banners for ' + selectedNode.placeName);
  }
  else {
    document.getElementById('toggleMapEditor').classList.add('disabled');
    document.getElementById('editPlace').classList.add('disabled');
    document.getElementById('removePlace').classList.add('disabled');
    $("#place-name").text('Please select a place first');
    $("#selected-place-label").text('Please select a place first');
    $("#teleport-place-name").text('Please select a place first');
    $("#infobox-place-name").text('Please select a place first');

  }
}

function addPlaceCards(placeData, newPlaceID) {
  $("#place-accordion").empty();
  var index = 0;
  placeData.forEach(place => {
    // if(place.placeAudio && place.placeAudioName){
    //   placeAudio=place.placeAudio;
    //   placeAudioName=place.placeAudioName;
    // }
    // else{
    //   placeAudio="";
    //   placeAudioName="Choose Audio";
    // }
    var placeCollapseCard = "<div class='card' id='place'><div class='card-header' id='heading-" + place.placeIndex + "'><h3 class='mb-0'><button class='btn btn-link' data-toggle='collapse' data-target='#collapse-place-" + place.placeIndex + "' aria-expanded='true' aria-controls='collapse-place-" + place.placeIndex + "' onclick='setNodeSelected(" + index + ")'><span id='place-collapse-button-" + index + "' >" + place.placeName + "</span></button><i class='fa fa-trash float-right trash-icon-position' onmouseenter='mouseEnter(\"Remove this place from this Experience. Remember, by removing this place your Teleports and Banners on the Place also get removed.\");' onmouseleave='mouseLeave()' aria-hidden='true' onclick='setPlaceAndRemove(" + place.placeIndex + ")'></i></h3></div><div id='collapse-place-" + place.placeIndex + "' class='collapse' aria-labelledby='heading-" + place.placeIndex + "' data-parent='#place-accordion'><div class='card-body'><div class='form-group '><label for='place-name-input-" + place.placeIndex + "'>Name</label><input type='text' placeholder='Place name here.' class='form-control input_box_trasparent' id='place-name-input-" + place.placeIndex + "' value='" + place.placeName + "' onchange='saveNameOnBlur(" + index + "," + place.placeIndex + ")' maxlength='30'/></div><div class='form-group'><img class='img-fluid cursor-pointer' id='sky-image-preview-" + place.placeIndex + "'  src=\"" + place.placeSky +
    "\" onclick='setSelectedNode(" + place.placeIndex + ")'></div><div class='form-group custom-file mb-2'><input type='button' class='custom-file-input handPointer' id='custom-file-input-" + place.placeIndex + "' accept='image/png, image/jpeg' onmouseenter='mouseEnter(\"Place is the 360 view that your Patron sees. You can customize this place with a compatible image through this option. In case if you don&#39;t have a 360 image, you can try uploading a Panoroma OR use the &#39My image is not spherical&#39 checkbox while uploading the image.\");' onmouseleave='mouseLeave()' onclick='changeSkyImage(" + place.placeIndex + ", " + place.placeIndex + ")'><label class='custom-file-label' id='place-sky-image-" + place.placeIndex + "' for='custom-file-input-" + place.placeIndex + "'><span>" + place.placeImageName + "</span></label><label class='hidden-label' id='place-image-path-" + place.placeIndex + "' >" + place.placeSky + "</label></div><label class='aspect-ratio-style'>Note: Recommended aspect ratio 2:1</label><div class='form-group mt-3 row'><div class='col-1'><input type='checkbox' id='place-end-node-" + index + "' onchange='toggleEndNode(" + index + ");'></div><div class='col-9 pl-1'><label for='place-end-node-" + index + "'> This is the end place.</label></div></div><div class='form-group' id='end-message-div-" + index + "' hidden><label for='place-end-message-" + index + "'>End Message </label><textarea placeholder='End Message here.' maxlength='150' class='form-control input_box_trasparent' id='place-end-message-" + index + "' value='" + place.endMessage + "' onblur='saveEndNodeMessage(" + index + ");' onkeyup='endMessageLimitExceed(" + index + ")' >" + place.endMessage + "</textarea></div></div></div></div>";


    //audio for each place
    // <label for='place-name-input-0' style='margin-bottom: 4%;color:white;margin-top: 5%;'>Background Audio:</label><div class='form-group custom-file mb-2'><input type='button' class='custom-file-input cursor-pointer' id='custom-file-input-" + place.placeIndex + "' accept='mp3' onmouseenter='mouseEnter(\"Use this setting to Customize the audio that you would want to play while the Patron is going through the Places.\");' onmouseleave='mouseLeave()' onclick='changeSkyAudio(\"placeAudio\"," + place.placeIndex + ", " + place.placeIndex + ")'><label class='custom-file-label' id='place-sky-audio-" + place.placeIndex + "' for='custom-file-input-" + place.placeIndex + "'><span>" + placeAudioName + "</span></label><label class='hidden-label' id='place-audio-path-" + place.placeIndex + "' >"+placeAudio +"</label></div><div onmouseenter='mouseEnter(\"Remove the Music/Audio track from your Experience.\");onmouseleave='mouseLeave()' class='remove-audio mt-1'><span onclick='removeSkyAudio(" + place.placeIndex + ")'>Remove Audio</span></div>
    $("#place-accordion").append(placeCollapseCard);
    if (index == 0) {
      $("#place-end-node-" + index).prop('disabled', 'true');
      $("#place-end-node-" + index).removeAttr('checked');
      $("#end-message-div-" + index).prop('hidden', 'true');
      nodes[0].isEndNode = false;
      nodes[0].endMessage = '';
    }
    else {
      $("#place-end-node-" + index).prop('checked', place.isEndNode);
      $("#end-message-div-" + index).prop('hidden', !(place.isEndNode));
    }
    index++;
  });

  if (newPlaceID != null && newPlaceID != undefined) {
    $('#place-accordion').find('.collapse').collapse('hide');
    $("#collapse-place-" + newPlaceID).addClass("show");
  }

  var addTeleportButton = '<button onmouseenter="mouseEnter(\'Add a new Place in this Experience. You can later link this place from the Default place with the help of a Teleport.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-success float-right mb-2" onclick="addNewPlace(false)">New Place</button>';
  $("#place-accordion").append(addTeleportButton);

}

function addInfoboxCards(selectedPlace, selectedNewInfoboxID) {
  $("#infobox-accordion").empty();
  if (selectedPlace) {
    $("#infobox-place-name").text('Customize banners for ' + selectedNode.placeName);
    var index = 0;
    infoboxIndex = 0;
    selectedPlace.infoboxes.forEach(infobox => {
      if(infobox.audioName && infobox.audioPath){
        infoboxAudio=infobox.audioPath;
        infoboxAudioName=infobox.audioName;
      }
      else{
        infoboxAudio="";
        infoboxAudioName="Choose Audio";
      }

      if (infobox.imageName && infobox.imagePath) {
        infoboxImage = infobox.imagePath;
        infoboxImageName = infobox.imageName;
      } else {
        infoboxImage = "";
        infoboxImageName = "Choose Image";
      }

      infobox.infoboxIndex = infoboxIndex;
      var infoboxCollapseCard = '<div class="card" id="infobox-' + infobox.infoboxIndex + '"><div class="card-header" id="heading' + infobox.infoboxIndex + '"><h3 class="mb-0"><button class="btn btn-link" data-toggle="collapse" data-target="#collapse-infobox-' + infoboxIndex + '" aria-expanded="true" aria-controls="collapse-infobox-' + infoboxIndex + '" onclick="setInfoboxSelected(' + infobox.infoboxIndex + ')"><span id="infobox-collapse-button-' + index + '" >' + infobox.infoboxName + '</span></button><i class="fa fa-trash float-right trash-icon-position" aria-hidden="true" onmouseenter="mouseEnter(\'Remove the currently selected Banner.\');" onmouseleave="mouseLeave()" onclick="setInfoboxAndRemove(' + infobox.infoboxIndex + ')"></i></h3></div><div id="collapse-infobox-' + infoboxIndex + '" class="collapse" aria-labelledby="heading' + infobox.infoboxIndex + '" data-parent="#infobox-accordion"><div class="card-body"><div class="form-group"><label for="infobox-name-input-' + infobox.infoboxIndex + '">Name</label><input type="text" placeholder="Infobox name here." class="form-control input_box_trasparent" id="infobox-name-input-' + infobox.infoboxIndex + '" value="' + infobox.infoboxName + '" onblur="saveInfoboxNameOnBlur(' + index + ');"  maxlength="30"></div><div class="form-group"><label for="infobox-type-selection-' + infobox.infoboxIndex + '">Type</label><select class="form-control input_box_trasparent" id="infobox-type-selection-' + infobox.infoboxIndex + '" onchange="toggleInfoboxType(this.value,' + infoboxIndex + ');"><option value="Text" id="' + infobox.infoboxIndex + '-text">Text</option><option value="Image" id="' + infobox.infoboxIndex + '-image" >Image</option><option value="Audio" id="' + infobox.infoboxIndex + '-audio">Audio</option></select></div><div class="form-group" id="infobox-text-group-' + infoboxIndex + '"><label for="infobox-text-input-' + infobox.infoboxIndex + '">Info Text</label><textarea maxlength="560"  placeholder="Info Text here." class="form-control input_box_trasparent" id="infobox-text-input-' + infobox.infoboxIndex + '" onblur="saveInfoboxTextOnBlur(' + index + ',\'' + infobox.infoboxID + '\')" >' + infobox.text + '</textarea></div><div class="form-group" id="infobox-text-color-' + infoboxIndex + '"><label>Info Text Font Color</label><input class="jscolor pointer " id="infoTextColor-' + infoboxIndex + '" onchange="changeInfofont(' + index + ')" value="" style="width: 100%"></div><div class="form-group" id="infobox-bg-color-' + infoboxIndex + '"><label>Choose Description Background</label><input class="jscolor  pointer " id="infoboxBgColor-' + infoboxIndex + '" value="#000"  style="width: 100%" onchange="changeInfoBg(' + index + ')"></div><div class="form-group" id="infobox-bg-opacity-' + infoboxIndex + '"><div class="row"><div class="col-10"><label style="color:#fff;width: 100%">Background Opacity (Drag tochange):</label></div><div class="col-2"><label id="ImageDescriptionRangeValue' + infoboxIndex + '">(60%)</label></div></div><div class="slidecontainer"><input type="range" min="0.1" max="1" step="0.001" value="0.6" class="slider" oninput="changeOpacity( this,' + infobox.infoboxIndex + ')" id="descriptionBgOpacity-' + infobox.infoboxIndex + '" /></div></div><div class="form-group" id="infobox-image-preview-div-' + infoboxIndex + '"><img class="img-fluid" id="infobox-image-preview-' + infoboxIndex + '"  src="' + infoboxImage + '" ></div><div class="form-group custom-file mb-2" id="infobox-image-group-' + infoboxIndex + '"><input type="button" class="custom-file-input handPointer" id="infobox-image-input-' + infobox.infoboxIndex + '"  onclick="addInfoboxImage(' + infoboxIndex + ', ' +selectedPlace.placeIndex + ')"><label class="custom-file-label" id="infobox-image-label-' + infobox.infoboxIndex + '" for="infobox-image-input-' + infobox.infoboxIndex + '"><span>' + infoboxImageName + '</span></label><label class="hidden-label" id="infobox-image-path-' + infobox.infoboxIndex + '" >' + infoboxImage + '</label><label class="aspect-ratio-style">Note: Recommended aspect ratio 4:3</label></div><div class="form-group custom-file mb-2" id="infobox-audio-group-' + infoboxIndex + '"><input type="button" class="custom-file-input handPointer" id="infobox-audio-input-' + infobox.infoboxIndex + '"  onclick="addInfoboxAudio(' + infoboxIndex + ', ' + selectedPlace.placeIndex + ')"><label class="custom-file-label" id="infobox-audio-label-' + infobox.infoboxIndex + '" for="infobox-audio-input-' + infobox.infoboxIndex + '"><span>' + infoboxAudioName + '</span></label><label class="hidden-label" id="infobox-audio-path-' + infobox.infoboxIndex + '" >' + infoboxAudio + '</label></div><div class="form-group mt-2"><label for="infobox-size-input-' + infoboxIndex + '">Infobox Size</label><input type="range" min="1" max="10" step="0.01" value="' + parseInt(infobox.infoboxSize) + '" class="slider" id="infobox-size-input-' + infobox.infoboxIndex + '" oninput="resizeInfobox(' + infobox.infoboxIndex + ');"></div><div class="form-group"><label for="infobox-opacity-input-' + infoboxIndex + '">Infobox Visibility</label><input type="range" min="0" max="1" step="0.001" value="' + parseFloat(infobox.infoboxVisibility) + '" class="slider" id="infobox-opacity-input-' + infobox.infoboxIndex + '" oninput="opacityInfobox(' + infobox.infoboxIndex + ');"></div><div class="form-group" id="infobox-bg-banner-color-' + infoboxIndex + '"><label>Infobox Button Color</label><input class="jscolor pointer " id="infoboxBgBannerColor-' + infobox.infoboxIndex + '" value="#ff0000" style="width: 100%" onchange="changeInfoBannerBg(' + index + ')"></div></div></div></div>';
      $("#infobox-accordion").append(infoboxCollapseCard);
      jscolor.installByClassName("jscolor");

      if (infobox.infoBgColor) {
        var fontcolor = document.getElementById("infoboxBgColor-" + infoboxIndex);
        fontcolor.style.backgroundColor = nodes[nodes.indexOf(selectedNode)].infoboxes[index].infoBgColor;

      }
      if (infobox.infoFontColor) {
        var bgcolor = document.getElementById("infoTextColor-" + infoboxIndex);
        bgcolor.style.backgroundColor = nodes[nodes.indexOf(selectedNode)].infoboxes[index].infoFontColor;
      }
      if (nodes[nodes.indexOf(selectedNode)].infoboxes[index].infoBannerBgColor) {
        var bannerbgcolor = document.getElementById("infoboxBgBannerColor-" + infoboxIndex);
        bannerbgcolor.style.backgroundColor = nodes[nodes.indexOf(selectedNode)].infoboxes[index].infoBannerBgColor;
      }
      if (infobox.infoBgOpacity) {
        var opacity = document.getElementById("descriptionBgOpacity-" + infoboxIndex);
        opacity.value = infobox.infoBgOpacity;
        var displayvalue = '(' + Math.round(opacity.value * 100) + '%)';
        document.getElementById("ImageDescriptionRangeValue" + infoboxIndex).innerText = displayvalue;
      } else {
        var default_value = '(' + Math.round(0.6 * 100) + '%)';
        document.getElementById("ImageDescriptionRangeValue" + infoboxIndex).innerText = default_value;
      }

      $("#infobox-type-selection-" + infobox.infoboxIndex).val(infobox.infoboxType);
      toggleInfoboxType(infobox.infoboxType, infoboxIndex);
      index++;
      infoboxIndex++;
    });
    if (selectedNewInfoboxID != null && selectedNewInfoboxID != undefined) {
      selectedHotspot =document.querySelectorAll("a-sphere#infobox-"+selectedNewInfoboxID)[0] ;
      $('#infobox-accordion').find('.collapse').collapse('hide');
      $("#collapse-infobox-" + selectedNewInfoboxID).addClass("show");
    }
    var addInfobxButton = '<button onmouseenter="mouseEnter(\'Create a New Banner using this option. You can customize the Banner Settings through the Tab on the Left.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-success float-right mb-2" onclick="addNewInfobox(false)">New Banner</button>';
    $("#infobox-accordion").append(addInfobxButton);
  }
}

function addTeleportCards(selectedPlace, selectedNewTeleportID) {
  $("#teleport-accordion").empty();
  if (selectedPlace) {
    $("#teleport-place-name").text('Customize teleports for ' + selectedNode.placeName);
    var index = 0;
    teleportIndex = 0;
    selectedPlace.teleports.forEach(teleport => {
      var teleportCollapseCard = '<div class="card" id="telport-' + teleport.teleportIndex + '"><div class="card-header" id="heading' + teleport.teleportIndex + '"><h3 class="mb-0"><button class="btn btn-link" data-toggle="collapse" data-target="#collapse-teleport-' + teleport.teleportID + '" aria-expanded="true" aria-controls="collapse-teleport-' + teleport.teleportID + '" onclick="setTeleportSelected(' + teleport.teleportIndex + ')"><span id="teleport-collapse-button-' + index + '" >' + teleport.name + '</span></button><i class="fa fa-trash float-right trash-icon-position" aria-hidden="true" onmouseenter="mouseEnter(\'Remove this Teleport.\');" onmouseleave="mouseLeave()" onclick="setTeleportAndRemove(' + teleport.teleportIndex + ')"></i></h3></div><div id="collapse-teleport-' + teleport.teleportID + '" class="collapse" aria-labelledby="heading' + teleport.teleportIndex + '" data-parent="#teleport-accordion"><div class="card-body"><div class="form-group"><label for="teleport-name-input-' + teleportIndex + '">Name</label><input type="text" placeholder="Teleport name here." class="form-control input_box_trasparent" id="teleport-name-input-' + teleportIndex + '" value="' + teleport.name + '" onchange="saveTeleportNameOnBlur(' + index + ', \'' + teleport.teleportID + '\')" maxlength="30"></div><div class="form-group"><label for="teleport-focus-input-' + teleportIndex + '">Focus Text</label><textarea maxlength="150" placeholder="Focus Text here." class="form-control input_box_trasparent" id="teleport-text-input-' + teleportIndex + '" value="' + teleport.focusText + '" onchange="saveTeleportFocusTextOnBlur(' + index + ',\'' + teleport.teleportID + '\')">' + teleport.focusText + '</textarea></div><div class="form-group"><label for="teleport-room-selection-' + teleport.teleportID + '">Teleport to</label><select class="form-control input_box_trasparent" id="teleport-room-selection-' + teleport.teleportID + '" onchange="setTeleportToOnChange(\'' + teleport.teleportID + '\',' + index + ')"></select></div><div class="form-group"><label for="teleport-size-input-' + teleportIndex + '">Teleport Size</label><input type="range" min="1" max="10" step="0.01" value="' + parseInt(teleport.teleportSize) + '" class="slider" id="teleport-size-input-' + teleportIndex + '" oninput="resizeTeleport(' + teleportIndex + ',\'' + teleport.teleportID + '\');"></div><div class="form-group"><label for="teleport-opacity-input-' + teleportIndex + '">Teleport Visibility</label><input type="range" min="0" max="1" step="0.001" value="' + teleport.teleportVisibility + '" class="slider" id="teleport-opacity-input-' + teleportIndex + '" oninput="opacityTeleport(' + teleportIndex + ',\'' + teleport.teleportID + '\');"></div></div></div></div>';

      $("#teleport-accordion").append(teleportCollapseCard);
      if(teleport.teleportToPlaceIndex==null){
        var options = "<option value='null' id=''  selected>Select a place</option>";
        }
        else{
        var options = "<option value='null' id=''  >Select a place</option>";
        }
      nodes.forEach(place => {
        if (place.placeIndex != selectedNode.placeIndex) {
          if (place.placeIndex === parseInt(teleport.teleportToPlaceIndex)) {
            options = options + "<option value='" + place.placeIndex + "' id='" + place.placeIndex + "' selected>" + place.placeName + "</option>";
          }
          else {
            options = options + "<option value='" + place.placeIndex + "' id='" + place.placeIndex + "'>" + place.placeName + "</option>";
          }
        }
      });
      $('#teleport-room-selection-' + teleport.teleportID).append(options);
      index++;
      teleportIndex++;
    });
    if (selectedNewTeleportID != null && selectedNewTeleportID != undefined) {
      selectedHotspot = document.getElementById('' + selectedNewTeleportID);
      $('#teleport-accordion').find('.collapse').collapse('hide');
      $("#collapse-teleport-" + selectedNewTeleportID).addClass("show");

    }
    var addTeleportButton = '<button onmouseenter="mouseEnter(\'Add a new Teleport using this option. You can customize the navigation action for this Teleport through the Teleport Tab on the left.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-success float-right mb-2" onclick="addNewTeleport(false)">New Teleport</button>';
    $("#teleport-accordion").append(addTeleportButton);
  }
}

function setSelectedNode(placeIndex) {
  nodes.forEach(node => {
    if (node.placeIndex === placeIndex) {
      selectedNode = node;
    }
  });

  selectedHotspot = null;
  toggleToolbarButtons(selectedHotspot);
  $('#toggleMapEditor').removeClass('disabled');
  $("#freezeView").removeClass("hidden-label");
  $("#freezeView").removeClass("disabled");
  $("#freezeView").addClass("visible");
  $("#graph").addClass("hidden");
  $("#scene").removeClass("hidden");
  toggleMapEditorLabel();
  $(".graph-button").addClass("hidden-label");
  $(".scene-button").removeClass("hidden-label");
  loadAscene(selectedNode);
  addInfoboxCards(selectedNode);
  addTeleportCards(selectedNode);
  $("#place-name").text('Customize: ' + selectedNode.placeName);
  $("#selected-place-label").text('Active Place: ' + selectedNode.placeName);
  $("#teleport-place-name").text('Customize teleports for ' + selectedNode.placeName);
  $("#infobox-place-name").text('Customize banners for ' + selectedNode.placeName);
}

function toggleMapEditor() {
  if (document.querySelector('#toggleMapEditor').classList.contains('disabled'))
    return;


  selectedHotspot = null;
  toggleToolbarButtons(selectedHotspot);

  $("#graph").toggleClass('hidden');
  $("#scene").toggleClass('hidden');
  $(".scene-button").toggleClass('hidden-label');
  $(".graph-button").toggleClass('hidden-label');
  toggleMapEditorLabel();
  loadAscene(selectedNode);
}


function toggleMapEditorLabel() {
  if ($("#graph").hasClass('hidden')) {
    $('.place-buttons').addClass('hidden-label');
    $('.infobox-buttons').removeClass('hidden-label');
    $('.teleport-buttons').removeClass('hidden-label');
    $("#toggleMapEditorName").text("Map");
    $("#freezeView").removeClass("hidden-label");
    $("#freezeView").removeClass("disabled");
    $("#toggleMapEditorImage").attr('src', 'assets/images/mapwhite.png');
    mapLable = "Open the Map View of the Experience. You can create a holastic map view of the Places that your Experience currently has. Each of the Teleport denotes an Arrow tail from the Place Arrow head denotes which place it leads to.";
  }
  else if ($("#scene").hasClass('hidden')) {
    $('.place-buttons').removeClass('hidden-label');
    $('.infobox-buttons').addClass('hidden-label');
    $('.teleport-buttons').addClass('hidden-label');
    $("#toggleMapEditorName").text("360 place");
    $("#freezeView").addClass("hidden-label");
    $("#freezeView").removeClass("visible");
    $("#toggleMapEditorImage").attr('src', 'assets/images/360white.png');
    mapLable = "Toggle between the 360 View & the Map View";
  }
}


function loadAscene(node) {
  clearHotspots();
  if (node) {
    $("#CamEntity").attr("rotation", node.entry_view);
    bindSkyImage(node.placeSky);
    addTeleports(node.teleports);
    addInfoboxes(node.infoboxes);
  }
  else {
    selectedNode = nodes[0];
    $("#CamEntity").attr("rotation", nodes[0].entry_view);
    bindSkyImage(nodes[0].placeSky);
    addTeleports(nodes[0].teleports);
    addInfoboxes(nodes[0].infoboxes);
  }

}

function clearHotspots() {
  var allHotspots = document.querySelectorAll('a-sphere');
  for (var index = 0; index < allHotspots.length; index++) {
    // allHotspots.forEach(hotspot => {
    allHotspots[index].parentNode.removeChild(allHotspots[index]);
    // });
  }
  var allHotspotsName = document.querySelectorAll('.text-plane');
  for (var index = 0; index < allHotspotsName.length; index++) {
    // allHotspotsName.forEach(hotspotName => {
    allHotspotsName[index].parentNode.removeChild(allHotspotsName[index]);
    // });
  }
}

function bindSkyImage(imagePath) {
  var aSkyEl = document.querySelector('a-sky');
  aSkyEl.setAttribute('src', imagePath);
}

function addTeleports(teleportsArray) {
  teleportIndex = 0;
  var aSceneEl = document.querySelector('a-scene');
  if (teleportsArray) {
    teleportsArray.forEach(teleport => {
      var newTeleport = document.createElement('a-sphere');
      newTeleport.setAttribute('id', teleport.teleportID);
      newTeleport.setAttribute('mouseclick', '');
      newTeleport.setAttribute('mouseover', '');
      newTeleport.setAttribute('material', 'color', teleportColor);
      newTeleport.setAttribute('geometry', 'radius', teleport.teleportSize);
      newTeleport.setAttribute('click-drag', '');
      newTeleport.setAttribute('opacity', teleport.teleportVisibility);
      newTeleport.setAttribute('shader', "flat");
      newTeleport.setAttribute('name', teleport.name);
      newTeleport.setAttribute('text', 'value', '' + teleport.focusText);
      newTeleport.setAttribute('type', 'teleport');
      aSceneEl.appendChild(newTeleport);
      newTeleport.setAttribute('position', teleport.teleportPosition);
      newTeleport.setAttribute('event-set__1', '_event: dragstart; material.opacity: 0.2');
      newTeleport.setAttribute('event-set__1', '_event: dragend; material.opacity: 1');

      var newTeleportNamePlane = document.createElement('a-entity');
      newTeleportNamePlane.setAttribute('id', "text-" + teleport.teleportID);
      newTeleportNamePlane.setAttribute('class', "text-plane");
      newTeleportNamePlane.setAttribute("geometry", "primitive:plane");
      newTeleportNamePlane.setAttribute("material", "transparent:true;opacity:0.03");
      aSceneEl.appendChild(newTeleportNamePlane);
      newTeleportNamePlane.setAttribute('position', teleport.teleportPosition);
      newTeleportNamePlane.setAttribute('look-at', 'src:#main-camera');

      var newTeleportName = document.createElement('a-text');
      newTeleportName.setAttribute('value', teleport.name);
      newTeleportName.setAttribute('width', '50');
      newTeleportName.setAttribute('align', 'center');
      newTeleportNamePlane.appendChild(newTeleportName);
      newTeleportName.setAttribute('position', "0 " + (-teleport.teleportSize - 2) + " 0");
      teleportIndex++;
    });
  }
}

function addInfoboxes(infoboxesArray) {
  infoboxIndex = 0;
  var aSceneEl = document.querySelector('a-scene');
  if (infoboxesArray) {
    infoboxesArray.forEach(infobox => {
      infobox.infoboxID = 'infobox-' + infoboxIndex;
      var newInfobox = document.createElement('a-sphere');
      if (infobox.infoBannerBgColor) {
        newInfobox.setAttribute('material', 'color', infobox.infoBannerBgColor);
      } else {
        newInfobox.setAttribute('material', 'color', "#ff0000");
      }
      newInfobox.setAttribute('id', 'infobox-' + infoboxIndex);
      newInfobox.setAttribute('mouseclick', '');
      newInfobox.setAttribute('geometry', 'radius', infobox.infoboxSize);
      newInfobox.setAttribute('click-drag', '');
      newInfobox.setAttribute('opacity', infobox.infoboxVisibility);
      newInfobox.setAttribute('shader', "flat");
      newInfobox.setAttribute('name', infobox.infoboxName);
      newInfobox.setAttribute('text', 'value', '' + infobox.text);
      newInfobox.setAttribute('type', 'infobox');
      newInfobox.setAttribute('position', infobox.infoboxPosition);
      newInfobox.setAttribute('event-set__1', '_event: dragstart; material.opacity: 0.2');
      newInfobox.setAttribute('event-set__1', '_event: dragend; material.opacity: 1');
      aSceneEl.appendChild(newInfobox);

      var newInfoboxNamePlane = document.createElement('a-entity');
      newInfoboxNamePlane.setAttribute('id', "text-" + infobox.infoboxID);
      newInfoboxNamePlane.setAttribute('class', "text-plane");
      newInfoboxNamePlane.setAttribute("geometry", "primitive:plane");
      newInfoboxNamePlane.setAttribute("material", "transparent:true;opacity:0.03");
      newInfoboxNamePlane.setAttribute('look-at', 'src:#main-camera');
      aSceneEl.appendChild(newInfoboxNamePlane);
      newInfoboxNamePlane.setAttribute('position', infobox.infoboxPosition);

      var newInfoboxName = document.createElement('a-text');

      // newInfoboxName.setAttribute('id', "text-" + infobox.infoboxID);
      newInfoboxName.setAttribute('value', infobox.infoboxName);
      newInfoboxName.setAttribute('width', '50');
      newInfoboxName.setAttribute('align', 'center');
      // newInfoboxName.setAttribute('look-at', 'src:#main-camera');

      newInfoboxNamePlane.appendChild(newInfoboxName);
      newInfoboxName.setAttribute('position', "0 " + (-infobox.infoboxSize - 2) + " 0");
      infoboxIndex++;
    });
  }
}

function addNewTeleport(flag) {

  if(flag){
    toggleSideNav('teleportSidenav');
  }

  teleportIndex++;
  var newTeleport = document.createElement('a-sphere');
  newTeleport.setAttribute('id', "teleport-" + teleportIndex);
  newTeleport.setAttribute('mouseclick', '');
  newTeleport.setAttribute('material', 'color', teleportColor);
  newTeleport.setAttribute('geometry', 'radius', "5");
  newTeleport.setAttribute('click-drag', '');
  newTeleport.setAttribute('opacity', "0.5");
  newTeleport.setAttribute('shader', "flat");
  newTeleport.setAttribute('name', 'New Teleport');
  newTeleport.setAttribute('text', 'value', '');
  newTeleport.setAttribute('type', 'teleport');
  newTeleport.setAttribute('event-set__1', '_event: dragstart; material.opacity: 0.2');
  newTeleport.setAttribute('event-set__1', '_event: dragend; material.opacity: 1');
  var aSceneEl = document.querySelector('a-scene');
  aSceneEl.appendChild(newTeleport);
  var markerEl = document.querySelector('#marker');
  var position = markerEl.object3D.getWorldPosition();
  newTeleport.setAttribute('position', position);
  var newTeleportNamePlane = document.createElement('a-entity');
  newTeleportNamePlane.setAttribute('id', "text-teleport-" + teleportIndex);
  newTeleportNamePlane.setAttribute('class', "text-plane");
  newTeleportNamePlane.setAttribute("geometry", "primitive:plane");
  newTeleportNamePlane.setAttribute("material", "transparent:true;opacity:0.03");
  newTeleportNamePlane.setAttribute('position', position);
  newTeleportNamePlane.setAttribute('look-at', 'src:#main-camera');
  aSceneEl.appendChild(newTeleportNamePlane);
  var newTeleportName = document.createElement('a-text');
  newTeleportName.setAttribute('position', "0 -7 0");
  newTeleportName.setAttribute('value', 'New Teleport');
  newTeleportName.setAttribute('width', '50');
  newTeleportName.setAttribute('align', 'center');
  newTeleportNamePlane.appendChild(newTeleportName);

  var newTeleportObject = {
    "teleportIndex": teleportIndex,
    "name": "New Teleport",
    "focusText": "",
    "teleportToPlace": "",
    "teleportToPlaceImage": "",
    "teleportToPlaceIndex": null,
    "isEndNode": false,
    "endMessage": "",
    "teleportPosition": "" + position.x + " " + position.y + " " + position.z,
    "teleportID": "teleport-" + teleportIndex,
    "teleportSize": 5,
    "teleportVisibility": 0.5
  }
  var selectedNewTeleportID = newTeleportObject.teleportID;
  selectedNode.teleports.push(newTeleportObject);
  addTeleportCards(selectedNode, selectedNewTeleportID);
  selectedHotspot =  $("a-sphere#teleport-"+selectedNewTeleportID)[0];
  toggleToolbarButtons(selectedHotspot);
}

function addNewInfobox(flag) {
  if (flag) {
    toggleSideNav('infoboxSidenav');
  };
  var newInfobox = document.createElement('a-sphere');
  newInfobox.setAttribute('id', "infobox-" + infoboxIndex);
  newInfobox.setAttribute('mouseclick', '');
  newInfobox.setAttribute('material', 'color', infoboxColor);
  newInfobox.setAttribute('geometry', 'radius', "5");
  newInfobox.setAttribute('click-drag', '');
  newInfobox.setAttribute('opacity', "0.5");
  newInfobox.setAttribute('shader', "flat");
  newInfobox.setAttribute('name', 'New Infobox');
  newInfobox.setAttribute('text', 'value', '');
  newInfobox.setAttribute('type', 'infobox');
  var aSceneEl = document.querySelector('a-scene');
  aSceneEl.appendChild(newInfobox);
  var markerEl = document.querySelector('#marker');
  var position = markerEl.object3D.getWorldPosition();
  newInfobox.setAttribute('position', position);
  newInfobox.setAttribute('event-set__1', '_event: dragstart; material.opacity: 0.2');
  newInfobox.setAttribute('event-set__1', '_event: dragend; material.opacity: 1');
  var newInfoboxNamePlane = document.createElement('a-entity');
  newInfoboxNamePlane.setAttribute('id', "text-infobox-" + infoboxIndex);
  newInfoboxNamePlane.setAttribute('class', "text-plane");
  newInfoboxNamePlane.setAttribute("geometry", "primitive:plane");
  newInfoboxNamePlane.setAttribute("material", "transparent:true;opacity:0.03");
  newInfoboxNamePlane.setAttribute('position', position);
  newInfoboxNamePlane.setAttribute('look-at', 'src:#main-camera');
  aSceneEl.appendChild(newInfoboxNamePlane);


  var newInfoboxName = document.createElement('a-text');
  // newInfoboxName.setAttribute('id', "text-infobox-" + infoboxIndex);
  newInfoboxName.setAttribute('value', 'New banner');
  // newInfoboxName.setAttribute('look-at', 'src:#main-camera');
  newInfoboxName.setAttribute('width', '50');
  newInfoboxName.setAttribute('align', 'center');
  newInfoboxNamePlane.appendChild(newInfoboxName);
  newInfoboxName.setAttribute('position', "0 -7 0");

  var newInfoboxObject = {
    "infoboxID": "infobox-" + infoboxIndex,
    "infoboxName": "New Banner",
    "infoboxIndex": infoboxIndex,
    "infoboxType": "Text",
    "text": "",
    "imageName": "",
    "imagePath": "",
    "audioName": "",
    "audioPath": "",
    "video": "",
    "infoboxPosition": "" + position.x + " " + position.y + " " + position.z + "",
    "infoboxSize": 5,
    "infoboxVisibility": 0.5,
  }
  selectedNode.infoboxes.push(newInfoboxObject);
  addInfoboxCards(selectedNode, infoboxIndex);
  // infoboxIndex++;
  // if(flag){
  // toggleSideNav('infoboxSidenav');
  selectedHotspot =  $("a-sphere#infobox-"+(infoboxIndex-1))[0];
  toggleToolbarButtons(selectedHotspot);
}

function changeSkyImage(placeIndex, place) {
  uploadImage('Place', placeIndex, place);
}

function changeSkyAudio(type,audioIndex, place){
  
  assettype = "Audio";
  elementToUpdate = type;
  selectedElementIndex = audioIndex;
  selectedPlaceToAssign = place;
  window.parent.triggerAssetsPopup();
}

function removeSkyAudio(placeIndex){
  var placeElementIndex = $('#place-sky-audio-' + placeIndex);
  placeElementIndex[0].children[0].innerText = "Choose Audio";
  document.getElementById('place-audio-path-'+ placeIndex).innerHTML = '';
  addPlaceSkyToJSON(placeIndex);
}


function changeBackgroundAudio() {
  uploadAudio('EnvironmentAudio');
}
function uploadAudio(element) {
  assettype = 'Audio';
  elementToUpdate = element;
  selectedElementIndex = null;
  selectedPlaceToAssign = null;
  window.parent.triggerAssetsPopup();
}

function addBackgroundAudio() {
  experianceJSON.background_sound = $('#environment-audio-path').text();
}

function deleteTeleport() {
  if (selectedHotspot.getAttribute('type') == 'teleport') {
    nodes.forEach(node => {
      if (selectedNode.id === node.id) {
        node.teleports.forEach(teleport => {
          if (selectedHotspot.getAttribute('id') === teleport.teleportID) {
            node.teleports.splice(node.teleports.indexOf(teleport), 1);
          }
        });
      }
    });
    teleportIndex--;
    selectedHotspot = null;
    toggleToolbarButtons(selectedHotspot);
    drawMap();
    loadAscene(selectedNode);
    addTeleportCards(selectedNode);
  }
}

function deleteInfobox() {
  if (selectedHotspot.getAttribute('type') == 'infobox') {
    nodes.forEach(node => {
      if (selectedNode.id === node.id) {
        node.infoboxes.forEach(infobox => {
          if (selectedHotspot.getAttribute('id') == infobox.infoboxID) {
            node.infoboxes.splice(node.infoboxes.indexOf(infobox), 1);
          }
        });
      }
    });
    //infoboxIndex--;
    selectedHotspot = null;
    toggleToolbarButtons(selectedHotspot);
    drawMap();
    loadAscene(selectedNode);
    addInfoboxCards(selectedNode);
    //addInfoboxes(selectedNode.infoboxes);
  }
}

function editInfobox() {
  if (selectedHotspot && selectedHotspot.getAttribute('type') === 'infobox') {
    toggleSideNav('infoboxSidenav');
    $('#infobox-accordion').find('.collapse').collapse('hide');
    $('#collapse-infobox-' + selectedHotspot.getAttribute('id')).addClass("show");
  }
}

function editTeleport() {
  if (selectedHotspot && selectedHotspot.getAttribute('type') === 'teleport') {
    toggleSideNav('teleportSidenav');
    $('#teleport-accordion').find('.collapse').collapse('hide');
    let id=selectedHotspot.getAttribute('id');
    $('#collapse-teleport-' +id).addClass("show");
  }
}

function toggleInfoboxType(type, infoboxIndex) {
  if (type === "Image") {
    $("#infobox-text-group-" + infoboxIndex).prop('hidden', true);
    $("#infobox-text-color-" + infoboxIndex).prop('hidden', true);
    $('#infobox-bg-opacity-' + infoboxIndex).prop('hidden', true);
    $("#infobox-bg-color-" + infoboxIndex).prop('hidden', true);
    $("#infobox-image-group-" + infoboxIndex).prop('hidden', false);
    $("#infobox-image-preview-div-" + infoboxIndex).prop('hidden', false);
    $("#infobox-audio-group-" + infoboxIndex).prop('hidden', true);
  }
  else if (type === "Text") {
    $("#infobox-text-group-" + infoboxIndex).prop('hidden', false);
    $("#infobox-text-color-" + infoboxIndex).prop('hidden', false);
    $('#infobox-bg-opacity-' + infoboxIndex).prop('hidden', false);
    $("#infobox-bg-color-" + infoboxIndex).prop('hidden', false);
    $("#infobox-image-group-" + infoboxIndex).prop('hidden', true);
    $("#infobox-image-preview-div-" + infoboxIndex).prop('hidden', true);
    $("#infobox-audio-group-" + infoboxIndex).prop('hidden', true);
  } else if (type === "Audio") {
    $("#infobox-text-group-" + infoboxIndex).prop('hidden', true);
    $("#infobox-text-color-" + infoboxIndex).prop('hidden', true);
    $('#infobox-bg-opacity-' + infoboxIndex).prop('hidden', true);
    $("#infobox-bg-color-" + infoboxIndex).prop('hidden', true);
    $("#infobox-image-group-" + infoboxIndex).prop('hidden', true);
    $("#infobox-image-preview-div-" + infoboxIndex).prop('hidden', true);
    $("#infobox-audio-group-" + infoboxIndex).prop('hidden', false);
    // $("#infobox-audio-preview-div-" + infoboxIndex).prop('hidden', true);
  }
  nodes[nodes.indexOf(selectedNode)].infoboxes[infoboxIndex].infoboxType = $("select#infobox-type-selection-" + infoboxIndex).val();
}

function addInfoboxImage(infoboxIndex, selectedPlace) {
  uploadImage('Infobox', infoboxIndex, selectedPlace);
}

function addInfoboxAudio(infoboxIndex, selectedPlace) {
  uploadInfoboxAudio('InfoboxAudio', infoboxIndex, selectedPlace);
}

function addLaunchScreenText() {
  var lauchText = $(".lunchScreenText");

  var lunchTextItem = lauchText[0].value;
  experianceJSON.launch_text = lunchTextItem;
  // experianceJSON.launch_text = document.getElementById("lunchScreenText").value;
}
function addPreLaunchScreenText() {
  experianceJSON.prelaunch_text = document.getElementById("prelaunchText").value;
}


$("#overlay").click(function () {
  $(".sidenav").removeClass('active');
  $("#overlay").removeClass('overlay');
});

function setPlaceAndRemove(placeIndex) {
  if (nodes.length == 2) {
    popSnackbar('warning', "At least two places are required for Escape Simulation. Can not remove this place.");
    return;
  }
  if (placeIndex>=0 && nodes.length > 2) {
    nodes.forEach(node => {
      if (node.placeIndex === placeIndex)
        selectedNode = node;
    });
    nodes.splice(nodes.indexOf(selectedNode), 1);
    nodes.forEach(node => {
      node.teleports.forEach(teleport => {
        if (selectedNode.placeIndex == teleport.teleportToPlaceIndex) {
          node.teleports.splice(node.teleports.indexOf(teleport), 1);
        }
      });
    });
    spliceLinksForNode(selectedNode);
    addPlaceCards(nodes);
    selectedLink = null;
    selectedNode = null;
    toggleToolbarPlaceButtons(selectedNode);
    addInfoboxCards(selectedNode);
    addTeleportCards(selectedNode);
    $('#toggleMapEditor').addClass('disabled');
    $("#graph").removeClass("hidden");
    $("#scene").addClass("hidden");
    toggleMapEditorLabel();
    $(".graph-button").removeClass("hidden-label");
    $(".scene-button").addClass("hidden-label");
    restart();
    $('#freezeView').addClass('hidden-label');
    $('#freezeView').removeClass('visible');
  }
}

function saveNameOnBlur(index, placeIndex) {
  selectedNode = nodes[index];
  var newPlaceName = $("#place-name-input-" + placeIndex).val();
  nodes[index].placeName = newPlaceName;
  // addPlaceCards(nodes);
  // $('#place-accordion').find('.collapse').collapse('hide');
  // $("#collapse-place-" + placeIndex).addClass("show");
  //toggleToolbarPlaceButtons(selectedNode);
  addInfoboxCards(selectedNode);
  addTeleportCards(selectedNode);
  $("#place-collapse-button-" + index).html(newPlaceName);
  $("#place-name").text('Customize: ' + selectedNode.placeName);
  $("#selected-place-label").text('Active Place: ' + selectedNode.placeName);
  $("#teleport-place-name").text('Customize teleports for ' + selectedNode.placeName);
  $("#infobox-place-name").text('Customize banners for ' + selectedNode.placeName);
  $("#place-text-" + nodes[index].id).text(newPlaceName);
  loadAscene(selectedNode);
  restart();
}

function addPlaceSkyToJSON(placeIndex) {
  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].placeIndex === placeIndex) {
      selectedNode = nodes[i];
      // nodes[index].placeName = $("#place-name-input-" + placeIndex).val();
      nodes[i].placeImageName = $('#place-sky-image-' + selectedNode.placeIndex).text();
      nodes[i].placeSky = $("#place-image-path-" + selectedNode.placeIndex).text();
      // nodes[i].placeAudioName=$("#place-audio-path-" + selectedNode.placeIndex).text().split('/').pop();
      // nodes[i].placeAudio = $("#place-audio-path-" + selectedNode.placeIndex).text();
      nodes.forEach(node => {
        node.teleports.forEach(teleport => {
          if (parseInt(teleport.teleportToPlaceIndex) === nodes[i].placeIndex) {
            teleport.teleportToPlaceImage = $("#place-image-path-" + i).text();
            teleportToPlace = $("#place-name-input-" + selectedNode.placeIndex).val();
          }
        });
      });
      restart();
      addPlaceCards(nodes);
      $('#place-accordion').find('.collapse').collapse('hide');
      $("#collapse-place-" + placeIndex).addClass("show");
      $('#toggleMapEditor').removeClass('disabled');
      $("#graph").addClass("hidden");
      $("#scene").removeClass("hidden");
      toggleMapEditorLabel();
      $(".graph-button").addClass("hidden-label");
      $(".scene-button").removeClass("hidden-label");
      toggleToolbarPlaceButtons(selectedNode);
      loadAscene(selectedNode);
      addInfoboxCards(selectedNode);
      addTeleportCards(selectedNode);
      break;
    }
  }
}

function setNodeSelected(index) {
  if (selectedNode == null || selectedNode == undefined || selectedNode != nodes[index]) {
    selectedNode = nodes[index];
    restart();
    addInfoboxCards(selectedNode);
    addTeleportCards(selectedNode);
    $('#toggleMapEditor').removeClass('disabled');
    $("#freezeView").removeClass("hidden-label");
    $("#freezeView").removeClass("disabled");
    $("#freezeView").addClass("visible");
    $('#editPlace').removeClass('disabled');
    $('#removePlace').removeClass('disabled');
    $("#place-name").text('Customize: ' + selectedNode.placeName);
    $("#teleport-place-name").text('Customize teleports for ' + selectedNode.placeName);
    $("#infobox-place-name").text('Customize banners for ' + selectedNode.placeName);
    $("#selected-place-label").text('Active place: ' + selectedNode.placeName);
    toggleToolbarButtons(selectedHotspot);
    $('#toggleMapEditor').removeClass('disabled');
    $("#graph").addClass("hidden");
    $("#scene").removeClass("hidden");
    toggleMapEditorLabel();
    $(".graph-button").addClass("hidden-label");
    $(".scene-button").removeClass("hidden-label");
    loadAscene(selectedNode);
  }
  else if (selectedNode == nodes[index] && $('#toggleMapEditor').hasClass('disabled')) {
    selectedNode = null;
    restart();
    addInfoboxCards(selectedNode);
    addTeleportCards(selectedNode);
    $('#toggleMapEditor').addClass('disabled');
    $('#editPlace').addClass('disabled');
    $('#removePlace').addClass('disabled');
    $("#place-name").text('Please select a place first');
    $("#selected-place-label").text('Please select a place first');
    $("#teleport-place-name").text('Please select a place first');
    $("#infobox-place-name").text('Please select a place first');

  }
}

function setInfoboxAndRemove(infoboxIndex) {
  if (infoboxIndex !== null && infoboxIndex !== undefined) {
    nodes.forEach(node => {
      if (selectedNode.id === node.id) {
        node.infoboxes.forEach(infobox => {
          if (infoboxIndex == infobox.infoboxIndex) {
            node.infoboxes.splice(node.infoboxes.indexOf(infobox), 1);
          }
        });
      }
    });
    //infoboxIndex--;
    selectedHotspot = null;
    toggleToolbarButtons(selectedHotspot);
    loadAscene(selectedNode);
    addInfoboxCards(selectedNode);
    //addInfoboxes(selectedNode.infoboxes);
    drawMap();
  }
}

function saveInfoboxNameOnBlur(index) {
  if (selectedNode) {
    var infoboxNewName = $('input#infobox-name-input-' + index).val();
    nodes[nodes.indexOf(selectedNode)].infoboxes[index].infoboxName = infoboxNewName;
    $('#infobox-collapse-button-' + index).html(infoboxNewName);
    loadAscene(selectedNode);
    // addInfoboxCards(selectedNode);
    // $('#infobox-accordion').find('.collapse').collapse('hide');
    // $("#collapse-infobox-" + index).addClass("show");
  }
}

function saveInfoboxTextOnBlur(index, infoboxID) {
  if (selectedNode) {
    nodes[nodes.indexOf(selectedNode)].infoboxes[index].text = $('textarea#infobox-text-input-' + index).val();
    loadAscene(selectedNode);
    // addInfoboxCards(selectedNode);
    // $('#infobox-accordion').find('.collapse').collapse('hide');
    // $("#collapse-infobox-" + index).addClass("show");
  }
}

function changeInfoBannerBg(infoboxIndex){
  var infoboxButtonColor = document.querySelector('a-sphere#infobox-' + infoboxIndex);
  infoboxButtonColor.setAttribute('material', 'color', $("#infoboxBgBannerColor-" + infoboxIndex).val());
  nodes[nodes.indexOf(selectedNode)].infoboxes[infoboxIndex].infoBannerBgColor = parseFloat($("#infoboxBgBannerColor-" + infoboxIndex).val());
  if (selectedNode) {
    var infoBannerBgColor = $('input#infoboxBgBannerColor-' + infoboxIndex).val(); 
    if (infoBannerBgColor.includes('#')) {
      nodes[nodes.indexOf(selectedNode)].infoboxes[infoboxIndex].infoBannerBgColor = infoBannerBgColor;
    } else {
      nodes[nodes.indexOf(selectedNode)].infoboxes[infoboxIndex].infoBannerBgColor = '#' + infoBannerBgColor;
    }
    loadAscene(selectedNode);
  }
}

function changeInfofont(index) {
  if (selectedNode) {
    var infoFontColor = $('input#infoTextColor-' + index).val();
    if (infoFontColor.includes('#')) {
      nodes[nodes.indexOf(selectedNode)].infoboxes[index].infoFontColor = infoFontColor;
    } else {
      nodes[nodes.indexOf(selectedNode)].infoboxes[index].infoFontColor = '#' + infoFontColor;
    }
    loadAscene(selectedNode);
  }
}
function changeInfoBg(index) {
  if (selectedNode) {
    var infoBgColor = $('input#infoboxBgColor-' + index).val();
    if (infoBgColor.includes('#')) {
      nodes[nodes.indexOf(selectedNode)].infoboxes[index].infoBgColor = infoBgColor;
    } else {
      nodes[nodes.indexOf(selectedNode)].infoboxes[index].infoBgColor = '#' + infoBgColor;
    }
    loadAscene(selectedNode);
  }
}
function changeOpacity(event, index) {
  if (selectedNode) {
    var infoBgOpacity = $('input#descriptionBgOpacity-' + index).val();
    nodes[nodes.indexOf(selectedNode)].infoboxes[index].infoBgOpacity = infoBgOpacity;
    var displayvalue = '(' + Math.round(infoBgOpacity * 100) + '%)';
    document.getElementById("ImageDescriptionRangeValue" + index).innerText = displayvalue;
    loadAscene(selectedNode);
  }
}

function saveInfoboxImageOnChange(selectedInfobox) {
  if (selectedNode != null && selectedNode != undefined && selectedInfobox != null && selectedInfobox != undefined) {
    nodes[nodes.indexOf(selectedNode)].infoboxes[selectedInfobox].imageName = $('#infobox-image-label-' + selectedInfobox).text();
    nodes[nodes.indexOf(selectedNode)].infoboxes[selectedInfobox].imagePath = $('#infobox-image-path-' + selectedInfobox).text();
    loadAscene(selectedNode);
    // addInfoboxCards(selectedNode);
    // $('#infobox-accordion').find('.collapse').collapse('hide');
    // $("#collapse-infobox-" + selectedInfobox).addClass("show");
  }
}

function saveInfoboxAudioOnChange(selectedInfobox) {
  if (selectedNode != null && selectedNode != undefined && selectedInfobox != null && selectedInfobox != undefined) {
    nodes[nodes.indexOf(selectedNode)].infoboxes[selectedInfobox].audioName = $('#infobox-audio-label-' + selectedInfobox).text();
    nodes[nodes.indexOf(selectedNode)].infoboxes[selectedInfobox].audioPath = $('#infobox-audio-path-' + selectedInfobox).text();
    loadAscene(selectedNode);
  }
}

function setTeleportAndRemove(teleportIndex) {
  if (teleportIndex !== null && teleportIndex !== undefined) {
    nodes.forEach(node => {
      if (selectedNode.id === node.id) {
        node.teleports.forEach(teleport => {
          if (teleportIndex == teleport.teleportIndex) {
            node.teleports.splice(node.teleports.indexOf(teleport), 1);
          }
        });
      }
    });
    teleportIndex--;
    selectedHotspot = null;
    toggleToolbarButtons(selectedHotspot);
    loadAscene(selectedNode);
    addTeleportCards(selectedNode);
    drawMap();
  }
}

function saveTeleportNameOnBlur(index, teleportID) {
  if (selectedNode) {
    var newTeleportName = $('input#teleport-name-input-' + index).val();
    nodes[nodes.indexOf(selectedNode)].teleports[index].name = newTeleportName;
    loadAscene(selectedNode);
    // addTeleportCards(selectedNode);
    $("#teleport-collapse-button-" + index).html(newTeleportName);
    // $('#teleport-accordion').find('.collapse').collapse('hide');
    // $("#collapse-teleport-" + teleportID).addClass("show");
  }
}

function saveTeleportFocusTextOnBlur(index, teleportID) {
  if (selectedNode) {
    nodes[nodes.indexOf(selectedNode)].teleports[index].focusText = $('textarea#teleport-text-input-' + index).val();
    loadAscene(selectedNode);
    // addTeleportCards(selectedNode);
    // $('#teleport-accordion').find('.collapse').collapse('hide');
    // $("#collapse-teleport-" + teleportID).addClass("show");
  }
}

function setTeleportToOnChange(teleportID, index) {
  if (selectedNode) {
    var teleportNode = null;
    var teleportToID = parseInt($('select#teleport-room-selection-' + teleportID).val());
    nodes.forEach(node => {
      if (node.placeIndex == teleportToID)
        teleportNode = node;
    });
    if(teleportToID){
    nodes[nodes.indexOf(selectedNode)].teleports[index].teleportToPlaceIndex = teleportToID;
    nodes[nodes.indexOf(selectedNode)].teleports[index].teleportToPlace = teleportNode.placeName;
    nodes[nodes.indexOf(selectedNode)].teleports[index].teleportToPlaceImage = teleportNode.placeSky;
  }else{
    nodes[nodes.indexOf(selectedNode)].teleports[index].teleportToPlaceIndex = null;
    nodes[nodes.indexOf(selectedNode)].teleports[index].teleportToPlace = "";
    nodes[nodes.indexOf(selectedNode)].teleports[index].teleportToPlaceImage = "";
  }
    drawMap();
    // loadAscene(selectedNode);
    // addTeleportCards(selectedNode);
    // $('#teleport-accordion').find('.collapse').collapse('hide');
    // $("#collapse-teleport-" + teleportID).addClass("show");
  }
}

function setTeleportSelected(teleportIndex) {
  if (selectedHotspot.id != selectedNode.teleports[teleportIndex] || selectedHotspot == null || selectedHotspot == undefined) {
 selectedHotspot =  $("a-sphere#teleport-"+teleportIndex)[0];
    $('#toggleMapEditor').removeClass('disabled');
    $("#graph").addClass("hidden");
    $("#scene").removeClass("hidden");
    toggleMapEditorLabel();
    $(".graph-button").addClass("hidden-label");
    $(".scene-button").removeClass("hidden-label");
    loadAscene(selectedNode);
    $('#editTeleport').removeClass('disabled');
    $('#removeTeleport').removeClass('disabled');
    $('#editInfobox').addClass('disabled');
    $('#removeInfobox').addClass('disabled');
  }
  else if (selectedHotspot == selectedNode.teleports[teleportIndex]) {
    selectedHotspot = null;
    loadAscene(selectedNode);
    $('#editTeleport').addClass('disabled');
    $('#removeTeleport').addClass('disabled');
  }
}

function setInfoboxSelected(infoboxIndex) {
  if (selectedHotspot != selectedNode.infoboxes[infoboxIndex] || selectedHotspot == null || selectedHotspot == undefined) {
    selectedHotspot =  $("a-sphere#infobox-"+infoboxIndex)[0];
    $('#toggleMapEditor').removeClass('disabled');
    $("#graph").addClass("hidden");
    $("#scene").removeClass("hidden");
    toggleMapEditorLabel();
    $(".graph-button").addClass("hidden-label");
    $(".scene-button").removeClass("hidden-label");
    loadAscene(selectedNode);
    $('#editInfobox').removeClass('disabled');
    $('#removeInfobox').removeClass('disabled');
    $('#editTeleport').addClass('disabled');
    $('#removeTeleport').addClass('disabled');
  }
  else if (selectedHotspot == selectedNode.infoboxes[infoboxIndex]) {
    selectedHotspot = null;
    loadAscene(selectedNode);
    $('#editInfobox').addClass('disabled');
    $('#removeInfobox').addClass('disabled');
  }
}

function resizeInfobox(infoboxIndex) {
  var infobox = document.querySelector('a-sphere#infobox-' + infoboxIndex);
  var newInfoboxSize = parseInt($("#infobox-size-input-" + infoboxIndex).val());
  infobox.setAttribute('radius', newInfoboxSize);
  nodes[nodes.indexOf(selectedNode)].infoboxes[infoboxIndex].infoboxSize = newInfoboxSize;
  // var infoboxPosition = infobox.getAttribute('position');
  var teleportText = document.querySelector("#text-" + nodes[nodes.indexOf(selectedNode)].infoboxes[infoboxIndex].infoboxID + " > a-text");
  // var infoboxTextPosition = teleportText.getAttribute('position');
  teleportText.setAttribute('position', '0 ' + (-newInfoboxSize - 2) + ' 0');
}

function opacityInfobox(infoboxIndex) {
  var infobox = document.querySelector('a-sphere#infobox-' + infoboxIndex);
  infobox.setAttribute('opacity', $("#infobox-opacity-input-" + infoboxIndex).val());
  nodes[nodes.indexOf(selectedNode)].infoboxes[infoboxIndex].infoboxVisibility = parseFloat($("#infobox-opacity-input-" + infoboxIndex).val());
}

function resizeTeleport(teleportIndex, teleportID) {
  var newTeleportSize = parseInt($("#teleport-size-input-" + teleportIndex).val());
  nodes[nodes.indexOf(selectedNode)].teleports[teleportIndex].teleportSize = newTeleportSize;
  var teleport = document.querySelector('a-sphere#' + teleportID);
  teleport.setAttribute('radius', newTeleportSize);
  // var teleportPosition = teleport.getAttribute('position');
  var teleportText = document.querySelector("#text-" + teleportID + ' > a-text');
  // var teleportTextPosition = teleportText.getAttribute('position');
  teleportText.setAttribute('position', '0 ' + (-newTeleportSize - 2) + ' 0');
}

function opacityTeleport(teleportIndex, teleportID) {
  var teleport = document.querySelector('a-sphere#' + teleportID);
  teleport.setAttribute('opacity', $("#teleport-opacity-input-" + teleportIndex).val());
  nodes[nodes.indexOf(selectedNode)].teleports[teleportIndex].teleportVisibility = parseFloat($("#teleport-opacity-input-" + teleportIndex).val());
}


function popSnackbar(type, message) {
  var x = document.getElementById("snackbar");
  x.innerText = message;
  x.className = "show " + type;
  setTimeout(function () { x.className = x.className.replace("show " + type, ""); }, 4000);
}

function addEnvironmentTimer() {
  experianceJSON.countdown_timer = parseInt($("#countDownTimer").val());
}
function addPrelaunchTimer() {
  experianceJSON.prelaunch_timer = parseInt($("#prelaunchTimer").val());
}


function addSuccessMessage() {
  experianceJSON.Success_Message = ($("#SuccessMessage").val());
}

function addTotalMarks() {
  experianceJSON.Total_Marks = ($("#totalMarks").val());
}


function addFailuerMessage() {
  experianceJSON.Failuer_Message = ($("#failuerMessage").val());
}


function toggleEndNode(placeIndex) {
  $("#end-message-div-" + placeIndex).prop('hidden', !($("#place-end-node-" + placeIndex).prop('checked')));
  nodes[placeIndex].isEndNode = $("#place-end-node-" + placeIndex).prop('checked');
}

function validateTimer() {
  if ($("#countDownTimer").val() == "" || parseInt($("#countDownTimer").val()) < 1) {
    $("#countDownTimer").val(1);
    experianceJSON.countdown_timer = 1;
  }
  if ($("#countDownTimer").val() > 1000) {
    $("#countDownTimer").val(1000);
    experianceJSON.countdown_timer = 1000;
    popSnackbar("warning", "Countdown time should not greater than 1000.");
  }
}
function validatePrelaunchTimer() {
  if ($("#prelaunchTimer").val() == "" || parseInt($("#prelaunchTimer").val()) < 1) {
    $("#prelaunchTimer").val(1);
    experianceJSON.prelaunch_timer = 1;
  }
  if ($("#prelaunchTimer").val() > 100) {
    $("#prelaunchTimer").val(100);
    experianceJSON.prelaunch_timer = 100;
    popSnackbar("warning", "Initialization time should not greater than 100.");
  }
}

function saveEndNodeMessage(placeIndex) {
  nodes[placeIndex].endMessage = $('textarea#place-end-message-' + placeIndex).val();
}

function endMessageLimitExceed(placeIndex) {
  var clickedId = $('textarea#place-end-message-' + placeIndex).val();
  var len = clickedId.length;
  if (len == 150) {
    popSnackbar("warning", "Limit exceed.");
    return;
  }
}

function removeAudio() {
  experianceJSON.background_sound = '';
  $('#environment-audio-name').text("Choose Background Audio");
}

function mouseEnter(msg) {
  //var div = 'Publish helps you make this Experience available for your Patrons or Public. Just remember to create/assign a Room for the published Experience through the Publish page.';  
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


