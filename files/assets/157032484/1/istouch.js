var Istouch = pc.createScript('istouch');
Istouch.attributes.add('ismobile',{type:'boolean'});

// initialize code called once per entity
Istouch.prototype.initialize = function() {
    if(this.ismobile){
        this.entity.enabled = false;
        if (this.app.touch) {
            this.entity.enabled = true;
            var htmlAsset = this.app.assets.find('fire');
            var div = document.createElement('div');
            div.innerHTML = htmlAsset.resource;
            document.body.appendChild(div);

            htmlAsset.on('load', function () {
             div.innerHTML = htmlAsset.resource;
            });
        }
    }
};

// update code called every frame
Istouch.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
Istouch.prototype.swap = function(old) {
    
};

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/