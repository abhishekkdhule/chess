import React, { useEffect } from 'react'

import { Chessboard } from "react-chessboard";
import Square from './Square';

function Board() {

  return (
    <div className='w-80 shadow-teal-300'>
        <Chessboard customPremoveDarkSquareStyle={{backgroundColor:'red', }} customBoardStyle={ { borderRadius: '5px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5'}}/>  
    </div>
  )
}

export default Board