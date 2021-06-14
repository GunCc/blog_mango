import { Injectable } from '@nestjs/common';
import { DbService } from './../../../../../libs/db/src/db.service';
import * as Sequelize from 'sequelize'
import { typeDto, typeListDto } from './articleType.dto';
import { codeType, listDto, PostData } from './../../model/index';

@Injectable()
export class ArticleTypeService {
    private sequelize = this.dbService.connectMySql();
    constructor(private readonly dbService: DbService) { }


    /**
    * 分类列表
    */
    async quereTypeList(body: typeListDto): Promise<PostData<listDto<typeDto[]>>> {
        // 分页参数

        const { pageIndex = 1, pageSize = 10, keywords = '' }: any = body;
        const currentIndex: Number = (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize;
        const queryTypeListSQL = `
            SELECT 
                id, name,image, create_time, update_time
            FROM 
                m_blog_article_type
            WHERE
                name LIKE '%${keywords}%'
            ORDER BY
                id DESC
            LIMIT ${currentIndex},${pageSize}
        `
        const typeList: typeDto[] = await this.sequelize.query(queryTypeListSQL, {
            type: Sequelize.QueryTypes.SELECT,
            raw: true,
            logging: true,
        })

        // 统计数据条数
        const countTypeListSQL = `
            SELECT 
                COUNT(*) AS total
            FROM
                m_blog_article_type
            WHERE
                name LIKE '%${keywords}%'
        `

        const count: any = (
            await this.sequelize.query(countTypeListSQL, {
                type: Sequelize.QueryTypes.SELECT,
                raw: true,
                logging: false
            })
        )[0];

        return {
            code: codeType.SUCCESS,
            data: {
                list: typeList,
                page: {
                    pageCurrent: pageIndex,
                    pageSize: currentIndex,
                    total: count.total
                },
            },
            msg: "查询成功"
        }
    }


    /**
    * 创建分类
    */
    async createType(body: typeDto, username: string): Promise<PostData<any>> {
        const { name, image } = body;
        const createTypeSQL = `
            INSERT INTO m_blog_article_type
                (name,image,create_by)
            VALUES
                ('${name}','${image}','${username}')
        `
        await this.sequelize.query(createTypeSQL, {
            logging: false
        })
        return {
            code: codeType.SUCCESS,
            msg: "创建成功"
        }
    }

    /**
     * 修改文章
     */
     async updateType(body: typeDto, username: string): Promise<any> {
        const { id,name,image } = body;
        if(!id){
            return {
                code: codeType.CLIENT_ERROR,
                msg: "请传入分类ID"
            }
        }
        const updateTypeSql = `
            UPDATE
                m_blog_article_type
            SET
                id = ${id},
                name = '${name}',
                image = '${image}',
                update_by = '${username}'
            WHERE
                id = ${id}
        `
        const transaction = await this.sequelize.transaction();

        try {
            await this.sequelize.query(updateTypeSql, {
                transaction,
                logging: true,
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
     * 删除文章
     */
     async deleteType(body: typeDto) {
        const { id } = body;
        const deleteTypeSqL = `
            DELETE FROM 
                m_blog_article_type
            WHERE
                id = ${id}
        `
        await this.sequelize.query(deleteTypeSqL, {
            logging: false
        });
        return {
            code: codeType.SUCCESS,
            msg: "删除成功"
        }
    }

}
