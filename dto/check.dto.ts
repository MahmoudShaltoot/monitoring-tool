export interface CheckDto {
  _id: string,
  name: string,
  url: string,
  protocol: string,
  path?: string,
  port?: number,
  webhook: string,
  timeout: number,
  interval: number,
  threshold: number,
  totalNumOfFailures: number,
  authentication?: { email: string, password: string },
  httpHeaders?: { [key: string]: string },
  assert: { response: string, statusCode: number },
  tags?: string[],
  ignoreSSL?: boolean,
  next_check_date?: Date,
  user_id: string
}