import { CheckDto } from "../../../dto/check.dto";
import { ChecksEvents } from "../../../events/events";
import { ChecksEventEmitter } from "../../../events/events.emitter";

export class SlackNotifier {
  private eventEmitter: ChecksEventEmitter;

  constructor() {
    this.eventEmitter = ChecksEventEmitter.getInstance();
    this.eventEmitter.subscribe(ChecksEvents.NEW_ALERT, (payload) => { this.sendSlackNotification(payload) })
  }

  sendSlackNotification(check: CheckDto) {
    // TODO
  }
}