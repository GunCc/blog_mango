import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { pageDto } from '../../model';

export class typeListDto extends pageDto {
    keywords: string
}


export class typeDto {
    id?:number
    @IsNotEmpty({ message: '分类名不能为空' })
    @IsString({ message: '文章标题必须是 String 类型' })
    readonly name: string;
    @IsNotEmpty({ message: '分类图片不能为空' })
    @IsString({ message: '文章内容必须是 String 类型' })
    readonly image: string;
}