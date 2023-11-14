var Enemybullet = pc.createScript('enemybullet');

// initialize code called once per entity
Enemybullet.prototype.initialize = function() {
  this.count = 2;
    var accu = 5000;
    this.entity.rigidbody.applyImpulse(this.entity.lookatforx * accu,this.entity.lookatfory * accu,this.entity.lookatforz * accu);
};

// update code called every frame
Enemybullet.prototype.update = function(dt) {
    //向いている方向に飛ばす
    //this.entity.translate(this.entity.lookatforx,this.entity.lookatfory,this.entity.lookatforz);
    this.count -= dt;
    if(this.count < 0){
        this.entity.destroy();
    }
};

// swap method called for script hot-reloading
// inherit your script state here
Enemybullet.prototype.swap = function(old) {
    
};

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/