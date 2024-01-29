const { MONTHS } = require("../contants/date");

const formatDate = (date) => { 
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const monthName = MONTHS[month];
    const day = d.getDate();
    const year = d.getFullYear();
    return `${day} ${monthName}, ${year}`;
}

module.exports = { formatDate };