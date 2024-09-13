import { useEffect, useState } from 'react';

const PayPalButton = ({ amount }) => {
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const addPayPalScript = async () => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD`;
      script.type = 'text/javascript';
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    };

    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      alert('Transaction completed by ' + details.payer.name.given_name);
      // You can also send details to your server for post-processing
    });
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount, // the payment amount
          },
        },
      ],
    });
  };

  return sdkReady ? (
    <div>
      <div id="paypal-button-container"></div>
      {window.paypal.Buttons({
        createOrder: createOrder,
        onApprove: onApprove,
      }).render('#paypal-button-container')}
    </div>
  ) : (
    <div>Loading PayPal...</div>
  );
};

export default PayPalButton;
