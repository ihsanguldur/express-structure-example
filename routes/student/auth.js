const router = require('express').Router();
const handler = require('../../utils/responseHandler');
const message = require('../../utils/responseMessage');
const {Student} = require('../../models');
const jwt = require('jsonwebtoken');
const {ENUM} = require('../../config/enum');

router.post('/register', async (req, res, next) => {
    const {name} = req.body;

    if (typeof name === "undefined" || name === "") {
        return handler.error(res, 400, message.missingValue("name"));
    }

    Student.create({name})
        .then((student) => {
            handler.success(res, 'Student registered.', student);
        })
        .catch((error) => {
            return handler.sysError(res, error);
        });
});

router.post('/login', async (req, res, next) => {
    const {name} = req.body;

    if (typeof name === "undefined" || name === "") {
        return handler.error(res, 400, message.missingValue("name"));
    }

    Student.findOne({
        where: {name}
    })
        .then((student) => {
            if (typeof student === "undefined" || student === null) {
                return handler.error(res, 400, message.notFound("Student"))
            }

            const token = jwt.sign({
                id: student.id,
                name: student.name,
                type: ENUM.STUDENT
            }, 'ihsanguldur', {expiresIn: '1h'});

            handler.success(res, 'Student logged in.', {token, student});
        })
        .catch((error) => {
            return handler.sysError(res, error);
        });


});

module.exports = router;