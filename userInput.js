const prompt = require('prompt');
prompt.get(['option', 'price'], function (err, result) {
    if (err) { 
        clearInterval(closeInterval)
        return;
     }
    process.send(JSON.stringify(result))
    clearInterval(closeInterval)
});
let closeInterval = setInterval(()=> {
},1000)