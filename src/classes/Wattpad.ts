import Story from "./Story.ts";
import Search, { SearchParameters as QuerySearchParams } from "./Search.ts";
import User from "./User.ts";
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

    async authenticate(username: string, password: string) {
        await this.session.post("https://www.wattpad.com/login", {
            "headers": {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; rv:108.0) Gecko/20100101 Firefox/108.0",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            "referrer": "https://www.wattpad.com/login",
            "body": new URLSearchParams({
                username,
                password,
            }),
            "method": "POST",
            redirect: "manual",
        });
    }

    /**
     * gets a Story from an ID
     * @returns {Promise<Story>} a Story class for the story
     */
    getStory(id: string): Story {
        return new Story(id, this.session);
    }

    /**
     * gets a User from a username
     * @returns {Promise<User>} a User class for the user
     */
    getUser(username: string): User {
        return new User(this.session, username);
    }

    search(opts: QuerySearchParams) {
        return new Search(opts, this.session);
    }
}
