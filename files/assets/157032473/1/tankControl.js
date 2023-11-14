var TankControl = pc.createScript('tankControl');
TankControl.attributes.add("acceleration",{type:"number",default:1, min:1, max:1000});
var PhotonController;
var startpos = new pc.Vec2();
var endpos = new pc.Vec2();
var trans = new pc.Vec3();
var ispush = false;
var gamepads = new pc.GamePads();
var rot;

var aq; //タンクの角度（度数）

//for serialize
var old_serial_string = "";


// initialize code called once per entity
TankControl.prototype.initialize = function() {
    PhotonController = this.app.root.findByName('PhotonController');
    this.speed = this.acceleration * 10;
    this.anglespeed = this.acceleration * 0.3; 
    
    if (this.app.touch) {
        this.app.touch.on(pc.EVENT_TOUCHSTART,this._touchstart,this);
        this.app.touch.on(pc.EVENT_TOUCHMOVE,this._touchmove,this);
        this.app.touch.on(pc.EVENT_TOUCHEND,this._touchend,this);
    }
    startpos = pc.Vec2.ZERO;
    endpos = pc.Vec2.ZERO;
    trans = pc.Vec3.ZERO;
    rot = 0;
    
//     pads = {};
//     pads.up = false;
//     pads.down = false;
//     pads.right = false;
//     pads.left = false;
};

// update code called every frame
TankControl.prototype.update = function(dt) {
    if (this.app.touch) {
        if(ispush){
            if((startpos.y - endpos.y) >= 0){
                this.entity.rigidbody.applyForce(Math.sin(aq * (Math.PI / 180)) * this.speed ,0,Math.cos(aq * (Math.PI / 180)) * this.speed);
            }
            if((startpos.y - endpos.y) < 0){
                this.entity.rigidbody.applyForce(-Math.sin(aq * (Math.PI / 180)) * this.speed ,0,-Math.cos(aq * (Math.PI / 180)) * this.speed);
            }
            if((startpos.x - endpos.x) >= 0){
                var crot = Math.atan((startpos.y - endpos.y) / (startpos.x - endpos.x)) / Math.PI * 180;
                if(crot > -45 && crot < 45){
                    this.entity.rigidbody.applyTorque(0,this.anglespeed ,0);
                }
            }
            if((startpos.x - endpos.x) < 0){
                var drot = Math.atan(-(startpos.y - endpos.y) / -(startpos.x - endpos.x)) / Math.PI * 180;
                if(drot > -45 && drot < 45){
                    this.entity.rigidbody.applyTorque(0,-this.anglespeed,0);
                }
            }
        }
    }
    else
    {
        this.moveTank();
    }
    
//     if(navigator.getGamepads()[0]){
//         pads.up = !!navigator.getGamepads()[0].buttons[12].value;
//         pads.down = !!navigator.getGamepads()[0].buttons[13].value;
//         pads.right = !!navigator.getGamepads()[0].buttons[15].value;
//         pads.left = !!navigator.getGamepads()[0].buttons[14].value;
//     }
    gamepads.update();
            
    //for Photon Serialize
    {
        var vec3_angles = this.entity.getLocalEulerAngles();
        var vec3_pos = this.entity.getLocalPosition();    
        var serial_string = vec3_angles.x + ";" + vec3_angles.y + ";" + vec3_angles.z + ";" + vec3_pos.x + ";" + vec3_pos.y + ";" + vec3_pos.z;
        //console.log("serial_string = " + serial_string);
        if( old_serial_string != serial_string ) {
            PhotonController.photon.raiseEvent(10, serial_string);
            old_serial_string = serial_string;
        }
    }
    
    
//    PhotonController.photon.raiseEvent(3,this.entity.getLocalEulerAngles());
//    PhotonController.photon.raiseEvent(2,this.entity.getLocalPosition());
            
    //quadからVec3に変換，Vec3から度数法に変換
    aq = playangleToRealangle(this.entity.getLocalEulerAngles());
    //lookAtForに向いている角度を代入
    this.entity.lookAtFor = new pc.Vec3(Math.sin(aq * (Math.PI / 180)),0,Math.cos(aq * (Math.PI / 180)));
    
    //落ちたら復活
    if(this.entity.getLocalPosition().y < -10){
        this.entity.rigidbody.teleport(0,10,0);
    }
};

