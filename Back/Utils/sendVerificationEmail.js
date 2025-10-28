import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

export const sendAccountVerificationEmail = async(to,verificationToken)=>{
    try {
        
        const transport = nodeMailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:{
                user:process.env.GMAIL_USER,
                pass:process.env.APP_PASS
            }
        });

        const message = {
            to,
            subject:"Account Verification Mail",
            html:`<div style="margin: 0; padding: 0; background-color: #f6f6f6; font-family: Arial, sans-serif;">

  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f6f6f6; padding: 40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td>
              <h2 style="margin-top: 0; font-size: 24px; color: #333333;">Password Reset Request</h2>
              <p style="font-size: 16px; color: #555555;">Hello,</p>
              <p style="font-size: 16px; color: #555555;">We received a request to reset your password. Click the button below to choose a new password:</p>

              <p>
                <a href=http://localhost:5173/reset-password?token=${verificationToken}
                   style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px;">
                  Verify Yourself
                </a>
              </p>

              <p style="font-size: 14px; color: #888888;">If you alreday Verfied eset, you can safely ignore this email.</p>

              <p style="font-size: 16px; color: #555555;">Thanks,<br>The Your Company Team</p>

              <p style="font-size: 12px; color: #cccccc; text-align: center; margin-top: 40px;">
                © 2025 Your Company. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</div>`
}
    const info = await transport.sendMail(message);
    console.log("Email Send",info.messageId);
    } 
    catch (err) {
      throw new Error(err)
    }
} 