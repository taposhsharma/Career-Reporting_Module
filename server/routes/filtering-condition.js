const express = require('express');
const router = express.Router();
const client = require('../connection/db.js');

//filter data with data validation
router.post("/filterData" , async (req,res )=>{
    const data = req.body
   
  
    function generateQuery(tableName,conditionsObject){
      let query = `SELECT * FROM ${tableName} `;
  
      if(conditionsObject && Object.keys(conditionsObject).length>0){
        query += ' WHERE ';
        const condition = [];
  
      for (const key in conditionsObject) {
        const value = conditionsObject[key];
  
        if (value.operator=== "IN") {
          condition.push(`${value.column} ${value.operator} (${value.params.map(val => `'${val}'`).join(', ')})`);
        } 
        else if(value.operator === "BETWEEN"){
          console.log("hello between")
          if(value.column==="experience"){
            condition.push(`(date_part ('years', age(current_date, "createdAt"))) + ${value.column} ${value.operator} ${value.min} AND ${value.max}`)
          }
          if(value.column==="dob"){
            condition.push(`date_part('years', age(current_date, dob) ${value.operator} ${value.min} AND ${value.max}`)
          }
          
        }
      }
      query += condition.join(' AND ');
      }
      return query;
    }
    const selectQuery = generateQuery("applicant_iteration_master",data)
    console.log(selectQuery)
    
  
  
  });
  module.exports = router;