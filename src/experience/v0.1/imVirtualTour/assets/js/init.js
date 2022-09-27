// A-frame related global vars.
registerAframeClickDragComponent(window.AFRAME);
var selectedPlace = null;
var selectedHotspot = null;
var selectedInfobox = null;
var experianceJSON = null;
var experianceData = null;

var svg = null;
var nodes = [];
var lastNodeId = 0;
var links = [];
var force = null;
var drag = null;
var dragLine = null;
var path = null;
var circle = null;
// mouse event vars
var selectedNode = null;
var selectedLink = null;
var mousedownLink = null;
var mousedownNode = null;
var mouseupNode = null;
var teleportColor = "#0F0";
var infoboxColor = "#F00";


// var hotspotsToSave = [];
// var placeToSave = [];
var teleportIndex = 0;
var infoboxIndex = 0;
// var placeIndex = 1;



