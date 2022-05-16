const { carSchema } = require('../models/')
const router = require ("express").Router()

router.get("/", (req, res) => {

    const
    begin = req.body?.startIndex ?? 0,
    end = req.body?.endIndex ?? 10,
    { filteredParams } = req.body?.search ?? {};

carsSchema
    .find(typeof filteredParams === 'object' &&
        !Array.isArray(filteredParams) ? filteredParams : {})
    .skip(begin)
    .limit(end)
    .lean()
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