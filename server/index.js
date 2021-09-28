
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path');
const {sendRemindEmail} = require('./emails/account')

console.log('AAAAAAAAAAAAAAAAAAAA : '+ path.resolve(process.cwd(),'client','build','index.html'))

app.use(express.json())
//app.use(express.static(path.join(__dirname, 'client/build')));

if(process.env.NODE_ENV === 'production') {  
    app.use(path.resolve(process.cwd(),'client','build'));    

app.get('*', (req, res) => {
        res.sendFile(path.resolve(process.cwd(),'client','build','index.html'));  
    })
    }

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
require('./db/mongoose')

const Task = require('./models/task')
const User = require('./models/user')

app.use(userRouter,taskRouter)

app.listen(port, ()=> {
    console.log('Server is up')
})