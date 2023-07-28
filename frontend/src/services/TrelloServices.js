const API_URL = 'https://api.trello.com/1/'
const BOARD = 'board/lUXwHIpy/cards/'
const API_KEY = '94684eb29bcfa6d4e80c6a32d9248504'
const API_TOKEN = 'ATTA494d0b279ca63cc6ea1b776d149e6e7711837ca55c26459776b79a4b709ce96dA4ACB8C5'

export const getTrelloBoard = async (listId) =>{
    const url = `${API_URL}Lists/${listId}/cards/?key=94684eb29bcfa6d4e80c6a32d9248504&token=ATTA494d0b279ca63cc6ea1b776d149e6e7711837ca55c26459776b79a4b709ce96dA4ACB8C5`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export const getAllList = () =>{
    const url = `https://api.trello.com/1/boards/lUXwHIpy/lists/?key=94684eb29bcfa6d4e80c6a32d9248504&token=ATTA494d0b279ca63cc6ea1b776d149e6e7711837ca55c26459776b79a4b709ce96dA4ACB8C5`
}

export const moveCardEstimated = async ({cardId, idList, name}) =>{
    const url = `${API_URL}cards/${cardId}?idList=${idList}&name=${name}&key=${API_KEY}&token=${API_TOKEN}`
    const response = await fetch(url,{
        method: 'PUT'
    })
    const data = await response.json()
    return data
}