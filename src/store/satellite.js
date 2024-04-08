import { getSatelliteData } from '@/api/getSatelliteData.js';

export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        setData(state, payload) {
            state.data = payload;
        },
        setDataNumber(state, payload) {
            state.dataNumber = payload;
        }
    },
    actions: {
        async fetchData(ctx) {
            // if (ctx.state.data) {
            //     return;
            // }
            const resp = await getSatelliteData();
            ctx.commit("setData", resp);
           
        }
    }
}