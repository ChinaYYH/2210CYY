<template>
    <div>
        <el-dialog title="提示" :visible.sync="display" width="30%" @close="
            $emit('update:display', false)">
            <el-tree :data="list" default-expand-all show-checkbox node-key="id" :default-checked-keys="permIds"
                :props="defaultProps" ref="treeRef">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="$emit('update:display', false)">取 消</el-button>
                <el-button type="primary" @click="roleqd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getrole, getroleall } from '../../../api/user'
import { transListToTreeData } from '../../../utils/index'
export default {
    props: ['display', 'allocation'],
    data() {
        return {
            permIds: [],
            list: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            }
        }
    },
    methods: {
        async getrol() {
            let res = await getrole({ id: this.allocation })
            this.permIds = res.data.data.permIds
            // this.$nextTick(() => {
            //     this.$refs.treeRef.setcheckedkeys(res.data.data.permIds)
            // })
        },
        async getroleall() {
            let res = await getroleall()
            this.list = transListToTreeData(res.data.data, 0)
        },




        roleqd() {
            this.permIds = []
            console.log(this.permIds, '1111');
            this.$emit('update:display', false)
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
        this.getroleall()
    },
    mounted() {

    },
}
</script>

<style lang='scss' scoped></style>
