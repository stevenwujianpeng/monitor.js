/**
 * 应用数据监控中心
 * */

const Koa = require('koa2')
const Router = require('koa-router')
const cors = require('koa2-cors')

const app = new Koa()
const router = new Router()

router.get('*', (ctx, next) => {
    // ctx.router available
    console.log(ctx)
    ctx.response.body = 'sucess'
});

app
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3001)
