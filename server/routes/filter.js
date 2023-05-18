const express = require('express')
const router = express.Router()
const client = require('../connection/db')


router.get('/alldata',async (req,res)=>{
       try {
        
        await client.query("BEGIN");
    
   
     await client.query(`SELECT *,CAST(applicant_iteration_master.dob AS char(10)) AS dob
     FROM applicant_iteration_master
     LEFT JOIN application_status_audit
     ON applicant_iteration_master.id = application_status_audit.user_id LIMIT 20;`,(error,result)=>{
        if(error){
            throw error
        }
        else{
            
            res.status(200).send(result);
        }
     });
        
        await client.query("COMMIT");
       
      } catch (err) {
        console.log(err)
      
        
        res.status(500).send("Error");
      } 

});


// POSITION 
router.get('/getPosition', async (req, res) => {
  try{
    await client.query('BEGIN');
    const queryPosition = `SELECT DISTINCT(LOWER(position)) AS position FROM applicant_iteration_master GROUP BY LOWER(position)`;

    await client.query(queryPosition, (error, result) => {
      if(error)
      {
        console.log(error);
        res.status(500).send(error);
      }
      else
      {
        res.status(200).send(result);
      }
    });

    await client.query('COMMIT');
  }
  catch(err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// CITY
router.get('/getCity', async (req, res) => {
  try{
    const queryCity = `SELECT DISTINCT(LOWER(city)) AS city FROM applicant_iteration_master GROUP BY LOWER(city) WHERE city IS NOT NULL ORDER BY LOWER(city)`;
    await client.query('BEGIN');
    await client.query(queryCity, (error, result) => {
      if(error)
      {
        console.log(error);
        res.status(500).send(error);
      }
      else
      {
        res.status(200).send(result);
      }
    });
    await client.query('COMMIT');

  }
  catch(error){
    console.log(error);
    res.status(500).send(error);
  }
});

// STATE
router.get('/getState', async (req, res) => {
  try{
    const queryState = `SELECT DISTINCT state AS state from applicant_iteration_master GROUP BY state`;
    await client.query('BEGIN');
    await client.query(queryState, (error, result) => {
      if(error)
      {
        console.log(error);
        res.status(500).send(error);
      }
      else
      {
        res.status(200).send(result);
      }
    });
    await client.query('COMMIT');
  }
  catch(error){
    console.log(error);
    res.status(500).send(error);
  }
});

// MAX EXPERIENCE
router.get('/getMaxExperience', async (req, res) => {
  try{
    const queryMaxExperiece = `SELECT MAX(experience) as experience from applicant_iteration_master`;
    await client.query('BEGIN');
    await client.query(queryMaxExperiece, (error, result) => {
      if(error)
      {
        console.log(error);
        res.status(500).send(error);
      }
      else
      {
        res.status(200).send(result);
      }
    });
    await client.query('COMMIT');
  }
  catch(error){
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router