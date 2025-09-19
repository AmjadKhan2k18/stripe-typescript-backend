import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { logger } from './utils/logger';
import accountRoutes from './routes/account.routes';
import paymentRoutes from './routes/payment.routes';
import healthRoutes from './routes/health.routes';
import { AccountController } from './controllers/account.controller';
import { setupSwagger } from './config/swagger';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS middleware - must be before other middleware
app.use(cors({
  origin: true, // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'accept', 'Origin', 'X-Requested-With', 'X-HTTP-Method-Override'],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false,
}));

// Security middleware - temporarily disabled for CORS debugging
// app.use(helmet({
//   crossOriginEmbedderPolicy: false,
//   contentSecurityPolicy: false,
// }));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info('Incoming request', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });
  next();
});

// Setup Swagger documentation
setupSwagger(app);

// API routes
app.use('/api/accounts', accountRoutes);
app.use('/api/stripe', paymentRoutes);
app.use('/health', healthRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Stripe Account Creation API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      accounts: '/api/accounts',
      payments: '/api/stripe',
      documentation: '/api/docs',
      swagger: '/api-docs',
    },
  });
});

// API documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    success: true,
    message: 'API Documentation',
    endpoints: {
      'POST /api/accounts': {
        description: 'Create a new Stripe account',
        parameters: {
          account_token: 'string (optional) - Account token for secure details',
          business_profile: 'object (optional) - Business information',
          business_type: 'enum (optional) - company, government_entity, individual, non_profit',
          capabilities: 'object (optional) - Account capabilities',
          company: 'object (optional) - Company information',
          controller: 'object (optional) - Account controller settings',
          country: 'string (optional) - ISO 3166-1 alpha-2 country code',
          default_currency: 'string (optional) - Three-letter ISO currency code',
          documents: 'object (optional) - Required documents',
          email: 'string (optional) - Account holder email',
          external_account: 'string (optional) - Bank account or card token',
          groups: 'object (optional) - Account groups',
          individual: 'object (optional) - Individual information',
          metadata: 'object (optional) - Key-value pairs',
          settings: 'object (optional) - Account settings',
          tos_acceptance: 'object (optional) - Terms of service acceptance',
          type: 'enum (optional) - custom, express, standard',
        },
        example: {
          country: 'US',
          email: 'jenny.rosen@example.com',
          controller: {
            fees: { payer: 'application' },
            losses: { payments: 'application' },
            stripe_dashboard: { type: 'express' },
          },
        },
      },
      'GET /api/accounts/:accountId': {
        description: 'Get a specific Stripe account by ID',
        parameters: {
          accountId: 'string (required) - Stripe account ID',
        },
      },
      'PUT /api/accounts/:accountId': {
        description: 'Update a specific Stripe account',
        parameters: {
          accountId: 'string (required) - Stripe account ID',
          // Same parameters as POST /api/accounts
        },
      },
      'GET /api/accounts': {
        description: 'List all Stripe accounts',
        queryParameters: {
          limit: 'number (optional) - Number of accounts to return (1-100, default: 10)',
        },
      },
      'GET /health': {
        description: 'Health check endpoint',
      },
    },
    examples: {
      'Create Express Account': {
        method: 'POST',
        url: '/api/accounts',
        body: {
          country: 'US',
          email: 'jenny.rosen@example.com',
          controller: {
            fees: { payer: 'application' },
            losses: { payments: 'application' },
            stripe_dashboard: { type: 'express' },
          },
        },
      },
      'Create Custom Account': {
        method: 'POST',
        url: '/api/accounts',
        body: {
          type: 'custom',
          country: 'US',
          email: 'business@example.com',
          business_type: 'company',
          company: {
            name: 'Example Corp',
            address: {
              line1: '123 Main St',
              city: 'San Francisco',
              state: 'CA',
              postal_code: '94105',
              country: 'US',
            },
          },
          capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
          },
        },
      },
    },
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      error: {
        type: 'not_found',
        message: 'Endpoint not found',
      },
    },
  });
});

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
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
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`, {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
  });
});

export default app;
