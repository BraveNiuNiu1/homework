<template lang="pug">
p 请在规定时间完成作业并上传提交
ElButton(type="primary" @click="onClick" :disabled="disabled") 上传文件
//- multiple属性 文件批量上传  把原装的input隐藏
input(ref="fileInput" type="file" multiple @change="onChange")
p 文件格式为zip、rar、7z、txt、js、html、css、sass、vue、doc、docx、ppt、pptx、md、png、jpg、jpeg、gif等，小于10M，请勿提交node_modules
</template>

<script setup lang="ts">
// 导入消息提示框
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from '../utils/axios'
import {ref, onMounted, inject} from 'vue'
import type { ResponseData } from '../utils/types'
// 导入撒花组件
import JSConfetti from 'js-confetti'

// 传入作业id
const props = defineProps({
    id:{
        type:Number,
        default: 0
    }
})

// 组件抛出的自定义事件，需要事先定义
const emit = defineEmits(['finish', ])

// 后代组件中通过inject获取数据，获取provide的数据
const disabled = inject('disabled')

function upload(file: File){
    // 前端上传文件 

    // new一个formData对象
    const formData = new FormData()
    // 添加字段文件id 文件 
    formData.append('id', props.id + '')
    formData.append('file', file)
    // 定义泛型，约束数据 请求接口提交数据 第二个参数是传入的数据   
    axios.post<never, ResponseData>('/upload', formData,{
        // 为文件上传处理进度事件百分比
        onUploadProgress(e){
            // total文件大小 loaded上传了多少
            console.log(e);
        }
        // onUploadProgress({loaded, total}) {
        //     console.log(`文件上传了${loaded / total * 100}%`);
        // }

    // 传入一个类型变量最后成为Promise成功返回的类型 
    }).then(res => {
        if(!res.code){
            //撒花功能
            (new JSConfetti()).addConfetti()
            // 
            emit('finish')
        }
    })
}

// 定义一个变量等于ref
// const fileInput = ref(null)

// onMounted(() => {
//     console.log(document.querySelector('input'))
//     // 相当于this.$refs.fileInput
//     console.log(fileInput.value)
    
// })

// 前端文件校验。规定File为文件类型
function check(file: File){
    // name:"vue.min.js"
    // size:94151
    const {name, size} = file
    // 判断后缀有没有 找到最后最后一项  pop从数组中删除最后一个元素并返回该元素，
    const fileType = name.split('.').pop() || ''
    // 94151B / 1024 / 1024把它变成MB
    const fileSize = size / 1024 / 1024
    let errMsg = ''
    if(!['zip','rar','7z','txt','js','html','css','sass','vue','doc','docx','ppt','pptx','md','png','jpg','jpeg','gif'].includes(fileType)){
        errMsg = '文件类型不合法'
    }else if(fileSize > 10){
        errMsg = '文件大小不允许超过10MB'
    }
    // if(errMsg) ElMessage.error(errMsg)
    if(errMsg){
        ElMessageBox.alert(errMsg, {
            confirmButtonText: '知道了',
        })
        return false
    }else{
        return true
    }
    // 这个后缀在不在这个数组里
}

// 给ref使用泛型定义类型
const fileInput = ref<HTMLButtonElement | null>(null)

const onChange = (event: Event) =>{
    // console.log((event.target as HTMLInputElement).files);

    // HTMLInputElement类型断言 在识别不出来类型时告诉它
    const file = ((event.target as HTMLInputElement).files || [null])[0]
    if(!file) return
    // file存在执行file
    // file && check(file)
    if(check(file)) upload(file)
}

// DOM调用方法就相当于点击它
const onClick = () => {
    // fileInput是通过ref拿到的元素
    fileInput.value?.click()
}
</script>


<style lang="sass" scoped>
input 
    display: none
</style>