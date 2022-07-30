import * as axios from "@/http/axios";

export function orderList(url,params){
    return axios.get(url,params);
}