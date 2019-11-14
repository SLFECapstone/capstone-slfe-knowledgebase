const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

//User Model
const User = require('../../models/user');

router.get('/profile/:username/', (req, res)=>{
  User.findOne({ username: req.params.username }, function(err, user) {
    if (err) {
      res.send("error occured");
      next();
    }
    res.json(user);
  });
});

router.post('/updateprofile', (req, res) => {
  let { username, firstname, lastname, organization, position, email } = req.body;

  // Search the database for the given username
  User.findOne({ username })
    .then(user => {
      if (!user) return res.status(400).json({ message: 'Invalid username'});
      // Update relevant fields
      user.first_name = firstname;
      user.last_name = lastname;
      user.organization = organization;
      user.position = position;
      user.email_address = email;
      // Mark modifications to ensure update is staged
      user.markModified('first_name');
      user.markModified('last_name');
      user.markModified('organization');
      user.markModified('position');
      user.markModified('email_address');
      // Save to database or error
      user.save(function (err) {
        if(err){ return res.status(400).json({ message: 'Database update error'}); }
      });
      res.json({ message: 'Update successful'});
    })
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  // Search the database for the given username
  User.findOne({ username })
    .then(user => {
      if (!user) return res.status(400).json({ message: 'Incorrect username/password'});

      // Validate password
      user.checkPassword(password, function(err, isMatch) {
        if (isMatch) {
          jwt.sign(
            { id: user.id },
            req.app.locals.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;

              // return the token and user details
              res.json({
                token,
                user: {
                  id: user.id,
                  username: user.username,
                  role: user.role
                }
              })
            }
          )
        } else {
          return res.status(400).json({ msg: 'Incorrect username/password' });
        }
      })
    })
});


router.post('/register', (req, res) => {
  let new_user = new User(req.body);
  new_user.save()
    .then(user => res.json(user))
    .catch(function () {
      console.log("There was an error registering the user")
    });
});

module.exports = router;
