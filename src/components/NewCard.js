import { useState } from "react";

const NewCardForm = (props) => {
  const [message, setMessage] = useState("");
  const changeMessage = (event) => {
    setMessage(event.target.value);
  };

  const submitNewCard = (event) => {
    event.preventDefault();
    props.postNewCard(message);
    setMessage("");
  };

  return (
    <section className="new_CardForm_section">
      <h2>Create New Card 🔥</h2>
      <form onSubmit={submitNewCard} className="input_new_card_info">
        <label>🔥 Message 🔥</label>
        <input
          type="text"
          className={
            message.length === 0 || message.length > 40
              ? "invalid-form-input"
              : ""
          }
          onChange={changeMessage}
          value={message}
        ></input>
        <p>Preview 🤬: {message}</p>
        <input
          type="Submit"
          disabled={message.length === 0 || message.length > 40}
          className="new_card_submit_form"
        ></input>
      </form>
    </section>
  );
};

export default NewCardForm;
