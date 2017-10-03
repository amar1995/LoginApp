const express = require('express');
const router = express.Router();

router.route('/profile/:username')
    //send the user json object after querying it from the database
    .get(function(req, res){
        res.send({message: 'sending the user with id: '+req.params.username});
    })

    .post(function(req, res){
        res.send({message: 'modifying the user with id: '+req.params.username});
    });

module.exports = router;