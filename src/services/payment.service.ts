import Stripe from 'stripe';
import { logger } from '../utils/logger';
import {
  CreatePaymentIntentRequest,
  PaymentIntentResponse,
  CreateCustomerRequest,
  CustomerResponse,
  PaymentMethodResponse,
  CreateEphemeralKeyRequest,
  EphemeralKeyResponse,
  ApiResponse,
} from '../types/stripe';

export class PaymentService {
  private stripe: Stripe;

  constructor() {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey || secretKey.includes('your_stripe_secret_key_here')) {
      console.warn('⚠️  STRIPE_SECRET_KEY not set or using placeholder. Payment API will run in demo mode.');
      this.stripe = new Stripe('sk_test_demo_key_for_testing', {
        apiVersion: '2023-10-16',
      });
    } else {
      this.stripe = new Stripe(secretKey, {
        apiVersion: '2023-10-16',
      });
    }
  }

  /**
   * Create a payment intent
   */
  async createPaymentIntent(
    request: CreatePaymentIntentRequest
  ): Promise<ApiResponse<PaymentIntentResponse>> {
    try {
      logger.info('Creating payment intent', { amount: request.amount, currency: request.currency });

      if (process.env.STRIPE_SECRET_KEY?.includes('your_stripe_secret_key_here')) {
        // Return a mock response for demo purposes
        const mockPaymentIntent: PaymentIntentResponse = {
          id: 'pi_mock_payment_intent_id',
          object: 'payment_intent',
          amount: request.amount,
          amount_capturable: 0,
          amount_received: 0,
          capture_method: 'automatic',
          charges: {
            object: 'list',
            data: [],
            has_more: false,
            total_count: 0,
            url: '/v1/charges',
          },
          client_secret: 'pi_mock_payment_intent_id_secret_mock',
          confirmation_method: 'automatic',
          created: Math.floor(Date.now() / 1000),
          currency: request.currency,
          customer: request.customer_id,
          description: request.description,
          livemode: false,
          metadata: request.metadata || {},
          payment_method_types: ['card'],
          status: 'requires_payment_method',
        };

        return {
          success: true,
          data: mockPaymentIntent,
          message: 'Demo payment intent created successfully',
        };
      }

      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: request.amount,
        currency: request.currency,
        customer: request.customer_id,
        description: request.description,
        metadata: request.metadata,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        success: true,
        data: paymentIntent as any,
        message: 'Payment intent created successfully',
      };
    } catch (error) {
      logger.error('Failed to create payment intent', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });

      return {
        success: false,
        error: {
          error: {
            type: 'StripeError',
            message: error instanceof Error ? error.message : 'Failed to create payment intent',
          },
        },
      };
    }
  }

  /**
   * Create a customer
   */
  async createCustomer(request: CreateCustomerRequest): Promise<ApiResponse<CustomerResponse>> {
    try {
      logger.info('Creating customer', { email: request.email });

      if (process.env.STRIPE_SECRET_KEY?.includes('your_stripe_secret_key_here')) {
        // Return a mock response for demo purposes
        const mockCustomer: CustomerResponse = {
          id: 'cus_mock_customer_id',
          object: 'customer',
          created: Math.floor(Date.now() / 1000),
          email: request.email,
          livemode: false,
          metadata: request.metadata || {},
          name: request.name,
          phone: request.phone,
        };

        return {
          success: true,
          data: mockCustomer,
          message: 'Demo customer created successfully',
        };
      }

      const customer = await this.stripe.customers.create({
        email: request.email,
        name: request.name,
        phone: request.phone,
        metadata: request.metadata,
      });

      return {
        success: true,
        data: customer as any,
        message: 'Customer created successfully',
      };
    } catch (error) {
      logger.error('Failed to create customer', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });

      return {
        success: false,
        error: {
          error: {
            type: 'StripeError',
            message: error instanceof Error ? error.message : 'Failed to create customer',
          },
        },
      };
    }
  }

  /**
   * Get a customer by ID
   */
  async getCustomer(customerId: string): Promise<ApiResponse<CustomerResponse>> {
    try {
      logger.info('Getting customer', { customerId });

      if (process.env.STRIPE_SECRET_KEY?.includes('your_stripe_secret_key_here')) {
        // Return a mock response for demo purposes
        const mockCustomer: CustomerResponse = {
          id: customerId,
          object: 'customer',
          created: Math.floor(Date.now() / 1000),
          email: 'demo@example.com',
          livemode: false,
          metadata: {},
          name: 'Demo Customer',
        };

        return {
          success: true,
          data: mockCustomer,
          message: 'Demo customer retrieved successfully',
        };
      }

      const customer = await this.stripe.customers.retrieve(customerId);

      return {
        success: true,
        data: customer as any,
        message: 'Customer retrieved successfully',
      };
    } catch (error) {
      logger.error('Failed to get customer', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });

      return {
        success: false,
        error: {
          error: {
            type: 'StripeError',
            message: error instanceof Error ? error.message : 'Failed to get customer',
          },
        },
      };
    }
  }

  /**
   * Update a customer
   */
  async updateCustomer(
    customerId: string,
    request: CreateCustomerRequest
  ): Promise<ApiResponse<CustomerResponse>> {
    try {
      logger.info('Updating customer', { customerId });

      if (process.env.STRIPE_SECRET_KEY?.includes('your_stripe_secret_key_here')) {
        // Return a mock response for demo purposes
        const mockCustomer: CustomerResponse = {
          id: customerId,
          object: 'customer',
          created: Math.floor(Date.now() / 1000),
          email: request.email,
          livemode: false,
          metadata: request.metadata || {},
          name: request.name,
          phone: request.phone,
        };

        return {
          success: true,
          data: mockCustomer,
          message: 'Demo customer updated successfully',
        };
      }

      const customer = await this.stripe.customers.update(customerId, {
        email: request.email,
        name: request.name,
        phone: request.phone,
        metadata: request.metadata,
      });

      return {
        success: true,
        data: customer as any,
        message: 'Customer updated successfully',
      };
    } catch (error) {
      logger.error('Failed to update customer', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });

      return {
        success: false,
        error: {
          error: {
            type: 'StripeError',
            message: error instanceof Error ? error.message : 'Failed to update customer',
          },
        },
      };
    }
  }

  /**
   * Get payment methods for a customer
   */
  async getPaymentMethods(customerId: string): Promise<ApiResponse<PaymentMethodResponse[]>> {
    try {
      logger.info('Getting payment methods', { customerId });

      if (process.env.STRIPE_SECRET_KEY?.includes('your_stripe_secret_key_here')) {
        // Return a mock response for demo purposes
        const mockPaymentMethods: PaymentMethodResponse[] = [
          {
            id: 'pm_mock_payment_method_id',
            object: 'payment_method',
            billing_details: {
              email: 'demo@example.com',
              name: 'Demo Customer',
            },
            card: {
              brand: 'visa',
              exp_month: 12,
              exp_year: 2025,
              last4: '4242',
            },
            created: Math.floor(Date.now() / 1000),
            customer: customerId,
            livemode: false,
            metadata: {},
            type: 'card',
          },
        ];

        return {
          success: true,
          data: mockPaymentMethods,
          message: 'Demo payment methods retrieved successfully',
        };
      }

      const paymentMethods = await this.stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
      });

      return {
        success: true,
        data: paymentMethods.data as any,
        message: 'Payment methods retrieved successfully',
      };
    } catch (error) {
      logger.error('Failed to get payment methods', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });

      return {
        success: false,
        error: {
          error: {
            type: 'StripeError',
            message: error instanceof Error ? error.message : 'Failed to get payment methods',
          },
        },
      };
    }
  }

  /**
   * Create ephemeral key
   */
  async createEphemeralKey(request: CreateEphemeralKeyRequest): Promise<ApiResponse<EphemeralKeyResponse>> {
    try {
      logger.info('Creating ephemeral key', { customerId: request.customer_id });

      if (process.env.STRIPE_SECRET_KEY?.includes('your_stripe_secret_key_here')) {
        // Return a mock response for demo purposes
        const mockEphemeralKey: EphemeralKeyResponse = {
          id: 'ek_mock_ephemeral_key_id',
          object: 'ephemeral_key',
          associated_objects: [
            {
              id: request.customer_id,
              type: 'customer',
            },
          ],
          created: Math.floor(Date.now() / 1000),
          expires: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
          livemode: false,
          secret: 'ek_test_mock_secret_key',
        };

        return {
          success: true,
          data: mockEphemeralKey,
          message: 'Demo ephemeral key created successfully',
        };
      }

      const ephemeralKey = await this.stripe.ephemeralKeys.create(
        { customer: request.customer_id },
        { apiVersion: '2023-10-16' }
      );

      return {
        success: true,
        data: ephemeralKey as any,
        message: 'Ephemeral key created successfully',
      };
    } catch (error) {
      logger.error('Failed to create ephemeral key', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });

      return {
        success: false,
        error: {
          error: {
            type: 'StripeError',
            message: error instanceof Error ? error.message : 'Failed to create ephemeral key',
          },
        },
      };
    }
  }

  /**
   * Confirm payment intent
   */
  async confirmPaymentIntent(paymentIntentId: string, returnUrl?: string): Promise<ApiResponse<PaymentIntentResponse>> {
    try {
      logger.info('Confirming payment intent', { paymentIntentId, returnUrl });

      if (process.env.STRIPE_SECRET_KEY?.includes('your_stripe_secret_key_here')) {
        // Return a mock response for demo purposes
        const mockPaymentIntent: PaymentIntentResponse = {
          id: paymentIntentId,
          object: 'payment_intent',
          amount: 2000,
          amount_capturable: 0,
          amount_received: 2000,
          capture_method: 'automatic',
          charges: {
            object: 'list',
            data: [],
            has_more: false,
            total_count: 0,
            url: '/v1/charges',
          },
          client_secret: `${paymentIntentId}_secret_mock`,
          confirmation_method: 'automatic',
          created: Math.floor(Date.now() / 1000),
          currency: 'usd',
          livemode: false,
          metadata: {},
          payment_method_types: ['card'],
          status: 'succeeded',
        };

        return {
          success: true,
          data: mockPaymentIntent,
          message: 'Demo payment intent confirmed successfully',
        };
      }

      // For Flutter apps, we'll use a default return URL if none provided
      const defaultReturnUrl = returnUrl || 'https://your-app.com/payment/return';
      
      const paymentIntent = await this.stripe.paymentIntents.confirm(paymentIntentId, {
        return_url: defaultReturnUrl,
      });

      return {
        success: true,
        data: paymentIntent as any,
        message: 'Payment intent confirmed successfully',
      };
    } catch (error) {
      logger.error('Failed to confirm payment intent', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });

      return {
        success: false,
        error: {
          error: {
            type: 'StripeError',
            message: error instanceof Error ? error.message : 'Failed to confirm payment intent',
          },
        },
      };
    }
  }

  /**
   * Cancel payment intent
   */
  async cancelPaymentIntent(paymentIntentId: string): Promise<ApiResponse<void>> {
    try {
      logger.info('Canceling payment intent', { paymentIntentId });

      if (process.env.STRIPE_SECRET_KEY?.includes('your_stripe_secret_key_here')) {
        return {
          success: true,
          message: 'Demo payment intent canceled successfully',
        };
      }

      await this.stripe.paymentIntents.cancel(paymentIntentId);

      return {
        success: true,
        message: 'Payment intent canceled successfully',
      };
    } catch (error) {
      logger.error('Failed to cancel payment intent', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });

      return {
        success: false,
        error: {
          error: {
            type: 'StripeError',
            message: error instanceof Error ? error.message : 'Failed to cancel payment intent',
          },
        },
      };
    }
  }

  /**
   * Get payment intent by ID
   */
  async getPaymentIntent(paymentIntentId: string): Promise<ApiResponse<PaymentIntentResponse>> {
    try {
      logger.info('Getting payment intent', { paymentIntentId });

      if (process.env.STRIPE_SECRET_KEY?.includes('your_stripe_secret_key_here')) {
        // Return a mock response for demo purposes
        const mockPaymentIntent: PaymentIntentResponse = {
          id: paymentIntentId,
          object: 'payment_intent',
          amount: 2000,
          amount_capturable: 0,
          amount_received: 0,
          capture_method: 'automatic',
          charges: {
            object: 'list',
            data: [],
            has_more: false,
            total_count: 0,
            url: '/v1/charges',
          },
          client_secret: `${paymentIntentId}_secret_mock`,
          confirmation_method: 'automatic',
          created: Math.floor(Date.now() / 1000),
          currency: 'usd',
          livemode: false,
          metadata: {},
          payment_method_types: ['card'],
          status: 'requires_payment_method',
        };

        return {
          success: true,
          data: mockPaymentIntent,
          message: 'Demo payment intent retrieved successfully',
        };
      }

      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);

      return {
        success: true,
        data: paymentIntent as any,
        message: 'Payment intent retrieved successfully',
      };
    } catch (error) {
      logger.error('Failed to get payment intent', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });

      return {
        success: false,
        error: {
          error: {
            type: 'StripeError',
            message: error instanceof Error ? error.message : 'Failed to get payment intent',
          },
        },
      };
    }
  }
}
