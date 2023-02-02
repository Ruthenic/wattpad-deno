import { SearchResults, Session } from "../types.d.ts";
import Work from "./Story.ts";

export interface SearchParameters {
    query: string | string[];
    type: "text" | "title" | "tag";
    sort?: string;
    limit?: number;
}

export interface PrivateSearchParameters {
    query: string | string[];
    type: "text" | "title" | "tag";
    limit: number;
    sort: string;
}

export default class Search {
    #opts: PrivateSearchParameters = {
        query: "",
        type: "text",
        limit: 30,
        sort: "hot",
    };
    #session: Session;
    results: Work[] = [];

    constructor(
        opts: SearchParameters,
        session: Session,
    ) {
        this.#session = session;
        Object.assign(this.#opts, opts);

        switch (this.#opts.type) {
            case "title":
                this.#opts.query = "title:" + this.#opts.query;
                break;
            case "tag":
                if (this.#opts.query.constructor === Array) {
                    this.#opts.query = "#" + this.#opts.query.join(" #");
                }
                break;
            case "text":
            default:
                break;
        }
    }

    async update(pageNum: number) {
        this.results = [];

        const res = await (await this.#session.get("/v4/stories", false, {
            params: new URLSearchParams({
                fields: "stories(id)",
                query: this.#opts.query as string,
                filter: this.#opts.sort,
                limit: this.#opts.limit.toString(),
                offset: (pageNum * this.#opts.limit).toString(),
                mature: "1",
            }),
        })).json() as SearchResults;

        for (let i = 0; i < res.stories.length; i++) {
            const work = new Work(
                res.stories[i].id,
                this.#session,
            );

            this.results.push(work);
        }
    }
}
