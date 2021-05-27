// export codeType: number = 200 | 400 | 500 | 404 | 401;
export enum codeType {
    SUCCESS = 200,
    AUTH_ERROR = 401,
    NOFIND_ERROR = 404,
    CLIENT_ERROR = 400,
    SERVER_ERROR = 500,
}

// 返回前端响应的数据
export interface PostData<T> {
    code: codeType,
    data: T,
    msg: string
}