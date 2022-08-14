
import * as login from "@/http/modules/login";
import * as role from "@/http/modules/role"
import * as menu from "@/http/modules/menu"
import * as user from "@/http/modules/user";
import * as foodmenu from "@/http/modules/foodmenu"
import * as systemMenu from "@/http/modules/systemMenu";
import {deleteOrderByOrderId, orderList, searchOrderList} from "@/http/modules/orderList";


export default {
    login,
    role,
    menu,
    user,
    systemMenu,
    foodmenu,
    orderList,
    searchOrderList,

    deleteOrderByOrderId
}
