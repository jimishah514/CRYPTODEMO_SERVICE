const prompt = require("prompt-sync")({ sigint: true });
const { stdout } = require("process");
console.log("PROMPT FUCNTION")
const userSelection = prompt()

console.log("userSelection ",userSelection)
const price = prompt("Enter Price : ")
console.log("price ",price)
stdout.write('input',JSON.stringify({userSelection,price}))


