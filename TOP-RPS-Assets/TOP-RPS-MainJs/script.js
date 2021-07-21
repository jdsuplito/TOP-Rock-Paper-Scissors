const mainGameData = {
  winningScore: 5,
  playerScore: 0,
  computerScore: 0,
}

!function initializeGameBoard() {
  const winScoreElements = document.querySelectorAll('.win-score');
  winScoreElements.forEach((el) => {
    el.innerText = mainGameData.winningScore;
  })

  document.querySelector('.try-btns-yes').addEventListener('click', () => {
    window.location.reload();
  })
}();

let playerSelection = '';

const displayHumanPicked = (handChoiceId) => {
  document.querySelectorAll('#picked-container .div-pick-hand').forEach((handChoice) => {
    if(handChoiceId === handChoice.id.replace('picked-', '')) {
      handChoice.classList.add('div-pick-hand-shown');
      playerSelection = handChoiceId;
    } else {
      handChoice.classList.remove('div-pick-hand-shown');
    }
  });
  playRound();
}

const displayComputerPicked = (computerChoiceId) => {
  document.querySelectorAll('#computer-pick-con .div-pick-hand').forEach((computerChoice) => {
    if(computerChoiceId === computerChoice.id.replace('com-', '')) {
      computerChoice.classList.add('div-pick-hand-shown');
    } else {
      computerChoice.classList.remove('div-pick-hand-shown');
    }
  })
}

document.querySelectorAll('#hand-user .div-hand').forEach((handChoice) => {
  handChoice.addEventListener('click', (e) => {
    displayHumanPicked(e.target.id);
  });
});

const computerPlay = () => {
  const computerChoices = ['rock', 'scissors', 'paper'];
  const randomNumber = Math.floor((Math.random() * 3));
  return computerChoices[randomNumber];
}

const win = () => {
  document.querySelector('.main-win-lose-draw').style.display = "block";
  document.getElementById('game-win-lose-draw').textContent = "You Win!";
};
const lose = () => {
  document.querySelector('.main-win-lose-draw').style.display = "block";
  document.getElementById('game-win-lose-draw').textContent = "You Lose!";
};
const draw = () => {
  document.querySelector('.main-win-lose-draw').style.display = "block";
  document.getElementById('game-win-lose-draw').textContent = "Draw!";
};

const userWin = () => {
  document.getElementById('bmo-img').src = "./TOP-RPS-Assets/TOP-RPS-Media/bmo.png";
  document.querySelector('.main-win-lose-draw').style.display = "block";
  document.getElementById('game-win-lose-draw').style.color = "#0593ff";
  document.getElementById('game-win-lose-draw').textContent = "Finn Wins!";
};

/**
 * Checks both player and computer score then decides if limit is reached
 */
const checkScores = () => {
  let isThereAWinner = false;

  if(mainGameData.playerScore >= mainGameData.winningScore) {
    userWin();
    isThereAWinner = true;
  } else if (mainGameData.computerScore >= mainGameData.winningScore) {
    computerWin();
    isThereAWinner = true;
  }

  isThereAWinner ? tryAgain() : '';
}

/**
 * Turns player ability off/on to click on choices
 */
const toggleHands = () => {
  const choiceContainer = document.querySelector('.div-hand-con');
  const isEnabled = Array.from(choiceContainer.classList).includes('disable-choices');
  isEnabled ? choiceContainer.classList.remove('disable-choices') : choiceContainer.classList.add('disable-choices');
}

const computerWin = () => {
  document.getElementById('finn-img').src = "./TOP-RPS-Assets/TOP-RPS-Media/fin.png";
  document.querySelector('.main-win-lose-draw').style.display = "block";
  document.getElementById('game-win-lose-draw').style.color = "#00b686";
  document.getElementById('game-win-lose-draw').textContent = "Bmo Wins!";
};

const tryAgain = () => {
  document.querySelector('.main-vs').style.display = "none";
  document.querySelector('.main-try-div').style.display = "block";
  document.getElementById('main-audio').pause();
  var islandSong = new Audio('./TOP-RPS-Assets/TOP-RPS-Media/Adventure-Time-Island-Song.mp3');
  toggleHands();
  islandSong.play();
};

const deductFromLife = (whichSide) => {
  if (whichSide === 'player') {
    document.querySelector('.div-life').lastElementChild.remove();
  } else if (whichSide === 'computer') {
    document.querySelector('.div-life1').lastElementChild.remove();
  }
}

const playRound = () => {
  const computerSelection = computerPlay();
  displayComputerPicked(computerSelection);

  // Scoring system
  if (playerSelection === computerSelection) {
    draw();
    // draw - do nothing (or maybe display draw somwhere)
  } else if (playerSelection === 'rock' && computerSelection === 'scissors') {
    // player win - add score to player
    const playerScore  = parseInt(document.querySelector('#player-score').innerText);
    mainGameData.playerScore = playerScore + 1;
    document.querySelector('#player-score').innerText = mainGameData.playerScore;
    deductFromLife('computer');
    win();
  } else if (playerSelection === 'paper' && computerSelection === 'rock') {
    // player win - add score to player
    const playerScore = parseInt(document.querySelector('#player-score').innerText);
    mainGameData.playerScore  = playerScore + 1;
    document.querySelector('#player-score').innerText = mainGameData.playerScore;
    deductFromLife('computer');
    win();
  } else if (playerSelection === 'scissors' && computerSelection === 'paper') {
    // player win - add score to player
    const playerScore = parseInt(document.querySelector('#player-score').innerText);
    mainGameData.playerScore = playerScore + 1;
    document.querySelector('#player-score').innerText = mainGameData.playerScore;
    deductFromLife('computer');
    win();
  } else {
    // computer win - add score to computer
    const computerScore = parseInt(document.querySelector('#com-score').innerText);
    mainGameData.computerScore = computerScore + 1;
    document.querySelector('#com-score').innerText = mainGameData.computerScore;
    deductFromLife('player');
    lose();
  }
  checkScores();
}
