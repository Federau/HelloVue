<template>
  <div>
    <el-form :model="model" label-width="90px">
      <el-form-item v-if="model.isUpdate" label="大类工作项:">
        <el-input
          :disabled="true"
          v-model="model.editModel.FirstWorkDefineName"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="model.isAdd" label="大类工作项:">
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
      <el-form-item label="小类工作项:">
        <el-input v-model="model.editModel.Name"></el-input>
      </el-form-item>
      <el-form-item label="描述:">
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
      isUpdate: true,
      isAdd: true,
      editType: 0
    }
  },
  data () {
    return {

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
        Message.error('小类工作名称为空')
        return
      }
      if (obj.Description === '') {
        Message.error('描述为空')
        return
      }
      if (this.model.editType === 0) {
        obj.FirstLevelId = obj.FirstWorkDefineName
        obj.Id = 0
        http.post('/secondworkdefine/add', obj).then(res => {
          if (res.data.Success) {
            Message.info('操作成功!')
            this.$emit('Confirm')
          }
        }).error(error => {
          Message.error(JSON.stringify(error))
        })
      } else {
        http.post('secondworkdefine/update', obj).then(res => {
          if (res.data.Success) {
            Message.info('操作成功!')
            this.$emit('Confirm')
          }
        }).error(error => {
          Message.error(JSON.stringify(error))
        })
      }
    },
    onCancel: function () {
      this.$emit('Cancel')
    }
  }
}
</script>
