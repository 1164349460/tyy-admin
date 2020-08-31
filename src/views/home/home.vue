<!-- 根页面 -->
<template>
  <el-container>
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="user-logo">
        <img src="../../assets/images/logo.png" alt v-show="!isCollapse" />
        <p class="cen-name">管理员</p>
      </div>
      <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#5895D3" text-color="#fff" active-text-color="#ffd04b" unique-opened router :collapse="isCollapse" collapse-transition>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/admin/employee/male">男神女神</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-help"></i>
            <span>城市管理</span>
          </template>
          <el-menu-item index="/admin/cityManage/assembly">集结点管理</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-star-off"></i>
            <span>游戏管理</span>
          </template>
          <el-menu-item index="/admin/gameManage/failGroup">组局失败</el-menu-item>
          <el-menu-item index="/admin/gameManage/gameList">游戏列表</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-goods"></i>
            <span>支付管理</span>
          </template>
          <el-menu-item index="/admin/payforManage/reflect">提现列表</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="font-size: 12px">
        <div class="flex-between">
          <el-button type="primary" :icon="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" @click="isCollapse=!isCollapse" class="collap-btn"></el-button>
        </div>
        <div class="cen-dropdown">
          <span class="cursor-point" v-button @click="handleQuit">
            <i class="el-icon-switch-button"></i> 退出
          </span>
        </div>
      </el-header>
      <!-- 面包屑 -->
      <div class="v-breadcrumb v-header">
        <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab" :before-leave="leaveRouter">
          <el-tab-pane v-for="(item, index) in tagsList" :key="index" :label="item.name" :name="item.path" :closable="!index?false:true">
            <span slot="label">
              <i class="el-icon-house" v-if="!index"></i>
              {{item.meta.pathName}}
            </span>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-main>
        <div class="routerContainer">
          <!--这里是会被缓存的组件-->
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <!--这里是不会被缓存的组件-->
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      userMessage: {},
      editableTabsValue: "/admin/index",
      tagsList: [
        {
          path: '/admin/employee/male',//男神女神管理
          name: 'male',
          component: resolve => require(["@/views/employeeManage/male"], resolve),
          meta: {
            pathName: '男神女神'
          }
        },
      ]
    }
  },
  created() {
    this.userMessage = this.$storage.userMessage("employeeId");
  },
  watch: {
    $route() {
      this.tabInit()
    }
  },
  methods: {
    handleCommand(command) {
      if (command == 'quit') {
        this.quit();
      } else if (command == 'userCenter') {
        this.$router.push('/admin/userCenter')
      }
    },
    // 标签栏
    tabInit() {
      let matched = this.$route.matched[1];
      let flag = false;
      let currentIndex = 0;
      for (let a = 0; a < this.tagsList.length; a++) {
        if (this.tagsList[a].path === matched.path) {
          currentIndex = a;
          flag = true;
        }
      }

      if (!flag) {
        this.tagsList.push(matched);
        this.editableTabsValue = this.tagsList[this.tagsList.length - 1].path;
      } else {
        this.editableTabsValue = this.tagsList[currentIndex].path;
      }

      this.$router.push(this.editableTabsValue);
    },
    // 删除tab
    removeTab(data) {
      this.tagsList.forEach((item, index) => {
        if (item.path === data) {
          this.tagsList.splice(index, 1);
          this.editableTabsValue = this.tagsList[this.tagsList.length - 1].path;
          // this.$storage.setStorage('menuList', JSON.stringify(this.tagsList))
          return;
        }
      });
    },
    // 点击tab栏
    leaveRouter(e) {
      this.$router.push(e);
    },
    // t退出
    handleQuit() {
      this.$confirm("您确定要退出系统吗?", "退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$storage.removeCookie("token");
        this.$router.push("/admin/login");
      }).catch(() => {
      });
    }
  }
}
</script>
<style lang="less">
.v-header {
  .el-tabs--card > .el-tabs__header {
    border-bottom: none;
    margin-bottom: 0;
  }

  .el-tabs__item {
    height: 30px;
    line-height: 30px;
    color: #606266;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none;
    border-radius: 0;
    margin-left: 5px;
  }

  .el-tabs__item.is-active {
    color: #e64c14;
    box-sizing: border-box;
  }

  .el-tabs--card > .el-tabs__header .el-tabs__item {
    background-color: #fff;
    margin: 5px 2px;
  }
}
</style>
<style lang="less" scoped>
.v-header {
  background-color: #f7f6f6;
  .v-breadcrumb {
    padding: 0 30px;
    box-shadow: inset 0 0 3px 2px hsla(0, 0%, 39.2%, 0.1);
  }
}

.el-container {
  height: 100vh;
}
.el-header {
  background-color: #fff;
  color: #333;
  font-size: 12px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
}

.el-aside {
  background-color: #5895d3;
  color: #fff;
  .user-logo {
    text-align: center;
    padding: 20px;
    margin-bottom: 20px;
    background-color: #3d81c5;
    .cen-name {
      margin-top: 20px;
      font-size: 18px;
    }
    img {
      width: 70px;
      height: 70px;
      border: 2px solid #fff;
      border-radius: 50%;
    }
  }
  .el-menu {
    border: none;
    .el-menu-item:not(.is-active) {
      i {
        color: #fff;
      }
    }
  }
  /deep/.el-menu-item {
    height: 35px;
    line-height: 35px;
  }
  /deep/.el-submenu__title {
    height: 35px;
    line-height: 35px;
    i {
      color: #fff;
    }
  }
  /deep/.el-menu-item-group__title {
    padding: 0;
  }
  /deep/.el-submenu .el-menu-item {
    padding-left: 65px !important;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.routerContainer {
  height: 100%;
  background-color: #fff;
  min-width: 960px;
  padding: 20px;
}
.collap-btn {
  padding: 6px 10px;
}

.cen-dropdown {
  font-size: 18px;
  color: #666;
  span {
    margin: 0 10px;
  }
}
</style>
 