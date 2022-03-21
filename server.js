const express = require("express");
const app = express();

app.listen(4000, () => console.log("listening on 4000"));

const { compare, chooseNumberOfGame,  checkIfGameOver,startGame, getCountP2, getCountP1, getNumberOfPlays } = require("./index");

let player1Selection, player2Selection;
let player1;
let player2;

app.get('/startGame', (req, res) => {
  res.send(
    "Hello player1, please eneter your name: curl http://localhost:4000/player1Name?name={player1Name}"
  );
});

app.get('/player1Name', (req, res) => {
  let name = req.query.name;
  player1 = name;
  res.send(
    `Welcome to the game,${player1}. Hello player2, please enetr your name:
curl http://localhost:4000/player2Name?name={player2Name}`
  );
});

app.get('/player2Name', (req, res) => {
  let name = req.query.name;
  player2 = name;
  res.send(
    `Welcome to the game,${player2}. Please enter and odd number and greater than 1
regarding how many times you wanna play: curl http://localhost:4000/numberOfPlays?number={number}`
  );
});

app.get('/numberOfPlays', (req, res) => {
  let number = req.query.number;
  let numberOfPlaysResponse = chooseNumberOfGame(number)
  res.send(numberOfPlaysResponse);
  });

app.get('/player1Selection', (req, res) => {
  let selection1 = req.query.selection1;
  player1Selection = selection1;
  if (player1Selection !== "rock" && player1Selection !== "Rock" && player1Selection !== "paper" && player1Selection !== "Paper" &&
    player1Selection !== "scissors" && player1Selection !== "Scissors") {
    res.send(`${player1},you chose ${player1Selection}. Please enter the right selection from rock,
paper and scissors by using curl http://localhost:4000/player1Selection?selection1={selection1}`)
  } else {
    res.send(`${player1},you chose ${player1Selection}. ${player2}, please select your option from here:
curl http://localhost:4000/player2Selection?selection2={selection2}`)
  }
});

app.get('/player2Selection', (req, res) => {
  let selection2 = req.query.selection2;
  player2Selection = selection2;
  if (player2Selection !== "rock" && player2Selection !== "Rock" && player2Selection !== "paper" && player2Selection !== "Paper" &&
    player2Selection !== "scissors" && player2Selection !== "Scissors") {
    res.send(`${player2}, you chose ${player2Selection}. Please enter the right selection from rock, paper and
scissors by using curl http://localhost:4000/player2Selection?selection2={selection2} `)
  } else {
    res.send(`${player2}, you selected ${player2Selection}. Please see the result of the game for this time
here: curl http://localhost:4000/gameResultThisTime`)
  }
});

app.get('/gameResultThisTime', (req, res) => {
  let winnerThisTime = compare(player1Selection, player2Selection, player1, player2)
  if (winnerThisTime === "draw") {
    res.send(`The game is ${winnerThisTime} !!!. To continue please go to
curl http://localhost:4000/player1Selection?selection1={selection1}`)
  } else {
    res.send(`The winner for this time is ${winnerThisTime}. To continue
please go to curl http://localhost:4000/gameFinalResult`)
  }
});

app.get('/gameFinalResult', (req, res) => {
  let number = req.query.number;
  let countp1 = getCountP1()
  let countp2 = getCountP2()
  let numberOfPlays = getNumberOfPlays(number)
  let winnerAll = checkIfGameOver(countp1, countp2, numberOfPlays, player1, player2);
  res.send(winnerAll);

});
