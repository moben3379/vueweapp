import * as axios from "@/http/axios";
import {get} from "@/http/axios";

export function systemMenuList(url){
    return axios.get(url);
}

export function addMenu(url,params){
    return get(url,params);
}

export function updateMenu(url,params){
    return get(url,params);
}

export function deleteMenu(url,params){
    return get(url,params);
}