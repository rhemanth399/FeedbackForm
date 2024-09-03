import cron from 'node-cron';
import FeedbackModel from '../models/feedbackModel.js'

// Schedule the cron job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    // Find feedback tasks that were assigned exactly 24 hours ago and are still "assigned"
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const feedbacksToUpdate = await FeedbackModel.updateMany(
      { 
        status: 'assigned',
        assignedDate: { $lte: oneDayAgo }
      },
      { status: 'pending' }
    );

    console.log(`${feedbacksToUpdate.modifiedCount} feedbacks have been updated to pending status`);
  } catch (error) {
    console.error('Error updating feedback status:', error);
  }
});

export default cron;