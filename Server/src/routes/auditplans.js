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
    const { LastAuditDate, NextAuditDate, RiskFactor, RiskLevel, DaysRequired, ElapsedMonths, unversitydata_id } = req.body;
    
    const auditplan = new AuditPlan({LastAuditDate, NextAuditDate, RiskFactor, RiskLevel, DaysRequired, ElapsedMonths, unversitydata_id});
    
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
    
                


  module.exports = router;
