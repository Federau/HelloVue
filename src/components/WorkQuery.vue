<template>
  <div class="container_1">
    <div class="head_1">
      <el-button style="margin-left: 10px" size="medium" @click="handleAdd()"
        >新增</el-button
      >
      <el-date-picker
        style="margin-left: 100px"
        v-model="DateRange"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-input
        v-model="searchString"
        placeholder="搜索内容"
        @keydown.enter.native="startsearch"
        prefix-icon="el-icon-search"
      />
      <el-button style="width: 150px; margin-left: 100px" @click="startsearch"
        >搜索</el-button
      >
    </div>
    <div class="table_1">
      <el-table :data="tableData">
        <el-table-column
          label="日期"
          prop="WorkDate"
          :formatter="formatDate"
          width="180px"
        ></el-table-column>
        <el-table-column
          label="任务名称"
          prop="TaskName"
          width="160px"
        ></el-table-column>
        <el-table-column
          label="子项"
          prop="SecondLevelName"
          width="160px"
        ></el-table-column>
        <el-table-column
          label="时间"
          prop="TimeCost"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="详细记录"
          prop="Detail"
          min-width="180px"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">
            <div style="cursor: pointer">
              {{ scope.row.Detail }}
            </div>
          </template> -->
        </el-table-column>
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
    </div>
    <div class="bottom_1">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
      >
      </el-pagination>
    </div>
    <el-dialog
      :visible.sync="showPop"
      v-bind:title="popUpTitle"
      :append-to-body="true"
      :modal-append-to-body="false"
    >
      <add-or-update-work-record
        @Cancel="addOrUpdateCancel"
        @Confirm="Confirm"
        v-bind:model="TransModel"
      ></add-or-update-work-record>
    </el-dialog>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import AddOrUpdateWorkRecord from '../Popup/AddOrUpdateWorkRecord.vue'
import http from '../util/http'
export default {
  components: { AddOrUpdateWorkRecord },
  data () {
    return {
      showPop: false,
      popUpTitle: '新增工作记录',
      TransModel: {
        isAdd: true,
        isUpdate: true,
        editModel: {
          Id: 0,
          TaskName: '',
          TaskId: -1,
          Name: '',
          SecondLevelName: '',
          SecondLevelId: -1,
          Description: '',
          DateTimeCreated: '',
          UserCreated: 0,
          TimeCost: 8,
          WorkDate: '',
          Detail: '',
          TaskOptions: [],
          SecondLevelOptions: []
        }
      },
      userName: 'Jim',
      searchString: '',
      DateRange: [],
      tableData: [],
      pageSizes: [5, 10, 20],
      pageSize: 5,
      totalPage: 19,
      canEdit: true,
      currentPage: 1
    }
  },
  methods: {
    startsearch: function () {
      this.Confirm()
    },

    handleDelete: function (index, rowItem) {
      http
        .delete('workrecord/delete?id=' + rowItem.Id, '')
        .then((res) => {
          Message.success('删除成功!')
          this.Confirm()
        })
        .error((error) => {
          Message.error(error)
        })
    },
    handleCurrentChange: function (cur) {
      this.currentPage = cur
      this.Confirm()
    },
    handleSizeChange: function (size) {
      this.pageSize = size
      this.Confirm()
    },
    handleEdit: function (index, rowItem) {
      this.TransModel.isAdd = false
      this.TransModel.isUpdate = true
      this.TransModel.editModel.TaskName = rowItem.TaskName
      this.TransModel.editModel.Id = rowItem.Id
      this.TransModel.editModel.SecondLevelName = rowItem.SecondLevelName
      this.TransModel.editModel.SecondLevelId = rowItem.SecondLevelId
      this.TransModel.editModel.TaskId = rowItem.TaskId
      this.TransModel.editModel.Description = rowItem.Description
      this.TransModel.editModel.TimeCost = rowItem.TimeCost
      this.TransModel.editModel.Detail = rowItem.Detail
      this.TransModel.editModel.WorkDate = rowItem.WorkDate
      this.TransModel.editModel.DateTimeCreated = rowItem.DateTimeCreated
      this.TransModel.editModel.UserCreated = rowItem.UserCreated
      this.showPop = true
      // http
      //   .get('worktask/getbyuserid', '')
      //   .then((res) => {
      //     this.TransModel.editModel.TaskOptions = res.data.Data
      //     var firtLevelId = -1
      //     for (
      //       var i = 0;
      //       i < this.TransModel.editModel.TaskOptions.length;
      //       i++
      //     ) {
      //       if (
      //         this.TransModel.editModel.TaskOptions[i].Id === rowItem.TaskId
      //       ) {
      //         firtLevelId = this.TransModel.editModel.TaskOptions[i]
      //           .FirstLevelId
      //         break
      //       }
      //     }
      //     http
      //       .get('/secondworkdefine/getbyfirstlevelid?id=' + firtLevelId, '')
      //       .then((re) => {
      //         this.TransModel.editModel.SecondLevelOptions = re.data.Data
      //         this.showPop = true
      //       })
      //       .error((e) => {
      //         Message.error(e)
      //       })
      //   })
      //   .error((er) => {
      //     Message.error(er)
      //   })
    },
    handleAdd: function () {
      this.TransModel.isAdd = true
      this.TransModel.isUpdate = false
      this.TransModel.editModel.TaskOptions = ''
      this.TransModel.editModel.SecondLevelOptions = ''
      this.TransModel.editModel.SecondLevelName = ''
      this.TransModel.editModel.TaskName = ''
      this.TransModel.editModel.Detail = ''
      var date = new Date()
      this.TransModel.editModel.WorkDate = date.toLocaleDateString()
      http.get('worktask/getbyuserid', '').then((res) => {
        this.TransModel.editModel.TaskOptions = res.data.Data
        this.showPop = true
      })
    },
    addOrUpdateCancel: function () {
      this.showPop = false
    },
    getQueryCondition: function () {
      var begin = new Date(this.DateRange[0]).toLocaleDateString()
      var end = new Date(this.DateRange[1]).toLocaleDateString()
      return (
        '?userID=1&itemsPerPage=' +
        this.pageSize +
        '&curPage=' +
        this.currentPage +
        '&begin=' +
        begin +
        '&end=' +
        end +
        '&search=' +
        this.searchString
      )
    },
    Confirm: function () {
      var condition = this.getQueryCondition()
      http
        .get('/workrecord/get' + condition, '')
        .then((res) => {
          this.tableData = res.data.Data.Data
          this.totalPage = res.data.Data.TotalPages
          this.currentPage = res.data.Data.CurPage
          this.showPop = false
        })
        .error((error) => {
          Message.error(JSON.stringify(error))
        })
    },
    formatDate (row, column) {
      // 获取单元格数据
      var data = row[column.property]
      if (data == null) {
        return null
      }
      let dt = new Date(data)
      var str =
        dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
      return str
    }
  },
  mounted () {
    var date = new Date()
    var begin = date.getFullYear() + '/' + (date.getMonth() + 1) + '/01'
    this.DateRange = [
      new Date(begin).toLocaleDateString(),
      new Date().toLocaleDateString()
    ]
    this.Confirm()
  }
}
</script>
<style scope>
.container_1 {
  display: grid;
  grid-template-rows: auto auto auto;
  align-items: end;
}
.bottom_1 {
  align-self: end;
  margin-top: 10px;
}
.table_1 {
  margin-top: 10px;
  width: 100%;

}
.head_1 {
  display: flex;
  align-content: center;
  margin-top: 10px;
}

.el-input {
  width: 200px;
  margin-left: 40px;
}
</style>
