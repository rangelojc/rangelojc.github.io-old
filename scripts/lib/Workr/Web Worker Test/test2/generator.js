function start() {
    setInterval(function () {
        generate();
    }, 500);
}

function generate() {
    const value = Math.floor(Math.random() * 30) + 1;
    postMessage(value);
}

start();