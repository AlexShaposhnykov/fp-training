const { List, Map } = require('immutable-ext');
const { Box } = require('./Box');

const fs = require('fs');
const Task = require('data.task');
const futurize = require('futurize').futurize(Task);

// const add = x => y => x + y;

// const liftA2 = (f, fx, fy) => fx.map(f).ap(fy);

// const res = liftA2(add, Box(4), Box(8));

// const merch = () =>
//     List.of(x => y => `${x}-${y}`)
//     .ap(List(['teeshirt', 'sweater']))
//     .ap(List(['large', 'medium', 'small']));

// const res = merch();

// const Db = ({
//     find: id => new Task((rej, res) => (
//         setTimeout(() => res({ id, title: `Project ${id}`}), 100)
//     )),
// });

// const reportHeader = (p1, p2) => `Report: ${p1.title} compared to ${p2.title}`;

// const res = Task.of(p1 => p2 => reportHeader(p1, p2))
//     .ap(Db.find(20))
//     .ap(Db.find(8))
//     .fork(console.error, console.log);

// const readFile = futurize(fs.readFile);

// const files = List(['Box.js', 'config1.json']);

// files.traverse(Task.of, fn => readFile(fn, 'utf-8'))
//     .fork(console.error, console.log);

const httpGet = (path, params) => (
    Task.of(`${path}: result`)
);

Map({ home: ['/', '/kek'], about: ['/about-us', '/sdngsdl'], blog: ['/blog', '/bruh'] })
    .traverse(Task.of, routes => 
        List(routes).traverse(Task.of, route => httpGet(route, {}))
    )
    .fork(console.error, console.log);

// console.log(res);
