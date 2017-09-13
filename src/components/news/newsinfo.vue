<template>
    <div id="tmpl">
        <!-- 实现新闻详情 -->
        <div class="title">
            <h4 v-text="info.title"></h4>
            <p>{{info.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}  {{info.click}}次浏览</p>
        </div>
        <div class="content" v-html="info.content">
        </div>

        <!-- 实现评论组件 -->
        <!-- 10.2使用评论组件 -->
        <comment :id="id"></comment>

    </div>
</template>

<script>

import common from '../../kits/common.js';
import { Toast } from 'mint-ui';

//10.0导入评论组件
import comment from '../subcom/comment.vue';

export default {
    //10.1  注册评论组件
    components:{
        comment
    },

    data() {
        return {
            id:0,
            info:{}
        }
    },
    created(){
        //获取url传入的id 赋值给 data 中的id
        this.id = this.$route.params.id;

        this.getinfo()
    },
    methods:{
        getinfo(){
            var url = common.apidomain + '/api/getnew/'+this.id;
            this.$http.get(url).then(function (response) {  
                var data = response.body;
                //console.log(data);
                if (data.status == 0) {
                    this.info = data.message[0];
                }else{
                    Toast(data.message);
                }
            })
        }
    }
}
</script>

<style scoped>
.title h4 {
    color: #0094ff;
}

.title p {
    color: rgba(0, 0, 0, 0.5);
}

.title,
.content {
    padding: 5px;
}
</style>
