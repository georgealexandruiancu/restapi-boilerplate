const express = require('express');
const router = express.Router();
const User = require('../modules/user');
// get list of users from the db
router.get('/users', function (req, res, next) {
   User.find({}).then((user)=>{
       res.send(user);
   })
});

// add a user in db
router.post('/users', function (req, res, next) {
    
    // long way
    //--------------
    // var user = new User(req.body);
    // user.save();
    //--------------

    User.create(req.body)
    .then((user) => {
        res.send(user);
    })
    .catch(next);
   
});

// update a user in db
router.put('/users/:id', function (req, res, next) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
        User.findOne({_id: req.params.id}).then((user)=>{
            res.send(user);
        })
    })
    .catch((err)=>{
        console.log(err);
    })
});

// delete a user in db
router.delete('/users/:id', function (req, res, next) {
    User.findOneAndRemove({_id: req.params.id})
    .then((user)=>{
        res.send(user);
    })
    // res.send({ type: 'DELETE' });
});

module.exports = router;
