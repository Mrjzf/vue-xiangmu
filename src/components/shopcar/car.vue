<template>
    <div id="tmpl">
        <div class="row" v-for="(item,index) in datalist">

            <mt-switch class="switch" v-model="value[index]"></mt-switch>

            <img class="img" :src="item.thumb_path" alt="商品图片">
            <div class="inforight">
                <h4 v-text="item.title"></h4>
                <div class="bottom">
                    <ul>
                        <li>￥{{item.sell_price}}</li>
                        <li>
                        </li>
                        <inputnumber v-on:dataObj="" class="inputnumber"></inputnumber>
                        <li>
                            <a href="javascript:void(0)">删除</a>
                        </li>
                    </ul>

                </div>
            </div>

        </div>
    </div>
</template>

<script>

import inputnumber from '../subcom/inputNumber.vue';
import {getgoodsObject} from '../../kits/localSg.js';

export default {
    components: {
        inputnumber
    },
    data() {
        return {
            value: [],
            datalist: [
                {
						"cou": 1,
						"id": 87,
						"title": "华为（HUAWEI）荣耀6Plus 16G双4G版",
                        "sell_price": 2195,
                        "thumb_path": "http://www.webhm.top:8080/upload/201504/20/thumb_201504200046594439.jpg"

					},
					{
						"cou": 1,
						"id": 88,
						"title": "苹果Apple iPhone 6 Plus 16G 4G手机（联通三网版）",
						"sell_price": 5780,
					} 
            ]
        }
    },
    created() { 
        this.getdatalist();
    },
    methods: {
        getdatalist(){
            //1.0 从localstorage中获取到所有的商品id值
            var obj = getgoodsObject();
            //2.0 将id值按照 api的参数格式提交给api
        }
    }
}
</script>

<style scoped>
.row {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    height: 102px;
    display: flex;
    padding: 5px;
}

.switch {
    flex: 0 0 52px;
}

.img {
    margin-left: 5px;
    height: 75px;
    width: 75px;
    flex: 0 0 85px;
}

.inforight {
    margin-left: 5px;
    flex: 1;
}

.inforight ul {
    padding-left: 0px;
}

.inforight li {
    list-style: none;
    display: inline-block;
}

.inforight h4 {
    color: #0094ff;
    font-size: 14px;
}

.bottom li:first-child {
    color: red;
    margin-right: 5px;
}

.bottom li:last-child {
    margin-left: 65px;
}

#total {
    height: 100px;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    padding: 5px;
    ;
}

#total ul {
    padding-left: 0px;
}

#total li {
    list-style: none;
    font-size: 14px;
}

#button {
    flex: 0 0 60px;
    margin: 30px 0 0 0;
}

.desc {

    flex: 1;
}
</style>