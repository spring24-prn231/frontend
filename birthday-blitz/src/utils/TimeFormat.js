const formatDateTimeString = (dateTimeString) => {
    function parseDateTimeString(dateTimeString) {
        const parts = dateTimeString.split(/[\/ :]/); // Split by '/', ':', or space
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Months are zero-based
        const year = parseInt(parts[2], 10);
        const hour = parseInt(parts[3], 10);
        const minute = parseInt(parts[4], 10);
        return new Date(year, month, day, hour, minute);
    }
    const date = parseDateTimeString(dateTimeString)
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0'); // Months are zero-based
    const day = `${date.getDate()}`.padStart(2, '0');
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const formatDatetimeLocal = (dateString) => {
    let [datePart, timePart] = dateString.split('T');
    let [year, month, day] = datePart.split('-');
    let [hours, minutes] = timePart.split(':');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const converDateTime = (dateString) => {
    function pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }

    function parseDateTimeString(dateTimeString) {
        const parts = dateTimeString.split(/[\/ :]/); // Split by '/', ':', or space
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        return `${pad(year, 4)}-${pad(month, 2)}-${pad(day, 2)}`;
    }
    return parseDateTimeString(dateString);
}

const converFormat = (dateString) => {
    let [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

export {formatDateTimeString, formatDatetimeLocal, converDateTime, converFormat};