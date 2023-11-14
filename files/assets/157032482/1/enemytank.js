var Enemytank = pc.createScript('enemytank');
Enemytank.attributes.add('bullettemplate',{type:'entity'});
var PhotonController;
var thisobj;

// initialize code called once per entity
Enemytank.prototype.initialize = function() {
    PhotonController = this.app.root.findByName('PhotonController');
    thisobj = this;
};

// update code called every frame
Enemytank.prototype.update = function(dt) {
    if(PhotonController.photon){
        PhotonController.photon.requestLobbyStats();
    }
    PhotonController.photon.onEvent = function(code, content, actorNr){
        /*
        if(code == 2){
            //座標情報の更新
            for(var l = 0;l < thisobj.entity._children.length;l++){
                if(thisobj.entity._children[l].name == actorNr){
                    thisobj.entity._children[l].setPosition(content.data[0],content.data[1],content.data[2]);
                    
                }
            }
        }
        if(code == 3){
            //回転情報の更新
            for(var i = 0;i < thisobj.entity._children.length;i++){
                if(thisobj.entity._children[i].name == actorNr){
                    thisobj.entity._children[i].setLocalEulerAngles(content.data[0],content.data[1],content.data[2]);
                }
            }
        }
        */
        if(code == 4){
            //発射情報の更新
            var bul = thisobj.bullettemplate.clone();//bulletTemplateのクローンを作成し変数bulに格納
            bul.model.model.meshInstances[0].material = getColorMaterial(actorNr);
            var pos = thisobj.entity.findByName(actorNr).getPosition();//タンクの座標を取得
            var lookpos = thisobj.entity.findByName(actorNr).lookAtFor;//タンクの向いている方向を取得
            bul.setName("enebullet");//bulのNameをcloneに設定
            thisobj.entity.addChild(bul);//rootの子オブジェクトとして追加
            bul.setLocalPosition(pos.x+content.data[0],pos.y+content.data[1],pos.z+content.data[2]);//bulの位置をタンクの座標に合わせる
            bul.lookatforx = content.data[0];
            bul.lookatfory = content.data[1];
            bul.lookatforz = content.data[2];
            bul.enabled = true;//bulを有効化
        }
        
        if( code == 10 ) 
        {
            //Deserialize
            var data = content.split(';');
            var angleData = new pc.Vec3(data[0], data[1], data[2]);
            var posData = new pc.Vec3(data[3], data[4], data[5]);
            //console.log("angleX:" + angleData.x + ",angleY:" + angleData.y + ",angleZ:" + angleData.z + ",posX:" + posData.x + ",posY:" + posData.y + ",posZ:" + posData.z);
            for(var o = 0;o < thisobj.entity._children.length;o++){
                if(thisobj.entity._children[o].name == actorNr){
                    thisobj.entity._children[o].setPosition(posData);
                    thisobj.entity._children[o].setLocalEulerAngles(angleData);
                }
            }
        }
        
    };
};

// swap method called for script hot-reloading
// inherit your script state here
Enemytank.prototype.swap = function(old) {
    
};

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/