
var questions = [];
var answers = [];
var relation = [];
var tmpData = [];

/**
 * @description Add new questiuon to database
 * @param {string} q Question
 */
function setQuestion(q) {
    questions.push(q);
    return;
}

/**
 * @description Returns question by index
 * @param {int} i index
 * 
 */
function getQuestion(i) {
    return questions[i];
}

/**
 * @description Load questions from array
 * @param {array} arr questions
 */
function loadQuestions(arr) {
    for(var i in arr) {
        setQuestion(arr[i]);
    }
    return;
}

/**
 * @description Add new answer to database
 * @param {string} a Answer
 */
function setAnswer(a){
    answers.push(a);
    return;
}

/**
 * @description Returns answer by index
 * @param {int} i index
 * 
 */
function getAnswer(i) {
    return answers[i];
}

/**
 * @description Load answers from array
 * @param {array} arr answers
 */
function loadAnswers(arr) {
    for(var i in arr) {
        setAnswer(arr[i]);
    }
    return;
}

/**
 * @description Add new relation to database
 * @param {array} arr [question, answer, Y/N]
 */
function setRelation(arr){
    answers.push(arr);
    return;
}

/**
 * @description Returns answer by index
 * @param {int} i index
 * @return {array} array of [question, answer, Y/N]
 * 
 */
function getRelation(i) {
    return relation[i];
}

/**
 * @description Load relation from array
 * @param {array} arr relation
 */
function loadRelation(arr) {
    for(var i in arr) {
        setRelation(arr[i]);
    }
    return;
}


/**
 * @description choose best question
 * @returns {array} arr
 */
function chooseBestQuestion () {
    var maxCount = 0;
    var bestAnsw = 0;
    var bestCount = 0;
    for (var i in tmpData) {
        //[questionID,[[answerID,Y/N],[answerID,Y/N],[answerID,Y/N]]]
        var answers= tmpData[i][1];
        var count = answers.length;
        if(count>bestCount){
            //TODO ......
        }
        
    }
}