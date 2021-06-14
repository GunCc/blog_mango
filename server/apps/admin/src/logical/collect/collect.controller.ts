import { Body, Controller, Post, UseGuards, UsePipes, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from './../../pipe/validation.pipe';
import { collectDto } from './collect.dto';
import { CollectService } from './collect.service';

@Controller('collect')
export class CollectController {

    constructor(private readonly collectService: CollectService) { }

    @UseGuards(AuthGuard("jwt"))
    @UsePipes(new ValidationPipe())
    @Post("list")
    async queryCollectList(@Body() body: any) {
        return await this.collectService.queryCollectList(body)
    }


    @UseGuards(AuthGuard("jwt"))
    @UsePipes(new ValidationPipe())
    @Post("create")
    async createCollect(@Body() body: collectDto, @Request() req: any) {
        return await this.collectService.createCollect(body, req.user.username)
    }

    
    @UseGuards(AuthGuard("jwt"))
    @UsePipes(new ValidationPipe())
    @Post("update")
    async updateCollect(@Body() body: collectDto, @Request() req: any) {
        return await this.collectService.updateCollect(body, req.user.username)
    }

    
    @UseGuards(AuthGuard("jwt"))
    @UsePipes(new ValidationPipe())
    @Post("delete")
    async deleteCollect(@Body() body: any) {
        return await this.collectService.deleteCollect(body)
    }

}
