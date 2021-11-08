'use strict'

const { filterProperties } = require('./filterFunctions')
const fetch = require('node-fetch')
const fs = require('fs');

const BOARD_GAME_HOST = 'https://api.boardgameatlas.com/api/'
const CLIENT_ID = process.env.ATLAS_CLIENT_ID
const GAME_ID_SEARCH = 'search?ids='
const CLIENT_ID_SEARCH = '&pretty=true&client_id='

if(!CLIENT_ID) throw Error('Board Game CLIENT_ID not set!')

async function getBodybyId(game_id) {
    const searchProp = ['id', 'name', 'url'];
    const url = BOARD_GAME_HOST + GAME_ID_SEARCH + game_id + CLIENT_ID_SEARCH + CLIENT_ID;
    const resp = await fetch(url)
    const body = await resp.text()
    const json = await JSON.parse(body)
    const game = json.games[0];
    return filterProperties(searchProp, game);
};

function readTxt(txtFile) {
    const data = fs.readFileSync(txtFile);
    return data.toString().replace(/\r\n/g,'\n').split('\n');
};

async function getBody() {
    let promises = [];
    try {
        const gameIds = readTxt('docs/gameIdsList.txt');
        Object.values(gameIds).filter(game_id => {
            if(game_id) {
                promises.push(getBodybyId(game_id));
            }
        });
        await Promise.all(promises).then(valores=> {
            return fs.writeFile("./docs/outputAsync.json", JSON.stringify(valores), () => {});
        });
    } catch(e) {
        console.log(e)
}
};

getBody();