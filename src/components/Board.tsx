import React, { Component } from 'react';
import '../App.css';
import CardComponent from './Card';
import Game from '../models/Game';
import Card from '../models/Card';
import Button from '@material-ui/core/Button';
import _ from 'lodash';

interface Coordinates {
  row: number;
  col: number;
};

interface BoardState {
  game: Game;
  onDeck: Coordinates | null;
  isRunning: boolean;
  isComplete: boolean;
  rows: string;
  columns: string;
};

export default class Board extends Component{
  static SHOW_CARD_DELAY = 500;
  static MAX_DIMENSION = 10;
  static MIN_DIMENSION = 1;

  state: BoardState = {
    game: new Game(),
    onDeck: null,
    isRunning: false,
    isComplete: false,
    rows: '4',
    columns: '6'
  };

  parseInput = (value: string) => {
    if (_.isEmpty(value)) {
      return null;
    }

    const parsed = parseInt(value, 10);
    return !_.isNaN(parsed) ? parsed : null;
  }

  validateDimension = (value: number | null) => {
    return !_.isNil(value) && value >= Board.MIN_DIMENSION && value <= Board.MAX_DIMENSION;
  }

  startNewGame = () => {
    const rows = this.parseInput(this.state.rows);
    const columns = this.parseInput(this.state.columns);

    if (!this.validateDimension(rows) || !this.validateDimension(columns)) {
      return null;
    }

    this.setState({
      game: new Game(rows as number, columns as number),
      onDeck: null
    });
  }

  checkComplete = () => {
    return !this.board.some(row => row.some(card => !card.isMatched));
  }

  onCardClick = (card: Card) => {
    if (this.state.isRunning || card.isMatched) {
      return null;
    }

    if (this.state.onDeck === null) {
      card.flip();
      this.setState({ onDeck: { row: card.row, col: card.col } });
    } else {
      const row = this.state.onDeck.row;
      const col = this.state.onDeck.col;
      const onDeckCard = this.board[row][col];

      if (row === card.row && col === card.col) {
        return null;
      }

      if (onDeckCard.value === card.value) {
        card.flip();
        this.setState({ isRunning: true });

        setTimeout(
          () => {
            onDeckCard.isMatched = true;
            card.isMatched = true;

            const isComplete = this.checkComplete();

            if (isComplete) {
              this.setState({ onDeck: null, isRunning: false, isComplete: true });
            } else {
              this.setState({ onDeck: null, isRunning: false });
            }
          },
          Board.SHOW_CARD_DELAY
        );
      } else {
        card.flip();
        this.setState({ isRunning: true });

        setTimeout(
          () => {
            onDeckCard.flip();
            card.flip();
            this.setState({ onDeck: null, isRunning: false });
          },
          Board.SHOW_CARD_DELAY
        );
      }

      this.state.game.incrementGuess()
    }
  }

  get board() {
    return this.state.game.board;
  }

  update = (type: string) => (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ [type]: event.currentTarget.value })
  }

  render() {
    const winBlock = (<div className="win-block">You Win</div>);
    const guessBlock = (<div className="guess-block">{ `Guess count ${this.state.game.guessCount}` }</div>)

    return (
      <div className="App">
        <div className="main-container">
          { this.state.isComplete && winBlock }
          { guessBlock }
          <div className="board">
            {
              this.board.map((cards: Card[], row: number) => (
                <div className="row" key={ row }>
                  {
                    cards.map((card: Card, col: number) => (
                      <CardComponent
                        card={ card }
                        onCardClick={ this.onCardClick }
                        key={ `${row}-${col}` }
                      />
                    ))
                  }
                </div>
              ))
            }
          </div>
          <div className="input-container">
            <span>No. of rows</span>
            <input
              className="dimension-input"
              value={ this.state.rows }
              onChange={ this.update('rows') }
            />
            <span>No. of columns</span>
            <input
              className="dimension-input"
              value={ this.state.columns }
              onChange={ this.update('columns') }
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              className="menu-btn"
              onClick={ this.startNewGame }
            >
              Start New
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
