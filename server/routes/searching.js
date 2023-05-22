const express = require('express');
const router = express.Router();
const client = require('../connection/db.js');

// searchedText
router.post('/search', async (req, res) => {
    try{
      console.log(req.body);
      const searchedText = req.body[0];
    //   console.log(searchedText);
      const query = `SELECT *,CAST(dob AS char(10)) AS datebirth, (date_part ('years', age(current_date, "createdAt")) + COALESCE(experience, 0))
      as curr_experience, (date_part ('years', age(current_date, "createdAt")) + COALESCE(relevant_experience, 0))
       as curr_relevant_experience FROM applicant_iteration_master 
      WHERE first_name LIKE '%${searchedText}%' OR last_name LIKE '%${searchedText}%' OR email LIKE '%${searchedText}%'`;
      console.log(query);
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