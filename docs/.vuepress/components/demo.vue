<template>
  <div class="demo">
    {{ msg }}
    <el-button>button</el-button>   // 使用了el-button
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'just say hi'
    }
  }
}
</script>