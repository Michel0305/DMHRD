const state = {
    personals: [],
    departs: [],
    jobs: [],
    times: [],
    statuss:[],
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
    },
    UPDATE_STATUS:(state,data)=>{
        state.statuss = data;
    },
    REPLACE_TIME: (state, data) => {
        let indexID = state.times.findIndex((el) => el.id == data.id)
        state.times.splice(
            indexID < 0 ? 0 : indexID,
            indexID < 0 ? 0 : 1,
            data
        );
    },
    REMOVE_TIME:(state, data)=> {
        let indexID = state.times.findIndex((el) => el.id == data.id)
        state.times.splice(indexID, 1);
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
    },
    replaceTimes({ commit }, data){
        commit('REPLACE_TIME', data)
    },
    delTimes({ commit }, data){
        commit('REMOVE_TIME', data)
    },
    defstatus({ commit }, data){
        commit('UPDATE_STATUS', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}