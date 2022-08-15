const router = require('express').Router();
const {Homework} = require('../../models');
const authorize = require('../../middleware/authorize');
const {ENUM} = require('../../config/enum');
const handler = require("../../utils/responseHandler");
const message = require("../../utils/responseMessage");

router.get('/', authorize(ENUM.STUDENT), (req, res, next) => {
    Homework.findAll({
        where: {
            studentID: req.user.id
        }
    })
        .then((homeworks) => {
            if (typeof homeworks === "undefined" || homeworks === []) {
                return handler.error(res, 400, message.notFound("homework"));
            }

            handler.success(res, "Homeworks listed.", homeworks);
        })
        .catch((error) => {
            return handler.sysError(res, error);
        });
});

module.exports = router;