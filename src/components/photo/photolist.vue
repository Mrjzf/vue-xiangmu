<template>
    <div id="tmpl">
        <div id="cate">
            <ul v-bind="{style:'width:'+ulwidth+'px'}">
                <li @click="getimages(0)">全部</li>
                <li v-for="item in cates" @click="getimages(item.id)">{{item.title}}</li>
            </ul>
        </div>
        <div id="imglist">
            <ul>
                <li v-for="item in imglist">
                    <router-link v-bind="{to:'/photo/photoinfo/'+item.id}">
                        <img v-lazy="item.img_url">
                        <div id="desc">
                            <h5 v-text="item.title"></h5>
                            <p v-text="item.zhaiyao"></p>
                        </div>
                    </router-link>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
import common from '../../kits/common.js';
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            cates: [],
            ulwidth: 375,
            imglist: []
        }
    },
    created() {
        this.getcates();
        this.getimages(0)    //0代表获取全部
    },
    methods: {
        getcates() {
            var url = common.apidomain + '/api/getimgcategory';
            this.$http.get(url).then(function(res) {
                //console.log(res);
                if (res.body.status != 0) {
                    Toast(res.body.message);
                    return;
                }
                this.cates = res.body.message;
                var w = 62;
                var count = this.cates.length + 1;
                this.ulwidth = count * w;
            })
        },
        getimages(cateid) {
            cateid = cateid || 0;
            var url = common.apidomain + '/api/getimages/' + cateid;
            this.$http.get(url).then(function(res) {
                var body = res.body;
                if (body.status != 0) {
                    Toast(res.body.message);
                    return;
                }
                this.imglist = body.message;
            })
        }
    }
}
</script>

<style scoped>
#cate {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
}

#cate ul {
    margin: 0;
    padding-left: 10px;
}

#cate li {
    list-style: none;
    display: inline-block;
    color: #0094ff;
    font-size: 14px;
    padding-left: 5px;
}

#imglist ul {
    padding-left: 0px;
}

#imglist li {
    list-style: none;
    position: relative;
}

#imglist img {
    width: 100%;
    height: 300px;
}


#desc {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    bottom: 2px;
    left: 0px;
}

#desc h5 {
    color: #ffffff;
    font-weight: bold;
}

#desc p {
    color: #fff;
}

image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
}
</style>
