<template>
  <div>
    <el-tabs tab-position="right" style="min-height: 200px">
      <el-tab-pane label="用户管理">
        <el-tabs type="border-card">
          <el-tab-pane label="All">
            <userTable :data="users"></userTable>
          </el-tab-pane>
          <el-tab-pane label="管理员">
            <userTable :data="usersAdmin"></userTable>
          </el-tab-pane>
          <el-tab-pane label="学生">
            <userTable :data="usersStudent"></userTable>
          </el-tab-pane>
          <el-tab-pane label="教师">
            <userTable :data="usersTeacher"></userTable>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>

      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="日志查看">
        <div >
          <el-table
            :data="
              records.slice(
                (currentPage - 1) * pagesize,
                currentPage * pagesize
              )
            "
            border
            size="mini"
            style="margin-bottom: 30px"
          >
            <el-table-column
              align="center"
              label="序号"
              prop="id"
              width="50px"
              fixed
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="userId" sortable label="用户id" width="250">
            </el-table-column>
            <el-table-column prop="recordType" sortable label="记录类型" width="100">
            </el-table-column>
            <el-table-column prop="state" label="State" width="100">
            </el-table-column>
            <el-table-column prop="detail" label="Detail" width="150">
            </el-table-column>
            <el-table-column prop="createDate" label="记录时间" width="250">
            </el-table-column>
            <el-table-column prop="Other" label="Other" min-width="250">
              <template slot-scope="scope">
                <el-row>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="showInfo(scope.row)"
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
          </el-table>
          <div style="text-align: center">
            <el-pagination
              hide-on-single-page
              background
              layout="prev, pager, next,total"
              :total="listLength"
              :page-size="pagesize"
              @current-change="current_change"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="定时任务">定时任务</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import userTable from "./components/UserTable";
import { getRecord } from "@/api/user";

export default {
  name: "admin",
  data() {
    return {
      total: 0, //总条数
      pagesize: 10, //指定展示多少条
      currentPage: 1, //当前页码
      userTypes: ["Admin", "Student", "Teacher"],
      Admin_show: true,
      Student_show: true,
      Teacher_show: true,
      defaultProps: {
        children: "username",
        label: "type",
      },
      records: [],
    };
  },
  mounted() {
    this.fetchdata();
  },
  components: { userTable },
  computed: {
    ...mapGetters(["name", "users", "token"]),
    usersStudent() {
      // 过滤学生用户
      return this.users.filter((user) => user.type === "Student");
    },
    usersTeacher() {
      // 过滤老师用户
      return this.users.filter((user) => user.type === "Teacher");
    },
    usersAdmin() {
      // 过滤管理员用户
      return this.users.filter((user) => user.type === "Admin");
    },
    listLength() {
      return this.records.length;
    },
  },
  methods: {
    getUsersByType(userType) {
      return this.users.filter((user) => user.type === userType);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    current_change(currentPage) {
      this.currentPage = currentPage;
    },
    fetchdata() {
      getRecord()
        .then((response) => {
          this.records = response.data.records;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          alert("请求失败");
        });
    },
    showInfo(info) {
      console.log(info)
      
    }

  },
};
</script>
