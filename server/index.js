const express = require('express')

const cors = require('cors')
const schemas = require('./routes/joischema'); 
const middleware = require('./routes/joimiddleware'); 



const app = express()
app.use(cors())

app.use(express.json())

app.use('/data', require('./routes/filter.js'));
app.use('/data', require('./routes/searching.js'));
app.use('/data' , middleware(schemas.dataSchema), require('./routes/filtering-condition.js'));
const PORT= 5000
app.listen(PORT,console.log(`Server is running at Port----> ${PORT}`))