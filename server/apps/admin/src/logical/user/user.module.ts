import { DbService } from '@app/db';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
    // controllers:[UserController],
    providers: [UserService, DbService],
    exports: [UserService]
})
export class UserModule { }
