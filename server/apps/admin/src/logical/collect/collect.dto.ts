import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { pageDto } from '../../model';

export class collectListDto extends pageDto {
    keywords: string
}


export class collectDto {
    id?:number
    @IsNotEmpty({ message: '收藏文章标题不能为空' })
    readonly name: string;
    @IsNotEmpty({ message: '收藏文章简介不能为空' })
    readonly introduction: string;
    @IsNotEmpty({ message: '收藏文章地址不能为空' })
    readonly http_url: string;
    @IsNotEmpty({ message: '收藏文章内容不能为空' })
    readonly desc: string;
}