import './App.css';
import React,{useState, useEffect} from 'react';
import NewBoard from './components/NewBoard';
import BoardList from './components/BoardList';
import Board from './components/Board';
import axios from 'axios';


function App() {
  // sets up state variables for Board component
  const [boardData, setBoardData] = useState([]);
  const [selectedBoard, setSelected] = useState({
    title: '',
    owner: '',
    board_id: null
  })
  const selectBoard = (board) => {setSelected(board)};
  const boardsElements = boardData.map(board => {
    return (
      <li><Board board={board} onBoardSelect={selectBoard} /></li>
    )
  })
  const updateBoardData = (event) => {
    setBoardData(event.target.value);
  }

  
  return (
    <main>
      <NewBoard />
    </main>
  );
}

export default App;
