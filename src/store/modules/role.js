

export default {
    state: {
        // 全局属性
        // 如果没有模块化，很多模块的属性，都在这里声明
        Role: []
    },
    // 同步操作赋值
    mutations: {
        // 赋值操作
        setRole(state, role) {
            state.role = role;
            console.log("给Role赋值：", role)
        }
    },
    actions: {
        /*
        如果有异步操作，网络请求某个数据后，再进行赋值
        异步：同时进行，不用等待；
         */
        setRole(ctx,payload){
            console.log('载荷：', payload.data);
            console.log('type: ', payload.type)
            ctx.commit(payload.type,payload.data);//调用mutation的setNavTree
        }
    },
    getters: {
        getRole(state) {
            return state.role
        }
    },

}