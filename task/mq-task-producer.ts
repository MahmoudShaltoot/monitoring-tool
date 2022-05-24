
import amqp from 'amqplib/callback_api'
import { TaskProducer } from './producer.interface';
import config from 'config';

export class MQTaskProducder implements TaskProducer {
  private connection: amqp.Connection;
  private queue: string;

  constructor(queue: string) {
    amqp.connect(config.get('message_queue_url'), (error, connection) => {
      if (error) throw error;

      this.connection = connection;
    });
    this.queue = queue;
  }

  produce(task: string) {
    this.connection.createChannel((error, channel) => {
      if (error) throw error;

      channel.assertQueue(this.queue, {
        durable: false
      });

      channel.sendToQueue(this.queue, Buffer.from(task));
    });
  }
}