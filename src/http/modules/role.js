import * as axios from "@/http/axios";

export function findAll(url) {
    return axios.get(url);
}
