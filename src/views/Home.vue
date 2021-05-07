<template>
  <div class="home">
    <div >
      <input
        v-model="name"
        placeholder="请输入用户名"
      />
      <button @click="login">确定</button>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  inject: ['app'],
  data () {
    return {
      name: '',
      showInput: !localStorage.getItem('username'),
      users: []
    }
  },
  mounted () {
    // this.app.socket.on('message', res => console.error(res))
    // this.app.socket.on('online_users', users => {
    //   this.users = users
    // })
  },
  methods: {
    login () {
      if (this.name.trim() === '') return
      this.$store.commit('setUsername', this.name)
      localStorage.setItem('username', this.name)
      this.app.socket.emit('login', this.name)
      this.app.socket.emit('online_users', '')
      this.$router.push({
        name: 'contact'
      })
      this.$forceUpdate()
    }
  }
}
</script>
