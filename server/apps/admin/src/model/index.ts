// export codeType: number = 200 | 400 | 500 | 404 | 401;

// 返回前端响应的数据
export interface PostData<T> {
    code: number,
    data: T,
    msg: string
}