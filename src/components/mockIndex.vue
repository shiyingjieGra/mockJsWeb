<template>
  <div class="container">
    <el-button @click="trunPage('/primary')">初级应用</el-button>
    <el-button @click="trunPage('/middle')">进阶应用</el-button>
    <el-button @click="trunPage('/advanced')">高级应用</el-button>
  </div>
</template>

<script>

export default {
  name: 'mockIndex',
  data () {
    return {
    }
  },
  methods: {
    trunPage (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  justify-content: center;
  margin-top: 20%;
}
</style>
