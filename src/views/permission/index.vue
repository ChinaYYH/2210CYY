<template>
   <div style="background-color: #f6f6f6;width: 100%;min-height: 100vh;padding: 20px;">
      <div style="width: 100%;background-color: #fff;min-height: 100vh;padding: 20px;">
         <el-button @click="addpermission" style="margin-bottom: 10px;" type="primary" size="mini">添加权限</el-button>
         <div>
            <el-table :data="data" row-key="id" border lazy :tree-props="{ children: 'children' }" style="width: 100%">
               <el-table-column prop="name" label="名称" width="320">
               </el-table-column>
               <el-table-column prop="code" label="标识" width="320">
               </el-table-column>
               <el-table-column prop="description" label="描述">
               </el-table-column>
               <el-table-column label="操作">
                  <template #default="scope">
                     <el-button @click="apppermissionapp(scope.row.id)" v-if="scope.row.pid == 0"
                        type="text">添加</el-button>
                     <el-button @click="editList(scope.row.id)" type="text">编辑</el-button>
                     <el-button @click="del(scope.row.id)" type="text">删除</el-button>
                  </template>
               </el-table-column>
            </el-table>
         </div>
      </div>
      <computedapp ref="respermission" :active="active" :title="title" :activeID="activeID"
         @permissionList="permissionList" :flag.sync="flag"></computedapp>
   </div>
</template>

<script>
import { permissionList, delpermissonrow } from '@/api/qx';
import { listtotreedatas } from '@/utils/index'
import computedapp from './components/index.vue'
export default {
   components: {
      computedapp
   },
   data() {
      return {
         data: [],
         flag: false,
         activeID: null,
         title: '新增权限点',
         active: null
      }
   },
   methods: {
      async permissionList() {
         // console.log(1);
         let res = await permissionList()
         // console.log(res);
         this.data = listtotreedatas(res.data.data, 0)
      },
      addpermission() {
         this.flag = true
         this.title = '新增权限点'
      },
      apppermissionapp(id) {
         this.flag = true
         this.activeID = id
         this.title = '新增权限点'
      },
      editList(id) {
         this.flag = true
         this.active = id
         this.title = '编辑权限点'
         this.$nextTick(() => {
            this.$refs.respermission.activeaaaaa()
         })
      },
      del(id) {
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
         }).then(() => {
            delpermissonrow({ id: id })
            this.permissionList()
            this.$message({
               type: 'success',
               message: '删除成功!'
            });
         }).catch(() => {
            this.$message({
               type: 'info',
               message: '已取消删除'
            });
         });

      }
   },

   computed: {

   },
   filters: {

   },
   watch: {

   },
   created() {
      this.permissionList()
   },
   mounted() {

   },
}
</script>

<style lang='scss' scoped></style>
