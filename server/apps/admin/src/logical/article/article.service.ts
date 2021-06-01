import { DbService } from '@app/db';
import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'

@Injectable()
export class ArticleService {

    private sequelize = this.dbSerivce.connectMySql()
    constructor(private readonly dbSerivce: DbService) {
    }

    /**
     * 查询博客
     */
    async queryArticleList(body: any): Promise<any> {

        // 分页参数
        const { pageIndex = 1, pageSize = 10, keywords = '' } = body;
        const currentIndex = (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize;
        const queryArticleListSQL = `
            SELECT 
                id, type_id t_id, article_name name, article_desc, create_time, update_time
            FORM 
                m_blog_article
            WHERE
                article_name LIKE '%${keywords}%'
            ORDER BY          
                id DESC 
            LIMIT ${currentIndex},${pageSize} 
        `

        const articleList: any[] = await this.sequelize.query(queryArticleListSQL, {
            type: Sequelize.QueryTypes.SELECT,
            raw: true,
            logging: false,
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
                    pageSize: currentIndex,
                    total: count.total
                },
            },
        };

    }


}
