/**
 * 存储localStorage 
 * 
 */
export const setStore = (name:string,content:any)=>{
    if(!name)return
    if(typeof content !=="string"){
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name,content)
}

//获取localStorage
export const getStore = (name:string)=>{
    if(!name)return;
    return window.localStorage.getItem(name)
}

/** 
 * 删除localStorage
 * 
*/
export const remove = (name:string)=>{
    if(!name)return
    window.localStorage.removeItem(name)
}