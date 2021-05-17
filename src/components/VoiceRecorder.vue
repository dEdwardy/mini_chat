<template>
  <div class="voice-recorder">
    <div v-if="recording">
      recording...
    </div>
    <van-icon
      loading=""
      @touchstart="handleRecordStart"
      @touchend="handleRecordEnd"
      :size="40"
      name="volume-o"
    />
  </div>
</template>

<script>
// import convert from '@/utils/convertToMp3.js'
import Recorder from 'js-audio-recorder'
export default {
  name: 'voice-recorder',
  data () {
    return {
      recorder: null,
      // 记录状态
      recording: false
    }
  },
  mounted () {
    this.recorder = new Recorder()
  },
  beforeDestroy () {
    if (this.recorder) {
      this.recorder.destroy().then(() => {
        this.recorder = null
      })
    }
  },
  methods: {
    handleRecordStart () {
      this.recorder.start().then(() => {
        this.recording = true
        console.log('start')
      })
    },
    handleRecordEnd () {
      this.recorder.stop()
      this.recording = false
      console.log('end')
      // const blob = this.recorder.getPCMBlob()
      const blob = this.recorder.getWAVBlob()
      this.recorder.play()
      // const mp3Blob = convert(blob, this.recorder)
      this.$emit('voice-input', blob)
    }
  }
}
</script>

<style lang="scss" scoped>
.voice-recorder {
}
</style>
