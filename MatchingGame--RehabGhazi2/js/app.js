/*
 * Create a list that holds all of your cards
 */
const cards = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');
const stars = document.querySelectorAll('.stars li');
let matchedCards = [];
let newCards = [];
let openedCards = [];
let moves = 0;
let minutes;
let seconds;
let timeHandler;
let starsCount;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function random() {
    newCards = Array.from(document.querySelectorAll('.deck li'));
    newCards = shuffle(newCards);
    for (card of newCards) {
        deck.appendChild(card);
    }
}


function start() {
    closeDialog();
    random();
    seconds = 0;
    minutes = 0;
    startTimer();
    cardFlipping();
    moves = 0;
    checkMoves();
    matchedCards = [];
    openedCards = [];
    for (card of cards) {
        card.classList.remove("open", "show", "match");
    }
}




function cardFlipping() {
    for (card of cards) {

        card.addEventListener('click', function () {
            if (this.classList.contains("show")) {
                return;
            }
            this.classList.add("open");
            this.classList.add("show");
            openedCards.push(this);

            if (openedCards.length == 2) {
                setTimeout(match, 500);
            }

        });



    }
    document.querySelector(".restart").addEventListener("click", start);
}


function match() {

    if (openedCards.length == 2) {
        let firstCard = openedCards[0];
        let secondCard = openedCards[1];
        let firstCardName = firstCard.firstElementChild.className;
        let secondCardName = secondCard.firstElementChild.className;



        if (firstCardName == secondCardName) {
            firstCard.classList.add("match");
            secondCard.classList.add("match");
            matchedCards.push(firstCard);
            matchedCards.push(secondCard);
        } else {

            firstCard.className = "card";
            secondCard.className = "card";

            checkMoves();
        }
        openedCards = [];
        if (matchedCards.length == 16) {
            showDialogBox();
            stopTimer();
        }

    }

}



function checkMoves() {


    const movesCount = document.querySelector('.moves');
    movesCount.innerText = moves;

    if (moves == 15) {
        checkStars();
    } else if (moves == 25) {
        checkStars();
    }
    moves++;
}

function checkStars() {
    for (star of stars) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            length--;
            break;
           
        }
       
    }
}

function starCounter() {
    starsCount = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starsCount++;
        }

    }
    return starsCount;
    console.log(starsCount);
}

function startTimer() {
    if (!timeHandler) {
        timeHandler = setInterval(restartTime, 1000);

}
    else{timeHandler = restartTime();}
}


function restartTime() {

    if (seconds > 59) {
        seconds = 0;
        minutes += 1;
    }
    let secondsString = "";
    let minutesString = "";
    if (seconds < 10) {
        secondsString = "0" + seconds;
    } else {
        secondsString = seconds;
    }

    if (minutes < 10) {
        minutesString = "0" + minutes;
    } else {
        minutesString = minutes;
    }
    document.querySelector(".timer").innerText =
        `${minutesString}:${secondsString}`;

    seconds++;
}


function stopTimer() {
    clearInterval(timeHandler);
    timerHandler = null;
}

function showDialogBox() {
    let dialog = document.querySelector("#dialogBox");

    dialog.showModal();
    document.querySelector("#clock").innerText = minutes + ":" + seconds;
    document.querySelector("#moves").innerText = moves;
    document.querySelector("#stars").innerText = starCounter();
    document.querySelector("#cancel").addEventListener("click", closeDialog);
    document.querySelector('#playAgain').addEventListener("click", start);


}

function closeDialog() {
    document.querySelector("#dialogBox").close();
    stopTimer();
}

start();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */