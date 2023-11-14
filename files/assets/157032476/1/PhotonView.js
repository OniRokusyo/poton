var PhotonView = pc.createScript('photonView');
var PhotonController;


// initialize code called once per entity
PhotonView.prototype.initialize = function() {
    PhotonController = this.app.root.findByName('PhotonController');
};

// update code called every frame
PhotonView.prototype.update = function(dt) {
    if(this.app.keyboard.isPressed(pc.KEY_RIGHT)){
      this.entity.translate(0.1,0,0);
      //this.entity.rigidbody.applyImpulse(0.1,0,0);
      PhotonController.photon.raiseEvent(2,this.entity.position);
  }
    if(this.app.keyboard.isPressed(pc.KEY_LEFT)){
      this.entity.translate(-0.1,0,0);
      //this.entity.rigidbody.applyImpulse(-0.1,0,0);
        PhotonController.photon.raiseEvent(2,this.entity.position);
  }
    if(this.app.keyboard.isPressed(pc.KEY_UP)){
      this.entity.translate(0,0,-0.1);
      //this.entity.rigidbody.applyImpulse(0,0,-0.1);
        PhotonController.photon.raiseEvent(2,this.entity.position);
  }
    if(this.app.keyboard.isPressed(pc.KEY_DOWN)){
      this.entity.translate(0,0,0.1);
      //this.entity.rigidbody.applyImpulse(0,0,0.1);
        PhotonController.photon.raiseEvent(2,this.entity.position);
  }
    
    PhotonController.photon.myActor().setCustomProperty("pos", this.entity.position);
};

// swap method called for script hot-reloading
// inherit your script state here
PhotonView.prototype.swap = function(old) {
    
};

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/