<template>
   <div style="padding: 20px;background-color: #f1f1f1;">
      <div style="padding: 20px;background-color: #fff;">
         <el-button type="primary" size="mini" style="margin-bottom: 10px;" @click="dialogVisible = true">添加角色</el-button>
         <el-dialog title="新增角色" :visible.sync="dialogVisible" width="34%" :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
               <el-form-item label="活动名称" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
               </el-form-item>
               <el-form-item label="开关" prop="state">
                  <el-switch v-model="ruleForm.state" :active-value="1" :inactive-value="0" active-color="#13ce66"
                     inactive-color="#ccc">
                  </el-switch>
               </el-form-item>
               <el-form-item label="活动形式" prop="description">
                  <el-input type="textarea" v-model="ruleForm.description"></el-input>
               </el-form-item>
               <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                  <el-button @click="resetForm('ruleForm')">取消</el-button>
               </el-form-item>
            </el-form>

         </el-dialog>
         <el-table :data="list" border highlight-current-row style="width: 100%;">
            <el-table-column prop="id" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="name" label="角色" width="200">
               <template #default="scope">
                  <el-input v-if="scope.row.edit == true" v-model="scope.row.editrow.name" placeholder="请输入内容"></el-input>
                  <span v-else> {{ scope.row.name }}</span>
               </template>
            </el-table-column>
            <el-table-column prop="state" label="启用" width="200">
               <template #default="scope">
                  <el-switch v-if="scope.row.edit == true" :active-value="1" :inactive-value="0"
                     v-model="scope.row.editrow.state" active-color="#13ce66" inactive-color="#ff4949">
                  </el-switch>
                  <div v-else>
                     {{ scope.row.state == 1 ? '已启用' : '未启用' }}
                  </div>
               </template>
            </el-table-column>
            <el-table-column prop="description" label="描述">
               <template #default="scope">
                  <!-- <el-form-item  label="活动形式"> -->
                  <el-input v-if="scope.row.edit == true" v-model="scope.row.editrow.description"
                     type="textarea"></el-input>
                  <!-- </el-form-item> -->
                  <span v-else>{{ scope.row.description }}</span>
               </template>
            </el-table-column>
            <el-table-column prop="address" label="操作">
               <template #default="scope">
                  <div v-if="scope.row.edit == true">
                     <el-button type="primary" size="mini" @click="addrow(scope.row)">确定</el-button>
                     <el-button type="primary" size="mini" @click="qx(scope.row)">取消</el-button>
                  </div>
                  <div v-else>
                     <el-button type="text" @click="codeapp(scope.row.id)">分配权限</el-button>
                     <el-button type="text" @click="bianjiedit(scope.row)">编辑</el-button>
                     <!-- <el-popconfirm reference confirm-button-text='确定' confirm="deladd(scope.row.id)"
                        cancel-button-text='取消' icon="el-icon-info" icon-color="red" title="这是一段内容确定删除吗？">
                        <el-button style="margin-left: 10px;" slot="reference" type="text">删除</el-button>
                     </el-popconfirm> -->
                     <el-popover placement="bottom" width="200" trigger="click">
                        <p>这是一段内容这是一段内容确定删除吗？</p>
                        <div style="text-align: right; margin: 0">
                           <el-button size="mini" slot="reference" type="text" @click="delqx">取消</el-button>
                           <el-button type="primary" slot="reference" size="mini"
                              @click="deladd(scope.row.id)">确定</el-button>
                        </div>
                        <el-button style="margin-left: 10px;" slot="reference" type="text">删除</el-button>
                        <!-- <el-button >click 激活</el-button>s -->
                     </el-popover>

                     <!-- <el-button @click="del(scope.row)" type="text">删除</el-button> -->
                  </div>

               </template>
            </el-table-column>
         </el-table>
         <el-dialog title="分配权限" :visible.sync="dialogVisibles" width="40%" :before-close="handleCloseapp">
            <el-tree :data="data" :props="defaultProps" default-expand-all>
               <span class="custom-tree-node" slot-scope="{ node }">
                  <el-checkbox v-model="node.data.edit" @change="dxk(node)"><span>{{ node.label }}</span></el-checkbox>
               </span>
            </el-tree>
            <span slot="footer" class="dialog-footer">
               <el-button size="mini" @click="qxgengxin">取 消</el-button>
               <el-button size="mini" type="primary" @click="quanxianadd">确 定</el-button>
            </span>
         </el-dialog>
         <div class="block" style="margin-top: 10px;text-align: center;">
            <el-pagination @size-change="mayList()" @current-change="mayList()" :current-page.sync="queryDate.page"
               :page-sizes="[1, 3, 5, 7]" :page-size.sync="queryDate.pagesize" layout=" prev, pager, next" :total="total">
            </el-pagination>
         </div>
      </div>
   </div>
</template>

