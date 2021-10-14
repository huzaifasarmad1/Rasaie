const db = require('../config/db');

const codes = require('../utility/error_codes.json');
const twilio = require('twilio');
var jwt = require('jsonwebtoken');

const accountSid = '';
const authToken = '';

const client = new twilio(accountSid, authToken);
const usersController = {};
// uses Postgres

usersController.getUsers = async (req, res, next) => {
  // res.send("wow")
  console.log("helllllllllllllo");
  try {
    
    const {rows} = await db.query('SELECT * FROM "users"');
    console.log('rows', rows);
    res.send(rows);
  } catch (ex) {
    const error = {};
    error.message = 'Issue with DB Query';
    error.stack = ex;
    next(error);
  }
};
usersController.getUsersByID = async (req, res, next) => {
  try {
    const {id} = req.query;
    console.log(id);
    const {rows} = await db.query(`SELECT * FROM users WHERE id='${id}'`);
    console.log('rows', rows);
    res.send(rows);
  } catch (ex) {
    const error = {};
    console.log(ex);
    error.message = 'Issue with DB Query';
    error.stack = ex;
    next(error);
  }
}

// usersController.getUsersByNum = async (req, res, next) => {
  
// }
// INSERT INTO public.users(
// id, "firstName", "lastName", "licenseNo", "phoneNo", address, cnic, is_tanker_owner, added_on, added_by, id_deleted, last_modified_on, last_modified_by, status)
// VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

usersController.addUser = async (req, res, next) => {
  try {
    const user = await db.query(
      `SELECT * FROM users WHERE phoneno='${req.body.phoneno}'`,
    );
    if(user.rows.length>0){
      const user_id = user.rows[0].id;
      if(user_id){
        await db.query(
          `UPDATE users
          SET name=$1,  licenseno=$2, address=$3, cnic=$4, is_tanker_owner=$5, added_on=$6, added_by=$7,  last_modified_on=$8, last_modified_by=$9
          WHERE phoneno='${phoneno}';`,
          [
            req.body.name,
            licenseno,
            address,
            cnic,
            req.body.is_tanker_owner,
            orderOn,
            orderby,
            last_modified_on,
            last_modified_by,
          ],
        );
        res.send(codes.Successfull);
      }else{
        const error = {};
        error.message = 'Issue with DB Query';
        error.stack = ex;
        next(error);
      }
    }else{
      const createdby = '00000000-0000-0000-0000-000000000000';
      const createdOn = new Date();
      const last_modified_by = '00000000-0000-0000-0000-000000000000';
      const last_modified_on = new Date();
      await db.query(
        `INSERT INTO users(firstname, lastname,licenseno, phoneno, address, cnic, is_tanker_owner, added_on, added_by, last_modified_on, last_modified_by) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);`,
        [
          req.body.firstname,
          req.body.lastname,
          req.body.licenseno,
          req.body.phoneno,
          req.body.address,
          req.body.cnic,
          req.body.is_tanker_owner,
          createdOn,
          createdby,
          last_modified_on,
          last_modified_by,
        ],
      );
  
      res.send(codes.Successfull);
    }
  } catch (ex) {
    console.log(ex);
    const error = {};
    error.message = 'Issue with DB Query';
    error.stack = ex;
    next(error);
  }
};

usersController.sendText = async (req, res, next) => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  const {recipient} = req.query;
  try {
    console.log('in try')
    const code = Math.floor(Math.random() * 900000) + 100000;
    const message  = await client.messages
      .create({
        body: 'your verification code is    :' + code,
        to: '+92' + recipient,
        from: '',
      });
      console.log('after create')
      postPhoneNo(recipient, code);
      // findNum(recipient);
      console.log(message.body);
      console.log('message.body');
      return res.status(200).send({res: 'Done'});
  } catch (ex) {
    console.log('in catch')
    const error = {};
    error.message = 'Issue with DB Query';
    error.stack = ex;
    console.log(error)
    return error;
  }
};


