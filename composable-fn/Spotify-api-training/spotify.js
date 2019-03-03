const apiPrefix = 'https://api.spotify.com/v1';
"${apiPrefix}/search?q=${query}&type=artist" // artists: {items: []}
"${apiPrefix}/artists/${id}/related-artists" // artists: {items: []}

const request = require('request')
const Task = require('data.task');
const Either = require('data.either');

const httpGet = url => (
    new Task((rej, res) => (
        request(url, (error, response, body) => (
            error ? rej(err) : res(body))
        )
    ))
);

const trace = (data) => (message) => {
    console.log(`${message}, ${data}`);

    return data;
};

const parse = Either.try(JSON.parse);

// getJSON :: String -> Task e data
const getJSON = url =>
    httpGet(url)
    .map(parse)
    .chain(eitherToTask);

const first = xs => Either.fromNullable(xs[0]);

const eitherToTask = e => e.fold(Task.rejected, Task.of);

const findArtist = name => 
    getJSON(`${apiPrefix}/search?q=${name}&type=artist`)
    .map(result => result.artists.items)
    .map(first)
    .chain(eitherToTask);

const relatedArtists = id => 
    getJSON(`${apiPrefix}/artists/${id}/related-artists`)
    .map(result => result.artists);

module.exports = { findArtist, relatedArtists };
