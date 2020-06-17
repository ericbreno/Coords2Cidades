const states = require('./states.json');
const cities = require('./cities-min.json');

const statesMap = states.reduce((map, state) => {
    map[state.cod] = state;
    return map;
}, {});

/**
 * Returns an array with the closer city to given point. If more than one city has the same distance from the point, they are included.
 * 
 * @param {number} latitude
 * @param {number} longitude 
 * @returns An array containing pairs of cities and states
 */
const guess = (latitude, longitude) => {
    const { closer } = cities.reduce((calculated, city) => {
        const [name, lat, lng, cod_uf] = city;
        const distance = Math.abs(lat - latitude) + Math.abs(lng - longitude);

        if (distance < calculated.distance) {
            return { distance, closer: [{ name, lat, lng, cod_uf }] };
        } else if (distance === calculated.distance) {
            calculated.closer.push({ name, lat, lng, cod_uf });
        }

        return calculated;
    }, { distance: Number.MAX_SAFE_INTEGER, closer: [] });

    return closer.map((city) => {
        const { name, lat, lng, cod_uf } = city;
        const state = statesMap[cod_uf];
        return {
            city: { name, latitude: lat, longitude: lng },
            state: { name: state.n, latitude: state.lat, longitude: state.lng, uf: state.uf }
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
const guessOne = (latitude, longitude) => {
    const [first] = [...guess(latitude, longitude)];
    return first;
};

module.exports.guess = guess;
module.exports.guessOne = guessOne;
