/**全局公共函数**/
export default function (Vue, options) {
    /* 解绑函数 */
    Vue.prototype.unbind = function (obj) {
        return JSON.parse(JSON.stringify({a:obj})).a;
    };
    /* 获取随机唯一ID */
    Vue.prototype.randomId = [];
    Vue.prototype.getRandomId = function () {
        var id = Math.random();
        if (this.randomId.indexOf(id) !== -1) {//存在重复
            this.getRandomId();
        } else {
            this.randomId.push(id);
            return id;
        }
    };
    /*合计*/
    Vue.prototype.totalData=function(tab,tabSummary,tabConfig,tabData) {

        let tableShowData=[];
        let props = tabSummary || this.tabSummary;
        let totalData = [{number:tabData.length,label:'数据条目',unit:'条'}];
        tabConfig = tabConfig || this.tabConfig;
        tabData = tabData || this.tabData;
        if(tabConfig!==undefined&&this.$refs[tab]!==undefined){
            tableShowData = this.$refs[tab].tableData_showMode;
            props.map((prop)=>{
                //总合计数量
                let number = 0;
                tabData.map((row)=>{
                    //处理num为NaN的问题
                    var num = parseFloat(row[prop]);
                    if (!num) {num = 0}
                    number += num;
                })
                //当前页合计数量
                let curnumber = 0;
                if(tabData.length>0&&tabData.length>tableShowData.length){
                    tableShowData.map((row)=>{
                        //处理num为NaN的问题
                        var num = parseFloat(row[prop]);
                        if (!num) {num = 0}
                        curnumber += num;
                    })
                }
                //总合计
                let label = '';
                let unit = '';

                //当前页合计
                let curlabel = '';
                let curunit = '';
                let curtype = 'info';
                tabConfig.columns.map((row)=> {
                    if (row.prop == prop) {
                        label = row.label;
                        unit = row.unit;

                        curlabel = "本页"+row.label
                        curunit= row.unit;
                        return false;
                    }
                })

                //处理加出来在几十位后出现小数的问题，
                //如：2.22+5=7.220000000000001
                // number = Math.round(number * 10000000000)/10000000000;
                if(prop=="amount"){
                    number = this.wxtoFixed(number,2)
                }else if(prop=="sum"){
                    number = this.wxtoFixed(number,2)
                }else if(prop=="itemAmount"){
                    number = this.wxtoFixed(number,2)
                }else{
                    number = this.wxtoFixed(number,3)
                }
                // if(number){
                //     if(number.toString().split('.')[1].length>3){
                //         this.wxtoFixed(number,2)
                //     }
                // }

                // if(curnumber!==0){//当前页合计
                //     curnumber= Math.round(curnumber * 10000000000)/10000000000;
                //     totalData.push({number:curnumber,label:curlabel,unit:curunit,type:curtype},{number,label,unit});
                // }else{
                //     totalData.push({number,label,unit})
                // }
                totalData.push({number,label,unit})
            })
            //this.mxxxtotalData = totalData;
            return totalData;
        }else{
            return totalData;
        }
    };
    /*change合计*/
    Vue.prototype.changeData=function(tab,tabSummary,tabConfig,tabData) {
        let tableShowData=[];
        let props = tabSummary || this.tabSummary;
        let changeData = [{number:tabData.length,label: '已选择 ',unit:' 项'}];
        tabConfig = tabConfig || this.tabConfig;
        tabData = tabData || this.tabData;
        if(tabConfig!==undefined&&this.$refs[tab]!==undefined){
            tableShowData = this.$refs[tab].tableData_showMode;
            props.map((prop)=>{
                //总合计数量
                let number = 0;
                tabData.map((row)=>{
                    //处理num为NaN的问题
                    var num = parseFloat(row[prop]);
                    if (!num) {num = 0}
                    number += num;
                })

                //当前页合计数量
                let curnumber = 0;
                if(tabData.length>0&&tabData.length>tableShowData.length){
                    tableShowData.map((row)=>{
                        //处理num为NaN的问题
                        var num = parseFloat(row[prop]);
                        if (!num) {num = 0}
                        curnumber += num;
                    })
                }
                //总合计
                let label = '';
                let unit = '';

                //当前页合计
                let curlabel = '';
                let curunit = '';
                let curtype = 'info';
                tabConfig.columns.map((row)=> {
                    if (row.prop == prop) {
                        label = row.label;
                        unit = row.unit;

                        curlabel = "本页"+row.label
                        curunit= row.unit;
                        return false;
                    }
                })

                //处理加出来在几十位后出现小数的问题，
                //如：2.22+5=7.220000000000001
                // number = Math.round(number * 10000000000)/10000000000;
                // if(curnumber!==0){//当前页合计
                //     curnumber= Math.round(curnumber * 10000000000)/10000000000;
                //     changeData.push({number:curnumber,label:curlabel,unit:curunit,type:curtype},{number,label,unit});
                // }else{
                //     changeData.push({number,label,unit})
                // }
                if(prop=="amount"){
                    number = this.wxtoFixed(number,2)
                }else if(prop=="sum"){
                    number = this.wxtoFixed(number,2)
                }else if(prop=="itemAmount"){
                    number = this.wxtoFixed(number,2)
                }else{
                    number = this.wxtoFixed(number,3)
                }
                changeData.push({number,label,unit})
            })
            return changeData;
        }else{
            return changeData;
        }
    };
    Vue.prototype.uniqueObjUntil = function(obj){//去重复
        let res = [obj[0]];
        for(let i = 1; i < obj.length; i++){
            let repeat = false;
            for(let j = 0; j < res.length; j++){
                if(JSON.stringify(obj[i]) == JSON.stringify(res[j])){
                    repeat = true;
                    break;
                }
            }
            if(!repeat){
                res.push(obj[i]);
            }
        }
        return res;
    };
    Vue.prototype.uniqueObjKeyUntil = function (obj,key){//根据某key值去重复
        let res = [obj[0]];
        for(let i = 1; i < obj.length; i++){
            let repeat = false;
            for(let j = 0; j < res.length; j++){
                if(obj[i][key] === res[j][key]){
                    repeat = true;
                    break;
                }
            }
            if(!repeat){
                res.push(obj[i]);
            }
        }
        return res;
    };
    // 人民币转换
    Vue.prototype.convertCurrency=function(money) {
        //汉字的数字
        var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
        //基本单位
        var cnIntRadice = new Array('', '拾', '佰', '仟');
        //对应整数部分扩展单位
        var cnIntUnits = new Array('', '万', '亿', '兆');
        //对应小数部分单位
        var cnDecUnits = new Array('角', '分', '毫', '厘');
        //整数金额时后面跟的字符
        var cnInteger = '整';
        //整型完以后的单位
        var cnIntLast = '元';
        //最大处理的数字
        var maxNum = 999999999999999.9999;
        //金额整数部分
        var integerNum;
        //金额小数部分
        var decimalNum;
        //输出的中文金额字符串
        var chineseStr = '';
        //分离金额后用的数组，预定义
        var parts;
        if (money == '') { return ''; }
        money = parseFloat(money);
        if (money >= maxNum) {
            //超出最大处理数字
            return '';
        }
        if (money == 0) {
            chineseStr = cnNums[0] + cnIntLast + cnInteger;
            return chineseStr;
        }
        //转换为字符串
        money = money.toString();
        if (money.indexOf('.') == -1) {
            integerNum = money;
            decimalNum = '';
        } else {
            parts = money.split('.');
            integerNum = parts[0];
            decimalNum = parts[1].substr(0, 4);
        }
        //获取整型部分转换
        if (parseInt(integerNum, 10) > 0) {
            var zeroCount = 0;
            var IntLen = integerNum.length;
            for (var i = 0; i < IntLen; i++) {
                var n = integerNum.substr(i, 1);
                var p = IntLen - i - 1;
                var q = p / 4;
                var m = p % 4;
                if (n == '0') {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        chineseStr += cnNums[0];
                    }
                    //归零
                    zeroCount = 0;
                    chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                }
                if (m == 0 && zeroCount < 4) {
                    chineseStr += cnIntUnits[q];
                }
            }
            chineseStr += cnIntLast;
        }
        //小数部分
        if (decimalNum != '') {
            var decLen = decimalNum.length;
            for (var i = 0; i < decLen; i++) {
                var n = decimalNum.substr(i, 1);
                if (n != '0') {
                    chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                }
            }
        }
        if (chineseStr == '') {
            chineseStr += cnNums[0] + cnIntLast + cnInteger;
        } else if (decimalNum == '') {
            chineseStr += cnInteger;
        }
        return chineseStr;
    };
    //处理四舍五入-计算机二进制编码导致的精度问题
    //1.335.toFixed(2) // 1.33  错误
    //1.3335.toFixed(3) // 1.333 错误
    // Vue.prototype.wxtoFixed=function(num,n) {
    //     //判断是否有小数切大于n位小数
    //     let result = num.toString();
    //     let arr = result.split('.');
    //     if(arr[1]!==undefined&&arr[1].length>n){
    //         const integer = arr[0];
    //         const decimal = arr[1];
    //         result = integer + '.' + decimal.substr(0, n);
    //         const last = decimal.substr(n, 1);
    //
    //         // 四舍五入
    //         if (parseInt(last, 10) >= 5) {
    //             const x = Math.pow(10, n);
    //             result = ((parseFloat(result) * x) + 1) / x;
    //             result = result.toFixed(n);
    //         }
    //
    //     }
    //
    //
    //     return result;
    // };
    Vue.prototype.wxtoFixed=function(number, precision) {
        var shift = function (number, precision, reverseShift) {
            if (reverseShift) {
                precision = -precision;
            }
            var numArray = ("" + number).split("e");
            return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
        };
        return shift(Math.round(shift(number, precision, false)), precision, true);
    };
    //分组
    Vue.prototype.groupBy = (list, fn) => {
        const groups = {};
        list.forEach(function (o) {
            const group = JSON.stringify(fn(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        // return Object.keys(groups).map(function (group) {
        //     return groups[group];
        // });
        return groups;
    }
    // 将时间戳转换成日期格式
    Vue.prototype.formatterTime=(time, fmt) => {
        if(!time){
            return '';
        }
        if(typeof(time) == "object" || typeof(time) == "OBJECT") {
            var z = {
                M: time.getMonth() + 1,
                d: time.getDate(),
                h: time.getHours(),
                m: time.getMinutes(),
                s: time.getSeconds()
            };
            fmt = fmt.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
                return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2);
            });
            return fmt.replace(/(y+)/g, function(v) {
                return time.getFullYear().toString().slice(-v.length);
            });
        }else if(typeof(time) == "number"){
            var TIME = new Date( time) ;
            var z = {
                M: TIME.getMonth() + 1,
                d: TIME.getDate(),
                h: TIME.getHours(),
                m: TIME.getMinutes(),
                s: TIME.getSeconds()
            };
            fmt = fmt.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
                return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2);
            });
            return fmt.replace(/(y+)/g, function(v) {
                return TIME.getFullYear().toString().slice(-v.length);
            });
        }
        else return time;
    }
}

