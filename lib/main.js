
/**
 */

(function () { // Begin (anonymous) namespace / scope

    var apiMainUrl = 'http://localhost:3000',
        getUserUrl = 'User/getNew';

    function init(){
        var data = require("sdk/self").data;

        var tag = 'input';

        var pageMod = require("sdk/page-mod"),
            ss = require("sdk/simple-storage"),
            request = require("sdk/request").Request,
            api = require("../lib/module/api.js");

        //delete ss.storage.ltUserId;

        //check if user is already "registered"
        if(!ss.storage.ltUserId){
            console.log('api get new user');
            api.getNewUser(ss);
        }

        pageMod.PageMod({
            include: "*",
            contentScriptWhen: 'end',
            contentScriptFile: [data.url("../bower_components/jquery-1.12.4.min/index.js"), data.url("../lib/module/watcher.js")]
            /*onAttach: function(worker) {
                worker.port.emit("getElements", tag);
                worker.port.on("gotElement", function(elementContent) {
                });
            }*/
        });
    }

    init();
})();