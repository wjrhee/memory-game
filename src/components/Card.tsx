import React from 'react'
import Card from '../models/Card';

interface CardProps {
  card: Card;
  onCardClick: (card: Card) => void;
}

export default (props: CardProps) => {
  const onClick = () => {
    props.onCardClick(props.card);
  }

  return props.card.isMatched ? (
    <div className="card blank-card" />
  ) : (
    <div className="card active-card" onClick={ onClick }>
      { !props.card.isFaceDown && props.card.value }
    </div>
  );
}
