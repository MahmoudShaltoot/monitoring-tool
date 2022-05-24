import { EventEmitter } from 'events'

export class ChecksEventEmitter {
  private static instance: ChecksEventEmitter;
  private eventEmitter: EventEmitter = new EventEmitter();

  private constructor() {}

  static getInstance(): ChecksEventEmitter {
    if(!ChecksEventEmitter.instance) {
      ChecksEventEmitter.instance = new ChecksEventEmitter();
    }

    return ChecksEventEmitter.instance as ChecksEventEmitter;
  }

  subscribe(eventName: string, eventHandler) {
    this.eventEmitter.addListener(eventName, eventHandler);
    return true;
  }

  unsubscribe(eventName: string, eventHandler) {
    this.eventEmitter.removeListener(eventName, eventHandler);
    return true;
  }

  emit(eventName: string, payload) {
    this.eventEmitter.emit(eventName, payload);
    return true;
  }
}
