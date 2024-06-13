import asyncio
from typing import List, Dict
import asyncio
from aiohttp import web
import aiohttp
from Game import Game
from GameManager import GameManager
import json

gameManager = GameManager()

@web.middleware
async def cors_middleware(request, handler):
    if request.method == 'OPTIONS':
        response = web.Response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = '*'
        return response
    response = await handler(request)
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = '*'
    print(response)
    return response


async def handle_user_moves(request):
    pass

async def websocket_handler(request):
    print("started websocket server")
    ws = web.WebSocketResponse()
    await ws.prepare(request)
    await gameManager.addUser(socket=ws)
    return ws

async def start_game(request):
    print("game started")
    return web.json_response(data={})

async def init_app():
    app = web.Application(middlewares=[cors_middleware])
    app.router.add_route("POST", "/start_game", start_game)
    app.router.add_route("GET", "/ws", websocket_handler)
    return app



web.run_app(init_app())
