import swaggerJsdoc from 'swagger-jsdoc';
import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Stripe Account Creation API',
      version: '1.0.0',
      description: 'A comprehensive API for creating and managing Stripe accounts using the Stripe Connect platform.',
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
      {
        url: 'https://api.example.com/api',
        description: 'Production server',
      },
    ],
    components: {
      schemas: {
        Address: {
          type: 'object',
          properties: {
            city: { type: 'string', example: 'San Francisco' },
            country: { type: 'string', example: 'US', minLength: 2, maxLength: 2 },
            line1: { type: 'string', example: '123 Main Street' },
            line2: { type: 'string', example: 'Suite 100' },
            postal_code: { type: 'string', example: '94105' },
            state: { type: 'string', example: 'CA' },
          },
        },
        DateOfBirth: {
          type: 'object',
          required: ['day', 'month', 'year'],
          properties: {
            day: { type: 'integer', minimum: 1, maximum: 31, example: 15 },
            month: { type: 'integer', minimum: 1, maximum: 12, example: 6 },
            year: { type: 'integer', minimum: 1900, example: 1990 },
          },
        },
        BusinessProfile: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Example Corporation' },
            url: { type: 'string', format: 'uri', example: 'https://example.com' },
            product_description: { type: 'string', example: 'Software development services' },
            support_email: { type: 'string', format: 'email', example: 'support@example.com' },
            support_phone: { type: 'string', example: '+1-555-123-4567' },
            support_url: { type: 'string', format: 'uri', example: 'https://example.com/support' },
            estimated_worker_count: { type: 'integer', minimum: 0, example: 50 },
            mcc: { type: 'string', example: '5734' },
            minority_owned_business_designation: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['lgbtqi_owned_business', 'minority_owned_business', 'none_of_these_apply', 'prefer_not_to_answer', 'women_owned_business'],
              },
            },
          },
        },
        Company: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Example Corporation' },
            address: { $ref: '#/components/schemas/Address' },
            phone: { type: 'string', example: '+1-555-123-4567' },
            tax_id: { type: 'string', example: '12-3456789' },
            vat_id: { type: 'string', example: 'VAT123456789' },
            registration_number: { type: 'string', example: 'REG123456' },
            structure: { type: 'string', example: 'corporation' },
          },
        },
        Individual: {
          type: 'object',
          properties: {
            first_name: { type: 'string', example: 'John' },
            last_name: { type: 'string', example: 'Doe' },
            email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
            phone: { type: 'string', example: '+1-555-987-6543' },
            address: { $ref: '#/components/schemas/Address' },
            dob: { $ref: '#/components/schemas/DateOfBirth' },
            id_number: { type: 'string', example: '123-45-6789' },
            ssn_last_4: { type: 'string', pattern: '^\\d{4}$', example: '6789' },
          },
        },
        Capabilities: {
          type: 'object',
          properties: {
            card_payments: {
              type: 'object',
              properties: {
                requested: { type: 'boolean', example: true },
              },
            },
            transfers: {
              type: 'object',
              properties: {
                requested: { type: 'boolean', example: true },
              },
            },
            bank_transfer_payments: {
              type: 'object',
              properties: {
                requested: { type: 'boolean', example: true },
              },
            },
          },
        },
        Controller: {
          type: 'object',
          properties: {
            fees: {
              type: 'object',
              properties: {
                payer: { type: 'string', enum: ['account', 'application'], example: 'application' },
              },
            },
            losses: {
              type: 'object',
              properties: {
                payments: { type: 'string', enum: ['application', 'stripe'], example: 'application' },
              },
            },
            stripe_dashboard: {
              type: 'object',
              properties: {
                type: { type: 'string', enum: ['express', 'full', 'none'], example: 'express' },
              },
            },
          },
        },
        CreateAccountRequest: {
          type: 'object',
          properties: {
            country: { type: 'string', example: 'US', description: 'ISO 3166-1 alpha-2 country code' },
            email: { type: 'string', format: 'email', example: 'merchant@example.com' },
            business_type: { 
              type: 'string', 
              enum: ['company', 'government_entity', 'individual', 'non_profit'],
              example: 'company'
            },
            type: { 
              type: 'string', 
              enum: ['custom', 'express', 'standard'],
              example: 'express'
            },
            business_profile: { $ref: '#/components/schemas/BusinessProfile' },
            company: { $ref: '#/components/schemas/Company' },
            individual: { $ref: '#/components/schemas/Individual' },
            capabilities: { $ref: '#/components/schemas/Capabilities' },
            controller: { $ref: '#/components/schemas/Controller' },
            default_currency: { type: 'string', example: 'usd', description: 'Three-letter ISO currency code' },
            external_account: { type: 'string', example: 'ba_1234567890', description: 'Bank account or card token' },
            metadata: { 
              type: 'object', 
              additionalProperties: { type: 'string' },
              example: { 'custom_id': '12345', 'description': 'Custom account' }
            },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: { type: 'object' },
            message: { type: 'string', example: 'Account created successfully' },
            error: {
              type: 'object',
              properties: {
                error: {
                  type: 'object',
                  properties: {
                    type: { type: 'string', example: 'invalid_request_error' },
                    code: { type: 'string', example: 'parameter_invalid_empty' },
                    message: { type: 'string', example: 'The country parameter is required.' },
                    param: { type: 'string', example: 'country' },
                  },
                },
              },
            },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: {
              type: 'object',
              properties: {
                type: { type: 'string', example: 'validation_error' },
                message: { type: 'string', example: 'Validation failed' },
                details: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      field: { type: 'string', example: 'country' },
                      message: { type: 'string', example: '"country" is required' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Accounts',
        description: 'Stripe account management operations',
      },
      {
        name: 'Payments',
        description: 'Payment intent operations',
      },
      {
        name: 'Customers',
        description: 'Customer management operations',
      },
      {
        name: 'Keys',
        description: 'Ephemeral key operations',
      },
    ],
  },
  apis: ['./dist/routes/*.js', './dist/controllers/*.js'], // paths to files containing OpenAPI definitions
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  // Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Stripe Account API Documentation',
  }));

  // JSON endpoint
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
};
