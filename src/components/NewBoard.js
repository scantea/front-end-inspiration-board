import React, { useState, useEffect } from 'react';

const NewBoard = (props) => {
    const [Title, setTitle] = useState("");
    const [OwnersName, setOwnersName] = useState("");
    const handleOwnersName = (event) => {
        setOwnersName(event.target.value)
    };
    const handleTitle = (event) => {
        setTitle(event.target.value)
    };

    const makeNewBoard = (event) => {
        event.preventDefault()
        props.NewBoard({Title, OwnersName})
        setTitle("");
        setOwnersName("");
    }

    return (
        <form onSubmit={makeNewBoard}>
            <label>Title</label>
            <input type="text" value={Title} onChange={handleTitle} />
            <label>Owner's Name</label>
            <input type="text" value={OwnersName} onChange={handleOwnersName} />
            <input type="submit" value="Submit" />
            <p>Preview: {Title} - {OwnersName}</p>
        </form>
    );

}

export default NewBoard;
