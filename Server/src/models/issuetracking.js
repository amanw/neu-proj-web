const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issuetrackingSchema = new Schema({
    Name:{type: String, required:true},
    Description:{type: String, required:false},
    Recommendation:{type:String, required:true},
    Owner:{type:String, required:true},
    statue:{type:String, required:true},
    RiskLevel:{type:String, required:true},
    ManagementResponse:{type:String, required:true},
    CompletionDate:{type:String, required:false},
    AssignedTo:{type:String, required:true},
    IssueManager:{type:String, required:true},
    RevisedCompletionDate:{type:String, required:false},
    FollowUpTesting:{type:String, required:false},
    ImplementationDate:{type:String, required:false},
    ClosedDate:{type:String, required:false}

});

module.exports = mongoose.model('Issuetracking',issuetrackingSchema);
