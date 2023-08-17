<template>
    <div>
        <div style="display: flex;justify-content: center;align-items: center;">
            <el-tree :default-expand-all=true :highlight-current=true :auto-expand-parent=false :expand-on-click-node=false
                style="width: 80%;" :data="data" :props="defaultProps">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span style="position: relative;">
                        <el-button class="aaaa" type="text" size="mini" @click="() => append(data)">
                            {{ data.managerName }}
                        </el-button>
                        <el-button type="text" size="mini">
                            <el-dropdown @command="handleCommand($event, data.id)">
                                <span class="el-dropdown-link">
                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="a">添加子部门</el-dropdown-item>
                                    <el-dropdown-item :command="data.id">编辑部门</el-dropdown-item>
                                    <el-dropdown-item command="c">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-button>
                    </span>
                </span>
            </el-tree>
        </div>
        <!-- :ruleForm.sync="ruleForm" 编辑--***** -->
        <motaikuang ref="bianjiapp" @appapp="appapp" :dialogVisible.sync="dialogVisible" :title="title" :nameguan="nameguan"
            :activeID="activeID">
        </motaikuang>
    </div>
</template>

<script>
// 映射
import { mapState } from 'vuex';
import { listtotreedata } from '@/utils/index'
import { appapp, delDepartment } from '@/api/user';
import motaikuang from '@/layout/components/Sidebar/motaikuang.vue';
export default {
    components: {
        motaikuang
    },
    data() {
        return {
            // ruleForm: {
            //     name: "",
            //     code: "",
            //     managerId: "",
            //     introduce: "",
            // },
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            data: [],
            dialogVisible: false,
            title: '新增部门',
            activeID: -1
        }
    },
    methods: {
        async appapp() {
            let res = await appapp()
            this.data = listtotreedata(res.data.data, 0)
            // console.log(this.data);
        },
        // remove(node, data) {
        //     console.log(data.id);
        //     this.activeID = data.id
        //     this.flag = !this.flag
        // },
        handleCommand(command, id) {
            // console.log(command);
            // console.log(id);
            this.activeID = id
            if (command == 'a') {
                this.dialogVisible = true
                this.title = '新增部门'
            } else if (command == 'c') {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delDepartment({ id: id })
                    this.appapp()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.appapp()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

                // this.dialogVisible = true
                // this.title = '删除部门'
            } else {
                // console.log(command.managerName);
                // 第一种*************
                // this.dialogVisible = true
                // this.title = '编辑部门'
                // this.ruleForm = JSON.parse(JSON.stringify(command))
                // console.log(this.ruleForm, '123456');
                // 第二种*************
                // console.log(command);
                this.dialogVisible = true
                this.title = '编辑部门'
                this.activeID = command
                this.$nextTick(() => {
                    this.$refs.bianjiapp.bianji()
                })

            }
            // console.log(tabindex);

        },



    },
    computed: {
        // 展开
        ...mapState('appapp', ['nameguan'])

    },
    filters: {

    },
    watch: {

    },
    created() {
        this.appapp()
    },
    mounted() {

    },
}
</script>

<style lang='scss' scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    color: black;
}

.custom-tree-node:hover {
    color: rgb(0, 140, 255);
}

.custom-tree-node:hover .el-button--text {
    color: rgb(0, 140, 255) !important;
}

.el-button--text {
    color: black !important;
}
</style>
