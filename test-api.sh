#!/bin/bash

# API Test Script
# This script tests the API endpoints to make sure everything is working

API_BASE_URL="http://localhost:3000"

echo "🧪 Testing Stripe Account API"
echo "============================="

# Test 1: Health Check
echo "1. Testing health check..."
HEALTH_RESPONSE=$(curl -s -w "%{http_code}" -o /tmp/health_response.json "$API_BASE_URL/health")
HEALTH_CODE="${HEALTH_RESPONSE: -3}"

if [ "$HEALTH_CODE" = "200" ]; then
    echo "✅ Health check passed"
    echo "   Response: $(cat /tmp/health_response.json | jq -r '.message // "OK"')"
else
    echo "❌ Health check failed (HTTP $HEALTH_CODE)"
    echo "   Make sure the server is running: npm run dev"
    exit 1
fi

echo ""

# Test 2: API Root
echo "2. Testing API root..."
ROOT_RESPONSE=$(curl -s -w "%{http_code}" -o /tmp/root_response.json "$API_BASE_URL/")
ROOT_CODE="${ROOT_RESPONSE: -3}"

if [ "$ROOT_CODE" = "200" ]; then
    echo "✅ API root accessible"
    echo "   Message: $(cat /tmp/root_response.json | jq -r '.message // "OK"')"
else
    echo "❌ API root failed (HTTP $ROOT_CODE)"
fi

echo ""

# Test 3: Swagger Documentation
echo "3. Testing Swagger documentation..."
SWAGGER_RESPONSE=$(curl -s -w "%{http_code}" -o /tmp/swagger_response.json "$API_BASE_URL/api-docs.json")
SWAGGER_CODE="${SWAGGER_RESPONSE: -3}"

if [ "$SWAGGER_CODE" = "200" ]; then
    echo "✅ Swagger documentation accessible"
    echo "   Title: $(cat /tmp/swagger_response.json | jq -r '.info.title // "API Docs"')"
else
    echo "❌ Swagger documentation failed (HTTP $SWAGGER_CODE)"
fi

echo ""

# Test 4: List Accounts (should work even with no accounts)
echo "4. Testing list accounts..."
LIST_RESPONSE=$(curl -s -w "%{http_code}" -o /tmp/list_response.json "$API_BASE_URL/api/accounts")
LIST_CODE="${LIST_RESPONSE: -3}"

if [ "$LIST_CODE" = "200" ]; then
    echo "✅ List accounts endpoint working"
    echo "   Success: $(cat /tmp/list_response.json | jq -r '.success // false')"
else
    echo "❌ List accounts failed (HTTP $LIST_CODE)"
    echo "   This might be due to missing Stripe API keys"
fi

echo ""

# Summary
echo "📊 Test Summary"
echo "==============="
echo "Health Check: $([ "$HEALTH_CODE" = "200" ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "API Root: $([ "$ROOT_CODE" = "200" ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "Swagger Docs: $([ "$SWAGGER_CODE" = "200" ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "List Accounts: $([ "$LIST_CODE" = "200" ] && echo "✅ PASS" || echo "❌ FAIL")"

echo ""
echo "🌐 Available URLs:"
echo "  Main API: $API_BASE_URL"
echo "  Swagger UI: $API_BASE_URL/api-docs"
echo "  Health Check: $API_BASE_URL/health"
echo "  API Documentation: $API_BASE_URL/api/docs"

echo ""
echo "🎯 Next Steps:"
echo "  1. Open http://localhost:3000/api-docs in your browser"
echo "  2. Try creating an account using the Swagger UI"
echo "  3. Check the examples in the /examples folder"

# Clean up temp files
rm -f /tmp/health_response.json /tmp/root_response.json /tmp/swagger_response.json /tmp/list_response.json
