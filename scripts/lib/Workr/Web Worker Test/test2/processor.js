onmessage = function (r) { captureData(r); }

function captureData(response) {
    const total = response.data.total;
    const value = response.data.value;
    const operation = response.data.operation;

    let result = total + value;

    postMessage(result);
}