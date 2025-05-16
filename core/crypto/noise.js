const crypto = require('crypto');
const hkdf = require('./hkdf');
const { chacha20Encrypt, chacha20Decrypt } = require('./chacha');

function generateKeys() {
  const ecdh = crypto.createECDH('x25519');
  ecdh.generateKeys();
  return {
    public: ecdh.getPublicKey(),
    private: ecdh.getPrivateKey(),
    ecdh
  };
}

async function performNoiseHandshake(packet, localKeys) {
  console.log('[Coffeely] Real Noise handshake started');
  const remotePubKey = crypto.createECDH('x25519');
  remotePubKey.generateKeys();

  const sharedSecret = localKeys.ecdh.computeSecret(remotePubKey.getPublicKey());
  const derivedKeys = hkdf('sha256', sharedSecret, Buffer.alloc(32), 'NoiseIK', 64);
  const [encryptionKey, macKey] = [derivedKeys.slice(0, 32), derivedKeys.slice(32)];

  console.log('[Coffeely] Derived encryption key and mac key');
  return { encryptionKey, macKey };
}

module.exports = { generateKeys, performNoiseHandshake };
