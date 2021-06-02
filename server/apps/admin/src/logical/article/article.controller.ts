import { Body, Controller, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '@nestjs/passport';
import { articleDeleteDto, articleDto } from './article.dto';
import { ValidationPipe } from './../../pipe/validation.pipe';

@Controller('article')
export class ArticleController {

    constructor(private readonly articleService: ArticleService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post("list")
    async queryArticle(@Body() body: any) {
        return await this.articleService.queryArticleList(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe()) 
    @Post("create")
    async createArticle(@Body() body: articleDto, @Request() req: any) {
        return await this.articleService.createArticle(body, req.user.username);
    }

    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe()) 
    @Post("update")
    async updateArticle(@Body() body: articleDto, @Request() req: any) {
        return await this.articleService.updateArticle(body, req.user.username);
    }

    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe()) 
    @Post("delete")
    async deleteArticle(@Body() body: articleDeleteDto, @Request() req: any) {
        return await this.articleService.deleteArticle(body);
    }
}
