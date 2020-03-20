import React from 'react';

const Square = ({handleMove, id, value}) => {
  return <td onClick={() => handleMove(id)} >{value[id]}</td>
}

export default ({handleRestart, handleMove, table, winner, getXO, history, handleHistory}) => {
  return (
    <>
      <button onClick={handleRestart}>Restart</button>
      <table>
        <tr>
          <Square handleMove={handleMove} id={0} value={table}/>
          <Square handleMove={handleMove} id={1} value={table}/>
          <Square handleMove={handleMove} id={2} value={table}/>
        </tr>
        <tr>
          <Square handleMove={handleMove} id={3} value={table}/>
          <Square handleMove={handleMove} id={4} value={table}/>
          <Square handleMove={handleMove} id={5} value={table}/>
        </tr>
        <tr>
          <Square handleMove={handleMove} id={6} value={table}/>
          <Square handleMove={handleMove} id={7} value={table}/>
          <Square handleMove={handleMove} id={8} value={table}/>
        </tr>
      </table>
      {!winner && <div>Next Move: {getXO()}</div>}
      {winner && <div>Winner Is: {winner}</div>}
      {
        // history.map((e, i, arr) => <button onClick={() => handleHistory(e,i, arr)}>{`Go to move ${i + 1}`}</button>)
      }
  </>);
};
