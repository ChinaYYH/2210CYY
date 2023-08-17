<template>
    <div>
        <!-- <div style="width: 406px;"> -->
        <el-dialog style="width: 1000px;margin: 0 auto;" title="员工导入" :visible="dialogVisible" :before-close="handleClose">
            <div class="upload">
                <div class="drop">
                    <input @change="uploadadds" ref="excel-upload-input" class="excel-upload-input" type="file"
                        accept=".xlsx, .xls">
                    <i class="el-icon-upload" />
                    <el-button type="text">下载导入模板</el-button>
                    <span>将文件拖到此处或
                        <el-button type="text" @click="uploadadd">点击上传</el-button>
                    </span>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
    <!-- </div> -->
</template>

<script>
import { importEmployee } from '@/api/permission'
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: null
        }
    },
    data() {
        return {

        }
    },
    methods: {
        handleClose(done) {
            this.$emit('update:dialogVisible', false)
        },
        uploadadd() {
            this.$refs['excel-upload-input'].click()
        },
        async uploadadds(event) {
            // console.log(event.target.files);
            const files = event.target.files
            if (files.length > 0) {
                const data = new FormData()
                data.append('file', files[0])
                await importEmployee(data)
                this.$emit('getEmployeeList')
                this.$message.success('导入成功')
                this.$emit('update:dialogVisible', false)
                this.$refs['excel-upload-input'].value = ''
            }
        }
    },
    components: {

    },
    computed: {

    },
    filters: {

    },
    watch: {

    },
    created() {

    },
    mounted() {

    },
}
</script>

<style lang='scss' scoped>
.upload {
    margin: 0 auto;
    width: 80%;
    height: 170px;
    border: 1px dashed #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .excel-upload-input {
        display: none;
        z-index: -9999;
    }

    .drop {
        width: 100%;
        display: flex;
        flex-direction: column;
        line-height: 40px;
        color: #bbb;
        display: flex;
        align-items: center;

        i {
            font-size: 60px;
            display: block;
            color: #c0c4cc;
        }
    }
}
</style>
