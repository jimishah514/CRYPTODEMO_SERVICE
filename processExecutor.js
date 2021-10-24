const {fork} = require('child_process')
const manager = require('./eventmanager')
let data;
exports.execute = (fileName, key, repo={})=> {
    const child = fork(fileName,[JSON.stringify(repo)]);
    child.on("close", function (code) {
    });
         
    child.on("message", function (msg) {
        data = JSON.parse(msg);
        manager.emitter.emit(key,data)
    });
    return child;
}

