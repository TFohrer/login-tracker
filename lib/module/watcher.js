//TODO DOKU
(function($){

    function init(){
        console.log('init watcher js ');

        self.port.on("getElements", function(tag) {

            //var elements = document.getElementsByTagName(tag);

            var inputs = $(':input[type=text]:not(:hidden),:input[type=password]:not([type=hidden])');

            $(inputs).each(function(index,value){
                console.log(value);
                console.log('Input id : ' + value.id);
                console.log('Input name : ' + value.name);
                console.log('Input value : ' + value.value);
            });

            $(inputs).on('click',function(){
                console.log('click');
            });

            $(inputs).on('paste',function(){
                console.log('paste');
            });

            $(inputs).on('focus',function(){
                console.log('focus');
            });


            /*for (var i = 0; i < elements.length; i++) {
                self.port.emit("gotElement", elements[i]);
            }*/
        });
    }

    init();
})(jQuery);


