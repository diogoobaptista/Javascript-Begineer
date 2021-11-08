'use strict'

const { filterProperties } = require('./filterFunctions')
const fetch = require('node-fetch')
const fs = require('fs.promises');

const BOARD_GAME_HOST = 'https://api.boardgameatlas.com/api/'
const CLIENT_ID = process.env.ATLAS_CLIENT_ID
const GAME_ID_SEARCH = 'search?ids='
const CLIENT_ID_SEARCH = '&pretty=true&client_id='

if(!CLIENT_ID) throw Error('Board Game CLIENT_ID not set!')

function getBodybyId(game_id) {
    const searchProp = ['id', 'name', 'url'];
    const url = BOARD_GAME_HOST + GAME_ID_SEARCH + game_id + CLIENT_ID_SEARCH + CLIENT_ID;
    return fetch(url)
        .then(res => res.text())
        .then(body => JSON.parse(body))
        .then(obj => { 
            return filterProperties(searchProp, obj.games[0]);
        })
};

function readFile() {
    const pInput = fs.readFile('./docs/gameIdsList.txt')
    return pInput.then(data => {
        return data.toString().split('\r\n')
    });
}

function createJsonFile() {
    readFile().then(gameIds => {
        const length = gameIds.length;
        const result = []
        Object.values(gameIds).filter(game_id => {
            if(game_id) {
                getBodybyId(game_id).then( res => {
                    if(result.length < length) {
                        result.push(res);
                    }
                    if(result.length === length){
                        fs.writeFile("./docs/output.json", JSON.stringify(result));
                    }
                });
            }
        });
    })    
};

createJsonFile();