<template>
    <p>已于{{ dayjs(updateTime).format('YYYY-MM-DD HH:mm:ss') }}提交</p>
    <a :href="fileUrl" target="_blank">{{ fileName }}</a>
    <ElPopconfirm title="确认删除吗？" confirm-button-text="确认删除" cancel-button-text="暂时不删" @confirm="confirm">
        <template #reference>
            <ElButton :disabled="disabled" type="primary">删除文件重新上传</ElButton>
        </template>
    </ElPopconfirm>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import axios from '../utils/axios'
import type { ResponseData } from '../utils/types'
import {inject} from 'vue'

const props = defineProps({
    id: { type: Number, default: 0 }, // 作业ID
    fileName: { type: String, default: '' }, // 上传文件名
    fileUrl: { type: String, default: '' }, // 上传文件路径
    updateTime: { type: Number, default: 0 }, // 上传文件时间
})

// 组件抛出的自定义事件，需要事先定义
const emit = defineEmits(['finish',])

// 后代组件中通过inject获取数据，获取provide的数据
const disabled = inject('disabled')

const confirm = () => {
    axios.post<never, ResponseData>('/del', {
        id: props.id
    }).then(({ code }) => {
        if (!code) emit('finish')
    })
}

</script>