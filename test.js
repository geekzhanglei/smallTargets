/**
 * @纵览：每天练习3道题
 * @来源：互联网
 * @from：2018.3.30
 */

(function() {
    /**
     * 2018.4.2
     */

    /* 1.写一个函数模拟new操作符的功能 */
    function newFunc(Parent) {
        var res = {};
        res.__proto__ = Parent.prototype; //res成为构造函数Parent的实例
        res.call(Parent); // 执行构造函数
        return res; //返回匿名新对象
    }

    /* 2.数组去重 */
    function unique(arr) { // 复杂度O(n^2)
        arr.sort();
        var res = [arr[0], ];

        for (var i = 1, len = arr.length; i < len; i++) {
            if (arr[i] == arr[i - 1]) {
                continue;
            } else {
                res.push(arr[i]);
            }
        }
        return res;
    }

    function unique(arr) { // 复杂度O(n^2)
        var res = [];
        for (var i = 0, l = arr.length; i < l; i++) {
            if (!res.includes(arr[i])) {
                res.push(arr[i]);
            }
        }
        return res;
    }

    function unique(arr) { // ES6 Set数据结构，成员值唯一，是一种新的类数组对象
        return Array.from(new Set(arr));
        // 或者
        // return [...new Set(arr)];
    }

    /* 3. js对象深拷贝 */
    function deepCopy(obj) {
        var res, objType;
        var type = typeof obj;

        switch (type) {
            case 'number':
            case 'boolean':
            case 'undefined':
            case 'string':
                res = obj;
                break;
            case 'object':
                objType = Object.prototype.toString.call(obj).slice(8, -1);
                switch (objType) {
                    case 'Function':
                        res = obj;
                        break;
                    case 'Array':
                        var resArr = [];
                        obj.forEach((e) => {
                            resArr.push(deepCopy(e));
                        })
                        res = resArr;
                        break;
                    case 'Object':
                        var resObj = {};
                        for (var key in obj) {
                            resObj[key] = deepCopy(obj.key);
                        }
                        res = resObj;
                        break;
                    case 'Null':
                        res = null;
                        break;
                    default:
                        break;
                }
            default:
                break;
        }
        return res;
    }

    /**
     * 2018.4.3
     */
    /* 1. 给定一个字符串，统计每种字符出现的次数，生成一个数组。如‘abccddd’,得到['a':1,'b':1,'c':2,'d':3] */
    function countLetter(letters) {
        var res = [];
        for (var i = 0, len = letters.length; i < len; i++) {
            if (res[letters[i]]) {
                res[letters[i]]++;
            } else {
                res[letters[i]] = 1;
            }
        }
        return res;
    }

    /* 2. 对象浅拷贝 */
    function shallowCopy(obj) {
        var res,
            type = Object.prototype.toString.call(obj).slice(8, -1);
        if (obj === null) {
            return null;
        } else if (type === "Array") {
            res = [];
            obj.forEach(element => {
                res.push(element);
            });
        } else if (type === "Object") {
            res = {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    res[key] = obj[key];
                }
            }
        } else { // 简单值和function、RegExp、Date等类型
            res = obj;
        }
        return res;
    }

    /* 3.对象深拷贝 */
    function deepCopy(obj) {
        var res,
            type = Object.prototype.toString.call(obj).slice(8, -1);
        if (obj === null) {
            return null;
        } else if (type === "Array") {
            res = [];
            obj.forEach(element => {
                res.push(deepCopy(element)); // 只更改元素赋值部分
            });
        } else if (type === "Object") {
            res = {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    res[key] = deepCopy(obj[key]); // 只更改元素赋值部分
                }
            }
        } else { // 简单值和function、RegExp、Date等类型
            res = obj;
        }
        return res;
    }
}())
