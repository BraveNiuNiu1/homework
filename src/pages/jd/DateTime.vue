<template>
<div class="date-time-mask">
  <div class="date-time">
    <div class="t">
      期望上门时间
      <button>X</button>
    </div>
    <div class="b">
      <ul class="l">
        <li
          v-for="d in dateList"
          :key="d.label"
          :style="{ 'color': d.label === label ? 'white' : 'gray', 'background': d.label === label ? 'black' : 'white' }"
          @click="label = d.label; date = d.date"
        >{{ d.label }}</li>
      </ul>
      <ul class="r">
        <li
          v-for="d in timeList"
          :key="d"
          @click="onClick(d)"
        >{{ d }}</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
function fillZero(n) {
  return n < 10 ? '0' + n : n;
}

export default {
  props: ['modelValue'],
  data() {
    return {
      // 左边的备选项
      dateList: [],
      label: '', // 今天、明天、后天
      date: '',
      startTime: '',
      endTime: ''
    }
  },
  created() {
    this.label = this.modelValue.label
    this.date = this.modelValue.date
    this.startTime = this.modelValue.startTime
    this.endTime = this.modelValue.endTime

    const date = new Date()
    if (date.getHours() <= 17) {
      this.dateList.push({
        label: '今天',
        date: fillZero(date.getMonth() + 1) + ':' + fillZero(date.getDate())
      })
    }
    const thisYear = date.getFullYear()
    const thisMonthIndex = date.getMonth()
    const thisDate = date.getDate()

    const nextDay1 = new Date(thisYear, thisMonthIndex, thisDate + 1)
    this.dateList.push({
      label: '明天',
      date: fillZero(nextDay1.getMonth() + 1) + ':' + fillZero(nextDay1.getDate())
    })
    const nextDay2 = new Date(thisYear, thisMonthIndex, thisDate + 2)
    this.dateList.push({
      label: '后天',
      date: fillZero(nextDay2.getMonth() + 1) + ':' + fillZero(nextDay2.getDate())
    })
  },

  computed: {
    timeList() {
      const arr = [];
      for (let i = 8; i < 18; i++) {
        arr.push(`${fillZero(i)}:00-${fillZero(i + 1)}:00`)
      }
      if (this.label === '今天') {
        const h = new Date().getHours()
        if (h > 7) arr.splice(0, h - 7)
      }
      return arr
    }
  },

  methods: {
    onClick(d) {
      console.log({
        label: this.label,
        date: this.date,
        startTime: d.split('-')[0],
        endTime: d.split('-')[1]
      })
      this.$emit('change', {
        label: this.label,
        date: this.date,
        startTime: d.split('-')[0],
        endTime: d.split('-')[1]
      })
    }
  }
}
</script>

<style lang="sass">
.date-time-mask
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  background: rgba(0,0,0,.6)
.date-time
  position: fixed
  right: 0
  bottom: 0
  left: 0
  height: 50vh
  background: white
  .b
    display: flex
    .l
      flex: 1
    .r
      flex: 2
</style>
