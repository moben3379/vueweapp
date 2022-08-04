import * as axios from "@/http/axios";


export function findMenuInformation(url,params){
    return get(url,params);
}

export function alterMenuInformation(url,params){
    return get(url,params);
}

export  function  searchMenu (url,params){
    return post(url,params)


export function addMenuInformation(url,params){
    return get(url,params);
}

export function deleteMenu(url,params) {
    return axios.post(url,params);

}