<template>
    <div>
        <div style="width: 470px;padding-left: 120px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="工号">
                    <el-input v-model="ruleForm.workNumber" disabled></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="departmentId">
                    <cascaderxz style="width: 100%;" v-model="ruleForm.departmentId"></cascaderxz>
                </el-form-item>
                <el-form-item label="聘用形式" prop="formOfEmployment">
                    <el-select style="width: 100%;" v-model="ruleForm.formOfEmployment" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入职时间" prop="timeOfEntry">
                    <el-date-picker style="width: 100%;" v-model="ruleForm.timeOfEntry" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="转正时间" prop="correctionTime">
                    <el-date-picker style="width: 100%;" v-model="ruleForm.correctionTime" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="员工头像">
                    <!-- <el-input v-model="ruleForm.name"></el-input> -->
                    <!-- <img style="width: 50px;height: 50px;border-radius: 5px;" v-if="ruleForm.staffPhoto"
                        :src="ruleForm.staffPhoto" alt="">
                    <input v-else type="file" @change="undateapp"> -->
                    <!-- https://jsonplaceholder.typicode.com/posts/ -->
                    <!-- /api/sys/user -->
                    <images v-model="ruleForm.staffPhoto"></images>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" size="mini">{{ $route.params.id ? '保存更新' :
                        '保存'
                    }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { addEmployee, getEmployeeDetail, bianjiDetail } from '../../api/permission'
import cascaderxz from '../../layout/components/cascaderxz';
import moment from 'moment'
import images from './images.vue';
export default {
    components: {
        cascaderxz,
        images
    },

    data() {
        const corrTimeValidate = (rule, value, callback) => {
            if (this.ruleForm.timeOfEntry) {
                if (new Date(this.ruleForm.timeOfEntry) > new Date(value)) {
                    callback(new Error('转正时间不能小于入职时间'))
                    return
                }
            }
            callback()
        }
        return {

            ruleForm: {
                username: '',
                mobile: '',
                departmentId: null,
                formOfEmployment: '',
                correctionTime: '',
                timeOfEntry: '',
                staffPhoto: '',
                workNumber: ''

            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
                ],
                departmentId: [
                    { required: true, message: '请输入部门', trigger: 'blur' },
                ],
                formOfEmployment: [
                    { required: true, message: '请输选择聘用形式', trigger: 'blur' },
                ],
                correctionTime: [
                    { required: true, message: '请选择转正时间', trigger: 'blur' },
                    { validator: corrTimeValidate }

                ],
                timeOfEntry: [
                    { required: true, message: '请选择入职时间', trigger: 'blur' },

                ],
            },
            options: [{
                value: 1,
                label: '正式'
            }, {
                value: 2,
                label: '非正式'
            },]
        }
    },
    methods: {

        app(val) {
            let a = moment(val).format('YYYY-MM-DD');
            // console.log(a);
            return a
        },
        submitForm(formName) {
            // this.app()
            this.ruleForm.correctionTime = this.app(this.ruleForm.correctionTime)
            this.ruleForm.timeOfEntry = this.app(this.ruleForm.timeOfEntry)
            // console.log(this.ruleForm);
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    if (this.$route.params.id) {
                        await bianjiDetail({ ...this.ruleForm })
                        this.$message.success('用户信息保存成功')
                        this.$router.push('/employee')
                    } else {
                        await addEmployee({ ...this.ruleForm })
                        this.$message.success('用户信息添加成功')
                        this.$router.push('/employee')
                    }

                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        async getEmployeeDetail() {
            let res = await getEmployeeDetail(this.$route.params.id)
            // console.log(res);
            this.ruleForm = res.data.data
            // console.log(this.ruleForm);
        },




    },

    computed: {

    },
    filters: {

    },
    watch: {

    },
    created() {
        this.$route.params.id && this.getEmployeeDetail()
    },
    mounted() {

    },
}
</script>

<style lang='scss' scoped></style>
