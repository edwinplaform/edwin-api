import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
    },
});

const getEmailTemplate = (templateType, data) => {
    switch (templateType) {
        case "OTP":
            return {
                subject: "Your EDWin Verification Code",
                html: `
                    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">

                        <table role="presentation" id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
                        <tbody>
                        <tr style="vertical-align: top">
                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
  
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      
                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="background-color: #e9e9e9;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  
                        <table id="u_content_heading_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 30px;font-family:arial,helvetica,sans-serif;" align="left">       
                        <h1 class="v-font-size" style="margin: 0px; color: #3aaee0; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 28px; font-weight: 400;"><span><strong>Your EdWin verification code</strong></span></h1>

                        </td>
                        </tr>
                        </tbody>
                        </table>

                        </div>
                        </div>
                        </div>

                        </div>
                        </div>
                        </div>
  
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      
                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="background-color: #ffffff;height: 100%;width: 100% !important;">
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
  
                        <table id="u_content_heading_2" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
                         <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 25px; font-weight: 400;"><span>Your One Time Password (OTP) for verification.</span></h1>

                        </td>
                        </tr>
                        </tbody>
                        </table>
                        <table id="u_content_heading_2" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
                        <h1 class="otp_heading" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 25px; font-weight: 400;"><span><strong>${data.otp}</strong></span></h1>
                        </td>
                        </tr>
                        </tbody>
                        </table>

                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
                        <table role="presentation" height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="19%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 5px solid #3aaee0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                        <tr style="vertical-align: top">
                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <span>&#160;</span>
                        </td>
                        </tr>
                        </tbody>
                        </table>

                        </td>
                        </tr>
                        </tbody>
                        </table>

                        <table id="u_content_text_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px;font-family:arial,helvetica,sans-serif;" align="left">
        
                        <div class="v-font-size" style="font-size: 14px; color: #616161; line-height: 140%; text-align: center; word-wrap: break-word;">
                        <p style="line-height: 140%; margin: 0px;">"Welcome to Edwin, your gateway to personalized online learning! We offer a wide array of subjects and a team of dedicated tutors to help you master any topic. To make the most of your experience, please take a moment to explore our platform and familiarize yourself with our features. If you have any questions, our support team is always ready to assist you."</p>
                        </div>

                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
    
                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  
                        <table id="u_content_text_3" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 80px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
                        <div class="v-font-size" style="font-size: 14px; color: #5b5b5b; line-height: 160%; text-align: center; word-wrap: break-word;">
                        <p style="font-size: 14px; line-height: 160%; margin: 0px;">if you have any questions, please email us at</p>
                        <div>
                        <div><a rel="noopener" href="mailto:info.learn.edwin@gmail.com" target="_blank">info.learn.edwin@gmail.com</a> .</div>
                        </div>
                        </div>

                        </td>
                        </tr>
                        </tbody>
                        </table>

                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 0px;font-family:arial,helvetica,sans-serif;" align="left">
        
                        <table role="presentation" height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                        <tr style="vertical-align: top">
                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <span>&#160;</span>
                        </td>
                        </tr>
                        </tbody>
                        </table>

                        </td>
                        </tr>
                        </tbody>
                        </table>

                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 40px;font-family:arial,helvetica,sans-serif;" align="left">
                        <div class="v-font-size" style="font-size: 14px; color: #5b5b5b; line-height: 160%; text-align: center; word-wrap: break-word;">
                        <p style="font-size: 14px; line-height: 160%; margin: 0px;">you have received this email as a registered user of EDWin educational platform.</p>
                        <p style="font-size: 14px; line-height: 160%; margin: 0px;">&nbsp;</p>
                        <p style="font-size: 14px; line-height: 160%; margin: 0px;">&nbsp;All rights reserved</p>
                        </div>

                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
 
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </body>
                `
            };
        case "BOOKING_CONFIRMATION":
            return {
                subject: "Session Booking Confirmation",
                html: `
                    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
                        <table role="presentation" id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
                        <tbody>
                        <tr style="vertical-align: top">
                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">

                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="background-color: #e9e9e9;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">

  
                        <table id="u_content_heading_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 30px;font-family:arial,helvetica,sans-serif;" align="left">
                        <h1 class="v-font-size" style="margin: 0px; color: #3aaee0; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 28px; font-weight: 400;"><span><strong>Booking Confirmed.</strong></span></h1>

                        </td>
                        </tr>
                        </tbody>
                        </table>

                        </div>
                        </div>

                        </div>
                        </div>
                        </div>

                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">

                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="background-color: #ffffff;height: 100%;width: 100% !important;">
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <table id="u_content_text_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px;font-family:arial,helvetica,sans-serif;" align="left">
        
                        <div class="v-font-size" style="font-size: 20px; color: #8a8a8a; line-height: 140%; text-align: left; word-wrap: break-word;">
                        <p style="line-height: 140%; margin: 0px;">Dear ${data.studentName} ,</p> 
                        </div>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        <table id="u_content_heading_2" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">

                        <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 25px; font-weight: 400;"><span>Requested session Confirmed by the tutor.</span></h1>
                        </td>
                        </tr>
                        </tbody>
                        </table>

                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

                        <table role="presentation" height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="19%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 5px solid #3aaee0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                        <tr style="vertical-align: top">
                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <span>&#160;</span>
                        </td>
                        </tr>
                        </tbody>
                        </table>

                        </td>
                        </tr>
                        </tbody>
                        </table>
                        <table id="u_content_text_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px;font-family:arial,helvetica,sans-serif;" align="left">
  
                        <div class="v-font-size" style="font-size: 14px; color: #000000; line-height: 140%; text-align: center; word-wrap: break-word;">
                        <p style="line-height: 140%; margin: 0px;"><strong>Date:</strong> ${data.date}</p>
                        <p style="line-height: 140%; margin: 0px;"><strong>Time:</strong> ${data.time}</p>
                        </div>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        <table id="u_content_text_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px;font-family:arial,helvetica,sans-serif;" align="left">

                        <div class="v-font-size" style="font-size: 14px; color: #616161; line-height: 140%; text-align: center; word-wrap: break-word;">
                        <p style="line-height: 140%; margin: 0px;">${data.tutorName} has approved your booking. Now you can engage with the tutor through the EDWin. Please follow edwin policies and instructions while using the platform.</p>
                        </div>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">

                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">

                        <table id="u_content_text_3" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 80px 10px;font-family:arial,helvetica,sans-serif;" align="left">

                        <div class="v-font-size" style="font-size: 14px; color: #5b5b5b; line-height: 160%; text-align: center; word-wrap: break-word;">
                        <div>
                        <div>if you have any questions, please email us at</div>
                        </div>
                        <p style="font-size: 14px; line-height: 160%; margin: 0px;"><a rel="noopener" href="mailto:info.learn.edwin@gmail.com" target="_blank">info.learn.edwin@gmail.com</a> .</p>
                        </div>

                        </td>
                        </tr>
                        </tbody>
                        </table>

                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 0px;font-family:arial,helvetica,sans-serif;" align="left">

                        <table role="presentation" height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                        <tr style="vertical-align: top">
                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <span>&#160;</span>
                        </td>
                        </tr>
                        </tbody>
                        </table>

                        </td>
                        </tr>
                        </tbody>
                        </table>

                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 40px;font-family:arial,helvetica,sans-serif;" align="left">

                        <div class="v-font-size" style="font-size: 14px; color: #5b5b5b; line-height: 160%; text-align: center; word-wrap: break-word;">
                        <div>
                        <div>you have received this email as a registered user of EDWin educational platform.<br /><br />
                        <div>
                        <div>All rights reserved.</div>
                        </div>
                        </div>
                        </div>
                        </div>

                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>

                        </td>
                        </tr>
                        </tbody>
                        </table>
                    </body>
        `,
            };
        case "TUTOR_ACCOUNT_APPROVAL":
            return {
                subject: "Tutor Account Verification",
                html: `

                    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
                        <table role="presentation" id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
                        <tbody>
                        <tr style="vertical-align: top">
                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="background-color: #e9e9e9;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  
                        <table id="u_content_heading_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 30px;font-family:arial,helvetica,sans-serif;" align="left">
                        <h1 class="v-font-size" style="margin: 0px; color: #3aaee0; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 28px; font-weight: 400;"><span><strong>Welcome to our tutor community.</strong></span></h1>

                        </td>
                        </tr>
                        </tbody>
                        </table>

                        </div>
                        </div>

                        </div>
                        </div>
                        </div>
  
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
     
                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="background-color: #ffffff;height: 100%;width: 100% !important;">
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
  
                        <table id="u_content_heading_2" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
                        <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 25px; font-weight: 400;"><span>Your request to be a tutor in EDWin was approved by the administration.</span></h1>
                        </td>
                        </tr>
                        </tbody>
                        </table>

                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
                        <table role="presentation" height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="19%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 5px solid #3aaee0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                        <tr style="vertical-align: top">
                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <span>&#160;</span>
                        </td>
                        </tr>
                        </tbody>
                        </table>

                        </td>
                        </tr>
                        </tbody>
                        </table>
                        <table id="u_content_heading_2" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
                        <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 25px; font-weight: 400;"><span><p>Dear, ${data.name}</p></span></h1>
                        </td>
                        </tr>
                        </tbody>
                        </table>

                        <table id="u_content_text_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px;font-family:arial,helvetica,sans-serif;" align="left">
        
                        <div class="v-font-size" style="font-size: 14px; color: #616161; line-height: 140%; text-align: center; word-wrap: break-word;">
                        <p style="line-height: 140%; margin: 0px;">Now your tutor profile is visible to everyone on EDWin. Anyone interested in learning from you can request classes. Please be vigilant, and stay alert on student requests, follow platform guidelines. We wish you the best of luck in your online tutor journey!</p>
                        </div>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      
                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  
                        <table id="u_content_text_3" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 80px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
                        <div class="v-font-size" style="font-size: 14px; color: #5b5b5b; line-height: 160%; text-align: center; word-wrap: break-word;">
                        <div>
                        <div>if you have any questions, please email us at</div>
                        </div>
                        <p style="font-size: 14px; line-height: 160%; margin: 0px;"><a rel="noopener" href="mailto:info.learn.edwin@gmail.com" target="_blank">info.learn.edwin@gmail.com</a> .</p>
                        </div>

                        </td>
                        </tr>
                        </tbody>
                        </table>

                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 0px;font-family:arial,helvetica,sans-serif;" align="left">
        
                        <table role="presentation" height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                        <tr style="vertical-align: top">
                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <span>&#160;</span>
                        </td>
                        </tr>
                        </tbody>
                        </table>

                        </td>
                        </tr>
                        </tbody>
                        </table>

                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 40px;font-family:arial,helvetica,sans-serif;" align="left">
        
                        <div class="v-font-size" style="font-size: 14px; color: #5b5b5b; line-height: 160%; text-align: center; word-wrap: break-word;">
                        <div>
                        <div>you have received this email as a registered user of EDWin educational platform.<br /><br />
                        <div>
                        <div>All rights reserved.</div>
                        </div>
                        </div>
                        </div>
                        </div>

                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
  
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </body>
            `,
            };
        case "ZOOM_LINK":
            return {
                subject: "Your Zoom Session Link",
                html: `
                    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
                        <table role="presentation" id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
                        <tbody>
                        <tr style="vertical-align: top">
                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">

                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="background-color: #e9e9e9;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">

  
                        <table id="u_content_heading_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 30px;font-family:arial,helvetica,sans-serif;" align="left">
                        <h1 class="v-font-size" style="margin: 0px; color: #3aaee0; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 28px; font-weight: 400;"><span><strong>Link for the next session</strong></span></h1>

                        </td>
                        </tr>
                        </tbody>
                        </table>

                        </div>
                        </div>

                        </div>
                        </div>
                        </div>

                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">

                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="background-color: #ffffff;height: 100%;width: 100% !important;">
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                        <table id="u_content_text_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px;font-family:arial,helvetica,sans-serif;" align="left">
        
                        <div class="v-font-size" style="font-size: 20px; color: #8a8a8a; line-height: 140%; text-align: left; word-wrap: break-word;">
                        <p style="line-height: 140%; margin: 0px;">Dear ${data.studentName} ,</p> 
                        </div>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        <table id="u_content_heading_2" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">

                        <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 25px; font-weight: 400;"><span>Use the link to join the session</span></h1>
                        </td>
                        </tr>
                        </tbody>
                        </table>

                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

                        <table role="presentation" height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="19%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 5px solid #3aaee0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                        <tr style="vertical-align: top">
                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <span>&#160;</span>
                        </td>
                        </tr>
                        </tbody>
                        </table>

                        </td>
                        </tr>
                        </tbody>
                        </table>
                        <table id="u_content_text_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px;font-family:arial,helvetica,sans-serif;" align="left">
  
                        <div class="v-font-size" style="font-size: 14px; color: #000000; line-height: 140%; text-align: center; word-wrap: break-word;">
                        <p style="line-height: 140%; margin: 0px;">${data.tutorName} scheduled a new session. Please use provided link in below to join to the classroom.</p>
                        </div>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        <table id="u_content_text_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px;font-family:arial,helvetica,sans-serif;" align="left">
  
                        <div class="v-font-size" style="font-size: 14px; color: #000000; line-height: 140%; text-align: center; word-wrap: break-word;">
                        <p style="line-height: 140%; margin: 0px;"><strong>Date:</strong> ${data.date}</p>
                        <p style="line-height: 140%; margin: 0px;"><strong>Time:</strong> ${data.time}</p>
                        </div>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        <table id="u_content_text_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px;font-family:arial,helvetica,sans-serif;" align="left">

                        <div class="v-font-size" style="font-size: 14px; color: #616161; line-height: 140%; text-align: center; word-wrap: break-word;">
                        <p style="line-height: 140%; margin: 0px;"><p><a href="${data.zoomLink}" target="_blank">Join Zoom Meeting</a></p></p>
                        </div>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">

                        <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                        <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">

                        <table id="u_content_text_3" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 80px 10px;font-family:arial,helvetica,sans-serif;" align="left">

                        <div class="v-font-size" style="font-size: 14px; color: #5b5b5b; line-height: 160%; text-align: center; word-wrap: break-word;">
                        <div>
                        <div>if you have any questions, please email us at</div>
                        </div>
                        <p style="font-size: 14px; line-height: 160%; margin: 0px;"><a rel="noopener" href="mailto:info.learn.edwin@gmail.com" target="_blank">info.learn.edwin@gmail.com</a> .</p>
                        </div>

                        </td>
                        </tr>
                        </tbody>
                        </table>

                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 0px;font-family:arial,helvetica,sans-serif;" align="left">

                        <table role="presentation" height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <tbody>
                        <tr style="vertical-align: top">
                        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                        <span>&#160;</span>
                        </td>
                        </tr>
                        </tbody>
                        </table>

                        </td>
                        </tr>
                        </tbody>
                        </table>

                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                        <tr>
                        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 40px;font-family:arial,helvetica,sans-serif;" align="left">

                        <div class="v-font-size" style="font-size: 14px; color: #5b5b5b; line-height: 160%; text-align: center; word-wrap: break-word;">
                        <div>
                        <div>you have received this email as a registered user of EDWin educational platform.<br /><br />
                        <div>
                        <div>All rights reserved.</div>
                        </div>
                        </div>
                        </div>
                        </div>

                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>

                        </td>
                        </tr>
                        </tbody>
                        </table>
                    </body>
                    
        `,
            };
        default:
            return {
                subject: "EDWin Notification",
                html: `<p>Hello,</p><p>${data.message}</p><p>Thank you, <br/>EDWin Team</p>`,
            };
    }
};

export const sendEmail = async (email, templateType, data) => {
    const {subject, html} = getEmailTemplate(templateType, data);

    const mailOptions = {
        from: `"EDWin" <${process.env.GMAIL}>`,
        to: email,
        subject,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email send successfully to ${email}`);
    } catch (err) {
        console.error("Error sending email: ", err);
    }
};
