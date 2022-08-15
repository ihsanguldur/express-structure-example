const jwt = require('jsonwebtoken');
const handler = require('../utils/responseHandler');
const message = require('../utils/responseMessage');

module.exports = (type) => {
    return (req, res, next) => {
        const bearer = req.headers["authorization"].split(" ")[1];
        jwt.verify(bearer, 'ihsanguldur', (err, decoded) => {
            if (err) {
                return handler.error(res, 401, message.unauthorized());
            }

            req.user = decoded;
            if (req.user.type === type) {
                return next();
            } else {
                return handler.error(res, 401, 'It is Not For You.');
            }
        });
    }
}