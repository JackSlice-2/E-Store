
"use client";

import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

const PayPalButton = ({ clientId, totalPrice }) => {
  const ORDER_AMOUNT = totalPrice;

  const paypalOptions = {
    'client-id': clientId,
    currency: 'BRL',
  };
//PayPal Button
  const paypalStyles = {
    color: 'blue',
    shape: 'rect',
    label: 'paypal',
    height: 55,
  };

  const handleApprove = (data, actions) => {
    console.log('Payment Approved:', data);
    const { orderID, payerID, paymentID, billingToken, facilitatorAccessToken, paymentSource, totalPrice, ORDER_AMOUNT } = data;
    const paymentData = {
      orderID,
      payerID,
      paymentID,
      billingToken,
      facilitatorAccessToken,
      paymentSource,
      totalPrice,
      ORDER_AMOUNT
    };

    // Send payment data to backend
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/paypal`, paymentData)
      .then((response) => {
        console.log('Payment processing successful:', response.data);
      })
      .catch((error) => {
        console.error('Error processing PayPal payment:', error);
      });
  };

  const handleError = (error) => {
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
