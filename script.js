
var golds = 0;
var gps = 0;

function concate(a, b, c) {
    const str= a + " " + b + " " + c;
    return(str);
}


var min = 0;

var puissance = Math.trunc(min / 50);
var l = (Math.pow(2, Math.trunc(puissance)));

function addGold(x) {
    
    golds += x;
    displayGolds();
    buyMinion();
    
}


function displayGolds(){
    
    document.getElementById("gold").innerText = concate("Vous êtes à", Math.round(golds), "Km d'altitude.");
}


gpsfonction = setInterval(function() {
    
    addGold(gps);
    displayGolds();
    displayGPS();
    
    
}, 1000);


var minions = [
    { id: 1, name: "Slime", cost: 10, gps: 1 ,owned: 0 },
    { id: 2, name: "Undead", cost: 100, gps: 5, owned: 0 },
    { id: 3, name: "Imp", cost: 500, gps: 10, owned: 0 },
];



function getGPS(){
    var gps = 0;
    minions.forEach(function(minion) {
        
        gps += (minion.owned * minion.gps);
        displayGPS();
        
    });    
}
getGPS();

function displayGPS(){
    
    let gps_= document.getElementById("GPS")
    gps_.innerText=concate("Vous volez à", Math.round(gps), "Km/s.");
    
}


function displayMin(){
    
    document.getElementById("min").innerText = concate("Votre fusée est soutenue par", min, " Bonus au total.");
}

min = 0;

function buyMinion(id) {
    
    
    
    minions.forEach(minion => {
        
        
        if(minion.id === id){
            
            if (golds >= minion.cost){
                
                minion.owned++;
                golds -= minion.cost;
                gps += minion.gps;
                minion.cost = minion.cost*1.15;
                
                min++;
                puissance = Math.trunc(min / 50);
                l = (Math.pow(2, Math.trunc(puissance)));
                
                displayMin();
                displayGolds();
                displayGPS();
                
            }
            
            if( minion.owned === 25  || minion.owned === 50 || minion.owned === 100 || minion.owned === 250 || minion.owned === 1000 ){
                
                minion.gps *= 2;
                displayMin();
                displayGolds();
                displayGPS();
                
                
            }
            
        }
        
        if(minion.id === 1 ){
            document.getElementById("minioncout1").innerHTML=concate("Sacrifice : -",minion.cost.toFixed(2), "Km");
            document.getElementById("miniongps1").innerHTML=concate("Boost :",minion.gps,"Km/s");
            document.getElementById("minionowned1").innerHTML=concate("Possédés :",minion.owned,"");
        }
        else if(minion.id === 2){
            document.getElementById("minioncout2").innerHTML=concate("Sacrifice : -",minion.cost.toFixed(2), "Km");
            document.getElementById("miniongps2").innerHTML=concate("Boost :",minion.gps,"Km/s");
            document.getElementById("minionowned2").innerHTML=concate("Possédés :",minion.owned,"");
        }
        else if(minion.id === 3){
            document.getElementById("minioncout3").innerHTML=concate("Sacrifice : -",minion.cost.toFixed(2), "Km");
            document.getElementById("miniongps3").innerHTML=concate("Boost :",minion.gps,"Km/s");
            document.getElementById("minionowned3").innerHTML=concate("Possédés :",minion.owned,"");
        }
        
        
    })
    
}


function display_minionschange(id) {
    document.getElementById("minioncout" + id).textContent= minions[id].cost.toFixed(2);
    document.getElementById("minionowned" + id).textContent= minions[id].owned;
}



function save() {
    localStorage.setItem("golds", golds);
    localStorage.setItem("gps", gps);
    localStorage.setItem("min", min);
    let minionsString = JSON.stringify(minions);
    localStorage.setItem("minionsString", minionsString);
}

setInterval(function() {
    save();
}, 2000);

function load() {
    
    golds = localStorage.getItem("golds");
    golds = parseInt(golds);
    displayGolds();
    
    gps = localStorage.getItem("gps");
    gps = parseInt(gps);
    displayGPS();
    min = localStorage.getItem("min");
    min = parseInt(min);
    displayMin();
    minionsString = localStorage.getItem("minionsString");
    minions = JSON.parse(minionsString);
    
    
    i = 0
    
    while ( minions != null && i < minions.length) {
        document.getElementById("minioncost_" + minions[i].id).textContent= minions[i].cost.toFixed(2);
        document.getElementById("minionowned_" + minions[i].id).textContent= minions[i].owned;
        i++;
    }
    
    displayMin();
    
}


function reset(){
    
    if(confirm("Voulez vous vraiment revenir sur Terre ?")){
        
        var save={};
        localStorage.setItem("save", JSON.stringify(save));
        location.reload();
        
    }
    

}

