
/**
 */

var EXPORTED_SYMBOLS = [ "LNTracker" ];


(function () { // Begin (anonymous) namespace / scope


    function init(){
        var data = require("sdk/self").data;

        /*var pageMod = require("sdk/page-mod");

        pageMod.PageMod({
            include: "*",
            contentScriptWhen: 'start',
            contentScriptFile: data.url("module/watcher.js")
        });*/

        var tag = 'input';

        var pageMod = require("sdk/page-mod");

        pageMod.PageMod({
            include: "*",
            contentScriptWhen: 'end',
            contentScriptFile: [data.url("../lib/jquery-1.12.4.min.js"), data.url("../lib/module/watcher.js")],
            onAttach: function(worker) {

                worker.port.emit("getElements", tag);
                worker.port.on("gotElement", function(elementContent) {
                    alert('test');
                });
            }
        });

        console.log('init');
    }


    init();
})();