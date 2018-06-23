onmessage = function (r) { captureValue(r); }

function captureValue(response) {
    const value = response.data;
    const total = 1000;

    const ratio = (value/1000);
    const width = (600*ratio);

    postMessage(width);
}