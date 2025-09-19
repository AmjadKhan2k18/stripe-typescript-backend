#!/bin/bash

# Stripe Account Creation API - cURL Examples
# Make sure to set your API_BASE_URL and STRIPE_SECRET_KEY

API_BASE_URL=${API_BASE_URL:-"http://localhost:3000"}
STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY:-"your_stripe_secret_key_here"}

echo "🎯 Stripe Account Creation API - cURL Examples"
echo "=============================================="
echo "API Base URL: $API_BASE_URL"
echo ""

# Health Check
echo "🏥 Health Check"
echo "curl -X GET $API_BASE_URL/health"
curl -X GET "$API_BASE_URL/health" | jq '.'
echo ""

# Create Express Account
echo "🚀 Create Express Account"
echo "curl -X POST $API_BASE_URL/api/accounts \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"country\": \"US\","
echo "    \"email\": \"express.merchant@example.com\","
echo "    \"controller\": {"
echo "      \"fees\": {\"payer\": \"application\"},"
echo "      \"losses\": {\"payments\": \"application\"},"
echo "      \"stripe_dashboard\": {\"type\": \"express\"}"
echo "    }"
echo "  }'"

EXPRESS_RESPONSE=$(curl -s -X POST "$API_BASE_URL/api/accounts" \
  -H "Content-Type: application/json" \
  -d '{
    "country": "US",
    "email": "express.merchant@example.com",
    "controller": {
      "fees": {"payer": "application"},
      "losses": {"payments": "application"},
      "stripe_dashboard": {"type": "express"}
    }
  }')

echo "$EXPRESS_RESPONSE" | jq '.'
EXPRESS_ACCOUNT_ID=$(echo "$EXPRESS_RESPONSE" | jq -r '.data.id // empty')
echo ""

# Create Custom Account
echo "🏢 Create Custom Account"
echo "curl -X POST $API_BASE_URL/api/accounts \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"type\": \"custom\","
echo "    \"country\": \"US\","
echo "    \"email\": \"custom.business@example.com\","
echo "    \"business_type\": \"company\","
echo "    \"company\": {"
echo "      \"name\": \"Example Corporation\","
echo "      \"address\": {"
echo "        \"line1\": \"123 Business Street\","
echo "        \"city\": \"San Francisco\","
echo "        \"state\": \"CA\","
echo "        \"postal_code\": \"94105\","
echo "        \"country\": \"US\""
echo "      }"
echo "    },"
echo "    \"capabilities\": {"
echo "      \"card_payments\": {\"requested\": true},"
echo "      \"transfers\": {\"requested\": true}"
echo "    }"
echo "  }'"

CUSTOM_RESPONSE=$(curl -s -X POST "$API_BASE_URL/api/accounts" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "custom",
    "country": "US",
    "email": "custom.business@example.com",
    "business_type": "company",
    "company": {
      "name": "Example Corporation",
      "address": {
        "line1": "123 Business Street",
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
  }')

echo "$CUSTOM_RESPONSE" | jq '.'
CUSTOM_ACCOUNT_ID=$(echo "$CUSTOM_RESPONSE" | jq -r '.data.id // empty')
echo ""

# Create Individual Account
echo "👤 Create Individual Account"
echo "curl -X POST $API_BASE_URL/api/accounts \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"type\": \"custom\","
echo "    \"country\": \"US\","
echo "    \"email\": \"individual.freelancer@example.com\","
echo "    \"business_type\": \"individual\","
echo "    \"individual\": {"
echo "      \"first_name\": \"John\","
echo "      \"last_name\": \"Doe\","
echo "      \"email\": \"individual.freelancer@example.com\","
echo "      \"phone\": \"+1-555-987-6543\","
echo "      \"address\": {"
echo "        \"line1\": \"456 Personal Ave\","
echo "        \"city\": \"New York\","
echo "        \"state\": \"NY\","
echo "        \"postal_code\": \"10001\","
echo "        \"country\": \"US\""
echo "      },"
echo "      \"dob\": {"
echo "        \"day\": 15,"
echo "        \"month\": 6,"
echo "        \"year\": 1990"
echo "      }"
echo "    },"
echo "    \"capabilities\": {"
echo "      \"card_payments\": {\"requested\": true}"
echo "    }"
echo "  }'"

INDIVIDUAL_RESPONSE=$(curl -s -X POST "$API_BASE_URL/api/accounts" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "custom",
    "country": "US",
    "email": "individual.freelancer@example.com",
    "business_type": "individual",
    "individual": {
      "first_name": "John",
      "last_name": "Doe",
      "email": "individual.freelancer@example.com",
      "phone": "+1-555-987-6543",
      "address": {
        "line1": "456 Personal Ave",
        "city": "New York",
        "state": "NY",
        "postal_code": "10001",
        "country": "US"
      },
      "dob": {
        "day": 15,
        "month": 6,
        "year": 1990
      }
    },
    "capabilities": {
      "card_payments": {"requested": true}
    }
  }')

echo "$INDIVIDUAL_RESPONSE" | jq '.'
INDIVIDUAL_ACCOUNT_ID=$(echo "$INDIVIDUAL_RESPONSE" | jq -r '.data.id // empty')
echo ""

# Get Account Details (if we have an account ID)
if [ ! -z "$EXPRESS_ACCOUNT_ID" ] && [ "$EXPRESS_ACCOUNT_ID" != "null" ]; then
  echo "📋 Get Express Account Details"
  echo "curl -X GET $API_BASE_URL/api/accounts/$EXPRESS_ACCOUNT_ID"
  curl -s -X GET "$API_BASE_URL/api/accounts/$EXPRESS_ACCOUNT_ID" | jq '.'
  echo ""
fi

# List All Accounts
echo "📝 List All Accounts"
echo "curl -X GET $API_BASE_URL/api/accounts?limit=10"
curl -s -X GET "$API_BASE_URL/api/accounts?limit=10" | jq '.'
echo ""

# API Documentation
echo "📚 API Documentation"
echo "curl -X GET $API_BASE_URL/api/docs"
curl -s -X GET "$API_BASE_URL/api/docs" | jq '.endpoints'
echo ""

echo "✨ Examples completed!"
echo ""
echo "To run the API server:"
echo "1. Set your STRIPE_SECRET_KEY in .env file"
echo "2. Run: npm install"
echo "3. Run: npm run dev"
echo "4. Visit: $API_BASE_URL/api/docs for full documentation"
