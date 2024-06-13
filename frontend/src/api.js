const userNames = ['Tom', 'Jerry']

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


export const makeMoveOnServer = (move, ws) => {
    const data = {
        type: 'move',
        ...move
    }
    ws.send(JSON.stringify(data))
    
}        

