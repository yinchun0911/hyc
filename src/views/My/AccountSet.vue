<template>
    <div class="accountSet">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content"></div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    export default {
        name: "accountSet",
        data(){
            return{
                title:'账户设置'
            }
        },
        components: {
            ListHeader,
        },
    }
</script>

<style scoped>

</style>