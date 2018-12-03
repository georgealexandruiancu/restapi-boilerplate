const express = require('express');
const router = express.Router();
const User = require('../modules/user');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './uploads/avatars/')
    },
    filename: function(req, file, callback){
        var date = new Date().getTime()
        var name = date + file.originalname;
        callback(null, name);
    },
})
const fileFilter = (req, file, callback) =>{
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        callback(null, true);
    }else{
        callback(null, false);
    }
}
const upload = multer({storage});

// get list of users from the db
router.get('/users', function (req, res, next) {
   User.find({}).then((user)=>{
       res.send(user);
   })
});

// add a user in db
router.post('/users', upload.single('avatar'), (req, res, next) => {
    console.log(req.file);

    // long way
    //--------------
    // var user = new User(req.body);
    // user.save();
    //--------------

    console.log(req.body);
    var newUser = new User({
        name: req.body.name,
        rank: req.body.rank,
        available: req.body.available,
        avatar: req.file.path
    })
    newUser.save()
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
