<template>
  <div id="app">
    <div class="container">
      <SatelliteSheets :data="data"  :listLoading="loading" />
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
    }
  },
  created(){
    this.loading = true;
    this.$store.dispatch("satellite/fetchData");
    this.loading = false;
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
