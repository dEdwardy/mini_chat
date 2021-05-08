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
      <div class="flex px-2 align-center py-1" :class="item.from == username ? 'me' :'other' " v-for="(item,index) of records" :key="index">
        <img :src="avatar" style="width:36px;height:36px;border-radius:50%;margin:0 12px">
        <div >
          <div class="flex " :class="item.from == username ? 'justify-end' :'' ">
            {{item.from}}
          </div>
          <div class="msg">
          {{ item.msg }}
          </div>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="flex align-center px-2">
        <van-field
          class="input-area"
          v-model="msg"
          clearable
        />
        <van-button
          @click="handleSendMsg"
          :disabled="!msg"
          type="info"
          size="small"
          style="width:64px;margin-left:5px;height:36px"
        >发送</van-button>
      </div>
      <div class="tools flex align-center justify-between px-2">
        <van-icon
          class="flex-1"
          :size="24"
          name="phone-circle-o"
        />
        <van-icon
          class="flex-1"
          :size="24"
          name="photo-o"
        />
        <van-icon
          class="flex-1"
          :size="24"
          name="video-o"
        />
        <van-icon
          class="flex-1"
          :size="24"
          name="gold-coin-o"
        />
        <van-icon
          class="flex-1"
          :size="24"
          name="smile-o"
        />
        <van-icon
          class="flex-1"
          :size="24"
          name="add-o"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import avatar from '@/assets/avatar.jpg'
export default {
  inject: ['app'],
  data () {
    return {
      avatar,
      // 发送的消息
      msg: '',
      // 我的发言
      mine: []
    }
  },
  computed: {
    ...mapGetters(['username', 'messages', 'messages_send']),
    // records(){
    //   const recieveMsg =  this.messages ?  this.messages.filter(i => i.from == this.$route.params.id) :[];
    //   return
    // }
    records () {
      const from = this.messages.filter(i => i.from === this.$route.params.id)
      const send = this.messages_send.filter(i => i.to === this.$route.params.id)
      return [...send, ...from].sort((pre, cur) => pre.time - cur.time)
    }
  },
  methods: {
    handleSendMsg () {
      const data = {
        from: this.username,
        to: this.$route.params.id,
        msg: this.msg,
        time: Date.now()
      }
      this.app.socket.emit('chat', data)
      this.$store.commit('handleSendMessage', data)
      this.msg = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.chat {
  background-color: #ecedf1;
  .chat-records {
    height: calc(100vh - 80px - 46px);
    overflow-x: scroll;
    .me{
      flex-direction: row-reverse;
      .msg{
        background-color: rgba(52, 178, 253, 1);
        color:#fff;
        &::after{
          position:absolute;
          right:0;
          content: '';
          width:4px;
          height: 4px;
          color:transparent;
          background-color: rgba(52, 178, 253, 1);
        }
      }
    }
    .other{
      flex-direction: row;
      .msg{
        background-color: #fff;
        color: rgba(80, 80, 80, 1);
        &::before{
          position:absolute;
          color:transparent;
          left:0;
          content: '';
          width:4px;
          height: 4px;
          background-color: #fff;
        }
      }
    }
    .msg{
      position:relative;
      padding:5px 16px;
      border-radius: 16px;
      font-size: 14px;
    }
  }
  .actions {
    height: 80px;
    .input-area {
      padding: 2px 12px;
      line-height: 32px;
      border-radius: 2px;
      & ::v-deep .van-field__control {
        height: 32px;
      }
    }
  }
  .tools {
    height: 44px;
    line-height: 44px;
  }
}
</style>
