const childProcess = require('child_process')
const manager = require('./eventManager')
exports.child = () => {
    setInterval(() => {
        childProcess.exec("node data.js", (err, stdout, stderr) => {
            manager.emitter.emit('BTCPrice',stdout)
            
        })
    }, 5000)
}

// function child()
// {
//     // setInterval(() => {
//     //     console.log("SetInterval")
//     //     childProcess.exec("node data.js", (err, stdout, stderr) => {
//     //         console.log("stdout ", stdout)
//     //     })

//     // }, 5000)
//     setInterval(function () {
//         console.log("Every 5 secondes"); 
//     }, 5000); 
// }

// module.exports.child = child;

