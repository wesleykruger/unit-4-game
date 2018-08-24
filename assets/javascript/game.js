"use strict";
/*jshint esversion: 6*/
/*jshint browser:true */

$(document).ready(function () {
    const character = {
        name: "name",
        hp: 0,
        attackPower: 0,
        counterAttackPower: 0,
        defeated: false
    };

    let newbophyte = Object.create(character);
    newbophyte.name = "newbophyte";
    newbophyte.maxHp = 22;
    newbophyte.hp = newbophyte.maxHp;
    newbophyte.attackPower = 2;

    let bisenberg = Object.create(character);
    bisenberg.name = "bisenberg";
    bisenberg.maxHp = 25;
    bisenberg.hp = bisenberg.maxHp;
    bisenberg.attackPower = 7;

    let binstein = Object.create(character);
    binstein.name = "binstein";
    binstein.maxHp = 100;
    binstein.hp = binstein.maxHp;
    binstein.attackPower = 30;

    let brophets = [newbophyte, bisenberg, binstein];

    let brocules = Object.create(character);
    brocules.name = "brocules";
    brocules.maxHp = 30;
    brocules.hp = brocules.maxHp;
    brocules.attackPower = 4;

    let broseidon = Object.create(character);
    broseidon.name = "broseidon";
    broseidon.maxHp = 35;
    broseidon.hp = broseidon.maxHp;
    broseidon.attackPower = 7;

    let brodin = Object.create(character);
    brodin.name = "brodin";
    brodin.maxHp = 60;
    brodin.hp = brodin.maxHp;
    brodin.attackPower = 9;

    let enemies = [brocules, broseidon, brodin];
    let attacks = ["catches you 'mirin!", "uses all the dumbbells!", "doesn't wipe down the equipment!", "supersets the whole gym", "takes a 20 minute break between sets!", "trains chest for the 5th time this weeks!", "every day is chest day!", "grunts louder than a passing firetruck!", "ran out of space on the bar for more weight!", "more like cardi-NO", "curls in the squat rack!", "hits em with that flex!", "skips leg day!", "fist pumps!", "makes his pecs dance!", "takes a shirtless selfie!", "is finally too big to fit through doorways!", "nailed the anabolic window!", "insults a crossfitter!", "takes a rest day--to give the weights a rest!", "lifts up something heavy and puts it down!", "pounds like 70 pre-workouts!", "gets the perfect pump for Stacey's pool party!", "unnecessarily takes his shirt off in public!", "doesn't train his back because he can't see it so who cares!", "buys steroids from a sketchy Russian website!", "has the cardiovascular health of an 80-year-old!", "got winded running up a flight of stairs!"];
    let yourCharacter;
    let yourCharacterCap;
    let enemyCharacter;
    let enemyCharacterCap;
    let remainingEnemies = enemies.length;
    let gameOver = false;
    let lvUp = new Audio("assets/music/levelUp.mp3");
    let damageSound = new Audio("assets/music/damage.mp3");


    $(".character1Btn").click(function () {
        chooseCharacter(false, 1);
    });

    $(".character2Btn").click(function () {
        chooseCharacter(false, 2);
    });

    $(".character3Btn").click(function () {
        chooseCharacter(false, 3);
    });

    $(".enemy1Btn").click(function () {
        chooseCharacter(true, 1);
    });

    $(".enemy2Btn").click(function () {
        chooseCharacter(true, 2);
    });

    $(".enemy3Btn").click(function () {
        chooseCharacter(true, 3);
    });

    let chooseCharacter = function (enemyBool, typeInt) {
        if (enemyBool === false) {
            let character = brophets[typeInt - 1];
            $(".yourCharacterSelection").append($(".character" + typeInt + "Title, .character" + typeInt + "Image"));
            $(".character" + typeInt + "Image").css({ "width": "200px", "height": "200px" });
            $(".characterSelector, .characterSelectorTitle").hide();
            $(".yourCharacterTitle, .yourCharacterSelection, .enemySelectTitle, .enemySelect, .yourStats").show(1000);
            $(".yourHp").append("<p>" + character.hp + "</p>");
            yourCharacter = character;
            yourCharacterCap = formatName(yourCharacter);
        }
        else {
            let character = enemies[typeInt - 1];
            $(".enemySelection").append($(".enemy" + typeInt + "Title, .enemy" + typeInt + "Image"));
            $(".enemy" + typeInt + "Image").css({ "width": "200px", "height": "200px" });
            $(".enemySelect, .enemySelectTitle").hide();
            $(".enemyHp").append("<p>" + character.hp + "</p>");
            $(".enemySelection, .enemyStats, .attackBtn").show(1000);
            enemyCharacter = character;
            enemyCharacterCap = formatName(enemyCharacter);
            $(".counterMsg").hide() //Must hide this here for selection of subsequent enemies
        }
    }

    let formatName = function (character) {
        return character.name.charAt(0).toUpperCase() + character.name.slice(1);
    }

    if ($(".yourCharacterSelection").is(":empty")) {
        $(".yourCharacterSelection, .yourCharacterTitle, .yourStats, .enemySelectTitle, .enemySelect").hide();
    }

    if ($(".enemySelection").is(":empty")) {
        $(".enemySelection, .attackBtn, .enemyStats, .attackMsg, .counterMsg, .gameWin, .gameLose").hide();
    }

    $(".attackBtn").click(function () {
        if (!gameOver) {
            let dmgDealt = yourCharacter.attackPower;
            let counterDmg = enemyCharacter.attackPower;
            $(".attackMsg, .counterMsg").show();
            let attackMsg = attacks[Math.floor(Math.random() * attacks.length)];
            let counterMsg = attacks[Math.floor(Math.random() * attacks.length)];
            $(".attackMsg").html("<strong>" + yourCharacterCap + " " + attackMsg + "</strong> Deals " + dmgDealt + " damage!");
            $(".enemySelection").animate({ top: "-=20px" }, 100);
            $(".enemySelection").animate({ top: "+=30px" }, 100);
            $(".enemySelection").animate({ top: "-=10px" }, 100);
            damageSound.play();
            enemyCharacter.hp -= dmgDealt;
            if (enemyCharacter.hp <= 0) {
                $(".enemyHp > p").html(0);
                lvUp.play();
                remainingEnemies--;
                if (remainingEnemies > 0) {
                    $(".counterMsg").html("<strong>" + enemyCharacterCap + " is defeated!" + "</strong>");
                    let enemyNumber = enemies.findIndex(o => o.name === enemyCharacter.name) + 1;
                    $(".enemy" + enemyNumber + "Card, .enemyHp > p").remove();
                    $(".enemySelection").empty();
                    $(".attackMsg, .attackBtn, .enemyHpTitle").hide();
                    $(".enemySelectTitle").html("Choose your next opponent!");
                    $(".enemySelect, .enemySelectTitle").show(1000);
                    yourCharacter.hp = yourCharacter.maxHp;
                    $(".yourHp > p").html(yourCharacter.hp);
                }
                else {
                    $(".gameWin").html("<strong>" + enemyCharacterCap + " is defeated!</strong> You have defeated all enemies! You are crowned the king of the iron throne!");
                    console.log(remainingEnemies)
                    $(".gameWin").show();
                    gameOver = true;
                }
            }
            else {
                $(".enemyHp > p").html(enemyCharacter.hp);
                $(".yourCharacterSelection").animate({ top: "-=20px" }, 100);
                $(".yourCharacterSelection").animate({ top: "+=30px" }, 100);
                $(".yourCharacterSelection").animate({ top: "-=10px" }, 100);
                damageSound.play();
                yourCharacter.hp -= counterDmg;
                if (yourCharacter.hp <= 0) {
                    $(".yourHp > p").html(0);
                    $(".counterMsg").html("<strong>" + enemyCharacterCap + " " + counterMsg + "</strong> Deals " + counterDmg + " damage!");
                    $(".gameLose").html("You have been defeated!");
                    $(".gameLose").show();
                    gameOver = true;
                }
                else {
                    $(".counterMsg").html("<strong>" + enemyCharacterCap + " " + counterMsg + "</strong> Deals " + counterDmg + " damage!");
                    $(".yourHp > p").html(yourCharacter.hp);
                }
            }
            yourCharacter.attackPower += 2;
        }
    });

});