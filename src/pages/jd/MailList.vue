<template>
<ul>
  <li
    v-for="d in list"
    :key="d.name"
    @click="onClick(d)"
  >
    <p>{{ d.name }} - {{ hidePhone(d.phone) }}</p>
    <p>{{ d.address }}</p>
    <span v-if="formData[type].phone === d.phone">已勾选</span>
  </li>
</ul>
</template>

<script>
import { getVal, setVal } from '../../utils/storage'
import defaultData from './default-data'
export default {
  data() {
    return {
      list: [{
        name: '老王',
        phone: '13677778888',
        address: '北京昌平南口21号'
      }, {
        name: '老李',
        phone: '13800138001',
        address: '北京海淀中关村科技大厦'
      }],
      type: this.$route.query.type,
      formData: getVal('jd', defaultData)
    }
  },
  methods: {
    hidePhone(str) {
      // 正则的分组，小括号的分组匹配内容，可以在替换时用$加数字编号来时用
      return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    },
    onClick(d) {
      this.formData[this.type] = d
      setVal('jd', this.formData)
      this.$router.push('jd')
    }
  },
}
</script>
