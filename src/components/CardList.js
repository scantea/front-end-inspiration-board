import React, { useState, useEffect } from 'react';

const CardList = (props) => {
    const [cardData, setCardData] = useState([]);
    const updateCardData = (event) => {
        setCardData(event.target.value);
    }
}

export default CardList;