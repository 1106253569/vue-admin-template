<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />

        <el-menu-item
          @click.native="showLogoutDialog"
          style="vertical-align: -100em"
        >
          <i
            class="el-icon-switch-button"
            style="
              width: 1em;
              height: 1em;
              fill: currentColor;
              overflow: hidden;
              font-weight: bold;
            "
          ></i>
          <span style="margin-left: 8px; font-size: 12px">LOGOUT</span>
        </el-menu-item>
      </el-menu>
      <el-dialog
        :visible="logoutDialogVisible"
        title="Warning"
        size="mini"
        width="300px"
        center
        :modal-append-to-body="false"
        @close="logoutDialogVisible = false"
      >
        <span style="text-align: center; display: block; font-weight: bold"
          >确定要退出登录吗？</span
        >
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="logout">确定</el-button>
          <el-button @click="logoutDialogVisible = false">取消</el-button>
        </span>
      </el-dialog>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  data() {
    return {
      logoutDialogVisible: false,
    };
  },

  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      console.log(this.$router.options.routes)
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  methods: {
    showLogoutDialog() {
      this.logoutDialogVisible = true;
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>
