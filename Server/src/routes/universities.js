const express = require('express');
const router = express.Router();
const UniversityData = require('../models/universitydata');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');

const UserCtrl = require('../database/user');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
    res.json({"secret": true});
  });

  router.post('/create', function(req, res) {
    const { University = "Northeastern", UniversityArea, Owner, AuditArea, Description } = req.body;
  
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

router.get('/:id', function(req, res) {
    const universityId = req.params.id;
  
    UniversityData.findById(universityId)
          .exec(function(err, foundUniversity) {
  
      if (err) {
        return res.status(422).send({errors: [{title: 'University Data Error!', detail: 'Could not find this Data!'}]});
      }
  
      return res.json(foundUniversity);
    });
  });


  router.patch('/:id', function(req, res) {

    const universityData = req.body;
  
    UniversityData
      .findById(req.params.id)
      .exec(function(err, foundUniversity) {
  
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        foundUniversity.set(universityData);
        foundUniversity.save(function(err) {
          if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
  
          return res.status(200).send(foundUniversity);
        });
      });
  });

  router.patch('/:id', function(req, res) {

    const universityData = req.body;
  
    UniversityData
      .findById(req.params.id)
      .exec(function(err, foundUniversity) {
  
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        foundUniversity.set(universityData);
        foundUniversity.save(function(err) {
          if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
  
          return res.status(200).send(foundUniversity);
        });
      });
  });

  router.delete('/:id', function(req, res) {

    UniversityData
      .findById(req.params.id)
      .exec(function(err, foundUniversity) {
  
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        foundUniversity.remove(function(err) {
          if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
  
          return res.json({'status': 'deleted',
                            'ID': req.params.id
                          
                          }

          );
        });
      });
  });



module.exports = router;