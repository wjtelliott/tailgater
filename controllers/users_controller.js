const { userSchema } = require('../models/')
const router = require ("express").Router()

router.get("/", (req, res) => {
    const
        begin = req.body?.startIndex ?? 0,
        end = req.body?.limit ?? 10,
        searchParams = req.body?.search ?? {};

    userSchema
        .find(typeof searchParams === 'object' &&
            !Array.isArray(searchParams) ? searchParams : {})
        .skip(begin)
        .limit(end)
        .then(users => {
            const newData = users.map(user => user.revokeLogin());
            res.json(newData);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({error: err});
        });
});

router.post("/", async (req, res) => {

    const {
        name,
        userLogin,
        email,
        phone,
        city,
        state } = req.body;
    
    // Check to make sure we have the required fields before worrying about a db call
    if (!name || !userLogin || !email) return res.status(404).json({ error: `You didn't have the required fields` });


    // Check for an existing user with the same userID or email
    const data = await userSchema.find({
        $or: [
            { userLoginId: userLogin },
            { email: email }
        ]
    });
    if (+data.length) return res.status(404).json({ error: `There is already a user with that login information` });


    userSchema.create({ name, userLoginId: userLogin, email, phone, city, state })
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