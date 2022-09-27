$(document).ready(() => {
    var expereinceJson=localStorage.getItem("ARjson");
    var expereinceName=localStorage.getItem("ARExperienceName");
  
    $.getJSON("assets/js/experience.json", function(data) {
        expereinceJson=data;
         if(expereinceJson){
    initializePreview(expereinceJson,expereinceName);
    }
    });
   
      
    });