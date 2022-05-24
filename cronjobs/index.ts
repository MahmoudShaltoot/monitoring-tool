import { Check } from '../models/checks';
import cron from 'node-cron';
import { MQTaskProducder } from '../task/mq-task-producer';

const WORK_QUEUE = 'URL_CHECK_TASKS';
const taskProducer = new MQTaskProducder(WORK_QUEUE);

cron.schedule('*/1 * * * *', async () => {
  const checks = await Check.find({ next_check_date: { $lt: Date.now() } });
  console.log(`Checking URLs with next_check_date before: ${ new Date() }`);
  
  checks.forEach(check => {
    taskProducer.produce(JSON.stringify(check));
  });
});
