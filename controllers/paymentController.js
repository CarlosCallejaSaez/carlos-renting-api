const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  try {
    const { price, token } = req.body;

    
    const charge = await stripe.charges.create({
      amount: price * 100, 
      currency: 'eur', 
      source: token,
      description: 'Payment for the car',
    });



    res.json({ message: 'Payment processed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing the payment' });
  }
};