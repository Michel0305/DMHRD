module.exports = {
    svc: { prot: 8888, host: "0.0.0.0" },
    clienthost: { host: `'http://10.83.4.182:9527'` },
    sql: {
        user: "hrd",
        password: "hrd159753",
        database: "hrd",
        host: "127.0.0.1",
        port: 1433,
        connectionTimeout: 15000,
        parseJSON: true,
        // stream:false,
        pool: {
            min: 10,
            max: 10,
            idleTimeoutMillis: 30000
        },
        dialect: 'mssql'
        // options: {
        //     encrypt: true //使用windows azure，需要设置次配置。
        // },     
    },
    tokentime: 30 * 60,//5分鐘過期
}