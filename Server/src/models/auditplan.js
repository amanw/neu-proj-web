const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id:{type: Schema.Types.ObjectId},
  username:{type: String},
  email:{type: String},
  password:{type: String}
});

var UniversitySchema = new Schema({
  _id:{type: Schema.Types.ObjectId},
  University: { type: String},
  UniversityArea: { type: String },
  Owner: { type: String},
  AuditArea: { type: String},
  Description: { type: String}
});

const auditPlanSchema = new Schema({
  LastAuditDate: { type: String, required: false},
  NextAuditDate: { type: String, required: true, lowercase: false },
  RiskFactor: { type: Number, required: false},
  RiskLevel: { type: String, required: true, lowercase: false },
  DaysRequired: { type: Number, required: false, lowercase: false },
  ElapsedMonths: { type: Number, required: false, lowercase: false },
  createdAt: { type: Date, default: Date.now },
  status:{type: String, required:false},
  unversitydata_id: { type: String },
  user_ids:{type: String },
  user: [UserSchema],
  unversitydata: [UniversitySchema]
});


module.exports = mongoose.model('Auditplan', auditPlanSchema );
