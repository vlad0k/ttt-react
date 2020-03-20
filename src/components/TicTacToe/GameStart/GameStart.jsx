import React from 'react';

export default ({handleGameStart}) => {
  return (
    <div>
      <form onSubmit={handleGameStart}>
        <input type={'submit'} value='Start'/>
      </form>
    </div>
  )
};
