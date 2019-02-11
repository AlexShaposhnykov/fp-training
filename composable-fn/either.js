const Right = x => ({
    chain: f => f(x),
    map: f => Right(f(x)),
    inspect: () => `Right(${x})`,
    fold: (f, g) => g(x),
});

const Left = x => ({
    chain: f => Left(x),
    map: f => Left(x),
    inspect: () => `Left(${x})`,
    fold: (f, g) => f(x),
});

const fromNullable = x => 
    x != null ? Right(x) : Left(null);

const tryCatch = f => {
    try {
        return Right(f());
    } catch (e) {
        return Left(e);
    }
};


// const findColor = name =>
//     fromNullable({red: '#ff4444', blue: 'blue', yellow: 'yellow'}[name]);

// const result = findColor('blue')
//     .map(c => c.slice(1))
//     .fold(e => 'no color found', e => e.toUpperCase());

const fs = require('fs');

const getPort = () => 
    tryCatch(() => fs.readFileSync('either-config.json'))
    .chain(c => tryCatch(() => JSON.parse(c)))
    .fold(e => 3000, c => c.port);


const result = getPort();

console.log(result);