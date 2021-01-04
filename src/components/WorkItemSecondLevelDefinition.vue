<template>
  <div>
    <el-table :data="table_data">
      <el-table-column label="父类名称定义" prop="mainName"></el-table-column>
      <el-table-column label="子类名称定义" prop="subName"></el-table-column>
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
          mainName: '项目',
          subName: '预研',
          desc: '在项目开始前进行技术预研'
        },
        {
          mainName: '项目',
          subName: '开发',
          desc: '项目开发过程中Coding'
        },
        {
          mainName: '项目',
          subName: '测试',
          desc: '产品开发自测试'
        }
      ],
      canEdit: true
    }
  }
}
</script>
