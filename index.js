const PairingClient = require('./core/PairingClient');

class Coffeely {
  constructor() {
    this.pairClient = new PairingClient();
  }

  start() {
    this.pairClient.connect();
  }
}

module.exports = Coffeely;
