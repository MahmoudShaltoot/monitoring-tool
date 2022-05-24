import { CheckDto } from "../dto/check.dto";
import { Report } from "../models/reports";

export class ReportService {

  async createUpEntry(check: CheckDto, serverResponse) {
    const report = await this.createReport('UP', check, serverResponse);
    return report
  }

  async createDownEntry(failedCheck: CheckDto, serverResponse) {
    const report = await this.createReport('DOWN', failedCheck, serverResponse);
    return report
  }

  private async createReport(status: string, check: CheckDto, serverResponse) {
    const report = new Report({
      status: status,
      date: Date.now(),
      check_id: check._id,
      user_id: check.user_id,
      response_time: serverResponse.response_time,
      error_message: serverResponse.message,
      code: serverResponse.code,
    });

    return report.save();
  }

  generateUserReport(reports) {
    return reports.map(report => {
      const current_status = report.history[0].status;
      let upCount = 0, responsetTime = 0, outage = 0, downtime = 0, uptime = 0;
      for (let index = report.history.length - 1; index > 0; index--) {
        const current_report = report.history[index];
        const next_report = report.history[index - 1];
        if (current_report.status == 'UP') {
          uptime += next_report.date - current_report.date;
          responsetTime += current_report.response_time;
          upCount++;
        } else {
          downtime += (next_report.date - current_report.date);
          outage++;
        }
      }

      const latest_report = report.history[0];
      if (current_status == 'UP') {
        upCount++;
        responsetTime += latest_report.response_time;
        uptime += Date.now() - latest_report.date;
      } else {
        outage++;
        downtime += Date.now() - latest_report.date;
      }

      const avgResponseTime = upCount ? responsetTime / upCount : responsetTime;
      const availability = +(uptime/(uptime + downtime)).toFixed(2) * 100 + '%';
      return {
        check_id: report._id,
        current_status,
        avgResponseTime,
        outage,
        downtime: Math.floor(downtime/1000),
        uptime: Math.floor(uptime/1000),
        availability,
        history: report.history
      }
    })
  }
}