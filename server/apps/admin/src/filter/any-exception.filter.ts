import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Logger } from './../../../../utils/log4js';
import { Response, Request } from 'express';


// 捕获（过滤） 所有错误
@Catch()
export class AnyExceptionFilter<T> implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
      // 该方法获取 http 请求体
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      // 返回错误码
      const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
  
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
        msg: `${status >= 500 ? 'Service Error' : 'Client Error'}`,
      });
  }
}
