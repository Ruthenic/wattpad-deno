import { SearchResults, Session } from "../types.d.ts";
import Work from "./Story.ts";

export interface SearchParameters {
    tags: string[];
    limit?: number;
}

export interface PrivateSearchParameters {
    tags: string[];
    limit: number;
}

export default class Search {
    #opts: PrivateSearchParameters = {
        tags: [],
        limit: 20,
    };
    #session: Session;
    results: Work[] = [];

    constructor(
        opts: SearchParameters,
        session: Session,
    ) {
        this.#session = session;
        Object.assign(this.#opts, opts);
    }

    async update(pageNum: number) {
        this.results = [];

        const res: SearchResults =
            await (await this.#session.get("/v5/hotlist", true, {
                params: new URLSearchParams({
                    tags: this.#opts.tags.join(","),
                    offset: (pageNum * this.#opts.limit).toString(),
                    limit: this.#opts.limit.toString(),
                }),
            })).json();

        for (let i = 0; i < res.stories.length; i++) {
            const work = new Work(
                res.stories[i].id,
                this.#session,
            );

            this.results.push(work);
        }
    }
}
