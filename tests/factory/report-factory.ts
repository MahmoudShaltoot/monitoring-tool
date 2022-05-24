import { ReportDto } from "../../dto/report.dto";

export class ReportFactory {
  static getReports() {
    const reports = [{
      _id: "check1",
      history: [
        {
          status: "UP",
          date: new Date('2022-05-01T00:20:00.000+00:00'),
          response_time: 50,
          check_id: "check1",
          user_id: "user1",
        }, {
          status: "DOWN",
          date: new Date('2022-05-01T00:15:00.000+00:00'),
          response_time: 50,
          check_id: "check1",
          user_id: "user1",
          code: 'INTERNAL_SERVER_ERROR',
          error_message: 'Request failed with status code 404'
        }, {
          status: "UP",
          date: new Date('2022-05-01T00:10:00.000+00:00'),
          response_time: 50,
          check_id: "check1",
          user_id: "user1",
        }, {
          status: "UP",
          date: new Date('2022-05-01T00:05:00.000+00:00'),
          response_time: 50,
          check_id: "check1",
          user_id: "user1",
        },
        {
          status: "DOWN",
          date: new Date('2022-05-01T00:00:00.000+00:00'),
          response_time: 110,
          check_id: "check1",
          user_id: "user1",
          code: 'TIMEOUT',
          error_message: 'Request timeout after 100ms'
        }
      ]
    }]

    return reports;
  };

  static getUpReports() {
    const reports = ReportFactory.getReports();
    const upReports = reports.map((report) => {
      const history = report.history.filter(entry => entry.status === 'UP');
      return { _id: report._id, history };
    });

    return upReports;
  }

  static getDownReports() {
    const reports = ReportFactory.getReports();
    const upReports = reports.map((report) => {
      const history = report.history.filter(entry => entry.status === 'DOWN');
      return { _id: report._id, history };
    });

    return upReports;
  }
}