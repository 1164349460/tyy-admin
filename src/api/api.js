//引入我们二次封装的axios.js文件
import https from "@/utils/axios";

/** ---------------------- apis --------------------------- */

//登录
export const webLogin = function (params) {
  let url = "/net/generalize/webLogin";
  return https(url, params, "post");
};


//-----------------------部门管理--------------------------------

//  保存部门信息
export const saveDepart = function (params) {
  let url = "/web/department/save";
  return https(url, params, "post");
};


// 查询部门
export const searchDepart = function (params) {
  let url = "/web/department/search";
  return https(url, params, "post");
};

// 编辑部门
export const updateDepart = function (params) {
  let url = "/web/department/update";
  return https(url, params, "post");
};

// 删除部门
export const deleteDepart = function (params) {
  let url = "/web/department/delete";
  return https(url, params, "post");
};

/** ----------------------- 员工管理 ------------------ **/

//  员工信息-新增
export const employeeSave = function (params) {
  let url = "/web/employee/save";
  return https(url, params, "post");
};

//  员工信息-修改
export const employeeUpdate = function (params) {
  let url = "/web/employee/update";
  return https(url, params, "post");
};

//  员工信息-详情
export const employeeView = function (params) {
  let url = "/web/employee/view";
  return https(url, params, "post");
};

//  员工信息-分页查询
export const employeeSearchPage = function (params) {
  let url = "/web/employee/searchPage";
  return https(url, params, "post");
};

//  员工信息-不分页
export const employeeSearch = function (params) {
  let url = "/web/employee/search";
  return https(url, params, "post");
};

//  员工信息-导入
export const employeeImport = function (params) {
  let url = "/web/employee/import";
  return https(url, params, "post");
};

//  员工信息导入模板地址
export const employeesExcelUrl = 'http://hr.333job.com:18888/importRFEmployees.xlsx'

//  员工信息-设置离职
export const employeeLeave = function (params) {
  let url = "/web/employee/leave";
  return https(url, params, "post");
};

//  员工信息-删除
export const employeeDelete = function (params) {
  let url = "/web/employee/delete";
  return https(url, params, "post");
};

//  员工信息-账号冻结
export const employeefreeze = function (params) {
  let url = "/web/employee/freeze";
  return https(url, params, "post");
};

//  员工信息-账号解冻
export const employeeCancelFreeze = function (params) {
  let url = "/web/employee/cancelFreeze";
  return https(url, params, "post");
};

//  员工标签-新增
export const employeeTagSave = function (params) {
  let url = "/web/label/save";
  return https(url, params, "post");
};

//  员工标签-查询
export const employeeTagSearch = function (params) {
  let url = "/web/label/search";
  return https(url, params, "post");
};

//  员工标签-删除
export const employeeTagDelete = function (params) {
  let url = "/web/label/delete";
  return https(url, params, "post");
};

//  员工标签-更新
export const employeeTagUpdate = function (params) {
  let url = "/web/label/update";
  return https(url, params, "post");
};


/** ----------------------- 用户管理 ------------------ **/
// 用户列表
export const search = function (params) {
  let url = "/web/account/search";
  return https(url, params, "post");
};


// 用户新增
export const create = function (params) {
  let url = "/web/account/create";
  return https(url, params, "post");
};

// 用户编辑
export const edit = function (params) {
  let url = "/web/account/edit";
  return https(url, params, "post");
};

//用户删除
export const userDelete = function (params) {
  let url = "/web/account/delete";
  return https(url, params, "post");
};

//账号冻结
export const freeze = function (params) {
  let url = "/web/account/freeze";
  return https(url, params, "post");
};

//账号解结
export const cancelFreeze = function (params) {
  let url = "/web/account/cancelFreeze";
  return https(url, params, "post");
};


