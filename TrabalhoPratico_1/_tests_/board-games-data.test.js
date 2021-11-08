/* eslint-disable no-undef */
'use strict'

const { getBody } = require('../board-games-data')


test('Test json files', () => {
    getBody('TrabalhoPratico_1/docs/gameIdsList.txt')
})