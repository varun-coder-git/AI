AFRAME.registerComponent('play-with-delay', {
  init: function () {
    this.onLoad = this.onLoad.bind(this);
  },
  play: function () {
      
    window.addEventListener('load', this.onLoad);
       
  },
  pause: function () {
    window.removeEventListener('load', this.onLoad);
  },
  onLoad: function (evt) {
    var video = this.el.components.material.material.map.image;
    if (!video) { return; }
      setTimeout(function() {
    video.play();
              }, 5000);
  }
});