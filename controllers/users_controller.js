const { userSchema } = require('../models/')
const router = require ("express").Router()

router.get("/", (req, res) => {
    const
        begin = req.body?.startIndex ?? 0,
        end = req.body?.endIndex ?? 10,

        //* We have to filter out psw here so we aren't able to search by password guesses
        { psw, ...filteredParams } = req.body?.search ?? {};

    userSchema
        .find(typeof filteredParams === 'object' &&
            !Array.isArray(filteredParams) ? filteredParams : {})
        .skip(begin)
        .limit(end)
        .then((users) => {
            const newData = users.map(user => user.revokePassword())
            res.json(newData);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/", (req, res) => {
    userSchema.create(req.body)
        .then((createdUser) => {
            res.json(createdUser);
        })
        .catch((err) => {
            res.status(404).json({error: err});
        });
});

router.put("/", (req, res) => {
    const {id, ... bodyInfo} = req.body
    userSchema.findByIdAndUpdate(id, bodyInfo, {new: true})
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((err) => {
            res.status(404).json({error: err});
        });
});

module.exports = router;