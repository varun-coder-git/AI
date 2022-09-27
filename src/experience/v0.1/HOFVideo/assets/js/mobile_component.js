var startMovement=false;
var vrModeActive=false;

AFRAME.registerComponent('mobile', {
    init: function () {
       if( AFRAME.utils.device.isMobile() ){
		
            /* Add mobile controls */
			
			var cameraEntity = document.querySelector('#cameraEntity');
            // cameraEntity.setAttribute('camera','userHeight:0');
            /* *** CHECKPOINTS */
            var scene = document.querySelector('a-scene');
            const spotHeight = 0.25;
            const teleportSpots = [
                {x: 6, y: spotHeight, z: 0},
				{x: 3, y: spotHeight, z: 0},
				{x: 0, y: spotHeight, z: 0},
				{x: -3, y: spotHeight, z: 0},
                {x: -6, y: spotHeight, z: 0},

                /* Fractals hallway */
                {x: 0, y: spotHeight, z: -4},
                {x: 0, y: spotHeight, z: -8},
                {x: 0, y: spotHeight, z: -12},


                /* MOCAP hallway */
                {x: 0, y: spotHeight, z: 4},
                {x: 0, y: spotHeight, z: 8},
                {x: 0, y: spotHeight, z: 12},

            ];


            var checkPointsContainer = document.createElement('a-entity'),
                checkPointEl,
                teleportPosition,
                checkpointColor = '#FFFF00';

            for(var k=0; k < teleportSpots.length; k++){
                teleportPosition = teleportSpots[k];
                checkPointEl = document.createElement('a-sphere');
                checkPointEl.setAttribute('id','hotspot-'+(k+1));
                checkPointEl.setAttribute('mouseclick1','');
                checkPointEl.setAttribute('radius','.25');
                checkPointEl.setAttribute('height','.1');
                checkPointEl.setAttribute('position',teleportPosition);
                checkPointEl.setAttribute('material', 'src:/act/v0.1/wallofframe/assets/images/wood.jpg');
                //checkPointEl.setAttribute('color', checkpointColor);
                checkPointsContainer.appendChild(checkPointEl);
            }

            scene.appendChild(checkPointsContainer);

       } else{
            var cameraEntity = document.querySelector('#cameraEntity');
            cameraEntity.setAttribute('universal-controls','');
            cameraEntity.setAttribute('kinematic-body','');
            var cameraWrapper = document.querySelector('#cameraWrapper');
            cameraWrapper.setAttribute('position','0 0 0');
            
       }

    },

    update: function(){

    },

    tick: function(){



    },

    remove: function(){

    }
});

function startFlagActive(){
    startMovement=true;
}

function vrmodeOn(){
    vrModeActive=true;
}

AFRAME.registerComponent('mouseclick1', {
	init: function () {
        
		this.el.addEventListener('click', function() {
            if(startMovement){
                const spotHeight = 0;
                const teleportSpots = [
                    {x: 6, y: spotHeight, z: 0},
                    {x: 3, y: spotHeight, z: 0},
                    {x: 0, y: spotHeight, z: 0},
                    {x: -3, y: spotHeight, z: 0},
                    {x: -6, y: spotHeight, z: 0},

                    /* Fractals hallway */
                    {x: 0, y: spotHeight, z: -4},
                    {x: 0, y: spotHeight, z: -8},
                    {x: 0, y: spotHeight, z: -12},
                    
                    /* MOCAP hallway */
                    {x: 0, y: spotHeight, z: 4},
                    {x: 0, y: spotHeight, z: 8},
                    {x: 0, y: spotHeight, z: 12},
                ];
                
                var position=teleportSpots[(this.getAttribute('id').split('-')[1])-1];
                var cameraAnimetion;
                var cameraEntity = document.querySelector('#cameraWrapper');
                if(vrModeActive==true){
                    cameraEntity.setAttribute('animation__yoyo','property: position; dur: 3000; easing: easeInSine; to: '+position.x+" 0 "+position.z);
                }else{
	            cameraEntity.setAttribute('animation__yoyo','property: position; dur: 3000; easing: easeInSine; to: '+position.x+" 1.6 "+position.z);
                }
               
                
            }
        });
    }
});
