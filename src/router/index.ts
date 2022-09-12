import { createRouter, createWebHashHistory } from 'vue-router';
import {getVal} from '../utils/storage'

const routes =[{
    path:'/',
    redirect: '/login'
},{
    path:'/login',
    component: () => import('../pages/Login.vue'),

    // 独享守卫
    beforeEnter() {
        console.log('进入登陆页面');
        return true //让进
        // return false //不让进
    }
},{
    path:'/main',
    component: () => import('../pages/Main.vue') 
},{
    path:'/jd',
    component: () => import('../pages/jd/jingDong.vue') 
},{
    path:'/mail-list',
    component: () => import('../pages/jd/MailList.vue') 
}];

const router = createRouter({
    routes,
    // 路由模式
    history: createWebHashHistory()
});

// 异步成功.then拿到数据 
// 全局导航守卫，所有页面，只要跳转进入某个页面，也可以放行，也可以拦住不让访问
// to要去页面的路由对象路径, from来自哪里
// beforeEach 如果返回ture就放行,如果返回false就拦截
router.beforeEach( (to, from) => {
    // console.log(to, from);
    if(to.path === '/login') return true

    const token = getVal('token', '')
    // return !!token
    return token ? true : false
    
})

export default router;


