Worker.prototype.postMessage = (function ( _postMessage ){
    return function ( data ){
        if (data.constructor === Blob) {
            console.log( "WINDOW: gonderme istegi yakalandi", arguments )

            data.text().then(( js ) => {
                fonksiyonlar = js.match(/([a-zA-Z_{1}][a-zA-Z0-9_]+)(?=\()/g);
                console.log( "WINDOW: fonksiyonlar bulundu", fonksiyonlar )
                fonksiyonlar.forEach(fonksiyon => {
                    console.log( "WINDOW: yeninden tanimlama", "->", fonksiyon );
                    self[fonksiyon] = ((_fonskiyon) => {
                        return ( ...args ) => {
                            console.log( "WINDOW: islem tetiklendi: ", _fonskiyon.name )
                            this.postMessage({
                                func: _fonskiyon.name,
                                args: Array.from( args ) 
                            })
                            return 1; //fonskyion cevabi hep 1 olur. async olmasi sart ki olmasin
                        }
                    })(self[fonksiyon])
                });
            })
        }
        return _postMessage.apply( this, arguments )
    }
})(Worker.prototype.postMessage)

function topla(a, b) {return a + b};
function cikar(a, b) {return a - b};

const jsToBlob = new Blob([topla, cikar], {type: "application/javascript"});
const worker = new Worker('worker.js');

worker.onmessage = ({data}) => {
    console.warn( "WINDOW: cevap geldi:", data );
}
worker.postMessage(jsToBlob);

// islem istegi ana pencereden yapiliyor
// ama istegi yakalayip workera gonderiyor
setInterval(function (){

    console.log("\n")
    topla(4, Math.random() * 100)

}, 2500)
