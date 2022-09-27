AFRAME.registerComponent('play-on-window-click', {
  init: function () {
    this.onClick = this.onClick.bind(this);
  },
  play: function () {
      
    window.addEventListener('click', this.onClick);
       
  },
  pause: function () {
    window.removeEventListener('click', this.onClick);
  },
  onClick: function (evt) {
    var video = this.el.components.material.material.map.image;
    if (!video) { return; }
    
    video.play();
  }
});

AFRAME.registerComponent('log', {
  schema: {type: 'string'},

  init: function () {
    var stringToLog = this.data;
      var vid = document.getElementById('video');
     vid.play();
       
  }
});