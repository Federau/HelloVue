<template>
  <div>
    <el-button class="topButton" size="medium" @click="handleAdd()"
      >新增</el-button
    >
    <el-table :data="table_data">
      <el-table-column
        label="大类工作定义"
        prop="FirstWorkDefineName"
      ></el-table-column>
      <el-table-column label="小类工作定义" prop="Name"></el-table-column>
      <el-table-column
        label="描述"
        prop="Description"
      ></el-table-column>
      <el-table-column v-if="canEdit" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="showPop"
      v-bind:title="popUpTitle"
      :append-to-body="true"
      :modal-append-to-body="false"
    >
      <add-or-update-second-work-define
        @Cancel="addOrUpdateCancel"
        @Confirm="Confirm"
        v-bind:model="TransModel"
      ></add-or-update-second-work-define>
    </el-dialog>
  </div>
</template>
<style scope>
.topButton {
  float: left;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
<script>
import AddOrUpdateSecondWorkDefine from '../Popup/AddOrUpdateSecondWorkDefine.vue'
import http from '@/util/http'
import { Message } from 'element-ui'
export default {
  components: { AddOrUpdateSecondWorkDefine },
  data () {
    return {
      showPop: false,
      popUpTitle: '增加小类工作项',
      TransModel: {
        editModel: {
          FirstWorkDefineName: '',
          FirstLevelId: -1,
          Name: '',
          Description: '',
          mainOptions: [
            {
              Name: '项目',
              Id: 1
            },
            {
              Id: 2,
              Name: '产品'
            }
          ]
        },
        isAdd: true,
        isUpdate: true,
        editType: 0
      },
      table_data: [],
      canEdit: true
    }
  },
  methods: {
    handleAdd: function () {
      this.TransModel.isAdd = true
      this.TransModel.isUpdate = false
      this.TransModel.editType = 0
      this.TransModel.editModel.FirstWorkDefineName = ''
      this.TransModel.editModel.Description = ''
      this.TransModel.editModel.Name = ''
      this.popUpTitle = '增加小类工作'
      http
        .get('firstworkdefine/getbyuserid?id=4', '')
        .then((res) => {
          this.TransModel.editModel.mainOptions = res.data.Data
          this.showPop = true
        })
        .error((err) => {
          Message.error(JSON.stringify(err))
        })
    },
    handleEdit: function (rowIndex, rowItem) {
      this.TransModel.isAdd = false
      this.TransModel.isUpdate = true
      this.TransModel.editType = 1
      this.popUpTitle = '编辑小类工作'
      var obj = JSON.parse(JSON.stringify(rowItem))
      this.TransModel.editModel = obj
      http
        .get('firstworkdefine/getbyuserid?id=4', '')
        .then((res) => {
          this.TransModel.editModel.mainOptions = res.data.Data
          this.showPop = true
        })
        .error((err) => {
          Message.error(JSON.stringify(err))
        })
    },
    handleDelete: function (rowIndex, rowItem) {
      http
        .delete('/secondworkdefine/delete?id=' + rowItem.Id, '')
        .then((res) => {
          this.table_data.splice(rowIndex, 1)
          Message.success('删除成功!')
        })
        .error((error) => {
          Message.error(JSON.stringify(error))
        })
    },
    addOrUpdateCancel: function () {
      this.showPop = false
    },
    Confirm: function () {
      http
        .get('/secondworkdefine/getbyuserid?id=-1', '')
        .then((res) => {
          if (res.data.Success) {
            this.table_data = res.data.Data
            this.showPop = false
          } else {
            Message.error(res.data.Message)
          }
        })
        .error((error) => {
          Message.error(JSON.stringify(error))
        })
    }
  },
  mounted () {
    this.Confirm()
  }
}
</script>
