const express = require('express');
const router = express.Router();
const client = require('../connection/db.js');

//filter data with data validation
router.post("/filterData", async (req, res) => {
  const data = req.body;
  const limit = req.query.limit
  const offset = (req.query.page - 1) * limit
  const sortCol = req.query.sortCol
  const order = req.query.order
  console.log(limit, offset);
  console.log(data);


  function generateQuery(tableName, conditionsObject) {
    let query = `SELECT *,CAST(dob AS char(10)) AS datebirth FROM ${tableName} `;
    if (conditionsObject && Object.keys(conditionsObject).length > 0) {
      query += ' WHERE ';
      const condition = [];

      for (const key in conditionsObject) {
        const value = conditionsObject[key];

        if (value.params.length == 0) // filter not provided for a given case.
          continue;
        if (value.operator === "IN") {
          condition.push(`${value.column} ${value.operator} (${value.params.map(val => `'${val}'`).join(', ')})`);
        }
        else if (value.operator === "BETWEEN") {
          console.log("hello between")
          if (value.column === "experience") {
            condition.push(`(date_part ('years', age(current_date, "createdAt"))) + coalesce(${value.column}, 0) ${value.operator} ${value.params.min} AND ${value.params.max}`)
          }
          if (value.column === "dob") {
            condition.push(`date_part('years', age(current_date, dob)) ${value.operator} ${value.params.min} AND ${value.params.max}`);
          }

        }
      }

      query += condition.join(' AND ');
    }
    return query;
  }
  let selectQuery = generateQuery("applicant_iteration_master", data)
  let sortQuery = ` ORDER BY ${sortCol} ${order}`;
  if(sortCol == 'first_name, last_name')
  {
    sortQuery = `ORDER BY first_name ${order}, last_name ${order}`;
  }
  else if(sortCol == 'experience' || sortCol == 'relevant_experience')
  {
    sortQuery = `ORDER BY (date_part('years', age(current_date, "createdAt")) + COALESCE(${sortCol}, 0)) ${order}`;
  }
  if(sortCol && order){
    selectQuery += sortQuery
  }
  let pagingQuery = ` LIMIT ${limit} OFFSET ${offset}`
  selectQuery += pagingQuery
  console.log(selectQuery)
  client.query(selectQuery, (error, result) => {
    if (error) {
      console.log(error);
      res.status(403).send(error);
    }
    else {
      res.status(200).send(result.rows);
    }
  })


});
module.exports = router;