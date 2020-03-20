import React, { useState } from 'react';
import style from './TicTacToe.module.css';

import axios from 'axios';

import GameStart from './GameStart/GameStart.jsx';
import Table from './Table/Table.jsx';

const instance = axios.create({
  baseURL: 'http://46.175.40.108:3001/',
});

const socket = new WebSocket("ws://46.175.40.108:3001/table");

socket.onopen = function() {
  alert("Соединение установлено.");
};

socket.onerror = function(error) {
  alert("Ошибка " + error.message);
};


const checkWinner = (table) =>  {
  const winArr = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for (let win of winArr) {
    const [a, b, c] = win;

    if (table[a] === table[b] && table[a] === table[c] && table[a]){
      return table[a];
    }
  }

  return null;
}

const TicTacToe = () => {

  const [player, setPlayer] = useState(null);
  const [table, setTable] = useState([]);
  const [history, setHistory] = useState([]);
  const [xmove, setxMove] = useState(true);
  const [winner, setWinner] = useState(null);

  const getXO = () => (xmove ? 'X' : 'O');

  socket.onmessage = function(event) {
    let res = JSON.parse(event.data)
    setTable(res.table);
    setxMove(res.xmove);
    if (res.count == 9){
      setWinner("Draw");
    } else {
      setWinner(checkWinner(res.table))
    }
  };


  const handleMove = (id) => {
    if (table[id] || winner || (player === 'X') !== xmove || (player === 'O') !== !xmove) {
      return;
    }
    const tempTable = [...table];
    tempTable[id] = getXO();
    // setTable(tempTable);
    const tempHistory = [...history, {table: tempTable, xmove: !xmove}];
    setxMove(!xmove)
    setHistory(tempHistory);
    let win = checkWinner(tempTable);
    console.log(tempHistory.length);
    if (tempHistory.length === 9 && win !== 'X' && win !== 'O') {
      setWinner('Draw');
    } else {
      setWinner(win);
    }
    instance.post('table', {table: [...tempTable]});

  }

  const handleHistory = (e, i, arr) => {
    if (i+1 === arr.length) return;
    setTable(e.table);
    setxMove(e.xmove);
    setWinner(null);
    setHistory(history.splice(0,i+1));
  }

  const handleRestart = () => {
    setTable([]);
    setHistory([]);
    setxMove(true);
    setWinner(null);
    setPlayer(null)
  }

  const handleGameStart = (e) => {
    e.preventDefault();
    instance.get('gamestart').then((response) => {
      console.log(response);
      setPlayer(response.data.player);
      setxMove(response.data.xmove)
    });

  }

  return (
    <div className={style.TicTacToe}>
      <div>Player: {player}</div>
      {!player && <GameStart handleGameStart={handleGameStart}/>}
      {player && <Table
          table={table}
          history={history}
          xmove={xmove}
          winner={winner}
          getXO={getXO}
          handleMove={handleMove}
          handleHistory={handleHistory}
          handleRestart={handleRestart}
        />
      }
    </div>
  )
}

export default TicTacToe;
