import { Router } from 'express';
import { AccountController } from '../controllers/account.controller';
import { validateCreateAccount } from '../middleware/validation';

const router = Router();
const accountController = new AccountController();

/**
 * @swagger
 * /api/accounts:
 *   post:
 *     summary: Create a new Stripe account
 *     description: Creates a new Stripe account with the specified parameters. Supports Express, Custom, and Standard account types.
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAccountRequest'
 *           examples:
 *             express_account:
 *               summary: Express Account
 *               value:
 *                 country: "US"
 *                 email: "express.merchant@example.com"
 *                 controller:
 *                   fees:
 *                     payer: "application"
 *                   losses:
 *                     payments: "application"
 *                   stripe_dashboard:
 *                     type: "express"
 *             custom_account:
 *               summary: Custom Account
 *               value:
 *                 type: "custom"
 *                 country: "US"
 *                 email: "custom.business@example.com"
 *                 business_type: "company"
 *                 company:
 *                   name: "Example Corporation"
 *                   address:
 *                     line1: "123 Business Street"
 *                     city: "San Francisco"
 *                     state: "CA"
 *                     postal_code: "94105"
 *                     country: "US"
 *                 capabilities:
 *                   card_payments:
 *                     requested: true
 *                   transfers:
 *                     requested: true
 *             individual_account:
 *               summary: Individual Account
 *               value:
 *                 type: "custom"
 *                 country: "US"
 *                 email: "individual.freelancer@example.com"
 *                 business_type: "individual"
 *                 individual:
 *                   first_name: "John"
 *                   last_name: "Doe"
 *                   email: "individual.freelancer@example.com"
 *                   phone: "+1-555-987-6543"
 *                   address:
 *                     line1: "456 Personal Ave"
 *                     city: "New York"
 *                     state: "NY"
 *                     postal_code: "10001"
 *                     country: "US"
 *                   dob:
 *                     day: 15
 *                     month: 6
 *                     year: 1990
 *                 capabilities:
 *                   card_payments:
 *                     requested: true
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               data:
 *                 id: "acct_1Nv0FGQ9RKHgCVdK"
 *                 object: "account"
 *                 country: "US"
 *                 email: "merchant@example.com"
 *                 type: "express"
 *                 charges_enabled: false
 *                 payouts_enabled: false
 *               message: "Account created successfully"
 *       400:
 *         description: Bad request - validation error or Stripe error
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ValidationError'
 *                 - $ref: '#/components/schemas/ApiResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post('/', validateCreateAccount, accountController.createAccount);

/**
 * @swagger
 * /api/accounts/{accountId}:
 *   get:
 *     summary: Get a specific Stripe account by ID
 *     description: Retrieves details of a specific Stripe account using its account ID.
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *         description: The Stripe account ID (e.g., acct_1Nv0FGQ9RKHgCVdK)
 *         example: "acct_1Nv0FGQ9RKHgCVdK"
 *     responses:
 *       200:
 *         description: Account retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Account not found
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
router.get('/:accountId', accountController.getAccount);

/**
 * @swagger
 * /api/accounts/{accountId}:
 *   put:
 *     summary: Update a specific Stripe account
 *     description: Updates an existing Stripe account with new information. Only certain fields can be updated after account creation.
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *         description: The Stripe account ID (e.g., acct_1Nv0FGQ9RKHgCVdK)
 *         example: "acct_1Nv0FGQ9RKHgCVdK"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAccountRequest'
 *           example:
 *             business_type: "company"
 *             company:
 *               name: "Updated Company Name"
 *               phone: "+1-555-999-8888"
 *     responses:
 *       200:
 *         description: Account updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Bad request - validation error or Stripe error
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ValidationError'
 *                 - $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Account not found
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
router.put('/:accountId', validateCreateAccount, accountController.updateAccount);

/**
 * @swagger
 * /api/accounts:
 *   get:
 *     summary: List all Stripe accounts
 *     description: Retrieves a list of all Stripe accounts with optional limit parameter.
 *     tags: [Accounts]
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of accounts to return (1-100)
 *         example: 20
 *     responses:
 *       200:
 *         description: Accounts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "acct_1Nv0FGQ9RKHgCVdK"
 *                           email:
 *                             type: string
 *                             example: "merchant@example.com"
 *                           country:
 *                             type: string
 *                             example: "US"
 *                           type:
 *                             type: string
 *                             example: "express"
 *                 message:
 *                   type: string
 *                   example: "Accounts retrieved successfully"
 *       400:
 *         description: Bad request - invalid limit parameter
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
router.get('/', accountController.listAccounts);

export default router;
