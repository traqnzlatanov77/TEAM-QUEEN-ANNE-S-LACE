 var cards = ['2','3','4','5','6','7','8','9','10','J','D','K','A'];
 var faces = ['♣','♦','♥','♠'];
 var hands = {player:[],casino:[]};
 var score = {};

/**
 * @description Returns card value
 * @param {string} card
 * @returns {Number} vard value
 */
function cardValue(card) {
    var value = 0;
    switch (card) {
        case '2':
            value = 2;
            break;
        case '3':
            value = 3;
            break;
        case '4':
            value = 4;
            break;
        case '5':
            value = 5;
            break;
        case '6':
            value = 6;
            break;
        case '7':
            value = 7;
            break;
        case '8':
            value = 8;
            break;
        case '9':
            value = 9;
            break;
        case '10':
            value = 10;
            break;
        case 'J':
            value = 10;
            break;
        case 'D':
            value = 10;
            break;
        case 'K':
            value = 10;
            break;
        case 'A':
            value = 1;
            break;
    }
    return value;
}

/**
 * @description Choose card from deck and add it to participant hand
 * @param {string} player Player name
 */
function chooseCard(player) {   
    //choose card
    var num = cards[genRandom(13)];
    //choose face
    var face = faces[genRandom(4)];
    
    var card = [num,face];   
    if(checkCard(card)) {
        hand[player].push(card);
        return;
    } else {
        chooseCard(player);
    }  
}

/**
 * @description return random number between 0(including) and param(excluding) 
 * @param {number} max
 * @returns {Number}
 */
function genRandom(max) {
    return Math.floor(Math.random() * max);
}

/**
 * @description Check if the selected card is in hand of any parcicipant.
 * @param {array} card
 * @returns {bool}
 */
function checkCard(card) {
    var isValid = true;
    var cardNum = card[0];
    var cardFace = card[1];
    for(var i in hands) {
        if(hands[i][0] !== undefined) {
            for (var j in hands[i]) {
                if(hands[i][j][0]===cardNum && hands[i][j][1]===cardFace) {
                    isValid = false;
                }
            }
        }       
    }
    return isValid;
}

/**
 * @description Calculate the score of the players
 */
function calcPlayersScore() {
    for (var i in hands) {
        score[i] = [];
        var card = hands[i];
        //keeps ACE count in the hand
        var ace = 0;
        var sum = 0;
        for(var k in card) {
            if (card[k][0] === 'A') {
                ace ++;
            }
            sum += cardValue(card[k][0]);          
        }
        //if there is more than 1 ace the sum will be increased with 10 for each ace
        for (var q=0; q<=ace; q++) {
            score[i].push(sum+(10*q));
        }
    }
}

/**
 * @description Display current player score
 * 
 */
function displayScore() {
    var playerScore = score['player'];
    var html = '';
    for (var i in playerScore) {
        if (playerScore[i] === 21) {
            html += "<span>"+playerScore[i]+" - WINNER</span>";
        } else if (playerScore[i] < 21) {
            html += "<span>"+playerScore[i]+"</span>";
        } else {
            html += "<span class=\"red\">"+playerScore[i]+"</span>";
        }     
    }
    document.getElementById('score').innerHTML=html;
}


function calcBestResult() {
    var result = [];
    
    
    //TODO
    return result;
}

/**
 * @description returns winner of the game.
 * @returns {String} winner
 */
function getWinner() {
    var result = calcBestResult();
    var winner = 'remi';
    if(result[0]<=21 && result[0]>result[1]) {
        winner = 'casino';
    } else if(result[1]<=21 && result[1]>result[0]) {
        winner = 'player';
    }
    return winner;
}