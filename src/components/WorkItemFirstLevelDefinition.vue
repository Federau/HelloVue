<template>
  <div>
    <el-button class="topButton"
            size="medium"
            type="nomral"
            @click="handleAdd"
            >新增</el-button>
    <el-table :data="table_data">
      <el-table-column label="大类工作定义" prop="Name"></el-table-column>
      <el-table-column label="描述" prop="Description"></el-table-column>
      <el-table-column v-if="canEdit" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="showAdd" v-bind:title="popUpTitle"  :append-to-body="true"  :modal-append-to-body='false'>
       <add-or-update-first-work-define @Cancel="addOrUpdateCancel" @Confirm="Confirm" v-bind:model="TransModel"></add-or-update-first-work-define>
    </el-dialog>
  </div>
</template>
<style >
  .topButton{
    float: left;
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
<script>
import AddOrUpdateFirstWorkDefine from '../Popup/AddOrUpdateFirstWorkDefine.vue'
import http from '@/util/http'
import { Message } from 'element-ui'
export default {
  components: { AddOrUpdateFirstWorkDefine },
  data () {
    return {
      showAdd: false,
      model: {
        Name: '项目',
        Description: '定制项目制作'
      },
      table_data: [
        // {
        //   Id: 0,
        //   Name: '项目',
        //   Description: '定制项目'
        // },
        // {
        //   Id: 0,
        //   Name: '产品',
        //   Description: '伺服产品'
        // }
      ],
      canEdit: true,
      TransModel: {
        editModel: {
          Name: '',
          Description: ''
        },
        EditType: 0,
        NameDisable: true
      },
      popUpTitle: '新增大类工作'

    }
  },
  methods: {
    handleAdd: function () {
      this.popUpTitle = '新增大类工作'
      this.TransModel.editModel.Name = ''
      this.TransModel.editModel.Description = ''
      this.TransModel.EditType = 0
      this.TransModel.NameDisable = false
      this.showAdd = true
    },
    handleEdit: function (index, rowItem) {
      this.popUpTitle = '编辑大类工作'
      var obj = JSON.parse(JSON.stringify(rowItem))
      this.TransModel.editModel = obj
      this.TransModel.EditType = 1
      this.TransModel.NameDisable = true
      this.showAdd = true
    },
    addOrUpdateCancel: function () {
      this.showAdd = false
    },
    Confirm: function () {
      http.get('firstworkdefine/getbyuserid?id=4', '').then(res => {
        this.table_data = res.data.Data
        this.showAdd = false
      }).error(err => {
        Message.error(JSON.stringify(err))
      })
    },
    handleDelete: function (index, item) {
      http.delete('/firstworkdefine/delete?id=' + item.Id, '').then(res => {
        this.table_data.splice(index, 1)
        Message.success('删除成功!')
      }).error(err => {
        Message.error(JSON.stringify(err))
      })
    }
  },
  mounted () {
    this.Confirm()
  }
}
</script>
