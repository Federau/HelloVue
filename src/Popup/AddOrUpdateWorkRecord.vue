<template>
  <div>
    <el-form :model="model" label-width="90px">
      <el-form-item v-if="model.isAdd" label="任务名称">
        <el-select
          style="margin-left: -40px"
          v-model="model.editModel.TaskName"
          placeholder="请选择"
          @change="selectOne"
        >
          <el-option
            v-for="item in model.editModel.TaskOptions"
            :key="item.Id"
            :label="item.Name"
            :value="item.Id"
          >
          </el-option>
        </el-select>
         <span style="margin-left:20px">子项</span>
        <el-select
          style="margin-left: -30px;"
          v-model="model.editModel.SecondLevelName"
          placeholder="请选择"
        >
          <el-option
            v-for="item in model.editModel.SecondLevelOptions"
            :key="item.Id"
            :label="item.Name"
            :value="item.Id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="model.isUpdate" label="任务名称">
        <el-input
          style="margin-left: 0px"
          v-model="model.editModel.TaskName"
          placeholder="请选择"
          :disabled=true
        >
        </el-input>
         <span style="margin-left:20px">子项</span>
        <el-input
          style="margin-left: 10px;"
          v-model="model.editModel.SecondLevelName"
          placeholder="请选择"
           :disabled=true
        >
        </el-input>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          style="margin-left: 0px;max-width:200px"
          v-model="model.editModel.WorkDate"
        ></el-date-picker>
        <span style="margin-left:20px">时长</span>
        <el-input
          style="margin-left: 10px"
          v-model="model.editModel.TimeCost"
        ></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <el-input
          type="textarea"
          :rows="4"
          v-model="model.editModel.Detail"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import http from '../util/http'
export default {

  props: {
    model: {
      editModel: {},
      isUpdate: false,
      isAdd: true,
      editType: 0
    }
  },
  methods: {
    onSubmit: function () {
      if (this.model.isAdd) {
        var obj = {
          'TaskId': this.model.editModel.TaskName,
          'TimeCost': this.model.editModel.TimeCost,
          'Detail': this.model.editModel.Detail,
          'SecondLevelId': this.model.editModel.SecondLevelName,
          'WorkDate': new Date(this.model.editModel.WorkDate).toLocaleDateString()

        }
        if (obj.TaskId === '') {
          Message.error('未选择任务')
          return
        }
        if (obj.SecondLevelId === '') {
          Message.error('未选择工作子项')
          return
        }
        http.post('workrecord/add', obj).then(res => {
          this.$emit('Confirm')
        }).error(error => {
          Message.error(JSON.stringify(error))
        })
      } else {
        var newobj = {
          'TaskName': this.model.editModel.TaskName,
          'Id': this.model.editModel.Id,
          'SecondLevelName': this.model.editModel.SecondLevelName,
          'SecondLevelId': this.model.editModel.SecondLevelId,
          'TaskId': this.model.editModel.TaskId,
          'Description': this.model.editModel.Description,
          'TimeCost': this.model.editModel.TimeCost,
          'Detail': this.model.editModel.Detail,
          'WorkDate': new Date(this.model.editModel.WorkDate).toLocaleDateString(),
          'DateTimeCreated': this.model.editModel.DateTimeCreated,
          'UserCreated': this.model.editModel.UserCreated
        }
        http.post('workrecord/update', newobj).then(res => {
          this.$emit('Confirm')
          // Message.info(JSON.stringify(res.data))
        }).error(error => {
          Message.error(JSON.stringify(error))
        })
      }
    },
    onCancel: function () {
      this.$emit('Cancel')
    },
    selectOne (item) {
      var firtLevelId = -1
      for (var i = 0; i < this.model.editModel.TaskOptions.length; i++) {
        if (this.model.editModel.TaskOptions[i].Id === item) {
          firtLevelId = this.model.editModel.TaskOptions[i].FirstLevelId
          break
        }
      }
      if (firtLevelId === -1) {
        Message.warning('未找到小类工作项')
        return
      }
      http.get('/secondworkdefine/getbyfirstlevelid?id=' + firtLevelId, '').then(res => {
        this.model.editModel.SecondLevelOptions = res.data.Data
      }).error(error => {
        Message.error(error)
      })
    }
  }
}
</script>
