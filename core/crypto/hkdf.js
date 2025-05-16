const crypto = require('crypto');

function hkdf(hashAlg, ikm, salt, info, length) {
  const prk = crypto.createHmac(hashAlg, salt).update(ikm).digest();
  let t = Buffer.alloc(0);
  let okm = Buffer.alloc(0);
  let i = 0;
  while (okm.length < length) {
    i++;
    t = crypto.createHmac(hashAlg, prk)
      .update(Buffer.concat([t, Buffer.from(info), Buffer.from([i])]))
      .digest();
    okm = Buffer.concat([okm, t]);
  }
  return okm.slice(0, length);
}

module.exports = hkdf;
