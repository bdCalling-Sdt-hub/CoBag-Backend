/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import path from 'path';
import Stripe from 'stripe';
import { stripe } from './app/modules/payment/stripe';
const app: Application = express();


//parsers
app.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ): void => {
      if (req.originalUrl === '/payment/webhook/stripe') {
        next();
      } else {
        express.json()(req, res, next);
      }
    }
  );
// app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.post(
    '/payment/webhook/stripe',
    // Stripe requires the raw body to construct the event
    express.raw({type: 'application/json'}),
    (req: express.Request, res: express.Response): void => {
        const sig = req.headers['stripe-signature'] as string;
        const signingSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
      let event: Stripe.Event;
  
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, signingSecret);

        if (event.type === 'checkout.session.completed') {

            console.log(`Save data in databass: ${event.type}`);

            console.log(`Save data in databass: ${JSON.stringify(event)}`);
    
    
        //     const stripeObject: Stripe.PaymentIntent = event.data
        //       .object as Stripe.PaymentIntent;
        //     console.log(`💰 PaymentIntent status: ${stripeObject.status}`);
        //   } else if (event.type === 'charge.succeeded') {
        //     const charge = event.data.object as Stripe.Charge;
        //     console.log(`💵 Charge id: ${charge.id}`);
          } else {
            console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
          }
      } catch (err) {
        // On error, log and return the error message
        console.log(`❌ Error message: ${err}`);
        res.status(400).send(`Webhook Error: ${err}`);
        return;
      }
  
      // Successfully constructed event
    //   console.log('✅ Success:', event);

  
      // Cast event data to Stripe object
     
  
      // Return a response to acknowledge receipt of the event
      res.json({received: true});
    }
  );
// application routes
app.use('', router);
// Static folder to serve uploaded files
app.use('/uploads', express.static('uploads'));

// const test = async (req: Request, res: Response) => {
//   const a = 10;
//   res.send(a);
// };

// app.get('/', test);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
