/* eslint-disable no-undef */
'use strict'

const { filterPropertiesN } = require('../filterFunctions')

const objs = [
    {a: 1, b: 'Thor', c: [1,2,3], d: {x: 10}, e: 2, f: 'Captain America'},
    {b: 'Hulk', a: [1,2,3], d: {x: 10}, e: 2, g: false}, 
    {x: 'Vision', y: false}
 ]
 const props = ['b', 'd', 'g', 'a'];


test('Test filterPropertiesN', () => {
    const result = [
        { a: 1, b: 'Thor', d: { x: 10 } },
        { b: 'Hulk', a: [ 1, 2, 3 ], d: { x: 10 }, g: false },
        {}
      ];
    const filtered = filterPropertiesN(props, objs)
    expect(filtered).toEqual(result)
})