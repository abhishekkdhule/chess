from datetime import datetime
from typing import List
from aiohttp.web import WebSocketResponse as WebSocket
from chess import Board, Move


class Game():

    def __init__(self, player1:WebSocket, player2:WebSocket) -> None:
        self.player1:WebSocket = player1
        self.player2:WebSocket = player2
        self.board:Board = Board()
        self.moves:List[str] = [] #the string is a uci
        self.startime:datetime = datetime.now()
        

    async def inform_user(self):
        await self.player1.send_json(
                {
                    'color': 'White',
                    'status': 'Started'
                }
            )
        await self.player2.send_json(
            {
                'color': 'Black',
                'status': 'Started'
            }
        )


    async def makeMove(self, socket:WebSocket, message:dict):
        move:str = message.get('from') + message.get('to')
        self.board.push(Move.from_uci(move))
        if self.player1 == socket:
            await self.player2.send_json(
                message
            )
        else:
            await self.player1.send_json(
                message
            )

        if self.board.is_checkmate():
            winner = 'White' if self.board.turn else 'Black'
            await self.player1.send_json(
                {
                    'winner': winner
                }
            )
            await self.player2.send_json(
                {
                    'winner': winner
                }
            )
        