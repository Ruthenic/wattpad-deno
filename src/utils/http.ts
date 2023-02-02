import {
    Cookie,
    getSetCookies,
    setCookie,
} from "https://deno.land/std@0.172.0/http/cookie.ts";

export interface Options {
    url?: string;
    apiUrl?: string;
    headers?: Record<string, string>;
}

const cookies: Cookie[] = [];

function isRedirect(status: number) {
    return [301, 302, 303, 307, 308].includes(status);
}

async function cookieFetch(input: RequestInfo, init?: RequestInit) {
    const headers = new Headers((input as Request).headers || {});

    if (init?.headers) {
        const initHeaders = new Headers(init.headers);

        for (const entry of initHeaders.entries()) {
            headers.set(entry[0], entry[1]);
        }
    }

    if (cookies) {
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];

            setCookie(headers, cookie);
        }
    }

    const res = await fetch(input, init);
    const setCookies = getSetCookies(res.headers);

    if (setCookies) {
        for (let i = 0; i < setCookies.length; i++) {
            const setCookie = setCookies[i];
            // FIXME: this dupe protection is bad out of 10
            if (!cookies.find((cookie) => cookie.name === setCookie.name)) {
                cookies.push(setCookie);
            }
        }
    }

    return res;
}

const defaultOptions: Options = {
    url: "https://wattpad.com",
    apiUrl: "https://api.wattpad.com",
    headers: {
        // lol
        Authorization: (/wattpad\.apiAuthKey = ('|")(.*)('|")/.exec(
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
        get: async (path: string, useAPI = false, opts2: {
            params?: URLSearchParams;
        }) => {
            const url = (useAPI ? opts.apiUrl : opts.url) + path + "?" +
                (opts2?.params ?? "");

            const res = await cookieFetch(url, {
                headers: opts.headers,
            });

            if (res.status > 300) {
                console.log(url);
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
