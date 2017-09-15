<template>
    <div id="tmpl">
        <!-- 商品轮播图 -->
        <div class="slider">
            <slider v-bind:imgs="imgs"></slider>
        </div>

        <div id="buy">
            <h4 v-text="info.title"></h4>
            <p class="line"></p>
            <ul>
                <li class="price">
                    市场价:
                    <s>￥{{info.market_price}}</s>
                    销售价：
                    <span>￥{{info.sell_price}}</span>
                </li>
                <li class="inputli">
                    购买数量：
                    <inputnumber v-on:dataObj="getcount" class="inputnumber"></inputnumber>
                </li>
                <li>
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="danger" size="small">加入购物车</mt-button>
                </li>
            </ul>
        </div>

        <div id="params">
            <h6>商品参数</h6>
            <p class="line"></p>
            <ul>
                <li>商品货号：{{info.goods_no}}</li>
                <li>库存情况：{{info.stock_quantity}}</li>
                <li>上架时间：{{info.add_time | datefmt('YYYY-MM-DD')}}</li>
            </ul>
        </div>

        <div id="other">
            <router-link v-bind="{to:'/goods/goodsdesc/'+id}">
                <mt-button class="imgdesc" type="primary" size="large" plain>图文详情</mt-button>
            </router-link>

            <router-link v-bind="{to:'/goods/goodscomment/'+id}">
                <mt-button type="danger" size="large" plain>商品评论</mt-button>
            </router-link>
        </div>

    </div>
</template>

<script>

import common from '../../kits/common.js';
import slider from '../subcom/slider.vue';
import inputnumber from '../subcom/inputNumber.vue';

export default {
    components: {
        slider,
        inputnumber
    },
    data() {
        return {
            id: 0,
            imgs: [],
            info: [],
            inputNumberCount: 1
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.getimgs();
        this.getinfo();
    },
    methods: {
        getimgs() {
            var url = common.apidomain + '/api/getthumimages/' + this.id;
            this.$http.get(url).then(function(res) {
                //console.log(res);
                this.imgs = res.body.message;
            })
        },
        getinfo() {
            var url = common.apidomain + '/api/goods/getinfo/' + this.id;
            this.$http.get(url).then(function(res) {
                console.log(res);
                this.info = res.body.message[0];
            })
        },
        getcount(count) {
            this.inputNumberCount = count;
        }
    }
}
</script>

<style scoped>
.slider {
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    margin: 5px;
}

#buy,
#params,
#other {
    margin: 5px;
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 5px;
}

.line {
    height: 1px;
    border: 1px solid rgba(0, 0, 0, 0.2);
}

#buy ul,
#params ul {
    padding-left: 0px;
}

#buy h4 {
    color: #0094ff;
    padding: 5px;
}

#buy li,
#params li {
    list-style: none;
    padding: 8px;
}

#buy .price span {
    color: red;
}

#other .imgdesc {
    margin-bottom: 20px;
}

.inputli {
    position: relative;
}

.inputnumber {
    position: absolute;
    left: 100px;
    top: 5px;
}

.ball {
    background-color: red;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    position: absolute;
    left: 150px;
    top: 10px;
    transition: all 0.4s ease;
    z-index: 100;
}
</style>