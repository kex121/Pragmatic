import React from 'react';
import './gameCard.scss';

const GameCard: React.FC<{ gameID: string; name: string }> = ({ gameID, name }) => {
  const img = `https://bsw-dk1.pragmaticplay.net/game_pic/square/200/${gameID}.png`;

  return (
    <div className="game-card">
      <div className="img-wrap">
        <img src={img} alt={name} />
      </div>
      <div className="game-name">{name}</div>
    </div>
  );
};

export default GameCard;
