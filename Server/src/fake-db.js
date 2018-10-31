const User = require('./models/user');
const AuditPlan = require('./models/auditplan');
const auditDbData = require('./auditplan.json');

class FakeDb {

  constructor() {
    this.users = [{
      "username": "Test User",
      "email": "test@gmail.com",
      "password": "testtest"
      },{
      "username": "Test User1",
      "email": "test1@gmail.com",
      "password": "testtest1"
      }
    ]
    //fakeDbData.users;
    this.auditplans = auditDbData.auditplans;
  }

  async cleanDb() {
    await User.remove({});
    await AuditPlan.remove({});
  }

  pushDataToDb() {
    this.users.forEach(user => {
      const newUser = new User(user);
      newUser.save();
    });

    this.auditplans.forEach(auditplan => {
      const newPlan = new AuditPlan(auditplan);
      newPlan.save();
    })
  

    
  }

  async seedDb() {
    await this.cleanDb();
    this.pushDataToDb();
  }
}

module.exports = FakeDb;