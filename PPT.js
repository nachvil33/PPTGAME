// Función para obtener la elección aleatoria de la computadora
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Función para jugar una sola ronda
function playRound(playerSelection, computerSelection) {
  // Convertir la selección del jugador a minúsculas para hacerla insensible a mayúsculas y minúsculas
  playerSelection = playerSelection.toLowerCase();

  // Comprobar las diferentes combinaciones de jugadas para determinar el ganador
  if (playerSelection === computerSelection) {
    return "It's a tie!";
  } else if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    return `You win! ${playerSelection} beats ${computerSelection}`;
  } else {
    return `You lose! ${computerSelection} beats ${playerSelection}`;
  }
}

// Función para jugar un juego de 5 rondas
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

      if (result.includes('win')) {
        playerScore++;
      } else if (result.includes('lose')) {
        computerScore++;
      }

      document.getElementById('score').textContent = `Player Score: ${playerScore} | Computer Score: ${computerScore}`;

      if (playerScore === 5 || computerScore === 5) {
        options.forEach(option => {
          option.removeEventListener('click', handleClick);
        });

        if (playerScore > computerScore) {
          document.getElementById('result').textContent = "Congratulations! You win the game!";
        } else {
          document.getElementById('result').textContent = "Sorry, you lose the game!";
        }
      }
    });
  });
}

// Iniciar el juego
game();