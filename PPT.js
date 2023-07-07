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

      if (playerScore === 5 || computerScore === 5) {
        options.forEach(option => {
          option.removeEventListener('click', handleClick);
        });

        if (playerScore > computerScore) {
          document.getElementById('result').textContent = "Congratulations! You won the game!";
        } else {
          document.getElementById('result').textContent = "Sorry! You lost the game!";
        }
      }
    });
  });
}

// Start the game
game();