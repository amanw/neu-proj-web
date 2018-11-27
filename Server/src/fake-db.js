const User = require('./models/user');
const UniversityData = require('./models/universitydata');
const universityDbData = require('./universitydata.json');
const auditData = require('./models/auditplan');
//let universities = null;
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
    ];
     this.universities = universityDbData.universities;
  
  }

  async cleanDb() {
    await User.remove({});
    await UniversityData.remove({});
    await auditData.remove({});
  }

  pushDataToDb() {
    this.users.forEach(user => {
      const newUser = new User(user);
      newUser.save();
    });

    this.universities.forEach(universityData => {
      const newData = new UniversityData(universityData);
      newData.save();
    });
  }

  async seedDb() {
    await this.cleanDb();
    this.pushDataToDb();
  }
}

module.exports = FakeDb;