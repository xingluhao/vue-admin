import instance from "@/utils/request";
/**
 * 获取验证码
 */
export function getSms(data) {
  return instance.request({
    url: '/getSms/',
    method: "post",
    data
  })
}
/**
 * 获取用户角色
 */

/**
 * 退出
 */
export function logout(data = {}) {
  return instance.request({
    method: "post",
    url: "/logout/",
    data
  })
}
/**
 * 登录
 */
export function login(data) {
  return instance.request({
    method: "post",
    url: "/login/",
    data
  })
}
/**
 * 注册
 */
export function register(data){
  return instance.request({
    method: "post",
    url: "/register/",
    data
  })
}
