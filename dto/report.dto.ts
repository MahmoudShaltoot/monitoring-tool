export interface ReportDto {
  _id: string,
  status: string,
  date: Date,
  response_time: number,
  check_id: string,
  user_id: string,
  code?: string,
  error_message?: string,
}