// Natural Transformations is a structural change
// F a -> G a

// nt - natural transformation
// nt(x).map(f) === nt(x.map(f))

const Either = require('./either');
const { Right, Left, fromNullable } = Either;
const { Box } = require('./Box');
const Task = require('data.task');
const { List } = require('immutable-ext');

// const res1 = first([1, 2, 3]).map(x => x + 1);
// const res2 = first([1,2,3].map(x => x + 1));
// console.log(res1, res2);

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

// const res = List(['hello', 'world']).chain(x => x.split('')/* List(x.split('')) */);

/**
|--------------------------------------------------
| 
|--------------------------------------------------
*/
// const first = xs => fromNullable(xs[0]);

// const largeNumbers = xs => xs.filter(x => x > 100);

// const larger = x => x * 2;

// const app = xs => first(largeNumbers(xs)).map(larger);

// console.log(app([2, 300, 5000, 5, 2]));
/**
|--------------------------------------------------
| 
|--------------------------------------------------
*/
const fake = id => ({ id, name: 'user1', best_friend_id: id + 1 });

const Db = ({
    find: id => new Task((rej, res) => 
        res(id > 2 ? Right(fake(id)) : Left('not found'))
    ),
});

const eitherToTask = e => e.fold(Task.rejected, Task.of);

const res = Db.find(3)
    .chain(eitherToTask)
    .chain(user => Db.find(user.best_friend_id))
    .chain(eitherToTask)
    .fork(e => console.error(e), r => console.log(r));
