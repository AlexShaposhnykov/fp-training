const Task = require('data.task');
const Spotify = require('./spotify.js')
const { List } = require('immutable-ext');

const argv = new Task((rej, res) => res(process.argv));
const names = argv.map(args => args.slice(2));

const Intersection = xs => ({
    xs,
    concat: ({ xs: ys }) => 
        xs.filter(x => ys.some(y => x === y)),
});

console.log(process.argv);

const related = name =>
    Spotify.findArtist(name)
    .map(artist => artist.id)
    .chain(Spotify.relatedArtists)
    .map(artists => artists.map(artist => artist.name));

const artistIntersection = rels =>
    rels.foldMap(Intersection).xs;

const main = (names) =>
    List(names)
    .traverse(Task.of, related)
    .map(artistIntersection);

names.chain(main).fork(console.error, console.log);