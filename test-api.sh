#!/bin/bash

echo "======================================"
echo "Portfolio-Web API Testing"
echo "======================================"
echo ""

BASE_URL="http://localhost:3000"

echo "1. Testing Waitlist API - Valid Request"
echo "----------------------------------------"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST $BASE_URL/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"courseId":"git-core","email":"test@example.com"}')
echo "Response: $RESPONSE"
echo ""

echo "2. Testing Waitlist API - Duplicate Email"
echo "----------------------------------------"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST $BASE_URL/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"courseId":"git-core","email":"test@example.com"}')
echo "Response: $RESPONSE"
echo ""

echo "3. Testing Waitlist API - Invalid Email"
echo "----------------------------------------"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST $BASE_URL/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"courseId":"git-core","email":"invalid-email"}')
echo "Response: $RESPONSE"
echo ""

echo "4. Testing Waitlist API - Missing Fields"
echo "----------------------------------------"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST $BASE_URL/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"courseId":"git-core"}')
echo "Response: $RESPONSE"
echo ""

echo "5. Testing Quiz API - Valid Request"
echo "----------------------------------------"
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST $BASE_URL/api/quiz \
  -H "Content-Type: application/json" \
  -d '{"codingExperience":"none","goal":"side-project","recommendedTrackId":"ai-beginner"}')
echo "Response: $RESPONSE"
echo ""

echo "======================================"
echo "API Testing Complete"
echo "======================================"
