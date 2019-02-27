export default {
    generateId, 
    getRandomIntInclusive,
    formatDate
}

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatDate(timestamp) {
    const currDate = new Date();
    const pastDate = new Date(timestamp);
    const isSameYear = (currDate.getFullYear() === pastDate.getFullYear());
    const isSameMonth = (currDate.getMonth() === pastDate.getMonth());
    const isSameDay = (currDate.getDate() === pastDate.getDate());
    const isYesterday = (isSameMonth && (currDate.getDate() - 1 === pastDate.getDate()))

    if (isSameYear) { // if same year - return full date
        return `${_zeroPadding(pastDate.getDate())}.
                ${_zeroPadding(pastDate.getMonth() + 1)}.
                ${pastDate.getFullYear()}`
    }
    else if (isSameMonth && isSameDay) { // if same year, month and day - return hh:mm
        return `${_zeroPadding(pastDate.getHours())} : 
                ${_zeroPadding(pastDate.getMinutes())}`
    }
    else if (isSameMonth && isYesterday) return 'Yesterday' // if yesterday - return yesterday
    
    // reutrn dd and month name
    return `${_zeroPadding(pastDate.getDate())} ${_getMonthName(pastDate.getMonth())} `


    function _zeroPadding(num) {
        if (num < 10) return `0${num}`;
        else return num;
    }

    function _getMonthName(monthNum) {
        let monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        return monthsName[monthNum];
    }
}