TankControl.prototype._touchstart = function(ev){
    startpos = new pc.Vec2(ev.changedTouches[0].x,ev.changedTouches[0].y);
    endpos = new pc.Vec2(ev.changedTouches[0].x,ev.changedTouches[0].y);
    ispush = true;
};

TankControl.prototype._touchmove = function(ev){
    endpos = new pc.Vec2(ev.changedTouches[0].x,ev.changedTouches[0].y);

};

TankControl.prototype._touchend = function(ev){
    startpos.set(0,0);
    endpos.set(0,0);
    oldrot = this.entity.getLocalEulerAngles().y;
    ispush = false;
};


// swap method called for script hot-reloading
// inherit your script state here
TankControl.prototype.swap = function(old) {
};

TankControl.prototype.moveTank = function(){
    if(this.app.keyboard.isPressed(pc.KEY_LEFT) || this.app.keyboard.isPressed(pc.KEY_A) || gamepads.isPressed(pc.PAD_1,14)){
                //左回転
                //this.entity.rotate(0,this.anglespeed,0);
                this.entity.rigidbody.applyTorque(0,this.anglespeed ,0);
                
            }
            else if(this.app.keyboard.isPressed(pc.KEY_RIGHT) || this.app.keyboard.isPressed(pc.KEY_D) || gamepads.isPressed(pc.PAD_1,15)){
                //右回転
                //this.entity.rotate(0,-this.anglespeed,0);
                this.entity.rigidbody.applyTorque(0,-this.anglespeed,0);
            }
            else{
                this.entity.rotate(pc.Vec3.ZERO);
                //this.entity.rigidbody.applyTorque(pc.Vec3.ZERO);
            }
            
    
            if(this.app.keyboard.isPressed(pc.KEY_UP) || this.app.keyboard.isPressed(pc.KEY_W) || gamepads.isPressed(pc.PAD_1,12)){
                //前進
                //this.entity.translate(Math.sin(aq * (Math.PI / 180)) * 0.1 ,0,Math.cos(aq * (Math.PI / 180)) * 0.1);
                this.entity.rigidbody.applyForce(Math.sin(aq * (Math.PI / 180)) * this.speed ,0,Math.cos(aq * (Math.PI / 180)) * this.speed);
            }
            else if(this.app.keyboard.isPressed(pc.KEY_DOWN) || this.app.keyboard.isPressed(pc.KEY_S) || gamepads.isPressed(pc.PAD_1,13)){
                //後退
                 //this.entity.translate(-Math.sin(aq * (Math.PI / 180)) * 0.1 ,0,-Math.cos(aq * (Math.PI / 180)) * 0.1);
                 this.entity.rigidbody.applyForce(-Math.sin(aq * (Math.PI / 180)) * this.speed ,0,-Math.cos(aq * (Math.PI / 180)) * this.speed);
            }
};

var playangleToRealangle = function(playangle){
    //playangle is eulerAngles Vec3
            //vec3を度数法に変換する
            var ans;
            if(playangle.x < 100 && playangle.x > -100){
                //angle 0 - 90 , 270 - 360
                if(playangle.y >= 0 ){
                    //angle 0 - 90
                    ans = playangle.y;
                }else{
                    //angle 270 - 360
                    ans = 360 + playangle.y;
                }
            }
            if(playangle.x > 170){
                //angle 90 -180
                ans = 180 - playangle.y;
            }
            if(playangle.x < -170){
                //angle 180 - 270
                ans = 180 - playangle.y;
            }
            return ans;
};


// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/