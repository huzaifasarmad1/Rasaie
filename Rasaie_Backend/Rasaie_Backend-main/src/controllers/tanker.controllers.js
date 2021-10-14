const db = require('../config/db');

const codes = require('../utility/error_codes.json');
const tankerController = {};
// uses Postgres

tankerController.getTankers = async (req, res, next) => {
  try {
    const {rows} = await db.query('SELECT * FROM "tanker"');
    console.log('rows', rows);
    res.send(rows);
  } catch (ex) {
    const error = {};
    error.message = 'Issue with DB Query';
    error.stack = ex;
    next(error);
  }
};

tankerController.addTanker = async (req, res, next) => {
  try {
    const orderby = '00000000-0000-0000-0000-000000000000';
    const orderOn = new Date();
    const last_modified_by = '00000000-0000-0000-0000-000000000000';
    const last_modified_on = new Date();
    // const x = `INSERT INTO orders(order_address, customer_contact_number, ordered_on, ordered_by, last_modified_on, last_modified_by, driver_id, tanker_id) VALUES ( $1,$2,$3,$4,$5,$6,$7,$8);`;

    // console.log(x);

    await db.query(
      `INSERT INTO tanker(added_on,added_by,last_modified_on,last_modified_by, owner_id, number) VALUES ($1,$2,$3,$4,$5,$6);`,
      [
        orderOn,
        orderby,
        last_modified_on,
        last_modified_by,
        last_modified_by,
        req.body.number,
      ],
    );

    //  ${req.body.order_address}, ${req.body.customer_contact_number}, ${orderOn}, ${orderby}, ${last_modified_on}, ${last_modified_by}, ${req.body.driver_id}, ${req.body.tanker_id}

    res.send(codes.Successfull);
  } catch (ex) {
    console.log(ex);
    const error = {};
    error.message = 'Issue with DB Query';
    error.stack = ex;
    next(error);
  }
};

tankerController.putTanker = async (req, res, next) => {
  // const state = await getOrder(req.body.id);
  // console.log(state);

  // if (state == 2) {
  // res.send(codes.orderAlreadyAccepted);
  // } else {
  try {
    const orderby = '00000000-0000-0000-0000-000000000000';
    const orderOn = new Date();
    const last_modified_by = '00000000-0000-0000-0000-000000000000';
    const last_modified_on = new Date();

    await db.query(
      `UPDATE public.tanker
        SET last_modified_on=$1, last_modified_by=$2,number=$3
        WHERE id='${req.body.id}';`,
      [last_modified_on, last_modified_by, req.body.number],
    );

    res.send(codes.Successfull);
  } catch (ex) {
    console.log(ex);
    const error = {};
    error.message = 'Issue with DB Query';
    error.stack = ex;
    next(error);
  }
  // }
};

module.exports = tankerController;
