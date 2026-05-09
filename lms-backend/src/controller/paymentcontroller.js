import { stripe } from "../config/stripe.js";
import { Course } from "../model/Course.js";
import { Order } from "../model/Order.js";
import { User } from "../model/user.js";
export const createCheckOutSession = async (req, res) => {
  try {
    console.log(req.body,"Hj")
    const { courseId } = req.body;
  console.log("Back   ",courseId)
    if (!courseId) {
      return res.status(400).json({
        message: "Please provide courseId",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course Not Found",
      });
    }

    const alreadypurchased = await Order.findOne({
      user: req.user._id,
      course: courseId,
    });
 console.log(alreadypurchased)
    if (alreadypurchased) {
      return res.status(400).json({
        message: "You already have this course",
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.title,
              ...(course.thumbnail ? { images: [course.thumbnail] } : {}),
            },
            unit_amount: Math.round(course.amount * 100),
          },
          quantity: 1,
        }, 
      ],
      mode: "payment",
      success_url: `http://localhost:5173/purchase?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/cancel`,
      metadata: {
        userId: req.user._id.toString(),
        courseId: courseId.toString(),
        coursePrice: course.amount,
      },
    });
console.log(session.url);
    return res.status(201).json({
      success: true,
      url: session.url,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
console.log(sessionId,"Session id")
    if (!sessionId) {
      return res.status(400).json({
        message: "Session ID not found",
      });
    }

    const existingOrder = await Order.findOne({
      stripeSessionId: sessionId,
    });

    if (existingOrder) {
      return res.status(200).json({
        message: "Order already created",
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const courseId = session.metadata.courseId;
      const userId = session.metadata.userId;

      const newOrder = new Order({
        user: userId,
        course: courseId,
        totalAmount: session.amount_total / 100,
        stripeSessionId: sessionId,
      });

      await newOrder.save();
  
const updatedUser = await User.findByIdAndUpdate(
  userId,
  { $push: { purchasedCourse: courseId } },
  { new: true }
);
const updateCourse = await Course.findByIdAndUpdate(
  courseId,
  {
    $inc: { totalstudent: 1 }
  },
  { new: true }
);
console.log(updateCourse);

console.log(updatedUser);

      return res.status(201).json({
        success: true,
        message: "Payment successful & order created",
        orderid:newOrder._id,
        courseId:courseId
      });
    } else {
      return res.status(400).json({
        message: "Payment not completed",
      });
    }
  } catch (error) {
    console.log(error, "from checkoutSuccess");
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
