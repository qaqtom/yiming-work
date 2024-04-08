<template>
  <div class="satellite-sheets-container" ref="container">
    <el-dropdown class="menu" trigger="click" @command="handleCommand">
      <el-button type="primary">
        请选择<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, i) in BigData"
          :key="i"
          :command="item"
          >{{ item }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>

    <el-table
      :data="data"
      stripe
      border
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column prop="name" label="数据名" width="100">
      </el-table-column>
      <el-table-column prop="descriptions" label="数据描述">
        <template slot-scope="scope">
          <span v-html="scope.row.descriptions.split('\n').join('<br>')"></span>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="时间段" width="200">
      </el-table-column>
      <el-table-column prop="note" label="备注">
        <template slot-scope="scope">
          <span v-html="scope.row.note.split('\n').join('<br>')"></span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      BigData: [],
      originData:[],
    };
  },
  created() {
    setTimeout(() => {
      this.data.forEach((item) => {
      if (!this.BigData.includes(item.idOfName)) {
        this.BigData.push(item.idOfName);
      } 
      this.originData = this.data;
    });
    }, 1000);
    
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleCommand(command) {
      this.data = this.originData.filter(item => item.idOfName === `${command}`);
      this.$message.success("已选择"+command);
    },
  },
};
</script>

<style scoped>
.satellite-sheets-container {
  width: 100%;
}
.menu {
  cursor: pointer;
  margin-bottom: 20px;
}
</style>