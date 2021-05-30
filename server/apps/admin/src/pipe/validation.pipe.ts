import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Logger } from 'utils/log4js';

@Injectable()
export class ValidationPipe implements PipeTransform {
  // value：当前处理的参数
  // metadata：元数据
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    console.log(`value:`, value, `metadata：`, metadata);
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // 将对象转换为 Class 来验证
    const object = plainToClass(metatype, value)
    const error = await validate(object);
    if (error.length > 0) {
      const msg = Object.values(error[0].constraints)[0]; // 只取第一个错误
      Logger.error(msg);
      throw new BadRequestException(`Validation failed: ${msg}`);
    }

    return value;
  }

  // 判断 metatype 是否有校验规则
  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype)
  }
}
