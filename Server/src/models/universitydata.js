const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const universityDataSchema = new Schema({
  University: { type: String, required: true, max: [128, 'Too long, max is 128 characters']},
  UniversityArea: { type: String, required: true, lowercase: false },
  Owner: { type: String, required: true, min: [4, 'Too short, min is 4 characters']},
  AuditArea: { type: String, required: true, lowercase: false },
  Description: { type: String, required: false, lowercase: false }
});


module.exports = mongoose.model('Universitydata', universityDataSchema );
