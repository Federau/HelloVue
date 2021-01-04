<template>
  <div>
    <el-table :data="tableData">
      <el-table-column label="工作定义类型" prop="firstLevelDef"></el-table-column>
      <el-table-column label="任务名称" prop="taskName"></el-table-column>
      <el-table-column label="创建时间" prop="createdTime"></el-table-column>
      <el-table-column label="描述" prop="desc"></el-table-column>
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
</template>
<script>
export default {
  data () {
    return {
      tableData: [
        {
          firstLevelDef: '产品',
          taskName: 'E300T',
          createdTime: '2019/10/1',
          desc: '液压折弯机'
        },
        {
          firstLevelDef: '项目',
          taskName: 'DXF',
          createdTime: '2019/10/1',
          desc: '图形处理软件'
        }
      ]
    }
  }
}
</script>
