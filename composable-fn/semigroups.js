const Sum = x => ({
    x,
    concat: ({ x: y }) => Sum(x + y),
    inspect: () => `Sum(${x})`,
});

// const res = Sum(1).concat(Sum(2));

const All = x => ({
    x,
    concat: ({ x: y }) => All(x && y),
    inspect: () => `All(${x})`,
});

// const res = All(true).concat(All(true));


const First = x => ({
    x,
    concat: () => First(x),
    inspect: () => `First(${x})`,
});

const res = First('blah').concat(First('test'));

console.log(res);