 var cards = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
 var faces = ['SP','KR','KU','PI'];
 var hands = {player:[],casino:[]};
 var money = 1000;
 var score = {};
 var bet = 100;
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
        hands[player].push(card);
        return;
    } else {
        money = 1000;
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
 * @description Calculate the score of a player
 * @param {string} player
 * @return {array}
 */
function calcPlayerScore(player) {
    var score = [];
    var card = hands[player];
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
        score.push(sum+(10*q));
    }
    return score;
}

/**
 * @description Display current player score
 * 
 */
function displayScore() {
    var playerScore = calcPlayerScore('player');
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

/**
 * @description Calculate best result of the player nearest to 21
 * @param {string} player
 * @returns {Number}
 */
function calcBestResult(player) {
 //   return 21;
    var result = calcPlayerScore(player);
    var bestResult = 0;
    var looseResult = Number.MAX_VALUE;
    for (var i in result) {
        if (result[i]=== 21) { 
            bestResult = result[i]; //Best result WINNER
            break;
        } else if(result[i] > bestResult && result[i]<21) {
            bestResult = result[i]; //the best result under 21
            continue;
        } else if (result[i]>21 && result[i]<looseResult) {
            looseResult = result[i]; //the best loosing result
        }
    }
    //if there is not result under 21 but has result above returns best loosing result
    if(bestResult === 0 && looseResult < Number.MAX_VALUE) {
        bestResult = looseResult;
    }
    return bestResult;
}

/**
 * @description returns winner of the game.
 * @returns {String} winner
 */
function getWinner() {
    var casinoResult = calcBestResult('casino');
    var playerResult = calcBestResult('player');
    var winner = 'remi';
    if((playerResult<=21 && playerResult>casinoResult) || casinoResult>21) {
        winner = 'player';
    } else if(casinoResult<=21 && casinoResult>playerResult) {
        winner = 'casino';
    } else if (playerResult>21) {
        winner = 'casino';
    }
    return winner;
}

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
        case 'Q':
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

function cardName(arr) {
    var card = arr[1]+'-'+arr[0]+'.png';
    return card;
}


/**
 * @description Display dealer's cards on the table
 * 
 */
function displayCasinoCards() {
    var casinoHands = hands['casino'];
    var html = '<div class="cards"><img src="images/'+cardName(casinoHands[0])+'" ></div>';
    for (var i=1;  i<casinoHands.length; i++) {
        html += '<div class="cards"><img src="images/BACK.png" ></div>';
    }
    
    document.getElementById('dealer').innerHTML = html;   
}


/**
 * @description Display pleyer's cards on the table
 */
function displayPlayerCards() {
    var playerHands = hands['player']
    var html = '<div class="cards"><img src="images/'+cardName(playerHands[0])+'" ></div>';
    for (var i=1;  i<playerHands.length; i++) {
        html += '<div class="cards"><img src="images/'+cardName(playerHands[i])+'" ></div>';
    }
    document.getElementById('player').innerHTML = html;
}

/**
 * @description Check if player has enough money;
 * @returns {Boolean}
 */
function checkMoney() {
    var hasMoney = true;
    if(money-bet<0) {
        hasMoney =  false;
    }
    return hasMoney;
}


/**
 * @description Start game
 */
function startGame() {
    clearHands();
    if(checkMoney()) {
        //gives two initial cards of each of the players      
        for (var i = 0; i<2; i++) {
            chooseCard('player');
        }
        if(calcBestResult('player')==21) {
            chooseCard('casino');
            displayPlayerCards(); 
            displayCasinoCards();
            money += (bet*1.5);
            document.getElementById('player-score').innerHTML = "<span>"+calcBestResult('player')+"</span>";
            document.getElementById('money-score').innerHTML = "<span>$ "+(money-bet)+"</span>";
            document.getElementById('bet-score').innerHTML = "<span>$ "+bet+"</span>";
            alert('BLACK JACK');
            startGame();        
        } else {
            var av = money-bet;
            chooseCard('casino');
            displayCasinoCards();
            displayPlayerCards();
            document.getElementById('player-score').innerHTML = "<span>"+calcBestResult('player')+"</span>";
            document.getElementById('money-score').innerHTML = "<span>$ "+av+"</span>";
            document.getElementById('bet-score').innerHTML = "<span>$ "+bet+"</span>";
        }       
    } else {
        alert("No enough money");
        document.getElementById('buttons').innerHTML = "";
    }   
}

/**
 * @description clear temp data for the new game
 */
function clearHands() {
    hands = {player:[],casino:[]};
    document.getElementById('player-score').innerHTML = "<span>"+0+"</span>";
}

/**
 * @description Calculate game result
 */
function stand () {
    while(calcBestResult('casino')<17) {
        chooseCard('casino');
        displayCasinoCards();
    }    
    var winner = getWinner();
    if(winner === 'casino'){
        alert ('Lose: Casino: '+calcBestResult('casino')+' You: '+calcBestResult('player'));
        money -= bet;
    } else if (winner === 'player') {
        alert ('You WIN: Casino: '+calcBestResult('casino')+' You: '+calcBestResult('player'));
        money += bet;
    } else if (winner === 'remi') {
        alert ('No WINNER: Casino: '+calcBestResult('casino')+' You: '+calcBestResult('player'));
    }
    startGame();
}

/**
 * @description Get new card by the player
 */
function hit() {
    chooseCard('player');
    displayPlayerCards();
    document.getElementById('player-score').innerHTML = "<span>"+calcBestResult('player')+"</span>";
    var playerBestResult = calcBestResult('player');
    if(playerBestResult>21){
        alert('You score is more than 21');
        money -= bet;
        startGame();
    } 
}

/**
 * @description restart game
 * @returns {undefined}
 */
function deal() {
    location.reload();
}

startGame();