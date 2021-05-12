<template>
  <div
    id="app"
    v-if="username"
  >
    <main class="main">
      <router-view />
    </main>
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
    window.addEventListener('beforeunload', this.handleUnload)
    const username = localStorage.getItem('username')
    const prod = 'http://47.112.172.255:3000'
    const dev = 'http://192.168.0.127:3000'
    const production = process.env.production
    this.socket = io.connect(production ? prod : dev, {
      transports: ['websocket'],
      query: {
        token: 'tokenxxxxxxxxxxxxxxxxxxxxxxxxx'
      }
    })

    if (username) {
      console.error('111111111')
      this.socket.emit('login', username)
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
    this.socket.on('chat', msg => {
      console.error('chat', msg)
      this.$store.commit('handleMessage', msg)
    })
  },
  beforeDestroy () {
    this.handleUnload()
    window.removeEventListener('beforeunload', this.handleUnload)
  },
  methods: {
    handleUnload () {
      const username = localStorage.getItem('username')
      if (username) {
        this.socket.emit('logout', username)
      }
    }
  }

}
</script>

<style lang="scss">
#app {
  .header {
    height: 50px;
    line-height: 50px;
    padding: 0 16px;
  }
  .main {
    // height: calc(100vh - 100px);
    overflow-y: scroll;
  }
}
</style>
