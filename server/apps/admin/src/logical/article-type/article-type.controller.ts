import { Body, Controller, Post, UseGuards, Request, UsePipes } from '@nestjs/common';
import { ArticleTypeService } from './article-type.service';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from './../../pipe/validation.pipe';
import { typeDto } from './articleType.dto';


@Controller('article-type')
export class ArticleTypeController {
    constructor(private readonly articleTypeService: ArticleTypeService) { }

    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe()) 
    @Post("list")
    async queryArticleType(@Body() body: any) {
        return await this.articleTypeService.quereTypeList(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe()) 
    @Post("create")
    async createArticleType(@Body() body: typeDto, @Request() req: any) {
        return await this.articleTypeService.createType(body, req.user.username)
    }

    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe()) 
    @Post("update")
    async updateArticleType(@Body() body: typeDto, @Request() req: any) {
        return await this.articleTypeService.updateType(body, req.user.username)
    }

    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe()) 
    @Post("delete")
    async deleteArticleType(@Body() body: any) {
        return await this.articleTypeService.deleteType(body)
    }
}
