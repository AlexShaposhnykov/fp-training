const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

console.log(canvas);

// Global State
let state = initialState();

const x = c => Math.round(c * canvas.width / state.cols);
const y = r => Math.round(r * canvas.height / state.rows);

const draw = () => {
    //Clear screen
    ctx.fillStyle = "#232323";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = 'rgb(0, 200, 50)';
    state.snake.forEach(p => ctx.fillRect(x(p.x), y(p.y), x(1), y(1)));

    // Draw apples
    ctx.fillStyle = 'red';
    ctx.fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1));

    // Add end game
    if (state.snake.length === 0) {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

const step = t1 => t2 => {
    if (t2 - t1 > 100) {
        state = next(state);
        draw();
        window.requestAnimationFrame(step(t2));
    } else {
        window.requestAnimationFrame(step(t1))
    }
};

// Navigation handling
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'w': state = enqueue(state, NORTH); break;
        case 'a': state = enqueue(state, WEST); break;
        case 's': state = enqueue(state, SOUTH); break;
        case 'd': state = enqueue(state, EAST); break;
    }
});

// Init game
draw(); window.requestAnimationFrame(step(0));
