//TODO DOKU
(function($){
    var LOGIN_USER_INPUT       = 'user_input',
        LOGIN_BROWSER_SAVED    = 'browser_saved',
        LOGIN_PASSWORD_MANAGER = 'password_manager';

    var pageLoadTime = '',
        firstInputTime = '';

    /**
     *
     */
    function watchForLoginEvents(){
        var loginType = LOGIN_USER_INPUT,
            pwFocus = false,
            pwPaste = false,
            pwType  = false;

        var pwInputField = $(':input[type=password]:not([type=hidden])');

        if(pwInputField.length > 0){

            // TODO get other input fields based on pw-fields parent form to avoid getting other "unrelevant"
            // input fields like search fields etc.

            pwInputField = pwInputField.first();
            var form = pwInputField.closest('form');

            //check if pw field is pre-field by browser -> login type is browser saved
            if(pwInputField.val()){
                loginType = LOGIN_BROWSER_SAVED;
            }

            // if pw is paste into input field its probably pw saved by a PW-Manager
            $(pwInputField).on('paste',function(){
                loginType = LOGIN_PASSWORD_MANAGER;
            });

            $(pwInputField).on('keypress',function(){
                loginType = LOGIN_USER_INPUT;
            });

            //var userNameField = $(pwInputField).closest(':input[type=text]:not(:hidden)');

            if(form){
                form.on('submit',function(){
                    //check if at least pw field has a value
                    if(pwInputField.val()){
                        //send request

                        var pwScore = zxcvbn(pwInputField.val()).score;
                        var url = window.location.href;

                        var loginData = {
                            "url": url,
                            "pageLoadTime": pageLoadTime,
                            "firstInputTime": firstInputTime,
                            "loginType": loginType,
                            "zxcvbnScore": pwScore
                        };
                        self.port.emit("apiRequest","newLogin",loginData);
                    }
                    console.log('form submitted');
                })
            }
        }

        window.onbeforeunload = function (e) {
            console.log(e);
            console.log(window.event);
            if ((window.event.clientY < 0)) {
                //window.localStorage.clear();
                //alert("Y coords: " + window.event.clientY)
            }
        };
    }

    /*function setTime(timeVariable){
        console.log(this[timeVariable]);
        if(typeof this[timeVariable] == 'undefined' ){
            console.log('set new time');
            this[timeVariable] = getCurrentTimeInTimezone();
        }
    }*/

    /**
     *
     * @returns current date in milliseconds
     */
    function getCurrentTimeInTimezone(){
        var d = new Date();

        // convert to msec
        // subtract local time zone offset
        // get UTC time in msec
        return (d.getTime() - (d.getTimezoneOffset() * 60000));
    }

    function init(){
        pageLoadTime = getCurrentTimeInTimezone();

        watchForLoginEvents();
    }

    init();
})(jQuery);


