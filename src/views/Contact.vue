<template>
  <div class="contact">
    <van-nav-bar class="header" safe-area-inset-top>
      <template #left>
        <img
          style="width:42px;height:42px;border-radius:50%"
          :src="avatar"
          alt=""
        >
        <div class="flex ">
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
    <div class="search-panel">

    </div>
    <div class="contact-list">
      <van-tabs
        v-model="active"
        :offset-top="50"
        sticky
      >
        <van-tab title="在线">
          <div class="onlines">
            <div
              class="item"
              @click="() => handleChat(user)"
              v-for="(user,idx) of onlineUsers"
              :key="idx"
            >
              <img
                class="left"
                :src="avatar"
                alt=""
              >
              <div class="right">
                <div class="name">
                  {{user}}
                </div>
                <div class="info">
                  xxxxxxxxxx
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="好友">

        </van-tab>
        <van-tab title="分组">

        </van-tab>
        <van-tab title="群聊">设备</van-tab>
        <van-tab title="设备">设备</van-tab>
        <van-tab title="通讯录">设备</van-tab>
        <van-tab title="订阅号">设备</van-tab>
      </van-tabs>
    </div>
     <van-tabbar v-model="active2" route>
      <van-tabbar-item to="/message" icon="chat-o">消息</van-tabbar-item>
      <van-tabbar-item to="/contact" icon="user-circle-o">联系人</van-tabbar-item>
      <van-tabbar-item to="/dynamic" icon="new-o">动态</van-tabbar-item>
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
    ...mapGetters(['onlineUsers', 'username'])
  },
  mounted () {
    console.error(this.onlineUsers)
  },
  methods: {
    handleChat (item) {
      this.$router.push({
        name: 'chat',
        params: {
          id: item
        }
      })
    },
    onSelect (action) {
      Toast(action.text)
    }
  }
}
</script>

<style lang="scss" scoped>
.contact {
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
  .contact-list {
    ::v-deep .van-tab {
      color: #aaa;
      width: 25%;
    }
    ::v-deep .van-tabs__line {
      top: 8px;
      width: 48px;
      height: 28px;
      border-radius: 12px;
      background-color: rgb(blue, 0.4);
      color: blue !important;
    }
    .onlines {
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
        .right {
          margin-left: 12px;
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
      }
    }
  }
}
</style>
