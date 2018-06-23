self.onmessage = function(e){
    generate(e.data);
}

function generate(times) {
    let ctr = 0;

    const time1 = Date.now();

    for(let i = 0; i < times; i++){
        ctr++;
    }

    const time2 = Date.now();
    const dff = time2 - time1;


    self.postMessage({count: ctr, time: dff});
}