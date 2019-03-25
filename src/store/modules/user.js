import { login, logout, getInfo, updateInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getName, setName, removeName } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    assocId: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ASSOCID: (state, assocId) => {
      state.assocId = assocId
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const token = response.result
          setToken(token)
          setName(userInfo.username)
          commit('SET_NAME',userInfo.username)
          commit('SET_TOKEN',token) 
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        const name = getName()
        getInfo(name).then(response => {
          const data = response.result
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.username)
          commit('SET_AVATAR', process.env.BASE_API + data.headPortrait) 
          commit('SET_ASSOCID',response.result.userAssocs[0].assocId)
          sessionStorage.setItem("assocId",response.result.userAssocs[0].assocId)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //更新用户信息
    UpdateInfo({ commit, state },PeronForm) {
      return new Promise((resolve, reject) => {
        updateInfo(PeronForm).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeName()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeName()
        resolve()
      })
    }
  }
}

export default user
