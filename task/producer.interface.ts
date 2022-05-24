export interface TaskProducer {
  produce(task: string): void;
}
