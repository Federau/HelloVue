<template>
  <div>
    <el-form :model="model" label-width="90px">
      <el-form-item v-if="model.isUpdate" label="工作大类:">
        <el-input
          :disabled="true"
          v-model="model.editModel.FirstWorkDefineName"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="model.isAdd" label="工作大类:">
        <el-select
          v-model="model.editModel.FirstWorkDefineName"
          placeholder="请选择"
        >
          <el-option
            v-for="item in model.editModel.mainOptions"
            :key="item.Id"
            :label="item.Name"
            :value="item.Id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务名称">
        <el-input v-model="model.editModel.Name"></el-input>
      </el-form-item>
      <el-form-item label="任务描述" v-model="model.editModel.Name">
        <el-input
          :rows="4"
          type="textarea"
          v-model="model.editModel.Description"
        ></el-input>
      </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped>
.el-select {
  margin-left: -40px;
}
.el-input {
  margin-left: 0px;
}
</style>
<script>
import { Message } from 'element-ui'
import http from '@/util/http'
export default {
  props: {
    model: {
      title: '',
      editModel: {},
      isUpdate: false,
      isAdd: true,
      editType: 0
    }
  },
  methods: {
    onSubmit: function () {
      var obj = this.model.editModel
      // obj.FirstWorkDefineName.trim()
      // obj.Description.trim()
      // obj.Name.trim()
      if (obj.FirstWorkDefineName === '') {
        Message.error('大类工作名称为空')
        return
      }
      if (obj.Name === '') {
        Message.error('任务名称为空')
        return
      }
      if (obj.Description === '') {
        Message.error('描述为空')
        return
      }
      if (this.model.editType === 0) {
        obj.FirstLevelId = obj.FirstWorkDefineName
        obj.Id = 0
        http.post('/worktask/add', obj).then(s => {
          this.$emit('Confirm')
          Message.success('添加成功')
        }).error(e => {
          Message.error(JSON.stringify(e))
        })
      } else {
        http.post('worktask/update', this.model.editModel).then(res => {
          this.$emit('Confirm')
          Message.success('更新成功')
        }).error(e => {
          Message.error(JSON.stringify(e))
        })
      }
    }
  }
}
</script>
