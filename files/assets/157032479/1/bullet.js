var Bullet = pc.createScript('bullet');
var PhotonController;

// initialize code called once per entity
Bullet.prototype.initialize = function() {
    //Tank_baseを探してlookAtForをthis.lookatforに代入する
    PhotonController = this.app.root.findByName('PhotonController');
    
    this.lookatfor = this.app.root.findByName(PhotonController.photon.myActor().actorNr).lookAtFor;
    //window.alert(this.lookatfor);
    PhotonController.photon.raiseEvent(4,this.lookatfor);
    this.count = 2;
    var accu = 50;
    this.entity.rigidbody.applyImpulse(this.lookatfor.x * accu,this.lookatfor.y * accu,this.lookatfor.z * accu);
};

// update code called every frame
Bullet.prototype.update = function(dt) {
    //向いている方向に飛ばす
    //this.entity.translate(this.lookatfor);
    
    this.count-=dt;
    if(this.count < 0){
        this.entity.destroy();
    }
};

// swap method called for script hot-reloading
// inherit your script state here
Bullet.prototype.swap = function(old) {
    
};

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/