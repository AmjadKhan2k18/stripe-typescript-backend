import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';
import { logger } from '../utils/logger';
import {
  CreatePaymentIntentRequest,
  CreateCustomerRequest,
  CreateEphemeralKeyRequest,
} from '../types/stripe';

export class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  /**
   * Create a payment intent
   */
  async createPaymentIntent(req: Request, res: Response): Promise<void> {
    try {
      const { amount, currency, customer_id, description, metadata } = req.body;

      logger.info('Payment intent creation request received', {
        amount,
        currency,
        customer_id,
      });

      const request: CreatePaymentIntentRequest = {
        amount,
        currency,
        customer_id,
        description,
        metadata,
      };

      const result = await this.paymentService.createPaymentIntent(request);

      if (result.success) {
        logger.info('Payment intent created successfully', {
          paymentIntentId: result.data?.id,
        });
        res.status(201).json(result);
      } else {
        logger.error('Failed to create payment intent', {
          error: result.error,
        });
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('Unexpected error in createPaymentIntent controller', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
      res.status(500).json({
        success: false,
        error: {
          error: {
            type: 'InternalServerError',
            message: 'An unexpected error occurred',
          },
        },
      });
    }
  }

  /**
   * Create a customer
   */
  async createCustomer(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, phone, metadata } = req.body;

      logger.info('Customer creation request received', { email, name });

      const request: CreateCustomerRequest = {
        email,
        name,
        phone,
        metadata,
      };

      const result = await this.paymentService.createCustomer(request);

      if (result.success) {
        logger.info('Customer created successfully', {
          customerId: result.data?.id,
        });
        res.status(201).json(result);
      } else {
        logger.error('Failed to create customer', {
          error: result.error,
        });
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('Unexpected error in createCustomer controller', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
      res.status(500).json({
        success: false,
        error: {
          error: {
            type: 'InternalServerError',
            message: 'An unexpected error occurred',
          },
        },
      });
    }
  }

  /**
   * Get a customer by ID
   */
  async getCustomer(req: Request, res: Response): Promise<void> {
    try {
      const { customerId } = req.params;

      logger.info('Customer retrieval request received', { customerId });

      const result = await this.paymentService.getCustomer(customerId);

      if (result.success) {
        logger.info('Customer retrieved successfully', {
          customerId: result.data?.id,
        });
        res.status(200).json(result);
      } else {
        logger.error('Failed to get customer', {
          error: result.error,
        });
        res.status(404).json(result);
      }
    } catch (error) {
      logger.error('Unexpected error in getCustomer controller', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
      res.status(500).json({
        success: false,
        error: {
          error: {
            type: 'InternalServerError',
            message: 'An unexpected error occurred',
          },
        },
      });
    }
  }

  /**
   * Update a customer
   */
  async updateCustomer(req: Request, res: Response): Promise<void> {
    try {
      const { customerId } = req.params;
      const { email, name, phone, metadata } = req.body;

      logger.info('Customer update request received', { customerId, email, name });

      const request: CreateCustomerRequest = {
        email,
        name,
        phone,
        metadata,
      };

      const result = await this.paymentService.updateCustomer(customerId, request);

      if (result.success) {
        logger.info('Customer updated successfully', {
          customerId: result.data?.id,
        });
        res.status(200).json(result);
      } else {
        logger.error('Failed to update customer', {
          error: result.error,
        });
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('Unexpected error in updateCustomer controller', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
      res.status(500).json({
        success: false,
        error: {
          error: {
            type: 'InternalServerError',
            message: 'An unexpected error occurred',
          },
        },
      });
    }
  }

  /**
   * Get payment methods for a customer
   */
  async getPaymentMethods(req: Request, res: Response): Promise<void> {
    try {
      const { customerId } = req.params;

      logger.info('Payment methods retrieval request received', { customerId });

      const result = await this.paymentService.getPaymentMethods(customerId);

      if (result.success) {
        logger.info('Payment methods retrieved successfully', {
          customerId,
          count: result.data?.length || 0,
        });
        res.status(200).json(result);
      } else {
        logger.error('Failed to get payment methods', {
          error: result.error,
        });
        res.status(404).json(result);
      }
    } catch (error) {
      logger.error('Unexpected error in getPaymentMethods controller', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
      res.status(500).json({
        success: false,
        error: {
          error: {
            type: 'InternalServerError',
            message: 'An unexpected error occurred',
          },
        },
      });
    }
  }

  /**
   * Create ephemeral key
   */
  async createEphemeralKey(req: Request, res: Response): Promise<void> {
    try {
      const { customer_id } = req.body;

      logger.info('Ephemeral key creation request received', { customer_id });

      const request: CreateEphemeralKeyRequest = {
        customer_id,
      };

      const result = await this.paymentService.createEphemeralKey(request);

      if (result.success) {
        logger.info('Ephemeral key created successfully', {
          keyId: result.data?.id,
        });
        res.status(201).json(result);
      } else {
        logger.error('Failed to create ephemeral key', {
          error: result.error,
        });
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('Unexpected error in createEphemeralKey controller', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
      res.status(500).json({
        success: false,
        error: {
          error: {
            type: 'InternalServerError',
            message: 'An unexpected error occurred',
          },
        },
      });
    }
  }

  /**
   * Confirm payment intent
   */
  async confirmPaymentIntent(req: Request, res: Response): Promise<void> {
    try {
      const { paymentIntentId } = req.params;
      const { return_url } = req.body;

      logger.info('Payment intent confirmation request received', { paymentIntentId, return_url });

      const result = await this.paymentService.confirmPaymentIntent(paymentIntentId, return_url);

      if (result.success) {
        logger.info('Payment intent confirmed successfully', {
          paymentIntentId: result.data?.id,
        });
        res.status(200).json(result);
      } else {
        logger.error('Failed to confirm payment intent', {
          error: result.error,
        });
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('Unexpected error in confirmPaymentIntent controller', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
      res.status(500).json({
        success: false,
        error: {
          error: {
            type: 'InternalServerError',
            message: 'An unexpected error occurred',
          },
        },
      });
    }
  }

  /**
   * Cancel payment intent
   */
  async cancelPaymentIntent(req: Request, res: Response): Promise<void> {
    try {
      const { paymentIntentId } = req.params;

      logger.info('Payment intent cancellation request received', { paymentIntentId });

      const result = await this.paymentService.cancelPaymentIntent(paymentIntentId);

      if (result.success) {
        logger.info('Payment intent canceled successfully', {
          paymentIntentId,
        });
        res.status(200).json(result);
      } else {
        logger.error('Failed to cancel payment intent', {
          error: result.error,
        });
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('Unexpected error in cancelPaymentIntent controller', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
      res.status(500).json({
        success: false,
        error: {
          error: {
            type: 'InternalServerError',
            message: 'An unexpected error occurred',
          },
        },
      });
    }
  }

  /**
   * Get payment intent by ID
   */
  async getPaymentIntent(req: Request, res: Response): Promise<void> {
    try {
      const { paymentIntentId } = req.params;

      logger.info('Payment intent retrieval request received', { paymentIntentId });

      const result = await this.paymentService.getPaymentIntent(paymentIntentId);

      if (result.success) {
        logger.info('Payment intent retrieved successfully', {
          paymentIntentId: result.data?.id,
        });
        res.status(200).json(result);
      } else {
        logger.error('Failed to get payment intent', {
          error: result.error,
        });
        res.status(404).json(result);
      }
    } catch (error) {
      logger.error('Unexpected error in getPaymentIntent controller', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
      res.status(500).json({
        success: false,
        error: {
          error: {
            type: 'InternalServerError',
            message: 'An unexpected error occurred',
          },
        },
      });
    }
  }
}
