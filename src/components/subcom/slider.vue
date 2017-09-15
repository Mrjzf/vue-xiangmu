<template>
    <div id="tmpl">
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in imgs">
                <img :src="item.img">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props:['imgs']
    }
</script>

<style scoped>
    
	.mint-swipe {
	    height: 50vw;
	}

	.mint-swipe-item img {
	    width: 100%;
	}

	.mint-swipe-item {
	    width: 100%;
	    height: 50vw;
	}

</style>