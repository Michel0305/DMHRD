const state = {
    personals: [],
    departs: [],
    jobs: [],
    times: []
}
const mutations = {
    UPDATE_PERSONAL: (state, data) => {//第一次提交赋值
        state.personals = data;
    },
    UPDATE_DEPART: (state, data) => {
        state.departs = data;
    },
    UPDATE_JOB: (state, data) => {
        state.jobs = data;
    },
    UPDATE_TIMES: (state, data) => {
        state.times = data;
    }
}
const actions = {
    defPersonal({ commit }, data) {
        commit('UPDATE_PERSONAL', data)
    },
    defDepart({ commit }, data) {
        commit('UPDATE_DEPART', data)
    },
    defeJob({ commit }, data) {
        commit('UPDATE_JOB', data)
    },
    defTimes({ commit }, data) {
        commit('UPDATE_TIMES', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}