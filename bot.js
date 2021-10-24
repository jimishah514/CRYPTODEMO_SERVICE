const manager = require('./eventmanager')
const processExecuter = require('./processExecutor')
const {repo} = require('./repository');
let userProcess = null;
manager.emitter.on('BTCPrice', (data) => {
    if (repo.BTCUSD == -1) {
        repo.BTCUSD = data.BTCPrice;
        userProcess = processExecuter.execute("userInput.js","prompt",repo);
    }
    else
    {
        repo.BTCUSD = data.BTCPrice;
        userProcess.send(repo.BTCUSD)
    }
})
manager.emitter.on("prompt",(promptObj) => {
    if (promptObj.option == -1 && promptObj.price == -1)
    {
        process.exit(0);
        return;
    }
    placeOrder(promptObj)
    userProcess = processExecuter.execute("userInput.js","prompt",repo)
})
function placeOrder(promptObj)
{
    const type = parseInt(promptObj.option,10);
    const price =  parseFloat(promptObj.price,10);
    if (isNaN(type) || isNaN(price) || !(type == 1 || type == 2) || price <= 0)
        return;
    let order = prepareOrder(type,price);
    if(adjustBalances(order))
        repo.orders.push(order);
}
function prepareOrder(type,price)
{
    let order = {
        "type":type == 1 ? "Buy": "Sell",
        "no":repo.orderNo++,
        "price":price,
        "btc": repo.BTCUSD,
        "orderNoMatched":-1,
        "isExecuted": false
    }
    return order;
}
function getTotalSellAmountPlaced()
{
    let placed = repo.orders.filter(x=>x.type == "Sell" && !x.isExecuted).map(x=>x.price/x.btc)
    return (placed.length > 0) ? placed.reduce((x,y)=>x+y):placed;
}
function getTotalBuyAmountPlaced()
{
    let placed = repo.orders.filter(x=>x.type == "Buy" && !x.isExecuted).map(x=>x.price);
    return (placed.length > 0) ? placed.reduce((x,y)=>x+y):0;
}
function executeOrder(minOrders, type, order) {
    if (minOrders.length > 0)
    {
        let minOrder = minOrders[0];
        if (minOrder) {
            repo.orders[minOrder.no - 1].isExecuted = true;
            order.orderNoMatched = minOrder.no;
            order.isExecuted = true;
         }
    }
    return order;
}
function sortByMinDifference(order)
{
    return repo.orders
    .filter(x => !x.isExecuted)
    .map(x=> {
        return {"difference": x.price - order.price,"no":x.no, "type":x.type}
    }).sort((x,y)=> y.difference - x.difference)
    .filter(x=>order.type == "Buy" ? x.difference <=0 && x.type == "Sell": x.difference >=0 && x.type == "Buy")
}
function adjustBalances(order)
{
    let minOrders = sortByMinDifference(order)
    if (order.type == "Buy") {
        const totalBuyAmount = getTotalBuyAmountPlaced();
        order = executeOrder(minOrders,"Sell", order.price);
        if (order.isExecuted){
            repo.adminBalance += (order.price/order.btc);
            repo.userbalance -= order.price;
        }
    }
    else if(order.type == "Sell") {
        const totalSellAmount = getTotalSellAmountPlaced();
        order = executeOrder(minOrders,"Buy", order);
        if (order.isExecuted){
            repo.adminBalance -= (order.price/order.btc);
            repo.userbalance += order.price;
        }
    }
    return true;
}

module.exports.start = ()=>processExecuter.execute("data.js","BTCPrice");