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
        const welcomeContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to Our Newsletter!</title>
                <style>
                    
                    body {
                        font-family: Arial, sans-serif;
                        max-width: 600px;
                        margin: 0 auto;
                    }
                    header {
                        background-color: #b2e2f2;
                        padding: 20px;
                        text-align: center;
                    }
                    main {
                        padding: 20px;
                    }
                    footer {
                        background-color: #d8f8e1;
                        padding: 20px;
                        text-align: center;
                    }
                    p {
                        font-size: 16px;
                        line-height: 1.5;
                    }
                    h1 {
                        color: #333333;
                        margin: 0;
                    }
                    a {
                        color: #007bff;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <header>
                    <h1>Welcome to Our Newsletter!</h1>
                </header>
                <main>
                    <p>Hello there!</p>
                    <p>Thank you for subscribing to CarlosRenting newsletter. We are thrilled to have you on board!</p>
                    <p>Our newsletter will keep you updated with the latest trends, special offers, and news. Expect insightful articles, helpful tips, and much more.</p>
                    <p>If you ever have any questions, suggestions, or feedback, feel free to reach out to us. We love hearing from our subscribers!</p>
                    <p>Once again, welcome aboard!</p>
                    <p>Best regards,<br>The CarlosRenting Team</p>
                </main>
                <footer>
                    <p>This email was sent to you as a subscriber to CarlosRenting newsletter</p>
                </footer>
            </body>
            </html>
        `;
        sendNewsletter(email, welcomeSubject, welcomeContent);

        res.send('Subscription successful! Check your email for a welcome newsletter.');
    } catch (error) {
        
        console.error('Error creating subscription:', error);
        next(error);
    }
};