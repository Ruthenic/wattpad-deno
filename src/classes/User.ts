import Story from "./Story.ts";
import { SearchResults, Session, UserJSON } from "../types.d.ts";

export default class User {
    #session: Session;
    #searchLimit: number;
    username: string;
    displayName?: string;
    description?: string;
    createDate?: Date;
    userJSON!: UserJSON;
    stories: Story[] = [];

    constructor(session: Session, username: string, limit: number = 20) {
        this.#session = session;
        this.username = username;
        this.#searchLimit = limit;
    }

    async init() {
        this.userJSON = await (await this.#session.get(
            `/api/v3/users/${this.username}`,
            false,
            {
                params: new URLSearchParams({
                    fields:
                        "username,description,avatar,name,email,genderCode,language,birthdate,verified,isPrivate,ambassador,is_staff,follower,following,backgroundUrl,votesReceived,numFollowing,numFollowers,createDate,followerRequest,website,facebook,twitter,followingRequest,numStoriesPublished,numLists,location,externalId,programs,showSocialNetwork,verified_email,has_accepted_latest_tos,email_reverification_status,highlight_colour,safety(isMuted,isBlocked),has_writer_subscription",
                }),
            },
        ))
            .json();

        this.displayName = this.userJSON.name;
        this.description = this.userJSON.description;
        this.createDate = new Date(this.userJSON.createDate);
    }

    async updateStories(pageNum: number) {
        const res: SearchResults = await (await this.#session.get(
            `/v4/users/${this.username}/stories/published`,
            false,
            {
                params: new URLSearchParams({
                    fields: "stories(id)",
                    limit: this.#searchLimit.toString(),
                    offset: (pageNum * this.#searchLimit).toString(),
                    mature: "1",
                }),
            },
        )).json();

        for (let i = 0; i < res.stories.length; i++) {
            const story = new Story(
                res.stories[i].id,
                this.#session,
            );

            this.stories.push(story);
        }
    }
}
