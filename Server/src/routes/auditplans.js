const express = require('express');
const router = express.Router();
const AuditPlan = require('../models/auditplan');
const User = require('../models/user');
const UniversityData = require('../models/universitydata');
const { normalizeErrors } = require('../helpers/mongoose');
const mongoose = require('mongoose');
const UserCtrl = require('../database/user');
var async = require("async");
var ObjectID = mongoose.mongo.ObjectId;

// To create the Audit plan 
router.post('/create', function(req, res) {
    
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
        auditplan.AuditArea = foundUniversity.AuditArea;
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

// to get the list of the Audit data
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

// To get the list based on ID
router.get('/audit/:id', function(req, res) {
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

// to get the list 
router.get('/getStatus/:status', function(req,res){

    const auditStatus = req.params.status;
    const query = auditStatus ? {status: auditStatus.toLowerCase()} : {errors: [{title: 'test Audit Plan Data Error!', detail: 'Could not find this Data!'}]};

    AuditPlan.find(query)
             .exec(function(err,foundAudits){

                if (err) {
                    return res.status(422).send({errors: [{title: 'test Audit Plan Data Error!', detail: 'Could not find this Data!'}]});
                  }

                if (foundAudits.length === 0) {
                    return res.status(422).send({errors: [{title: 'test Audit Plan Data Error!', detail: 'Could not find this Data!'}]});
                }

                  return res.json(foundAudits)
             });
});


/** To delete the Audit Plan Data based on ID. */ 
router.delete('/:id', function(req, res) {

    AuditPlan
      .findById(req.params.id)
      .exec(function(err, foundAudit) {
  
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        foundAudit.remove(function(err) {
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

// To edit the data 
router.patch('/:id', function(req, res) {

    const auditData = req.body;
    AuditPlan
      .findById(req.params.id)
      .exec(function(err, foundAudit) {
        if(foundAudit == null) {
          return res.status(422).json({errors: [{title: 'Audits not found!', detail: 'Something went wrong! Please try again..'}]})
        }
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        foundAudit.set(auditData);
        foundAudit.save(function(err) { 
          if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
  
          return res.status(200).send(foundAudit);
        });
});
});


// To get the Dasboard Graph Data
router.post('/getGraphData',function(req,res){
  let auditStatus = "planned";
  let query = auditStatus ? {status: auditStatus.toLowerCase()} : {};
  var res_data = [];
  var plannedstatus = true;
  var scheduledstatus = false;
  var closedstatus = false;
  AuditPlan.find(query)
           .exec(function(err,foundAudits){
             console.log(foundAudits);
              if (err) {
                  return res.status(422).send({errors: [{title: 'test Audit Plan Data Error!', detail: 'Could not find this Data!'}]});
                }

              var newData = {
                  title:"Planned Audits",
                  value:foundAudits.length,
                  color:"red"
              }
              console.log("NEW DATA FOR PLANNED");
              console.log(newData);
              if(newData != null){
                  res_data.push(newData);
                  auditStatus = "scheduled";
                  query = auditStatus ? {status: auditStatus.toLowerCase()} : {};
              }   
 
  
      AuditPlan.find(query)
           .exec(function(err,foundAudits){

              if (err) {
                  return res.status(422).send({errors: [{title: 'test Audit Plan Data Error!', detail: 'Could not find this Data!'}]});
                }
              // if (foundAudits.length === 0) {
              //     return res.status(422).send({errors: [{title: 'test Audit Plan Data Error!', detail: 'Could not find this Data!'}]});
              // }

              var newData = {
                  title:"Scheduled Audits",
                  value:foundAudits.length,
                  color:"red"
              }
              if(newData != null){
                  res_data.push(newData);
                  plannedstatus = false;
                  scheduledstatus = true;
                  auditStatus = "scheduled";
                  query = auditStatus ? {status: auditStatus.toLowerCase()} : {};
              }
              
              if(scheduledstatus) {
                return  res.status(200).send(res_data);
              }
               
  });
  
});


  
});

/**To get the users data */
router.get('/users', function(req, res) {
  User.find({}, function(err, foundUsers) {

      if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        const universityAreas = [...new Set(foundUsers.map(item => item.email+","+item.username))]
      if (foundUsers.length === 0) {
          return res.status(422).send({errors: [{title: 'No User Data Found!', detail: 'There are no User Data for the required approach '}]});
      }
      res.json(universityAreas);
  })
});

  module.exports = router;
