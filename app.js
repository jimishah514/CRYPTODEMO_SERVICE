const app = require('./bot');
//        ######################### MENU START ###############################
const manager = require('./eventmanager')
let refreshIntervalId;
manager.emitter.on('END', () => {
    clearInterval(refreshIntervalId);
    process.exit(0);
})
app.start(()=>
{
    refreshIntervalId = setInterval(() => {
    },500);
});
 //        ######################### MENU END ###############################