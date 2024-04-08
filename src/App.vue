<template>
  <div id="app">
    <div class="container">
      <SatelliteSheets :data="data" :satelliteNameArray="satelliteNameArray" :listLoading="loading" />
    </div>
    
  </div>
</template>

<script>
import {mapState} from "vuex";
import SatelliteSheets from "@/components/SatelliteSheets.vue";
export default {
  name: 'App',
  components: {
    SatelliteSheets,
  },
  data(){
    return{
      loading:false,
      satelliteNameArray:[],
    }
  },
  created(){
    this.loading = true;
    this.$store.dispatch("satellite/fetchData").then(()=>{
      this.data.forEach((item) => {
      if (!this.satelliteNameArray.includes(item.idOfName)) {
        this.satelliteNameArray.push(item.idOfName);
      } 
    })
    this.satelliteNameArray.push("全部");
    this.loading = false;
    })
    
  },
  computed:{
    ...mapState("satellite",["data"]),
  }
  
}
</script>

<style lang="less">
.container{
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
</style>
