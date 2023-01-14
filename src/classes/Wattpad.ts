import Work from "./Story.ts";
import Search, { SearchParameters as QuerySearchParams } from "./Search.ts";
import TagSearch, { SearchParameters as TagSearchParams } from "./TagSearch.ts";
import { newSession, Options } from "../utils/http.ts";
import { Session } from "../types.d.ts";

export default class Wattpad {
    session: Session;

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
    async getWork(id: string): Promise<Work> {
        return new Work(id, this.session);
    }

    search(opts: QuerySearchParams) {
        return new Search(opts, this.session);
    }

    tagSearch(opts: TagSearchParams) {
        return new TagSearch(opts, this.session);
    }
}
