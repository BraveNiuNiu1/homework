<template lang="pug">
Loading(v-if="loading")
template(v-else)
    Countdown(:day="info.day" :nowTime="info.now_time" :endTime="info.end_time")
    ElCard {{work}}
    DeleteFile(v-if="info.file_name"  :id="info.id" :file-name="info.file_name" :file-url="info.file_url" :updata-time="info.id" @finish="getInfo")
    Upload(v-else :id="info.id" @finish="getInfo")
    Remark(v-if="!info.file_name" :id="info.id" :remark="info.remark")
    <p>{{ info }}</p>
</template>

<script setup lang="ts">
import axios from '../utils/axios'
import type { ResponseData } from '../utils/types'
import { onMounted, ref, computed, provide } from 'vue'
// 删除
import DeleteFile from './DeleteFile.vue'
// 上传
import Upload from './Upload.vue'
// 不交作业原因
import Remark from './Remark.vue'


const props = defineProps({
    work:{
        type: String,
        default: ''
    }
})

const loading = ref(true)
const info = ref({
    id: 0, // 作业ID
    day: '', // 作业日期
    now_time: 0, // 当前时间
    end_time: 0, // 截止时间
    file_name: '', // 上传文件名
    file_url: '', // 上传文件路径
    update_time: 0, // 上传文件时间
    remark: '', // 不交作业理由
})

const disabled = computed(() => info.value.now_time >= info.value.end_time)

// provide给父组件给所有的子组件提供数据，后代组件中通过inject获取数据，获取provide的数据
provide('disabled', disabled)

// 封装
const getInfo = async() => {
    // 看看有没有作业
    loading.value = true
    const res: ResponseData = await axios.get('/info');
    if (!res.code){
        info.value = res.data
        loading.value = false
    } 
}

onMounted(getInfo)
// onMounted(async () => {
//     // 看看有没有作业
//     const res: ResponseData = await axios.get('/info');
//     if (!res.code){
//         info.value = res.data
//         loading.value = false
//     } 
// })

</script>
