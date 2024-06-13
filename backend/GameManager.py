from aiohttp.web import WebSocketResponse as WebSocket
from aiohttp import WSMessage, WSMsgType
from typing import List

from Game import Game


class GameManager:
    
    def __init__(self) -> None:
        self._games:List[Game] = []
        self._users:List[WebSocket] = []
        self._pendingUser:WebSocket = None

    async def addUser(self, socket:WebSocket):
        self._users.append(socket)
        await self.addHandler(socket)


    def removeUser(self, socket:WebSocket):
        activeUser = lambda user: user != socket
        self._users = list(filter(activeUser , self._user))


    async def addHandler(self, socket:WebSocket):
        async for message in socket:
            # data = await socket.receive()
            message = message.json()
            
            if message.get('type') == 'init_game':
                if self._pendingUser is not None:
                    game = Game(player1=self._pendingUser, player2=socket)
                    await game.inform_user()
                    self._games.append(game)
                    self._pendingUser = None
                else:
                    self._pendingUser = socket
                    
            if message.get('type') == 'move':
                game = [game for game in self._games if game.player1 == socket or game.player2 == socket]
                if game:
                    game = game[0]
                    await game.makeMove(socket, message)
