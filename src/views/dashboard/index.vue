<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <component v-show="showComponent" :is="componentName"></component>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import admin from "./Admin";
import student from "./Student";
import teacher from "./Teacher";

export default {
  components: { admin, student, teacher },
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "type"]),
    showComponent() {
      // 根据用户类型判断是否显示相应组件
      switch (this.type) {
        case "Admin":
          this.componentName = "admin";
          break;
        case "Student":
          this.componentName = "student";
          break;
        case "Teacher":
          this.componentName = "teacher";
          break;
        default:
          this.componentName = null;
      }
      return !!this.componentName;
    },
  },
  data() {
    return {
      componentName: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
