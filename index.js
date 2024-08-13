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

// Mutable globals (eww)
let humanScore = 0;
let computerScore = 0;

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

const playGame = (humanChoice) => {
  const computerChoice = getComputerChoice();
  const return_message = [];
  return_message.push(
    `The human chose: ${humanChoice} --- The overlord chose: ${computerChoice}`
  );

  const result = playRound(humanChoice, computerChoice);
  switch (result) {
    case GameState.WIN:
      return_message.push("The overlord lets this one slide!");
      humanScore += 1;
      break;

    case GameState.LOSE:
      return_message.push("The overlord knows the future!");
      computerScore += 1;
      break;

    default:
      return_message.push("The overlord time is wasted!");
      break;
  }

  return_message.push(
    `Human score: ${humanScore} --- Overlord score: ${computerScore}`
  );
  const message =
    humanScore === computerScore
      ? "The human is sentenced to life in prison!"
      : humanScore > computerScore
      ? "The human is sentenced to death!"
      : "The overlord forgives the human this time!";
  return_message.push(message);

  return return_message.join("\r\n");
};

const main = () => {
  // Create the buttons and append them to div
  const container = document.querySelector("#container");

  const button_div = document.createElement("div");
  const message_div = document.createElement("div");

  // Create buttons
  const rock_button = document.createElement("button");
  rock_button.textContent = "Rock";

  const paper_button = document.createElement("button");
  paper_button.textContent = "Paper";

  const scissors_button = document.createElement("button");
  scissors_button.textContent = "Scissors";

  [rock_button, paper_button, scissors_button].forEach((item) => {
    item.addEventListener("click", (button) => {
      const humanChoice = button.currentTarget.textContent;
      message_div.textContent = playGame(humanChoice);
    });

    item.style = "padding: 10px; margin: 10px";
    button_div.appendChild(item);
  });

  
  [button_div, message_div].forEach((item) => {
    item.style = "display: flex; align-items: center; justify-content: center;";
  });
  message_div.style.whiteSpace = "pre-wrap";
  
  container.appendChild(button_div);
  container.appendChild(message_div);
};

// Entry point
main();
