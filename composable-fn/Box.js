const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`,
});

const numToFloat = str => 
    Box(str)
    .map(s => s.replace(/\$/g, ''))
    .map(r => parseFloat(r));

const percentToFloat = str =>
    Box(str.replace(/\%/g, ''))
    .map(replaced => parseFloat(replaced))
    .map(num => num * 0.01);

const applyDiscount = (price, discount) => 
    numToFloat(price)
    .fold(cost => 
        percentToFloat(discount)
        .fold(savings => cost - cost * savings)
    );

const result = applyDiscount('$5.00', '20%');

console.log(result);