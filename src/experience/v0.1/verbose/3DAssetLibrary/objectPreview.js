
var isScaling=true;
var modelScale;
var modelRotation;
var modelSelected=false;
/* Zoom In function on button click */
function zoomInFunction() {
  var ObjectSacleZoomIn = document.getElementById("object-entity");
  var CurrentObjectScale = ObjectSacleZoomIn.getAttribute("scale");
  ObjectSacleZoomIn.setAttribute(
    "scale",
    " " +
      (CurrentObjectScale.x + 0.02) +
      " " +
      (CurrentObjectScale.y + 0.02) +
      " " +
      (CurrentObjectScale.z + 0.02)
  );
}

/* Zoom Out function on button click */
function zoomOutFunction() {
  var ObjectScaleZoomOut = document.getElementById("object-entity");
  var CurrentObjectScale = ObjectScaleZoomOut.getAttribute("scale");
  if (CurrentObjectScale.x - 0.01 >= 0.01) {
    ObjectScaleZoomOut.setAttribute(
      "scale",
      " " +
        (CurrentObjectScale.x - 0.02) +
        " " +
        (CurrentObjectScale.y - 0.02) +
        " " +
        (CurrentObjectScale.z - 0.02)
    );
  }
}

/* On cursor click add animation rotation */
AFRAME.registerComponent("drag-rotate-component", {
  schema: { speed: { default: 1 } },
  init: function() {
    this.ifMouseDown = false;
    this.x_cord = 0;
    this.y_cord = 0;
    document.addEventListener("mousedown", this.OnDocumentMouseDown.bind(this));
    document.addEventListener("mouseup", this.OnDocumentMouseUp.bind(this));
    document.addEventListener("mousemove", this.OnDocumentMouseMove.bind(this));
  },
  OnDocumentMouseDown: function(event) {
    this.ifMouseDown = true;
    this.x_cord = event.clientX;
    this.y_cord = event.clientY;
  },
  OnDocumentMouseUp: function() {
    this.ifMouseDown = false;
  },
  OnDocumentMouseMove: function(event) {
    
  var iframeContent = document.querySelector("#object-entity");
    if (this.ifMouseDown) {
      var temp_x = event.clientX - this.x_cord;
      var temp_y = event.clientY - this.y_cord;
      if (Math.abs(temp_y) < Math.abs(temp_x)) {
        if(isScaling){
        this.el.object3D.rotateY((temp_x * this.data.speed) / 100);
        }
      } else {
        if(isScaling){
        this.el.object3D.rotateX((temp_y * this.data.speed) / 100);
        }
        // iframeContent.setAttribute("rotation"," "+((temp_y * this.data.speed) / 100)+" "+((temp_x * this.data.speed) / 100)+" 0");
      }
      this.x_cord = event.clientX;
      this.y_cord = event.clientY;
    }
  }
});

/*Animation Button Code */
var animationFlag = false;
function startAnimation() {
  var startAnimation = document.getElementById("object-entity");

  startAnimation.setAttribute("rotation", "0 0 0");
  if (animationFlag == false) {
    startAnimation.setAttribute(
      "animation",
      "property: rotation; to: 0 360 0; dur:5000; loop:true; easing: linear;"
    );
    animationFlag = true;
  } else {
    startAnimation.removeAttribute("animation");
    animationFlag = false;
  }
}

function bindModelToIframe(data, url) {
  var type = "";
  var obj = "";
  var mtl = "";
  var gltf='';
  // var text=document.getElementById("loadingImage");
  if(data.data!=undefined){
  if (data.data[0].gltf != "" && data.data[0].gltf != undefined) {
    gltf=url + "" + data.data[0].gltf;
  }
  else if (data.data[0].glb != "" && data.data[0].glb != undefined) {
    gltf=url + "" + data.data[0].glb;
  }

  if (data.data[0].obj != "" && data.data[0].obj != undefined) {
    obj = url + "" + data.data[0].obj;
  }
  if (data.data[0].mtl != "" && data.data[0].mtl != undefined) {
    mtl = url + "" + data.data[0].mtl;
  }

  var iframeContent = document.querySelector("#object-entity");
  if (obj !='' && obj !=undefined) {
    if (obj !='' && obj !=undefined ){
      iframeContent.setAttribute("obj-model", "obj: " + obj + "; mtl:" + mtl);
      }
     
} else if (gltf !='' && gltf !=undefined) {
  iframeContent.setAttribute("gltf-model", "url(" + gltf + ")");
}
else{
// text.setAttribute("value","Add 3D Model");
// text.setAttribute("visible","true");
document.getElementById("loader").style.display = "none";
document.getElementById("errorMessage").innerHTML = "Add 3D Object";
}

}
else{
  // text.setAttribute("value","Add 3D Model");
  // text.setAttribute("visible","true");
  document.getElementById("loader").style.display = "none";
  document.getElementById("errorMessage").innerHTML = "Add 3D Object";
}

}

