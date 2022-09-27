/* Zoom In function on button click */
function zoomInFunction() {
  var ObjectSacleZoomIn = document.getElementById("changeObjectScale");
  var CurrentObjectScale = ObjectSacleZoomIn.getAttribute("scale");
  console.log(
    "scale:",
    CurrentObjectScale.x,
    CurrentObjectScale.y,
    CurrentObjectScale.x
  );
  ObjectSacleZoomIn.setAttribute(
    "scale",
    " " +
      (CurrentObjectScale.x + 0.05) +
      " " +
      (CurrentObjectScale.y + 0.05) +
      " " +
      (CurrentObjectScale.z + 0.05)
  );
}

/* Zoom Out function on button click */
function zoomOutFunction() {
  var ObjectScaleZoomOut = document.getElementById("changeObjectScale");
  var CurrentObjectScale = ObjectScaleZoomOut.getAttribute("scale");
  console.log(
    "scale:",
    CurrentObjectScale.x,
    CurrentObjectScale.y,
    CurrentObjectScale.x
  );
  if (CurrentObjectScale.x - 0.01 >= 0.01) {
    ObjectScaleZoomOut.setAttribute(
      "scale",
      " " +
        (CurrentObjectScale.x - 0.05) +
        " " +
        (CurrentObjectScale.y - 0.05) +
        " " +
        (CurrentObjectScale.z - 0.05)
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
    if (this.ifMouseDown) {
      var temp_x = event.clientX - this.x_cord;
      var temp_y = event.clientY - this.y_cord;
      if (Math.abs(temp_y) < Math.abs(temp_x)) {
        this.el.object3D.rotateY((temp_x * this.data.speed) / 100);
      } else {
        this.el.object3D.rotateX((temp_y * this.data.speed) / 100);
      }
      this.x_cord = event.clientX;
      this.y_cord = event.clientY;
    }
  }
});

/*Animation Button Code */
var animationFlag = false;
function StartAnimation() {
  var startAnimation = document.getElementById("changeObjectScale");
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

function bindModel() {
  debugger;
  $.getJSON("./experience.json", function(data) {
    console.log("json", data);
    var type = data.type;
    var obj = data.model;
    var mtl = data.mtl;
    var iframe = document.querySelector("#id_description_iframe");
    var iframeDocument =
      iframe.contentDocument || iframe.contentWindow.document;
    if (!iframeDocument) {
      throw "iframe couldn't be found in DOM.";
    }
    var iframeContent = iframeDocument.getElementById("changeObjectScale");
    if (type == "obj") {
      iframeContent.setAttribute(
        "obj-model",
        "obj: " + obj + "; mtl:" + mtl + ";"
      );
    } else if (type == "gltf") {
      iframeContent.setAttribute("gltf-model", obj);
    }
  });
}
