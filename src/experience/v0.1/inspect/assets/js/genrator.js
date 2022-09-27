/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
var innerImageURL = null;
var fullMarkerURL = null;
var imageName = null;
var markerIndex=0;
var token = localStorage.getItem("token");
var userId = localStorage.getItem("userId");
//var baseURL = 'https://betaapi.experizer.com:444/';
var baseURL = 'https://alpha-dev.experizer.com/api/';
function updateFullMarkerImage(filename,imageParentFolder) {
  // get patternRatio
  var patternRatio = 0.6;
  var imageSize = "2470";
  var borderColor = "black";

  function hexaColor(color) {
    return /^#[0-9A-F]{6}$/i.test(color);
  }

  var s = new Option().style;
  s.color = borderColor;
  if (
    borderColor === "" ||
    (s.color != borderColor && !hexaColor(borderColor))
  ) {
    // if color not valid, use black
    borderColor = "black";
  }

  THREEx.ArPatternFile.buildFullMarker(
    innerImageURL,
    patternRatio,
    imageSize,
    borderColor,
    function onComplete(markerUrl) {

      fullMarkerURL = markerUrl;

      var fullMarkerImage = document.createElement("img");
      fullMarkerImage.src = fullMarkerURL;

     var container = document.querySelector("#imageContainer");
      while (container.firstChild) container.removeChild(container.firstChild);
      container.appendChild(fullMarkerImage);
        
        THREEx.ArPatternFile.encodeImageURL(innerImageURL, function onComplete(
                patternFileString
              ) {
                // THREEx.ArPatternFile.triggerDownload(
                //   patternFileString,
                //   "marker"+markerIndex+ ".patt"
                // );
                // var domElement = window.document.createElement('a');
                // domElement.href = window.URL.createObjectURL(new Blob([patternFileString], {type: 'text/plain'}));
                // localStorage.setItem("marker"+markerIndex+ ".patt",domElement.href );
                var url1 = baseURL+"asset/uploadMarkerImage";   
                var xhttp = new XMLHttpRequest();
               xhttp.onreadystatechange = function() {
                   if(xhttp.readyState === 4)
                   {
                   if(xhttp.response){
                       var json = JSON.parse(xhttp.response);
                    if (json.status) {
                    
                    }else{   
                     
                   }
                   }
               }
               };
                 var jsonData={
                    "userId": userId,
                    "patternFileData":patternFileString,
                    "FileName": filename,
                    "parentFolderPath":imageParentFolder,
               };
               xhttp.open("POST",url1,true);
               xhttp.setRequestHeader("Content-type", "application/json");
              //  xhttp.setRequestHeader("Accept", "application/json, text/plain, */*");
               xhttp.setRequestHeader("x-access-token", token);
               xhttp.send(JSON.stringify(jsonData));
            
              });
    });
}

async function generateMarkerPatternFile(imagename,imageUrl) {
   var  imageName=imagename.substr(0,(imagename).lastIndexOf('.'));
     imageParentFolder=imageUrl.replace(baseURL, '');
     imageParentFolder=imageParentFolder.substr(0,(imageParentFolder).lastIndexOf('/'));
     console.log("imageParentFolder",imageParentFolder);
     let base64image = getBase64Image(imageUrl).then(function(base64image) {
      innerImageURL=base64image;
       updateFullMarkerImage(imageName,imageParentFolder);
    }, function(reason) {
      console.log(reason); // Error!
    });
}

async function generateMarkerImageFile(experienceJSON) {
  
 

 var mCount=0;
 for (i = 0; i < experienceJSON.actionPoints.length; i++) {
 
  var strURL =experienceJSON.actionPoints[i].image_path;
  imageName=experienceJSON.actionPoints[i].image_name;
  let base64image = getBase64Image(strURL).then(function(base64image) {
   innerImageURL=base64image;
    updateMarkerImage();
 }, function(reason) {
   console.log(reason); // Error!
   
 });
}
if(experienceJSON.actionPoints.length<1){
 popSnackbar("warning", "Add atleast 1 Marker and customize it.");
}
for (j = 0; j < experienceJSON.actionPoints.length; j++) {
  if(experienceJSON.actionPoints[j].image_path!=undefined && experienceJSON.actionPoints[j].image_path!=""){
    mCount++;
  }
  if(j==experienceJSON.actionPoints.length-1  && mCount<1){
    
        popSnackbar("warning", "Customize atleast 1 Marker.");
  }
}
      
}


function getBase64Image(imgUrl) {
  return new Promise(
    function(resolve, reject) {

      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = imgUrl;

      img.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/jpg");
        resolve(dataURL);
      }
      img.onerror = function() {
        reject("The image could not be loaded.");
      }

    });

}

function updateMarkerImage() {
  // get patternRatio
  var patternRatio = 0.6;
  var imageSize = "1580";
  var borderColor = "black";

  function hexaColor(color) {
    return /^#[0-9A-F]{6}$/i.test(color);
  }

  var s = new Option().style;
  s.color = borderColor;
  if (
    borderColor === "" ||
    (s.color != borderColor && !hexaColor(borderColor))
  ) {
    // if color not valid, use black
    borderColor = "black";
  }

  THREEx.ArPatternFile.buildFullMarker(
    innerImageURL,
    patternRatio,
    imageSize,
    borderColor,
    function onComplete(markerUrl) {
      fullMarkerURL = markerUrl;
      var fullMarkerImage = document.createElement("img");
      fullMarkerImage.src = fullMarkerURL;

     var container = document.querySelector("#imageContainer");
      while (container.firstChild) container.removeChild(container.firstChild);
      container.appendChild(fullMarkerImage);
      var domElement = window.document.createElement("a");
      domElement.href = fullMarkerURL;
      console.log("image",fullMarkerURL);  
        domElement.download =  "marker"+markerIndex+".png";
        document.body.appendChild(domElement);
        domElement.click();  // put fullMarkerImage into #imageContainer
        document.body.removeChild(domElement);
        markerIndex++;
        
    }
  );
}