usersController.sendOrder = async (req, res, next) => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  const recipient = req.body.phoneno;
  try {
    client.messages
      .create({
        body: `New Order has been places by ${req.body.name} Mobile Number:${recipient} at Location:${req.body.location} `,
        to: '+92' + recipient,
        from: '',
      })
      .then((message) => {
        console.log(message.body);
        res.status(200).send({res: 'Done'});
      });
  } catch (ex) {
    const error = {};
    error.message = 'Issue with DB Query';
    error.stack = ex;
    next(error);
  }
};

usersController.validate = async (req, res, next) => {
  const {phoneno, code} = req.query;
  
  try {
    const {rows} = await db.query(
      `SELECT * FROM users WHERE phoneno='${phoneno}'`,
    );
    console.log('rows[0]',rows[0])
    // var token = jwt.sign(JSON.stringify(rows[0]), 'shhhhh');
    // console.log(token);
    const correctCode = rows[0].code;
    if (correctCode == code) {
      res.send({res: 'verified'});
    } else {
      res.send({res: 'not-verified'});
    }
  } catch (ex) {
    console.log('ex',ex);
    const error = {};
    error.message = 'Issue with DB Query';
    error.stack = ex;
    next(error);
  }
};

usersController.putUser = async (req, res, next) => {
  try {
    const orderby = '00000000-0000-0000-0000-000000000000';
    const orderOn = new Date();
    const last_modified_by = '00000000-0000-0000-0000-000000000000';
    const last_modified_on = new Date();
    const cnic = '4845445';
    const licenseno = '48458445';
    const address = '4845445';
    // const is_tanker_owner = 1;
    const phoneno = req.body.phoneno;
    console.log(phoneno);

    await db.query(
      `UPDATE users
      SET name=$1,  licenseno=$2, address=$3, cnic=$4, is_tanker_owner=$5, added_on=$6, added_by=$7,  last_modified_on=$8, last_modified_by=$9
      WHERE phoneno='${phoneno}';`,
      [
        req.body.name,
        licenseno,
        address,
        cnic,
        req.body.is_tanker_owner,
        orderOn,
        orderby,
        last_modified_on,
        last_modified_by,
      ],
    );

    
    const {rows} = await db.query(
      `SELECT * FROM users WHERE phoneno='${phoneno}'`,
    );
    console.log('rows[0]',rows[0])
    var token = jwt.sign(JSON.stringify(rows[0]), 'shhhhh');
    console.log(token);

    res.send({status:200,token:token});
  } catch (ex) {
    console.log(ex);
    const error = {};
    error.message = 'Issue with DB Query';
    error.stack = ex;
    next(error);
  }
};

const postPhoneNo = async (phoneno, code) => {
  // let fold = await getFold();
  const boo= await findNum(phoneno);
  if(boo==0){
    console.log(phoneno);
  try {
    console.log('abd');
    await db.query(
      `UPDATE users
      SET code=$1
      WHERE phoneno='${phoneno}';`,
      [
        code
      ],
    );
    return 0;
    // res.send(codes.Successfull);
  } catch (ex) {
    console.log(ex);
  }
  }
  else{
    console.log(phoneno);
  try {
    console.log('update');
    await db.query(`INSERT INTO users(phoneno,code) VALUES ($1,$2);`, [
      phoneno,
      code,
    ]);
  } catch (ex) {
    console.log(ex);
  }
  }  
};


const findNum = async (num) => {
  // let fold = await getFold();
  try {
    console.log(num);
    const {rows} = await db.query(`SELECT * FROM users WHERE phoneno='${num}'`);
    
    console.log('rows', rows);
    console.log("bawa g sialkot")
    console.log(rows[0]);
    if (typeof rows[0] !== 'undefined'){
      console.log(0);
      return 0;
    }
    else{
      console.log(1);
      return 1;
    }
    
  } catch (ex) {
    const error = {};
    console.log(ex);
    // error.message = 'Issue with DB Query';
    error.stack = ex;
    // next(error);
    return "error";
  }
};

// function getFold() {
//   console.log(20);

// }

module.exports = usersController;
