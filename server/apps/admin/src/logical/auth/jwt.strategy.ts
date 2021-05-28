import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        // 执行父类的构造函数
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        })
    }

    // JWT验证 - Step 4：被守卫调用 解析 返回用户数据
    async validate(payload: any): Promise<any> {
        console.log(`JWT验证 - Step 4：被守卫调用`);
        return { userId: payload.sub, username: payload.username, realName: payload.realName, role: payload.role };
    }
}