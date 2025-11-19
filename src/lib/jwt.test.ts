/**
 * Simple test utilities for JWT token handling
 * Run with: npx tsx src/lib/jwt.test.ts
 */

import { decodeToken, isTokenExpired, getTokenExpiration, willTokenExpireSoon } from './jwt';

// Test tokens (these are example tokens - replace with real ones for testing)
const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjIwMDAwMDAwMDB9.signature';
const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.signature';
const invalidToken = 'invalid.jwt.token';

export function testJWTUtilities() {
  console.log('Testing JWT utilities...\n');

  // Test decodeToken
  console.log('1. Testing decodeToken:');
  console.log('Valid token:', decodeToken(validToken));
  console.log('Expired token:', decodeToken(expiredToken));
  console.log('Invalid token:', decodeToken(invalidToken));
  console.log('');

  // Test isTokenExpired
  console.log('2. Testing isTokenExpired:');
  console.log('Valid token expired:', isTokenExpired(validToken));
  console.log('Expired token expired:', isTokenExpired(expiredToken));
  console.log('Invalid token expired:', isTokenExpired(invalidToken));
  console.log('');

  // Test getTokenExpiration
  console.log('3. Testing getTokenExpiration:');
  console.log('Valid token expiration:', getTokenExpiration(validToken));
  console.log('Expired token expiration:', getTokenExpiration(expiredToken));
  console.log('Invalid token expiration:', getTokenExpiration(invalidToken));
  console.log('');

  // Test willTokenExpireSoon
  console.log('4. Testing willTokenExpireSoon:');
  console.log('Valid token expiring soon (5 min):', willTokenExpireSoon(validToken, 300));
  console.log('Expired token expiring soon (5 min):', willTokenExpireSoon(expiredToken, 300));
  console.log('Invalid token expiring soon (5 min):', willTokenExpireSoon(invalidToken, 300));
  console.log('');

  console.log('JWT utilities test completed.');
}

// Only run tests if this file is executed directly
if (require.main === module) {
  testJWTUtilities();
}
