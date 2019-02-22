const Task = require('data.task');
const fs = require('fs');

const launchMissiles = () =>
    new Task((rej, res) => {
        console.log('launch missiles')
        res('missile');
    });


// Task.rejected(3)
//     .map(x => x + 1)
//     .chain(x => Task.of(x + 1))
//     .fork(
//         e => console.log('err', e),
//         x => console.log('success', x)
//     );
// launchMissiles()
//     .map(x => x + '!')
//     .fork(
//         e => console.log('err', e),
//         x => console.log('success', x)
//     );

// const app = launchMissiles().map(x => x + '!');

// app.map(x => x + '!')
//     .fork(
//         e => console.log('err', e),
//         x => console.log('success', x)
//     );

/**
|--------------------------------------------------
| IMPERATIVE
|--------------------------------------------------
*/
// const app = () =>
//     fs.readFile('config.json', 'utf-8', (err, contents) => {
//         if (err) {
//             throw err;
//         }

//         const newContents = contents.replace(/8/g, '6');

//         fs.writeFile('config1.json', newContents, (err, _) => {
//             if (err) {
//                 throw err;
//             }
//             console.log('success!');
//         });
//     });

/**
|--------------------------------------------------
| Declarative with Task
|--------------------------------------------------
*/
const readFile = (filename, enc) =>
    new Task((rej, res) => (
        fs.readFile(filename, enc, (err, contents) => (
            err ? rej(err) : res(contents)
        ))
    ));
const writeFile = (filename, contents) =>
    new Task((rej, res) => (
        fs.writeFile(filename, contents, (err, contents) => (
            err ? rej(err) : res(contents)
        ))
    ));

const app = readFile('either-config.json', 'utf-8')
    .map(contents => contents.replace(/8/g, '6'))
    .chain(contents => writeFile('config1.json', contents));

app.fork(
    e => console.log(e),
    x => console.log('success', x)
);