const { userSchema } = require('../models/')
const router = require ("express").Router()

router.get('/data/seedall', async (req, res) => {


    const data = await userSchema.findOne();
    if (data) return res.status(418).json({error: 'Data is already seeded'})


    // insert all users
    await userSchema.insertMany(require('../seeders/user-seed-data'));

    // Create car schema var and get car mock data
    const { carSchema } = require('../models');
    const carMockData = require('../seeders/car-seed-data');

    for (let i = 0; i < 10; i++) {
        const foundUser = await userSchema.find().lean().skip(i);
        let currentCarData = carMockData[i];
        currentCarData.userId = foundUser[0]._id;
        await carSchema.create(currentCarData);
    }

    res.status(418).json({ message: 'Server is now seeded' })
})


router.get("/", (req, res) => {
    userSchema
        .find({})
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({error: err});
        });
});

router.get('/:id', (req, res) => {
    userSchema
        .findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => {
            console.log(err);
            res.status(404).json({error: err})
        })
})

router.get('/myprofile/:id', (req, res) => {
    userSchema
        .findOne({
            userLoginId: req.params.id
        })
        .then(user => res.json(user))
        .catch(err => {
            console.log(err);
            res.status(404).json(err)
        })
})

router.post("/", async (req, res) => {


    //TODO: We need to make sure we don't redirect the user to the api's endpoint

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
            // res.json(createdUser);
            res.redirect(req.body.redirect);
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