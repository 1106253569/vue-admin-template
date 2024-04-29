<template>
  <div>
    <el-table
      :data="data"
      border
      highlight
      style="width: 100%"
      size="mini"
      :row-style="{ height: '0' }"
    >
      <!-- 管理员用户表格 -->
      <el-table-column fixed prop="account" label="账号" width="100">
      </el-table-column>
      <el-table-column fixed prop="username" label="姓名" width="70">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="150">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"> </el-table-column>
      <el-table-column prop="avatar" label="头像" width="70">
        <template slot-scope="scope">
          <el-avatar
            shape="square"
            :size="40"
            fit="cover"
            :src="require(`@/assets/avatar/${scope.row.avatar}`)"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="用户类型" width="80">
      </el-table-column>
      <el-table-column prop="id" label="用户ID" width="250"> </el-table-column>
      <el-table-column
        prop="registrationDate"
        label="注册时间"
        sortable
        width="150"
      >
      </el-table-column>
      <el-table-column prop="Other" label="Other" min-width="250">
        <template slot-scope="scope">
          <el-row>
            <el-button size="mini" type="primary" @click="showInfo(scope.row)"
              >SELECT</el-button
            >
            <!-- 删除按钮 -->
            <el-button
              size="mini"
              type="danger"
              @click="showConfirmationDialog(scope.row)"
              >DELETE</el-button
            >
          </el-row>
        </template>
      </el-table-column>
      <!-- 表格列 -->
    </el-table>
  </div>
</template>

<script>
import { deleteUser } from "@/api/user";

export default {
  props: ["data"],
  data() {
    return { message: "" };
  },
  mounted() {},

  methods: {
    // 显示确认对话框
    showConfirmationDialog(row) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 用户确认后显示密码输入对话框
          this.showPasswordInputDialog(row);
        })
        .catch(() => {
          // 用户取消操作
          console.log("用户取消删除操作");
        });
    },
    // 显示密码输入对话框
    showPasswordInputDialog(row) {
      this.$prompt("请输入 root 密码进行确认", "删除确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "password",
        inputPattern: /^\S{6,}$/, // 密码至少6位
        inputErrorMessage: "密码长度至少为6位",
      })
        .then(({ value }) => {
          // 用户输入 root 密码确认删除
          // 在这里进行删除操作
          console.log("用户输入的 root 密码:", value);
          if (value === "123456") {
            console.log("需要删除的数据:", row);
            deleteUser({ id: row.id, username: row.username })
              .then((response) => {
                this.message = response.data.message;
              })
              .catch((error) => {
                console.log(error);
                alert("请求失败");
              });
          }
        })
        .catch(() => {
          // 用户取消操作
          console.log("用户取消删除操作");
        });
    },

    showInfo(info) {
      console.log(info);
    },
  },
};
</script>