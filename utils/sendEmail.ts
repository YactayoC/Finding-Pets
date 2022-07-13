import { createTransport } from 'nodemailer';

export const sendEmail = async (email: string, fullname: string, token: string | null) => {
  const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: 'Finding Pets',
    to: email,
    subject: 'Check your Finding Pets account',
    text: 'Check your Finding Pets account',
    html: `<p>Hello: ${fullname}, check your Finding Pets account.</p>
            <p>Your account is ready, you only have to check it in the following link: <a href="${process.env.FRONTEND_URL}/auth/confirm/${token}">Check account</a> </p>
            <p>If you didn't create this account, you can ignore this message</p>
        `,
  });
};
