import Work from "./Story.ts";
import { ID } from "../types.d.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";
import Search, { SearchParameters as QuerySearchParams } from "./Search.ts";
import TagSearch, { SearchParameters as TagSearchParams } from "./TagSearch.ts";
import { newSession, Options } from "../utils/http.ts";

export default class Wattpad {
    session: ReturnType<typeof newSession>;
    DOMParser = new DOMParser();

    /**
     * a representation of Wattpad in class form
     */
    constructor(opts?: Options) {
        if (opts && !opts.headers) {
            opts.headers = {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; rv:108.0) Gecko/20100101 Firefox/108.0",
            };
        }
        this.session = newSession(opts ?? {});
    }

    /**
     * gets a Story from an ID
     * @returns {Promise<Work>} a Work class for the work
     */
    async getWork(id: ID): Promise<Work> {
        return new Work(id, this.session);
    }

    search(opts: QuerySearchParams) {
        return new Search(opts, this.session);
    }

    tagSearch(opts: TagSearchParams) {
        return new TagSearch(opts, this.session);
    }
}
