const { carSchema } = require('../models/')
const router = require ("express").Router()

router.get("/", (req, res) => {
    carSchema.find()
        .then((cars) => {
            res.json(cars);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/", (req, res) => {
    carSchema.create(req.body)
        .then((createdCar) => {
            res.json(createdCar);
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