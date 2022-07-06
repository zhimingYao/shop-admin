import {
    getOrder,
    getOrderDetail,
    getBackStock,
    getBackStockDetail
} from "@/api/order"

const state = {
    order_id:null,
    status:null,
}
const mutations = {
    GET_DELIVE_LIST(state,data){
        state.order_id=data.id
        state.status=data.status
    },
    GET_ORDER_DETAIL(state,data){
        state.status=data.status
        state.order_id=data.id
        // console.log(state.status);
    }
}
const actions = {
    getDeliveList({commit},data){
        commit('GET_DELIVE_LIST',data)
        // console.log(data);
    },
    getOrderDetail({commit},data){
        commit('GET_ORDER_DETAIL',data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}