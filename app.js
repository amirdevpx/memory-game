//Elements
const section = document.querySelector('section');
const container = document.querySelector('.container');

const row = container.querySelector('.row');
const lives = document.getElementById('lives');

const restartBtn = document.getElementById('restartBtn');

//Lives
let livesCount = 6;

//
lives.innerText = livesCount;

//Numbers
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

//Randomize
const randomize = () => {
  return numbers.sort(() => Math.random() - 0.5);
}

//Card generator
function cardGener() {
  const cardData = randomize();

  //Generate the HTML
  cardData.forEach((item) => {
    const card = document.createElement('div');
    const cardNumber = document.createElement('h1');

    card.classList = 'card';
    card.setAttribute('data-card', item)

    cardNumber.innerText = item;

    card.appendChild(cardNumber);
    row.appendChild(card);

    card.addEventListener('click', (e) => {
      card.classList.toggle('card_hidden');
      checkCards(e);
    });
  });

  timer();
}

cardGener();

//Timer
function timer() {
  const cards = document.querySelectorAll('.card');
  const timer = document.getElementById('timer');
  const timerText = timer.querySelector('h1');

  timerText.innerText = 3;
  timer.classList.remove('timer_hidden');

  let count = 2;

  const myInterval = setInterval(() => {
    timerText.innerText = count;
    count--;
  }, 1000);

  setTimeout(() => {
    cards.forEach(item => {
      item.classList.add('card_hidden');
    });

    timer.classList.add('timer_hidden');


    clearInterval(myInterval);
  }, 3500);
};

//Check cards
function checkCards(e) {
  const card = e.target;
  card.classList.add('clicked');
  const clickedCards = document.querySelectorAll(".clicked");

  if (clickedCards.length === 2) {
    const a = clickedCards[0].getAttribute('data-card');
    const b = clickedCards[1].getAttribute('data-card');

    if (a === b) {
      clickedCards.forEach(item => {
        item.classList.remove('clicked');
        item.style.cssText = 'background-color: #e5ffd9; pointer-events: none;';
      });
    } else {
      clickedCards.forEach(item => {
        item.classList.remove('clicked');
        setTimeout(() => item.classList.add('card_hidden'), 500);
      });

      livesCount--;
      lives.innerText = livesCount;

      if (livesCount === 0) restart('Game Over');
    }
  }
};

restartBtn.addEventListener('click', () => restart() );

// Restart
function restart() {
  const gameOver = document.getElementById('game-over');
  const gameText = gameOver.querySelector('h1');
  const button = gameOver.querySelector('button');

  gameOver.classList.remove('game-over_hidden');

  button.addEventListener('click', () => {
    gameOver.classList.add('game-over_hidden');
    row.innerHTML = '';
    livesCount = 6;
    lives.innerText = livesCount;
    cardGener();
  });
};