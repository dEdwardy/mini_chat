<template>
  <div class="chat">
    <van-nav-bar
      class="linear-bg"
      @click-left="() => $router.back()"
    >
      <template slot="left">
        <van-icon
          :size="20"
          color="#fff"
          name="arrow-left"
        />
      </template>
      <template slot="title">
        <span style="color:#fff">{{$route.params.id}}</span>
      </template>
      <template slot="right">
        <van-icon
          style="margin-right:12px"
          :size="20"
          color="#fff"
          name="phone-o"
        />
        <van-icon
          :size="20"
          color="#fff"
          name="apps-o"
        />
      </template>
    </van-nav-bar>
    <div class="chat-records">

    </div>
    <div class="actions">
      <div>

      </div>
      <div class="tools"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.chat {
  .chat-records{
    height: calc(100vh - 130px);
    overflow-x:scroll;
  }
  .actions{
    height: 80px;
    background: red;
  }
}
</style>
