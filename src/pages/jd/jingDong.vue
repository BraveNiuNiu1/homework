<template>
<div class="jd">
  <div @click="$router.push('/mail-list?type=to')">
    <p>收件人</p>
    <h2 v-if="formData.to.name">{{ formData.to.name }}</h2>
    <h2 v-else>选择收件人</h2>
  </div>
  <div @click="$router.push('/mail-list?type=from')">
    <p>寄件人</p>
    <h2 v-if="formData.from.name">{{ formData.from.name }}</h2>
    <h2 v-else>选择寄件人</h2>
  </div>
  <div @click="show = true">
    <p>期望上门时间</p>
    <p>{{ formData.dateTime.label }} {{ formData.dateTime.startTime }}-{{ formData.dateTime.endTime }}</p>
  </div>
  <date-time
    v-if="show"
    :modelValue="formData.dateTime"
  />
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getVal, setVal } from '../../utils/storage'
import defaultData from './default-data'
import DateTime from './DateTime.vue'
// 选项式API
export default defineComponent({
  components: { DateTime },
  data() {
    return {
      formData: getVal('jd', defaultData),
      show: false
    }
  },
  // Vue3把destroy改成了unmount
  beforeUnmount() {
    setVal('jd', this.formData)
  }
})
</script>
