export interface Options {
    url?: string;
    apiUrl?: string;
    headers?: Record<string, string>;
}

const defaultOptions: Options = {
    url: "https://wattpad.com",
    apiUrl: "https://api.wattpad.com",
    headers: {
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
            const res = await fetch(
                (useAPI ? opts.apiUrl : opts.url) + path + "?" +
                        opts2?.params ?? "",
                {
                    headers: opts.headers,
                },
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
