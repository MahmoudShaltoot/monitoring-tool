import { CheckDto } from "../../dto/check.dto";

export class CheckFactory {
  static getOne() {
    const check: CheckDto = {
      _id: "1",
      name: "check-example",
      url: "https://dummy-url.com",
      protocol: "https",
      path: "",
      port: 80,
      webhook: "",
      timeout: 5,
      interval: 10,
      threshold: 1,
      authentication: {
        email: "user@test.com",
        password: "12345678"
      },
      httpHeaders: {
        locale: "uk"
      },
      assert: {
        response: "",
        statusCode: 200
      },
      tags: [],
      ignoreSSL: true,
      totalNumOfFailures: 0,
      user_id: "user-1"
    }
    return check;
  }
}
