const { Box } = require('./Box');

// Monadic interface consists of "of" and chain(or flatMap or bind)
// F.of, chain

const join = m => m.chain(x => x);

const m = Box(Box(Box(4)))
const res1 = join(m.map(join));
const res2 = join(join(m));

console.log(res1, res2);