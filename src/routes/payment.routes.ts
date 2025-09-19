import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';

const router = Router();
const paymentController = new PaymentController();

/**
 * @swagger
 * /stripe/payment-intents:
 *   post:
 *     summary: Create a payment intent
 *     description: Creates a new payment intent for processing payments
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - currency
 *             properties:
 *               amount:
 *                 type: integer
 *                 example: 2000
 *                 description: Amount in cents (e.g., 2000 = $20.00)
 *               currency:
 *                 type: string
 *                 example: "usd"
 *                 description: Three-letter ISO currency code
 *               customer_id:
 *                 type: string
 *                 example: "cus_1234567890"
 *                 description: Customer ID (optional)
 *               description:
 *                 type: string
 *                 example: "Payment for services"
 *                 description: Description of the payment
 *               metadata:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *                 example:
 *                   order_id: "order_123"
 *                   product: "premium_plan"
 *     responses:
 *       201:
 *         description: Payment intent created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post('/payment-intents', paymentController.createPaymentIntent.bind(paymentController));

/**
 * @swagger
 * /stripe/payment-intents/{paymentIntentId}:
 *   get:
 *     summary: Get payment intent by ID
 *     description: Retrieves a payment intent by its ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: paymentIntentId
 *         required: true
 *         schema:
 *           type: string
 *         example: "pi_1234567890"
 *         description: Payment intent ID
 *     responses:
 *       200:
 *         description: Payment intent retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Payment intent not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/payment-intents/:paymentIntentId', paymentController.getPaymentIntent.bind(paymentController));

/**
 * @swagger
 * /stripe/payment-intents/{paymentIntentId}/confirm:
 *   post:
 *     summary: Confirm payment intent
 *     description: Confirms a payment intent to complete the payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: paymentIntentId
 *         required: true
 *         schema:
 *           type: string
 *         example: "pi_1234567890"
 *         description: Payment intent ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               return_url:
 *                 type: string
 *                 format: uri
 *                 example: "https://your-app.com/payment/return"
 *                 description: URL to redirect to after payment completion (required for redirect-based payment methods)
 *     responses:
 *       200:
 *         description: Payment intent confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request or confirmation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post('/payment-intents/:paymentIntentId/confirm', paymentController.confirmPaymentIntent.bind(paymentController));

/**
 * @swagger
 * /stripe/payment-intents/{paymentIntentId}/cancel:
 *   post:
 *     summary: Cancel payment intent
 *     description: Cancels a payment intent
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: paymentIntentId
 *         required: true
 *         schema:
 *           type: string
 *         example: "pi_1234567890"
 *         description: Payment intent ID
 *     responses:
 *       200:
 *         description: Payment intent canceled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request or cancellation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post('/payment-intents/:paymentIntentId/cancel', paymentController.cancelPaymentIntent.bind(paymentController));

/**
 * @swagger
 * /stripe/customers:
 *   post:
 *     summary: Create a customer
 *     description: Creates a new customer in Stripe
 *     tags: [Customers]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "customer@example.com"
 *                 description: Customer email address
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *                 description: Customer name
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *                 description: Customer phone number
 *               metadata:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *                 example:
 *                   user_id: "user_123"
 *                   plan: "premium"
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post('/customers', paymentController.createCustomer.bind(paymentController));

/**
 * @swagger
 * /stripe/customers/{customerId}:
 *   get:
 *     summary: Get customer by ID
 *     description: Retrieves a customer by their ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         example: "cus_1234567890"
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Customer not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/customers/:customerId', paymentController.getCustomer.bind(paymentController));

/**
 * @swagger
 * /stripe/customers/{customerId}:
 *   put:
 *     summary: Update customer
 *     description: Updates an existing customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         example: "cus_1234567890"
 *         description: Customer ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "updated@example.com"
 *                 description: Updated email address
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *                 description: Updated name
 *               phone:
 *                 type: string
 *                 example: "+0987654321"
 *                 description: Updated phone number
 *               metadata:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *                 example:
 *                   user_id: "user_123"
 *                   plan: "enterprise"
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.put('/customers/:customerId', paymentController.updateCustomer.bind(paymentController));

/**
 * @swagger
 * /stripe/customers/{customerId}/payment-methods:
 *   get:
 *     summary: Get customer payment methods
 *     description: Retrieves all payment methods for a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         example: "cus_1234567890"
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Payment methods retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Customer not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/customers/:customerId/payment-methods', paymentController.getPaymentMethods.bind(paymentController));

/**
 * @swagger
 * /stripe/ephemeral-keys:
 *   post:
 *     summary: Create ephemeral key
 *     description: Creates an ephemeral key for customer operations
 *     tags: [Keys]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *             properties:
 *               customer_id:
 *                 type: string
 *                 example: "cus_1234567890"
 *                 description: Customer ID
 *     responses:
 *       201:
 *         description: Ephemeral key created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post('/ephemeral-keys', paymentController.createEphemeralKey.bind(paymentController));

export default router;
