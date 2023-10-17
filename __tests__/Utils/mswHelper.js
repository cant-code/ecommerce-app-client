import {beforeAll, beforeEach, vi} from 'vitest'
import {setGlobalOrigin} from 'undici';
import {RestHandler} from "msw"
import {setupServer} from "msw/node";

const server = setupServer();

export const interceptRest = (method, url, mock) => {
    const resolver = typeof mock === 'function' ? mock : ((req, res, ctx) => res(ctx.json(mock)));
    const wrapperResolver = vi.fn(resolver);

    server.use(new RestHandler(method, url, wrapperResolver));

    return wrapperResolver;
};

beforeAll(() => {
    server.listen();
})

beforeEach(() => {
    server.resetHandlers();
    setGlobalOrigin(window.location.href);
});