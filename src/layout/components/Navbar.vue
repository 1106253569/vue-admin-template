<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-popover
            placement="top-start"
            :title="name"
            width="400"
            trigger="hover"
          >
            <div
              v-for="(val, col) in info"
              :key="col"
              class="text item"
              style="
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
              "
            >
              <span class="label" style="font-weight: bold; margin-right: 6px"
                >{{ col }}:</span
              >
              <span class="value" style="flex-grow: 1; text-align: right">{{
                val
              }}</span>
            </div>
            <el-button
              @click.native="showChangeDialog"
              size="mini"
              style="float: right"
              >修改信息</el-button
            >
            <img
              slot="reference"
              :src="require(`@/assets/avatar/${avatar}`)"
              class="user-avatar"
            />
          </el-popover>
          <i class="el-icon-caret-bottom" />
        </div>

        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> Home </el-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="https://panjiachen.github.io/vue-element-admin-site/#/"
          >
            <el-dropdown-item>文档</el-dropdown-item>
          </a>
          <!-- <el-dropdown-item divided @click.native="showLogoutDialog"
            ><span style="display: block">Log Out</span></el-dropdown-item
          > -->
        </el-dropdown-menu>

        <!-- 弹窗组件 -->
        <el-dialog
          :visible="logoutDialogVisible"
          title="Warning"
          size="mini"
          width="300px"
          center
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

        <el-dialog
          :visible="infoDialogVisible"
          title="选择要修改的信息"
          width="650px"
          @close="infoDialogVisible = false"
          style="
            border: solid 1px rgba(0, 0, 0, 0.1);
            box-shadow: 20px 20px 20px 10px rgba(0, 0, 0, 0.1);
          "
        >
          <div style="margin-right: 5%; margin-left: 5%">
            <el-form :model="changeInfo" size="large" style="margin-top: 30px">
              <el-row :gutter="6">
                <el-col :span="16"
                  ><div style="width: 350px">
                    <el-form-item label="用户名" :label-width="formLabelWidth">
                      <el-input
                        v-model="changeForm.username"
                        autocomplete="on"
                        style="width: 95%"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      label="用户电话"
                      :label-width="formLabelWidth"
                    >
                      <el-input
                        v-model="changeForm.phone"
                        autocomplete="off"
                        style="width: 95%"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      label="出生日期"
                      :label-width="formLabelWidth"
                    >
                      <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="changeForm.birthday"
                        style="width: 95%"
                      ></el-date-picker>
                    </el-form-item></div
                ></el-col>
                <el-col :span="4"
                  ><el-avatar
                    shape="square"
                    :size="160"
                    fit="cover"
                    :src="require(`@/assets/avatar/${avatar}`)"
                  ></el-avatar>
                </el-col>
              </el-row>
              <el-form-item label="用户地址" :label-width="formLabelWidth">
                <el-cascader
                  :options="options"
                  v-model="changeForm.region"
                  @change="handleChange"
                  style="width: 95%"
                >
                </el-cascader>
              </el-form-item>

              <el-form-item label="用户邮箱" :label-width="formLabelWidth">
                <el-input
                  v-model="changeForm.email"
                  autocomplete="off"
                  style="width: 95%"
                ></el-input>
              </el-form-item>
              <el-form-item label="所在部门" :label-width="formLabelWidth">
                <el-input
                  v-model="changeForm.department"
                  autocomplete="off"
                  style="width: 95%"
                ></el-input>
              </el-form-item>
              <el-form-item label="入学日期" :label-width="formLabelWidth">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="changeForm.enrollment"
                  style="width: 95%"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="学历" :label-width="formLabelWidth">
                <el-radio-group v-model="changeForm.degree" style="width: 60%">
                  <el-radio label="本科"></el-radio>
                  <el-radio label="硕士"></el-radio>
                  <el-radio label="博士"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="infoDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
          </div>
        </el-dialog>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { provinceAndCityData } from "element-china-area-data";
import { changeInfo, uploadAvatar } from "@/api/user";
export default {
  data() {
    return {
      logoutDialogVisible: false,
      infoDialogVisible: false,
      formLabelWidth: "80px",
      changeForm: {
        username: "",
        region: "",
        birthday: "",
        enrollment: "",
        degree: "",
        department: "",
        email: "",
        phone: "",
      },
      options: provinceAndCityData,
      selectedOptions: [],
      imageUrl: "",
    };
  },

  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name", "info"]),
    changeInfo() {
      this.changeForm = this.info;
      console.log(this.changeForm);
      // 过滤老师用户
      return this.changeForm;
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    showLogoutDialog() {
      this.logoutDialogVisible = true;
    },
    showChangeDialog() {
      this.infoDialogVisible = true;
    },
    handleChange() {
      var loc = "";
      for (let i = 0; i < this.selectedOptions.length; i++) {
        loc += CodeToText[this.selectedOptions[i]];
      }
      console.log(loc); //打印区域码所对应的属性值即中文地址
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    uploadAvatar(item) {
      this.$showMessage("文件上传中........");
      let FormDatas = new FormData();
      FormDatas.append("file", item.file);
      uploadAvatar({ account: this.name, file: FormDatas }).then((response) => {
        log.console(response);
      });
    },
    handleSubmit() {
      changeInfo(this.changeForm)
        .then(() => {
          this.$router.push({ path: this.redirect || "/" });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>