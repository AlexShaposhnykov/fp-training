const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x); 

// Semigroup is a type with a concat method

const Sum = x => ({
    x,
    concat: ({ x: y }) => Sum(x + y),
    inspect: () => `Sum(${x})`,
});
Sum.empty = () => Sum(0);

// const res = Sum(1).concat(Sum(2));

const All = x => ({
    x,
    concat: ({ x: y }) => All(x && y),
    inspect: () => `All(${x})`,
});
// True is a neutral element, we can promote All to monoid
All.empty = () => All(true);

// const res = All(true).concat(All(true));

const Any = x =>
({
    x,
    concat: ({ x: y }) => Any(x || y)
});
Any.empty = () => Any(false);

const Product = x =>
({
    x,
    concat: ({ x: y }) => Product(x * y)
});
Product.empty = () => Product(1);

const First = x => 
({
    x,
    concat: () => First(x),
    inspect: () => `First(${x})`,
});

// const res = First('blah').concat(First('test'));

const Fn = f =>
({
    fold: f,
    concat: o => Fn(x => f(x).concat(o.fold(x))),
})

const hasVowels = x => !!x.match(/[aeiou]/ig);
const longWord = x => x.length >= 5;

const both = Fn(compose(All, hasVowels)).concat(Fn(compose(All, longWord)));

const res = ['gym', 'bird', 'lilac'].filter(x => both.fold(x).x);

console.log(res);

// Semigroup does not have an element to return, so it is not a safe operation
// With monoids we can take as many elements as we want, even none, and it still will be
// a perfectly safe operation