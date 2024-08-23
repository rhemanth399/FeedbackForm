import nodemailer from 'nodemailer'
import FeedbackModel from '../models/feedbackModel'
import SuperadminModel from '../models/superModel'

export const sendFeedbackNotification = async (feedbackId)=>{
    const feedback = await FeedbackModel.findById(feedbackId);
    const superadmin = await SuperadminModel.findOne();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rhemanth399@example.com',
          pass: '564378@Rh'
        }
      });

      const mailOptions = {
        from: 'rhemanth399@gmail.com',
        to: superadmin.email,
        subject: 'New Feedback Received',
        text: `A new feedback has been submitted. Feedback ID: ${feedback._id}`
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      })
}

