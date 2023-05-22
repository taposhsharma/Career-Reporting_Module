const express = require('express');
const router = express.Router();
const client = require('../connection/db.js');

// sort
router.post('/sort', async (req, res) => {
    try{
      
      const {heading, order} = req.body;
      let column = heading
      if(heading == "Relevant Experience"){
        column = "relevant_experience"
      }
      else if(heading == "Location"){
        column = "city"
      }
      else if(heading == "Application Status"){
        column = "application_status"
      }
      else if(heading == "Mobile"){
        column = "mobile_no"
      }
      else if(heading == "DOB"){
        column = "applicant_iteration_master.dob"
      }
      else if(heading == "Name"){
        column = "first_name, last_name"
      }
      const query = `SELECT *,CAST(dob AS char(10)) AS dob FROM applicant_iteration_master ORDER BY ${column} ${order}`;
      console.log("qqqq",query);
      await client.query(query, (error, result) => {
        if(error)
        {
          console.log(error);
          res.status(500).send(error);
        }
        else
        {   
          res.status(200).send(result.rows);
        }
      })
  
    }
    catch(error){
      console.log(error);
      res.status(500).send(error);
    }
  
  
  });

  module.exports = router;