<template>
  <el-container>
    <el-header>
      <head-content v-bind:userName="UserName"> </head-content>
    </el-header>
    <el-container>
      <!-- <el-aside width="200px">
        <el-tree
          :data="data"
          :props="defaultProps"
          :highlight-current="true"
          node-key="id"
          :default-expanded-keys="defaultShowNodes"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </el-aside> -->
      <el-container>
        <el-header>
          <el-menu
            mode="horizontal"
            @select="handleSelect">
            <el-menu-item index="1">工作记录</el-menu-item>
            <el-submenu mode="vertical">
              <template slot="title">
                <span slot="title">工作项管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">工作大类</el-menu-item>
                <el-menu-item index="1-2">工作小类</el-menu-item>
                <el-menu-item index="1-3">工作任务</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3">工作报表</el-menu-item>
            <el-menu-item index="4" v-if="isAdministrator">注册处理</el-menu-item>
          </el-menu>
        </el-header>
        <el-main>
          <router-view name="mainArea"></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-footer v-if="false">
      <a href="http://www.estun.com/" target="_blank" style="font-size:18px"> 埃斯顿自动化控制有限公司@CopyRight  </a>
    </el-footer>
  </el-container>
</template>
<style >
.el-menu--collapse .el-menu .el-submenu, .el-menu--popup{
  min-width: 120px!important;
}
.el-header {
  /* background: orange; */
  padding-left: 0px;
  padding-right: 0px;
  max-height: 40px;
}
.el-footer {
  /* background: orange; */
  height:40px;
  max-height: 40px;
}
</style>
<script>
import HeadContent from './HeadContent.vue'
export default {
  name: 'DashBoard',
  components: { HeadContent },
  data () {
    return {
      UserName: '',
      data: [
        {
          label: 'Estun',
          id: 1,
          children: [
            {
              label: 'ABG',
              id: 2,
              children: [
                {
                  id: 3,
                  label: '软件研发部',
                  children: [
                    {
                      id: 4,
                      label: 'Jim'
                    },
                    {
                      id: 5,
                      label: 'Tom'
                    }
                  ]
                },
                {
                  id: 6,
                  label: '电机研发部'
                },
                {
                  id: 7,
                  label: '伺服研发部'
                }
              ]
            },
            {
              label: 'RBG',
              children: [
                {
                  id: 8,
                  label: '机器人研发部'
                },
                {
                  id: 9,
                  label: '视觉研发部'
                }
              ]
            }
          ]
        }
      ],
      defaultShowNodes: [3],
      isAdministrator: true
    }
  },
  methods: {
    handleNodeClick (data) {
      // alert(data.id + data.label)
    },
    handleSelect (data) {
      var path = ''
      switch (data) {
        case '1': path = '/main'; break
        case '3': path = '/main/report'; break
        case '4': path = '/main/handleRegister'; break
        case '1-1':path = '/main/firstWorkLevelDef'; break
        case '1-2':path = '/main/secondWorkLevelDef'; break
        case '1-3':path = '/main/taskDefinition'; break
        default:return
      }
      this.$router.push(path)
    }
  },
  mounted () {
    var user = JSON.parse(localStorage.getItem('currentUser'))
    this.UserName = user.Name
    document.title = '工时统计系统'
    this.handleSelect('1')
  }
}
</script>
