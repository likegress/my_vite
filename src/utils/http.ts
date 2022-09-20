
import { AxiosResponseEx } from "../model/params";
import service from "./request"

//get请求封装
const getAction = async (url:string,params:object):Promise<AxiosResponseEx> => {
    return (await service({
        url,
        method:'GET',
        params
    })) as unknown as AxiosResponseEx
}
//post 请求
const postAction = async (url:string,data:object,params?:object):
Promise<AxiosResponseEx>=>{
    return (await service({
        url,
        method:'POST',
        params,
        data,
    })) as unknown as AxiosResponseEx;
}

//del请求
const delAction = async (url:string,data:object,params?:object):
Promise<AxiosResponseEx> =>{
    return (await service({
        url,
        method:'DELETE',
        params,
    }))as unknown as AxiosResponseEx
}
//put 请求
const putAction = async(url:string,params:object):
Promise<AxiosResponseEx> =>{
    return (await service({
        url,
        method:"PUT",
        params
    }))as unknown as AxiosResponseEx
}

export { getAction, postAction, putAction, delAction };
