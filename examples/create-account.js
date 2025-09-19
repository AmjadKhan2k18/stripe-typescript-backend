#!/usr/bin/env node

/**
 * Example script demonstrating how to use the Stripe Account Creation API
 * 
 * This script shows how to create different types of Stripe accounts
 * using the API endpoints.
 */

const https = require('https');

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const API_KEY = process.env.STRIPE_SECRET_KEY;

if (!API_KEY) {
  console.error('Error: STRIPE_SECRET_KEY environment variable is required');
  process.exit(1);
}

/**
 * Make HTTP request
 */
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, API_BASE_URL);
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    };

    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

/**
 * Create an Express account
 */
async function createExpressAccount() {
  console.log('\n🚀 Creating Express Account...');
  
  const accountData = {
    country: 'US',
    email: 'express.merchant@example.com',
    controller: {
      fees: { payer: 'application' },
      losses: { payments: 'application' },
      stripe_dashboard: { type: 'express' }
    }
  };

  try {
    const response = await makeRequest('POST', '/api/accounts', accountData);
    
    if (response.status === 201 && response.data.success) {
      console.log('✅ Express account created successfully!');
      console.log(`Account ID: ${response.data.data.id}`);
      console.log(`Email: ${response.data.data.email}`);
      console.log(`Country: ${response.data.data.country}`);
      console.log(`Type: ${response.data.data.type}`);
      return response.data.data.id;
    } else {
      console.error('❌ Failed to create Express account:', response.data);
    }
  } catch (error) {
    console.error('❌ Error creating Express account:', error.message);
  }
}

/**
 * Create a Custom account
 */
async function createCustomAccount() {
  console.log('\n🏢 Creating Custom Account...');
  
  const accountData = {
    type: 'custom',
    country: 'US',
    email: 'custom.business@example.com',
    business_type: 'company',
    company: {
      name: 'Example Corporation',
      address: {
        line1: '123 Business Street',
        city: 'San Francisco',
        state: 'CA',
        postal_code: '94105',
        country: 'US'
      },
      phone: '+1-555-123-4567'
    },
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true }
    },
    business_profile: {
      name: 'Example Corp',
      url: 'https://example.com',
      product_description: 'Software development services'
    }
  };

  try {
    const response = await makeRequest('POST', '/api/accounts', accountData);
    
    if (response.status === 201 && response.data.success) {
      console.log('✅ Custom account created successfully!');
      console.log(`Account ID: ${response.data.data.id}`);
      console.log(`Business Name: ${response.data.data.company?.name || 'N/A'}`);
      console.log(`Business Type: ${response.data.data.business_type}`);
      return response.data.data.id;
    } else {
      console.error('❌ Failed to create Custom account:', response.data);
    }
  } catch (error) {
    console.error('❌ Error creating Custom account:', error.message);
  }
}

/**
 * Create an Individual account
 */
async function createIndividualAccount() {
  console.log('\n👤 Creating Individual Account...');
  
  const accountData = {
    type: 'custom',
    country: 'US',
    email: 'individual.freelancer@example.com',
    business_type: 'individual',
    individual: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'individual.freelancer@example.com',
      phone: '+1-555-987-6543',
      address: {
        line1: '456 Personal Ave',
        city: 'New York',
        state: 'NY',
        postal_code: '10001',
        country: 'US'
      },
      dob: {
        day: 15,
        month: 6,
        year: 1990
      }
    },
    capabilities: {
      card_payments: { requested: true }
    }
  };

  try {
    const response = await makeRequest('POST', '/api/accounts', accountData);
    
    if (response.status === 201 && response.data.success) {
      console.log('✅ Individual account created successfully!');
      console.log(`Account ID: ${response.data.data.id}`);
      console.log(`Individual: ${response.data.data.individual?.first_name} ${response.data.data.individual?.last_name}`);
      console.log(`Business Type: ${response.data.data.business_type}`);
      return response.data.data.id;
    } else {
      console.error('❌ Failed to create Individual account:', response.data);
    }
  } catch (error) {
    console.error('❌ Error creating Individual account:', error.message);
  }
}

/**
 * Get account details
 */
async function getAccount(accountId) {
  console.log(`\n📋 Getting account details for: ${accountId}`);
  
  try {
    const response = await makeRequest('GET', `/api/accounts/${accountId}`);
    
    if (response.status === 200 && response.data.success) {
      console.log('✅ Account details retrieved successfully!');
      console.log(`Account ID: ${response.data.data.id}`);
      console.log(`Email: ${response.data.data.email}`);
      console.log(`Country: ${response.data.data.country}`);
      console.log(`Charges Enabled: ${response.data.data.charges_enabled}`);
      console.log(`Payouts Enabled: ${response.data.data.payouts_enabled}`);
      console.log(`Details Submitted: ${response.data.data.details_submitted}`);
    } else {
      console.error('❌ Failed to get account details:', response.data);
    }
  } catch (error) {
    console.error('❌ Error getting account details:', error.message);
  }
}

/**
 * List all accounts
 */
async function listAccounts() {
  console.log('\n📝 Listing all accounts...');
  
  try {
    const response = await makeRequest('GET', '/api/accounts?limit=10');
    
    if (response.status === 200 && response.data.success) {
      console.log('✅ Accounts listed successfully!');
      console.log(`Found ${response.data.data.data.length} accounts:`);
      
      response.data.data.data.forEach((account, index) => {
        console.log(`${index + 1}. ${account.id} - ${account.email} (${account.country})`);
      });
    } else {
      console.error('❌ Failed to list accounts:', response.data);
    }
  } catch (error) {
    console.error('❌ Error listing accounts:', error.message);
  }
}

/**
 * Health check
 */
async function healthCheck() {
  console.log('\n🏥 Checking API health...');
  
  try {
    const response = await makeRequest('GET', '/health');
    
    if (response.status === 200 && response.data.success) {
      console.log('✅ API is healthy!');
      console.log(`Status: ${response.data.data.status}`);
      console.log(`Stripe API Key Valid: ${response.data.data.stripe.apiKeyValid}`);
    } else {
      console.error('❌ API health check failed:', response.data);
    }
  } catch (error) {
    console.error('❌ Error checking API health:', error.message);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🎯 Stripe Account Creation API Examples');
  console.log('=====================================');
  
  // Health check first
  await healthCheck();
  
  // Create different types of accounts
  const expressAccountId = await createExpressAccount();
  const customAccountId = await createCustomAccount();
  const individualAccountId = await createIndividualAccount();
  
  // Get details for created accounts
  if (expressAccountId) {
    await getAccount(expressAccountId);
  }
  
  if (customAccountId) {
    await getAccount(customAccountId);
  }
  
  if (individualAccountId) {
    await getAccount(individualAccountId);
  }
  
  // List all accounts
  await listAccounts();
  
  console.log('\n✨ Example completed!');
  console.log('\nTo run the API server:');
  console.log('1. Set your STRIPE_SECRET_KEY in .env file');
  console.log('2. Run: npm install');
  console.log('3. Run: npm run dev');
  console.log('4. Visit: http://localhost:3000/api/docs for full documentation');
}

// Run the examples
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  createExpressAccount,
  createCustomAccount,
  createIndividualAccount,
  getAccount,
  listAccounts,
  healthCheck
};
