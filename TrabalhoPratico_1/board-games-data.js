'use strict'

const { filterProperties } = require('./filterFunctions')
const fetch = require('node-fetch')
const fs = require('fs');

const BOARD_GAME_HOST = 'https://api.boardgameatlas.com/api/'
// const CLIENT_ID = process.env.ATLAS_CLIENT_ID
const CLIENT_ID = 'uHI64CQKVf'
const GAME_ID_SEARCH = 'search?ids='
const CLIENT_ID_SEARCH = '&pretty=true&client_id='

if(!CLIENT_ID) throw Error('Board Game CLIENT_ID not set!')

function getBodybyId(game_id, callback) {
    const searchProp = ['id', 'name', 'url'];
    const url = BOARD_GAME_HOST + GAME_ID_SEARCH + game_id + CLIENT_ID_SEARCH + CLIENT_ID;
    return fetch(url)
        .then(res => res.text())
        .then(body => JSON.parse(body))
        .then(obj => { 
            callback(filterProperties(searchProp, obj.games[0]));
        })
};

function readTxt(txtFile) {
    const data = fs.readFileSync(txtFile);
    return data.toString().replace(/\r\n/g,'\n').split('\n');
};

function getBody() {
    const gameIds = readTxt('./docs/gameIdsList.txt');
    const result = [];
    const length = gameIds.length;
    Object.values(gameIds).filter(game_id => {
        if(game_id) {
            getBodybyId(game_id, function(res) {
                if(result.length < length) {
                    result.push(res);
                }
                if(result.length === length){
                    fs.writeFile("./docs/output.json", JSON.stringify(result), () => {});
                }
            });
        }
    });
};

getBody();