import axios from 'axios';
// 取stroage
import { getVal } from "./storage";
import { ElMessage } from 'element-plus';

// 通过创建实例的方式使用axios，可以更方便自由地定义更多的公共配置项
const instance = axios.create({
    baseURL: '/api',
    timeout: 20000
})

// 请求拦截器，两个参数成功 失败
instance.interceptors.request.use(config => {
    console.log(config);
    // 除登录接口除外，其他接口都需要在请求头中放token
    if(config.url !== '/login'){
        // 如果找不到就是空
        const token = getVal('token', '')
        // 给config.headers添加约束
        if(token && config.headers){
            // 给请求头里面添加特殊字段  Authorization是后端规定的名称
            // 在不存在的属性上找一个东西会报错
            config.headers.Authorization = 'Bearer ' + token;
        }
    }
    // console.log(config);
    return config
}, err => Promise.reject(err));

// 响应拦截器，两个参数成功 失败
instance.interceptors.response.use(({data}) => {
    if(data.code > 0){
        // 报错弹窗
        ElMessage.error(data.msg);
    }
    return data
}, err => Promise.reject(err));

export default instance;