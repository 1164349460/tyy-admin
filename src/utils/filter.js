import Vue from "vue";

import moment from "moment";

import { fillZero } from "./tool";

//长时间 YYYY-MM-DD HH:mm:ss
Vue.filter("time", function(value, formatString, isNull = false) {
  if (isNull) if (value == "" || value == null) return "--";
  formatString = formatString || "YYYY-MM-DD HH:mm:ss";
  return moment(value).format(formatString);
});

//短时间 YYYY-MM-DD
Vue.filter("shorttime", function(value, formatString, isNull = false) {
  if (isNull) if (value == "" || value == null) return "--";
  formatString = formatString || "YYYY-MM-DD";
  return moment(value).format(formatString);
});

// 字符串为空时
Vue.filter("emptyString", function(value) {
  return !!value ? value : "--";
});

Vue.filter("emptyName", function(value) {
  return !!value ? value : "暂无";
});

//数字为空时
Vue.filter("emptyNumber", function(value) {
  return !!value ? value : "0";
});

// 过滤时分秒
Vue.filter("leaveTime", function(value) {
  return moment(value).format("YYYY-MM-DD HH:mm");
});

// 过滤年月日
Vue.filter("levelTime", function(value) {
  return moment(value).format("HH:mm:ss");
});

//把日期转换为周
Vue.filter("weekDay", function(value) {
  let week = moment(value).format("d");
  let day = "";
  switch (Number(week)) {
    case 0:
      day = "星期天";
      break;
    case 1:
      day = "星期一";
      break;
    case 2:
      day = "星期二";
      break;
    case 3:
      day = "星期三";
      break;
    case 4:
      day = "星期四";
      break;
    case 5:
      day = "星期五";
      break;
    case 6:
      day = "星期六";
      break;
  }
  return day;
});

// 价格类型转换 1,234.00
Vue.filter("numberToPrice", function(number) {
  if (number || number == 0) {
    number = Number(number);
    return number.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
  } else {
    return "--";
  }
});

// 保留小数点后2位 20.00   30.00
Vue.filter("keepTwoNumber", function(value) {
  if (!value) return "--";
  value = Number(value);
  return value.toFixed(2);
});

/** 枚举规范：
 * 如是数字类型的枚举，建议先转成字符串（因为有些个别地方是字符串），这样不管后台给的是数字还是字符串类型，都可以识别，不用写两套
 */

// 数字转换为bool值
Vue.filter("numToBoolStatus", function(value) {
  let data = false;
  switch (value) {
    case 0:
      data = false;
      break;
    case 1:
      data = true;
      break;
  }
  return data;
});

// 补零  000666
Vue.filter("fillZero", function(value, length) {
  if (!value) return "--";
  return (value = fillZero(value, length));
});

// 合同状态
Vue.filter("contractStatus", function(value) {
  let data = "";
  let val = "" + value;
  switch (val) {
    case "0":
      data = "未签";
      break;
    case "1":
      data = "已签";
      break;
  }
  return data;
});

// 性别
Vue.filter("sexStatus", function(value) {
  let data = "";
  let val = "" + value;
  switch (val) {
    case "0":
      data = "女";
      break;
    case "1":
      data = "男";
      break;
  }
  return data;
});

// 账户状态
Vue.filter("accountStatus", value => {
  if (!value) return "--";
  let data = "";
  switch (value) {
    case 1:
      data = "正常";
      break;
    case 2:
      data = "冻结";
      break;
  }
  return data;
});
