/*
默认取件时间是今天的下一个小时，上班时间早8点到晚6点
new Date()取当前时间，今天 ？月？日
取当前小时，如果小于7点，当做7点
取当前小时，如果大于晚上5点，明天来吧
*/
function fillZero(n) {
    return n < 10 ? '0' + n : n;
}

function getDateTime() {
    const date = new Date()
    const thisYear = date.getFullYear()
    const thisMonthIndex = date.getMonth()
    const thisDate = date.getDate()

    // 开始的小时，截止的小时，取件的月份，取件的日,
    let startHour, endHour, startMonth, startDate, label
    const h = date.getHours() // 0-23
    if (h >= 0 && h < 7) {
        startHour = 8
        startMonth = thisMonthIndex + 1
        startDate = thisDate
        label = '今天'
    }
    if (h > 17 && h <= 23) {
        startHour = 8
        const nextDate = new Date(thisYear, thisMonthIndex, thisDate + 1)
        startMonth = nextDate.getMonth() + 1
        startDate = nextDate.getDate()
        label = '明天'
    }
    if (h >= 7 && h <= 17) {
        startHour = h + 1
        startMonth = thisMonthIndex + 1
        startDate = thisDate
        label = '今天'
    }
    endHour = startHour + 1
    return {
        label,
        date: `${fillZero(startMonth)}-${fillZero(startDate)}`,
        startTime: `${fillZero(startHour)}:00`,
        endTime: `${fillZero(endHour)}:00`
    }
}

const formData = {
    // 收件人
    to: { name: '', phone: '', address: '' },
    // 寄件人
    from: { name: '', phone: '', address: '' },
    type: '上门取件', // 自送服务点
    dateTime: getDateTime(),
    info: {
        weight: 1,
        type: '',
        remark: ''
    },
    checked: false
}

export default formData
