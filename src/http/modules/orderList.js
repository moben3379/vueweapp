import * as axios from "@/http/axios";

export function orderList(url,params){
    return axios.get(url,params);
}

export function deleteOrderByOrderId(url,params) {

    return axios.post(url,params);
}


export function searchOrderList(url,params){

    return axios.post(url,params);
}