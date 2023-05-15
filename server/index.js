const express = require('express')

const cors = require('cors')
const schemas = require('./routes/joischema'); 
const middleware = require('./routes/joimiddleware'); 



const app = express()
app.use(cors())

app.use(express.json())

app.use('/data' , middleware(schemas.dataSchema),require('./routes/filter'))
const PORT= 5000
app.listen(PORT,console.log(`Server is running at Port----> ${PORT}`))