var ColorMaterialManager = pc.createScript('colorMaterialManager');
ColorMaterialManager.attributes.add('color1', { type: 'rgb' });
ColorMaterialManager.attributes.add('color2', { type: 'rgb' });
ColorMaterialManager.attributes.add('color3', { type: 'rgb' });
ColorMaterialManager.attributes.add('color4', { type: 'rgb' });
ColorMaterialManager.attributes.add('color5', { type: 'rgb' });
ColorMaterialManager.attributes.add('color6', { type: 'rgb' });
ColorMaterialManager.attributes.add('color7', { type: 'rgb' });
ColorMaterialManager.attributes.add('color8', { type: 'rgb' });
//color management
var attributesArray = new Array(0);
var color_material = new Array(0);


function getColorMaterial(actorNr){
    return color_material[(actorNr-1)%8];
}

function getColor(actorNr){
    return attributesArray[(actorNr-1)%8];
}

// initialize code called once per entity
ColorMaterialManager.prototype.initialize = function() {
    attributesArray.push(this.color1);
    attributesArray.push(this.color2);
    attributesArray.push(this.color3);
    attributesArray.push(this.color4);
    attributesArray.push(this.color5);
    attributesArray.push(this.color6);
    attributesArray.push(this.color7);
    attributesArray.push(this.color8);
    

    var color_list = [[1,0,0],[0,1,0],[0,0,1],[0.5,0.5,0],[0.5,0,0.5],[0,0.5,0.5],[1,1,1],[0,0,0]];
    
    for(var i = 0; i < 8; i++){
        var tmpMaterial = new pc.PhongMaterial();
        tmpMaterial.diffuse.set(attributesArray[i].r, attributesArray[i].g, attributesArray[i].b);
        tmpMaterial.update();
        color_material.push(tmpMaterial);
    }
};

// update code called every frame
ColorMaterialManager.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
// ColorMaterialManager.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/