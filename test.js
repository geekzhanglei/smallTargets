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
        if (num.length === 0) {
            return;
        }
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
                if (this.complete) { //  这个if可以没有
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

    /**
     * 2018.4.9
     */
    /* 1. 创建对象（或称类）的常见方法及其优缺点 */
    //工厂函数，缺点是不能识别(instanceof)新对象
    function createObj(name) {
        var obj = new Object();
        obj.name = name;
        obj.sayHi = function() {
            alert(this.name);
        }
        return obj;
    }
    var instance = creatObj('xiaoming');
    //构造函数，可以识别对象，但封装变差
    function CreateObj(name) {
        this.name = name;
        this.sayHi = sayHi;
    }

    function sayHi() {
        alert(this.name);
    }

    var instance = new CreatObj('xiaoming');
    // 原型模式，缺点是共享属性和方法，共享属性导致方法也共享了
    function Parent() {}
    Parent.prototype = {
        constructor: Parent,
        name: 'xiaoming',
        sayHi: function() {
            alert(this.name)
        }
    }
    var person = new Parent();
    // 组合模式（原型+构造函数）：通过原型方法共享，通过构造函数属性私有
    function Parent(name) {
        this.name = name;
    }
    // Parent.prototype = {
    //     constructor: Parent,
    //     sayHi: function() {
    //         alert(this.name);
    //     }
    // }
    Parent.prototype.sayHi = function() {
        alert(this.name);
    }
    var person = new Parent('xiaoming');

    /* 2. 常用继承实现 */
    // 原型链继承,缺点Parent的属性name没意义，如果定义引用类型会被共享
    function Parent(name) {
        this.name = name;
    }
    Parent.prototype.sayHi = function() {
        alert(this.name);
    }

    function Child(name) {
        this.name = name;
    }
    Child.prototype = new Parent('xiaoming');
    var child = new Child('hello');
    child.sayHi();
    // 借用构造函数,也就是让可能共享的属性在子类构造函数中执行一遍创建副本，缺点是：在父类创建方法，则方法反复被创建
    function Parent() {
        this.name = ['12', '34'];
        this.sayHi = function() {
            alert(this.name[0]);
        }
    }

    function Child() {
        Parent.call(this);
    }
    var child = new Child();
    // 组合继承，思路是将sayHi放到parent的原型上，这样不会反复创建方法
    function Parent() {
        this.name = ['12', '34'];
    }
    Parent.prototype.sayHi = function() {
        alert(this.name[0]);
    }

    function Child(name, age) {
        Parent.call(this, name);
        this.age = age;
    }
    Child.prototype = new Parent(); //这里继承parent原型上的方法

    var child = new Child('xiaoming', '5 years old'); //这里继承Child上的副本属性和新添加属性

    /* 3. ES6 创建类和继承的方法，实际上是组合继承的语法糖 */
    // 创建类
    class Person {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        sayHi() {
            alert(this.x);
        }
    }
    // 实现继承,子类Child通过extends写法调用父类，子类内部super表示父类对象
    class Child extends Parent {
        constructor(x, y, color) {
            super(x, y);
            this.color = color;
        }
        sayHi() {
            alert(this.color + super.sayHi())
        }
    }

    /**
     * 2018.4.16
     */
    /* 1. 克隆json对象，或最简单的对象深复制方法 */
    function cloneJSON(oldObj) {
        return JSON.parse(JSON.stringify(oldObj));
    }
    /* 2. 清除输入字符串前后的空格 */
    function trim(str) {
        if (str && typeof str == 'string') {
            return str.replace(/^(\s*)| (\s*)$/, "");
        }
    }
    /* 3. 对象转换为数组 */
    function transfer(obj) {
        var res = [];
        for (var i in obj) {
            res.push(i);
        }
        return res;
    }

    /**
     * 2018.4.17-数组方法reduce、map、filter
     */
    /* 1. 生成一个递增数列的数组，如[1,2,3,...,n],map不能对空数组进行操作 */
    function createArr(n) {
        return new Array(n).fill('').map((ele, index) => {
            return index + 1;
        });
    }
    /* 2. 判断1到10000的所有数字中含有的0的个数，提示fill、map、filter、reduce */
    function statistics() {
        return new Array(10000).fill('fill').map((_, index) => { // map不对空数组处理，必须fill填充初始值
            return index + 1;
        }).filter((ele) => { // 过滤带0的数组元素
            return /0/.test(ele);
        }).reduce((count, item) => { // reduce迭代最终得到count
            return count + (String(item).match(/0/g) || []).length; // match匹配失败返回null，匹配成功有/g返回每个子匹配项
        });
    }
    /* 3. 累加器实现reduce应用 */
    function summation(arr) {
        return arr.reduce((count, item, index, array) => {
            return count + item;
        }, 0);
    }
    /**
     * 2018.4.18
     */
    /* 1. 通用事件监听方法对象的写法 */
    let event = {
        getEvent: function(event) {
            return event || window.event;
        },
        addEvent: function(element, type, callback) {
            if (element.addEventListener) {
                element.addEventListener(type, callback, false);
            } else {
                element.attachEvent('on' + type, callback); // attachEvent第一个参数要有on前缀
            }
        },
        removeEvent: function(element, type, callback) {
            if (element.removeEventListener) {
                element.removeEventListener(type, callback, false);
            } else {
                element.detachEvent('on' + type, callback); // attachEvent第一个参数要有on前缀
            }
        },
        getTarget: function(ele) {
            return ele.target || ele.srcElement;
        },
        stopPropagation: function(ele) {
            if (ele.stopPropagation) {
                ele.stopPropagation();
            } else {
                ele.cancelBuble();
            }
        },
        preventDefault: function(ele) {
            if (ele.preventDefault) {
                ele.preventDefault();
            } else {
                ele.returnValue = false;
            }
        }
    }
    /* 2. 实现数组乱序，是随机函数应用*/
    function mess(arr) {
        arr.sort((a, b) => {
            let rand = (Math.random() > 0.5) ? -1 : 1;
            return (a - b) * rand;
        })
        return arr;
    }
    // mess([1, 2, 3, 4, 5, 6])

    /* 3. 网页中计算一年还有多长时间的倒计时，显示“还剩123天3小时23分20秒”,考察相关事件函数 */
    (function restTime() {
        function curTime() {
            let oOldTime = new Date() // new Date() 返回utc格式当前时间
            let curYear = oOldTime.getFullYear();
            let oTime = new Date();
            oTime.setFullYear(curYear, 12, 31, 23, 59, 59); //setFullYear用年份设置总毫秒数
            console.log(oTime)
            let iTimes = oTime.getTime() - oOldTime.getTime();
            console.log(iTimes)
            let iDays = parseInt(iTimes / 1000 / 3600 / 24);
            let iHours = parseInt(iTimes / 1000 / 3600 % 24);
            let iMins = parseInt(iTimes / 1000 / 60 % 60);
            let iSecs = parseInt(iTimes / 1000 % 60);
            console.log("今年还剩：" + iDays + "天" + iHours + "小时" + iMins + "分" + Math.round(iSecs) + "秒");
        }
        setInterval(() => {
            curTime();
        }, 1000)
    })();

    /**
     * 2018.4.19
     */
    /* 1. 有一个已经排序的数组，如arr = [1,3,5,6,7,9,11]，把新的数字如8插入该数组，得到顺序数组 */
    function sort(arr, item) {
        arr.push(item);
        arr.sort()
        return arr;
    }

    function sort(arr, item) {
        var _arrLeft = [],
            _arrRight = [];
        arr.map((ele, index, array) => {
            if (ele <= item) {
                _arrLeft.push(ele);
            } else {
                _arrRight.push(ele);
            }
        });
        return _arrLeft.concat(_arrRight); // 注意concat返回拼接数组，原数组不变
    }
    /* 2. 移除数组 arr 中的所有值与 item 相等的元素，直接在给定的 arr 数组上进行操作，并将结果返回 */
    function removeWithoutCopy(arr, item) {
        var l = arr.length;
        for (var i = 0; i < l; i++) {
            if (arr[i] === item) {
                arr.splice(i, 1);
                i--;
            }
        }
        return arr;
    }
    // filter会返回新数组，不符合条件
    /* 3.统计数组 arr 中值等于 item 的元素出现的次数，注意用数组方法，不要总想着for循环，数组方法通常返回新数组 */
    function count(arr, item) {
        return arr.filter(function(a) {
            return a === item;
        }).length;
    }

    /**
     * 2018.4.20
     */
    /* 1. 函数防抖，如input键盘输入事件的触发情形 */
    // 法一：
    var timer = false;

    function throttle() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            // to do
        }, 300);
    }
    // 法二：高程推荐写法
    function throttle(method, context) {
        clearTimeout(method.id);
        method.id = setTimeout(() => {
            method.call(context);
        }, timeout);
    }
    window.onresize = function() {
        throttle(myFunc); // 默认context是window域
    }
    /* 2. 函数节流，节流意味着没有到一定时间不会响应用户触发的事件,其实封装有点差 */
    var isOn = true;
    $.onscroll = function() {
        if (!isOn) {
            return;
        }
        isOn = false;
        setTimeout(() => {
            // to do
            isOn = true;
        }, timeout);
    }
    /* 3.  将数组 arr 中的元素作为调用函数 fn 的参数:典型改变作用域问题call、apply应用*/
    function argsAsArray(fn, arr) { // arr 是数组，使用apply，否则call
        return fn.apply(this, arr);
    }

    /**
     * 2018.4.23
     */
    /* 1. 实现函数 makeClosures，调用之后满足如下条件：
        (1)返回一个函数数组 result，长度与 arr 相同
        (2)运行 result 中第 i 个函数，即 result[i]()，结果与 fn(arr[i]) 相同 */
    function makeClosures(arr, fn) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            result[i] = (function(e) {
                return function() {
                    return fn(arr[e]);
                }
            })(i);
        }
    }
    /* 2. 将add(1,2)形式的多参输入转换为add(1)(2)形式,考察柯里化概念 */
    function add(x) {
        return function(y) {
            return x + y;
        }
    }
    // add(1)(2);
    /* 3. 千位分隔符经典问题,两位小数 */
    function isUSD(str) {
        return /^\$\d{1,3}(,\d{3})*(\.\d{2})?$/.test(str);
    }

    /**
     * 2018.4.24
     */
    /* 1. 翻转字符串*/
    function reverseStr(str) {
        var tmp = '';
        for (var i = str.length; i >= 0; i--) {
            tmp += str[i];
        }
        return tmp;
    }
    // split join 字符串数组互转方法
    function reverseStr(str) {
        var arrStr = str.split("");
        arrStr.reverse();
        return arrStr.join("");
    }
    /* 2. 生成指定长度的随机字符串 */
    function getRandomStr(n) {
        var str = 'abcdefghijklmnopqrstuvwxyz0123456789',
            res = '';
        for (var i = 0; i < n; i++) {
            res += str.charAt(Math.floor(Math.random() * n));
        }
        return res;
    }
    /* 3. 阶乘 */
    function factorial(num) {
        var res = 1;
        if (num == 0) {
            return 1;
        }
        //
        var arr = new Array(num).fill("").map((e, i) => {
            return i + 1;
        });
        arr.forEach((e) => {
            res *= e;
        })
        return res;
    }

    function factorial(num) {
        var res = 1;
        if (num == 0 || num == 1) {
            return 1;
        }
        while (num > 1) {
            res *= num--;
        }
        return res;
    }

    function factorial(num) {
        if (num < 0) {
            return -1;
        }
        if (num === 0) {
            return 1;
        }
        if (num > 0) {
            return num * factorial(num - 1);
        }
    }

    /**
     * 2018.4.25
     */
    /* 1. 冒泡排序 */
    function bubbleSort(arr) {
        var i, j, l = arr.length,
            temp;
        for (i = 1; i < l; i++) {
            for (j = 0; j <= l - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j - 1] = temp;
                }
            }
        }
        return arr;
    }
    // 比较正宗的冒泡，从下边往上浮动，排序的关键是想清楚元素移动的顺序
    function bubbleSort(arr) {
        var i, j, l = arr.length,
            temp;
        for (i = 1; i < l; i++) {
            for (j = l; j >= i; j--) {
                if (arr[j] < arr[j - 1]) {
                    temp = arr[j];
                    arr[j] = arr[j - 1];
                    arr[j - 1] = temp;
                }
            }
        }
        return arr;
    }
    /* 2. 二分查找，已排序的数组中查找特定元素，还是想清楚过程 */
    function binary_search(arr, key) { // 普通
        var low = 0,
            high = arr.length - 1,
            mid;
        while (low <= high) {
            mid = parseInt((low + high) / 2);
            if (key === arr[mid]) {
                return mid;
            } else if (key < arr[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return -1;
    }

    function binary_search(arr, key, low, high) {
        var low = 0,
            high = arr.length - 1,
            mid;
        if (low > high) {
            return -1;
        }
        mid = parseInt((low + high) / 2);
        if (key == arr[mid]) {
            return mid;
        } else if (key < arr[mid]) {
            return binary_search(arr, key, low, mid - 1);
        } else {
            return binary_search(arr, key, mid + 1, high);
        }
    }
    /* 3. 判断回文字符串 */
    function palindrome(str) {
        return str.split("").reverse().join("") === str;
    }

    /**
     * 2018.4.26
     */
    /* 1. 实现一个单例模式，思路：定义父类，用标志位初始化一次实例 */
    var singleton = function(name) {
        this.name = name;
    }
    singleton.prototype.getName = function() {
        return this.name;
    }
    var getInstance = (function() {
        var instance = null;
        return function(name) {
            if (!instance) {
                instance = new singleton(name)
            }
            return instance;
        }
    })();
    var a = getInstance('aa');
    var b = getInstance('bb');

    /* 2. 沙箱模式:锁定作用域，输出以闭包形式访问内部函数 */
    let sandboxModel = (function() {
        function sayName() {};

        function sayHi() {};
        return {
            sayName: sayName,
            sayHi: sayHi
        }
    })();
    /* 3. 判断字符类型的方法 */
    function isWhatType(param) {
        // 第一种
        // return Object.prototype.toString.call(param).slice(8, -1);
        // 第二种
        if (typeof param === 'object') {
            return object.constructor; // 原始构造函数有效，如果继承过可能改变constructor
        } else {
            return typeof param;
        }
    }

    /**
     * 2018.4.27
     */
    /* 1. 现在有两个数组，合并为一个输入
        var a = [
    {
        id: 1,
        name: '...'
    },
    {
        id: 2,
        name: '...'
    }
    ]
    var b = [
    {
        id: 1,
        age: 10
    },
    {
        id: 2,
        age: 10
    }
    ]
    合并为[{ id: 1, name: '...', age: 10 }, { id: 2, name: '...', age: 10 }]
    */
    function mergeArray(a, b) {
        // map返回新数组，find返回判断条件为true的值，Object.assign用于合并对象到目标对象，返回值为目标对象
        return a.map(itema => Object.assign({}, itema, b.find(itemb => itema.id === itemb.id)));
    }

    /* 2. 获取数字 num 二进制形式第 bit 位的值 */
    function getBinaryBit(num, bit) {
        var str = num.toString(2); //数字按基准转变为其他进制数字字符串
        return str[bit - 1];
    }

    /* 3. 字符串转数字，获取形如'1000010'的十进制数字 */
    function getNum(binaryNum) {
        return parseInt(binaryNum, 2); //字符串按进制基准转变为十进制数字
    }
    /**
     * 2018.5.4
     */
    /* 1. 将setTimeout封装为promise形式 */
    function fakeSetTimeout() {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(true);
                resolve(false);
            }, timeout);
        });
        promise.then((data) => {
            console.log(data);
        }, (data) => {
            console.log(data);
        })
    }

    /* 2. 输出1、2、3、4的promise事例1:promise构造函数内部同步执行，不会被resolve/reject阻断 */
    function textPromise() {
        console.log(1);
        const promise = new Promise((resolve, reject) => {
            console.log(1);
            resolve(true);
            console.log(2);
        });
        promise.then(() => {
            console.log(4);
        });
        console.log(3);
    }

    /* 3. 输出success1，考察promise构造函数内触发函数的唯一性 */
    function testPromise1() {
        const promise = new Promise((resolve, reject) => {
            resolve('success1')
            reject('error')
            resolve('success2')
        })

        promise
            .then((res) => {
                console.log('then: ', res)
            })
            .catch((err) => {
                console.log('catch: ', err)
            });
    }
    /* 4. promise链式调用,输出1，2，每次调用then或者catch都会生成一个新promise对象，实现链式调用 */
    function testPromise2() {
        Promise.resolve(1)
            .then((res) => {
                console.log(res)
                return 2
            })
            .catch((err) => {
                return 3
            })
            .then((res) => {
                console.log(res)
            })
    }
    /* 5. promise状态改变后再调用不会再次执行构造函数，直接拿到最终值 */
    function testPromise3() {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('once')
                resolve('success')
            }, 1000)
        })

        const start = Date.now()
        promise.then((res) => {
            console.log(res, Date.now() - start)
        })
        promise.then((res) => {
            console.log(res, Date.now() - start)
        })
    }
    /* 6. 在then中return一个错误不会进入catch流程 */
    function testPromise4() {
        Promise.resolve()
            .then(() => {
                return new Error('error!!!') //返回值会包装成promise对象
            })
            .then((res) => {
                console.log('then: ', res) //在这里输出
            })
            .catch((err) => {
                console.log('catch: ', err)
            })
    }
    /* 7. promise返回自身会造成死循环 */
    function testPromise5() {
        const promise = Promise.resolve()
            .then(() => {
                return promise
            })
        promise.catch(console.error)
    }
    /* 8. promise在then中传入非函数参数会发生值穿透 */
    function testPromise6() {
        Promise.resolve(1)
            .then(2) // 每一项都是返回1
            .then(Promise.resolve(3))
            .then(console.log)
    }
    /* 9. promise then的第二个函数无法捕获第一个函数中抛出的错误，再加个catch可以捕获，如： */
    function testPromise7() {
        Promise.resolve()
            .then(function success(res) {
                throw new Error('error')
            }, function fail1(e) {
                console.error('fail1: ', e)
            })
            .catch(function fail2(e) {
                console.error('fail2: ', e)
            })
    }

    /**
     * 2018.5.21
     */
    /* 1. 使用原生js实现splice的功能，splice有三个功能，添加splice(index,0,insertItems)、删除splice(index,num)、替换即删除后插入splice(index,removeNum,insertItems);主要是slice数组分离、concat数组合并，根据情况处理*/
    let source = [1, 2, 3, 4, 5, 6];
    Array.prototype.fakeSplice = function() {
        let arr = Array.prototype.slice.call(arguments);
        let start = arr[0],
            num = arr[1],
            items = arr.slice(2),
            res = [];

        console.log(start, num, items);
        let leftArr = this.slice(0, start),
            rightArr = this.slice(start + num);
        if (num === 0) {
            res = leftArr.concat(leftArr, items, rightArr);
            console.log('0时：' + res);
        } else if (num > 0) {
            res = leftArr.concat(leftArr, items, rightArr);
            console.log('1时：' + res);
            return this.slice(start, num + 1);
        } else {
            return this;
        }
        return [];
    }
    source.fakeSplice(1, 0, 'test');

    /* 2. 字符串中是否包含数字类需求：考察简单正则*/
    function testNum(numStr) {
        let reg = /\d/;
        return reg.text(numStr);
    }
    /* 3. 判断字符串中是否存在连续字符 */
    function isContinus(str) {
        return /[a-zA-Z]\1/.test(str);
    }

    /**
     * 2018.6.22
     */
    /* 1. ES6 map数据结构 */
    function unique(arr) {
        const res = new Map();
        return arr.filter((a) => !res.has(a) && res.set(a, 1))
    }
    /* 2. ES6去重神器 */
    function dedupe(array) {
        return Array.from(new Set(array));
    }
    /* 3. ES6 set+扩展运算符 */
    function dedupe(array) {
        let resultarr = [...new Set(array)];
        console.log(resultarr); //[1,2,3]
    }

    /**
     * 2018.7.2
     */
    /* 1. 斐波那契数列的生成函数写法:解构赋值 */
    function fib(max) {
        let a = 0;
        let b = 1;
        let arr = [0, 1];
        if (arr.length < max) {
            [a, b] = [b, a + b];
            arr.push(b);
        }
        return arr;
    }
    fib(5); //前5项

    /* 2. 斐波那契数列的生成函数写法:生成器generator手动循环 */
    function* fib(max) {
        let a = 0,
            b = 1,
            n = 0;
        while (n < max) {
            yield a;
            [a, b] = [b, a + b];
            n++;
        }
        return;
    }
    let f = fib(4);
    f.next(); // {value:0,done:false}
    f.next(); // {value:1,done:false}
    f.next(); // {value:1,done:false}
    f.next(); // {value:2,done:false}
    f.next(); // {value:undefined,done:true}

    /* 3. 斐波那契数列的生成函数写法:生成器generator自动循环 */
    function* fib(max) {
        let a = 0,
            b = 1,
            n = 0;
        while (n < max) {
            yield a;
            [a, b] = [b, a + b];
            n++;
        }
        return;
    }
    for (var ele of fib(10)) {
        console.log(ele);
    }

    /**
     * 2018.7.3
     */
    /* 1. 切分如下字符串为数组，'a b    c,d'提取字符为数组 */
    function str2arr() {
        let str = 'a b   c,d;;e';
        return str.split(/[\s\,\;]+/);
    }

    /* 2. 粗糙的电子邮件匹配 */
    function valid(emailStr) {
        return /^[\w\.]+@[\w]+[\.\w]*$/.test(emailStr);
    }
    /* 3. 提取电子邮件名字和邮箱 */
    function getNameEmail() {
        var re = /^<(\w+\s\w+)>\s(\w+@\w+\.\w+)$/;
        var r = re.exec('<Tom Paris> tom@voyager.org');
        if (r === null || r.toString() !== ['<Tom Paris> tom@voyager.org', 'Tom Paris', 'tom@voyager.org'].toString()) {
            console.log('测试失败!');
        } else {
            console.log('测试成功!');
        }
    }
}())
/**
 * 2018.8.8
 */
