import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],  // 记录登录用户的身份
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
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
  }
}

const actions = {
  // user login
  // store.dispatch('user/login')
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        // token字段 的持久化存储，存储到cookies中
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  //获取用户信息
  getInfo({ commit, state }) {
    // 返回 promise
    return new Promise((resolve, reject) => {
      //向服务器发请求，获取用户信息
      getInfo(state.token).then(response => {
        const { data } = response
        console.log(data);
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        // 服务器返回数据中包含 roles（角色）,name（用户名）、avatar(头像)、introduction(自我介绍);
        const { roles, name, avatar } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        
        //更新store;将角色、用户名、头像保存到store中
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)

        // 修改异步任务的状态为resolved;保存任务的结果数据；
        resolve(data)
      }).catch(error => {
         // 修改异步任务的状态为rejected;保存任务的失败原因；
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
 
}

