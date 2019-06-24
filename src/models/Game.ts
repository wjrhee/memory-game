import Card from "./Card";

export default class Game {
  readonly columns: number;
  readonly rows: number;

  private _guessCount = 0;

  availableCards: number[] = [];
  board: Card[][] = [];

  constructor(rows = 4, columns = 6) {
    this.rows = rows;
    this.columns = columns;
    this.generateBoard();
  }

  generateBoard = () => {
    this.generateDeck();
    this.board = [];

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        if (!this.board[row]) {
          this.board[row] = [];
        }

        const valuePosition = Math.floor(Math.random() * this.availableCards.length);
        const value = this.availableCards[valuePosition];
        this.availableCards.splice(valuePosition, 1);

        this.board[row].push(new Card({ value: value, row, col }));
      };
    };
  }

  generateDeck = () => {
    this.availableCards = [];

    const size = this.rows * this.columns;

    for (let i = 1; i < (size / 2) + 1; i++) {
      this.availableCards.push(i, i);
    };
  }

  get guessCount(): number {
    return this._guessCount;
  }

  incrementGuess = () => {
    this._guessCount++;
  }
}