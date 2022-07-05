import { getspike,delspike,selectspike,updatespike,addspike } from "@/api/spike.js";
import { getcookie } from "@/utils/cookiestorage.js";

const getDefaultState = () => {
    return {
        
    }
}

const state = getDefaultState()

const mutations = {
    
}

const actions = {
    getspike(store,id) {
        let data = {
            id:id || "无",
        }
        return new Promise((resolve, reject) => {
            getspike(data).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    addspike(store,data){
        return new Promise((resolve, reject) => {
            addspike(data).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    delspike(store,data){
        
        return new Promise((resolve, reject) => {
            delspike(data).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    selectspike(store,id){
        let data = {
            id,
        }
        return new Promise((resolve, reject) => {
            selectspike(data).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    updatespike(store,name){
        let data = {
            name,
        }
        return new Promise((resolve, reject) => {
            updatespike(data).then(res => {
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

