//TODO DOKU
(function($){
    var LOGIN_USER_INPUT       = 'user_input',
        LOGIN_BROWSER_SAVED    = 'browser_saved',
        LOGIN_PASSWORD_MANAGER = 'password_manager';

    var pageLoadTime = '',
        firstInputTime = false;

    /**
     *
     */
    function watchForLoginEvents(){
        var loginType = LOGIN_USER_INPUT;

        var pwInputField = $(':input[type=password]:not([type=hidden])');

        if(pwInputField.length > 0){

            pwInputField = pwInputField.first();
            var form = pwInputField.closest('form');

            //check if pw field is pre-field by browser -> login type is browser saved
            if(pwInputField.val()){
                if(!firstInputTime){
                    firstInputTime = getCurrentTimeInTimezone();
                }
                loginType = LOGIN_BROWSER_SAVED;
            }

            // if pw is paste into input field its probably pw saved by a PW-Manager
            $(pwInputField).on('paste',function(){
                if(!firstInputTime){
                    firstInputTime = getCurrentTimeInTimezone();
                }
                loginType = LOGIN_PASSWORD_MANAGER;
            });

            $(pwInputField).on('keypress',function(){
                if(!firstInputTime){
                    firstInputTime = getCurrentTimeInTimezone();
                }
                loginType = LOGIN_USER_INPUT;
            });

            if(form){
                form.on('submit',function(){
                    //check if at least pw field has a value
                    if(pwInputField.val()){
                        //send request

                        var pwScores = anonymousZxcvbn(pwInputField.val());
                        var url = window.location.href;

                        var loginData = {
                            "url": url,
                            "pageLoadTime": pageLoadTime,
                            "firstInputTime": firstInputTime,
                            "loginType": loginType,
                            "zxcvbn": pwScores
                        };
                        self.port.emit("apiRequest","newLogin",loginData);
                    }
                })
            }
        }
    }

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


