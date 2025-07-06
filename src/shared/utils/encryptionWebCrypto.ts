/**
 * Utility functions for encryption, decryption, and hashing using Web Crypto API.
 */
const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * Generates a cryptographic key from a secret string using PBKDF2
 * @param secret - The secret string to derive the key from
 * @returns A Promise resolving to the derived CryptoKey
 */
const getKey = async (secret: string): Promise<CryptoKey> => {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('salt'),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
};

/**
 * Hashes a string using SHA-256
 * @param data - The string to hash
 * @returns A Promise resolving to the hexadecimal hash
 */
export const hashString = async (data: string): Promise<string> => {
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Encrypts data using AES-GCM
 * @param data - The data to encrypt
 * @param secret - The secret key for encryption
 * @returns A Promise resolving to the base64-encoded encrypted data (including IV)
 */
export const encryptData = async (data: string, secret: string): Promise<string> => {
  const key = await getKey(secret);
  const iv = crypto.getRandomValues(new Uint8Array(12)); // Random IV
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(data)
  );
  const encryptedArray = new Uint8Array(encrypted);
  const result = new Uint8Array(iv.length + encryptedArray.length);
  result.set(iv);
  result.set(encryptedArray, iv.length);
  return btoa(String.fromCharCode(...result));
};

/**
 * Decrypts data encrypted with AES-GCM
 * @param encryptedData - The base64-encoded encrypted data (including IV)
 * @param secret - The secret key for decryption
 * @returns A Promise resolving to the decrypted string, or empty string on error
 */
export const decryptData = async (encryptedData: string, secret: string): Promise<string> => {
  try {
    const key = await getKey(secret);
    const data = Uint8Array.from(atob(encryptedData), (c) => c.charCodeAt(0));
    const iv = data.slice(0, 12);
    const encrypted = data.slice(12);
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encrypted
    );
    return decoder.decode(decrypted);
  } catch (error) {
    console.error('Error decrypting data:', error);
    return '';
  }
};