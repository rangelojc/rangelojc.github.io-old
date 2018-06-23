self.onmessage = function(e){
    run(e.data);
}

function run(wrkr) {
    // wrkr = JSON.parse(wrkr);
    const params = wrkr.param;
    const method = eval("(" + wrkr.method + ")");

    const returned = method(params);

    self.postMessage(returned);
}