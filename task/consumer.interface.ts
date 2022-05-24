import { CheckService } from "../services/checks.service";
import { ReportService } from "../services/reports.service";
import { Validator } from "../validator/validator";

export interface TaskConsumer {
  consume(taskHandler: Validator, CheckService: CheckService, reportService: ReportService): void;
}
