const {fork} = require('child_process')
const manager = require('./eventmanager')
let data;
exports.execute = (fileName, key)=> {
    const child = fork(fileName);
    child.on("close", function (code) {
    });
         
    child.on("message", function (msg) {
        data = JSON.parse(msg);
        manager.emitter.emit(key,data)
    });
}

