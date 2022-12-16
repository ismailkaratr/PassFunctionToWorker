function topla(a, b) {return a + b};
function cikar(a, b) {return a - b};
const jsToBlob = new Blob([topla, cikar], {type: "application/javascript"});
const worker = new Worker('worker.js');
worker.postMessage(jsToBlob);
worker.onmessage = data => {
    console.log(data.data);
}