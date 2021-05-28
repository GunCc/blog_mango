import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Logger } from './../../../../utils/log4js';
import { Response, Request } from 'express';


// 捕获（过滤） http 错误
@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {

  // exception 异常类型  host 参数
  catch(exception: HttpException, host: ArgumentsHost) {

    // 该方法获取 http 请求体
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // 返回错误码
    const status = exception.getStatus();

    const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      Request original url: ${request.originalUrl}
      Method: ${request.method}
      IP: ${request.ip}
      Status code: ${status}
      Response: ${exception.toString()} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      `;
    Logger.error(logFormat);

    // 返回响应体
    response.status(status).json({
      statusCode: status,
      error: exception.message,
      msg: `${status >= 500 ? 'Service Error' : 'Client Error'}`,
    });
  }
}
