<template>
  <div>
    <el-table :data="table_data">
      <el-table-column label="工作名称定义" prop="name"></el-table-column>
      <el-table-column label="工作类型描述" prop="desc"></el-table-column>
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
</template>
<script>
export default {
  data () {
    return {
      table_data: [
        {
          name: '项目',
          desc: '定制项目'
        },
        {
          name: '产品',
          desc: '伺服产品'
        }
      ],
      canEdit: true
    }
  }
}
</script>
