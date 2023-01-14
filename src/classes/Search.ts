import { SearchResults, Session } from "../types.d.ts";
import Work from "./Story.ts";

export interface SearchParameters {
    query: string;
    isTitle?: boolean;
    limit?: number;
}

export interface PrivateSearchParameters {
    query: string;
    isTitle: boolean;
    limit: number;
}

export default class Search {
    #opts: PrivateSearchParameters = {
        query: "",
        isTitle: false,
        limit: 30,
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
            await (await this.#session.get("/v4/search/stories", true, {
                params: new URLSearchParams({
                    query: this.#opts.isTitle
                        ? `title: ${this.#opts.query}`
                        : this.#opts.query,
                    limit: this.#opts.limit.toString(),
                    offset: (pageNum * this.#opts.limit).toString(),
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
