const { stdout } = require("process");
min = 40000
max = 60000
function BTCPrice(min, max) {
    return (Math.random() * (max - min) + min).toFixed(3);
}
stdout.write(`${BTCPrice(min,max)}`)
