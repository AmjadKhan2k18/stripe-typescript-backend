import Stripe from 'stripe';
import { CreateAccountRequest, CreateAccountResponse, ApiResponse } from '../types/stripe';
import { logger } from '../utils/logger';

export class StripeService {
  private stripe: Stripe;

  constructor() {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey || secretKey.includes('your_stripe_secret_key_here')) {
      console.warn('⚠️  STRIPE_SECRET_KEY not set or using placeholder. API will run in demo mode.');
      // Use a dummy key for demo purposes
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
   * Create a new Stripe account
   */
  async createAccount(accountData: CreateAccountRequest): Promise<ApiResponse<CreateAccountResponse>> {
    try {
      logger.info('Creating Stripe account', { 
        businessType: accountData.business_type,
        country: accountData.country,
        type: accountData.type 
      });

      // Check if we're in demo mode
      if (process.env.STRIPE_SECRET_KEY?.includes('your_stripe_secret_key_here')) {
        // Return a mock response for demo purposes
        const mockAccount = {
          id: 'acct_demo_' + Math.random().toString(36).substr(2, 9),
          object: 'account',
          business_profile: accountData.business_profile || {},
          business_type: accountData.business_type || null,
          capabilities: {},
          charges_enabled: false,
          controller: accountData.controller || {},
          country: accountData.country || 'US',
          created: Math.floor(Date.now() / 1000),
          default_currency: accountData.default_currency || 'usd',
          details_submitted: false,
          email: accountData.email || 'demo@example.com',
          external_accounts: {
            object: 'list',
            data: [],
            has_more: false,
            total_count: 0,
            url: '/v1/accounts/acct_demo/external_accounts'
          },
          future_requirements: {
            alternatives: [],
            current_deadline: null,
            currently_due: [],
            disabled_reason: null,
            errors: [],
            eventually_due: [],
            past_due: [],
            pending_verification: []
          },
          login_links: {
            object: 'list',
            total_count: 0,
            has_more: false,
            url: '/v1/accounts/acct_demo/login_links',
            data: []
          },
          metadata: accountData.metadata || {},
          payouts_enabled: false,
          requirements: {
            alternatives: [],
            current_deadline: null,
            currently_due: [],
            disabled_reason: null,
            errors: [],
            eventually_due: [],
            past_due: [],
            pending_verification: []
          },
          settings: accountData.settings || {},
          tos_acceptance: accountData.tos_acceptance || {},
          type: accountData.type || 'express'
        };

        return {
          success: true,
          data: mockAccount as any,
          message: 'Demo account created successfully (using mock data)',
        };
      }

      // Convert our request format to Stripe's expected format
      const stripeAccountData = this.convertToStripeFormat(accountData);

      // Create the account using Stripe API
      const account = await this.stripe.accounts.create(stripeAccountData);

      logger.info('Stripe account created successfully', { 
        accountId: account.id,
        type: account.type 
      });

      return {
        success: true,
        data: account as any,
        message: 'Account created successfully',
      };
    } catch (error) {
      logger.error('Failed to create Stripe account', { error: error instanceof Error ? error.message : 'Unknown error' });
      
      if (error instanceof Stripe.errors.StripeError) {
        return {
          success: false,
          error: {
            error: {
              type: error.type,
              code: error.code,
              message: error.message,
              param: error.param,
              decline_code: error.decline_code,
            },
          },
        };
      }

      return {
        success: false,
        error: {
          error: {
            type: 'api_error',
            message: 'An unexpected error occurred while creating the account',
          },
        },
      };
    }
  }

  /**
   * Retrieve an existing Stripe account
   */
  async getAccount(accountId: string): Promise<ApiResponse<CreateAccountResponse>> {
    try {
      logger.info('Retrieving Stripe account', { accountId });

      const account = await this.stripe.accounts.retrieve(accountId);

      return {
        success: true,
        data: account as any,
        message: 'Account retrieved successfully',
      };
    } catch (error) {
      logger.error('Failed to retrieve Stripe account', { 
        accountId, 
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      if (error instanceof Stripe.errors.StripeError) {
        return {
          success: false,
          error: {
            error: {
              type: error.type,
              code: error.code,
              message: error.message,
              param: error.param,
              decline_code: error.decline_code,
            },
          },
        };
      }

      return {
        success: false,
        error: {
          error: {
            type: 'api_error',
            message: 'An unexpected error occurred while retrieving the account',
          },
        },
      };
    }
  }

  /**
   * Update an existing Stripe account
   */
  async updateAccount(
    accountId: string, 
    accountData: Partial<CreateAccountRequest>
  ): Promise<ApiResponse<CreateAccountResponse>> {
    try {
      logger.info('Updating Stripe account', { 
        accountId,
        businessType: accountData.business_type,
        country: accountData.country 
      });

      const stripeAccountData = this.convertToStripeFormat(accountData);
      const account = await this.stripe.accounts.update(accountId, stripeAccountData);

      logger.info('Stripe account updated successfully', { accountId });

      return {
        success: true,
        data: account as any,
        message: 'Account updated successfully',
      };
    } catch (error) {
      logger.error('Failed to update Stripe account', { 
        accountId, 
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      if (error instanceof Stripe.errors.StripeError) {
        return {
          success: false,
          error: {
            error: {
              type: error.type,
              code: error.code,
              message: error.message,
              param: error.param,
              decline_code: error.decline_code,
            },
          },
        };
      }

      return {
        success: false,
        error: {
          error: {
            type: 'api_error',
            message: 'An unexpected error occurred while updating the account',
          },
        },
      };
    }
  }

  /**
   * List all accounts
   */
  async listAccounts(limit: number = 10): Promise<ApiResponse<{ data: CreateAccountResponse[] }>> {
    try {
      logger.info('Listing Stripe accounts', { limit });

      const accounts = await this.stripe.accounts.list({ limit });

      return {
        success: true,
        data: {
          data: accounts.data as any[],
        },
        message: 'Accounts retrieved successfully',
      };
    } catch (error) {
      logger.error('Failed to list Stripe accounts', { error: error instanceof Error ? error.message : 'Unknown error' });

      if (error instanceof Stripe.errors.StripeError) {
        return {
          success: false,
          error: {
            error: {
              type: error.type,
              code: error.code,
              message: error.message,
              param: error.param,
              decline_code: error.decline_code,
            },
          },
        };
      }

      return {
        success: false,
        error: {
          error: {
            type: 'api_error',
            message: 'An unexpected error occurred while listing accounts',
          },
        },
      };
    }
  }

  /**
   * Convert our request format to Stripe's expected format
   */
  private convertToStripeFormat(accountData: CreateAccountRequest | Partial<CreateAccountRequest>): any {
    // This method handles any necessary format conversions
    // For now, the formats are compatible, but this provides a place
    // for future format transformations if needed
    
    const converted = { ...accountData };

    // Handle nested object conversions if needed
    if (converted.controller) {
      // Ensure controller object is properly formatted
      converted.controller = {
        ...converted.controller,
        // Add any specific conversions here
      };
    }

    return converted;
  }

  /**
   * Validate Stripe API key
   */
  async validateApiKey(): Promise<boolean> {
    try {
      await this.stripe.accounts.list({ limit: 1 });
      return true;
    } catch (error) {
      logger.error('Stripe API key validation failed', { error: error instanceof Error ? error.message : 'Unknown error' });
      return false;
    }
  }
}
