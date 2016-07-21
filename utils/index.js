var resthandler = require('./resthandler');

function generateSessionId(){
    return generateTransId();
}

function getCurrentDateTime(){
  return new Date();
}

function formatDate(date){
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    return [date.getFullYear(), !mm[1] && '0', mm, !dd[1] && '0', dd].join('');
}


function generateTransId(){
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + s4() + s4() +
        s4() + s4() + s4() + s4();
}

module.exports = {
    getNewSessionId: generateSessionId,
    getCurrentDateTime: getCurrentDateTime,
    generateTransId: generateTransId,
    restHandler :resthandler

};