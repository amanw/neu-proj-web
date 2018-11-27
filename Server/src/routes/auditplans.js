const express = require('express');
const router = express.Router();
const AuditPlan = require('../models/auditplan');
const User = require('../models/user');
const UniversityData = require('../models/universitydata');
const { normalizeErrors } = require('../helpers/mongoose');
const mongoose = require('mongoose');
const UserCtrl = require('../database/user');
var async = require("async");

router.post('/create', function(req, res,next) {
    var ObjectID = mongoose.mongo.ObjectId;
    const { LastAuditDate, NextAuditDate, RiskFactor, RiskLevel, DaysRequired, ElapsedMonths,status, unversitydata_id } = req.body;
    
    const auditplan = new AuditPlan({LastAuditDate, NextAuditDate, RiskFactor, RiskLevel, DaysRequired, ElapsedMonths,status, unversitydata_id});
    
    var save_status = false;

    UniversityData.findOne({"_id": new ObjectID(auditplan.unversitydata_id) },
    function(err, foundUniversity){
        if(err)
        {
            res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        if(foundUniversity != null) {
        auditplan.unversitydata.push(foundUniversity);
        save_status = true
        }
        else{
            return res.status(422).send({errors: [{title: 'UniversityData ID not found!', detail: 'Something went wrong! Please try again..'}]});
        }
        if(save_status) {
            auditplan.save()
                    .then(item => {
                    return res.status(200).send("Data created to your database");
                    })
                    .catch(err => {
                        return res.status(422).send({errors: normalizeErrors(err.errors)});
                    });
        }
        }).catch(err => {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        });
            
});

router.get('', function(req, res) {
    AuditPlan.find({}, function(err, foundAuditPlans) {

        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
        
        if (foundAuditPlans.length === 0) {
            return res.status(422).send({errors: [{title: 'No Audit Plan Data Found!', detail: 'There are no Audit Plans for the required approach '}]});
        }
        res.json(foundAuditPlans);
    })
});

router.get('/:id', function(req, res) {
    const auditplanId = req.params.id;
  
    AuditPlan.findById(auditplanId)
          .exec(function(err, foundAuditPlan) {

            // console.log(foundAuditPlan);
  
      if (err) {
        return res.status(422).send({errors: [{title: 'Audit Plan Data Error!', detail: 'Could not find this Data!'}]});
      }
  
      return res.json(foundAuditPlan);
    });
  });

router.get('/getStatus/:status', function(req,res){

    const auditStatus = req.params.status;
    const query = auditStatus ? {status: auditStatus.toLowerCase()} : {};

    AuditPlan.find(query)
             .exec(function(err,foundAudits){

                if (err) {
                    return res.status(422).send({errors: [{title: 'test Audit Plan Data Error!', detail: 'Could not find this Data!'}]});
                  }

                  return res.json(foundAudits)
             });
});

    
                


  module.exports = router;
