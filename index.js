"use strict";

// Immutable globals
const options = ["Rock", "Paper", "Scissors"];
const pretty_options = options.join(", ");

const rounds = 1;

const GameState = Object.freeze({
  DRAW: Symbol("draw"),
  WIN: Symbol("win"),
  LOSE: Symbol("lose"),
});

// Choses a random option for a list of options (with uniform sampling)
const getComputerChoice = () =>
  options[Math.floor(Math.random() * options.length)];

// Takes input from the user and verifies that it indeed is in the list of choices
const getHumanChoice = () => {
  let humanChoice = ""; // Some default value
  while (!options.includes(humanChoice) && humanChoice != null) {
    // Keep going until the human choses a valid value or cancels
    humanChoice = prompt(`Choose one of the options: ${pretty_options}`);

    // Make the human choice case agnostic. The capitalization of the first
    // letter and the rest being lower follows notation in "options"
    if (humanChoice != null) {
      humanChoice =
        humanChoice.charAt(0).toUpperCase() +
        humanChoice.slice(1).toLocaleLowerCase();
    }
  }
  return humanChoice;
};

const playRound = (humanChoice, computerChoice) => {
  // If the human did not choose anything or if both chose the same option, do not do anything
  if (humanChoice === null || humanChoice === computerChoice) {
    return GameState.DRAW;
  }

  if (
    (computerChoice == "Rock" && humanChoice == "Paper") ||
    (computerChoice == "Paper" && humanChoice == "Scissors") ||
    (computerChoice == "Scissors" && humanChoice == "Rock")
  ) {
    return GameState.WIN; // Human won
  } else {
    return GameState.LOSE; // Human lost
  }
};

const playGame = (number_of_rounds) => {
  let humanScore = 0;
  let computerScore = 0;

  for (let index = 0; index < number_of_rounds; ++index) {
    const computerChoice = getComputerChoice();
    const humanChoice = getHumanChoice();
    console.log(
      `The human chose: ${humanChoice} --- The overlord chose: ${computerChoice}`
    );

    const result = playRound(humanChoice, computerChoice);
    switch (result) {
      case GameState.WIN:
        console.log("The overlord lets this one slide!");
        humanScore += 1;
        break;

      case GameState.LOSE:
        console.log("The overlord knows the future!");
        computerScore += 1;
        break;

      default:
        console.log("The overlord time is wasted!");
        break;
    }
  }

  console.log(
    `Human score: ${humanScore} --- Overlord score: ${computerScore}`
  );
  const message =
    humanScore === computerScore
      ? "The human is sentenced to life in prison!"
      : humanScore > computerScore
      ? "The human is sentenced to death!"
      : "The overlord forgives the human this time!";
  console.log(message);
};

const main = () => playGame(rounds);

// Entry point
main();
