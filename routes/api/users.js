const express = require('express');
const router = express.Router();

//User Model
const User = require('../../models/user');

router.post('/loginRequest', (req, res) => 
{
  // user login data from post request
  let usersName = req.body.username;
  let usersPassword = req.body.password;

  // Search database for username
  User.find({ username: usersName }, function(err, user) 
  {
    if(err)
    {
      res.json({success: false, message: 'an error occured'})
      next();
    }

    User.checkPassword(usersPassword, function(errr, isMatch)
    {
      if(true == isMatch)
      {
        res.json({success: true, message: ''})
      }
      else
      {
        res.json({success: false, message: 'an error occured'})
      }
    });

  });
    
});

router.post('/newUserRequest', (req, res) =>
{
  // user info from request.
  const newUser = new User({
    username: req.body.usersName,
    password: req.body.usersPassword
  });

  // verify username is unique.
  

  // add new user.
  newUser.save();
  res.json({success: true, message: 'New User Added.'});
})



module.exports = router;