// 用户信息

import { defineStore } from 'pinia'
// 引入获取设置本地存储
import { setVal, getVal } from '../utils/storage'

// 定义数据仓库
export const useUserStore = defineStore('user', // 名称
    {  
        state: () => ({name: getVal('name', '')}),// 导出用户名， 不存在赋值空
        actions:{
            setName(name: string){
                this.name = name
                setVal('name', name)
            }
        }
    }
)