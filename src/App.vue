<template>
  <div id="app" v-if="username">
    <main class="main">
      <router-view />
    </main>
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/message" icon="chat-o">消息</van-tabbar-item>
      <van-tabbar-item to="/contact" icon="user-circle-o">联系人</van-tabbar-item>
      <van-tabbar-item to="/dynamic" icon="new-o">动态</van-tabbar-item>
    </van-tabbar>
  </div>
  <Home v-else />
</template>
<script>
import Home from '@/views/Home.vue'
import { mapGetters } from 'vuex'
const io = require('socket.io-client')
export default {
  components: {
    Home
  },
  data () {
    return {
      socket: null,
      active: 0
    }
  },
  computed: {
    ...mapGetters(['username'])
  },
  provide () {
    return {
      app: this
    }
  },
  mounted () {
    this.socket = io.connect('http://localhost:3000', {
      query: {
        token: 'tokenxxxxxxxxxxxxxxxxxxxxxxxxx'
      }
    })

    if (localStorage.getItem('username')) {
      console.error('111111111')
      this.socket.emit('online_users')
      localStorage.removeItem('username')
    }
    this.socket.on('online_users', users => {
      console.error(users)
      this.$store.commit('setOnlineUsers', users)
    })
    this.socket.on('onlineChange', () => {
      console.error('更新好友列表')
      this.socket.emit('online_users')
    })
    this.socket.on('message', msg => {
      console.error(msg)
    })
  },
  methods: {
  }

}
</script>

<style lang="scss">
#app{
  .header{
    height: 50px;
    line-height: 50px;
    padding:0 16px;
  }
  .main{
    height: calc(100vh - 100px);
    overflow-y: scroll;
  }
}
</style>
