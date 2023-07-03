// Función para obtener la elección aleatoria de la computadora
function getComputerChoice() {
  const choices = ['PIEDRA', 'PAPEL', 'TIJERAS'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Función para jugar una sola ronda
function playRound(playerSelection, computerSelection) {
  // Convertir la selección del jugador a minúsculas para hacerla insensible a mayúsculas y minúsculas
  playerSelection = playerSelection.toUpperCase();

  // Comprobar las diferentes combinaciones de jugadas para determinar el ganador
  if (playerSelection === computerSelection) {
    return "Empate!";
  } else if (
    (playerSelection === 'PIEDRA' && computerSelection === 'TIJERAS') ||
    (playerSelection === 'PAPEL' && computerSelection === 'PIEDRA') ||
    (playerSelection === 'TIJERAS' && computerSelection === 'PAPEL')
  ) {
    return `¡Ganaste! ${playerSelection} vence a ${computerSelection}`;
  } else {
    return `¡Perdiste! ${computerSelection} vence a ${playerSelection}`;
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

      if (result.includes('Ganaste!')) {
        playerScore++;
      } else if (result.includes('Perdiste!')) {
        computerScore++;
      }

      document.getElementById('score').textContent = `Puntos del jugador: ${playerScore} | Puntos de la computadora: ${computerScore}`;

      if (playerScore === 5 || computerScore === 5) {
        options.forEach(option => {
          option.removeEventListener('click', handleClick);
        });

        if (playerScore > computerScore) {
          document.getElementById('result').textContent = "¡Felicidades! ¡Ganaste el juego!";
        } else {
          document.getElementById('result').textContent = "¡Lo siento! ¡Perdiste el juego!";
        }
      }
    });
  });
}

// Iniciar el juego
game();