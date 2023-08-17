<template>
    <div>
        <el-dialog :title="title" :visible.sync="flag" width="50%" :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="权限名称" prop="name">
                    <el-input style="width: 90%;" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="权限标识" prop="code">
                    <el-input style="width: 90%;" v-model="ruleForm.code"></el-input>
                </el-form-item>
                <el-form-item label="权限描述" prop="description">
                    <el-input style="width: 90%;" v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item label="开启">
                    <el-switch :active-value="2" :inactive-value="1" v-model="ruleForm.type" active-color="#13ce66">
                    </el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>
</template>

<script>
import { permissionLists, editpermisson, editpermissonrow } from '@/api/qx'
export default {
    props: {
        flag: {
            type: Boolean,
            default: false
        },
        activeID: {
            type: Number,
            default: null
        },
        active: {
            type: Number,
            default: null
        },
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            ruleForm: {
                code: "",
                description: "",
                enVisible: 0,
                name: '',
                pid: 0,
                type: null
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                code: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.title == '新增权限点') {
                        if (this.activeID) {
                            // console.log(this.activeID);
                            // console.log(this.ruleForm);
                            this.ruleForm.pid = this.activeID
                            permissionLists(this.ruleForm)
                            this.$emit('permissionList')
                            this.$message.success('添加权限成功')
                            this.ruleForm = {}
                            this.$emit('update:flag', false)
                            
                        } else {
                            // console.log({ ...this.ruleForm });
                            this.ruleForm.pid = 0
                            permissionLists(this.ruleForm)
                            this.$emit('permissionList')
                            this.$message.success('添加权限成功')
                            this.ruleForm = {}
                            this.$emit('update:flag', false)
                            
                        }
                    } else if (this.title == '编辑权限点') {
                        editpermissonrow({ ...this.ruleForm })
                        this.$emit('permissionList')
                        this.$message.success('编辑权限成功')
                        this.ruleForm = {}
                        this.$emit('update:flag', false)
                        
                    }

                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.ruleForm = {}
            this.$emit('update:flag', false)
        },
        handleClose() {
            this.ruleForm = {}
            this.$emit('update:flag', false)
        },
        async activeaaaaa() {
            let res = await editpermisson(this.active)
            // console.log(res);..
            this.ruleForm = res.data.data
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

<style lang='scss' scoped></style>
