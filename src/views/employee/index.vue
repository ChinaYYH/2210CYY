<template>
   <div>
      <div style="display: flex;padding: 20px;background-color: #f6f6f6;height: 100vh;">
         <div style="width: 100%;background-color: #fff;height: 100%;display: flex;">
            <div style="width: 20.5%;padding: 20px;border-right: 1px solid #ccc;">
               <div>
                  <el-input @input="search" placeholder="搜索员工姓名全员搜索" prefix-icon="el-icon-search"
                     v-model="queryparams.keyword">
                  </el-input>
               </div>
               <el-tree :default-expand-all=true :highlight-current=true :auto-expand-parent=false
                  :expand-on-click-node=false style="width: 100%;height: 100%;" :data="data" :props="defaultProps">
                  <span class="custom-tree-node" slot-scope="{ node }">
                     <span @click="a(node.data.id)">{{ node.label }}</span>
                  </span>
               </el-tree>
            </div>

            <div style="padding: 20px;box-sizing: border-box;flex: 1;">
               <div style="text-align: right;margin-bottom: 10px;">
                  <el-button size="mini" v-removesapp="'permanent'" @click="$router.push('/employee/dateil')"
                     type="primary">添加员工</el-button>
                  <el-button size="mini" @click="excelr">excel导入</el-button>
                  <el-button size="mini" @click="excelc">excel导出</el-button>
               </div>
               <div style="width: 100%;">
                  <el-table :data="list" style="width: 100%">
                     <el-table-column align="center" label="头像" width="130">
                        <template #default="scope">
                           <img v-if="scope.row.staffPhoto" :src="scope.row.staffPhoto" alt="" width="30px">
                           <el-avatar style="background-color: #04c9be;" v-else>{{ scope.row.username.charAt(0)
                           }}</el-avatar>
                        </template>
                     </el-table-column>
                     <el-table-column prop="username" label="姓名" width="120">
                     </el-table-column>
                     <el-table-column prop="mobile" label="手机号" width="130">
                     </el-table-column>
                     <el-table-column prop="workNumber" label="工号" width="130">
                     </el-table-column>
                     <el-table-column prop="formOfEmployment" label="聘用形式" width="125">
                        <template #default="scope">
                           {{ scope.row.formOfEmployment == 1 ? '正式' : '非正式' }}
                        </template>
                     </el-table-column>
                     <el-table-column prop="departmentName" label="部门" width="120">
                     </el-table-column>
                     <el-table-column prop="timeOfEntry" label="入职时间" width="130">
                     </el-table-column>
                     <el-table-column prop="address" label="操作">
                        <template #default="scope">
                           <el-button @click="$router.push(`/employee/dateil/${scope.row.id}`)" type="text">查看</el-button>
                           <el-button @click="roleok(scope.row.id)" type="text">角色</el-button>
                           <el-button @click="del(scope.row.id)" type="text">删除</el-button>
                        </template>
                     </el-table-column>
                  </el-table>
                  <div class="block" style="text-align: right;">
                     <el-pagination @size-change="getEmployeeList()" @current-change="getEmployeeList()"
                        :current-page.sync="queryparams.page" :page-sizes="[100, 200, 300, 400]"
                        :page-size.sync="queryparams.pagesize" layout="total,  prev, pager, next" :total="total">
                     </el-pagination>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <excel @getEmployeeList="getEmployeeList" :dialogVisible.sync="dialogVisible"></excel>
      <roleqx ref="roleres" :dialogVisibles.sync="dialogVisibles" :activeID="activeID"></roleqx>
   </div>
</template>

<script>
import { appapp, } from '../../api/user'
import { getEmployeeList, delDetail, exportEmployee } from '../../api/permission'
import { listtotreedata } from '@/utils/index'
import router from '@/router'
import { saveAs } from 'file-saver';
import excel from './excel.vue';
import roleqx from './roleqx.vue'
export default {
   components: {
      excel,
      roleqx
   },
   data() {
      return {
         dialogVisible: false,
         data: [],
         defaultProps: {
            children: 'children',
            label: 'name'
         },
         dialogVisibles: false,
         queryparams: {
            departmentId: null,
            page: 1,//当前页码
            pagesize: 7,
            keyword: ""
         },
         total: 0,
         list: [],
         activeID: null,
         timer: null
      }
   },
   methods: {
      async appapp() {
         let res = await appapp()
         // console.log(res);
         // res.data.data.rows.forEach(item => {
         //    this.$set(item, 'edit', false)
         // })
         this.data = listtotreedata(res.data.data, 0)
      },
      async getEmployeeList() {
         let res = await getEmployeeList(this.queryparams)
         // console.log(res);
         this.list = res.data.data.rows
         this.total = res.data.data.total
      },
      search() {
         clearTimeout(this.timer)
         this.timer = setInterval(() => {
            this.queryparams.page = 1
            this.getEmployeeList()
         }, 1000)

      },
      a(node) {
         // console.log(node);
         this.queryparams.departmentId = node
         this.getEmployeeList()
      },
      del(id) {
         // console.log(id);
         delDetail({ id: id })
         this.$message.success('用户信息删除成功')
         this.getEmployeeList()

      },
      async excelc() {
         let res = await exportEmployee()
         // console.log(res);
         saveAs(res.data, '员工信息表.xlsx')
         this.$message.success('员工信息导出成功')
      },
      excelr() {
         this.dialogVisible = true
      },
      roleok(id) {
         this.activeID = id
         console.log(id);
         this.dialogVisibles = true
         this.$nextTick(() => {
            this.$refs.roleres.getEnabledRoles()
         })
      }
   },

   computed: {

   },
   filters: {

   },
   watch: {

   },
   created() {
      this.appapp()
      this.getEmployeeList()
   },
   mounted() {

   },
}
</script>

<style lang='scss' scoped></style>
