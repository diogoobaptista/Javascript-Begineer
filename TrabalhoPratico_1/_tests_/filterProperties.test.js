/* eslint-disable no-undef */
'use strict'

const { filterProperties } = require('../filterFunctions')

const o = {a: 1, b: 'Thor', c: [1,2,3], d: {x: 10}, e: 2, f: 'Captain America'};
const props = ['b', 'd', 'g', 'a'];


test('Test filterFunctions', () => {
    const result = { a: 1, b: 'Thor', d: { x: 10 } };
    const filtered = filterProperties(props, o);
    expect(filtered).toEqual(result)
})