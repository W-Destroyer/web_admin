/**
 * [fetchRequest 将fetch重新进行封装，使其更加容易使用]
 * @param  {[String]} uri        [请求接口地址]
 * @param  {[Object]} options    [请求参数]
 * @return {[Promise]}           [返回Promise对象]
 */
function fetchRequest(uri, options) {

    // 调用原生fetch接口完成异步请求
    var _fetch = !!options ? fetch(url, options) : fetch(url);

    return new Promise((resolve, reject) => {

        _fetch.then(response => {
            return response.json()
        }).then(json => {
            resolve(json);
        }).catch(err => {
            reject(err);
        });
    });
}

fetchRequest.get = function(uri, data) {
    var _options = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        credentials: 'include'
    }
    if (!!data)
        url += '?' + Object.keys(data).map(key => {
            return key + '=' + value;
        }).join('&');

    // 调用原生fetch接口完成异步请求
    var _fetch = fetch(url, _options);

    return new Promise((resolve, reject) => {
        
        _fetch.then(response => {
            return response.json();
        }).then(json => {
            resolve(json);
        }).catch(err => {
            reject(err);
        });
    });
    
}

fetchRequest.post = function(uri, options) {

    var _options = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(options.data),
        credentials: 'include'
    }

    return new Promise((resolve, reject) => {
        // 调用原生fetch接口完成异步请求
        fetch(uri, _options).then(response => {
            return response.json();
        }).then(json => {
            resolve(json);
        }).catch(err => {
            reject(err);
        });
    });
}

fetchRequest.put = function(url, data) {
    var options = {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data),
        credentials: 'include'
    }

    return new Promise((resolve, reject) => {
        fetch(url, options).then(response => {
            return response.json();
        }).then(json => {
            resolve(json);
        }).catch(err => {
            reject(err);
        })
    })
}

fetchRequest.patch = function(url, data) {
    var options = {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data),
        credentials: 'include'
    }
    return new Promise((resolve, reject) => {
        
    })
}

fetchRequest.delete = function(url, data) {
    var options = {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data),
        credentials: 'include'
    }

    return new Promise((resolve, reject) => {
        fetch(url, options).then(response => {
            return response.json()
        }).then(json => {
            resolve(json);
        }).catch(err => {
            reject(err);
        })
    })
}

fetchRequest.all = function(requestArr) {

    return new Promise((resolve, reject) => {

        var responseArr = [];

        requsetArr.map(req => {
            req.then(json => {
                responseArr.push(json);
                if(requestArr.length === responseArr.length)
                    resolve(response);
            }).catch(err => {
                if(requestArr.length === responseArr.length)
                    resolve(response);
            });
        })

    })
}

export default fetchRequest