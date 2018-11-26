const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const FakeDb = require('./fake-db');

const userRoutes = require('./routes/users'),
universityDataRoutes = require('./routes/universities'),
auditPlanRoutes = require('./routes/auditplans')
;

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
  const fakeDb = new FakeDb();
    fakeDb.seedDb();
  
}); 
mongoose.set('useFindAndModify', false);

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/universities', universityDataRoutes);
app.use('/api/v1/auditplans', auditPlanRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT , function() {
  console.log('App is running!');
});
