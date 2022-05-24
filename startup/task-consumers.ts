import { CheckService } from "../services/checks.service";
import { ReportService } from "../services/reports.service";
import { MQTaskConsumer } from "../task/mq-task-consumer";
import { Validator } from "../validator/validator";

const WORK_QUEUE = 'URL_CHECK_TASKS';

const consumer1 = new MQTaskConsumer(WORK_QUEUE);
consumer1.consume(new Validator(), new CheckService(), new ReportService());

const consumer2 = new MQTaskConsumer(WORK_QUEUE);
consumer2.consume(new Validator(), new CheckService(), new ReportService());