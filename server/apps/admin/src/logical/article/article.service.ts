import { DbService } from '@app/db';
import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'
import { codeType, PostData, listDto } from './../../model/index';
import { articleDeleteDto, articleDto, articleListDto } from './article.dto';

@Injectable()
export class ArticleService {

    private sequelize = this.dbSerivce.connectMySql();

    constructor(private readonly dbSerivce: DbService) {
    }

    /**
     * 查询博客
     */
    async queryArticleList(body: articleListDto): Promise<PostData<listDto<articleDto[]>>> {
        // 分页参数
        const { pageIndex = 1, pageSize = 10, keywords = '' }: any = body;
        const currentIndex: Number = (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize;
        const queryArticleListSQL = `
            SELECT 
                id, type_id , article_name, article_desc, create_time, update_time
            FROM 
                m_blog_article
            WHERE
                article_name LIKE '%${keywords}%'
            ORDER BY          
                id DESC 
            LIMIT ${currentIndex},${pageSize} 
        `
        const articleList: articleDto[] = await this.sequelize.query(queryArticleListSQL, {
            type: Sequelize.QueryTypes.SELECT,
            raw: true,
            logging: true,
        });

        // 统计数据条数
        const countCommodityListSQL = `
            SELECT
                COUNT(*) AS total
            FROM
                m_blog_article
            WHERE
                article_name LIKE '%${keywords}%'
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
                list: articleList,
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
     * 创建文章
     */
    async createArticle(body: articleDto, username: string): Promise<PostData<any>> {
        const { type_id, article_name, article_desc } = body;
        const createArticleSql = `
            INSERT INTO  m_blog_article
                (type_id, article_name, article_desc, create_by)
            VALUES
                ('${type_id}','${article_name}','${article_desc}','${username}')
        `
        await this.sequelize.query(createArticleSql, {
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
    async updateArticle(body: articleDto, username: string): Promise<any> {
        const { id, type_id, article_name, article_desc } = body;
        if(!id){
            return {
                code: codeType.CLIENT_ERROR,
                msg: "请传入文章ID"
            }
        }
        const updateArticleSql = `
            UPDATE
                m_blog_article
            SET
                type_id = ${type_id},
                article_name = '${article_name}',
                article_desc = '${article_desc}',
                update_by = '${username}'
            WHERE
                id = ${id}
        `
        const transaction = await this.sequelize.transaction();

        try {
            await this.sequelize.query(updateArticleSql, {
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
    async deleteArticle(body: articleDeleteDto) {
        const { id } = body;
        const deleteArticleSqL = `
            DELETE FROM 
                m_blog_article
            WHERE
                id = ${id}
        `
        await this.sequelize.query(deleteArticleSqL, {
            logging: false
        });
        return {
            code: codeType.SUCCESS,
            msg: "删除成功"
        }
    }

}
