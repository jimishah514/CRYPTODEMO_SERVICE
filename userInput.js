let schemaOption = {
    properties: {
      option: {
        description:"enter option:"
        //pattern: /^[a-zA-Z\s\-]+$/,
       // message: 'Name must be only letters, spaces, or dashes',
        //required: true
      }
    }
};
let schemaPrice = {
    properties: {
      price: {
        description:"enter price"
        //hidden: true
      }
    }
};
const utility = require('util');
const prompt = require('prompt');
let repo = {};
promptPromise = utility.promisify(prompt.get);

showMenu();
process.on("message",(btc) => {
    updateBtcPrice(btc);
})
function showMenu()
{
    repo = JSON.parse(process.argv[2])
    let steric="";
    for (let i = 0; i < 100; i++) steric += "*"
        console.clear()
        console.log(`Admin Balance: ${repo.adminBalance}BTC             User Balance: $${repo.userbalance}`)
        console.log(steric)
        console.log(`Press option 1 for buying (buyer),    Press option 2 for selling (admin)     BTC/USD:$${repo.BTCUSD}`)
        repo.orders.forEach(x => {
            if (x.orderNoMatched > 0)
                console.log(`${x.no}.Enter ${x.type} price$ ${x.price}.\t${x.type} order placed for ${x.price/x.btc} btc at $${x.btc} (order matched with
                order ${x.orderNoMatched}, order executed, balance updated)`);
            else
                console.log(`${x.no}.Enter ${x.type} price$ ${x.price}.\t${x.type} order placed for ${x.price/x.btc} btc at $${x.btc}`);
        });
        console.log(steric)
        steric = ""
        getInput();
}
function updateBtcPrice(btcPrice)
{
    process.stdout.cursorTo(0,2);
    process.stdout.clearLine();
    process.stdout.write(`Press option 1 for buying (buyer),    Press option 2 for selling (admin)     BTC/USD:$${btcPrice}`);
    process.stdout.cursorTo(24,4+optionTaken+repo.orders.length);
}
let optionTaken=0;
function getInput()
{
    promptPromise(schemaOption)
    .then(optionData => {
        optionTaken=1;
        promptPromise(schemaPrice)
        .then(priceData => {
            process.send(JSON.stringify({"option":optionData.option,"price":priceData.price}));
        })
    });
}