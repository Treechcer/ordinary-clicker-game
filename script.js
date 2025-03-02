var gameData = {
    perClick: 1,
    perSec: 0,
    money: 0
}

var upgrades = {
    upgrade0: {
        isClickType: true,
        cost: 10,
        ammount: 0,
        costScaling: 10,
        boostClick: 1,
        upgScale: 0.09
    },
    upgrade1: {
        isClickType: false,
        cost: 10,
        ammount: 0,
        costScaling: 10,
        perSecBoost: 1,
        upgScale: 0.09
    },    
    upgrade2: {
        isClickType: false,
        cost: 100,
        ammount: 0,
        costScaling: 8,
        perSecBoost: 3,
        upgScale: 0.08
    }
}

function drawAll(){
    document.getElementById("money").textContent = parseInt(gameData.money);
    document.getElementById("perSec").textContent = parseInt(gameData.perSec);
    document.getElementById("moneyPerClick").textContent = parseInt(gameData.perClick);
    document.getElementById("upgrade0").textContent = "clickUpg: " + parseInt(upgrades.upgrade0.cost) + " owned " + upgrades.upgrade0.ammount;
    document.getElementById("upgrade1").textContent = "upgrade 1: " + parseInt(upgrades.upgrade1.cost) + " owned " + upgrades.upgrade1.ammount;
    document.getElementById("upgrade2").textContent = "upgrade 2: " + parseInt(upgrades.upgrade2.cost) + " owned " + upgrades.upgrade2.ammount;
}

function clickMoneyAdder(){
    gameData.money += gameData.perClick;
    drawAll();
}

function moneyPerSec(){
    gameData.money += gameData.perSec / 10;
    drawAll();
}

function upgradeBuy(numOfUpg){
    if (numOfUpg == 0 && gameData.money >= upgrades.upgrade0.cost){
        var upgrade = upgrades.upgrade0;
    }
    else if (numOfUpg == 1 && gameData.money >= upgrades.upgrade1.cost){
        var upgrade = upgrades.upgrade1;
    }
    else if (numOfUpg == 2 && gameData.money >= upgrades.upgrade2.cost){
        var upgrade = upgrades.upgrade2;
    }
    if (!upgrade.isClickType){
        upgrade.ammount++;
        gameData.money -= upgrade.cost;
        gameData.perSec += upgrade.perSecBoost;
        upgrade.cost += upgrade.cost / upgrade.costScaling;
        upgrade.costScaling -= upgrade.upgScale
        upgrade.upgScale += (upgrade.upgScale / 100)
        drawAll();
    }
    else if (upgrade.isClickType){
        upgrade.ammount++;
        gameData.money -= upgrade.cost;
        gameData.perClick += upgrade.boostClick;
        upgrade.cost += upgrade.cost / upgrade.costScaling;
        upgrade.costScaling -= upgrade.upgScale
        upgrade.upgScale += (upgrade.upgScale / 100)
        drawAll();
    }
}

setInterval(() => moneyPerSec(), 100);