function bindToIframe(mtl,obj,gltf,model,scale,rotation){
  // var text=document.getElementById("loadingText");
  var animationBtn=document.getElementById('startAnimation');
  animationBtn.classList.add('display-none');
  var iframeContent = document.querySelector("#object-entity");
  if (obj !='' && obj !=undefined) {
   
    if (obj !='' && obj !=undefined && mtl!='' && mtl!=undefined){
    iframeContent.setAttribute("obj-model", "obj: " + obj + "; mtl:" + mtl);
    }
    else {
      iframeContent.setAttribute("obj-model", "obj: " + obj );
    }
  } else if (gltf !='' && gltf !=undefined) {
    iframeContent.setAttribute("gltf-model", "url(" + gltf + ")");
  }
  else if (data.data[0].glb != "" && data.data[0].glb != undefined) {
    iframeContent.setAttribute("gltf-model", "url(" + gltf + ")");
  }
else{
  
  document.getElementById("loader").style.display = "none";
  document.getElementById("errorMessage").innerHTML = "Add 3D Object";
  // text.setAttribute("value","Add 3D Model");
  // text.setAttribute("visible","true");
}

if(model!='' && (model=="obj" || model=="gltf")){
 modelSelected=true;
 modelRotation=rotation;
 modelScale=scale;
}
}
var initialPosition = 0;
function moveObjectUp() {
  if(isScaling){
  initialPosition++;
  var object = document.getElementById("object-entity");
  object.setAttribute("position", "0 " + initialPosition + " -5.4497");
  }
}

function moveObjectDown() {
  if(isScaling){
  initialPosition--;
  var object = document.getElementById("object-entity");
  object.setAttribute("position", "0 " + initialPosition + " -5.4497");
}
}


AFRAME.registerComponent('modify-materials', {
  init: function () {
    // Wait for model to load.
    
  // var text=document.getElementById("loadingText");
    this.el.addEventListener('model-loaded', () => {
      // text.setAttribute("visible","false");
      document.getElementById("loadingImage").style.display = "none";
      document.getElementById("sceneDiv").style.display = "Block";
      if(modelSelected){
       
        this.el.setAttribute("scale",modelScale.x+" "+modelScale.y+" "+modelScale.z);
        this.el.setAttribute("rotation",modelRotation.x+" "+modelRotation.y+" "+modelRotation.z);
      }
      else{
        this.el.setAttribute("scale","0.51 0.51 0.51");
        this.el.setAttribute("rotation","0 0 0");
      }
      if (window.addEventListener) {
        window.addEventListener("mousewheel", scrollScene, false);
        window.addEventListener("DOMMouseScroll", scrollScene, false);
      }
    });
  
  },

error:function(){
  
  console.log("error");
  this.el.addEventListener("error", e => {
  
    console.log("error",error);
})
}
});
$(document).ready(function(){
var slider = document.getElementById("myRange");
// var output = document.getElementById("demo");
// output.innerHTML = slider.value;

slider.oninput = function() {
  isScaling=false;
  // object.setAttribute("rotation", "0 0 0");
  // output.innerHTML = this.value;
  var ObjectScaleZoomOut = document.getElementById("object-entity");
    ObjectScaleZoomOut.setAttribute("scale", " " + this.value+ " " +  this.value +" " + this.value);
}

$("#myRange").mouseleave(function(){
  slider.dragging = false;
  isScaling=true;
});
});




function scrollScene(e){

var upORdown = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

var ObjectScaleZoomOut = document.getElementById("object-entity");
var objScale=ObjectScaleZoomOut.getAttribute('scale');
// var slider = document.getElementById("myRange");
document.getElementById("myRange").value = objScale.x+0.02;
if(upORdown === 1){
ObjectScaleZoomOut.setAttribute("scale", " " +(objScale.x+0.02)+ " " +  (objScale.y+0.02) +" " +(objScale.z+0.02));
}else{
if(objScale.x-0.02>0.0001){
  ObjectScaleZoomOut.setAttribute("scale", " " + (objScale.x-0.02)+ " " + (objScale.y-0.02) +" " + (objScale.z-0.02));
}
}


}

function setSky(){
  var sky =frameDoc.getElementById("sky");
  sky.setAttribute("color",'black');
}