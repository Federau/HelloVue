<template>
  <div>
    <el-button class="topButton" size="medium" @click="handleAdd()"
      >新增</el-button
    >
    <el-table :data="tableData">
      <el-table-column
        label="大类工作类型"
        prop="FirstWorkDefineName"
      ></el-table-column>
      <el-table-column label="任务名称" prop="Name"></el-table-column>
      <el-table-column label="创建时间" prop="DatetimeCreated"></el-table-column>
      <el-table-column label="描述" prop="Description"></el-table-column>
      <el-table-column label="编辑">
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

    >
      <add-or-update-work-task-define
        @Cancel="addOrUpdateCancel"
        @Confirm="Confirm"
        v-bind:model="TransModel"
      ></add-or-update-work-task-define>
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
// import AddOrUpdateSecondWorkDefine from '../Popup/AddOrUpdateSecondWorkDefine.vue'
import AddOrUpdateWorkTaskDefine from '../Popup/AddOrUpdateWorkTaskDefine.vue'
import http from '@/util/http'
import { Message } from 'element-ui'
export default {
  components: { AddOrUpdateWorkTaskDefine },
  data () {
    return {
      popUpTitle: '新增工作任务',
      showPop: false,
      tableData: [
        {
          FirstWorkDefineName: '产品',
          Name: 'E300T',
          DatetimeCreated: '2019/10/1',
          Description: '液压折弯机'
        },
        {
          FirstWorkDefineName: '项目',
          Name: 'DXF',
          DatetimeCreated: '2019/10/1',
          Description: '图形处理软件'
        }
      ],
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
      }
    }
  },
  methods: {
    handleAdd: function () {
      this.TransModel.editType = 0
      this.TransModel.isAdd = true
      this.TransModel.isUpdate = false
      this.TransModel.editModel.Name = ''
      this.TransModel.editModel.Description = ''
      this.TransModel.editModel.FirstWorkDefineName = ''
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
    handleDelete: function (index, rowItem) {
      http.delete('/worktask/delete?id=' + rowItem.Id, '').then((res) => {
        this.tableData.splice(index, 1)
        Message.success('删除成功!')
      })
        .error((error) => {
          Message.error(JSON.stringify(error))
        })
    },
    handleEdit: function (index, rowItem) {
      this.TransModel.isAdd = false
      this.TransModel.isUpdate = true
      this.TransModel.editType = 1
      this.popUpTitle = '编辑工作任务'
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
    addOrUpdateCancel: function () {
      this.showPop = false
    },
    Cancel: function () {
      this.showPop = false
    },
    Confirm: function () {
      http.get('worktask/getbyuserid', '').then(res => {
        this.tableData = res.data.Data
        this.showPop = false
      }).error(e => {
        Message.error(JSON.stringify(e))
      })
    }
  },
  mounted () {
    this.Confirm()
  }
}
</script>
