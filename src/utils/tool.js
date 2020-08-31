

//--------------------------封装一些常用的工具函数-----------------------
import moment from 'moment';

// 中国标准时间的转化
export const filterTime = (time, type = 'short') => {
    if (type == 'short') {
        return moment(time).format('YYYY-MM-DD')
    } else {
        return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
}

//
export const leaveTime = function (value) {
    return moment(value).format('YYYY-MM-DD HH:mm');
}

// 短时间
export const monthTime = function (value) {
    return moment(value).format('YYYY-MM');
}

// 时分秒
export const secondsTime = function (value) {
    return moment(value).format('HH:mm:ss');
}

// 当月第一天和最后一天   传入一个日期，返回数组['2019-12-01','2019-12-31']
export const lastDateofMonth = function (d) {
    let firstDate = moment(d).startOf('month').format('YYYY-MM-DD');
    let endDate = moment(d).endOf('month').format('YYYY-MM-DD');
    let Datearr = [];
    Datearr.push(firstDate);
    Datearr.push(endDate);
    return Datearr;
}

// 加法计算（以下计算方法，可解决小数相加减出现的精度丢失问题）
export const addNumber = (arg1, arg2) => {
    let r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}

//乘法计算
export const multiplication = (arg1, arg2) => {
    let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

// 减法计算
export const number = (arg1, arg2) => {
    let r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}


//时间对比	
export const checkEndTime = (startTime, endTime, flag) => {
    let start = new Date(startTime);
    let end = new Date(endTime);
    if (flag == '1') {      //1 开始日期小于结束日期
        console.log(end, start)
        if (end <= start) {
            return false;
        }
    } else if (flag == '2') {  //2开始日期小于等于结束日期
        if (end < start) {
            return false;
        }
    }
    return true;
}

// 表格头部
export const tabHeader = function () {
    return 'backgroundColor:#5895D3;color:#fff;text-align:center;height:40px;padding:0;'
}

// 计算开始时间和结束时间之间的天数
export const differenceNum = function (sDate1, sDate2) {
    const date1 = new Date(sDate1); //开始时间
    const date2 = new Date(sDate2) //结束时间
    let date3 = date2.getTime() - date1.getTime() //时间差的毫秒数
    let leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    let params = {
        days: Math.floor(date3 / (24 * 3600 * 1000)),
        hours: Math.floor(leave1 / (3600 * 1000)),
        minutes: Math.floor(leave2 / (60 * 1000)),
    }
    return params
}

/**  addDate: 获取几天之后的时间
 *  date：起始时间对象
 *  days:Number 当前时间'2019/12/24',传入6,则返回'2019/12/30' 
 *  key => years: 'y'   quarters: 'Q'   months: 'M'   weeks: 'w'    days: 'd'  hours: 'h'
 *  
 */
export const addDate = function (date, days, key = 'd', forchart = 'YYYY-MM-DD') {
    return moment(date).add(days, key).format(forchart)
}

/** 通过减去时间来改变原始的 moment */
export const subDate = function (date, days, key = 'd', forchart = 'YYYY-MM-DD') {
    return moment(date).subtract(days, key).format(forchart);
};

/* 返回字符串 例如： '1年5个月8天'
    传入开始时间，结束时间 （'2019-01-01','2020-05-08'）
*/
export const diffDateHuman = function (start, end = new Date()) {
    let startArr = shortTime(start).split('-');
    let endArr = shortTime(end).split('-');
    let a = moment(start);
    let b = moment(end);
    let nowM = [endArr[0], startArr[1], startArr[2]].join('-');     // 今年相同月-日
    let nowD = [endArr[0], endArr[1], startArr[2]].join('-');       // 今年今月相同日
    // 小于零则取去年相同月日
    let em = b.diff(nowM, 'M', true) < 0 ? subDate(nowM, 1, 'y') : nowM;
    // 小于零则去上个月相同日
    let ed = b.diff(nowD, 'd', true) < 0 ? subDate(nowD, 1, 'M') : nowD;

    let y = b.diff(a, 'y') ? b.diff(a, 'y') + '年' : '';
    let m = b.diff(em, 'M') ? b.diff(em, 'M') + '个月' : '';
    let d = b.diff(ed, 'd') ? b.diff(ed, 'd') + '天' : '';
    return y + m + d
}

/* 返回对象 例如 { y: 1, m: 5, d: 8 }
    传入开始时间，结束时间 （'2019-01-01','2020-05-08'）
*/
export const diffDate = function (start, end = new Date()) {
    let b = moment(end);
    let y = b.diff(start, 'y');
    let m = b.diff(start, 'M');
    let d = b.diff(start, 'd');
    return { y, m, d }
}

// 数组转成树形结构
export const toTree = function (arr) {
    let result = []
    let data = JSON.parse(JSON.stringify(arr))
    if (!Array.isArray(data)) {
        return result
    }
    data.forEach(item => {
        delete item.children;
    });
    let map = {};
    data.forEach(item => {
        map[item.id] = item;
    });
    data.forEach(item => {
        let parent = map[item.pid];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
}

// 补零 ('66', 6) => '000066'
export const fillZero = function (num, length) {
    return ("0000000000000000" + num).substr(-length);
}

// 导入时的数据转换
// 合同状态
export const contractStatus = function(value) {
    let data = '';
    let val = '' + value;
    switch (val) {
      case '未签':
        data = 0;
        break;
      case '已签':
        data = 1;
        break;
    }
    return data;
  }
  
  // 性别
export const sexStatus = function(value) {
    let data = '';
    let val = '' + value;
    switch (val) {
      case '女':
        data = 0;
        break;
      case '男':
        data = 1;
        break;
    }
    return data;
}
