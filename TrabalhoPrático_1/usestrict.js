'use strict'

const fetch = require('node-fetch')

const a = [];

function fetchLoripsum(){
    return fetch("https://loripsum.net/api/short/plaintext")
    .then(response => response.text())
}

function withoutAsyncAwait(){
    const request1 = fetchLoripsum()
    const request2 = fetchLoripsum()

    const array = [request1, request2]

    return Promise.all(array)
        /*.then(result =>{
            console.log(result[0])
            console.log(result[1])
        })*/
}

const aux = withoutAsyncAwait()
    .then(result=> {
        console.log("Done without AsyncAwait", result);
        a.push(result)
    })
    .catch(()=>console.log("Error", err))

    console.log(a);