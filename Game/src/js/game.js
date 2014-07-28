 var cards = ['2','3','4','5','6','7','8','9','10','J','D','K','A'];
 var faces = ['♣','♦','♥','♠'];
 var hands = {player:[],casino:[]};

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
 * @description Choose card from deck
 * @returns {Array}
 */
function chooseCard() {   
    //choose card
    var card = cards[genRandom(13)];
    //choose face
    var face = faces[genRandom(13)]
    
    var result = [card,face];    
    return result;
}


/**
 * @description return random number between 0(including) and param(excluding) 
 * @param {number} max
 * @returns {Number}
 */
function genRandom(max) {
    return Math.floor(Math.random() * max);
}


function checkScore(p) {
    var cardHand = hands[p];
    for(var i in cardHand) {
        
    }
}
