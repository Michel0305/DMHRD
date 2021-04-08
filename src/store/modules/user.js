import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  account: '',
  right:{},
  partids:[]
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
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
  SET_ACCOUNT: (state, account) => {
    state.account = account
  },
  SET_RIGHT:(state,rights)=>{
    state.right = rights
  },
  SET_PARTIDS:(state,partids)=>{
    state.partids = partids
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ "username": username.trim(), "password": password }).then(response => {        
        const data = {} = response
        if (data.token == 'null') {
          reject('请确认登录用户信息重新登录')
        }
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {        
        if(response.data.code == 200){
          const data = {} = response          
          let userData = data.data.msg
          // roles must be a non-empty array 角色设定
          if (!userData.roles || userData.roles.length <= 0) {
            reject('用户角色设定错误')
          }          
          commit('SET_ROLES', userData.roles)
          commit('SET_NAME', userData.name)
          commit('SET_AVATAR', userData.avatar)
          commit('SET_INTRODUCTION', userData.introduction)
          commit('SET_ACCOUNT', userData.userid)
          commit('SET_RIGHT', userData.rights)
          commit('SET_PARTIDS', userData.partids)        
          resolve(userData)
        }else{
          console.log(response.data.msg)
          reject('请确认登录用户信息重新登录') 
        }      
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
