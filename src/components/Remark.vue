<template lang="pug">
p 无法再规定时间提交，请务必补充原因
ElInput(placeholder="输入未提交作业的原因，视角保存" v-model="remark" :disabled="disabled" @blur="onBlur")
p 原因请在截至事件之前填写，超过规定时间将无法保存
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {inject} from 'vue'
import axios from '../utils/axios'

// 后代组件中通过inject获取数据，获取provide的数据
const disabled = inject('disabled')

const props = defineProps({
        id: {type: Number, default: 0},
        remark: {type: String, default:''},
    })

const loaclRemark = ref('')
    // 给loaclRemark赋值
onMounted(() => loaclRemark.value = props.remark)

const onBlur = () => {
    console.log(1);
    axios.post('/remark',{
        id: props.id,
        remark: props.remark
    }).then(res => {
        console.log(res);
    });
}



</script>