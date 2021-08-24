const _ = require("lodash");

module.exports.generateNumber = (length) => customAlphabet("123456789", length)();
module.exports.generateCustom = (length, charset) => customAlphabet(charset, length)();


module.exports.prettyCase = (str) => {
    if (typeof str === "string" && /^[A-Z_]+$/.test(str)) {
        str = _.lowerCase(str);
        str = _.startCase(str);
    }
    return str;
};

module.exports.toDecimals = (val, decimal = 2) => {
    const base = Math.pow(10, decimal);
    return Math.round(val * base) / base;
};
