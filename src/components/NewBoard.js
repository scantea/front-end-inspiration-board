import React, { useState, useEffect } from "react";

const NewBoard = (props) => {
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const handleOwnersName = (event) => {
    setOwner(event.target.value);
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const makeNewBoard = (event) => {
    event.preventDefault();
    props.createNewBoard({ title, owner });
    setTitle("");
    setOwner("");
  };

  return (
    <form onSubmit={makeNewBoard}>
      <label>Title</label>
      <input type="text" value={title} onChange={handleTitle} />
      <label>Owner's Name</label>
      <input type="text" value={owner} onChange={handleOwnersName} />
      <input type="submit" value="Submit" />
      <p>
        Preview: {title} - {owner}
      </p>
    </form>
  );
};

export default NewBoard;
