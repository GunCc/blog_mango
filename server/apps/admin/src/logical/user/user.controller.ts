import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { RegisterInfoDTO } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { codeType } from '../../model';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { ValidationPipe } from './../../pipe/validation.pipe';
// import { RegisterInfoDTO } from './user.dto';


@Controller('user')
export class UserController {

    constructor(private readonly authService: AuthService, private readonly usersService: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe()) 
    @Post("register")
    register(@Body() body: RegisterInfoDTO) {
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
