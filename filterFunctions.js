'use strict'

module.exports = {  // Common JS
    'filterProperties': filterProperties,
    'filterPropertiesN': filterPropertiesN,
    'zip': Array.prototype.zip,
}

function filterProperties(propNames,obj) {
    const map = new Map();
	const filtered = Object.keys(obj)
        .filter(key => propNames.includes(key))
        .map( key => (map.set([key],obj[key])))
    return Object.fromEntries(map);
}

function filterPropertiesN(propNames,obj) {
    const ret = [];
    Object.values(obj).filter(val => ret.push(filterProperties(propNames, val)));
    return ret;
}

 Array.prototype.zip = function(array, func) {
     const ret = [];
     Object.values(this).filter((valThis, idx) => {
        if (array[idx] !== undefined) {
            ret.push(func(valThis, array[idx]))
        }
     })
     return ret;
};


 