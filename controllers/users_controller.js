const { userSchema } = require('./models/')

router.get("/", (req, res) => {
    userSchema.find()
        .then((users) => {
            //const {psw, ... bodyInfo} = users
            res.json(users);
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