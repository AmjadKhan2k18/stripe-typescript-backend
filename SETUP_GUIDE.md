# 🚀 Complete Setup Guide for Stripe Account API

This guide will help you set up and run the Stripe Account Creation API locally, even if you're new to backend development!

## 📋 Prerequisites

You'll need to install Node.js first. Here are the steps:

### Step 1: Install Node.js

#### Option A: Using Homebrew (Recommended for macOS)
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

#### Option B: Download from Official Website
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version (Long Term Support)
3. Run the installer and follow the instructions

#### Option C: Using Node Version Manager (nvm)
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart your terminal or run:
source ~/.bashrc

# Install and use Node.js
nvm install 18
nvm use 18
```

### Step 2: Verify Installation
Open your terminal and run:
```bash
node --version
npm --version
```

You should see version numbers like:
```
v18.17.0
9.6.7
```

## 🔧 Project Setup

### Step 1: Navigate to Project Directory
```bash
cd /Users/amjadkhan/Downloads/clean-architecture-main
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all the required packages. It might take a few minutes.

### Step 3: Set Up Environment Variables
```bash
# Copy the example environment file
cp env.example .env
```

Now edit the `.env` file with your Stripe API keys:
```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Server Configuration
PORT=3000
NODE_ENV=development

# Logging
LOG_LEVEL=info
```

### Step 4: Get Your Stripe API Keys

1. Go to [stripe.com](https://stripe.com) and create an account
2. Go to the [Dashboard](https://dashboard.stripe.com/test/apikeys)
3. Copy your **Secret key** (starts with `sk_test_`)
4. Copy your **Publishable key** (starts with `pk_test_`)
5. Paste them in your `.env` file

## 🚀 Running the Application

### Development Mode (Recommended for learning)
```bash
npm run dev
```

This will:
- Start the server with hot reload
- Show detailed error messages
- Restart automatically when you make changes

### Production Mode
```bash
npm run build
npm start
```

## 🌐 Accessing the API

Once the server is running, you can access:

### 1. **Swagger Documentation** (Interactive API Explorer)
Open your browser and go to:
```
http://localhost:3000/api-docs
```

This is the **BEST WAY** to explore the API! You can:
- See all available endpoints
- Try out API calls directly in the browser
- See example requests and responses
- Test different account types

### 2. **Health Check**
```
http://localhost:3000/health
```

### 3. **API Root**
```
http://localhost:3000/
```

### 4. **JSON Documentation**
```
http://localhost:3000/api-docs.json
```

## 🧪 Testing the API

### Using Swagger UI (Easiest)
1. Go to `http://localhost:3000/api-docs`
2. Click on any endpoint (like "POST /api/accounts")
3. Click "Try it out"
4. Fill in the example data
5. Click "Execute"

### Using cURL (Command Line)
```bash
# Health check
curl http://localhost:3000/health

# Create an Express account
curl -X POST http://localhost:3000/api/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "country": "US",
    "email": "test@example.com",
    "controller": {
      "fees": {"payer": "application"},
      "stripe_dashboard": {"type": "express"}
    }
  }'
```

### Using the Example Scripts
```bash
# Make the script executable
chmod +x examples/curl-examples.sh

# Run the examples
./examples/curl-examples.sh
```

## 📚 Understanding the API

### Account Types You Can Create

#### 1. **Express Account** (Easiest)
- Quick setup with Stripe-hosted onboarding
- Good for simple use cases
- Stripe handles most of the verification

#### 2. **Custom Account** (Most Control)
- Full control over the onboarding process
- Custom UI and verification flow
- More complex but more flexible

#### 3. **Standard Account** (Traditional)
- Standard Stripe account
- User goes through Stripe's standard flow

### Key Endpoints

- `POST /api/accounts` - Create a new account
- `GET /api/accounts/:id` - Get account details
- `PUT /api/accounts/:id` - Update account
- `GET /api/accounts` - List all accounts
- `GET /health` - Check if API is working

## 🔍 Exploring with Swagger

The Swagger UI is your best friend for learning! Here's what you can do:

1. **Browse Endpoints**: See all available API endpoints
2. **View Schemas**: Understand the data structures
3. **Try Examples**: Use pre-built examples for different account types
4. **Test Live**: Make real API calls and see responses
5. **Learn Parameters**: See what each parameter does

### Example: Creating Your First Account

1. Go to `http://localhost:3000/api-docs`
2. Find "POST /api/accounts"
3. Click "Try it out"
4. Use the "Express Account" example
5. Click "Execute"
6. See the response with your new account ID!

## 🐛 Troubleshooting

### Common Issues

#### "Node not found" or "npm not found"
- Make sure Node.js is installed correctly
- Try restarting your terminal
- Check your PATH environment variable

#### "Cannot find module" errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### "Stripe API key invalid" errors
- Check your `.env` file has the correct keys
- Make sure you're using test keys (start with `sk_test_`)
- Verify the keys in your Stripe dashboard

#### Port already in use
```bash
# Kill any process using port 3000
lsof -ti:3000 | xargs kill -9

# Or change the port in .env
PORT=3001
```

### Getting Help

1. **Check the logs**: The server shows detailed error messages
2. **Use Swagger**: The interactive docs help you understand the API
3. **Read the code**: The TypeScript code is well-commented
4. **Check Stripe docs**: [stripe.com/docs](https://stripe.com/docs)

## 🎯 Next Steps

Once you have the API running:

1. **Explore Swagger**: Try all the endpoints
2. **Create different account types**: Express, Custom, Individual
3. **Read the code**: Understand how it works
4. **Modify examples**: Try your own data
5. **Build something**: Create a simple frontend or integrate with your app

## 🎉 You're Ready!

You now have a fully functional Stripe Account Creation API running locally with:
- ✅ Interactive Swagger documentation
- ✅ All Stripe account types supported
- ✅ Comprehensive validation
- ✅ Error handling
- ✅ Logging
- ✅ Examples and guides

Happy coding! 🚀
