const express = require('express')

const cors = require('cors')

const db =  require('./connection/db')

const app = express()
app.use(cors())

app.use(express.json())

app.use('/data' ,require('./routes/filter'))
const PORT= 5001
app.listen(PORT,console.log(`Server is running at Port----> ${PORT}`))