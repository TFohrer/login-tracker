
var request   = require("sdk/request").Request,
    serverUrl = "http://localhost:3000";

exports.getNewUser  = getNewUser;
exports.createLogin = createLogin;


/**
 * get new user from db and save it to local storage
 * @param storage
 */
function getNewUser(storage){
    var newUser = request({
        url: serverUrl+"/user/getNew",
        onComplete: function (response) {
            if(response){
                storage.storage.ltUserId = response.json.userId;
            }
        }
    });

    newUser.get();
}

function createLogin(data){
    var login = request({
        url: serverUrl+"/logins",
        content: {data: data}
    });

    login.post();
}
