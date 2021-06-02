import { IsPositive } from "class-validator";

// export codeType: number = 200 | 400 | 500 | 404 | 401;
export enum codeType {
    SUCCESS = 200,
    AUTH_ERROR = 401,
    NOFIND_ERROR = 404,
    CLIENT_ERROR = 400,
    SERVER_ERROR = 500,
}

// 返回前端响应的数据
export interface PostData<T extends any> {
    code: codeType,
    msg: string
    data?: T,
}

// 分页Dto
export class pageDto {
    @IsPositive({ message: "不能小于0" })
    pageIndex: Number;
    @IsPositive({ message: "不能小于0" })
    pageSize: Number;
}

// 分页输出类型
export class pagePostDto {
    @IsPositive({ message: "不能小于0" })
    pageCurrent: Number;
    @IsPositive({ message: "不能小于0" })
    pageSize: Number;
    total: Number;
}

// 表格数据
export class listDto<T extends any>{
    list: T;
    page: pagePostDto
}
