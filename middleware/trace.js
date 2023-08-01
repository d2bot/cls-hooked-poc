const uuid = require('uuid');
const cls = require('cls-hooked');
const faker = require('faker');

console.log('createNamespace');
const ns = cls.createNamespace('_test_ns_');

module.exports = () => {
  return (ctx, next) => {
    let traceId = uuid.v4();
    const upstream = 'unknown';

    ctx.state = {
      traceInfo: {
        upstream,
        traceId,
        requestAt: new Date(),
      },
    };

    const clsCtx = ns.createContext();
    ns.enter(clsCtx);
    ns.set('trace_id', traceId);
    ns.set('key', faker.lorem.lines(25));
    ns.bindEmitter(ctx.req);
    ns.bindEmitter(ctx.res);
    return next().finally(() => ns.exit(clsCtx));
  };
};