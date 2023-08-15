const backgroundImages = [
  'callejon.jpg',
  'callejon1.jpg',
  'callejon2.jpg',
  'callejon3.jpg',
  'luna.jpg',
  'luna1.jpg',
  'montangit adda.jpg',
];

let currentImageIndex = 0;
let lockedImageIndex = -1;
let totalPlays = 0;
let playerWins = 0;
let playerLosses = 0;
let playerScore = 0;
let computerScore = 0;

function changeBackgroundImage() {
  const body = document.querySelector('body');

  if (lockedImageIndex !== -1) {
    body.style.backgroundImage = `url(${backgroundImages[lockedImageIndex]})`;
  } else {
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    body.style.backgroundImage = `url(${backgroundImages[currentImageIndex]})`;
  }
}

function toggleLockImage() {
  if (lockedImageIndex === -1) {
    lockedImageIndex = currentImageIndex;
  } else {
    lockedImageIndex = -1;
  }
  updateLockButton();
}

function getComputerChoice() {
  const choices = ['ROCK', 'PAPER', 'SCISSORS'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toUpperCase();

  if (playerSelection === computerSelection) {
    return "It's a tie!";
  } else if (
    (playerSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
    (playerSelection === 'PAPER' && computerSelection === 'ROCK') ||
    (playerSelection === 'SCISSORS' && computerSelection === 'PAPER')
  ) {
    playerScore++;
    if (playerScore === 5) {
      playerWins++;
      resetScores();
    }
    return `You win! ${playerSelection} beats ${computerSelection}`;
  } else {
    computerScore++;
    if (computerScore === 5) {
      playerLosses++;
      resetScores();
    }
    return `You lose! ${computerSelection} beats ${playerSelection}`;
  }
}

function resetScores() {
  playerScore = 0;
  computerScore = 0;
}

function game() {
  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    option.addEventListener('click', function() {
      totalPlays++;

      const playerSelection = this.id;
      const computerSelection = getComputerChoice();

      const result = playRound(playerSelection, computerSelection);
      document.getElementById('result').textContent = result;

      document.getElementById('score').textContent = `Player Score: ${playerScore} | Computer Score: ${computerScore}`;
      document.getElementById('totalPlays').textContent = totalPlays;
      document.getElementById('wins').textContent = playerWins;
      document.getElementById('losses').textContent = playerLosses;

      checkGameResult();
    });
  });
}

document.addEventListener('click', function(event) {
  const lockButton = document.getElementById('lockButton');
  if (event.target === lockButton) {
    toggleLockImage();
  } else {
    changeBackgroundImage();
  }
});

function updateLockButton() {
  const lockButton = document.getElementById('lockButton');
  if (lockedImageIndex !== -1) {
    lockButton.textContent = 'Unlock';
    lockButton.classList.add('locked');
  } else {
    lockButton.textContent = 'Lock';
    lockButton.classList.remove('locked');
  }
}

function checkGameResult() {
  if (playerWins === 1 || playerLosses === 1) {
    const message =
      playerWins === 1 ? "Congratulations! You won the game!" : "Sorry! You lost the game!";
    alert(message);
    playerWins = 0;
    playerLosses = 0;
  }
}

game();
changeBackgroundImage();
updateLockButton();