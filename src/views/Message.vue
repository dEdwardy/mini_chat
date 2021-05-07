<template>
  <div class="message">
    message
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/message" icon="chat-o">消息</van-tabbar-item>
      <van-tabbar-item to="/contact" icon="user-circle-o">联系人</van-tabbar-item>
      <van-tabbar-item to="/dynamic" icon="new-o">动态</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style>

</style>
