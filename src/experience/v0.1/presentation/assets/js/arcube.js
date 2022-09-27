const scriptLocation = document.currentScript.getAttribute('src').split('?')[0].split('/').slice(0, -1).join('/');

AFRAME.registerSystem('arcube', {
    anchor: null,
    activeMarkers: [],

    init: function() {
        const markers = [
            { id: '1', rotation: '0 -90 0' },
            { id: '6', rotation: '0 90 180' },
            { id: '5', rotation: '270 0 0' },
            { id: '2', rotation: '0 270 90' },
            { id: '3', rotation: '90 180 90' },
            { id: '4', rotation: '0 270 270' },
        ];
        const container = document.createElement('a-entity');
        container.setAttribute('id', 'ar-cube-markers');

        markers.forEach((marker) => {
            container.innerHTML+=`<a-marker class="marker-${marker.id}" type="pattern" url="${scriptLocation}/markers/${marker.id}.patt">` +
            `    <a-entity class="anchor" position="0 -.5 0" rotation="${marker.rotation}"></a-entity>` +
            '  </a-marker>'
        });

        this.el.sceneEl.appendChild(container);
    },

    addActiveMarker: function(marker) {
        if (this.activeMarkers.length === 0) {
            this.setupAnchor(marker);
        }

        this.activeMarkers.push(marker);
    },

    removeActiveMarker: function(marker) {
        if (!marker) {
            return;
        }

        if (this.activeMarkers.length > 1 && this.activeMarkers[0] === marker) {
            this.setupAnchor(this.activeMarkers[1]);
        }

        this.activeMarkers = this.activeMarkers.filter((search) => search !== marker);

        if (this.activeMarkers.length === 0){
            this.anchor = null;
        }
    },

    setupAnchor: function(marker) {
        this.anchor = marker.querySelector('.anchor');

        if (!this.anchor) {
            console.error('Unable to find anchor', marker);
        }
    },
});

AFRAME.registerComponent('arcube', {
    markerFound: null,
    markerLost: null,

    previewEntity: null,

    turnInvisibleAfter: 0,

    schema: {
        enabled: { type: 'boolean', default: true },
        preview: { type: 'boolean', default: false },
        previewPosition: { type: 'vec3', default: '0 0 -5' },
        scale: { type: 'number', default: 1.45 },
        timeout: { type: 'number', default: 500 },
    },

    init: function() {
        if (this.data.scale) {
            this.el.setAttribute('scale', `3 3 3`);
        }

        this.el.setAttribute('visible', false);

        this.markerFound = (e) => {
            this.system.addActiveMarker(e.target);
            var side=e.target.className.replace("marker-",'');
            params.Verb = "started Viewing ";
            params.Object = 'side '+side.replace(/^.*[\\\/]/, '');
            params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
            callToTacking.callToApi(params);
            
            console.log(params.Sentence);
            if (xapiEnable) {
                sendToXapi("Viewed", "viewed", params.Object, params.Object.replace(/\s/g, ''));
            }
        };
        this.markerLost = (e) => {
            this.system.removeActiveMarker(e.target); 
            var side=e.target.className.replace("marker-",'');
            params.Verb = "completed Viewing ";
            params.Object ='side '+side.replace(/^.*[\\\/]/, '');
            params.Sentence = params.Actor + " " + params.Verb + " " + params.Object;
            callToTacking.callToApi(params);
            console.log(params.Sentence);
            if (xapiEnable) {
                sendToXapi("Viewed", "viewed", params.Object, params.Object.replace(/\s/g, ''));
            }
        };

        const markers = document.querySelectorAll('a-marker');
        markers.forEach((marker) => {
            marker.addEventListener('markerFound', this.markerFound);
            marker.addEventListener('markerLost', this.markerLost);
        });
    },

    update: function() {
        if (this.previewEntity) {
            this.previewEntity.parentElement.removeChild(this.previewEntity);
        }

        if (this.data.preview) {
            const previewEntity = document.createElement('a-entity');
            previewEntity.setAttribute('position', this.data.previewPosition);
            previewEntity.innerHTML = this.el.innerHTML;

            this.el.sceneEl.camera.el.appendChild(previewEntity);
            this.previewEntity = previewEntity;
        }
    },

    remove: function() {
        const markers = document.querySelectorAll('a-marker');
        markers.forEach((marker) => {
            marker.removeEventListener('markerFound', this.markerFound);
            marker.removeEventListener('markerLost', this.markerLost);
        });
    },

    tick: function(time) {
        if (!this.system.anchor || this.data.enabled === false) {
            if (this.el.object3D.visible && (this.data.enabled === false || this.turnInvisibleAfter < time)) {
                this.el.object3D.visible = false;
            }

            return;
        }

        const anchor3D = this.system.anchor.object3D;
        anchor3D.getWorldPosition(this.el.object3D.position);
        anchor3D.getWorldQuaternion(this.el.object3D.quaternion);
        this.el.object3D.visible = true;
        this.turnInvisibleAfter = time + this.data.timeout;
    }
});

AFRAME.registerPrimitive('a-arcube', {
    defaultComponents: {
        'arcube': {},
    },

    mappings: {
        enabled: 'arcube.enabled',
        preview: 'arcube.preview',
        previewPosition: 'arcube.previewPosition',
        scale: 'arcube.scale',
        timeout: 'arcube.timeout',
    },
});
