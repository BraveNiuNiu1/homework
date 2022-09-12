<template lang="pug">
<!-- 在Vue3中响应式不要随便用解构赋值 -->
    header {{ user.name }}
    main
        Loading(v-if="loading") 
        //- h2(v-if="loading") Loading...
        template(v-else)
            //- 给HomeWork传入 :work
            Homework(v-if="work" :work="work")
            p(v-else) 暂无作业
</template>

<script setup lang="ts">
import Homework from '../components/HomeWork.vue'
import axios from '../utils/axios';
// 导入获取用户信息
import { useUserStore } from '../stores/user'
import { ref, onMounted } from 'vue';
// 导入类型时，前面要加type
import type { ResponseData } from '../utils/types'


const user = useUserStore()
// 进来就让它显示loading加载
const loading = ref(true)
const work = ref('')

// const getWork = async () => {
//     // res类型为定义好的ResponseData类型
//     const res: ResponseData = await axios.get('/work');
//     console.log(res);
//     work.value = res.data.work
//     // 请求完把loading改成false
//     loading.value = false
// }

const getWork = () => {
    // 泛型，类型是变量，看情况类型需要是动态的可以变化。具体是什么类型有代码决定，理解为占位符 
    axios.get<never, ResponseData>('work').then(res => {
        if(!res.code){
            work.value = res.data.work
            // 请求完把loading改成false
            loading.value = false
        }
    })
}

// setup中没有beforeCreate和created

// 请求接口
// onMounted(() => {
//     getWork()
// });
// setTimeout(getWork, 1000)

// 下面代码是上面的简写
onMounted(getWork);


</script>

<style lang="sass">
    header
        position: fixed
        top: 0
        left: 0
        width: 100%
        line-height: 60px
        padding: 0 50px
        background: #fff
        border-bottom: 1px solid #f0f0f0
    main
        padding: 100px
        text-align: center
</style>