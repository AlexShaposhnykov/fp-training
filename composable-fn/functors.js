const { Box } = require('./Box');
const Task = require('data.task');
const { Right, Left, fromNullable } = require('./either');
const { List, Map } = require('immutable-ext');

// Functor is a type with a map method
// It must obey some laws to act correctly and be an actual functor

// Law that preserves function composition
// fx.map(f).map(g) === fx.map(x => g(f(x)))

// const res1 = Left('squirrels')
//     .map(s => s.substring(5))
//     .map(s => s.toUpperCase());

// const res2 = Left('squirrels')
//     .map(s => s.substring(5).toUpperCase())

// console.log('Composition law', res1, res2);

// Law of identity
//fx.map(id) === id(fx)
const id = x => x;

const res1 = List.of('crayons').map(id);
const res2 = id(List.of('crayons'));

console.log(res1, res2);