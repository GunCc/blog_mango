import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RbacInterceptor implements NestInterceptor {
  constructor(private readonly role:number){}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;
    if(req.user.role > this.role){
      throw new ForbiddenException("对不起，您无权操作！");
    }
    return next.handle();
  }
}
