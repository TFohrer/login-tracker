//TODO DOKU
(function($){
    var LOGIN_USER_INPUT       = 'user_input',
        LOGIN_BROWSER_SAVED    = 'browser_saved',
        LOGIN_PASSWORD_MANAGER = 'password_manager';

    /**
     *
     */
    function watchForLoginEvents(){
        var loginType = LOGIN_USER_INPUT,
            pwFocus = false,
            pwPaste = false,
            pwType  = false;


        var inputs = $(':input[type=text]:not(:hidden),:input[type=password]:not([type=hidden])');

        $(inputs).each(function(index,value){
            console.log(value);
             console.log('Input id : ' + value.id);
             console.log('Input name : ' + value.name);
             console.log('Input value : ' + value.value);
        });

        var pwInputField = $(':input[type=password]:not([type=hidden])').get(0);

        //check if pw field is pre-field by browser -> login type is browser saved
        if(pwInputField){
            if(pwInputField.val()){
                console.log('pw field is not empty');

                loginType = LOGIN_BROWSER_SAVED;
            }
        }

        $(inputs).on('click',function(){
            console.log('click');
        });

        $(inputs).on('paste',function(){
            console.log('paste');
        });

        $(inputs).on('focus',function(){
            console.log('focus');
            var type = $(this).attr('type');

            console.log(type);
        });


        /*$(window).bind('beforeunload', function(){
            return 'my text';
        });*/

        window.onbeforeunload = function (e) {
            console.log(e);
            console.log(window.event);
            if ((window.event.clientY < 0)) {
                //window.localStorage.clear();
                //alert("Y coords: " + window.event.clientY)
            }
        };

    }

    function init(){

        watchForLoginEvents();
    }

    init();
})(jQuery);


