<template>
    <div class="setAddress">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content"></div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    export default {
        name: "setAddress",
        data(){
            return{
                title:'收货地址'
            }
        },
        components: {
            ListHeader,
        },
    }
</script>

<style scoped>

</style>