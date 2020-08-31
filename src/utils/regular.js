
//-------------------------------正则表达式  reg.test(value)------------------------------//

/*在其他页面使用方法
例如：验证手机号是否符合校验规则
import { checkMobile } from '@/filter/regular'
let mobile = 15469689898989
if(checkMobile(mobile)){}
*/

//手机号
export const checkMobile = function (value) {
    const leg = /^1[3-9][0-9]\d{8}$/;
    return leg.test(value)
}

// 身份证号
export const checkLegal = function (value) {
    const leg = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/
    return leg.test(value)
}

// 邮箱
export const checkEmail = function (value) {
    const leg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return leg.test(value)
}

// 银行卡号
export const bankCard = function (value) {
    const leg = /^([1-9]{1})(\d{15}|\d{16}|\d{18})$/
    return leg.test(value)
}

// 车牌号
export const checkCar = function (value) {
    const leg = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
    return leg.test(value)
}

// 姓名

export const checkName = function (value) {
    const leg = /^[\u2E80-\u9FFF]+$/
    return leg.test(value)
}

//纯数字
export const checkNumber = function (value) {
    const leg = /^\d{1,}$/
    return leg.test(value)
}

//只能输入两位小数
export const checkTwoNumber = function (value) {
    const leg = /^\d+(\.\d{1,2})?$/
    return leg.test(value)
}

// 金额大于等于0
export const checkMoney = function (value) {
    const leg = /^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))$/
    return leg.test(value)
}

// 正则校验是否是http 和https开头
export const checkUrl = function (value) {
    const leg = /(http|https):\/\/([\w.]+\/?)\S*/
    return leg.test(value)
}

// 营业执照号
export const checkLicense = function (value) {
    const leg = /^([159Y]{1})([1239]{1})([0-9ABCDEFGHJKLMNPQRTUWXY]{6})([0-9ABCDEFGHJKLMNPQRTUWXY]{9})([0-9ABCDEFGHJKLMNPQRTUWXY])$/
    return leg.test(value)
}

