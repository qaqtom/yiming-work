<template>
  <div class="satellite-sheets-container" ref="container">
    <el-dropdown class="menu" trigger="click" @command="handleCommand">
      <el-button type="primary">
        请选择<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, i) in satelliteNameArray"
          :key="i"
          :command="item"
          >{{ item }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <span class="current">当前选择：{{ current }}</span>
    <br />
    <el-input
      v-model="input"
      placeholder="请输入内容(可按enter进行搜索)"
      style="width: 300px"
      @keyup.enter.native="handleEnter"
    ></el-input>

    <el-button
      style="margin: 0 10px"
      type="primary"
      icon="el-icon-search"
      @click="handleClick"
      >搜索</el-button
    >
    <el-switch
      style="margin: 0 20px"
      v-model="value1"
      active-text="忽略大小写匹配"
    >
    </el-switch>
    <span
      >下表数量：<span style="font-weight: bold">{{
        this.currentData.length
      }}</span></span
    >

    <el-table
      :data="currentData"
      border
      style="width: 100%"
      v-loading="loading"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="name" label="数据名" width="100">
      </el-table-column>
      <el-table-column prop="descriptions" label="数据描述">
        <template slot-scope="scope">
          <span
            v-html="scope.row.descriptions.split('\n').join('<br><br>')"
          ></span>
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

<style lang="less">
.satellite-sheets-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
}
.menu {
  cursor: pointer;
  margin-bottom: 20px;
}
.current {
  font-weight: bold;
  margin: 0 50px;
  font-size: 25px;
  vertical-align: -6px;
  font-family: Hiragino Sans GB;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

<script>
export default {
  data() {
    return {
      currentData: [],
      current: "全部",
      input: "",
      value1: true,
    };
  },
  watch: {
    data: {
      handler(newData) {
        this.currentData = newData;
      },
      immediate: true,
    },
  },

  props: {
    data: {
      type: Array,
      default: () => [],
      required: true,
    },
    satelliteNameArray: {
      type: Array,
      default: () => [],
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleCommand(command) {
      if (command === "全部") {
        this.currentData = this.data;
        this.$message.success("已选择全部");
        this.current = `全部`;
      } else {
        this.currentData = this.data.filter(
          (item) => item.idOfName === `${command}`
        );
        this.current = `${command} 系列`;
        this.$message.success("已选择" + command);
      }
    },
    handleClick() {
      this.currentData = this.data.filter((item) => {
        if (this.value1) {
          return item.name
            .toLowerCase()
            .includes(this.input.toLocaleLowerCase());
        }
        return item.name.includes(this.input);
      });
      this.current = `当前选择：包含"${this.input}"`;
      this.$message.success("搜索成功");
    },
    handleEnter() {
      this.handleClick();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
  },
};
</script>

