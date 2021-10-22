const childProcess = require('child_process')

exports.prompt = ()=> {
    console.log("**** PROMPT ****")
    childProcess.exec("node userInput.js",(err,stdout,stderr) =>{
        console.log("CHID EXEC ----")
        manager.emitter.emit("prompt",stdout)
    })
}
    

