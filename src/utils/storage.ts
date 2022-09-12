// 本地存储，冲当key 省得每次重复写了
const STORAGE_KEY = 'homework-storage'

// 取storage对象
function getData(){
    // 取不到放空对象
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
}

// 设置storage，key value
function setVal(key: string, val: any){
    // 先取出storage
    const data = getData()
    // 原来有就修改，没有就添加
    data[key] = val
    // 取出后，存起来
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// 获取storage ,key 默认值
function getVal(key: string, defaultVal: any){
    const data = getData()
    // 没有值/不存在返回defaultVal，存在返回data[key]
    return data[key] === undefined ? defaultVal : data[key]
}

export {setVal, getVal}