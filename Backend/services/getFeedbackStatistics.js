import FeedbackModel from '../models/feedbackModel.js';

export const getFeedbackStatistics = async () => {
  try {
    const totalCount = await FeedbackModel.countDocuments();
    const assignedCount = await FeedbackModel.countDocuments({ status: 'assigned' });
    const pendingCount = await FeedbackModel.countDocuments({ status: 'pending' });
    const resolvedCount = await FeedbackModel.countDocuments({ status: 'resolved' });

    return {
      totalCount,
      assignedCount,
      pendingCount,
      resolvedCount
    };
  } catch (error) {
    console.error('Error fetching feedback statistics:', error);
    throw error;
  }
};
