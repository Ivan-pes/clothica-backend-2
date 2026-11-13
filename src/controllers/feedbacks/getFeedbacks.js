import { Feedback } from '../../models/feedback.js';

export const getFeedbacks = async (req, res, next) => {
    try {
        const feedbacks = await Feedback.find()
            .sort({ date: -1 })
            .limit(10)
            .populate('productId', 'name');
        
        res.status(200).json({
            status: 200,
            message: 'Successfully retrieved feedbacks',
            data: feedbacks,
        });
    } catch (error) {
        next(error);
    }
};