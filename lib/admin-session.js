import 'server-only';
import { createHash, timingSafeEqual } from 'node:crypto';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const cookieName = 'lojanias_admin';
const lifetime = 60 * 60 * 8;
const issuer = 'lojanias-editor';

function credentials() {
  const digest = process.env.LOJANIAS_ADMIN_PASSWORD_HASH;
  const secret = process.env.LOJANIAS_ADMIN_SESSION_SECRET;
  if (!/^[a-f0-9]{64}$/.test(digest || '') || !secret || secret.length < 40) return null;
  return { digest: Buffer.from(digest, 'hex'), key: new TextEncoder().encode(secret) };
}

export async function signIn(password) {
  const config = credentials();
  if (!config || typeof password !== 'string' || password.length > 128) return false;
  const digest = createHash('sha256').update(password).digest();
  if (!timingSafeEqual(digest, config.digest)) return false;
  const token = await new SignJWT({}).setProtectedHeader({ alg: 'HS256' })
    .setIssuer(issuer).setAudience('lojanias-admin').setSubject('owner')
    .setIssuedAt().setExpirationTime(`${lifetime}s`).sign(config.key);
  (await cookies()).set(cookieName, token, {
    httpOnly: true, secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', path: '/admin', maxAge: lifetime
  });
  return true;
}

export async function hasAdminSession() {
  const config = credentials();
  const token = (await cookies()).get(cookieName)?.value;
  if (!config || !token) return false;
  try {
    const { payload } = await jwtVerify(token, config.key, {
      algorithms: ['HS256'], issuer, audience: 'lojanias-admin', maxTokenAge: lifetime
    });
    return payload.sub === 'owner';
  } catch {
    return false;
  }
}

export async function signOut() {
  (await cookies()).set(cookieName, '', {
    httpOnly: true, secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', path: '/admin', maxAge: 0
  });
}
