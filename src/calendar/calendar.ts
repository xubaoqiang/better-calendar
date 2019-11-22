export default class Calendar {

}

/**
 * @author MR.X
 * @class 日历插件对象
 * @param {Number} year 年份
 * @param {Number} month 月
 * @param {Boolean} isNext 是否需要下个月 default false
 * @param {Boolean} isPrev 是否需要上个月 default false
 */
class Calendar {
    constructor(year, month, next, prev) {
        this.year = year || (new Date().getFullYear())
        this.month = month || (new Date().getMonth() + 1)
        this.isNext = next && true
        this.isPrev = prev && true
    }
    //设置是否生成上个月数据 与 下个月数据
    setIsNextAndIsPrev(isNext, isPrev) {
        this.isNext = isNext
        this.isPrev = isPrev
    }
    //获取该月多少天
    getMonthDay(year = this.year, month = this.month) {
        let mday = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) mday[1] = 29;
        return mday[month - 1];
    }
    //获取周几 0 1 2 3 4 5 6
    getMonthWeek(year = this.year, month = this.month, day = this.getMonthDay()) {
        let week;
        if (month <= 12 && month >= 1) {
            for (var i = 1; i < month; ++i) {
                day += this.getMonthDay(year, i);
            }
        }
        week = (year - 1 + (year - 1) / 4 - (year - 1) / 100 + (year - 1) / 400 + day) % 7;
        return parseInt(week);
    }
    //获取名称
    getName(year = this.year, month = this.month, day = this.getMonthDay()) {
        return year + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day);
    }
    //获取上一个月
    getPrev(year = this.year, month = this.month) {
        if (month - 1 == 0) {
            return {
                year: year - 1,
                month: 12,
                day: this.getMonthDay(year - 1, 12)
            };
        } else {
            return {
                year: year,
                month: month - 1,
                day: this.getMonthDay(year, month - 1)
            };
        }
    }
    //获取下一个月
    getNext(year = this.year, month = this.month) {
        if (month + 1 > 12) {
            return {
                year: year + 1,
                month: 1,
                day: this.getMonthDay(year + 1, 1)
            };
        } else {
            return {
                year: year,
                month: month + 1,
                day: this.getMonthDay(year, month + 1)
            };
        };
    }
    //设置每天
    setDay(date = '2019-07-15', day = 15, siblings) {
        let tmp = date.match(/\d+/gi);
        return {
            date: date,
            day: day,
            week: this.getMonthWeek(+tmp[0], +tmp[1], +tmp[2]),
            siblings: !siblings,
        }
    }
    //设置时间
    setDate(year = this.year, month = this.month) {
        let monthList = new Array()
        let name = null,
            index = 0,
            dayTotal = this.getMonthDay(year, month),
            weekFirst = this.getMonthWeek(year, month, 1),
            weekLast = this.getMonthWeek(year, month, dayTotal);
        //上月的数据 
        if (this.isPrev) {
            var prev = this.getPrev(year, month),
                prevDate = prev.day - weekFirst + 1;
            for (var i = 0; i < weekFirst; i++) {
                name = this.getName(prev.year, prev.month, prevDate);
                monthList.push(this.setDay(name, prevDate, 1));
                prevDate++;
                index++;
            }
        }
        //本月数据
        for (var i = 1; i <= dayTotal; i++) {
            name = this.getName(year, month, i);
            monthList.push(this.setDay(name, i));
            index++;
        }
        //下月数据
        if (this.isNext) {
            var next = this.getNext(year, month),
                day = 1;
            while (index < 42) {
                name = this.getName(next.year, next.month, day);
                monthList.push(this.setDay(name, day, 1));
                index++;
                day++;
            };
        }
        return monthList;
    }
}

export default Calendar;