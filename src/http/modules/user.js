

import * as axios from "@/http/axios";

export function findPermissions(url,params){
    return axios.get(url,params);
}
export function findUserList(url) {
    return axios.get(url);

}
export function  getUser(url,params){
    return axios.get(url,params)
}

export function insertUser(url,params){
    return axios.post(url,params);
}

export function editUser(url,params){
    return axios.post(url,params)
}

export function deleteUser(url,params){
    return axios.post(url,params)
}