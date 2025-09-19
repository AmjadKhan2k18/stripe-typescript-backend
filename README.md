# Stripe Account Creation API

A comprehensive TypeScript API for creating and managing Stripe accounts using the Stripe Connect platform. This API provides a clean, type-safe interface for all Stripe account creation parameters and operations.

## Features

- ✅ **Complete TypeScript Support** - Full type definitions for all Stripe account parameters
- ✅ **Comprehensive Validation** - Joi-based validation for all input parameters
- ✅ **Error Handling** - Proper error handling with detailed error responses
- ✅ **Logging** - Winston-based logging with file and console output
- ✅ **Security** - Helmet security middleware and CORS configuration
- ✅ **Interactive Swagger UI** - Beautiful, interactive API documentation
- ✅ **Health Checks** - Health check endpoint with Stripe API validation
- ✅ **Easy Setup** - Automated setup scripts for beginners

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Stripe account with API keys

### 🎯 Super Quick Start (Recommended for Beginners)

1. **Install Node.js** (if you don't have it):
```bash
./install-node.sh
```

2. **Run the quick start script**:
```bash
./quick-start.sh
```

3. **Open Swagger UI** in your browser:
```
http://localhost:3000/api-docs
```

That's it! The script will guide you through everything.

### 📋 Manual Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
```bash
cp env.example .env
```

3. **Configure your `.env` file**:
```env
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
```

4. **Build and start the application**:
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

### 🧪 Test the API

Run the test script to verify everything is working:
```bash
./test-api.sh
```

### 📚 Access Points

- **Main API**: `http://localhost:3000`
- **Swagger UI**: `http://localhost:3000/api-docs` ⭐ **Start here!**
- **Health Check**: `http://localhost:3000/health`
- **API Documentation**: `http://localhost:3000/api/docs`

## API Endpoints

### Create Account
**POST** `/api/accounts`

Creates a new Stripe account with the specified parameters.

#### Example Request
```bash
curl -X POST http://localhost:3000/api/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "country": "US",
    "email": "jenny.rosen@example.com",
    "controller": {
      "fees": {"payer": "application"},
      "losses": {"payments": "application"},
      "stripe_dashboard": {"type": "express"}
    }
  }'
```

#### Example Response
```json
{
  "success": true,
  "data": {
    "id": "acct_1Nv0FGQ9RKHgCVdK",
    "object": "account",
    "business_profile": {...},
    "business_type": null,
    "capabilities": {},
    "charges_enabled": false,
    "controller": {...},
    "country": "US",
    "created": 1695830751,
    "default_currency": "usd",
    "details_submitted": false,
    "email": "jenny.rosen@example.com",
    ...
  },
  "message": "Account created successfully"
}
```

### Get Account
**GET** `/api/accounts/:accountId`

Retrieves a specific Stripe account by ID.

#### Example Request
```bash
curl http://localhost:3000/api/accounts/acct_1Nv0FGQ9RKHgCVdK
```

### Update Account
**PUT** `/api/accounts/:accountId`

Updates an existing Stripe account.

#### Example Request
```bash
curl -X PUT http://localhost:3000/api/accounts/acct_1Nv0FGQ9RKHgCVdK \
  -H "Content-Type: application/json" \
  -d '{
    "business_type": "company",
    "company": {
      "name": "Updated Company Name"
    }
  }'
```

### List Accounts
**GET** `/api/accounts`

Lists all Stripe accounts with optional limit.

#### Example Request
```bash
curl "http://localhost:3000/api/accounts?limit=20"
```

### Health Check
**GET** `/health`

Checks the health of the API and Stripe connection.

#### Example Request
```bash
curl http://localhost:3000/health
```

### API Documentation
**GET** `/api/docs`

Returns comprehensive API documentation with examples.

#### Example Request
```bash
curl http://localhost:3000/api/docs
```

## 📚 Swagger Documentation

The API includes **interactive Swagger documentation** that makes it easy to explore and test all endpoints.

### Access Swagger UI
Open your browser and go to:
```
http://localhost:3000/api-docs
```

### What You Can Do with Swagger

1. **🔍 Browse All Endpoints** - See every available API endpoint
2. **📖 Read Documentation** - Detailed descriptions and examples
3. **🧪 Test Live API Calls** - Make real requests directly in the browser
4. **📋 View Schemas** - Understand the data structures
5. **💡 See Examples** - Pre-built examples for different account types
6. **✅ Validate Requests** - Built-in validation and error handling

### Swagger Features

- **Interactive Testing** - Click "Try it out" to test any endpoint
- **Example Requests** - Pre-filled examples for Express, Custom, and Individual accounts
- **Response Examples** - See what responses look like
- **Schema Validation** - Understand required and optional fields
- **Error Documentation** - See all possible error responses

### Quick Test with Swagger

1. Go to `http://localhost:3000/api-docs`
2. Find "POST /api/accounts"
3. Click "Try it out"
4. Use the "Express Account" example
5. Click "Execute"
6. See your new account created!

This is the **easiest way** to explore the API and understand how it works.

## Account Types

### Express Account
```json
{
  "country": "US",
  "email": "merchant@example.com",
  "controller": {
    "fees": {"payer": "application"},
    "losses": {"payments": "application"},
    "stripe_dashboard": {"type": "express"}
  }
}
```

### Custom Account
```json
{
  "type": "custom",
  "country": "US",
  "email": "business@example.com",
  "business_type": "company",
  "company": {
    "name": "Example Corp",
    "address": {
      "line1": "123 Main St",
      "city": "San Francisco",
      "state": "CA",
      "postal_code": "94105",
      "country": "US"
    }
  },
  "capabilities": {
    "card_payments": {"requested": true},
    "transfers": {"requested": true}
  }
}
```

### Standard Account
```json
{
  "type": "standard",
  "country": "US",
  "email": "standard@example.com"
}
```

## Supported Parameters

The API supports all Stripe account creation parameters including:

### Business Information
- `business_profile` - Business information and settings
- `business_type` - Type of business (company, individual, etc.)
- `company` - Company-specific information
- `individual` - Individual-specific information

### Account Configuration
- `capabilities` - Payment capabilities to enable
- `controller` - Account controller settings
- `settings` - Account-specific settings
- `type` - Account type (custom, express, standard)

### Verification & Compliance
- `documents` - Required verification documents
- `tos_acceptance` - Terms of service acceptance
- `metadata` - Custom key-value pairs

### Financial
- `external_account` - Bank account or card for payouts
- `default_currency` - Default currency for the account
- `country` - Account country

## Error Handling

The API provides detailed error responses following Stripe's error format:

```json
{
  "success": false,
  "error": {
    "error": {
      "type": "invalid_request_error",
      "code": "parameter_invalid_empty",
      "message": "The country parameter is required.",
      "param": "country"
    }
  }
}
```

## Validation

All input parameters are validated using Joi schemas with:
- Type checking
- Required field validation
- Format validation (emails, URLs, dates, etc.)
- Enum value validation
- Nested object validation

## Logging

The API uses Winston for comprehensive logging:
- Request/response logging
- Error logging with stack traces
- Structured JSON logging
- File rotation and size limits
- Console output in development

## Development

### Scripts
```bash
npm run dev      # Start development server with hot reload
npm run build    # Build TypeScript to JavaScript
npm start        # Start production server
npm test         # Run tests
npm run lint     # Run ESLint
npm run lint:fix # Fix ESLint issues
```

### Project Structure
```
src/
├── controllers/     # Request handlers
├── middleware/      # Express middleware
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── app.ts           # Express app configuration
└── index.ts         # Application entry point
```

## Security

- Helmet middleware for security headers
- CORS configuration
- Input validation and sanitization
- Environment variable protection
- Error message sanitization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and tests
6. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
1. Check the API documentation at `/api/docs`
2. Review the Stripe documentation
3. Check the logs for detailed error information
4. Open an issue in the repository
