import {createStore} from "vuex";
import menu from "@/store/modules/menu";
import vuexAlong from "vuex-along";
import user from "@/store/modules/user";
import role from "@/store/modules/role"

const store = createStore({
    modules :{
        menu,
        user,
        role,
    },
    plugins: [vuexAlong({
        name: 'navTree',
        local: {
            navTree:["menu.navTree"]
        },
    })]
})
export default store