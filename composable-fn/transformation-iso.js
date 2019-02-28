const { Box } = require('./Box');
const Task = require('data.task');
const Either = require('./either');
const { Right, Left, fromNullable } = Either;
const { List, Map } = require('immutable-ext');

// from(to(x)) === x
// to(from(y)) === y

// String is isomorphic to an array of characters[Char]
// and these 2 data types should hold the same information
// and be able to convert there and back without losing anything
// String ~ [Char];

const Iso = (to, from) => ({
    to,
    from,
});

const chars = Iso(s => s.split(''), c => c.join(''));

const truncate = str => (
    chars.from(chars.to(str).slice(0, 3)).concat('...')
);

// const res = truncate('hello world');

// [a] ~ Either null a
const singleton = Iso(e =>
    e.fold(() => [], x => [x]),
    ([x]) => x ? Right(x) : Left()
);

const filterEither = (e, pred) => (
    singleton.from(singleton.to(e).filter(pred))
);

const res = filterEither(Right('Hello'), x => x.match(/h/ig))
    .map(x => x.toUpperCase());


console.log(res);
