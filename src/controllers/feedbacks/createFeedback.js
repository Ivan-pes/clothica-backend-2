import { Feedback } from '../../models/feedback.js';

export const createFeedback = async (req, res, next) => {
  try {
    const { author, description, rate, category, date, productId } = req.body;

    const newFeedback = await Feedback.create({
      author,
      description,
      rate,
      category,
      date,
      productId,
    });

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        feedback: newFeedback,
      },
    });
  } catch (error) {
    next(error);
  }
};