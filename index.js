const states = require('./states.json');
const cities = require('./cities.json');

const statesMap = states.reduce((map, state) => {
    map[state[4]] = state;
    return map;
}, {});

/**
 * Returns an array with the closer city to given point. If more than one city has the same distance from the point, they are included.
 * 
 * @param {number} latitude
 * @param {number} longitude 
 * @returns An array containing pairs of cities and states
 */
const find = (latitude, longitude) => {
    const { closer } = cities.reduce((calculated, city) => {
        const distance = Math.abs(city[1] - latitude) + Math.abs(city[2] - longitude);

        if (distance < calculated.distance) {
            return { distance, closer: [city] };
        } else if (distance === calculated.distance) {
            calculated.closer.push(city);
        }

        return calculated;
    }, { distance: Number.MAX_SAFE_INTEGER, closer: [] });

    return closer.map((city) => {
        const [name, latitude, longitude, cod] = city;
        const state = statesMap[cod];
        return {
            city: { name, latitude, longitude },
            state: { name: state[0], uf: state[1], latitude: state[2], longitude: state[3] }
        };
    });
};

/**
 * Returns the closer city to the point. If more than one city has the same distance from the point, one is picked and returned.
 * 
 * @param {*} latitude 
 * @param {*} longitude 
 * @returns An object containing city and state
 */
const findOne = (latitude, longitude) => {
    const [first] = [...find(latitude, longitude)];
    return first;
};

module.exports.find = find;
module.exports.findOne = findOne;
