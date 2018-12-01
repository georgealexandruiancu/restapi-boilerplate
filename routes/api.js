const express = require('express');

const router = express.Router();
// get list of users from the db
router.get('/users', function (req, res) {
    res.send({type: 'GET'});
});

// add a user in db
router.post('/users', function (req, res) {
    res.send({ type: 'POST' });
});

// update a user in db
router.put('/users/:id', function (req, res) {
    res.send({ type: 'PUT' });
});

// delete a user in db
router.delete('/users/:id', function (req, res) {
    res.send({ type: 'DELETE' });
});

module.exports = router;
