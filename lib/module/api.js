
var request = require("sdk/request").Request;

exports.getNewUser = getNewUser;

function getNewUser(storage){
    var newUser = request({
        url: "http://localhost:3000/User/getNew",
        onComplete: function (response) {
            if(response){
                storage.storage.ltUserId = response.json.userId;
            }
        }
    });

    newUser.get();
}

