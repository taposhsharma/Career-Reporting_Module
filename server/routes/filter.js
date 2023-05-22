const express = require('express')
const router = express.Router()
const client = require('../connection/db')


router.get('/filterParams', async (req, res) => {
  try {
    console.log("Hello filter params");
    await client.query('BEGIN')
    const queryPosition = `SELECT DISTINCT(position) FROM applicant_iteration_master ORDER BY position`;
    let filParams = []

    await client.query(queryPosition, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      else {
        filParams.push(result.rows)
      }
    });
    const queryCity = `SELECT DISTINCT(city) FROM applicant_iteration_master WHERE city IS NOT NULL ORDER BY city`;
    await client.query(queryCity, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      else {
        filParams.push(result.rows)
      }
    });
    const queryStatus = `SELECT DISTINCT(application_status) FROM applicant_iteration_master ORDER BY application_status`
    await client.query(queryStatus, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      else {
        filParams.push(result.rows)
        return res.status(200).send(filParams);
      }
    });
    await client.query('COMMIT');
  }
  catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
})


// POSITION 
// router.get('/getPosition', async (req, res) => {
//   try {
//     await client.query('BEGIN');
//     const queryPosition = `SELECT DISTINCT(LOWER(position)) AS position FROM applicant_iteration_master GROUP BY LOWER(position)`;

//     await client.query(queryPosition, (error, result) => {
//       if (error) {
//         console.log(error);
//         res.status(500).send(error);
//       }
//       else {
//         res.status(200).send(result);
//       }
//     });

//     await client.query('COMMIT');
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

// CITY
// router.get('/getCity', async (req, res) => {
//   try {
//     const queryCity = `SELECT DISTINCT(LOWER(city)) AS city FROM applicant_iteration_master GROUP BY LOWER(city) WHERE city IS NOT NULL ORDER BY LOWER(city)`;
//     await client.query('BEGIN');
//     await client.query(queryCity, (error, result) => {
//       if (error) {
//         console.log(error);
//         res.status(500).send(error);
//       }
//       else {
//         res.status(200).send(result);
//       }
//     });
//     await client.query('COMMIT');

//   }
//   catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// });

// STATE
// router.get('/getState', async (req, res) => {
//   try {
//     const queryState = `SELECT DISTINCT state AS state from applicant_iteration_master GROUP BY state`;
//     await client.query('BEGIN');
//     await client.query(queryState, (error, result) => {
//       if (error) {
//         console.log(error);
//         res.status(500).send(error);
//       }
//       else {
//         res.status(200).send(result);
//       }
//     });
//     await client.query('COMMIT');
//   }
//   catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// });

// MAX EXPERIENCE
// router.get('/getMaxExperience', async (req, res) => {
//   try {
//     const queryMaxExperiece = `SELECT MAX(experience) as experience from applicant_iteration_master`;
//     await client.query('BEGIN');
//     await client.query(queryMaxExperiece, (error, result) => {
//       if (error) {
//         console.log(error);
//         res.status(500).send(error);
//       }
//       else {
//         res.status(200).send(result);
//       }
//     });
//     await client.query('COMMIT');
//   }
//   catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// });

module.exports = router