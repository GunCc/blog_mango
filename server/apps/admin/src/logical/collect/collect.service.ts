import { Injectable } from '@nestjs/common';
import { DbService } from './../../../../../libs/db/src/db.service';
import * as Sequelize from 'sequelize';
import { collectDto, collectListDto } from './collect.dto';
import { PostData, codeType, listDto } from './../../model/index';
@Injectable()
export class CollectService {
    private sequelize = this.dbService.connectMySql();
    constructor(private readonly dbService: DbService) { }


    /**
     * 查询所有收藏文章
     */
    async queryCollectList(body: collectListDto): Promise<PostData<listDto<collectDto[]>>> {
        // 分页参数
        const { pageIndex = 1, pageSize = 10, keywords = '' }: any = body;
        const currentIndex: Number = (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize;
        const queryCollectListSQL = `
            SELECT 
                id, name , introduction, http_url, description, update_time
            FROM 
                m_blog_collect
            WHERE
                name LIKE '%${keywords}%'
            ORDER BY          
                id DESC 
            LIMIT ${currentIndex},${pageSize} 
        `
        const collectList: collectDto[] = await this.sequelize.query(queryCollectListSQL, {
            type: Sequelize.QueryTypes.SELECT,
            raw: true,
            logging: true,
        });

        // 统计数据条数
        const countCommodityListSQL = `
            SELECT
                COUNT(*) AS total
            FROM
                m_blog_collect
            WHERE
                name LIKE '%${keywords}%'
        `;

        const count: any = (
            await this.sequelize.query(countCommodityListSQL, {
                type: Sequelize.QueryTypes.SELECT,
                raw: true,
                logging: false,
            })
        )[0];

        return {
            code: 200,
            data: {
                list: collectList,
                page: {
                    pageCurrent: pageIndex,
                    pageSize: currentIndex,
                    total: count.total
                },
            },
            msg: "查询成功"
        };
    }


    /**
     * 创建收藏文章
     */
    async createCollect(body: collectDto, username: string): Promise<PostData<any>> {
        const { name, introduction, http_url, desc } = body;
        const createCollectSql = `
            INSERT INTO  m_blog_collect
                (name, introduction, http_url , description, create_by )
            VALUES
                ('${name}','${introduction}','${http_url}','${desc}','${username}')
        `
        await this.sequelize.query(createCollectSql, {
            logging: true
        })
        return {
            code: codeType.SUCCESS,
            msg: "创建成功"
        }
    }

    /**
    * 修改收藏文章
    */
    async updateCollect(body: collectDto, username: string): Promise<PostData<any>> {
        const { id, name, introduction, http_url, desc } = body;
        if(!id){
            return {
                code: codeType.CLIENT_ERROR,
                msg: "请传入文章收藏ID"
            }
        }
        const updateCollectSql = `
            UPDATE
                m_blog_collect
            SET
                name = '${name}',
                introduction = '${introduction}',
                http_url = '${http_url}',
                description = '${desc}',
                update_by = '${username}'
            WHERE
                id = ${id}
            `
        const transaction = await this.sequelize.transaction();
        try {
            await this.sequelize.query(updateCollectSql, {
                logging: true
            })
            transaction.commit();
            return {
                code: codeType.SUCCESS,
                msg: "修改成功"
            }
        } catch (error) {
            transaction.rollback();
            return {
                code: codeType.CLIENT_ERROR,
                msg: "操作失败"
            }
        }
    }

    
    /**
     * 删除收藏文章
     */
     async deleteCollect(body: collectDto) {
        const { id } = body;
        const deleteCollectSqL = `
            DELETE FROM 
                m_blog_collect
            WHERE
                id = ${id}
        `
        await this.sequelize.query(deleteCollectSqL, {
            logging: false
        });
        return {
            code: codeType.SUCCESS,
            msg: "删除成功"
        }
    }

}
