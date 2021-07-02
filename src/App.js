import "./App.css";
import React, { useState, useEffect } from "react";
import NewBoard from "./components/NewBoard";
import CardList from "./components/CardList";
import Board from "./components/Board";
import axios from "axios";

function App() {
  // sets up state variables for Board component
  const [boardData, setBoardData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState({
    title: "",
    owner: "",
    board_id: null,
  });

  // useEffect hook
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/boards`, {})
      .then((response) => {
        setBoardData(response.data);
      });
  }, []);

  // logic for selecting board/elements
  const selectBoard = (board) => {
    setSelectedBoard(board);
  };
  const boardsElements = boardData.map((board) => {
    return (
      <li>
        <Board board={board} onBoardSelect={selectBoard} />
      </li>
    );
  });
  // double check backend endpoint naming conventions match '/boards' etc...
  const createNewBoard = (newBoard) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/boards`, newBoard)
      .then((response) => {
        console.log("Response:", response.data);
        const boards = [...boardData];
        boards.push(response.data);
        setBoardData(boards);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("Couldn't create a new board.");
      });
  };
  // Board visibility state variables
  const [isBoardFormVisible, setBoardFormVisible] = useState(true);
  const toggleNewBoardForm = () => {
    setBoardFormVisible(!isBoardFormVisible);
  };
  // delete all functionality
  const deleteAll = () => {
    if (
      window.confirm("Are you sure you want to delete all boards and cards?")
    ) {
      // check endpoint name (destroy_all)
      axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/destroy_all`)
        .then((response) => {
          console.log("repsonse".response.data);
          setBoardData([response.data.default_board]);
          setSelectedBoard({
            title: "",
            owner: "",
            board_id: null,
          });
        })
        .catch((error) => {
          console.log("Error:", error);
          alert("Oops! Something is not right!");
        });
    }
  };

  return (
    <div className="page">
      <div className="content">
        <h1>🐶 Jay's Buggy Puggy-Mean Pugs Board 🌭</h1>
        <section className="boards_container">
          <section>
            <h2>💋 Burn Book Boards 💋</h2>
            <ol className="boards_list">{boardsElements}</ol>
          </section>
          <section>
            <h2>💋 Selected Burn Book 💋</h2>
            <p>
              {selectedBoard.board_id
                ? `${selectedBoard.title} - ${selectedBoard.owner}`
                : "Select a Board from the Board List"}
            </p>
          </section>
          <section className="new_board_form">
            <h2>💋 Let's make a new burn! 💋</h2>
            {isBoardFormVisible ? (
              <NewBoard createNewBoard={createNewBoard}></NewBoard>
            ) : (
              ""
            )}
            <span
              onClick={toggleNewBoardForm}
              className="new-board-form-toggle"
            >
              {isBoardFormVisible
                ? "Hide New Board Form"
                : "Show New Board Form"}
            </span>
          </section>
        </section>
        {selectedBoard.board_id ? (
          <CardList board={selectedBoard}></CardList>
        ) : (
          ""
        )}
      </div>
      <footer>
        Click{" "}
        <span onClick={deleteAll} className="footer__delete-btn">
          here
        </span>{" "}
        to delete all evidence, or spread it ;)!
      </footer>
    </div>
  );
}

export default App;

//user input, to choose how to sort
