import { NextFunction, Request, Response } from 'express';
import { createCheckoutSession, paymentService } from './payment.service';
import Stripe from 'stripe';
import stripe from 'stripe';
import PaymentModel from './payment.model';
import SellKgModel from '../sellKG/sellKG.model';
import UserModel from '../user/user.model';
import catchAsync from '../../utils/catchAsync';
import OrderModel from '../order/order.model';
import mongoose from 'mongoose';
function calculateFullAmount(partialAmount: number, percentage: number) {
  const fullAmount = (partialAmount / percentage) * 100;
  return fullAmount;
}
export const createCheckoutSessionHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { amount, currency } = req.body;

  const metadata = { ...req.body };

  try {
    // console.log("body controller: ===== ",req.body)    
    const session = await createCheckoutSession(amount, currency, metadata);
    res.status(200).json({ success: true, sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const webhookHandler = async (req: Request, res: Response, next: NextFunction) => {
  const sig = req.headers['stripe-signature'] as string;
  // console.log("Controller ======", req.body)
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, signingSecret);


    const dataObject = event.data.object;
    let paymentData;
    if ('metadata' in dataObject) {
      console.log("event is metadata here =😎=>", dataObject.metadata);
    } else {
      console.log("event does not have metadata");
    }


    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      if ('metadata' in dataObject) {


        paymentData = {
          amount: session.amount_total != null ? session.amount_total / 100 : 0,
          currency: session.currency || 'unknown',
          stripeSessionId: session.id || '',
          stripePaymentIntentId: session.payment_intent as string || '',
          status: 'completed',
          senderId: dataObject?.metadata?.senderId,
          travellerId: dataObject?.metadata?.travellerId,
          cobagProfit: dataObject?.metadata?.cobagProfit,
          isTwentyPercent: dataObject?.metadata?.isTwentyPercent,
          isEightyPercent: dataObject?.metadata?.isEightyPercent,
          isSubscriptionPay: dataObject?.metadata?.isSubscriptionPay,
          sellKgId: dataObject?.metadata?.sellKgId,
          stripeEvent: event, // Store as JSON object
        };

        console.log('Saving Payment Data:', paymentData);
      }
      try {
        if ('metadata' in dataObject) {
          // console.log("metadata in dataObject" , dataObject?.metadata)
          if (dataObject?.metadata?.isTwentyPercent === "true") {
            const session = await mongoose.startSession(); // Start a session for the transaction
            const sellKgId = dataObject?.metadata?.sellKgId;
            const senderId = dataObject?.metadata?.senderId;
            console.log("senderId", senderId, "sellKgId", sellKgId);
            // Fetch the user by ID
            const user = await UserModel.findById(senderId);
            const sellPost = await SellKgModel.findById(sellKgId);

            if (user && sellPost) {
              // Start a transaction
              session.startTransaction();
              // Update isTwentyPercent for both UserModel and SellKgModel
              user.isTwentyPercent = true;
              sellPost.isTwentyPercent = true;
              user.sellKgId = sellKgId;

              // Save the updated user and sellPost
              await user.save();
              await sellPost.save();
              const payment = new PaymentModel(paymentData);
              await payment.save();
              console.log('Payment saved successfully:', payment);
              // If any error occurs, rollback the transaction
              await session.abortTransaction();
            } else {
              // If any error occurs, rollback the transaction
              await session.abortTransaction();
              console.error('Transaction failed, rollback initiated');
            }
          }
          if (dataObject?.metadata?.isEightyPercent === "true") {
            const sellKgId = dataObject?.metadata?.sellKgId;
            const senderId = dataObject?.metadata?.senderId;
            const session = await mongoose.startSession(); // Start a session for the transaction
            const user = await UserModel.findById(senderId);
            // Fetch the user by ID
            const sellPost = await SellKgModel.findById(sellKgId);
            if (user && sellPost) {
              // Start a transaction
              session.startTransaction();
              // Update isTwentyPercent for both UserModel and SellKgModel
              sellPost.isEightyPercent = true;
              
              user.sellKgId = sellKgId;
              // Save the updated user and sellPost
              console.log("user.referredBy : ", user.referredBy, user.hasCompletedFirstTransaction)
              if (user.referredBy && !user.hasCompletedFirstTransaction) {
                const referredUser = await UserModel.findById(user.referredBy);
                if (!referredUser) {
                  throw new Error(" User not found");

                }
                console.log("Hit")
                console.log(referredUser)
                user.isTwentyPercent = true;
                user.hasCompletedFirstTransaction = true;
                referredUser.subscription = true;
                await referredUser.save();
              }
              
              
              const payment = new PaymentModel(paymentData);
              const fullAmount = calculateFullAmount(payment.amount, 80);
              await OrderModel.create({ ...paymentData, fullAmount: fullAmount });
              sellPost.isOrderComfirmed = true;
              await user.save();
              await sellPost.save();
              await payment.save();
              console.log('Payment saved successfully:', payment);
              // If everything goes well, commit the transaction
              await session.commitTransaction();
            } else {
              await session.abortTransaction();
              console.error('Transaction failed, rollback initiated');
            }
          }
          if (dataObject?.metadata?.isSubscriptionPay === "true") {
            const userId = dataObject?.metadata?.senderId;
            // Fetch the user by ID
            const user = await UserModel.findById(userId);
            if (user) {
              // Update isTwentyPercent for both UserModel and SellKgModel
              user.isSubscription = true;
              // Save the updated user and sellPost
              await user.save();
              const payment = new PaymentModel(paymentData);
              await payment.save();
              console.log('Payment saved successfully:', payment);
            }
          }
        } else {
          console.log("event does not have metadata");
        }
      } catch (dbError) {
        console.error('Database save error:', dbError);
        res.status(500).json({ error: 'Database save error' });
        return;
      }
    } else {
      console.warn(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    res.status(400).send(`Webhook Error: ${err}`);
  }
};



const getMonthlyData = catchAsync(async (req, res, next) => {
  const result = await paymentService.getMonthlyData();
  if (!result) {
    throw new Error("No Data Found!");
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Monthly Data Found',
    data: result
  })
})

export const paymentController = {
  createCheckoutSessionHandler,
  webhookHandler,
  getMonthlyData,
}
