import { DbService } from '@app/db';
import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';

@Injectable()
export class UserService {
    constructor(private readonly dbSerivce: DbService) { }

    // 用户查询
    async findOne(username: string): Promise<any | undefined> {
        const sql = `
            SELECT 
                user_id id,real_name realName,role
            From
                m_user
            WHERE
                account_name = '${username}'
        `
        try {
            const res = await this.dbSerivce.connectMySql().query(sql, {
                type: Sequelize.QueryTypes.SELECT,
                raw: true,
                logging: true
            });
            const user = res[0];
            if (user) {
                return {
                    code: 200,
                    data: {
                        user,
                    },
                    msg: "Success"
                }
            } else {
                return {
                    code: 400,
                    msg: "查无此人"
                }
            }
        } catch (e) {
            return {
                code: 500,
                msg: `Service error:${e}`
            }
        }
    }
}
