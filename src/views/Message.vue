<template>
  <div class="message">
    <van-nav-bar class="header">
      <template #left>
        <img
          style="width:42px;height:42px;border-radius:50%"
          :src="avatar"
          alt=""
        >
        <div>
          <div class="username">{{ username }}</div>
          <div class="state">Online</div>
        </div>
      </template>
      <template #right>

        <van-popover
          v-model="showPopover"
          trigger="click"
          :actions="actions"
          @select="onSelect"
          placement="bottom-end"
        >
          <template #reference>
            <van-icon
              color="#fff"
              name="plus"
            />
          </template>
        </van-popover>
      </template>
    </van-nav-bar>
    <div class="message-list">
      <div
        class="item"
        @click="() => handleChat(item)"
        v-for="(item,idx) of messages"
        :key="idx"
      >
        <img
          class="left"
          :src="avatar"
          alt=""
        >
        <div class="middle">
          <div class="name">
            {{item.from}}
          </div>
          <div class="info">
            {{ item.msg }}
          </div>
        </div>
        <div class="right">
          <div class="flex align-center justify-center time">
            {{ item.time | date('MM-DD HH:mm')}}
          </div>
          <div class="unread-nums flex align-center justify-center">
            <van-badge :content="128" :max="99" color="#aaa"/>
          </div>
        </div>
      </div>
    </div>
    <van-tabbar
      v-model="active"
      route
    >
      <van-tabbar-item
        to="/message"
        icon="chat-o"
      >消息</van-tabbar-item>
      <van-tabbar-item
        to="/contact"
        icon="user-circle-o"
      >联系人</van-tabbar-item>
      <van-tabbar-item
        to="/dynamic"
        icon="new-o"
      >动态</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import avatar from '@/assets/avatar.jpg'
import { mapGetters } from 'vuex'
import { Toast } from 'vant'

export default {
  data () {
    return {
      active: 0,
      active2: 0,
      avatar,
      list: new Array(20).fill(true),
      showPopover: false,
      actions: [
        { text: '创建群聊', icon: 'add-o' },
        { text: '加好友/群', icon: 'friends-o' },
        { text: '扫一扫', icon: 'scan' }
      ]
    }
  },
  computed: {
    ...mapGetters(['onlineUsers', 'username', 'messages', 'unreadMessages'])
    // msgFrom(){
    //   // let arr = this.messages.map(i => ({ from:i.from,time:i.time,msg:i.msg}))
    //   let arr = []
    //   this.messages.forEach(msg => {
    //     if(!arr.includes(msg.from)){
    //       arr.push(msg)
    //     }else{
    //       let old = arr.filter(i => i.from === msg.from)[0];
    //       if(msg.time > old.time){
    //         arr.splice(index,1,msg)
    //       }
    //     }
    //   });
    // }
  },
  methods: {
    onSelect (action) {
      Toast(action.text)
    },
    handleChat (item) {
      this.$router.push({
        name: 'chat',
        params: {
          id: item.from
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  .header {
    .username {
      margin-top: 4px;
      font-size: 16px;
      margin-left: 12px;
      color: #fff;
      line-height: 32px;
      height: 28px;
    }
    .state {
      line-height: 18px;
      height: 18px;
    }
    background: linear-gradient(120deg, rgba(blue, 0.2), rgba(blue, 0.5));
  }
  .message-list {
      .item {
        &:link,
        &:visited,
        &:hover,
        &:active {
          background: rgba(0, 0, 0, 0.1);
          color: #fff;
        }
        display: flex;
        align-content: center;
        padding: 8px 32px;
        .left {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .middle {
          margin:0 12px;
          flex: 1;
          .name {
            font-size: 16px;
            color: #000;
          }
          .info {
            margin-top: 6px;
            font-size: 14px;
            height: 14px;
            line-height: 14px;
            color: #aaa;
          }
        }
        .right{
          text-align: right;
          word-wrap: nowrap;
          color: #aaa;
          .time{
            font-size: 14px;
          }
          .unread-nums{
            margin-top:6px;
          }
        }
      }
    }
}
</style>
