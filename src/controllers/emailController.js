const nodemailer = require('nodemailer');

const sendEmail = async (req, res) =>{
    const {to, subject, text, html} = req.body;

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP.SECURE == 'true',
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try{
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject,
            text,
            html
        });

        res.status(200).json({message:'Email sent!'})
    }catch(error){
        console.log(error);
        res.status(500).json({message:'Error seding email'})
    }
};

module.exports = {sendEmail};