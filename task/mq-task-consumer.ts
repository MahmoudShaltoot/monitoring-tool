
import amqp from 'amqplib/callback_api'
import { Check } from '../models/checks';
import { CheckService } from '../services/checks.service';
import { ReportService } from '../services/reports.service';
import { Validator } from '../validator/validator';
import { TaskConsumer } from './consumer.interface';
import config from 'config';

export class MQTaskConsumer implements TaskConsumer {
  private queue: string;

  constructor(queue: string) {
    this.queue = queue;
  }

  consume(validator: Validator, checkService: CheckService, reportService: ReportService) {
    amqp.connect(config.get('message_queue_url'), (error, connection) => {
      if (error) {
        throw error;
      }
      connection.createChannel((error, channel) => {
        if (error) throw error;

        channel.assertQueue(this.queue, {
          durable: false
        });

        channel.consume(this.queue, async function (msg) {
          const message = msg?.content.toString()!;
          const task = JSON.parse(message);
          const serverResponse = await validator.validate(task);
          await Check.updateOne({ _id: task._id }, { next_check_date: new Date(new Date().getTime() + (task.interval * 60000))});
          if (serverResponse.ok) {
            console.log(`URL ${task.url} is UP`);
            await reportService.createUpEntry(task, serverResponse);
          } else {
            console.log(`Opps, URL ${task.url} is DOWN`);
            const failedCheck = await checkService.incrementCheckFailure(task);
            await reportService.createDownEntry(failedCheck, serverResponse);
          }
        }, { noAck: true });
      });
    });
  }
}
