import Vuex from 'vuex';
import Vue from 'vue';
import satellite from "./satellite"
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        satellite,
    }
})

export default store;