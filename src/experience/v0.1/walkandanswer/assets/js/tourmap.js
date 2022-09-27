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
var experianceJSON = "";
var fixOpacity = 0.2;
var isNewExperience = true;
var experianceID = 0;
var assettype;
var elementToUpdate;
var selectedElementIndex;
var splashImagePath;

var dataToSave = {};
var mapLable = "Open the 360 View for viewing the Active Place. This opens up the 360 Place for your customization. You can layout your Banners and Hotspots on the same.";


$(document).ready(function () {
  $("#fixOpacity").on("input", function () {
    fixOpacity = $(this).val();
    experianceJSON.Opacity = fixOpacity;
    var displayvalue = '(' + Math.round(fixOpacity * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
  });
});



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
      console.log("Text",  $('#maxCount'));
  }
  
  if (experianceJSON.splash_image) {
    splashImagePath = experianceJSON.splash_image;
    var splashImageName = splashImagePath.split("/")[splashImagePath.split("/").length - 1];
    $("#splashImageLable")[0].children[0].innerText = splashImageName;
  }
  if (experianceJSON.splash_instruction) {
    document.getElementsByClassName("instructionSet").value = experianceJSON.splash_instruction;
    $('.instructionSet').summernote('code', experianceJSON.splash_instruction);
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
    var opacity1 = document.getElementById("fixOpacity")
    opacity1.value = experianceJSON.Opacity;
    var displayvalue = '(' + Math.round(opacity1.value * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
  } else {
    var opacity = document.getElementById("fixOpacity")
    opacity.value = fixOpacity;
    var displayvalue = '(' + Math.round(fixOpacity * 100) + '%)';
    document.getElementById("rangeValue").innerText = displayvalue;
    experianceJSON.Opacity = fixOpacity;
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
  // if (experianceJSON["entry_view"]) {
  //   $("#CamEntity").attr("rotation", experianceJSON["entry_view"]);
  // }
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

// AFRAME.registerComponent('mousedrag', {
// 	init: function () {
// 		this.el.addEventListener('click', function () {
// 			$('#freezeView').removeClass('disabled');
// 		});
// 	}
// });
$('div#scene').mouseup(function () {
  $('#freezeView').removeClass('disabled');
});

function getExperienceToSave() {
  var lauchText = $(".lunchScreenText");
  var lunchTextItem = lauchText[0].value;
  dataToSave.launch_text = lunchTextItem;

  var splashInstruction = $(".instructionSet");
  var item = splashInstruction[0].value;
  dataToSave.splash_instruction = item;
  dataToSave.splash_image = splashImagePath;
  // dataToSave.entry_view = experianceJSON.entry_view;

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
  nodes.forEach(node => {
    node.x = 0;
    node.y = 0;
    node.vx = 0;
    node.vy = 0;
    dataToSave.Nodes.push(node);
  });
  var dataToPost = JSON.stringify(dataToSave);
  return dataToPost;
  //   dataToPost.unwrap();
}



// function getExperienceToSave() {
//   var dataToSave = {};
//   dataToSave.launch_text = experianceJSON.launch_text;
//   dataToSave.splash_instruction = document.getElementById("instructionSet").value;
//   dataToSave.splash_image = splashImagePath;
//   dataToSave.Nodes = [];
//   nodes.forEach(node => {
//     node.x = 0;
//     node.y = 0;
//     node.vx = 0;
//     node.vy = 0;
//     dataToSave.Nodes.push(node);
//   });
//   var dataToPost = JSON.stringify(dataToSave);
//   return dataToPost;
// }

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

function changeSplashImage() {
  assettype = 'Image';
  elementToUpdate = "Splash";
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
  if (elementToUpdate === 'Splash') {
    splashImagePath = assetPath;
    var splashImageName = splashImagePath.split("/")[splashImagePath.split("/").length - 1];
    $("#splashImageLable")[0].children[0].innerText = splashImageName;
  } else if (elementToUpdate === 'Place') {
    $('#place-sky-image-' + selectedElementIndex)[0].children[0].innerText = assetPath.split('/').pop();
    $("#place-image-path-" + selectedElementIndex).text(assetPath);
    $("#sky-image-preview-" + selectedElementIndex).attr('src', assetPath);
    addPlaceSkyToJSON(selectedElementIndex);
  }
  else if (elementToUpdate === 'Infobox') {
    $('#infobox-image-label-' + selectedElementIndex)[0].children[0].innerText = assetPath.split('/').pop();
    $('#infobox-image-path-' + selectedElementIndex).text(assetPath);
    $("#infobox-image-preview-" + selectedElementIndex).attr('src', assetPath);
    saveInfoboxImageOnChange(selectedElementIndex);
  }
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

function addNewPlace() {
  svg.classed('active', true);
  const newPlace = { id: ++lastNodeId, nodeIndex: lastNodeId, placeName: "New place", placeIndex: lastNodeId, placeSky: "assets/images/DefaultNightSky.jpg", placeImageName: "DefaultNightSky.jpg", teleports: [], infoboxes: [] };
  experianceJSON.Nodes.push(newPlace);
  nodes.push(newPlace);
  addPlaceCards(nodes, lastNodeId);
  restart();
}

function removePlace() {
  if (nodes.length == 1) {
    popSnackbar('warning', "Atleast one place is required. Can not remove this place.");
    return;
  }
  if (selectedNode && nodes.length > 1) {
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
    var placeCollapseCard = "<div class='card' id='place'><div class='card-header' id='heading-" + place.placeIndex + "'><h3 class='mb-0'><button class='btn btn-link'  data-toggle='collapse' data-target='#collapse-place-" + place.placeIndex + "' aria-expanded='true' aria-controls='collapse-place-" + place.placeIndex + "' onclick='setNodeSelected(" + index + ")'><span id='place-collapse-button-" + index + "' >" + place.placeName + "</span></button><i class='fa fa-trash float-right trash-icon-position' aria-hidden='true' onmouseenter='mouseEnter(&#39;Remove the selected Place.&#39;);' onmouseleave='mouseLeave()' onclick='setPlaceAndRemove(" + place.placeIndex + ")'></i></h3></div><div id='collapse-place-" + place.placeIndex + "' class='collapse' aria-labelledby='heading-" + place.placeIndex + "' data-parent='#place-accordion'><div class='card-body'><div class='form-group '><label for='place-name-input-" + place.placeIndex + "'>Name</label><input type='text' placeholder='Place name here.' class='form-control input_box_trasparent' id='place-name-input-" + place.placeIndex + "' value='" + place.placeName + "' onchange='saveNameOnBlur(" + index + "," + place.placeIndex + ")' maxlength='30' /></div><div class='form-group'><img class='img-fluid cursor-pointer' id='sky-image-preview-" + place.placeIndex + "'  src=\"" +
    place.placeSky +
    "\" onclick='setSelectedNode(" + place.placeIndex + ")'></div><div class='form-group custom-file mb-2'><input type='button' class='custom-file-input' id='custom-file-input-" + place.placeIndex + "' accept='image/png, image/jpeg' onmouseenter='mouseEnter(\"Place is the 360 view that your Patron sees. You can customize this place with a compatible image through this option. In case if you don&#39;t have a 360 image, you can try uploading a Panoroma OR use the &#39My image is not spherical&#39 checkbox while uploading the image.\");' onmouseleave='mouseLeave()' onclick='changeSkyImage(" + place.placeIndex + ", " + place.placeIndex + ")'><label class='custom-file-label' id='place-sky-image-" + place.placeIndex + "' for='custom-file-input-" + place.placeIndex + "'><span>" + place.placeImageName + "</span></label><label class='hidden-label' id='place-image-path-" + place.placeIndex + "' >" + place.placeSky + "</label><label class='aspect-ratio-style'>Note: Recommended aspect ratio 1:2</label></div></div></div></div>";
    $("#place-accordion").append(placeCollapseCard);
    index++;
  });

  if (newPlaceID != null && newPlaceID != undefined) {
    $('#place-accordion').find('.collapse').collapse('hide');
    $("#collapse-place-" + newPlaceID).addClass("show");
  }

  var addTeleportButton = '<button onmouseenter="mouseEnter(\'Add a new Place in this Experience. You can later link this place from the Default place with the help of a Teleport.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-success float-right mb-2" onclick="addNewPlace()">New Place</button>';
  $("#place-accordion").append(addTeleportButton);

}

function addInfoboxCards(selectedPlace, selectedNewInfoboxID) {
  $("#infobox-accordion").empty();
  if (selectedPlace) {
    $("#infobox-place-name").text('Customize banners for ' + selectedPlace.placeName);
    var index = 0;
    infoboxIndex = 0;
    selectedPlace.infoboxes.forEach(infobox => {
      infobox.infoboxIndex = infoboxIndex;

      if (infobox.imageName && infobox.imagePath) {
        infoboxImage = infobox.imagePath;
        infoboxImageName = infobox.imageName;
      } else {
        infoboxImage = "";
        infoboxImageName = "Choose Image";
      }

      var infoboxCollapseCard = '<div class="card" id="infobox-' + infobox.infoboxIndex + '"><div class="card-header" id="heading' + infobox.infoboxIndex + '"><h3 class="mb-0"><button class="btn btn-link" data-toggle="collapse" data-target="#collapse-infobox-' + infoboxIndex + '" aria-expanded="true" aria-controls="collapse-infobox-' + infoboxIndex + '" onclick="setInfoboxSelected(' + infobox.infoboxIndex + ')"><span id="infobox-collapse-button-' + index + '" >' + infobox.infoboxName + '</span></button><i class="fa fa-trash float-right trash-icon-position" aria-hidden="true" onmouseenter="mouseEnter(\'Remove the currently selected Banner.\');" onmouseleave="mouseLeave()" onclick="setInfoboxAndRemove(' + infobox.infoboxIndex + ')"></i></h3></div><div id="collapse-infobox-' + infoboxIndex + '" class="collapse" aria-labelledby="heading' + infobox.infoboxIndex + '" data-parent="#infobox-accordion"><div class="card-body"><div class="form-group"><label for="infobox-name-input-' + infobox.infoboxIndex + '">Name</label><input type="text" placeholder="Infobox name here." class="form-control input_box_trasparent" id="infobox-name-input-' + infobox.infoboxIndex + '" value="' + infobox.infoboxName + '" onblur="saveInfoboxNameOnBlur(' + index + ');" maxlength="30"></div><div class="form-group"><label for="infobox-type-selection-' + infobox.infoboxIndex + '">Type</label><select class="form-control input_box_trasparent" id="infobox-type-selection-' + infobox.infoboxIndex + '" onchange="toggleInfoboxType(this.value,' + infoboxIndex + ');"><option value="Text" id="' + infobox.infoboxIndex + '-text">Text</option><option value="Image" id="' + infobox.infoboxIndex + '-image" >Image</option></select></div><div class="form-group" id="infobox-text-group-' + infoboxIndex + '"><label for="infobox-text-input-' + infobox.infoboxIndex + '">Info Text</label><textarea maxlength="150"  placeholder="Info Text here." class="form-control input_box_trasparent" id="infobox-text-input-' + infobox.infoboxIndex + '" onblur="saveInfoboxTextOnBlur(' + index + ',\'' + infobox.infoboxID + '\')" >' + infobox.text + '</textarea></div><div class="form-group" id="infobox-text-color-' + infoboxIndex + '"><label>Info Text Font Color</label><input class="jscolor pointer " id="infoTextColor-' + infoboxIndex + '" onchange="changeInfofont(' + index + ')" value="" style="width: 100%"></div><div class="form-group" id="infobox-bg-color-' + infoboxIndex + '"><label>Choose Description Background</label><input class="jscolor  pointer " id="infoboxBgColor-' + infoboxIndex + '" value="#000"  style="width: 100%" onchange="changeInfoBg(' + index + ')"></div><div class="form-group" id="infobox-bg-opacity-' + infoboxIndex + '"><div class="row"><div class="col-10"><label style="color:#fff;width: 100%">Background Opacity(Drag tochange):</label></div><div class="col-2"><label id="ImageDescriptionRangeValue' + infobox.infoboxIndex + '">(60%)</label></div></div><div class="slidecontainer"><input type="range" min="0.1" max="1" step="0.001" value="" class="slider" oninput="changeOpacity( this,' + infobox.infoboxIndex + ')" id="descriptionBgOpacity-' + infobox.infoboxIndex + '" /></div></div><div class="form-group" id="infobox-image-preview-div-' + infoboxIndex + '"><img class="img-fluid" id="infobox-image-preview-' + infoboxIndex + '"  src=' + infoboxImage + ' ></div><div class="form-group custom-file mb-5" id="infobox-image-group-' + infoboxIndex + '"><input type="button" class="custom-file-input" id="infobox-image-input-' + infobox.infoboxIndex + '"  onclick="addInfoboxImage(' + infoboxIndex + ', ' + selectedPlace.placeIndex + ')"><label class="custom-file-label" id="infobox-image-label-' + infobox.infoboxIndex + '" for="infobox-image-input-' + infobox.infoboxIndex + '"><span>' + infoboxImageName + '</span></label><label class="hidden-label" id="infobox-image-path-' + infobox.infoboxIndex + '" >' + infoboxImage + '</label><label class="aspect-ratio-style">Note: Note: Note: Recommended aspect ratio 16:9</label></div><div class="form-group"><label for="infobox-size-input-' + infoboxIndex + '">Infobox Size</label><input type="range" min="1" max="10" step="0.01" value="' + parseInt(infobox.infoboxSize) + '" class="slider" id="infobox-size-input-' + infobox.infoboxIndex + '" oninput="resizeInfobox(' + infobox.infoboxIndex + ');"></div><div class="form-group"><label for="infobox-opacity-input-' + infoboxIndex + '">Infobox Visibility</label><input type="range" min="0" max="1" step="0.001" value="' + parseFloat(infobox.infoboxVisibility) + '" class="slider" id="infobox-opacity-input-' + infobox.infoboxIndex + '" oninput="opacityInfobox(' + infobox.infoboxIndex + ');"></div><div class="form-group" id="infobox-bg-banner-color-' + infoboxIndex + '"><label>Infobox Button Color</label><input class="jscolor pointer " id="infoboxBgBannerColor-' + infobox.infoboxIndex + '" value="#ff0000" style="width: 100%" onchange="changeInfoBannerBg(' + index + ')"></div></div></div></div>';
      $("#infobox-accordion").append(infoboxCollapseCard);
      jscolor.installByClassName("jscolor");
      if (nodes[nodes.indexOf(selectedNode)].infoboxes[index].infoFontColor) {
        var fontcolor = document.getElementById("infoTextColor-" + infoboxIndex);
        fontcolor.style.backgroundColor = nodes[nodes.indexOf(selectedNode)].infoboxes[index].infoFontColor;
      }
      if (nodes[nodes.indexOf(selectedNode)].infoboxes[index].infoBgColor) {
        var bgcolor = document.getElementById("infoboxBgColor-" + infoboxIndex);
        bgcolor.style.backgroundColor = nodes[nodes.indexOf(selectedNode)].infoboxes[index].infoBgColor;
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
      $('#infobox-accordion').find('.collapse').collapse('hide');
      $("#collapse-infobox-" + selectedNewInfoboxID).addClass("show");
    }
    var addInfobxButton = '<button onmouseenter="mouseEnter(\'Create a New Banner using this option. You can customize the Banner Settings through the Tab on the Left.\');" onmouseleave="mouseLeave()" type="button" class="btn btn-success float-right mb-2" onclick="addNewInfobox()">New Banner</button>';
    $("#infobox-accordion").append(addInfobxButton);
  }
}

function addTeleportCards(selectedPlace, selectedNewTeleportID) {
  $("#teleport-accordion").empty();
  if (selectedPlace) {
    $("#teleport-place-name").text('Customize teleports for ' + selectedPlace.placeName);
    var index = 0;
    teleportIndex = 0;
    selectedPlace.teleports.forEach(teleport => {

      teleport.teleportIndex = teleportIndex;
      var selectQuetionPanel = '  <div class="form-group"><label for="questionPanelSelect" >Survey Panel Background:</label><div class="row"> <div class="col-2 icon-padding"><div  id="i0-Panelcss' + teleport.teleportIndex + '" class="p-1 icon-selected" ><img src="/act/v0.1/walkandanswer/assets/images/Panel/default_t.jpg" alt="default" onclick="changewalkandanswerPanel(this,' + index + ', \'' + teleport.teleportIndex + '\')" alt="location" class="image_size img-responsive " id="i0-Panel"></div></div><div class="col-2 icon-padding"><div   id="i1-Panelcss' + teleport.teleportIndex + '" class="p-1"><img src="/act/v0.1/walkandanswer/assets/images/Panel/gold_t.jpg"  alt="gold" onclick="changewalkandanswerPanel(this,' + index + ', \'' + teleport.teleportIndex + '\')" alt="location" class="image_size img-responsive" id="i1-Panel"></div></div><div class="col-2 icon-padding"><div  id="i2-Panelcss' + teleport.teleportIndex + '" class="p-1"><img src="/act/v0.1/walkandanswer/assets/images/Panel/gray_t.jpg" alt="gray" onclick="changewalkandanswerPanel(this,' + index + ', \'' + teleport.teleportIndex + '\')" alt="location" class="image_size img-responsive" id="i2-Panel" ></div></div> <div class="col-2 icon-padding"> <div id="i3-Panelcss' + teleport.teleportIndex + '" class="p-1"><img src="/act/v0.1/walkandanswer/assets/images/Panel/green_t.jpg" alt="green"onclick="changewalkandanswerPanel(this,' + index + ', \'' + teleport.teleportIndex + '\')" alt="location" class="image_size img-responsive" id="i3-Panel"></div></div><div class="col-2 icon-padding"><div  id="i4-Panelcss' + teleport.teleportIndex + '" class="p-1"><img src="/act/v0.1/walkandanswer/assets/images/Panel/lemon_t.jpg" alt="lemon" onclick="changewalkandanswerPanel(this,' + index + ', \'' + teleport.teleportIndex + '\')" alt="location" class="image_size img-responsive" id="i4-Panel"  ></div></div><div class="col-2 icon-padding"><div id="i5-Panelcss' + teleport.teleportIndex + '" class="p-1"><img src="/act/v0.1/walkandanswer/assets/images/Panel/lightgreen_t.jpg" alt="lightgreen" onclick="changewalkandanswerPanel(this,' + index + ', \'' + teleport.teleportIndex + '\')" alt="location" class="image_size img-responsive" id="i5-Panel" ></div> </div><div class="col-2 icon-padding"><div  id="i6-Panelcss' + teleport.teleportIndex + '" class="p-1"><img src="/act/v0.1/walkandanswer/assets/images/Panel/pink_t.jpg" alt="pink" onclick="changewalkandanswerPanel(this,' + index + ', \'' + teleport.teleportIndex + '\')" alt="location" class="image_size img-responsive" id="i6-Panel"></div> </div> <div class="col-2 icon-padding"><div  id="i7-Panelcss' + teleport.teleportIndex + '"  class="p-1"><img src="/act/v0.1/walkandanswer/assets/images/Panel/purple_t.jpg" alt="purple" onclick="changewalkandanswerPanel(this,' + index + ', \'' + teleport.teleportIndex + '\')" alt="location" class="image_size img-responsive" id="i7-Panel"   ></div> </div> <div class="col-2 icon-padding"> <div  id="i8-Panelcss' + teleport.teleportIndex + '"  class="p-1"> <img src="/act/v0.1/walkandanswer/assets/images/Panel/red_t.jpg" alt="red" onclick="changewalkandanswerPanel(this,' + index + ', \'' + teleport.teleportIndex + '\')" alt="location" class="image_size img-responsive" id="i8-Panel"    ></div> </div> <div class="col-2 icon-padding"> <div id="i9-Panelcss' + teleport.teleportIndex + '" class="p-1"><img src="/act/v0.1/walkandanswer/assets/images/Panel/royalblue_t.jpg" alt="royalblue" onclick="changewalkandanswerPanel(this,' + index + ', \'' + teleport.teleportIndex + '\')"  alt="location" class="image_size img-responsive" id="i9-Panel" ></div> </div> <div class="col-2 icon-padding"> <div id="i10-Panelcss' + teleport.teleportIndex + '" class="p-1"> <img src="/act/v0.1/walkandanswer/assets/images/Panel/neavyblue_t.jpg" alt="neavyblue" onclick="changewalkandanswerPanel(this,' + index + ', \'' + teleport.teleportIndex + '\')"  alt="location" class="image_size img-responsive" id="i10-Panel" ></div> </div><div class="col-2 icon-padding"><div  id="i11-Panelcss' + teleport.teleportIndex + '" class="p-1"><img src="/act/v0.1/walkandanswer/assets/images/Panel/orange_t.jpg" alt="orange" onclick="changewalkandanswerPanel(this,' + index + ', \'' + teleport.teleportIndex + '\')"  alt="location" class="image_size img-responsive" id="i11-Panel" ></div> </div></div> </div>';

      var teleportCollapseCard = '<div class="card" id="telport-' + teleport.teleportIndex + '"><div class="card-header" id="heading' + teleport.teleportIndex + '"><h3 class="mb-0"><button class="btn btn-link" data-toggle="collapse" data-target="#collapse-teleport-' + teleport.teleportID + '" aria-expanded="true" aria-controls="collapse-teleport-' + teleport.teleportID + '" onclick="setTeleportSelected(' + teleport.teleportIndex + ')"><span id="teleport-collapse-button-' + index + '" >' + teleport.name + '</span></button><i class="fa fa-trash float-right trash-icon-position" aria-hidden="true" onmouseenter="mouseEnter(\'Remove the selected Teleport\');" onmouseleave="mouseLeave()" onclick="setTeleportAndRemove(' + teleport.teleportIndex + ')"></i></h3></div><div id="collapse-teleport-' + teleport.teleportID + '" class="collapse" aria-labelledby="heading' + teleport.teleportIndex + '" data-parent="#teleport-accordion"><div class="card-body">' + selectQuetionPanel + '<div class="form-group"><label for="teleport-name-input-' + teleportIndex + '">Name</label><input type="text" placeholder="Teleport name here." class="form-control input_box_trasparent" id="teleport-name-input-' + teleport.teleportIndex + '" value="' + teleport.name + '" onchange="saveTeleportNameOnBlur(' + index + ', \'' + teleport.teleportID + '\')" maxlength="30"></div><div class="form-group"><label for="teleport-focus-input-' + teleport.teleportIndex + '">Survey Question</label><textarea maxlength="150" placeholder="Survey question here." class="form-control input_box_trasparent" id="teleport-text-input-' + teleport.teleportIndex + '" value="' + teleport.Question + '" onchange="saveTeleportFocusTextOnBlur(' + index + ',\'' + teleport.teleportID + '\')">' + teleport.Question + '</textarea><label id="question-validation-' + teleport.teleportID + '" class="validationLabel" style="color:white;">Leave question field blank to navigate directly.</label></div><div class="form-group"><label for="teleport-' + teleport.teleportIndex + '-option-0">Option 1</label><input type="text" placeholder="Option 1 here" class="form-control input_box_trasparent" id="teleport-' + teleport.teleportIndex + '-option-0" value="" onchange="saveTeleportOptionOnBlur(' + index + ', 0 , \'' + teleport.teleportID + '\')" onkeydown="validateOptions(' + index + ', 0 , \'' + teleport.teleportID + '\')"><label id="option-0-validation-' + teleport.teleportID + '" class="validationLabel hidden-label" style="color:red;">Enter first option.</label></div><div class="form-group"><label for="teleport-' + teleport.teleportIndex + '-option-1">Option 2</label><input type="text" placeholder="Option 2 here" class="form-control input_box_trasparent" id="teleport-' + teleport.teleportIndex + '-option-1" value="" onchange="saveTeleportOptionOnBlur(' + index + ', 1 , \'' + teleport.teleportID + '\')" onkeydown="validateOptions(' + index + ', 1 , \'' + teleport.teleportID + '\')"><label id="option-1-validation-' + teleport.teleportID + '" class="validationLabel hidden-label" style="color:red;">Enter second option.</label></div><div class="form-group"><label for="teleport-' + teleport.teleportIndex + '-option-2">Option 3</label><input type="text" placeholder="Option 3 here" class="form-control input_box_trasparent" id="teleport-' + teleport.teleportIndex + '-option-2" value="" onchange="saveTeleportOptionOnBlur(' + index + ', 2 , \'' + teleport.teleportID + '\')"></div><div class="form-group"><label for="teleport-' + teleport.teleportIndex + '-option-3">Option 4</label><input type="text" placeholder="Option 4 here" class="form-control input_box_trasparent" id="teleport-' + teleport.teleportIndex + '-option-3" value="' + teleport.Options[3].option + '" onchange="saveTeleportOptionOnBlur(' + index + ', 3 , \'' + teleport.teleportID + '\')"></div><div class="form-group"><label for="teleport-room-selection-' + teleport.teleportID + '">Teleport to</label><select class="form-control input_box_trasparent" id="teleport-room-selection-' + teleport.teleportID + '" onchange="setTeleportToOnChange(\'' + teleport.teleportID + '\',' + index + ')"></select></div><div class="form-group"><label for="teleport-size-input-' + teleport.teleportIndex + '">Teleport Size</label><input type="range" min="0.1" max="10" step="0.01" value="' + parseInt(teleport.teleportSize) + '" class="slider" id="teleport-size-input-' + teleport.teleportIndex + '" oninput="resizeTeleport(' + teleport.teleportIndex + ',\'' + teleport.teleportID + '\');"></div><div class="form-group"><label for="teleport-opacity-input-' + teleport.teleportIndex + '">Teleport Visibility</label><input type="range" min="0" max="1" step="0.001" value="' + teleport.teleportVisibility + '" class="slider" id="teleport-opacity-input-' + teleport.teleportIndex + '" oninput="opacityTeleport(' + teleport.teleportIndex + ',\'' + teleport.teleportID + '\');"></div></div></div></div>';

      $("#teleport-accordion").append(teleportCollapseCard);
      $("#teleport-" + teleport.teleportIndex + "-option-0").val(teleport.Options[0].option);
      $("#teleport-" + teleport.teleportIndex + "-option-1").val(teleport.Options[1].option);
      $("#teleport-" + teleport.teleportIndex + "-option-2").val(teleport.Options[2].option);
      $("#teleport-" + teleport.teleportIndex + "-option-3").val(teleport.Options[3].option);
      if (teleport.Question.trim(" ").length > 0) {
        //$('#question-validation-'+teleport.teleportID).addClass('hidden-label');
        if (teleport.Options[0].option.trim(" ").length <= 0) {
          $('#option-0-validation-' + teleport.teleportID).removeClass('hidden-label');
        }
        if (teleport.Options[1].option.trim(" ").length <= 0) {
          $('#option-1-validation-' + teleport.teleportID).removeClass('hidden-label');
        }
      }
      var options = "<option value='' id='' selected disabled>Select a place</option>";
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
      if (teleport.questionPanel && teleport.questionPanelClass) {
        selectedQuetionPanel(teleport.questionPanelClass, teleport.teleportIndex);
      }
      index++;
      teleportIndex++;
    });
    if (selectedNewTeleportID != null && selectedNewTeleportID != undefined) {
      selectedHotspot = document.getElementById('' + selectedNewTeleportID);
      $('#teleport-accordion').find('.collapse').collapse('hide');
      $("#collapse-teleport-" + selectedNewTeleportID).addClass("show");
    }
    var addTeleportButton = '<button type="button" onmouseenter="mouseEnter(\'Add a new Teleport using this option. You can customize the navigation action for this Teleport through the Teleport Tab on the left.\');" onmouseleave="mouseLeave()" class="btn btn-success float-right mb-2" onclick="addNewTeleport()">New Teleport</button>';
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
    mapLable = "Open the Map View of the Experience. You can create a holastic map view of the Places that your Experience currently has. Each of the Teleport denotes an Arrow tail from the Place Arrow head denotes which place it leads to.";
    $("#toggleMapEditorImage").attr('src', 'assets/images/mapwhite.png');
  }
  else if ($("#scene").hasClass('hidden')) {
    $('.place-buttons').removeClass('hidden-label');
    $('.infobox-buttons').addClass('hidden-label');
    $('.teleport-buttons').addClass('hidden-label');
    $("#toggleMapEditorName").text("360 place");
    $("#freezeView").addClass("hidden-label");
    $("#freezeView").removeClass("visible");
    $("#toggleMapEditorImage").attr('src', 'assets/images/360white.png');
    mapLable = "Open the 360 View for viewing the Active Place. This opens up the 360 Place for your customization. You can layout your Banners and Hotspots on the same. ";
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
      newTeleport.setAttribute('text', 'value', '' + teleport.Question);
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

function addNewTeleport() {
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
    "Question": "",
    "teleportToPlace": "",
    "teleportToPlaceImage": "",
    "teleportToPlaceIndex": null,
    "isEndNode": false,
    "endMessage": "",
    "teleportPosition": "" + position.x + " " + position.y + " " + position.z,
    "teleportID": "teleport-" + teleportIndex,
    "teleportSize": 5,
    "teleportVisibility": 0.5,
    "Options": [{ "option": "" }, { "option": "" }, { "option": "" }, { "option": "" }]
  }
  var selectedNewTeleportID = newTeleportObject.teleportID;
  selectedNode.teleports.push(newTeleportObject);
  addTeleportCards(selectedNode, selectedNewTeleportID);
}

function addNewInfobox() {
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
    "video": "",
    "infoboxPosition": "" + position.x + " " + position.y + " " + position.z + "",
    "infoboxSize": 5,
    "infoboxVisibility": 0.5,
  }
  selectedNode.infoboxes.push(newInfoboxObject);
  addInfoboxCards(selectedNode, infoboxIndex);
  // infoboxIndex++;
}

function changeSkyImage(placeIndex, place) {

  uploadImage('Place', placeIndex, place);
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
    //addInfoboxes();
  }
}

function editInfobox() {
  if (selectedHotspot && selectedHotspot.getAttribute('type') === 'infobox') {
    toggleSideNav('infoboxSidenav');
    $('#infobox-accordion').find('.collapse').collapse('hide');
    $('#collapse-' + selectedHotspot.getAttribute('id')).addClass("show");
  }
}

function editTeleport() {
  if (selectedHotspot && selectedHotspot.getAttribute('type') === 'teleport') {
    toggleSideNav('teleportSidenav');
    $('#teleport-accordion').find('.collapse').collapse('hide');
    $('#collapse-' + selectedHotspot.getAttribute('id')).addClass("show");
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
  }
  else if (type === "Text") {
    $("#infobox-text-group-" + infoboxIndex).prop('hidden', false);
    $("#infobox-text-color-" + infoboxIndex).prop('hidden', false);
    $('#infobox-bg-opacity-' + infoboxIndex).prop('hidden', false);
    $("#infobox-bg-color-" + infoboxIndex).prop('hidden', false);
    $("#infobox-image-group-" + infoboxIndex).prop('hidden', true);
    $("#infobox-image-preview-div-" + infoboxIndex).prop('hidden', true);
  }
  nodes[nodes.indexOf(selectedNode)].infoboxes[infoboxIndex].infoboxType = $("select#infobox-type-selection-" + infoboxIndex).val();
}

function addInfoboxImage(infoboxIndex, selectedPlace) {
  uploadImage('Infobox', infoboxIndex, selectedPlace);
}

function addLaunchScreenText() {
  experianceJSON.launch_text = document.getElementById("lunchScreenText").value;
}

$("#overlay").click(function () {
  $(".sidenav").removeClass('active');
  $("#overlay").removeClass('overlay');
});

function setPlaceAndRemove(placeIndex) {
  if (nodes.length == 1) {
    popSnackbar('warning', "Atleast one place is required. Can not remove this place.");
    return;
  }
  if (placeIndex && nodes.length > 1) {
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
    //addInfoboxes(selectedNode);
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


function saveInfoboxTextOnBlur(index, infoboxID) {
  if (selectedNode) {
    nodes[nodes.indexOf(selectedNode)].infoboxes[index].text = $('textarea#infobox-text-input-' + index).val();
    loadAscene(selectedNode);
    // addInfoboxCards(selectedNode);
    // $('#infobox-accordion').find('.collapse').collapse('hide');
    // $("#collapse-infobox-" + index).addClass("show");
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
    if ($('textarea#teleport-text-input-' + index).val() !== "") {
      //$('#question-validation-'+teleportID).addClass('hidden-label');
      nodes[nodes.indexOf(selectedNode)].teleports[index].Question = $('textarea#teleport-text-input-' + index).val();
      if (nodes[nodes.indexOf(selectedNode)].teleports[index].Options[0].option.trim(" ").length <= 0) {
        $('#option-0-validation-' + teleportID).removeClass('hidden-label');
      }
      if (nodes[nodes.indexOf(selectedNode)].teleports[index].Options[0].option.trim(" ").length <= 0) {
        $('#option-1-validation-' + teleportID).removeClass('hidden-label');
      }
      loadAscene(selectedNode);
    }
    else {
      //$('#question-validation-'+teleportID).removeClass('hidden-label');
      $('#option-0-validation-' + teleportID).addClass('hidden-label');
      $('#option-1-validation-' + teleportID).addClass('hidden-label');
    }
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
    nodes[nodes.indexOf(selectedNode)].teleports[index].teleportToPlaceIndex = teleportToID;
    nodes[nodes.indexOf(selectedNode)].teleports[index].teleportToPlace = teleportNode.placeName;
    nodes[nodes.indexOf(selectedNode)].teleports[index].teleportToPlaceImage = teleportNode.placeSky;
    drawMap();
    // loadAscene(selectedNode);
    // addTeleportCards(selectedNode);
    // $('#teleport-accordion').find('.collapse').collapse('hide');
    // $("#collapse-teleport-" + teleportID).addClass("show");
  }
}

function setTeleportSelected(teleportIndex) {
  if (selectedHotspot != selectedNode.teleports[teleportIndex] || selectedHotspot == null || selectedHotspot == undefined) {
    selectedHotspot = selectedNode.teleports[teleportIndex];
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
    selectedHotspot = selectedNode.infoboxes[infoboxIndex];
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
function validateOptions(index, optionIndex, teleportID){
    if (selectedNode) {
      if ($('input#teleport-' + index + '-option-' + optionIndex).val() == "" && optionIndex != 3) {
        if(optionIndex == 0){
          $('#option-0-validation-' + teleportID).addClass('hidden-label');
        }else{
          $('#option-1-validation-' + teleportID).addClass('hidden-label');
        }
      }
      else {
        if(optionIndex == 0){
          $('#option-0-validation-' + teleportID).removeClass('hidden-label');
        }else{
          $('#option-1-validation-' + teleportID).removeClass('hidden-label');
        }
      }
    }
}

function saveTeleportOptionOnBlur(index, optionIndex, teleportID) {
  if (selectedNode) {

    var selectedNodeIndex = nodes.indexOf(selectedNode);

    if ($('input#teleport-' + index + '-option-' + optionIndex).val() == "" && optionIndex != 3) {
      for (var i = optionIndex; i < 4; i++) {
        if ($('input#teleport-' + index + '-option-' + (i + 1)).val() == undefined) {
          nodes[selectedNodeIndex].teleports[index].Options[i].option = "";
        }
        else {
          nodes[selectedNodeIndex].teleports[index].Options[i].option = $('input#teleport-' + index + '-option-' + (i + 1)).val();
        }
      }
    }
    else {
      for (var i = 0; i < 4; i++) {
        if (nodes[selectedNodeIndex].teleports[index].Options[i].option == "" || nodes[selectedNodeIndex].teleports[index].Options[i].option == undefined || nodes[selectedNodeIndex].teleports[index].Options[i].option == null) {
          nodes[selectedNodeIndex].teleports[index].Options[i].option = $('input#teleport-' + index + '-option-' + optionIndex).val();
          break;
        }
        else if (optionIndex == i) {
          nodes[selectedNodeIndex].teleports[index].Options[i].option = $('input#teleport-' + index + '-option-' + optionIndex).val();
          break;
        }
      }
    }

    loadAscene(selectedNode);
    // addTeleportCards(selectedNode);
    // $('#teleport-accordion').find('.collapse').collapse('hide');
    // $("#collapse-teleport-" + teleportID).addClass("show");
  }
}



function popSnackbar(type, message) {
  var x = document.getElementById("snackbar");
  x.innerText = message;
  x.className = "show " + type;
  setTimeout(function () { x.className = x.className.replace("show " + type, ""); }, 4000);
}

// function toggleEndNode(placeIndex){
//   $("#end-message-div-"+placeIndex ).prop('hidden', !($("#place-end-node-" + placeIndex).prop('checked')));
//   nodes[placeIndex].isEndNode = $("#place-end-node-" + placeIndex).prop('checked');
// }

document.addEventListener('keydown', function (event) {
  if (event.keyCode === 27) {
    if (selectedHotspot != null || selectedHotspot != undefined) {

      $("#" + selectedHotspot.getAttribute('id')).trigger("dragend");
    }
  }
});

function mouseEnter(msg) {
  //var div = 'Publish helps you make this Experience available for your Patrons or Public. Just remember to create/assign a Room for the published Experience through the Publish page.';  
  window.parent.mouseEnter(msg);
}

function mouseLeave() {
  window.parent.mouseLeave();
}
function changewalkandanswerPanel(evn, panelIndex, teleportIndex) {
  var selectedPanelId;
  questionPanel = true;
  // var storyId = id.split('-')[1];
  for (var i = 0; i < 12; i++) {
    var PanelIds = 'i' + i + '-Panelcss' + panelIndex + '';
    if (document.querySelector("#" + PanelIds).classList.contains('icon-selected')) {
      document.querySelector("#" + PanelIds).classList.remove('icon-selected');
    }
  }
  document.querySelector("#" + evn.id + "css" + panelIndex + "").classList.add('icon-selected');

  selectedPanelId = "#" + evn.id + "css" + panelIndex + "";
  if (selectedNode) {
    nodes[nodes.indexOf(selectedNode)].teleports[teleportIndex].questionPanelClass = selectedPanelId;
    nodes[nodes.indexOf(selectedNode)].teleports[teleportIndex].questionPanel = evn.alt;
    loadAscene(selectedNode);
  }
  //questionIcons = '';
  // pointandanswerGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson, imagesPointSTory);
}
function selectedQuetionPanel(panelId, panelIndex) {
  for (var i = 0; i < 12; i++) {
    var PanelIds = 'i' + i + '-Panelcss' + panelIndex + '';
    if (document.querySelector("#" + PanelIds).classList.contains('icon-selected')) {
      document.querySelector("#" + PanelIds).classList.remove('icon-selected');
    }
  }
  document.querySelector(panelId).classList.add('icon-selected');


  //questionIcons = '';
  // pointandanswerGenerator(experianceJSON, settingsVisibilityJson, settingsTypeJson, imagesPointSTory);
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
                    var t = e.currentTarget.innerText; 
                    $('#maxCount').text( t.length);
                    if (t.length >= 350) {
                      if (e.keyCode != 8 ){
                          if (e.keyCode != 65 ) {
                            if (e.keyCode != 67 ) {
                              if (e.keyCode != 90 ) {
                                if (e.keyCode != 88 ) {
                                  if (e.keyCode != 86) {
                                  if (e.keyCode != 46 ) {
                      popSnackbar("warning", "Limit exceed.");
                        e.preventDefault(); 
                                }}}}}
                          } 
                      }
                    } 
                },
              onKeyup: function (e) {
                  var t = e.currentTarget.innerText;
                  $('.maxContentPost').text(350 - t.trim().length);
                  $('#maxCount').text( t.length);
              },
              onPaste: function (e) {
                  var t = e.currentTarget.innerText;
                $('#maxCount').text( t.length);
                  var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                  e.preventDefault();
                  var maxPaste = bufferText.length;
                  if(t.length + bufferText.length > 350){
                    popSnackbar("warning", "Limit exceed.");
                      maxPaste = 350 - t.length;
                  }
                  if(maxPaste > 0){
                      document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
                  }
                  $('.maxContentPost').text(350 - t.length);
              }    
  }
  });
  
  
  /* Summernote MAxlength, maxcount and popsnacker */