<template>
    <div>
        <el-dialog title="分配角色" :visible.sync="dialogVisibles" width="30%" :before-close="handleClose">
            <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="item in data" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="roleok">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { getEnabledRoles, getEnabledRolesapp, assignRole } from '@/api/permission'
export default {
    props: {
        activeID: {
            type: Number,
            default: null
        },
        dialogVisibles: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            checkList: [],
            data: []
        }
    },
    methods: {
        async getEnabledRoles() {
            console.log(this.activeID);
            let res = await getEnabledRoles()
            console.log(res);
            this.data = res.data.data
            let resa = await getEnabledRolesapp({ id: this.activeID })
            console.log(resa);
            this.checkList = resa.data.data.roleIds
        },
        roleok() {
            assignRole({ id: this.activeID, roleIds: this.checkList })
            this.$message.success('权限更新成功')
            this.$emit('update:dialogVisibles', false)
        },
        handleClose(done) {
            this.$emit('update:dialogVisibles', false)
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
