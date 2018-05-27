import Koa from "koa";
import Router from "koa-router";

const app = new Koa();
const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = "Hello, Koa.";
});

app.use(router.routes());

app.listen(8080, () => console.log("Runing on port 8080"));
