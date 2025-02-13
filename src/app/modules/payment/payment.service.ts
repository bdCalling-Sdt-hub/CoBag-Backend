import Stripe from 'stripe';
import PaymentModel from './payment.model';
import { startOfMonth, endOfDay } from 'date-fns';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' });

export const createCheckoutSession = async (amount: number, currency: string, metadata: any) => {
  console.log("meta Data for service file ==>" ,metadata);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency,
          product_data: { name: 'Sample Product' },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    metadata,
    success_url: `${process.env.BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/payment/cancel`,
  });
  return session;
};

const getMonthlyData = async () => {
  const now = new Date();

  // Get first and last date of the current month
  const startOfMonthDate = startOfMonth(now);
  const today = endOfDay(now);

  // Get first and last date of the previous month
  const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const startOfPrevMonthDate = startOfMonth(previousMonth);
  const endOfPrevMonthDate = endOfDay(new Date(now.getFullYear(), now.getMonth(), 0));

  // Fetch current month transactions
  const currentMonthData = await PaymentModel.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfMonthDate, $lte: today },
        status: 'completed',
      },
    },
    {
      $group: {
        _id: null,
        thisMonthTotal: { $sum: '$amount' },
        cobagProfit: { $sum: '$cobagProfit' },
      },
    },
  ]);

  // Fetch previous month transactions
  const previousMonthData = await PaymentModel.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfPrevMonthDate, $lte: endOfPrevMonthDate },
        status: 'completed',
      },
    },
    {
      $group: {
        _id: null,
        lastMonthTotal: { $sum: '$amount' },
        lastMonthProfit: { $sum: '$cobagProfit' },
      },
    },
  ]);

  // Extract values safely
  const thisMonthTotal: number = currentMonthData.length > 0 ? currentMonthData[0].thisMonthTotal : 0;
  const cobagProfit: number = currentMonthData.length > 0 ? currentMonthData[0].cobagProfit : 0;
  const lastMonthTotal: number = previousMonthData.length > 0 ? previousMonthData[0].lastMonthTotal : 0;
  const lastMonthProfit: number = previousMonthData.length > 0 ? previousMonthData[0].lastMonthProfit : 0;

  // Calculate percentage change
  let totalTrendNumber: number = lastMonthTotal > 0 ? ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100 : 0;
  let profitTrendNumber: number = lastMonthProfit > 0 ? ((cobagProfit - lastMonthProfit) / lastMonthProfit) * 100 : 0;

  // Convert to percentage string
  const totalTrend = totalTrendNumber > 0 ? `+${totalTrendNumber.toFixed(2)}%` : `${totalTrendNumber.toFixed(2)}%`;
  const profitTrend = profitTrendNumber > 0 ? `+${profitTrendNumber.toFixed(2)}%` : `${profitTrendNumber.toFixed(2)}%`;

  return {
    month: now.toLocaleString('default', { month: 'long' }),
    year: now.getFullYear(),
    thisMonthTotal,
    lastMonthTotal,
    totalTrend, // Percentage change for total revenue
    cobagProfit,
    lastMonthProfit,
    profitTrend, // Percentage change for profit
  };
};

export const paymentService = {
  getMonthlyData
}