<script>
import { listtotreedata } from '@/utils/index'
import { mayList, updateRole, addList, delList, xqList, qxList, fenpeiList } from '../../api/user'
export default {
   data() {
      return {

         queryDate: {
            page: 1,
            pagesize: 5
         },
         id: 1000,
         list: [],
         total: 0,
         dialogVisible: false,
         ruleForm: {
            name: '',
            state: 0,
            description: ''
         },
         defaultProps: {
            children: 'children',
            label: 'name'
         },
         dialogVisibles: false,
         visible: false,
         // sjfx: [],
         // 更新权限
         gxqx: [],
         res: [],
         data: [],
         ACTIVEID: 0,
         rules: {
            name: [
               { required: true, message: '请输入活动名称', trigger: 'blur' },
            ],
            description: [
               { required: true, message: '请输入活动名称', trigger: 'blur' },

            ],
         }
      }
   },
   methods: {
      async mayList() {
         let res = await mayList(this.queryDate)
         // console.log(res);
         this.list = res.data.data.rows
         this.total = res.data.data.total
         this.list.forEach(item => {
            this.$set(item, 'edit', false)
            this.$set(item, 'editrow', {
               name: item.name,
               state: item.state,
               description: item.description
            })
         })
      },
      deladd(id) {
         // console.log(id);
         delList({ id: id })
         this.$message.success('角色列表删除成功')
         this.visible = false
         this.mayList()

      },
      delqx() {
         // console.log(1);
         this.visible = false
      },
      handleClose(done) {
         this.$confirm('确认关闭？')
            .then(_ => {
               done();
            })
            .catch(_ => { });
      },
      submitForm(formName) {
         this.$refs[formName].validate((valid) => {
            if (valid) {
               let index = this.list.filter(i => i.name == this.ruleForm.name)
               // console.log(index);
               if (index.length != 0) {
                  this.$message.warning('用户昵称重复')
               } else {
                  addList({ ...this.ruleForm })
                  this.ruleForm = {}
                  this.$message.success('角色列表添加成功')
                  this.dialogVisible = false
                  this.mayList()
               }
            } else {
               // console.log('error submit!!');
               return false;
            }
         });
      },
      resetForm(formName) {
         this.$refs[formName].resetFields();
         this.dialogVisible = false
      },
      bianjiedit(row) {
         // console.log(row);
         row.edit = true
         row.editrow.name = row.name
         row.editrow.state = row.state
         row.editrow.description = row.description
      },
      qx(row) {
         row.edit = false
      },
      async addrow(row) {
         if (row.editrow.name && row.editrow.description) {
            await updateRole({ ...row.editrow, id: row.id })

            Object.assign(row, {
               ...row.editrow,
               edit: false
            })
            // row.edit = false
            this.$message.success('角色列表更新成功')
         } else {
            this.$message.warning('用户昵称用户描述为空')
         }
      },

      dxk(node) {
         // console.log(node, '123');
         node.data.edit != node.data.edit
         // console.log(node.data.edit);

         if (node.data.edit == true) {
            this.gxqx.push(
               node.data.id
            )
         } else {
            this.gxqx.forEach(i => {
               // console.log(i);
               if (i == node.data.id) {
                  let index = this.gxqx.findIndex(item => item == i)
                  // console.log(index);
                  this.gxqx.splice(index, 1)
               }
            })
         }

         console.log(this.gxqx);
      },
      // 权限分配
      // 所有权限
      async qxqxapp() {
         let res = await qxList()
         // console.log(res);
         res.data.data.forEach(item => {
            this.$set(item, 'edit', false)
         })
         this.data = listtotreedata(res.data.data, 0)
         // console.log(this.data);
      },
      // 选中
      async codeapp(id) {
         this.ACTIVEID = id
         this.dialogVisibles = true
         // 默认已拥有权限
         this.res = await xqList({ id: id })
         this.res.data.data.permIds.forEach(i => {
            this.data.forEach(item => {
               // console.log(item.id);
               if (item.id == i) {
                  item.edit = true
                  this.gxqx.push(
                     item.id
                  )
               }
               item.children.forEach(ele => {
                  if (ele.id == i) {
                     ele.edit = true
                     this.gxqx.push(
                        ele.id
                     )
                  }
               })
            })
         })
      },
      // 确定
      quanxianadd() {
         fenpeiList({ id: this.ACTIVEID, permIds: this.gxqx })
         this.gxqx = []
         this.flagList()
         this.dialogVisibles = false
      },
      // 取消
      qxgengxin() {
         // this.data.forEach(i => {
         //    i.edit = false
         //    i.children.forEach(item => {
         //       item.edit = false
         //    })
         // })
         this.gxqx = []
         this.flagList()
         this.dialogVisibles = false
      },
      // 
      handleCloseapp() {
         // this.data.forEach(i => {
         //    i.edit = false
         //    i.children.forEach(item => {
         //       item.edit = false
         //    })
         // })
         this.gxqx = []
         this.flagList()
         this.dialogVisibles = false
      },
      // 清空状态
      flagList() {
         this.res.data.data.permIds.forEach(i => {
            this.data.forEach(item => {
               // console.log(item.id);
               item.edit = false
               item.children.forEach(ele => {
                  ele.edit = false
               })
            })
         })
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
      this.mayList()
      this.qxqxapp()
   },
   mounted() {

   },
}
</script>

<style lang='scss' scoped></style>
