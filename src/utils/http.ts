import {
    CookieJar,
    wrapFetch,
} from "https://deno.land/x/another_cookiejar@v5.0.2/mod.ts";

const cookieJar = new CookieJar();
const cookieFetch = wrapFetch({ cookieJar });

export interface Options {
    url?: string;
    apiUrl?: string;
    headers?: Record<string, string>;
}

const defaultOptions: Options = {
    url: "https://wattpad.com",
    apiUrl: "https://api.wattpad.com",
    headers: {
        // lol
        "Authorization": (/wattpad\.apiAuthKey = ('|")(.*)('|")/.exec(
            await (await fetch("https://www.wattpad.com")).text(),
        ) as RegExpExecArray)[2],
        "User-Agent":
            `Mozilla/5.0 (Windows NT 10.0; rv:108.0) Gecko/20100101 Firefox/108.0`,
        "Accept-Language": "en-US,en;q=0.5",
    },
};

const newSession = (opts: Options) => {
    opts = Object.assign(defaultOptions, opts);
    return {
        get: async (path: string, useAPI = false, opts2?: {
            params?: URLSearchParams;
        }) => {
            const res = await cookieFetch(
                (useAPI ? opts.apiUrl : opts.url) + path + "?" +
                    (opts2?.params ?? "") +
                    `&wp_token=${cookieJar.getCookie({
                        name: "token",
                    })?.toString().split("=")?.[1]}`,
                {
                    headers: opts.headers,
                },
            );
            if (res.status > 300) {
                console.log(
                    (useAPI ? opts.apiUrl : opts.url) + path + "?" +
                        (opts2?.params ?? "") +
                        `&wp_token=${cookieJar.getCookie({
                            name: "token",
                        })?.toString().split("=")?.[1]}`,
                );
                console.log(await res.json());
                throw new Error("Failed request, probably rate-limited");
            }
            return res;
        },
        post: async (url: string, opts2: RequestInit) => {
            const res = await cookieFetch(
                url,
                opts2,
            );
            if (res.status > 300) {
                console.log(res);
                throw new Error("Failed request, probably rate-limited");
            }
            return res;
        },
    };
};

export { newSession };
