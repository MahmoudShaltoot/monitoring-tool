import { CheckService } from "../../services/checks.service";
import { CheckFactory } from "../factory/check-factory";
import { Check } from '../../models/checks';
import { ChecksEventEmitter } from "../../events/events.emitter";

describe('CheckService.incrementCheckFailure', () => {
  let check, spy;
  const checkService: CheckService = new CheckService();
  const eventEmitter = ChecksEventEmitter.getInstance();

  beforeEach(() => {
  });

  beforeEach(() => {
    check = CheckFactory.getOne();
    jest.spyOn(Check, 'updateOne')
      .mockImplementationOnce((query, update) => {
        check = { ...check, ...update }
        return Promise.resolve() as any;
      });

    jest.spyOn(Check, 'findById')
      .mockImplementationOnce((query) => {
        return Promise.resolve(check) as any
      });

    spy = jest.spyOn(eventEmitter, 'emit').mockImplementation(() => { return true });
  })

  it('Should increment check numOfFailure by 1', async () => {
    const res = await checkService.incrementCheckFailure(check)
    expect(res.totalNumOfFailures).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('Should emit NEW_ALERT event if totalNumOfFailures > threshold', async () => {
    await checkService.incrementCheckFailure({ ...check, threshold: 2 });
    expect(spy).not.toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
})