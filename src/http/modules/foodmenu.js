
import {get} from "@/http/axios"
import * as axios from "@/http/axios";

export function findMenuInformation(url,params){
    return get(url,params);
}

export function alterMenuInformation(url,params){
    return get(url,params);
}

export function deleteMenu(url,params) {
    return axios.post(url,params);
}