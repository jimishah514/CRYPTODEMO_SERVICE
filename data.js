const axios = require('axios');
let url ='https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT';

setInterval(()=> {
    axios.get(url).then(resp => {
        let BTCPrice = resp.data.price;
        process.send(JSON.stringify({BTCPrice}))
    });
},5000)