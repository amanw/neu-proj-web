const express = require('express');
const router = express.Router();
const UniversityData = require('../models/universitydata');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');

const UserCtrl = require('../database/user');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
    res.json({"secret": true});
  });

  router.post('', UserCtrl.authMiddleware, function(req, res) {
    const { University, UniversityArea, Owner, AuditArea, Description } = req.body;
  
    const universitydata = new UniversityData({University, UniversityArea, Owner, AuditArea, Description});

     universitydata.save()
     .then(item => {
         res.send("Data created to your database");
     })
     .catch(err => {
        res.status(422).send({errors: normalizeErrors(err.errors)});
     });

  });



router.get('', function(req, res) {
    UniversityData.find({}, function(err, foundUniversityData) {

        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
        
        if (foundUniversityData.length === 0) {
            return res.status(422).send({errors: [{title: 'No University Data Found!', detail: 'There are no University Data for the required approach '}]});
        }
        res.json(foundUniversityData);
    })
});

module.exports = router;