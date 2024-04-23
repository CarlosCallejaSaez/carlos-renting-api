const Subscribers = require('../models/Subscribers.js');
const { sendNewsletter } = require('../utils/newsletter.js');

exports.createSubscribers = async (req, res, next) => {
   
    const email = req.body.email;

    try {
        
        const existingSubscriber = await Subscribers.findOne({ email });

        if (existingSubscriber) {
           
            return res.send('Email already subscribed. Check your email for the welcome newsletter.');
        }

        
        const newSubscriber = new Subscribers({ email });
        const savedSubscriber = await newSubscriber.save();
        

        console.log(`New subscription: ${email}`);

        
        const welcomeSubject = 'Welcome to Our Newsletter!';
        const welcomeContent = '<p>Thank you for subscribing to CarlosRenting newsletter!</p>';
        sendNewsletter(email, welcomeSubject, welcomeContent);

        res.send('Subscription successful! Check your email for a welcome newsletter.');
    } catch (error) {
        
        console.error('Error creating subscription:', error);
        next(error);
    }
};