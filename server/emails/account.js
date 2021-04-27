const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API)

const sendWelcomeEmail = (email, name)=> {
    sgMail.send(
        {to:email,
        from: 'nebra2012@gmail.com',
        subject: 'Welcome to Task Manager!', 
        text: `${name}, thanks for joining the Task Manager website`})
}

const sendFarewellEmail = (email, name)=> {
    sgMail.send(
        {to:email,
        from: 'nebra2012@gmail.com',
        subject: 'Before you go (Task Manager)!', 
        text: `${name}, why are you leaving?`})
}

const sendRemindEmail = (email, text)=> {
    sgMail.send(
        {to:email,
        from: 'nebra2012@gmail.com',
        subject: 'A notification from Task Manager!', 
        text: `This is a reminder letter about the following task: ${text}`})
}

module.exports = {sendWelcomeEmail,sendFarewellEmail,sendRemindEmail}