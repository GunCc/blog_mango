
// 生产环境
const productConfig = {
    mysql: {
        port: "3306",
        host: 'localhost',
        user: 'root',
        password: "123456",
        database: 'blog',
        connectionLimit: 10, // 连接限制
    }
}

// 开发环境
const localConfig = {
    mysql: {
        port: "3306",
        host: 'localhost',
        user: 'root',
        password: "123456",
        database: 'blog',
        connectionLimit: 10, // 连接限制
    }
}

const config = process.env.NODE_ENV ? productConfig : localConfig;