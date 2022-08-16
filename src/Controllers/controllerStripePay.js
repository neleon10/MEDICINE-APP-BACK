require('dotenv').config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

const PaymentRoute= async (req, res, next )=>{
    let { amount, currency, description, id  } = req.body;
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency,
			description,
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		next(error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}  
}

module.exports={PaymentRoute}