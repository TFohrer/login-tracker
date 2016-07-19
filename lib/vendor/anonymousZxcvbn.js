/**
 * Created by TbsStz on 19.07.2016.
 */
//var zxcvbn = require('zxcvbn');

var lowercaseRegex = /[a-z]/g;
var uppercaseRegex = /[A-Z]/g;
var digitsRegex = /[0-9]/g;
var specialCharsRegex = /[@'#\.\$;%\^&\+=!"\(\)\*,-\/:<>\?§]/g;

/**
 * this is a wrapper around the zxcvbn password strength estimate function.
 * Its purpose is to strip all plain text passwords and tokens thereof, allowing
 * more ethically acceptable logging of password strength statistics.
 * @param password the password to check
 * @param user_info additional words to put into the matching routine
 * @returns {*}
 */
var anonymousZxcvbn = function(password, user_info){

    var estimate = zxcvbn(password, user_info);
    var anonymous_sequence = [];
    var uppercaseMatches = password.match(uppercaseRegex);
    var lowercaseMatches = password.match(lowercaseRegex);
    var digits = password.match(digitsRegex);
    var specialChars = password.match(specialCharsRegex);

    // we don't want to save the password in plain text.
    delete estimate.password;
    delete estimate.feedback; // we don't need it.

    if(estimate.sequence){
        estimate.sequence.forEach(function(matchObj){
            // only care about the length of the chunk
            matchObj.chunkLength = matchObj.j - matchObj.i + 1;

            // i and j would reveal the start and end of the chunk.
            delete matchObj.i;
            delete matchObj.j;

            // delete chunks and sensitive info about them.
            // some of the properties are only there for legacy reasons
            delete matchObj.token;
            delete matchObj.base_token;
            delete matchObj.base_guesses;
            delete matchObj.base_matches;
            delete matchObj.rank;
            delete matchObj.matched_word;
            delete matchObj.sub_display;
            delete matchObj.graph;

            // we can't store stuff in the mongodb that has a dollar in it!
            // so we replace that key with "char_$"
            if(matchObj.sub && matchObj.sub['$']){
                matchObj.sub['char_$'] = matchObj.sub['$'];
                delete matchObj.sub['$'];
            }

            anonymous_sequence.push(matchObj);
        });
    }

    estimate.sequence = anonymous_sequence;
    estimate.chunks = anonymous_sequence.length;
    estimate.lowercase = lowercaseMatches ? lowercaseMatches.length : 0;
    estimate.uppercase = uppercaseMatches ? uppercaseMatches.length : 0;
    estimate.digits = digits ? digits.length : 0;
    estimate.specialChars = specialChars ? specialChars.length : 0;
    estimate.length = password.length;

    return estimate;
};

module.exports = anonymousZxcvbn;