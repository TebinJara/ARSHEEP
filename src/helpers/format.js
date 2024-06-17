

export const formatRUT = (input) => {
    let value = input.replace(/[^0-9kK]/g, '').toUpperCase();
    if (value.includes('K') && value.indexOf('K') !== value.length - 1) {
        value = value.replace(/K/g, '');
    }
    if (value.length > 9) {
        value = value.slice(0, 8) + value.slice(8, 9);
    }
    if (value.length > 1) {
        value = value.slice(0, -1) + '-' + value.slice(-1);
    }
    if (value.length > 5) {
        value = value.slice(0, -5) + '.' + value.slice(-5);
    }
    if (value.length > 9) {
        value = value.slice(0, -9) + '.' + value.slice(-9);
    }
    if (value.length > 12) {
        value = value.slice(0, 12);
    }
    return value;
};

export const formatInputText = (input, maxLength) => {
    let formattedName = input.toUpperCase().replace(/[a-z]/g, '').slice(0, maxLength);
    return formattedName;
};