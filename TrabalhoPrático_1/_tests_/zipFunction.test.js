/* eslint-disable no-undef */
'use strict'

const zip = require('../filterFunctions')

test('Test zip - 1 test', () => {
    const result = [5,7,9];
    const filtered = [1,2,3].zip([4,5,6], function(left, right) { return left + right});
    expect(filtered).toEqual(result);
})

test('Test zip - 2 test', () => {
    const result = [5,7,9];
    const filtered = [1,2,3].zip([4,5,6,7,8], (left, right) => left + right);
    expect(filtered).toEqual(result);
})
test('Test zip - 3 test', () => {
    const result = [5,7];
    const filtered = [1,2,3].zip([4,5], (left, right) => left + right);
    expect(filtered).toEqual(result);
})
test('Test zip - 4 test', () => {
    const result = [];
    const filtered = [1,2,3].zip([], (left, right) => left + right);
    expect(filtered).toEqual(result);
})
test('Test zip - 5 test', () => {
    const result = [];
    const filtered = [].zip([1,2,3], (left, right) => left + right) // []
    expect(filtered).toEqual(result);
})