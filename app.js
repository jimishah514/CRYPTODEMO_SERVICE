const prompt = require("prompt-sync")({ sigint: true });
const https = require('https')
const axios = require('axios')
const utility = require('util')
const process = require('./process')
const manager = require('./eventManager')
process.child()
BTCUSD = 0
manager.emitter.on('BTCPrice', (BTCPrice) => {
    BTCUSD = BTCPrice
})

user1 = "admin"
user2 = "user"
adminBalance = 100
userbalance = 10000000
steric = ""
//        ######################### MENU START ###############################
while (1) {
    console.log(`Admin Balance: ${adminBalance}BTC             User Balance: $${userbalance}`)
    for (let i = 0; i < 100; i++) steric += "*"
    console.log(steric)
    console.log(`Press option 1 for buying (buyer),    Press option 2 for selling (admin)     BTC/USD:$${BTCUSD}`);
    const option = prompt();
    console.log(`You have selected option ${option}`);
    steric = ""
}
 //        ######################### MENU END ###############################


// ############ CALLING Binance API ################ using node https module
// http = utility.promisify(https.get)
// http('https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md#current-averageprice')
// .then((res)=> {
//     console.log("Res : ",res)
// })
// .catch((e) => {
//     console.log("Err",e)
// })

// ############ CALLING Binance API ################ using axios

// axios({
//     method: 'get',
//     url: 'https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md#current-averageprice',
//     responseType: 'stream'
//   })
//     .then(function (response) {
//      console.log("response: ",response)
//     });

// axios.get('https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md#current-averageprice').then(res => console.log("res : ",res))

