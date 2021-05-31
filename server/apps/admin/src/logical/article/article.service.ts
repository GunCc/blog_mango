import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {

    /**
     * 查询博客
     */
    async queryArticleList(body: any): Promise<any> {

        // 分页参数
        const { pageIndex = 1, pageSize, keywords = '' } = body;


    }


}
