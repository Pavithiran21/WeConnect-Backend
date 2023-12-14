import nodemailer from 'nodemailer';

export const SendMail = async(email,subject,text,html) =>{

    try{
        const transporter = nodemailer.createTransport({
            host:"sandbox.smtp.mailtrap.io",
            port:2525,
            tls:false,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASSWORD
                
            },
            debug: true
        });

        const mailOptions = {
            from:process.env.EMAIL_USERNAME,
            to: email,
            subject:subject,
            text:text,
            html:html
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ',info.response);
            }
        });
   
    }
    catch(err){
        console.log(err, "Something went wrong");
    }
};

