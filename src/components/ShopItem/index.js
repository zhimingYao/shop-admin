import ShopItem from './ShopItem.vue'
// import VueLazy from "vue-lazyload";
import loading from "./loading.jpg";

export default {
    install(Vue){
        // Vue.use(VueLazy,{
        //     loading,
        // })
        Vue.component(ShopItem.name,ShopItem);
    }
} 