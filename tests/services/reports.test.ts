import { array } from "joi";
import { ReportService } from "../../services/reports.service";
import { ReportFactory } from "../factory/report-factory";
import _ from 'lodash';

describe('ReportService.generateUserReport', () => {
  let reports, upReports, downReports, spy;
  const reportService: ReportService = new ReportService();

  beforeAll(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('2022-05-01T00:30:00.000+00:00'));
  });

  beforeEach(() => {
    reports = ReportFactory.getReports();
    upReports = ReportFactory.getUpReports();
    downReports = ReportFactory.getDownReports();
  });

  it('should generate report with current status is UP', () => {
    const genereratedReport: any[] = reportService.generateUserReport(reports);
    expect(genereratedReport.length).toBe(1);
    expect(genereratedReport[0]).toHaveProperty('current_status', 'UP');
    expect(genereratedReport[0]).toHaveProperty('avgResponseTime');
    expect(genereratedReport[0]).toHaveProperty('availability');
  });

  it('Should generate report with status UP and downtime equal 0', () => {
    const genereratedReport: any[] = reportService.generateUserReport(upReports);
    expect(genereratedReport.length).toBe(1);
    expect(genereratedReport[0]).toHaveProperty('current_status', 'UP');
    expect(genereratedReport[0]).toHaveProperty('uptime');
    expect(genereratedReport[0].uptime >= 0).toBeTruthy();
    expect(genereratedReport[0].downtime == 0).toBeTruthy();
  });

  it('Should generate report with status DOWN and uptime equal 0', () => {
    const genereratedReport: any[] = reportService.generateUserReport(downReports);
    expect(genereratedReport.length).toBe(1);
    expect(genereratedReport[0]).toHaveProperty('current_status', 'DOWN');
    expect(genereratedReport[0]).toHaveProperty('downtime');
    expect(genereratedReport[0].downtime >= 0).toBeTruthy();
    expect(genereratedReport[0].uptime == 0).toBeTruthy();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});