import { getVoucher, addVoucher, deleteVoucher, editVoucheer,seeVoucheer,selectVoucher } from "@/api/voucher.js";
import { getcookie } from "@/utils/cookiestorage.js";

const getDefaultState = () => {
    return {
        store_id: '',
    }
}

const state = getDefaultState()

const mutations = {
    SET_ID(state,data){
        state.id = data
    },
}

const actions = {
    getVoucher(store) {
        let data = {
            store_id: getcookie('id'),
        }
        store.commit('SET_ID',data.store_id);
        return new Promise((resolve, reject) => {
            getVoucher(data).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    seeVoucheer(store,id){
        let data = {
            id,
        }
        return new Promise((resolve, reject) => {
            seeVoucheer(data).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    addVoucher(store,data){
        return new Promise((resolve, reject) => {
            addVoucher(data).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    editVoucheer(store,data){
        
        return new Promise((resolve, reject) => {
            editVoucheer(data).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    deleteVoucher(store,id){
        let data = {
            id,
        }
        return new Promise((resolve, reject) => {
            deleteVoucher(data).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    selectVoucher(store,name){
        let data = {
            name,
        }
        return new Promise((resolve, reject) => {
            selectVoucher(data).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,

}

