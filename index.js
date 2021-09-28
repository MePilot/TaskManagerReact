const cron = require('node-cron')
const express = require('express')
const app = express()
const port = process.env.PORT
const path = require('path');
const { sendRemindEmail } = require('./emails/account')

app.use(express.json())

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
require('./db/mongoose')

const Task = require('./models/task')
const User = require('./models/user')

app.use(userRouter, taskRouter)

cron.schedule('0 0 12 * * *', async () => {
    const today = new Date()
    let tasks = await Task.find({ remindDate: { $ne: null } });

    tasks.forEach(async (task) => {

        if (task.remindDate.getDate() == today.getDate() && task.remindDate.getMonth() == today.getMonth() && task.remindDate.getFullYear() == today.getFullYear()) {

            let user = await User.findOne({ _id: task.owner });
            sendRemindEmail(user.email, task.name)
        }

    });

});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port, () => {
    console.log('Server is up')
})