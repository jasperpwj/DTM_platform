
async function calculateDays(prevDate, curDate) {
    if(!prevDate || !curDate) throw 'Invalid date format or empty input';
    let previousDate = new Date(prevDate);
    let currentDate = new Date(curDate);
    let interval = Math.abs(currentDate - previousDate) / 1000;
    return Math.floor(interval/86400);
}

async function calculateDayName(curDate, format='full') {
    let day= "";
    let formatValue = 1;
    if(format.toLowerCase() === 'abbr') {
        formatValue = 0;
    }
    switch(new Date(curDate).getDay()) {
        case 0:
            day = formatValue?"Sunday" : "Sun";
            break;
        case 1:
            day = formatValue?"Monday": "Mon";
            break;
        case 2:
            day = formatValue?"Tuesday": "Tue";
            break;
        case 3:
            day = formatValue?"Wednesday": "Wed";
            break;
        case 4:
            day = formatValue?"Thursday": "Thur";
            break;
        case 5:
            day = formatValue?"Friday": "Fri";
            break;
        case 6:
            day = formatValue?"Saturday": "Sat";
            break;
    }
    return day;
}

module.exports = {
    calculateDays,
    calculateDayName,

};