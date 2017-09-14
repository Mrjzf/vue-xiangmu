<template>
    <div id="tmpl">
        <!-- 评论详情 和缩略图 -->
        <div id="desc">
            <div class="title">
                <h4>{{photoinfo.title}}</h4>
                <p>
                    {{photoinfo.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}} {{photoinfo.click}}次浏览
                </p>
            </div>
            <!-- 缩略图 九宫格 -->
            <div class="mui-content">
                <ul class="mui-table-view mui-grid-view mui-grid-9">
                    <li v-for="(item,index) in imglist" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <img class="preview-img" :src="item.src" height="100" @click="$preview.open(index, imglist)">
                    </li>
                </ul>
            </div>

            <!-- 图片详情 摘要部分 -->
            <p v-html="photoinfo.content"></p>

            <!-- 评论组件 -->
            <div id="comment">
                <comment :id="id"></comment>
            </div>
        </div>
    </div>
</template>

<script>
//导入评论组件
import comment from '../subcom/comment.vue';
import common from '../../kits/common.js';
import { Toast } from 'mint-ui';
export default {
    components: {
        comment //2.0.1 注册评论组件
    },
    data() {
        return {
            id: 0,
            photoinfo: [],
            imglist: []
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.getinfo();
        this.getimgs();
    },
    methods: {
        //获取图片描述数据
        getinfo() {
            var url = common.apidomain + '/api/getimageInfo/' + this.id;
            this.$http.get(url).then(function(res) {
                //console.log(res);
                var body = res.body;
                if (body.status != 0) {
                    Toast(body.message);
                    return;
                }
                //将正常的逻辑数据赋值给this.photoinfo对象
                this.photoinfo = body.message[0];
            })
        },

        //获取缩略图
        getimgs() {
            var url = common.apidomain + '/api/getthumimages/' + this.id;
            this.$http.get(url).then(function(res) {
                //console.log(res);
                var body = res.body;
                if (body.status != 0) {
                    Toast(body.message);
                    return;
                }

                //vue-preview组件要求的数据是{src:,w:,h:},服务器相应的数据没有宽高 w h 手动添加
                body.message.forEach(function(item) {
                    var img = document.createElement('img');
                    img.src = item.src;
                    item.h = img.height;
                    item.w = img.width;
                })

                this.imglist = body.message;
            })
        }
    }
}
</script>

<style scoped>
/*图片详情样式*/

#desc {
    padding: 10px;
}

#desc .title h4 {
    color: #0094ff;
}

#desc .title p {
    color: rgba(0, 0, 0, 0.4);
    margin-top: 10px;
    border-bottom: 1px solid #aaa;
}


.mui-content,
.mui-content ul {
    background-color: #fff;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border-right: 0px;
    border-bottom: 0px;
}

.mui-grid-view.mui-grid-9 {
    border-top: 0px;
    border-left: 0px;
}



/* 9宫格缩略图的样式*/

.mui-content img {
    width: 100px;
    height: 100px;
}
</style>