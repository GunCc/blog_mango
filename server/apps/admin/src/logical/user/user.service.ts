import { DbService } from '@app/db';
import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import { codeType, PostData } from '../../model';
import { userDto } from './user.dto';
import { encrytoPassword, makeSalt } from './../../../../../utils/cryptogram';

@Injectable()
export class UserService {
    private sequelize = this.dbSerivce.connectMySql()
    constructor(private readonly dbSerivce: DbService) {
    }

    /**
     * 查询是否有该用户
     * @param username 用户名
     * @returns userDto数组
     */
    async findOne(username: string): Promise<userDto | undefined> {
        const sql = `
            SELECT 
                user_id id,account_name  username, real_name realName, passwd passwrod, passwd_salt salt, mobile, role
            From
                m_user
            WHERE
                account_name = '${username}'
        `
        try {
            const user: userDto[] | undefined = await this.sequelize.query(sql, {
                type: Sequelize.QueryTypes.SELECT,
                raw: true,
                logging: true
            });
            return user[0]
        } catch (e) {
            return void 0;
        }
    }

    /**
    * 注册
    * @param requestBody 请求体
    * @returns userDto数组
    */
    async register(requestBody: any): Promise<PostData<any> | any> {
        //   用户名 真实姓名 密码 重复密码 手机号
        const { accountName, realName, password, repassword, mobile } = requestBody;
        if (password !== repassword) {
            return {
                code: codeType.CLIENT_ERROR,
                msg: "密码输出两次不一致"
            }
        }

        const user = await this.findOne(accountName);
        if (user) {
            return {
                code: codeType.CLIENT_ERROR,
                msg: "用户已存在"
            }
        }
        // 制作密码盐
        const salt = makeSalt();
        // 加密密码
        const hashPwd = encrytoPassword(password, salt);

        const registerSql = `
            INSERT INTO m_user 
                (account_name,real_name,passwd,passwd_salt,mobile,user_status,role,create_by)
            VALUES
                ('${accountName}','${realName}','${hashPwd}','${salt}',${mobile},1,3,0)
        `
        try {
            await this.sequelize.query(registerSql, {
                logging: true
            })
            return {
                code: codeType.SUCCESS,
                msg: "Success"
            }
        } catch (error) {
            return {
                code: codeType.SERVER_ERROR,
                msg: "ERROR"
            }
        }
    }
}
