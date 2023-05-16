const express = require('express')
const router = express.Router()
const client = require('../connection/db')


router.get('/alldata',async (req,res)=>{
       try {
        
        await client.query("BEGIN");
    
   
     await client.query(`SELECT *,CAST(applicant_iteration_master.dob AS char(10)) AS dob
     FROM applicant_iteration_master
     LEFT JOIN application_status_audit
     ON applicant_iteration_master.id = application_status_audit.user_id LIMIT 10;`,(error,result)=>{
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
})

module.exports = router