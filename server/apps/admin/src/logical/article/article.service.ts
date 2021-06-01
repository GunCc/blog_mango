import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {

    /**
     * 查询博客
     */
    async queryArticleList(body: any): Promise<any> {

        // 分页参数
        const { pageIndex = 1, pageSize, keywords = '' } = body;
        const currentIndex = (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize;
        const queryArticleListSQL = `
            SELECT 
                id, type_id t_id, article_name name, article_desc, create_time, update_time
            FORM 
                m_blog_article
            ORDER BY          
                id DESC 
            LIMIT ${currentIndex},${pageSize} 
        `

    }


}
