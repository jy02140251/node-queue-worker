const EventEmitter = require('events');

class BaseService extends EventEmitter {
  constructor(options = {}) {
    super();
    this.options = options;
    this.isRunning = false;
  }

  async start() {
    if (this.isRunning) return;
    await this.onStart();
    this.isRunning = true;
    this.emit('started');
  }

  async stop() {
    if (!this.isRunning) return;
    await this.onStop();
    this.isRunning = false;
    this.emit('stopped');
  }

  async onStart() {}
  async onStop() {}
}

class ServiceManager {
  constructor() {
    this.services = new Map();
  }

  register(name, service) {
    this.services.set(name, service);
  }

  async startAll() {
    for (const [name, service] of this.services) {
      await service.start();
      console.log('Started:', name);
    }
  }

  async stopAll() {
    for (const [name, service] of this.services) {
      await service.stop();
    }
  }
}

module.exports = { BaseService, ServiceManager };