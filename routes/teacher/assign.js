const router = require('express').Router();
const {Homework} = require('../../models');
const authorize = require('../../middleware/authorize');
const {ENUM} = require('../../config/enum');
const handler = require('../../utils/responseHandler');
const message = require('../../utils/responseMessage');

router.post('/', authorize(ENUM.TEACHER), async (req, res, next) => {
    const {subject, student} = req.body;
    if (typeof subject === "undefined" || subject === "" || typeof student === "undefined" || student === "") {
        return handler.error(res, 400, message.missingValue("subject and student"));
    }

    Homework.create({
        subject,
        studentID: student,
        teacherID: req.user.id
    })
        .then((homework) => {
            return handler.success(res, "Homework assigned.", homework);
        })
        .catch((error) => {
            return handler.sysError(res, error);
        });

});

router.get('/list', authorize(ENUM.TEACHER), async (req, res, next) => {
    Homework.findAll({
        where:
            {teacherID: req.user.id}
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