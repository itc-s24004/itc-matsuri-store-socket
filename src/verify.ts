import { APP_ENV } from "./env.js";

async function user(id: string, socketKey: string) {
    const url = new URL(APP_ENV.MAIN_SERVER);
    url.pathname = "/api/app/public/verify/user";
    url.searchParams.set("id", id);
    url.searchParams.set("socketKey", socketKey);

    const res = await fetch(url);
    return res.ok
}


async function service(key: string) {
    const url = new URL(APP_ENV.MAIN_SERVER);
    url.pathname = "/api/app/verify/service";
    url.searchParams.set("key", key);

    const res = await fetch(url, {method: "POST"});
    return res.ok
}

export const Verify = {
    user,
    service
}