self.onmessage = blob => {
    var url = URL.createObjectURL(blob.data);
    self.importScripts(url);
    console.log("Topla:",topla(1,2));
    console.log("Çıkar:",cikar(4,2))
};