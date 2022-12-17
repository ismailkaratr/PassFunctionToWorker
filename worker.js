self.onmessage = ({data}) => {


    if (data.constructor === Blob) {
        data.text().then((text) =>
            console.log("\nWORKER: tanimlama:", text)
        )


        var url = URL.createObjectURL(data);
        self.importScripts(url);
    }

    else {
        console.error("WORKER: istek geldi:", data)


        postMessage({
            func: data.func,
            data: self[data.func].apply( self, data.args )
        })
    }

};
