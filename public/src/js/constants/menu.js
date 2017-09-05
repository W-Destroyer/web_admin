const menu = [
    {
        name: "数据统计",
        icon: 'mail',
        type: 'member',
        link: '/',
        children: []
    }, {
        name: '页面设置',
        icon: 'setting',
        type: 'group',
        link: '/pagesetting',
        children: [{
            name: '整站设置',
            link: '/pagesetting/fullstation',
        }, {
            name: '网站首页',
            link: '/pagesetting/home',
        }, {
            name: '公司简介',
            link: '/pagesetting/company',
        }, {
            name: '产品展厅',
            link: '/pagesetting/production',
        }, {
            name: '新闻中心',
            link: '/pagesetting/news',
        }, {
            name: '售后服务',
            link: '/pagesetting/service',
        }, {
            name: '联系我们',
            link: '/pagesetting/contact',
        },]
    }, {
        name: '商品管理',
        icon: 'appstore',
        type: 'group',
        link: '/',
        children: [{
            name: '分类列表',
            link: '/production/classify',
        }, {
            name: '商品列表',
            link: '/production/productlist',
        // }, {
        //     name: '商品推荐',
        //     link: '/production/recommend',
        },]
    }, {
        name: '新闻管理',
        icon: 'book',
        type: 'group',
        link: '/',
        children: [{
            name: '新闻列表',
            link: '/news/list',
        }, {
            name: '商品列表',
            link: '/production/classify',
        }, {
            name: '商品推荐',
            link: '/production/recommend',
        },]
    }, {
        name: '用户管理',
        icon: 'user',
        type: 'group',
        children: [{
            name: '普通用户'
        }, {
            name: '管理员'
        },]
    }, {
    //     name: '订单管理',
    //     icon: 'setting',
    //     type: 'group',
    //     children: [{
    //         name: '待支付订单'
    //     }, {
    //         name: '待发货订单'
    //     }, {
    //         name: '待收货订单'
    //     }, {
    //         name: '待评价订单'
    //     },]
    // }, {
        name: '文件管理',
        icon: 'setting',
        type: 'member',
        link: '/file'
    }, {
        name: '个人中心',
        icon: 'setting',
        type: 'group',
        children: [{
            name: '个人资料'
        }, {
            name: '系统设置'
        },]
    }
];

export default menu;