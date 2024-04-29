import { login, logout, getInfo, getRecord } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    users: [],
    type: '',
    info: [],
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
    state.avatar = avatar;
  },
  SET_USERS: (state, users) => {
    state.users = JSON.parse(users)
  },
  SET_TYPE: (state, type) => {
    state.type = type
  },
  SET_INFO: (state, info) => {
    info.registrationDate = info.registrationDate.replace(/T|\.000\+00:00/g, ' ');
    state.info = info

    console.log(state.info)
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, password, type } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password, type: type }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar, users, type, info } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_USERS', users)
        commit('SET_TYPE', type)
        commit('SET_INFO', info)
        resolve(data)
      }).catch(error => {
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
  actions
}

