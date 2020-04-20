<template>
    <div class="proposal">
        <ListHeader :title="title" :showHeadFr="false"></ListHeader>
        <div class="content">
            <div class="textarea">
                <el-input
                        type="textarea"
                        placeholder="请输入您遇到的问题或建议"
                        v-model="textarea"
                        :rows="8">
                </el-input>
            </div>
            <div class="update">
                <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :before-upload="beforeAvatarUpload"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                    <div class="el-upload__tip" slot="tip">最多5张</div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
            <div class="btns">
                <button @click="save()">立即提交</button>
            </div>
        </div>
    </div>
</template>

<script>
    import ListHeader from '@/components/ListHeader.vue'
    import { request, userRequest ,getRemotHost} from '@/js/request.js'
    import { Dialog } from 'vant'
    export default {
        name: "proposal",
        data(){
            return{
                title:'投诉建议',
                textarea:'',
                dialogImageUrl: '',
                dialogVisible: false,
                imageUpload:""
            }
        },
        methods: {
            save(){
                var page=this;
                /*if(page.imageUpload==""){
                    Dialog({ message: "请至少上传1张问题/建议相关图片" });
                    return null;
                }*/
                if(page.textarea==""){
                    Dialog({ message: "请留下您宝贵的建议" });
                    return;
                }
                var suggestion=page.textarea
                userRequest("/appUserCommon/saveUserSuggestion",{suggestion,pic1:"暂时没有图片"}).then(function(){
                          Dialog({ message: "提交成功，感谢您的支持与信任" });
                          page.$router.push("setup");

                });

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            beforeAvatarUpload(){ return false},
            handlePictureCardPreview(file) {
                this.imageUpload="1";
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        },
        components: {
            ListHeader,
        },
    }
</script>

<style lang="less">
    .proposal{
        .content{
            margin-top: 1.08rem;
            padding: 0 .2rem .2rem .2rem;
            .textarea{
                width: 100%;
                background-color: #fff;
                .el-textarea__inner{
                   border: 0;
                }
            }
            .update{
                width: 100%;
                background-color: #fff;
                border-radius: .2rem;
                margin-top: .3rem;
                padding: .3rem;
                .el-upload--picture-card{
                    width: 1.48rem;
                    height: 1.48rem;
                    line-height: 1.46rem;
                }
                .el-upload__tip{
                    font-size: .24rem;
                    color: #b2b2b2;
                    padding-left: .2rem;
                }
            }
            .btns {
                padding: 0 .2rem;
                margin-top: 1.4rem;
                button {
                    width: 100%;
                    height: .8rem;
                    line-height: .8rem;
                    text-align: center;
                    font-size: .3rem;
                    margin-bottom: .45rem;
                    border-radius: .4rem;
                    background-color: #83b7ff;
                    color: #fff;
                    border: 0;
                }
            }
        }
    }
    .el-upload-list--picture-card .el-upload-list__item{
        width: 1.48rem !important;
        height: 1.48rem !important;
    }
</style>