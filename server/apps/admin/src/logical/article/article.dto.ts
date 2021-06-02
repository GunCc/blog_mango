// src/logical/user/user.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { pageDto } from '../../model';

export class articleListDto extends pageDto {
    keywords: string
}

export class articleDto {
    id?:number
    @IsNumber()
    @IsNotEmpty({ message: '分类ID不能为空' })
    readonly type_id: number;
    @IsNotEmpty({ message: '文章标题不能为空' })
    @IsString({ message: '文章标题必须是 String 类型' })
    readonly article_name: string;
    @IsNotEmpty({ message: '文章内容不能为空' })
    @IsString({ message: '文章内容必须是 String 类型' })
    readonly article_desc: string;
}

export class articleDeleteDto{
    @IsNumber()
    @IsNotEmpty({ message: '分类ID不能为空' })
    id?: Number;
}
