/**
 * [cloneDeep 深复制]
 * 由于我所要复制的不存在[函数, Set, Map]等类型，使用lodash等第三方插件有比较臃肿，便自己写了一个简易的深复制函数；
 * 参数中可能存在环，使用index粗略判断，嵌套超过10层，直接赋值，不做循环。
 * 
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function cloneDeep(obj) {
    var index = 10;

    if (isObject(obj))
        return cloneObject(obj, index);

    if (isArray(obj))
        return cloneArray(obj, index);

    return obj;
}

function cloneObject(obj, index) {
    if (index < 0) 
        return obj;
    var newObj = {};

    Object.keys(obj).forEach(key => {
        if (isObject(obj[key]))
            newObj[key] = cloneObject(obj[key], index - 1);
        if (isArray(obj[key]))
            newObj[key] = cloneArray(obj[key], index - 1);
        newObj[key] = obj[key];
    });

    return newObj;
}

function cloneArray(arr, index) {
    if (index < 0)
        return arr;

    var newArr = [];
    arr.forEach(item => {
        if (isObject(item))
            return newArr.push(cloneObject(item, index - 1));
        if (isArray(item))
            return newArr.push(cloneArray(item, index - 1));
        newArr.push(item);
    });

    return newArr;
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

export default cloneDeep;