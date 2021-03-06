import User from "../../../server/api/dao/userDAO";
import dbConst from "./db.json";

exports.setupMongoose = (mongoose) => {
  mongoose.models = {};
  mongoose.createConnection(dbConst.db.test.url);
  mongoose.connection.on("error", () => {});
}

exports.createUserAndAccounts = () => {
  let count = 10;
  let _array = [];

  for (let i = 0; i < count; i++) {

    let transArray = [];
    for (let j = 0; j < i; j++) {
      transArray.push({
        id: i*100 + j,
        //type: {type: String},
        value: i*100 + j,
        date: new Date(),
        ibanSender: 'IBAN'+i,
        ibanReceiver: 'IBAN'+((i+1)%count),
        paymentReference:'Ref U'+i+' T'+j,
        category:'Test'
      });
    }

    let ba = {
      balance: 100+i,
      iban: 'IBAN'+i,
      transactions: transArray
    }

    _array.push({
      username: 'user'+i,
      password: 'password',
      firstName: 'Max'+i,
      lastName: 'Muster'+i,
      phoneNumber: '0123456789'+i,
      bankAccount: ba
    });
  }

  return User.create(_array);
}
