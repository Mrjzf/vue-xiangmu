//操作localstorage的文件
/*
*  获取数据：var Str  =localStorage.getItem(key);
*  添加和追加数据： localStorage.setItem(key,value) ,value 是一个字符串
*  移除数据 ： localStorage.removeItem(key);
* */

// 1.0 定义常量key,将来操作的localStorage中的数据都以这个key来作为标识
export const KEY = 'goodsdata';
export var valueObj = { goodsid: 0, count: 0 };

//2.0 实现数据的添加    value 格式： {goodsid：88，count：10}
export function setItem(value) {
    //获取json格式
    var jsonString = localStorage.getItem(KEY);
    //如果没有数据 给一个我空数组
    jsonString = jsonString || '[]';
    var arr = JSON.parse(jsonString);  //把json形式的字符串转成对象

    //把 value 追加到 arr
    arr.push(value);

    //将arr转换成 json 字符串保存起来
    localStorage.setItem(KEY, JSON.stringify(arr));
}

//3.0  数据的获取
export function getItem() {
    var jsonString = localStorage.getItem(KEY);
    //将json格式字符串转换成 js对象
    //jsonString：是一个标准的json格式
    jsonString = jsonString || '[]';
    return JSON.parse(jsonString);
}

//4.0 


//5.0 将localStorage中的数据整合成一个对象的形式
/*
* 格式：
* {
*  商品id的值：商品的购买数量,
*  商品id的值：商品的购买数量
* }
* 真正的数据是：
* {
*   87:4,
*   88:1
* }
* */
export function getgoodobject() {
    var arr = getItem();  //arr的格式：[{goodsid:87,count:1},{goodsid:87,count:3},{goodsid:88,count:1}]
    //将多个对象合成一个对象
    var resobj = {};
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (!resobj[item.goodsid]) {
            //如果没有，就添加数据
            resobj[item.goodsid] = item.count;
        } else {
            //有数据，就追加
            var count = resobj[item.goodsid];
            resobj[item.goodsid] = count + item.count;
        }
    }

    return resobj;
    
}