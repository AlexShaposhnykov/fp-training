// Natural Transformations is a structural change
// F a -> G a

// nt - natural transformation
// nt(x).map(f) === nt(x.map(f))

const Either = require('./either');
const { Right, Left, fromNullable } = Either;
const { Box } = require('./Box');
const Task = require('data.task');

const first = xs =>
    fromNullable(xs[0]);

const res1 = first([1, 2, 3]).map(x => x + 1);
const res2 = first([1,2,3].map(x => x + 1));
console.log(res1, res2);

// const boxToEither = b => b.fold(Right);

// const res = boxToEither(Box(200));

// console.log(res);

// const eitherToTask = e => e.fold(Task.rejected, Task.of);

// eitherToTask(Right('nighttingale'))
//     .map(str => str + '2352352352352')
//     .fork(
//         e => console.error('err', e),
//         r => console.log('res', r)
//     );
