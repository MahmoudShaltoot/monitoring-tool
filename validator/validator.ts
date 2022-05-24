import Axios from 'axios';
import { CheckDto } from "../dto/check.dto";
import https from 'node:https';

export class Validator {
  public async validate(check: CheckDto) {
    try {
      const URL = this.buildCheckURL(check);

      const config: any = {
        timeout: check.timeout * 1000,
        headers: check.httpHeaders,
      }

      if (check.ignoreSSL) {
        config.httpsAgent = new https.Agent({
          rejectUnauthorized: false
        });
      }

      const response: any = await Axios.get(URL, config);

      if (!check.assert?.statusCode || response.status === check.assert.statusCode) {
        return {
          ok: true,
          response_time: response.duration
        };
      } else {
        return {
          ok: false,
          code: 'ASSERTION_ERROR',
          response_time: response.duration,
          message: `Assertion error: Expected: ${check.assert.statusCode} but got ${response.status}`
        };
      };
    } catch (error: any) {
      return {
        ok: false,
        message: error.message,
        response_time: error.duration,
        code: error.code === 'ECONNABORTED' ? 'TIMEOUT' : 'INTERNAL_SERVER_ERROR'
      }
    }
  }

  private buildCheckURL(check: CheckDto) {
    try {
      const checkURL = new URL(check.url);
      checkURL.pathname = check.path || '';
      checkURL.port = check.port?.toString() || '';
      checkURL.username = check.authentication?.email || '';
      checkURL.password = check.authentication?.password || '';

      return checkURL.href;
    } catch (err) {
      console.log(`URL: ${check.url} is invalid URL`);
      throw new Error(`Invalid URL`);
    }
  }
}
