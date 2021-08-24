const functions = require("./functions");

module.exports = () => (req, res, next) => {
    // success response
    res.success = (message, data) => {
        message = functions.prettyCase(message);
        return res.send({ statusCode: 200, message, data: data || {} });
    };

    // error resposne
    res.error = (code, message, data) => {
        message = functions.prettyCase(message);
        code = code ? code : 400
        res.status(code).send({ statusCode: code, message, data: data || {} });
    };

    // proceed forward
    next();
};
