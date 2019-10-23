const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

//User Model
const User = require('../../models/user');

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
