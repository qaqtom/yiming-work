import axios from 'axios';

const ins = axios.create();
ins.interceptors.response.use(resp => resp.data.data);

export async function getSatelliteData() {
    return await ins.get('/api/satelliteData');
}

