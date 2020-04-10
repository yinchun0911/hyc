<template>
    <div class="addAddress">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content"></div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    export default {
        name: "addAddress",
        data(){
            return{
                title:'新增收货地址'
            }
        },
        components: {
            ListHeader,
        },
    }
</script>

<style scoped>

</style>