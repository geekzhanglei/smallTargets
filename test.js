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

    /**
     * 2018.4.4
     */
    /* 1. 封装一个函数，参数是定时器的时间，.then执行回调函数*/
    function func(time) { // 能使用.then函数的必然是promise对象
        return new Promise((resolve, reject) => {
            setTimeout((resolve) => {
                resolve('成功');
                // reject('失败');
            }, time);
        })
    }

    /* 2. 动态添加li绑定事件仍然生效，弹出li内容，本题考察事件委托 */
    function bindLi() {
        var ulNode = document.getElementsByTagName('ul')[0];
        ulNode.addEventListener("click", function(e) {
            if (e.target && e.target.nodeName.toUpperCase() == "LI") {
                alert(e.target.innerHTML);
            }
        }, false);
    }

    /* 3. 使用setTimeout模拟实现setInterval，setInterval会造成指令堆积，定时效果受到当前执行代码、任务队列繁忙情况影响，尾递归*/
    function newSetInterval(func, time, count) {
        var _count = 0;

        function _func() {
            _count++;
            if (_count <= count) {
                //to do
                func();
                setTimeout(_func, time);
            } else {
                console.log("finished");
            }
        }
        setTimeout(_func, time);
    }

    // newSetInterval(function() {
    //     console.log('sss')
    // }, 400, 5)

    /**
     * 2018.4.8
     */
    /* 1. 给定一个url，如何解析url中的参数和值，并返回一个对象 */
    function query(url) {
        var _url = decodeURI(url), //处理中文输入编码解析
            res = {},
            _temp;
        var query = _url.split('?')[1];
        var queryArr = query.split('&');
        queryArr.forEach(e => {
            res[e.split('=')[0]] = e.split('=')[1];
        });
        return res;
    }

    /* 2. 判断用户输入的字符串是否是不超过两位小数的数值 */
    function checkNum(num) {
        var _num = Number(num);
        if (_num === _num) {
            if (num.split('.')[1]) {
                if (num.split('.')[1].length <= 2) {
                    console.log('格式正确');
                } else {
                    console.log('格式错误，超过两位小数');
                }
            } else {
                console.log('格式正确，是整数');
            }
        } else {
            console.log('NaN');
        }
    }

    /* 3. 判断多张图片是否全部加载完毕(考察图片元素onload事件和complete属性应用) */
    function imgIsComplete(imgArr) { // onload是异步回调，complete是判断属性
        var count = 0;
        for (var i = 0; i < imgArr.length; i++) {
            imgArr[i].onload = function() {
                if (this.complete) {  //  这个if可以没有
                    count++;
                    console.log('当前加载第' + i + '张图片');
                }
            }
        }

        function queryProgress(callback) {
            if (count < imgArr.length) {
                console.log('加载不成功，当前是第' + count + '张图片加载完');
                setTimeout(queryProgress, Interval);
            } else {
                console.log('已加载完');
                // to do
            }
        }
        queryProgress();
    }

}())
