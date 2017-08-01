const nwsConf = require('../config/nws.config');

module.exports = function(url, path) {
    // var api
    if(url === undefined && path === undefined)
        return new Error('url is not null');
    if(path === undefined)
        return nwsConf.url + url;
    return url + path
}