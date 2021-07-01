import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Card";
import NewCardForm from "./NewCard";

const CardList = (props) => {
  const [cardData, setCardData] = useState([]);
  const [sortType, setSortType] = useState("card_id");

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/boards/${props.board.board_id}/cards`
      )
      .then((response) => {
        //insert sort code
        const sortArray = (type) => {
          const types = {
            card_id: "card_id",
            message: "message",
            likes_count: "likes_count",
          };
        };
        const sortProperty = types[type];
        const sorted = [...CardList].sort(
          (a, b) => b[sortProperty] - a[sortProperty]
        );
        setCardData(sorted);
        setCardData(response.data.cards);
        sortArray(sortType);
      }) //logic to sort cards; create a function in or out, and call it here
      .catch((error) => {
        console.log("Error:", error);
        alert("ooopsie Daisy, couldn't get cards on our board!! 😖 ");
      });
  }, [props.board, sortType]); //[props.board,sortType]

  //Delete Logic for a single card
  const deleteCard = (card) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/cards/${card.card_id}`)
      .then((response) => {
        const newCardsData = cardData.filter((existingCard) => {
          return existingCard.card_id !== card.card_id;
        });
        setCardData(newCardsData);
      })
      .catch((error) => {
        console.log("Error: ", error);
        alert("LOLOL Couldn't Delete the Card, something went wrong!! 😖");
      });
  };
  //Handling likes on each card!
  const plusOneCard = (card) => {
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/cards/${card.card_id}/like`)
      .then((response) => {
        const newCardData = cardData.map((existingCard) => {
          return existingCard.card_id !== card.card_id
            ? existingCard
            : { ...card, likes_count: card.likes_count + 1 };
        });
        setCardData(newCardData);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't +1 the card.");
      });
  };

  const cardElements = cardData.map((card) => {
    return (
      <Card
        card={card}
        plusOneCardItem={plusOneCard}
        deleteCardItem={deleteCard}
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
        const cards = [...cardData];
        cards.push(response.data);
        setCardData(cards);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't create a new card.");
      });
  };

  // const sort_cards = (card) =>{

  //   return ()
  // }

  return (
    <section className="cards__container">
      <section>
        <h2>Cards for {props.board.title}</h2>
        <div className="card-items__container">{cardElements}</div>
      </section>
      <NewCardForm postNewCard={postNewCard}></NewCardForm>
      <section className="sort__selection__container">
        <h3>Sort By:</h3>
        <select onChange={(event) => setSortType(event.target.value)}>
          <option value="card_id">ID</option>
          <option value="message">Alphabetically</option>
          <option value="likes_count">Number likes</option>
        </select>
      </section>
    </section>
  );
};

export default CardList;

// {
//   "board_id":3,
//   "cards":[
//     {"board_id":3,"card_id":1,
//     "likes_count":0,"message":"ffdfsdf"},
//     {
//       "board_id":3,"card_id":8,"likes_count":0,
//       "message":"TESTING SLACKBOT 123"},
//       {"board_id":3,"card_id":9,"likes_count":0,
//       "message":"TESTING AGAIN"}],
//       "owner":"fdasf","title":"dafdf"}

// 1: {board_id: 3, card_id: 1,
//  likes_count: 0, message: "ffdfsdf"}

//select drop down to select (via weather report); grab the value, pass it into an argument that does
//the sorting, sort by , could potentially do it on the backend; sort by field
