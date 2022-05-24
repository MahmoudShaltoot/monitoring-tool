import { CheckDto } from "../dto/check.dto";
import { Check } from '../models/checks';
import { ChecksEventEmitter } from '../events/events.emitter';
import { ChecksEvents } from "../events/events";

export class CheckService {
  private eventEmitter: ChecksEventEmitter;
  constructor() {
    this.eventEmitter = ChecksEventEmitter.getInstance();
  }

  async incrementCheckFailure(check: CheckDto) {
    console.log(`Increment total num of failure for check: ${check.name}`);
    await Check.updateOne({ _id: check._id }, { totalNumOfFailures: ++check.totalNumOfFailures });
    const updatedCheck = await Check.findById(check._id);
    if (updatedCheck.totalNumOfFailures >= check.threshold) {
      this.eventEmitter.emit(ChecksEvents.NEW_ALERT, updatedCheck);
    }
    return updatedCheck;
  }
}