const express = require('express');
const User = require('../database/user');
const router = express.Router();

router.post('/auth', User.auth);

router.post('/register', User.register);

// /** To get the user profile based on ID */ 
// router.get('/profile/:id', function(req, res) {
//     const userId = req.params.id;
  
//     User.findById(userId)
//           .exec(function(err, foundUserData) {

  
//       if (err) {
//         return res.status(422).send({errors: [{title: 'User Data Error!', detail: 'Could not find this Data!'}]});
//       }
  
//       return res.json(foundUserData);
//     });
// });

module.exports = router;

