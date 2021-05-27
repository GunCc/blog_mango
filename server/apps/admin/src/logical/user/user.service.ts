import { DbService } from '@app/db';
import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import { codeType, PostData } from '../../model';
import { userDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(private readonly dbSerivce: DbService) { }

    /**
     * 查询是否有该用户
     * @param username 用户名
     * @returns userDto数组
     */
    async findOne(username: string): Promise<PostData<userDto | string> | undefined> {
        if(!username){
            return {
                code: codeType.CLIENT_ERROR,
                data: '请输入用户名',
                msg: "Success"
            }
        }
        const sql = `
            SELECT 
                user_id id,account_name  username, real_name realName, passwd passwrod, passwd_salt salt, mobile, role
            From
                m_user
            WHERE
                account_name = '${username}'
        `
        try {
            const user: userDto[] | undefined = await this.dbSerivce.connectMySql().query(sql, {
                type: Sequelize.QueryTypes.SELECT,
                raw: true,
                logging: true
            });
            return {
                code: codeType.SUCCESS,
                data: user[0] || '差无此人',
                msg: "Success"
            }
        } catch (e) {
            return void 0;
        }
    }
}
