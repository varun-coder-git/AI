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
