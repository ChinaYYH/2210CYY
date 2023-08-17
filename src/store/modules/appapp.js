import { appapp, nameList } from '@/api/user'
export default {
    namespaced: true,
    state: {
        // data: [],
        nameguan: []
    },
    mutations: {
        // setsToken(state, data) {
        //     // 循环获取到的数据
        //     data.forEach(i => {
        //         // 判断pid是否是0
        //         if (i.pid == 0) {
        //             // 如果是添加的新数组,并添加一个子
        //             state.data.push({ ...i, children: [] })
        //             // 判断pid是否是1
        //         } else if (i.pid == 1) {
        //             // 循环新数组
        //             state.data.forEach(item => {
        //                 // 将pid是1的数据添加到pid是0的下面,给每个
        //                 item.children.push({ ...i, children: [] })
        //             })
        //             // pid为其他的
        //         } else {
        //             // 循环新数组
        //             state.data.forEach(it => {
        //                 // 再次循环pid是0的
        //                 it.children.forEach(ele => {
        //                     // 判断数据里的数据pid是否等于新数组的id
        //                     if (ele.id == i.pid) {
        //                         // 添加到pid相等于id的children里
        //                         ele.children.push({
        //                             ...i
        //                         })
        //                     }
        //                 })
        //             })
        //         }
        //     });
        //     // console.log(state.data);
        // },
        nameguanli(state, data) {
            data.forEach(i => {
                state.nameguan.push({
                    ...i
                })
            })

            // console.log(state.nameguan);
        }
    },
    actions: {
        // async appapp({ commit }, data) {
        //     let res = await appapp(data)
        //     // console.log(res, '123456');
        //     commit('setsToken', res.data.data)
        // },
        async nameList({ commit }, data) {
            let res = await nameList()
            // console.log(res, 'res');
            commit('nameguanli', res.data.data)
        },
    }
}