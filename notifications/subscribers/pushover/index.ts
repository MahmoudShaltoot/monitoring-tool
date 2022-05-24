import axios from "axios";
import { CheckDto } from "../../../dto/check.dto";
import { ChecksEvents } from "../../../events/events";
import { ChecksEventEmitter } from "../../../events/events.emitter";
import config from 'config';

export class PushOverNotifier {
  private eventEmitter: ChecksEventEmitter;

  constructor() {
    this.eventEmitter = ChecksEventEmitter.getInstance();
    this.eventEmitter.subscribe(ChecksEvents.NEW_ALERT, (payload) => { this.sendPushNotification(payload) })
  }

  sendPushNotification(check: CheckDto) {
    let message: string = config.get('pushover.message.body');
    message = message?.replace('%s', check.name);

    try {
      console.log('Sending alert notification for check "%s"', check.name);
      axios({
        method: 'post',
        url: config.get('pushover.api_url'),
        data: {
          user: config.get('pushover.group_key'),
          token: config.get('pushover.app_token'),
          title: config.get('pushover.message.title'),
          message
        },
        headers: { "Content-Type": 'multipart/form-data' }
      })
    } catch (error: any) {
      console.log(`Erro accrued while sending push notification for DOWN check, error: ${error.message}`);
    }
  }
}