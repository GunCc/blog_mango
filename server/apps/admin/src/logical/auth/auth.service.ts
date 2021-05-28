import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encrytoPassword } from 'utils/cryptogram';
import { codeType, PostData } from '../../model';
import { UserService } from '../user/user.service';
import { userDto } from '../user/user.dto';


@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    // JWT验证 - Step2：校验用户信息
    async validateUser(username: string, password: string): Promise<PostData<any>> {
        console.log('JWT验证 - Step2：校验用户信息');
        const user = await this.userService.findOne(username);
        if (user) {
            // 获取用户密码 和 密码盐
            const hashedPassword = user.passwrod;
            const salt = user.salt;

            // 用 用户输入的密码 制作密码盐 匹配数据库的密码
            const hashPassword = encrytoPassword(password, salt);
            if (hashedPassword === hashPassword) {
                return {
                    code: codeType.SUCCESS,
                    data: user,
                    msg: "Success"
                }
            } else {
                // 密码错误
                return {
                    code: codeType.CLIENT_ERROR,
                    msg: "密码错误"
                }
            }
        } else {
            return {
                code: codeType.CLIENT_ERROR,
                msg: "查无此人"
            }
        }
    }

    // JWT 验证 - Step 3：处理JWT签证
    async certificate(user: userDto):Promise<PostData<string>> {
        const payload = { username: user.username, sub: user.id, realName: user.realName, role: user.role };
        console.log("JWT 验证 - Step 3：处理JWT签证");
        try {
            const token = this.jwtService.sign(payload);
            return {
                code: codeType.SUCCESS,
                data: token,
                msg: '登录成功'
            }
        } catch (e) {
            return {
                code: codeType.CLIENT_ERROR,
                msg: "账号或密码错误"
            }
        }
    }
}
