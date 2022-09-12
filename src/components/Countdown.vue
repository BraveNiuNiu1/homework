<template lang="pug">
h2 {{day}}，作业提交时间为今天 {{endTimeStr}} 之前
p(v-if="time > 0") 距离截止时间还剩：{{countdownStr}}
p(v-else) 提交时间已到
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { timePickerDefaultProps } from 'element-plus';
import { ref, computed, onMounted } from 'vue';

// 定义props
const props = defineProps({
    // 作业日期
    day:{
        type: String,
        default: ''
    },
    // 当前时间
    nowTime:{
        type: Number,
        default: 0
    },
    // 截至时间
    endTime:{
        type: Number,
        default: 0
    }
})

// 剩余的时间秒数
const time = ref()



const endTimeStr = computed(() => 
    // setup中，通过props读取
    dayjs(props.endTime).format('HH点MM分') )

// 剩余几小时几分几秒
const countdownStr = computed (() => {
    const h = Math.floor(time.value / 3600)
    const m = Math.floor((time.value - h * 3600) / 60)
    const s = time.value - h * 3600 - m * 60
    return `${h}小时${m}分钟${s}秒`

})

const countdown =() => {
    const timeId = setInterval(() => {
        time.value--
        // 为0时停止定时器
        if(time.value === 0){
            clearInterval(timeId)
        }
    }, 1000)
}

onMounted(() => {
    // 剩余时间
    time.value = Math.floor((props.endTime - props.nowTime) / 1000);
    countdown()
})
</script>