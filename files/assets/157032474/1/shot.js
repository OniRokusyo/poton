var Shot = pc.createScript('shot');
Shot.attributes.add("bulletTemplate",{type:"entity"});

var shotflag = false;
var thisobj2;
var ispadshot = true;
// initialize code called once per entity
Shot.prototype.initialize = function() {
    myName = this.entity.getName();
    var fire = document.getElementById("fire");
    thisobj2 = this;
    this.isShot = false;
    if(fire){
        fire.addEventListener("touchstart",function(e){
            if(!this.isShot){
                thisobj2.f_FIRE();
                e.stopPropagation();
                this.isShot = true;
            }
    }, false);
        fire.addEventListener("touchend",function(e){
            if(this.isShot){
                this.isShot = false;
            }
    }, false);
    }
    
};

// update code called every frame
Shot.prototype.update = function(dt) {
//     if(navigator.getGamepads()[0]){
//         firepads = !!navigator.getGamepads()[0].buttons[1].value;
//     }
    if(this.app.keyboard.wasPressed(pc.KEY_SPACE) || this.app.keyboard.wasPressed(pc.KEY_ENTER)){
        //Spaceキーを押したら
        this.shot();
    }
    
    if(!ispadshot && gamepads.isPressed(pc.PAD_1,1)){
        this.shot();
        ispadshot = true;
    }
    if(ispadshot && !gamepads.isPressed(pc.PAD_1,1)){
        ispadshot = false;
    }
};

// swap method called for script hot-reloading
// inherit your script state here
Shot.prototype.swap = function(old) {
    
};

Shot.prototype.shot = function(){
    //弾を発射する
    var bul = this.bulletTemplate.clone();//bulletTemplateのクローンを作成し変数bulに格納
    bul.model.model.meshInstances[0].material = getColorMaterial(myName);
    var pos = this.entity.getPosition();//タンクの座標を取得
    bul.setName("clone");//bulのNameをcloneに設定
    this.app.root.addChild(bul);//rootの子オブジェクトとして追加
    bul.setLocalPosition(pos.x+this.entity.lookAtFor.x,pos.y+this.entity.lookAtFor.y,pos.z+this.entity.lookAtFor.z);//bulの位置をタンクの座標に合わせる
    //bul.setLocalPosition(pos.x,pos.y,pos.z);//bulの位置をタンクの座標に合わせる
    bul.enabled = true;//bulを有効化
};

Shot.prototype.f_FIRE = function(){
    this.shot();
};

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/