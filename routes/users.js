var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET users listing. */

router.get('/', function(req, res, next) {
  User.find()
  .then(users => {
    res.json(users);
  })
  .catch(e => {
    console.log(e)
  })
})

router.delete('/:id', function(req, res, next) {
  const {id} = req.params;

  User.findByIdAndDelete(id, (err, user) => {
    if(err) return res.status(500).send(err);
    res.send(`User ${user.username} deleted`);
  })

})

router.put('/:id', function(req, res, next) {
  console.log(req.body)
  const {id} = req.params;
 
  const {username, fullname, password, role} = req.body;

  User.findByIdAndUpdate(id, {
    username,
    fullname,
    password,
    role
  }, (err, user) => {
    if(err) return res.status(500).send(err);
    res.send(`User ${user.username} updated`);
  })

})

router.post('/signin', function(req, res, next) {
  const {username, password} = req.body;
  User.findOne({username}).then(user => {
    if(!user) return res.status(404).send('User not found');

    user.comparePassword(password, (err, isMatch) => {
      if(err) return res.status(500).send(err); // --
      if(!isMatch) return res.status(401).send('Incorrect password');//--

      User.findOne({username}).then(user => {
        res.json(user);
      })

    })

  })
})

router.post('/signup', function(req, res, next) {
  if(req.body.length == 0) return; // no users to add
  const {username, fullname, password, role} = req.body;
  User.create({
    username,
    fullname,
    password,
    role
  }, (err, user) => {
    if(err) return res.status(500).send(err);
    res.json(user);})
});

module.exports = router;
