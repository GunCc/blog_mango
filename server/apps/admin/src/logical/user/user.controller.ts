import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { codeType } from '../../model';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly authService: AuthService, private readonly usersService: UserService) { }

    // @Post('find-one')
    // findOne(@Body() body: any) {
    //     return this.usersService.findOne(body.username);
    // }

    @UseGuards(AuthGuard('jwt'))
    @Post("register")
    register(@Body() body: any) {
        return this.usersService.register(body)
    }

    // JWT 验证 - Step 1：用户请求登录
    @Post("login")
    async login(@Body() body: any) {
        console.log('Step 1：用户请求登录');
        const authResult = await this.authService.validateUser(body.username, body.password);
        switch (authResult.code) {
            case codeType.SUCCESS:
                return this.authService.certificate(authResult.data);
            default:
                return authResult
        }
    }
}
