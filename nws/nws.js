var request = require('request');

var hostConf = {
    url: 'loalhost',
    port: '8080'
};


module.exports = function(route, data) {
    
    return new Promise(resolve, reject) {
        requset(url + route, data, (err, result) => {
            if(err)
                return reject(err);
            resolve(result);
        });
    }
}