var App = pc.createScript('app');

// PHOTON CLOUD
App.attributes.add("appid", {
    type: "string",
    default: "",
    title: "AppId",
    description: "Please input your AppId"
});

App.attributes.add("appversion", {
    type: "string",
    default: "1.0",
    title: "Appversion",
    description: "Application version. You can not be matching if you set different versions."
});

App.attributes.add("Region", {
    type: 'string',
    default: 'default',
    description: 'Photon Cloud has servers in several regions, distributed across multiple hosting centers over the world. You can choose an optimized region for you.',
    enum: [
        { 'Select Region': 'default' },
        { 'Asia, Singapore': 'asia' },
        { 'Australia, Melbourne': 'au' },
        { 'Canada, East Montreal': 'cae' },
        { 'Europe, Amsterdam': 'eu' },
        { 'India, Chennai': 'in' },
        { 'Japan, Tokyo': 'jp' },
        { 'South America, Sao Paulo': 'sa' },
        { 'South Korea, Seoul': 'kr' },
        { 'USA, East Washington': 'us' },
        { 'USA, West San José': 'usw' }
    ]
});

// PHOTON SERVER
App.attributes.add("Masterserver", {
    type: "string",
    title: "Server Address",
    description: "Use Photon Server if you input the server address."
});

// GENERAL
App.attributes.add("ConnectOnStart", {
    type: "boolean",
    default: true,
    title: "Auto-Join Lobby",
    description: "Define if PhotonNetwork should join the 'lobby' when connected to the Master server"
});

var DemoWss;
var DemoMasterServer;
var connectRegion;
var ConnectOnStart;

// initialize code called once per entity
App.prototype.initialize = function() {
    //////////////////////////////////////////////////
    //Photon Cloud
    //////////////////////////////////////////////////
    if(this.appid){
        if(document.domain == "playcanvas.com"){
            localStorage.setItem("appid",this.appid);
        }        
        DemoAppId = this.appid;
    }else
    {
        if(localStorage.getItem("appid")){
            DemoAppId = localStorage.getItem("appid");
        }
        else if(!this.Masterserver)
        {
            if(window.confirm("Thank you for your forking! \n Please get and enter your AppId if you started development \n  Do you want to acquire AppId now?") === true){
                 window.location.href = 'https://www.photonengine.com/en/Account/Signup';
            }else{
                 window.open('about:blank','_self').close();
            }
        }
        
    }
    DemoAppVersion = this.appversion;
    connectRegion = this.Region;
    
    //////////////////////////////////////////////////
    //Photon Server
    //////////////////////////////////////////////////
    if(this.Masterserver){
        DemoMasterServer = this.Masterserver;
        DemoAppId = "using photon server";
    }
    
    //////////////////////////////////////////////////
    //General
    //////////////////////////////////////////////////
    ConnectOnStart = this.ConnectOnStart;
    
    //////////////////////////////////////////////////
    //load and seting UI 
    //////////////////////////////////////////////////
    //html load and initialize
    var htmlAsset = this.app.assets.find('index');
    var div = document.createElement('div');
    div.innerHTML = htmlAsset.resource;
    document.body.appendChild(div);

    htmlAsset.on('load', function () {
        div.innerHTML = htmlAsset.resource;
    });
    
    // css load and initialize
    cssAsset = this.app.assets.find('style');
    stylecss = document.createElement('style');
    stylecss.innerHTML = cssAsset.resource;
    document.head.appendChild(stylecss);
        
    cssAsset.on('load', function() {
        style.innerHTML = cssAsset.resource;
    });
    
    //////////////////////////////////////////////////
    //Photon start
    //////////////////////////////////////////////////
    this.entity.photon = new DemoLoadBalancing();
    this.entity.photon.start();
};