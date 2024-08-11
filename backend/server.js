// server.js

/* eslint no-undef: "off" */

import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Use environment variable
  key_secret: process.env.RAZORPAY_KEY_SECRET // Use environment variable
});

app.post('/razorpay', async (req, res) => {
  const payment_capture = 1;
  const amount = 50000; // Example amount in the smallest currency unit
  const currency = 'INR';

  const options = {
    amount: amount * 100,
    currency,
    receipt: 'receipt#1',
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating Razorpay order');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
