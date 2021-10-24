const axios = require('axios');
const readline = require('readline');
let url ='https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT';

let closeInterval = setInterval(()=> {
    axios.get(url).then(resp => {
        let BTCPrice = resp.data.price;
        process.send(JSON.stringify({BTCPrice}))
    });
},5000)