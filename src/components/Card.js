import React from "react";

const Card = (props) => {
  return (
    <div className="card">
      <p className="card_message">{props.card.message}</p>
      <ul className="card_controls">
        <li>
          <p>{props.card.likes_count}❤️</p>
        </li>
        <li>
          <p onClick={() => props.plusOneCard(props.card)}>+1</p>
        </li>
        <li>
          <p
            className="card_delete"
            onClick={() => props.deleteCard(props.card)}
          >
            Delete
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Card;
