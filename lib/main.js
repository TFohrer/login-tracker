
/**
 */

(function () { // Begin (anonymous) namespace / scope
    var REQUEST_TYPE_POST_LOGIN = "newLogin";
    var api = '',
        ss  = '';

    function doRequest(requestType,data){

        switch (requestType){
            case REQUEST_TYPE_POST_LOGIN:
                data.userID = ss.storage.ltUserId;
                api.createLogin(data);
                break;
        }
    }

    function init(){
        var data    = require("sdk/self").data,
            pageMod = require("sdk/page-mod"),
            request = require("sdk/request").Request;
            ss      = require("sdk/simple-storage");
            api     = require("../lib/module/api.js");

        //check if user is already "registered"
        if(!ss.storage.ltUserId){
            api.getNewUser(ss);
        }

        pageMod.PageMod({
            include: "*",
            contentScriptWhen: 'end',
            contentScriptFile: [data.url("../bower_components/jquery-1.12.4.min/index.js"),data.url("../bower_components/zxcvbn/dist/zxcvbn.js"),data.url("../lib/vendor/anonymousZxcvbn.js"), data.url("../lib/module/watcher.js")],
            onAttach: function(worker) {

                //process server requests coming from watcher.js
                worker.port.on("apiRequest", function(requestType,reqData) {
                    doRequest(requestType,reqData);
                });
            }
        });
    }

    init();
})();