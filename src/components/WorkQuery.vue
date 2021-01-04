<template>
  <div class="container_1">
    <div class="head_1">
      <el-date-picker
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
          prop="date"
          width="180px"
        ></el-table-column>
        <el-table-column
          label="工作名称"
          prop="workName"
          width="160px"
        ></el-table-column>
        <el-table-column
          label="任务名称"
          prop="taskName"
          width="160px"
        ></el-table-column>
        <el-table-column
          label="时间"
          prop="Time"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="详细记录"
          prop="detail"
          minwidth="180px"
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
            <el-button
              size="mini"
              type="info"
              @click="handleAdd(scope.$index, scope.row)"
              >新增</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom_1">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage"  >
    </el-pagination>
    </div>
  </div>
</template>
<style scope>
.container_1{
    display: grid;
    grid-template-rows: auto auto auto;
    align-items: end;
}
.bottom_1{
  align-self: end;
  margin-top:10px
}
.table_1 {
  margin-top: 10px;
  width: 100%;
}
.head_1 {
  display: flex;
  align-content: center;
  margin-top:10px
}

.el-input {
  width: 200px;
  margin-left: 40px;
}
</style>
<script>
export default {
  data () {
    return {
      userName: 'Jim',
      DateRange: ['2020/12/1', '2020/12/31'],
      searchString: '',
      tableData: [
        {
          date: '2020/12/1',
          workName: 'E300T',
          taskName: '任务开发',
          detail: '二维图形编程',
          Time: 8
        },
        {
          date: '2020/12/2',
          workName: 'E300T',
          taskName: '任务开发',
          detail: '二维图形编程',
          Time: 8
        },
        {
          date: '2020/12/3',
          workName: 'E300T',
          taskName: '任务开发',
          detail: '二维图形编程',
          Time: 8
        },
        {
          date: '2020/12/4',
          workName: 'E300T',
          taskName: '任务开发',
          detail: '二维图形编程',
          Time: 8
        },
        {
          date: '2020/12/4',
          workName: 'E300T',
          taskName: '任务开发',
          detail: '二维图形编程',
          Time: 8
        },
        {
          date: '2020/12/4',
          workName: 'E300T',
          taskName: '任务开发',
          detail: '二维图形编程',
          Time: 8
        }
      ],
      pageSizes: [5, 10, 20],
      pageSize: 5,
      totalPage: 19,
      canEdit: true
    }
  },
  methods: {
    startsearch: function () {
      alert(JSON.stringify(this.DateRange) + this.searchString)
    },
    handleEdit: function (index, rowItem) {
      alert('Edit:' + index + JSON.stringify(rowItem))
    },
    handleDelete: function (index, rowItem) {
      alert('Delete:' + index + JSON.stringify(rowItem))
    },
    handleAdd: function (index, rowItem) {
      alert('add new Item')
    }
  }
}
</script>
