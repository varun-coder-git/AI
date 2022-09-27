init: function() {
   this.marker = document.querySelector("a-marker")
   this.markerVisible = false
},
tick: function() {
   if (!this.marker) return
   if (this.marker.object3D.visible) {
      if (!this.markerVisible) {
         // marker detected
         this.markerVisible = true
      }
   } else {
      if (this.markerVisbile) {
         // lost sight of the marker
         this.markerVisible = false
      }
   }
}