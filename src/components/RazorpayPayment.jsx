// src/components/RazorpayPayment.jsx

// import React from 'react';

const RazorpayPayment = () => {
  const handlePayment = async () => {
    try {
      // Request order details from your backend
      const response = await fetch('http://localhost:3001/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      // Check if the order creation was successful
      if (!data.id) {
        throw new Error('Failed to create order');
      }

      const options = {
        key: 'rzp_test_9T014DgPoIsohI', // Replace with your Razorpay Key ID
        amount: data.amount,
        currency: data.currency,
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: data.id,
        handler: function (response) {
            console.log('Payment response:', response)
          alert('Payment Successful');
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '9999999999'
        },
        notes: {
          address: 'Your Address'
        },
        theme: {
          color: '#3399cc'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay with Razorpay</button>
    </div>
  );
};

export default RazorpayPayment;
