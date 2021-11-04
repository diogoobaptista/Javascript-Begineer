/* eslint-disable no-undef */
const fetch = require('node-fetch')

const BOARD_GAME_HOST = 'https://www.boardgameatlas.com/api/'
const CLIENT_ID = process.env.CLIENT_ID
const BOARD_GAME_SEARCH = `search?client_id="`

if(!CLIENT_ID) throw Error('Board Game CLIENT_ID not set!')

module.exports = {
    getBody: getBody
}

// access board game atlas api
// make a request with url + given query
// and when the request is done call the callback to represent data
function getBody(query, sendResponse) {
    const url = BOARD_GAME_HOST + BOARD_GAME_SEARCH + CLIENT_ID;
    return fetch(url + query)
        .then((res, error) => {
            if (error || res.statusCode !== 200) {
                return sendResponse(error, response.statusCode)
            }
        })
        .then(obj => sendResponse(obj.toString(), response.statusCode))
};


