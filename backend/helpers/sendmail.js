import nodemailer from 'nodemailer';

export const sendMailwithNodemailer = (req, res, emailData) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		requireTLS: true,
		transportMethod: 'SMTP',
		auth: {
			user: process.env.Email,
			pass: process.env.password
		},
		tls: {
			cipher: 'SSLv3'
		}
	});

	return transporter
		.sendMail(emailData)
		.then((info) => {
			return res.json({ message: 'Message sent successfully Follow the Instruction' });
		})
		.catch((error) => {
			console.log(error);
		});
};
