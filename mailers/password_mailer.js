const nodeMailer=require('../config/nodemailer');

exports.newPassword= (password)=>{
    console.log('inside comment mailer');

    nodeMailer.transporter.sendMail({
        from: 'r.chepuri555@gmail.com',
        to: password.user.email,
        subject: "New password publichsed",
        html: '<h1>Your password</h1>'
    },(err, info)=>{
        if(err){
            console.log('Error in sending mamil');
            return;
        }

        console.log("mail delivered", info);
        return;
    });
}