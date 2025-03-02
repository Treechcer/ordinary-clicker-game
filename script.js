var gameData = {
    perClick: 1,
    perSec: 0,
    money: 0,
    clickCount: 0,
    lastClickCount:  0,
}

var upgrades = {
    upgrade0: {
        isClickType: true,
        cost: 10,
        ammount: 0,
        costScaling: 5,
        boostClick: 1,
        upgScale: 0.09
    },
    upgrade1: {
        isClickType: false,
        cost: 10,
        ammount: 0,
        costScaling: 5,
        perSecBoost: 1,
        upgScale: 0.09,
    },    
    upgrade2: {
        isClickType: false,
        cost: 100,
        ammount: 0,
        costScaling: 4,
        perSecBoost: 3,
        upgScale: 0.08,
    }
}

achievements = {
    bigBuyer: false,
    rich: false,
    clicker: false,
    autoclicker: false,
    secret: false,
}

function drawAll(){
    document.getElementById("money").textContent = "Money: " + parseInt(gameData.money);
    document.getElementById("perSec").textContent = "M/S: " +  parseInt(gameData.perSec);
    document.getElementById("moneyPerClick").textContent = "M/C: " +  parseInt(gameData.perClick);
    document.getElementById("upgrade0").textContent = "clickUpg: " + parseInt(upgrades.upgrade0.cost) + " owned " + upgrades.upgrade0.ammount;
    document.getElementById("upgrade1").textContent = "upgrade 1: " + parseInt(upgrades.upgrade1.cost) + " owned " + upgrades.upgrade1.ammount;
    document.getElementById("upgrade2").textContent = "upgrade 2: " + parseInt(upgrades.upgrade2.cost) + " owned " + upgrades.upgrade2.ammount;
    for (key in achievements){
        if (achievements[key]){
            document.getElementById(key).textContent = achievements[key];
        }
    }
}

function clickMoneyAdder(){
    gameData.money += gameData.perClick;
    gameData.clickCount++;
    drawAll();
}

function moneyPerSec(){
    gameData.money += gameData.perSec / 10;
    drawAll();
    achievementControl();
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

function countAFKmoney(){
    gameData.perSec = (upgrades.upgrade1.ammount * upgrades.upgrade1.perSecBoost + upgrades.upgrade2.ammount * upgrades.upgrade2.perSecBoost)
}

function countClickMoney(){
    gameData.perClick = (upgrades.upgrade0.ammount * upgrades.upgrade0.boostClick) + 1
}

function achievementControl(){
    if (!achievements.bigBuyer && upgrades.upgrade1.ammount >= 1 && upgrades.upgrade1.cost != 10){
        achievements.bigBuyer = true;
        gameData.money += 15;
        drawAll();
    }

    if (!achievements.rich && gameData.money >= 100){
        achievements.rich = true;
        upgrades.upgrade0.ammount += 3;
        countClickMoney();
        drawAll();
    }

    if (!achievements.clicker && gameData.clickCount >= 100){
        achievements.clicker = true;
        upgrades.upgrade1.ammount += 1;
        countAFKmoney();
        drawAll();
    }

    if (!achievements.secret && upgrades.upgrade0.ammount >= 10 && upgrades.upgrade1.ammount >= 10 && upgrades.upgrade2.ammount >= 10){
        achievements.secret = true;
        gameData.money += 100;
        upgrades.upgrade1.perSecBoost++;
        upgrades.upgrade2.perSecBoost += 2;
        countAFKmoney();
        drawAll();
    }
}

function clickCountS(){
    if (gameData.lastClickCount == 0){
        gameData.lastClickCount = gameData.clickCount;
    }

    if (gameData.clickCount - gameData.lastClickCount >= 8 && !achievements.autoclicker){
        achievements.autoclicker = true;
        upgrades.upgrade2.ammount += 3;
        countAFKmoney();
        drawAll();
    }
    else{
        gameData.lastClickCount = gameData.clickCount;
    }
}

setInterval(moneyPerSec, 100);
setInterval(clickCountS, 1000)