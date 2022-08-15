const router = require('express').Router();
const handler = require('../../utils/responseHandler');
const message = require('../../utils/responseMessage');
const {Teacher} = require('../../models');
const jwt = require('jsonwebtoken');
const {ENUM} = require('../../config/enum');

router.post('/register', async (req, res, next) => {
    const {name} = req.body;

    if (typeof name === "undefined" || name === "") {
        return handler.error(res, 400, message.missingValue("name"));
    }

    Teacher.create({name})
        .then((teacher) => {
            handler.success(res, 'Teacher registered.', teacher);
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

    Teacher.findOne({
        where: {name}
    })
        .then((teacher) => {
            if (typeof teacher === "undefined" || teacher === null) {
                return handler.error(res, 400, message.notFound("Teacher"))
            }

            const token = jwt.sign({
                id: teacher.id,
                name: teacher.name,
                type: ENUM.TEACHER
            }, 'ihsanguldur', {expiresIn: '1h'});

            handler.success(res, 'Teacher logged in.', {token, teacher});
        })
        .catch((error) => {
            return handler.sysError(res, error);
        });


});

module.exports = router;