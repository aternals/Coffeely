const WebSocket = require('ws');
const { generateKeys, performNoiseHandshake } = require('./crypto/noise');
const { encodeProtobuf, decodeProtobuf } = require('./proto');

class PairingClient {
  constructor() {
    this.ws = null;
    this.keys = generateKeys();
  }

  async connect() {
    this.ws = new WebSocket('wss://web.whatsapp.com/ws/chat');

    this.ws.on('open', () => {
      console.log('[Coffeely] WebSocket connected');
      this.sendInit();
    });

    this.ws.on('message', async (data) => {
      const packet = decodeProtobuf(data);

      if (packet.pairDevice) {
        const result = await performNoiseHandshake(packet, this.keys);
        console.log('[Coffeely] Paired successfully!');
      }
    });

    this.ws.on('close', () => console.log('[Coffeely] Disconnected'));
  }

  sendInit() {
    const initPacket = {
      clientHello: {
        version: '2.2412.54',
        publicKey: this.keys.public,
        deviceProps: {
          os: 'Linux',
          platformType: 'NODE',
          requireFullSync: true,
        }
      }
    };
    const payload = encodeProtobuf(initPacket);
    this.ws.send(payload);
  }
}

module.exports = PairingClient;
