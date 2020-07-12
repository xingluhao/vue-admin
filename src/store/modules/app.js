const app = {
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
  },
  getters: { //compoted
    //isCollapse: state => state.isCollapse
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse
      //html5本地存储
      sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse))
      //localStorage.setItem("isCollapse", JSON.stringify(state.isCollapse))
      //使用cookie
      // Cookies.set("isCollapse",state.isCollapse)
    }
  },
  actions: {
    Login(content, data) {
      return new Promise((resolve, reject) => {
        //接口
        login(data).then((response) => {
          resolve(response)
        }).catch( (response) => {
          reject(response)
        })
      })
    }
  },
  modules: {}
}

export default app
