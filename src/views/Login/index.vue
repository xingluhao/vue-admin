<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="ment-tab">
        <li
          :class="{ current: item.current }"
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleMneu(item)"
        >
          {{ item.text }}
        </li>
      </ul>
      <!--表单 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-from">
          <label for="email">邮箱</label>
          <el-input id="email" type="text" v-model="ruleForm.username" autocomplete="off "></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <label for="possword">密码</label>
          <el-input id="possword" type="text" v-model="ruleForm.password" autocomplete="off" maxlength="20" minlength="6">
          </el-input>
        </el-form-item>

        <el-form-item prop="passwords" v-if="model === 'reg'">
          <label>重复密码</label>
          <el-input
            type="text"
            v-model="ruleForm.passwords"
            autocomplete="off"
            maxlength="20"
            minlength="6">
          </el-input>
        </el-form-item>

        <el-form-item prop="code">
          <label>验证码</label>
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" @click="getCode">
                  获取验证码
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-but block" :disabled="sta">
              {{model === 'reg' ? "注册" : "登录"}}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {getSms} from "@/api/login"
import axios from "axios";
import { loginApi } from "@/api/login";
import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api";
import { stripscript, valiDateEmal, valiDatePoss } from "@/utils/validate";
export default {
  name: "login",
  setup: function (props, context) {
    //data数据 //reactive
    var validateCode = (rule, value, callback) => {
      let reg = /^[a-z0-9]{6}$/;
      if (!value) {
        return callback(new Error("请输入验证码"));
      }
      setTimeout(() => {
        if (reg.test(value)) {
          callback(new Error("验证码格式有误"));
        } else {
          sta = ref(false)
          callback();
        }
      }, 1000);
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!valiDateEmal(value)) {
        callback(new Error("格式错误"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!valiDatePoss(value)) {
        callback(new Error("密码格式6-20,字母加数字"));
      } else {
        callback();
      }
    };
    //重复密码
    var validatePasswords = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    const menuTab = reactive([
      {text: "登录", current: true, type: "login"},
      {text: "注册", current: false, type: "reg"}
    ]);
    //基本数据使用 ref
    const model = ref("login");
    const sta = ref(true)
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: ""
    });
    const rules = reactive({
      username: [{validator: validateUsername, trigger: "blur"}],
      password: [{validator: validatePassword, trigger: "blur"}],
      passwords: [{validator: validatePasswords, trigger: "blur"}],
      code: [{validator: validateCode, trigger: "blur"}]
    });
    const toggleMneu = data => {
      menuTab.forEach(e => {
        e.current = false;
      });
      data.current = true;
      model.value = data.type;
    };
    const submitForm = formName => {
      if (model.value === "login") {
        context.refs[formName].validate(valid => {
          if (valid) {
            alert("登录!");
          } else {
            console.log("error 登录!!");
            return false;
          }
        });
      } else {
        context.refs[formName].validate(valid => {
          if (valid) {
            alert("注册!");
          } else {
            console.log("error 注册!!");
            return false;
          }
        });
      }
    };

    /**
     * 获取验证码
     */
    const getCode = () => {
      if(ruleForm.username != '' && ruleForm.password != '') {
        if(valiDateEmal(ruleForm.username)) {
          //获取验证码
          let data = {
            username: ruleForm.username,
            module: "login"
          }
          getSms(data).then(res => {
            console.log(res)
          }).catch(e => {
            console.log(e)
          })
        } else {
          context.root.$message.error('邮箱格式有误');
        }
      } else {
        context.root.$message.error('邮箱或密码不能为空');
      }
      /*getSms({username: ruleForm.username}).then(res => {

      }).catch(e => {
        console.log(e)
      })*/
    }
    /**
     * 生命周期
     */
    //挂载后
    onMounted(() => {

    });
    return {
      menuTab,
      model,
      sta,
      toggleMneu,
      submitForm,
      getCode,
      onMounted,
      ruleForm,
      rules
    };
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.ment-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    border-radius: 2px;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-bottom: 29px;
  label {
    margin-bottom: 3px;
    display: block;
    font-size: 14px;
    color: #ffffff;
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    width: 100%;
    display: block;
  }
  .login-but {
    margin-top: 10px;
  }
}
</style>
