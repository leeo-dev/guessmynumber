'use strict';

class GuessMyNumber {
  #secretNumber;
  #score;
  #highscore;
  #isPLaying;
  constructor() {
    this.#highscore = 0;
    this.#queryElements();
    this.#init();
    //prettier-ignore
    this.checkButton.addEventListener('click',this.#verifyGuessedNumber.bind(this));
    //prettier-ignore
    this.resetButton.addEventListener('click', this.#init.bind(this));
  }

  #verifyGuessedNumber() {
    this.messageUi = {
      high: `Your guess is too high 📈`,
      low: `Your guess is too low 📉`,
      correct: `Your guess is correct ✅`,
      lose: 'You lose the game 🤚🏼',
    };
    this.guessedNumber = this.#convertGuessedNumber(this.guess.value);
    if (!this.guessedNumber || !this.#isPLaying) return;

    //prettier-ignore
    if (this.guessedNumber > this.#secretNumber && this.#score > 0) {
      this.guessed = 'high';
      this.#score--;
    }
    //prettier-ignore
    if (this.guessedNumber < this.#secretNumber && this.#score > 0) {
      this.guessed = 'low';
      this.#score--;
    }
    //prettier-ignore
    if (this.guessedNumber === this.#secretNumber && this.#score > 0) {
      this.guessed = 'correct';
      this.#highscore += this.#score;
      this.#score = 20;
      this.background.style.backgroundColor = '#01937C';
      this.#isPLaying = false;
      this.number.textContent = this.#secretNumber;
    }

    if (this.#score === 0) {
      this.#isPLaying = false;
      this.guessed = 'lose';
      this.background.style.backgroundColor = '#E02401';
    }
    this.#updateUi();
    this.message.textContent = this.messageUi[this.guessed];
  }

  #updateUi() {
    this.scoreLabel.textContent = this.#score;
    this.highscoreLabel.textContent = this.#highscore;
  }

  #convertGuessedNumber(guess) {
    return Number(guess);
  }

  #queryElements() {
    this.resetButton = document.querySelector('.again');
    this.checkButton = document.querySelector('.check');
    this.scoreLabel = document.querySelector('.score');
    this.highscoreLabel = document.querySelector('.highscore');
    this.guess = document.querySelector('.guess');
    this.message = document.querySelector('.message');
    this.number = document.querySelector('.number');
    this.background = document.querySelector('body');
  }

  #init() {
    this.#secretNumber = this.#generateSecretNumber();
    this.#score = 20;
    this.#isPLaying = true;
    this.background.style.backgroundColor = '#222';
    this.guess.value = '';
    this.#textContent(this.message, 'Start guessing...');
    this.#textContent(this.number, '?');
    this.#textContent(this.scoreLabel, this.#score);
    this.#textContent(this.highscoreLabel, this.#highscore);
  }

  #textContent(element, message) {
    return (element.textContent = message);
  }

  #generateSecretNumber() {
    return Math.trunc(Math.random() * 20 + 1);
  }
}

const guessMyNumber = new GuessMyNumber();
