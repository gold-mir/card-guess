import './styles.css';
import $ from 'jquery';
import { getRandomCardData } from './cards.js';

let activeCardName;

let correct = [];
let incorrect = [];
let tries = 0;

$(document).ready(() => {
  updateCard();

  $("#game-form").submit((event) => {

    event.preventDefault();

    let guess = $("#name-input").val();
    $("#name-input").val("");
    if(guess === activeCardName){
      updateCard();
      addCorrect(activeCardName);
      setTries(0);
    } else {
      setTries(tries + 1);
      if(tries >= 3){
        addIncorrect(activeCardName);
        setTries(0);
        updateCard();
      }
    }
  });

  $("#reveal").click(() => {
    updateCard();
    $("#name-input").val("");
    addIncorrect(activeCardName);
  });
});

async function updateCard(){
  let data = await getRandomCardData();
  let imageLink = data.image_uris.art_crop;
  let cardName = data.name;
  activeCardName = cardName;
  $("#cardImage").attr("src", imageLink);
}

function setTries(n){
  tries = n;
  $("#tries").text(n);
}

function addCorrect(name){
  correct.push(name);
  printCorrect();
}

function addIncorrect(name){
  incorrect.push(name);
  printCorrect();
}

function printCorrect(){
  $("#output").html(`<p>Correct: ${correct}</p>\n<p>Incorrect: ${incorrect}</p>`);
}
