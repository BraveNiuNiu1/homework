// 定义对象类型 用来约束后端返回数据的接口类型
export interface ResponseData{
    code: number
    msg: string
    data?: any
    // 除了string，可以是任何字段
    // [key: string]:any
}