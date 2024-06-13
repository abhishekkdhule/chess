import React, { useEffect } from 'react'
import { makeMoveOnServer } from '../api';
import { useState } from 'react';
import Board from './Board'
import { Chess } from 'chess.js'
import { Chessboard } from "react-chessboard";

function GameScreen() {
    const [ws, setWS] = useState(null)
    const [game, setGame] = useState(new Chess());
    const [movesLog, setMovesLogs] = useState([])
    const [currentUser, setCurrentUser] = useState(null) 
    
    const startGame = (setCurrentUser, setWebsc, ws) => {
        // const username = `${userNames[getRandomInt(2)]}${Date.now()}`
        setCurrentUser('Tom')
        const socket = new WebSocket('ws://127.0.0.1:8080/ws')
        socket.onopen = (() => {
            setWebsc(socket)
            socket.send(JSON.stringify({type: 'init_game'}))
        })
    
        socket.onmessage = ((event) =>  {
            let data = JSON.parse(event.data)
            if (data.type === 'move') {
                delete  data.type
                console.log(data)
                return makeAUIMove(data)
            }
            
        })
        
        
    }
        
    const validateMove = (sourceSquare, targetSquare, piece) => {
        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
            piece: piece,
            // promotion: "q", 
        });
        if (move === null) return false;
        return true;
    }
    
    const makeAUIMove = (move) => {
        // try {
            console.log(game.turn())
            const chessCopy = new Chess(game.fen())
            const result = chessCopy.move(move);
            setGame(chessCopy)
            setMovesLogs([...movesLog, move])
            return result
        // } catch {
            // alert("kabhi to sahi khel le")
            // return null
        // }
       
    }

    const makeAMove = (move) => {
        let result = makeAUIMove(move)
        makeMoveOnServer(move, ws)
        return result
    }

   
    return (
        <div className='flex justify-evenly bg-cyan-300 p-10' >
            <div className='flex flex-col items-center'>
                <div className='w-80 shadow-teal-300'>
                    <Chessboard
                        position={game.fen()}
                        onPieceDrop={validateMove}
                        customPremoveDarkSquareStyle={{ backgroundColor: 'red', }}
                        customBoardStyle={{ borderRadius: '5px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5' }}
                    />
                </div>
                <div>
                    <button className={`mt-5 px-8 p-4 bg-teal-400 rounded-sm shadow-teal-400 ${currentUser ? 'hidden': ''}`} onClick={() => startGame(setCurrentUser, setWS, ws)}>Play</button>
                </div>
            </div>
            <div className='w-80 bg-slate-300' id="moves-logger">
                <h4 className='text-center py-2'>Hi {currentUser ? currentUser: ''}</h4>
                <hr/>
                {
                    movesLog.map((move, index) => {
                        return (
                            <p key={`${move.from}-${move.to}-index`} className='text-center'>
                                {
                                    `${move.from} , ${move.to}, ${move.piece}`
                                }
                            </p>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GameScreen