<template>
    <div>
        <!-- :before-close="handleClose" -->
        <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <!-- <span slot="footer" class="dialog-footer"> -->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                <el-form-item label="部门名称" prop="name">
                    <el-input placeholder="2-10个字符" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="部门编码" prop="code">
                    <el-input placeholder="2-10个字符" v-model="ruleForm.code"></el-input>
                </el-form-item>

                <el-form-item label="部门负责人" prop="managerId">
                    <el-select v-model="ruleForm.managerId" placeholder="请选择部门负责人" style="width: 100%;">
                        <el-option v-for="item, index in nameguan" :key="index" :label="item.username"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门介绍" prop="introduce">
                    <el-input placeholder="1-100个字符" type="textarea" v-model="ruleForm.introduce"></el-input>
                </el-form-item>
                <el-form-item>
                    <div style="width: 100%;text-align: center;margin-left: -75px;">
                        <el-button @click="resetForm('ruleForm')">取 消</el-button>
                        <el-button type="primary" @click="qd('ruleForm')">确 定</el-button>
                    </div>
                </el-form-item>
            </el-form>
            <!-- </span> -->
        </el-dialog>
    </div>
</template>

<script>
import { listtotreedata } from '@/utils/index'
import { appapp1, appapp, addDepartment, updateDepartment } from '@/api/user';
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String
        },
        nameguan: {
            type: Array
        },
        activeID: {
            type: Number,
            default: null
        },
        // 编辑一
        // ruleForm: {

        // }
    },

    data() {
        const namevaildate = async (refs, value, callback) => {
            let result = await appapp()
            if (this.ruleForm.id) {
                result.data.data = result.data.data.filter(item => item.id !== this.ruleForm.id)
            }
            if (result.data.data.some(item => item.name === value)) {
                // if (this.title == '新增部门') {
                callback(new Error("部门中已经有该名称"))

                // } else {
                // callback()
                // }
            } else {
                callback()
            }
        }
        const codevaildate = async (refs, value, callback) => {
            let result = await appapp()
            if (this.ruleForm.id) {
                result.data.data = result.data.data.filter(item => item.id !== this.ruleForm.id)
            }
            if (result.data.data.some(item => item.code === value)) {
                // if (this.title == '新增部门') {
                callback(new Error("部门中已经有该编号"))
                // } else {
                // callback()
                // }

            } else {
                callback()
            }
        }
        return {


            ruleForm: {
                name: "",
                code: "",
                managerId: "",
                introduce: "",
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
                    { validator: namevaildate }
                ],
                code: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
                    { validator: codevaildate }
                ],
                managerId: [
                    { required: true, message: '请输入', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                introduce: [
                    { required: true, message: '请填写部门介绍', trigger: 'blur' },

                ]
            }

        }
    },
    methods: {
        // done
        handleClose() {
            this.$emit('update:dialogVisible', false)
            // this.$emit('update:ruleForm', {})
            this.ruleForm = {}
        },
        resetForm() {
            this.$emit('update:dialogVisible', false)
            // this.$emit('update:ruleForm', {})
            this.ruleForm = {}
            // this.dialogVisible=false
        },

        qd(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    if (this.title == '新增部门') {
                        await addDepartment({ ...this.ruleForm, pid: this.activeID })
                        this.$emit('appapp')
                        // this.$emit('update:ruleForm', {})
                        this.ruleForm = {}
                        this.$emit('update:dialogVisible', false)
                    } else if (this.title == '编辑部门') {
                        await updateDepartment({ ...this.ruleForm })
                        this.$emit('appapp')
                        // this.$emit('update:ruleForm', {})
                        this.$message.success('编辑成功')
                        this.ruleForm = {}
                        this.$emit('update:dialogVisible', false)
                    } else if (this.title == '删除部门') {
                        this.$emit('update:dialogVisible', false)
                    }
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        async bianji() {
            // console.log(this.activeID);
            let res = await appapp1({ id: this.activeID })
            // console.log(res);
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
