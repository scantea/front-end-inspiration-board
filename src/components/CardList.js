import axios from "axios";
import React, { useState, useEffect } from "react";

const CardList = (props) => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/boards/${props.board.board_id}/cards`
      )
      .then((response) => {
        setCardsData(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("ooopsie Daisy, couldn't get cards on our board!! 😖 ");
      });
  }, [props.board]);

  //Delete Logic for a single card
  const deleteCard = (card) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/cards/${card.card_id}`)
      .then((response) => {
        const newCardsData = cardsData.filter((existingCard) => {
          return existingCard.card_id != card.card_id;
        });
        setCardsData(newCardsData);
      })
      .catch((error) => {
        console.log("Error: ", error);
        alert("LOLOL Couldn't Delete the Card, something went wrong!! 😖");
      });
  };
  //Handling likes on each card!
  const plusOneCardItem = (card) => {
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/cards/${card.card_id}/like`)
      .then((response) => {
        const newCardsData = cardsData.map((existingCard) => {
          return existingCard.card_id !== card.card_id
            ? existingCard
            : { ...card, likes_count: card.likes_count + 1 };
        });
        setCardsData(newCardsData);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't +1 the card.");
      });
  };

  const cardElements = cardsData.map((card) => {
    return (
      <Card
        card={card}
        plusOneCardItem={plusOneCardItem}
        deleteCardItem={deleteCardItem}
      ></Card>
    );
  });

  const postNewCard = (message) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/boards/${props.board.board_id}/cards`,
        { message }
      )
      .then((response) => {
        const cards = [...cardsData];
        cards.push(response.data.card);
        setCardsData(cards);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't create a new card.");
      });
  };

  return (
    <section className="cards__container">
      <section>
        <h2>Cards for {props.board.title}</h2>
        <div className="card-items__container">{cardElements}</div>
      </section>
      <NewCardForm postNewCard={postNewCard}></NewCardForm>
    </section>
  );
  // const updateCardData = (event) => {
  //     setCardData(event.target.value);
  // }
};

export default CardList;
