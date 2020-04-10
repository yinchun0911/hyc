<template>
    <div class="successPayment">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content"></div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    export default {
        name: "successPayment",
        data(){
            return{
                title:'支付成功'
            }
        },
        components: {
            ListHeader,
        },
    }
</script>

<style scoped>

</style>