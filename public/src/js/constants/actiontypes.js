/**
 * Create By Piny
 * 2017.07.13
 */

/**
 * 此文件保存 Action Types
 * ActionTypes 均为常量， 不可更改
 */

export const BASEINFO = 'BASEINFO';
/***************************************************************/
/*
            基础信息 Baseinfo
*/
/***************************************************************/

// 标记异步请求 公司名称
export const COMPANYNAME_FETCH = 'COMPANYNAME_FETCH';

// 请求失败
export const COMPANYNAME_FETCH_FAILURE = 'COMPANYNAME_FETCH_FAILURE';

// 初始化公司名称
export const COMPANYNAME_INIT = 'COMPANYNAME_INIT';

// 编辑公司名称 
export const COMPANYNAME_EDIT = 'COMPANYNAME_EDIT';

// 保存公司名称
export const COMPANYNAME_SAVE = 'COMPANYNAME_SAVE';

// 退出编辑
export const COMPANYNAME_EDIT_CANCLE = 'COMPANYNAME_EDIT_CANCLE';

// 退出编辑
export const COMPANYNAME_NOTIFY_CLEAR = 'COMPANYNAME_NOTIFY_CLEAR';



// 标记异步请求 友情链接
export const FRIENDLINK_FETCH = 'FRIENDLINK_FETCH';

// 请求失败
export const FRIENDLINK_FETCH_FAILURE = 'FRIENDLINK_FETCH_FAILURE';

// 初始化 友情链接
export const FRIENDLINK_INIT = 'FRIENDLINK_INIT';

// 添加 友情链接
export const FRIENDLINK_ADD = 'FRIENDLINK_ADD';

// 编辑 友情链接
export const FRIENDLINK_EDIT = 'FRIENDLINK_EDIT';

// 保存 友情链接
export const FRIENDLINK_SAVE = 'FRIENDLINK_SAVE';

// 删除友情链接
export const FRIENDLINK_DELETE = 'FRIENDLINK_DELETE';

// 关闭弹出框
export const FRIENDLINK_MODAL_CANCEL = 'FRIENDLINK_MODAL_CANCEL';

// 清除 提示信息
export const FRIENDLINK_NOTIFY_CLEAR = 'FRIENDLINK_NOTIFY_CLEAR';

/***************************************************************/
/*
            产品分类 Classify
*/
/***************************************************************/

// 标记异步请求
export const CLASSIFY_FETCH = 'CLASSIFY_FETCH';

// 异步请求失败
export const CLASSIFY_FETCH_FAILURE = 'CLASSIFY_FETCH_FAILURE';

// 初始化
export const CLASSIFY_INIT = 'CLASSIFY_INIT';

// 添加
export const CLASSIFY_ADD = 'CLASSIFY_ADD';

// 编辑
export const CLASSIFY_EDIT = 'CLASSIFY_EDIT';

// 保存
export const CLASSIFY_SAVE = 'CLASSIFY_SAVE';

// 删除
export const CLASSIFY_DELETE = 'CLASSIFY_DELETE';

// 关闭 编辑/新建 弹出框
export const CLASSIFY_MODAL_CANCEL = 'CLASSIFY_MODAL_CANCEL';

// 清除 提示信息、初始化状态
export const CLASSIFY_NOTIFY_CLEAR = 'CLASSIFY_NOTIFY_CLEAR';

/***************************************************************/
/*
            产品 Product
*/
/***************************************************************/
// 产品列表 标记异步请求
export const PRODUCT_LIST_FETCH = 'PRODUCT_LIST_FETCH';

// 列表失败状态
export const PRODUCT_LIST_FETCH_FAILURE = 'PRODUCT_LIST_FETCH_FAILURE';

// 初始化产品列表 
export const PRODUCT_LIST_INIT = 'PRODUCT_LIST_INIT';

// 列表删除
export const PRODUCT_LIST_DELETE = 'PRODUCT_LIST_DELETE';

// 清除提示信息
export const PRODUCT_LIST_NOTIDY_CLEAR = 'PRODUCT_LIST_NOTIDY_CLEAR';


// 产品添加页面 标记异步请求
export const PRODUCT_ADDITION_FETCH = 'PRODUCT_ADDITION_FETCH';

// 产品添加页面 请求失败
export const PRODUCT_ADDITION_FETCH_FAILURE = 'PRODUCT_ADDITION_FETCH_FAILURE';

// 产品添加成功
export const PRODUCT_ADDITION_SAVE = 'PRODUCT_ADDITION_SAVE';

// 清除信息
export const PRODUCT_ADDITION_NOTIFY_CLEAR = 'PRODUCT_ADDITION_NOTIFY_CLEAR';
