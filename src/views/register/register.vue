<template>
  <div class="site-page--register">
    <div class="changeInfo">
      <el-form
        ref="form"
        :model="registerForm"
        label-width="80px"
        size="large"
        style="margin: 1%; padding: 3% 30px 30px"
        ><h2
          style="
            text-align: center;
            line-height: 50px; /*文字水平居中*/
            margin: auto; /*div水平居中*/
          "
        >
          注册用户
        </h2>
        <el-form-item label="账号">
          <el-input
            v-model="registerForm.account"
            style="width: 90%"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="registerForm.password"
            style="width: 90%"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
            v-model="registerForm.username"
            style="width: 90%"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户地址">
          <el-cascader
            :options="options"
            v-model="registerForm.region"
            @change="handleChange"
            style="width: 90%"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-col :span="11" style="width: 90%">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="registerForm.birthday"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="入学时间">
          <el-col :span="11" style="width: 90%">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="registerForm.enrollment"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="学历">
          <el-radio-group
            v-model="registerForm.degree"
            size="medium"
            style="width: 400px"
          >
            <el-radio-group v-model="registerForm.type">
              <el-radio label="Student">学生</el-radio>
              <el-radio label="Teacher">教师</el-radio>
            </el-radio-group>
          </el-radio-group>
        </el-form-item>
        <el-form-item size="large" style="margin-left: 40%; margin-right: 1%">
          <el-button type="primary" @click="onSubmit" style="margin-right: 20px"
            >提交</el-button
          >
          <router-link to="/"><el-button>取消</el-button></router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
    
  <script>
import { register } from "@/api/user";
import { provinceAndCityData } from "element-china-area-data";
export default {
  data() {
    return {
      registerForm: {
        account: "",
        password: "123456",
        Phone: "",
        username: "",
        region: "",
        birthday: "",
        enrollment: "",
        department: "",
        type: "Student",
        email: "demo@gmail.com",
        imageUrl: "default.jpg",
      },
      options: provinceAndCityData,
      selectedOptions: [],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      console.log(this.registerForm);
      register(this.registerForm).then((response) => {
        console.log(response);
      });
    },
    handleChange() {
      var loc = "";
      for (let i = 0; i < this.selectedOptions.length; i++) {
        loc += CodeToText[this.selectedOptions[i]];
      }
      console.log(loc); //打印区域码所对应的属性值即中文地址
    },
  },
};
</script>
  
<style>
.changeInfo {
  border: solid 1px rgba(0, 0, 0, 0.1);
  box-shadow: 20px 20px 20px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 550px;
  height: 650px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>