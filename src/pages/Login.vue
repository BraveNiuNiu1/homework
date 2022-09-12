<template>
    <div>登录</div>
    <el-input placeholder="姓名" v-model="formData.name"/>
    <el-input placeholder="密码" type="password" v-model="formData.password"/>
    <el-button @click="login" :loading="loading">登录</el-button>
</template>

<script setup lang="ts">
    import axios from '../utils/axios'
    // import axios from 'axios'
    // import {ElInput, ElButton} from 'element-plus'
    import {ref, reactive} from 'vue'
    import {useRouter} from 'vue-router'
    import {useUserStore} from '../stores/user'
    // 导入存值方法
    import { setVal } from '../utils/storage'
    // 导入类型时，前面加type
    import type {ResponseData} from '../utils/types'


// vue-router提供的useRouter方法用来返回$router实例
    const router = useRouter()

// 都在文档里了
    const user = useUserStore()

/*  组合式API，使用<script setup> 语法糖：能让你少写点代码就叫语法糖，少敲点没有意义的代码
    响应式数据，有两种方式ref和reactive
    ref: 用来定义简单数据类型的number、string、boolean
    reactive：用来定义复杂/对象数据类型的object、array
    ref也可以用来定义object和array，但是ref读写数据需要使用.value，插值绑定除外
*/
    const loading = ref(false);
    const formData = reactive({
        name: '黄克林',
        password: '969056',
    })

// 定义对象类型
    // interface ResponseData{
    //     code: number
    //     msg: string
    //     data?: any
    //     // 除了string，可以是任何字段
    //     // [key: string]:any
    // }

    const login = async () => {
        loading.value = true
        // res类型为定义好的ResponseData类型
        const res: ResponseData = await axios.post('/login', formData)
        loading.value = false
        if(!res.code) {
            // 相当于$store.commit修改了mutations中的方法
            user.setName(res.data.name)
            // 登录成功存值
            setVal('token', res.data.token)
            router.push('/main')
        }
    }
</script>