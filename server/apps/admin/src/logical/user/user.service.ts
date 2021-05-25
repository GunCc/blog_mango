import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    // 用户查询
    findOne(username:string):string{
        if(username === "Kid"){
            return "Kid is here"
        }else{
            return "no"
        }
    }
}
