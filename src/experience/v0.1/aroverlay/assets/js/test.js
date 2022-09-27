
AFRAME.registerComponent('vidhandler', {
  init: function () {
    this.toggle = false;
    document.querySelector("#video").pause(); //reference to the video
  },
  tick:function(){  
   if(document.querySelector("a-marker").object3D.visible == true){
       var temptemp = document.querySelector("a-marker");
       var test = temptemp.attributes.url;
       console.log("test",test);
     if(!this.toggle){
       this.toggle = true;
       document.querySelector("#video").play();
     }
   }else{
     this.toggle = false;
     document.querySelector("#video").pause();
   }
  }
});