interface CardProps {
  row: number;
  col: number;
  value: number | null;
}

export default class Card {
  value: number | null;
  row: number;
  col: number;
  isFaceDown = true;
  isMatched = false;

  constructor({ row, col, value }: CardProps) {
    this.value = value;
    this.row = row;
    this.col = col;
  }

  flip() {
    this.isFaceDown = !this.isFaceDown;
  }
}
