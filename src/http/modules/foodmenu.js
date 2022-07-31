
import {get} from "@/http/axios"

export function findMenuInformation(url,params){
    return get(url,params);
}

export function alterMenuInformation(url,params){
    return get(url,params);
}