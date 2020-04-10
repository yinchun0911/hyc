<template>
    <div class="failPayment">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content"></div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    export default {
        name: "failPayment",
        data(){
            return{
                title:'支付失败'
            }
        },
        components: {
            ListHeader,
        },
    }
</script>

<style scoped>

</style>