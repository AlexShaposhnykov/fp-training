// Data always must be last parameter
const add = x => (y => x + y);

const inc = add(1);

const modulo = (dvr) => (dvd) => dvd % dvr;

const isOdd = modulo(2);

const filter = pred => xs => xs.filter(pred);

const map = f => xs => xs.map(f);

const getAllOdds = filter(isOdd);

const replace = regex => repl => str =>
    str.replace(regex, repl);

const cencor = replace(/[aeiou]/g)('*');

const cencorAll = map(cencor);

const res = cencorAll(['hello', 'world']);

console.log(res);
