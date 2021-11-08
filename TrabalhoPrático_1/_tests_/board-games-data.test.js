/* eslint-disable no-undef */
'use strict'

const boardGames = require('../board-games-data')


test('Test json files', () => {
    boardGames.getBody('gameIdsList.txt')
})