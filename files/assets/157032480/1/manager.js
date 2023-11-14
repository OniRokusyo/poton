var Manager = pc.createScript('manager');
Manager.attributes.add('maintemplate',{type:'entity'});
Manager.attributes.add('enemytemplate',{type:'entity'});
Manager.attributes.add('markertemplate',{type:'asset'});
Manager.attributes.add('minimaptemplate',{type:'asset'});
var PhotonController;
var root;
var manager;
var enemypool;
var obj;

// initialize code called once per entity
Manager.prototype.initialize = function() {
    PhotonController = this.app.root.findByName('PhotonController');
    enemypool = this.app.root.findByName('enemys');
    root = this.app.root;
    manager = this;
    minimapcamera = this.app.root.findByName('topcamera');
    turncamera = this.app.root.findByName('startcamera');
    gamecss = this.app.assets.find('gamecss');
};

// update code called every frame
Manager.prototype.update = function(dt) {
    PhotonController.photon.onActorJoin = function(actor){
        if(actor.actorNr == this.myActor().actorNr)
        {//自分が入ったとき
            obj = manager.maintemplate.clone();//自機を生成
            var objmat = new pc.PhongMaterial();
            objmat = manager.markertemplate.resource.clone();
            objmat.diffuse.set(getColor(actor.actorNr).r,getColor(actor.actorNr).g,getColor(actor.actorNr).b);
            objmat.update();
            obj._children[1].model.meshInstances[0].material = objmat;
            var minimapmat = new pc.PhongMaterial();
            minimapmat = manager.minimaptemplate.resource.clone();
            minimapmat.diffuse.set(getColor(actor.actorNr).r,getColor(actor.actorNr).g,getColor(actor.actorNr).b);
            minimapmat.update();
            obj._children[2].model.meshInstances[0].material = minimapmat;
            //obj._children[3].model.meshInstances[0].material = getColorMaterial(actor.actorNr);
            obj.setName(actor.actorNr);//actorNrを名前に設定
            root.addChild(obj);//rootの子オブジェクトとして追加
            obj.setLocalPosition(0,0.5,0);//原点に追加
            obj.enabled = true;//objを有効化
            
            stylecss.innerHTML = gamecss.resource;
            minimapcamera.enabled = true;
            turncamera.enabled = false;
        }
        else
        {//自分以外が入ったとき
            var eneobj = manager.enemytemplate.clone();//敵のentityを生成
            var enemat = new pc.PhongMaterial();
            enemat = manager.markertemplate.resource.clone();
            enemat.diffuse.set(getColor(actor.actorNr).r,getColor(actor.actorNr).g,getColor(actor.actorNr).b);
            enemat.update();
            eneobj._children[1].model.meshInstances[0].material = enemat;
            var eneminimapmat = new pc.PhongMaterial();
            eneminimapmat = manager.minimaptemplate.resource.clone();
            eneminimapmat.diffuse.set(getColor(actor.actorNr).r,getColor(actor.actorNr).g,getColor(actor.actorNr).b);
            eneminimapmat.update();
            eneobj._children[2].model.meshInstances[0].material = eneminimapmat;
            //eneobj._children[3].model.meshInstances[0].material = getColorMaterial(actor.actorNr);
            eneobj.setName(actor.actorNr);//actorNrを名前に設定
            enemypool.addChild(eneobj);//enemypoolの子オブジェクトとして追加
            eneobj.enabled = true;
            //自分自身の場所と角度を送信
            var vec3_angles = obj.getLocalEulerAngles();
            var vec3_pos = obj.getLocalPosition();    
            var serial_string = vec3_angles.x + ";" + vec3_angles.y + ";" + vec3_angles.z + ";" + vec3_pos.x + ";" + vec3_pos.y + ";" + vec3_pos.z;
            //console.log("serial_string = " + serial_string);
            PhotonController.photon.raiseEvent(10, serial_string);
        }
    };
    
     //入ったときにすでに他のプレイヤーがいたら
    PhotonController.photon.onJoinRoom = function(){
        //いた分だけfor文を回してentity生成
        for(var i = 1;i<this.myActor().actorNr;i++){
            if(this.myRoomActors()[i]){
                if(!this.myRoomActors()[i].isLocal){
                    var eneobj = manager.enemytemplate.clone();
                    var enemat = new pc.PhongMaterial();
                    enemat = manager.markertemplate.resource.clone();
                    enemat.diffuse.set(getColor(i).r,getColor(i).g,getColor(i).b);
                    enemat.update();
                    eneobj._children[1].model.meshInstances[0].material = enemat;
                    var eneminimapmat = new pc.PhongMaterial();
                    eneminimapmat = manager.minimaptemplate.resource.clone();
                    eneminimapmat.diffuse.set(getColor(i).r,getColor(i).g,getColor(i).b);
                    eneminimapmat.update();
                    eneobj._children[2].model.meshInstances[0].material = eneminimapmat;
                    //eneobj._children[3].model.meshInstances[0].material = getColorMaterial(i);
                    eneobj.setName(i);
                    //eneobj.setLocalEulerAngles(this.myRoomActors()[i].getCustomProperty("rot"));
                  //eneobj.setLocalPosition(this.myRoomActors()[i].getCustomProperty("pos"));
                 //eneobj.setLocalPosition(0,0,0);
                 enemypool.addChild(eneobj);
                 eneobj.enabled = true;
                }
            }
        }
    };
    
    //プレイヤーが抜けたとき
    PhotonController.photon.onActorLeave = function(actor,cleanup){
        var ene;
        if(actor.actorNr == this.myActor().actorNr)
        {//自分自身なら
            obj.destroy();//自身を消去
            stylecss.innerHTML = cssAsset.resource;
            turncamera.enabled = true;
            minimapcamera.enabled = false;
        }
        else
        {//他のプレイヤーなら
            ene = root.findByName(actor.actorNr);//そのプレイヤーを代入
        }
        
        if(ene){
            ene.destroy();//消去
        }
    };
};

// swap method called for script hot-reloading
// inherit your script state here
Manager.prototype.swap = function(old) {
    
};

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/