// Array of available background images
const backgroundImages = [
  'callejon.jpg',
  'callejon1.jpg',
  'callejon2.jpg',
  'callejon3.jpg',
  'luna.jpg',
  'luna1.jpg',
  'montana.jpg',
];

let currentImageIndex = 0; // Index of the currently displayed background image
let lockedImageIndex = -1; // Index of the locked background image (-1 if none is locked)

// Function to change the background image
function changeBackgroundImage() {
  // Get the HTML body element
  const body = document.querySelector('body');

  // Check if there is a locked image
  if (lockedImageIndex !== -1) {
    // Set the locked image as the background
    body.style.backgroundImage = `url(${backgroundImages[lockedImageIndex]})`;
  } else {
    // Change to the next image in the array
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    body.style.backgroundImage = `url(${backgroundImages[currentImageIndex]})`;
  }
}

// Function to toggle the locked state of a background image
function toggleLockImage() {
  if (lockedImageIndex === -1) {
    // Lock the current image
    lockedImageIndex = currentImageIndex;
  } else {
    // Unlock the image
    lockedImageIndex = -1;
  }
}

// Function to get the computer's random choice
function getComputerChoice() {
  const choices = ['ROCK', 'PAPER', 'SCISSORS'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Function to play a single round
function playRound(playerSelection, computerSelection) {
  // Convert the player's selection to uppercase to make it case-insensitive
  playerSelection = playerSelection.toUpperCase();

  // Check the different play combinations to determine the winner
  if (playerSelection === computerSelection) {
    return "It's a tie!";
  } else if (
    (playerSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
    (playerSelection === 'PAPER' && computerSelection === 'ROCK') ||
    (playerSelection === 'SCISSORS' && computerSelection === 'PAPER')
  ) {
    return `You win! ${playerSelection} beats ${computerSelection}`;
  } else {
    return `You lose! ${computerSelection} beats ${playerSelection}`;
  }
}

// Function to check the game result and show popup message
function checkGameResult(playerScore, computerScore) {
  if (playerScore === 5 || computerScore === 5) {
    const message =
      playerScore > computerScore
        ? "Congratulations! You won the game!"
        : "Sorry! You lost the game!";
    alert(message);
  }
}

// Function to play a 5-round game
function game() {
  let playerScore = 0;
  let computerScore = 0;

  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    option.addEventListener('click', function() {
      const playerSelection = this.id;
      const computerSelection = getComputerChoice();

      const result = playRound(playerSelection, computerSelection);
      document.getElementById('result').textContent = result;

      if (result.includes('win!')) {
        playerScore++;
      } else if (result.includes('lose!')) {
        computerScore++;
      }

      document.getElementById('score').textContent = `Player Score: ${playerScore} | Computer Score: ${computerScore}`;

      checkGameResult(playerScore, computerScore);
    });
  });
}

// Event listener for the click event
document.addEventListener('click', function(event) {
  const lockButton = document.getElementById('lockButton');
  if (event.target === lockButton) {
    toggleLockImage();
    updateLockButton();
  } else {
    changeBackgroundImage();
  }
});

// Function to update the Lock/Unlock button text and style
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

// Start the game
game();
changeBackgroundImage();
updateLockButton();