import XLSX from 'xlsx'
/**
 * 导入
 * @param {File} file 文件
 * @param {Object} codeObj 每个对象所包含的属性，属性名
 * @return {Promise} 读取文件为异步的，调用例如excel(file.raw, obj).then(res => {console.log(res)})，res为最终得到的数组数据
 */
export const excelToArray = function (file, codeObj) {

    return new Promise(resolve => {

        var reader = new FileReader();

        FileReader.prototype.readAsBinaryString = function (f) {

            var binary = "";

            var wb; //读取完成的数据

            var outdata;

            var reader = new FileReader();

            reader.onload = function (e) {

                var bytes = new Uint8Array(reader.result);
                
                var length = bytes.byteLength;

                for (var i = 0; i < length; i++) {

                    binary += String.fromCharCode(bytes[i]);

                }

                wb = XLSX.read(binary, { type: 'binary' });

                // outdata就是你想要的东西 excel导入的数据
                outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

                // excel 数据再处理

                let arr = []

                outdata.map(v => {

                    let obj = {}

                    for (let key in codeObj) {
                        obj[key] = v[codeObj[key]]
                    }
                    arr.push(obj)

                })

                resolve([...arr]);
            }
            reader.readAsArrayBuffer(f);

        }

        reader.readAsBinaryString(file)

    })
}

//导出excel
//_tHeader :['名称','性别']
//_filterVal:['name','sex']
//_exData:需导出内容
//_fileName:文件名称
export const exportToExcel = function (_tHeader, _filterVal, _exData, _fileName) {
    require.ensure([], () => {
        const { export_json_to_excel } = require('../excel/Export2Excel'); //这里必须使用绝对路径
        const tHeader = _tHeader; // 导出的表头名
        const filterVal = _filterVal; // 导出的表头字段名
        //const list = exData;

        const data = formatJson(filterVal, _exData);
        export_json_to_excel(tHeader, data, _fileName);// 导出的表格名称，根据需要自己命名
    })
}
function formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]))
}

