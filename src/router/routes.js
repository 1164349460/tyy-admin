export default [
    {
        path: "/",
        name: "登录",
        alias: "/admin/login",
        component: resolve => require(["@/views/login/login"], resolve),
    },
    {
        path: '/admin/home',
        name: '首页',
        redirect: '/admin/employee/male',
        component: resolve => require(["@/views/home/home"], resolve),
        children: [
            // {
            //     path: '/admin/index',
            //     name: '首页',
            //     component: resolve => require(["@/views/home/index"], resolve),
            // },
            {
                path: '/admin/employee/male',//男神女神管理
                name: 'male',
                component: resolve => require(["@/views/employeeManage/male"], resolve),
                meta: {
                    pathName: '男神女神'
                }
            },
            {
                path: '/admin/gameManage/failGroup',//组局失败
                name: 'failGroup',
                component: resolve => require(["@/views/gameManage/failGroup"], resolve),
                meta: {
                    pathName: '组局失败'
                }
            },
            {
                path: '/admin/gameManage/gameList',//游戏列表
                name: 'gameList',
                component: resolve => require(["@/views/gameManage/gameList"], resolve),
                meta: {
                    pathName: '游戏列表'
                }
            },
            {
                path: '/admin/payforManage/reflect',//提现管理
                name: 'reflect',
                component: resolve => require(["@/views/payforManage/reflect"], resolve),
                meta: {
                    pathName: '提现管理'
                }
            },
            {
                path: '/admin/cityManage/assembly',//城市集结点管理
                name: 'assembly',
                component: resolve => require(["@/views/cityManage/assembly"], resolve),
                meta: {
                    pathName: '城市集结点'
                }
            },

        ]
    },
    {
        path: "*",
        redirect: "/",
    },
]