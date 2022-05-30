const app=require('express')()
const port=require('./startup/config').port

require('./startup/db')()
require('./startup/routes')(app)

app.listen(port,()=>console.log(`Server connected on port ${port} `))