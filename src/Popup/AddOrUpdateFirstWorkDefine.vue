<template>
<div>
  <!-- <el-input :disable="InnameDisable" placeholder="this is a test"></el-input> -->
   <el-form :model="model" label-width="80px">
     <el-form-item label="名称:">
        <el-input  style="margin-left:0px" v-model="model.editModel.Name"></el-input>
     </el-form-item>
     <el-form-item  label="描述:">
       <el-input :rows="4"  type="textarea" v-model="model.editModel.Description"></el-input>
     </el-form-item>
      <el-form-item>
     <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
   </el-form>
</div>
</template>
<script>
import http from '@/util/http'
import { Message } from 'element-ui'
export default {
  props: {
    model: {
      editModel: {
      },
      EditType: 0,
      NameDisable: false
    }
  },
  data () {
    return {
      InnameDisable: false
    }
  },
  methods: {
    onSubmit () {
      var addObj = {
        Name: this.model.editModel.Name,
        Description: this.model.editModel.Description
      }
      if (addObj.Name.trim() === '') {
        Message.error('工作名称不能为空')
        return
      }
      if (addObj.Description.trim() === '') {
        Message.error('描述不能为空')
        return
      }
      if (this.model.EditType === 0) {
        http.post('/firstworkdefine/add', addObj).then(res => {
          this.$emit('Confirm')
        }).error(err => {
          Message.error(JSON.stringify(err))
        })
      } else {
        http.post('firstworkdefine/update', this.model.editModel).then(
          res => {
            this.$emit('Confirm')
          }).error(
          err => {
            Message.error(JSON.stringify(err))
          }
        )
      }
    },
    onCancel () {
      this.$emit('Cancel')
    }
  }
}
</script>
