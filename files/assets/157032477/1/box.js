var Box = pc.createScript('box');
var PhotonController;
var boxobj;
var serial_string;
// initialize code called once per entity
Box.prototype.initialize = function() {
    PhotonController = this.app.root.findByName('PhotonController');
    boxobj = this.entity;
    
    this.entity.collision.on("collisionstart",this._col,this);
    this.entity.collision.on("collisionend",this._col,this);
};

// update code called every frame
Box.prototype.update = function(dt) {
    PhotonController.photon.onEvent = function(code, content, actorNr){
        if(code == 20){
            boxobj.setLocalEulerAngles(content.data[0],content.data[1],content.data[2]);
        }
        if(code == 21){
            boxobj.setLocalPosition(content.data[0],content.data[1],content.data[2]);
        }
    };
};

Box.prototype._col = function(target){
    
    PhotonController.photon.raiseEvent(20,this.entity.getLocalEulerAngles());
    PhotonController.photon.raiseEvent(21,this.entity.getLocalPosition());
};

// swap method called for script hot-reloading
// inherit your script state here
// Box.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/