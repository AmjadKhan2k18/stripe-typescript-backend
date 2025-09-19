import { Request, Response } from 'express';
import { StripeService } from '../services/stripe.service';
import { CreateAccountRequest } from '../types/stripe';
import { logger } from '../utils/logger';

export class AccountController {
  private stripeService: StripeService;

  constructor() {
    this.stripeService = new StripeService();
  }

  /**
   * Create a new Stripe account
   */
  createAccount = async (req: Request, res: Response): Promise<void> => {
    try {
      const accountData: CreateAccountRequest = req.body;

      logger.info('Account creation request received', {
        businessType: accountData.business_type,
        country: accountData.country,
        type: accountData.type,
        email: accountData.email,
      });

      const result = await this.stripeService.createAccount(accountData);

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('Unexpected error in createAccount controller', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });

      res.status(500).json({
        success: false,
        error: {
          error: {
            type: 'internal_server_error',
            message: 'An unexpected error occurred',
          },
        },
      });
    }
  };

  /**
   * Get a specific Stripe account by ID
   */
  getAccount = async (req: Request, res: Response): Promise<void> => {
    try {
      const { accountId } = req.params;

      if (!accountId) {
        res.status(400).json({
          success: false,
          error: {
            error: {
              type: 'invalid_request_error',
              message: 'Account ID is required',
            },
          },
        });
        return;
      }

      logger.info('Account retrieval request received', { accountId });

      const result = await this.stripeService.getAccount(accountId);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      logger.error('Unexpected error in getAccount controller', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });

      res.status(500).json({
        success: false,
        error: {
          error: {
            type: 'internal_server_error',
            message: 'An unexpected error occurred',
          },
        },
      });
    }
  };

  /**
   * Update a specific Stripe account
   */
  updateAccount = async (req: Request, res: Response): Promise<void> => {
    try {
      const { accountId } = req.params;
      const accountData = req.body;

      if (!accountId) {
        res.status(400).json({
          success: false,
          error: {
            error: {
              type: 'invalid_request_error',
              message: 'Account ID is required',
            },
          },
        });
        return;
      }

      logger.info('Account update request received', { 
        accountId,
        businessType: accountData.business_type,
        country: accountData.country 
      });

      const result = await this.stripeService.updateAccount(accountId, accountData);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('Unexpected error in updateAccount controller', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });

      res.status(500).json({
        success: false,
        error: {
          error: {
            type: 'internal_server_error',
            message: 'An unexpected error occurred',
          },
        },
      });
    }
  };

  /**
   * List all Stripe accounts
   */
  listAccounts = async (req: Request, res: Response): Promise<void> => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;

      if (limit < 1 || limit > 100) {
        res.status(400).json({
          success: false,
          error: {
            error: {
              type: 'invalid_request_error',
              message: 'Limit must be between 1 and 100',
            },
          },
        });
        return;
      }

      logger.info('Account list request received', { limit });

      const result = await this.stripeService.listAccounts(limit);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      logger.error('Unexpected error in listAccounts controller', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });

      res.status(500).json({
        success: false,
        error: {
          error: {
            type: 'internal_server_error',
            message: 'An unexpected error occurred',
          },
        },
      });
    }
  };

  /**
   * Health check endpoint
   */
  healthCheck = async (req: Request, res: Response): Promise<void> => {
    try {
      const isApiKeyValid = await this.stripeService.validateApiKey();

      res.status(200).json({
        success: true,
        data: {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          stripe: {
            apiKeyValid: isApiKeyValid,
          },
        },
        message: 'Service is healthy',
      });
    } catch (error) {
      logger.error('Health check failed', { error: error instanceof Error ? error.message : 'Unknown error' });

      res.status(500).json({
        success: false,
        error: {
          error: {
            type: 'health_check_error',
            message: 'Health check failed',
          },
        },
      });
    }
  };
}
