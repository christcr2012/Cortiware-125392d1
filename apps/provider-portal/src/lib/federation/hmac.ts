/**
 * Federation HMAC signature helpers.
 *
 * The federation unit tests (tests/unit/federation.hmac.test.ts) were written
 * against this module; it is implemented here from the federation signing
 * primitives in ./signature (buildStringToSign + hmacSHA256 + constantTimeEq).
 * verifySignature checks the signature only - timestamp freshness is the
 * verify middleware's job, as the test suite itself notes.
 */
import { hmacSHA256, constantTimeEq, buildStringToSign } from './signature';

export function generateSignature(
  method: string,
  path: string,
  timestamp: string,
  secret: string
): string {
  return `sha256:${hmacSHA256(secret, buildStringToSign(method, path, timestamp))}`;
}

export function verifySignature(
  method: string,
  path: string,
  timestamp: string,
  signature: string,
  secret: string
): boolean {
  if (!signature || !signature.startsWith('sha256:')) {
    return false;
  }
  const expected = generateSignature(method, path, timestamp, secret);
  return constantTimeEq(expected, signature);
}
