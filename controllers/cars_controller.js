const { carSchema } = require('../models/')
const router = require ("express").Router()

router.get("/", (req, res) => {
    carSchema.find()
        .populate('userId')
        .then((cars) => {
            // const formattedCars = cars.map(car => {
            //     car.userId = car.userId.revokeLogin();
            //     return car;
            // })
            res.json(cars);
        })
        .catch((err) => {

            console.log(err);
            res.json(err);
    });
});

router.get('/mylistings/id/:id', (req, res) => {


    carSchema
        .find()
        .lean()
        .then(cars => {
            const filteredCars = cars.filter(el => el.userId == req.params.id)
            res.json(filteredCars);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
})

router.get('/mylistings/sub/:id', (req, res) => {
    carSchema
        .find()
        .populate('userId')
        .then(cars => {
            const formattedCars = cars.filter(car => car.userId.userLoginId == req.params.id)
            res.json(formattedCars);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
})

router.get('/:start/:amount', (req, res) => {

    const
        begin = req.params.start,
        amt = req.params.amount;
    
    if (isNaN(begin) || isNaN(amt)) return res.status(404).json({error: 'You must use numbers for skip and limiter' });

    carSchema.find()
        .skip(begin)
        .limit(amt)
        .populate('userId')
        .then(cars => {
            // const formattedCars = cars.map(car => {
            //     car.userId = car.userId.revokeLogin();
            //     return car;
            // })
            res.json(cars);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
})

router.post("/", async (req, res) => {

    const {
        make,
        model,
        year,
        color,
        milage,
        condition,
        imageUrl,
        userLoginId
    } = req.body;


    if (!make || !model || !year || !userLoginId) return res.status(404).json({ error: 'You must supply all required fields' })

    const { userSchema } = require('../models/');
    const user = await userSchema.findOne({ userLoginId: userLoginId }).lean();

    if (!user) return res.status(404).json({ error: 'That user does not exist' });

    carSchema.create({make, model, year, color, milage, condition, imageUrl, userId: user._id})
        .then((createdCar) => {
            res.redirect(req.body.redirect);
        })
        .catch((err) => {
            res.status(404).json({error: err});
        });
});

router.put("/", (req, res) => {
    const {id, ... bodyInfo} = req.body
    carSchema.findByIdAndUpdate(id, bodyInfo, {new: true})
        .then((updatedCar) => {
            res.json(updatedCar);
        })
        .catch((err) => {
            res.status(404).json({error: err});
        });
});

module.exports = router;