

// Create a new object without the excluded field


function filterObject(object, excludes) {
    const filteredObject = Object.keys(object).reduce((obj, key) => {
        if (!excludes.includes(key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});

    return filteredObject
}

module.exports = filterObject