const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

//User Model
const User = require('../../models/user');

// @route  GET api/users
// @desc   Get all users
// @access Public <IS A SECURITY VULNERABILITY>
router.get('/', (req, res) => {
  User.find({})
    .sort({username: 1})
    .then(users => res.json(users))
});

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
  let { username, firstname, lastname, organization, position, email, biography } = req.body;

  // Search the database for the given username
  User.findOne({ username })
    .then(user => {
      if (!user) {
        console.log('not saved')
        res.status(400).json({ message: 'Invalid username'});
        return;
      }
      // Update relevant fields
      user.first_name = firstname;
      user.last_name = lastname;
      user.organization = organization;
      user.position = position;
      user.email_address = email;
      user.biography = biography;
      // Mark modifications to ensure update is staged
      user.markModified('first_name');
      user.markModified('last_name');
      user.markModified('organization');
      user.markModified('position');
      user.markModified('email_address');
      user.markModified('biography');
      // Save to database or error
      user.save(function (err, user) {
        if(err) {
          console.log('why')
          console.log(err)
          res.status(400).json({ message: 'Database update error'});
          return;
        }

        console.log('SAVED')
        res.json({ message: 'Update successful'});
      });

    })
});

// @route  POST api/users/updateprofile/role
// @desc   Update the profile of username with a new role.
// @access Public <IS A SECURITY VULNERABILITY>
router.post('/updateprofile/role', (req, res) => {
  let { username, role } = req.body;

  // Search the database for the given username
  User.findOne({ username })
    .then(user => {
      if (!user) {
        console.log('not saved')
        res.status(400).json({ message: 'Invalid username'});
        return;
      }
      // Update relevant fields
      user.role = role;
      // Mark modifications to ensure update is staged
      user.markModified('role');
      // Save to database or error
      user.save(function (err, user) {
        if(err) { 
          console.log('why')
          console.log(err)
          res.status(400).json({ message: 'Database update error'});
          return;
        }

        console.log('SAVED')
        res.json({ message: 'Update successful'});
      });

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
