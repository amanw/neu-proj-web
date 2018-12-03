const express = require('express');
const router = express.Router();
const issuetrackingData = require('../models/issuetracking');
const AuditData = require('../models/auditplan');
const { normalizeErrors } = require('../helpers/mongoose');
const mongoose = require('mongoose');
var ObjectID = mongoose.mongo.ObjectId;

/**Create the Issue Tracking Data */
router.post('/create', function(req, res) {
    const { Name, Description, Recommendation, Owner, status, RiskLevel,ManagementResponse, CompletionDate, AssignedTo, IssueManager, RevisedCompletionDate, FollowUpTesting, ImplementationDate, ClosedDate, auditId } = req.body;
  
    const issuedata = new issuetrackingData({Name, Description, Recommendation, Owner, status, RiskLevel,ManagementResponse, CompletionDate, AssignedTo, IssueManager, RevisedCompletionDate, FollowUpTesting, ImplementationDate, ClosedDate, auditId });
    var save_status = false;
    issuetrackingData.findOne({"auditId": issuedata.auditId},
    function(err, foundIssueData){

      if(foundIssueData == null){

    
    AuditData.findOne({"_id": new ObjectID(issuedata.auditId) },
    function(err, foundAudit){
        if(err)
        {
            res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        if(foundAudit != null) {
        issuedata.Name = foundAudit.unversitydata[0].AuditArea;
        issuedata.Description = foundAudit.unversitydata[0].Description;
        issuedata.Owner = foundAudit.unversitydata[0].Owner;
        save_status = true
        }
        else{
            return res.status(422).send({errors: [{title: 'AuditData ID not found!', detail: 'Something went wrong! Please try again..'}]});
        }
        if(save_status) {
          issuedata.save()
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
      }
      else{
        return res.status(422).send({errors: [{title: 'Issue Already created', detail: 'Issue Already created'}]});
      }
      }
      )
      
  
});


/** To get the list for Issue */ 
router.get('', function(req, res) {
    issuetrackingData.find({}, function(err, foundissuetrackingData) {

        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
        
        if (foundissuetrackingData.length === 0) {
            return res.status(422).send({errors: [{title: 'No Issue Data Found!', detail: 'There are no Issue Data for the required approach '}]});
        }
        res.json(foundissuetrackingData);
    })
});


/** To get the issuedata based on ID */ 
router.get('/:id', function(req, res) {
    const issueId = req.params.id;
  
    issuetrackingData.findById(issueId)
          .exec(function(err, foundIssueData) {

  
      if (err) {
        return res.status(422).send({errors: [{title: 'Issue Data Error!', detail: 'Could not find this Data!'}]});
      }
  
      return res.json(foundIssueData);
    });
});


/**Patch the Data based on ID */
router.patch('/:id', function(req, res) {

    const issue = req.body;
  
    issuetrackingData
      .findById(req.params.id)
      .exec(function(err, foundIssueData) {
  
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        
        foundIssueData.set(issue);
        foundIssueData.save(function(err) {
          if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
  
          return res.status(200).send(foundIssueData);
        });
      });
});

/** To delete the Data based on ID. */ 
router.delete('/:id', function(req, res) {

    issuetrackingData
      .findById(req.params.id)
      .exec(function(err, foundIssueData) {
  
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        foundIssueData.remove(function(err) {
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