/* 1.将数组某元素向前/向后移动若干位 */
var arr = [1, 2, 4, 5, 6, 7, 8, 9, 3, 10];
const arrMoveTo = (arr, start, end) => {
    if (arr.length < 0 || start < 1 || end < 1 || start > arr.length || end > arr.length) {
        throw new Error('error');
    }
    var temp = arr.splice(start - 1, 1, 'err')[0];
    arr.splice(end - 1, 0, temp);
    arr.splice(arr.indexOf('err'), 1);
    return arr;
}
arrMoveTo(arr, 3, 9);

/* 2. 旋转数组：即[1,2,3,4,5,6]变为[5,6,1,2,3,4] */
var nums = [1, 2, 3, 4, 5, 6];
var rotate2 = function(nums, k) {
    nums.splice(0, 0, ...nums.splice(-k, k))
    return nums
}
rotate2(nums, 2);
/* 3. 更好的节流函数 */
function throttle(fn, interval) {
    var timer,
        isFirst = true,
        that = this; // this取决于生成函数时的执行方式throttle(handleClick, 2000)，而不是最终函数的调用方式throttledHandleClick
    return function() {
        if (isFirst) {
            fn.apply(that, arguments);
            return isFirst = false;
        }
        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            fn.apply(that, arguments);
        }, interval || 1000);
    }
}
// 用法
function handleClick(param) {
    console.log('clicked', param)
};
const throttledHandleClick = throttle(handleClick, 2000)
// 下面的代码只会打印一次clicked
throttledHandleClick('p')
throttledHandleClick('p')
throttledHandleClick('p')

/**
 * 2018.9.10
 */
/* 1. 数组扁平化方法，即多维数组化为一维数组，如[1,2,3,[4,5,[6,7]]] ==>> [1,2,3,4,5,6,7]*/
// 方法一：普通递归
function flatArr(arr) {
    let result = [];
    for (let i = 0, l = arr.length; i < l; i++) {
        if (Array.isArray[arr[i]]) {
            result.push(...arr[i]);
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}
// 方法二：利用join对数组的递归解析性质
function flatArr(arr) {
    return arr.join(',').split(',').map(Number);
}
// 方法三：利用toString对数组的递归解析特性
function flatArr(arr) {
    return arr.toString().split(',').map(Number);
}
// 方法四：利用空数组字符串特性
function flatArr(arr) {
    return (arr + '').split(',').map(Number);
}
