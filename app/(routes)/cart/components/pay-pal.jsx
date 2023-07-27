
"use client";

import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

const PayPalButton = ({ clientId, totalPrice }) => {
  // Replace 'YOUR_ORDER_AMOUNT' with the actual order amount
  const ORDER_AMOUNT = totalPrice; // In Brazilian Reals (BRL)

  const paypalOptions = {
    'client-id': clientId,
    currency: 'BRL',
  };

  const paypalStyles = {
    color: 'blue',
    shape: 'rect',
    label: 'paypal',
    height: 55, // Customize the button height here
  };

  const handleApprove = (data, actions) => {
    // Handle the payment approval here
    // You can send the payment data to your server and complete the transaction
    console.log('Payment Approved:', data);
    const { orderID, payerID, paymentID, billingToken, facilitatorAccessToken, paymentSource } = data;
    const paymentData = {
      orderID,
      payerID,
      paymentID,
      billingToken,
      facilitatorAccessToken,
      paymentSource,
    };

    // Send the payment data to your backend for processing
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/paypal`, paymentData)
      .then((response) => {
        console.log('Payment processing successful:', response.data);
        // Optionally, you can handle the success response here, e.g., show a success message
      })
      .catch((error) => {
        console.error('Error processing PayPal payment:', error);
        // Handle the error here, e.g., show an error message to the user
      });
  };

  const handleError = (error) => {
    // Handle errors here
    console.error('PayPal Error:', error);
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons
        style={paypalStyles}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'BRL',
                  value: ORDER_AMOUNT,
                },
              },
            ],
          });
        }}
        onApprove={handleApprove}
        onError={handleError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
