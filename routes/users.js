var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var userSchema = require('../models/user').userSchema;
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/add', function (req, res, next) {
  // create a new user called chris
  var postUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    location: req.body.location,
    meta: {
      age: req.body.age,
      website: req.body.website
    },
    username: req.body.username,
    password: req.body.password,
  });

  //dudify
  postUser.dudify(function (err, name) {
    if (err) throw err;
    console.log('Your new name is ' + name);
  });

  postUser.save(function (err) {
    if (err) throw err;
    console.log('User saved successfully!');
    res.send('User saved successfully!');
  });


});

router.post('/location', function (req, res, next) {
  var User = mongoose.model('User', userSchema);
  User.findByLocation(req.body.location, function (err, users) {
    console.log(users);
    res.json(users);
  });
});

router.get('/getAll', function (req, res, next) {
  // get all the users
  User.find({}, function (err, users) {
    if (err) throw err;

    // object of all the users
    console.log(users);
    res.json(users);
  });
});

router.get('/get/:username', function (req, res, next) {
  User.find({ username: req.params.username }, function (err, user) {
    if (err) throw err;

    // object of the user
    console.log(user);
    res.json(user);
  });
});

router.delete('/findthenremove/:username', function (req, res, next) {
  console.log("username" + req.params.username);
  User.find({ username: req.params.username }, function (err, user) {
    if (err) throw err;

    console.log(JSON.stringify(user));

    if (user == undefined || user == null) {
      res.json({
        "success": 0,
        "data": {},
        "message": "user not found!"
      });
    } else {

      // delete him
      User.deleteOne({ username:  req.params.username }, function (err) {
        if (err) return handleError(err);

        console.log('User successfully deleted!');
        res.json({
          "success": 1,
          "data": user,
          "message": "user removed!"
        });
      });

    }
  });
});


router.delete('/findandremove/:username', function (req, res, next) {
  console.log("username" + req.params.username);

  User.findOneAndRemove({ username: req.params.username }, function (err) {
    if (err) throw err;

    // we have deleted the user
    console.log('User deleted!');
    res.json('User deleted!')
  });
});

router.put('/update/:username', function (req, res, next) {
  User.updateOne({ username: req.params.username }, { password: req.body.password}, function(err, resp) {
    console.log(JSON.stringify(resp))
    res.json("user password updated!");
  });
});

module.exports = router;
