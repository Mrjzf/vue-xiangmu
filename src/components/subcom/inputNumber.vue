<template>
    <div id="subtmpl">
        <div class="mui-numbox" style="width: 160px;height: 35px;">
            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="substrict">-</button>
            <input class="mui-input-numbox" type="number" v-model="count" />
            <button class="mui-btn mui-btn-numbox-plus" type="button" @click="add">+</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            count: 1
        }
    },
    methods: {
        add() {
            this.count++;
            this.sendmessage();
        },
        substrict() {
            this.count--;
            if (this.count < 1) {
                this.count = 1;
            }
            this.sendmessage();
        },

        //传值 子组件向父组件传值
        sendmessage() {
            this.$emit('dataObj', this.count);
        }
    }
}
</script>

<style scoped>
#subtmpl {
    width: 60px;
    height: 25px;
    line-height: 25px;
    display: inline-block;
    text-align: center;
}
</style>